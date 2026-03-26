import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { faUserTie, faNetworkWired, faChartBar, faBriefcase, faTrophy, faNewspaper, faArrowRight, faGraduationCap, faUsers } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const MembersPage = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const [executiveMembers, setExecutiveMembers] = useState([]);
  const [content, setContent] = useState({
    page_eyebrow: 'Our Leadership',
    page_title: 'Our Members',
    page_subtitle: 'Meet the dedicated team driving India\'s textile sector forward',
    board_badge: 'BOARD OF DIRECTORS',
    board_heading: 'Leadership Team',
    exec_badge: 'EXECUTIVE TEAM',
    exec_heading: 'Department Heads'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch members
      const { data: membersData } = await supabase
        .from('members')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
        
      if (membersData) {
        setBoardMembers(membersData.filter(m => m.category === 'board'));
        setExecutiveMembers(membersData.filter(m => m.category === 'executive'));
      }

      // Fetch site content
      const { data: contentData } = await supabase
        .from('site_content')
        .select('key, value')
        .eq('section', 'members');
        
      if (contentData) {
        const contentMap = {};
        contentData.forEach(item => { contentMap[item.key] = item.value; });
        setContent(prev => ({ ...prev, ...contentMap }));
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  // The static membershipBenefits array remains here since it wasn't requested to be dynamic, but can be moved later if needed.

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
        eyebrow={content.page_eyebrow}
        title={content.page_title}
        subtitle={content.page_subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Board of Directors */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-bold tracking-wider shadow-lg">
              {content.board_badge}
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">{content.board_heading}</h2>
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
                  <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-accent-300 font-semibold">{member.designation}</p>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faUserTie} className="text-white text-xl" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="space-y-2">
                    {(member.expertise || []).map((skill, i) => (
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
              {content.exec_badge}
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900">{content.exec_heading}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executiveMembers.map((member, idx) => {
              // Safety fallback for icon resolution since string is stored in DB
              const iconObj = solidIcons[member.icon] || solidIcons.faUserTie;
              
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient || 'from-gray-500 to-gray-600'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="relative">
                  <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${member.gradient || 'from-gray-500 to-gray-600'} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <FontAwesomeIcon icon={iconObj} className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 font-medium">{member.designation}</p>
                </div>
              </motion.div>
              );
            })}
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
