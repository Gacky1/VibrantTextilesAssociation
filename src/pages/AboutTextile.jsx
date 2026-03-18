import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faChartLine, faGlobe, faHandHoldingHeart, faIndustry, faShirt, faPalette, faHome, faFlask, faSeedling, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutTextile = () => {
  const segments = [
    { title: "Handloom & Traditional", icon: faHandHoldingHeart, desc: "Fabrics created manually by artisans", examples: "Khadi, Banarasi Silk, Ikat, Jamdani, Pashmina", gradient: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-50 to-purple-100' },
    { title: "Powerloom & Mechanized", icon: faIndustry, desc: "Mechanized looms for mass production", examples: "Cotton fabrics, polyester, denim", gradient: 'from-blue-500 to-blue-600', bgGradient: 'from-blue-50 to-blue-100' },
    { title: "Apparel & Garments", icon: faShirt, desc: "Ready-to-wear clothing", examples: "Fashion wear, uniforms, casual clothing", gradient: 'from-pink-500 to-pink-600', bgGradient: 'from-pink-50 to-pink-100' },
    { title: "Home Textiles", icon: faHome, desc: "Fabrics for interiors and décor", examples: "Bedsheets, curtains, carpets", gradient: 'from-green-500 to-green-600', bgGradient: 'from-green-50 to-green-100' },
    { title: "Technical & Industrial", icon: faFlask, desc: "Functional applications", examples: "Medical textiles, protective fabrics", gradient: 'from-cyan-500 to-cyan-600', bgGradient: 'from-cyan-50 to-cyan-100' },
    { title: "Natural Fibres", icon: faSeedling, desc: "Raw materials", examples: "Cotton, silk, wool, jute, hemp", gradient: 'from-emerald-500 to-emerald-600', bgGradient: 'from-emerald-50 to-emerald-100' }
  ];

  const states = [
    { name: "Andhra Pradesh", textiles: "Pochampally Ikat, Gadwal Sarees" },
    { name: "Assam", textiles: "Muga Silk, Eri Silk" },
    { name: "Bihar", textiles: "Bhagalpuri (Tussar) Silk" },
    { name: "Gujarat", textiles: "Bandhani, Cotton, Denim" },
    { name: "Karnataka", textiles: "Mysore Silk, Ilkal Sarees" },
    { name: "Kerala", textiles: "Kasavu Sarees" },
    { name: "Madhya Pradesh", textiles: "Chanderi, Maheshwari" },
    { name: "Maharashtra", textiles: "Denim, Cotton Fabrics" },
    { name: "Odisha", textiles: "Sambalpuri Ikat, Bomkai" },
    { name: "Rajasthan", textiles: "Block-prints, Leheriya" },
    { name: "Tamil Nadu", textiles: "Cotton, Technical Textiles" },
    { name: "Uttar Pradesh", textiles: "Banarasi Silk, Chikankari" },
    { name: "West Bengal", textiles: "Jamdani, Baluchari, Tangail" },
    { name: "Himachal Pradesh", textiles: "Kullu Woolens, Chamba Rumals" },
    { name: "Punjab", textiles: "Cotton, Jute Yarn" },
    { name: "Delhi", textiles: "Fashion Clothing" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-32 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-400 rounded-full blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg"
            >
              <span className="text-white text-sm font-bold tracking-widest uppercase">India's Textile Heritage</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              About Indian Textiles
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }} 
              className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-white/90"
            >
              One of India's oldest and most diverse sectors, spanning traditional handlooms to modern industrial textiles
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-3xl p-10 text-center shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faBriefcase} className="text-white text-3xl" />
                </div>
                <h3 className="text-5xl font-bold text-primary-600 mb-3">2.3%</h3>
                <p className="text-gray-700 font-semibold text-lg mb-2">of India's GDP</p>
                <p className="text-sm text-gray-500">45M+ direct employment</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-3xl p-10 text-center shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-accent-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faChartLine} className="text-white text-3xl" />
                </div>
                <h3 className="text-5xl font-bold text-accent-600 mb-3">$225B</h3>
                <p className="text-gray-700 font-semibold text-lg mb-2">Market Size (2025)</p>
                <p className="text-sm text-gray-500">$350B by 2030</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-3xl p-10 text-center shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faGlobe} className="text-white text-3xl" />
                </div>
                <h3 className="text-5xl font-bold text-green-600 mb-3">$35-36B</h3>
                <p className="text-gray-700 font-semibold text-lg mb-2">Annual Exports</p>
                <p className="text-sm text-gray-500">Leading global exporter</p>
              </div>
            </motion.div>
          </div>

          {/* Ecosystem */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-primary-50 rounded-3xl shadow-2xl p-10 mb-20 border border-gray-100"
          >
            <div className="text-center mb-10">
              <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
                ECOSYSTEM
              </div>
              <h2 className="text-4xl font-serif font-bold text-gray-900">India's Textile Ecosystem</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: faSeedling, text: "Fibres, yarn, and fabrics" },
                { icon: faShirt, text: "Garments and apparel" },
                { icon: faPalette, text: "Handloom and artisanal textiles" },
                { icon: faHome, text: "Home textiles and furnishings" },
                { icon: faFlask, text: "Technical and industrial textiles" },
                { icon: faHandHoldingHeart, text: "Natural and sustainable materials" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }} 
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
                  </div>
                  <span className="text-gray-700 font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Segments */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
                KEY SEGMENTS
              </div>
              <h2 className="text-4xl font-serif font-bold text-gray-900">Diverse Textile Segments</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {segments.map((segment, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }} 
                  whileHover={{ y: -10, scale: 1.02 }} 
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${segment.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${segment.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                      <FontAwesomeIcon icon={segment.icon} className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{segment.title}</h3>
                    <p className="text-gray-600 mb-4">{segment.desc}</p>
                    <p className="text-sm text-primary-600 font-semibold">{segment.examples}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* States */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
                REGIONAL DIVERSITY
              </div>
              <h2 className="text-4xl font-serif font-bold text-gray-900">Textiles Across India</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {states.map((state, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02 }} 
                  whileHover={{ scale: 1.08, y: -5 }} 
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-l-4 border-primary-500"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{state.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{state.textiles}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutTextile;
