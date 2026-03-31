import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane, faGlobe, faClock } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

const Contact = () => {
  const contactInfo = [
    { icon: faPhone, label: 'Voice Transmission', val: '+91 123 456 7890', sub: 'Available 10AM - 6PM IST' },
    { icon: faEnvelope, label: 'Digital Registry', val: 'contact@vibranttextiles.org', sub: 'Global Inquiries' },
    { icon: faMapMarkerAlt, label: 'Central Hub', val: 'New Delhi, India', sub: 'Strategic Headquarters' }
  ];

  return (
    <div className="min-h-screen bg-dark-950 selection:bg-primary-500/20 selection:text-white">
      <Navbar />
      <PageHero
        eyebrow="The Nexus"
        title="Connect & Collaborate"
        subtitle="Establishing direct transmission protocols with the association."
      />

      <div className="relative overflow-hidden">
         {/* Global Grain Layers */}
         <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-52 relative z-10">
            <div className="grid lg:grid-cols-12 gap-20 lg:gap-32 items-start">
               
               {/* ── Left Column: Transmission Form ── */}
               <div className="lg:col-span-7 space-y-20">
                  <div className="space-y-10 max-w-2xl">
                     <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] block mb-4">The Protocol</span>
                     <h2 className="font-brodies text-6xl lg:text-8xl text-white leading-[0.8] tracking-tighter">
                        Send <br /> <span className="text-primary-500 italic">Signal</span>
                     </h2>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass rounded-[48px] p-12 lg:p-16 border-white/5 relative overflow-hidden"
                  >
                     <div className="absolute inset-0 noise-overlay opacity-5" />
                     <div className="relative z-10">
                        <form className="space-y-10">
                           <div className="grid md:grid-cols-2 gap-10">
                              <div className="space-y-4">
                                 <label className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em] ml-2">Identify</label>
                                 <input type="text" placeholder="Full Name" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-6 text-white focus:outline-none focus:border-primary-500/50 transition-colors uppercase text-[12px] font-bold tracking-widest" />
                              </div>
                              <div className="space-y-4">
                                 <label className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em] ml-2">Channel</label>
                                 <input type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-6 text-white focus:outline-none focus:border-primary-500/50 transition-colors uppercase text-[12px] font-bold tracking-widest" />
                              </div>
                           </div>
                           <div className="space-y-4">
                               <label className="text-white/20 font-black text-[10px] uppercase tracking-[0.4em] ml-2">Transmission Body</label>
                               <textarea rows="5" placeholder="Your Message" className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-8 py-6 text-white focus:outline-none focus:border-primary-500/50 transition-colors uppercase text-[12px] font-bold tracking-widest"></textarea>
                           </div>

                           <motion.button
                             whileHover={{ scale: 1.02 }}
                             whileTap={{ scale: 0.98 }}
                             className="group relative w-full py-8 bg-white text-dark-950 rounded-3xl font-sans font-black text-[13px] uppercase tracking-[0.5em] shadow-[0_20px_60px_rgba(255,255,255,0.1)] overflow-hidden"
                           >
                              <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                              <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-6">
                                 Send Signal
                                 <FontAwesomeIcon icon={faPaperPlane} className="text-lg group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform" />
                              </span>
                           </motion.button>
                        </form>
                     </div>
                  </motion.div>
               </div>

               {/* ── Right Column: Hub Coordinates ── */}
               <div className="lg:col-span-5 space-y-24">
                  <div className="space-y-16">
                     <div className="space-y-6">
                        <span className="text-white/20 font-black text-[10px] uppercase tracking-[0.5em]">The Nexus</span>
                        <h2 className="font-brodies text-6xl text-white tracking-tighter leading-none">Transmission <span className="text-primary-500 italic">Hub</span></h2>
                     </div>

                     <div className="space-y-12">
                        {contactInfo.map((info, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ x: 15 }}
                            className="group flex items-start gap-10"
                          >
                             <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary-500 text-xl border border-white/5 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                                <FontAwesomeIcon icon={info.icon} />
                             </div>
                             <div className="space-y-2">
                                <p className="text-white/20 font-black text-[9px] uppercase tracking-[0.4em]">{info.label}</p>
                                <p className="text-white text-2xl font-bold tracking-tight">{info.val}</p>
                                <p className="text-white/30 text-[11px] italic font-medium">{info.sub}</p>
                             </div>
                          </motion.div>
                        ))}
                     </div>
                  </div>

                  {/* Operational Clock */}
                  <div className="glass rounded-[40px] p-12 border-white/5 relative overflow-hidden">
                     <div className="absolute inset-0 noise-overlay opacity-5" />
                     <div className="relative z-10 flex items-center gap-10">
                        <div className="w-16 h-16 rounded-full border border-primary-500/20 flex items-center justify-center">
                           <FontAwesomeIcon icon={faClock} className="text-primary-500 animate-spin-slow" />
                        </div>
                        <div>
                           <p className="text-white font-bold text-lg tracking-tight">Global Uptime</p>
                           <p className="text-white/30 text-xs italic font-medium">Standard Industrial Processing Intervals Active</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
