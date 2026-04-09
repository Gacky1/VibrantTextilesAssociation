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
    <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VTC" className="h-8 w-auto brightness-0 invert" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg text-white">Vibrant Textiles</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Association</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Uniting artisans, manufacturers, and stakeholders to define the global standard of excellence in the textile industry since 1998.
            </p>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Newsletter</h4>
            <p className="text-sm">Join our network for the latest industry updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary-500"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-md transition-colors">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-500 flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <span>© {new Date().getFullYear()} Vibrant Textiles Association. All rights reserved.</span>
            <span className="uppercase tracking-widest text-[9px]">Minimalist UI Redesign by Antigravity.</span>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-xs hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs hover:text-white transition-colors">Terms</Link>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
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

