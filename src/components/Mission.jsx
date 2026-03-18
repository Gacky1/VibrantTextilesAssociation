import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faHandshake, faLightbulb, faChartLine } from '@fortawesome/free-solid-svg-icons';

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // TODO: Backend Integration - Fetch mission data from API
  const missions = [
    {
      id: 1,
      icon: faBullseye,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      text: "To empower India's textile sector by supporting vendors, artisans, and industry stakeholders with skills, resources, and guidance."
    },
    {
      id: 2,
      icon: faHandshake,
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100',
      text: "To act as a platform for collaboration between government, industry, and grassroots communities for sustainable textile development."
    },
    {
      id: 3,
      icon: faLightbulb,
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-50 to-accent-100',
      text: "To promote innovation, ethical practices, and sustainability, while preserving traditional textile knowledge and craftsmanship."
    },
    {
      id: 4,
      icon: faChartLine,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      text: "To contribute towards employment generation, skill enhancement, and long-term sector growth."
    }
  ];

  return (
    <section id="mission" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-accent-50 opacity-50"></div>
      
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
            OUR MISSION
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            Driving <span className="text-gradient">Sustainable Growth</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering every stakeholder across India's textile ecosystem
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative h-full"
            >
              {/* Card */}
              <div className={`relative bg-gradient-to-br ${mission.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden h-full flex flex-col min-h-[280px]`}>
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mission.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${mission.gradient} rounded-2xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon icon={mission.icon} className="text-white text-2xl" />
                  </div>
                </div>
                
                {/* Text */}
                <p className="relative text-gray-700 text-lg leading-relaxed flex-grow">{mission.text}</p>
                
                {/* Decorative Element */}
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${mission.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
