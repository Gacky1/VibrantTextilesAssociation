-- Run after supabase_marketplace_setup.sql.
-- Adds buyer verification and secure admin-only verification operations.

alter table public.profiles
  add column if not exists buyer_verification_status text not null default 'pending'
  check (buyer_verification_status in ('pending','under_review','verified','rejected','suspended')),
  add column if not exists buyer_verification_notes text,
  add column if not exists buyer_verified_by uuid references auth.users(id),
  add column if not exists buyer_verified_at timestamptz,
  add column if not exists company_name text,
  add column if not exists city text,
  add column if not exists state text;

update public.profiles
set buyer_verification_status = 'verified'
where role in ('master_admin','industry_member');

drop policy if exists profiles_admin_update on public.profiles;
create policy profiles_admin_update on public.profiles
for update using (public.is_master_admin())
with check (public.is_master_admin());

drop policy if exists member_documents_admin_read on public.industry_member_documents;
create policy member_documents_admin_read on public.industry_member_documents
for select using (public.is_master_admin());

drop policy if exists member_documents_owner_read on public.industry_member_documents;
create policy member_documents_owner_read on public.industry_member_documents
for select using (exists (
  select 1 from public.industry_members member
  where member.id = industry_member_id and member.user_id = auth.uid()
));

drop function if exists public.admin_review_industry_member(uuid, public.member_verification_status, text);
drop function if exists public.admin_review_industry_member(uuid, text, text);

create function public.admin_review_industry_member(
  target_member_id uuid,
  next_status text,
  review_reason text default null
) returns public.industry_members
language plpgsql security definer set search_path = public
as $$
declare
  actor_id uuid := auth.uid();
  old_record public.industry_members;
  new_record public.industry_members;
begin
  if not public.is_master_admin() then raise exception 'Master admin access required'; end if;
  if next_status not in ('pending','under_review','verified','rejected','suspended') then
    raise exception 'Invalid industry member verification status';
  end if;
  if next_status in ('rejected','suspended') and nullif(trim(review_reason),'') is null then
    raise exception 'A reason is required for rejection or suspension';
  end if;
  select * into old_record from public.industry_members where id = target_member_id for update;
  if old_record.id is null then raise exception 'Industry member not found'; end if;

  update public.industry_members set
    verification_status = next_status::public.member_verification_status,
    verification_notes = case when next_status in ('under_review','verified') then review_reason else verification_notes end,
    rejection_reason = case when next_status = 'rejected' then review_reason else null end,
    suspension_reason = case when next_status = 'suspended' then review_reason else null end,
    suspended_at = case when next_status = 'suspended' then now() else null end,
    verified_by = case when next_status = 'verified' then actor_id else verified_by end,
    verified_at = case when next_status = 'verified' then now() else verified_at end,
    is_active = next_status <> 'suspended', updated_at = now()
  where id = target_member_id returning * into new_record;

  update public.profiles set
    role = 'industry_member',
    account_status = case when next_status = 'suspended' then 'suspended' else 'active' end,
    updated_at = now()
  where id = new_record.user_id;

  insert into public.audit_logs(actor_user_id,actor_role,action,entity_type,entity_id,old_values,new_values)
  values(actor_id,'master_admin','industry_member_'||next_status,'industry_member',target_member_id,to_jsonb(old_record),to_jsonb(new_record));
  return new_record;
end $$;

create or replace function public.admin_review_buyer(
  target_user_id uuid,
  next_status text,
  review_reason text default null
) returns public.profiles
language plpgsql security definer set search_path = public
as $$
declare old_record public.profiles; new_record public.profiles;
begin
  if not public.is_master_admin() then raise exception 'Master admin access required'; end if;
  if next_status not in ('pending','under_review','verified','rejected','suspended') then raise exception 'Invalid buyer verification status'; end if;
  if next_status in ('rejected','suspended') and nullif(trim(review_reason),'') is null then raise exception 'A reason is required'; end if;
  select * into old_record from public.profiles where id=target_user_id and role='user' for update;
  if old_record.id is null then raise exception 'Buyer profile not found'; end if;
  update public.profiles set buyer_verification_status=next_status,
    buyer_verification_notes=review_reason,
    buyer_verified_by=case when next_status='verified' then auth.uid() else buyer_verified_by end,
    buyer_verified_at=case when next_status='verified' then now() else buyer_verified_at end,
    account_status=case when next_status='suspended' then 'suspended' else 'active' end,
    updated_at=now() where id=target_user_id returning * into new_record;
  insert into public.audit_logs(actor_user_id,actor_role,action,entity_type,entity_id,old_values,new_values)
  values(auth.uid(),'master_admin','buyer_'||next_status,'profile',target_user_id,to_jsonb(old_record),to_jsonb(new_record));
  return new_record;
end $$;

revoke all on function public.admin_review_industry_member(uuid,text,text) from public;
revoke all on function public.admin_review_buyer(uuid,text,text) from public;
grant execute on function public.admin_review_industry_member(uuid,text,text) to authenticated;
grant execute on function public.admin_review_buyer(uuid,text,text) to authenticated;

notify pgrst, 'reload schema';

-- Industry partners may edit organization content, never verification/admin fields.
create or replace function public.protect_industry_member_admin_fields()
returns trigger language plpgsql set search_path=public as $$
begin
  if not public.is_master_admin() and (
    new.user_id is distinct from old.user_id or
    new.verification_status is distinct from old.verification_status or
    new.verification_notes is distinct from old.verification_notes or
    new.verified_by is distinct from old.verified_by or
    new.verified_at is distinct from old.verified_at or
    new.rejection_reason is distinct from old.rejection_reason or
    new.suspended_at is distinct from old.suspended_at or
    new.suspension_reason is distinct from old.suspension_reason or
    new.is_featured is distinct from old.is_featured or
    new.is_active is distinct from old.is_active
  ) then raise exception 'Verification and administrative fields cannot be changed by an industry partner'; end if;
  return new;
end $$;
drop trigger if exists protect_industry_member_admin_fields on public.industry_members;
create trigger protect_industry_member_admin_fields before update on public.industry_members
for each row execute function public.protect_industry_member_admin_fields();
