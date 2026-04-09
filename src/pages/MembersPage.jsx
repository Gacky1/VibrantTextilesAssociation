import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { 
  faArrowRight, faGraduationCap, faNetworkWired, 
  faChartBar, faBriefcase, faTrophy, faNewspaper, 
  faUsers, faArrowLeft, faUserTie 
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const MembersPage = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const [executiveMembers, setExecutiveMembers] = useState([]);
  const [content, setContent] = useState({
    page_eyebrow: 'Leadership & Vision',
    page_title: 'The Council',
    page_subtitle: 'The strategic architects and department heads driving India\'s textile transformation.',
    board_badge: 'BOARD OF DIRECTORS',
    exec_badge: 'EXECUTIVE TEAM'
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
    { icon: faNetworkWired, title: "Elite Networking", desc: "Connect with the titans of the textile industry across all 29 states." },
    { icon: faChartBar, title: "Market Intelligence", desc: "Access to exclusive economic reports and industrial trend analysis." },
    { icon: faGraduationCap, title: "Skill Evolution", desc: "Subsidized high-end training programs for you and your workforce." },
    { icon: faBriefcase, title: "Strategic Mentorship", desc: "One-on-one consultancy with veterans of the textile export world." },
    { icon: faTrophy, title: "Global Recognition", desc: "Industry-standard certifications and national heritage awards." },
    { icon: faNewspaper, title: "Policy Advocacy", desc: "Priority updates on government schemes and industrial policy changes." }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      
      <PageHero
        eyebrow={content.page_eyebrow}
        title={content.page_title}
        subtitle={content.page_subtitle}
      />

      {/* ── Section 1: Board of Directors ── */}
      <div className="section-container py-32 space-y-24">
        <div className="space-y-4 max-w-3xl">
          <div className="badge">{content.board_badge}</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
            The Governing <span className="text-primary-600">Council</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed italic">
            "We aren't just leaders; we are custodians of a 5,000-year legacy, bridging it with modern economic titans."
          </p>
        </div>

        <div className="grid gap-24">
          {boardMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}
            >
              {/* Image Block */}
              <div className="w-full md:w-1/2 aspect-[4/5] relative rounded-[40px] overflow-hidden bg-gray-100 shadow-xl group">
                <img 
                  src={member.image_url} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
              </div>

              {/* Content Block */}
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-2">
                  <p className="text-primary-600 font-black text-[10px] uppercase tracking-widest">{member.designation}</p>
                  <h3 className="text-4xl lg:text-5xl font-black tracking-tight text-gray-900">{member.name}</h3>
                </div>
                
                <p className="text-gray-500 text-xl leading-relaxed italic">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                  {(member.expertise || []).map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-8">
                  <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary-600 hover:gap-5 transition-all">
                    View Strategic Vision <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Section 2: Executive Team ── */}
      <div className="bg-gray-50 py-32">
        <div className="section-container space-y-16">
          <div className="text-center space-y-4">
            <div className="badge">{content.exec_badge}</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Departmental Leads</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveMembers.map((member) => {
              const IconComp = solidIcons[member.icon] || faUserTie;
              return (
                <div key={member.id} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="w-16 h-16 mb-8 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 text-2xl group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <FontAwesomeIcon icon={IconComp} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-primary-600 font-black text-[10px] uppercase tracking-widest">{member.designation}</p>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Section 3: Benefits ── */}
      <div className="section-container py-32 space-y-16">
        <div className="text-center space-y-4">
          <div className="badge">The Collective Advantage</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">VTA Membership Perks</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {membershipBenefits.map((benefit, idx) => (
            <div key={idx} className="p-10 border border-gray-100 rounded-[40px] hover:bg-gray-50 transition-colors space-y-6 group">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary-600 transition-colors">
                <FontAwesomeIcon icon={benefit.icon} size="lg" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 4: Join CTA ── */}
      <div className="section-container pb-32">
        <div className="bg-gray-900 rounded-[48px] px-8 md:px-24 py-24 text-center space-y-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Ready to <span className="text-primary-600 italic">Catalyze</span> transformation?
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto italic">
              Step into a circle of excellence where heritage and high-tech innovation converge to define the future of fabrics.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <Link to="/membership">
              <button className="btn-primary py-6 px-12 text-base">
                Apply for Membership
                <FontAwesomeIcon icon={faArrowRight} className="ml-4" />
              </button>
            </Link>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
              Vibrant Textiles Association Registry Active
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MembersPage;
