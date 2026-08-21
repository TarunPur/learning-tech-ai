-- 0001_init.sql — NOD v1 schema. RLS on every table, scoped to auth.uid().
-- Source of truth: ../../ERD.md (do not diverge without updating that file too).

create extension if not exists pgcrypto;

-- profiles: 1:1 with auth.users, created on signup
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scenario text not null check (scenario in ('quiet','cold','meeting','event','custom')),
  custom_task_masked text,
  path text not null default 'own' check (path in ('own','nod')),
  attempt_type text not null default 'guided' check (attempt_type in ('guided','unaided')),
  recipient_masked text,
  ask text,
  context_masked text,
  draft_text_masked text,
  check_count int not null default 0,
  outcome text check (outcome in ('clean','tightened','kept','nod-rewrote','shipped-with-misses')),
  first_pass_criteria jsonb,
  loops_to_clear int,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);
create index attempts_user_idx on public.attempts(user_id, started_at desc);

create table public.checks (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  revision_index int not null default 0,
  draft_text_masked text not null,
  core_pass boolean not null,
  criteria jsonb not null,
  top_misses jsonb,
  deterministic jsonb,
  model text,
  latency_ms int,
  created_at timestamptz not null default now()
);
create index checks_attempt_idx on public.checks(attempt_id, revision_index);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  attempt_id uuid references public.attempts(id) on delete set null,
  title text not null,
  scenario text not null,
  text_masked text not null,
  ask text,
  authored text not null default 'own' check (authored in ('own','nod','nod-rewrote')),
  created_at timestamptz not null default now()
);
create index messages_user_idx on public.messages(user_id, created_at desc);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  attempt_id uuid references public.attempts(id) on delete set null,
  name text not null check (name in
    ('attempt_started','draft_completed','feedback_acted','nudge_sent','unaided_started','unaided_completed')),
  properties jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index events_user_idx on public.events(user_id, created_at desc);

create table public.nudges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  attempt_id uuid references public.attempts(id) on delete set null,
  scenario text not null,
  status text not null default 'scheduled' check (status in ('scheduled','sent','clicked','dismissed')),
  scheduled_for timestamptz,
  sent_at timestamptz,
  clicked_at timestamptz
);

create table public.roadmap_signals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  requested_masked text not null,
  created_at timestamptz not null default now()
);

-- Row-Level Security: a user can only touch their own rows.
alter table public.profiles       enable row level security;
alter table public.attempts       enable row level security;
alter table public.checks         enable row level security;
alter table public.messages       enable row level security;
alter table public.events         enable row level security;
alter table public.nudges         enable row level security;
alter table public.roadmap_signals enable row level security;

-- profiles: self only
create policy "profiles self" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- one owner policy per user-scoped table (select/insert/update/delete)
create policy "attempts owner" on public.attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "checks owner" on public.checks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "messages owner" on public.messages
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "events owner" on public.events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "nudges owner" on public.nudges
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "roadmap owner" on public.roadmap_signals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end; $$;
revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.handle_new_user() from public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
