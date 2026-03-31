import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUserPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 z-50 flex justify-center pt-6 px-6 pointer-events-none"
      >
        <div 
          className={`pointer-events-auto relative transition-all duration-1000 ease-[0.22,1,0.36,1] flex items-center justify-between px-6 py-2.5 rounded-[40px] w-full max-w-7xl border ${
            isScrolled
              ? 'glass-pill shadow-[0_20px_80px_rgba(0,0,0,0.15)] border-white/40 scale-[0.96]'
              : 'bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl'
          }`}
        >
          {/* Noise effect for premium texture */}
          <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none rounded-[32px]" />

          {/* Logo Section - Cinematic Reveal */}
          <Link to="/" className="relative z-10 mr-8">
            <motion.div
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex items-center gap-3 overflow-hidden"
            >
              <motion.img
                variants={{
                  initial: { scale: 0.8, opacity: 0, rotate: -10 },
                  animate: { scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                src={logo}
                alt="VTC"
                className={`h-10 w-auto transition-all duration-700 ${!isScrolled ? 'brightness-0 invert' : ''}`}
              />
              <div className={`hidden sm:flex flex-col leading-[0.9] ${!isScrolled ? 'text-white' : 'text-dark-950'}`}>
                <div className="overflow-hidden">
                   <motion.span 
                     variants={{
                        initial: { y: "100%" },
                        animate: { y: 0, transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] } }
                     }}
                     className="block font-brodies text-xl tracking-tighter"
                   >
                     Vibrant Textiles
                   </motion.span>
                </div>
                <div className="overflow-hidden">
                   <motion.span 
                     variants={{
                        initial: { opacity: 0, x: -10 },
                        animate: { opacity: 0.4, x: 0, transition: { duration: 0.8, delay: 0.4 } }
                     }}
                     className="block text-[10px] font-black uppercase tracking-[0.5em] ml-0.5"
                   >
                     Association
                   </motion.span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Magnetic Links */}
          <div className="hidden lg:flex items-center gap-1.5 relative z-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-3 py-2 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? isScrolled ? 'text-primary-600 bg-primary-50/50' : 'text-white bg-white/20'
                        : isScrolled ? 'text-dark-900/40 hover:text-dark-950 hover:bg-dark-900/5' : 'text-white/40 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isScrolled ? 'bg-primary-500' : 'bg-white'}`}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Section: CTA */}
          <div className="flex items-center gap-4 relative z-10 ml-4">
            <Link to="/membership" className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-full text-[12px] font-black shadow-lg hover:shadow-primary-500/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
                <span className="relative z-10 flex items-center gap-2">
                   <FontAwesomeIcon icon={faUserPlus} className="text-[10px]" />
                   JOIN VTA
                </span>
              </motion.button>
            </Link>

            {/* Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                isScrolled ? 'bg-gray-100 text-dark-900' : 'bg-white/10 text-white'
              }`}
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[60] bg-dark-900/95 backdrop-blur-2xl flex flex-col p-8 overflow-hidden"
          >
            <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
            
            <div className="flex justify-between items-center mb-12">
               <img src={logo} alt="VTC" className="h-10 w-auto invert brightness-0" />
               <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white text-xl">
                 <FontAwesomeIcon icon={faTimes} />
               </button>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-6">
               {navItems.map((item, idx) => (
                 <Link key={idx} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-end gap-4"
                    >
                       <span className="text-white/20 font-black text-2xl italic leading-none">0{idx + 1}</span>
                       <span className="text-white text-5xl font-serif font-black tracking-tighter group-hover:text-primary-500 transition-colors">
                         {item.name}
                       </span>
                    </motion.div>
                 </Link>
               ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/5">
                <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-5 bg-white text-dark-900 rounded-3xl font-black text-lg tracking-widest uppercase shadow-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    Join The Legacy
                  </button>
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
