import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faIndustry, faLeaf, faUsers } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/LogoRectTransparent.png';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Visual Element - Now First */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Logo Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-12 backdrop-blur-lg border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl opacity-50"></div>
                <img src={logo} alt="Vibrant Textiles Association" className="relative w-full h-auto object-contain" />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/20"
              >
                <div className="text-5xl font-bold mb-1">10+</div>
                <div className="text-sm font-medium opacity-90">Years Experience</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -top-8 -left-8 bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/20"
              >
                <div className="text-5xl font-bold mb-1">500+</div>
                <div className="text-sm font-medium opacity-90">Active Members</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg"
            >
              WHO WE ARE
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight"
            >
              About <span className="text-gradient">Vibrant Textiles</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-5 text-gray-600 text-lg leading-relaxed mb-10"
            >
              <p>
                Vibrant Textiles is a non-profit association committed to the growth, development, and enrichment of India's textile and handloom ecosystem. The organization works as a facilitator, supporter, and bridge between artisans, vendors, MSMEs, industry stakeholders, academic institutions, and government bodies.
              </p>
              <p>
                Vibrant Textiles focuses on capacity building, skill development, policy support, industry collaboration, and sustainable growth, while preserving India's rich textile heritage.
              </p>
            </motion.div>
            
            {/* Feature Icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: faHandshake, text: 'Collaboration', color: 'from-blue-500 to-blue-600' },
                { icon: faIndustry, text: 'Industry Support', color: 'from-primary-500 to-primary-600' },
                { icon: faLeaf, text: 'Sustainability', color: 'from-green-500 to-green-600' },
                { icon: faUsers, text: 'Community', color: 'from-purple-500 to-purple-600' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.08, y: -5 }}
                  className="flex items-center gap-3 bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-md`}>
                    <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
                  </div>
                  <span className="font-bold text-gray-800 text-base">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
