-- Run after supabase_marketplace_setup.sql so public.is_master_admin() exists.
-- Adds Master Admin write access to the live Textile Explorer dataset.

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'regions','states','materials','techniques','categories','clusters','textiles',
    'textile_gallery','textile_videos','textile_awards','textile_research',
    'textile_export_data','textile_artisans','cluster_organizations'
  ] loop
    execute format('drop policy if exists %I on public.%I', 'Master admin manage ' || table_name, table_name);
    execute format(
      'create policy %I on public.%I for all using (public.is_master_admin()) with check (public.is_master_admin())',
      'Master admin manage ' || table_name,
      table_name
    );
  end loop;
end $$;
