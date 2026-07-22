import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faCalendar, faMoneyBillWave, faTruck, faUserCheck, faGlobe, faBoxOpen, faClipboardList, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const nav = [['Overview', '/account'], ['Enquiries', '/account/enquiries'], ['Quotations', '/account/quotations'], ['Saved', '/account/saved']];

function Shell({ title, subtitle, children }) { 
  const auth = useAuth(); 
  return (
    <main data-lenis-prevent className="min-h-screen bg-slate-50 text-slate-900 bg-textile-linen">
      <header className="border-b bg-white border-slate-100">
        <div className="section-container flex flex-wrap items-center justify-between gap-4 py-4">
          <Link to="/marketplace" className="font-black text-base tracking-tight uppercase">
            VTA <span className="text-primary-700">Marketplace</span>
          </Link>
          <nav className="flex gap-5 text-xs font-black uppercase tracking-wider">
            {nav.map(([x, to]) => (
              <Link className="font-black text-slate-500 hover:text-slate-955 transition-colors" key={to} to={to}>
                {x}
              </Link>
            ))}
          </nav>
          <button 
            onClick={auth.signOut} 
            className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
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
            <p className="mt-2 text-sm font-medium text-slate-500 max-w-xl leading-relaxed">{subtitle}</p>
          </div>
        </div>

        {children}
      </section>
    </main>
  ); 
}

const Status = ({ value }) => {
  const styles = 
    value === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    value === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
    value === 'revision_requested' ? 'bg-amber-50 text-amber-750 border-amber-200' :
    value === 'sent' || value === 'viewed' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse border' :
    'bg-slate-55 text-slate-600 border-slate-200';
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${styles}`}>
      {(value || 'unknown').replaceAll('_', ' ')}
    </span>
  );
};

export default function BuyerQuotations() {
  const auth = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [review, setReview] = useState(null);
  const [decision, setDecision] = useState('');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await supabase.from('marketplace_quotations').select('*,marketplace_quotation_items(*),industry_members(organization_name,slug),marketplace_enquiries(enquiry_number,subject)').order('created_at', { ascending: false });
      if (r.error) throw r.error;
      setRows(r.data || []);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const respond = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const r = await supabase.rpc('buyer_review_quotation', {
        target_quotation_id: review.id,
        next_status: decision,
        response_reason: reason || null
      });
      if (r.error) throw r.error;
      setReview(null);
      setDecision('');
      setReason('');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Shell 
      title="My Quotations" 
      subtitle="Review custom price proposals, check delivery times and payment clauses, then approve or request modifications."
    >
      <div className="col-span-full space-y-6">
        {error && <p className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-700">{error}</p>}
        
        {loading ? (
          <div className="flex justify-center p-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-400 font-bold text-sm animate-pulse">Loading quotations records…</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center p-16 bg-white rounded-3xl border border-slate-200/80 shadow-sm max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-lg" />
            </div>
            <h3 className="font-black text-slate-900">No quotations received</h3>
            <p className="text-xs text-slate-500 mt-2">You will receive supplier quotes here after submitting enquiries.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {rows.map(row => (
              <article key={row.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-1 border border-dashed border-slate-100 pointer-events-none rounded-[22px]" />
                
                {/* Header block */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 relative z-10">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-2 items-center">
                      <Status value={row.status} />
                      <span className="rounded-full bg-slate-100 border px-2.5 py-0.5 text-[9px] font-extrabold uppercase text-slate-600 tracking-wider">
                        Version {row.version}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-slate-900 leading-tight">
                      Quotation: <span className="font-mono">{row.quotation_number}</span>
                    </h2>
                    <p className="text-xs text-slate-550">
                      Supplier: <Link to={`/marketplace/suppliers/${row.industry_members?.slug}`} className="text-primary-700 font-bold hover:underline">{row.industry_members?.organization_name}</Link> · Enquiry: <b>{row.marketplace_enquiries?.subject}</b>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Quotation Total</span>
                    <b className="text-xl font-black text-slate-950">{row.currency} {Number(row.grand_total || 0).toLocaleString('en-IN')}</b>
                  </div>
                </div>

                {/* Items & Pricing Breakdown split block */}
                <div className="mt-5 flex flex-col lg:flex-row gap-6 justify-between items-start relative z-10">
                  <div className="flex-1 w-full space-y-2.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Quoted Line Items</span>
                    <div className="divide-y rounded-2xl border border-slate-150 overflow-hidden bg-white">
                      {row.marketplace_quotation_items?.map(item => (
                        <div key={item.id} className="flex justify-between gap-4 p-4 text-sm hover:bg-slate-50/30 transition-colors">
                          <span>
                            <b className="text-slate-850 block">{item.item_name}</b>
                            {item.description && <span className="block text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</span>}
                            <span className="block text-[11px] text-slate-400 font-medium mt-1">
                              Quantity: {item.quantity} {item.unit || 'units'} × {row.currency} {Number(item.unit_price).toLocaleString('en-IN')}
                            </span>
                          </span>
                          <b className="text-slate-900 self-center shrink-0">{row.currency} {Number(item.line_total).toLocaleString('en-IN')}</b>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Receipt Summary Card */}
                  <div className="w-full lg:w-80 rounded-2xl bg-slate-50 border border-slate-150/60 p-5 text-xs space-y-3 shrink-0">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block border-b pb-1.5">Financial Breakdown</span>
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>{row.currency} {Number(row.subtotal || 0).toLocaleString('en-IN')}</span>
                    </div>
                    {row.discount_amount > 0 && (
                      <div className="flex justify-between text-emerald-650 font-bold">
                        <span>Discount</span>
                        <span>- {row.currency} {Number(row.discount_amount).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {row.tax_amount > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Estimated Tax</span>
                        <span>{row.currency} {Number(row.tax_amount).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {row.shipping_amount > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>Shipping / Freight</span>
                        <span>{row.currency} {Number(row.shipping_amount).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-slate-900 border-t pt-2.5">
                      <span>Grand Total</span>
                      <span>{row.currency} {Number(row.grand_total || 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Logistics grid block */}
                <div className="mt-5 grid gap-4 rounded-2xl bg-slate-50/50 border border-slate-100 p-4 text-xs text-slate-600 sm:grid-cols-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendar} className="text-slate-450 text-xs" />
                    <div>
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Offer Valid Until</span>
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

                {/* Supplier notes & terms (Crucial addition for issue #3!) */}
                {(row.notes || row.terms_and_conditions) && (
                  <div className="mt-5 border-t border-slate-100 pt-4 space-y-3 relative z-10">
                    {row.notes && (
                      <div className="rounded-xl bg-slate-50/50 border border-slate-100 p-4">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Supplier Notes</span>
                        <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">{row.notes}</p>
                      </div>
                    )}
                    {row.terms_and_conditions && (
                      <div className="rounded-xl bg-slate-50/30 border border-slate-100 p-4">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Quotation Terms & Conditions</span>
                        <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">{row.terms_and_conditions}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Action buttons */}
                {['sent', 'viewed', 'revision_requested'].includes(row.status) && (
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 relative z-10">
                    <button 
                      onClick={() => { setReview(row); setDecision('accepted'); }} 
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-sm transition-all"
                    >
                      Accept Offer
                    </button>
                    <button 
                      onClick={() => { setReview(row); setDecision('revision_requested'); }} 
                      className="rounded-xl border border-slate-250 hover:bg-slate-50 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 transition-all bg-white"
                    >
                      Request Revision
                    </button>
                    <button 
                      onClick={() => { setReview(row); setDecision('rejected'); }} 
                      className="rounded-xl border border-red-200 hover:bg-red-50/50 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-red-650 transition-all bg-white"
                    >
                      Reject Quotation
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal Dialog */}
      {review && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <form onSubmit={respond} className="w-full max-w-lg rounded-3xl bg-white p-7 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-1 border border-dashed border-slate-150 pointer-events-none rounded-[22px]" />
            
            <h2 className="text-2xl font-black capitalize text-slate-90">
              {decision.replaceAll('_', ' ')} Proposal
            </h2>
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Quotation: <b>{review.quotation_number}</b> · Total Value: <b>{review.currency} {Number(review.grand_total).toLocaleString('en-IN')}</b>
            </p>
            
            {decision !== 'accepted' && (
              <label className="mt-5 block text-xs font-black uppercase text-slate-500 tracking-wider">
                Feedback Reason *
                <textarea 
                  required 
                  rows="4" 
                  value={reason} 
                  onChange={e => setReason(e.target.value)} 
                  className="mt-1 w-full rounded-xl border border-slate-200 p-3.5 text-sm font-medium outline-none normal-case focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  placeholder={decision === 'revision_requested' ? "Explain what changes you require (e.g. quantity adjustments, price discount, delivery terms)..." : "Reason for rejecting this quotation..."}
                />
              </label>
            )}
            
            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button 
                type="button" 
                onClick={() => setReview(null)} 
                className="rounded-xl border border-slate-250 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                disabled={saving} 
                className={`rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all ${
                  decision === 'accepted' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {saving ? 'Processing…' : 'Confirm Action'}
              </button>
            </div>
          </form>
        </div>
      )}
    </Shell>
  );
}
