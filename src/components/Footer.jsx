import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faArrowRight, faArrowUp, faBell, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/VTC TRANSPARENT.svg';

const socials = [
  { icon: faFacebookF, href: '#', label: 'Facebook' },
  { icon: faTwitter, href: '#', label: 'Twitter' },
  { icon: faLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: faInstagram, href: '#', label: 'Instagram' },
];

const notifications = [
  { text: 'National Handloom Summit 2026', date: 'June 15' },
  { text: 'RPL Skilling Assessment Openings', date: 'June 28' },
  { text: 'New Industrial Cluster Subsidies', date: 'July 05' },
  { text: 'Exhibitor Invites: Global Expo 2026', date: 'July 18' }
];

const releases = [
  { text: 'VTA Annual Industry Outlook (PDF)', path: '/research' },
  { text: 'Eco-Fiber Circular Economy Code', path: '/research' },
  { text: 'Technology Modernization Report', path: '/media' },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-slate-950 bg-textile-linen-dark text-slate-400 py-24 overflow-hidden border-t border-white/5">
      
      {/* Decorative gradient accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-rose-500 via-indigo-500 to-teal-500" />
      <div className="absolute top-[1px] left-0 right-0 z-20">
        <div className="fringe-divider" />
      </div>
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="section-container relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          
          {/* Column 1: About Us */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VTC Logo" className="h-10 w-auto brightness-0 invert" />
              <div className="flex flex-col leading-tight text-white">
                <span className="font-black text-lg tracking-tight">Vibrant Textiles</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-rose-500">Association</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-normal">
              Uniting artisans, manufacturers, academic bodies, and policy creators since 1998 to define the global standard of sustainability and excellence in textiles.
            </p>
            <div className="dark flex flex-wrap gap-2 pt-1">
              <span className="label-woven text-stone-400">Est. 1998</span>
              <span className="label-woven text-stone-400">100% Handloom</span>
              <span className="label-woven text-rose-500">Certified VTA</span>
            </div>
            <div className="flex gap-3 pt-2">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 transform hover:-translate-y-0.5"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[11px] border-l-2 border-rose-500 pl-3">
              Contact
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-rose-500 mt-1 flex-shrink-0" />
                <span>Textile Enclave, Phase-3, New Delhi, 110020, India</span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-rose-500 flex-shrink-0" />
                <span>+91 (11) 4892-0900</span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-rose-500 flex-shrink-0" />
                <a href="mailto:office@vibranttextiles.org" className="hover:text-white transition-colors">
                  office@vibranttextiles.org
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Notification */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[11px] border-l-2 border-indigo-500 pl-3">
              Notification
            </h4>
            <ul className="space-y-4">
              {notifications.map((item, idx) => (
                <li key={idx} className="group flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <FontAwesomeIcon icon={faBell} className="text-xs" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-200 group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {item.text}
                    </h5>
                    <span className="text-[10px] text-slate-500 font-semibold">{item.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Releases */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[11px] border-l-2 border-teal-500 pl-3">
              Releases
            </h4>
            <ul className="space-y-3">
              {releases.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-xs font-bold text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2 group"
                  >
                    <FontAwesomeIcon icon={faFileAlt} className="text-[10px] text-teal-500/70 group-hover:text-teal-400" />
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Micro email input field for releases wrapped in a stitched fabric patch card */}
            <div className="p-4 bg-white/5 rounded-2xl border-stitch-gold space-y-2 mt-4">
              <span className="text-[10px] font-black text-amber-500/90 uppercase tracking-widest block">
                Subscribe to Announcements
              </span>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-all"
                />
                <button 
                  className="absolute right-1 top-1 bottom-1 w-8 rounded-lg bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-bold text-slate-500 flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
            <span>© {new Date().getFullYear()} Vibrant Textiles Association. All rights reserved.</span>
            <span className="uppercase tracking-[0.3em] text-[8px] text-rose-500/80">Defining Global Sustainable Standards</span>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/membership" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors relative py-1 nav-thread-rose">Privacy Policy</Link>
            <Link to="/about-textile" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors relative py-1 nav-thread-rose">Terms of Service</Link>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 shadow-xl"
              aria-label="Scroll to top"
            >
              <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
