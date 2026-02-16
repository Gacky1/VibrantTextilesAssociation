import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const FocusAreas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // TODO: Backend Integration - Fetch focus areas from API
  const focusAreas = [
    {
      id: 1,
      title: "Skill Development & Training",
      icon: "🎓",
      points: [
        "Conduct workshops and training programs for artisans, vendors, and industry professionals",
        "Bridge gaps between traditional handloom skills and modern textile technologies",
        "Support vocational courses aligned with government skill initiatives"
      ]
    },
    {
      id: 2,
      title: "Vendor & Industry Support",
      icon: "🏭",
      points: [
        "Facilitate resources, mentorship, and guidance for textile vendors and MSMEs",
        "Enable market linkages and industry collaborations for business growth",
        "Support adoption of modern production and quality standards"
      ]
    },
    {
      id: 3,
      title: "Government & Policy Collaboration",
      icon: "🏛️",
      points: [
        "Represent stakeholder interests in policy-making and scheme implementation",
        "Facilitate awareness and adoption of government initiatives, grants, and subsidies",
        "Help streamline compliance, certifications, and industry regulations"
      ]
    },
    {
      id: 4,
      title: "Sustainability & Heritage Preservation",
      icon: "🌿",
      points: [
        "Promote eco-friendly and ethical textile practices",
        "Preserve and revive traditional handloom and craft techniques",
        "Encourage innovation while respecting cultural heritage"
      ]
    }
  ];

  return (
    <section id="focus" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Key <span className="text-gradient">Focus Areas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-white to-primary-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-primary-100"
            >
              <div className="text-6xl mb-4">{area.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{area.title}</h3>
              <ul className="space-y-3">
                {area.points.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-600 mr-2 mt-1">•</span>
                    <span className="text-gray-600 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
