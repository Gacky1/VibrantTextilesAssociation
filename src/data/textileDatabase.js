import { supabase } from '../lib/supabase';

// 1. Static Regions (Preserved for synchronous map rendering and fallbacks)
export const regions = [
  { id: 1, name: "North", description: "Home to intricate brocades and winter woolen heritage, spanning the plains of UP and Himalayan hills.", map_image: "north_region.svg" },
  { id: 2, name: "South", description: "Renowned for heavy silk sarees, temple-inspired borders, and single ikat weaving styles.", map_image: "south_region.svg" },
  { id: 3, name: "East", description: "Known for tribal handlooms, wild golden silks, and double-sided Baluchari storytelling weaves.", map_image: "east_region.svg" },
  { id: 4, name: "West", description: "Origin of vibrant tie-dyes, geometric double ikats, and block prints utilizing natural soils.", map_image: "west_region.svg" },
  { id: 5, name: "Central", description: "Celebrated for lightweight sheer weaves combining cotton and silk, adorned with royal motifs.", map_image: "central_region.svg" },
  { id: 6, name: "Northeast", description: "Rich with bamboo fibers, peace silk (Eri), tribal wraps, and vibrant handloom identities.", map_image: "northeast_region.svg" }
];

// 2. Static States
export const states = [
  { id: 1, region_id: 1, name: "Uttar Pradesh", capital: "Lucknow" },
  { id: 2, region_id: 2, name: "Tamil Nadu", capital: "Chennai" },
  { id: 3, region_id: 4, name: "Gujarat", capital: "Gandhinagar" },
  { id: 4, region_id: 4, name: "Maharashtra", capital: "Mumbai" },
  { id: 5, region_id: 5, name: "Madhya Pradesh", capital: "Bhopal" },
  { id: 6, region_id: 2, name: "Andhra Pradesh", capital: "Amaravati" },
  { id: 7, region_id: 3, name: "Odisha", capital: "Bhubaneswar" },
  { id: 8, region_id: 2, name: "Kerala", capital: "Trivandrum" },
  { id: 9, region_id: 2, name: "Telangana", capital: "Hyderabad" },
  { id: 10, region_id: 1, name: "Punjab", capital: "Chandigarh" },
  { id: 11, region_id: 1, name: "Haryana", capital: "Chandigarh" },
  { id: 12, region_id: 1, name: "Himachal Pradesh", capital: "Shimla" },
  { id: 13, region_id: 1, name: "Jammu & Kashmir", capital: "Srinagar" },
  { id: 14, region_id: 3, name: "West Bengal", capital: "Kolkata" },
  { id: 15, region_id: 3, name: "Bihar", capital: "Patna" },
  { id: 16, region_id: 3, name: "Jharkhand", capital: "Ranchi" },
  { id: 17, region_id: 5, name: "Chhattisgarh", capital: "Raipur" },
  { id: 18, region_id: 6, name: "Assam", capital: "Dispur" },
  { id: 19, region_id: 6, name: "Manipur", capital: "Imphal" },
  { id: 20, region_id: 6, name: "Nagaland", capital: "Kohima" },
  { id: 21, region_id: 6, name: "Meghalaya", capital: "Shillong" },
  { id: 22, region_id: 6, name: "Tripura", capital: "Agartala" },
  { id: 23, region_id: 2, name: "Karnataka", capital: "Bengaluru" },
  { id: 24, region_id: 4, name: "Rajasthan", capital: "Jaipur" }
];

// 3. Government Welfare Schemes
export const schemes = [
  { id: 1, name: "National Handloom Development Programme (NHDP)", description: "Provides financial assistance for loom upgrades, raw materials, and block marketing.", website: "handlooms.nic.in" },
  { id: 2, name: "Yarn Supply Scheme (YSS)", description: "Supplies high-quality silk and cotton yarns at subsidized rates directly to weaver cooperatives.", website: "nhdc.org.in" },
  { id: 3, name: "Mudra Scheme for Handloom Weavers", description: "Offers concessional credit and low-interest loans up to ₹5 Lakhs for working capital.", website: "mudra.org.in" }
];

// Helper for dynamic local handloom image mappings
const getLocalImages = (name, material, thumbnailInDb, heroInDb) => {
  if (thumbnailInDb && thumbnailInDb.startsWith('/assets/')) {
    return {
      thumbnail: thumbnailInDb,
      hero_image: heroInDb || thumbnailInDb
    };
  }

  let img = '/assets/textiles/banarasi_silk.png';
  const lowerName = (name || '').toLowerCase();
  const lowerMat = (material || '').toLowerCase();

  if (lowerName.includes('banarasi')) {
    img = '/assets/textiles/banarasi_silk.png';
  } else if (lowerName.includes('kanchipuram')) {
    img = '/assets/textiles/kanchipuram_silk.png';
  } else if (lowerName.includes('patola') || lowerName.includes('patan')) {
    img = '/assets/textiles/patan_patola.png';
  } else if (lowerName.includes('paithani')) {
    img = '/assets/textiles/paithani_saree.png';
  } else if (lowerName.includes('ajrakh')) {
    img = '/assets/textiles/ajrakh_print.png';
  } else if (lowerName.includes('chanderi')) {
    img = '/assets/textiles/chanderi_saree.png';
  } else if (lowerName.includes('maheshwari') || lowerName.includes('maheshwar')) {
    img = '/assets/textiles/maheshwari_handloom.png';
  } else if (lowerName.includes('kalamkari')) {
    img = '/assets/textiles/kalamkari_fabric.png';
  } else if (lowerName.includes('sambalpuri') || lowerName.includes('pochampally') || lowerName.includes('ikat')) {
    img = '/assets/textiles/sambalpuri_ikat.png';
  } else if (lowerMat.includes('silk')) {
    img = '/assets/textiles/kanchipuram_silk.png';
  } else if (lowerMat.includes('cotton')) {
    img = '/assets/textiles/ajrakh_print.png';
  }

  return {
    thumbnail: img,
    hero_image: img
  };
};

// 4. Async Fetch all textiles
export const getAllTextiles = async () => {
  try {
    // Query textiles from Supabase
    const { data: textiles, error: tErr } = await supabase.from('textiles').select('*').order('id');
    if (tErr) throw tErr;

    // Map region names to textiles
    return textiles.map(t => {
      // Find state and region
      const stateObj = states.find(s => s.name === t.state);
      const regionObj = regions.find(r => r.id === stateObj?.region_id);
      const localImgs = getLocalImages(t.name, t.material, t.thumbnail, t.hero_image);
      
      return {
        ...t,
        regionName: regionObj?.name || 'Other',
        stateName: t.state,
        cityName: t.city,
        materialName: t.material,
        techniqueName: t.technique,
        categoryName: t.category,
        gi_tag: !!t.gi_tag,
        popularity_score: t.popularity_score || 8.5,
        price_range: t.price_range || 'Mid',
        thumbnail: localImgs.thumbnail
      };
    });
  } catch (err) {
    console.error("Error in getAllTextiles:", err);
    return [];
  }
};

// 5. Async Fetch a single textile detail by slug
export const getTextileBySlug = async (slug) => {
  try {
    const { data: tList, error: tErr } = await supabase.from('textiles').select('*').eq('slug', slug);
    if (tErr) throw tErr;
    if (!tList || tList.length === 0) return null;
    const t = tList[0];

    // Find state and region
    const stateObj = states.find(s => s.name === t.state);
    const regionObj = regions.find(r => r.id === stateObj?.region_id);

    // Fetch related details from sub-tables
    const { data: gallery } = await supabase.from('textile_gallery').select('*').eq('textile_id', t.id);
    const { data: videos } = await supabase.from('textile_videos').select('*').eq('textile_id', t.id);
    const { data: awards } = await supabase.from('textile_awards').select('*').eq('textile_id', t.id);
    const { data: research } = await supabase.from('textile_research').select('*').eq('textile_id', t.id);
    const { data: exportData } = await supabase.from('textile_export_data').select('*').eq('textile_id', t.id);
    const { data: artisans } = await supabase.from('textile_artisans').select('*').eq('textile_id', t.id);
    
    // Fetch cluster details
    let clusterObj = null;
    let orgsObj = [];
    if (t.cluster) {
      const { data: clusters } = await supabase.from('clusters').select('*').eq('name', t.cluster);
      if (clusters && clusters.length > 0) {
        clusterObj = clusters[0];
        const { data: orgs } = await supabase.from('cluster_organizations').select('*').eq('cluster_id', clusterObj.id);
        orgsObj = orgs || [];
      }
    }

    // Set up high-quality fallbacks for rich details if missing in DB
    const motifs = (t.motifs && t.motifs.length > 0) ? t.motifs : ['Flower Bouquet', 'Lotus', 'Paisley', 'Geometry'];
    const color_palette = (t.color_palette && t.color_palette.length > 0) ? t.color_palette : [
      { name: 'Traditional Crimson', hex: '#be123c' },
      { name: 'Zari Amber', hex: '#ca8a04' },
      { name: 'Indigo Sapphire', hex: '#1e3a8a' },
      { name: 'Kora Ivory', hex: '#fafaf9' }
    ];
    const history = t.history || `${t.name} is a renowned traditional handloom textile with centuries of rich cultural history. It represents the pinnacle of craftsmanship in ${t.city || t.state}.`;
    const origin = t.origin || `Historically crafted in the royal weaving workshops of ${t.city}, ${t.state}, under regional patronages.`;
    const weaving_process = t.weaving_process || `Handwoven on traditional pit looms using supplementary weft techniques.`;
    const dyeing_process = t.dyeing_process || `Yarns are pre-treated and vat dyed using mineral and natural mordants.`;
    const localImgs = getLocalImages(t.name, t.material, t.thumbnail, t.hero_image);
    const thumbnail = localImgs.thumbnail;
    const hero_image = localImgs.hero_image;
    
    const finalGallery = (gallery && gallery.length > 0) ? gallery : [
      { id: 1, image: thumbnail, caption: `${t.name} close-up fabric texture.` },
      { id: 2, image: hero_image, caption: `Finished ${t.name} handloom drape.` }
    ];

    // Build the coordinates map info
    const cityCoord = {
      district: t.city || 'District',
      latitude: t.id === 1 ? 25.3176 : t.id === 2 ? 12.8387 : 20.0,
      longitude: t.id === 1 ? 82.9739 : t.id === 2 ? 79.7016 : 78.0
    };

    return {
      ...t,
      regionName: regionObj?.name || 'Other',
      state: stateObj,
      city: cityCoord,
      material: { name: t.material },
      technique: { name: t.technique },
      categoryName: t.category,
      cluster: clusterObj,
      giTagDetails: t.gi_tag ? { registration_number: 'GI-' + t.id, year: 2020, authority: 'GI Registry of India' } : null,
      gallery: finalGallery,
      videos: videos || [],
      awards: awards || [],
      research: research || [],
      exportData: exportData || [],
      artisans: artisans || [],
      organizations: orgsObj,
      history,
      origin,
      weaving_process,
      dyeing_process,
      motifs,
      color_palette,
      thumbnail,
      hero_image
    };
  } catch (err) {
    console.error("Error in getTextileBySlug:", err);
    return null;
  }
};

// 6. Async Fetch related textiles
export const getRelatedTextiles = async (textileId, limit = 3) => {
  try {
    const { data: textiles, error } = await supabase.from('textiles').select('*');
    if (error) throw error;

    const current = textiles.find(t => t.id === textileId);
    if (!current) return [];

    // Find textiles with similar state or material, excluding itself
    const list = textiles.filter(t => t.id !== textileId && (t.state === current.state || t.material === current.material));
    const results = list.length >= limit ? list : [...list, ...textiles.filter(t => t.id !== textileId && !list.find(l => l.id === t.id))];

    return results.slice(0, limit).map(t => ({
      ...t,
      stateName: t.state,
      materialName: t.material,
      techniqueName: t.technique,
      thumbnail: t.thumbnail || 'https://images.unsplash.com/photo-1582142401825-783286395b4f?q=80&w=600&auto=format&fit=crop'
    }));
  } catch (err) {
    console.error("Error in getRelatedTextiles:", err);
    return [];
  }
};
