import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import logoRect from '../assets/LogoRectTransparent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileInvoiceDollar, faCalendar, faMoneyBillWave, faTruck, 
  faUserCheck, faGlobe, faBoxOpen, faClipboardList, faChevronRight,
  faEye, faPaperPlane, faUndo, faCheckCircle, faTimesCircle, faClock 
} from '@fortawesome/free-solid-svg-icons';
import PortalShell from '../components/PortalShell';

const Status = ({ value }) => {
  const configs = {
    accepted: { style: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: faCheckCircle },
    rejected: { style: 'bg-rose-50 text-rose-700 border-rose-200', icon: faTimesCircle },
    revision_requested: { style: 'bg-amber-50 text-amber-750 border-amber-200', icon: faUndo },
    sent: { style: 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse', icon: faPaperPlane },
    viewed: { style: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: faEye }
  };
  const config = configs[value] || { style: 'bg-slate-50 text-slate-600 border-slate-200', icon: faClock };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${config.style}`}>
      <FontAwesomeIcon icon={config.icon} className="text-[10px]" />
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
    <PortalShell 
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
            <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 border border-slate-200">
              <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-lg" />
            </div>
            <h3 className="font-black text-slate-900">No quotations received</h3>
            <p className="text-xs text-slate-500 mt-2">You will receive supplier quotes here after submitting enquiries.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {rows.map(row => (
              <article key={row.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                {/* Header block */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 relative z-10">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-2 items-center">
                      <Status value={row.status} />
                      <span className="rounded-full bg-slate-100 border px-2.5 py-0.5 text-[9px] font-extrabold uppercase text-slate-600 tracking-wider">
                        Version {row.version}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-slate-905 leading-tight">
                      Quotation: <span className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{row.quotation_number}</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold">
                      Supplier: <Link to={`/marketplace/suppliers/${row.industry_members?.slug}`} className="text-rose-605 font-extrabold hover:underline">{row.industry_members?.organization_name}</Link> · Enquiry: <b className="text-slate-800">{row.marketplace_enquiries?.subject}</b>
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
                    <div className="divide-y rounded-2xl border border-slate-200 overflow-hidden bg-white">
                      {row.marketplace_quotation_items?.map(item => (
                        <div key={item.id} className="flex justify-between gap-4 p-4 text-sm hover:bg-slate-50/50 transition-colors">
                          <span>
                            <b className="text-slate-800 block font-bold">{item.item_name}</b>
                            {item.description && <span className="block text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</span>}
                            <span className="block text-[11px] text-slate-400 font-semibold mt-1">
                              Quantity: {item.quantity} {item.unit || 'units'} × {row.currency} {Number(item.unit_price).toLocaleString('en-IN')}
                            </span>
                          </span>
                          <b className="text-slate-900 self-center shrink-0 font-extrabold">{row.currency} {Number(item.line_total).toLocaleString('en-IN')}</b>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Receipt Summary Card */}
                  <div className="w-full lg:w-80 rounded-2xl bg-slate-50 border border-slate-200 p-5 text-xs space-y-3 shrink-0">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block border-b pb-1.5 border-slate-200">Financial Breakdown</span>
                    <div className="flex justify-between text-slate-650 font-medium">
                      <span>Subtotal</span>
                      <span className="text-slate-850 font-bold">{row.currency} {Number(row.subtotal || 0).toLocaleString('en-IN')}</span>
                    </div>
                    {row.discount_amount > 0 && (
                      <div className="flex justify-between text-emerald-650 font-bold">
                        <span>Discount</span>
                        <span>- {row.currency} {Number(row.discount_amount).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {row.tax_amount > 0 && (
                      <div className="flex justify-between text-slate-655 font-medium">
                        <span>Estimated Tax</span>
                        <span className="text-slate-850 font-bold">{row.currency} {Number(row.tax_amount).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {row.shipping_amount > 0 && (
                      <div className="flex justify-between text-slate-655 font-medium">
                        <span>Shipping / Freight</span>
                        <span className="text-slate-850 font-bold">{row.currency} {Number(row.shipping_amount).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-slate-900 border-t pt-2.5 border-slate-200">
                      <span>Grand Total</span>
                      <span>{row.currency} {Number(row.grand_total || 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Logistics grid block */}
                <div className="mt-5 grid gap-4 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 sm:grid-cols-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-white border flex items-center justify-center text-slate-400">
                      <FontAwesomeIcon icon={faCalendar} className="text-xs" />
                    </div>
                    <div>
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Offer Valid Until</span>
                      <b className="text-slate-800 font-bold">{row.valid_until ? new Date(row.valid_until).toLocaleDateString() : 'N/A'}</b>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-white border flex items-center justify-center text-slate-400">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="text-xs" />
                    </div>
                    <div>
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Payment Terms</span>
                      <b className="text-slate-800 font-bold">{row.payment_terms || 'Flexible'}</b>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-white border flex items-center justify-center text-slate-400">
                      <FontAwesomeIcon icon={faTruck} className="text-xs" />
                    </div>
                    <div>
                      <span className="block text-slate-400 font-bold uppercase tracking-wider text-[8px]">Delivery Lead Time</span>
                      <b className="text-slate-800 font-bold">{row.delivery_timeline || 'N/A'}</b>
                    </div>
                  </div>
                </div>

                {/* Supplier notes & terms */}
                {(row.notes || row.terms_and_conditions) && (
                  <div className="mt-5 border-t border-slate-100 pt-4 space-y-3 relative z-10">
                    {row.notes && (
                      <div className="rounded-xl bg-slate-50 border border-slate-200/50 p-4">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Supplier Notes</span>
                        <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">{row.notes}</p>
                      </div>
                    )}
                    {row.terms_and_conditions && (
                      <div className="rounded-xl bg-slate-50/50 border border-slate-200/50 p-4">
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
                      className="rounded-xl border border-slate-250 hover:bg-slate-50 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 transition-all bg-white shadow-sm"
                    >
                      Request Revision
                    </button>
                    <button 
                      onClick={() => { setReview(row); setDecision('rejected'); }} 
                      className="rounded-xl border border-red-200 hover:bg-red-50 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-red-600 transition-all bg-white shadow-sm"
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
                className="rounded-xl border border-slate-250 px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors bg-white shadow-sm"
              >
                Cancel
              </button>
              <button 
                disabled={saving} 
                className={`rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all ${
                  decision === 'accepted' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.2)]' : 'bg-rose-600 hover:bg-rose-700 shadow-[0_4px_12px_rgba(225,29,72,0.2)]'
                }`}
              >
                {saving ? 'Processing…' : 'Confirm Action'}
              </button>
            </div>
          </form>
        </div>
      )}
    </PortalShell>
  );
}
