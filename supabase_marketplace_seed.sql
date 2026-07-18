-- VTA Marketplace demo data
-- Before running, create a Supabase Auth user with email marketplace.demo@vta.local.
-- This script is rerunnable and promotes only that dedicated account to industry_member.

begin;

do $$
declare
  demo_user_id uuid;
  demo_member_id uuid;
  sarees_category_id uuid;
  fabrics_category_id uuid;
  home_category_id uuid;
  banarasi_product_id uuid;
  kalamkari_product_id uuid;
  home_product_id uuid;
begin
  select id into demo_user_id
  from auth.users
  where lower(email) = 'marketplace.demo@vta.local'
  limit 1;

  if demo_user_id is null then
    raise exception 'Create the Supabase Auth user marketplace.demo@vta.local first, then run this seed again.';
  end if;

  insert into public.profiles (id, full_name, email, role, account_status)
  values (demo_user_id, 'Ananya Sharma', 'marketplace.demo@vta.local', 'industry_member', 'active')
  on conflict (id) do update
  set full_name = excluded.full_name,
      email = excluded.email,
      role = 'industry_member',
      account_status = 'active',
      updated_at = now();

  insert into public.industry_members (
    user_id, organization_name, slug, organization_type, short_description, full_description,
    business_email, business_phone, website, address_line_1, city, district, state, postal_code,
    year_established, employee_count_range, annual_turnover_range, gst_number, udyam_number,
    is_exporter, export_markets, product_categories, materials, techniques, certifications,
    manufacturing_capabilities, verification_status, verified_by, verified_at,
    profile_completion, is_featured, is_active
  ) values (
    demo_user_id, 'Kashi Heritage Weaves', 'kashi-heritage-weaves', 'Manufacturer & Artisan Collective',
    'Verified handloom manufacturer specialising in Banarasi silk, brocades and custom textile development.',
    'Kashi Heritage Weaves brings together master weavers and a modern sampling team to serve designers, boutiques and export buyers. The collective supports custom colourways, private labels and low-volume sampling before production.',
    'marketplace.demo@vta.local', '+91 98765 43210', 'https://example.com',
    'Madanpura Weavers Lane', 'Varanasi', 'Varanasi', 'Uttar Pradesh', '221001',
    1988, '51-100', '₹5-25 crore', '09ABCDE1234F1Z5', 'UDYAM-UP-00-0012345', true,
    array['United States','United Kingdom','Japan','United Arab Emirates'],
    array['Sarees','Fabrics','Home Textiles'], array['Pure Silk','Cotton','Viscose'],
    array['Brocade Weaving','Jacquard','Hand Painting','Natural Dyeing'],
    array['VTA Verified','Handloom Mark','Silk Mark'],
    array['Design Sampling','Custom Motif Development','Handloom Production','Private Labelling','Export Packaging'],
    'verified', demo_user_id, now(), 92, true, true
  )
  on conflict (user_id) do update set
    organization_name = excluded.organization_name, slug = excluded.slug,
    short_description = excluded.short_description, full_description = excluded.full_description,
    product_categories = excluded.product_categories, materials = excluded.materials,
    techniques = excluded.techniques, certifications = excluded.certifications,
    manufacturing_capabilities = excluded.manufacturing_capabilities,
    verification_status = 'verified', verified_at = now(), profile_completion = 92,
    is_featured = true, is_active = true, updated_at = now()
  returning id into demo_member_id;

  insert into public.marketplace_categories (name, slug, description, sort_order, is_active)
  values
    ('Sarees', 'sarees', 'Handwoven, occasion and contemporary sarees.', 1, true),
    ('Fabrics', 'fabrics', 'Woven, printed and finished textile yardage.', 2, true),
    ('Home Textiles', 'home-textiles', 'Premium textiles for residential and hospitality interiors.', 5, true)
  on conflict (slug) do update set description = excluded.description, is_active = true;

  select id into sarees_category_id from public.marketplace_categories where slug = 'sarees';
  select id into fabrics_category_id from public.marketplace_categories where slug = 'fabrics';
  select id into home_category_id from public.marketplace_categories where slug = 'home-textiles';

  insert into public.marketplace_products (
    industry_member_id, category_id, name, slug, sku, short_description, full_description,
    product_type, material, materials, technique, techniques, weave_type, pattern, motifs,
    color_options, product_form, origin_state, origin_city, gi_tagged, gi_name, certifications,
    sustainability_attributes, minimum_order_quantity, moq_unit, production_capacity,
    lead_time_days, sample_available, customization_available, private_label_available,
    export_available, pricing_type, currency, primary_image_url, status, moderation_status,
    is_featured, view_count, enquiry_count, published_at
  ) values (
    demo_member_id, sarees_category_id, 'Banarasi Silk Brocade Saree', 'demo-banarasi-silk-brocade-saree',
    'KHW-BAN-001', 'Pure silk Banarasi saree with handwoven floral zari brocade.',
    'A statement Banarasi saree woven by master artisans using traditional brocade techniques. Custom borders, motifs and colourways are available for boutique and occasion-wear collections.',
    'Saree', 'Pure Silk', array['Pure Silk','Zari'], 'Brocade Weaving', array['Handloom','Brocade'],
    'Kadhua', 'Floral', array['Kalga','Bel','Floral Jaal'], array['Crimson','Emerald','Royal Blue','Ivory'],
    'Finished Saree', 'Uttar Pradesh', 'Varanasi', true, 'Banaras Brocades and Sarees',
    array['Silk Mark','Handloom Mark'], array['Artisan Made','Low Waste Production'],
    10, 'pieces', '120 pieces/month', 30, true, true, true, true, 'on_request', 'INR',
    '/assets/textiles/banarasi_silk.png', 'published', 'approved', true, 2840, 86, now() - interval '30 days'
  ) on conflict (slug) do update set
    industry_member_id = excluded.industry_member_id, category_id = excluded.category_id,
    short_description = excluded.short_description, full_description = excluded.full_description,
    status = 'published', moderation_status = 'approved', is_featured = true, updated_at = now()
  returning id into banarasi_product_id;

  insert into public.marketplace_products (
    industry_member_id, category_id, name, slug, sku, short_description, full_description,
    product_type, material, materials, technique, techniques, color_options, product_form,
    origin_state, origin_city, minimum_order_quantity, moq_unit, production_capacity,
    lead_time_days, sample_available, customization_available, export_available,
    pricing_type, indicative_price_min, indicative_price_max, currency, price_unit,
    primary_image_url, status, moderation_status, view_count, enquiry_count, published_at
  ) values (
    demo_member_id, fabrics_category_id, 'Hand-Painted Kalamkari Cotton', 'demo-hand-painted-kalamkari-cotton',
    'KHW-KAL-014', 'Natural-dyed Kalamkari cotton for apparel and interior collections.',
    'Artisan-painted cotton yardage with narrative motifs and rich natural colour. Supplied by the metre with custom artwork available for qualifying quantities.',
    'Fabric', 'Cotton', array['Cotton'], 'Kalamkari', array['Hand Painting','Natural Dyeing'],
    array['Indigo','Madder Red','Black','Natural'], 'Fabric by Metre', 'Andhra Pradesh', 'Srikalahasti',
    25, 'metres', '800 metres/month', 21, true, true, true, 'range', 850, 1400, 'INR', 'metre',
    '/assets/textiles/kalamkari_fabric.png', 'published', 'approved', 1760, 42, now() - interval '20 days'
  ) on conflict (slug) do update set
    industry_member_id = excluded.industry_member_id, category_id = excluded.category_id,
    indicative_price_min = excluded.indicative_price_min, indicative_price_max = excluded.indicative_price_max,
    status = 'published', moderation_status = 'approved', updated_at = now()
  returning id into kalamkari_product_id;

  insert into public.marketplace_products (
    industry_member_id, category_id, name, slug, sku, short_description, full_description,
    product_type, material, materials, technique, techniques, color_options, product_form,
    origin_state, origin_city, minimum_order_quantity, moq_unit, lead_time_days,
    sample_available, customization_available, private_label_available, export_available,
    pricing_type, indicative_price_min, indicative_price_max, currency, price_unit,
    primary_image_url, status, moderation_status, view_count, enquiry_count, published_at
  ) values (
    demo_member_id, home_category_id, 'Maheshwari Handloom Cushion Fabric', 'demo-maheshwari-cushion-fabric',
    'KHW-MAH-021', 'Lightweight silk-cotton handloom fabric for premium cushions and soft furnishings.',
    'A versatile Maheshwari-inspired silk-cotton weave developed for boutique interiors, hospitality projects and coordinated home collections.',
    'Home Textile Fabric', 'Silk Cotton', array['Silk','Cotton'], 'Handloom', array['Plain Weave','Striped Border'],
    array['Sand','Rose','Indigo','Charcoal'], 'Fabric by Metre', 'Madhya Pradesh', 'Maheshwar',
    50, 'metres', 25, true, true, true, true, 'range', 1100, 1750, 'INR', 'metre',
    '/assets/textiles/maheshwari_handloom.png', 'published', 'approved', 920, 24, now() - interval '10 days'
  ) on conflict (slug) do update set
    industry_member_id = excluded.industry_member_id, category_id = excluded.category_id,
    status = 'published', moderation_status = 'approved', updated_at = now()
  returning id into home_product_id;

  delete from public.marketplace_product_specifications
  where product_id in (banarasi_product_id, kalamkari_product_id, home_product_id);

  insert into public.marketplace_product_specifications
    (product_id, specification_name, specification_value, unit, sort_order)
  values
    (banarasi_product_id, 'Composition', 'Pure silk with zari', null, 1),
    (banarasi_product_id, 'Saree length', '5.5', 'metres', 2),
    (banarasi_product_id, 'Blouse piece', 'Included', null, 3),
    (kalamkari_product_id, 'Composition', '100% cotton', null, 1),
    (kalamkari_product_id, 'Width', '44', 'inches', 2),
    (kalamkari_product_id, 'Dye process', 'Natural dye', null, 3),
    (home_product_id, 'Composition', 'Silk-cotton blend', null, 1),
    (home_product_id, 'Width', '48', 'inches', 2),
    (home_product_id, 'Recommended use', 'Cushions and drapery', null, 3);
end
$$;

commit;
