import { useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMagnifyingGlass, faSliders, faStore, 
  faTags, faBuilding, faMapMarkerAlt, faScissors, faSitemap 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getMarketplaceCategories, getMarketplaceProducts, getProductCluster } from '../data/marketplaceDatabase';
import { EmptyState, ErrorState, LoadingSkeleton, ProductCard } from '../components/marketplace/MarketplaceUI';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('default');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      getMarketplaceProducts({ search, category, searchType }),
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
  }, [search, category, searchType]);

  const groupedProducts = useMemo(() => {
    if (searchType === 'default') return null;
    const groups = {};
    products.forEach((p) => {
      let key = 'Other';
      if (searchType === 'member') {
        key = p.industry_members?.organization_name || 'Unassigned Supplier';
      } else if (searchType === 'location') {
        const city = p.origin_city || p.industry_members?.city || '';
        const state = p.origin_state || p.industry_members?.state || '';
        key = [city, state].filter(Boolean).join(', ') || 'Unknown Location';
      } else if (searchType === 'textile') {
        key = p.marketplace_categories?.name || p.material || 'General Textiles';
      } else if (searchType === 'cluster') {
        key = getProductCluster(p);
      }

      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, [products, searchType]);

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
              Source Exceptional Indian Textiles
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
                  placeholder={
                    searchType === 'member' ? 'Search by Industry Member / supplier organization name…' :
                    searchType === 'location' ? 'Search by origin state, city or supplier location…' :
                    searchType === 'textile' ? 'Search by textile type, material name or category…' :
                    searchType === 'cluster' ? 'Search by traditional craft cluster name…' :
                    'Search products, weaving materials, signature techniques…'
                  }
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

            {/* Option Pills for Search/Grouping Mode */}
            <div className="mt-6 flex flex-wrap items-center gap-2 max-w-4xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-350 dark:text-slate-400 mr-2">Search & Group By:</span>
              {[
                { id: 'default', label: 'Products', icon: faTags },
                { id: 'member', label: 'Supplier', icon: faBuilding },
                { id: 'location', label: 'Location', icon: faMapMarkerAlt },
                { id: 'textile', label: 'Textile', icon: faScissors }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSearchType(opt.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                    searchType === opt.id
                      ? 'bg-amber-500 border-amber-600 text-slate-950 font-black shadow-[0_2px_10px_rgba(245,158,11,0.25)]'
                      : 'bg-white/10 border-white/10 text-slate-200 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={opt.icon} className="text-xs" />
                  {opt.label}
                </button>
              ))}
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
              <h2 className="text-3xl font-black uppercase tracking-tight">
                {searchType === 'member' ? 'Grouped by Industry Partner' :
                 searchType === 'location' ? 'Grouped by Craft Location' :
                 searchType === 'textile' ? 'Grouped by Textile Type' :
                 searchType === 'cluster' ? 'Grouped by Textile Cluster' :
                 'Sourcing Hub Directory'}
              </h2>
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
            searchType === 'default' ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="space-y-16">
                {groupedProducts.map(([groupName, groupItems]) => (
                  <div key={groupName} className="space-y-6">
                    {/* Styled group divider with stitch border */}
                    <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-3">
                      <h3 className="text-sm font-black uppercase tracking-tight flex items-center gap-2 text-slate-850 dark:text-slate-200">
                        <FontAwesomeIcon 
                          icon={
                            searchType === 'member' ? faBuilding :
                            searchType === 'location' ? faMapMarkerAlt :
                            searchType === 'textile' ? faScissors :
                            faSitemap
                          } 
                          className="text-xs text-rose-600 dark:text-rose-455"
                        />
                        {groupName}
                      </h3>
                      <span className="rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-2.5 py-0.5 text-[10px] font-black text-slate-500">
                        {groupItems.length} {groupItems.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {groupItems.map(p => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
