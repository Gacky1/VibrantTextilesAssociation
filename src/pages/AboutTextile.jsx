import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faLightbulb, faGlobe, faArrowRight, faIndustry, faMicrochip, faRecycle, faAward } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const AboutTextile = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const stats = [
    { label: 'Ancient Rhythm', val: '5,000+', sub: 'Years of Heritage' },
    { label: 'Global Registry', val: '120+', sub: 'Export Markets' },
    { label: 'Artisan Hubs', val: '75+', sub: 'Strategic Nodes' },
    { label: 'Elite Cert.', val: '15+', sub: 'Industrial Standards' }
  ];

  const segments = [
    { title: 'The Handloom Legacy', icon: faHistory, desc: 'Preserving the tactile heartbeat of ancient craftsmanship through rhythmic precision.', color: 'from-primary-600 to-primary-800' },
    { title: 'Digital Evolution', icon: faMicrochip, desc: 'Integrating high-end automation with traditional depth for the modern revolutionary.', color: 'from-accent-500 to-accent-700' },
    { title: 'Sustainable Core', icon: faRecycle, desc: 'Pioneering organic chemistry and circular economy protocols in every thread.', color: 'from-emerald-500 to-emerald-700' },
    { title: 'Global Distinction', icon: faAward, desc: 'Achieving export excellence and global recognition for the Indian aesthetic.', color: 'from-blue-600 to-blue-800' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-dark-950 selection:bg-primary-500/20 selection:text-white">
      <Navbar />
      <PageHero
        eyebrow="The Chronicle"
        title="Tactile Deep-Dive"
        subtitle="Decoding the rhythmic DNA of India's textile civilization."
      />

      <div className="relative overflow-hidden">
         <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-52 relative z-10">
            
            {/* ── Section 1: Industrial Stats ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-52">
               {stats.map((stat, idx) => (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="group glass p-12 rounded-[40px] border-white/5 text-center space-y-6 hover:bg-white/5 transition-all"
                 >
                     <p className="text-primary-500 font-black text-[9px] uppercase tracking-[0.4em]">{stat.label}</p>
                     <h3 className="font-brodies text-7xl text-white mb-4 tracking-tighter shadow-glow">{stat.val}</h3>
                     <p className="text-white/20 text-xs font-medium italic tracking-widest uppercase">{stat.sub}</p>
                 </motion.div>
               ))}
            </div>

            {/* ── Section 2: Core Segments ── */}
            <div className="mb-52">
               <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-32 border-b border-white/5 pb-12">
                  <div className="space-y-10 max-w-2xl">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">The Pillars</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-none tracking-tighter">
                        Strategic <span className="text-primary-500 italic">Resonance</span>
                     </h2>
                  </div>
                  <p className="text-white/30 text-xl font-medium leading-relaxed max-w-sm italic">
                    "Expanding the boundaries of textile civilization through industrial inquiry."
                  </p>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  {segments.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -10 }}
                      className="group relative glass rounded-[48px] p-16 border-white/5 flex flex-col justify-between min-h-[400px] transition-all duration-700"
                    >
                       <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 blur-[90px] transition-opacity`} />
                       <div className="space-y-12 relative z-10">
                          <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-[32px] flex items-center justify-center text-white text-3xl shadow-inner group-hover:rotate-12 transition-transform`}>
                             <FontAwesomeIcon icon={item.icon} />
                          </div>
                          <div className="space-y-6">
                             <h4 className="font-bold text-4xl text-white leading-tight tracking-tight">{item.title}</h4>
                             <p className="text-white/40 text-lg font-medium leading-relaxed italic border-l border-white/10 pl-6">"{item.desc}"</p>
                          </div>
                       </div>

                       <div className="pt-10 flex items-center justify-between border-t border-white/10 mt-10 relative z-10">
                          <span className="text-primary-500/80 font-black text-[10px] uppercase tracking-[0.4em]">Protocol Active</span>
                          <FontAwesomeIcon icon={faArrowRight} className="text-white/10 group-hover:text-primary-500 group-hover:translate-x-4 transition-all" />
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* ── Section 3: The Collaborative Threshold (Sleek CTA) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[80px] overflow-hidden group/cta"
            >
               <div className="absolute inset-0 bg-dark-900 border border-white/5">
                  <div className="absolute inset-0 noise-overlay opacity-30" />
                  <div className="absolute inset-0 bg-primary-600/5 transition-colors group-hover/cta:bg-primary-600/10 duration-1000" />
               </div>

               <div className="relative z-10 px-12 lg:px-32 py-32 lg:py-48 flex flex-col items-center text-center space-y-20 text-white">
                  <div className="space-y-12">
                     <div className="w-24 h-24 mx-auto glass rounded-[32px] flex items-center justify-center border-white/10 text-primary-500 text-4xl shadow-2xl backdrop-blur-3xl animate-pulse">
                        <FontAwesomeIcon icon={faGlobe} />
                     </div>
                     <div className="space-y-12">
                        <span className="text-primary-500 font-black text-[11px] uppercase tracking-[0.6em] block mb-6">The Collaborative Threshold</span>
                        <h2 className="font-brodies text-6xl lg:text-8xl leading-[0.75] tracking-tighter">
                           Forge <br /> <span className="text-primary-500 italic">Ambition</span>
                        </h2>
                        <p className="text-white/30 text-2xl lg:text-4xl font-medium max-w-3xl mx-auto leading-tight italic">
                           "Partner with us to redefine the future of the global textile landscape."
                        </p>
                     </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-16 py-8 bg-white rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(255,255,255,0.1)] flex items-center gap-8 text-dark-950"
                  >
                     <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                     <span className="relative z-10 font-sans font-black text-[13px] uppercase tracking-[0.4em] group-hover:text-white transition-colors">Apply to the Collective</span>
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

export default AboutTextile;
