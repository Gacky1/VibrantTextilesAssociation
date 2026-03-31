import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/VTC TRANSPARENT.svg';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Textile', path: '/about-textile' },
  { name: 'Events/Fair', path: '/events' },
  { name: 'Members', path: '/members' },
];

const resources = [
  { name: 'Skill Dev', path: '/skill-development' },
  { name: 'Media', path: '/media' },
  { name: 'Research', path: '/research' },
  { name: 'Contact', path: '/contact' },
];

const socials = [
  { icon: faFacebookF, href: '#', label: 'Facebook' },
  { icon: faTwitter, href: '#', label: 'Twitter' },
  { icon: faLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: faInstagram, href: '#', label: 'Instagram' },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-dark-900 pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Micro-Textures */}
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
      <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />
      
      {/* Ambiance Blur */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24 items-start">
          
          {/* Brand & Mission: 5 cols */}
          <div className="lg:col-span-5 space-y-12">
            <Link to="/" className="inline-block group relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4"
              >
                <img src={logo} alt="VTC" className="h-10 w-auto brightness-0 invert" />
                <div className="flex flex-col leading-none text-white">
                  <span className="font-brodies text-xl">Vibrant Textiles</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Association</span>
                </div>
              </motion.div>
            </Link>
            
            <p className="font-brodies text-2xl lg:text-3xl text-white leading-tight max-w-sm">
              Weaving the rhythmic pulse of <span className="text-primary-500 italic">Civilization's heartbeat</span> since 1998.
            </p>

            <div className="flex items-center gap-5">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary-500 hover:border-primary-500/50 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid: 7 cols */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
             
             {/* Navigation */}
             <div className="space-y-8">
               <h4 className="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Navigator</h4>
               <ul className="space-y-4">
                 {quickLinks.map((link) => (
                   <li key={link.name}>
                     <Link 
                       to={link.path} 
                       className="text-white/40 hover:text-white font-bold text-[15px] transition-all duration-300 flex items-center gap-3 group"
                     >
                       <div className="w-0 h-[1.5px] bg-primary-500 group-hover:w-3 transition-all" />
                       {link.name}
                     </Link>
                   </li>
                 ))}
               </ul>
             </div>

             {/* Ecosystem */}
             <div className="space-y-8">
                <h4 className="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">Ecosystem</h4>
                <ul className="space-y-4">
                  {resources.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.path} 
                        className="text-white/40 hover:text-white font-bold text-[15px] transition-all duration-300 flex items-center gap-3 group"
                      >
                        <div className="w-0 h-[1.5px] bg-primary-500 group-hover:w-3 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
             </div>

             {/* Pulse / Newsletter */}
             <div className="space-y-8">
               <h4 className="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em]">The Pulse</h4>
               <div className="relative group">
                 <input 
                   type="email" 
                   placeholder="Your industry email"
                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-[13px] font-bold focus:outline-none focus:border-primary-500/50 transition-all placeholder:text-white/10"
                 />
                 <motion.button
                   whileHover={{ x: 5 }}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-500"
                 >
                   <FontAwesomeIcon icon={faArrowRight} />
                 </motion.button>
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Join the Collective Network</p>
             </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col items-center md:items-start gap-1">
             <span className="text-white/20 text-[13px] font-bold">© {new Date().getFullYear()} Vibrant Textiles Association.</span>
             <span className="text-white/10 text-[9px] font-black uppercase tracking-[0.3em]">Redefining Legacy. Innovation by Antigravity.</span>
           </div>

           <div className="flex items-center gap-10">
              <Link to="/privacy" className="text-white/20 hover:text-white/40 text-[10px] font-black uppercase tracking-widest transition-all">Privacy</Link>
              <Link to="/terms" className="text-white/20 hover:text-white/40 text-[10px] font-black uppercase tracking-widest transition-all">Terms</Link>
              
              <motion.button
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-primary-500 transition-all"
                aria-label="Scroll to top"
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </motion.button>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
