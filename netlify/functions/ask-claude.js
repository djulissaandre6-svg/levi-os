// Levi OS — "Ask Claude" function.
//
// What it does: the app sends your question (plus a short summary of your day)
// here. This function checks that it's really YOU (signed in with Supabase),
// then forwards the question to Claude and sends the answer back.
//
// Why a function: your Anthropic API key has to stay secret. It lives only in
// Netlify's environment variables, never in the app code your browser downloads.
//
// Environment variables (set in Netlify > Site configuration > Environment variables):
//   ANTHROPIC_API_KEY   your Anthropic key
//   SUPABASE_URL        https://xxxx.supabase.co
//   SUPABASE_ANON_KEY   the public "anon" key
//   OWNER_USER_ID       your user id from Supabase (Authentication > Users)
//   ANTHROPIC_MODEL     optional — defaults to claude-sonnet-5-5

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 30000;
const MAX_CONTEXT_CHARS = 12000;

const reply = (statusCode, obj) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(obj),
});

// Ask Supabase "who is holding this token?" — returns the user, or null.
async function whoIs(token) {
  const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: process.env.SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST only" });

  for (const k of ["ANTHROPIC_API_KEY", "SUPABASE_URL", "SUPABASE_ANON_KEY", "OWNER_USER_ID"]) {
    if (!process.env[k]) return reply(500, { error: `Server isn't finished being set up: ${k} is missing in Netlify.` });
  }

  // 1) Only the owner gets through.
  const auth = event.headers.authorization || event.headers.Authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return reply(401, { error: "Please sign in again." });
  let user;
  try { user = await whoIs(token); } catch (e) { return reply(502, { error: "Couldn't check your login right now." }); }
  if (!user || user.id !== process.env.OWNER_USER_ID) return reply(403, { error: "Not allowed." });

  // 2) Read and tidy what the app sent.
  let body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) { return reply(400, { error: "Bad request." }); }
  const raw = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
  const messages = raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS_PER_MESSAGE) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return reply(400, { error: "Nothing to answer." });
  const context = typeof body.context === "string" ? body.context.slice(0, MAX_CONTEXT_CHARS) : "";
  const maxTokens = Math.min(Math.max(parseInt(body.max_tokens, 10) || 900, 100), 1500);

  const system =
    `You are Levi's personal assistant inside her life-OS app, "Levi OS". ` +
    `Be direct, warm and concise — like a sharp chief of staff. Short paragraphs or a few bullets. ` +
    `No motivational clichés, no lecturing. If you don't know something from her data, say so rather than guessing. ` +
    `When you help with food, never push calorie counting or restriction. ` +
    `Here is a snapshot of her life right now (from her app):\n${context || "(none provided)"}`;

  // 3) Ask Claude. Netlify stops functions after ~30s, so we give up at 25s.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Anthropic error", res.status, data && data.error && data.error.message);
      if (res.status === 401) return reply(502, { error: "The Anthropic key in Netlify isn't valid." });
      if (res.status === 429 || res.status === 529) return reply(503, { error: "Claude is busy — try again in a moment." });
      if (res.status === 400 || res.status === 402) return reply(502, { error: "Anthropic rejected the request (check your billing or credit balance)." });
      return reply(502, { error: "Claude couldn't answer right now." });
    }
    const text = (data.content || []).map((b) => b.text || "").join("").trim();
    return reply(200, { reply: text || "No response." });
  } catch (e) {
    if (e && e.name === "AbortError") return reply(504, { error: "That took too long — try a shorter question." });
    console.error("ask-claude failed", e);
    return reply(502, { error: "Couldn't reach Claude." });
  } finally {
    clearTimeout(timer);
  }
};
