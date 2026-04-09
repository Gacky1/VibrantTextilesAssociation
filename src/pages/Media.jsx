import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImage, faNewspaper, faCalendarAlt, faTag, 
  faArrowRight, faExpandAlt, faTimes, faChevronLeft, faChevronRight 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

const Media = () => {
  const [gallery, setGallery] = useState([]);
  const [press, setPress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    Promise.all([
      supabase.from('media').select('*').order('created_at', { ascending: false }),
      supabase.from('press_releases').select('*').order('created_at', { ascending: false }),
    ]).then(([{ data: mediaData }, { data: pressData }]) => {
      setGallery(mediaData || []);
      setPress(pressData || []);
      setLoading(false);
    });
  }, []);

  const categories = ['All', ...new Set(gallery.map(item => item.category))];

  const filteredGallery = useMemo(() => {
    if (activeCategory === 'All') return gallery;
    return gallery.filter(item => item.category === activeCategory);
  }, [gallery, activeCategory]);

  const openLightbox = (image) => {
    const index = gallery.findIndex(item => item.id === image.id);
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => setSelectedImageIndex(null);

  const navigateLightbox = (direction) => {
    setSelectedImageIndex(prev => {
      if (direction === 'next') return (prev + 1) % gallery.length;
      return (prev - 1 + gallery.length) % gallery.length;
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <PageHero
        eyebrow="The Visual Registry"
        title="Media & Archive"
        subtitle="Capturing the rhythmic pulse of modern heritage and industrial milestones across the textile landscape."
      />

      <div className="section-container py-24">
        
        {/* ── GALLERY SECTION ── */}
        <div className="mb-32 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
            <div className="space-y-4">
              <div className="badge">Visual Chronicles</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-[0.9]">
                Immersion <span className="text-primary-600 italic">Gallery</span>
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
               {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                     activeCategory === cat 
                     ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
                     : 'bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-50 animate-pulse rounded-[32px]" />
              ))
            ) : filteredGallery.length === 0 ? (
              <div className="col-span-full py-24 text-center space-y-4 border-2 border-dashed border-gray-100 rounded-[40px]">
                 <FontAwesomeIcon icon={faImage} className="text-gray-100 text-6xl" />
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">The archive is momentarily silent.</p>
              </div>
            ) : (
              filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item)}
                  className="group relative aspect-square rounded-[40px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 flex items-end justify-between">
                    <div className="space-y-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-primary-400">{item.category}</span>
                      <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">{item.title}</h3>
                    </div>
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center">
                       <FontAwesomeIcon icon={faExpandAlt} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── PRESS SECTION ── */}
        <div className="mb-32 space-y-16">
          <div className="space-y-4 text-center">
            <div className="badge">The Foundry Feed</div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Press & Industrial Insights</h2>
            <p className="text-gray-500 max-w-2xl mx-auto italic">Exploring announcements, policy shifts, and strategic milestones.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-50 animate-pulse rounded-[32px]" />
              ))
            ) : press.length === 0 ? (
              <div className="py-24 text-center space-y-4 border border-dashed border-gray-100 rounded-[40px]">
                <FontAwesomeIcon icon={faNewspaper} className="text-gray-100 text-6xl" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Registry cleared — No current news.</p>
              </div>
            ) : (
              press.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-gray-100 p-8 md:p-12 rounded-[40px] hover:border-primary-100 hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-8"
                >
                  <div className="space-y-6 flex-1">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-primary-600 text-[10px] font-black uppercase tracking-wider bg-primary-50 px-3 py-1 rounded-full">
                        <FontAwesomeIcon icon={faCalendarAlt} className="opacity-50" />
                        {item.date}
                      </div>
                      <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                         {item.category}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  <button className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all shadow-sm">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── NEWSLETTER SECTION ── */}
        <div className="bg-gray-900 rounded-[50px] px-12 py-24 text-center space-y-12 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px] -ml-32 -mt-32" />
           <div className="space-y-6 relative z-10">
              <div className="badge border-gray-700 bg-gray-800 text-primary-400">The Resonance Loop</div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                The Global <span className="text-primary-600 italic">Digest</span>
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto italic">
                "Subscribe to our media registry for exclusive industrial reports and heritage milestones."
              </p>
           </div>

           <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto relative z-10">
              <input 
                type="email" 
                placeholder="Secure email input..." 
                className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-primary-500 transition-colors text-sm font-medium backdrop-blur-md"
              />
              <button className="btn-primary py-5 px-10 shadow-xl shadow-primary-500/20">
                Subscribe
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
           </div>
        </div>
      </div>

      {/* ── FULL SCREEN CAROUSEL / LIGHTBOX ── */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-2xl flex items-center justify-center animate-in fade-in transition-all">
           {/* Close */}
           <button 
             onClick={closeLightbox}
             className="absolute top-8 right-8 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors text-2xl"
           >
             <FontAwesomeIcon icon={faTimes} />
           </button>

           {/* Controls */}
           <button 
             onClick={() => navigateLightbox('prev')}
             className="absolute left-8 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors text-2xl"
           >
             <FontAwesomeIcon icon={faChevronLeft} />
           </button>
           <button 
             onClick={() => navigateLightbox('next')}
             className="absolute right-8 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors text-2xl"
           >
             <FontAwesomeIcon icon={faChevronRight} />
           </button>

           <div className="relative w-full h-full p-4 md:p-32 flex flex-col items-center justify-center">
              <div className="relative max-w-6xl w-full h-full flex flex-col">
                 {/* Image */}
                 <div className="flex-1 relative rounded-[40px] overflow-hidden shadow-2xl">
                    <img 
                      src={gallery[selectedImageIndex].image_url} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-contain animate-in zoom-in-95 duration-500"
                    />
                 </div>
                 
                 {/* Metadata */}
                 <div className="pt-12 text-center space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-400">
                       Registry Node {selectedImageIndex + 1} • {gallery[selectedImageIndex].category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                       {gallery[selectedImageIndex].title}
                    </h2>
                 </div>
              </div>
           </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Media;
