import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-20 w-64 h-64 bg-primary-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-20 w-64 h-64 bg-accent-200 rounded-full blur-3xl"
        />
      </div>

      {/* Loader Content */}
      <div className="relative flex flex-col items-center">
        {/* Spinning Threads */}
        <div className="relative w-32 h-32 mb-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-4 border-transparent rounded-full"
              style={{
                borderTopColor: i === 0 ? '#c23d3d' : i === 1 ? '#eab308' : '#a32f2f',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2 - i * 0.3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
          
          {/* Center Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center text-5xl"
          >
            🧵
          </motion.div>
        </div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-serif font-bold text-gradient mb-2"
        >
          Vibrant Textiles
        </motion.h2>
        
        {/* Loading Dots */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-600 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
