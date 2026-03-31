import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faNewspaper, faCalendarAlt, faTag, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
    <div className="min-h-screen bg-dark-950 selection:bg-primary-500/20 selection:text-white">
      <Navbar />
      <PageHero
        eyebrow="The Narrative"
        title="Media Center"
        subtitle="Exploring the rhythmic evolution of the textile visionary landscape."
      />

      <div className="relative overflow-hidden">
         {/* Global Grain Layers */}
         <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
         <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />

         <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-52 relative z-10">
            
            {/* ── Section 1: Editorial Visual Narrative (Gallery) ── */}
            <div className="mb-52">
               <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-32 border-b border-white/5 pb-12">
                  <div className="space-y-10 max-w-2xl">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">The Chronicles</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-none tracking-tighter">
                        Visual <span className="text-primary-500 italic">Moments</span>
                     </h2>
                  </div>
                  <p className="text-white/30 text-xl font-medium leading-relaxed max-w-sm italic">
                    "Moments and milestones captured in the pulse of modern heritage."
                  </p>
               </div>

               <div className="grid md:grid-cols-6 lg:grid-rows-2 gap-8 h-auto lg:h-[1200px]">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="glass rounded-[60px] animate-pulse border-white/5 bg-white/5 lg:col-span-2" />
                    ))
                  ) : gallery.length === 0 ? (
                    <div className="col-span-full py-40 glass rounded-[60px] border-white/5 flex flex-col items-center justify-center space-y-8">
                       <span className="font-brodies text-6xl text-white/10 italic">Archive Silent</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">No visual output registered.</span>
                    </div>
                  ) : (
                    gallery.map((item, idx) => {
                      const gridConfigs = [
                        'lg:col-span-4 lg:row-span-1',
                        'lg:col-span-2 lg:row-span-1',
                        'lg:col-span-2 lg:row-span-1',
                        'lg:col-span-4 lg:row-span-1',
                        'lg:col-span-6 lg:row-span-1',
                      ];
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          className={`group relative overflow-hidden rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5 cursor-pointer ${gridConfigs[idx % 5]}`}
                        >
                           <div className="absolute inset-0 bg-dark-900" />
                           <img src={item.image_url} alt={item.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                           
                           {/* Editorial Hover Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 p-12 flex flex-col justify-end">
                              <div className="absolute inset-0 noise-overlay opacity-30" />
                              <div className="relative z-10 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 space-y-6">
                                 <span className="px-6 py-2 glass rounded-full font-black text-[10px] uppercase tracking-[0.3em] text-white border-white/20 backdrop-blur-3xl">
                                    {item.category}
                                 </span>
                                 <h3 className="font-brodies text-4xl lg:text-5xl text-white leading-none tracking-tighter">{item.title}</h3>
                              </div>
                           </div>
                        </motion.div>
                      );
                    })
                  )}
               </div>
            </div>

            {/* ── Section 2: Press Room (Magazine List) ── */}
            <div className="mb-52">
               <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-32 border-b border-white/5 pb-12">
                  <div className="space-y-10 max-w-2xl">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">The Registry</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-none tracking-tighter">
                        Press & <span className="text-primary-500 italic">News</span>
                     </h2>
                  </div>
               </div>

               <div className="space-y-8 max-w-5xl mx-auto">
                  {!loading && press.length === 0 ? (
                    <div className="py-32 glass rounded-[60px] border-white/5 text-center flex flex-col items-center justify-center space-y-6">
                       <FontAwesomeIcon icon={faNewspaper} className="text-white/10 text-6xl" />
                       <p className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em]">Awaiting Transmission</p>
                    </div>
                  ) : (
                    press.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 20 }}
                        className="group relative glass rounded-[48px] p-12 border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-12 transition-all duration-700 cursor-pointer overflow-hidden"
                      >
                         <div className="absolute inset-0 noise-overlay opacity-5" />
                         <div className="absolute -inset-2 bg-gradient-to-r from-primary-600/5 to-accent-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                         <div className="flex-1 space-y-10 relative z-10">
                            <div className="flex items-center gap-10">
                               <div className="flex items-center gap-4 text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">
                                  <FontAwesomeIcon icon={faCalendarAlt} className="opacity-40" />
                                  {item.date}
                               </div>
                               <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                               <div className="flex items-center gap-4 text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">
                                  <FontAwesomeIcon icon={faTag} className="opacity-40" />
                                  {item.category}
                               </div>
                            </div>
                            <h3 className="font-brodies text-4xl lg:text-6xl text-white leading-[0.8] tracking-tighter group-hover:text-primary-500 transition-colors">
                               {item.title}
                            </h3>
                         </div>
                         
                         <div className="flex items-center gap-8 relative z-10">
                            <div className="w-20 h-20 glass rounded-[28px] flex items-center justify-center text-white/20 group-hover:text-white border-white/10 group-hover:bg-primary-600 transition-all duration-500 shadow-2xl">
                               <FontAwesomeIcon icon={faNewspaper} className="text-2xl" />
                            </div>
                            <FontAwesomeIcon icon={faArrowRight} className="text-white/10 group-hover:text-primary-500 group-hover:translate-x-4 transition-all text-2xl" />
                         </div>
                      </motion.div>
                    ))
                  )}
               </div>
            </div>

            {/* ── Section 3: Media Threshold (CTA) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[80px] overflow-hidden group/cta"
            >
               <div className="absolute inset-0 bg-dark-900 border border-white/5">
                  <div className="absolute inset-0 noise-overlay opacity-30" />
                  <div className="absolute inset-0 grain-overlay opacity-20" />
                  <div className="absolute inset-0 bg-primary-600/5 transition-colors group-hover/cta:bg-primary-600/10 duration-1000" />
               </div>

               <div className="relative z-10 px-12 lg:px-32 py-32 lg:py-48 flex flex-col items-center text-center space-y-20 text-white">
                  <div className="space-y-12">
                     <span className="text-primary-500 font-black text-[11px] uppercase tracking-[0.6em] block mb-6">The Collaborative Threshold</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-[0.75] tracking-tighter">
                        Forge <br /> <span className="text-primary-500 italic">Discovery</span>
                     </h2>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-16 py-8 bg-white rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(255,255,255,0.1)] flex items-center gap-8 text-dark-950"
                  >
                     <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                     <span className="relative z-10 font-sans font-black text-[13px] uppercase tracking-[0.4em] group-hover:text-white transition-colors">Subscribe to Registry</span>
                     <FontAwesomeIcon icon={faArrowRight} className="relative z-10 group-hover:text-white transition-colors text-xl group-hover:translate-x-3 transition-transform" />
                  </motion.button>
               </div>
            </motion.div>
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default Media;
