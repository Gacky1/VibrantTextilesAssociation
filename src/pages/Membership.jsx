import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding, faEnvelope, faPhone, faUser, faMapMarkerAlt,
  faCheckCircle, faArrowRight, faArrowLeft, faXmark, faPaperPlane,
  faBriefcase, faGlobe, faUsers, faShieldHalved, faGraduationCap,
  faAward, faUniversity, faIndustry, faHandshake, faGavel, 
  faClipboardList, faHeart, faUsersGear, faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ─── Premium UI Constants ─── */
const inp = 'w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all duration-300 backdrop-blur-xl';
const sel = `${inp} appearance-none cursor-pointer`;

const categories = [
  {
    id: 'government',
    name: 'Policy Bodies',
    icon: faBuildingColumns,
    tagline: 'Departments, policy makers & regulatory bodies',
    gradient: 'from-blue-500 to-indigo-600',
    accent: 'blue',
    members: [
      { name: 'Ministry of Textiles', icon: faGavel, type: 'Government' },
      { name: 'Textile Commissioner Office', icon: faClipboardList, type: 'Regulatory' },
      { name: 'National Handloom Board', icon: faUniversity, type: 'Board' },
    ],
  },
  {
    id: 'industry',
    name: 'Corporate Partners',
    icon: faIndustry,
    tagline: 'Manufacturers, exporters & corporates',
    gradient: 'from-primary-500 to-primary-700',
    accent: 'primary',
    members: [
      { name: 'Textile Mills Association', icon: faUsersGear, type: 'Association' },
      { name: 'Export Promotion Council', icon: faGlobe, type: 'Council' },
      { name: 'Fabric Manufacturers Ltd', icon: faBuilding, type: 'Corporate' },
    ],
  },
  {
    id: 'support',
    name: 'Support Orgs',
    icon: faHandshake,
    tagline: 'NGOs, training institutes & support bodies',
    gradient: 'from-amber-500 to-orange-600',
    accent: 'amber',
    members: [
      { name: 'Artisan Welfare Society', icon: faHeart, type: 'NGO' },
      { name: 'Textile Training Institute', icon: faGraduationCap, type: 'Education' },
      { name: 'Handloom Development Corp', icon: faAward, type: 'Support' },
    ],
  },
];

const benefits = [
  {
    title: 'Global Network',
    desc: 'Connect with over 500+ industry leaders, policy makers, and international trade bodies.',
    icon: faUsers,
    color: 'from-blue-500/20 to-blue-600/20'
  },
  {
    title: 'Policy Advocacy',
    desc: 'Get your voice heard at the highest levels of government and shape industry policies.',
    icon: faShieldHalved,
    color: 'from-primary-500/20 to-primary-600/20'
  },
  {
    title: 'Skill Dev',
    desc: 'Exclusive access to state-of-the-art training programs and technical workshops.',
    icon: faGraduationCap,
    color: 'from-accent-500/20 to-accent-600/20'
  },
  {
    title: 'Market Linkage',
    desc: 'Direct access to global trade fairs, B2B meets, and international market opportunities.',
    icon: faGlobe,
    color: 'from-emerald-500/20 to-emerald-600/20'
  }
];

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
];

const Label = ({ icon, children }) => (
  <label className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">
    <FontAwesomeIcon icon={icon} className="text-primary-500" />
    {children}
  </label>
);

const GovernmentForm = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid gap-8">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Label icon={faBuilding}>Organization Name *</Label>
        <input type="text" name="org_name" required placeholder="Ministry of Textiles" className={inp} />
      </div>
      <div>
        <Label icon={faGlobe}>State *</Label>
        <select name="state" required className={sel}>
          <option value="">Select State</option>
          {indianStates.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
    </div>
    <div>
      <Label icon={faMapMarkerAlt}>Organization Address *</Label>
      <textarea name="org_address" required rows="3" placeholder="Full address including city and PIN code" className={`${inp} resize-none`} />
    </div>
    <div className="h-px bg-white/5 my-4" />
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Label icon={faUser}>Decision Maker Name *</Label>
        <input type="text" name="decision_maker" required placeholder="Full Name" className={inp} />
      </div>
      <div>
        <Label icon={faBriefcase}>Designation</Label>
        <input type="text" name="designation" placeholder="e.g. Secretary" className={inp} />
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Label icon={faPhone}>Contact Number *</Label>
        <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className={inp} />
      </div>
      <div>
        <Label icon={faEnvelope}>Email Address *</Label>
        <input type="email" name="email" required placeholder="official@gov.in" className={inp} />
      </div>
    </div>
  </motion.div>
);

const IndustryForm = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid gap-8">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Label icon={faBuilding}>Company Name *</Label>
        <input type="text" name="org_name" required placeholder="Your Textile Company" className={inp} />
      </div>
      <div>
        <Label icon={faBriefcase}>Sub-Sector *</Label>
        <select name="org_type" required className={sel}>
          <option value="">Select Sub-Sector</option>
          <option>Handloom & Traditional</option>
          <option>Powerloom & Mechanized</option>
          <option>Apparel & Garments</option>
          <option>Technical Textiles</option>
          <option>Yarn & Fiber</option>
        </select>
      </div>
    </div>
    <div>
      <Label icon={faGlobe}>Partnering Interest *</Label>
      <select name="partnering_interest" required className={sel}>
        <option value="">Select Area of Interest</option>
        <option>Skill Development</option>
        <option>Market Linkage</option>
        <option>Technology Transfer</option>
        <option>Export Promotion</option>
      </select>
    </div>
    <div className="h-px bg-white/5 my-4" />
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Label icon={faUser}>Decision Maker Name *</Label>
        <input type="text" name="decision_maker" required placeholder="Full Name" className={inp} />
      </div>
      <div>
        <Label icon={faPhone}>Contact Number *</Label>
        <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className={inp} />
      </div>
    </div>
    <div>
      <Label icon={faEnvelope}>Email Address *</Label>
      <input type="email" name="email" required placeholder="business@company.com" className={inp} />
    </div>
  </motion.div>
);

const SupportForm = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid gap-8">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Label icon={faBriefcase}>Organization Type *</Label>
        <select name="org_type" required className={sel}>
          <option value="">Select Type</option>
          <option>NGO</option>
          <option>Training Institute</option>
          <option>Research Org</option>
          <option>Cooperative</option>
        </select>
      </div>
      <div>
        <Label icon={faBuilding}>Organization Name *</Label>
        <input type="text" name="org_name" required placeholder="Full Name" className={inp} />
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Label icon={faPhone}>Contact Number *</Label>
        <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className={inp} />
      </div>
      <div>
        <Label icon={faEnvelope}>Email Address *</Label>
        <input type="email" name="email" required placeholder="contact@org.org" className={inp} />
      </div>
    </div>
  </motion.div>
);

const formMap = { government: GovernmentForm, industry: IndustryForm, support: SupportForm };

const Membership = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const activeCat = categories.find(c => c.id === selectedCategory);
  const FormComponent = selectedCategory ? formMap[selectedCategory] : null;

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = new FormData(e.target);
    const data = Object.fromEntries(formValues.entries());
    const payload = { ...data, category: selectedCategory };

    try {
      const { error } = await supabase.from('membership_applications').insert([payload]);
      if (error) throw error;
      setShowSuccess(true);
      setSelectedCategory(null);
      setTimeout(() => setShowSuccess(false), 5000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 selection:bg-primary-500/20 selection:text-white">
      <Navbar />

      {/* ── HIGH-IMPACT HERO ── */}
      <section className="relative pt-44 lg:pt-60 pb-32 lg:pb-52 overflow-hidden bg-dark-900">
        <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
        <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />
        
        {/* Floating Light Blobs */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-600/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.6em' }}
              className="text-primary-500 font-black text-[10px] uppercase tracking-[0.6em]"
            >
              The Legacy Enrollment
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-brodies text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.8] text-white tracking-tighter"
            >
              Join the <span className="text-primary-500 italic">Vibrant</span> Collective
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-lg lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium italic"
            >
              Connect with India's most influential textile visionary network. Empowering civilization through rhythmic innovation since 1998.
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="flex flex-wrap items-center justify-center gap-12"
            >
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-14 h-14 rounded-full border-[3px] border-dark-900 bg-dark-700 overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all cursor-pointer">
                      <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="Leader" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-start leading-none gap-2">
                   <span className="text-white font-brodies text-4xl">2,400+</span>
                   <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Industry Visionaries</span>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN SECTION ── */}
      <section className="relative py-32 lg:py-52 bg-dark-950 overflow-hidden">
        <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
             <div className="space-y-10">
                <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">Network Genesis</span>
                <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-[0.9]">Why the Collective?</h2>
                <p className="text-white/40 text-xl font-medium leading-relaxed">We provide more than collaboration. We provide the resonance required to bridge legacy with the pulse of modern industry.</p>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {benefits.map((b, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -10, rotate: idx % 2 === 0 ? 2 : -2 }}
                    className={`glass rounded-[40px] p-8 border-white/5 space-y-6 ${idx % 2 === 1 ? 'mt-12' : ''}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white text-xl shadow-inner`}>
                      <FontAwesomeIcon icon={b.icon} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-white font-brodies text-2xl">{b.title}</h3>
                      <p className="text-white/30 text-xs font-medium leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ── STEP 1: CHOOSE CATEGORY ── */}
      {!selectedCategory && (
        <section className="py-32 lg:py-52 bg-dark-950 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-32 space-y-8">
               <motion.span 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="text-primary-500 font-black text-[11px] uppercase tracking-[0.6em] block"
               >
                 Protocol Phase 01
               </motion.span>
               <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-none tracking-tighter">
                  Identify <span className="text-primary-500 italic">Access</span>
               </h2>
               <p className="text-white/30 text-xl lg:text-3xl max-w-2xl mx-auto italic font-medium leading-relaxed">
                 "Select your operational domain to begin the verification sequence."
               </p>
            </div>
 
            <div className="grid lg:grid-cols-3 gap-12">
              {categories.map((cat, idx) => (
                <motion.div 
                  key={cat.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <button
                    onClick={() => handleCategorySelect(cat.id)}
                    className="w-full text-left glass rounded-[60px] p-16 border-white/5 bg-dark-900/40 hover:bg-dark-900/80 transition-all duration-700 relative overflow-hidden h-[540px] flex flex-col group/card border shadow-2xl hover:border-primary-500/30"
                  >
                    {/* Dynamic Glow */}
                    <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover/card:opacity-[0.15] blur-[120px] transition-opacity duration-1000`} />
                    
                    <div className="space-y-12 relative z-10 flex-1">
                       <div className={`w-28 h-28 rounded-[40px] bg-dark-800 border border-white/5 flex items-center justify-center text-5xl text-white group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-700 shadow-inner relative overflow-hidden`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover/card:opacity-100 transition-opacity duration-700`} />
                          <FontAwesomeIcon icon={cat.icon} className="relative z-10" />
                       </div>
                       
                       <div className="space-y-6">
                          <h3 className="font-bold text-3xl lg:text-5xl text-white leading-[0.9] tracking-tighter uppercase group-hover/card:text-primary-500 transition-colors">
                             {cat.name}
                          </h3>
                          <div className="w-12 h-1 bg-white/5 group-hover/card:w-24 group-hover/card:bg-primary-500 transition-all duration-700" />
                          <p className="text-white/40 text-xl lg:text-2xl font-medium leading-relaxed italic group-hover/card:text-white/80 transition-all delay-75">
                            "{cat.tagline}"
                          </p>
                       </div>
                    </div>
                    
                    <div className="mt-auto pt-12 flex items-center justify-between relative z-10 border-t border-white/5">
                       <span className="text-white font-black text-[13px] uppercase tracking-[0.5em] group-hover/card:text-primary-500 transition-all">
                         Validate Access
                       </span>
                       <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center text-white/20 group-hover/card:text-primary-500 group-hover/card:border-primary-500/50 group-hover/card:translate-x-4 transition-all duration-700">
                          <FontAwesomeIcon icon={faArrowRight} className="text-xl" />
                       </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STEP 2: APPLICATION FORM ── */}
      <AnimatePresence>
        {selectedCategory && (
          <section ref={formRef} className="py-32 lg:py-52 bg-dark-950 relative border-t border-white/5">
            <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="glass rounded-[60px] border-white/5 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
              >
                <div className="relative px-12 lg:px-20 py-20 bg-dark-900/50 border-b border-white/5 overflow-hidden">
                   <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${activeCat?.gradient} opacity-10 blur-[100px]`} />
                   
                   <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
                      <div className="flex items-center gap-10">
                        <div className="w-24 h-24 glass rounded-[36px] flex items-center justify-center text-4xl border-white/10 text-primary-500">
                           <FontAwesomeIcon icon={activeCat?.icon} />
                        </div>
                        <div className="space-y-3">
                           <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em]">Phase 02 — Application</span>
                           <h2 className="font-brodies text-5xl text-white">{activeCat?.name}</h2>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedCategory(null)}
                        className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-white/20 hover:text-white border-white/10 hover:bg-white/5 transition-all"
                      >
                        <FontAwesomeIcon icon={faXmark} className="text-xl" />
                      </button>
                   </div>
                </div>

                <div className="px-12 lg:px-20 py-20 space-y-16">
                   <div className="flex items-start gap-6 p-8 bg-white/5 rounded-[32px] border border-white/5">
                      <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center text-white shadow-xl animate-pulse">
                        <FontAwesomeIcon icon={faShieldHalved} />
                      </div>
                      <div className="space-y-1">
                         <span className="text-white font-brodies text-xl">Verification protocol active.</span>
                         <p className="text-white/30 text-xs font-medium italic">Our board reviews each application based on legacy resonance and innovation output.</p>
                      </div>
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-12">
                      {FormComponent && <FormComponent />}
                      
                      <div className="pt-12 flex flex-col md:flex-row gap-6">
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(null)}
                          className="px-10 py-6 rounded-[24px] border border-white/10 text-white/40 font-black text-[11px] uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-4 group"
                        >
                          <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-2 transition-transform" />
                          Genesis
                        </button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-6 rounded-[24px] font-black text-[11px] uppercase tracking-[0.4em] text-white bg-primary-600 shadow-[0_20px_50px_rgba(229,46,34,0.3)] hover:bg-primary-500 transition-all flex items-center justify-center gap-5"
                        >
                          <FontAwesomeIcon icon={faPaperPlane} className="text-[10px]" />
                          Submit Application
                        </motion.button>
                      </div>
                   </form>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </AnimatePresence>

      <Footer />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] glass bg-emerald-500 text-white border-none px-12 py-8 rounded-[40px] shadow-[0_20px_80px_rgba(16,185,129,0.3)] flex items-center gap-6"
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div className="space-y-1">
              <p className="font-black uppercase tracking-[0.4em] text-[10px] opacity-60">Success Received</p>
              <h4 className="font-brodies text-2xl">The Collective Awaits.</h4>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Membership;
