import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, faCalendar, faMapMarkerAlt, faTag, faPlus, 
  faHeart, faGlobe, faBoxOpen, faEye, faPaperPlane, 
  faCommentDots, faLock, faCheckCircle, faTimesCircle, 
  faTags, faClock, faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';
import PortalShell from '../components/PortalShell';

const Status = ({ value }) => {
  const badgeConfig = {
    new: { style: 'bg-sky-50 text-sky-700 border-sky-200', icon: faEnvelope },
    viewed: { style: 'bg-amber-50 text-amber-700 border-amber-200', icon: faEye },
    quotation_sent: { style: 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse', icon: faPaperPlane },
    responded: { style: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: faCommentDots },
    closed: { style: 'bg-slate-100 text-slate-600 border-slate-200', icon: faLock }
  };
  const config = badgeConfig[value] || { style: 'bg-slate-50 text-slate-500 border-slate-200', icon: faClock };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${config.style}`}>
      <FontAwesomeIcon icon={config.icon} className="text-[10px]" />
      {(value || 'unknown').replaceAll('_', ' ')}
    </span>
  );
};

export function NewBuyerEnquiry() {
  const auth = useAuth();
  const go = useNavigate();
  const [params] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    industry_member_id: params.get('supplier') || '',
    enquiry_type: 'request_for_quote',
    subject: '',
    requirement_description: '',
    quantity: '',
    quantity_unit: 'pieces',
    target_price: '',
    delivery_city: '',
    delivery_state: '',
    expected_delivery_date: '',
    customization_required: false,
    sample_required: false
  });

  useEffect(() => {
    (async () => {
      try {
        const id = params.get('product');
        if (id) {
          const { data, error: e } = await supabase.from('marketplace_products').select('id,name,slug,industry_member_id,minimum_order_quantity,moq_unit,industry_members(organization_name)').eq('id', id).maybeSingle();
          if (e) throw e;
          if (!data) throw new Error('Selected product is unavailable');
          setProduct(data);
          setForm(f => ({
            ...f,
            industry_member_id: data.industry_member_id,
            subject: `RFQ for ${data.name}`,
            quantity: data.minimum_order_quantity || '',
            quantity_unit: data.moq_unit || 'pieces'
          }));
        } else {
          const { data, error: e } = await supabase.from('industry_members').select('id,organization_name,city,state').eq('verification_status', 'verified').eq('is_active', true).order('organization_name');
          if (e) throw e;
          setSuppliers(data || []);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);

  const submit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const { error: e2 } = await supabase.from('marketplace_enquiries').insert({
        ...form,
        user_id: auth.user.id,
        product_id: product?.id || null,
        quantity: form.quantity ? Number(form.quantity) : null,
        target_price: form.target_price ? Number(form.target_price) : null,
        expected_delivery_date: form.expected_delivery_date || null,
        buyer_name: auth.profile?.full_name || auth.user.email,
        buyer_email: auth.profile?.email || auth.user.email,
        buyer_phone: auth.profile?.phone || null,
        buyer_company: auth.profile?.company_name || null
      });
      if (e2) throw e2;
      go('/account/enquiries');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const input = 'mt-1 w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all';
  
  return (
    <PortalShell title="Request Quotation" subtitle="Send your product requirements and logistics sheet directly to a verified supplier.">
      <div className="col-span-full">
        {loading ? (
          <div className="flex justify-center p-12 bg-white rounded-3xl border shadow-sm">
            <p className="text-slate-400 font-bold text-sm animate-pulse">Loading form details…</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-6 rounded-3xl border border-slate-200/80 bg-white p-7 md:p-8 shadow-sm sm:grid-cols-2 relative overflow-hidden">
            <div className="absolute inset-1 border border-dashed border-slate-100 pointer-events-none rounded-[22px]" />
            
            {product ? (
              <div className="sm:col-span-2 rounded-2xl bg-rose-50/50 border border-rose-100 p-4 relative z-10 flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Inquiry Target Product</span>
                  <h4 className="font-black text-slate-900 text-lg mt-0.5">{product.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Supplier: {product.industry_members?.organization_name}</p>
                </div>
              </div>
            ) : (
              <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
                Supplier *
                <select required value={form.industry_member_id} onChange={e => setForm({ ...form, industry_member_id: e.target.value })} className={input}>
                  <option value="">Select a verified supplier</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.organization_name}</option>
                  ))}
                </select>
              </label>
            )}

            <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
              Inquiry Type
              <select value={form.enquiry_type} onChange={e => setForm({ ...form, enquiry_type: e.target.value })} className={input}>
                <option value="request_for_quote">Request for Quote (RFQ)</option>
                <option value="product_enquiry">Product Enquiry</option>
                <option value="sample_request">Sample Request</option>
                <option value="custom_requirement">Custom Requirement</option>
                <option value="bulk_order">Bulk Order</option>
              </select>
            </label>

            <label className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
              Subject *
              <input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className={input} placeholder="e.g. Requirement for Silk Fabric" />
            </label>

            <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
              Requirement Description *
              <textarea required rows="6" value={form.requirement_description} onChange={e => setForm({ ...form, requirement_description: e.target.value })} className={input} placeholder="Please provide detailed specifications such as yarn count, weaving type, colors, and customization requirements..." />
            </label>

            {[
              ['Quantity', 'quantity', 'number', 'e.g. 500'],
              ['Unit', 'quantity_unit', 'text', 'e.g. metres, pieces'],
              ['Target Price (INR)', 'target_price', 'number', 'e.g. 850'],
              ['Expected Delivery Date', 'expected_delivery_date', 'date', ''],
              ['Delivery City', 'delivery_city', 'text', 'e.g. Varanasi'],
              ['Delivery State', 'delivery_state', 'text', 'e.g. Uttar Pradesh']
            ].map(([label, key, type, placeholder]) => (
              <label key={key} className="text-xs font-black uppercase text-slate-500 tracking-wider relative z-10">
                {label}
                <input placeholder={placeholder} type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className={input} />
              </label>
            ))}

            <div className="sm:col-span-2 grid sm:grid-cols-2 gap-4 relative z-10 py-2">
              <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer select-none">
                <input type="checkbox" checked={form.customization_required} onChange={e => setForm({ ...form, customization_required: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                Customization Required
              </label>
              <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer select-none">
                <input type="checkbox" checked={form.sample_required} onChange={e => setForm({ ...form, sample_required: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                Sample Required
              </label>
            </div>

            {error && <p className="sm:col-span-2 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-red-700 relative z-10">{error}</p>}

            <div className="sm:col-span-2 flex justify-end gap-3 border-t border-slate-100 pt-6 relative z-10">
              <Link className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors bg-white" to="/account/enquiries">Cancel</Link>
              <button disabled={saving} className="btn-primary text-xs font-black uppercase tracking-wider">{saving ? 'Submitting…' : 'Submit Enquiry'}</button>
            </div>
          </form>
        )}
      </div>
    </PortalShell>
  );
}

function BuyerList({ kind }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        let query = kind === 'enquiries' 
          ? supabase.from('marketplace_enquiries').select('*,marketplace_products(name,slug),industry_members(organization_name)').order('created_at', { ascending: false }) 
          : supabase.from('marketplace_quotations').select('*,marketplace_quotation_items(*),industry_members(organization_name),marketplace_enquiries(enquiry_number,subject)').order('created_at', { ascending: false });
        const { data, error: e } = await query;
        if (e) throw e;
        setRows(data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [kind]);

  return (
    <PortalShell 
      title={kind === 'enquiries' ? 'My Enquiries' : 'My Quotations'} 
      subtitle={kind === 'enquiries' ? 'Track requirements and RFQ sheets sent to verified supplier partners.' : 'Review received price quotations and reply with decisions.'} 
      action={kind === 'enquiries' ? <Link className="btn-primary flex items-center gap-1.5 text-xs font-black uppercase tracking-wider" to="/account/enquiries/new"><FontAwesomeIcon icon={faPlus} className="text-xs" /> New Enquiry</Link> : null}
    >
      <div className="col-span-full space-y-6">
        {loading ? (
          <div className="flex justify-center p-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-400 font-bold text-sm animate-pulse">Loading inbox records…</p>
          </div>
        ) : error ? (
          <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700 border border-red-200">{error}</p>
        ) : rows.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-3xl border border-slate-200/80 shadow-sm max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-slate-200/60">
              <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
            </div>
            <h3 className="font-black text-slate-900">No records found</h3>
            <p className="text-xs text-slate-500 mt-2">There are no records in this list yet.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {rows.map(r => (
              <article key={r.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 relative z-10">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[9px] font-extrabold uppercase text-indigo-700 tracking-wider">
                        {r.enquiry_type?.replaceAll('_', ' ')}
                      </span>
                      <Status value={r.status} />
                    </div>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-tight">{r.subject}</h2>
                    <p className="text-xs text-slate-500 font-semibold">
                      Enquiry: <span className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{r.enquiry_number}</span> · Supplier: <b className="text-slate-800">{r.industry_members?.organization_name}</b>
                      {r.marketplace_products?.name && (
                        <> · Product: <Link to={`/marketplace/products/${r.marketplace_products.slug}`} className="text-rose-600 font-bold hover:underline">{r.marketplace_products.name}</Link></>
                      )}
                    </p>
                  </div>
                </div>

                <div className="py-4 relative z-10">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Requirement description</span>
                  <p className="mt-1.5 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {r.requirement_description}
                  </p>
                </div>

                <div className="grid gap-4 rounded-2xl bg-slate-50 border border-slate-200/50 p-4 text-xs text-slate-600 sm:grid-cols-2 md:grid-cols-4 relative z-10 mt-2">
                  <div className="flex items-start gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-white border flex items-center justify-center shrink-0 text-slate-400">
                      <FontAwesomeIcon icon={faBoxOpen} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Quantity Required</span>
                      <b className="text-slate-850 text-xs font-black">{r.quantity || '—'} {r.quantity_unit || ''}</b>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-white border flex items-center justify-center shrink-0 text-slate-400">
                      <FontAwesomeIcon icon={faTags} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Target Price</span>
                      <b className="text-slate-850 text-xs font-black">
                        {r.target_price ? `${r.currency || 'INR'} ${Number(r.target_price).toLocaleString('en-IN')}` : 'Negotiable'}
                      </b>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-white border flex items-center justify-center shrink-0 text-slate-400">
                      <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Delivery Timeline</span>
                      <b className="text-slate-850 text-xs font-black">
                        {r.expected_delivery_date ? new Date(r.expected_delivery_date).toLocaleDateString() : 'Flexible'}
                      </b>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-white border flex items-center justify-center shrink-0 text-slate-400">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Delivery Destination</span>
                      <b className="text-slate-850 text-xs font-black">
                        {[r.delivery_city, r.delivery_state].filter(Boolean).join(', ') || 'Flexible'}
                      </b>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}

export const BuyerEnquiries = () => <BuyerList kind="enquiries" />;
export const BuyerQuotations = () => <BuyerList kind="quotations" />;

export function BuyerSavedProducts() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  
  const load = useCallback(async () => {
    const { data, error: e } = await supabase.from('saved_marketplace_products').select('id,marketplace_products(name,slug,primary_image_url,industry_members(organization_name))').order('created_at', { ascending: false });
    if (e) setError(e.message);
    else setRows(data || []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async id => {
    await supabase.from('saved_marketplace_products').delete().eq('id', id);
    load();
  };

  return (
    <PortalShell title="Saved Products" subtitle="Your bookmarked B2B marketplace products.">
      <div className="col-span-full">
        {error && <p className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-700">{error}</p>}
        {rows.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-slate-205">
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
            </div>
            <h3 className="font-black text-slate-900">Your shortlist is empty</h3>
            <p className="text-xs text-slate-500 mt-2">Bookmark products from the marketplace search directory to track them here.</p>
            <Link to="/marketplace" className="btn-primary mt-6 text-xs font-black uppercase tracking-wider inline-block">Browse Marketplace</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map(r => (
              <article key={r.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative">
                <div>
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative border-b border-slate-200">
                    <img src={r.marketplace_products?.primary_image_url || '/assets/textiles/banarasi_silk.png'} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt={r.marketplace_products?.name} />
                  </div>
                  <div className="p-5 space-y-1 relative z-10">
                    <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-rose-600 transition-colors leading-tight line-clamp-1">{r.marketplace_products?.name}</h4>
                    <p className="text-xs text-slate-500 font-semibold line-clamp-1">Supplier: {r.marketplace_products?.industry_members?.organization_name}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between relative z-10 mt-2 bg-slate-50/50 py-3">
                  <Link className="text-xs font-black uppercase tracking-wider text-rose-600 hover:text-rose-700" to={`/marketplace/products/${r.marketplace_products?.slug}`}>View Details</Link>
                  <button className="text-xs font-bold text-slate-400 hover:text-rose-650 transition-colors" onClick={() => remove(r.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
