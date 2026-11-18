# Levi OS — go live with login, sync, Claude and Make/Shortcuts

Plain-language guide. Do the steps in order. Allow about 45–60 minutes the first time.
Nothing here needs coding: you click, copy and paste.

## What you're building

```
Your phone / iPad / computer
        │   (you sign in once)
        ▼
  Levi OS website  ── hosted by Netlify
        │                    │
        │                    ├─ ask-claude function ──► Claude (your Anthropic key stays secret here)
        │                    └─ sync-data function  ◄── Make.com (email, calendar)
        ▼                                             ◄── Apple Shortcuts (sleep, steps, water, workouts)
  Supabase database  ── your data, locked to your login
```

**Costs (as of Nov 2026 — check each pricing page):** GitHub, Netlify and Supabase all have free plans that are enough for one person. Anthropic (Claude) charges per use — pennies per question — and you set a monthly spending limit yourself (step 5). Make.com has a free plan with monthly limits.

**Folder layout**

```
levi-os-v14/
├─ netlify.toml                  tells Netlify where the site and functions are
├─ SETUP.md                      this guide
├─ public/                       the website itself
│   ├─ index.html, bundle.js, sw.js, manifest.json, icons, img/
│   └─ config.js                 ← you paste 2 values here (step 4)
├─ netlify/functions/
│   ├─ ask-claude.js             chat with Claude (owner only)
│   └─ sync-data.js              the webhook for Make.com + Shortcuts
├─ supabase/schema.sql           database setup, pasted once (step 3)
└─ src/levi-os.jsx               readable app source (you never touch this)
```

---

## Step 0 — Save a backup of your current app (2 min)

Your data currently lives inside your **old** Netlify site. The new site is a different address, so it starts empty until you restore a backup.

1. Open your current Levi OS → **More → Settings → Download backup**.
2. Keep that file safe. Don't delete the old site until you've finished step 6.

## Step 1 — Put the folder on GitHub (10 min)

Netlify's drag-and-drop can't run server functions reliably, so we use GitHub (free) to feed Netlify.

1. Make a free account at github.com.
2. Click **+ → New repository**. Name it `levi-os`. Choose **Private**. Create it.
3. On the empty repo page click **uploading an existing file**.
4. Unzip `levi-os-v14.zip` on your computer. Open the unzipped folder and **drag everything inside it** (the `public`, `netlify`, `supabase`, `src` folders and the files) into the GitHub page. Wait for the upload to finish, then click **Commit changes**.
5. Check that you can see `netlify.toml`, `public/` and `netlify/functions/` in the repo.

## Step 2 — Create the Netlify site from GitHub (5 min)

1. At app.netlify.com: **Add new site → Import an existing project → GitHub**. Authorise, pick your `levi-os` repo.
2. Leave the build settings as they are (they come from `netlify.toml`: publish folder `public`, no build command). Click **Deploy**.
3. When it finishes, note your address, e.g. `https://something.netlify.app`. (You can rename it under Site configuration → Change site name.)

## Step 3 — Create the database and your login on Supabase (10 min)

1. Make a free account at supabase.com → **New project**. Give it a name, choose a database password (save it somewhere), pick the region closest to you. Wait ~2 minutes.
2. Left menu → **SQL Editor → New query**. Open `supabase/schema.sql` from your folder, copy **everything**, paste it in, press **Run**. You should see "Success".
3. Left menu → **Authentication → Users → Add user → Create new user.** Enter your email and a strong password, and tick **Auto Confirm User**. Create it.
4. In that users list, copy your **User UID** (a long code like `3f2a…`). You'll need it in step 5.
5. **Lock the door:** Authentication → **Sign In / Providers** (the menu names move around) → turn **off** "Allow new users to sign up". This is what makes it "only me". (The server functions also check your exact user id, so even a stranger who somehow got an account couldn't use Claude or your data.)
6. Find your keys: **Project Settings → API Keys**. Copy three things (paste them into your Notes app, not into a chat):
   - **Project URL** (`https://xxxx.supabase.co`) — shown on that page or under Data API
   - **Publishable key** (starts `sb_publishable_`; safe to be public). If your page only shows an "anon" key, use that instead.
   - **Secret key** (starts `sb_secret_`; **SECRET** — never paste it in config.js or share it). If you only see a "service_role" key, that works too.

## Step 4 — Tell the app where your database is (3 min)

1. On GitHub open `public/config.js` → click the pencil (edit).
2. Paste your Project URL between the quotes after `SUPABASE_URL:` and the **publishable** key after `SUPABASE_ANON_KEY:`. Leave `FUNCTIONS_BASE` empty.
3. **Commit changes.** Netlify redeploys by itself in about a minute.

## Step 5 — Add your secrets in Netlify (10 min)

Netlify → your site → **Site configuration → Environment variables → Add a variable**. Add these six:

| Name | Value |
|---|---|
| `SUPABASE_URL` | the Project URL from step 3 |
| `SUPABASE_ANON_KEY` | the **publishable** key (or the anon key) |
| `SUPABASE_SERVICE_ROLE_KEY` | the **secret** key, `sb_secret_…` (or service_role) |
| `OWNER_USER_ID` | your User UID from step 3 |
| `SYNC_SECRET` | a long random password you invent — 40+ letters and numbers. Make.com and Shortcuts will need it, so save it in your password manager |
| `ANTHROPIC_API_KEY` | from console.anthropic.com → API keys → Create key |

Optional: `ANTHROPIC_MODEL` (the app uses `claude-sonnet-5-5` unless you set this).

**Set a spending cap:** in the Anthropic console go to billing/limits and set a monthly limit you're comfortable with. Add a small amount of credit first; API use is billed separately from a Claude subscription.

**Then redeploy** (variables only apply to new deploys): Deploys → **Trigger deploy → Deploy site**.

## Step 6 — First sign-in and moving your data over (5 min)

1. Open your new `https://….netlify.app` on your phone. Sign in with the email/password from step 3.
2. Open **More → Settings → Restore from backup**, choose the file from step 0. Everything comes back (your photos, theme, workouts, everything).
3. Settings → **Your Account** should say "Synced".
4. On your phone: Share → **Add to Home Screen** for the new address. (Delete the old icon when you're happy.)
5. Open the new address on iPad / computer, sign in — the fresh device just takes your cloud copy.
   - If a device already has its own Levi OS data, the app asks "Two copies found — which one wins?" and doesn't change anything until you choose.
6. Try the **Ask Claude** bar on Home: "What's left on my schedule today?"

## Step 7 — Make.com: emails and calendar (20 min)

Make.com handles the Google sign-in for you, so you never deal with Google's developer rules.

The webhook address is: `https://YOUR-SITE.netlify.app/.netlify/functions/sync-data`
(note the dot before `netlify`). Every request must carry the header `x-levi-key` = your `SYNC_SECRET`.

**Calendar events** — new scenario:
1. Module 1: **Google Calendar → Watch Events**.
2. Module 2: **HTTP → Make a request**. URL: the webhook address. Method: POST. Headers: `x-levi-key` = your secret; `Content-Type` = `application/json`. Body type: Raw → JSON.
3. Body (click the fields from Module 1 into the blanks):
   `{"type":"calendar","title":"<Summary>","start":"<Start date/time>"}`
4. Run once to test. The event appears in Levi OS Calendar the next time the app is opened or comes to the front.

**Emails** — new scenario: **Gmail → Watch Emails** (restrict it to a label such as `Levi OS`, otherwise every email comes in) → **HTTP → Make a request**, same headers, body:
`{"type":"email","from":"<From>","subject":"<Subject>","snippet":"<Snippet>","id":"<Message ID>"}`
Emails show up in **Brain Dump** as "✉ Subject — Sender" (subject only, not the full email).

**HoneyBook:** turn on HoneyBook's own calendar sync into Google Calendar (HoneyBook → Settings → Calendar), and the Calendar scenario above carries those bookings into Levi OS. HoneyBook syncs one external calendar at a time.

**Apple Calendar:** Make has no simple Apple Calendar connection. Easiest: make Google Calendar your main calendar (you can still view it in the Apple Calendar app).

Make's free plan limits monthly runs and how often it checks — see Make's current pricing.

## Step 8 — Apple Shortcuts: sleep, steps, water, workouts (20 min)

Open the **Shortcuts** app → **+** → new shortcut:

1. **Find Health Samples** → Type: **Steps**, Start Date: **is today** → **Calculate Statistics** (Sum) → name it `Steps`.
2. **Find Health Samples** → Type: **Water** (or Dietary Water), is today → **Calculate Statistics** (Sum, in **mL**) → `Water`.
3. *(optional)* **Find Workouts** → sort by Start Date, Latest first, Limit 1 → use its **Workout Type** and **Duration** (in minutes).
4. **Get Contents of URL**:
   - URL: the webhook address
   - Method: **POST**
   - Headers: `x-levi-key` = your secret
   - Request Body: **JSON**, add: `type` (Text) = `health`, `steps` (Number) = Steps, `water_ml` (Number) = Water, and optionally `sleep_hours` (Number), `workout` (Dictionary) with `name` (Text) and `minutes` (Number).
   - Optional `date` (Text, `YYYY-MM-DD`); if you leave it out, the app files it under today.
5. Automate it: Shortcuts → **Automation → New Automation → Time of Day** (e.g. 9:30 pm, daily) → Run Shortcut → choose yours → **Run Immediately**.

Notes:
- Start with steps and water. Sleep is fiddly in Shortcuts (Apple stores sleep in segments you'd have to add up) — I can help you build that one separately.
- Water: the app counts in bottles and assumes a 500 ml bottle (1 litre = 2 bottles). Tell me if your bottle is a different size and I'll change it.
- A workout sent in marks "Moved" on your Evening Scorecard and shows under Health → Vitals.

## Step 9 — Quick tests

| Check | What you should see |
|---|---|
| Open the site signed out | A sign-in screen, not your data |
| Change something on your phone, open the iPad | It shows up within ~30 seconds, or instantly when you reopen the app |
| Ask Claude bar | An answer that knows today's schedule |
| Make/Shortcuts "run once" | Item appears in Levi OS after you open/refocus the app |

## If something goes wrong

| Problem | Fix |
|---|---|
| "Server isn't finished being set up: X is missing" | Add variable X in Netlify (step 5), then redeploy |
| Sign-in says wrong password | Reset it: Supabase → Authentication → Users → your user → Send password recovery / edit |
| "This email hasn't been confirmed" | In Supabase Users, edit your user and confirm it, or recreate it with Auto Confirm ticked |
| Ask Claude: "key isn't valid" | Re-copy the Anthropic key into `ANTHROPIC_API_KEY`, redeploy |
| Ask Claude: "check your billing" | Add credit in the Anthropic console |
| Make/Shortcuts get 401 | The `x-levi-key` header doesn't exactly match `SYNC_SECRET` |
| Make/Shortcuts get 400 | The message is missing a required field (e.g. calendar needs `title` and a date) |
| App says "Couldn't reach the sync service" | Check the internet; Supabase free projects pause after a week of inactivity — open the project in Supabase and press **Restore** |

## Good to know

- **Private:** your data is locked to your login (database "row level security"); only the two functions use secret keys, and those live only in Netlify.
- **Not included:** push notifications while the app is closed (iPhone web apps can do them, but it needs another server piece — a good next step), Apple Calendar two-way sync, and Claude reading your full emails (only subjects reach Levi OS).
- **Want the old, no-account version?** Drag just the `public` folder onto Netlify Drop; with `config.js` left blank the app behaves exactly as before.
- Anything in `public/config.js` is visible to anyone who opens your site — that's fine for the URL and publishable key, but **never** put the secret key, `SYNC_SECRET` or Anthropic key there.
