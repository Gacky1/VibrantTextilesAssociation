import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding, faEnvelope, faPhone, faUser, faMapMarkerAlt,
  faCheckCircle, faArrowRight, faArrowLeft, faXmark, faPaperPlane,
  faBriefcase, faGlobe
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

/* ─── shared input class ─── */
const inp = 'w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:bg-white transition-all duration-200 hover:border-gray-300';
const sel = `${inp} appearance-none cursor-pointer`;

const categories = [
  {
    id: 'government',
    name: 'Government & Policy Bodies',
    icon: '🏛️',
    tagline: 'Departments, policy makers & regulatory bodies',
    gradient: 'from-blue-500 to-blue-600',
    border: 'border-blue-200',
    glow: 'hover:shadow-blue-100',
    members: [
      { name: 'Ministry of Textiles', logo: '🏛️', type: 'Government' },
      { name: 'Textile Commissioner Office', logo: '📋', type: 'Regulatory' },
      { name: 'National Handloom Board', logo: '🧵', type: 'Board' },
    ],
  },
  {
    id: 'industry',
    name: 'Industry & Corporate Partners',
    icon: '🏭',
    tagline: 'Manufacturers, exporters & corporates',
    gradient: 'from-primary-500 to-primary-600',
    border: 'border-primary-200',
    glow: 'hover:shadow-primary-100',
    members: [
      { name: 'Textile Mills Association', logo: '⚙️', type: 'Association' },
      { name: 'Export Promotion Council', logo: '🌍', type: 'Council' },
      { name: 'Fabric Manufacturers Ltd', logo: '🏭', type: 'Corporate' },
    ],
  },
  {
    id: 'support',
    name: 'Support Organizations',
    icon: '🤝',
    tagline: 'NGOs, training institutes & support bodies',
    gradient: 'from-accent-500 to-accent-600',
    border: 'border-accent-200',
    glow: 'hover:shadow-accent-100',
    members: [
      { name: 'Artisan Welfare Society', logo: '❤️', type: 'NGO' },
      { name: 'Textile Training Institute', logo: '🎓', type: 'Education' },
      { name: 'Handloom Development Corp', logo: '🤝', type: 'Support' },
    ],
  },
];

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh','Puducherry',
];

/* ─── Label helper ─── */
const Label = ({ icon, children }) => (
  <label className="flex items-center gap-2 text-gray-700 text-sm font-semibold mb-1.5">
    <FontAwesomeIcon icon={icon} className="text-primary-400 text-xs" />
    {children}
  </label>
);

/* ─── Reusable form fields per category ─── */
const GovernmentForm = () => (
  <>
    <div>
      <Label icon={faBuilding}>Organization Name *</Label>
      <input type="text" required placeholder="e.g. Ministry of Textiles" className={inp} />
    </div>
    <div>
      <Label icon={faMapMarkerAlt}>Organization Address *</Label>
      <textarea required rows="3" placeholder="Full address including city and PIN code" className={`${inp} resize-none`} />
    </div>
    <div>
      <Label icon={faGlobe}>State *</Label>
      <select required className={sel}>
        <option value="">Select State</option>
        {indianStates.map(s => <option key={s}>{s}</option>)}
      </select>
    </div>
    <div>
      <Label icon={faUser}>Decision Maker Name *</Label>
      <input type="text" required placeholder="Full name of decision maker" className={inp} />
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label icon={faPhone}>Contact Number *</Label>
        <input type="tel" required placeholder="+91 XXXXX XXXXX" className={inp} />
      </div>
      <div>
        <Label icon={faEnvelope}>Email Address *</Label>
        <input type="email" required placeholder="official@org.gov.in" className={inp} />
      </div>
    </div>
    <div>
      <Label icon={faBriefcase}>Additional Information</Label>
      <textarea rows="3" placeholder="Any additional context you'd like to share" className={`${inp} resize-none`} />
    </div>
  </>
);

const IndustryForm = () => (
  <>
    <div>
      <Label icon={faBuilding}>Company Name *</Label>
      <input type="text" required placeholder="Your company or trade name" className={inp} />
    </div>
    <div>
      <Label icon={faBriefcase}>Sub-Sector *</Label>
      <select required className={sel}>
        <option value="">Select Sub-Sector</option>
        <option>Handloom & Traditional Textiles</option>
        <option>Powerloom & Mechanized Textiles</option>
        <option>Apparel & Garments</option>
        <option>Home Textiles & Furnishings</option>
        <option>Technical & Industrial Textiles</option>
        <option>Natural Fibres & Yarn</option>
      </select>
    </div>
    <div>
      <Label icon={faMapMarkerAlt}>Head Office Address *</Label>
      <textarea required rows="3" placeholder="Complete address of head office" className={`${inp} resize-none`} />
    </div>
    <div>
      <Label icon={faGlobe}>Partnering Interest *</Label>
      <select required className={sel}>
        <option value="">Select Area of Interest</option>
        <option>Skill Development</option>
        <option>Market Linkage</option>
        <option>Technology Transfer</option>
        <option>Export Promotion</option>
        <option>Research & Innovation</option>
        <option>Policy Advocacy</option>
      </select>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label icon={faUser}>Decision Maker Name *</Label>
        <input type="text" required placeholder="Full name" className={inp} />
      </div>
      <div>
        <Label icon={faBriefcase}>Designation *</Label>
        <input type="text" required placeholder="e.g. Managing Director" className={inp} />
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label icon={faPhone}>Contact Number *</Label>
        <input type="tel" required placeholder="+91 XXXXX XXXXX" className={inp} />
      </div>
      <div>
        <Label icon={faEnvelope}>Email Address *</Label>
        <input type="email" required placeholder="work@company.com" className={inp} />
      </div>
    </div>
    <div>
      <Label icon={faBriefcase}>Additional Information</Label>
      <textarea rows="3" placeholder="Any additional context" className={`${inp} resize-none`} />
    </div>
  </>
);

const SupportForm = () => (
  <>
    <div>
      <Label icon={faBriefcase}>Organization Type *</Label>
      <select required className={sel}>
        <option value="">Select Type</option>
        <option>NGO</option>
        <option>Training Institute</option>
        <option>Research Organization</option>
        <option>Development Agency</option>
        <option>Cooperative Society</option>
        <option>Other</option>
      </select>
    </div>
    <div>
      <Label icon={faBuilding}>Organization Name *</Label>
      <input type="text" required placeholder="Full organization name" className={inp} />
    </div>
    <div>
      <Label icon={faMapMarkerAlt}>Organization Address *</Label>
      <textarea required rows="3" placeholder="Full address including city and PIN code" className={`${inp} resize-none`} />
    </div>
    <div>
      <Label icon={faGlobe}>State *</Label>
      <select required className={sel}>
        <option value="">Select State</option>
        {indianStates.map(s => <option key={s}>{s}</option>)}
      </select>
    </div>
    <div>
      <Label icon={faUser}>Decision Maker Name *</Label>
      <input type="text" required placeholder="Full name of decision maker" className={inp} />
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label icon={faPhone}>Contact Number *</Label>
        <input type="tel" required placeholder="+91 XXXXX XXXXX" className={inp} />
      </div>
      <div>
        <Label icon={faEnvelope}>Email Address *</Label>
        <input type="email" required placeholder="contact@org.in" className={inp} />
      </div>
    </div>
    <div>
      <Label icon={faBriefcase}>Additional Information</Label>
      <textarea rows="3" placeholder="Any additional context" className={`${inp} resize-none`} />
    </div>
  </>
);

const formMap = { government: GovernmentForm, industry: IndustryForm, support: SupportForm };

/* ─── Main Component ─── */
const Membership = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  const activeCat = categories.find(c => c.id === selectedCategory);
  const FormComponent = selectedCategory ? formMap[selectedCategory] : null;

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setSelectedCategory(null);
    setTimeout(() => setShowSuccess(false), 6000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCategories = activeFilter === 'all'
    ? categories
    : categories.filter(c => c.id === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero
        eyebrow="Apply Today"
        title="Join Our Community"
        subtitle="Become a part of India's leading textile association and transform the industry together"
      />

      {/* ── Success toast ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-2xl shadow-2xl font-semibold"
          >
            <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
            Application submitted successfully! We'll be in touch shortly.
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Active Members ── */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-badge mb-4">Our Network</span>
            <h2 className="section-heading text-[clamp(1.8rem,4vw,3rem)] text-gray-900">Active Members</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Join a diverse community of industry leaders and changemakers</p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[{ id: 'all', name: 'All Members', icon: '' }, ...categories].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === cat.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {cat.icon && <span className="mr-1.5">{cat.icon}</span>}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {filteredCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Category header */}
                <div className={`bg-gradient-to-r ${cat.gradient} rounded-2xl p-6 mb-5 flex items-center gap-4`}>
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                    <p className="text-white/75 text-sm mt-0.5">{cat.tagline}</p>
                  </div>
                </div>
                {/* Member cards */}
                <div className="grid md:grid-cols-3 gap-5">
                  {cat.members.map((m, mIdx) => (
                    <motion.div
                      key={mIdx}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] transition-all"
                    >
                      <div className="text-4xl mb-3">{m.logo}</div>
                      <h4 className="text-base font-bold text-gray-900 mb-2">{m.name}</h4>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${cat.gradient} text-white`}>
                        {m.type}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category Selection ── */}
      {!selectedCategory && (
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="section-badge mb-4">Step 1 of 2</span>
              <h2 className="section-heading text-[clamp(1.8rem,4vw,3rem)] text-gray-900">Choose Your Category</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">Select the membership category that best describes your organization</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`group relative text-left rounded-[24px] p-8 border-2 bg-white ${cat.border} hover:border-transparent hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden`}
                >
                  {/* Gradient fill on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
                  <div className="relative">
                    <span className="text-5xl mb-5 block">{cat.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">{cat.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{cat.tagline}</p>
                    <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${cat.gradient} shadow-md group-hover:shadow-lg transition-shadow`}>
                      Apply Now
                      <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Application Form ── */}
      {selectedCategory && (
        <div ref={formRef} className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Form card */}
              <div className="bg-white rounded-[28px] shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">

                {/* Coloured header strip */}
                <div className={`bg-gradient-to-r ${activeCat?.gradient} px-10 py-8`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{activeCat?.icon}</span>
                      <div>
                        <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Step 2 of 2 — Membership Application</p>
                        <h2 className="text-white text-xl font-bold">{activeCat?.name}</h2>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>

                {/* Form body */}
                <div className="px-10 py-10">
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Please fill in the details below accurately. Our team will review your application and reach out within <strong className="text-gray-700">3–5 business days</strong>.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {FormComponent && <FormComponent />}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Back
                      </button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${activeCat?.gradient} shadow-[0_8px_24px_rgba(229,46,34,0.25)] hover:shadow-[0_14px_36px_rgba(229,46,34,0.35)] transition-all duration-300`}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Submit Application
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Trust note */}
              <p className="text-center text-gray-400 text-xs mt-6 flex items-center justify-center gap-1.5">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
                Your information is secure and will only be used for membership processing.
              </p>
            </motion.div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Membership;
