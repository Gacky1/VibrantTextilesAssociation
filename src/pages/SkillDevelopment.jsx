import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faChalkboardTeacher, faIndustry, faDollarSign, faHandshake, faBook, faHandHoldingHeart, faPalette, faFlask, faBriefcase, faLeaf, faScissors, faClock, faChartLine, faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
        title="Skill Development Programs"
        subtitle="Empowering artisans and professionals with industry-relevant skills for sustainable growth"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative overflow-hidden">
        {/* Ambient Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50/50 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-80 h-80 bg-accent-50/30 rounded-full blur-[120px] pointer-events-none" />

        {/* Benefits Section: Why Choose Us */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em]">Excellence</span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              Program <span className="text-gradient italic font-medium">Advantages</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Our training infrastructure is designed to bridge the gap between traditional craftsmanship and modern industry standards.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className={`absolute -inset-4 bg-gradient-to-br ${benefit.gradient} rounded-[40px] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                
                <div className="relative glass-ultra rounded-[32px] border border-white/60 p-10 h-full flex flex-col items-center text-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                  <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                  
                  <div className={`w-20 h-20 mb-8 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <FontAwesomeIcon icon={benefit.icon} className="text-white text-3xl" />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-black text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-500 text-base font-medium leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Programs Section: Featured Courses */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-accent-500 font-black text-[11px] uppercase tracking-[0.4em]">Curated Learning</span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              Training <span className="text-gradient italic font-medium">Verticals</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                className="group glass-ultra rounded-[40px] overflow-hidden border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.06)] flex flex-col relative"
              >
                <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                
                <div className={`relative bg-gradient-to-br ${program.gradient} p-12 text-white overflow-hidden`}>
                   {/* Visual Depth */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl -ml-12 -mb-12" />

                   <div className="relative z-10">
                     <div className="w-16 h-16 mb-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
                       <FontAwesomeIcon icon={program.icon} className="text-white text-2xl" />
                     </div>
                     <h3 className="text-2xl font-serif font-black mb-4 leading-tight">{program.title}</h3>
                     <div className="flex flex-wrap gap-3">
                       <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                         <FontAwesomeIcon icon={faClock} />
                         <span>{program.duration}</span>
                       </div>
                       <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                         <FontAwesomeIcon icon={faChartLine} />
                         <span>{program.level}</span>
                       </div>
                     </div>
                   </div>
                </div>

                <div className="p-10 flex flex-col flex-grow relative z-10">
                  <p className="text-gray-500 text-base font-medium mb-8 leading-relaxed italic">"{program.desc}"</p>
                  
                  <div className="space-y-4 mb-10">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Core Modules</p>
                    {program.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${program.gradient}`} />
                        <span className="text-gray-700 text-sm font-bold tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group/btn mt-auto relative w-full flex items-center justify-center gap-4 px-8 py-5 bg-gradient-to-r ${program.gradient} text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 opacity-10 transition-transform duration-500" />
                    <span className="relative z-10">Enroll Program</span>
                    <FontAwesomeIcon icon={faArrowRight} className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA: Heroic Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] p-16 md:p-32 text-center overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
        >
          {/* Animated Mesh Background */}
          <div className="absolute inset-0 bg-[#050508]">
            <div className="absolute inset-0 bg-mesh-gradient animate-mesh-slow opacity-40" />
            <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
          </div>
          
          <div className="relative z-10 space-y-12">
            <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="text-white text-4xl" />
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight font-black">
                Ready to Upgrade <br />
                <span className="text-gradient italic font-medium">Your Skills?</span>
              </h2>
              <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Join thousands of artisans and professionals transforming their careers through our industry-leading certification programs.
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-6 px-14 py-7 bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all"
            >
              <div className="absolute inset-0 bg-primary-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative font-black text-primary-900 text-base uppercase tracking-widest italic">Apply for Training</span>
              <FontAwesomeIcon icon={faArrowRight} className="relative text-primary-600 transition-transform group-hover:translate-x-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SkillDevelopment;
