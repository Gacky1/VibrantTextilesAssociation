import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faHandshake, faLightbulb, faChartLine, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const missions = [
  {
    icon: faBullseye,
    title: 'Empower',
    accent: '#3b82f6',
    grad: 'from-blue-500 to-blue-600',
    text: "Empower India's textile sector by supporting vendors, artisans, and industry stakeholders with skills, resources, and guidance.",
  },
  {
    icon: faHandshake,
    title: 'Connect',
    accent: '#e52e22',
    grad: 'from-primary-500 to-primary-700',
    text: "Act as a platform for collaboration between government, industry, and grassroots communities for sustainable textile development.",
  },
  {
    icon: faLightbulb,
    title: 'Innovate',
    accent: '#f59e0b',
    grad: 'from-accent-500 to-accent-700',
    text: "Promote innovation, ethical practices, and sustainability while preserving traditional textile knowledge and craftsmanship.",
  },
  {
    icon: faChartLine,
    title: 'Grow',
    accent: '#10b981',
    grad: 'from-emerald-500 to-emerald-700',
    text: "Contribute towards employment generation, skill enhancement, and long-term sector growth across India.",
  },
];

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="mission" className="relative py-28 md:py-36 overflow-hidden bg-[#f9f9fc]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5"
          >
            <span className="section-badge">Our Mission</span>
          </motion.div>
          <h2 className="section-heading text-[clamp(2.2rem,5vw,3.8rem)] text-gray-900 mb-5">
            Driving <span className="text-gradient">Sustainable Growth</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Empowering every stakeholder across India's textile ecosystem
          </p>
        </motion.div>

        {/* Bento-style grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className={`group relative bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col min-h-[280px] ${
                i === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Animated corner glow */}
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ background: m.accent }}
              />

              {/* Icon + context */}
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 bg-gradient-to-br ${m.grad} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-8`}>
                  <FontAwesomeIcon icon={m.icon} className="text-white text-xl" />
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-4 font-serif italic tracking-tight">{m.title}</h3>
                
                <p className="text-gray-500 leading-relaxed text-[16px] font-medium group-hover:text-gray-700 transition-colors">
                  {m.text}
                </p>

                <div className="mt-auto pt-6 flex items-center gap-2 text-primary-600 font-black text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Read philosophy
                  <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                </div>
              </div>

              {/* Background accent line */}
              <div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r transition-all duration-500 w-0 group-hover:w-full"
                style={{ backgroundImage: `linear-gradient(to right, ${m.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
