import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import logoRect from '../assets/LogoRectTransparent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCalendar, faMoneyBillWave, faTruck, faFileInvoiceDollar, faInbox, faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const blank = {
  item_name: '',
  description: '',
  quantity: '',
  unit: 'pieces',
  unit_price: '',
  tax_rate: '0',
  shipping_amount: '0',
  discount_amount: '0',
  valid_until: '',
  payment_terms: '',
  delivery_timeline: '',
  notes: '',
  terms_and_conditions: ''
};

function Shell({ title, subtitle, children }) { 
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
          
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm font-medium text-slate-500 max-w-2xl leading-relaxed">{subtitle}</p>
          </div>
        </div>

        {children}
      </section>
    </main>
  ); 
}

const Status = ({ value }) => {
  const styles = 
    value === 'accepted' || value === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    value === 'rejected' || value === 'spam' ? 'bg-rose-50 text-rose-700 border-rose-200' :
    value === 'revision_requested' ? 'bg-amber-50 text-amber-700 border-amber-200' :
    value === 'sent' || value === 'viewed' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 border animate-pulse' :
    'bg-slate-50 text-slate-600 border-slate-250';
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${styles}`}>
      {(value || 'unknown').replaceAll('_', ' ')}
    </span>
  );
};

export function PartnerEnquiries() {
  const auth = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [quote, setQuote] = useState(blank);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!auth.memberProfile?.id) return;
    setLoading(true);
    try {
      const r = await supabase.from('marketplace_enquiries').select('*,marketplace_products(id,name,slug)').eq('industry_member_id',auth.memberProfile.id).order('last_message_at', { ascending: false });
      if (r.error) throw r.error;
      setRows(r.data || []);
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

  const totals = useMemo(() => {
    const subtotal = Number(quote.quantity || 0) * Number(quote.unit_price || 0);
    const tax = (subtotal * Number(quote.tax_rate || 0)) / 100;
    return {
      subtotal,
      tax,
      grand: Math.max(0, subtotal + tax + Number(quote.shipping_amount || 0) - Number(quote.discount_amount || 0))
    };
  }, [quote]);

  const open = row => {
    setSelected(row);
    setQuote({
      ...blank,
      item_name: row.marketplace_products?.name || row.subject,
      description: row.requirement_description,
      quantity: row.quantity || 1,
      unit: row.quantity_unit || 'pieces'
    });
    setError('');
  };

  const send = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    let id;
    try {
      const latest = await supabase.from('marketplace_quotations').select('version').eq('enquiry_id', selected.id).order('version', { ascending: false }).limit(1);
      if (latest.error) throw latest.error;
      
      const q = await supabase.from('marketplace_quotations').insert({
        enquiry_id: selected.id,
        industry_member_id: auth.memberProfile.id,
        user_id: selected.user_id,
        version: (latest.data?.[0]?.version || 0) + 1,
        status: 'sent',
        currency: selected.currency || 'INR',
        subtotal: totals.subtotal,
        discount_amount: Number(quote.discount_amount || 0),
        tax_amount: totals.tax,
        shipping_amount: Number(quote.shipping_amount || 0),
        grand_total: totals.grand,
        valid_until: quote.valid_until || null,
        payment_terms: quote.payment_terms || null,
        delivery_timeline: quote.delivery_timeline || null,
        notes: quote.notes || null,
        terms_and_conditions: quote.terms_and_conditions || null,
        sent_at: new Date().toISOString()
      }).select('id').single();

      if (q.error) throw q.error;
      id = q.data.id;

      const i = await supabase.from('marketplace_quotation_items').insert({
        quotation_id: id,
        product_id: selected.product_id || null,
        item_name: quote.item_name,
        description: quote.description || null,
        quantity: Number(quote.quantity),
        unit: quote.unit,
        unit_price: Number(quote.unit_price),
        tax_rate: Number(quote.tax_rate || 0),
        tax_amount: totals.tax,
        discount_amount: Number(quote.discount_amount || 0),
        line_total: totals.grand
      });
      if (i.error) throw i.error;

      const u = await supabase.from('marketplace_enquiries').update({
        status: 'quotation_sent',
        last_message_at: new Date().toISOString()
      }).eq('id', selected.id);
      if (u.error) throw u.error;

      setSelected(null);
      setQuote(blank);
      await load();
    } catch (err) {
      if (id) await supabase.from('marketplace_quotations').delete().eq('id', id);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = "mt-1 w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-600 transition-all";

  return (
    <Shell 
      title="Enquiry Inbox" 
      subtitle="Review custom specification requirements, B2B inquiries and RFQs assigned to your organization."
    >
      <div className="col-span-full space-y-6">
        {error && <p className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-700">{error}</p>}
        
        {loading ? (
          <div className="flex justify-center p-16 bg-white rounded-3xl border border-slate-205 shadow-sm">
            <p className="text-slate-400 font-bold text-sm animate-pulse">Loading inbox records…</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-3xl border border-slate-200/80 shadow-sm max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-105 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faInbox} className="text-lg" />
            </div>
            <h3 className="font-black text-slate-900">Inbox is empty</h3>
            <p className="text-xs text-slate-500 mt-2">You haven't received any customer enquiries or RFQs yet.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {rows.map(row => (
              <article key={row.id} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-1 border border-dashed border-slate-100 pointer-events-none rounded-[22px]" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 relative z-10">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-2 items-center">
                      <Status value={row.enquiry_type} />
                      <Status value={row.status} />
                    </div>
                    <h2 className="text-lg font-black text-slate-900 leading-tight">{row.subject}</h2>
                    <p className="text-xs text-slate-500">
                      Enquiry ID: <span className="font-mono">{row.enquiry_number}</span> · Buyer: <b>{row.buyer_name || 'N/A'}</b>
                      {row.marketplace_products?.name && (
                        <> · Target Product: <b>{row.marketplace_products.name}</b></>
                      )}
                    </p>
                  </div>
                  
                  {!['won', 'lost', 'closed', 'spam'].includes(row.status) && (
                    <button 
                      onClick={() => open(row)} 
                      className="btn-primary text-xs font-black uppercase tracking-wider relative z-10 px-5 py-2.5 shrink-0"
                    >
                      {row.status === 'quotation_sent' ? 'Send Revision' : 'Reply with Quotation'}
                    </button>
                  )}
                </div>

                <div className="py-4 relative z-10">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Buyer Requirements</span>
                  <p className="mt-1.5 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {row.requirement_description}
                  </p>
                </div>

                <div className="grid gap-4 rounded-2xl bg-slate-50/50 border border-slate-100 p-4 text-xs text-slate-600 sm:grid-cols-2 md:grid-cols-4 relative z-10 mt-2">
                  <div className="space-y-1">
                    <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Requested Quantity</span>
                    <b className="text-slate-800 text-sm font-black">{row.quantity || '—'} {row.quantity_unit || ''}</b>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Target Price</span>
                    <b className="text-slate-800 text-sm font-black">
                      {row.target_price ? `${row.currency || 'INR'} ${Number(row.target_price).toLocaleString('en-IN')}` : 'Flexible'}
                    </b>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Expected Delivery</span>
                    <b className="text-slate-800 text-sm font-black">
                      {row.expected_delivery_date ? new Date(row.expected_delivery_date).toLocaleDateString() : 'Flexible'}
                    </b>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Shipment Destination</span>
                    <b className="text-slate-800 text-sm font-black">
                      {[row.delivery_city, row.delivery_state].filter(Boolean).join(', ') || 'N/A'}
                    </b>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Reply/Build Quotation Modal Dialog */}
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <form data-lenis-prevent onSubmit={send} className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-1 border border-dashed border-slate-150 pointer-events-none rounded-[22px]" />
            
            <div className="flex justify-between border-b pb-4 relative z-10">
              <div>
                <h2 className="text-2xl font-black text-slate-90">Reply with Quotation</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enquiry Reference: <b>{selected.enquiry_number}</b> · Buyer: <b>{selected.buyer_name}</b>
                </p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-2xl font-bold text-slate-400 hover:text-slate-600">×</button>
            </div>

            <div className="mt-6 space-y-6 relative z-10">
              {/* Card 1: Line Item Specifications */}
              <div className="rounded-2xl border p-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b pb-2">1. Item Specifications</span>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                    Item Name *
                    <input required value={quote.item_name} onChange={ev => setQuote({ ...quote, item_name: ev.target.value })} className={inputStyle} placeholder="e.g. Handloom Silk Fabric" />
                  </label>
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Quantity *
                    <input required min="1" type="number" value={quote.quantity} onChange={ev => setQuote({ ...quote, quantity: ev.target.value })} className={inputStyle} />
                  </label>
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Unit *
                    <input required value={quote.unit} onChange={ev => setQuote({ ...quote, unit: ev.target.value })} className={inputStyle} placeholder="e.g. metres, rolls" />
                  </label>
                  <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                    Item Description
                    <textarea rows="3" value={quote.description} onChange={ev => setQuote({ ...quote, description: ev.target.value })} className={inputStyle} placeholder="Add detailed specifications of the quoted item (materials, dimensions, techniques)..." />
                  </label>
                </div>
              </div>

              {/* Card 2: Financial Breakdown */}
              <div className="rounded-2xl border p-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b pb-2">2. Pricing Details (INR)</span>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Unit Price *
                    <input required min="0" step="0.01" type="number" value={quote.unit_price} onChange={ev => setQuote({ ...quote, unit_price: ev.target.value })} className={inputStyle} />
                  </label>
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Tax Rate (%)
                    <input min="0" step="0.1" type="number" value={quote.tax_rate} onChange={ev => setQuote({ ...quote, tax_rate: ev.target.value })} className={inputStyle} />
                  </label>
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Shipping Amount
                    <input min="0" step="0.01" type="number" value={quote.shipping_amount} onChange={ev => setQuote({ ...quote, shipping_amount: ev.target.value })} className={inputStyle} />
                  </label>
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Discount Amount
                    <input min="0" step="0.01" type="number" value={quote.discount_amount} onChange={ev => setQuote({ ...quote, discount_amount: ev.target.value })} className={inputStyle} />
                  </label>
                </div>
              </div>

              {/* Card 3: Terms & Timeline */}
              <div className="rounded-2xl border p-5 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b pb-2">3. Logistics & Custom Terms</span>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Offer Valid Until
                    <input type="date" value={quote.valid_until} onChange={ev => setQuote({ ...quote, valid_until: ev.target.value })} className={inputStyle} />
                  </label>
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Delivery Lead Time
                    <input type="text" value={quote.delivery_timeline} onChange={ev => setQuote({ ...quote, delivery_timeline: ev.target.value })} className={inputStyle} placeholder="e.g. 15-20 working days" />
                  </label>
                  <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                    Payment Terms
                    <input type="text" value={quote.payment_terms} onChange={ev => setQuote({ ...quote, payment_terms: ev.target.value })} className={inputStyle} placeholder="e.g. 50% advance, 50% on dispatch" />
                  </label>
                  <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                    Notes for Buyer
                    <textarea rows="3" value={quote.notes} onChange={ev => setQuote({ ...quote, notes: ev.target.value })} className={inputStyle} placeholder="Any specific notes or explanations for the buyer..." />
                  </label>
                  <label className="sm:col-span-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                    Quotation Terms & Conditions
                    <textarea rows="3" value={quote.terms_and_conditions} onChange={ev => setQuote({ ...quote, terms_and_conditions: ev.target.value })} className={inputStyle} placeholder="Specify standard commercial or legal clauses..." />
                  </label>
                </div>
              </div>
            </div>

            {/* Calculations & Submit block */}
            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-100 pt-5 relative z-10">
              <div className="rounded-2xl bg-slate-50 border p-4 text-xs space-y-1.5 w-full md:w-80">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Tax</span>
                  <span>₹{totals.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t pt-1.5 text-sm font-black text-slate-900">
                  <span>Grand Total</span>
                  <span>₹{totals.grand.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end items-center">
                <button type="button" onClick={() => setSelected(null)} className="rounded-xl border px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors bg-white">Cancel</button>
                <button disabled={saving} className="btn-primary text-xs font-black uppercase tracking-wider">{saving ? 'Sending…' : 'Send Quotation'}</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Shell>
  );
}

export function PartnerQuotations() {
  const auth = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth.memberProfile?.id) return;
    (async () => {
      try {
        const r = await supabase.from('marketplace_quotations').select('*,marketplace_quotation_items(*),marketplace_enquiries(enquiry_number,subject,buyer_name)').eq('industry_member_id', auth.memberProfile.id).order('created_at', { ascending: false });
        if (r.error) throw r.error;
        setRows(r.data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [auth.memberProfile?.id]);

  return (
    <Shell 
      title="Sent Quotations" 
      subtitle="Track sent commercial proposals, check revision workflows and buyer decisions."
    >
      <div className="col-span-full space-y-6">
        {error && <p className="rounded-xl bg-red-50 border border-red-205 p-4 text-sm font-semibold text-red-700">{error}</p>}
        
        {loading ? (
          <div className="flex justify-center p-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-400 font-bold text-sm animate-pulse">Loading sent quotations…</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-3xl border border-slate-200/80 shadow-sm max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-lg" />
            </div>
            <h3 className="font-black text-slate-900">No quotations sent</h3>
            <p className="text-xs text-slate-500 mt-2">You haven't built or sent any commercial quotes yet.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {rows.map(row => (
              <article key={row.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-1 border border-dashed border-slate-100 pointer-events-none rounded-[22px]" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 relative z-10">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-2 items-center">
                      <Status value={row.status} />
                      <span className="rounded-full bg-slate-100 border px-2.5 py-0.5 text-[9px] font-extrabold uppercase text-slate-600 tracking-wider">
                        Version {row.version}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-slate-900 leading-tight">
                      Quotation Ref: <span className="font-mono">{row.quotation_number}</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Buyer: <b>{row.marketplace_enquiries?.buyer_name}</b> · Enquiry: <b>{row.marketplace_enquiries?.subject}</b>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Total Value</span>
                    <b className="text-xl font-black text-slate-950">{row.currency} {Number(row.grand_total || 0).toLocaleString('en-IN')}</b>
                  </div>
                </div>

                <div className="mt-5 space-y-4 relative z-10">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Quoted Items</span>
                  <div className="divide-y border rounded-2xl overflow-hidden bg-slate-50/20">
                    {row.marketplace_quotation_items?.map(i => (
                      <div key={i.id} className="flex justify-between gap-4 p-4 text-sm bg-white">
                        <span>
                          <b className="text-slate-850 block">{i.item_name}</b>
                          {i.description && <span className="block text-xs text-slate-500 mt-0.5">{i.description}</span>}
                          <span className="block text-[11px] text-slate-400 font-medium mt-1">
                            Quantity: {i.quantity} {i.unit} × {row.currency} {Number(i.unit_price).toLocaleString('en-IN')}
                          </span>
                        </span>
                        <b className="text-slate-900 self-center shrink-0">{row.currency} {Number(i.line_total).toLocaleString('en-IN')}</b>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics breakdown */}
                <div className="mt-4 grid gap-4 rounded-2xl bg-slate-50/50 border border-slate-100 p-4 text-xs text-slate-600 sm:grid-cols-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendar} className="text-slate-455 text-xs" />
                    <div>
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Validity</span>
                      <b className="text-slate-800">{row.valid_until ? new Date(row.valid_until).toLocaleDateString() : 'N/A'}</b>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-slate-455 text-xs" />
                    <div>
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Payment Terms</span>
                      <b className="text-slate-800">{row.payment_terms || 'Flexible'}</b>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faTruck} className="text-slate-455 text-xs" />
                    <div>
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Delivery Lead Time</span>
                      <b className="text-slate-800">{row.delivery_timeline || 'N/A'}</b>
                    </div>
                  </div>
                </div>

                {/* Render Notes & T&C for supplier reference */}
                {(row.notes || row.terms_and_conditions) && (
                  <div className="mt-4 border-t border-slate-100 pt-4 space-y-3 relative z-10">
                    {row.notes && (
                      <div className="rounded-xl bg-slate-50/35 border border-slate-100 p-4">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Supplier Notes</span>
                        <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">{row.notes}</p>
                      </div>
                    )}
                    {row.terms_and_conditions && (
                      <div className="rounded-xl bg-slate-50/20 border border-slate-100 p-4">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Quotation Terms & Conditions</span>
                        <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">{row.terms_and_conditions}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Buyer feedback */}
                {(row.rejection_reason || row.revision_request) && (
                  <div className="mt-4 rounded-2xl bg-amber-50/60 border border-amber-200/50 p-4 relative z-10 flex gap-2">
                    <div className="text-amber-600 font-bold text-sm">⚠</div>
                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-wider text-amber-600">Buyer Decision Feedback</span>
                      <p className="text-xs font-semibold text-amber-800 mt-0.5 leading-relaxed">
                        {row.rejection_reason || row.revision_request}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}
