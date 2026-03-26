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
        {/* Cinematic Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-50/40 rounded-full blur-[160px] pointer-events-none opacity-50" />
        <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-accent-50/20 rounded-full blur-[140px] pointer-events-none opacity-50" />

        {/* ── Section 1: Cinematic Leadership Showcase (Board) ── */}
        <div className="mb-40 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20">
            <div className="max-w-2xl space-y-6">
              <span className="text-primary-600 font-black text-[12px] uppercase tracking-[0.5em] flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary-600" />
                {content.board_badge}
              </span>
              <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-gray-900 leading-[1.1] font-black">
                Architects of <br />
                <span className="text-gradient italic font-medium">Textile Evolution</span>
              </h2>
            </div>
            <p className="text-gray-500 text-xl max-w-md font-medium leading-relaxed italic border-l-2 border-primary-100 pl-8">
              "We don't just lead; we curate the intersection of heritage and high-tech textile innovation."
            </p>
          </div>

          <div className="space-y-32">
            {boardMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24`}
              >
                {/* Large Scale Portrait */}
                <div className="w-full md:w-1/2 aspect-[4/5] relative group">
                  <div className="absolute -inset-4 bg-primary-100/30 rounded-[60px] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                  <div className="relative h-full rounded-[48px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.12)]">
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                  </div>
                  {/* Floating Number */}
                  <span className="absolute -top-10 -left-10 text-[12rem] font-serif font-black text-gray-900/5 select-none pointer-events-none">
                    0{idx + 1}
                  </span>
                </div>

                {/* Overlapping Content Block */}
                <div className="w-full md:w-1/2 space-y-10">
                   <div className="space-y-4">
                      <h3 className="font-serif text-5xl md:text-6xl font-black text-gray-900 tracking-tight">{member.name}</h3>
                      <p className="text-primary-600 font-black text-sm uppercase tracking-[0.3em]">{member.designation}</p>
                   </div>
                   
                   <div className="relative">
                      <div className="absolute top-0 left-0 w-12 h-1 bg-primary-600 rounded-full" />
                      <p className="pt-8 text-gray-500 text-xl font-medium leading-[1.7]">
                        {member.bio}
                      </p>
                   </div>

                   <div className="flex flex-wrap gap-4">
                      {(member.expertise || []).map((skill, i) => (
                        <div key={i} className="px-6 py-3 glass-ultra border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-600 shadow-sm">
                          {skill}
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Section 2: Staggered Architectural Grid (Exec) ── */}
        <div className="mb-40 relative z-10">
          <div className="text-center mb-20 space-y-6">
            <span className="inline-block px-5 py-2 glass-ultra border border-accent-100 rounded-full text-accent-600 text-[10px] font-black uppercase tracking-[0.4em]">
              The Core Engine
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-gray-900 font-black leading-tight">
              Operational <span className="text-gradient italic font-medium">Excellence</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {executiveMembers.map((member, idx) => {
              const iconObj = solidIcons[member.icon] || solidIcons.faUserTie;
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group relative ${idx % 2 === 0 ? 'mt-0' : 'md:mt-12'}`}
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="relative glass-ultra rounded-[40px] p-10 border border-white/60 shadow-[0_30px_70px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                    
                    <div className={`w-20 h-20 mb-8 bg-gradient-to-br ${member.gradient || 'from-gray-700 to-gray-900'} rounded-[24px] flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500 relative overflow-hidden`}>
                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <FontAwesomeIcon icon={iconObj} className="text-white text-3xl relative z-10" />
                    </div>

                    <h3 className="text-2xl font-serif font-black text-gray-900 mb-2 tracking-tight">{member.name}</h3>
                    <p className="text-primary-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">{member.designation}</p>
                    
                    <div className="h-px w-full bg-gray-100 mb-8 group-hover:bg-primary-100 transition-colors" />
                    
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Direction</span>
                       <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                       </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Section 3: Bento-Style Benefits ── */}
        <div className="mb-40 relative z-10">
          <div className="text-center mb-24 space-y-6">
            <h2 className="font-serif text-5xl md:text-7xl text-gray-900 font-black leading-tight">
              Unrivaled <span className="text-gradient italic font-medium">Advantages</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium tracking-tight">Access the most powerful textile ecosystem in the world.</p>
          </div>

          <div className="grid md:grid-cols-6 md:grid-rows-2 gap-8 h-auto md:h-[800px]">
            {membershipBenefits.map((benefit, idx) => {
              // Bento layout logic
              const gridConfig = [
                'md:col-span-3 md:row-span-1', // Networking
                'md:col-span-3 md:row-span-1', // Insights
                'md:col-span-2 md:row-span-1', // Training
                'md:col-span-2 md:row-span-1', // Support
                'md:col-span-2 md:row-span-1', // Recognition
                'md:col-span-6 md:row-span-1', // Updates (Full Width)
              ];

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 0.98 }}
                  className={`group relative glass-ultra rounded-[40px] p-10 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-end ${gridConfig[idx]}`}
                >
                  <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                  <div className={`absolute -inset-10 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-1000`} />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 mb-8 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500`}>
                      <FontAwesomeIcon icon={benefit.icon} className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-serif font-black text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">{benefit.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Section 4: Cinematic Network Invite (CTA) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[60px] p-20 md:p-32 text-center overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.25)]"
        >
          {/* Enhanced Mesh Background */}
          <div className="absolute inset-0 bg-[#050508]">
            <div className="absolute inset-0 bg-mesh-gradient animate-mesh-slow opacity-50" />
            <div className="absolute inset-0 noise-overlay opacity-[0.08]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/40" />
            {/* Focal Point Light Beam */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-primary-400/50 via-primary-400/5 to-transparent shadow-[0_0_80px_rgba(59,130,246,0.3)]" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-16">
            <div className="space-y-6">
              <span className="text-primary-400 font-black text-[11px] uppercase tracking-[0.6em]">Threshold of Innovation</span>
              <h2 className="font-serif text-[clamp(2.5rem,8vw,6rem)] text-white leading-tight font-black">
                Define the <span className="text-gradient italic font-medium">Future</span>
              </h2>
              <p className="text-white/40 text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
                Step into a circle of excellence where every connection catalyzes extraordinary textile transformation.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <Link to="/membership">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-6 px-16 py-8 bg-white rounded-[24px] overflow-hidden shadow-[0_30px_70px_rgba(255,255,255,0.15)]"
                >
                  <div className="absolute inset-0 bg-primary-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative font-black text-primary-900 text-lg uppercase tracking-widest italic">Apply Now</span>
                  <FontAwesomeIcon icon={faArrowRight} className="relative text-primary-600 transition-transform group-hover:translate-x-3 text-xl" />
                </motion.button>
              </Link>

              <div className="flex flex-col items-start text-left">
                 <div className="flex -space-x-3 mb-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-[#050508] bg-gray-800 overflow-hidden shadow-2xl">
                        <img src={`https://i.pravatar.cc/150?u=${i+42}`} alt="Leader" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-[#050508] bg-primary-600 flex items-center justify-center text-[10px] font-black text-white shadow-2xl">
                      +2K
                    </div>
                 </div>
                 <p className="text-white/30 text-[10px] uppercase font-black tracking-widest">Global Textile Leaders</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default MembersPage;
