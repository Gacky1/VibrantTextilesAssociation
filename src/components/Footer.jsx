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
    <footer className="relative bg-[#0a0a2e] text-indigo-100/70 py-24 overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-rose-500 to-vibrant-orange" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-primary-600/5 rounded-full blur-[120px]" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VTC" className="h-10 w-auto brightness-0 invert" />
              <div className="flex flex-col leading-tight">
                <span className="font-black text-xl text-white tracking-tighter">Vibrant Textiles</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">Association</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-medium italic">
              "Uniting artisans, manufacturers, and stakeholders to define the global standard of excellence in the textile industry since 1998."
            </p>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-semibold hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 opacity-0 group-hover:opacity-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">Resources</h4>
            <ul className="space-y-4">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-semibold hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 opacity-0 group-hover:opacity-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">Industrial Pulse</h4>
            <p className="text-sm font-medium">Join our network for the latest industry updates.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary-500 focus:bg-white/10 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary-600 hover:bg-primary-700 text-white w-10 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-primary-500/20">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[11px] font-bold text-indigo-100/40 flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            <span>© {new Date().getFullYear()} Vibrant Textiles Association. Definining Excellence.</span>
            <span className="uppercase tracking-[0.4em] text-[9px] text-primary-500/60">Crafted with Dynamic Vibrancy</span>
          </div>

          <div className="flex items-center gap-10">
            <Link to="/privacy" className="text-[11px] font-black uppercase tracking-widest hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[11px] font-black uppercase tracking-widest hover:text-white transition-colors">Terms</Link>
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all shadow-xl"
              aria-label="Scroll to top"
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


