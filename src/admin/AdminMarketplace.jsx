import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

const statusClass=(status)=>status==='approved'||status==='accepted'||status==='published'?'bg-emerald-100 text-emerald-700':status==='rejected'||status==='spam'?'bg-red-100 text-red-700':'bg-amber-100 text-amber-700';

const ProductDetails = ({ product }) => {
  return (
    <div className="mt-5 space-y-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-1/3">
          <img 
            src={product.primary_image_url || '/assets/textiles/banarasi_silk.png'} 
            alt={product.name} 
            className="aspect-[4/3] w-full rounded-2xl object-cover border border-slate-200 shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/textiles/banarasi_silk.png';
            }}
          />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Supplier</span>
            <p className="font-bold text-slate-900">{product.industry_members?.organization_name || 'N/A'}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</span>
              <p className="font-medium text-slate-700">{product.marketplace_categories?.name || 'Uncategorised'}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SKU</span>
              <p className="font-medium text-slate-700">{product.sku || 'N/A'}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClass(product.moderation_status)}`}>
              Moderation: {product.moderation_status}
            </span>
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClass(product.status)}`}>
              Status: {product.status}
            </span>
            {product.gi_tagged && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                GI Tagged: {product.gi_name || 'Yes'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-slate-50 p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h4>
        <p className="mt-2 text-sm text-slate-700 whitespace-pre-line leading-relaxed">
          {product.full_description || product.short_description || 'No description provided.'}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4 rounded-2xl border p-5">
          <h3 className="border-b pb-2 text-sm font-bold text-slate-900">Technical Specifications</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Material</dt>
              <dd className="font-bold text-slate-855">{product.material || 'N/A'}</dd>
            </div>
            {product.materials?.length > 0 && (
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <dt className="text-slate-500">Materials</dt>
                <dd className="font-bold text-slate-855">{product.materials.join(', ')}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Weave Type</dt>
              <dd className="font-bold text-slate-855">{product.weave_type || 'N/A'}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Dyeing Method</dt>
              <dd className="font-bold text-slate-855">{product.dyeing_method || 'N/A'}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Technique</dt>
              <dd className="font-bold text-slate-855">{product.technique || 'N/A'}</dd>
            </div>
            {product.techniques?.length > 0 && (
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <dt className="text-slate-500">Techniques</dt>
                <dd className="font-bold text-slate-855">{product.techniques.join(', ')}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Pattern</dt>
              <dd className="font-bold text-slate-855">{product.pattern || 'N/A'}</dd>
            </div>
            {product.motifs?.length > 0 && (
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <dt className="text-slate-500">Motifs</dt>
                <dd className="font-bold text-slate-855">{product.motifs.join(', ')}</dd>
              </div>
            )}
            {product.certifications?.length > 0 && (
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <dt className="text-slate-500">Certifications</dt>
                <dd className="font-bold text-slate-855">{product.certifications.join(', ')}</dd>
              </div>
            )}
            {product.sustainability_attributes?.length > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-500">Sustainability</dt>
                <dd className="font-bold text-slate-855">{product.sustainability_attributes.join(', ')}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="space-y-4 rounded-2xl border p-5">
          <h3 className="border-b pb-2 text-sm font-bold text-slate-900">Commercials & Logistics</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Pricing Type</dt>
              <dd className="font-bold text-slate-855 capitalize">{product.pricing_type?.replaceAll('_', ' ')}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Indicative Price</dt>
              <dd className="font-bold text-slate-855">
                {product.pricing_type === 'on_request' ? 'Price on Request' : (
                  <>
                    {product.currency} {product.indicative_price_min != null ? Number(product.indicative_price_min).toLocaleString('en-IN') : '—'} 
                    {product.indicative_price_max != null ? ` - ${Number(product.indicative_price_max).toLocaleString('en-IN')}` : ''}
                    {product.price_unit ? ` / ${product.price_unit}` : ''}
                  </>
                )}
              </dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">MOQ</dt>
              <dd className="font-bold text-slate-855">
                {product.minimum_order_quantity || '—'} {product.moq_unit || ''}
              </dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Lead Time</dt>
              <dd className="font-bold text-slate-855">
                {product.lead_time_days != null ? `${product.lead_time_days} days` : '—'}
              </dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Production Capacity</dt>
              <dd className="font-bold text-slate-855">{product.production_capacity || 'N/A'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Origin</dt>
              <dd className="font-bold text-slate-855">
                {[product.origin_city, product.origin_state].filter(Boolean).join(', ') || 'N/A'}
              </dd>
            </div>
          </dl>

          <div className="border-t border-slate-100 pt-3 mt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Capabilities</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className={product.sample_available ? "text-emerald-600 animate-pulse" : "text-slate-300"}>●</span>
                <span className={product.sample_available ? "font-bold text-slate-700" : "text-slate-400"}>Sample Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={product.customization_available ? "text-emerald-600 animate-pulse" : "text-slate-300"}>●</span>
                <span className={product.customization_available ? "font-bold text-slate-700" : "text-slate-400"}>Customization</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={product.private_label_available ? "text-emerald-600 animate-pulse" : "text-slate-300"}>●</span>
                <span className={product.private_label_available ? "font-bold text-slate-700" : "text-slate-400"}>Private Label</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={product.export_available ? "text-emerald-600 animate-pulse" : "text-slate-300"}>●</span>
                <span className={product.export_available ? "font-bold text-slate-700" : "text-slate-400"}>Export Ready</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <span className={product.domestic_shipping_available ? "text-emerald-600 animate-pulse" : "text-slate-300"}>●</span>
                <span className={product.domestic_shipping_available ? "font-bold text-slate-700" : "text-slate-400"}>Domestic Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {product.moderation_notes && (
        <div className="rounded-2xl border border-red-150 bg-red-50 p-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 font-bold">Moderation Notes</h4>
          <p className="mt-2 text-sm text-red-800 font-medium leading-relaxed">{product.moderation_notes}</p>
        </div>
      )}

      <div className="flex flex-wrap justify-between gap-4 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span>Views: <b className="text-slate-655">{product.view_count || 0}</b> · Enquiries: <b className="text-slate-655">{product.enquiry_count || 0}</b></span>
        <div className="flex gap-4">
          <span>Created: {new Date(product.created_at).toLocaleDateString()}</span>
          <span>Updated: {new Date(product.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

const EnquiryDetails = ({ enquiry }) => {
  return (
    <div className="mt-5 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3 rounded-2xl border p-5">
          <h3 className="border-b pb-2 text-sm font-bold text-slate-900">Buyer Details</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <dt className="text-slate-500">Name</dt>
              <dd className="font-bold text-slate-855">{enquiry.buyer_name || 'N/A'}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <dt className="text-slate-500">Company</dt>
              <dd className="font-bold text-slate-855">{enquiry.buyer_company || 'N/A'}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <dt className="text-slate-500">Email</dt>
              <dd className="font-bold text-slate-855 break-all">{enquiry.buyer_email || 'N/A'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Phone</dt>
              <dd className="font-bold text-slate-855">{enquiry.buyer_phone || 'N/A'}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-3 rounded-2xl border p-5">
          <h3 className="border-b pb-2 text-sm font-bold text-slate-900">Target Supplier & Product</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <dt className="text-slate-500">Supplier</dt>
              <dd className="font-bold text-slate-855">{enquiry.industry_members?.organization_name || 'N/A'}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <dt className="text-slate-500">Product</dt>
              <dd className="font-bold text-slate-855">{enquiry.marketplace_products?.name || 'General Inquiry / RFQ'}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <dt className="text-slate-500">Enquiry Type</dt>
              <dd className="font-bold text-slate-855 capitalize">{enquiry.enquiry_type?.replaceAll('_', ' ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Current Status</dt>
              <dd className="font-bold text-slate-855">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusClass(enquiry.status)}`}>
                  {enquiry.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-2xl border bg-slate-50 p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Requirement Description</h4>
        <p className="mt-2 text-sm text-slate-700 whitespace-pre-line leading-relaxed">
          {enquiry.requirement_description || 'No description provided.'}
        </p>
      </div>

      <div className="rounded-2xl border p-5">
        <h3 className="border-b pb-2 text-sm font-bold text-slate-900">Logistics & Requirements</h3>
        <dl className="mt-3 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <div className="flex justify-between border-b border-slate-100 pb-1.5">
            <dt className="text-slate-500">Requested Quantity</dt>
            <dd className="font-bold text-slate-855">
              {enquiry.quantity || '—'} {enquiry.quantity_unit || ''}
            </dd>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1.5">
            <dt className="text-slate-500">Target Price</dt>
            <dd className="font-bold text-slate-855">
              {enquiry.target_price ? `${enquiry.currency || 'INR'} ${Number(enquiry.target_price).toLocaleString('en-IN')}` : 'Open to negotiate'}
            </dd>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1.5">
            <dt className="text-slate-500">Expected Delivery</dt>
            <dd className="font-bold text-slate-855">
              {enquiry.expected_delivery_date ? new Date(enquiry.expected_delivery_date).toLocaleDateString() : 'Flexible'}
            </dd>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1.5">
            <dt className="text-slate-500">Delivery Destination</dt>
            <dd className="font-bold text-slate-855">
              {[enquiry.delivery_city, enquiry.delivery_state, enquiry.delivery_country].filter(Boolean).join(', ') || 'N/A'}
            </dd>
          </div>
          <div className="flex justify-between sm:col-span-2 pt-1.5 border-b border-slate-100 pb-1.5">
            <dt className="text-slate-500">Customization Required?</dt>
            <dd className="font-bold text-slate-855">{enquiry.customization_required ? 'Yes' : 'No'}</dd>
          </div>
          <div className="flex justify-between sm:col-span-2">
            <dt className="text-slate-500">Sample Required?</dt>
            <dd className="font-bold text-slate-855">{enquiry.sample_required ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-wrap justify-between gap-4 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span>Priority: <b className="capitalize text-slate-600">{enquiry.priority || 'Normal'}</b></span>
        <div className="flex gap-4">
          <span>Created: {new Date(enquiry.created_at).toLocaleString()}</span>
          <span>Last Message: {enquiry.last_message_at ? new Date(enquiry.last_message_at).toLocaleString() : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

const QuotationDetails = ({ quotation }) => {
  return (
    <div className="mt-5 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2 rounded-2xl border p-5">
          <h3 className="border-b pb-2 text-sm font-bold text-slate-900">Quotation Info</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <dt className="text-slate-500">Quotation Number</dt>
              <dd className="font-bold text-slate-855">{quotation.quotation_number}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <dt className="text-slate-500">Version</dt>
              <dd className="font-bold text-slate-855">{quotation.version}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-1">
              <dt className="text-slate-500">Supplier</dt>
              <dd className="font-bold text-slate-855">{quotation.industry_members?.organization_name || 'N/A'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Status</dt>
              <dd className="font-bold text-slate-855">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusClass(quotation.status)}`}>
                  {quotation.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="space-y-2 rounded-2xl border p-5">
          <h3 className="border-b pb-2 text-sm font-bold text-slate-900">Financial Summary</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Subtotal</dt>
              <dd className="font-medium text-slate-850">{quotation.currency} {Number(quotation.subtotal || 0).toLocaleString('en-IN')}</dd>
            </div>
            {quotation.discount_amount > 0 && (
              <div className="flex justify-between border-b border-slate-100 pb-1.5 text-emerald-600">
                <dt>Discount {quotation.discount_type === 'percentage' ? `(${quotation.discount_value}%)` : ''}</dt>
                <dd className="font-medium">- {quotation.currency} {Number(quotation.discount_amount).toLocaleString('en-IN')}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Tax Amount</dt>
              <dd className="font-medium text-slate-850">{quotation.currency} {Number(quotation.tax_amount || 0).toLocaleString('en-IN')}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <dt className="text-slate-500">Shipping Amount</dt>
              <dd className="font-medium text-slate-850">{quotation.currency} {Number(quotation.shipping_amount || 0).toLocaleString('en-IN')}</dd>
            </div>
            {quotation.other_charges > 0 && (
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <dt className="text-slate-500">Other Charges</dt>
                <dd className="font-medium text-slate-850">{quotation.currency} {Number(quotation.other_charges).toLocaleString('en-IN')}</dd>
              </div>
            )}
            <div className="flex justify-between text-base font-black text-slate-950 pt-1">
              <dt>Grand Total</dt>
              <dd>{quotation.currency} {Number(quotation.grand_total || 0).toLocaleString('en-IN')}</dd>
            </div>
          </dl>
        </div>
      </div>

      {quotation.marketplace_quotation_items?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-900">Quoted Items</h4>
          <div className="overflow-x-auto rounded-2xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="p-3">Item / Description</th>
                  <th className="p-3 text-right">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Tax</th>
                  <th className="p-3 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-700">
                {quotation.marketplace_quotation_items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-3">
                      <b className="block text-slate-900">{item.item_name}</b>
                      {item.description && <span className="text-xs text-slate-400">{item.description}</span>}
                    </td>
                    <td className="p-3 text-right font-medium">
                      {item.quantity} {item.unit || 'units'}
                    </td>
                    <td className="p-3 text-right font-medium">
                      {quotation.currency} {Number(item.unit_price || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-xs text-slate-500">
                      {item.tax_rate > 0 ? `${item.tax_rate}%` : '0%'}
                    </td>
                    <td className="p-3 text-right font-bold text-slate-900">
                      {quotation.currency} {Number(item.line_total || 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="rounded-2xl border p-5 space-y-4">
        <h3 className="border-b pb-2 text-sm font-bold text-slate-900">Terms & Notes</h3>
        <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <div className="flex justify-between border-b pb-1.5">
            <dt className="text-slate-500">Valid Until</dt>
            <dd className="font-bold text-slate-800">
              {quotation.valid_until ? new Date(quotation.valid_until).toLocaleDateString() : 'N/A'}
            </dd>
          </div>
          <div className="flex justify-between border-b pb-1.5">
            <dt className="text-slate-500">Delivery Timeline</dt>
            <dd className="font-bold text-slate-800">{quotation.delivery_timeline || 'N/A'}</dd>
          </div>
          <div className="flex justify-between sm:col-span-2 border-b pb-1.5">
            <dt className="text-slate-500">Payment Terms</dt>
            <dd className="font-bold text-slate-800">{quotation.payment_terms || 'N/A'}</dd>
          </div>
          <div className="flex justify-between sm:col-span-2 border-b pb-1.5">
            <dt className="text-slate-500">Delivery Terms</dt>
            <dd className="font-bold text-slate-800">{quotation.delivery_terms || 'N/A'}</dd>
          </div>
          <div className="flex justify-between sm:col-span-2 border-b pb-1.5">
            <dt className="text-slate-500">Shipping Terms</dt>
            <dd className="font-bold text-slate-800">{quotation.shipping_terms || 'N/A'}</dd>
          </div>
          <div className="flex justify-between sm:col-span-2">
            <dt className="text-slate-500">Warranty Terms</dt>
            <dd className="font-bold text-slate-800">{quotation.warranty_terms || 'N/A'}</dd>
          </div>
        </dl>

        {quotation.notes && (
          <div className="border-t pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Supplier Notes</h4>
            <p className="mt-1 text-sm text-slate-600 whitespace-pre-wrap">{quotation.notes}</p>
          </div>
        )}

        {quotation.terms_and_conditions && (
          <div className="border-t pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Terms & Conditions</h4>
            <p className="mt-1 text-sm text-slate-600 whitespace-pre-wrap">{quotation.terms_and_conditions}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-between gap-4 border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span>Quotation ID: <span className="font-mono">{quotation.id}</span></span>
        <div className="flex gap-4">
          <span>Created: {new Date(quotation.created_at).toLocaleString()}</span>
          <span>Updated: {new Date(quotation.updated_at).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default function AdminMarketplace(){
  const [tab,setTab]=useState('products'),[products,setProducts]=useState([]),[enquiries,setEnquiries]=useState([]),[quotations,setQuotations]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[search,setSearch]=useState(''),[selected,setSelected]=useState(null);
  const load=useCallback(async()=>{setLoading(true);setError('');try{const [p,e,q]=await Promise.all([supabase.from('marketplace_products').select('*,marketplace_categories(name),industry_members(organization_name,slug)').order('created_at',{ascending:false}),supabase.from('marketplace_enquiries').select('*,marketplace_products(name,slug),industry_members(organization_name)').order('created_at',{ascending:false}),supabase.from('marketplace_quotations').select('*,industry_members(organization_name),marketplace_quotation_items(*)').order('created_at',{ascending:false})]);if(p.error)throw p.error;if(e.error)throw e.error;if(q.error)throw q.error;setProducts(p.data||[]);setEnquiries(e.data||[]);setQuotations(q.data||[]);}catch(err){setError(err.message)}finally{setLoading(false)}},[]);useEffect(()=>{load()},[load]);
  const stats=useMemo(()=>[{label:'Products',value:products.length},{label:'Pending moderation',value:products.filter(p=>p.moderation_status==='pending_review').length},{label:'Enquiries',value:enquiries.length},{label:'Open enquiries',value:enquiries.filter(e=>!['closed','won','lost','spam'].includes(e.status)).length},{label:'Quotations',value:quotations.length},{label:'Accepted value',value:`₹${quotations.filter(q=>q.status==='accepted').reduce((s,q)=>s+Number(q.grand_total||0),0).toLocaleString('en-IN')}`}],[products,enquiries,quotations]);
  const source=tab==='products'?products:tab==='enquiries'?enquiries:quotations;const rows=source.filter(row=>JSON.stringify(row).toLowerCase().includes(search.toLowerCase()));
  const updateProduct=async(row,status)=>{let notes=null;if(status==='rejected'){notes=window.prompt('Rejection reason:');if(!notes?.trim())return;}const values=status==='approved'?{moderation_status:'approved',status:'published',published_at:new Date().toISOString(),moderation_notes:null}:{moderation_status:'rejected',status:'rejected',moderation_notes:notes};const {error:updateError}=await supabase.from('marketplace_products').update(values).eq('id',row.id);if(updateError)setError(updateError.message);else{setSelected(null);load()}};
  const updateEnquiry=async(row,status)=>{const {error:updateError}=await supabase.from('marketplace_enquiries').update({status}).eq('id',row.id);if(updateError)setError(updateError.message);else load()};
  return <div><div className="flex flex-wrap justify-between gap-4"><div><h1 className="text-2xl font-black">Marketplace Operations</h1><p className="mt-1 text-sm text-slate-500">Review listings, inspect commercial activity and moderate every marketplace record.</p></div><button onClick={load} className="rounded-xl border bg-white px-4 py-2 text-sm font-bold">Refresh data</button></div>
  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">{stats.map(s=><div key={s.label} className="rounded-2xl border bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{s.label}</p><p className="mt-2 text-2xl font-black">{s.value}</p></div>)}</div>
  <div className="mt-7 flex gap-2 border-b">{['products','enquiries','quotations'].map(name=><button key={name} onClick={()=>{setTab(name);setSelected(null)}} className={`px-5 py-3 text-sm font-bold capitalize ${tab===name?'border-b-2 border-primary-600 text-primary-700':'text-slate-500'}`}>{name} <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5">{name==='products'?products.length:name==='enquiries'?enquiries.length:quotations.length}</span></button>)}</div>
  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${tab}…`} className="mt-5 w-full max-w-md rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-primary-400"/>{error&&<p className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
  <div className="mt-5 overflow-hidden rounded-2xl border bg-white shadow-sm">{loading?<p className="p-10 text-center text-slate-500">Loading marketplace records…</p>:rows.length===0?<p className="p-10 text-center text-slate-500">No matching records.</p>:<div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">{tab==='products'?<tr><th className="p-4">Product</th><th className="p-4">Supplier</th><th className="p-4">Status</th><th className="p-4">Performance</th><th/></tr>:tab==='enquiries'?<tr><th className="p-4">Enquiry</th><th className="p-4">Buyer</th><th className="p-4">Supplier / Product</th><th className="p-4">Status</th><th/></tr>:<tr><th className="p-4">Quotation</th><th className="p-4">Supplier</th><th className="p-4">Total</th><th className="p-4">Status</th><th/></tr>}</thead><tbody className="divide-y">{rows.map(row=>tab==='products'?<tr key={row.id}><td className="p-4"><b className="block">{row.name}</b><span className="text-xs text-slate-500">{row.marketplace_categories?.name||'Uncategorised'} · {row.sku||'No SKU'}</span></td><td className="p-4">{row.industry_members?.organization_name}</td><td className="p-4"><span className={`rounded-full px-2 py-1 text-xs font-bold ${statusClass(row.moderation_status)}`}>{row.moderation_status}</span><span className="ml-2 text-xs text-slate-500">{row.status}</span></td><td className="p-4 text-slate-600">{row.view_count} views · {row.enquiry_count} enquiries</td><td className="p-4 text-right"><button onClick={()=>setSelected(row)} className="font-bold text-primary-700">Inspect</button></td></tr>:tab==='enquiries'?<tr key={row.id}><td className="p-4"><b className="block">{row.enquiry_number}</b><span className="text-xs text-slate-500">{row.subject}</span></td><td className="p-4"><b className="block">{row.buyer_name||'Buyer'}</b><span className="text-xs text-slate-500">{row.buyer_email}</span></td><td className="p-4"><b className="block">{row.industry_members?.organization_name}</b><span className="text-xs text-slate-500">{row.marketplace_products?.name||'General enquiry'}</span></td><td className="p-4"><select value={row.status} onChange={e=>updateEnquiry(row,e.target.value)} className="rounded-lg border px-2 py-1">{['new','viewed','responded','in_discussion','quotation_sent','accepted','rejected','won','lost','closed','spam'].map(s=><option key={s}>{s}</option>)}</select></td><td className="p-4 text-right"><button onClick={()=>setSelected(row)} className="font-bold text-primary-700">Details</button></td></tr>:<tr key={row.id}><td className="p-4"><b className="block">{row.quotation_number}</b><span className="text-xs text-slate-500">Version {row.version} · {row.marketplace_quotation_items?.length||0} items</span></td><td className="p-4">{row.industry_members?.organization_name}</td><td className="p-4 font-black">{row.currency} {Number(row.grand_total||0).toLocaleString('en-IN')}</td><td className="p-4"><span className={`rounded-full px-2 py-1 text-xs font-bold ${statusClass(row.status)}`}>{row.status}</span></td><td className="p-4 text-right"><button onClick={()=>setSelected(row)} className="font-bold text-primary-700">Details</button></td></tr>)}</tbody></table></div>}</div>
  {selected&&<div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4"><div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7"><div className="flex justify-between border-b pb-4"><h2 className="text-2xl font-black">{selected.name||selected.enquiry_number||selected.quotation_number}</h2><button onClick={()=>setSelected(null)} className="text-2xl font-bold text-slate-400 hover:text-slate-655">×</button></div>{tab==='products'?<ProductDetails product={selected}/>:tab==='enquiries'?<EnquiryDetails enquiry={selected}/>:<QuotationDetails quotation={selected}/>}{tab==='products'&&<div className="mt-5 flex justify-end gap-3 border-t pt-4"><button onClick={()=>updateProduct(selected,'rejected')} className="rounded-xl border border-red-200 px-4 py-2 font-bold text-red-600">Reject</button><button onClick={()=>updateProduct(selected,'approved')} className="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white">Approve & publish</button></div>}</div></div>}</div>;
}
