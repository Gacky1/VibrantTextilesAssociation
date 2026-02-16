import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // TODO: Backend Integration - Fetch mission data from API
  const missions = [
    {
      id: 1,
      icon: "🎯",
      text: "To empower India's textile sector by supporting vendors, artisans, and industry stakeholders with skills, resources, and guidance."
    },
    {
      id: 2,
      icon: "🤝",
      text: "To act as a platform for collaboration between government, industry, and grassroots communities for sustainable textile development."
    },
    {
      id: 3,
      icon: "💡",
      text: "To promote innovation, ethical practices, and sustainability, while preserving traditional textile knowledge and craftsmanship."
    },
    {
      id: 4,
      icon: "📈",
      text: "To contribute towards employment generation, skill enhancement, and long-term sector growth."
    }
  ];

  return (
    <section id="mission" className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">Mission</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Driving sustainable growth and empowerment across India's textile ecosystem
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="text-5xl mb-4">{mission.icon}</div>
              <p className="text-gray-700 leading-relaxed">{mission.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
