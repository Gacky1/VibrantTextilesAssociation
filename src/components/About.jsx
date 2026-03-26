import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faIndustry, faLeaf, faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/LogoRectTransparent.png';

const pillars = [
  { icon: faHandshake, label: 'Collaboration', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
  { icon: faIndustry, label: 'Industry', color: 'from-primary-500 to-primary-700', bg: 'bg-primary-50' },
  { icon: faLeaf, label: 'Sustainability', color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50' },
  { icon: faUsers, label: 'Community', color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50' },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVars = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden bg-white">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-50 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent-50 to-transparent opacity-50" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* === LEFT: Visual === */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative order-2 lg:order-1"
          >
            {/* Glossy Visual Container */}
            <motion.div variants={itemVars} className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500/20 to-accent-400/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative glass-ultra rounded-[32px] border border-white/40 p-10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.1)]">
                <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-600 via-accent-400 to-primary-800" />
                
                <img
                  src={logo}
                  alt="Vibrant Textiles Association"
                  className="w-full h-auto object-contain brightness-110 drop-shadow-2xl"
                />
              </div>

              {/* Floating interactive stat 1 */}
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.7, x: 20 },
                  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.6, delay: 0.5 } },
                }}
                className="absolute -bottom-8 -right-8 glass-ultra rounded-2xl px-6 py-5 shadow-2xl border border-white/50 backdrop-blur-3xl group/stat1"
              >
                <div className="text-4xl font-serif font-black text-primary-600 group-hover/stat1:scale-110 transition-transform">10+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">Years of Excellence</div>
              </motion.div>

              {/* Floating interactive stat 2 */}
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.7, x: -20 },
                  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.6, delay: 0.7 } },
                }}
                className="absolute -top-10 -left-6 glass-ultra rounded-2xl px-6 py-5 shadow-2xl border border-white/50 backdrop-blur-3xl group/stat2"
              >
                <div className="text-4xl font-serif font-black text-accent-500 group-hover/stat2:scale-110 transition-transform">500+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">Industry Partners</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* === RIGHT: Content === */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="order-1 lg:order-2 space-y-10"
          >
            {/* Refined Badge */}
            <motion.div variants={itemVars}>
              <span className="px-5 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[11px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" />
                Vibrant Textiles Association
              </span>
            </motion.div>

            {/* Editorial Heading */}
            <motion.h2 variants={itemVars} className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-gray-900 leading-[1.05] font-black">
              Redefining the <br />
              <span className="text-gradient italic font-medium">Textile Paradigm</span>
            </motion.h2>

            {/* Elegant Copy */}
            <motion.div variants={itemVars} className="space-y-6 text-gray-500 text-[18px] leading-relaxed font-medium max-w-xl">
              <p>
                Vibrant Textiles is a <span className="text-gray-900 font-bold border-b-2 border-primary-200">non-profit catalyst</span> dedicated to the modernization and global expansion of India's textile heritage.
              </p>
              <p>
                We bridge the gap between tradition and technology, fostering a sustainable ecosystem for <span className="text-gray-900 font-bold italic">artisans, MSMEs, and industry pioneers</span>.
              </p>
            </motion.div>

            {/* Interactive Pillar Grid */}
            <motion.div variants={itemVars} className="grid grid-cols-2 gap-4">
              {pillars.map((p) => (
                <motion.div
                  key={p.label}
                  whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}
                  className={`${p.bg}/40 rounded-2xl p-5 flex items-center gap-4 border border-white/60 transition-all duration-300 backdrop-blur-sm cursor-pointer group`}
                >
                  <div className={`w-11 h-11 bg-gradient-to-br ${p.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-6 transition-transform`}>
                    <FontAwesomeIcon icon={p.icon} className="text-white text-[17px]" />
                  </div>
                  <span className="font-black text-gray-800 text-[13px] uppercase tracking-wider">{p.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action */}
            <motion.div variants={itemVars} className="pt-4">
              <Link to="/about-textile">
                <motion.button
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-primary-600 font-black text-[15px] group uppercase tracking-widest"
                >
                  Explore our journey
                  <div className="w-10 h-[2px] bg-primary-600 group-hover:w-16 transition-all" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
