import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faNewspaper, faCalendarAlt, faTag } from '@fortawesome/free-solid-svg-icons';
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
        title="Media Gallery"
        subtitle="Explore our events, activities, and achievements"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* ── Photo Gallery ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              PHOTO GALLERY
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Our Moments</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-3xl bg-gray-200 animate-pulse" />
              ))
            ) : gallery.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <p className="text-5xl mb-3">🖼️</p>
                <p className="font-semibold text-lg">No images yet</p>
                <p className="text-sm mt-1">Upload images from the admin panel at /admin/media</p>
              </div>
            ) : (
              gallery.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={item.image_url} alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <FontAwesomeIcon icon={faImage} className="text-accent-400" />
                        <span className="text-white/80 text-sm">{item.category}</span>
                      </div>
                      <p className="text-white font-bold text-xl">{item.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* ── Press Releases ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              PRESS & NEWS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Latest Updates</h2>
          </div>

          <div className="space-y-6">
            {!loading && press.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📰</p>
                <p className="font-semibold">No press releases yet — add from the admin panel</p>
              </div>
            ) : (
              press.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold flex items-center gap-2">
                          <FontAwesomeIcon icon={faTag} />
                          {item.category}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <FontAwesomeIcon icon={faCalendarAlt} />
                          {item.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <FontAwesomeIcon icon={faNewspaper} className="text-gray-200 text-4xl flex-shrink-0" />
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
