import { useCallback, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare, faBuilding, faChartLine, faDownload, faGlobe,
  faLandmark, faLayerGroup, faLocationDot, faPeopleGroup, faRotate,
  faScroll, faShieldHalved, faStore, faTags,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import logoRect from '../assets/LogoRectTransparent.png';

const number = new Intl.NumberFormat('en-IN');
const metricDefinitions = [
  ['textiles', 'Documented textiles', faLayerGroup, 'bg-indigo-50 text-indigo-700'],
  ['gi_tagged', 'GI-tagged traditions', faTags, 'bg-emerald-50 text-emerald-700'],
  ['clusters', 'Textile clusters', faLocationDot, 'bg-amber-50 text-amber-700'],
  ['artisans', 'Documented artisans', faPeopleGroup, 'bg-rose-50 text-rose-700'],
  ['verified_suppliers', 'Verified suppliers', faBuilding, 'bg-cyan-50 text-cyan-700'],
  ['published_products', 'Published products', faStore, 'bg-violet-50 text-violet-700'],
  ['research_records', 'Research records', faScroll, 'bg-slate-100 text-slate-700'],
  ['marketplace_enquiries', 'Marketplace enquiries', faChartLine, 'bg-orange-50 text-orange-700'],
];

function downloadCsv(data) {
  const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const rows = [
    ['VTA State Stakeholder Summary'],
    ['State', data.scope.state], ['Ministry', data.scope.ministry_name], ['Generated', new Date().toISOString()], [],
    ['Metric', 'Value'],
    ...metricDefinitions.map(([key, label]) => [label, data.metrics[key] || 0]),
    ['Won enquiries', data.metrics.won_enquiries || 0],
    ['Recorded export value', data.metrics.recorded_export_value || 0], [],
    ['Textile', 'City', 'Material', 'Technique', 'Category', 'GI tagged'],
    ...(data.textiles || []).map((item) => [item.name, item.city, item.material, item.technique, item.category, item.gi_tag ? 'Yes' : 'No']), [],
    ['Cluster', 'City'], ...(data.clusters || []).map((item) => [item.name, item.city]), [],
    ['Supplier', 'City', 'Type'], ...(data.suppliers || []).map((item) => [item.organization_name, item.city, item.organization_type]),
  ];
  const blob = new Blob([rows.map((row) => row.map(escape).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `vta-${data.scope.state.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-summary.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function Empty({ children }) {
  return <p className="rounded-2xl border border-dashed bg-slate-50 p-8 text-center text-sm text-slate-500">{children}</p>;
}

export default function StateStakeholderDashboard() {
  const auth = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [section, setSection] = useState('overview');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const { data: result, error: rpcError } = await supabase.rpc('get_state_stakeholder_dashboard');
      if (rpcError) throw rpcError;
      setData(result);
    } catch (caught) {
      setError(caught.message?.includes('schema cache')
        ? 'The State Stakeholder database upgrade has not been applied or its schema cache is not ready.'
        : caught.message || 'Unable to load the state dashboard.');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  const maxMaterial = useMemo(() => Math.max(1, ...(data?.materials || []).map((item) => Number(item.total) || 0)), [data]);
  const maxExport = useMemo(() => Math.max(1, ...(data?.export_by_year || []).map((item) => Number(item.value) || 0)), [data]);
  const conversion = data?.metrics?.marketplace_enquiries
    ? Math.round((Number(data.metrics.won_enquiries || 0) / Number(data.metrics.marketplace_enquiries)) * 100)
    : 0;

  return <main data-lenis-prevent className="min-h-screen bg-[#f4f7f8] text-slate-900">
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="section-container flex flex-wrap items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3"><img src={logoRect} alt="VTA" className="h-9 w-auto"/><span className="hidden text-sm font-black uppercase tracking-wider sm:block">State Intelligence Portal</span></Link>
        <div className="flex items-center gap-3"><span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 sm:inline-flex"><FontAwesomeIcon icon={faShieldHalved} className="mr-2"/>State-scoped access</span><button onClick={auth.signOut} className="rounded-xl border px-4 py-2 text-xs font-bold">Sign out</button></div>
      </div>
    </header>

    <section className="section-container py-8 sm:py-10">
      {loading ? <div className="grid min-h-[55vh] place-items-center"><div className="text-center"><div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600"/><p className="mt-4 text-sm text-slate-500">Preparing your state intelligence dashboard…</p></div></div>
        : error ? <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-white p-8 text-center"><h1 className="text-xl font-black text-red-800">Dashboard unavailable</h1><p className="mt-3 text-sm text-red-700">{error}</p><button onClick={load} className="btn-primary mt-6"><FontAwesomeIcon icon={faRotate}/> Retry</button></div>
        : data && <>
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-[#12394a] to-primary-800 p-7 text-white shadow-xl sm:p-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div><p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300"><FontAwesomeIcon icon={faLandmark} className="mr-2"/>{data.scope.ministry_name}</p><h1 className="mt-4 text-3xl font-black sm:text-5xl">{data.scope.state} Textile Intelligence</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">A state-scoped view of documented textile heritage, clusters, artisans, research, verified suppliers and aggregated marketplace activity.</p><p className="mt-4 text-xs text-slate-400">Signed in as {data.scope.representative_name || auth.profile?.email}{data.scope.designation ? ` · ${data.scope.designation}` : ''}</p></div>
              <div className="flex flex-wrap gap-3"><button onClick={load} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/15"><FontAwesomeIcon icon={faRotate} className="mr-2"/>Refresh</button><button onClick={() => downloadCsv(data)} className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900"><FontAwesomeIcon icon={faDownload} className="mr-2"/>Export summary</button></div>
            </div>
          </div>

          <nav className="mt-6 flex gap-2 overflow-x-auto rounded-2xl border bg-white p-2 shadow-sm">{[['overview','Overview'],['heritage','Heritage & clusters'],['industry','Industry ecosystem']].map(([key,label])=><button key={key} onClick={()=>setSection(key)} className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-bold ${section===key?'bg-primary-600 text-white':'text-slate-500 hover:bg-slate-50'}`}>{label}</button>)}</nav>

          {section === 'overview' && <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{metricDefinitions.map(([key,label,icon,colors])=><article key={key} className="rounded-2xl border bg-white p-5 shadow-sm"><div className={`grid h-11 w-11 place-items-center rounded-xl ${colors}`}><FontAwesomeIcon icon={icon}/></div><p className="mt-5 text-3xl font-black">{number.format(data.metrics[key] || 0)}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p></article>)}</div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-lg font-black">Material coverage</h2><p className="text-sm text-slate-500">Documented traditions by primary material</p></div><FontAwesomeIcon icon={faLayerGroup} className="text-primary-600"/></div><div className="mt-6 space-y-4">{(data.materials || []).map(item=><div key={item.material}><div className="flex justify-between text-sm"><b>{item.material}</b><span>{item.total}</span></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-cyan-500" style={{width:`${Math.max(6,(Number(item.total)/maxMaterial)*100)}%`}}/></div></div>)}{!data.materials?.length&&<Empty>No material data is recorded for this state.</Empty>}</div></article>
              <article className="rounded-3xl border bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-lg font-black">Recorded export trend</h2><p className="text-sm text-slate-500">Values recorded in the Textile Explorer dataset</p></div><FontAwesomeIcon icon={faGlobe} className="text-emerald-600"/></div><div className="mt-6 flex min-h-52 items-end gap-3">{(data.export_by_year || []).map(item=><div key={item.year} className="flex min-w-12 flex-1 flex-col items-center"><span className="mb-2 text-[10px] font-bold text-slate-500">{number.format(item.value)}</span><div className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-300" style={{height:`${Math.max(12,(Number(item.value)/maxExport)*145)}px`}}/><span className="mt-2 text-xs font-bold">{item.year}</span></div>)}{!data.export_by_year?.length&&<div className="w-full"><Empty>No export series is recorded for this state.</Empty></div>}</div></article>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3"><article className="rounded-3xl border bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Recorded export value</p><p className="mt-3 text-3xl font-black">{number.format(data.metrics.recorded_export_value || 0)}</p><p className="mt-2 text-xs text-slate-500">Dataset units; confirm source methodology before official publication.</p></article><article className="rounded-3xl border bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Won enquiry rate</p><p className="mt-3 text-3xl font-black">{conversion}%</p><p className="mt-2 text-xs text-slate-500">Aggregate of state supplier enquiries; no buyer identity is exposed.</p></article><article className="rounded-3xl border bg-white p-6"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Last refreshed</p><p className="mt-3 text-lg font-black">{new Date(data.last_refreshed).toLocaleString('en-IN')}</p><p className="mt-2 text-xs text-slate-500">Live from the VTA operational database.</p></article></div>
          </>}

          {section === 'heritage' && <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <article className="overflow-hidden rounded-3xl border bg-white shadow-sm"><div className="border-b p-6"><h2 className="text-xl font-black">Documented textiles</h2><p className="text-sm text-slate-500">Public heritage records assigned to {data.scope.state}</p></div>{data.textiles?.length?<div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase text-slate-500"><tr><th className="p-4">Textile</th><th className="p-4">Origin</th><th className="p-4">Classification</th><th className="p-4">GI</th><th/></tr></thead><tbody className="divide-y">{data.textiles.map(item=><tr key={item.id}><td className="p-4"><div className="flex items-center gap-3"><img src={item.thumbnail || '/assets/textiles/banarasi_silk.png'} alt="" className="h-12 w-16 rounded-lg object-cover"/><b>{item.name}</b></div></td><td className="p-4">{item.city || '—'}<span className="block text-xs text-slate-500">{item.cluster || 'Cluster not linked'}</span></td><td className="p-4">{item.material || '—'}<span className="block text-xs text-slate-500">{item.technique || item.category || '—'}</span></td><td className="p-4">{item.gi_tag?<span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">GI tagged</span>:'—'}</td><td className="p-4"><Link to={`/textile-explorer/${item.slug}`} target="_blank" className="text-primary-700" title="Open public record"><FontAwesomeIcon icon={faArrowUpRightFromSquare}/></Link></td></tr>)}</tbody></table></div>:<div className="p-6"><Empty>No textiles are recorded for this state.</Empty></div>}</article>
            <article className="rounded-3xl border bg-white p-6 shadow-sm"><h2 className="text-xl font-black">Cluster directory</h2><div className="mt-5 space-y-3">{(data.clusters || []).map(item=><div key={item.id} className="rounded-2xl border bg-slate-50 p-4"><b>{item.name}</b><p className="mt-1 text-xs font-bold text-primary-700"><FontAwesomeIcon icon={faLocationDot} className="mr-1"/>{item.city || data.scope.state}</p>{item.description&&<p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">{item.description}</p>}</div>)}{!data.clusters?.length&&<Empty>No clusters are recorded for this state.</Empty>}</div></article>
          </div>}

          {section === 'industry' && <article className="mt-6 overflow-hidden rounded-3xl border bg-white shadow-sm"><div className="border-b p-6"><h2 className="text-xl font-black">Verified industry ecosystem</h2><p className="text-sm text-slate-500">Public supplier profiles headquartered in {data.scope.state}</p></div>{data.suppliers?.length?<div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">{data.suppliers.map(item=><div key={item.id} className="rounded-2xl border p-5"><div className="flex items-center gap-3">{item.logo_url?<img src={item.logo_url} alt="" className="h-12 w-12 rounded-xl object-contain"/>:<div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 font-black text-primary-700">{item.organization_name?.[0]}</div>}<div><h3 className="font-black">{item.organization_name}</h3><p className="text-xs text-slate-500">{item.organization_type || 'Industry Partner'}</p></div></div><p className="mt-4 text-sm text-slate-600"><FontAwesomeIcon icon={faLocationDot} className="mr-2 text-slate-400"/>{item.city || data.scope.state}</p><div className="mt-3 flex flex-wrap gap-1.5">{(item.product_categories || []).slice(0,4).map(category=><span key={category} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">{category}</span>)}</div><Link to={`/marketplace/suppliers/${item.slug}`} target="_blank" className="mt-5 inline-flex text-xs font-bold text-primary-700">Open public profile <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2"/></Link></div>)}</div>:<div className="p-6"><Empty>No verified suppliers are currently recorded for this state.</Empty></div>}</article>}

          <p className="mt-8 text-center text-xs text-slate-400">State scope is assigned by VTA Administration and enforced by the database. Figures reflect currently recorded VTA data and should be validated before official statistical publication.</p>
        </>}
    </section>
  </main>;
}
