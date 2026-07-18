import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronRight, faChevronDown, faBuilding, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/VTC TRANSPARENT.svg';
import { usePortal } from '../context/PortalContext';
import SignInMenu from './auth/SignInMenu';

const Navbar = () => {
  const { portalMode, setPortalMode } = usePortal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'academy', 'news_events', or null
  const dropdownRef = useRef(null);
  const location = useLocation();

  // State and Timer for Hindi/English Logo Branding Text Loop (3 seconds cycle)
  const [textIndex, setTextIndex] = useState(0);
  const brandTexts = [
    { main: "Vibrant Textiles", sub: "Association" },
    { main: "वाइब्रेंट वस्त्र", sub: "संगठन" }
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % brandTexts.length);
    }, 3000);
    return () => clearInterval(textTimer);
  }, []);

  // Close mobile and desktop dropdowns on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, portalMode]);

  // Click outside listener to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Define Navbar options dynamically based on active Portal Mode
  const industryDirectItems = [
    { name: 'Industry', path: '/about-textile' },
    { name: 'Textile Explorer', path: '/textile-explorer' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Research', path: '/research' },
  ];

  const academyDirectItems = [
    { name: 'Textile Explorer', path: '/textile-explorer' },
    { name: 'Research', path: '/research' },
  ];

  const newsDropdownItems = [
    { name: 'Events & Exhibitions', path: '/events' },
    { name: 'News & Press Releases', path: '/media' },
  ];

  // For Academy, group related items into a dropdown to prevent crowding/overflow
  const academyDropdownItems = [
    { name: 'Education', path: '/about-textile' },
    { name: 'Affiliation', path: '/membership' },
    { name: 'Skilling (RPL, Assessments)', path: '/skill-development' },
    { name: 'Upskilling', path: '/skill-development' },
    { name: 'Apprenticeships', path: '/skill-development' },
    { name: 'Placement', path: '/skill-development' },
  ];

  return (
    <>
      {/* Navbar with solid White background (switches to slate in dark mode) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-22">
            
            {/* Left Column: Dynamic Animated Logo Branding */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <img
                src={logo}
                alt="VTC Logo"
                className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              {/* English/Hindi transition loop wrapper */}
              <div className="flex flex-col justify-center overflow-hidden h-[42px] relative min-w-[110px] sm:min-w-[155px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={textIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col leading-none"
                  >
                    <span className="font-black text-[13px] sm:text-[17px] tracking-tight text-slate-900 dark:text-white leading-none">
                      {brandTexts[textIndex].main}
                    </span>
                    <span className={`font-black text-rose-600 mt-1 sm:mt-1.5 leading-none ${
                      textIndex === 1 ? 'text-[9px] sm:text-[12px] tracking-wide font-extrabold' : 'text-[7px] sm:text-[9px] uppercase tracking-[0.25em]'
                    }`}>
                      {brandTexts[textIndex].sub}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Link>

            {/* Desktop Nav Items */}
            <div className="hidden xl:flex items-center gap-4 2xl:gap-6" ref={dropdownRef}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={portalMode}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 2xl:gap-6"
                >
                  {portalMode === 'industry' ? (
                    // Industry Menu Links
                    <>
                      <Link
                        to="/about-textile"
                        className={`whitespace-nowrap text-[11px] 2xl:text-[12px] font-black uppercase tracking-wider transition-all relative py-2 nav-thread-gold ${
                          location.pathname === '/about-textile' ? 'text-amber-600' : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                        }`}
                      >
                        Industry
                        {location.pathname === '/about-textile' && (
                          <motion.div 
                            layoutId="activeNavLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-600"
                            style={{
                              backgroundImage: `repeating-linear-gradient(90deg, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)`,
                              backgroundColor: 'transparent'
                            }}
                          />
                        )}
                      </Link>

                      <Link
                        to="/textile-explorer"
                        className={`whitespace-nowrap text-[11px] 2xl:text-[12px] font-black uppercase tracking-wider transition-all relative py-2 nav-thread-gold ${
                          location.pathname === '/textile-explorer' ? 'text-amber-600' : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                        }`}
                      >
                        Textile Explorer
                        {location.pathname === '/textile-explorer' && (
                          <motion.div 
                            layoutId="activeNavLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-600"
                            style={{
                              backgroundImage: `repeating-linear-gradient(90deg, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)`,
                              backgroundColor: 'transparent'
                            }}
                          />
                        )}
                      </Link>

                      <Link
                        to="/marketplace"
                        className={`whitespace-nowrap text-[11px] 2xl:text-[12px] font-black uppercase tracking-wider transition-all relative py-2 nav-thread-gold ${
                          location.pathname === '/marketplace' ? 'text-amber-600' : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                        }`}
                      >
                        Marketplace
                        {location.pathname === '/marketplace' && (
                          <motion.div 
                            layoutId="activeNavLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-600"
                            style={{
                              backgroundImage: `repeating-linear-gradient(90deg, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)`,
                              backgroundColor: 'transparent'
                            }}
                          />
                        )}
                      </Link>

                      {/* News & Events Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === 'news_events' ? null : 'news_events')}
                          className={`whitespace-nowrap text-[11px] 2xl:text-[12px] font-black uppercase tracking-wider transition-all py-2 flex items-center gap-1.5 focus:outline-none nav-thread-gold ${
                            activeDropdown === 'news_events' || newsDropdownItems.some(item => location.pathname === item.path)
                              ? 'text-amber-600' 
                              : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                          }`}
                        >
                          News & Events
                          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform duration-350 ${activeDropdown === 'news_events' ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === 'news_events' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.18 }}
                              className="absolute left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-4 space-y-1 z-50 border-stitch-gold"
                            >
                              {newsDropdownItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setActiveDropdown(null)}
                                    className={`block text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all ${
                                      isActive 
                                        ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600' 
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                  >
                                    {item.name}
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Link
                        to="/research"
                        className={`whitespace-nowrap text-[11px] 2xl:text-[12px] font-black uppercase tracking-wider transition-all relative py-2 nav-thread-gold ${
                          location.pathname === '/research' ? 'text-amber-600' : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                        }`}
                      >
                        Research
                        {location.pathname === '/research' && (
                          <motion.div 
                            layoutId="activeNavLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-600"
                            style={{
                              backgroundImage: `repeating-linear-gradient(90deg, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)`,
                              backgroundColor: 'transparent'
                            }}
                          />
                        )}
                      </Link>
                    </>
                  ) : (
                    // Academy Menu with compact Dropdown
                    <>
                      {/* Academics & Skilling Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === 'academy' ? null : 'academy')}
                          className={`whitespace-nowrap text-[11px] 2xl:text-[12px] font-black uppercase tracking-wider transition-colors py-2 flex items-center gap-1.5 focus:outline-none nav-thread-rose ${
                            activeDropdown === 'academy' || academyDropdownItems.some(item => location.pathname === item.path)
                              ? 'text-rose-600' 
                              : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                          }`}
                        >
                          Academics & Skilling
                          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform duration-350 ${activeDropdown === 'academy' ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === 'academy' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.18 }}
                              className="absolute left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-4 space-y-1 z-50 border-stitch"
                            >
                              {academyDropdownItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setActiveDropdown(null)}
                                    className={`block text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all ${
                                      isActive 
                                        ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600' 
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                  >
                                    {item.name}
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Link
                        to="/textile-explorer"
                        className={`whitespace-nowrap text-[11px] 2xl:text-[12px] font-black uppercase tracking-wider transition-all relative py-2 nav-thread-rose ${
                          location.pathname === '/textile-explorer' ? 'text-rose-600' : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                        }`}
                      >
                        Textile Explorer
                        {location.pathname === '/textile-explorer' && (
                          <motion.div 
                            layoutId="activeNavLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-600"
                            style={{
                              backgroundImage: `repeating-linear-gradient(90deg, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)`,
                              backgroundColor: 'transparent'
                            }}
                          />
                        )}
                      </Link>

                      {/* News & Events Dropdown for Academy */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === 'news_events' ? null : 'news_events')}
                          className={`whitespace-nowrap text-[11px] 2xl:text-[12px] font-black uppercase tracking-wider transition-all py-2 flex items-center gap-1.5 focus:outline-none nav-thread-rose ${
                            activeDropdown === 'news_events' || newsDropdownItems.some(item => location.pathname === item.path)
                              ? 'text-rose-600' 
                              : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                          }`}
                        >
                          News & Events
                          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform duration-350 ${activeDropdown === 'news_events' ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === 'news_events' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.18 }}
                              className="absolute left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-4 space-y-1 z-50 border-stitch"
                            >
                              {newsDropdownItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setActiveDropdown(null)}
                                    className={`block text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all ${
                                      isActive 
                                        ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600' 
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                  >
                                    {item.name}
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Link
                        to="/research"
                        className={`whitespace-nowrap text-[11px] 2xl:text-[12px] font-black uppercase tracking-wider transition-all relative py-2 nav-thread-rose ${
                          location.pathname === '/research' ? 'text-rose-600' : 'text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white'
                        }`}
                      >
                        Research
                        {location.pathname === '/research' && (
                          <motion.div 
                            layoutId="activeNavLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-600"
                            style={{
                              backgroundImage: `repeating-linear-gradient(90deg, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)`,
                              backgroundColor: 'transparent'
                            }}
                          />
                        )}
                      </Link>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Dynamic Portal Switcher Toggle + Action Button */}
            <div className="hidden lg:flex items-center gap-3 2xl:gap-6 flex-shrink-0 ml-6 2xl:ml-10">
              
              {/* Dual-Portal Selector Toggle Capsule */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-full p-1 shadow-inner relative">
                
                {/* Industry portal toggle */}
                <button
                  onClick={() => setPortalMode('industry')}
                  className={`flex items-center gap-1.5 px-3 2xl:px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 relative z-10 focus:outline-none ${
                    portalMode === 'industry' ? 'text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={faBuilding} className="text-[10px]" />
                  Industry
                </button>

                {/* Academy portal toggle */}
                <button
                  onClick={() => setPortalMode('academy')}
                  className={`flex items-center gap-1.5 px-3 2xl:px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 relative z-10 focus:outline-none ${
                    portalMode === 'academy' ? 'text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={faGraduationCap} className="text-[10px]" />
                  Academia
                </button>

                {/* Sliding highlighted pill background */}
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className={`absolute top-1 bottom-1 rounded-full z-0 ${
                    portalMode === 'industry' ? 'bg-indigo-600' : 'bg-rose-600'
                  }`}
                  style={{
                    left: portalMode === 'industry' ? '4px' : 'calc(50% + 2px)',
                    right: portalMode === 'industry' ? 'calc(50% + 2px)' : '4px'
                  }}
                />

              </div>

              <SignInMenu />

              {/* Join VTA Solid Action */}
              <Link to="/membership">
                <button className="btn-primary whitespace-nowrap py-2.5 px-4 2xl:px-6 text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 group shadow-md">
                  Join VTA
                  <FontAwesomeIcon icon={faChevronRight} className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

            </div>

            {/* Mobile Actions: Hamburger and fast Portal Toggle */}
            <div className="flex items-center gap-2 sm:gap-4 xl:hidden flex-shrink-0">
              
              {/* Dynamic portal switcher inside mobile toolbar */}
              <button
                onClick={() => setPortalMode(portalMode === 'industry' ? 'academy' : 'industry')}
                className={`flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] font-black uppercase tracking-widest border transition-all ${
                  portalMode === 'industry' 
                    ? 'bg-indigo-50 border-indigo-100 text-indigo-600' 
                    : 'bg-rose-50 border-rose-100 text-rose-600'
                }`}
              >
                <FontAwesomeIcon icon={portalMode === 'industry' ? faBuilding : faGraduationCap} />
                <span className="hidden sm:inline">{portalMode === 'industry' ? 'Industry' : 'Academy'}</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-md text-slate-800 dark:text-slate-200 hover:text-rose-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
              </button>

            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col h-screen"
          >
            {/* Mobile Drawer Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-white">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                <img src={logo} alt="VTC Logo" className="h-10 w-auto" />
                <div className="flex flex-col justify-center overflow-hidden h-[40px] relative min-w-[150px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={textIndex}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="flex flex-col leading-none"
                    >
                      <span className="font-black text-[16px] tracking-tight text-slate-900 leading-none">
                        {brandTexts[textIndex].main}
                      </span>
                      <span className={`font-black text-rose-600 mt-1 leading-none ${
                        textIndex === 1 ? 'text-[11px] tracking-wide font-extrabold' : 'text-[8px] uppercase tracking-[0.25em]'
                      }`}>
                        {brandTexts[textIndex].sub}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-850 hover:text-rose-600 focus:outline-none">
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            {/* Mobile Drawer Body */}
            <div className="flex-1 overflow-y-auto py-8 px-8 space-y-6 bg-slate-50/50">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest py-1 px-3.5 rounded-full ${
                  portalMode === 'industry' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {portalMode === 'academy' ? 'Academy Division' : 'Industry Division'}
                </span>
              </div>

              <SignInMenu mobile onNavigate={() => setIsMobileMenuOpen(false)} />
              
              <div className="space-y-4">
                {portalMode === 'industry' ? (
                  <>
                    {/* Direct Links */}
                    {industryDirectItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-2xl font-black text-slate-800 hover:text-indigo-600 transition-colors uppercase tracking-tight"
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* News & Events Group */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">News & Events</span>
                      {newsDropdownItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-lg font-extrabold text-slate-700 hover:text-indigo-600 pl-4 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Academics & Skilling Group */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Academics & Skilling</span>
                      {academyDropdownItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-lg font-extrabold text-slate-700 hover:text-rose-600 pl-4 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    {/* General Links */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Explorer & Research</span>
                      {academyDirectItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xl font-black text-slate-800 hover:text-rose-600 transition-colors uppercase tracking-tight"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    {/* News & Events Group */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">News & Events</span>
                      {newsDropdownItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-lg font-extrabold text-slate-700 hover:text-rose-600 pl-4 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="p-6 border-t border-slate-100 bg-white space-y-4">
              <button
                onClick={() => setPortalMode(portalMode === 'industry' ? 'academy' : 'industry')}
                className={`w-full py-3.5 border rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                  portalMode === 'industry' 
                    ? 'border-indigo-100 bg-indigo-50 text-indigo-600' 
                    : 'border-rose-100 bg-rose-50 text-rose-600'
                }`}
              >
                <FontAwesomeIcon icon={portalMode === 'industry' ? faGraduationCap : faBuilding} />
                Switch to {portalMode === 'industry' ? 'Academy Portal' : 'Industry Portal'}
              </button>

              <Link to="/membership" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="btn-primary w-full py-4 justify-center text-xs font-black uppercase tracking-wider shadow-md">
                  Join VTA
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
