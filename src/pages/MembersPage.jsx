import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MembersPage = () => {
  const boardMembers = [
    {
      name: "Dr. Rajesh Kumar",
      position: "Chairperson",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      bio: "30+ years in textile industry, Former Director of National Institute of Fashion Technology",
      expertise: ["Policy Making", "Industry Relations", "Strategic Planning"]
    },
    {
      name: "Mrs. Priya Sharma",
      position: "Vice Chairperson",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      bio: "Renowned textile designer and entrepreneur with international recognition",
      expertise: ["Design Innovation", "Export Management", "Brand Development"]
    },
    {
      name: "Mr. Anil Verma",
      position: "Secretary",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Legal expert specializing in textile trade and compliance",
      expertise: ["Legal Affairs", "Compliance", "Documentation"]
    },
    {
      name: "Ms. Kavita Reddy",
      position: "Treasurer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      bio: "Chartered Accountant with expertise in textile sector finance",
      expertise: ["Financial Planning", "Audit", "Fund Management"]
    }
  ];

  const executiveMembers = [
    { name: "Mr. Suresh Patel", role: "Handloom Development Head", icon: "🧵" },
    { name: "Dr. Meena Singh", role: "Research & Innovation Lead", icon: "🔬" },
    { name: "Mr. Vikram Joshi", role: "Skill Development Coordinator", icon: "📚" },
    { name: "Ms. Anjali Desai", role: "Marketing & Communications", icon: "📢" },
    { name: "Mr. Ramesh Gupta", role: "Industry Liaison Officer", icon: "🤝" },
    { name: "Ms. Deepa Nair", role: "Sustainability Advisor", icon: "🌿" }
  ];

  const membershipBenefits = [
    { icon: "🎯", title: "Networking", desc: "Connect with industry leaders and peers" },
    { icon: "📊", title: "Market Insights", desc: "Access to exclusive research and reports" },
    { icon: "🎓", title: "Training Programs", desc: "Subsidized skill development courses" },
    { icon: "💼", title: "Business Support", desc: "Mentorship and consultancy services" },
    { icon: "🏆", title: "Recognition", desc: "Awards and certifications" },
    { icon: "📰", title: "Updates", desc: "Policy changes and industry news" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-accent-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-300 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Our Members
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Meet the dedicated team driving India's textile sector forward
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Board of Directors */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-900 mb-12">Board of Directors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.position}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="space-y-1">
                    {member.expertise.map((skill, i) => (
                      <div key={i} className="text-xs text-primary-600 font-medium">• {skill}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive Team */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-900 mb-12">Executive Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executiveMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-white to-primary-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{member.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-primary-600 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Membership Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-900 mb-12">Membership Benefits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {membershipBenefits.map((benefit, idx) => (
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
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-accent-600 to-primary-600 rounded-2xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8 opacity-90">Become a member and be part of India's textile transformation</p>
          <button className="px-8 py-4 bg-white text-primary-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Apply for Membership
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default MembersPage;
