import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/text_white.png';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Textile', path: '/about-textile' },
  { name: 'Events/Fair', path: '/events' },
  { name: 'Members', path: '/members' },
];

const resources = [
  { name: 'Skill Development', path: '/skill-development' },
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

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to}>
      <motion.div
        whileHover={{ x: 6 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="flex items-center gap-2.5 text-gray-400 hover:text-white text-sm font-medium py-1 group transition-colors duration-200"
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-[10px] text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-200"
        />
        {children}
      </motion.div>
    </Link>
  </li>
);

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#050508] pt-28 pb-12 overflow-hidden">
      {/* === BACKGROUND AMBIANCE === */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-primary-900/10 to-transparent" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Main Grid: 12-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          
          {/* Brand & Mission: 4 cols */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="inline-block p-4 rounded-2xl shadow-2xl group overflow-hidden relative border border-white/10 hover:border-white/20 transition-all duration-500">
              <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <img src={logo} alt="Vibrant Textiles" className="h-10 w-auto relative z-10" />
            </Link>
            
            <p className="text-white/40 text-[18px] leading-relaxed font-medium max-w-sm">
              Architecting a resilient, innovation-led future for India's grand textile heritage. We bridge legacy with <span className="text-white italic">possibility</span>.
            </p>

            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -8, scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary-400 transition-all duration-300 shadow-lg"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation: 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-accent-400 font-black text-[11px] uppercase tracking-[0.4em] mb-10">Navigation</h4>
            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/40 hover:text-white font-bold text-[16px] transition-all duration-300 flex items-center gap-3 group"
                  >
                    <div className="w-0 h-[2px] bg-primary-500 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem: 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-accent-400 font-black text-[11px] uppercase tracking-[0.4em] mb-10">Ecosystem</h4>
            <ul className="space-y-5">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/40 hover:text-white font-bold text-[16px] transition-all duration-300 flex items-center gap-3 group"
                  >
                    <div className="w-0 h-[2px] bg-accent-500 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter: 4 cols */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 rounded-[40px] border border-white/20 p-10 relative overflow-hidden group/box shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 noise-overlay opacity-[0.03]" />
              <h4 className="text-primary-400 font-serif text-3xl font-black italic mb-4 leading-tight">Insight Digest</h4>
              <p className="text-white/50 text-sm font-medium mb-10">Join the VTA network for exclusive industry intelligence.</p>
              
              <div className="relative mb-8">
                <input 
                  type="email" 
                  placeholder="name@industry.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-base font-bold focus:outline-none focus:border-primary-500/50 transition-all placeholder:text-white/20"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-2 top-2 bottom-2 bg-primary-600 hover:bg-primary-500 text-white px-6 rounded-xl flex items-center justify-center transition-all shadow-xl font-black text-xs uppercase tracking-widest"
                >
                  Join
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-[10px]" />
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gradient-to-br from-gray-700 to-gray-800" />
                  ))}
                </div>
                <span className="text-white/30 text-[11px] font-black uppercase tracking-widest">Connect with 2k+ Leaders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center lg:items-start gap-2">
            <p className="text-white/20 text-[14px] font-bold tracking-tight">
              © {new Date().getFullYear()} <span className="text-white/40">Vibrant Textiles Association</span>. India.
            </p>
            <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.3em]">
              Heritage • Innovation • Excellence
            </p>
          </div>

          <div className="flex items-center gap-10">
            <Link to="/privacy" className="text-white/20 hover:text-white/50 text-[11px] font-black uppercase tracking-widest transition-all">Privacy</Link>
            <Link to="/terms" className="text-white/20 hover:text-white/50 text-[11px] font-black uppercase tracking-widest transition-all">Terms</Link>
            
            <motion.button
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-primary-600/20 transition-all duration-300"
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
