import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faArrowRight, faCheckCircle, faClock, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Chronicles of Growth"
        title="Events & Fairs"
        subtitle="The rhythmic pulse of India's textile innovation hubs."
      />

      <div className="section-container py-24">
        
        {/* ── Section 1: Upcoming Events ── */}
        <div className="mb-32">
          <div className="mb-16">
            <div className="badge">The Calendar</div>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">
              Strategic engagements designed to foster innovation and cross-border connectivity.
            </p>
          </div>

          <div className="space-y-12">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="card h-96 animate-pulse border-gray-100 bg-gray-50" />
              ))
            ) : upcoming.length === 0 ? (
              <div className="py-24 card border-dashed flex flex-col items-center justify-center text-center space-y-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-200 text-5xl" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Registry silent — No upcoming events.</p>
              </div>
            ) : (
              upcoming.map((event) => (
                <div
                  key={event.id}
                  className="card p-0 overflow-hidden flex flex-col lg:flex-row gap-0 hover:border-primary-200 transition-all shadow-sm"
                >
                  <div className="lg:w-1/3 aspect-video lg:aspect-auto bg-gray-100 relative overflow-hidden">
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <FontAwesomeIcon icon={faImage} className="text-4xl" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="badge bg-white/90 backdrop-blur-sm border-gray-100 text-primary-600">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  <div className="lg:w-2/3 p-8 lg:p-12 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-primary-600 font-bold text-[10px] uppercase tracking-widest">
                        <FontAwesomeIcon icon={faClock} />
                        Scheduled Event
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                        {event.title}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-100">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                          <p className="text-gray-900 font-bold">{event.date}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                          <p className="text-gray-900 font-bold">{event.location}</p>
                        </div>
                      </div>

                      {event.highlights?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {event.highlights.map((h, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-100 flex items-center gap-2">
                              <FontAwesomeIcon icon={faCheckCircle} className="text-primary-500" />
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-10">
                      <button className="btn-primary">
                        Register Interest
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Section 2: Historical Archive ── */}
        <div className="mb-32">
          <div className="mb-16">
            <div className="badge">The Archives</div>
            <h2 className="section-title">Past Events</h2>
            <p className="section-subtitle">
              A record of past milestones and legacy gatherings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {past.map((event) => (
              <div
                key={event.id}
                className="card group hover:border-primary-200 transition-all flex flex-col space-y-6"
              >
                {event.image_url ? (
                  <div className="h-48 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img src={event.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-48 rounded-xl bg-gray-50 flex items-center justify-center text-gray-200">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-4xl" />
                  </div>
                )}
                
                <div className="space-y-4 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-primary-600 font-bold text-[9px] uppercase tracking-widest">{event.type}</span>
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="opacity-50" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: CTA ── */}
        <div className="bg-gray-900 rounded-[40px] px-12 py-24 text-center space-y-12">
          <div className="w-16 h-16 mx-auto bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl">
            <FontAwesomeIcon icon={faGlobe} />
          </div>
          <div className="space-y-6">
            <div className="badge border-gray-700 bg-gray-800 text-primary-400 inline-block">The Collective Horizon</div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Host an <span className="text-primary-500 italic">Initiative</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto italic">
              "Collaborate with us to launch your next exhibition, workshop, or industry summit."
            </p>
          </div>

          <button className="btn-primary inline-flex items-center gap-4 py-6 px-12 text-base">
            Partner with Us
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
