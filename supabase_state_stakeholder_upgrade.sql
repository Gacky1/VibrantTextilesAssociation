-- State Stakeholder portal: scoped ministry accounts and aggregate-only dashboard data.
-- Run after supabase_state_stakeholder_role.sql has completed and committed.

create table if not exists public.state_stakeholders (
  user_id uuid primary key references auth.users(id) on delete cascade,
  ministry_name text not null,
  designation text,
  state text not null,
  is_active boolean not null default true,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (length(trim(state)) > 0),
  check (length(trim(ministry_name)) > 0)
);

alter table public.state_stakeholders enable row level security;

drop policy if exists stakeholder_self_read on public.state_stakeholders;
create policy stakeholder_self_read on public.state_stakeholders
for select to authenticated using (user_id = auth.uid() or public.is_master_admin());

drop policy if exists stakeholder_admin_all on public.state_stakeholders;
create policy stakeholder_admin_all on public.state_stakeholders
for all to authenticated using (public.is_master_admin()) with check (public.is_master_admin());

drop trigger if exists set_state_stakeholders_updated_at on public.state_stakeholders;
create trigger set_state_stakeholders_updated_at before update on public.state_stakeholders
for each row execute function public.set_updated_at();

create or replace function public.audit_state_stakeholder_change()
returns trigger language plpgsql security definer set search_path=public as $$
declare actor public.profiles;
begin
  select * into actor from public.profiles where id=auth.uid();
  insert into public.audit_logs(actor_user_id,actor_role,action,entity_type,entity_id,old_values,new_values)
  values(auth.uid(),actor.role,lower(tg_op)||'_state_stakeholder','state_stakeholder',coalesce(new.user_id,old.user_id),
    case when tg_op in ('UPDATE','DELETE') then to_jsonb(old) else null end,
    case when tg_op in ('INSERT','UPDATE') then to_jsonb(new) else null end);
  return coalesce(new,old);
end $$;

drop trigger if exists audit_state_stakeholder_changes on public.state_stakeholders;
create trigger audit_state_stakeholder_changes after insert or update or delete on public.state_stakeholders
for each row execute function public.audit_state_stakeholder_change();

create or replace function public.get_state_stakeholder_dashboard()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  scope_row public.state_stakeholders;
  account public.profiles;
  textile_count bigint := 0;
  gi_count bigint := 0;
  cluster_count bigint := 0;
  artisan_count bigint := 0;
  research_count bigint := 0;
  supplier_count bigint := 0;
  product_count bigint := 0;
  enquiry_count bigint := 0;
  won_count bigint := 0;
  export_value numeric := 0;
  result jsonb;
begin
  select * into account from public.profiles where id = auth.uid();
  if account.id is null or account.role <> 'state_stakeholder' or account.account_status <> 'active' then
    raise exception 'Active State Stakeholder access required';
  end if;

  select * into scope_row from public.state_stakeholders
  where user_id = auth.uid() and is_active = true;
  if scope_row.user_id is null then
    raise exception 'No active state assignment exists for this account';
  end if;

  select count(*), count(*) filter (where coalesce(t.gi_tag,false))
    into textile_count, gi_count from public.textiles t
    where lower(trim(t.state)) = lower(trim(scope_row.state));
  select count(*) into cluster_count from public.clusters c
    where lower(trim(c.state)) = lower(trim(scope_row.state));
  select count(distinct a.id) into artisan_count
    from public.textile_artisans a join public.textiles t on t.id = a.textile_id
    where lower(trim(coalesce(nullif(a.state,''),t.state))) = lower(trim(scope_row.state));
  select count(distinct r.id) into research_count
    from public.textile_research r join public.textiles t on t.id = r.textile_id
    where lower(trim(t.state)) = lower(trim(scope_row.state));
  select coalesce(sum(e.value),0) into export_value
    from public.textile_export_data e join public.textiles t on t.id = e.textile_id
    where lower(trim(t.state)) = lower(trim(scope_row.state));
  select count(*) into supplier_count from public.industry_members m
    where lower(trim(m.state)) = lower(trim(scope_row.state))
      and m.verification_status = 'verified' and m.is_active = true;
  select count(*) into product_count
    from public.marketplace_products p join public.industry_members m on m.id = p.industry_member_id
    where lower(trim(coalesce(nullif(p.origin_state,''),m.state))) = lower(trim(scope_row.state))
      and p.status = 'published';
  select count(*), count(*) filter (where e.status = 'won') into enquiry_count, won_count
    from public.marketplace_enquiries e join public.industry_members m on m.id = e.industry_member_id
    where lower(trim(m.state)) = lower(trim(scope_row.state));

  select jsonb_build_object(
    'scope', jsonb_build_object(
      'state', scope_row.state,
      'ministry_name', scope_row.ministry_name,
      'designation', scope_row.designation,
      'representative_name', account.full_name
    ),
    'metrics', jsonb_build_object(
      'textiles', textile_count,
      'gi_tagged', gi_count,
      'clusters', cluster_count,
      'artisans', artisan_count,
      'research_records', research_count,
      'verified_suppliers', supplier_count,
      'published_products', product_count,
      'marketplace_enquiries', enquiry_count,
      'won_enquiries', won_count,
      'recorded_export_value', export_value
    ),
    'textiles', coalesce((select jsonb_agg(x order by x.popularity_score desc, x.name) from (
      select t.id,t.name,t.slug,t.city,t.material,t.technique,t.category,t.cluster,t.gi_tag,t.popularity_score,t.thumbnail
      from public.textiles t where lower(trim(t.state)) = lower(trim(scope_row.state)) limit 100
    ) x),'[]'::jsonb),
    'clusters', coalesce((select jsonb_agg(x order by x.name) from (
      select c.id,c.name,c.city,c.description from public.clusters c
      where lower(trim(c.state)) = lower(trim(scope_row.state)) limit 100
    ) x),'[]'::jsonb),
    'materials', coalesce((select jsonb_agg(x order by x.total desc, x.material) from (
      select coalesce(nullif(trim(t.material),''),'Unspecified') material,count(*) total
      from public.textiles t where lower(trim(t.state)) = lower(trim(scope_row.state))
      group by 1 limit 20
    ) x),'[]'::jsonb),
    'export_by_year', coalesce((select jsonb_agg(x order by x.year) from (
      select e.year,sum(e.value) value,count(distinct e.country) countries
      from public.textile_export_data e join public.textiles t on t.id=e.textile_id
      where lower(trim(t.state)) = lower(trim(scope_row.state)) group by e.year
    ) x),'[]'::jsonb),
    'suppliers', coalesce((select jsonb_agg(x order by x.organization_name) from (
      select m.id,m.organization_name,m.slug,m.city,m.organization_type,m.product_categories,m.logo_url
      from public.industry_members m where lower(trim(m.state)) = lower(trim(scope_row.state))
      and m.verification_status='verified' and m.is_active=true limit 100
    ) x),'[]'::jsonb),
    'last_refreshed', now()
  ) into result;
  return result;
end $$;

revoke all on function public.get_state_stakeholder_dashboard() from public;
grant execute on function public.get_state_stakeholder_dashboard() to authenticated;

create index if not exists state_stakeholders_state_idx on public.state_stakeholders(lower(state));
create index if not exists textiles_state_lower_idx on public.textiles(lower(state));
create index if not exists clusters_state_lower_idx on public.clusters(lower(state));
create index if not exists industry_members_state_lower_idx on public.industry_members(lower(state));

notify pgrst, 'reload schema';
