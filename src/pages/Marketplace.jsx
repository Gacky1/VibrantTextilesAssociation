import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSliders, faStore } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getMarketplaceCategories, getMarketplaceProducts } from '../data/marketplaceDatabase';
import { EmptyState, ErrorState, LoadingSkeleton, ProductCard } from '../components/marketplace/MarketplaceUI';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      getMarketplaceProducts({ search, category }),
      getMarketplaceCategories()
    ]);
    setProducts(p.data || []);
    setCategories(c.data || []);
    setError(p.error);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(load, 250);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <>
      <Navbar />
      <main className="bg-stone-50 dark:bg-stone-950 bg-textile-linen min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
        
        {/* Textile Canvas Hero Banner */}
        <section className="relative px-6 pb-24 pt-40 text-white overflow-hidden bg-textile-linen-dark shadow-lg border-b border-slate-900">
          {/* Subtle background overlay blobs */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/10 via-amber-500/5 to-indigo-900/15 mix-blend-overlay pointer-events-none" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
          
          <div className="section-container relative z-10">
            {/* Woven tag label badge */}
            <div className="label-woven text-[9px] mb-4 text-slate-600 dark:text-slate-400 bg-white/90">
              VTA // B2B DIRECT DIRECTORY
            </div>
            
            <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl uppercase">
              Source Exceptional Indian Textiles.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-300 font-medium leading-relaxed">
              Discover verified manufacturers, heritage handloom collectives, direct exporters, and specialist textile services. Send secure enquiries and RFQs in seconds.
            </p>

            {/* Sewn search panel card */}
            <div className="mt-10 flex max-w-4xl flex-col gap-3 rounded-3xl p-3 bg-white/95 dark:bg-slate-900/95 border border-slate-200/60 dark:border-slate-800 shadow-2xl relative border-stitch text-slate-900 dark:text-white md:flex-row">
              <label className="flex flex-1 items-center gap-3 px-3">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-slate-400 dark:text-slate-500 text-sm" />
                <input 
                  type="text"
                  className="w-full bg-transparent py-3 outline-none text-sm font-bold placeholder-slate-450 dark:placeholder-slate-500 text-slate-900 dark:text-white" 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  placeholder="Search products, weaving materials, signature techniques…"
                />
              </label>
              
              <label className="flex items-center gap-2 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 px-4 py-1.5 flex-shrink-0">
                <FontAwesomeIcon icon={faSliders} className="text-slate-400 dark:text-slate-500 text-xs" />
                <select 
                  className="bg-transparent py-2 outline-none text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 cursor-pointer min-w-[150px]" 
                  value={category} 
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.slug} className="text-slate-900 dark:text-white bg-white dark:bg-slate-900 font-semibold">{c.name}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </section>

        {/* Decorative saree tassel divider */}
        <div className="fringe-divider" />

        {/* Main Grid Section */}
        <section className="section-container py-16 px-4 sm:px-8">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800/80 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-rose-600 dark:text-rose-455">
                <FontAwesomeIcon icon={faStore} className="text-sm" />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified Listings</span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Marketplace Directory</h2>
            </div>
            
            <div className="label-woven text-[9px] bg-white dark:bg-stone-900 px-3 py-1.5">
              RESULTS // {products.length} ITEMS FOUND
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState message={error} retry={load} />
          ) : products.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
