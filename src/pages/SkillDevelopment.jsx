import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faChalkboardTeacher, faIndustry, faDollarSign, faHandshake, faBook, faHandHoldingHeart, faPalette, faFlask, faBriefcase, faLeaf, faScissors, faArrowRight, faTrophy } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const SkillDevelopment = () => {
  const programs = [
    {
      title: "Handloom Weaving",
      icon: faHandHoldingHeart,
      duration: "3 Months",
      level: "Elite Legacy",
      desc: "Master traditional handloom techniques and modern weaving patterns with heritage accuracy.",
      features: ["Traditional techniques", "Quality control", "Market linkage"],
      gradient: 'from-primary-500 to-primary-700',
    },
    {
      title: "Textile Design & CAD",
      icon: faPalette,
      duration: "6 Months",
      level: "Intermediate",
      desc: "Learn digital textile design using industry-standard software and color theory foundations.",
      features: ["CAD software", "Color theory", "Portfolio building"],
      gradient: 'from-accent-500 to-accent-700',
    },
    {
      title: "Quality Control",
      icon: faFlask,
      duration: "2 Months",
      level: "Professional",
      desc: "Understand global textile testing methods and regulatory standards for export.",
      features: ["Lab testing", "Certification", "Documentation"],
      gradient: 'from-dark-500 to-dark-700',
    },
    {
      title: "Entrepreneurship",
      icon: faBriefcase,
      duration: "1 Month",
      level: "Global Visionary",
      desc: "Build your textile legacy with market insights, financial planning, and global strategies.",
      features: ["Business planning", "Marketing", "Finance"],
      gradient: 'from-primary-600 to-primary-900',
    },
    {
      title: "Natural Dyeing",
      icon: faLeaf,
      duration: "1 Month",
      level: "Sustainable Master",
      desc: "Explore eco-friendly natural dyeing methods and the rhythmic evolution of organic chemistry.",
      features: ["Natural dyes", "Eco-friendly", "Traditional methods"],
      gradient: 'from-accent-400 to-accent-600',
    },
    {
      title: "Garment Construction",
      icon: faScissors,
      duration: "4 Months",
      level: "Architectural Couture",
      desc: "Complete garment making from conceptual pattern drawing to high-end finishing.",
      features: ["Pattern making", "Stitching", "Finishing"],
      gradient: 'from-primary-400 to-primary-600',
    }
  ];

  const benefits = [
    { icon: faCertificate, title: "Certification", desc: "Government recognized certificates", gradient: 'from-primary-500 to-primary-700' },
    { icon: faChalkboardTeacher, title: "Expert Trainers", desc: "Industry professionals as mentors", gradient: 'from-accent-500 to-accent-700' },
    { icon: faIndustry, title: "Practical Training", desc: "Hands-on experience in workshops", gradient: 'from-dark-500 to-dark-700' },
    { icon: faDollarSign, title: "Financial Support", desc: "Subsidized fees and scholarships", gradient: 'from-accent-400 to-accent-600' },
    { icon: faHandshake, title: "Job Placement", desc: "Industry connections and placements", gradient: 'from-primary-600 to-primary-800' },
    { icon: faBook, title: "Study Material", desc: "Comprehensive learning resources", gradient: 'from-dark-400 to-dark-600' }
  ];

  return (
    <div className="min-h-screen bg-[#090912] selection:bg-primary-500/20 selection:text-white">
      <Navbar />
      <PageHero
        eyebrow="Empower Your Rhythm"
        title="Training Verticals"
        subtitle="Empowering artisans and professionals with industry-relevant heritage skills."
      />

      <div className="relative overflow-hidden">
         {/* Global Background Textures */}
         <div className="absolute inset-0 noise-overlay opacity-[0.15] pointer-events-none" />
         <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:60px_60px] pointer-events-none" />

         <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48 relative z-10">
            
            {/* ── Section 1: Flagship Masterclass ── */}
            <div className="mb-48">
               <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="group relative rounded-[48px] overflow-hidden border border-white/5 bg-white/[0.01] shadow-2xl"
               >
                  <div className="flex flex-col lg:flex-row items-stretch">
                     <div className="w-full lg:w-2/5 relative overflow-hidden min-h-[400px]">
                        <img src="https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&q=80&w=1200" alt="Weaving" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#090912] via-transparent to-transparent opacity-60" />
                        
                        <div className="absolute top-10 left-10 p-6 glass-pill rounded-3xl border-white/10 backdrop-blur-3xl flex items-center gap-6">
                           <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-xl">
                              <FontAwesomeIcon icon={faTrophy} />
                           </div>
                           <span className="text-white text-[11px] font-black uppercase tracking-[0.4em]">Elite Protocol</span>
                        </div>
                     </div>
                     
                     <div className="w-full lg:w-3/5 p-12 lg:p-20 space-y-12 flex flex-col justify-center">
                        <div className="space-y-10">
                           <span className="text-primary-500 font-bold text-[10px] uppercase tracking-[0.4em] block mb-2">The Masterclass Series</span>
                           <h3 className="font-brodies text-5xl lg:text-7xl text-white leading-none tracking-tighter">Advanced <span className="text-primary-500 italic">Heritage</span></h3>
                           <p className="text-white/60 text-xl font-medium leading-relaxed italic max-w-xl border-l border-primary-500/20 pl-6">
                              "A definitive 6-month journey into the soulful world of traditional Indian handlooms, blended with 21st-century quality output."
                           </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5">
                           {[
                              { label: 'Protocol', val: 'Advanced' },
                              { label: 'Cycle', val: '24 Weeks' },
                              { label: 'Output', val: 'Global' },
                              { label: 'Stand.', val: 'Export' }
                           ].map((stat, i) => (
                              <div key={i} className="space-y-1">
                                 <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.label}</p>
                                 <p className="text-2xl font-bold text-white tracking-tight">{stat.val}</p>
                              </div>
                           ))}
                        </div>

                        <button className="w-fit px-12 py-6 bg-white text-[#090912] rounded-[24px] font-bold text-[13px] uppercase tracking-[0.3em] hover:bg-primary-600 hover:text-white transition-all flex items-center gap-6 group/btn">
                           Request Syllabus
                           <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-3 transition-transform" />
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>

            {/* ── Section 2: Mosaic Feed ── */}
            <div className="mb-48">
               <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-20 border-b border-white/5 pb-12">
                  <div className="space-y-10 max-w-2xl">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">The Learning Feed</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-none tracking-tighter">
                        Mosaic of <span className="text-primary-500 italic">Skillsets</span>
                     </h2>
                  </div>
                  <p className="text-white/40 text-xl font-medium max-w-sm italic border-l border-white/10 pl-6">
                    "Specialized tracks decoded for the modern craftsmanship landscape."
                  </p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {programs.map((program, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -10 }}
                      className="group relative rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.015] flex flex-col transition-all duration-700"
                    >
                       <div className={`absolute top-0 right-0 w-60 h-60 bg-gradient-to-br ${program.gradient} opacity-[0.03] group-hover:opacity-[0.08] blur-3xl`} />
                       
                       <div className={`relative px-10 py-10 bg-gradient-to-br ${program.gradient} text-white`}>
                          <div className="relative z-10 flex items-center justify-between">
                             <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-3xl flex items-center justify-center text-xl border border-white/20 group-hover:rotate-6 transition-transform">
                                <FontAwesomeIcon icon={program.icon} />
                             </div>
                             <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">{program.level}</p>
                                <p className="text-xl font-bold tracking-tighter">{program.duration}</p>
                             </div>
                          </div>
                          <h3 className="mt-8 text-3xl font-bold leading-tight tracking-tight">{program.title}</h3>
                       </div>

                       <div className="p-10 space-y-10 flex-grow flex flex-col justify-between">
                          <p className="text-white/60 text-lg font-medium italic leading-relaxed">"{program.desc}"</p>
                          
                          <div className="space-y-6">
                             <div className="flex flex-wrap gap-2">
                                {program.features.map((f, i) => (
                                  <span key={i} className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/5 text-[9px] font-black uppercase tracking-widest text-primary-500/80">
                                     {f}
                                  </span>
                                ))}
                             </div>

                             <button className="flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-all">
                                Track Details
                                <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-3 transition-transform" />
                             </button>
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* ── Section 3: The Learning Standard ── */}
            <div className="mb-48">
               <div className="text-center mb-24 space-y-10">
                  <span className="text-white/20 font-black text-[10px] uppercase tracking-[0.6em] block mb-4">The Industrial Baseline</span>
                  <h2 className="font-brodies text-6xl lg:text-8xl text-white tracking-tighter leading-none">The Standard</h2>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -8 }}
                      className="group relative rounded-[40px] p-12 border border-white/5 bg-white/[0.015] flex flex-col items-center text-center transition-all duration-500"
                    >
                       <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-[0.03] blur-[60px] transition-opacity`} />
                       
                       <div className={`w-16 h-16 mb-10 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl group-hover:scale-110 transition-all duration-500`}>
                          <FontAwesomeIcon icon={benefit.icon} />
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{benefit.title}</h3>
                       <p className="text-white/60 text-base font-medium leading-relaxed">{benefit.desc}</p>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* ── Section 4: Forge Your Legacy ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[64px] overflow-hidden bg-white/[0.01] border border-white/5 px-12 lg:px-24 py-24 lg:py-40 flex flex-col items-center text-center space-y-16"
            >
               <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
               
               <div className="space-y-8 relative z-10">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-primary-600/10 flex items-center justify-center text-primary-500 text-3xl mb-8">
                     <FontAwesomeIcon icon={faCertificate} />
                  </div>
                  <div className="space-y-12">
                     <span className="text-primary-500 font-black text-[11px] uppercase tracking-[0.6em] block mb-6">The Industrial Threshold</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-[0.75] tracking-tighter">
                        Forge Your <br /> <span className="text-primary-500 italic">Legacy</span>
                     </h2>
                  </div>
                  <p className="text-white/60 text-xl lg:text-3xl font-medium max-w-2xl mx-auto leading-relaxed italic">
                     "Transformative heritage skills decoded for the ambitious revolutionary."
                  </p>
               </div>

               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-16 py-8 bg-white rounded-3xl relative z-10 group/cta shadow-[0_30px_70px_rgba(255,255,255,0.1)] overflow-hidden"
               >
                  <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 font-sans font-black text-[#090912] group-hover/cta:text-white transition-colors text-[14px] uppercase tracking-[0.4em] flex items-center gap-6">
                     Apply for Training
                     <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-3 transition-transform" />
                  </span>
               </motion.button>
               
               <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] pt-8">
                  Integrated with Global Certification Boards
               </p>
            </motion.div>
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default SkillDevelopment;
