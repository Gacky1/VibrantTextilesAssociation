import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faHandshake, faLightbulb, faChartLine } from '@fortawesome/free-solid-svg-icons';

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
        <div className="grid md:grid-cols-2 gap-5">
          {missions.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-[24px] p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-400 overflow-hidden cursor-default flex flex-col min-h-[240px]"
            >
              {/* Subtle hover gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-[24px]"
                style={{ background: `radial-gradient(circle at 30% 30%, ${m.accent}, transparent 70%)` }}
              />

              {/* Icon + title row */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 bg-gradient-to-br ${m.grad} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={m.icon} className="text-white text-[18px]" />
                </div>
                <h3
                  className="text-xl font-bold transition-colors duration-300"
                  style={{ color: isInView ? m.accent : '#111' }}
                >
                  {m.title}
                </h3>
              </div>

              {/* Text */}
              <p className="text-gray-500 leading-relaxed text-[15.5px] flex-grow relative z-10">{m.text}</p>

              {/* Corner accent */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                style={{ background: m.accent }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
