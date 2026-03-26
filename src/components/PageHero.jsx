import { motion } from 'framer-motion';

/**
 * Reusable dark hero section for all inner pages.
 * @param {string} eyebrow - Small label above the title
 * @param {string} title - Main heading
 * @param {string} subtitle - Paragraph below title
 */
const PageHero = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="relative bg-[#050508] text-white overflow-hidden py-32 lg:py-48">
      {/* === PREMIUM BACKGROUND LAYERS === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Mesh Gradients */}
        <div className="absolute inset-0 bg-mesh-gradient animate-mesh-slow opacity-30" />
        
        {/* Floating Glass Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-primary-600/20 blur-[120px] animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-accent-500/10 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.04]" />
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050508] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/40 text-[11px] font-black uppercase tracking-[0.3em] inline-flex items-center gap-2 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
              {eyebrow}
            </span>
          </motion.div>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(3.5rem,10vw,7rem)] text-white leading-[0.95] font-black mb-8 tracking-tighter"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/40 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative Divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 80, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto mt-16"
        />
      </div>
    </div>
  );
};

export default PageHero;
