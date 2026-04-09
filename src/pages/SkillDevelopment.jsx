import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCertificate, faChalkboardTeacher, faIndustry, faDollarSign, 
  faHandshake, faBook, faHandHoldingHeart, faPalette, faFlask, 
  faBriefcase, faLeaf, faScissors, faArrowRight, faTrophy, 
  faSearch, faCheckCircle, faClock, faGlobe 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

const SkillDevelopment = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const defaultPrograms = [
    {
      title: "Handloom Weaving Protocol",
      icon: faHandHoldingHeart,
      category: "Heritage",
      duration: "3 Months",
      level: "Elite Legacy",
      desc: "Master traditional handloom techniques and modern rhythmic weaving patterns with professional heritage accuracy.",
      features: ["Traditional techniques", "Quality control", "Market linkage"],
      color: 'text-primary-600',
      bg: 'bg-primary-50'
    },
    {
      title: "Digital Textile Design & CAD",
      icon: faPalette,
      category: "Design",
      duration: "6 Months",
      level: "Advanced",
      desc: "Synthesizing digital textile design architecture with color theory foundations and industrial software.",
      features: ["CAD software", "Color theory", "Portfolio building"],
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: "Global Quality Control",
      icon: faFlask,
      category: "Tech",
      duration: "2 Months",
      level: "Professional",
      desc: "Analyzing global textile testing methods and international regulatory frameworks for industrial export compliance.",
      features: ["Lab testing", "Certification", "Documentation"],
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: "Export Entrepreneurship",
      icon: faBriefcase,
      category: "Management",
      duration: "1 Month",
      level: "Global Visionary",
      desc: "Architecting your textile legacy with market intelligence, financial modeling, and global scalability strategies.",
      features: ["Business planning", "Marketing", "Finance"],
      color: 'text-gray-900',
      bg: 'bg-gray-100'
    },
    {
      title: "Sustainable Dyeing Loops",
      icon: faLeaf,
      category: "Tech",
      duration: "1 Month",
      level: "Eco-Master",
      desc: "Exploring bio-circular dyeing methods and the rhythmic evolution of organic industrial chemistry.",
      features: ["Natural dyes", "Eco-friendly", "Traditional methods"],
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      title: "Architectural Couture",
      icon: faScissors,
      category: "Design",
      duration: "4 Months",
      level: "Professional",
      desc: "Comprehensive garment engineering from conceptual pattern drawing to high-end industrial finishing.",
      features: ["Pattern making", "Stitching", "Finishing"],
      color: 'text-primary-600',
      bg: 'bg-primary-50'
    }
  ];

  const categories = ['All', 'Heritage', 'Design', 'Tech', 'Management'];

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data } = await supabase.from('skill_programs').select('*').order('sort_order');
        if (data && data.length > 0) setPrograms(data);
        else setPrograms(defaultPrograms);
      } catch (e) {
        setPrograms(defaultPrograms);
      }
      setLoading(false);
    };
    fetchPrograms();
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [programs, searchQuery, activeCategory]);

  const benefits = [
    { icon: faCertificate, title: "Global Accreditation", desc: "Government-recognized industrial certificates.", color: 'text-primary-600', bg: 'bg-primary-50' },
    { icon: faChalkboardTeacher, title: "Industrial Mentors", desc: "Titans of the textile industry as training leads.", color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: faIndustry, title: "Factory Immersion", desc: "Hands-on experience in high-tech industrial workshops.", color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: faDollarSign, title: "Economic Support", desc: "Subsidized fees and heritage scholarships.", color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: faHandshake, title: "Chain Placement", desc: "Direct linkage to global supply chain partners.", color: 'text-primary-600', bg: 'bg-primary-50' },
    { icon: faBook, title: "Technical Library", desc: "Access to the association's dynamic research nodes.", color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <PageHero
        eyebrow="The Training Registry"
        title="Skill Development"
        subtitle="Empowering the rhythmic evolution of India's textile workforce through industrial high-tech training."
      />

      <div className="section-container py-24">
        
        {/* ── METRIC NODES ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32 -mt-12 relative z-10 px-4 md:px-0">
          {[
            { val: '25,000+', label: 'Artisans Trained', sub: 'Since inception' },
            { val: '120+', label: 'Training Nodes', sub: 'Across 28 states' },
            { val: '85%', label: 'Placement Rate', sub: 'Industrial chain' },
            { val: '₹4.5Cr', label: 'Scholarships', sub: 'Annual disbursement' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] shadow-xl shadow-gray-200/40 border border-gray-100 text-center space-y-2">
               <h3 className="text-4xl font-black text-gray-900 leading-none">{stat.val}</h3>
               <p className="text-[10px] font-black uppercase tracking-widest text-primary-600">{stat.label}</p>
               <p className="text-gray-400 text-[8px] font-bold uppercase tracking-tighter">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ── FLAGSHIP PROTOCOL MASTERCLASS ── */}
        <div className="mb-32">
          <div className="card p-0 overflow-hidden border-gray-100 shadow-2xl rounded-[50px]">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/5 relative min-h-[500px] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&q=80&w=1200" 
                  alt="Weaving Masterclass" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 space-y-2">
                  <div className="badge border-white/40 text-white bg-white/10 backdrop-blur-md">Elite Protocol</div>
                  <h4 className="text-white text-3xl font-black tracking-tight">The Weaving <span className="text-primary-500 italic">Core</span></h4>
                </div>
              </div>
              
              <div className="w-full lg:w-3/5 p-12 lg:p-20 flex flex-col justify-center bg-gray-50 space-y-12">
                <div className="space-y-6">
                  <div className="badge">Flagship Masterclass</div>
                  <h3 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Advanced <span className="text-primary-600 italic uppercase">Heritage</span></h3>
                  <p className="text-gray-500 text-xl leading-relaxed italic border-l-4 border-primary-500 pl-8 mx-0">
                    "A definitive transition from local craftsmanship to high-end industrial heritage production, optimized for the global luxury market."
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-10 my-10 border-y border-gray-200">
                  {[
                    { label: 'Phase', val: 'Advanced' },
                    { label: 'Cycle', val: '24 Weeks' },
                    { label: 'Output', val: 'Global' },
                    { label: 'Standard', val: 'ISO 9001' }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-xl font-black text-gray-900 tracking-tighter">{stat.val}</p>
                    </div>
                  ))}
                </div>

                <button className="btn-primary w-fit px-12 py-6 text-base shadow-xl shadow-primary-500/20">
                  Request Official Syllabus
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRAINING REGISTRY GRID ── */}
        <div className="mb-32 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-12 gap-8">
            <div className="space-y-4">
              <div className="badge">Learning Verticals</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Mosaic of <span className="text-primary-600 italic">Skillsets</span></h2>
              <p className="text-gray-500 italic max-w-lg">Decoded training tracks architecture for the modern industrial craftsmanship landscape.</p>
            </div>
            
            <div className="flex flex-col gap-6 w-full md:w-auto">
               <div className="flex flex-wrap gap-2 justify-end">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeCategory === cat 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
               <div className="relative group self-end w-full md:w-80">
                  <FontAwesomeIcon icon={faSearch} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition-colors" />
                  <input 
                    type="text"
                    placeholder="Search vertical registry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-600/20 focus:bg-white transition-all text-xs font-bold uppercase tracking-widest"
                  />
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-50 animate-pulse rounded-[40px]" />
              ))
            ) : filteredPrograms.length === 0 ? (
               <div className="col-span-full py-24 text-center space-y-4 border border-dashed border-gray-100 rounded-[40px]">
                  <FontAwesomeIcon icon={faGlobe} className="text-gray-100 text-6xl" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Vertical registry silent for this filter.</p>
               </div>
            ) : (
              filteredPrograms.map((program, idx) => (
                <div
                  key={idx}
                  className="card group hover:scale-[1.02] hover:shadow-2xl hover:border-primary-100 transition-all flex flex-col p-12 space-y-8 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-16 h-16 ${program.bg} rounded-2xl flex items-center justify-center text-2xl shadow-sm ${program.color} group-hover:bg-primary-600 group-hover:text-white transition-all`}>
                      <FontAwesomeIcon icon={program.icon} />
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">{program.level}</p>
                       <div className="flex items-center gap-2 justify-end text-sm font-black tracking-tight text-gray-900">
                          <FontAwesomeIcon icon={faClock} className="text-primary-400" />
                          {program.duration}
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                     <span className="text-[9px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{program.category} Node</span>
                     <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">{program.title}</h3>
                     <p className="text-gray-500 text-sm leading-relaxed italic border-l-2 border-gray-100 pl-4">"{program.desc}"</p>
                  </div>

                  <div className="pt-8 border-t border-gray-50 flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                      {program.features.map((f, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-50 text-[9px] font-black uppercase tracking-widest text-gray-400 rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                    <button className="w-full py-4 rounded-2xl bg-gray-50 text-gray-900 font-black text-[10px] uppercase tracking-[0.2em] group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                       Establish Enrollment
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── THE INDUSTRIAL STANDARD ── */}
        <div className="mb-32 space-y-16">
          <div className="text-center space-y-4">
            <div className="badge">Compliance & Scaling</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Industrial Advantage</h2>
            <p className="text-gray-500 max-w-2xl mx-auto italic">Every training vertical is aligned with global manufacturing excellence and digital legacy preservation.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group p-10 bg-white border border-gray-100 rounded-[40px] hover:border-primary-100 hover:shadow-xl transition-all space-y-6"
              >
                <div className={`w-14 h-14 ${benefit.bg} ${benefit.color} rounded-2xl flex items-center justify-center text-2xl group-hover:bg-primary-600 group-hover:text-white transition-all`}>
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-black text-gray-900 tracking-tight">{benefit.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA SECTION ── */}
        <div className="bg-gray-900 rounded-[64px] px-12 py-24 text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 opacity-10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="w-16 h-16 mx-auto bg-primary-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-xl relative z-10">
            <FontAwesomeIcon icon={faTrophy} />
          </div>
          <div className="space-y-6 relative z-10">
            <div className="badge border-gray-700 bg-gray-800 text-primary-400">Join the Registry</div>
            <h2 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight">
              Scale Your <span className="text-primary-500 italic uppercase">Expertise</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto italic">
              "Transition from local craft to global industrial titans through our benchmarked training protocols."
            </p>
          </div>

          <button className="btn-primary inline-flex relative z-10 items-center justify-center gap-4 py-7 px-16 text-base shadow-2xl shadow-primary-500/30">
            Apply for Certification Phase
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          
          <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.5em] pt-8 relative z-10">
            VTA REGISTRY NODE ACTIVE • GLOBAL STANDARDS ENABLED
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SkillDevelopment;
