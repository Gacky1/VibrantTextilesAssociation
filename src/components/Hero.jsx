import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faIndustry } from '@fortawesome/free-solid-svg-icons';
import heroImg from '../assets/vibrant_hero.png';

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-indigo-950">
      {/* Background with Vibrant Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroImg} 
          alt="Textile Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-indigo-900/40 to-rose-500/20" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-vibrant-orange/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="section-container relative z-10 w-full pt-20">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-primary-500" />
            <span className="text-primary-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Global Textile Pioneer
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter"
          >
            Weaving the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-vibrant-orange animate-pulse">
              Future
            </span> of Industry
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-indigo-100/70 text-lg md:text-2xl font-medium mb-12 leading-relaxed max-w-2xl"
          >
            A collective vision uniting artisans, manufacturers, and policymakers to define the global standard of sustainability and excellence in textiles.
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <Link to="/membership">
              <button className="btn-primary py-5 px-12 group">
                Become a Member
                <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
            
            <Link to="/about-textile">
              <button className="btn-secondary py-5 px-12 glass-panel text-gray-900 border-white/20 hover:bg-white transition-all">
                Learn More
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Dynamic Background Text */}
      <div className="absolute right-0 bottom-0 hidden lg:block p-12 select-none pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-white/5 font-black text-[25vw] leading-none"
        >
          VTA
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

