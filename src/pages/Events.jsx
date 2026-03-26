import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

const typeColors = {
  Exhibition: 'from-primary-500 to-primary-600',
  Fair: 'from-accent-500 to-accent-600',
  Conference: 'from-blue-500 to-blue-600',
  Workshop: 'from-purple-500 to-purple-600',
  Summit: 'from-green-500 to-green-600',
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Connect & Collaborate"
        title="Events & Fairs"
        subtitle="Connect, collaborate, and celebrate India's vibrant textile ecosystem"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative overflow-hidden">
        {/* Ambient Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50/50 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-accent-50/30 rounded-full blur-[120px] pointer-events-none" />

        {/* Upcoming Events: Featured Editorial Grid */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em] inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" />
              Calendar
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              Upcoming <span className="text-gradient italic font-medium">Engagements</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Curated experiences designed to foster innovation, connectivity and growth within the textile industry.
            </p>
          </div>

          <div className="space-y-12">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="glass-ultra rounded-[40px] border border-white/60 h-80 animate-pulse shadow-lg" />
              ))
            ) : upcoming.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 glass-ultra rounded-[40px] border border-dashed border-gray-200"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-3xl" />
                </div>
                <p className="font-serif text-2xl text-gray-400 font-bold">No upcoming events scheduled</p>
                <p className="text-gray-300 text-sm mt-2 uppercase tracking-widest font-black italic">Check back soon for new opportunities</p>
              </motion.div>
            ) : (
              upcoming.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-6 bg-gradient-to-br ${gradient(event.type)} opacity-0 group-hover:opacity-10 blur-3xl rounded-[60px] transition-opacity duration-700`} />
                  
                  <div className="relative glass-ultra rounded-[40px] border border-white/60 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.06)] grid lg:grid-cols-12 gap-0 min-h-[440px]">
                    <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                    
                    {/* Visual Side */}
                    <div className="lg:col-span-5 relative overflow-hidden bg-gray-100 min-h-[300px] lg:min-h-auto">
                      {event.image_url ? (
                        <img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${gradient(event.type)} opacity-20`} />
                      )}
                      
                      <div className="absolute top-8 left-8">
                        <span className={`px-5 py-2 glass-premium border border-white/20 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl`}>
                          {event.type}
                        </span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center relative">
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-primary-600 mb-2">
                            <span className="text-[11px] font-black uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-md border border-primary-100/50">Scheduled Event</span>
                            <div className="h-[1px] w-12 bg-primary-100" />
                          </div>
                          <h3 className="font-serif text-[clamp(2.2rem,3vw,3.2rem)] font-black text-gray-900 leading-tight group-hover:text-primary-600 transition-colors duration-500">{event.title}</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                          <div className="flex items-start gap-4 cursor-default">
                            <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-50 transition-colors">
                              <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-600 text-lg" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date & Time</p>
                              <p className="text-sm font-bold text-gray-700">{event.date}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 cursor-default">
                            <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-50 transition-colors">
                              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-600 text-lg" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Venue Location</p>
                              <p className="text-sm font-bold text-gray-700">{event.location}</p>
                            </div>
                          </div>
                        </div>

                        {event.highlights?.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {event.highlights.map((h, i) => (
                              <div key={i} className="flex items-center gap-2 px-3 py-1 bg-gray-50/50 rounded-full border border-gray-100">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-[10px]" />
                                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pt-8 items-center gap-6">
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`group/btn relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r ${gradient(event.type)} text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all`}
                          >
                            <span className="relative z-10">Register Now</span>
                            <FontAwesomeIcon icon={faArrowRight} className="relative z-10 transition-transform group-hover/btn:translate-x-2" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Past Events: Success Stories Grid */}
        <div className="mb-32 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-gray-100 pb-12">
            <div className="max-w-2xl space-y-4">
              <span className="text-accent-500 font-black text-[11px] uppercase tracking-[0.4em]">Historical Milestones</span>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
                Our Success <br />
                <span className="text-gradient italic font-medium">Stories</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {!loading && past.length === 0 ? (
              <div className="col-span-3 text-center py-20 glass-ultra rounded-[40px] border border-dashed border-gray-100">
                <p className="text-gray-400 font-medium">No archived events available at this time.</p>
              </div>
            ) : (
              past.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-4 bg-gradient-to-br ${gradient(event.type)} rounded-[40px] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                  
                  <div className="relative glass-ultra rounded-[32px] border border-white/60 p-8 h-full flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                    <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                    
                    {event.image_url && (
                      <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                      </div>
                    )}
                    
                    <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black text-white bg-gradient-to-r ${gradient(event.type)} mb-4 uppercase tracking-[0.2em] w-fit shadow-md`}>
                      {event.type}
                    </span>
                    
                    <h3 className="text-xl font-serif font-black text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                    
                    <div className="flex flex-col gap-1.5 mb-4">
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-[10px]" />
                        {event.date}
                      </p>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[10px]" />
                        {event.location}
                      </p>
                    </div>

                    {event.description && (
                      <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-2 mt-auto">{event.description}</p>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* CTA: Participate Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] p-16 md:p-24 text-center overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
        >
          {/* Animated Mesh Background */}
          <div className="absolute inset-0 bg-[#050508]">
            <div className="absolute inset-0 bg-mesh-gradient animate-mesh-slow opacity-40" />
            <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
          </div>
          
          <div className="relative z-10 space-y-10">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight font-black">
              Want to <span className="text-gradient italic font-medium">Participate?</span>
            </h2>
            <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Join us at our upcoming events and be part of India's textile transformation. Let's build the future together.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all"
            >
              <div className="absolute inset-0 bg-primary-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative font-black text-primary-700 text-base uppercase tracking-widest">Register Your Interest</span>
              <FontAwesomeIcon icon={faArrowRight} className="relative text-primary-600 transition-transform group-hover:translate-x-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
