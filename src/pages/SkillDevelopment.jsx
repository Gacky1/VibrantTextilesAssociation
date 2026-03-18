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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              WHY CHOOSE US
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Program Benefits</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    <FontAwesomeIcon icon={benefit.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Programs Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              TRAINING PROGRAMS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Our Courses</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className={`relative bg-gradient-to-br ${program.gradient} p-8 text-white overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative">
                    <div className="w-16 h-16 mb-4 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={program.icon} className="text-white text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                        <FontAwesomeIcon icon={faClock} />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                        <FontAwesomeIcon icon={faChartLine} />
                        <span>{program.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.desc}</p>
                  <div className="space-y-3 mb-6">
                    {program.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faCheckCircle} className={`text-lg bg-gradient-to-br ${program.gradient} bg-clip-text text-transparent`} />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group/btn w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${program.gradient} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                  >
                    Enroll Now
                    <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
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
          className="relative bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="text-white text-4xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Ready to Upgrade Your Skills?</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">Join thousands of artisans and professionals transforming their careers</p>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-accent-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Apply for Training
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SkillDevelopment;
