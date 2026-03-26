import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faChalkboardTeacher, faIndustry, faDollarSign, faHandshake, faBook, faHandHoldingHeart, faPalette, faFlask, faBriefcase, faLeaf, faScissors, faClock, faChartLine, faCheckCircle, faArrowRight, faTrophy } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const SkillDevelopment = () => {
  const programs = [
    {
      title: "Handloom Weaving Training",
      icon: faHandHoldingHeart,
      duration: "3 Months",
      level: "Beginner to Advanced",
      desc: "Master traditional handloom techniques and modern weaving patterns",
      features: ["Traditional techniques", "Modern patterns", "Quality control", "Market linkage"],
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    {
      title: "Textile Design & CAD",
      icon: faPalette,
      duration: "6 Months",
      level: "Intermediate",
      desc: "Learn digital textile design using industry-standard software",
      features: ["CAD software", "Pattern making", "Color theory", "Portfolio building"],
      gradient: 'from-pink-500 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100'
    },
    {
      title: "Quality Control & Testing",
      icon: faFlask,
      duration: "2 Months",
      level: "Professional",
      desc: "Understand textile testing methods and quality standards",
      features: ["Lab testing", "Quality standards", "Certification", "Documentation"],
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    {
      title: "Entrepreneurship Development",
      icon: faBriefcase,
      duration: "1 Month",
      level: "All Levels",
      desc: "Build your textile business with market insights and strategies",
      features: ["Business planning", "Marketing", "Finance", "Legal compliance"],
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100'
    },
    {
      title: "Natural Dyeing Techniques",
      icon: faLeaf,
      duration: "1 Month",
      level: "Beginner",
      desc: "Explore eco-friendly natural dyeing methods and sustainability",
      features: ["Natural dyes", "Eco-friendly", "Color fastness", "Traditional methods"],
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100'
    },
    {
      title: "Garment Construction",
      icon: faScissors,
      duration: "4 Months",
      level: "Beginner to Advanced",
      desc: "Complete garment making from pattern to finished product",
      features: ["Pattern making", "Cutting", "Stitching", "Finishing"],
      gradient: 'from-cyan-500 to-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100'
    }
  ];

  const benefits = [
    { icon: faCertificate, title: "Certification", desc: "Government recognized certificates", gradient: 'from-blue-500 to-blue-600' },
    { icon: faChalkboardTeacher, title: "Expert Trainers", desc: "Industry professionals as mentors", gradient: 'from-purple-500 to-purple-600' },
    { icon: faIndustry, title: "Practical Training", desc: "Hands-on experience in workshops", gradient: 'from-green-500 to-green-600' },
    { icon: faDollarSign, title: "Financial Support", desc: "Subsidized fees and scholarships", gradient: 'from-accent-500 to-accent-600' },
    { icon: faHandshake, title: "Job Placement", desc: "Industry connections and placements", gradient: 'from-primary-500 to-primary-600' },
    { icon: faBook, title: "Study Material", desc: "Comprehensive learning resources", gradient: 'from-cyan-500 to-cyan-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Empower Your Skills"
        title={
          <>
            Training <span className="text-gradient italic font-medium">Verticals</span>
          </>
        }
        subtitle="Empowering artisans and professionals with industry-relevant skills for sustainable growth."
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-50/40 rounded-full blur-[160px] pointer-events-none opacity-50" />
        <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-accent-50/20 rounded-full blur-[140px] pointer-events-none opacity-50" />

        {/* ── Section 1: Heroic Featured Program Showcase ── */}
        <div className="mb-40 relative z-10">
          <div className="text-center mb-20 space-y-6">
            <span className="text-primary-600 font-black text-[12px] uppercase tracking-[0.5em] flex items-center justify-center gap-3">
               <span className="w-8 h-[1px] bg-primary-600" />
               Flagship Initiative
               <span className="w-8 h-[1px] bg-primary-600" />
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-gray-900 font-black leading-tight">
               Mastering <span className="text-gradient italic font-medium">Craftsmanship</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative glass-ultra rounded-[60px] overflow-hidden border border-white/60 shadow-[0_50px_100px_rgba(0,0,0,0.08)]"
          >
            <div className="flex flex-col lg:flex-row items-stretch">
               <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&q=80&w=1200" alt="Featured Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-10 left-10 glass-premium px-6 py-3 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4">
                     <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white">
                        <FontAwesomeIcon icon={faTrophy} />
                     </div>
                     <span className="text-white text-[11px] font-black uppercase tracking-widest italic">Elite Certification</span>
                  </div>
               </div>
               
               <div className="w-full lg:w-1/2 p-12 md:p-20 space-y-12">
                  <div className="space-y-6">
                     <p className="text-primary-600 font-black text-xs uppercase tracking-[0.4em]">Masterclass Series</p>
                     <h3 className="font-serif text-5xl md:text-6xl font-black text-gray-900 leading-tight">Advanced <br /> Heritage Weaving</h3>
                     <p className="text-gray-500 text-xl font-medium leading-relaxed">
                        A definitive 6-month journey into the soulful world of traditional Indian handlooms, blended with 21st-century quality assurance standards.
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                     {[
                        { label: 'Intensity', val: 'Professional' },
                        { label: 'Duration', val: '24 Weeks' },
                        { label: 'Artisans', val: '500+ Trained' },
                        { label: 'Linkage', val: '100% Export Ready' }
                     ].map((stat, i) => (
                        <div key={i} className="space-y-1">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                           <p className="text-xl font-serif font-black text-gray-900">{stat.val}</p>
                        </div>
                     ))}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="group/btn inline-flex items-center gap-6 px-12 py-6 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] overflow-hidden"
                  >
                    <span>Request Masterclass Syllabus</span>
                    <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
               </div>
            </div>
          </motion.div>
        </div>

        {/* ── Section 2: Mosaic Program Grid ── */}
        <div className="mb-40 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20">
            <div className="max-w-2xl space-y-6">
              <span className="text-accent-500 font-black text-[12px] uppercase tracking-[0.5em] flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent-500" />
                Specialized Tracks
              </span>
              <h2 className="font-serif text-5xl md:text-7xl text-gray-900 leading-tight font-black">
                The Mosaic of <br />
                <span className="text-gradient italic font-medium">Skillsets</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-6 md:grid-rows-2 gap-8 h-auto md:h-[1000px]">
            {programs.map((program, idx) => {
               // Mosaic Layout configuration
               const mosaicConfig = [
                 'md:col-span-3 md:row-span-1', // Handloom
                 'md:col-span-3 md:row-span-1', // Design
                 'md:col-span-2 md:row-span-1', // QC
                 'md:col-span-4 md:row-span-1', // Entrepreneurship (Wide)
                 'md:col-span-3 md:row-span-1 bg-gray-50', // Natural Dyeing
                 'md:col-span-3 md:row-span-1', // Garment Construction
               ];

               return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group relative glass-ultra rounded-[48px] overflow-hidden border border-white/60 shadow-[0_30px_70px_rgba(0,0,0,0.06)] flex flex-col ${mosaicConfig[idx]}`}
                  >
                    <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000`} />
                    
                    <div className={`relative bg-gradient-to-br ${program.gradient} p-10 text-white overflow-hidden`}>
                       <div className="relative z-10 flex items-center justify-between">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                             <FontAwesomeIcon icon={program.icon} className="text-white text-2xl" />
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Professional Track</p>
                             <p className="text-lg font-serif font-black">{program.duration}</p>
                          </div>
                       </div>
                       <h3 className="mt-8 font-serif text-3xl font-black leading-tight tracking-tight">{program.title}</h3>
                    </div>

                    <div className="p-10 flex flex-col flex-grow relative z-10">
                       <p className="text-gray-500 text-base font-medium mb-8 leading-relaxed max-w-md italic">"{program.desc}"</p>
                       
                       <div className="flex flex-wrap gap-2 mb-10">
                          {program.features.slice(0, 3).map((f, i) => (
                             <span key={i} className={`px-4 py-1.5 glass-ultra border border-gray-100 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-primary-600 transition-colors`}>
                                {f}
                             </span>
                          ))}
                       </div>

                       <motion.button
                         whileHover={{ scale: 1.02, x: 5 }}
                         className={`mt-auto inline-flex items-center gap-4 text-primary-600 font-black text-[11px] uppercase tracking-widest`}
                       >
                         View Track Details
                         <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
                       </motion.button>
                    </div>
                  </motion.div>
               );
            })}
          </div>
        </div>

        {/* ── Section 3: Bento Grid Benefits ── */}
        <div className="mb-40 relative z-10">
          <div className="text-center mb-24 space-y-6">
            <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em]">Proprietary Ecosystem</span>
            <h2 className="font-serif text-5xl md:text-7xl text-gray-900 font-black leading-tight">
              The Learning <span className="text-gradient italic font-medium">Standard</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -12 }}
                className="group relative glass-ultra rounded-[40px] p-10 border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col items-center text-center"
              >
                <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
                <div className={`absolute -inset-10 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-1000`} />
                
                <div className={`w-14 h-14 mb-8 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500`}>
                   <FontAwesomeIcon icon={benefit.icon} className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-serif font-black text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Section 4: Cinematic Certification Invite (CTA) ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[60px] p-24 md:p-32 text-center overflow-hidden shadow-[0_60px_150px_rgba(0,0,0,0.25)]"
        >
          {/* Enhanced Mesh Background */}
          <div className="absolute inset-0 bg-[#050508]">
            <div className="absolute inset-0 bg-mesh-gradient animate-mesh-slow opacity-60" />
            <div className="absolute inset-0 noise-overlay opacity-[0.1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/40" />
            
            {/* Cinematic lighthouse bloom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[180px] animate-pulse-slow" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-16">
            <div className="space-y-8">
               <div className="w-20 h-20 mx-auto glass-premium rounded-[24px] flex items-center justify-center border border-white/20 shadow-2xl">
                  <FontAwesomeIcon icon={faCertificate} className="text-white text-3xl" />
               </div>
               <div className="space-y-6">
                  <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-tight font-black">
                    Forge your <br />
                    <span className="text-gradient italic font-medium">Professional Legacy</span>
                  </h2>
                  <p className="text-white/40 text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                    Global recognition. Industrial depth. A transformative journey for the ambitious textile professional.
                  </p>
               </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-6 px-16 py-8 bg-white rounded-[24px] overflow-hidden shadow-[0_30px_70px_rgba(255,255,255,0.15)] transition-all"
            >
              <div className="absolute inset-0 bg-primary-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative font-black text-primary-900 text-lg uppercase tracking-widest italic">Apply for Training</span>
              <FontAwesomeIcon icon={faArrowRight} className="relative text-primary-600 transition-transform group-hover:translate-x-3 text-xl" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SkillDevelopment;
