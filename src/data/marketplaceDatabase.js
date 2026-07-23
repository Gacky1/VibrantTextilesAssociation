import { supabase } from '../lib/supabase';
import { fail, ok } from './databaseResult';
import { previewMarketplaceCategories, previewMarketplaceProducts, previewMarketplaceSupplier } from './marketplacePreviewData';

export const isMarketplaceSchemaReady = import.meta.env.VITE_MARKETPLACE_SCHEMA_READY === 'true';

export function getProductCluster(product) {
  const city = (product.origin_city || product.industry_members?.city || '').toLowerCase();
  const state = (product.origin_state || product.industry_members?.state || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  
  if (city.includes('varanasi') || name.includes('banarasi')) return 'Varanasi Silk Cluster';
  if (city.includes('kanchipuram') || name.includes('kanchipuram')) return 'Kanchipuram Silk Cluster';
  if (city.includes('surat') || name.includes('surat')) return 'Surat Textile Cluster';
  if (city.includes('tiruppur') || name.includes('tiruppur')) return 'Tiruppur Knitwear Cluster';
  if (city.includes('panipat') || name.includes('panipat')) return 'Panipat Home Textile Cluster';
  if (city.includes('bhilwara') || name.includes('bhilwara')) return 'Bhilwara Textile Cluster';
  if (city.includes('patan') || name.includes('patola')) return 'Patan Patola Cluster';
  if (city.includes('chanderi') || name.includes('chanderi')) return 'Chanderi Cluster';
  if (city.includes('pochampally') || name.includes('pochampally') || name.includes('ikat')) return 'Pochampally Ikat Cluster';
  if (city.includes('sualkuchi') || name.includes('muga')) return 'Sualkuchi Silk Cluster';
  if (city.includes('sambalpur') || name.includes('sambalpuri')) return 'Sambalpur Ikat Cluster';
  if (city.includes('kota') || name.includes('doria')) return 'Kota Doria Cluster';
  if (city.includes('bagru') || name.includes('bagru')) return 'Bagru Print Cluster';
  if (city.includes('sanganer') || name.includes('sanganeri')) return 'Sanganer Print Cluster';
  if (city.includes('bhagalpur') || name.includes('bhagalpuri')) return 'Bhagalpur Silk Cluster';
  if (city.includes('maheshwar') || name.includes('maheshwari')) return 'Maheshwar Handloom Cluster';
  if (city.includes('paithan') || name.includes('paithani')) return 'Paithan Paithani Cluster';
  if (city.includes('lucknow') || name.includes('chikankari')) return 'Lucknow Chikankari Cluster';
  if (city.includes('kutch') || name.includes('ajrakh') || name.includes('bandhani')) return 'Kutch Textile Craft Cluster';
  if (city.includes('karur') || name.includes('karur')) return 'Karur Home Textile Cluster';
  
  if (state.includes('andhra')) return 'Kalamkari / Venkatagiri Cluster';
  
  return 'General Textile Cluster';
}

const getPreviewProducts = (filters = {}) => previewMarketplaceProducts.filter((product) => {
  const term = filters.search?.trim().toLowerCase();
  if (!term) return !filters.category || product.marketplace_categories?.slug === filters.category;
  
  let matches = false;
  if (filters.searchType === 'member') {
    matches = product.industry_members?.organization_name?.toLowerCase().includes(term);
  } else if (filters.searchType === 'location') {
    matches = [product.origin_state, product.origin_city, product.industry_members?.state, product.industry_members?.city]
      .some(val => val?.toLowerCase().includes(term));
  } else if (filters.searchType === 'textile') {
    matches = [product.name, product.material, product.marketplace_categories?.name]
      .some(val => val?.toLowerCase().includes(term));
  } else if (filters.searchType === 'cluster') {
    const clusterName = getProductCluster(product);
    matches = clusterName.toLowerCase().includes(term) || (product.origin_city || '').toLowerCase().includes(term);
  } else {
    matches = [product.name, product.short_description, product.material]
      .some(val => val?.toLowerCase().includes(term));
  }
  return matches && (!filters.category || product.marketplace_categories?.slug === filters.category);
});

const productSelect = `*, marketplace_categories(name,slug), industry_members(id,organization_name,slug,logo_url,city,state,verification_status)`;
export async function getMarketplaceProducts(filters = {}) {
  if (!isMarketplaceSchemaReady) return ok(getPreviewProducts(filters));
  try {
    const activeSelect = `*, marketplace_categories(name,slug), industry_members(id,organization_name,slug,logo_url,city,state,verification_status)`;
    let query = supabase.from('marketplace_products')
      .select(activeSelect)
      .eq('status', 'published')
      .order('is_featured', { ascending: false })
      .order('published_at', { ascending: false });

    if (filters.search) {
      const term = `%${filters.search}%`;
      if (filters.searchType === 'member') {
        const { data: members } = await supabase.from('industry_members')
          .select('id')
          .ilike('organization_name', term);
        const memberIds = (members || []).map(m => m.id);
        if (memberIds.length > 0) {
          query = query.in('industry_member_id', memberIds);
        } else {
          return ok([]);
        }
      } else if (filters.searchType === 'location') {
        const { data: members } = await supabase.from('industry_members')
          .select('id')
          .or(`state.ilike.${term},city.ilike.${term}`);
        const memberIds = (members || []).map(m => m.id);
        
        let orCond = `origin_state.ilike.${term},origin_city.ilike.${term}`;
        if (memberIds.length > 0) {
          orCond += `,industry_member_id.in.(${memberIds.map(id => `"${id}"`).join(',')})`;
        }
        query = query.or(orCond);
      } else if (filters.searchType === 'textile') {
        const { data: cats } = await supabase.from('marketplace_categories')
          .select('id')
          .ilike('name', term);
        const catIds = (cats || []).map(c => c.id);
        
        let orCond = `material.ilike.${term},name.ilike.${term}`;
        if (catIds.length > 0) {
          orCond += `,category_id.in.(${catIds.map(id => `"${id}"`).join(',')})`;
        }
        query = query.or(orCond);
      } else if (filters.searchType === 'cluster') {
        query = query.or(`origin_city.ilike.${term},gi_name.ilike.${term}`);
      } else {
        query = query.or(`name.ilike.${term},short_description.ilike.${term},material.ilike.${term}`);
      }
    }
    if (filters.category) {
      query = query.eq('marketplace_categories.slug', filters.category);
    }
    if (filters.material) {
      query = query.contains('materials', [filters.material]);
    }
    if (filters.state) {
      query = query.eq('origin_state', filters.state);
    }
    if (filters.featured) {
      query = query.eq('is_featured', true);
    }
    const { data, error } = await query.range(filters.from || 0, filters.to || 23);
    if (error) throw error;
    return ok(data || []);
  } catch (error) {
    return fail(error);
  }
}
export async function getMarketplaceProductBySlug(slug){ if (!isMarketplaceSchemaReady) return ok(previewMarketplaceProducts.find((product)=>product.slug===slug)||null); try { const {data,error}=await supabase.from('marketplace_products').select(`${productSelect}, marketplace_product_images(*), marketplace_product_specifications(*), marketplace_product_documents(*)`).eq('slug',slug).eq('status','published').maybeSingle(); if(error) throw error; return ok(data); } catch(error){return fail(error);} }
export async function getMarketplaceCategories(){ if (!isMarketplaceSchemaReady) return ok(previewMarketplaceCategories); try{const {data,error}=await supabase.from('marketplace_categories').select('*').eq('is_active',true).order('sort_order');if(error)throw error;return ok(data||[]);}catch(error){return fail(error);} }
export const getFeaturedProducts=()=>getMarketplaceProducts({featured:true,to:7});
export async function getVerifiedSuppliers(){if(!isMarketplaceSchemaReady)return ok([previewMarketplaceSupplier]);try{const {data,error}=await supabase.from('industry_members').select('id,organization_name,slug,short_description,logo_url,banner_url,city,state,product_categories,is_featured').eq('verification_status','verified').eq('is_active',true).order('is_featured',{ascending:false});if(error)throw error;return ok(data||[]);}catch(error){return fail(error);} }
export async function getSupplierBySlug(slug){if(!isMarketplaceSchemaReady)return ok(slug===previewMarketplaceSupplier.slug?previewMarketplaceSupplier:null);try{const {data,error}=await supabase.from('industry_members').select('*').eq('slug',slug).eq('verification_status','verified').maybeSingle();if(error)throw error;return ok(data);}catch(error){return fail(error);} }
export async function getSupplierProducts(memberId){if(!isMarketplaceSchemaReady)return ok(memberId===previewMarketplaceSupplier.id?previewMarketplaceProducts:[]);try{const {data,error}=await supabase.from('marketplace_products').select(productSelect).eq('industry_member_id',memberId).eq('status','published').order('published_at',{ascending:false});if(error)throw error;return ok(data||[]);}catch(error){return fail(error);} }
export async function saveProduct(productId){try{const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error('Sign in to save products');const {data,error}=await supabase.from('saved_marketplace_products').upsert({user_id:user.id,product_id:productId},{onConflict:'user_id,product_id'}).select().single();if(error)throw error;return ok(data);}catch(error){return fail(error);} }
export async function removeSavedProduct(productId){try{const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error('Sign in required');const {error}=await supabase.from('saved_marketplace_products').delete().eq('user_id',user.id).eq('product_id',productId);if(error)throw error;return ok(true);}catch(error){return fail(error);} }
