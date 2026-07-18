import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faLeaf, faLocationDot, faBox, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const VerifiedBadge = () => (
  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40">
    <FontAwesomeIcon icon={faCheckCircle} className="text-[9px]" /> Verified
  </span>
);

export const StatusBadge = ({ status = 'unknown' }) => (
  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold capitalize text-slate-700 dark:text-slate-300">
    {status.replaceAll('_', ' ')}
  </span>
);

export function PriceDisplay({ product }) {
  if (product.pricing_type === 'on_request') {
    return <span className="font-extrabold text-rose-600 dark:text-rose-455">Price on Request</span>;
  }
  return (
    <span className="font-extrabold text-slate-900 dark:text-white">
      <FontAwesomeIcon icon={faIndianRupeeSign} className="mr-0.5 text-xs" />
      {Number(product.indicative_price_min || 0).toLocaleString('en-IN')}
      {product.indicative_price_max ? ` – ${Number(product.indicative_price_max).toLocaleString('en-IN')}` : ''}
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase ml-1">/ {product.price_unit || 'unit'}</span>
    </span>
  );
}

export function ProductCard({ product }) {
  return (
    <motion.article 
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-md relative border-stitch group"
    >
      <Link to={`/marketplace/products/${product.slug}`} className="block">
        <div className="aspect-[4/3] bg-slate-150 dark:bg-slate-950 overflow-hidden relative">
          <img 
            src={product.primary_image_url || '/assets/textiles/banarasi_silk.png'} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
        </div>
        
        <div className="p-5 relative z-10">
          <div className="mb-3 flex items-center justify-between gap-2">
            {product.gi_tagged ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/30 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40">
                <FontAwesomeIcon icon={faLeaf} className="text-[9px]" /> GI Tagged
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-700 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/40">
                B2B Catalog
              </span>
            )}
            <VerifiedBadge />
          </div>
          
          <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-455 transition-colors line-clamp-1 leading-tight">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs text-slate-655 dark:text-slate-400 font-medium leading-relaxed">
            {product.short_description}
          </p>
          
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="label-woven text-[9px]">
              <PriceDisplay product={product} />
            </div>
          </div>

          <div className="mt-3.5 flex justify-between text-[11px] text-slate-550 dark:text-slate-400 font-bold">
            <span>
              <FontAwesomeIcon icon={faBox} className="text-slate-400 mr-1" /> MOQ {product.minimum_order_quantity || '—'} {product.moq_unit || ''}
            </span>
            <span>
              <FontAwesomeIcon icon={faLocationDot} className="text-slate-400 mr-1" /> {product.origin_state || 'India'}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export const LoadingSkeleton = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
      <div key={i} className="h-96 animate-pulse rounded-3xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800" />
    ))}
  </div>
);

export const EmptyState = ({ title = 'No products found', message = 'Try modifying your search or filters to see other listings.' }) => (
  <div className="rounded-3xl border-2 border-dashed border-slate-250 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-16 text-center max-w-lg mx-auto">
    <FontAwesomeIcon icon={faBox} className="text-4xl text-slate-300 dark:text-slate-700 mb-4" />
    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{title}</h3>
    <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">{message}</p>
  </div>
);

export const ErrorState = ({ message, retry }) => (
  <div className="rounded-3xl border border-red-200 bg-red-50/90 dark:bg-red-950/20 dark:border-red-900/30 p-8 text-center text-red-800 dark:text-red-400 max-w-md mx-auto">
    <p className="text-sm font-semibold">{message || 'Something went wrong.'}</p>
    {retry && (
      <button 
        className="mt-4 px-5 py-2.5 rounded-xl bg-red-650 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all" 
        onClick={retry}
      >
        Try Again
      </button>
    )}
  </div>
);
