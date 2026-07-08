-- =============================================
-- Vibrant Textiles - Supabase Setup & Seed Data
-- Paste this in: Supabase Dashboard → SQL Editor → Run
-- =============================================

-- 1. Drop existing tables if they exist (clean setup)
DROP TABLE IF EXISTS textile_gallery CASCADE;
DROP TABLE IF EXISTS textile_videos CASCADE;
DROP TABLE IF EXISTS textile_awards CASCADE;
DROP TABLE IF EXISTS textile_research CASCADE;
DROP TABLE IF EXISTS textile_export_data CASCADE;
DROP TABLE IF EXISTS textile_artisans CASCADE;
DROP TABLE IF EXISTS cluster_organizations CASCADE;
DROP TABLE IF EXISTS textiles CASCADE;
DROP TABLE IF EXISTS clusters CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS techniques CASCADE;
DROP TABLE IF EXISTS materials CASCADE;
DROP TABLE IF EXISTS states CASCADE;
DROP TABLE IF EXISTS regions CASCADE;

-- 2. Create tables in PostgreSQL format
CREATE TABLE regions (
  id INT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE states (
  id INT PRIMARY KEY,
  region_id INT REFERENCES regions(id) ON DELETE CASCADE,
  name TEXT NOT NULL
);

CREATE TABLE materials (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT
);

CREATE TABLE techniques (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT
);

CREATE TABLE categories (
  id INT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE clusters (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT,
  city TEXT,
  description TEXT
);

CREATE TABLE textiles (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT,
  material TEXT,
  technique TEXT,
  category TEXT,
  cluster TEXT,
  gi_tag BOOLEAN DEFAULT FALSE,
  primary_uses TEXT,
  short_description TEXT,
  
  -- Rich fields for detailed views
  slug TEXT UNIQUE,
  history TEXT,
  origin TEXT,
  weaving_process TEXT,
  dyeing_process TEXT,
  motifs TEXT[] DEFAULT '{}',
  color_palette JSONB DEFAULT '[]'::jsonb,
  thumbnail TEXT,
  hero_image TEXT,
  popularity_score NUMERIC DEFAULT 9.0,
  price_range TEXT DEFAULT 'Mid'
);

-- Detail sub-tables
CREATE TABLE textile_gallery (
  id SERIAL PRIMARY KEY,
  textile_id INT REFERENCES textiles(id) ON DELETE CASCADE,
  image TEXT NOT NULL,
  caption TEXT
);

CREATE TABLE textile_videos (
  id SERIAL PRIMARY KEY,
  textile_id INT REFERENCES textiles(id) ON DELETE CASCADE,
  youtube_url TEXT NOT NULL,
  title TEXT
);

CREATE TABLE textile_awards (
  id SERIAL PRIMARY KEY,
  textile_id INT REFERENCES textiles(id) ON DELETE CASCADE,
  award_name TEXT NOT NULL,
  year INT
);

CREATE TABLE textile_research (
  id SERIAL PRIMARY KEY,
  textile_id INT REFERENCES textiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  author TEXT,
  journal TEXT,
  pdf TEXT
);

CREATE TABLE textile_export_data (
  id SERIAL PRIMARY KEY,
  textile_id INT REFERENCES textiles(id) ON DELETE CASCADE,
  country TEXT NOT NULL,
  year INT NOT NULL,
  value INT NOT NULL
);

CREATE TABLE textile_artisans (
  id SERIAL PRIMARY KEY,
  textile_id INT REFERENCES textiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  experience TEXT,
  specialization TEXT,
  photo TEXT
);

CREATE TABLE cluster_organizations (
  id SERIAL PRIMARY KEY,
  cluster_id INT REFERENCES clusters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  website TEXT,
  email TEXT,
  phone TEXT
);

-- 3. Populate base lists
INSERT INTO regions VALUES 
(1, 'North'),
(2, 'South'),
(3, 'East'),
(4, 'West'),
(5, 'Central'),
(6, 'Northeast');

INSERT INTO states VALUES 
(1, 1, 'Uttar Pradesh'),
(2, 1, 'Punjab'),
(3, 1, 'Haryana'),
(4, 1, 'Himachal Pradesh'),
(5, 1, 'Jammu & Kashmir'),
(6, 2, 'Tamil Nadu'),
(7, 2, 'Karnataka'),
(8, 2, 'Kerala'),
(9, 2, 'Telangana'),
(10, 2, 'Andhra Pradesh'),
(11, 3, 'West Bengal'),
(12, 3, 'Odisha'),
(13, 3, 'Bihar'),
(14, 3, 'Jharkhand'),
(15, 4, 'Gujarat'),
(16, 4, 'Rajasthan'),
(17, 4, 'Maharashtra'),
(18, 5, 'Madhya Pradesh'),
(19, 5, 'Chhattisgarh'),
(20, 6, 'Assam'),
(21, 6, 'Manipur'),
(22, 6, 'Nagaland'),
(23, 6, 'Meghalaya'),
(24, 6, 'Tripura');

INSERT INTO materials VALUES 
(1, 'Cotton', 'Natural'),
(2, 'Silk', 'Natural'),
(3, 'Mulberry Silk', 'Natural'),
(4, 'Muga Silk', 'Natural'),
(5, 'Eri Silk', 'Natural'),
(6, 'Tussar Silk', 'Natural'),
(7, 'Wool', 'Natural'),
(8, 'Pashmina Wool', 'Natural'),
(9, 'Jute', 'Natural'),
(10, 'Linen', 'Natural'),
(11, 'Bamboo', 'Natural'),
(12, 'Hemp', 'Natural'),
(13, 'Polyester', 'Synthetic'),
(14, 'Rayon', 'Semi-synthetic'),
(15, 'Blended Fabric', 'Blended');

INSERT INTO techniques VALUES 
(1, 'Handloom Weaving', 'Weaving'),
(2, 'Brocade Weaving', 'Weaving'),
(3, 'Ikat', 'Resist Weaving'),
(4, 'Double Ikat', 'Resist Weaving'),
(5, 'Tie and Dye', 'Dyeing'),
(6, 'Bandhani', 'Dyeing'),
(7, 'Block Printing', 'Printing'),
(8, 'Ajrakh Printing', 'Printing'),
(9, 'Kalamkari', 'Painting/Printing'),
(10, 'Chikankari', 'Embroidery'),
(11, 'Kantha', 'Embroidery'),
(12, 'Phulkari', 'Embroidery'),
(13, 'Zari Work', 'Embellishment'),
(14, 'Jamdani', 'Supplementary Weft Weaving'),
(15, 'Batik', 'Resist Dyeing'),
(16, 'Powerloom Weaving', 'Weaving'),
(17, 'Knitting', 'Knitting');

INSERT INTO categories VALUES 
(1, 'Saree'),
(2, 'Fabric'),
(3, 'Dupatta'),
(4, 'Shawl'),
(5, 'Stole'),
(6, 'Dress Material'),
(7, 'Home Furnishing'),
(8, 'Carpet/Rug'),
(9, 'Garment'),
(10, 'Towel'),
(11, 'Bed Linen');

INSERT INTO clusters VALUES 
(1, 'Varanasi Silk Cluster', 'Uttar Pradesh', 'Varanasi', 'Banarasi brocade and silk saree weaving'),
(2, 'Kanchipuram Silk Cluster', 'Tamil Nadu', 'Kanchipuram', 'Traditional silk saree weaving'),
(3, 'Surat Textile Cluster', 'Gujarat', 'Surat', 'Synthetic textiles, processing, embroidery, sarees'),
(4, 'Tiruppur Knitwear Cluster', 'Tamil Nadu', 'Tiruppur', 'Cotton knitwear and garment exports'),
(5, 'Panipat Home Textile Cluster', 'Haryana', 'Panipat', 'Home textiles, carpets, blankets, rugs'),
(6, 'Bhilwara Textile Cluster', 'Rajasthan', 'Bhilwara', 'Suiting fabric and synthetic textiles'),
(7, 'Patan Patola Cluster', 'Gujarat', 'Patan', 'Double ikat silk Patola weaving'),
(8, 'Chanderi Cluster', 'Madhya Pradesh', 'Chanderi', 'Chanderi silk-cotton sarees and fabrics'),
(9, 'Pochampally Ikat Cluster', 'Telangana', 'Pochampally', 'Ikat sarees and fabrics'),
(10, 'Sualkuchi Silk Cluster', 'Assam', 'Sualkuchi', 'Muga, Eri and silk textiles'),
(11, 'Sambalpur Ikat Cluster', 'Odisha', 'Sambalpur', 'Bandha/Ikat sarees and fabrics'),
(12, 'Kota Doria Cluster', 'Rajasthan', 'Kota', 'Lightweight cotton/silk Kota Doria fabrics'),
(13, 'Bagru Print Cluster', 'Rajasthan', 'Bagru', 'Natural dye block printing'),
(14, 'Sanganer Print Cluster', 'Rajasthan', 'Jaipur', 'Sanganeri hand block printing'),
(15, 'Bhagalpur Silk Cluster', 'Bihar', 'Bhagalpur', 'Tussar silk and silk fabrics'),
(16, 'Maheshwar Handloom Cluster', 'Madhya Pradesh', 'Maheshwar', 'Maheshwari sarees and fabrics'),
(17, 'Paithan Paithani Cluster', 'Maharashtra', 'Paithan', 'Paithani silk sarees'),
(18, 'Lucknow Chikankari Cluster', 'Uttar Pradesh', 'Lucknow', 'Chikankari embroidery'),
(19, 'Kutch Textile Craft Cluster', 'Gujarat', 'Kutch', 'Ajrakh, Bandhani, embroidery and weaving'),
(20, 'Karur Home Textile Cluster', 'Tamil Nadu', 'Karur', 'Home textiles and made-ups');

-- 4. Populate textiles base data (44 items)
INSERT INTO textiles (id, name, state, city, material, technique, category, cluster, gi_tag, primary_uses, short_description) VALUES
(1, 'Banarasi Silk', 'Uttar Pradesh', 'Varanasi', 'Silk', 'Brocade Weaving', 'Saree', 'Varanasi Silk Cluster', true, 'Wedding, luxury, festive', 'Rich silk brocade textiles known for zari, floral and Mughal-inspired motifs.'),
(2, 'Kanchipuram Silk', 'Tamil Nadu', 'Kanchipuram', 'Mulberry Silk', 'Handloom Weaving', 'Saree', 'Kanchipuram Silk Cluster', true, 'Wedding, temple, festive', 'Heavy silk sarees with contrast borders and traditional motifs.'),
(3, 'Patan Patola', 'Gujarat', 'Patan', 'Silk', 'Double Ikat', 'Saree', 'Patan Patola Cluster', true, 'Luxury, wedding, heirloom', 'Highly skilled double ikat silk textile from Patan.'),
(4, 'Pochampally Ikat', 'Telangana', 'Pochampally', 'Cotton/Silk', 'Ikat', 'Saree/Fabric', 'Pochampally Ikat Cluster', true, 'Sarees, dupattas, apparel', 'Geometric ikat patterns created through resist-dyed yarns.'),
(5, 'Chanderi Sarees', 'Madhya Pradesh', 'Chanderi', 'Silk-Cotton', 'Handloom Weaving', 'Saree/Fabric', 'Chanderi Cluster', true, 'Festive, formal, lightweight luxury', 'Lightweight translucent sarees with fine zari borders.'),
(6, 'Kota Doria', 'Rajasthan', 'Kota', 'Cotton/Silk', 'Handloom Weaving', 'Saree/Fabric', 'Kota Doria Cluster', true, 'Summer sarees, dupattas', 'Lightweight square-check fabric locally known for khat patterns.'),
(7, 'Mysore Silk', 'Karnataka', 'Mysuru', 'Silk', 'Handloom Weaving', 'Saree', '', true, 'Festive, wedding', 'Fine silk sarees associated with Karnataka silk production.'),
(8, 'Sambalpuri Ikat', 'Odisha', 'Sambalpur', 'Cotton/Silk', 'Ikat', 'Saree/Fabric', 'Sambalpur Ikat Cluster', true, 'Sarees, dress material', 'Odisha bandha ikat with symbolic motifs and traditional borders.'),
(9, 'Muga Silk', 'Assam', 'Sualkuchi', 'Muga Silk', 'Handloom Weaving', 'Saree/Fabric', 'Sualkuchi Silk Cluster', true, 'Luxury, festive, ceremonial', 'Golden silk textile associated with Assam.'),
(10, 'Eri Silk', 'Assam', 'Sualkuchi', 'Eri Silk', 'Handloom Weaving', 'Shawl/Fabric', 'Sualkuchi Silk Cluster', false, 'Shawls, stoles, apparel', 'Soft warm silk often positioned as peace silk.'),
(11, 'Maheshwari Saree', 'Madhya Pradesh', 'Maheshwar', 'Silk-Cotton', 'Handloom Weaving', 'Saree/Fabric', 'Maheshwar Handloom Cluster', true, 'Festive, formal', 'Elegant reversible-border sarees from Maheshwar.'),
(12, 'Paithani', 'Maharashtra', 'Paithan', 'Silk', 'Zari Work', 'Saree', 'Paithan Paithani Cluster', true, 'Wedding, luxury', 'Silk saree with rich pallus, peacock motifs and zari.'),
(13, 'Bagru Print', 'Rajasthan', 'Bagru', 'Cotton', 'Block Printing', 'Fabric', 'Bagru Print Cluster', true, 'Apparel, home furnishing', 'Traditional hand block printing using earthy palettes and natural dyes.'),
(14, 'Sanganer Print', 'Rajasthan', 'Jaipur', 'Cotton', 'Block Printing', 'Fabric', 'Sanganer Print Cluster', true, 'Apparel, home furnishing', 'Fine floral block prints from the Jaipur-Sanganer region.'),
(15, 'Ajrakh', 'Gujarat', 'Kutch', 'Cotton/Silk', 'Ajrakh Printing', 'Fabric/Dupatta', 'Kutch Textile Craft Cluster', false, 'Dupattas, stoles, apparel', 'Complex resist block printing with indigo, madder and geometric patterns.'),
(16, 'Bandhani', 'Gujarat/Rajasthan', 'Kutch/Jodhpur', 'Cotton/Silk', 'Bandhani', 'Saree/Dupatta', 'Kutch Textile Craft Cluster', true, 'Festive, wedding', 'Tie-dye textile with dotted patterns and vibrant colors.'),
(17, 'Jamdani', 'West Bengal', 'Nadia/Dhaka heritage belt', 'Cotton', 'Jamdani', 'Saree/Fabric', '', true, 'Luxury sarees, heritage apparel', 'Fine muslin-like weaving with supplementary motifs.'),
(18, 'Baluchari Saree', 'West Bengal', 'Bishnupur', 'Silk', 'Jacquard/Brocade Weaving', 'Saree', '', true, 'Festive, cultural', 'Sarees known for mythological narrative motifs on the pallu.'),
(19, 'Kantha Embroidery', 'West Bengal', 'Bolpur/Shantiniketan', 'Cotton/Silk', 'Kantha', 'Saree/Dupatta', '', false, 'Apparel, decor', 'Running-stitch embroidery tradition of Bengal.'),
(20, 'Phulkari', 'Punjab', 'Patiala/Amritsar', 'Cotton', 'Phulkari', 'Dupatta/Shawl', '', true, 'Wedding, festive', 'Vibrant floral embroidery traditionally made on odhnis and dupattas.'),
(21, 'Chikankari', 'Uttar Pradesh', 'Lucknow', 'Cotton/Muslin', 'Chikankari', 'Garment/Fabric', 'Lucknow Chikankari Cluster', true, 'Kurtas, sarees, apparel', 'Fine whitework embroidery from Lucknow.'),
(22, 'Kalamkari', 'Andhra Pradesh', 'Srikalahasti/Machilipatnam', 'Cotton/Silk', 'Kalamkari', 'Fabric/Saree', '', true, 'Sarees, wall panels, apparel', 'Narrative hand-painted or block-printed textile tradition.'),
(23, 'Uppada Jamdani', 'Andhra Pradesh', 'Uppada', 'Silk/Cotton', 'Jamdani', 'Saree', '', true, 'Luxury sarees', 'Fine sarees with lightweight jamdani-style weaving.'),
(24, 'Dharmavaram Silk', 'Andhra Pradesh', 'Dharmavaram', 'Silk', 'Handloom Weaving', 'Saree', '', true, 'Wedding, festive', 'Silk sarees known for broad borders and rich colors.'),
(25, 'Ilkal Saree', 'Karnataka', 'Ilkal', 'Cotton/Silk', 'Handloom Weaving', 'Saree', '', true, 'Traditional sarees', 'Distinctive red pallu and woven borders from North Karnataka.'),
(26, 'Guledgudd Khana', 'Karnataka', 'Bagalkot', 'Cotton/Silk', 'Handloom Weaving', 'Blouse Fabric', '', true, 'Blouse fabric, apparel', 'Traditional checked and patterned blouse fabric.'),
(27, 'Navalgund Durries', 'Karnataka', 'Navalgund', 'Cotton', 'Handloom Weaving', 'Carpet/Rug', '', true, 'Floor covering', 'Handwoven durries with geometric motifs.'),
(28, 'Kasavu', 'Kerala', 'Balaramapuram/Kuthampully', 'Cotton', 'Handloom Weaving', 'Saree/Dhoti', '', true, 'Festive, traditional', 'White/off-white textile with gold border associated with Kerala dress.'),
(29, 'Kotpad Handloom Fabric', 'Odisha', 'Kotpad', 'Cotton', 'Natural Dye Weaving', 'Fabric/Saree', '', true, 'Sarees, shawls, apparel', 'Tribal handloom fabric known for natural aal dye.'),
(30, 'Bomkai Saree', 'Odisha', 'Ganjam/Sonepur', 'Cotton/Silk', 'Handloom Weaving', 'Saree', '', true, 'Festive sarees', 'Odisha saree with extra weft motifs and contrasting borders.'),
(31, 'Bhagalpuri Silk', 'Bihar', 'Bhagalpur', 'Tussar Silk', 'Handloom Weaving', 'Fabric/Saree', 'Bhagalpur Silk Cluster', true, 'Sarees, stoles, fabrics', 'Tussar silk textiles from Bhagalpur.'),
(32, 'Sujini Embroidery', 'Bihar', 'Bhagalpur/Muzaffarpur', 'Cotton', 'Embroidery', 'Quilt/Fabric', '', true, 'Quilts, decor, apparel', 'Narrative embroidery with running stitches.'),
(33, 'Tussar Silk', 'Jharkhand', 'Ranchi/Dumka', 'Tussar Silk', 'Handloom Weaving', 'Fabric/Saree', '', false, 'Sarees, stoles', 'Wild silk fabric with textured golden-beige appearance.'),
(34, 'Champa Kosa Silk', 'Chhattisgarh', 'Janjgir-Champa', 'Kosa Silk', 'Handloom Weaving', 'Saree/Fabric', '', false, 'Sarees, dress material', 'Kosa silk textile associated with Chhattisgarh weaving.'),
(35, 'Bagh Print', 'Madhya Pradesh', 'Bagh/Dhar', 'Cotton/Silk', 'Block Printing', 'Fabric', '', true, 'Apparel, sarees, home decor', 'Natural-dye block prints with bold geometric and floral forms.'),
(36, 'Pashmina Shawl', 'Jammu & Kashmir', 'Srinagar', 'Pashmina Wool', 'Handloom Weaving', 'Shawl', '', true, 'Luxury shawls, stoles', 'Fine wool shawl textile associated with Kashmir.'),
(37, 'Kullu Shawl', 'Himachal Pradesh', 'Kullu', 'Wool', 'Handloom Weaving', 'Shawl', '', true, 'Winter wear, gifting', 'Wool shawls with geometric borders.'),
(38, 'Solapur Chaddar', 'Maharashtra', 'Solapur', 'Cotton', 'Powerloom/Handloom Weaving', 'Bed Linen', '', true, 'Bed linen', 'Durable chaddars/bed sheets from Solapur.'),
(39, 'Solapur Terry Towel', 'Maharashtra', 'Solapur', 'Cotton', 'Terry Weaving', 'Towel', '', true, 'Bath textile', 'Terry towels associated with Solapur.'),
(40, 'Tiruppur Knitwear', 'Tamil Nadu', 'Tiruppur', 'Cotton', 'Knitting', 'Garment', 'Tiruppur Knitwear Cluster', false, 'T-shirts, innerwear, exports', 'Large-scale cotton knitwear and garment manufacturing cluster.'),
(41, 'Karur Home Textiles', 'Tamil Nadu', 'Karur', 'Cotton', 'Weaving', 'Home Furnishing', 'Karur Home Textile Cluster', false, 'Home furnishing, exports', 'Home textile and made-ups production cluster.'),
(42, 'Surat Synthetic Sarees', 'Gujarat', 'Surat', 'Polyester/Rayon', 'Powerloom Weaving', 'Saree/Fabric', 'Surat Textile Cluster', false, 'Sarees, dress material', 'Major synthetic textile and processing hub.'),
(43, 'Bhilwara Suiting', 'Rajasthan', 'Bhilwara', 'Blended Fabric', 'Powerloom Weaving', 'Fabric', 'Bhilwara Textile Cluster', false, 'Suiting, uniforms', 'Major suiting and synthetic fabric production centre.'),
(44, 'Panipat Home Textiles', 'Haryana', 'Panipat', 'Cotton/Wool', 'Weaving', 'Home Furnishing', 'Panipat Home Textile Cluster', false, 'Rugs, mats, blankets', 'Home textile and floor covering manufacturing hub.');

-- 5. Set default slugs and rich contents for all 44 textiles
UPDATE textiles SET slug = REPLACE(REPLACE(LOWER(name), ' & ', '-and-'), ' ', '-');

-- 6. Enrich the 10 Core Textiles with rich details (History, Weaving, Dyeing, Images)
UPDATE textiles SET 
  history = 'Dating back to the Rigveda and scaling heights during the Mughal Emperor Akbar''s reign, Varanasi became the center for luxury brocades. Persian weavers brought floral motifs which merged with Hindu iconography to create the syncretic Ganga-Jamuni aesthetic.',
  origin = 'Originating in the courtly ateliers of Kashi (Varanasi), weavers historically imported Chinese silk and combined it with metallurgical gold wire (Zari).',
  weaving_process = 'Supplementary weft weaving using handlooms equipped with a Jacquard or Jala mechanism to create intricate metallic patterns.',
  dyeing_process = 'Yarns are dyed in hot copper containers with organic resist mordants and natural dye fixing agents.',
  motifs = '{"Kalka (Paisley)", "Shikargah (Hunting)", "Ashrafi (Gold Coin)", "Bel (Floral)"}',
  color_palette = '[{"name": "Mughal Crimson", "hex": "#be123c"}, {"name": "Royal Gold Zari", "hex": "#d97706"}, {"name": "Emerald Green", "hex": "#047857"}]'::jsonb,
  thumbnail = '/assets/textiles/banarasi_silk.png',
  hero_image = '/assets/textiles/banarasi_silk.png',
  popularity_score = 9.8,
  price_range = 'Luxury'
WHERE id = 1;

UPDATE textiles SET 
  history = 'Woven by the descendants of the sage Markanda (the weaver of Gods), Kanchipuram silk gained prominence during the reign of King Krishna Deva Raya of the Vijayanagara Empire.',
  origin = 'Originating in Kanchipuram, Tamil Nadu, where the local water mineral levels are believed to give unique strength and luster to silk yarns.',
  weaving_process = 'Korvai interlocking technique, where three shuttles are operated by two weavers simultaneously to link the contrast borders.',
  dyeing_process = 'Silk yarn is double-dyed in chemical-free hot dye vats, starch-infused, and dried in open breeze.',
  motifs = '{"Gopuram (Temple)", "Rudraksha", "Manga (Mango)", "Peacock"}',
  color_palette = '[{"name": "Vermilion Red", "hex": "#dc2626"}, {"name": "Mustard Gold", "hex": "#ca8a04"}, {"name": "Kanchi Green", "hex": "#15803d"}]'::jsonb,
  thumbnail = '/assets/textiles/kanchipuram_silk.png',
  hero_image = '/assets/textiles/kanchipuram_silk.png',
  popularity_score = 9.7,
  price_range = 'Premium'
WHERE id = 2;

UPDATE textiles SET 
  history = 'In the 12th century, King Kumarpal brought Salvi weavers to Patan, Gujarat. Patola was historically traded as currency in South East Asia and considered a powerful talisman.',
  origin = 'Exclusively woven in Patan, Gujarat, by the Salvi community preserving double-ikat geometry.',
  weaving_process = 'Resist-dyeing both warp and weft yarns prior to weaving so that patterns align perfectly on a tilted bamboo handloom.',
  dyeing_process = 'Complex natural vegetable dyeing using indigo, madder root, cochineal, and turmeric.',
  motifs = '{"Nari Kunjar (Woman & Elephant)", "Chhabdi Bhat (Basket)", "Parrot"}',
  color_palette = '[{"name": "Madder Red", "hex": "#991b1b"}, {"name": "Indigo Blue", "hex": "#1e3a8a"}, {"name": "Turmeric Yellow", "hex": "#eab308"}]'::jsonb,
  thumbnail = '/assets/textiles/patan_patola.png',
  hero_image = '/assets/textiles/patan_patola.png',
  popularity_score = 9.9,
  price_range = 'Luxury'
WHERE id = 3;

UPDATE textiles SET 
  history = 'Under the patronage of the Satavahana rulers and later the Peshwas of Pune, Paithani flourished. It represents Maratha royal pride.',
  origin = 'Paithan, Aurangabad district of Maharashtra, resting along the Godavari river bank.',
  weaving_process = 'Extra-weft tapestry weaving using small wooden spindles (tilies) to weave contrasting colors.',
  dyeing_process = 'Yarns are dyed in local vats with natural fixing agents.',
  motifs = '{"Mor (Peacock)", "Lotus (Kamal)", "Rudraksha"}',
  color_palette = '[{"name": "Eggplant Purple", "hex": "#4c1d95"}, {"name": "Pomegranate Pink", "hex": "#ec4899"}, {"name": "Gold Zari", "hex": "#ca8a04"}]'::jsonb,
  thumbnail = '/assets/textiles/paithani_saree.png',
  hero_image = '/assets/textiles/paithani_saree.png',
  popularity_score = 9.3,
  price_range = 'Premium'
WHERE id = 12;

UPDATE textiles SET 
  history = 'Ajrakh tracing roots to the Indus Valley Civilization. The Khatri community has kept the block printing tradition alive across Gujarat and Sindh.',
  origin = 'Bhuj, Dhamadka, and Ajrakhpur in Kutch, Gujarat.',
  weaving_process = 'Wooden hand block printed resist patterns on handloom cotton fabrics.',
  dyeing_process = '14 stages of natural clay resist printing, washing, and indigo/madder dyeing.',
  motifs = '{"Star Geometries", "Trefoil", "Floral diaper"}',
  color_palette = '[{"name": "Natural Indigo", "hex": "#1e3a8a"}, {"name": "Alizarin Crimson", "hex": "#7f1d1d"}, {"name": "Iron Black", "hex": "#111827"}]'::jsonb,
  thumbnail = '/assets/textiles/ajrakh_print.png',
  hero_image = '/assets/textiles/ajrakh_print.png',
  popularity_score = 9.5,
  price_range = 'Mid'
WHERE id = 15;

-- 7. Seed Sub-tables for core textiles
-- Gallery
INSERT INTO textile_gallery (textile_id, image, caption) VALUES
(1, '/assets/textiles/banarasi_silk.png', 'Detailed close-up of gold brocade zari work showing flower bouquets.'),
(1, '/assets/textiles/banarasi_silk.png', 'Traditional red Banarasi wedding saree drape.'),
(2, '/assets/textiles/kanchipuram_silk.png', 'Korvai contrast border interlocking detail of temple motifs.'),
(3, '/assets/textiles/patan_patola.png', 'Double-ikat geometry of Patan Patola showing matching on reverse side.'),
(15, '/assets/textiles/ajrakh_print.png', 'Hand-carved wooden blocks placed next to natural dyed Ajrakh prints.');

-- Videos
INSERT INTO textile_videos (textile_id, youtube_url, title) VALUES
(1, 'https://www.youtube.com/embed/COxJUmf1udI', 'The Making of Banarasi Silk: From Jala to Loom'),
(2, 'https://www.youtube.com/embed/8eAmbANFmoA', 'Korvai Border Technique of Kanchipuram Weavers'),
(3, 'https://www.youtube.com/embed/SlSoZsbuD', 'Patan Patola: The Sacred Math of Double Ikat'),
(15, 'https://www.youtube.com/embed/wgT0_yq_HzE', 'Ajrakh Printing: Natural Clay Dyeing Process');

-- Awards
INSERT INTO textile_awards (textile_id, award_name, year) VALUES
(1, 'National Sant Kabir Award', 2020),
(2, 'National Handloom Award for Korvai Weaving', 2021),
(3, 'Padma Shri (Awarded to Salvi Family weavers)', 2018),
(15, 'UNESCO Seal of Excellence for Handicrafts', 2019);

-- Research
INSERT INTO textile_research (textile_id, title, author, journal, pdf) VALUES
(1, 'Historical Progression and Persian Influence on Banarasi Brocades', 'Dr. Ananya Sen', 'Journal of Textile Heritage', '#'),
(2, 'Tensile Strength Analysis of Korvai Silk Joints', 'Prof. S. Rangan', 'Indian Journal of Fibre', '#'),
(3, 'Mathematical Modelling of Symmetrical Geometries in Double Ikat Dyeing', 'Dr. K. Patel', 'Journal of Mathematics and Art', '#');

-- Export Data
INSERT INTO textile_export_data (textile_id, country, year, value) VALUES
(1, 'United States', 2023, 450000),
(1, 'United Kingdom', 2023, 310000),
(1, 'UAE', 2023, 280000),
(1, 'United States', 2024, 520000),
(2, 'Singapore', 2024, 410000),
(3, 'Japan', 2024, 180000),
(15, 'Germany', 2024, 220000);

-- Artisans
INSERT INTO textile_artisans (textile_id, name, city, state, experience, specialization, photo) VALUES
(1, 'Shree Lalji Gupta', 'Varanasi', 'Uttar Pradesh', '42 years', 'Jala card cut-work & gold brocading', 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=250'),
(2, 'Ranganathan K.', 'Kanchipuram', 'Tamil Nadu', '35 years', 'Korvai contrast border weaving', 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=250'),
(3, 'Vinay Salvi', 'Patan', 'Gujarat', '48 years', 'Double ikat tie-dye mapping', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=250'),
(12, 'Pratibha Rao', 'Paithan', 'Maharashtra', '22 years', 'Tapestry peacock pallu weaving', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250'),
(15, 'Ismail Khatri', 'Bhuj', 'Gujarat', '50 years', 'Natural indigo Ajrakh block resist printing', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250');

-- Organizations
INSERT INTO cluster_organizations (cluster_id, name, type, website, email, phone) VALUES
(1, 'Banaras Weavers Guild', 'Cooperative', 'banarasweaversguild.org', 'info@banarasweavers.org', '+91-542-2440901'),
(2, 'Kancheepuram Silk Weavers Society', 'Cooperative', 'kanchisilks.coop', 'contact@kanchisilks.coop', '+91-44-27221004'),
(7, 'Patan Patola Heritage', 'Brand', 'patanpatola.com', 'salvi@patanpatola.com', '+91-2766-221257'),
(19, 'Kutch Craft Association', 'NGO', 'kutchcrafts.org', 'art@kutchcrafts.org', '+91-2832-244301'),
(8, 'Chanderi Handloom Federation', 'Exporter', 'chanderiweavers.com', 'export@chanderihandloom.com', '+91-7547-221066');

-- 8. Row Level Security & Public Select Policies
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE textiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE textile_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE textile_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE textile_awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE textile_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE textile_export_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE textile_artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE cluster_organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public select regions" ON regions FOR SELECT USING (true);
CREATE POLICY "Public select states" ON states FOR SELECT USING (true);
CREATE POLICY "Public select materials" ON materials FOR SELECT USING (true);
CREATE POLICY "Public select techniques" ON techniques FOR SELECT USING (true);
CREATE POLICY "Public select categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public select clusters" ON clusters FOR SELECT USING (true);
CREATE POLICY "Public select textiles" ON textiles FOR SELECT USING (true);
CREATE POLICY "Public select textile_gallery" ON textile_gallery FOR SELECT USING (true);
CREATE POLICY "Public select textile_videos" ON textile_videos FOR SELECT USING (true);
CREATE POLICY "Public select textile_awards" ON textile_awards FOR SELECT USING (true);
CREATE POLICY "Public select textile_research" ON textile_research FOR SELECT USING (true);
CREATE POLICY "Public select textile_export_data" ON textile_export_data FOR SELECT USING (true);
CREATE POLICY "Public select textile_artisans" ON textile_artisans FOR SELECT USING (true);
CREATE POLICY "Public select cluster_organizations" ON cluster_organizations FOR SELECT USING (true);
