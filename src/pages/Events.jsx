import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faMapMarkerAlt, faArrowRight, faCheckCircle, 
  faClock, faGlobe, faTimes, faChevronRight, faChevronLeft, faSearch
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('events').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setEvents(data || []);
      setLoading(false);
    });
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(e => 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [events, searchQuery]);

  const upcoming = filteredEvents.filter(e => e.is_upcoming);
  const past = filteredEvents.filter(e => !e.is_upcoming);
  const featuredEvent = upcoming[0];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 overflow-hidden">
      <Navbar />
      
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[150px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10">
        <PageHero
          eyebrow="The Industrial Calendar"
          title="Events & Summits"
          subtitle="Exploring the rhythmic milestones where textile heritage meets industrial high-tech innovation."
        />

      <div className="section-container py-24">
        
        {/* ── SEARCH & FILTER ── */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8"
        >
          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tighter text-gray-900">Industrial Registry</h2>
            <p className="text-primary-600 text-xs font-black uppercase tracking-[0.4em]">Chronological Sequence: {filteredEvents.length} Summits</p>
          </div>
          <div className="relative w-full md:w-[450px] group">
            <FontAwesomeIcon icon={faSearch} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors z-10" />
            <input 
              type="text"
              placeholder="Search by title, city, or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-3xl shadow-sm focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all text-sm font-medium"
            />
          </div>
        </motion.div>

        {/* ── FEATURED HERO ── */}
        {!loading && featuredEvent && !searchQuery && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-40 relative group cursor-pointer" 
            onClick={() => setSelectedEvent(featuredEvent)}
          >
            <div className="h-[700px] w-full rounded-[64px] overflow-hidden relative shadow-3xl">
              <img 
                src={featuredEvent.image_url} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" 
                alt={featuredEvent.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-12 lg:p-24 space-y-10">
                <div className="flex flex-wrap items-center gap-4">
                   <div className="badge border-none bg-primary-600 text-white shadow-lg shadow-primary-500/30">Next Major Summit</div>
                   <div className="badge border-white/20 bg-white/10 backdrop-blur-md text-white">{featuredEvent.type}</div>
                </div>
                <div className="max-w-4xl space-y-4">
                  <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                    {featuredEvent.title}
                  </h1>
                  <div className="flex flex-wrap gap-10 text-white/50 font-black uppercase tracking-[0.3em] text-[10px] pt-4">
                    <div className="flex items-center gap-3"><FontAwesomeIcon icon={faCalendarAlt} className="text-primary-500" /> {featuredEvent.date}</div>
                    <div className="flex items-center gap-3"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-500" /> {featuredEvent.location}</div>
                  </div>
                </div>
                <button className="btn-primary py-7 px-14 group-hover:px-16 transition-all shadow-2xl">
                  Register Interest <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── UPCOMING REGISTRY ── */}
        <div className="mb-40 space-y-16">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <h2 className="text-5xl font-black tracking-tighter">Upcoming Sequence</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-gray-100 to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-500">PHASE 01</span>
          </motion.div>

          {loading ? (
             <div className="grid md:grid-cols-2 gap-10">
                {[1,2].map(i => <div key={i} className="h-80 bg-white shadow-sm shimmer rounded-[40px]" />)}
             </div>
          ) : upcoming.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="py-32 border-2 border-dashed border-gray-200 rounded-[50px] flex flex-col items-center justify-center text-center space-y-6"
            >
               <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                 <FontAwesomeIcon icon={faClock} className="text-gray-200 text-3xl" />
               </div>
               <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px] max-w-xs">The rhythmic pulse is steady — No upcoming summits scheduled.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {upcoming.map((event, idx) => (
                <motion.div 
                  key={event.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedEvent(event)}
                  className="group relative bg-white pb-8 rounded-[48px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
                >
                  <div className="h-72 relative overflow-hidden">
                    <img src={event.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={event.title} />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute top-6 left-6">
                      <div className="badge bg-white shadow-xl text-primary-600 border-none">{event.type}</div>
                    </div>
                  </div>
                  <div className="p-10 space-y-8">
                    <div className="space-y-4">
                       <h3 className="text-3xl font-black leading-[1.1] text-gray-900 group-hover:text-primary-600 transition-colors uppercase italic">{event.title}</h3>
                       <div className="flex gap-8 text-gray-400 font-black text-[9px] uppercase tracking-[0.3em] pt-2">
                          <p className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendarAlt} className="text-primary-400" /> {event.date}</p>
                          <p className="flex items-center gap-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-400" /> {event.location}</p>
                       </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-primary-600 transition-colors">View Protocol</span>
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-primary-600 group-hover:text-white transition-all">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* ── ARCHIVAL REGISTRY ── */}
        <div className="mb-32 space-y-12">
           <div className="flex items-center gap-6">
              <h2 className="text-4xl font-black tracking-tight text-gray-400">Historical Archives</h2>
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Phase 02</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {past.map(event => (
                <div 
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="card p-8 group hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 cursor-pointer space-y-6"
                >
                   <div className="h-44 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                      <img src={event.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={event.title} />
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">
                         <span>{event.type}</span>
                         <span>{event.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">{event.title}</h3>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* ── EVENT DETAIL MODAL ── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl animate-in fade-in" onClick={() => setSelectedEvent(null)} />
          <div className="relative w-full max-w-6xl bg-white rounded-[48px] overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl animate-in zoom-in-95">
             <button onClick={() => setSelectedEvent(null)} className="absolute top-8 right-8 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                <FontAwesomeIcon icon={faTimes} />
             </button>

             <div className="md:w-1/2 relative bg-gray-100">
                <img src={selectedEvent.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12">
                   <div className="badge border-white/40 text-white bg-white/10 backdrop-blur-md">{selectedEvent.type}</div>
                </div>
             </div>

             <div className="md:w-1/2 p-12 lg:p-20 overflow-y-auto space-y-12">
                <div className="space-y-6">
                   <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-gray-900 leading-tight">{selectedEvent.title}</h2>
                   <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100 font-bold uppercase tracking-widest text-[10px]">
                      <div className="space-y-1">
                         <span className="text-gray-400">Scheduling</span>
                         <p className="text-gray-900 whitespace-nowrap">{selectedEvent.date}</p>
                      </div>
                      <div className="space-y-1">
                         <span className="text-gray-400">Operational Hub</span>
                         <p className="text-gray-900">{selectedEvent.location}</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">The Narrative</h4>
                   <p className="text-gray-600 text-lg leading-relaxed italic">
                      Join us for a definitive gathering of textile visionaries, policy makers, and industrial titans. This event focuses on the biological and technological evolution of our civilization's rhythmic DNA.
                   </p>
                </div>

                {selectedEvent.highlights?.length > 0 && (
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Strategic Highlights</h4>
                      <div className="grid grid-cols-1 gap-4">
                         {selectedEvent.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-4 text-sm font-bold text-gray-900">
                               <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-[10px]"><FontAwesomeIcon icon={faCheckCircle} /></div>
                               {h}
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                <button className="btn-primary w-full py-6 text-base shadow-xl shadow-primary-500/20">
                   Apply for Participation
                   <FontAwesomeIcon icon={faArrowRight} />
                </button>
             </div>
          </div>
        </div>
      )}

      {/* ── CTA SECTION ── */}
      <div className="section-container pb-32">
        <div className="bg-gray-900 rounded-[50px] px-12 py-24 text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="w-16 h-16 mx-auto bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl relative z-10">
            <FontAwesomeIcon icon={faGlobe} />
          </div>
          <div className="space-y-6 relative z-10">
            <div className="badge border-gray-700 bg-gray-800 text-primary-400">The Collective Horizon</div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
              Scale Your <span className="text-primary-500 italic uppercase">Influence</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto italic">
              "Collaborate with the association to host your next exhibition, factory workshop, or global summit."
            </p>
          </div>

          <button className="btn-primary inline-flex relative z-10 items-center justify-center gap-4 py-6 px-12 text-base">
            Partner with the Registry
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      </div>

      <Footer />
    </div>
  );
};

export default Events;
