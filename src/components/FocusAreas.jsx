import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faIndustry, faLandmark, faSeedling, faCircleCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative">
        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <span className="px-5 py-2 rounded-full bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2">
              Our Expertise
            </span>
          </motion.div>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-gray-900 leading-[1.05] font-black mb-6">
            Strategic <span className="text-gradient font-medium italic">Focus Areas</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Architecting the future of Indian textiles through precision and innovation.
          </p>
        </motion.div>

        {/* Modern Interactive Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col"
            >
              {/* Card Container */}
              <div className="relative glass-ultra rounded-[40px] border border-white p-10 lg:p-12 h-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700">
                <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                <div 
                  className={`absolute top-0 left-0 h-2 bg-gradient-to-r ${area.grad} w-0 group-hover:w-full transition-all duration-700 ease-in-out`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${area.grad} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <FontAwesomeIcon icon={area.icon} className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-gray-900 font-serif leading-tight">{area.title}</h3>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {area.points.map((pt, j) => (
                      <motion.li
                        key={j}
                        className="flex items-start gap-4 text-gray-500 text-[16px] leading-relaxed font-medium"
                      >
                        <div className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-50 border border-gray-100 group-hover:border-primary-200 transition-colors">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-[10px] text-gray-300 group-hover:text-primary-500 transition-colors" />
                        </div>
                        {pt}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-gray-900 font-black text-[12px] uppercase tracking-widest"
                      style={{ color: area.accent }}
                    >
                      Learn more
                      <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                    </motion.button>
                  </div>
                </div>

                {/* Animated Background Orb */}
                <div 
                  className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-all duration-700"
                  style={{ background: area.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
