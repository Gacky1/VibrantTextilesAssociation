-- Marketplace enquiry -> quotation workflow permissions and controlled buyer decisions.
-- Apply after supabase_marketplace_setup.sql and supabase_verification_upgrade.sql.

drop policy if exists quotation_member_insert on public.marketplace_quotations;
create policy quotation_member_insert on public.marketplace_quotations for insert to authenticated
with check (
  exists (select 1 from public.industry_members m where m.id = industry_member_id and m.user_id = auth.uid() and m.is_active)
  and exists (select 1 from public.marketplace_enquiries e where e.id = enquiry_id and e.industry_member_id = industry_member_id and e.user_id = user_id)
);

drop policy if exists quotation_member_update on public.marketplace_quotations;
create policy quotation_member_update on public.marketplace_quotations for update to authenticated
using (exists (select 1 from public.industry_members m where m.id = industry_member_id and m.user_id = auth.uid()))
with check (exists (select 1 from public.industry_members m where m.id = industry_member_id and m.user_id = auth.uid()));

drop policy if exists quotation_member_delete on public.marketplace_quotations;
create policy quotation_member_delete on public.marketplace_quotations for delete to authenticated
using (status = 'draft' and exists (select 1 from public.industry_members m where m.id = industry_member_id and m.user_id = auth.uid()));

drop policy if exists quotation_items_member_insert on public.marketplace_quotation_items;
create policy quotation_items_member_insert on public.marketplace_quotation_items for insert to authenticated
with check (exists (
  select 1 from public.marketplace_quotations q
  join public.industry_members m on m.id = q.industry_member_id
  where q.id = quotation_id and m.user_id = auth.uid()
));

drop policy if exists quotation_items_member_update on public.marketplace_quotation_items;
create policy quotation_items_member_update on public.marketplace_quotation_items for update to authenticated
using (exists (select 1 from public.marketplace_quotations q join public.industry_members m on m.id=q.industry_member_id where q.id=quotation_id and m.user_id=auth.uid()))
with check (exists (select 1 from public.marketplace_quotations q join public.industry_members m on m.id=q.industry_member_id where q.id=quotation_id and m.user_id=auth.uid()));

drop policy if exists quotation_items_member_delete on public.marketplace_quotation_items;
create policy quotation_items_member_delete on public.marketplace_quotation_items for delete to authenticated
using (exists (select 1 from public.marketplace_quotations q join public.industry_members m on m.id=q.industry_member_id where q.id=quotation_id and m.user_id=auth.uid()));

create or replace function public.buyer_review_quotation(target_quotation_id uuid, next_status text, response_reason text default null)
returns public.marketplace_quotations
language plpgsql security definer set search_path = public
as $$
declare q public.marketplace_quotations;
begin
  if next_status not in ('accepted', 'rejected', 'revision_requested') then
    raise exception 'Unsupported quotation decision';
  end if;
  select * into q from public.marketplace_quotations where id=target_quotation_id and user_id=auth.uid() for update;
  if q.id is null then raise exception 'Quotation not found'; end if;
  if q.status not in ('sent', 'viewed', 'revision_requested') then raise exception 'This quotation can no longer be reviewed'; end if;
  if next_status in ('rejected','revision_requested') and nullif(trim(response_reason),'') is null then
    raise exception 'Please provide a reason';
  end if;
  update public.marketplace_quotations set
    status=next_status,
    accepted_at=case when next_status='accepted' then now() else accepted_at end,
    rejected_at=case when next_status='rejected' then now() else rejected_at end,
    rejection_reason=case when next_status='rejected' then response_reason else rejection_reason end,
    revision_request=case when next_status='revision_requested' then response_reason else revision_request end
  where id=target_quotation_id returning * into q;
  update public.marketplace_enquiries set
    status=case when next_status='accepted' then 'won' when next_status='rejected' then 'lost' else 'in_discussion' end,
    last_message_at=now()
  where id=q.enquiry_id;
  return q;
end $$;

revoke all on function public.buyer_review_quotation(uuid,text,text) from public;
grant execute on function public.buyer_review_quotation(uuid,text,text) to authenticated;
notify pgrst, 'reload schema';
