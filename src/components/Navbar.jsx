import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/LogoRectTransparent.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Textile', path: '/about-textile' },
    { name: 'Events/Fair', path: '/events' },
    { name: 'Members', path: '/members' },
    { name: 'Skill Development', path: '/skill-development' },
    { name: 'Media', path: '/media' },
    { name: 'Research', path: '/research' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 cursor-pointer"
            >
              <img src={logo} alt="Vibrant Textiles Association" className="h-14 md:h-16 w-auto" />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    location.pathname === item.path
                      ? 'text-white bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            <Link to="/membership">
              <motion.div
                whileHover={{ scale: 1.08, y: -2, boxShadow: '0 10px 30px rgba(194, 61, 61, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faUserPlus} className="text-sm" />
                Membership
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
              {navItems.map((item, index) => (
                <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`block w-full text-left px-5 py-3 rounded-xl text-base font-semibold transition-all ${
                      location.pathname === item.path
                        ? 'text-white bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
              <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="block w-full px-5 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-bold text-center shadow-lg flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  Membership
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
