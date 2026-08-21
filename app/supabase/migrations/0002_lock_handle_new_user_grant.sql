-- 0002_lock_handle_new_user_grant.sql
-- Postgres grants EXECUTE to PUBLIC by default when a function is created; revoking from
-- anon/authenticated directly (0001) doesn't remove that PUBLIC-level grant, so both roles still
-- inherited EXECUTE through it. The Supabase Advisor flags this as "SECURITY DEFINER executable by
-- anon/authenticated" — confirmed via `information_schema.routine_privileges`.

revoke execute on function public.handle_new_user() from public;
