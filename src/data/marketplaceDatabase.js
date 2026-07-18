import { supabase } from '../lib/supabase';
import { fail, ok } from './databaseResult';
import { previewMarketplaceCategories, previewMarketplaceProducts, previewMarketplaceSupplier } from './marketplacePreviewData';

export const isMarketplaceSchemaReady = import.meta.env.VITE_MARKETPLACE_SCHEMA_READY === 'true';
const getPreviewProducts = (filters = {}) => previewMarketplaceProducts.filter((product) => {
  const term = filters.search?.trim().toLowerCase();
  const matchesSearch = !term || [product.name, product.short_description, product.origin_state].some((value) => value?.toLowerCase().includes(term));
  return matchesSearch && (!filters.category || product.marketplace_categories?.slug === filters.category);
});

const productSelect = `*, marketplace_categories(name,slug), industry_members(id,organization_name,slug,logo_url,city,state,verification_status)`;
export async function getMarketplaceProducts(filters = {}) {
  if (!isMarketplaceSchemaReady) return ok(getPreviewProducts(filters));
  try {
    const activeSelect = `*, marketplace_categories${filters.category ? '!inner' : ''}(name,slug), industry_members(id,organization_name,slug,logo_url,city,state,verification_status)`;
    let query = supabase.from('marketplace_products')
      .select(activeSelect)
      .eq('status', 'published')
      .order('is_featured', { ascending: false })
      .order('published_at', { ascending: false });

    if (filters.search) {
      const term = `%${filters.search}%`;
      query = query.or(`name.ilike.${term},short_description.ilike.${term},material.ilike.${term}`);
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
