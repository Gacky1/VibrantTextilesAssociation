# Project Context: Vibrant Textiles Association (VTA)

Last updated: 18 July 2026

This document is the current source of truth for developers and coding assistants working on the VTA application. The project has evolved from a public association website and CMS into a multi-portal platform with a Supabase-backed Textile Explorer, B2B Marketplace, buyer accounts, verified industry partners, and a role-protected Master Admin system.

## 1. Product overview

VTA connects textile artisans, manufacturers, exporters, designers, buyers, educators, policymakers, and institutions. The application now contains four connected surfaces:

1. Public website and dual Industry/Academy navigation.
2. Textile Explorer for India's textile traditions and related research data.
3. B2B Marketplace for verified supplier discovery, enquiries, RFQs, and quotations.
4. Authenticated Buyer, Industry Partner, and Master Admin portals.

The Marketplace is enquiry-led, not transactional e-commerce. Do not add carts, online payments, inventory deduction, logistics, or order fulfilment without a new business requirement.

## 2. Technology stack

- React 19.2 and Vite 7.3
- React Router DOM 7.13
- Tailwind CSS 4 with `@theme` in `src/index.css`
- Supabase PostgreSQL, Authentication, Storage, and RLS
- Framer Motion 12
- Lenis smooth scrolling
- FontAwesome React

Do not create `tailwind.config.js`. Do not introduce another backend, authentication provider, icon library, Redux, or a service-role key in frontend code.

## 3. Portal and role architecture

### Public portal mode

`src/context/PortalContext.jsx` stores `industry` or `academy` in `localStorage` under `vta_portal_mode`. This changes public navigation only; it is not an authorization role.

### Application roles

Roles are stored in `public.profiles.role` using the `public.app_role` enum:

- `master_admin`
- `industry_member`
- `user`

The frontend role selector only chooses a sign-in destination. It must never write or infer a role. Supabase profiles and RLS are authoritative.

`src/context/AuthContext.jsx` exposes the authenticated user, profile, member profile, account and verification states, role helpers, sign-in/sign-up/sign-out, and profile refresh.

`src/auth/RoleRoutes.jsx` provides:

- `ProtectedRoute`
- `RoleProtectedRoute`
- `MasterAdminRoute`
- `IndustryMemberRoute`
- `VerifiedMemberRoute`
- `UserRoute`

Buyer dashboard access requires `buyer_verification_status = verified`. Industry product publication requires a verified and active industry member at the database-policy level.

### Verification states

Industry members and buyers use:

- `pending`
- `under_review`
- `verified`
- `rejected`
- `suspended`

Account access also respects `profiles.account_status`: `active`, `pending`, `suspended`, or `blocked`.

## 4. Authentication UX

The public navbar uses `src/components/auth/SignInMenu.jsx` and offers:

- Buyer → `/account/login?as=buyer`
- Industry Partner → `/account/login?as=member`
- Administration → `/account/login?as=admin`

`src/pages/AccountPages.jsx` validates the selected portal against the authenticated profile role and redirects to the correct dashboard. A role mismatch signs the session out and displays an error. `/admin/login` redirects to the unified Administration login.

New Auth users receive a profile through `public.handle_new_user()`. Self-registration always defaults to role `user`; users cannot self-assign `industry_member` or `master_admin`.

## 5. Current routes

### Public

- `/`
- `/about-textile`
- `/events`
- `/members`
- `/skill-development`
- `/media`
- `/research`
- `/contact`
- `/membership`
- `/textile-explorer`
- `/textile-explorer/:slug`
- `/marketplace`
- `/marketplace/products/:slug`
- `/marketplace/suppliers/:slug`

### Authentication and buyer

- `/account/login`
- `/account/status`
- `/account/verification`
- `/account` — verified buyers only
- `/account/enquiries` and `/account/enquiries/new` — buyer enquiry history and RFQ submission
- `/account/quotations` — received supplier quotations
- `/account/saved` — saved-product shortlist
- `/unauthorized`

### Industry partner

- `/member` — industry partner dashboard shell
- `/member/products` — product drafts, review submission, unpublish and archive
- `/member/enquiries` — assigned buyer enquiries and status management
- `/member/quotations` — quotation and version registry
- `/member/profile` — company profile editor
- `/member/verification` — verification status and onboarding guidance

The member routes are backed by Supabase and owner-scoped RLS. Advanced multi-step product editing, threaded messaging, and the quotation builder remain staged.

### Master Admin

- `/admin/dashboard`
- `/admin/marketplace`
- `/admin/textiles` — live Textile Explorer dataset management
- `/admin/members` — operational Industry Partner and Buyer verification
- `/admin/council-members` — legacy/public council and partner CMS
- `/admin/events`
- `/admin/media`
- `/admin/press`
- `/admin/skill-dev`
- `/admin/research`
- `/admin/applications`
- `/admin/content`

All `/admin` routes are wrapped by `MasterAdminRoute`.

## 6. Database and migration order

Apply SQL files in this order:

1. `supabase_schema.sql` — original CMS and membership applications.
2. `supabase_textiles_setup.sql` — Textile Explorer schema and seed foundation.
3. `supabase_marketplace_setup.sql` — profiles, roles, industry members, marketplace, enquiries, quotations, notifications, audit logs, storage, and RLS.
4. `supabase_verification_upgrade.sql` — buyer verification fields, admin verification RPCs, audit behavior, and additional policies.
5. `supabase_textile_admin_upgrade.sql` — Master Admin write policies for Textile Explorer records and related tables.
6. Optional: `supabase_marketplace_seed.sql` — realistic verified supplier and published product demonstration data.

The seed requires a Supabase Auth user with email `marketplace.demo@vta.local`. It assigns that dedicated account the `industry_member` role. Use a separate Auth account for Master Admin testing.

### Core marketplace tables

- `profiles`
- `industry_members`
- `industry_member_documents`
- `marketplace_categories`
- `marketplace_products`
- `marketplace_product_images`
- `marketplace_product_specifications`
- `marketplace_product_documents`
- `saved_marketplace_products`
- `marketplace_enquiries`
- `marketplace_enquiry_messages`
- `marketplace_quotations`
- `marketplace_quotation_items`
- `notifications`
- `audit_logs`

### Textile Explorer tables

- `regions`, `states`, `materials`, `techniques`, `categories`
- `clusters`, `cluster_organizations`
- `textiles`
- `textile_gallery`, `textile_videos`, `textile_awards`
- `textile_research`, `textile_export_data`, `textile_artisans`

### Original CMS tables

- `membership_applications`
- `members`
- `events`, `media`, `press_releases`
- `missions`, `focus_areas`, `site_content`
- Skill-development and research CMS tables defined by the original migrations

## 7. Security and RLS rules

- Anonymous users can read active categories and published products owned by verified, active suppliers.
- Buyers can access only their saved products, enquiries, messages, and quotations.
- Industry partners can access only records belonging to their `industry_members.user_id`.
- Internal enquiry notes are visible only to Master Admin.
- Verification documents and commercial attachments are private.
- Master Admin checks use `public.is_master_admin()` and never client-supplied role data.
- `admin_review_industry_member` and `admin_review_buyer` are security-definer RPCs that verify the caller, enforce required reasons, update status, and create audit records.
- Verification RPC parameters use plain `text` status values for reliable PostgREST schema discovery, then validate and cast inside PostgreSQL. The verification upgrade ends with a PostgREST schema-cache reload notification.
- Suspended/unverified industry members cannot publish products through RLS.
- The frontend anon key is expected and safe with correct RLS; never expose the service-role key.

## 8. Storage buckets

- Public presentation assets: `marketplace-products`, `member-branding`, `member-gallery`
- Private/mixed assets: `marketplace-documents`, `enquiry-attachments`, `quotation-documents`, `member-verification-documents`
- Original CMS images: `cms-images`

Private objects must use signed URLs. Marketplace upload paths should begin with the authenticated user's UUID.

## 9. Frontend modules

### Context and authorization

- `src/context/AuthContext.jsx`
- `src/context/PortalContext.jsx`
- `src/auth/RoleRoutes.jsx`

### Marketplace public UI

- `src/pages/Marketplace.jsx`
- `src/pages/MarketplaceProduct.jsx`
- `src/pages/MarketplaceSupplier.jsx`
- `src/components/marketplace/MarketplaceUI.jsx`

The Marketplace uses Supabase only when `VITE_MARKETPLACE_SCHEMA_READY=true`. Until then, `src/data/marketplacePreviewData.js` supplies an explicit development preview and prevents missing-table requests.

### Marketplace data layer

- `src/data/marketplaceDatabase.js`
- `src/data/enquiryDatabase.js`
- `src/data/databaseResult.js`

Adapters return predictable `{ data, error, success }` structures and wrap Supabase operations in `try...catch`.

### Admin operations

- `src/admin/AdminAccountRegistry.jsx` — industry and buyer verification workbench
- `src/admin/AdminMarketplace.jsx` — product moderation plus enquiry and quotation registries
- `src/admin/AdminTextiles.jsx` — create, search, edit, preview, and remove Textile Explorer records
- `src/admin/AccountCreateModal.jsx` and `supabase/functions/admin-create-account/index.ts` — secure Master Admin creation of Buyer and Industry Partner Auth accounts. The service-role key exists only inside the deployed Edge Function.
- `src/admin/AdminMembers.jsx` — older council/public-partner CMS, intentionally retained separately
- `src/admin/AdminLayout.jsx` — responsive admin shell and navigation

### Textile Explorer

`src/data/textileDatabase.js` is the live Supabase adapter. `getTextileExplorerData()` loads textiles, regions, and states from the backend and normalizes fields for `src/pages/TextileExplorer.jsx`. Textile detail loads related galleries, videos, awards, research, export data, artisans, clusters, and organizations. Local images and descriptive values remain resilient presentation fallbacks when optional database fields are empty.

## 10. Environment variables

Use `.env.example` as the template:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_MARKETPLACE_SCHEMA_READY=false
```

Set the readiness flag to `true` only after the marketplace and verification migrations complete, then restart Vite.

## 11. Styling and component standards

- Tailwind v4 customization belongs in `src/index.css` under `@theme`.
- Reuse `.section-container`, `.glass-card`, `.glass-panel`, `.btn-primary`, and `.text-gradient`.
- Use glass effects selectively.
- Use FontAwesome icons and Framer Motion for interactive transitions.
- Maintain loading, empty, failed, unauthorized, and verification-pending states.
- Keep pages responsive, semantic, keyboard accessible, and focus visible.
- Avoid oversized page components when expanding remaining workflows.

## 12. Operational commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

The production build currently succeeds. The repository contains pre-existing ESLint violations in older components, primarily unused animation/icon imports and React effect-style rules; do not represent project-wide lint as clean until those are resolved.

## 13. Current implementation status

Implemented:

- Supabase profile/role foundation and Auth trigger
- Role-aware sign-in and protected routes
- Industry and buyer verification backend operations
- Admin verification workbench
- Public Marketplace catalog, product detail, and supplier profile
- Marketplace development preview and Supabase seed
- Admin product moderation, enquiry registry, and quotation registry
- Live Supabase Textile Explorer catalog and geographic metadata
- Existing CMS modules and dual portal navigation

Still incomplete or intentionally staged:

- Full buyer registration/profile completion form
- Industry membership application-to-Auth onboarding automation
- Member company-profile editor and document uploader
- Multi-step member product editor
- Buyer and member enquiry-thread pages
- Quotation builder, revision UI, printable/PDF workflow
- Saved-product UI
- Realtime notifications and notification dropdown
- Detailed analytics charts
- Transactional email Edge Functions
- Complete admin detail pages for every marketplace entity
- Route-level code splitting; the production bundle currently emits a large-chunk warning

## 14. Development rules

1. Inspect current schema and adapters before creating a new table or query.
2. Extend the current architecture; do not rewrite unrelated public pages.
3. Wrap Supabase requests in `try...catch` and handle null/empty results.
4. Enforce sensitive permissions and status transitions in PostgreSQL/RLS/RPCs.
5. Never let clients change their own role or verification status.
6. Preserve quotation revisions instead of overwriting sent versions.
7. Do not expose buyer contact data to unrelated suppliers.
8. Do not expose private storage URLs.
9. Keep Council Registry (`members`) distinct from authenticated partner records (`industry_members`).
10. Update this document whenever routes, migrations, roles, or major workflow status changes.
