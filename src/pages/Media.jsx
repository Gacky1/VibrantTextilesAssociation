import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faNewspaper, faCalendarAlt, faTag, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

const Media = () => {
  const [gallery, setGallery] = useState([]);
  const [press, setPress] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Media Center"
        title="Visual Narrative"
        subtitle="Explore our moments, milestones, and the evolving story of the textile community."
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative overflow-hidden">
        {/* Ambient Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50/50 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-accent-50/30 rounded-full blur-[130px] pointer-events-none" />

        {/* ── Photo Gallery: Premium Visual Grid ── */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em]">Chronicles</span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              Our <span className="text-gradient italic font-medium">Moments</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-[40px] bg-gray-100 animate-pulse border border-gray-200" />
              ))
            ) : gallery.length === 0 ? (
              <div className="col-span-3 py-32 glass-ultra rounded-[48px] border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={faImage} className="text-gray-300 text-3xl" />
                </div>
                <h3 className="font-serif text-2xl font-black text-gray-900 mb-2">The gallery is empty</h3>
                <p className="text-gray-400 font-medium italic">New visual content is currently being curated.</p>
              </div>
            ) : (
              gallery.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -15 }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-white/60 cursor-pointer"
                >
                  <img src={item.image_url} alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                     <div className="absolute inset-0 noise-overlay opacity-[0.1]" />
                     <div className="relative z-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-4">
                           <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                              {item.category}
                           </span>
                        </div>
                        <h3 className="font-serif text-2xl font-black text-white leading-tight">{item.title}</h3>
                     </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* ── Press Releases: High-Density Editorial ── */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-accent-500 font-black text-[11px] uppercase tracking-[0.4em]">Media Room</span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              Press & <span className="text-gradient italic font-medium">News</span>
            </h2>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {!loading && press.length === 0 ? (
              <div className="py-24 glass-ultra rounded-[40px] border border-white/60 text-center">
                <FontAwesomeIcon icon={faNewspaper} className="text-gray-200 text-5xl mb-6" />
                <p className="text-gray-400 font-medium italic">Latest press releases will appear here.</p>
              </div>
            ) : (
              press.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 12, scale: 1.01 }}
                  className="group relative glass-ultra rounded-[32px] p-8 md:p-10 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.03)] cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-widest">
                          <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-300" />
                          {item.date}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-widest">
                          <FontAwesomeIcon icon={faTag} className="text-primary-300" />
                          {item.category}
                        </div>
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-black text-gray-900 leading-tight group-hover:text-primary-700 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-white/50 border border-white/60 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                          <FontAwesomeIcon icon={faNewspaper} className="text-xl" />
                       </div>
                       <div className="w-12 h-[1px] bg-primary-100 group-hover:w-16 transition-all duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Media;
