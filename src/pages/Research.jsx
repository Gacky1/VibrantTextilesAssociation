import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faLeaf, faChartBar, faPalette, faCogs, faGavel, faFileAlt, faBook, faLightbulb, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const Research = () => {
  const researchAreas = [
    { icon: faFlask, title: "Textile Innovation", desc: "Advanced materials and smart textiles research", projects: "15+", gradient: 'from-blue-500 to-blue-600' },
    { icon: faLeaf, title: "Sustainability", desc: "Eco-friendly processes and circular economy", projects: "12+", gradient: 'from-emerald-500 to-emerald-600' },
    { icon: faChartBar, title: "Market Analysis", desc: "Industry trends and consumer behavior studies", projects: "20+", gradient: 'from-primary-500 to-primary-600' },
    { icon: faPalette, title: "Design Research", desc: "Traditional crafts and contemporary design fusion", projects: "10+", gradient: 'from-accent-500 to-accent-700' },
    { icon: faCogs, title: "Tech Integration", desc: "Automation and digital transformation", projects: "8+", gradient: 'from-violet-500 to-violet-600' },
    { icon: faGavel, title: "Policy Studies", desc: "Trade policies and regulatory frameworks", projects: "18+", gradient: 'from-amber-500 to-amber-600' }
  ];

  const publications = [
    { title: "Future of Indian Handloom Industry", year: "2024", type: "Research Paper", icon: faFileAlt, gradient: 'from-blue-500 to-blue-600' },
    { title: "Sustainable Textile Practices in India", year: "2023", type: "White Paper", icon: faBook, gradient: 'from-emerald-500 to-emerald-600' },
    { title: "Digital Transformation in Textile Sector", year: "2023", type: "Case Study", icon: faLightbulb, gradient: 'from-primary-500 to-primary-600' }
  ];

  return (
    <div className="min-h-screen bg-dark-950 selection:bg-primary-500/20 selection:text-white">
      <Navbar />
      <PageHero
        eyebrow="The Laboratory"
        title="Research & Discovery"
        subtitle="Pioneering the rhythmic interface through evidence-based research."
      />

      <div className="relative overflow-hidden">
         {/* Global Grain Layers */}
         <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
         <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />

         <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-52 relative z-10">
            
            {/* ── Section 1: Strategic Focus ── */}
            <div className="mb-52">
               <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-32 border-b border-white/5 pb-12">
                  <div className="space-y-10 max-w-2xl">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">The Inquiry</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-none tracking-tighter">
                        Strategic <span className="text-primary-500 italic">Focus</span>
                     </h2>
                  </div>
                  <p className="text-white/30 text-xl font-medium leading-relaxed max-w-sm italic">
                    "Expanding the boundaries of textile civilization through rhythmic inquiry."
                  </p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {researchAreas.map((area, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -10 }}
                      className="group relative glass rounded-[48px] p-12 border-white/5 flex flex-col justify-between min-h-[450px] transition-all duration-700"
                    >
                       <div className={`absolute top-0 right-0 w-60 h-60 bg-gradient-to-br ${area.gradient} opacity-5 group-hover:opacity-10 blur-[80px] transition-opacity`} />
                       
                       <div className="space-y-10 relative z-10">
                          <div className={`w-20 h-20 bg-gradient-to-br ${area.gradient} rounded-[32px] flex items-center justify-center text-white text-3xl shadow-inner group-hover:rotate-12 transition-transform`}>
                             <FontAwesomeIcon icon={area.icon} />
                          </div>
                          <div className="space-y-6">
                             <h3 className="font-bold text-4xl text-white tracking-tight leading-tight">{area.title}</h3>
                             <p className="text-white/40 text-lg font-medium leading-relaxed italic border-l border-white/10 pl-6">"{area.desc}"</p>
                          </div>
                       </div>

                       <div className="pt-10 flex items-center justify-between border-t border-white/10 mt-10 relative z-10">
                          <div className="flex items-center gap-4 text-primary-500/80 font-black text-[10px] uppercase tracking-[0.4em]">
                             <FontAwesomeIcon icon={faFlask} />
                             {area.projects} Registry Entries
                          </div>
                          <FontAwesomeIcon icon={faArrowRight} className="text-white/10 group-hover:text-primary-500 group-hover:translate-x-4 transition-all" />
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* ── Section 2: Scholarship Archive ── */}
            <div className="mb-52">
               <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-32 border-b border-white/5 pb-12">
                  <div className="space-y-10 max-w-2xl">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">The Scholarship</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-none tracking-tighter">
                        Latest <span className="text-primary-500 italic">Registry</span>
                     </h2>
                  </div>
               </div>

               <div className="space-y-8 max-w-5xl mx-auto">
                  {publications.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 20 }}
                      className="group relative glass rounded-[48px] p-12 border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-12 transition-all duration-700 cursor-pointer overflow-hidden"
                    >
                       <div className="absolute inset-0 noise-overlay opacity-5" />
                       <div className="absolute -inset-2 bg-gradient-to-r from-primary-600/5 to-accent-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                       <div className="flex-1 space-y-10 relative z-10">
                          <div className="flex items-center gap-10">
                             <span className="px-6 py-2 glass rounded-full text-primary-500 font-black text-[9px] uppercase tracking-[0.3em] border-white/5">
                                {item.type}
                             </span>
                             <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                             <span className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em]">{item.year}</span>
                          </div>
                          <h3 className="font-bold text-3xl lg:text-5xl text-white leading-tight tracking-tight group-hover:text-primary-500 transition-colors">
                             {item.title}
                          </h3>
                       </div>
                       
                       <div className="flex items-center gap-8 relative z-10">
                          <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-[28px] flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                             <FontAwesomeIcon icon={item.icon} className="text-2xl" />
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* ── Section 3: Collaborative Threshold ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[80px] overflow-hidden group/cta"
            >
               <div className="absolute inset-0 bg-dark-900 border border-white/5">
                  <div className="absolute inset-0 noise-overlay opacity-30" />
                  <div className="absolute inset-0 grain-overlay opacity-20" />
                  <div className="absolute inset-0 bg-primary-600/5 transition-colors group-hover/cta:bg-primary-600/10 duration-1000" />
               </div>

               <div className="relative z-10 px-12 lg:px-32 py-32 lg:py-48 flex flex-col items-center text-center space-y-16 text-white">
                  <div className="space-y-12">
                     <span className="text-primary-500 font-black text-[11px] uppercase tracking-[0.6em] block mb-6">The Collaborative Threshold</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-[0.75] tracking-tighter">
                        Forge <br /> <span className="text-primary-500 italic">Discovery</span>
                     </h2>
                     <p className="text-white/30 text-2xl lg:text-4xl font-medium max-w-3xl mx-auto leading-tight italic">
                        "Partner with us on pioneering research projects and contribute to the evolution of the global textile industry."
                     </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-16 py-8 bg-white rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(255,255,255,0.1)] flex items-center gap-8 text-dark-950"
                  >
                     <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                     <span className="relative z-10 font-sans font-black text-[13px] uppercase tracking-[0.4em] group-hover:text-white transition-colors">Submit Proposal</span>
                     <FontAwesomeIcon icon={faArrowRight} className="relative z-10 group-hover:text-white transition-colors text-xl group-hover:translate-x-3 transition-transform" />
                  </motion.button>
               </div>
            </motion.div>
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default Research;
