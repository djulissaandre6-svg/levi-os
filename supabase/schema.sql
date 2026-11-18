-- Levi OS — database setup. Paste this whole file into Supabase:
--   SQL Editor  ->  New query  ->  paste  ->  Run
-- Safe to run more than once.

-- 1) Your app data: one row per user (that's just you).
create table if not exists public.levi_state (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  state      jsonb  not null,
  rev        bigint not null default 0,
  updated_ms bigint not null default 0
);

-- 2) The "inbox": things Make.com and Apple Shortcuts send in. The app picks
--    them up, files them in the right place, and deletes them from here.
create table if not exists public.inbox (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  kind       text not null check (kind in ('health','calendar','email')),
  payload    jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists inbox_user_idx on public.inbox (user_id, id);

-- 3) Locks. Row Level Security means: even with the public app key, a
--    signed-in user can only touch rows that belong to them.
alter table public.levi_state enable row level security;
alter table public.inbox      enable row level security;

drop policy if exists "own state: read"   on public.levi_state;
drop policy if exists "own state: insert" on public.levi_state;
drop policy if exists "own state: update" on public.levi_state;
create policy "own state: read"   on public.levi_state for select using (auth.uid() = user_id);
create policy "own state: insert" on public.levi_state for insert with check (auth.uid() = user_id);
create policy "own state: update" on public.levi_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own inbox: read"   on public.inbox;
drop policy if exists "own inbox: delete" on public.inbox;
create policy "own inbox: read"   on public.inbox for select using (auth.uid() = user_id);
create policy "own inbox: delete" on public.inbox for delete using (auth.uid() = user_id);
-- (No insert policy on purpose: only the sync-data function, using the
--  secret service key, can put things in the inbox.)
