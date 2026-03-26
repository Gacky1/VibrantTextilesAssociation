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

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-24 relative overflow-hidden">
        {/* Ambient Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-40 left-0 w-72 h-72 bg-accent-100/20 rounded-full blur-[80px] pointer-events-none" />

        {/* Board of Directors: Executive Profile Grid */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em] inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" />
              {content.board_badge}
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              Visionary <span className="text-gradient italic font-medium">Leadership</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
              Architecting the future of Indian textiles through strategic excellence and deep heritage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                className="group relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500/10 to-accent-400/10 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative glass-ultra rounded-[32px] border border-white/60 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.06)] h-full flex flex-col">
                  <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                  
                  {/* Image Container with Editorial Treatment */}
                  <div className="relative h-[340px] overflow-hidden">
                    <img 
                      src={member.image_url} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/90 via-[#050508]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    {/* Floating Profile Badge */}
                    <div className="absolute top-6 right-6 w-12 h-12 glass-premium rounded-xl flex items-center justify-center border border-white/20 shadow-xl group-hover:rotate-6 transition-transform duration-500">
                      <FontAwesomeIcon icon={faUserTie} className="text-white text-xl" />
                    </div>

                    <div className="absolute bottom-6 left-8 right-8 text-white">
                      <h3 className="font-serif text-2xl font-black mb-1 leading-tight">{member.name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary-400">{member.designation}</p>
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">{member.bio}</p>
                    
                    <div className="mt-auto pt-6 border-t border-gray-100/50 flex flex-wrap gap-2">
                      {(member.expertise || []).map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-primary-50 text-primary-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-primary-100/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Executive Team: Refined Grid */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-accent-500 font-black text-[11px] uppercase tracking-[0.4em] inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
              {content.exec_badge}
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-gray-900 leading-tight font-black">
              Department <span className="text-gradient italic font-medium">Excellence</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executiveMembers.map((member, idx) => {
              const iconObj = solidIcons[member.icon] || solidIcons.faUserTie;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8, boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}
                  className="group relative bg-white/40 rounded-2xl p-8 border border-white/60 backdrop-blur-sm flex items-center gap-6 cursor-pointer"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${member.gradient || 'from-gray-500 to-gray-600'} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all duration-500 flex-shrink-0`}>
                    <FontAwesomeIcon icon={iconObj} className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-0.5">{member.name}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{member.designation}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Membership Benefits: Interactive Glass Grid */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-primary-600 font-black text-[11px] uppercase tracking-[0.4em]">Member Ecosystem</span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-gray-900 leading-tight font-black">
              The VTA <span className="text-gradient italic font-medium">Advantage</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membershipBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -15 }}
                className="group relative"
              >
                <div className={`absolute -inset-4 bg-gradient-to-br ${benefit.gradient} rounded-[40px] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                
                <div className="relative glass-ultra rounded-[32px] border border-white/60 p-10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.06)] h-full flex flex-col items-center text-center">
                  <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                  
                  <div className={`w-16 h-16 mb-8 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <FontAwesomeIcon icon={benefit.icon} className="text-white text-2xl" />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-black text-gray-900 mb-4">{benefit.title}</h3>
                  <div className="h-0.5 w-10 bg-gray-100 group-hover:w-20 transition-all duration-500 mb-6" />
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section: High-Impact Network Invite */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] p-16 md:p-24 text-center overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
        >
          {/* Animated Mesh Background */}
          <div className="absolute inset-0 bg-[#050508]">
            <div className="absolute inset-0 bg-mesh-gradient animate-mesh-slow opacity-40" />
            <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
          </div>
          
          <div className="relative z-10 space-y-10">
            <div className="w-24 h-24 mx-auto glass-premium rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl group cursor-pointer hover:rotate-6 transition-transform duration-500">
              <FontAwesomeIcon icon={faUsers} className="text-white text-4xl" />
            </div>
            
            <div className="space-y-6">
              <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-white leading-tight font-black">
                Join our <span className="text-gradient italic font-medium">Community</span>
              </h2>
              <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Become a catalyst for change. Join 2,000+ industry leaders architecting India's textile transformation.
              </p>
            </div>

            <div className="pt-8">
              <Link to="/membership">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all"
                >
                  <div className="absolute inset-0 bg-primary-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative font-black text-primary-700 text-lg uppercase tracking-widest">Apply for Membership</span>
                  <FontAwesomeIcon icon={faArrowRight} className="relative text-primary-600 transition-transform group-hover:translate-x-2" />
                </motion.button>
              </Link>
            </div>
            
            <div className="pt-10 flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-white/10" />
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Vibrant Textiles Association</span>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default MembersPage;
