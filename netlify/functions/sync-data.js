// Levi OS — the "front door" for Make.com and Apple Shortcuts.
//
// Address once deployed:  https://YOUR-SITE.netlify.app/.netlify/functions/sync-data
//
// Make.com (emails, calendar events) and Apple Shortcuts (sleep, steps, water,
// workouts) POST a small JSON message here. This function checks the secret
// password, tidies the message, and drops it in your database's "inbox" table.
// Next time Levi OS opens, it files each item in the right place.
//
// Why an inbox instead of writing straight into your app data? So a message
// that arrives while you're editing on your phone can never overwrite your edits.
//
// Environment variables (Netlify > Site configuration > Environment variables):
//   SYNC_SECRET                long random password — Make/Shortcuts send it in the header x-levi-key
//   SUPABASE_URL               https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  the SECRET key from Supabase (sb_secret_...; or the older service_role key). Never put this in the app
//   OWNER_USER_ID              your user id from Supabase (Authentication > Users)
//
// Message formats (JSON, POST):
//   { "type": "health",   "date": "2026-11-18", "sleep_hours": 7.5, "steps": 8123,
//                         "water_ml": 1500, "workout": { "name": "Strength", "minutes": 52 } }
//   { "type": "calendar", "title": "Dentist", "start": "2026-11-20T14:00:00-05:00" }
//   { "type": "calendar", "events": [ { "title": "...", "date": "2026-11-20", "time": "14:00" } ] }
//   { "type": "email",    "from": "Dr. Rivera", "subject": "Midterm moved", "snippet": "..." }

const crypto = require("crypto");

const MAX_BODY_BYTES = 100 * 1024;
const MAX_EVENTS = 50;

const reply = (statusCode, obj) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(obj),
});

const str = (v, max) => (typeof v === "string" || typeof v === "number" ? String(v).trim().slice(0, max) : "");
const num = (v, min, max) => {
  const n = typeof v === "string" ? parseFloat(v.replace(",", ".")) : v;
  return typeof n === "number" && isFinite(n) && n >= min && n <= max ? n : undefined;
};
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s + "T00:00:00").getTime());
const isTime = (s) => /^([01]\d|2[0-3]):[0-5]\d$/.test(s);

function sameSecret(given, expected) {
  const a = Buffer.from(String(given || ""));
  const b = Buffer.from(String(expected || ""));
  return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);
}

// ---- turn each incoming message into clean rows for the inbox table --------
function cleanHealth(b) {
  const out = {};
  const date = str(b.date, 10);
  out.date = isDate(date) ? date : "";            // empty = "today" (the app decides)
  const sleep = num(b.sleep_hours, 0, 24); if (sleep !== undefined) out.sleep_hours = Math.round(sleep * 10) / 10;
  const steps = num(b.steps, 0, 100000);   if (steps !== undefined) out.steps = Math.round(steps);
  const water = num(b.water_ml, 0, 10000); if (water !== undefined) out.water_ml = Math.round(water);
  if (b.workout && typeof b.workout === "object") {
    const name = str(b.workout.name, 80);
    const minutes = num(b.workout.minutes, 0, 600);
    if (name || minutes !== undefined) out.workout = { name: name || "Workout", minutes: minutes !== undefined ? Math.round(minutes) : null };
  }
  if (out.sleep_hours === undefined && out.steps === undefined && out.water_ml === undefined && !out.workout) return null;
  return out;
}

function cleanEvent(e) {
  if (!e || typeof e !== "object") return null;
  const title = str(e.title || e.summary || e.name, 200);
  if (!title) return null;
  let date = str(e.date, 10), time = str(e.time, 5);
  const start = str(e.start || e.start_time || e.startDate, 40);
  if (!date && start) {
    // Take the clock time exactly as written in the calendar's own time zone.
    const m = start.match(/^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/);
    if (m) { date = m[1]; if (m[2]) time = m[2]; }
  }
  if (!isDate(date)) return null;
  const out = { title, date };
  if (isTime(time)) out.time = time;
  const notes = str(e.notes || e.description || e.location, 300);
  if (notes) out.notes = notes;
  return out;
}

function cleanEmail(b) {
  const subject = str(b.subject, 200);
  if (!subject) return null;
  return { from: str(b.from || b.sender, 120), subject, snippet: str(b.snippet || b.body, 300), received: str(b.received || b.date, 40), ext: str(b.id || b.message_id, 120) };
}

function buildRows(body, userId) {
  const type = str(body.type, 20).toLowerCase();
  if (type === "health") { const p = cleanHealth(body); return p ? [{ user_id: userId, kind: "health", payload: p }] : []; }
  if (type === "email")  { const p = cleanEmail(body);  return p ? [{ user_id: userId, kind: "email",  payload: p }] : []; }
  if (type === "calendar") {
    const list = Array.isArray(body.events) ? body.events.slice(0, MAX_EVENTS) : [body];
    return list.map(cleanEvent).filter(Boolean).map((p) => ({ user_id: userId, kind: "calendar", payload: p }));
  }
  return null; // unknown type
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });

  for (const k of ["SYNC_SECRET", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "OWNER_USER_ID"]) {
    if (!process.env[k]) return reply(500, { error: `Server isn't finished being set up: ${k} is missing in Netlify.` });
  }

  const key = event.headers["x-levi-key"] || event.headers["X-Levi-Key"];
  if (!sameSecret(key, process.env.SYNC_SECRET)) return reply(401, { error: "Wrong or missing x-levi-key." });

  if (Buffer.byteLength(event.body || "", "utf8") > MAX_BODY_BYTES) return reply(413, { error: "Message too large." });
  let body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) { return reply(400, { error: "Body must be JSON." }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400, { error: "Body must be a JSON object." });

  const rows = buildRows(body, process.env.OWNER_USER_ID);
  if (rows === null) return reply(400, { error: 'Unknown "type". Use health, calendar or email.' });
  if (rows.length === 0) return reply(400, { error: "Nothing usable in that message (check the field names)." });

  try {
    // Supabase's newer "secret" keys (sb_secret_...) go in the apikey header only;
    // the older service_role keys are long JWTs that also go in Authorization.
    const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const headers = { apikey: secret, "Content-Type": "application/json", Prefer: "return=minimal" };
    if (!secret.startsWith("sb_secret_")) headers.Authorization = `Bearer ${secret}`;
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/inbox`, { method: "POST", headers, body: JSON.stringify(rows) });
    if (!res.ok) {
      console.error("inbox insert failed", res.status, await res.text().catch(() => ""));
      return reply(502, { error: "Couldn't save to the database." });
    }
    return reply(200, { ok: true, queued: rows.length });
  } catch (e) {
    console.error("sync-data failed", e);
    return reply(502, { error: "Couldn't reach the database." });
  }
};
