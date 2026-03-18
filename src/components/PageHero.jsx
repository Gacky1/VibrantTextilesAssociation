import { motion } from 'framer-motion';

/**
 * Reusable dark hero section for all inner pages.
 * @param {string} eyebrow - Small label above the title
 * @param {string} title - Main heading
 * @param {string} subtitle - Paragraph below title
 */
const PageHero = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="relative bg-[#0d0d1a] text-white overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-800 rounded-full blur-[130px] opacity-25" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-700 rounded-full blur-[100px] opacity-15" />
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-white/60 border border-white/12 bg-white/6">
              {eyebrow}
            </span>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7 }}
          className="section-heading text-[clamp(3rem,7vw,5.5rem)] text-white mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHero;
