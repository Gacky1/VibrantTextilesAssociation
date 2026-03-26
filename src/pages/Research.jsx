import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faLeaf, faChartBar, faPalette, faCogs, faGavel, faFileAlt, faBook, faLightbulb, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

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
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Innovation & Insights"
        title="Research & Discovery"
        subtitle="Pioneering the future of textiles through evidence-based research and transformative insights."
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative overflow-hidden">
        {/* Ambient Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50/50 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-80 h-80 bg-accent-50/30 rounded-full blur-[120px] pointer-events-none" />

        {/* Research Focus Areas: Interactive Service Cards */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em]">Inquiry</span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              Strategic <span className="text-gradient italic font-medium">Focus Areas</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                className="group relative h-full"
              >
                {/* Substrate Glow */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${area.gradient} rounded-[40px] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                
                <div className="relative glass-ultra rounded-[32px] border border-white/60 p-10 h-full flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                  <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                  
                  <div className={`w-16 h-16 mb-8 bg-gradient-to-br ${area.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <FontAwesomeIcon icon={area.icon} className="text-white text-2xl" />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-black text-gray-900 mb-4">{area.title}</h3>
                  <p className="text-gray-500 text-base font-medium leading-relaxed mb-8">{area.desc}</p>
                  
                  <div className="mt-auto">
                    <div className={`inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r ${area.gradient} text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                      <FontAwesomeIcon icon={faFlask} />
                      {area.projects} Active Projects
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Publications: Sleek Editorial List */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-accent-500 font-black text-[11px] uppercase tracking-[0.4em]">Scholarship</span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              Latest <span className="text-gradient italic font-medium">Publications</span>
            </h2>
          </div>
          
          <div className="space-y-6 max-w-5xl mx-auto">
            {publications.map((pub, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 12, scale: 1.01 }}
                className="group relative glass-ultra rounded-[32px] p-8 md:p-10 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.03)] cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${pub.gradient} rounded-[24px] flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:rotate-6 transition-transform duration-500`}>
                    <FontAwesomeIcon icon={pub.icon} className="text-white text-3xl" />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-1.5 bg-gradient-to-r ${pub.gradient} text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-md`}>
                        {pub.type}
                      </div>
                      <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest">{pub.year}</div>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl font-black text-gray-900 leading-tight group-hover:text-primary-700 transition-colors">
                      {pub.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="w-12 h-[1px] bg-primary-100 group-hover:w-20 transition-all duration-700" />
                     <FontAwesomeIcon icon={faArrowRight} className="text-primary-300 group-hover:text-primary-600 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section: Heroic Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] p-16 md:p-32 text-center overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
        >
          {/* Animated Mesh Background */}
          <div className="absolute inset-0 bg-[#050508]">
            <div className="absolute inset-0 bg-mesh-gradient animate-mesh-slow opacity-40 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
            <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
          </div>
          
          <div className="relative z-10 space-y-12">
            <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl">
              <FontAwesomeIcon icon={faLightbulb} className="text-white text-4xl" />
            </div>
            
            <div className="space-y-6">
              <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight font-black">
                Collaborate <br />
                <span className="text-gradient italic font-medium">With Us</span>
              </h2>
              <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Partner with us on pioneering research projects and contribute to the evolution of the global textile industry.
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-6 px-14 py-7 bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all"
            >
              <div className="absolute inset-0 bg-primary-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative font-black text-primary-900 text-base uppercase tracking-widest italic">Submit Research Proposal</span>
              <FontAwesomeIcon icon={faArrowRight} className="relative text-primary-600 transition-transform group-hover:translate-x-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Research;
