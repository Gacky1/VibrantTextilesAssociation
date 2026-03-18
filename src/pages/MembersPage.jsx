import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faNetworkWired, faChartBar, faGraduationCap, faBriefcase, faTrophy, faNewspaper, faHandshake, faLeaf, faBullhorn, faFlask, faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

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
    { name: "Mr. Suresh Patel", role: "Handloom Development Head", icon: faHandshake, gradient: 'from-purple-500 to-purple-600' },
    { name: "Dr. Meena Singh", role: "Research & Innovation Lead", icon: faFlask, gradient: 'from-blue-500 to-blue-600' },
    { name: "Mr. Vikram Joshi", role: "Skill Development Coordinator", icon: faGraduationCap, gradient: 'from-green-500 to-green-600' },
    { name: "Ms. Anjali Desai", role: "Marketing & Communications", icon: faBullhorn, gradient: 'from-pink-500 to-pink-600' },
    { name: "Mr. Ramesh Gupta", role: "Industry Liaison Officer", icon: faUsers, gradient: 'from-cyan-500 to-cyan-600' },
    { name: "Ms. Deepa Nair", role: "Sustainability Advisor", icon: faLeaf, gradient: 'from-emerald-500 to-emerald-600' }
  ];

  const membershipBenefits = [
    { icon: faNetworkWired, title: "Networking", desc: "Connect with industry leaders and peers", gradient: 'from-blue-500 to-blue-600' },
    { icon: faChartBar, title: "Market Insights", desc: "Access to exclusive research and reports", gradient: 'from-purple-500 to-purple-600' },
    { icon: faGraduationCap, title: "Training Programs", desc: "Subsidized skill development courses", gradient: 'from-green-500 to-green-600' },
    { icon: faBriefcase, title: "Business Support", desc: "Mentorship and consultancy services", gradient: 'from-primary-500 to-primary-600' },
    { icon: faTrophy, title: "Recognition", desc: "Awards and certifications", gradient: 'from-accent-500 to-accent-600' },
    { icon: faNewspaper, title: "Updates", desc: "Policy changes and industry news", gradient: 'from-cyan-500 to-cyan-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Our Leadership"
        title="Our Members"
        subtitle="Meet the dedicated team driving India's textile sector forward"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Board of Directors */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              BOARD OF DIRECTORS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Leadership Team</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="relative h-80 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-accent-300 font-semibold">{member.position}</p>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faUserTie} className="text-white text-xl" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="space-y-2">
                    {member.expertise.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        <span className="text-xs text-gray-700 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              EXECUTIVE TEAM
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Department Heads</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executiveMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="relative">
                  <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${member.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <FontAwesomeIcon icon={member.icon} className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Membership Benefits */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              MEMBER BENEFITS
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Why Join Us?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membershipBenefits.map((benefit, idx) => (
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full blur-3xl opacity-20"></div>
          </div>
          
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-white text-4xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">Become a member and be part of India's textile transformation</p>
            <Link to="/membership">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Apply for Membership
                <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default MembersPage;
