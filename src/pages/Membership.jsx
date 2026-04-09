import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding, faEnvelope, faPhone, faUser, faMapMarkerAlt,
  faCheckCircle, faArrowRight, faArrowLeft, faXmark, faPaperPlane,
  faBriefcase, faGlobe, faUsers, faShieldHalved, faGraduationCap,
  faUniversity, faIndustry, faHandshake, faGavel, 
  faClipboardList, faBuildingColumns, faUsersGear, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

/* ─── UI Constants ─── */
const inp = 'w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-primary-500 transition-colors';
const sel = `${inp} appearance-none cursor-pointer bg-no-repeat bg-[right_1rem_center]`;

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

/* ─── Form Templates ─── */

const AcademicInstituteForm = () => (
  <div className="grid gap-6 animate-fade-in">
    <div className="space-y-6">
       <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Training Institute Details</h4>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faBuilding}>Name of the Organization *</Label>
            <input type="text" name="org_name" required placeholder="Organization Name" className={inp} />
          </div>
          <div>
            <Label icon={faGlobe}>State of Operation *</Label>
            <select name="state" required className={sel}>
              <option value="">Select State</option>
              {indianStates.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
       </div>
       <div>
          <Label icon={faMapMarkerAlt}>Address of the Organization (HO) *</Label>
          <textarea name="org_address" required rows="2" placeholder="Full address of Head Office" className={`${inp} resize-none`} />
       </div>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faGavel}>Constitution of the Organisation *</Label>
            <select name="constitution" required className={sel}>
              <option value="">Select Constitution</option>
              <option>Trust</option>
              <option>Society</option>
              <option>Private Limited</option>
              <option>Public Limited</option>
              <option>Government Body</option>
              <option>Partnership/LLP</option>
            </select>
          </div>
          <div>
            <Label icon={faBriefcase}>Line of Business Activity *</Label>
            <select name="business_activity" required className={sel}>
              <option value="">Select Activity</option>
              <option>Skill Development</option>
              <option>Vocational Training</option>
              <option>Technical Research</option>
              <option>Textile Design</option>
              <option>Others</option>
            </select>
          </div>
       </div>
    </div>

    <div className="space-y-6 pt-6">
       <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">The Decision Maker</h4>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faUser}>Name *</Label>
            <input type="text" name="decision_maker" required placeholder="Full Name" className={inp} />
          </div>
          <div>
            <Label icon={faPhone}>Contact Number *</Label>
            <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className={inp} />
          </div>
       </div>
       <div>
          <Label icon={faEnvelope}>Email ID *</Label>
          <input type="email" name="email" required placeholder="email@organization.org" className={inp} />
       </div>
    </div>

    <div>
       <Label icon={faInfoCircle}>Additional Information</Label>
       <textarea name="additional_info" rows="3" placeholder="Tell us more about your institute's mission..." className={`${inp} resize-none`} />
    </div>
  </div>
);

const AcademicUniversityForm = () => (
  <div className="grid gap-6 animate-fade-in">
    <div className="space-y-6">
       <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">College/University Details</h4>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faUniversity}>Name of the College/University *</Label>
            <input type="text" name="org_name" required placeholder="Institution Name" className={inp} />
          </div>
          <div>
            <Label icon={faGlobe}>State of Operation *</Label>
            <select name="state" required className={sel}>
              <option value="">Select State</option>
              {indianStates.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
       </div>
       <div>
          <Label icon={faMapMarkerAlt}>Address of the College/University *</Label>
          <textarea name="org_address" required rows="2" placeholder="Full campus address" className={`${inp} resize-none`} />
       </div>
    </div>

    <div className="space-y-6 pt-6">
       <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">The Decision Maker</h4>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faUser}>Name *</Label>
            <input type="text" name="decision_maker" required placeholder="Full Name" className={inp} />
          </div>
          <div>
            <Label icon={faPhone}>Contact Number *</Label>
            <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className={inp} />
          </div>
       </div>
       <div>
          <Label icon={faEnvelope}>Email ID *</Label>
          <input type="email" name="email" required placeholder="registrar@university.edu.in" className={inp} />
       </div>
    </div>

    <div>
       <Label icon={faInfoCircle}>Additional Information</Label>
       <textarea name="additional_info" rows="3" placeholder="Any specific areas for academic collaboration?" className={`${inp} resize-none`} />
    </div>
  </div>
);

const IndustryForm = () => (
  <div className="grid gap-6 animate-fade-in">
    <div className="space-y-6">
       <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Company Details</h4>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faBuilding}>Name of the Company *</Label>
            <input type="text" name="org_name" required placeholder="Enterprise Name" className={inp} />
          </div>
          <div>
            <Label icon={faUsersGear}>Textile Sub Sector *</Label>
            <select name="sub_sector" required className={sel}>
              <option value="">Select Sub Sector</option>
              <option>Spinning</option>
              <option>Weaving & Knitting</option>
              <option>Garmenting & Apparel</option>
              <option>Technical Textiles</option>
              <option>Handloom & Artisanal</option>
              <option>Processing & Dyeing</option>
              <option>Textile Machinery</option>
              <option>Home Textiles</option>
            </select>
          </div>
       </div>
       <div>
          <Label icon={faMapMarkerAlt}>Address of the Head Office *</Label>
          <textarea name="org_address" required rows="2" placeholder="Full HQ address" className={`${inp} resize-none`} />
       </div>
       <div>
          <Label icon={faHandshake}>Interested for Partnering in *</Label>
          <select name="partnering_interest" required className={sel}>
            <option value="">Select Partnering Interests</option>
            <option>Skill Training & Placement</option>
            <option>Apprenticeship Management</option>
            <option>Research & Development</option>
            <option>Market Linkage Solutions</option>
            <option>Industry Standard Certifications</option>
          </select>
       </div>
    </div>

    <div className="space-y-6 pt-6">
       <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">The Decision Maker</h4>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faUser}>Name *</Label>
            <input type="text" name="decision_maker" required placeholder="Full Name" className={inp} />
          </div>
          <div>
            <Label icon={faBriefcase}>Designation *</Label>
            <input type="text" name="designation" required placeholder="e.g. Managing Director" className={inp} />
          </div>
       </div>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faPhone}>Contact Number *</Label>
            <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className={inp} />
          </div>
          <div>
            <Label icon={faEnvelope}>Email Address *</Label>
            <input type="email" name="email" required placeholder="business@company.com" className={inp} />
          </div>
       </div>
    </div>

    <div>
       <Label icon={faInfoCircle}>Additional Information</Label>
       <textarea name="additional_info" rows="3" placeholder="Share your industry scale or specific needs..." className={`${inp} resize-none`} />
    </div>
  </div>
);

const StakeholderForm = () => (
  <div className="grid gap-6 animate-fade-in">
    <div className="space-y-6">
       <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Stakeholder Profile</h4>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faBuilding}>Organization/Body Name *</Label>
            <input type="text" name="org_name" required placeholder="Stakeholder Name" className={inp} />
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
          <Label icon={faMapMarkerAlt}>Official Address *</Label>
          <textarea name="org_address" required rows="2" placeholder="Full official address" className={`${inp} resize-none`} />
       </div>
    </div>

    <div className="space-y-6 pt-6">
       <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Contact Person</h4>
       <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label icon={faUser}>Name *</Label>
            <input type="text" name="decision_maker" required placeholder="Full Name" className={inp} />
          </div>
          <div>
            <Label icon={faPhone}>Contact Number *</Label>
            <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className={inp} />
          </div>
       </div>
       <div>
          <Label icon={faEnvelope}>Email ID *</Label>
          <input type="email" name="email" required placeholder="contact@stakeholder.org" className={inp} />
       </div>
    </div>

    <div>
       <Label icon={faInfoCircle}>Purpose of Partnership</Label>
       <textarea name="additional_info" rows="3" placeholder="Describe your interest in the textile value chain..." className={`${inp} resize-none`} />
    </div>
  </div>
);

const Membership = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [academicType, setAcademicType] = useState('institute');
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const categories = [
    { id: 'academic', name: 'Academic', icon: faGraduationCap, tagline: 'Training Institutes, Colleges & Universities' },
    { id: 'stakeholder', name: 'Stakeholder', icon: faHandshake, tagline: 'Collaborators, NGOs & Policy Support' },
    { id: 'industry', name: 'Industry', icon: faIndustry, tagline: 'Manufacturers, MSMEs & Corporate Titans' },
  ];

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  };

  const handleAcademicTypeChange = (e) => setAcademicType(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = new FormData(e.target);
    const data = Object.fromEntries(formValues.entries());
    const payload = { 
      ...data, 
      category: selectedCategory,
      academic_sub_type: selectedCategory === 'academic' ? academicType : null 
    };

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
        eyebrow="Enrollment Protocol"
        title="Join the Collective"
        subtitle="Bridging industrial strength with rhythmic heritage across India's vibrant textile value chain."
      />

      <div className="section-container py-24">
        
        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-12 p-8 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-6 animate-fade-in">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-2xl">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 opacity-60">Verified</p>
              <h4 className="text-xl font-bold text-gray-900">Application Transmitted. Our board will reach out shortly.</h4>
            </div>
          </div>
        )}

        {/* ── Section: Active Members Overview ── */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <div className="badge">Network Overview</div>
            <h2 className="section-title">Active Members</h2>
            <p className="section-subtitle mx-auto">
              Our ecosystem is built on the synergy of academic prowess, stakeholder collaboration, and industrial scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div key={cat.id} className="p-10 bg-gray-50 rounded-[40px] border border-gray-100 space-y-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-600 text-2xl">
                  <FontAwesomeIcon icon={cat.icon} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{cat.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed italic">"{cat.tagline}"</p>
                  <ul className="text-xs text-gray-400 space-y-2 pt-4">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary-600 rounded-full" /> Verified Participation</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary-600 rounded-full" /> Strategic Council Access</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary-600 rounded-full" /> Industrial Revival Projects</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section: Inviting Membership ── */}
        {!selectedCategory && (
          <div className="mb-32 bg-gray-900 rounded-[50px] p-12 lg:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 opacity-10 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <div className="text-center mb-16 space-y-4 relative z-10">
              <div className="badge border-gray-700 bg-gray-800 text-primary-400">Join the Collective</div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Inviting for Membership</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">
                Choose your domain to generate the appropriate application sequence.
              </p>
            </div>
  
            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="group bg-gray-800/50 backdrop-blur-md border border-gray-700/50 p-10 rounded-[32px] text-left hover:border-primary-500/50 transition-all flex flex-col h-full"
                >
                  <div className="w-14 h-14 bg-gray-800 border border-gray-700 text-primary-400 rounded-xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <FontAwesomeIcon icon={cat.icon} />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-primary-400">
                       {cat.name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>
                  
                  <div className="mt-10 pt-6 border-t border-gray-700 flex items-center justify-between">
                    <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest group-hover:text-primary-600 transition-colors">
                      Open Form
                    </span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-gray-600 group-hover:text-primary-600 group-hover:translate-x-2 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: DYNAMIC APPLICATION FORM ── */}
        {selectedCategory && (
          <div ref={formRef} className="max-w-4xl mx-auto mb-32">
            <div className="bg-white rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
               <div className="p-8 lg:p-12 bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-gray-800 text-primary-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-gray-700">
                       <FontAwesomeIcon icon={categories.find(c => c.id === selectedCategory)?.icon} />
                    </div>
                    <div>
                       <div className="badge border-gray-700 bg-gray-800 text-primary-400 mb-2">Membership Application</div>
                       <h2 className="text-3xl font-black uppercase tracking-tight">Partner with us as {selectedCategory}</h2>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="w-12 h-12 bg-gray-800 text-gray-500 hover:text-white rounded-xl flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-xl" />
                  </button>
               </div>

               <div className="p-8 lg:p-16 space-y-12">
                  {selectedCategory === 'academic' && (
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center gap-8">
                       <Label icon={faClipboardList}>Select Academic Entity Type</Label>
                       <div className="flex gap-6">
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input 
                                type="radio" 
                                name="academicSelection" 
                                value="institute" 
                                checked={academicType === 'institute'} 
                                onChange={handleAcademicTypeChange}
                                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                             />
                             <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">Training Institute</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input 
                                type="radio" 
                                name="academicSelection" 
                                value="university" 
                                checked={academicType === 'university'} 
                                onChange={handleAcademicTypeChange}
                                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                             />
                             <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">College / University</span>
                          </label>
                       </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-10">
                    {selectedCategory === 'academic' && (
                      academicType === 'institute' ? <AcademicInstituteForm /> : <AcademicUniversityForm />
                    )}
                    {selectedCategory === 'industry' && <IndustryForm />}
                    {selectedCategory === 'stakeholder' && <StakeholderForm />}
                    
                    <div className="pt-8 flex flex-col sm:flex-row gap-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className="w-full sm:w-1/3 px-8 py-5 border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-2/3 px-8 py-5 bg-primary-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary-700 shadow-xl shadow-primary-500/20 transition-all flex items-center justify-center gap-3"
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Transmit Application
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
