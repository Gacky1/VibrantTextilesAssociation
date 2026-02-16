import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import logo from '../assets/LogoRectTransparent.png';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6"
            >
              About <span className="text-gradient">Vibrant Textiles</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-4 text-gray-600 leading-relaxed"
            >
              <p>
                Vibrant Textiles is a non-profit association committed to the growth, development, and enrichment of India's textile and handloom ecosystem. The organization works as a facilitator, supporter, and bridge between artisans, vendors, MSMEs, industry stakeholders, academic institutions, and government bodies.
              </p>
              <p>
                Vibrant Textiles focuses on capacity building, skill development, policy support, industry collaboration, and sustainable growth, while preserving India's rich textile heritage.
              </p>
              <p>
                By connecting traditional craftsmanship with modern industry needs, it aims to strengthen the entire textile value chain and position India competitively in domestic and global markets.
              </p>
            </motion.div>
          </div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center p-12">
              <img src={logo} alt="Vibrant Textiles Association" className="w-full h-auto object-contain" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
