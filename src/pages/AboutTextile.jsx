import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faExpandAlt, faTimes, faHistory, faAward, faMicrochip, faRecycle, faGlobe } from '@fortawesome/free-solid-svg-icons';
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

  const stats = [
    { label: 'Ancient Rhythm', val: '5,000+', sub: 'Years of Heritage' },
    { label: 'Global Registry', val: '120+', sub: 'Export Markets' },
    { label: 'Artisan Hubs', val: '75+', sub: 'Strategic Nodes' },
    { label: 'Elite Cert.', val: '15+', sub: 'Industrial Standards' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      
      <PageHero
        eyebrow="The Heritage Explorer"
        title="Rhythmic Weaves of India"
        subtitle="A premium deep-dive into the tactile DNA across 29 states and regions."
      />

      <div className="section-container pb-32">
        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32 -mt-12 relative z-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 text-center space-y-3 hover:shadow-md transition-shadow">
              <p className="text-primary-600 font-bold text-[10px] uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-4xl font-black text-gray-900 tracking-tight">{stat.val}</h3>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Search and Discovery Section */}
        <div className="mb-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
            <div className="max-w-xl space-y-4">
              <div className="badge">The Catalog</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Discovery Engine</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Explore the intricate craftsmanship that defines the Indian textile civilization. Search by state, technique, or fabric type.
              </p>
            </div>
            
            <div className="relative w-full md:w-96 group">
              <FontAwesomeIcon icon={faSearch} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
              <input 
                type="text"
                placeholder="Search heritage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-600/20 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Interactive Grid */}
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
            <h3 className="text-2xl font-bold text-gray-900">No matches found for "{searchQuery}"</h3>
            <p className="text-gray-500">Try searching for a state like "Gujarat" or a fabric like "Silk".</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-primary-600 font-bold hover:underline"
            >
              Clear search
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

      {/* CTA Section */}
      <div className="section-container pb-32">
        <div className="bg-gray-900 rounded-[40px] px-12 py-24 text-center space-y-12">
          <div className="flex justify-center flex-wrap gap-4">
             <div className="badge border-gray-700 bg-gray-800 text-primary-400">Conservation</div>
             <div className="badge border-gray-700 bg-gray-800 text-primary-400">Industrial Revival</div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Preserving the Rhythmic DNA
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto italic">
              "Every thread is a biological record of our civilization's journey through time and technique."
            </p>
          </div>

          <button className="btn-primary inline-flex items-center gap-4 py-6 px-12 text-base">
            Join the Heritage Network
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutTextile;
