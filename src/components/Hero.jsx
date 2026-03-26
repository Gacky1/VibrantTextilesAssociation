import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faArrowRight, faChevronDown, faCircleCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../lib/supabase';

const defaultStats = [
  { value: '7,500+', label: 'Members' },
  { value: '28+', label: 'States' },
  { value: '25+', label: 'Years' },
  { value: '₹2.4T', label: 'Industry Value' },
];

const defaultContent = {
  eyebrow: "Empowering India's Textile Industry",
  headline_line1: 'Weaving the Future of',
  headline_line2: 'Indian Textiles',
  subtitle: "Uniting artisans, manufacturers, and policymakers to build a world-class textile ecosystem.",
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [content, setContent] = useState(defaultContent);
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    supabase.from('site_content').select('*').eq('section', 'hero').then(({ data }) => {
      if (!data?.length) return;
      const map = {};
      data.forEach(r => { map[r.key] = r.value; });
      setContent(prev => ({ ...prev, ...map }));
      setStats([
        { value: map.stat1_value || defaultStats[0].value, label: map.stat1_label || defaultStats[0].label },
        { value: map.stat2_value || defaultStats[1].value, label: map.stat2_label || defaultStats[1].label },
        { value: map.stat3_value || defaultStats[2].value, label: map.stat3_label || defaultStats[2].label },
        { value: map.stat4_value || defaultStats[3].value, label: map.stat4_label || defaultStats[3].label },
      ]);
    });
  }, []);

  return (
    <motion.section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050508]"
    >
      {/* === MODERN BACKGROUND LAYER === */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Mesh Orbs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 50, 0], 
            y: [0, -30, 0],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1], 
            x: [0, -40, 0], 
            y: [0, 60, 0],
            rotate: [0, -30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-accent-500/15 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ 
            scale: [0.8, 1.1, 0.8], 
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-primary-900/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Noise + Grid Overlays */}
      <div className="absolute inset-0 noise-overlay opacity-[0.08]" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Deep Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050508]" />

      {/* === HERO CONTENT === */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-40 pb-20"
      >
        <div className="flex flex-col items-center text-center">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.4em' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-black text-accent-400 uppercase tracking-[0.4em] backdrop-blur-md">
              India's Grand Textile Legacy
            </span>
          </motion.div>

          {/* Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 relative"
          >
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-white/5 text-[12vw] font-black select-none pointer-events-none uppercase tracking-widest leading-none">
              VIBRANT
            </span>
            <h1 className="font-serif text-[clamp(3.5rem,10vw,8rem)] text-white leading-[0.9] italic font-medium">
              Weaving the
            </h1>
            <h1 className="font-serif text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] font-black mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-300 to-primary-400">
                Future
              </span>
              <span className="text-white"> together</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-[clamp(1.1rem,2vw,1.4rem)] font-medium max-w-2xl mx-auto leading-relaxed mb-14 tracking-wide"
          >
            A collective vision to position the Indian textile industry as a global leader through <span className="text-white italic">innovation</span> and <span className="text-white italic">heritage</span>.
          </motion.p>

          {/* Premium Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-28"
          >
            <Link to="/membership">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-br from-primary-500 to-primary-800 text-white rounded-2xl font-black text-[15px] tracking-wider shadow-[0_20px_60px_rgba(229,46,34,0.4)] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
                <span className="relative z-10 flex items-center gap-3">
                  <FontAwesomeIcon icon={faUserPlus || faUsers} />
                  JOIN THE MOVEMENT
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white/5 backdrop-blur-xl text-white rounded-2xl font-bold text-[15px] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 tracking-wider"
            >
              OUR LEGACY
            </motion.button>
          </motion.div>

          {/* Stats Bento Grid */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full max-w-5xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  className="glass-ultra rounded-3xl p-6 border border-white/10 flex flex-col items-center justify-center transition-all duration-300"
                >
                  <div className="text-4xl font-serif font-black text-white mb-2 tracking-tighter italic">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black text-accent-400 uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-9 border-2 border-white/25 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
