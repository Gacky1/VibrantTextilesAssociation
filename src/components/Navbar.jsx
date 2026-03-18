import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUserPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/LogoRectTransparent.png';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Textile', path: '/about-textile' },
  { name: 'Events/Fair', path: '/events' },
  { name: 'Members', path: '/members' },
  { name: 'Skill Dev', path: '/skill-development' },
  { name: 'Media', path: '/media' },
  { name: 'Research', path: '/research' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border-b border-gray-100/80'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 cursor-pointer"
              >
                <img
                  src={logo}
                  alt="Vibrant Textiles Association"
                  className={`h-12 w-auto transition-all duration-300 ${!isScrolled ? 'brightness-0 invert' : ''}`}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.name} to={item.path}>
                    <motion.div
                      whileHover={{ y: -1 }}
                      className={`relative px-4 py-2 rounded-xl text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? isScrolled
                            ? 'text-primary-600'
                            : 'text-white'
                          : isScrolled
                          ? 'text-gray-600 hover:text-primary-600'
                          : 'text-white/85 hover:text-white'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${isScrolled ? 'bg-primary-500' : 'bg-white'}`}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Membership CTA */}
              <Link to="/membership" className="ml-3">
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full text-[13px] font-bold shadow-[0_4px_20px_rgba(229,46,34,0.35)] hover:shadow-[0_8px_32px_rgba(229,46,34,0.45)] transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
                  Membership
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/15'
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isMobileMenuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-lg" />
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[320px] bg-white shadow-2xl flex flex-col"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <img src={logo} alt="Vibrant Textiles" className="h-10 w-auto" />
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </motion.button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navItems.map((item, index) => (
                  <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                      className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all ${
                        location.pathname === item.path
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                      }`}
                    >
                      {location.pathname === item.path && (
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 flex-shrink-0" />
                      )}
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Membership CTA in mobile menu */}
              <div className="px-4 pb-8 pt-4 border-t border-gray-100">
                <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.04 + 0.1 }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold text-[15px] shadow-lg"
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    Apply for Membership
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
