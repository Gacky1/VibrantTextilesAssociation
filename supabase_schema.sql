-- =============================================
-- VibrantTextiles CMS – Supabase SQL Schema
-- Paste this in: Supabase Dashboard → SQL Editor → Run
-- =============================================

-- Membership forms responses
create table if not exists membership_applications (
  id uuid primary key default gen_random_uuid(),
  category text not null, -- 'government', 'industry', 'support'
  org_name text not null,
  org_type text, -- for industry sub-sector or support type
  org_address text not null,
  state text,
  partnering_interest text,
  decision_maker text not null,
  designation text,
  phone text not null,
  email text not null,
  additional_info text,
  status text default 'pending',
  created_at timestamptz default now()
);
-- Paste this in: Supabase Dashboard → SQL Editor → Run
-- =============================================

-- Members table
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text not null,
  bio text,
  image_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Events table
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text not null,
  location text not null,
  type text not null,
  image_url text,
  description text,
  highlights text[] default '{}',
  is_upcoming boolean default true,
  created_at timestamptz default now()
);

-- Media gallery
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  category text default 'Gallery',
  created_at timestamptz default now()
);

-- Press releases
create table if not exists press_releases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text not null,
  category text not null,
  created_at timestamptz default now()
);

-- Mission cards
create table if not exists missions (
  id uuid primary key default gen_random_uuid(),
  icon_name text not null,
  title text not null,
  description text,
  accent_color text default '#e52e22',
  sort_order int default 0
);

-- Focus areas
create table if not exists focus_areas (
  id uuid primary key default gen_random_uuid(),
  icon_name text not null,
  title text not null,
  points text[] default '{}',
  accent_color text default '#e52e22',
  sort_order int default 0
);

-- Site content (hero text, about text, footer info, contact info etc.)
create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  value text,
  updated_at timestamptz default now(),
  unique(section, key)
);

-- Seed site_content defaults
insert into site_content (section, key, value) values
  ('hero', 'eyebrow', 'Empowering India''s Textile Industry'),
  ('hero', 'headline_line1', 'Weaving the Future of'),
  ('hero', 'headline_line2', 'Indian Textiles'),
  ('hero', 'subtitle', 'Uniting artisans, manufacturers, and policymakers to build a world-class textile ecosystem.'),
  ('hero', 'stat1_value', '7,500+'),
  ('hero', 'stat1_label', 'Members'),
  ('hero', 'stat2_value', '28+'),
  ('hero', 'stat2_label', 'States'),
  ('hero', 'stat3_value', '25+'),
  ('hero', 'stat3_label', 'Years'),
  ('hero', 'stat4_value', '₹2.4T'),
  ('hero', 'stat4_label', 'Industry Value'),
  ('about', 'badge', 'Who We Are'),
  ('about', 'heading', 'Empowering India''s Textile Ecosystem'),
  ('about', 'paragraph1', 'The Vibrant Textiles Association is a premier industry body representing the entire textile value chain — from raw fibre to finished fabric.'),
  ('about', 'paragraph2', 'We unite artisans, manufacturers, exporters, and policymakers to drive growth, innovation, and sustainability in India''s textile sector.'),
  ('contact', 'address', '123 Textile Hub, Connaught Place, New Delhi - 110001'),
  ('contact', 'email', 'info@vibranttextiles.org'),
  ('contact', 'phone', '+91 11 1234 5678'),
  ('contact', 'hours', 'Mon–Fri: 9AM–6PM')
on conflict (section, key) do nothing;

-- =============================================
-- Row Level Security: Public READ, Auth WRITE
-- =============================================
alter table members enable row level security;
alter table events enable row level security;
alter table media enable row level security;
alter table press_releases enable row level security;
alter table missions enable row level security;
alter table focus_areas enable row level security;
alter table site_content enable row level security;
alter table membership_applications enable row level security;

-- Allow anyone to read
create policy "Public read members" on members for select using (true);
create policy "Public read events" on events for select using (true);
create policy "Public read media" on media for select using (true);
create policy "Public read press" on press_releases for select using (true);
create policy "Public read missions" on missions for select using (true);
create policy "Public read focus_areas" on focus_areas for select using (true);
create policy "Public read site_content" on site_content for select using (true);
create policy "Public can insert membership apps" on membership_applications for insert with check (true);

-- Allow authenticated (admin) users to do everything
create policy "Auth all members" on members for all using (auth.role() = 'authenticated');
create policy "Auth all events" on events for all using (auth.role() = 'authenticated');
create policy "Auth all media" on media for all using (auth.role() = 'authenticated');
create policy "Auth all press" on press_releases for all using (auth.role() = 'authenticated');
create policy "Auth all missions" on missions for all using (auth.role() = 'authenticated');
create policy "Auth all focus_areas" on focus_areas for all using (auth.role() = 'authenticated');
create policy "Auth all site_content" on site_content for all using (auth.role() = 'authenticated');
create policy "Auth all membership apps" on membership_applications for all using (auth.role() = 'authenticated');

-- Storage bucket for images (run manually in Storage tab → New Bucket → 'cms-images' → Public)
-- Or run:
insert into storage.buckets (id, name, public) values ('cms-images', 'cms-images', true)
  on conflict (id) do nothing;

create policy "Public image read" on storage.objects for select using (bucket_id = 'cms-images');
create policy "Auth image upload" on storage.objects for insert with check (bucket_id = 'cms-images' and auth.role() = 'authenticated');
create policy "Auth image delete" on storage.objects for delete using (bucket_id = 'cms-images' and auth.role() = 'authenticated');
