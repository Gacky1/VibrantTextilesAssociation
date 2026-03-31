import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faHandshake, faLightbulb, faChartLine, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const missions = [
  {
    icon: faBullseye,
    title: 'Empower',
    color: 'from-blue-500 to-blue-600',
    text: "Empower India's textile sector by supporting vendors, artisans, and industry stakeholders with skills and resources.",
    size: 'lg:col-span-2'
  },
  {
    icon: faHandshake,
    title: 'Connect',
    color: 'from-primary-500 to-primary-700',
    text: "Act as a platform for collaboration between government, industry, and grassroots communities.",
    size: 'lg:col-span-1'
  },
  {
    icon: faLightbulb,
    title: 'Innovate',
    color: 'from-accent-500 to-accent-700',
    text: "Promote innovation and sustainability while preserving traditional textile knowledge.",
    size: 'lg:col-span-1'
  },
  {
    icon: faChartLine,
    title: 'Grow',
    color: 'from-emerald-500 to-emerald-700',
    text: "Contribute towards employment generation and long-term sector growth across India.",
    size: 'lg:col-span-2'
  },
];

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="mission" className="relative py-32 lg:py-52 bg-dark-900 overflow-hidden">
      {/* Texture Layer */}
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
      <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />
      
      {/* Floating Light Blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
           <motion.div
             initial={{ opacity: 0, letterSpacing: '0.1em' }}
             animate={isInView ? { opacity: 1, letterSpacing: '0.6em' } : {}}
             className="text-primary-500 font-black text-[10px] uppercase tracking-[0.6em]"
           >
             The Visionary Foundation
           </motion.div>
           
           <motion.h2
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             className="text-white text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-tighter"
           >
             Driving <span className="font-brodies text-primary-500 text-[1.2em]">Sustainable</span> Growth
           </motion.h2>
           
           <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '80px' } : {}}
              className="h-[2px] bg-primary-500/40"
           />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
           {missions.map((m, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 40 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
               whileHover={{ y: -10, scale: 1.02 }}
               className={`group relative glass rounded-[40px] p-10 border-white/5 overflow-hidden flex flex-col min-h-[320px] transition-all duration-500 ${m.size}`}
             >
                <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
                
                {/* Accent Glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${m.color} blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

                <div className="relative z-10 flex flex-col h-full">
                   <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-2xl shadow-2xl group-hover:rotate-12 transition-transform duration-500 mb-8`}>
                      <FontAwesomeIcon icon={m.icon} />
                   </div>
                   
                   <h3 className="text-white font-brodies text-4xl mb-4 group-hover:text-primary-500 transition-colors">
                     {m.title}
                   </h3>
                   
                   <p className="text-white/50 font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                     {m.text}
                   </p>

                   <div className="mt-auto pt-8 flex items-center gap-3 text-primary-500 font-black text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                     Learn More
                     <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Background Decorative Signature */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
         <span className="font-brodies text-[40vw] text-white leading-none">Vision</span>
      </div>
    </section>
  );
};

export default Mission;
