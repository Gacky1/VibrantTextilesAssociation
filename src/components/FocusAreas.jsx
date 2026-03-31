import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faIndustry, faLandmark, faSeedling, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const focusAreas = [
  {
    id: 1,
    title: 'Skill Development & Training',
    icon: faGraduationCap,
    desc: 'Empowering artisans with government-aligned vocational courses and heritage mastery.',
    grad: 'from-primary-500 to-primary-700',
    points: ['Artisan Workshops', 'Modern Tech Integration', 'Vocational Certification'],
  },
  {
    id: 2,
    title: 'Industry Support',
    icon: faIndustry,
    desc: 'Strategic resources and market linkages for MSMEs and textile vendors.',
    grad: 'from-accent-500 to-accent-600',
    points: ['Market Linkage', 'Strategic Mentorship'],
  },
  {
    id: 3,
    title: 'Policy Collaboration',
    icon: faLandmark,
    desc: 'Representing stakeholder interests in national policy-making and regulatory compliance.',
    grad: 'from-dark-500 to-dark-700',
    points: ['Grants Support', 'Trade Policy Advocacy'],
  },
  {
    id: 4,
    title: 'Heritage Preservation',
    icon: faSeedling,
    desc: 'Sustainable innovation while preserving traditional handloom and weaving techniques.',
    grad: 'from-accent-400 to-accent-600',
    points: ['Eco-friendly Dyeing', 'Craft Revival'],
  }
];

const FocusAreas = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="focus" className="relative py-32 lg:py-48 bg-[#090912] overflow-hidden">
      {/* Background Textures */}
      <div className="absolute inset-0 noise-overlay opacity-[0.15] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Section: Clean & Vertical Hierarchy */}
        <div className="max-w-4xl mb-24 space-y-8">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             className="flex items-center gap-4"
           >
              <div className="h-px w-12 bg-primary-500/50" />
              <span className="text-primary-500 font-black text-[11px] uppercase tracking-[0.6em]">The Strategic Core</span>
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             className="font-brodies text-[clamp(3.5rem,8vw,8rem)] text-white leading-[0.9] tracking-tighter"
           >
             Our Expertise <br /> <span className="text-primary-500 italic">Focus Verticals</span>
           </motion.h2>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={isInView ? { opacity: 1 } : {}}
             transition={{ delay: 0.3 }}
             className="text-white/50 text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl italic border-l-2 border-primary-500/20 pl-8"
           >
             "Architecting the path where ancient craftsmanship meets industrial precision and sustainable global growth."
           </motion.p>
        </div>

        {/* Structured Grid Layout (2-Column) */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
           {focusAreas.map((area, idx) => (
             <motion.div
               key={area.id}
               initial={{ opacity: 0, y: 30 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: idx * 0.1, duration: 0.8 }}
               whileHover={{ y: -12 }}
               className="group relative p-12 lg:p-16 rounded-[48px] bg-white/[0.02] border border-white/5 backdrop-blur-3xl overflow-hidden transition-all duration-500"
             >
                <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                <div className={`absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br ${area.grad} opacity-[0.03] group-hover:opacity-[0.08] blur-[80px] transition-all duration-700`} />
                
                <div className="relative z-10 flex flex-col h-full">
                   {/* Icon Container */}
                   <div className="flex items-start justify-between mb-12">
                      <div className={`w-20 h-20 bg-gradient-to-br ${area.grad} rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-black/20 group-hover:rotate-6 transition-transform duration-500`}>
                         <FontAwesomeIcon icon={area.icon} />
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-primary-500/50 group-hover:text-primary-500 transition-all">
                         <FontAwesomeIcon icon={faArrowRight} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                      </div>
                   </div>
                   
                   {/* Text Block: Improved Scannability */}
                   <div className="space-y-8 flex-grow">
                      <div className="space-y-4">
                         <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none group-hover:text-primary-400 transition-colors">
                           {area.title}
                         </h3>
                         <div className="h-0.5 w-12 bg-primary-600/30 group-hover:w-20 transition-all duration-500" />
                      </div>
                      
                      <p className="text-white/60 text-lg lg:text-xl font-medium leading-relaxed italic">
                        "{area.desc}"
                      </p>
                      
                      {/* Sub-points for depth */}
                      <div className="flex flex-wrap gap-3 pt-6">
                         {area.points.map((pt, i) => (
                           <span key={i} className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-widest text-primary-500/80">
                              {pt}
                           </span>
                         ))}
                      </div>
                   </div>
                   
                   {/* Action (Teaser) */}
                   <div className="mt-12 pt-12 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-4">
                        The Protocol
                        <div className="h-px w-8 bg-white/20" />
                      </span>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
