import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faArrowRight, faExpandAlt, faTimes, 
  faChartLine, faUsers, faGlobeAmericas, faShoppingBag,
  faCrown, faCogs, faUserNinja, faHome, 
  faFlask, faLeaf, faBolt 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { textileData } from '../data/textileData';

const AboutTextile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(null);

  const filteredData = useMemo(() => {
    return textileData.filter(item => 
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.famous.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const economicStats = [
    { label: 'Economic Contribution', val: '~2.3%', sub: 'Of India\'s GDP' },
    { label: 'Workforce Hub', val: '45M+', sub: 'Direct Employment' },
    { label: 'Market Velocity', val: '$225B', sub: 'Projected Size 2025' },
    { label: 'Global Presence', val: '$36B', sub: 'Annual Exports Value' }
  ];

  const industrySectors = [
    {
      title: "Handloom & Traditional",
      description: "Fabrics and garments created manually by artisans with a deep focus on cultural preservation and artisan empowerment.",
      examples: "Khadi, Banarasi Silk, Ikat, Jamdani, Pashmina",
      icon: faCrown,
      tag: "Heritage"
    },
    {
      title: "Powerloom & Mechanized",
      description: "Mechanized production for mass scale, driving efficiency, MSME support, and stringent quality control.",
      examples: "Cotton fabrics, polyester, denim",
      icon: faCogs,
      tag: "Industrial"
    },
    {
      title: "Apparel & Garments",
      description: "Ready-to-wear clothing for domestic and global markets, focusing on skill development and export readiness.",
      examples: "Fashion wear, uniforms, casual/formal clothing",
      icon: faShoppingBag,
      tag: "Fashion"
    },
    {
      title: "Home Textiles & Furnishings",
      description: "Fabrics engineered for interiors and décor, bridging market linkage with advanced design skill training.",
      examples: "Bedsheets, curtains, carpets, upholstery",
      icon: faHome,
      tag: "Lifestyle"
    },
    {
      title: "Technical & Industrial",
      description: "High-performance engineered textiles for medical, protective, and functional industrial applications.",
      examples: "Medical textiles, geotextiles, smart textiles",
      icon: faFlask,
      tag: "Innovation"
    },
    {
      title: "Natural Fibres & Yarn",
      description: "The raw soul of manufacturing with a focus on sustainable sourcing and vendor support quality.",
      examples: "Cotton, silk, wool, jute, hemp",
      icon: faLeaf,
      tag: "Sustainability"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
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
            <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 text-center space-y-3 hover:shadow-md transition-shadow group">
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
            "The textile industry is one of India’s oldest and most diverse sectors, spanning from traditional handlooms to modern industrial apparel manufacturing. It contributes significantly to economic growth while preserving our rich cultural DNA."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
            <div className="p-8 bg-gray-50 rounded-3xl space-y-4">
              <h4 className="font-bold text-gray-900">GDP Contribution</h4>
              <p className="text-sm text-gray-500">Contributing up to 13% of industrial output and consistently driving national economic metrics.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl space-y-4">
              <h4 className="font-bold text-gray-900">Employment Node</h4>
              <p className="text-sm text-gray-500">A primary employment engine providing livelihoods to over 45 million people directly across India.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl space-y-4">
              <h4 className="font-bold text-gray-900">Global Launchpad</h4>
              <p className="text-sm text-gray-500">Positioning India as a leading global exporter with strong growth targets reaching $350B by 2030.</p>
            </div>
          </div>
        </div>

        {/* Strategic Segments Section */}
        <div className="mb-32 space-y-16">
          <div className="text-center space-y-4">
             <div className="badge">Structural Pillars</div>
             <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Key Industry Segments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {industrySectors.map((sector, idx) => (
                <div key={idx} className="group p-10 bg-white border border-gray-100 rounded-[40px] hover:shadow-xl hover:border-transparent transition-all duration-500 space-y-8 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 text-gray-50 group-hover:text-primary-50 transition-colors">
                      <FontAwesomeIcon icon={sector.icon} className="text-7xl" />
                   </div>
                   <div className="relative z-10 space-y-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                         {sector.tag}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900">{sector.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                         {sector.description}
                      </p>
                      <div className="space-y-3 pt-4 border-t border-gray-100">
                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Key Specializations</p>
                         <p className="text-sm font-bold text-gray-700">{sector.examples}</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-600/20 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* State-wise Heritage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredData.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedState(item)}
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

        {filteredData.length === 0 && (
          <div className="py-32 text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">No results matching "{searchQuery}"</h3>
            <p className="text-gray-500 italic">Try searching for state names, silk varieties, or weaving techniques.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-primary-600 font-bold hover:underline"
            >
              Reset search
            </button>
          </div>
        )}
      </div>

      {/* State Detail Modal */}
      {selectedState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedState(null)}
          />
          
          <div className="relative w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500 max-h-[90vh]">
            <button 
              onClick={() => setSelectedState(null)}
              className="absolute top-8 right-8 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Left: Content */}
            <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto space-y-12 bg-white">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="badge">{selectedState.region} India</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary-600">{selectedState.type} Heritage</div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900">{selectedState.state}</h1>
                <p className="text-xl text-primary-600 font-black tracking-tight">{selectedState.famous}</p>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-4">The Narrative</h4>
                <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-primary-600 pl-8">
                  {selectedState.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Craft Type</p>
                  <p className="font-bold">{selectedState.type}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Staple Weaves</p>
                  <p className="font-bold">{selectedState.famous.split(',')[0]}</p>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="hidden md:block w-1/2 relative bg-gray-100">
              <img 
                src={selectedState.image} 
                alt={selectedState.state} 
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
