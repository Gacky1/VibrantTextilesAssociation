import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/text_white.png';

const Footer = () => {
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

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <img src={logo} alt="Vibrant Textiles" className="h-16 w-auto mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering India's textile ecosystem through collaboration, innovation, and sustainable growth.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faPhone} className="text-accent-400" />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="text-accent-400" />
                <span>info@vibranttextiles.org</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-accent-400 mt-1" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-accent-400 to-accent-600 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs text-accent-400 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-accent-400 to-accent-600 rounded-full"></span>
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs text-accent-400 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-accent-400 to-accent-600 rounded-full"></span>
              Join Us
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">Become a part of India's textile revolution and make a difference</p>
            <Link to="/membership">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }} 
                className="w-full px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
              >
                Apply for Membership
              </motion.button>
            </Link>
            
            {/* Social Media */}
            <div className="mt-8">
              <p className="text-sm text-gray-400 mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: faFacebookF, href: '#' },
                  { icon: faTwitter, href: '#' },
                  { icon: faLinkedinIn, href: '#' },
                  { icon: faInstagram, href: '#' }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-primary-600 hover:to-primary-700 transition-all"
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }} 
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">© 2024 Vibrant Textiles Association. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
