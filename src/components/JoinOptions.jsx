import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBuilding, faCheckCircle, faArrowRight, faBriefcase, faCompass } from '@fortawesome/free-solid-svg-icons';
import { usePortal } from '../context/PortalContext';

const JoinOptions = () => {
  const { portalMode, setPortalMode } = usePortal();

  return (
    <section id="portal-select" className="py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden text-white">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="section-container relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge inline-block bg-white/5 border border-white/10 text-rose-400 py-1.5 px-4 rounded-full text-xs font-black uppercase tracking-wider mb-4">
            Portal Gateway
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Partnering for Industrial Growth
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Select your entry pathway to unlock dedicated tools, tailored frameworks, and customized resources. Switching below updates the portal experience instantly.
          </p>
        </div>

        {/* Dynamic Option Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Card A: Academy Partner */}
          <motion.div
            onClick={() => setPortalMode('academy')}
            whileHover={{ y: -6, scale: 1.01 }}
            className={`cursor-pointer rounded-3xl p-8 border backdrop-blur-md transition-all duration-500 relative flex flex-col justify-between min-h-[320px] ${
              portalMode === 'academy'
                ? 'bg-slate-900 border-rose-500/40 shadow-2xl shadow-rose-500/5'
                : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100 hover:border-white/20'
            }`}
          >
            {/* Top row */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-colors duration-300 ${
                  portalMode === 'academy' ? 'bg-rose-500 text-white' : 'bg-white/5 text-slate-300'
                }`}>
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                {portalMode === 'academy' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-rose-400 text-xl">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </motion.div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black mb-3">Join us as Academy Partner</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Accreditation paths, dynamic textile education, skilling frameworks (RPL & assessments), modern apprenticeship standards, and institutional student placements.
                </p>
              </div>
            </div>

            {/* Bottom State */}
            <div className="mt-8 flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-wider transition-colors ${
                portalMode === 'academy' ? 'text-rose-400' : 'text-slate-400'
              }`}>
                {portalMode === 'academy' ? 'Active Portal' : 'Click to Enter'}
              </span>
              <FontAwesomeIcon icon={faArrowRight} className={`text-xs transition-transform ${
                portalMode === 'academy' ? 'translate-x-1 text-rose-400' : 'text-slate-400'
              }`} />
            </div>

            {/* Accent glowing border overlay for active state */}
            {portalMode === 'academy' && (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500 rounded-b-3xl" />
            )}
          </motion.div>

          {/* Card B: Industry Partner */}
          <motion.div
            onClick={() => setPortalMode('industry')}
            whileHover={{ y: -6, scale: 1.01 }}
            className={`cursor-pointer rounded-3xl p-8 border backdrop-blur-md transition-all duration-500 relative flex flex-col justify-between min-h-[320px] ${
              portalMode === 'industry'
                ? 'bg-slate-900 border-indigo-500/40 shadow-2xl shadow-indigo-500/5'
                : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100 hover:border-white/20'
            }`}
          >
            {/* Top row */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-colors duration-300 ${
                  portalMode === 'industry' ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-300'
                }`}>
                  <FontAwesomeIcon icon={faBuilding} />
                </div>
                {portalMode === 'industry' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-indigo-400 text-xl">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </motion.div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-black mb-3">Join us as an Industry</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Drive cluster integration, manage industrial textile manufacturing, share event media, access trade publications, and leverage policy bridges.
                </p>
              </div>
            </div>

            {/* Bottom State */}
            <div className="mt-8 flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-wider transition-colors ${
                portalMode === 'industry' ? 'text-indigo-400' : 'text-slate-400'
              }`}>
                {portalMode === 'industry' ? 'Active Portal' : 'Click to Enter'}
              </span>
              <FontAwesomeIcon icon={faArrowRight} className={`text-xs transition-transform ${
                portalMode === 'industry' ? 'translate-x-1 text-indigo-400' : 'text-slate-400'
              }`} />
            </div>

            {/* Accent glowing border overlay for active state */}
            {portalMode === 'industry' && (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-b-3xl" />
            )}
          </motion.div>

        </div>

        {/* 2 Central CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          <Link to="/membership">
            <button className="btn-primary py-4 px-10 rounded-full font-black text-sm flex items-center gap-2.5 group shadow-lg">
              <FontAwesomeIcon icon={faBriefcase} className="text-xs text-white/80 group-hover:scale-110 transition-transform" />
              <span>Become A Member</span>
              <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link to="/skill-development">
            <button className="btn-secondary py-4 px-10 rounded-full font-black text-sm flex items-center gap-2.5 border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-slate-950 transition-all duration-300">
              <FontAwesomeIcon icon={faCompass} className="text-xs text-gray-300 group-hover:rotate-45 transition-transform duration-300" />
              <span>Explore Opportunities</span>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default JoinOptions;
