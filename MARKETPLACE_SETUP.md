# VTA Marketplace setup

## Deploy

1. Apply the existing `supabase_schema.sql` and `supabase_textiles_setup.sql` migrations.
2. In the Supabase SQL editor, run `supabase_marketplace_setup.sql` once.
3. Run `supabase_verification_upgrade.sql` to enable buyer verification and the admin verification operations.
4. Run `supabase_textile_admin_upgrade.sql` to let Master Admin manage Textile Explorer records under RLS.
5. Keep `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`. Never add a service-role key to Vite.
6. After the migration succeeds, set `VITE_MARKETPLACE_SCHEMA_READY=true` and restart Vite. Until then, the catalog uses explicit local preview records and does not request missing marketplace tables.
7. Build with `npm run build` and deploy the generated `dist` directory.

## Demo data

Create a Supabase Auth user with email `marketplace.demo@vta.local`, then run `supabase_marketplace_seed.sql`. The rerunnable seed promotes only that dedicated account to `industry_member` and creates a verified supplier, three published products, categories, specifications, pricing examples and marketplace metrics.

## Admin-created accounts

Deploy the secure Edge Function used by **Partner Verification → Create account**:

```bash
supabase functions deploy admin-create-account --no-verify-jwt
```

Supabase supplies `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to deployed Edge Functions. Never add the service-role key to `.env` or frontend code. Gateway JWT verification is disabled only so browser `OPTIONS` preflight can pass; the function independently validates the bearer token and requires an active `master_admin` profile before creating an Auth user, profile, optional industry-member record, and audit log.

If deploying through the Supabase Dashboard, create/update the `admin-create-account` function and disable its **Verify JWT** gateway option. The function performs stricter authorization internally. After deployment, verify that an `OPTIONS` request returns HTTP 204 with `Access-Control-Allow-Origin: *`.

The migration creates profile/member/catalog/enquiry/quotation/notification/audit tables, indexes, the Auth-to-profile trigger, RLS policies, seven storage buckets, and category seed records. Public buckets are limited to product and member presentation assets. Attachments, quotations, product documents, and verification documents remain private and should be accessed using short-lived signed URLs.

## Bootstrap the first administrator

Create a normal Auth account, then run this once from the SQL editor using its user UUID:

```sql
update public.profiles
set role = 'master_admin', account_status = 'active'
where id = 'USER_UUID';
```

Future role changes should be made from a trusted administrative operation. Do not expose role fields in public registration forms. Keep at least one active master administrator.

## Role testing

- Anonymous: marketplace catalog and published product pages work; account routes redirect to sign-in.
- User: can access `/account`; RLS restricts saved products, enquiries, messages and quotations to their own records.
- Pending industry member: can access `/member`, but publication must fail at RLS until verification.
- Verified industry member: can manage only its organization's products and commercial records.
- Suspended member: account/member guards and database publication checks deny sensitive actions.
- Master admin: can access `/admin/marketplace` and read moderation/audit data.

Use separate browser profiles for role tests. Attempt direct REST queries for another user's UUID to confirm RLS, not just hidden navigation.

## Manual checklist

- Search/filter the catalog; open a product; verify on-request pricing hides exact values.
- Test mobile navigation, keyboard focus, empty/loading/error states.
- Confirm unauthorized `/admin`, `/member`, and `/account` redirects.
- Upload allowed and rejected MIME types; confirm private files have no public URL.
- Create an enquiry and verify unrelated users/suppliers cannot read it.
- Verify internal notes are admin-only.
- Verify pending/suspended suppliers cannot publish.
- Confirm production build succeeds and review browser console/network errors.

## Current implementation boundary

This increment delivers the secure database foundation, profile-aware auth/role guards, public catalog/product UI, account/member shells, admin marketplace summary, core marketplace/enquiry adapters, and storage schema. Detailed member multi-step product editing, threaded inbox UI, quotation builder/version UI, verification/moderation workbenches, realtime notifications, analytics charts, and transactional email Edge Functions remain subsequent phases. The SQL schema intentionally prepares those workflows without adding checkout, payment, logistics, or inventory behavior.
