import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faIndustry, faLeaf, faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/LogoRectTransparent.png';

const pillars = [
  { icon: faHandshake, label: 'Collaboration', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
  { icon: faIndustry, label: 'Industry', color: 'from-primary-500 to-primary-700', bg: 'bg-primary-50' },
  { icon: faLeaf, label: 'Sustainability', color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50' },
  { icon: faUsers, label: 'Community', color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50' },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVars = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden bg-white">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-50 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent-50 to-transparent opacity-50" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* === LEFT: Visual === */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative order-2 lg:order-1"
          >
            {/* Main card */}
            <motion.div variants={itemVars} className="relative">
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-[28px] border border-gray-100 shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-10 overflow-hidden">
                {/* Inner accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-400 to-primary-600 rounded-t-[28px]" />
                <img
                  src={logo}
                  alt="Vibrant Textiles Association"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Floating stat 1 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } },
                }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-2xl px-6 py-4 shadow-2xl"
              >
                <div className="text-4xl font-bold font-serif">10+</div>
                <div className="text-xs text-primary-200 font-medium mt-0.5">Years Experience</div>
              </motion.div>

              {/* Floating stat 2 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.55 } },
                }}
                className="absolute -top-6 -left-6 bg-gradient-to-br from-accent-500 to-accent-700 text-white rounded-2xl px-6 py-4 shadow-2xl"
              >
                <div className="text-4xl font-bold font-serif">500+</div>
                <div className="text-xs text-accent-100 font-medium mt-0.5">Active Members</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* === RIGHT: Content === */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="order-1 lg:order-2 space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVars}>
              <span className="section-badge">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                Who We Are
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2 variants={itemVars} className="section-heading text-[clamp(2.2rem,5vw,3.8rem)] text-gray-900">
              About{' '}
              <span className="text-gradient">Vibrant Textiles</span>
            </motion.h2>

            {/* Text */}
            <motion.div variants={itemVars} className="space-y-4 text-gray-500 text-[17px] leading-relaxed">
              <p>
                Vibrant Textiles is a <span className="text-gray-800 font-medium">non-profit association</span> committed to the growth, development, and enrichment of India's textile and handloom ecosystem. We work as a facilitator, supporter, and bridge between artisans, vendors, MSMEs, industry stakeholders, academic institutions, and government bodies.
              </p>
              <p>
                We focus on <span className="text-gray-800 font-medium">capacity building, skill development, policy support</span>, industry collaboration, and sustainable growth—while preserving India's rich textile heritage.
              </p>
            </motion.div>

            {/* Pillars grid */}
            <motion.div variants={itemVars} className="grid grid-cols-2 gap-3">
              {pillars.map((p) => (
                <div
                  key={p.label}
                  className={`${p.bg} rounded-xl p-4 flex items-center gap-3 border border-white transition-all hover:shadow-md hover:-translate-y-1 duration-300 cursor-default`}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${p.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <FontAwesomeIcon icon={p.icon} className="text-white text-base" />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">{p.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVars}>
              <Link to="/about-textile">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-primary-600 font-bold text-[15px] group"
                >
                  Learn more about us
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-sm group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
