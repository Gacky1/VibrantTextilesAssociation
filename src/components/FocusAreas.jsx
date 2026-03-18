import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faIndustry, faLandmark, faSeedling, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const focusAreas = [
  {
    id: 1,
    title: 'Skill Development & Training',
    icon: faGraduationCap,
    accent: '#8b5cf6',
    grad: 'from-violet-500 to-purple-700',
    points: [
      'Workshops and training programs for artisans, vendors, and professionals',
      'Bridging traditional handloom skills with modern textile technologies',
      'Vocational courses aligned with government skill initiatives',
    ],
  },
  {
    id: 2,
    title: 'Vendor & Industry Support',
    icon: faIndustry,
    accent: '#3b82f6',
    grad: 'from-blue-500 to-blue-700',
    points: [
      'Resources, mentorship, and guidance for textile vendors and MSMEs',
      'Market linkages and industry collaborations for business growth',
      'Adoption of modern production and quality standards',
    ],
  },
  {
    id: 3,
    title: 'Government & Policy Collaboration',
    icon: faLandmark,
    accent: '#e52e22',
    grad: 'from-primary-500 to-primary-700',
    points: [
      'Representing stakeholder interests in policy-making',
      'Awareness and adoption of government grants and subsidies',
      'Streamlined compliance, certifications, and regulations',
    ],
  },
  {
    id: 4,
    title: 'Sustainability & Heritage Preservation',
    icon: faSeedling,
    accent: '#10b981',
    grad: 'from-emerald-500 to-green-700',
    points: [
      'Promoting eco-friendly and ethical textile practices',
      'Preserving and reviving traditional handloom techniques',
      'Innovation while respecting cultural heritage',
    ],
  },
];

const FocusAreas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="focus" className="relative py-28 md:py-36 bg-white overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-50/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-50/60 to-transparent" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            transition={{ delay: 0.1 }}
            className="mb-5"
          >
            <span className="section-badge">What We Do</span>
          </motion.div>
          <h2 className="section-heading text-[clamp(2.2rem,5vw,3.8rem)] text-gray-900 mb-5">
            Key <span className="text-gradient">Focus Areas</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Strategic pillars driving our mission forward
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.13, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.1)] transition-all duration-400 overflow-hidden flex flex-col cursor-default"
            >
              {/* Top gradient bar */}
              <div className={`h-1 bg-gradient-to-r ${area.grad} w-0 group-hover:w-full transition-all duration-500`} />

              <div className="p-8 flex flex-col flex-grow">
                {/* Icon + title */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${area.grad} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <FontAwesomeIcon icon={area.icon} className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{area.title}</h3>
                </div>

                {/* Points */}
                <ul className="space-y-3 flex-grow">
                  {area.points.map((pt, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.13 + j * 0.08 + 0.2 }}
                      className="flex items-start gap-3 text-gray-500 text-[14.5px] leading-relaxed"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${area.accent}1a` }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: area.accent }}
                        />
                      </div>
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Corner radial glow on hover */}
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{ background: area.accent }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
