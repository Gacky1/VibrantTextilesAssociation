import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faIndustry, faLandmark, faSeedling, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const FocusAreas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // TODO: Backend Integration - Fetch focus areas from API
  const focusAreas = [
    {
      id: 1,
      title: "Skill Development & Training",
      icon: faGraduationCap,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      points: [
        "Conduct workshops and training programs for artisans, vendors, and industry professionals",
        "Bridge gaps between traditional handloom skills and modern textile technologies",
        "Support vocational courses aligned with government skill initiatives"
      ]
    },
    {
      id: 2,
      title: "Vendor & Industry Support",
      icon: faIndustry,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      points: [
        "Facilitate resources, mentorship, and guidance for textile vendors and MSMEs",
        "Enable market linkages and industry collaborations for business growth",
        "Support adoption of modern production and quality standards"
      ]
    },
    {
      id: 3,
      title: "Government & Policy Collaboration",
      icon: faLandmark,
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100',
      points: [
        "Represent stakeholder interests in policy-making and scheme implementation",
        "Facilitate awareness and adoption of government initiatives, grants, and subsidies",
        "Help streamline compliance, certifications, and industry regulations"
      ]
    },
    {
      id: 4,
      title: "Sustainability & Heritage Preservation",
      icon: faSeedling,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      points: [
        "Promote eco-friendly and ethical textile practices",
        "Preserve and revive traditional handloom and craft techniques",
        "Encourage innovation while respecting cultural heritage"
      ]
    }
  ];

  return (
    <section id="focus" className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent-300 rounded-full blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg"
          >
            WHAT WE DO
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            Key <span className="text-gradient">Focus Areas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic pillars driving our mission forward
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative h-full"
            >
              {/* Card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden h-full flex flex-col min-h-[380px]">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${area.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative flex flex-col h-full">
                  {/* Icon Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${area.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <FontAwesomeIcon icon={area.icon} className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">{area.title}</h3>
                  </div>
                  
                  {/* Points List */}
                  <ul className="space-y-4 flex-grow">
                    {area.points.map((point, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.15 + idx * 0.1, duration: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <FontAwesomeIcon icon={faCheckCircle} className={`text-lg mt-1 flex-shrink-0 bg-gradient-to-br ${area.gradient} bg-clip-text text-transparent`} />
                        <span className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Decorative Corner */}
                <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${area.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
