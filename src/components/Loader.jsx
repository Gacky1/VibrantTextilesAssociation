import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d1a] overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-700 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-600 rounded-full blur-[80px]"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Spinner ring */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-[3px] border-transparent"
            style={{ borderTopColor: '#e52e22', borderRightColor: '#e52e22' }}
          />
          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 rounded-full border-[2px] border-transparent"
            style={{ borderTopColor: '#f59e0b', borderLeftColor: '#f59e0b' }}
          />
          {/* Center dot */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-white rounded-full" />
          </motion.div>
        </div>

        {/* Text */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white font-serif text-2xl font-bold tracking-tight mb-1.5"
          >
            Vibrant Textiles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/50 text-sm font-medium tracking-widest uppercase"
          >
            Association
          </motion.p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scaleX: [1, 2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
              className="w-1.5 h-1.5 bg-primary-400 rounded-full origin-center"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
