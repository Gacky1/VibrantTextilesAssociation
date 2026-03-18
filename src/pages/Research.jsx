import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faLeaf, faChartBar, faPalette, faCogs, faGavel, faFileAlt, faBook, faLightbulb, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Research = () => {
  const researchAreas = [
    { icon: faFlask, title: "Textile Innovation", desc: "Advanced materials and smart textiles research", projects: "15+", gradient: 'from-blue-500 to-blue-600', bgGradient: 'from-blue-50 to-blue-100' },
    { icon: faLeaf, title: "Sustainability", desc: "Eco-friendly processes and circular economy", projects: "12+", gradient: 'from-green-500 to-green-600', bgGradient: 'from-green-50 to-green-100' },
    { icon: faChartBar, title: "Market Analysis", desc: "Industry trends and consumer behavior studies", projects: "20+", gradient: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-50 to-purple-100' },
    { icon: faPalette, title: "Design Research", desc: "Traditional crafts and contemporary design fusion", projects: "10+", gradient: 'from-pink-500 to-pink-600', bgGradient: 'from-pink-50 to-pink-100' },
    { icon: faCogs, title: "Technology Integration", desc: "Automation and digital transformation", projects: "8+", gradient: 'from-cyan-500 to-cyan-600', bgGradient: 'from-cyan-50 to-cyan-100' },
    { icon: faGavel, title: "Policy Studies", desc: "Trade policies and regulatory frameworks", projects: "18+", gradient: 'from-primary-500 to-primary-600', bgGradient: 'from-primary-50 to-primary-100' }
  ];

  const publications = [
    { title: "Future of Indian Handloom Industry", year: "2024", type: "Research Paper", icon: faFileAlt, gradient: 'from-blue-500 to-blue-600' },
    { title: "Sustainable Textile Practices in India", year: "2023", type: "White Paper", icon: faBook, gradient: 'from-green-500 to-green-600' },
    { title: "Digital Transformation in Textile Sector", year: "2023", type: "Case Study", icon: faLightbulb, gradient: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-400 rounded-full blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg"
          >
            <span className="text-white text-sm font-bold tracking-widest uppercase">Innovation & Insights</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            Research & Innovation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90"
          >
            Driving textile sector growth through evidence-based insights
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Research Focus Areas */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              RESEARCH AREAS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Our Focus Areas</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${area.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${area.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    <FontAwesomeIcon icon={area.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{area.desc}</p>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${area.gradient} text-white rounded-full text-sm font-bold`}>
                    <FontAwesomeIcon icon={faFlask} />
                    {area.projects} Active Projects
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Publications */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              PUBLICATIONS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Recent Publications</h2>
          </div>
          
          <div className="space-y-6">
            {publications.map((pub, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 10 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-start gap-6 flex-1">
                    <div className={`w-16 h-16 bg-gradient-to-br ${pub.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <FontAwesomeIcon icon={pub.icon} className="text-white text-2xl" />
                    </div>
                    <div>
                      <div className={`inline-block px-4 py-1 bg-gradient-to-r ${pub.gradient} text-white rounded-full text-sm font-bold mb-3`}>
                        {pub.type}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{pub.title}</h3>
                    </div>
                  </div>
                  <div className="text-gray-500 font-semibold text-lg">{pub.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full blur-3xl opacity-20"></div>
          </div>
          
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faLightbulb} className="text-white text-4xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Collaborate With Us</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">Partner in research projects and contribute to textile innovation</p>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Submit Research Proposal
              <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Research;
