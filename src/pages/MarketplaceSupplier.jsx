import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faBuilding, faCalendar, faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSupplierBySlug, getSupplierProducts } from '../data/marketplaceDatabase';
import { ErrorState, LoadingSkeleton, ProductCard, VerifiedBadge } from '../components/marketplace/MarketplaceUI';

function getSafeWebsite(value) {
  try {
    const website = new URL(value || '');
    return ['http:', 'https:'].includes(website.protocol) ? website.href : '';
  } catch { return ''; }
}

export default function MarketplaceSupplier() {
  const { slug } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getSupplierBySlug(slug).then(async (supplierResult) => {
      if (!active) return;
      if (!supplierResult.success) { setError(supplierResult.error); setLoading(false); return; }
      if (!supplierResult.data) { setError('Supplier not found.'); setLoading(false); return; }
      const productsResult = await getSupplierProducts(supplierResult.data.id);
      if (!active) return;
      setSupplier(supplierResult.data);
      setProducts(productsResult.data || []);
      setError(productsResult.error || '');
      setLoading(false);
    });
    return () => { active = false; };
  }, [slug]);

  if (loading) return <><Navbar /><main className="section-container pt-36"><LoadingSkeleton /></main></>;
  if (error || !supplier) return <><Navbar /><main className="section-container pt-36"><ErrorState message={error} /></main></>;

  const website = getSafeWebsite(supplier.website);
  return <>
    <Navbar />
    <main className="pb-20 pt-24">
      <section className="bg-slate-950 px-6 py-16 text-white">
        <div className="section-container flex flex-col gap-7 md:flex-row md:items-start">
          <div className="grid h-32 w-32 shrink-0 place-items-center overflow-hidden rounded-3xl border border-white/15 bg-white text-4xl font-black text-slate-700">
            {supplier.logo_url ? <img src={supplier.logo_url} alt={`${supplier.organization_name} logo`} className="h-full w-full object-contain p-3" /> : supplier.organization_name?.[0]}
          </div>
          <div>
            <VerifiedBadge />
            <h1 className="mt-5 text-4xl font-black md:text-5xl">{supplier.organization_name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{supplier.full_description || supplier.short_description}</p>
            <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-300">
              <span><FontAwesomeIcon icon={faBuilding} /> {supplier.organization_type}</span>
              <span><FontAwesomeIcon icon={faLocationDot} /> {[supplier.city, supplier.state, supplier.country].filter(Boolean).join(', ')}</span>
              {supplier.year_established && <span><FontAwesomeIcon icon={faCalendar} /> Established {supplier.year_established}</span>}
              {supplier.is_exporter && <span><FontAwesomeIcon icon={faGlobe} /> Export ready</span>}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/account/enquiries/new?supplier=${supplier.id}`} className="btn-primary">Contact supplier</Link>
              {website && <a href={website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-bold text-white transition hover:bg-white/10">Visit website <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>}
            </div>
          </div>
        </div>
      </section>
      <section className="section-container py-14">
        <h2 className="text-2xl font-black">Capabilities</h2>
        <div className="mt-5 flex flex-wrap gap-2">{[...(supplier.materials || []), ...(supplier.techniques || []), ...(supplier.manufacturing_capabilities || [])].map((item) => <span key={item} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{item}</span>)}</div>
        <h2 className="mt-14 text-2xl font-black">Marketplace products</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </main>
    <Footer />
  </>;
}
