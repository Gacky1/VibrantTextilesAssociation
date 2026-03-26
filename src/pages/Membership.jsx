import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding, faEnvelope, faPhone, faUser, faMapMarkerAlt,
  faCheckCircle, faArrowRight, faArrowLeft, faXmark, faPaperPlane,
  faBriefcase, faGlobe, faUsers, faRocket, faShieldHalved, faGraduationCap,
  faChartLine, faAward, faUniversity, faIndustry, faHandshake, faGavel, 
  faClipboardList, faHeart, faUsersGear, faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ─── Premium UI Constants ─── */
const inp = 'w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white transition-all duration-300 hover:border-gray-300 backdrop-blur-sm';
const sel = `${inp} appearance-none cursor-pointer`;

const categories = [
  {
    id: 'government',
    name: 'Government & Policy Bodies',
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
    name: 'Industry & Corporate Partners',
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
    name: 'Support Organizations',
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
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Policy Advocacy',
    desc: 'Get your voice heard at the highest levels of government and shape industry policies.',
    icon: faShieldHalved,
    color: 'from-primary-500 to-rose-500'
  },
  {
    title: 'Skill Development',
    desc: 'Exclusive access to state-of-the-art training programs and technical workshops.',
    icon: faGraduationCap,
    color: 'from-orange-500 to-amber-500'
  },
  {
    title: 'Market Linkage',
    desc: 'Direct access to global trade fairs, B2B meets, and international market opportunities.',
    icon: faGlobe,
    color: 'from-emerald-500 to-teal-500'
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
  <label className="flex items-center gap-2 text-gray-700 text-sm font-bold mb-2 ml-1">
    <FontAwesomeIcon icon={icon} className="text-primary-500 text-[10px]" />
    {children}
  </label>
);

/* ─── Form Parts ─── */
const GovernmentForm = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
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
    <div className="divider opacity-50 my-2" />
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <Label icon={faUser}>Decision Maker Name *</Label>
        <input type="text" name="decision_maker" required placeholder="Full Name" className={inp} />
      </div>
      <div>
        <Label icon={faBriefcase}>Designation</Label>
        <input type="text" name="designation" placeholder="e.g. Secretary" className={inp} />
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
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
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
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
    <div className="divider opacity-50 my-2" />
    <div className="grid md:grid-cols-2 gap-6">
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
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
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
    <div className="grid md:grid-cols-2 gap-6">
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
  const [activeFilter, setActiveFilter] = useState('all');
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

  const filteredCategories = activeFilter === 'all'
    ? categories
    : categories.filter(c => c.id === activeFilter);

  return (
    <div className="min-h-screen bg-white selection:bg-primary-100 selection:text-primary-700">
      <Navbar />

      {/* ── HIGH-IMPACT HERO ── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900">
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none noise-overlay" />
        <div className="absolute inset-0 mesh-gradient-dark opacity-60" />
        
        {/* Decorative Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge mb-6 px-4 py-2 text-xs font-black tracking-widest bg-white/10 text-white border-white/20 shadow-lg backdrop-blur-md">
                <FontAwesomeIcon icon={faRocket} className="mr-2 text-primary-400" />
                2026 ENROLLMENT OPEN
              </span>
              <h1 className="section-heading text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] mb-8 text-white">
                Join India's Most <br className="hidden md:block"/>
                <span className="text-gradient font-black italic">Influential</span> Network
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                Connect, innovate, and lead the textile revolution. Empowering stakeholders across the entire value chain.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button 
                  onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}
                  className="btn-primary scale-110 px-10 py-5 group"
                >
                  Apply Now
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-gray-800 bg-gray-700 overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Member" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-gray-800 bg-primary-600 text-white flex items-center justify-center text-[10px] font-bold shadow-lg">
                    500+
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN SECTION ── */}
      <section className="py-24 bg-gray-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading text-4xl text-gray-900 mb-4">Why Vibrant Textiles?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-premium p-8 rounded-[32px] hover-lift group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${b.color} text-white flex items-center justify-center text-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                  <FontAwesomeIcon icon={b.icon} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NETWORK SHOWCASE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <span className="text-primary-600 font-bold uppercase tracking-widest text-xs mb-3 block">Real Impact</span>
              <h2 className="section-heading text-5xl text-gray-900 mb-6">Our Diverse Network</h2>
              <p className="text-gray-500 text-lg">A powerful ecosystem of policy makers, manufacturers, and support organizations.</p>
            </div>
            {/* Filter */}
            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
              {['all', 'government', 'industry', 'support'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                    activeFilter === f ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {f === 'all' ? 'Every Member' : f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-16">
            {filteredCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center text-xl shadow-md`}>
                    <FontAwesomeIcon icon={cat.icon} className="transform -rotate-12" />
                   </div>
                   <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{cat.name}</h3>
                   <div className="flex-1 h-[2px] bg-gray-100 ml-4" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.members.map((m, mIdx) => (
                    <motion.div
                      key={mIdx}
                      whileHover={{ scale: 1.03 }}
                      className="group p-8 border border-gray-100 rounded-[28px] bg-white hover:bg-gray-50 transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-100/50 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-colors" />
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform shadow-inner text-gray-600">
                          <FontAwesomeIcon icon={m.icon} />
                        </div>
                        <span className={`text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-gray-200 group-hover:border-primary-200 group-hover:text-primary-600`}>
                          {m.type}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{m.name}</h4>
                      <p className="text-gray-400 text-xs mt-3 flex items-center gap-2">
                        <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                        Active Partnership
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP 1: CHOOSE CATEGORY ── */}
      {!selectedCategory && (
        <section className="py-32 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient-dark opacity-40 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <span className="section-badge bg-white/10 text-white border-white/20 mb-6 font-bold">Step 01 — Identify Yourself</span>
              <h2 className="section-heading text-5xl md:text-6xl text-white mb-6">Ready to lead the future?</h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">Select your sector to unlock customized benefits and tools tailored for your growth.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <button
                    onClick={() => handleCategorySelect(cat.id)}
                    className="w-full text-left group relative bg-gray-800/40 border border-white/10 p-10 rounded-[40px] hover:bg-white transition-all duration-500 hover:scale-[1.02]"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.gradient} opacity-20 blur-3xl group-hover:opacity-40`} />
                    
                    <div className="mb-8 block transition-transform group-hover:scale-125 group-hover:rotate-12 duration-500 text-5xl text-white group-hover:text-primary-600">
                      <FontAwesomeIcon icon={cat.icon} />
                    </div>
                    <h3 className="text-3xl font-black text-white group-hover:text-gray-900 mb-4 transition-colors">{cat.name}</h3>
                    <p className="text-gray-400 group-hover:text-gray-500 mb-10 text-lg leading-relaxed">{cat.tagline}</p>
                    
                    <div className={`flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] ${cat.id === 'industry' ? 'text-primary-500' : 'text-amber-500'} group-hover:translate-x-3 transition-transform`}>
                      Get Started
                      <FontAwesomeIcon icon={faArrowRight} />
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
          <section ref={formRef} className="py-32 bg-gray-50 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[48px] shadow-2xl border border-gray-100 overflow-hidden"
              >
                {/* Form Header */}
                <div className={`bg-gradient-to-br ${activeCat?.gradient} px-12 py-12 relative overflow-hidden text-white`}>
                   <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                   <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span className="text-5xl p-5 bg-white/10 rounded-[32px] backdrop-blur-md border border-white/20">
                           <FontAwesomeIcon icon={activeCat?.icon} />
                        </span>
                        <div>
                           <p className="text-white/60 text-xs font-black uppercase tracking-[0.3em] mb-2">Step 2 of 2 — Secure Application</p>
                           <h2 className="text-4xl font-black">{activeCat?.name}</h2>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedCategory(null)}
                        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white text-white hover:text-primary-600 transition-all border border-white/20"
                      >
                        <FontAwesomeIcon icon={faXmark} className="text-xl" />
                      </button>
                   </div>
                </div>

                {/* Form Body */}
                <div className="p-12">
                   <div className="flex items-start gap-4 p-6 bg-gray-900 rounded-3xl mb-12">
                      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white flex-shrink-0 animate-pulse-slow text-xs">
                        <FontAwesomeIcon icon={faAward} />
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed mt-1">
                        You're applying for <span className="text-white font-bold">Elite Membership</span>. Please provide accurate details. Our review board typically responds within 72 hours.
                      </p>
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-8">
                      {FormComponent && <FormComponent />}
                      
                      <div className="pt-10 flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(null)}
                          className="px-8 py-5 rounded-2xl border-2 border-gray-100 text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center gap-3"
                        >
                          <FontAwesomeIcon icon={faArrowLeft} />
                          Back
                        </button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] text-white bg-gradient-to-r ${activeCat?.gradient} shadow-2xl hover:shadow-${activeCat?.accent}-500/40 transition-all flex items-center justify-center gap-4`}
                        >
                          <FontAwesomeIcon icon={faPaperPlane} />
                          Validate & Submit Application
                        </motion.button>
                      </div>
                   </form>
                </div>
              </motion.div>
              
              <p className="text-center text-gray-400 text-xs mt-12 flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 text-lg" />
                256-bit Encrypted Connection • Private Data Policy • GDPR Compliant
              </p>
            </div>
          </section>
        )}
      </AnimatePresence>

      <Footer />

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[60] glass-premium bg-emerald-500 text-white border-none px-10 py-6 rounded-[32px] shadow-[0_20px_60px_rgba(16,185,129,0.3)] flex items-center gap-5"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div>
              <p className="font-black uppercase tracking-widest text-[10px] mb-1 opacity-80">Application Received</p>
              <h4 className="text-lg font-bold">Welcome to the Network!</h4>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Membership;
