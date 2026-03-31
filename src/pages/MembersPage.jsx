import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { faArrowRight, faGraduationCap, faNetworkWired, faChartBar, faBriefcase, faTrophy, faNewspaper, faUsers, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const MembersPage = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const [executiveMembers, setExecutiveMembers] = useState([]);
  const [content, setContent] = useState({
    page_eyebrow: 'Legacy Guardians',
    page_title: 'Our Members',
    page_subtitle: 'The rhythmic pulse behind India\'s textile transformation.',
    board_badge: 'BOARD OF DIRECTORS',
    board_heading: 'Leadership Team',
    exec_badge: 'EXECUTIVE TEAM',
    exec_heading: 'Department Heads'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: membersData } = await supabase
        .from('members')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
        
      if (membersData) {
        setBoardMembers(membersData.filter(m => m.category === 'board'));
        setExecutiveMembers(membersData.filter(m => m.category === 'executive'));
      }

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

  const membershipBenefits = [
    { icon: faNetworkWired, title: "Networking", desc: "Connect with industry leaders and peers", gradient: 'from-blue-500 to-blue-600' },
    { icon: faChartBar, title: "Market Insights", desc: "Access to exclusive research and reports", gradient: 'from-primary-500 to-primary-600' },
    { icon: faGraduationCap, title: "Training", desc: "Subsidized skill development courses", gradient: 'from-accent-500 to-accent-600' },
    { icon: faBriefcase, title: "Business Support", desc: "Mentorship and consultancy services", gradient: 'from-emerald-500 to-emerald-600' },
    { icon: faTrophy, title: "Recognition", desc: "Awards and certifications", gradient: 'from-amber-500 to-orange-600' },
    { icon: faNewspaper, title: "Pulse Updates", desc: "Policy changes and industry news", gradient: 'from-cyan-500 to-cyan-600' }
  ];

  return (
    <div className="min-h-screen bg-dark-950 selection:bg-primary-500/20 selection:text-white">
      <Navbar />
      <PageHero
        eyebrow={content.page_eyebrow}
        title={content.page_title}
        subtitle={content.page_subtitle}
      />

      <div className="relative overflow-hidden">
         {/* Global Grain Layers */}
         <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
         <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />

         <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-52 relative z-10">
            {/* ── Section 1: Editorial Leadership (Board) ── */}
            <div className="mb-52">
               <div className="border-b border-white/5 pb-24 mb-32 space-y-24">
                  <div className="space-y-12">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-8">BOARD OF DIRECTORS</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-none tracking-tighter uppercase">
                        Architects <span className="text-primary-500 italic">of Evolution</span>
                     </h2>
                  </div>
                  <div className="flex justify-end lg:pr-12">
                     <p className="text-white/30 text-xl lg:text-3xl font-medium leading-tight max-w-2xl italic text-right border-r-8 border-primary-500/20 pr-12">
                       "We don't just lead; we curate the intersection of <br className="hidden lg:block"/> heritage and high-tech textile innovation."
                     </p>
                  </div>
               </div>

               <div className="grid gap-40">
                  {boardMembers.map((member, idx) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20 lg:gap-32`}
                    >
                      {/* Portrait Block */}
                      <div className="w-full lg:w-1/2 aspect-[4/5] relative group">
                        <div className="absolute -inset-10 bg-primary-600/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative h-full rounded-[60px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white/5 bg-dark-900">
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60" />
                        </div>
                        {/* Asymmetrical Number */}
                        <span className="absolute -top-16 -left-16 text-[15rem] font-brodies font-black text-white/[0.02] select-none pointer-events-none group-hover:text-primary-500/5 transition-colors">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Content Block */}
                      <div className="w-full lg:w-1/2 space-y-12">
                         <div className="space-y-4">
                            <h3 className="font-brodies text-5xl lg:text-7xl text-white leading-none tracking-tighter">{member.name}</h3>
                            <div className="inline-flex items-center gap-4">
                               <div className="w-8 h-px bg-primary-500" />
                               <span className="text-primary-500 font-black text-[11px] uppercase tracking-[0.4em]">{member.designation}</span>
                            </div>
                         </div>
                         
                         <p className="text-white/40 text-xl font-medium leading-[1.6] italic">
                           {member.bio}
                         </p>

                         <div className="flex flex-wrap gap-3">
                            {(member.expertise || []).map((skill, i) => (
                              <div key={i} className="px-6 py-3 glass rounded-2xl text-[9px] font-black uppercase tracking-widest text-primary-500/60 border-white/5 group-hover:border-primary-500/20 transition-colors">
                                {skill}
                              </div>
                            ))}
                         </div>

                         <div className="pt-8">
                            <motion.button whileHover={{ x: 10 }} className="flex items-center gap-4 text-white font-black text-[11px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
                               View Full Profile
                               <FontAwesomeIcon icon={faArrowRight} />
                            </motion.button>
                         </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* ── Section 2: Operational Bento (Exec) ── */}
            <div className="mb-52 relative">
               <div className="text-center mb-32 space-y-8">
                  <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em]">{content.exec_badge}</span>
                  <h2 className="font-brodies text-6xl lg:text-8xl text-white tracking-tighter leading-none">The Pure <span className="text-primary-500 italic">Engine</span></h2>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {executiveMembers.map((member, idx) => {
                    const iconObj = solidIcons[member.icon] || solidIcons.faUserTie;
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className={`group relative glass rounded-[48px] p-12 border-white/5 h-[400px] flex flex-col transition-all duration-500 ${idx % 2 === 1 ? 'lg:mt-12' : ''}`}
                      >
                         <div className={`w-20 h-20 mb-auto bg-gradient-to-br ${member.gradient || 'from-dark-800 to-dark-900'} rounded-[32px] flex items-center justify-center text-white text-3xl shadow-inner group-hover:rotate-12 transition-transform duration-500 relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <FontAwesomeIcon icon={iconObj} className="relative z-10" />
                          </div>

                         <div className="space-y-4">
                            <h3 className="font-brodies text-4xl text-white leading-tight">{member.name}</h3>
                            <p className="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">{member.designation}</p>
                         </div>
                         
                         <div className="pt-10 flex items-center justify-between border-t border-white/5 mt-10">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Operational Sector</span>
                            <FontAwesomeIcon icon={faArrowRight} className="text-white/10 group-hover:text-primary-500 transition-colors" />
                         </div>
                      </motion.div>
                    );
                  })}
               </div>
            </div>

            {/* ── Section 3: High-End Advantages (Bento) ── */}
            <div className="mb-52 relative">
               <div className="text-center mb-32 space-y-8">
                  <h2 className="font-brodies text-6xl lg:text-8xl text-white tracking-tighter leading-none opacity-20">The Advantages</h2>
               </div>

               <div className="grid md:grid-cols-6 lg:grid-rows-3 gap-8">
                  {membershipBenefits.map((benefit, idx) => {
                    const gridConfigs = [
                      'lg:col-span-3 lg:row-span-1', // Networking
                      'lg:col-span-3 lg:row-span-1', // Insights
                      'lg:col-span-2 lg:row-span-1', // Training
                      'lg:col-span-2 lg:row-span-1', // Support
                      'lg:col-span-2 lg:row-span-1', // Recognition
                      'lg:col-span-6 lg:row-span-1', // Updates
                    ];
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className={`group relative glass rounded-[48px] p-10 border-white/5 flex flex-col justify-end transition-all duration-700 ${gridConfigs[idx]}`}
                      >
                         <div className={`absolute top-0 right-0 w-60 h-60 bg-gradient-to-br ${benefit.gradient} opacity-5 group-hover:opacity-20 blur-[80px] transition-opacity`} />
                         
                         <div className="relative z-10">
                            <div className={`w-14 h-14 mb-6 bg-gradient-to-br ${benefit.gradient} rounded-[20px] flex items-center justify-center text-white text-xl shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                               <FontAwesomeIcon icon={benefit.icon} />
                            </div>
                            <h3 className="font-brodies text-3xl text-white mb-4">{benefit.title}</h3>
                            <p className="text-white/30 text-lg font-medium leading-relaxed max-w-sm">{benefit.desc}</p>
                         </div>
                      </motion.div>
                    );
                  })}
               </div>
            </div>

            {/* ── Section 4: The Collective Threshold ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[80px] overflow-hidden group/cta"
            >
               <div className="absolute inset-0 bg-dark-900">
                  <div className="absolute inset-0 noise-overlay opacity-30" />
                  <div className="absolute inset-0 grain-overlay opacity-20" />
                  <div className="absolute inset-0 bg-primary-600/5 transition-colors group-hover/cta:bg-primary-600/10 duration-1000" />
               </div>

               <div className="relative z-10 px-12 lg:px-32 py-32 lg:py-48 flex flex-col items-center text-center space-y-20">
                  <div className="space-y-12">
                     <span className="text-primary-500 font-black text-[11px] uppercase tracking-[0.6em] block mb-6">The Resonance Threshold</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-[0.75] tracking-tighter">
                        Define <br /> the <br /> <span className="text-primary-500 italic">Pulse</span>
                     </h2>
                     <p className="text-white/30 text-2xl lg:text-4xl font-medium max-w-3xl mx-auto leading-tight italic">
                        Step into a circle of excellence where heritage catalyze transformation.
                     </p>
                  </div>

                  <Link to="/membership" className="inline-block relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-20 py-8 bg-white rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(255,255,255,0.1)] transition-transform hover:scale-105 active:scale-95"
                    >
                       <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                       <span className="relative z-10 font-sans font-black text-[13px] uppercase tracking-[0.5em] text-dark-950 hover:text-white transition-colors">Apply to Join</span>
                    </motion.div>
                  </Link>
                  
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] pt-8">
                     Direct Transmission Protocol Active
                  </p>
               </div>
            </motion.div>
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default MembersPage;
