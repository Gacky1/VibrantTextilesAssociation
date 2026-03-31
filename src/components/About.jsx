import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faIndustry, faLeaf, faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/VTC TRANSPARENT.svg';

const pillars = [
  { icon: faHandshake, label: 'Collaboration', color: 'from-accent-500 to-accent-700', bg: 'bg-white/5' },
  { icon: faIndustry, label: 'Scale', color: 'from-primary-500 to-primary-700', bg: 'bg-white/5' },
  { icon: faLeaf, label: 'Heritage', color: 'from-dark-300 to-dark-500', bg: 'bg-white/5' },
  { icon: faUsers, label: 'Impact', color: 'from-accent-600 to-primary-600', bg: 'bg-white/5' },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 lg:py-52 overflow-hidden bg-[#090912]">
      {/* Background Textures */}
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/5 to-transparent skew-x-[-15deg] origin-top" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: The "Editorial" Visual (40%) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Asymmetrical Frame Overlay */}
              <div className="absolute -top-10 -left-10 w-3/4 h-3/4 border-2 border-primary-500/10 rounded-[60px] -z-10" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-3xl overflow-hidden rounded-[48px] border border-white/10 shadow-2xl p-6 lg:p-12 group">
                 <div className="absolute inset-0 noise-overlay opacity-10" />
                 <div className="relative z-10 space-y-8">
                   <img src={logo} alt="Logo" className="w-48 h-auto opacity-80 brightness-0 invert" />
                   
                   <div className="h-[2px] w-1/3 bg-primary-500/50" />
                   
                   <p className="font-brodies text-3xl text-white leading-tight">
                     "India's textiles are not just industry; they are the rhythmic pulse of our civilization's heartbeat."
                   </p>
                   
                   <div className="flex items-center gap-4 pt-4">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                        <FontAwesomeIcon icon={faArrowRight} className="text-primary-500 rotate-45" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Established 1998</span>
                   </div>
                 </div>
              </div>

              {/* Overlapping Floating Element */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 backdrop-blur-3xl rounded-[32px] p-8 text-white flex flex-col justify-center shadow-2xl border border-white/10"
              >
                  <span className="text-primary-500 font-brodies text-4xl lg:text-5xl leading-none tracking-tighter">VTA</span>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] mt-2 opacity-60">Global Catalyst</p>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The "Story" Content (60%) */}
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                className="h-1 w-24 bg-primary-500 origin-left"
              />
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-none tracking-tighter text-white"
              >
                Redefining the <br />
                <span className="text-primary-500 italic font-medium">Textile Paradigm</span>
              </motion.h2>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col lg:flex-row gap-12 lg:gap-20"
            >
               <div className="lg:w-3/5 space-y-6">
                 <p className="text-white text-2xl font-bold leading-tight tracking-tight">
                   Vibrant Textiles is a non-profit catalyst dedicated to local <span className="text-primary-500 italic">modernization</span> and the global expansion of India's heritage.
                 </p>
                 <div className="h-1 w-20 bg-primary-500/20" />
               </div>
               <div className="lg:w-2/5 space-y-4">
                  <p className="text-white/60 text-base font-medium leading-relaxed italic border-l border-primary-500/20 pl-6">
                    "We bridge the gap between ancient rhythm and technological depth, fostering a sustainable ecosystem for the progressive artisan."
                  </p>
               </div>
            </motion.div>

            {/* Asymmetrical Bento Grid for Pillars */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
               {pillars.map((p, idx) => (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 40 }}
                   animate={isInView ? { opacity: 1, y: 0 } : {}}
                   transition={{ delay: 0.2 + (idx * 0.1) }}
                   whileHover={{ y: -8, rotate: idx % 2 === 0 ? 2 : -2 }}
                   className="group relative p-8 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-xl flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-all cursor-pointer"
                 >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                       <FontAwesomeIcon icon={p.icon} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-white/80">{p.label}</span>
                 </motion.div>
               ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex justify-start"
            >
               <Link to="/about-textile">
                 <button className="flex items-center gap-4 group">
                    <span className="text-white font-black text-xs uppercase tracking-[0.4em] border-b border-white/10 pb-2 group-hover:border-primary-500 transition-colors">Our Legacy Journey</span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 group-hover:translate-x-2">
                       <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                 </button>
               </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Background Decoration */}
      <motion.span 
        style={{ x: '-20%' }}
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        className="absolute top-1/2 left-0 font-serif text-[25vw] font-black text-white select-none pointer-events-none whitespace-nowrap"
      >
        CRAFTSMANSHIP
      </motion.span>
    </section>
  );
};

export default About;
