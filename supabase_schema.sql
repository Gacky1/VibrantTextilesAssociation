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
  category text default 'board', -- 'board', 'executive'
  expertise text[] default '{}',
  icon text,
  gradient text,
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

-- =============================================
-- SEED DATA FOR DEMONSTRATION
-- =============================================

-- 1. Site Content
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
  ('contact', 'hours', 'Mon–Fri: 9AM–6PM'),

  ('members', 'page_eyebrow', 'Our Leadership'),
  ('members', 'page_title', 'Our Members'),
  ('members', 'page_subtitle', 'Meet the dedicated team driving India''s textile sector forward'),
  ('members', 'board_badge', 'BOARD OF DIRECTORS'),
  ('members', 'board_heading', 'Leadership Team'),
  ('members', 'exec_badge', 'EXECUTIVE TEAM'),
  ('members', 'exec_heading', 'Department Heads')
on conflict (section, key) do update set value = excluded.value;

-- Clean existing demo lists (Optional: uncomment to reset tables completely )
-- truncate members, events, media, press_releases, missions, focus_areas restart identity cascade;

-- 2. Board of Directors (Members)
insert into members (name, designation, category, bio, image_url, expertise, sort_order) values
('Dr. Rajesh Kumar', 'Chairperson', 'board', '30+ years in textile industry, Former Director of National Institute of Fashion Technology', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400', '{"Policy Making", "Industry Relations", "Strategic Planning"}', 1),
('Mrs. Priya Sharma', 'Vice Chairperson', 'board', 'Renowned textile designer and entrepreneur with international recognition', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', '{"Design Innovation", "Export Management", "Brand Development"}', 2),
('Mr. Anil Verma', 'Secretary', 'board', 'Legal expert specializing in textile trade and compliance', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', '{"Legal Affairs", "Compliance", "Documentation"}', 3),
('Ms. Kavita Reddy', 'Treasurer', 'board', 'Chartered Accountant with expertise in textile sector finance', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', '{"Financial Planning", "Audit", "Fund Management"}', 4);

-- 3. Executive Team (Members)
insert into members (name, designation, category, icon, gradient, sort_order) values
('Mr. Suresh Patel', 'Handloom Development Head', 'executive', 'faHandshake', 'from-purple-500 to-purple-600', 5),
('Dr. Meena Singh', 'Research & Innovation Lead', 'executive', 'faFlask', 'from-blue-500 to-blue-600', 6),
('Mr. Vikram Joshi', 'Skill Development Coordinator', 'executive', 'faGraduationCap', 'from-green-500 to-green-600', 7),
('Ms. Anjali Desai', 'Marketing & Communications', 'executive', 'faBullhorn', 'from-pink-500 to-pink-600', 8),
('Mr. Ramesh Gupta', 'Industry Liaison Officer', 'executive', 'faUsers', 'from-cyan-500 to-cyan-600', 9),
('Ms. Deepa Nair', 'Sustainability Advisor', 'executive', 'faLeaf', 'from-emerald-500 to-emerald-600', 10);

-- 4. Missions
insert into missions (icon_name, title, description, accent_color, sort_order) values
('faHandshake', 'Foster Collaboration', 'Building robust networks across the entire textile value chain.', '#4f46e5', 1),
('faLeaf', 'Drive Sustainability', 'Promoting eco-friendly practices and circular economy in textiles.', '#10b981', 2),
('faGlobe', 'Global Competitiveness', 'Enhancing the global footprint and export potential of Indian textiles.', '#e52e22', 3);

-- 5. Focus Areas
insert into focus_areas (icon_name, title, points, accent_color, sort_order) values
('faBullseye', 'Policy Advocacy', '{"Tax compliance guidelines", "Export incentives framework", "Labor law recommendations"}', '#3b82f6', 1),
('faLightbulb', 'Innovation & R&D', '{"Smart textiles research", "Efficient manufacturing processes", "Sustainable material development"}', '#8b5cf6', 2),
('faGraduationCap', 'Skill Development', '{"Artisan training workshops", "Technical certification courses", "Leadership seminars"}', '#f59e0b', 3);

-- 6. Events
insert into events (title, date, location, type, description, image_url, is_upcoming) values
('Global Textile Summit 2026', 'October 15-18, 2026', 'Pragati Maidan, New Delhi', 'Conference', 'Annual gathering of international textile leaders.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', true),
('Sustainable Weaving Workshop', 'July 22, 2026', 'Virtual / Online', 'Workshop', 'Learn modern sustainable practices for handloom weavers.', 'https://images.unsplash.com/photo-1449247709967-d4461a6a4103?w=800', true),
('Textile Export Expo', 'May 10-12, 2026', 'Mumbai Exhibition Centre', 'Exhibition', 'Showcasing the finest Indian textiles to global buyers.', 'https://images.unsplash.com/photo-1577732298642-1e9de4fb0ed9?w=800', false);

-- 7. Press Releases
insert into press_releases (title, date, category) values
('Vibrant Textiles Association Announces New Sustainability Guidelines', 'March 20, 2026', 'Policy'),
('Record Growth in Indian Handloom Exports for Q1 2026', 'April 05, 2026', 'Market Report'),
('Partnership with Global Fashion Council Finalized', 'February 10, 2026', 'Partnership');

-- 8. Media Gallery
insert into media (title, image_url, category) values
('Annual Gala 2025', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', 'Events'),
('Artisan Workshop', 'https://images.unsplash.com/photo-1605001011155-2bee68b8e05d?w=800', 'Training'),
('New Policy Signing', 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=800', 'Official');

