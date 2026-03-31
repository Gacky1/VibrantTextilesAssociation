import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faArrowRight, faCheckCircle, faClock, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

const typeColors = {
  Exhibition: 'from-primary-500 to-primary-600',
  Fair: 'from-accent-500 to-accent-600',
  Conference: 'from-blue-500 to-blue-600',
  Workshop: 'from-purple-500 to-purple-600',
  Summit: 'from-emerald-500 to-emerald-600',
};

const Events = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('events').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      const all = data || [];
      setUpcoming(all.filter(e => e.is_upcoming));
      setPast(all.filter(e => !e.is_upcoming));
      setLoading(false);
    });
  }, []);

  const gradient = (type) => typeColors[type] || 'from-primary-500 to-primary-600';

  return (
    <div className="min-h-screen bg-dark-950 selection:bg-primary-500/20 selection:text-white">
      <Navbar />
      <PageHero
        eyebrow="Chronicles of Growth"
        title="Events & Fairs"
        subtitle="The rhythmic pulse of India's textile innovation hubs."
      />

      <div className="relative overflow-hidden">
         {/* Global Grain Layers */}
         <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
         <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />

         <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-52 relative z-10">
            
            {/* ── Section 1: Editorial Upcoming Feed ── */}
            <div className="mb-52">
               <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-32 border-b border-white/5 pb-12">
                  <div className="space-y-10 max-w-2xl">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">The Calendar</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-none tracking-tighter">
                        Upcoming <span className="text-primary-500 italic">Resonance</span>
                     </h2>
                  </div>
                  <p className="text-white/30 text-xl font-medium leading-relaxed max-w-sm italic">
                    "Curated experiences designed to foster innovation and connectivity."
                  </p>
               </div>

               <div className="space-y-24 lg:space-y-40">
                  {loading ? (
                    Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="glass rounded-[60px] h-[500px] animate-pulse border-white/5 bg-white/5" />
                    ))
                  ) : upcoming.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 glass rounded-[60px] border-white/5 flex flex-col items-center justify-center space-y-8">
                       <span className="font-brodies text-6xl text-white/10 italic">Zero Output Detected</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">Registry Silent — Check back at dawn.</span>
                    </motion.div>
                  ) : (
                    upcoming.map((event, idx) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`group relative flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-32`}
                      >
                         {/* Portrait Block */}
                         <div className="w-full lg:w-1/2 aspect-[16/10] relative overflow-hidden rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5 group-hover:border-primary-500/20 transition-all duration-700">
                            <div className="absolute inset-0 bg-dark-900" />
                            {event.image_url ? (
                              <img src={event.image_url} alt={event.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-br ${gradient(event.type)} opacity-20`} />
                            )}
                            <div className="absolute top-10 left-10">
                               <span className="px-6 py-2.5 glass rounded-full font-black text-[10px] uppercase tracking-[0.3em] text-white border-white/10 shadow-2xl backdrop-blur-3xl">
                                  {event.type}
                               </span>
                            </div>
                         </div>

                         {/* Content Block */}
                         <div className="w-full lg:w-1/2 space-y-12">
                            <div className="space-y-6">
                               <div className="flex items-center gap-4 text-primary-500">
                                  <FontAwesomeIcon icon={faClock} className="text-sm" />
                                  <span className="font-black text-[10px] uppercase tracking-[0.4em]">Scheduled Pulse</span>
                               </div>
                               <h3 className="font-brodies text-5xl lg:text-7xl text-white leading-[0.8] tracking-tighter group-hover:text-primary-500 transition-colors duration-500">
                                  {event.title}
                               </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-12 py-10 border-y border-white/5">
                               <div className="space-y-3">
                                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Genesis Date</span>
                                  <p className="text-white font-medium text-xl italic">{event.date}</p>
                               </div>
                               <div className="space-y-3">
                                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Coordinate</span>
                                  <p className="text-white font-medium text-xl italic">{event.location}</p>
                               </div>
                            </div>

                            {event.highlights?.length > 0 && (
                               <div className="flex flex-wrap gap-3">
                                  {event.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-3 px-6 py-3 glass rounded-2xl border-white/5 transition-colors">
                                       <FontAwesomeIcon icon={faCheckCircle} className="text-primary-500 text-[10px]" />
                                       <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">{h}</span>
                                    </div>
                                  ))}
                               </div>
                            )}

                            <div className="pt-8">
                               <motion.button
                                 whileHover={{ scale: 1.05 }}
                                 whileTap={{ scale: 0.98 }}
                                 className={`px-12 py-6 bg-gradient-to-r ${gradient(event.type)} text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_60px_rgba(229,46,34,0.3)] flex items-center gap-6 group/btn`}
                               >
                                  Register Interest
                                  <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-3 transition-transform" />
                               </motion.button>
                            </div>
                         </div>
                      </motion.div>
                    ))
                  )}
               </div>
            </div>

            {/* ── Section 2: Historical Archive (Bento) ── */}
            <div className="mb-52 relative">
               <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-32 border-b border-white/5 pb-12">
                  <div className="space-y-10 max-w-2xl">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">THE ARCHIVES</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-[0.8] tracking-tighter uppercase">
                        Historical <span className="text-primary-500 italic">Outputs</span>
                     </h2>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {past.map((event, idx) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ y: -10 }}
                      className="group relative glass rounded-[48px] p-12 border-white/5 flex flex-col justify-between overflow-hidden"
                    >
                       <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${gradient(event.type)} opacity-5 blur-3xl`} />
                       
                       <div className="space-y-10 relative z-10">
                          {event.image_url && (
                            <div className="h-40 rounded-[32px] overflow-hidden grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 shadow-inner">
                               <img src={event.image_url} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          
                          <div className="space-y-4">
                             <span className="text-primary-500 font-black text-[9px] uppercase tracking-[0.3em] font-brodies">{event.type}</span>
                             <h3 className="font-brodies text-4xl text-white leading-tight">{event.title}</h3>
                          </div>
                          
                          <div className="space-y-4 pt-10 border-t border-white/5">
                             <div className="flex items-center gap-4 text-white/20">
                                <FontAwesomeIcon icon={faCalendarAlt} className="text-xs" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{event.date}</span>
                             </div>
                             <div className="flex items-center gap-4 text-white/20">
                                <FontAwesomeIcon icon={faGlobe} className="text-xs" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{event.location}</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* ── Section 3: Participatory Threshold (CTA) ── */}
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

               <div className="relative z-10 px-12 lg:px-32 py-32 lg:py-48 flex flex-col items-center text-center space-y-20">
                  <div className="space-y-12">
                     <span className="text-primary-500 font-black text-[11px] uppercase tracking-[0.6em] block mb-6">The Resonance Threshold</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-[0.75] tracking-tighter">
                        Define <br /> the <br /> <span className="text-primary-500 italic">Pulse</span>
                     </h2>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-16 py-8 bg-white rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(255,255,255,0.1)] flex items-center gap-8 text-dark-950"
                  >
                     <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                     <span className="relative z-10 font-sans font-black text-[13px] uppercase tracking-[0.4em] group-hover:text-white transition-colors">Register Interest</span>
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

export default Events;
