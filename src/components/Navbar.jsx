import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUserPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/VTC TRANSPARENT.svg';

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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          isScrolled ? 'top-4 px-4' : 'top-0 px-0'
        }`}
      >
        <div 
          className={`relative transition-all duration-500 w-full max-w-7xl px-6 sm:px-8 lg:px-10 h-[76px] flex items-center justify-between overflow-hidden ${
            isScrolled
              ? 'glass-ultra rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/40'
              : 'bg-transparent border-b border-white/10'
          }`}
        >
          {/* Noise effect for scrolled navbar */}
          {isScrolled && <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />}

          {/* Logo */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 cursor-pointer relative z-10"
            >
              <img
                src={logo}
                alt="Vibrant Textiles Association"
                className={`h-11 w-auto transition-all duration-500 ${!isScrolled ? 'brightness-0 invert' : 'brightness-110'}`}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 relative z-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`relative px-4 py-2 rounded-xl text-[14.5px] font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                      isActive
                        ? isScrolled
                          ? 'text-primary-600 bg-primary-50/50'
                          : 'text-white bg-white/10'
                        : isScrolled
                        ? 'text-gray-600 hover:text-primary-600 hover:bg-gray-100/50'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${isScrolled ? 'bg-primary-500' : 'bg-white'}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}

            {/* Membership CTA */}
            <Link to="/membership" className="ml-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-full text-[13px] font-extrabold shadow-[0_10px_30px_rgba(229,46,34,0.4)] hover:shadow-[0_15px_40px_rgba(229,46,34,0.5)] transition-all duration-300 border border-white/20"
              >
                <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
                JOIN VTA
              </motion.div>
            </Link>
          </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-300 relative z-10 ${
                isScrolled
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-white/10 text-white backdrop-blur-md'
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
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[380px] bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col"
            >
              <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />

              {/* Menu Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100/50 relative z-10">
                <img src={logo} alt="Vibrant Textiles" className="h-10 w-auto" />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </motion.button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 px-6 py-8 space-y-2 overflow-y-auto relative z-10">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className={`group flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {isActive && <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />}
                          <span className={`text-[16px] font-bold ${isActive ? 'tracking-tight' : 'tracking-wide'}`}>
                            {item.name}
                          </span>
                        </div>
                        <FontAwesomeIcon 
                          icon={faArrowRight} 
                          className={`text-xs transition-all duration-300 ${
                            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                        />
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Membership CTA in mobile menu */}
              <div className="px-8 pb-10 pt-6 border-t border-gray-100/50 relative z-10">
                <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl font-black text-[15px] shadow-[0_15px_30px_rgba(229,46,34,0.3)]"
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    APPLY FOR MEMBERSHIP
                  </motion.div>
                </Link>
                <p className="text-center text-gray-400 text-[11px] font-bold tracking-widest mt-6 uppercase">
                  Vibrant Textiles Association
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
