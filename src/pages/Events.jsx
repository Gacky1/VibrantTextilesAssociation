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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* ── Upcoming Events ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              UPCOMING EVENTS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Upcoming Events</h2>
          </div>

          <div className="space-y-8">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-xl animate-pulse h-64" />
              ))
            ) : upcoming.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-5xl mb-4">📅</p>
                <p className="font-semibold text-lg">No upcoming events yet</p>
                <p className="text-sm mt-1">Add events from the admin panel at /admin/events</p>
              </div>
            ) : (
              upcoming.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="relative md:col-span-2 h-64 md:h-auto overflow-hidden bg-gray-100">
                      {event.image_url && (
                        <img src={event.image_url} alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      )}
                      <div className={`absolute top-6 left-6 px-5 py-2 bg-gradient-to-r ${gradient(event.type)} text-white rounded-full font-bold text-sm shadow-lg`}>
                        {event.type}
                      </div>
                    </div>
                    <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-600" />
                          </div>
                          <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-600" />
                          </div>
                          <span className="font-medium">{event.location}</span>
                        </div>
                      </div>
                      {event.description && (
                        <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>
                      )}
                      {event.highlights?.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {event.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                              <span className="text-gray-700 text-sm font-medium">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${gradient(event.type)} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                      >
                        Register Now
                        <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* ── Past Events ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              PAST EVENTS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Our Success Stories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {!loading && past.length === 0 ? (
              <div className="col-span-3 text-center py-10 text-gray-400">
                <p className="font-semibold">No past events yet</p>
              </div>
            ) : (
              past.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient(event.type)} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className="relative">
                    {event.image_url && (
                      <img src={event.image_url} alt={event.title} className="w-full h-40 object-cover rounded-2xl mb-4" />
                    )}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradient(event.type)} mb-3`}>
                      {event.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">📅 {event.date}</p>
                    <p className="text-sm text-gray-500">📍 {event.location}</p>
                    {event.description && (
                      <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-2">{event.description}</p>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-5" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-10" />
          </div>
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Want to Participate?</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              Join us at our upcoming events and be part of India's textile transformation
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Register Your Interest
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
