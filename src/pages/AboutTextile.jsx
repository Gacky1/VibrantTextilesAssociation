import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faArrowRight, faTimes, 
  faChartLine, faUsers, faGlobeAmericas, faShoppingBag,
  faCrown, faCogs, faUserNinja, faHome, 
  faFlask, faLeaf, faBolt,
  faBuilding, faLocationDot, faCheckCircle, faGlobe, faSpinner,
  faExpandAlt
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { getVerifiedSuppliers } from '../data/marketplaceDatabase';
import { textileData } from '../data/textileData';

const AboutTextile = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [selectedMemberCategory, setSelectedMemberCategory] = useState('');
  const [selectedMemberState, setSelectedMemberState] = useState('');

  // Heritage Discovery Engine states
  const [heritageSearchQuery, setHeritageSearchQuery] = useState('');
  const [selectedHeritageState, setSelectedHeritageState] = useState(null);

  useEffect(() => {
    let active = true;
    getVerifiedSuppliers().then((res) => {
      if (!active) return;
      if (res.success) {
        setMembers(res.data || []);
      } else {
        setError(res.error || 'Failed to fetch verified members.');
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const categoryOptions = useMemo(() => {
    const categories = new Set();
    members.forEach(member => {
      if (Array.isArray(member.product_categories)) {
        member.product_categories.forEach(cat => categories.add(cat));
      }
    });
    return Array.from(categories).sort();
  }, [members]);

  const stateOptions = useMemo(() => {
    const states = new Set();
    members.forEach(member => {
      if (member.state) states.add(member.state);
    });
    return Array.from(states).sort();
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = memberSearchQuery.trim() === '' || [
        member.organization_name,
        member.short_description,
        member.city,
        member.state,
        ...(member.product_categories || [])
      ].some(val => val?.toLowerCase().includes(memberSearchQuery.toLowerCase()));

      const matchesCategory = selectedMemberCategory === '' || 
        (member.product_categories || []).includes(selectedMemberCategory);

      const matchesState = selectedMemberState === '' || 
        member.state === selectedMemberState;

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [members, memberSearchQuery, selectedMemberCategory, selectedMemberState]);

  const filteredHeritageData = useMemo(() => {
    return textileData.filter(item => 
      item.state.toLowerCase().includes(heritageSearchQuery.toLowerCase()) ||
      item.famous.toLowerCase().includes(heritageSearchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(heritageSearchQuery.toLowerCase())
    );
  }, [heritageSearchQuery]);

  const economicStats = [
    { label: 'GDP Contribution', val: '~2.3%', sub: 'Of India\'s National GDP' },
    { label: 'Industrial Output', val: '11-13%', sub: 'Of Total Manufacturing' },
    { label: 'Workforce Hub', val: '45M+', sub: 'Direct Employment' },
    { label: 'Global Exports', val: '$36B', sub: 'Annual Performance' }
  ];

  const industrySectors = [
    {
      title: "Handloom & Traditional",
      description: "Fabrics and garments created manually by artisans.",
      focus: "Cultural preservation, artisan empowerment, heritage promotion",
      examples: "Khadi, Banarasi Silk, Ikat, Jamdani, Pashmina",
      icon: faCrown,
      tag: "Heritage"
    },
    {
      title: "Powerloom & Mechanized",
      description: "Fabrics made using mechanized looms for mass production.",
      focus: "MSME/vendor support, production efficiency, quality control",
      examples: "Cotton fabrics, polyester, denim",
      icon: faCogs,
      tag: "Industrial"
    },
    {
      title: "Apparel & Garments",
      description: "Ready-to-wear clothing for domestic and export markets.",
      focus: "Skill development, entrepreneurship, export readiness",
      examples: "Fashion wear, uniforms, casual and formal clothing",
      icon: faShoppingBag,
      tag: "Fashion"
    },
    {
      title: "Home Textiles & Furnishings",
      description: "Fabrics designed for interiors and décor.",
      focus: "Market linkage, design skill training",
      examples: "Bedsheets, curtains, carpets, upholstery",
      icon: faHome,
      tag: "Lifestyle"
    },
    {
      title: "Technical & Industrial",
      description: "Textiles engineered for functional or industrial applications.",
      focus: "Innovation, industrial collaboration, skill awareness",
      examples: "Medical textiles, protective fabrics, geotextiles, smart textiles",
      icon: faFlask,
      tag: "Innovation"
    },
    {
      title: "Natural Fibres & Yarn",
      description: "Raw materials for textile manufacturing.",
      focus: "Sustainable sourcing, quality improvement, vendor support",
      examples: "Cotton, silk, wool, jute, hemp",
      icon: faLeaf,
      tag: "Sustainability"
    }
  ];

  return (
    <div className="min-h-screen bg-textile-linen font-sans text-gray-900 dark:text-gray-100 overflow-x-hidden">
      <Navbar />
      
      <PageHero
        eyebrow="The Industrial Pulse"
        title="India's Textile Civilization"
        subtitle="A journey from the rhythmic handlooms of history to the mechanized titans of the modern era."
      />

      <div className="section-container pb-32">
        {/* Economic Significance Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32 -mt-12 relative z-10 px-4 md:px-0">
          {economicStats.map((stat, idx) => (
            <div key={idx} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[32px] shadow-sm border border-gray-100/50 dark:border-slate-800/50 text-center space-y-3 hover:shadow-md transition-shadow group">
              <p className="text-primary-600 font-bold text-[10px] uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tight transition-transform group-hover:scale-105">{stat.val}</h3>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Industry Overview Section */}
        <div className="max-w-4xl mx-auto mb-32 text-center space-y-8">
          <div className="badge inline-flex">The Sector Overview</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.1]">
            A Legacy of <span className="text-primary-600 italic">Diversity</span> and Growth.
          </h2>
          <p className="text-gray-500 text-xl leading-relaxed italic">
            "The textile industry is one of India’s oldest and most diverse sectors, spanning everything from traditional handlooms and handicrafts to modern industrial textiles and apparel manufacturing. It contributes significantly to India’s economic growth, employment generation, and export earnings, while preserving the country’s rich cultural heritage."
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest w-full">India's textile ecosystem includes:</p>
            {['Fibres, yarn, and fabrics', 'Garments and apparel', 'Handloom and artisanal textiles', 'Home textiles and furnishings', 'Technical and industrial textiles'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                {item}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
            <div className="p-8 bg-gray-50 rounded-3xl space-y-4">
              <h4 className="font-bold text-gray-900">GDP & Industrial Output</h4>
              <p className="text-sm text-gray-500">Accounting for ~2.3% of India’s GDP and a critical 11–13% of national industrial output.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl space-y-4">
              <h4 className="font-bold text-gray-900">Market Size & Vision</h4>
              <p className="text-sm text-gray-500">Present domestic market at US$ 225B (2025), projected to scale to US$ 350B by 2030.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl space-y-4">
              <h4 className="font-bold text-gray-900">Employment Engine</h4>
              <p className="text-sm text-gray-500">Providing direct livelihoods to over 45 million people and millions more across the value chain.</p>
            </div>
          </div>
        </div>
             {/* Verified Members Showcase Section */}
        <div className="mb-32 space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-gray-100 pb-12">
            <div className="max-w-xl space-y-4">
              <div className="badge">The VTA Registry</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Verified Industry Members</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Connect with VTA-certified manufacturers, artisan collectives, and export-ready vendors driving the Indian textile civilization.
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72 group">
                <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input 
                  type="text"
                  placeholder="Search members by name, city..."
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:bg-white transition-all text-sm font-medium"
                />
              </div>

              {/* Category Dropdown */}
              <select
                value={selectedMemberCategory}
                onChange={(e) => setSelectedMemberCategory(e.target.value)}
                className="w-full sm:w-48 px-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:bg-white transition-all text-sm font-semibold text-gray-600"
              >
                <option value="">All Categories</option>
                {categoryOptions.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>

              {/* State Dropdown */}
              <select
                value={selectedMemberState}
                onChange={(e) => setSelectedMemberState(e.target.value)}
                className="w-full sm:w-48 px-4 py-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:bg-white transition-all text-sm font-semibold text-gray-600"
              >
                <option value="">All States</option>
                {stateOptions.map((st, idx) => (
                  <option key={idx} value={st}>{st}</option>
                ))}
              </select>

              {/* Clear Button */}
              {(memberSearchQuery || selectedMemberCategory || selectedMemberState) && (
                <button
                  onClick={() => {
                    setMemberSearchQuery('');
                    setSelectedMemberCategory('');
                    setSelectedMemberState('');
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 bg-gray-200 hover:bg-gray-300 transition-colors text-sm font-bold rounded-xl text-gray-650"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Member Grid */}
          {loading ? (
            <div className="py-32 flex flex-col items-center justify-center space-y-4">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-primary-600 text-4xl" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Loading Registry...</p>
            </div>
          ) : error ? (
            <div className="py-24 text-center space-y-4">
              <h3 className="text-xl font-bold text-red-600">Error loading registry</h3>
              <p className="text-gray-500 italic">{error}</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="py-32 text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">No members match your criteria</h3>
              <p className="text-gray-500 italic">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => {
                  setMemberSearchQuery('');
                  setSelectedMemberCategory('');
                  setSelectedMemberState('');
                }}
                className="text-primary-600 font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member) => {
                const getInitials = (name) => {
                  if (!name) return 'VTA';
                  return name
                    .split(' ')
                    .map(word => word[0])
                    .join('')
                    .slice(0, 3)
                    .toUpperCase();
                };

                return (
                  <div 
                    key={member.id}
                    className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-100 dark:border-slate-800 rounded-[40px] hover:shadow-xl transition-all duration-500 p-10 flex flex-col justify-between overflow-hidden border-stitch"
                  >
                    {/* Verified Badge */}
                    <div className="absolute top-8 right-8 flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-200">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>VTA Verified</span>
                    </div>

                    <div className="space-y-6">
                      {/* Logo / Initials */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-primary-700 font-black text-lg shadow-sm overflow-hidden">
                        {member.logo_url ? (
                          <img src={member.logo_url} alt={member.organization_name} className="w-full h-full object-cover" />
                        ) : (
                          getInitials(member.organization_name)
                        )}
                      </div>

                      {/* Title & Metadata */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                          {member.organization_name}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-wider text-gray-400">
                          <span>{member.organization_type}</span>
                          {member.is_exporter && (
                            <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <FontAwesomeIcon icon={faGlobe} /> Export Ready
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                        <FontAwesomeIcon icon={faLocationDot} className="text-gray-400" />
                        <span>{[member.city, member.state].filter(Boolean).join(', ')}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                        {member.short_description || 'A verified industry member of Vibrant Textiles Association.'}
                      </p>

                      {/* Category Pills */}
                      {Array.isArray(member.product_categories) && member.product_categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {member.product_categories.map((cat, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-450 uppercase tracking-widest border border-gray-100">
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer CTA */}
                    <div className="pt-8 mt-6 border-t border-gray-100 flex items-center justify-between">
                      <Link 
                        to={`/marketplace/suppliers/${member.slug}`}
                        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary-600 group-hover:gap-5 transition-all w-full"
                      >
                        View Supplier Profile
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Heritage Grid Introduction */}
        <div className="mb-16 space-y-8 border-t border-gray-100 pt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
            <div className="max-w-xl space-y-4">
              <div className="badge">The Visual Registry</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Heritage Discovery Engine</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Explore the intricate craftsmanship that defines the Indian textile civilization across its unique state identities.
              </p>
            </div>
            
            <div className="relative w-full md:w-96 group">
              <FontAwesomeIcon icon={faSearch} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
              <input 
                type="text"
                placeholder="Search heritage, states, or techniques..."
                value={heritageSearchQuery}
                onChange={(e) => setHeritageSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-600/20 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* State-wise Heritage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredHeritageData.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedHeritageState(item)}
              className="group relative h-[400px] rounded-[40px] overflow-hidden cursor-pointer bg-gray-100 hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <img 
                src={item.image} 
                alt={item.state}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1582142401825-783286395b4f?q=80&w=1470&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest font-black text-primary-400 bg-primary-900/50 backdrop-blur-md px-3 py-1 rounded-full">
                      {item.region}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">{item.state}</h3>
                  <p className="text-xs text-gray-300 font-medium line-clamp-1">{item.type} • {item.famous}</p>
                  
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-400">
                    Explore History <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <FontAwesomeIcon icon={faExpandAlt} />
              </div>
            </div>
          ))}
        </div>

        {filteredHeritageData.length === 0 && (
          <div className="py-32 text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">No results matching "{heritageSearchQuery}"</h3>
            <p className="text-gray-500 italic">Try searching for state names, silk varieties, or weaving techniques.</p>
            <button 
              onClick={() => setHeritageSearchQuery('')}
              className="text-primary-600 font-bold hover:underline"
            >
              Reset search
            </button>
          </div>
        )}
      </div>

      {/* State Detail Modal */}
      {selectedHeritageState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedHeritageState(null)}
          />
          
          <div className="relative w-full max-w-6xl bg-textile-linen rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500 max-h-[90vh] border-stitch-gold">
            <button 
              onClick={() => setSelectedHeritageState(null)}
              className="absolute top-8 right-8 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Left: Content */}
            <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto space-y-12 bg-transparent">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="badge">{selectedHeritageState.region} India</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary-600">{selectedHeritageState.type} Heritage</div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900">{selectedHeritageState.state}</h1>
                <p className="text-xl text-primary-600 font-black tracking-tight">{selectedHeritageState.famous}</p>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-4">The Narrative</h4>
                <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-primary-600 pl-8">
                  {selectedHeritageState.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Craft Type</p>
                  <p className="font-bold">{selectedHeritageState.type}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Staple Weaves</p>
                  <p className="font-bold">{selectedHeritageState.famous.split(',')[0]}</p>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="hidden md:block w-1/2 relative bg-gray-100">
              <img 
                src={selectedHeritageState.image} 
                alt={selectedHeritageState.state} 
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1582142401825-783286395b4f?q=80&w=1470&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AboutTextile;
