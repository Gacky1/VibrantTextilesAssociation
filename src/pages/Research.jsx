import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFlask, faLeaf, faChartBar, faPalette, faCogs, 
  faGavel, faFileAlt, faBook, faLightbulb, faArrowRight,
  faDownload, faExternalLinkAlt, faSearch, faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

const Research = () => {
  const [researchAreas, setResearchAreas] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback data for immediate professional visual presentation if DB is empty
  const defaultAreas = [
    { icon: faFlask, title: "Textile Innovation", desc: "Developing high-performance smart textiles and advanced polymer interfaces.", projects: "15+", tag: "Advanced Materials" },
    { icon: faLeaf, title: "Sustainability Loop", desc: "Closed-loop manufacturing and biodegradable fiber research for a zero-waste future.", projects: "12+", tag: "Eco-Engineering" },
    { icon: faChartBar, title: "Economic Metrics", desc: "Longitudinal studies on the post-industrial economic recovery of handloom clusters.", projects: "20+", tag: "Industrial Policy" },
    { icon: faPalette, title: "Design Semiotics", desc: "Synthesizing traditional weaving motifs with contemporary generative design algorithms.", projects: "10+", tag: "Cultural Fusion" },
    { icon: faCogs, title: "Tech Convergence", desc: "Integrating IoT and real-time sensor arrays in industrial powerloom clusters.", projects: "8+", tag: "Automation" },
    { icon: faGavel, title: "Global Compliance", desc: "Analyzing international trade frameworks and ESG compliance across 28 states.", projects: "18+", tag: "Policy Node" }
  ];

  const defaultPublications = [
    { title: "Bio-Synthetic Convergence: A New Era for Indian Handlooms", year: "2024", type: "Research Paper", category: "Materials" },
    { title: "The Economic Resilience of Kanchipuram Weaving Clusters", year: "2023", type: "Case Study", category: "Economics" },
    { title: "Smart Textiles: Integration of Conductive Fibers in Traditional Ikat", year: "2023", type: "Technical Whitepaper", category: "Innovation" }
  ];

  useEffect(() => {
    // Attempt to fetch from 'research' table
    const fetchData = async () => {
      try {
        const { data: areas } = await supabase.from('research_areas').select('*').order('title');
        const { data: pubs } = await supabase.from('research_publications').select('*').order('year', { ascending: false });
        
        if (areas && areas.length > 0) setResearchAreas(areas);
        else setResearchAreas(defaultAreas);
        
        if (pubs && pubs.length > 0) setPublications(pubs);
        else setPublications(defaultPublications);
      } catch (e) {
        setResearchAreas(defaultAreas);
        setPublications(defaultPublications);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredPubs = publications.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-textile-linen font-sans text-gray-900">
      <Navbar />
      
      <PageHero
        eyebrow="The Laboratory Registry"
        title="Research & Discovery"
        subtitle="Analyzing the biological and industrial evolution of India's rhythmic textile DNA."
      />

      <div className="section-container py-24">
        
        {/* ── METRIC BAR ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32 -mt-12 relative z-10 px-4 md:px-0">
          {[
            { val: '45+', label: 'Active Projects', sub: 'Across 28 states' },
            { val: '120+', label: 'White Papers', sub: 'Peer reviewed' },
            { val: '15', label: 'Tech Nodes', sub: 'Smart manufacturing' },
            { val: '₹12Cr', label: 'R&D Budget', sub: 'Annual investment' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[32px] shadow-xl shadow-gray-200/40 border border-gray-100 dark:border-slate-800 text-center space-y-2 hover:translate-y-[-4px] transition-all">
               <h3 className="text-4xl font-black text-gray-900 leading-none">{stat.val}</h3>
               <p className="text-[10px] font-black uppercase tracking-widest text-primary-600">{stat.label}</p>
               <p className="text-gray-400 text-[8px] font-bold uppercase tracking-tighter">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ── RESEARCH PILLARS ── */}
        <div className="mb-32 space-y-16">
          <div className="text-center space-y-4">
             <div className="badge">The Inquiry Matrix</div>
             <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Strategic Inquiry Nodes</h2>
             <p className="text-gray-500 max-w-2xl mx-auto italic">Expanding the boundaries of textile civilization through industrial inquiry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 bg-gray-50 animate-pulse rounded-[40px]" />
              ))
            ) : (
              researchAreas.map((area, idx) => (
                 <div key={idx} className="group card p-12 hover:shadow-2xl hover:border-primary-100 transition-all flex flex-col justify-between h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md relative overflow-hidden border-stitch-gold">
                   <div className="absolute top-0 right-0 p-8 text-gray-50 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all opacity-40 group-hover:opacity-100">
                      <FontAwesomeIcon icon={area.icon || faFlask} className="text-6xl" />
                   </div>

                   <div className="space-y-6 relative z-10">
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                         {area.tag}
                      </span>
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
                        {area.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed italic">
                        "{area.desc}"
                      </p>
                   </div>

                   <div className="pt-10 flex items-center justify-between border-t border-gray-50 mt-10 relative z-10">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                            <FontAwesomeIcon icon={faNewspaper} className="text-[10px]" />
                         </div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                            {area.projects} Registry Links
                         </p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRight} className="text-gray-200 group-hover:text-primary-600 group-hover:translate-x-2 transition-all" />
                   </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── PUBLICATIONS REGISTRY ── */}
        <div className="mb-32 space-y-12">
          <div className="flex flex-col md:flex-row items-end justify-between border-b border-gray-100 pb-12 gap-8">
            <div className="space-y-4">
              <div className="badge">Scholarly Node</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Digital Library</h2>
              <p className="text-gray-500 italic max-w-lg">Peer-reviewed scholarship, industrial whitepapers, and policy proposals from our internal think-tank.</p>
            </div>
            
            <div className="relative w-full md:w-80 group">
              <FontAwesomeIcon icon={faSearch} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition-colors" />
              <input 
                type="text"
                placeholder="Locate publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-600/20 focus:bg-white transition-all text-xs font-bold uppercase tracking-widest"
              />
            </div>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
             {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-32 bg-gray-50 animate-pulse rounded-[32px]" />
                ))
             ) : filteredPubs.length === 0 ? (
               <div className="py-24 text-center space-y-4 border border-dashed border-gray-100 rounded-[40px]">
                  <FontAwesomeIcon icon={faFileAlt} className="text-gray-100 text-6xl" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Registry silent for this query.</p>
               </div>
             ) : (
               filteredPubs.map((pub, idx) => (
                 <div key={idx} className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-10 rounded-[40px] border border-gray-100 dark:border-slate-800 hover:border-primary-100 hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-10 border-stitch-gold">
                    <div className="space-y-6 flex-1">
                       <div className="flex items-center gap-6">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                            {pub.type}
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">{pub.year} • {pub.category}</span>
                       </div>
                       <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">{pub.title}</h3>
                    </div>
                    <div className="flex gap-4">
                       <button className="w-14 h-14 bg-gray-50 text-gray-400 hover:bg-gray-900 hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-sm">
                          <FontAwesomeIcon icon={faDownload} />
                       </button>
                       <button className="w-14 h-14 bg-gray-50 text-gray-400 hover:bg-primary-600 hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-sm">
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                       </button>
                    </div>
                 </div>
               ))
             )}
          </div>
        </div>

        {/* ── RESEARCH PROPOSAL CTA ── */}
        <div className="bg-gray-900 bg-textile-linen-dark rounded-[50px] px-12 py-24 text-center space-y-12 relative overflow-hidden border-stitch-gold">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 opacity-10 rounded-full blur-[100px] -mr-32 -mt-32" />
           <div className="w-16 h-16 mx-auto bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl relative z-10">
              <FontAwesomeIcon icon={faLightbulb} />
           </div>
           <div className="space-y-6 relative z-10">
              <div className="badge border-gray-700 bg-gray-800 text-primary-400">Collaboration Gateway</div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                Submit an <span className="text-primary-500 italic uppercase">Inquiry</span>
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto italic">
                "We are constantly seeking to bridge rhythmic heritage with deep-tech research. Submit your proposal for the next global textile inquiry phase."
              </p>
           </div>

           <button className="btn-primary inline-flex relative z-10 items-center justify-center gap-4 py-6 px-12 text-base">
              Establish a Partnership
              <FontAwesomeIcon icon={faArrowRight} />
           </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Research;
