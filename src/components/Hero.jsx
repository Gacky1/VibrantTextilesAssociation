import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUserPlus, faPlay } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../lib/supabase';
import heroImg from '../assets/hero_showcase.png';

const defaultStats = [
  { value: '7.5k', label: 'Members', color: 'from-primary-500 to-primary-600' },
  { value: '28+', label: 'States Reach', color: 'from-accent-400 to-accent-600' },
  { value: '₹2.4T', label: 'Ind. Value', color: 'from-emerald-500 to-emerald-600' },
];

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-dark-900 overflow-hidden flex items-center justify-center p-6 lg:p-12"
    >
      {/* Background Micro-Textures */}
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
      <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-600/10 rounded-full blur-[160px] animate-blob" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent-500/10 rounded-full blur-[160px] animate-blob animation-delay-2000" />

      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* LEFT COMPOSITION: Typography & CTA */}
        <motion.div 
          style={{ y: textY, opacity }}
          className="lg:col-span-7 space-y-10"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="h-[1px] w-12 bg-primary-500" />
              <span className="text-primary-500 font-black text-[11px] uppercase tracking-[0.5em]">Global Textile Pioneer</span>
            </motion.div>
            
            <h1 className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-white text-[clamp(3rem,8vw,6rem)] font-black leading-[0.95] tracking-tighter"
              >
                Weaving the
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="font-brodies text-primary-500 text-[clamp(4.5rem,12vw,9.5rem)] leading-[0.75] -mt-2 -ml-2"
              >
                Future
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-white/60 text-[clamp(2rem,6vw,4rem)] font-light italic mt-4"
              >
                of Indian Industry
              </motion.span>
            </h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/50 text-xl font-medium max-w-xl leading-relaxed tracking-wide"
          >
            A collective vision uniting <span className="text-white">artisans</span>, <span className="text-white">manufacturers</span>, and <span className="text-white">policymakers</span> to define the global standard of sustainability and excellence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap gap-6 items-center"
          >
            <Link to="/membership">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-primary-600 text-white rounded-2xl font-black text-[15px] tracking-[0.1em] shadow-[0_20px_50px_rgba(229,46,34,0.3)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
                <span className="relative z-10 flex items-center gap-3 uppercase">
                   Apply membership
                   <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </motion.button>
            </Link>
            
            <button className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-dark-900 transition-all duration-500">
                <FontAwesomeIcon icon={faPlay} className="text-sm ml-1" />
              </div>
              <span className="font-extrabold text-xs uppercase tracking-[0.3em]">Watch Legacy</span>
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT COMPOSITION: Asymmetrical Visuals */}
        <div className="lg:col-span-5 relative mt-20 lg:mt-0">
          <motion.div 
            style={{ y: imageY }}
            className="relative"
          >
            {/* Visual Frame */}
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl z-10 glass">
               <img src={heroImg} alt="Textile Showcase" className="w-full h-full object-cover scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Overlapping Element */}
            <motion.div
              animate={{ rotate: [0, 5, 0], y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 w-48 h-48 rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-20 hidden md:block"
            >
               <img src={heroImg} alt="Detail" className="w-full h-full object-cover grayscale brightness-50" />
               <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest leading-tight">Master Craftsmanship Since 1998</span>
               </div>
            </motion.div>

            {/* Asymmetrical Floating Stats */}
            <div className="absolute -bottom-10 -left-10 z-30 space-y-4">
              {defaultStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + (i * 0.2) }}
                  whileHover={{ x: 10 }}
                  className="glass-pill px-6 py-4 border-white/20 flex items-center gap-4 shadow-2xl"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color} shadow-lg shadow-primary-500/50`} />
                  <div className="flex flex-col">
                    <span className="text-dark-900 font-black text-xl leading-none tracking-tighter italic">{stat.value}</span>
                    <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Signature */}
      <motion.div 
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-10 right-10 text-white/5 pointer-events-none select-none"
      >
        <span className="font-brodies text-[15vw] leading-none">Loom</span>
      </motion.div>
    </section>
  );
};

export default Hero;
