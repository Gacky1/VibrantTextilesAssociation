import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faChartLine, faGlobe, faHandHoldingHeart, faIndustry, faShirt, faPalette, faHome, faFlask, faSeedling, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

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
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="India's Textile Heritage"
        title="About Indian Textiles"
        subtitle="One of India's oldest and most diverse sectors, spanning traditional handlooms to modern industrial textiles"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-72 h-72 bg-accent-100/20 rounded-full blur-[80px] pointer-events-none" />

        {/* Overview Stats: High-Impact Glass Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32 relative z-10">
          {[
            { icon: faBriefcase, val: "2.3%", label: "of India's GDP", sub: "45M+ direct employment", color: "text-primary-600", glow: "from-primary-500/20" },
            { icon: faChartLine, val: "$225B", label: "Market Size (2025)", sub: "$350B by 2030 target", color: "text-accent-500", glow: "from-accent-500/20" },
            { icon: faGlobe, val: "$36B", label: "Annual Exports", sub: "Global export pioneer", color: "text-emerald-600", glow: "from-emerald-500/20" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              <div className={`absolute -inset-4 bg-gradient-to-tr ${stat.glow} to-transparent rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative glass-ultra rounded-[32px] border border-white/60 p-10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.06)] h-full flex flex-col items-center text-center">
                <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                
                <div className="w-20 h-20 mb-8 glass-premium rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/40">
                  <FontAwesomeIcon icon={stat.icon} className={`${stat.color} text-3xl`} />
                </div>
                
                <h3 className={`font-serif text-5xl font-black ${stat.color} mb-3 tracking-tighter`}>{stat.val}</h3>
                <p className="text-gray-900 font-black text-[13px] uppercase tracking-widest mb-2">{stat.label}</p>
                <div className="h-0.5 w-10 bg-gray-100 group-hover:w-20 transition-all duration-500 mb-4" />
                <p className="text-sm text-gray-400 font-medium">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

          {/* Ecosystem: Re-imagined with Premium Glass Connectivity */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative glass-ultra rounded-[40px] border border-white/60 p-12 lg:p-16 mb-32 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.06)]"
          >
            <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50/30 to-transparent pointer-events-none" />
            
            <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-8">
                <span className="px-5 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[11px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" />
                  Ecosystem
                </span>
                <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-gray-900 leading-tight font-black">
                  The Fabric of <br />
                  <span className="text-gradient italic font-medium">Indian Industry</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                  A multi-layered infrastructure spanning raw material procurement to global retail logistics, defining the backbone of our economy.
                </p>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: faSeedling, text: "Fibres & Yarn", desc: "Foundational materials" },
                  { icon: faShirt, text: "Garments", desc: "Finished apparel" },
                  { icon: faPalette, text: "Handloom", desc: "Artisanal excellence" },
                  { icon: faHome, text: "Furnishings", desc: "Interior solutions" },
                  { icon: faFlask, text: "Technical", desc: "Industrial textiles" },
                  { icon: faHandHoldingHeart, text: "Sustainable", desc: "Eco-conscious future" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}
                    className="flex items-center gap-5 p-6 bg-white/40 rounded-2xl border border-white/60 backdrop-blur-sm group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                      <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-[13px] uppercase tracking-wider">{item.text}</div>
                      <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Segments: Modern Service Grid */}
          <div className="mb-32">
            <div className="text-center mb-16 space-y-4">
              <span className="text-accent-500 font-black text-[11px] uppercase tracking-[0.4em]">Core Verticals</span>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
                Pillars of <span className="text-gradient italic font-medium">Advancement</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {segments.map((segment, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -15 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-4 bg-gradient-to-br ${segment.bgGradient} rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  <div className="relative glass-ultra rounded-[32px] border border-white/60 p-10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.06)] h-full flex flex-col">
                    <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                    
                    <div className={`w-16 h-16 mb-8 bg-gradient-to-br ${segment.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <FontAwesomeIcon icon={segment.icon} className="text-white text-2xl" />
                    </div>
                    
                    <h3 className="text-2xl font-serif font-black text-gray-900 mb-4">{segment.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium mb-6 flex-grow">{segment.desc}</p>
                    
                    <div className="pt-6 border-t border-gray-100/50">
                      <p className="text-[11px] font-black uppercase tracking-widest text-primary-600 mb-1">Key Examples</p>
                      <p className="text-xs text-gray-400 font-bold">{segment.examples}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Regional Diversity: Professional States Grid */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-gray-100 pb-12">
              <div className="max-w-2xl space-y-4">
                <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em]">Geographic Excellence</span>
                <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
                  Textiles Across <br />
                  <span className="text-gradient italic font-medium">Pan-India</span>
                </h2>
              </div>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest max-w-[200px] leading-relaxed">
                Mapping the heritage of 16 key manufacturing states.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {states.map((state, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }} 
                  whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,1)', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }} 
                  className="group bg-gray-50/50 rounded-2xl p-6 border border-gray-100 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:shadow-primary-200 transition-all duration-300">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{state.name}</h3>
                      <div className="h-0.5 w-6 bg-primary-100 mt-1 group-hover:w-10 transition-all" />
                    </div>
                  </div>
                  <p className="text-[13px] text-gray-500 font-medium leading-relaxed group-hover:text-gray-700 transition-colors">{state.textiles}</p>
                </motion.div>
              ))}
            </div>
          </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutTextile;
