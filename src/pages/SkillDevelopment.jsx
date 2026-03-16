import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SkillDevelopment = () => {
  const programs = [
    {
      title: "Handloom Weaving Training",
      icon: "🧵",
      duration: "3 Months",
      level: "Beginner to Advanced",
      desc: "Master traditional handloom techniques and modern weaving patterns",
      features: ["Traditional techniques", "Modern patterns", "Quality control", "Market linkage"]
    },
    {
      title: "Textile Design & CAD",
      icon: "🎨",
      duration: "6 Months",
      level: "Intermediate",
      desc: "Learn digital textile design using industry-standard software",
      features: ["CAD software", "Pattern making", "Color theory", "Portfolio building"]
    },
    {
      title: "Quality Control & Testing",
      icon: "🔬",
      duration: "2 Months",
      level: "Professional",
      desc: "Understand textile testing methods and quality standards",
      features: ["Lab testing", "Quality standards", "Certification", "Documentation"]
    },
    {
      title: "Entrepreneurship Development",
      icon: "💼",
      duration: "1 Month",
      level: "All Levels",
      desc: "Build your textile business with market insights and strategies",
      features: ["Business planning", "Marketing", "Finance", "Legal compliance"]
    },
    {
      title: "Natural Dyeing Techniques",
      icon: "🌿",
      duration: "1 Month",
      level: "Beginner",
      desc: "Explore eco-friendly natural dyeing methods and sustainability",
      features: ["Natural dyes", "Eco-friendly", "Color fastness", "Traditional methods"]
    },
    {
      title: "Garment Construction",
      icon: "✂️",
      duration: "4 Months",
      level: "Beginner to Advanced",
      desc: "Complete garment making from pattern to finished product",
      features: ["Pattern making", "Cutting", "Stitching", "Finishing"]
    }
  ];

  const benefits = [
    { icon: "📜", title: "Certification", desc: "Government recognized certificates" },
    { icon: "👨‍🏫", title: "Expert Trainers", desc: "Industry professionals as mentors" },
    { icon: "🏭", title: "Practical Training", desc: "Hands-on experience in workshops" },
    { icon: "💰", title: "Financial Support", desc: "Subsidized fees and scholarships" },
    { icon: "🤝", title: "Job Placement", desc: "Industry connections and placements" },
    { icon: "📚", title: "Study Material", desc: "Comprehensive learning resources" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Skill Development Programs
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Empowering artisans and professionals with industry-relevant skills for sustainable growth
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-900 mb-12">Why Choose Our Programs?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Programs Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-900 mb-12">Our Training Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
                  <div className="text-6xl mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                  <div className="flex gap-4 text-sm opacity-90">
                    <span>⏱️ {program.duration}</span>
                    <span>📊 {program.level}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{program.desc}</p>
                  <div className="space-y-2">
                    {program.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-primary-600">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                    Enroll Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Upgrade Your Skills?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of artisans and professionals transforming their careers</p>
          <button className="px-8 py-4 bg-white text-accent-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Apply for Training
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SkillDevelopment;
