import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faArrowRight, faChevronDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const stats = [
  { value: '500+', label: 'Active Members' },
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Annual Events' },
  { value: '20+', label: 'States Covered' },
];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* === BACKGROUND LAYERS === */}
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-[#0d0d1a]" />

      {/* Texture image overlay */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea1c8f7f?w=1920&q=80')] bg-cover bg-center opacity-[0.12]"
      />

      {/* Rich color mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-primary-600 rounded-full opacity-25 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-accent-500 rounded-full opacity-15 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-800 rounded-full opacity-20 blur-[80px]"
        />
      </div>

      {/* Fine noise texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* === HERO CONTENT === */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24"
      >
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 glass rounded-full px-6 py-2.5 border border-white/20 flex items-center gap-2.5"
          >
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-semibold tracking-widest uppercase">
              India's Premier Textile Association
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h1 className="section-heading text-[clamp(3rem,8vw,6.5rem)] text-white leading-[1.0] mb-2">
              Vibrant Textiles
            </h1>
            <h1 className="section-heading text-[clamp(3rem,8vw,6.5rem)] text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-primary-300 leading-[1.1]">
              Association
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 text-[clamp(1rem,2.5vw,1.4rem)] font-light max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Empowering India's textile ecosystem through{' '}
            <span className="text-white/90 font-medium">collaboration</span>,{' '}
            <span className="text-white/90 font-medium">innovation</span>, and{' '}
            <span className="text-white/90 font-medium">sustainable growth</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4 justify-center items-center mb-20"
          >
            <Link to="/membership">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-full font-bold text-base shadow-[0_8px_40px_rgba(229,46,34,0.5)] hover:shadow-[0_16px_60px_rgba(229,46,34,0.6)] transition-all duration-300"
              >
                <FontAwesomeIcon icon={faUsers} />
                Join Membership
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-base border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              Discover More
            </motion.button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-4xl"
          >
            <div className="glass rounded-2xl border border-white/15 px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/15">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-center px-4"
                >
                  <div className="text-3xl font-bold text-white font-serif mb-1">{stat.value}</div>
                  <div className="text-white/55 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-9 border-2 border-white/25 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
