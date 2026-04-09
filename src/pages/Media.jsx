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
        eyebrow="The Narrative"
        title="Media Center"
        subtitle="Exploring the rhythmic evolution of the textile visionary landscape."
      />

      <div className="section-container py-24">
        
        {/* ── Section 1: Visual Moments (Gallery) ── */}
        <div className="mb-32">
          <div className="mb-16">
            <div className="badge">The Chronicles</div>
            <h2 className="section-title">Visual Moments</h2>
            <p className="section-subtitle">
              Moments and milestones captured in the pulse of modern heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card animate-pulse border-gray-100 h-80 bg-gray-50" />
              ))
            ) : gallery.length === 0 ? (
              <div className="col-span-full py-24 card border-dashed flex flex-col items-center justify-center text-center space-y-4">
                 <FontAwesomeIcon icon={faImage} className="text-gray-200 text-5xl" />
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No visual entries found.</p>
              </div>
            ) : (
              gallery.map((item) => (
                <div
                  key={item.id}
                  className="card group overflow-hidden p-0 hover:border-primary-200 transition-all"
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-900 border border-gray-100">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">{item.title}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Section 2: Press & News ── */}
        <div className="mb-32">
          <div className="mb-16">
            <div className="badge">The Registry</div>
            <h2 className="section-title">Press & News</h2>
            <p className="section-subtitle">
              The latest announcements and industry insights from our headquarters.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card animate-pulse h-32 border-gray-100" />
              ))
            ) : press.length === 0 ? (
              <div className="py-24 card border-dashed flex flex-col items-center justify-center text-center space-y-4">
                <FontAwesomeIcon icon={faNewspaper} className="text-gray-200 text-5xl" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Awaiting industry updates.</p>
              </div>
            ) : (
              press.map((item) => (
                <div
                  key={item.id}
                  className="card group hover:border-primary-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8"
                >
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-primary-600 text-[10px] font-bold uppercase tracking-wider">
                        <FontAwesomeIcon icon={faCalendarAlt} className="opacity-50" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                        <FontAwesomeIcon icon={faTag} className="opacity-50" />
                        {item.category}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all shadow-sm">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Section 3: CTA ── */}
        <div className="bg-gray-50 border border-gray-100 rounded-[40px] px-12 py-24 text-center space-y-8">
          <div className="space-y-4">
            <div className="badge">Stay Connected</div>
            <h2 className="section-title">The Industry Digest</h2>
            <p className="section-subtitle mx-auto">
              Subscribe to our media registry for exclusive updates and global textile reports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 transition-colors text-sm"
            />
            <button className="btn-primary py-4">
              Subscribe Now
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Media;
