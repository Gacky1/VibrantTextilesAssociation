import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import logoRect from '../assets/LogoRectTransparent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBox, faGlobe, faInfoCircle, faArrowRight, faEdit, faTrash, faExclamationTriangle, faTag, faLeaf, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const emptyForm = {
  name: '',
  slug: '',
  sku: '',
  short_description: '',
  full_description: '',
  material: '',
  category_id: '',
  minimum_order_quantity: '',
  moq_unit: 'pieces',
  lead_time_days: '',
  origin_state: '',
  origin_city: '',
  pricing_type: 'on_request',
  indicative_price_min: '',
  indicative_price_max: '',
  currency: 'INR',
  price_unit: 'metre',
  gi_tagged: false,
  gi_name: '',
  sample_available: true,
  customization_available: true,
  private_label_available: false,
  export_available: false,
  domestic_shipping_available: true
};

const priceUnitOptions = ['metre', 'piece', 'kg', 'roll', 'set', 'yard', 'pack', 'pair'];

function Shell({ children, open }) { 
  const auth = useAuth(); 
  const links = [
    ['Overview', '/member'],
    ['Products', '/member/products'],
    ['Enquiries', '/member/enquiries'],
    ['Quotations', '/member/quotations'],
    ['Company profile', '/member/profile']
  ];
  return (
    <main data-lenis-prevent className="min-h-screen bg-slate-50 text-slate-900 bg-textile-linen">
      <header className="border-b bg-slate-950 border-slate-900 text-white">
        <div className="section-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/marketplace" className="flex items-center gap-3">
            <img src={logoRect} alt="VTA Logo" className="h-8 w-auto object-contain" />
            <span className="font-black text-base tracking-tight uppercase">
              VTA <span className="text-primary-400">Partner Portal</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-5 text-xs font-black uppercase tracking-wider">
            {links.map(([label, to]) => (
              <Link key={to} to={to} className="text-slate-300 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>
          <button 
            onClick={auth.signOut} 
            className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white transition-all"
          >
            Sign out
          </button>
        </div>
      </header>
      
      <section className="section-container py-12">
        <div className="mb-10 relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm">
          <div className="absolute inset-1 border border-dashed border-slate-150 pointer-events-none rounded-[20px]" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Products</h1>
              <p className="mt-2 text-sm font-medium text-slate-500 max-w-xl leading-relaxed">Create, update, and manage your public B2B marketplace listings, specifications, and catalog drafts.</p>
            </div>
            <button onClick={open} className="btn-primary text-xs font-black uppercase tracking-wider relative z-10 px-5 py-3 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faPlus} /> Add Product
            </button>
          </div>
        </div>

        {children}
      </section>
    </main>
  ); 
}

const Status = ({ value }) => {
  const styles = 
    value === 'published' || value === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    value === 'submitted' || value === 'pending_review' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse border' :
    value === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
    'bg-slate-50 text-slate-600 border-slate-200';
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${styles}`}>
      {(value || 'unknown').replaceAll('_', ' ')}
    </span>
  );
};

export default function PartnerProducts() {
  const auth = useAuth();
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [specs, setSpecs] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const load = useCallback(async () => {
    if (!auth.memberProfile?.id) return;
    setLoading(true);
    try {
      const [p, c] = await Promise.all([
        supabase.from('marketplace_products').select('*,marketplace_categories(name)').eq('industry_member_id', auth.memberProfile.id).neq('status', 'archived').order('updated_at', { ascending: false }),
        supabase.from('marketplace_categories').select('id,name').eq('is_active', true).order('sort_order')
      ]);
      if (p.error) throw p.error;
      if (c.error) throw c.error;
      setRows(p.data || []);
      setCategories(c.data || []);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [auth.memberProfile?.id]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!image) {
      setPreview(editingProduct?.primary_image_url || '');
      return;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image, editingProduct]);

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setSpecs([
      { specification_name: 'Weave Type', specification_value: '', unit: '' },
      { specification_name: 'Fabric Width', specification_value: '', unit: 'inches' }
    ]);
    setImage(null);
    setPreview('');
    setError('');
    setOpen(true);
  };

  const openEditModal = async (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || '',
      slug: product.slug || '',
      sku: product.sku || '',
      short_description: product.short_description || '',
      full_description: product.full_description || '',
      material: product.material || '',
      category_id: product.category_id || '',
      minimum_order_quantity: product.minimum_order_quantity ?? '',
      moq_unit: product.moq_unit || 'pieces',
      lead_time_days: product.lead_time_days ?? '',
      origin_state: product.origin_state || '',
      origin_city: product.origin_city || '',
      pricing_type: product.pricing_type || 'on_request',
      indicative_price_min: product.indicative_price_min ?? '',
      indicative_price_max: product.indicative_price_max ?? '',
      currency: product.currency || 'INR',
      price_unit: product.price_unit || 'metre',
      gi_tagged: product.gi_tagged || false,
      gi_name: product.gi_name || '',
      sample_available: product.sample_available ?? true,
      customization_available: product.customization_available ?? true,
      private_label_available: product.private_label_available ?? false,
      export_available: product.export_available ?? false,
      domestic_shipping_available: product.domestic_shipping_available ?? true
    });
    setImage(null);
    setPreview(product.primary_image_url || '');
    setError('');

    // Fetch specifications
    const { data: fetchedSpecs } = await supabase
      .from('marketplace_product_specifications')
      .select('id, specification_name, specification_value, unit')
      .eq('product_id', product.id)
      .order('sort_order');
      
    setSpecs(fetchedSpecs?.length ? fetchedSpecs : []);
    setOpen(true);
  };

  const chooseImage = e => {
    const file = e.target.files?.[0];
    setError('');
    if (!file) return setImage(null);
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) {
      e.target.value = '';
      return setError('Use a JPG, PNG, or WebP image no larger than 8 MB.');
    }
    setImage(file);
  };

  const save = async e => {
    e.preventDefault();
    if (!editingProduct && !image) return setError('Please upload a product image.');
    setSaving(true);
    setError('');
    let uploadedPath = '';
    let targetProductId = editingProduct?.id;

    try {
      let imageUrl = editingProduct?.primary_image_url || '';

      if (image) {
        const ext = image.name.split('.').pop()?.toLowerCase() || 'jpg';
        uploadedPath = `${auth.user.id}/products/${crypto.randomUUID()}.${ext}`;
        const uploaded = await supabase.storage.from('marketplace-products').upload(uploadedPath, image, { contentType: image.type });
        if (uploaded.error) throw uploaded.error;
        const { data: urlData } = supabase.storage.from('marketplace-products').getPublicUrl(uploadedPath);
        imageUrl = urlData.publicUrl;
      }

      const payload = {
        name: form.name,
        slug: form.slug || `${form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-5)}`,
        sku: form.sku || null,
        short_description: form.short_description,
        full_description: form.full_description || null,
        material: form.material || null,
        category_id: form.category_id || null,
        minimum_order_quantity: form.minimum_order_quantity ? Number(form.minimum_order_quantity) : null,
        moq_unit: form.moq_unit || 'pieces',
        lead_time_days: form.lead_time_days ? Number(form.lead_time_days) : null,
        origin_state: form.origin_state || null,
        origin_city: form.origin_city || null,
        pricing_type: form.pricing_type,
        indicative_price_min: form.indicative_price_min !== '' ? Number(form.indicative_price_min) : null,
        indicative_price_max: form.indicative_price_max !== '' ? Number(form.indicative_price_max) : null,
        currency: form.currency || 'INR',
        price_unit: form.price_unit || null,
        gi_tagged: form.gi_tagged,
        gi_name: form.gi_tagged ? (form.gi_name || null) : null,
        sample_available: form.sample_available,
        customization_available: form.customization_available,
        private_label_available: form.private_label_available,
        export_available: form.export_available,
        domestic_shipping_available: form.domestic_shipping_available,
        primary_image_url: imageUrl
      };

      if (editingProduct) {
        const result = await supabase.from('marketplace_products').update({
          ...payload,
          updated_at: new Date().toISOString()
        }).eq('id', editingProduct.id);
        if (result.error) throw result.error;
      } else {
        const result = await supabase.from('marketplace_products').insert({
          ...payload,
          industry_member_id: auth.memberProfile.id,
          status: 'draft',
          moderation_status: 'not_submitted'
        }).select('id').single();
        if (result.error) throw result.error;
        targetProductId = result.data.id;
      }

      // Save specifications
      if (targetProductId) {
        await supabase.from('marketplace_product_specifications').delete().eq('product_id', targetProductId);
        const validSpecs = specs.filter(s => s.specification_name?.trim() && s.specification_value?.trim());
        if (validSpecs.length > 0) {
          await supabase.from('marketplace_product_specifications').insert(
            validSpecs.map((s, idx) => ({
              product_id: targetProductId,
              specification_name: s.specification_name.trim(),
              specification_value: s.specification_value.trim(),
              unit: s.unit?.trim() || null,
              sort_order: idx + 1
            }))
          );
        }
      }
      
      setOpen(false);
      setEditingProduct(null);
      setForm(emptyForm);
      setSpecs([]);
      setImage(null);
      await load();
    } catch (err) {
      if (uploadedPath) await supabase.storage.from('marketplace-products').remove([uploadedPath]);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const submitReview = async row => {
    const result = await supabase.from('marketplace_products').update({
      status: 'submitted',
      moderation_status: 'pending_review'
    }).eq('id', row.id);
    if (result.error) setError(result.error.message);
    else load();
  };

  const confirmDeleteProduct = async () => {
    if (!deletingProduct) return;
    setDeleting(true);
    setError('');
    try {
      const { error: err } = await supabase.from('marketplace_products').delete().eq('id', deletingProduct.id);
      if (err) {
        const { error: archiveErr } = await supabase.from('marketplace_products').update({
          status: 'archived',
          deleted_at: new Date().toISOString()
        }).eq('id', deletingProduct.id);
        if (archiveErr) throw archiveErr;
      }
      setDeletingProduct(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const formatPriceTag = row => {
    const symbol = row.currency === 'USD' ? '$' : row.currency === 'EUR' ? '€' : '₹';
    const unitStr = row.price_unit ? ` / ${row.price_unit}` : '';
    if (row.pricing_type === 'fixed' && row.indicative_price_min) {
      return `${symbol}${Number(row.indicative_price_min).toLocaleString('en-IN')}${unitStr}`;
    }
    if (row.pricing_type === 'range' && row.indicative_price_min) {
      return `${symbol}${Number(row.indicative_price_min).toLocaleString('en-IN')}${row.indicative_price_max ? ` – ${symbol}${Number(row.indicative_price_max).toLocaleString('en-IN')}` : ''}${unitStr}`;
    }
    if (row.pricing_type === 'negotiable' && row.indicative_price_min) {
      return `${symbol}${Number(row.indicative_price_min).toLocaleString('en-IN')} (Negotiable)${unitStr}`;
    }
    return 'Price on Request';
  };

  const inputStyle = "mt-1 w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-600 transition-all";

  return (
    <Shell open={openAddModal}>
      <div className="col-span-full">
        {error && <p className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-red-700">{error}</p>}
        
        {loading ? (
          <div className="flex justify-center p-16 bg-white rounded-3xl border shadow-sm">
            <p className="text-slate-400 font-bold text-sm animate-pulse">Loading products catalog…</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-3xl border border-slate-200/85 shadow-sm max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faBox} className="text-lg" />
            </div>
            <h3 className="font-black text-slate-900">No products uploaded</h3>
            <p className="text-xs text-slate-500 mt-2">Publish drafts or add items to catalog lists to establish your presence.</p>
            <button onClick={openAddModal} className="btn-primary mt-6 text-xs font-black uppercase tracking-wider inline-block">Add First Product</button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map(row => (
              <article key={row.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative">
                <div className="absolute inset-1 border border-dashed border-transparent group-hover:border-slate-200 pointer-events-none rounded-[22px] transition-colors duration-300" />
                
                <div>
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative border-b">
                    <img src={row.primary_image_url} alt={row.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    
                    {/* Quick action buttons overlaid on top-right of image */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                      <button 
                        onClick={() => openEditModal(row)}
                        title="Edit Product"
                        className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 hover:text-primary-700 hover:bg-white shadow-md flex items-center justify-center transition-all"
                      >
                        <FontAwesomeIcon icon={faEdit} className="text-xs" />
                      </button>
                      <button 
                        onClick={() => setDeletingProduct(row)}
                        title="Delete Product"
                        className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm text-rose-600 hover:text-rose-700 hover:bg-white shadow-md flex items-center justify-center transition-all"
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-xs" />
                      </button>
                    </div>

                    {/* Price tag badge on bottom left of image */}
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-black text-white shadow-sm">
                        <FontAwesomeIcon icon={faTag} className="text-[9px] text-amber-400" />
                        {formatPriceTag(row)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-2 relative z-10">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-black text-slate-900 text-sm group-hover:text-primary-700 transition-colors leading-tight line-clamp-1">{row.name}</h4>
                      {row.gi_tagged && (
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-black text-amber-700 border border-amber-200">
                          <FontAwesomeIcon icon={faLeaf} className="text-[8px]" /> GI
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      Cat: {row.marketplace_categories?.name || 'Uncategorised'} · Mat: {row.material || '—'}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">{row.short_description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      <Status value={row.status} />
                      <Status value={row.moderation_status} />
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between relative z-10 mt-2 bg-slate-50/50 py-3.5">
                  <span className="text-[10px] text-slate-400 font-bold">Views: <b>{row.view_count || 0}</b></span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => openEditModal(row)} className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
                      Edit
                    </button>
                    {row.status === 'draft' && (
                      <button onClick={() => submitReview(row)} className="text-xs font-black uppercase tracking-wider text-primary-700 hover:text-primary-850">Submit review</button>
                    )}
                    {row.status === 'published' && (
                      <span className="text-xs font-bold text-emerald-650 flex items-center gap-1">Live <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" /></span>
                    )}
                    {row.status === 'submitted' && (
                      <span className="text-xs font-semibold text-indigo-650">In Review</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <form data-lenis-prevent onSubmit={save} className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-1 border border-dashed border-slate-150 pointer-events-none rounded-[22px]" />
            
            <div className="flex justify-between border-b pb-4 relative z-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{editingProduct ? 'Edit Product Details' : 'New Product Draft'}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{editingProduct ? `Updating catalog record: ${editingProduct.name}` : 'Fill in all attributes to list your item in the public marketplace'}</p>
              </div>
              <button type="button" onClick={() => { setOpen(false); setEditingProduct(null); }} className="text-2xl font-bold text-slate-400 hover:text-slate-600">×</button>
            </div>

            <div className="mt-6 space-y-6 relative z-10">
              {/* Card 1: Media & Basic Information */}
              <div className="rounded-2xl border p-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b pb-2">1. Basic Information & Image</span>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                    Product Image {editingProduct ? '(Optional to replace)' : '*'}
                    <input required={!editingProduct} type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} className={`${inputStyle} normal-case`} />
                  </label>

                  {preview && (
                    <div className="sm:col-span-2 rounded-2xl border bg-slate-50/50 p-2 overflow-hidden flex justify-center max-h-64">
                      <img src={preview} alt="Preview" className="max-h-60 rounded-xl object-contain" />
                    </div>
                  )}

                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Product Name *
                    <input required value={form.name} onChange={ev => setForm({ ...form, name: ev.target.value })} className={inputStyle} placeholder="e.g. Banarasi Silk Brocade Saree" />
                  </label>

                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Custom Slug
                    <input value={form.slug} onChange={ev => setForm({ ...form, slug: ev.target.value })} className={inputStyle} placeholder="e.g. banarasi-silk-brocade" />
                  </label>

                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    SKU Number
                    <input value={form.sku} onChange={ev => setForm({ ...form, sku: ev.target.value })} className={inputStyle} placeholder="e.g. VTA-SILK-001" />
                  </label>

                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Category
                    <select value={form.category_id} onChange={ev => setForm({ ...form, category_id: ev.target.value })} className={inputStyle}>
                      <option value="">Select Category</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </label>

                  <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                    Primary Material
                    <input value={form.material} onChange={ev => setForm({ ...form, material: ev.target.value })} className={inputStyle} placeholder="e.g. Pure Katan Silk, Zari" />
                  </label>

                  <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                    Short Summary Description *
                    <textarea required rows="2" value={form.short_description} onChange={ev => setForm({ ...form, short_description: ev.target.value })} className={inputStyle} placeholder="Brief summary of fabric, pattern, and design..." />
                  </label>

                  <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                    Full Product Description
                    <textarea rows="4" value={form.full_description} onChange={ev => setForm({ ...form, full_description: ev.target.value })} className={inputStyle} placeholder="Detailed product story, weaving process, washing instructions, and specifications..." />
                  </label>
                </div>
              </div>

              {/* Card 2: Pricing & MOQ */}
              <div className="rounded-2xl border p-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b pb-2">2. Pricing & Minimum Order Quantity</span>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Pricing Type
                    <select value={form.pricing_type} onChange={ev => setForm({ ...form, pricing_type: ev.target.value })} className={inputStyle}>
                      <option value="on_request">On Request</option>
                      <option value="fixed">Fixed Price</option>
                      <option value="range">Price Range</option>
                      <option value="negotiable">Negotiable</option>
                    </select>
                  </label>

                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Currency
                    <select value={form.currency} onChange={ev => setForm({ ...form, currency: ev.target.value })} className={inputStyle}>
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </label>

                  {/* Price Unit selection */}
                  {form.pricing_type !== 'on_request' && (
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Price Unit (e.g. per metre, per piece) *
                      <div className="flex gap-2 mt-1">
                        <select value={priceUnitOptions.includes(form.price_unit) ? form.price_unit : 'custom'} onChange={ev => {
                          if (ev.target.value !== 'custom') setForm({ ...form, price_unit: ev.target.value });
                        }} className="rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium outline-none">
                          {priceUnitOptions.map(u => (
                            <option key={u} value={u}>per {u}</option>
                          ))}
                          <option value="custom">Custom…</option>
                        </select>
                        <input value={form.price_unit} onChange={ev => setForm({ ...form, price_unit: ev.target.value })} className="flex-1 rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium outline-none" placeholder="Unit e.g. metre, piece" />
                      </div>
                    </label>
                  )}

                  {/* Dynamic Min / Max Price Inputs */}
                  {form.pricing_type === 'fixed' && (
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Fixed Price ({form.currency}) *
                      <input required type="number" min="0" step="0.01" value={form.indicative_price_min} onChange={ev => setForm({ ...form, indicative_price_min: ev.target.value })} className={inputStyle} placeholder="e.g. 850" />
                    </label>
                  )}

                  {form.pricing_type === 'range' && (
                    <>
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                        Min Price ({form.currency}) *
                        <input required type="number" min="0" step="0.01" value={form.indicative_price_min} onChange={ev => setForm({ ...form, indicative_price_min: ev.target.value })} className={inputStyle} placeholder="e.g. 500" />
                      </label>
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                        Max Price ({form.currency}) *
                        <input required type="number" min="0" step="0.01" value={form.indicative_price_max} onChange={ev => setForm({ ...form, indicative_price_max: ev.target.value })} className={inputStyle} placeholder="e.g. 1200" />
                      </label>
                    </>
                  )}

                  {form.pricing_type === 'negotiable' && (
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      Indicative Price ({form.currency})
                      <input type="number" min="0" step="0.01" value={form.indicative_price_min} onChange={ev => setForm({ ...form, indicative_price_min: ev.target.value })} className={inputStyle} placeholder="e.g. 750" />
                    </label>
                  )}

                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Minimum Order Quantity (MOQ)
                    <input type="number" min="0" value={form.minimum_order_quantity} onChange={ev => setForm({ ...form, minimum_order_quantity: ev.target.value })} className={inputStyle} placeholder="e.g. 100" />
                  </label>

                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    MOQ Unit
                    <input value={form.moq_unit} onChange={ev => setForm({ ...form, moq_unit: ev.target.value })} className={inputStyle} placeholder="e.g. metres, pieces, rolls" />
                  </label>
                </div>
              </div>

              {/* Card 3: Logistics & Origin */}
              <div className="rounded-2xl border p-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b pb-2">3. Production & Origin</span>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Lead Time (Days)
                    <input type="number" min="0" value={form.lead_time_days} onChange={ev => setForm({ ...form, lead_time_days: ev.target.value })} className={inputStyle} placeholder="e.g. 15" />
                  </label>

                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Origin State
                    <input value={form.origin_state} onChange={ev => setForm({ ...form, origin_state: ev.target.value })} className={inputStyle} placeholder="e.g. Uttar Pradesh" />
                  </label>

                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Origin City
                    <input value={form.origin_city} onChange={ev => setForm({ ...form, origin_city: ev.target.value })} className={inputStyle} placeholder="e.g. Varanasi" />
                  </label>
                </div>
              </div>

              {/* Card 4: Capabilities & GI Badging */}
              <div className="rounded-2xl border p-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b pb-2">4. B2B Capabilities & GI Certification</span>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input type="checkbox" checked={form.gi_tagged} onChange={e => setForm({ ...form, gi_tagged: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                    Geographical Indication (GI Tagged)
                  </label>

                  {form.gi_tagged && (
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                      GI Registry Name
                      <input value={form.gi_name} onChange={ev => setForm({ ...form, gi_name: ev.target.value })} className={inputStyle} placeholder="e.g. Banarasi Handloom & Saree" />
                    </label>
                  )}

                  <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input type="checkbox" checked={form.sample_available} onChange={e => setForm({ ...form, sample_available: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                    Sample Available on Request
                  </label>

                  <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input type="checkbox" checked={form.customization_available} onChange={e => setForm({ ...form, customization_available: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                    Customization Available
                  </label>

                  <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input type="checkbox" checked={form.private_label_available} onChange={e => setForm({ ...form, private_label_available: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                    Private Labeling Available
                  </label>

                  <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer select-none">
                    <input type="checkbox" checked={form.export_available} onChange={e => setForm({ ...form, export_available: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                    Export Ready / Worldwide Shipping
                  </label>
                </div>
              </div>

              {/* Card 5: Dynamic Specifications Builder */}
              <div className="rounded-2xl border p-5 space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">5. Key Technical Specifications</span>
                  <button 
                    type="button" 
                    onClick={() => setSpecs([...specs, { specification_name: '', specification_value: '', unit: '' }])}
                    className="text-xs font-black uppercase tracking-wider text-primary-700 hover:text-primary-800 flex items-center gap-1"
                  >
                    <FontAwesomeIcon icon={faPlus} className="text-[10px]" /> Add Specification
                  </button>
                </div>

                {specs.length === 0 ? (
                  <p className="text-xs text-slate-400 font-medium italic">No specifications added yet. Add items like Fabric Width, GSM, Weave Pattern, or Yarn Count.</p>
                ) : (
                  <div className="space-y-3">
                    {specs.map((s, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-center gap-2">
                        <input 
                          placeholder="Spec Name (e.g. Width)" 
                          value={s.specification_name} 
                          onChange={e => {
                            const copy = [...specs];
                            copy[idx].specification_name = e.target.value;
                            setSpecs(copy);
                          }} 
                          className={`${inputStyle} text-xs mt-0`} 
                        />
                        <input 
                          placeholder="Value (e.g. 44)" 
                          value={s.specification_value} 
                          onChange={e => {
                            const copy = [...specs];
                            copy[idx].specification_value = e.target.value;
                            setSpecs(copy);
                          }} 
                          className={`${inputStyle} text-xs mt-0`} 
                        />
                        <input 
                          placeholder="Unit (e.g. inches)" 
                          value={s.unit || ''} 
                          onChange={e => {
                            const copy = [...specs];
                            copy[idx].unit = e.target.value;
                            setSpecs(copy);
                          }} 
                          className={`${inputStyle} text-xs sm:w-28 mt-0`} 
                        />
                        <button 
                          type="button" 
                          onClick={() => setSpecs(specs.filter((_, i) => i !== idx))} 
                          className="p-2 text-rose-600 hover:text-rose-800 text-xs font-bold shrink-0"
                          title="Remove"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5 relative z-10">
              <button type="button" onClick={() => { setOpen(false); setEditingProduct(null); }} className="rounded-xl border border-slate-250 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors bg-white">Cancel</button>
              <button disabled={saving} className="btn-primary text-xs font-black uppercase tracking-wider">{saving ? (editingProduct ? 'Updating…' : 'Uploading…') : (editingProduct ? 'Save Changes' : 'Save Draft')}</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-1 border border-dashed border-slate-150 pointer-events-none rounded-[22px]" />
            
            <div className="flex items-center gap-3 text-rose-600 mb-4 relative z-10">
              <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-lg" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Delete Product</h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed relative z-10">
              Are you sure you want to delete <b>{deletingProduct.name}</b>? This action will remove or archive the product listing from the marketplace.
            </p>
            
            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4 relative z-10">
              <button 
                type="button" 
                onClick={() => setDeletingProduct(null)} 
                className="rounded-xl border border-slate-250 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors bg-white"
              >
                Cancel
              </button>
              <button 
                disabled={deleting}
                onClick={confirmDeleteProduct}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-sm transition-all"
              >
                {deleting ? 'Deleting…' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
