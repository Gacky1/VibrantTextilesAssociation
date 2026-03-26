import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../lib/supabase';

const Members = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('members')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .limit(6)
      .then(({ data }) => {
        setMembers(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section id="members" className="relative py-28 md:py-36 bg-[#0d0d1a] overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-800 rounded-full blur-[120px] opacity-25" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-700 rounded-full blur-[100px] opacity-15" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <span className="px-5 py-2 rounded-full border border-accent-500/30 bg-accent-500/10 text-accent-300 text-[11px] font-black uppercase tracking-[0.3em] inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
              Visionary Leadership
            </span>
          </motion.div>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-[1.05] font-black mb-6">
            Board of <span className="text-gradient italic font-medium">Distinction</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Meet the architects of the VTA ecosystem dedicated to industrial excellence.
          </p>
        </motion.div>

        {/* Executive Profile Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-[32px] overflow-hidden border border-white/5 animate-pulse" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="aspect-[4/5] bg-white/5" />
                  <div className="p-8 space-y-4">
                    <div className="h-4 bg-white/10 rounded-full w-2/3 mx-auto" />
                    <div className="h-3 bg-white/5 rounded-full w-1/2 mx-auto" />
                  </div>
                </div>
              ))
            : members.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-[32px] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
                  
                  {/* Executive Portrait */}
                  <div className="aspect-[4/5] relative overflow-hidden bg-white/5">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name}
                        className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                        <FontAwesomeIcon icon={faUserTie} className="text-7xl text-white/10 group-hover:scale-110 group-hover:text-primary-500/20 transition-all duration-700" />
                      </div>
                    )}
                    
                    {/* Portrait Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* Profile info */}
                  <div className="relative z-10 p-8 text-center text-white">
                    <h3 className="text-2xl font-black font-serif italic mb-1 group-hover:text-primary-300 transition-colors uppercase tracking-tight">
                        {member.name}
                    </h3>
                    <p className="text-accent-400 font-black text-[11px] uppercase tracking-[0.2em] mb-4">
                        {member.designation}
                    </p>
                    <div className="w-10 h-0.5 bg-white/10 mx-auto group-hover:w-20 group-hover:bg-primary-500 transition-all duration-500" />
                    
                    <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden pt-4">
                      <p className="text-white/40 text-xs font-medium leading-relaxed italic">
                        {member.bio || "Visionary industry leader dedicated to the VTA mission."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
          }
        </div>

        {/* Global Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-center"
        >
          <Link to="/members">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black text-[14px] shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 uppercase tracking-widest"
            >
              Consult the Board
              <FontAwesomeIcon icon={faArrowRight} className="ml-3 text-primary-600" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Members;
