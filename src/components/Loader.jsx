import { motion } from 'framer-motion';
import logo from '../assets/VTC TRANSPARENT.svg';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05050a] overflow-hidden"
    >
      {/* Animated background orbs - Refined for premium look */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.45, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] bg-primary-900/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1], 
            opacity: [0.2, 0.35, 0.2],
            x: [0, -40, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] bg-accent-950/15 rounded-full blur-[120px]"
        />
      </div>

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-12">
        {/* Logo Container */}
        <div className="relative group">
          {/* Intense Central Light (to make text pop) */}
          <motion.div
            animate={{ 
              opacity: [0.6, 0.9, 0.6],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-white/40 blur-[50px] rounded-full scale-125"
          />

          {/* Soft White Background Plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute inset-[-40px] bg-white/10 backdrop-blur-[2px] rounded-[40px] border border-white/5"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10"
          >
            <motion.img 
              src={logo} 
              alt="VTC Logo" 
              className="w-48 md:w-64 h-auto"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.4))'
              }}
            />
          </motion.div>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                  backgroundColor: i === 1 ? ['#f59e0b', '#e52e22', '#f59e0b'] : '#ffffff'
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-white/40"
              />
            ))}
          </div>
          <motion.span
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em] ml-[0.4em]"
          >
            Developing Excellence
          </motion.span>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-[1px] overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-primary-500 to-transparent"
        />
      </div>
    </motion.div>
  );
};

export default Loader;
