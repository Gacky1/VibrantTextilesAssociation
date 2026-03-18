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
    <footer className="relative bg-[#0a0a0f] text-white overflow-hidden">
      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-900 rounded-full blur-[100px] opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-900 rounded-full blur-[80px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <img src={logo} alt="Vibrant Textiles" className="h-14 w-auto mb-5" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering India's textile ecosystem through collaboration, innovation, and sustainable growth.
            </p>
            <div className="space-y-3">
              {[
                { icon: faPhone, text: '+91 XXXXX XXXXX' },
                { icon: faEnvelope, text: 'info@vibranttextiles.org' },
                { icon: faMapMarkerAlt, text: 'New Delhi, India' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="text-primary-400 text-xs" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary-500 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((l) => (
                <FooterLink key={l.path} to={l.path}>{l.name}</FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-accent-500 rounded-full" />
              Resources
            </h3>
            <ul className="space-y-1">
              {resources.map((l) => (
                <FooterLink key={l.path} to={l.path}>{l.name}</FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Join + Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary-500 rounded-full" />
              Join Us
            </h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Become part of India's textile revolution.
            </p>
            <Link to="/membership">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold text-sm shadow-xl hover:shadow-primary-500/30 hover:shadow-2xl transition-all duration-300 mb-8"
              >
                Apply for Membership
              </motion.button>
            </Link>

            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">Follow Us</p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 hover:border-primary-500 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={s.icon} className="text-xs" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2025 Vibrant Textiles Association. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <Link to="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">•</span>
            <Link to="#" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            <span className="text-gray-700">•</span>
            <Link to="#" className="hover:text-gray-400 transition-colors">Cookie Policy</Link>
          </div>

          {/* Scroll to top */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-8 h-8 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 hover:border-primary-500 transition-all duration-200"
            aria-label="Scroll to top"
          >
            <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
