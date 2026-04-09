import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
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
import PageHero from '../components/PageHero';

/* ─── Simplified UI Constants ─── */
const inp = 'w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-primary-500 transition-colors';
const sel = `${inp} appearance-none cursor-pointer bg-no-repeat bg-[right_1rem_center]`;

const categories = [
  {
    id: 'government',
    name: 'Policy Bodies',
    icon: faBuildingColumns,
    tagline: 'Departments, policy makers & regulatory bodies',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 'industry',
    name: 'Corporate Partners',
    icon: faIndustry,
    tagline: 'Manufacturers, exporters & corporates',
    color: 'text-primary-600',
    bg: 'bg-primary-50'
  },
  {
    id: 'support',
    name: 'Support Orgs',
    icon: faHandshake,
    tagline: 'NGOs, training institutes & support bodies',
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
];

const benefits = [
  {
    title: 'Global Network',
    desc: 'Connect with over 500+ industry leaders and policy makers.',
    icon: faUsers,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'Policy Advocacy',
    desc: 'Get your voice heard at the highest levels of government.',
    icon: faShieldHalved,
    color: 'text-primary-600',
    bg: 'bg-primary-50'
  },
  {
    title: 'Skill Dev',
    desc: 'Access state-of-the-art training and technical workshops.',
    icon: faGraduationCap,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
  {
    title: 'Market Linkage',
    desc: 'Access global trade fairs and B2B opportunities.',
    icon: faGlobe,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
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
  <label className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
    <FontAwesomeIcon icon={icon} className="text-primary-600 opacity-50" />
    {children}
  </label>
);

const GovernmentForm = () => (
  <div className="grid gap-6">
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
      <textarea name="org_address" required rows="2" placeholder="Full address" className={`${inp} resize-none`} />
    </div>
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
  </div>
);

const IndustryForm = () => (
  <div className="grid gap-6">
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
  </div>
);

const SupportForm = () => (
  <div className="grid gap-6">
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
  </div>
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="The Legacy Enrollment"
        title="Join the Collective"
        subtitle="Connect with India's most influential textile visionary network. Empowering civilization through innovation since 1998."
      />

      <div className="section-container py-24">
        
        {/* Success Toast */}
        {showSuccess && (
          <div className="mb-12 p-8 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-6 animate-fade-in">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-2xl">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 opacity-60">Success Received</p>
              <h4 className="text-xl font-bold text-gray-900">Application Submitted. The Collective Awaits.</h4>
            </div>
          </div>
        )}

        {/* ── WHY JOIN SECTION ── */}
        <div className="mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="badge">Network Genesis</div>
              <h2 className="section-title text-left">Why the Collective?</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We provide more than collaboration. We provide the resonance required to bridge legacy with the pulse of modern industry. Partner with us to scale your impact.
              </p>
              <div className="flex -space-x-3 pt-4">
                {[1,2,3,4].map(i => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?u=${i+20}`} 
                    className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                    alt="Member"
                  />
                ))}
                <div className="w-12 h-12 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                  +2k
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="card p-8 group hover:border-primary-200 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl ${b.bg} ${b.color} flex items-center justify-center text-xl mb-6 shadow-sm`}>
                    <FontAwesomeIcon icon={b.icon} />
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STEP 1: CHOOSE CATEGORY ── */}
        {!selectedCategory && (
          <div className="mb-32 bg-gray-50 border border-gray-100 rounded-[40px] p-12 lg:p-24">
            <div className="text-center mb-16 space-y-4">
              <div className="badge">Protocol Phase 01</div>
              <h2 className="section-title">Identify Your Domain</h2>
              <p className="section-subtitle mx-auto">
                Select your operational domain to begin the verification sequence.
              </p>
            </div>
  
            <div className="grid lg:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="card group text-left p-12 hover:border-primary-300 transition-all flex flex-col h-full bg-white"
                >
                  <div className={`w-20 h-20 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center text-4xl mb-10 transition-transform group-hover:scale-110`}>
                    <FontAwesomeIcon icon={cat.icon} />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight group-hover:text-primary-600">
                       {cat.name}
                    </h3>
                    <div className="w-8 h-px bg-gray-200 group-hover:w-16 group-hover:bg-primary-500 transition-all" />
                    <p className="text-gray-500 text-sm italic">
                      "{cat.tagline}"
                    </p>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest group-hover:text-primary-600 transition-colors">
                      Begin Setup
                    </span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-gray-300 group-hover:text-primary-600 group-hover:translate-x-2 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: APPLICATION FORM ── */}
        {selectedCategory && (
          <div ref={formRef} className="max-w-4xl mx-auto mb-32">
            <div className="card shadow-2xl p-0 overflow-hidden border-none text-gray-900 bg-white shadow-gray-200">
               <div className="p-8 lg:p-12 bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-8">
                    <div className={`w-20 h-20 ${activeCat?.bg} ${activeCat?.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                       <FontAwesomeIcon icon={activeCat?.icon} />
                    </div>
                    <div>
                       <div className="badge border-gray-700 bg-gray-800 text-primary-400 mb-2">Phase 02 — Application</div>
                       <h2 className="text-3xl font-black uppercase tracking-tight">{activeCat?.name}</h2>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="w-12 h-12 bg-gray-800 text-gray-500 hover:text-white rounded-xl flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-xl" />
                  </button>
               </div>

               <div className="p-8 lg:p-16 space-y-12 bg-white">
                  <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center shadow-lg">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </div>
                    <div className="space-y-1">
                       <p className="font-bold text-gray-900">Verification protocol active.</p>
                       <p className="text-gray-500 text-xs">Our board reviews each application based on industry presence and heritage impact.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    {FormComponent && <FormComponent />}
                    
                    <div className="pt-8 flex flex-col sm:flex-row gap-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className="btn-secondary flex-1"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Back to Categories
                      </button>
                      <button
                        type="submit"
                        className="btn-primary flex-[2] bg-primary-600"
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Submit Application
                      </button>
                    </div>
                  </form>
               </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Membership;
