import { useState, useEffect, useMemo } from 'react';
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
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      
      <PageHero
        eyebrow="The Industrial Calendar"
        title="Events & Summits"
        subtitle="Exploring the rhythmic milestones where textile heritage meets industrial high-tech innovation."
      />

      <div className="section-container py-24">
        
        {/* ── SEARCH & FILTER ── */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight">Industrial Registry</h2>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Showing {filteredEvents.length} Gatherings</p>
          </div>
          <div className="relative w-full md:w-96 group">
            <FontAwesomeIcon icon={faSearch} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary-600 transition-colors" />
            <input 
              type="text"
              placeholder="Filter by title, city, or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-600/20 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* ── FEATURED HERO ── */}
        {!loading && featuredEvent && !searchQuery && (
          <div className="mb-32 relative group cursor-pointer" onClick={() => setSelectedEvent(featuredEvent)}>
            <div className="h-[600px] w-full rounded-[48px] overflow-hidden relative shadow-2xl">
              <img 
                src={featuredEvent.image_url} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt={featuredEvent.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-12 lg:p-24 space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                   <div className="badge bg-primary-600 text-white border-transparent">Next Major Summit</div>
                   <div className="badge border-white/20 text-white">{featuredEvent.type}</div>
                </div>
                <div className="max-w-4xl space-y-4">
                  <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                    {featuredEvent.title}
                  </h1>
                  <div className="flex flex-wrap gap-8 text-white/60 font-bold uppercase tracking-[0.2em] text-[10px]">
                    <div className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendarAlt} className="text-primary-500" /> {featuredEvent.date}</div>
                    <div className="flex items-center gap-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-500" /> {featuredEvent.location}</div>
                  </div>
                </div>
                <button className="btn-primary py-6 px-12 group-hover:gap-6 transition-all">
                  Register Interest <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── UPCOMING REGISTRY ── */}
        <div className="mb-32 space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-black tracking-tight">Upcoming Sequence</h2>
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phase 01</span>
          </div>

          {loading ? (
             <div className="grid md:grid-cols-2 gap-8">
                {[1,2].map(i => <div key={i} className="h-64 bg-gray-50 animate-pulse rounded-[40px]" />)}
             </div>
          ) : upcoming.length === 0 ? (
            <div className="py-24 border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center text-center space-y-4">
               <FontAwesomeIcon icon={faClock} className="text-gray-100 text-6xl" />
               <p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">The rhythmic pulse is steady — No upcoming summits scheduled.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {upcoming.map(event => (
                <div 
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="card group hover:border-primary-100 hover:shadow-2xl transition-all p-0 overflow-hidden flex flex-col sm:flex-row h-full"
                >
                  <div className="sm:w-2/5 relative overflow-hidden bg-gray-100 h-64 sm:h-auto">
                    <img src={event.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={event.title} />
                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="sm:w-3/5 p-10 flex flex-col justify-between space-y-8">
                    <div className="space-y-4">
                       <span className="text-primary-600 font-black text-[9px] uppercase tracking-widest">{event.type}</span>
                       <h3 className="text-2xl font-black leading-tight text-gray-900 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                       <div className="space-y-2 text-gray-400 font-bold text-[9px] uppercase tracking-widest">
                          <p><FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-primary-400" /> {event.date}</p>
                          <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-primary-400" /> {event.location}</p>
                       </div>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-gray-400 group-hover:text-primary-600 transition-colors">
                       View Protocol <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
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
                   <div className="h-40 rounded-2xl overflow-hidden bg-gray-100 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                      <img src={event.image_url} className="w-full h-full object-cover" alt={event.title} />
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

      <Footer />
    </div>
  );
};

export default Events;
