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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled ? 'bg-white shadow-sm border-gray-100' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="VTC"
                className={`h-10 w-auto ${!isScrolled ? 'brightness-0 invert' : ''}`}
              />
              <div className={`flex flex-col leading-tight ${!isScrolled ? 'text-white' : 'text-gray-900'}`}>
                <span className="font-bold text-xl tracking-tight">Vibrant Textiles</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Association</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-primary-600'
                        : !isScrolled ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              <Link to="/membership">
                <button className="btn-primary py-2 px-6 text-sm">
                  JOIN VTA
                </button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md ${
                !isScrolled ? 'text-white' : 'text-gray-900'
              }`}
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] bg-white lg:hidden">
            <div className="flex flex-col h-full bg-white">
              <div className="flex justify-between items-center px-6 py-5 border-b">
                <img src={logo} alt="VTC" className="h-10 w-auto" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-900">
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-4">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t">
                <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="btn-primary w-full py-4 justify-center">
                    JOIN VTA
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
