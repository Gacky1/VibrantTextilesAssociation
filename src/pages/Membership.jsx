import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding, faEnvelope, faPhone, faUser, faMapMarkerAlt,
  faCheckCircle, faArrowRight, faArrowLeft, faXmark, faPaperPlane,
  faBriefcase, faGlobe, faUsers, faGraduationCap,
  faUniversity, faIndustry, faHandshake, faGavel, 
  faClipboardList, faUsersGear, faInfoCircle, faCalendarAlt, 
  faVenusMars, faUpload, faFileAlt, faBookOpen, faCompass, faUserTie, faHashtag
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

/* ─── UI Constants ─── */
const inp = 'w-full px-4 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:outline-none focus:border-rose-500 dark:focus:border-rose-450 transition-all focus:ring-1 focus:ring-rose-500/20';
const sel = `${inp} appearance-none cursor-pointer bg-no-repeat bg-[right_1rem_center]`;

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
];

const Label = ({ icon, children }) => (
  <label className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-2 ml-1">
    <FontAwesomeIcon icon={icon} className="text-rose-600 dark:text-rose-400 opacity-60" />
    {children}
  </label>
);

/* ─── Form Templates ─── */

const AcademicInstituteForm = () => (
  <div className="grid gap-6 animate-fade-in">
    <div className="space-y-6">
       <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
         <FontAwesomeIcon icon={faUniversity} className="text-rose-500" />
         Training Institute Details
       </h4>
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
       <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
         <FontAwesomeIcon icon={faUser} className="text-rose-500" />
         The Decision Maker
       </h4>
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
       <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
         <FontAwesomeIcon icon={faUniversity} className="text-rose-500" />
         College/University Details
       </h4>
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
       <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
         <FontAwesomeIcon icon={faUser} className="text-rose-500" />
         The Decision Maker
       </h4>
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
       <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
         <FontAwesomeIcon icon={faIndustry} className="text-rose-500" />
         Company Details
       </h4>
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
       <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
         <FontAwesomeIcon icon={faUser} className="text-rose-500" />
         The Decision Maker
       </h4>
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
       <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
         <FontAwesomeIcon icon={faHandshake} className="text-rose-500" />
         Stakeholder Profile
       </h4>
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
       <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
         <FontAwesomeIcon icon={faUser} className="text-rose-500" />
         Contact Person
       </h4>
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

const FreelanceTrainerForm = ({ onResumeChange, resumeName }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleTypeChange = (type) => {
    let updated;
    if (selectedTypes.includes(type)) {
      updated = selectedTypes.filter(t => t !== type);
    } else {
      updated = [...selectedTypes, type];
    }
    setSelectedTypes(updated);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onResumeChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onResumeChange(e.target.files[0]);
    }
  };

  return (
    <div className="grid gap-6 animate-fade-in">
      <div className="space-y-6">
         <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
           <FontAwesomeIcon icon={faUserTie} className="text-emerald-500" />
           Personal Details
         </h4>
         <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label icon={faUser}>Full Name *</Label>
              <input type="text" name="decision_maker" required placeholder="As per official documents" className={inp} />
            </div>
            <div>
              <Label icon={faCalendarAlt}>Date of Birth *</Label>
              <input type="date" name="dob" required className={inp} />
            </div>
         </div>
         <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label icon={faVenusMars}>Gender *</Label>
              <select name="gender" required className={sel}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div>
              <Label icon={faUsers}>Social Category *</Label>
              <select name="social_category" required className={sel}>
                <option value="">Select Category</option>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
              </select>
            </div>
         </div>
         <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label icon={faEnvelope}>Email Address *</Label>
              <input type="email" name="email" required placeholder="trainer@domain.com" className={inp} />
            </div>
            <div>
              <Label icon={faPhone}>Contact Number *</Label>
              <input type="tel" name="phone" required placeholder="+91 XXXXX XXXXX" className={inp} />
            </div>
         </div>
         <div>
            <Label icon={faMapMarkerAlt}>Residential Address *</Label>
            <textarea name="org_address" required rows="2" placeholder="Full residential / correspondence address" className={`${inp} resize-none`} />
         </div>
         <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label icon={faGlobe}>State of Operation *</Label>
              <select name="state" required className={sel}>
                <option value="">Select State</option>
                {indianStates.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label icon={faGlobe}>District *</Label>
              <input type="text" name="district" required placeholder="e.g. Surat" className={inp} />
            </div>
         </div>
      </div>

      <div className="space-y-6 pt-6">
         <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
           <FontAwesomeIcon icon={faBookOpen} className="text-emerald-500" />
           Professional Qualifications
         </h4>
         <div className="grid md:grid-cols-2 gap-6">
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
            <div>
              <Label icon={faBriefcase}>Work Experience (Years) *</Label>
              <input type="number" name="experience" min="0" required placeholder="e.g. 5" className={inp} />
            </div>
         </div>
         <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label icon={faGraduationCap}>Highest Qualification *</Label>
              <select name="highest_qualification" required className={sel}>
                <option value="">Select Qualification</option>
                <option>Diploma in Textiles</option>
                <option>B.Tech / B.E in Textile Engineering</option>
                <option>M.Tech in Textiles</option>
                <option>Degree in Fashion Designing</option>
                <option>Post Graduate / MBA</option>
                <option>Doctorate / Ph.D.</option>
                <option>High School / Vocational Training</option>
                <option>Others</option>
              </select>
            </div>
            <div>
              <Label icon={faCalendarAlt}>Passing Year *</Label>
              <input type="number" name="passing_year" min="1950" max="2026" required placeholder="e.g. 2020" className={inp} />
            </div>
         </div>

         <div>
            <Label icon={faClipboardList}>Trainer Type * (Select all that apply)</Label>
            <div className="grid sm:grid-cols-3 gap-4 p-4 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800">
               {[
                 { id: 'domain', label: 'Domain Trainer' },
                 { id: 'behavioral', label: 'Behavioral Trainer' },
                 { id: 'mock', label: 'Mock Interviewer' }
               ].map(t => (
                 <label key={t.id} className="flex items-center gap-3 cursor-pointer select-none group">
                    <input 
                      type="checkbox" 
                      name="trainer_types"
                      value={t.label}
                      checked={selectedTypes.includes(t.label)}
                      onChange={() => handleTypeChange(t.label)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900" 
                    />
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-350 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">{t.label}</span>
                 </label>
               ))}
            </div>
         </div>
      </div>

      <div className="space-y-6 pt-6">
         <h4 className="text-lg font-bold text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-4 flex items-center gap-2">
           <FontAwesomeIcon icon={faUpload} className="text-emerald-500" />
           Resume Upload
         </h4>
         <div 
           onDragEnter={handleDrag}
           onDragOver={handleDrag}
           onDragLeave={handleDrag}
           onDrop={handleDrop}
           onClick={() => fileInputRef.current?.click()}
           className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
             dragActive 
               ? 'border-emerald-500 bg-emerald-50/10' 
               : resumeName
                 ? 'border-emerald-500/55 bg-emerald-500/5'
                 : 'border-stone-350 dark:border-stone-700 hover:border-emerald-500 dark:hover:border-emerald-450 bg-stone-50/40 dark:bg-stone-900/30'
           }`}
         >
           <input 
             type="file" 
             ref={fileInputRef}
             className="hidden" 
             onChange={handleFileChange}
             accept=".pdf,.doc,.docx"
           />
           <FontAwesomeIcon icon={faFileAlt} className={`text-4xl ${resumeName ? 'text-emerald-500' : 'text-stone-400'}`} />
           {resumeName ? (
             <div>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">File Selected</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-semibold">{resumeName}</p>
             </div>
           ) : (
             <div>
                <p className="text-sm font-black text-stone-700 dark:text-stone-300">Drag & Drop your Resume here</p>
                <p className="text-xs text-stone-500 dark:text-stone-450 mt-1 font-medium">Supports PDF, DOC, DOCX up to 5MB (Click to browse)</p>
             </div>
           )}
         </div>
      </div>

      <div>
         <Label icon={faInfoCircle}>Additional Notes</Label>
         <textarea name="additional_info" rows="3" placeholder="Tell us about your training background or certification details..." className={`${inp} resize-none`} />
      </div>
    </div>
  );
};

/* ─── Main Membership Component ─── */

const Membership = () => {
  const [activeMembers, setActiveMembers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [academicType, setAcademicType] = useState('institute');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  
  // Roster Tab Filtering State
  const [rosterTab, setRosterTab] = useState('all');

  const formRef = useRef(null);

  const categories = [
    { 
      id: 'academic', 
      name: 'Academic', 
      icon: faGraduationCap, 
      tagline: 'Training Institutes, Colleges & Universities', 
      desc: 'Partner with us to run government skilling courses, implement technical curricula, and handle official candidate placements.',
      color: 'rose'
    },
    { 
      id: 'industry', 
      name: 'Industry', 
      icon: faIndustry, 
      tagline: 'Manufacturers, MSMEs & Corporate Titans', 
      desc: 'Collaborate to support apprenticeships, build reliable supply chains, participate in events, and align with trade policies.',
      color: 'amber'
    },
    { 
      id: 'stakeholder', 
      name: 'Stakeholder', 
      icon: faHandshake, 
      tagline: 'Collaborators, NGOs & Policy Support', 
      desc: 'Join the advisory network to assist with grassroots artisan clusters, handloom welfare campaigns, and research initiatives.',
      color: 'indigo'
    }
  ];

  useEffect(() => {
    const fetchActiveMembers = async () => {
      try {
        const { data } = await supabase
          .from('members')
          .select('*')
          .in('category', ['academic', 'stakeholder', 'industry'])
          .eq('is_active', true)
          .order('sort_order');
        
        setActiveMembers(data || []);
      } catch (error) {
        console.error('Error fetching registry:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveMembers();
  }, []);

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setResumeFile(null);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  };

  const handleAcademicTypeChange = (e) => setAcademicType(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formValues = new FormData(e.target);
    const data = Object.fromEntries(formValues.entries());
    
    let payload = {};

    if (selectedCategory === 'trainer') {
      // Custom mapping for Freelance Trainer form to store in standard columns
      const trainerTypes = formValues.getAll('trainer_types');
      
      const serializedInfo = {
        dob: data.dob,
        gender: data.gender,
        social_category: data.social_category,
        district: data.district,
        experience_years: data.experience,
        highest_qualification: data.highest_qualification,
        passing_year: data.passing_year,
        trainer_types: trainerTypes,
        resume_name: resumeFile ? resumeFile.name : 'Not Provided',
        additional_notes: data.additional_info
      };

      payload = {
        category: 'trainer',
        org_name: data.decision_maker, // Save trainer's full name here to satisfy NOT NULL constraints
        org_type: data.sub_sector, // Textile Sub Sector
        org_address: data.org_address,
        state: data.state,
        partnering_interest: trainerTypes.join(', '),
        decision_maker: data.decision_maker,
        designation: 'Freelance Trainer',
        phone: data.phone,
        email: data.email,
        additional_info: JSON.stringify(serializedInfo),
        status: 'pending'
      };
    } else {
      // Standard mapping for other categories
      payload = { 
        ...data, 
        category: selectedCategory,
        org_type: selectedCategory === 'academic' ? academicType : (selectedCategory === 'industry' ? data.sub_sector : null)
      };
    }

    try {
      const { error } = await supabase.from('membership_applications').insert([payload]);
      if (error) throw error;
      
      setShowSuccess(true);
      setSelectedCategory(null);
      setResumeFile(null);
      setTimeout(() => setShowSuccess(false), 5500);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Application transmission failed. Please verify your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFilteredMembers = () => {
    if (rosterTab === 'all') return activeMembers;
    return activeMembers.filter(m => m.category === rosterTab);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 bg-textile-linen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <PageHero
        eyebrow="VTA REGISTRY PATHWAYS"
        title="Membership Portal"
        subtitle="Unifying educational training centers, policy advocates, scale manufacturers, and expert trainers to drive the Indian textile ecosystem forward."
      />

      <div className="fringe-divider" />

      <div className="section-container py-24 px-4 sm:px-8">
        
        {/* Success Alert */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-16 p-8 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-[32px] flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 pointer-events-none" />
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-450 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <div className="text-center md:text-left">
                <span className="label-woven bg-emerald-100/50 dark:bg-emerald-900/35 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 mb-2">Success Code: 200 // TRANSMITTED</span>
                <h4 className="text-xl font-black text-stone-900 dark:text-white mt-1">Application Received Successfully</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-medium mt-1">Our review board has queued your registry entry. Expect a callback/email detailing onboarding criteria within 3-5 business days.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Section: Active Members Overview ── */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
             <div className="label-woven text-[9px] text-slate-600 dark:text-slate-400 bg-white/90">
               Ecosystem // Network Registry
             </div>
             <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
               Active Roster Nodes
             </h2>
             <p className="text-slate-650 dark:text-slate-400 text-base max-w-2xl mx-auto leading-relaxed font-semibold">
               A unified view of accredited stakeholders, leading mills, specialized training units, and expert training directors within our collaborative network.
             </p>

             {/* Registry Filters */}
             <div className="flex flex-wrap justify-center gap-3 pt-6">
                {[
                  { id: 'all', label: 'All Registry' },
                  { id: 'academic', label: 'Academic' },
                  { id: 'industry', label: 'Industry' },
                  { id: 'stakeholder', label: 'Stakeholders' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setRosterTab(tab.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      rosterTab === tab.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                        : 'bg-white/80 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
             </div>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="h-44 bg-white/70 dark:bg-stone-900/50 border border-stone-200/50 dark:border-stone-800 rounded-[28px] animate-pulse" />
               ))}
            </div>
          ) : getFilteredMembers().length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {getFilteredMembers().map((m) => (
                 <motion.div
                   key={m.id}
                   whileHover={{ y: -4 }}
                   className="group p-6 bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-[28px] shadow-sm relative overflow-hidden flex flex-col justify-between"
                 >
                    <div className="absolute top-0 right-0 p-3 opacity-15">
                      <FontAwesomeIcon icon={faHashtag} className="text-3xl text-stone-400" />
                    </div>
                    
                    <div className="flex items-start gap-4">
                       <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-950 border border-stone-200/40 dark:border-stone-800 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner">
                          {m.image_url ? (
                             <img src={m.image_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={m.name} />
                          ) : (
                             <span className="text-xl font-black text-rose-500 dark:text-rose-400 uppercase">{m.name[0]}</span>
                          )}
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-sm font-black text-stone-900 dark:text-white leading-tight group-hover:text-rose-500 dark:group-hover:text-rose-455 transition-colors">{m.name}</h4>
                          <p className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">{m.designation}</p>
                       </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                       <span className="text-[9px] font-black uppercase tracking-widest text-stone-450 bg-stone-50 dark:bg-stone-950 px-2.5 py-1.5 rounded-md border border-stone-200/20 dark:border-stone-850">
                         Node // {m.category}
                       </span>
                       <FontAwesomeIcon 
                         icon={
                           m.category === 'academic' ? faGraduationCap :
                           m.category === 'industry' ? faIndustry :
                           m.category === 'stakeholder' ? faHandshake : faUserTie
                         } 
                         className="text-stone-400 dark:text-stone-600 text-xs" 
                       />
                    </div>
                 </motion.div>
               ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800 rounded-[32px] space-y-3">
               <FontAwesomeIcon icon={faCompass} className="text-4xl text-stone-300 dark:text-stone-700 animate-pulse" />
               <p className="text-sm font-bold text-stone-500 dark:text-stone-450 italic">No registered nodes found in this filter category.</p>
            </div>
          )}
        </div>

        {/* ── Section: Inviting Membership ── */}
        {!selectedCategory && (
          <div className="mb-32 bg-stone-900 dark:bg-stone-950 rounded-[40px] p-8 lg:p-20 overflow-hidden relative border border-stone-850">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute -left-32 -bottom-32 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="text-center mb-16 space-y-4 relative z-10">
              <span className="label-woven bg-stone-800 border-stone-700 text-rose-400">Join the Collective</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">Inviting for Membership</h2>
              <p className="text-stone-400 text-base max-w-2xl mx-auto font-medium">
                Choose your specific pathway below to load the appropriate application protocol and transmit details to the registry.
              </p>
            </div>
  
            <div className="grid md:grid-cols-3 max-w-6xl mx-auto gap-8 relative z-10">
              {categories.map((cat) => {
                let borderTheme = 'border-stone-800 hover:border-rose-500/30';
                let iconTheme = 'text-rose-400 border-rose-500/20';
                let hoverIcon = 'group-hover:bg-rose-500 group-hover:text-white';
                
                if (cat.color === 'amber') {
                  borderTheme = 'border-stone-800 hover:border-amber-500/30';
                  iconTheme = 'text-amber-400 border-amber-500/20';
                  hoverIcon = 'group-hover:bg-amber-500 group-hover:text-white';
                } else if (cat.color === 'indigo') {
                  borderTheme = 'border-stone-800 hover:border-indigo-500/30';
                  iconTheme = 'text-indigo-400 border-indigo-500/20';
                  hoverIcon = 'group-hover:bg-indigo-500 group-hover:text-white';
                } else if (cat.color === 'emerald') {
                  borderTheme = 'border-stone-800 hover:border-emerald-500/30';
                  iconTheme = 'text-emerald-400 border-emerald-500/20';
                  hoverIcon = 'group-hover:bg-emerald-500 group-hover:text-white';
                }

                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className={`group bg-stone-900/50 backdrop-blur-md border ${borderTheme} p-8 rounded-[28px] text-left transition-all flex flex-col h-full cursor-pointer`}
                  >
                    <div className={`w-12 h-12 bg-stone-800 border ${iconTheme} rounded-xl flex items-center justify-center text-xl mb-6 group-hover:scale-105 transition-all duration-350 ${hoverIcon}`}>
                      <FontAwesomeIcon icon={cat.icon} />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-white/90">
                         {cat.name}
                      </h3>
                      <p className="text-stone-400 text-xs leading-relaxed font-semibold">
                        {cat.tagline}
                      </p>
                      <p className="text-stone-500 text-[11px] leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-stone-800/80 flex items-center justify-between w-full">
                      <span className="text-stone-450 font-bold text-[9px] uppercase tracking-widest group-hover:text-white transition-colors">
                        Launch Application
                      </span>
                      <FontAwesomeIcon icon={faArrowRight} className="text-stone-600 group-hover:text-white group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Dynamic Form Section ── */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div 
              ref={formRef} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="max-w-4xl mx-auto mb-32"
            >
              <div className="bg-white dark:bg-stone-900 rounded-[40px] shadow-xl overflow-hidden border border-stone-200/50 dark:border-stone-800 relative border-stitch">
                 
                 {/* Form Header */}
                 <div className="p-8 lg:p-12 bg-stone-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-950/20 to-stone-950 pointer-events-none" />
                    
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-16 h-16 bg-stone-900 text-rose-500 dark:text-rose-455 rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-stone-800">
                         <FontAwesomeIcon icon={categories.find(c => c.id === selectedCategory)?.icon} />
                      </div>
                      <div>
                         <span className="label-woven bg-stone-850 border-stone-750 text-rose-400 mb-2">Protocol // Membership Form</span>
                         <h2 className="text-2xl font-black uppercase tracking-tight mt-1.5">Apply as {categories.find(c => c.id === selectedCategory)?.name}</h2>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="w-11 h-11 bg-stone-900 border border-stone-850 hover:bg-stone-850 text-stone-400 hover:text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer relative z-10"
                    >
                      <FontAwesomeIcon icon={faXmark} className="text-lg" />
                    </button>
                 </div>

                 {/* Form Container */}
                 <div className="p-6 lg:p-14 space-y-10">
                    
                    {/* Academic Selection Sub-tab */}
                    {selectedCategory === 'academic' && (
                      <div className="p-6 bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200/50 dark:border-stone-800 flex flex-col sm:flex-row items-center gap-6">
                         <Label icon={faClipboardList}>Select Academic Entity Type</Label>
                         <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer group">
                               <input 
                                  type="radio" 
                                  name="academicSelection" 
                                  value="institute" 
                                  checked={academicType === 'institute'} 
                                  onChange={handleAcademicTypeChange}
                                  className="w-4 h-4 text-rose-600 focus:ring-rose-500 bg-white dark:bg-stone-900"
                               />
                               <span className="text-xs font-bold text-stone-600 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">Training Institute</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                               <input 
                                  type="radio" 
                                  name="academicSelection" 
                                  value="university" 
                                  checked={academicType === 'university'} 
                                  onChange={handleAcademicTypeChange}
                                  className="w-4 h-4 text-rose-600 focus:ring-rose-500 bg-white dark:bg-stone-900"
                               />
                               <span className="text-xs font-bold text-stone-600 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">College / University</span>
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
                      {selectedCategory === 'trainer' && (
                        <FreelanceTrainerForm 
                          onResumeChange={(file) => setResumeFile(file)} 
                          resumeName={resumeFile ? resumeFile.name : ''} 
                        />
                      )}
                      
                      {/* Action Buttons */}
                      <div className="pt-8 flex flex-col sm:flex-row gap-4 border-t border-stone-200/50 dark:border-stone-800">
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(null)}
                          className="w-full sm:w-1/3 px-8 py-4.5 border border-stone-200 dark:border-stone-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-stone-455 hover:bg-stone-50 dark:hover:bg-stone-950 transition-colors flex items-center justify-center gap-3 cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faArrowLeft} />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-2/3 px-8 py-4.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-550 hover:to-rose-450 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 shadow-lg shadow-rose-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-3 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Transmitting Data...
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon icon={faPaperPlane} />
                              Transmit Application
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default Membership;
