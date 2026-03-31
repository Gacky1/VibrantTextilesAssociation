import { motion } from 'framer-motion';

/**
 * Reusable dark hero section for all inner pages.
 * @param {string} eyebrow - Small label above the title
 * @param {string} title - Main heading
 * @param {string} subtitle - Paragraph below title
 */
const PageHero = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="relative bg-dark-900 text-white overflow-hidden py-32 lg:py-52">
      {/* === PREMIUM BACKGROUND LAYERS === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise + Grain Overlays */}
        <div className="absolute inset-0 noise-overlay opacity-20" />
        <div className="absolute inset-0 grain-overlay opacity-10" />
        
        {/* Animated Mesh Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[70%] rounded-full bg-primary-600/10 blur-[130px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[70%] rounded-full bg-accent-500/5 blur-[130px] animate-blob animation-delay-2000" />
        
        {/* Decorative Divider Line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center space-y-10">
          
          {/* Eyebrow / Badge */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-primary-500 text-[10px] font-black uppercase tracking-[0.5em] inline-flex items-center gap-3 backdrop-blur-3xl shadow-2xl">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                {eyebrow}
              </span>
            </motion.div>
          )}
          
          {/* Main Title - Using Brodies */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-brodies text-[clamp(3.5rem,12vw,9.5rem)] text-white leading-[0.8] mb-4 tracking-tighter"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-white/40 text-lg lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium italic"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Decorative Loom Element */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '120px', opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-primary-500/40 to-transparent pt-12"
          />
        </div>
      </div>

      {/* Background Decorative Signature */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
         <span className="font-brodies text-[30vw] text-white leading-none capitalize">{title.split(' ')[0]}</span>
      </div>
    </div>
  );
};

export default PageHero;
