import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faPaperPlane, 
  faGlobe, 
  faClock, 
  faCheckCircle, 
  faChevronDown,
  faBuilding,
  faGraduationCap,
  faHandshake,
  faCompass
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { usePortal } from '../context/PortalContext';

const Contact = () => {
  const { portalMode } = usePortal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dynamic Theme Mapping
  const isIndustry = portalMode === 'industry';
  
  const textAccent = isIndustry 
    ? 'text-indigo-600 dark:text-indigo-400' 
    : 'text-rose-600 dark:text-rose-400';

  const hoverAccent = isIndustry
    ? 'group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500'
    : 'group-hover:bg-rose-600 group-hover:text-white dark:group-hover:bg-rose-500';

  const borderAccent = isIndustry
    ? 'border-indigo-100 dark:border-indigo-950/50 group-hover:border-indigo-500/20'
    : 'border-rose-100 dark:border-rose-950/50 group-hover:border-rose-500/20';

  const inputFocus = isIndustry
    ? 'focus:border-indigo-500 focus:ring-indigo-500/10'
    : 'focus:border-rose-500 focus:ring-rose-500/10';

  const buttonAccent = isIndustry
    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:shadow-indigo-500/25 focus:ring-indigo-500/20'
    : 'bg-gradient-to-r from-rose-600 to-rose-700 hover:shadow-rose-500/25 focus:ring-rose-500/20';

  const contactInfo = [
    { 
      icon: faPhone, 
      label: 'Voice Transmission', 
      val: '+91 123 456 7890', 
      sub: 'Mon - Sat, 10AM - 6PM IST',
      iconColor: isIndustry ? 'text-indigo-500' : 'text-rose-500'
    },
    { 
      icon: faEnvelope, 
      label: 'Digital Registry', 
      val: 'contact@vibranttextiles.org', 
      sub: 'Official Communication Channel',
      iconColor: isIndustry ? 'text-violet-500' : 'text-pink-500'
    },
    { 
      icon: faMapMarkerAlt, 
      label: 'Central Hub', 
      val: 'New Delhi, India', 
      sub: 'Strategic HQ Coordinates',
      iconColor: 'text-amber-500'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all transmission fields.');
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setFormData({
      name: '',
      email: '',
      subject: 'general',
      message: ''
    });

    setTimeout(() => {
      setShowSuccess(false);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <PageHero
        eyebrow="The Nexus"
        title="Connect & Collaborate"
        subtitle="Establishing direct transmission protocols with the association."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* ── Left Column: Contact Form ── */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-solid ${
                isIndustry 
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100/50 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-100/50 dark:border-rose-900/30 text-rose-600 dark:text-rose-455'
              }`}>
                The Protocol
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Send Signal
              </h2>
              <p className={`text-slate-650 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-xl italic border-l-4 pl-6 my-6 ${
                isIndustry ? 'border-indigo-500' : 'border-rose-500'
              }`}>
                "Initiate direct communication with our technical and administrative councils."
              </p>
            </div>

            {/* Success message overlay */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {showSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 p-8 lg:p-12 text-center rounded-[32px] shadow-xl space-y-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500" />
                    <motion.div
                      initial={{ rotate: -15, scale: 0.5 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 bg-emerald-500 dark:bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25"
                    >
                      <FontAwesomeIcon icon={faCheckCircle} className="text-4xl" />
                    </motion.div>
                    <div className="space-y-3">
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Signal Transmitted</h4>
                      <p className="text-slate-600 dark:text-slate-350 text-sm font-semibold max-w-md mx-auto leading-relaxed">
                        Your communication payload has been securely queued. Expect an administrative coordinator to establish contact within 24-48 business hours.
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowSuccess(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-card bg-white/70 dark:bg-stone-900/60 border border-stone-200/50 dark:border-stone-850 p-8 lg:p-12 rounded-[32px] shadow-2xl relative"
                  >
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Identify (Name)</label>
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Full Name" 
                            className={`w-full bg-slate-50 dark:bg-stone-950 border border-stone-200/50 dark:border-stone-850 rounded-xl px-5 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 transition-all font-semibold ${inputFocus}`} 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Channel (Email)</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Email Address" 
                            className={`w-full bg-slate-50 dark:bg-stone-950 border border-stone-200/50 dark:border-stone-850 rounded-xl px-5 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 transition-all font-semibold ${inputFocus}`} 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Reason for Connection</label>
                        <div className="relative">
                          <select 
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className={`w-full appearance-none bg-slate-50 dark:bg-stone-950 border border-stone-200/50 dark:border-stone-850 rounded-xl px-5 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all font-semibold cursor-pointer ${inputFocus}`}
                          >
                            <option value="general">General Inquiries</option>
                            <option value="partnership">Registry & Partnerships</option>
                            <option value="skilling">Academia / Skilling Queries</option>
                            <option value="industry">Corporate Collaboration</option>
                          </select>
                          <FontAwesomeIcon icon={faChevronDown} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest ml-1">Transmission Body (Message)</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows="5" 
                          placeholder="Type your message..." 
                          className={`w-full bg-slate-50 dark:bg-stone-950 border border-stone-200/50 dark:border-stone-850 rounded-xl px-5 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 transition-all font-semibold resize-none ${inputFocus}`}
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full py-4 text-xs font-black uppercase tracking-widest text-white rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-3 ${buttonAccent} disabled:opacity-50`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Transmitting...
                          </>
                        ) : (
                          <>
                            Send Signal
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right Column: Hub Coordinates ── */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-solid ${
                  isIndustry 
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100/50 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-100/50 dark:border-rose-900/30 text-rose-600 dark:text-rose-455'
                }`}>
                  The Coordinates
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase leading-tight">
                  Transmission <span className={textAccent}>Hub</span>
                </h2>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className={`group flex items-center gap-6 p-5 border rounded-2xl bg-white/50 dark:bg-stone-900/50 transition-all duration-300 ${borderAccent}`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-stone-950 flex items-center justify-center text-lg border border-stone-200/50 dark:border-stone-850 shadow-sm transition-all duration-300 ${hoverAccent}`}>
                      <FontAwesomeIcon icon={info.icon} className={info.iconColor} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-slate-400 dark:text-slate-550 font-bold text-[8px] uppercase tracking-widest">{info.label}</p>
                      <p className="text-slate-800 dark:text-slate-200 text-lg font-black tracking-tight">{info.val}</p>
                      <p className="text-slate-500 dark:text-slate-450 text-[10px] italic font-semibold">{info.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Clock */}
            <div className="glass-card p-6 bg-slate-900 dark:bg-stone-950 border-none shadow-xl flex items-center gap-6 rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full border border-amber-500/25 flex items-center justify-center relative flex-shrink-0">
                <FontAwesomeIcon icon={faClock} className="text-amber-500 text-base" />
                <div className="absolute inset-[-2px] border border-amber-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <div className="space-y-0.5">
                <p className="text-white font-black text-base uppercase tracking-tight">Global Uptime</p>
                <p className="text-amber-400 text-[10px] font-black uppercase tracking-wider">Industrial Processing Active</p>
              </div>
            </div>
            
            <div className="p-8 border border-dashed border-stone-250 dark:border-stone-800 rounded-[28px] text-center space-y-3 bg-white/20 dark:bg-stone-950/20">
              <FontAwesomeIcon icon={faGlobe} className="text-stone-300 dark:text-stone-700 text-3xl animate-pulse" />
              <p className="text-stone-500 dark:text-stone-400 text-xs font-semibold italic">"Connecting the rhythmic threads of the global textile civilization."</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
