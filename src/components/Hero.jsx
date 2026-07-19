import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlay, faPause, faChevronLeft, faChevronRight, faSeedling, faLightbulb, faPalette } from '@fortawesome/free-solid-svg-icons';

// Import assets
import textileHeritageImg from '../assets/textile_heritage.png';
import textileInnovationImg from '../assets/textile_innovation.png';
import textileSustainabilityImg from '../assets/textile_sustainability.png';

const slides = [
  {
    id: 1,
    badge: "Heritage & Artistry",
    icon: faPalette,
    title: "Weaving Tradition into Tomorrow",
    description: "Honoring the ancient legacy of Indian handlooms and regional artisans. Connecting centuries of organic craftsmanship with premium global fashion.",
    image: textileHeritageImg,
    cta1: "Explore Heritage",
    cta1Link: "/about-textile",
    cta2: "Join the Association",
    cta2Link: "/membership",
    accentGradient: "from-rose-500 to-amber-500",
    shadowColor: "shadow-rose-500/10",
    accentText: "text-rose-500"
  },
  {
    id: 2,
    badge: "Modern Innovation",
    icon: faLightbulb,
    title: "The Loom of Next-Gen Industry",
    description: "Empowering manufacturers, weavers, and MSMEs with advanced technology, smart automation, and scaled industrial excellence.",
    image: textileInnovationImg,
    cta1: "Our Focus Areas",
    cta1Link: "/skill-development",
    cta2: "Member Registry",
    cta2Link: "/members",
    accentGradient: "from-indigo-500 to-purple-500",
    shadowColor: "shadow-indigo-500/10",
    accentText: "text-indigo-500"
  },
  {
    id: 3,
    badge: "Sustainable Future",
    icon: faSeedling,
    title: "Eco-Conscious Excellence",
    description: "Driving the future of green textiles with organic materials, zero-waste processing circularity, and verified fair-trade practices.",
    image: textileSustainabilityImg,
    cta1: "Sustainability Code",
    cta1Link: "/research",
    cta2: "Become a Partner",
    cta2Link: "/contact",
    accentGradient: "from-teal-500 to-emerald-500",
    shadowColor: "shadow-teal-500/10",
    accentText: "text-teal-500"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Interactive 3D Tilt State for Gallery Frame
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glossPosition, setGlossPosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const SLIDE_DURATION = 5000;
  const tickInterval = 50;

  // Autoplay Loop
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
            return 0;
          }
          return prev + (tickInterval / SLIDE_DURATION) * 100;
        });
      }, tickInterval);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  const handleNext = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const selectSlide = (index) => {
    setProgress(0);
    setCurrentSlide(index);
  };

  // Interactive 3D Parallax Tilt Handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinates from card center (-1 to +1)
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // Dynamic rotation angle limits (max 10 degrees)
    setTilt({
      x: -y * 10,
      y: x * 10
    });

    // Light reflection gloss calculations
    const glossX = ((e.clientX - rect.left) / rect.width) * 100;
    const glossY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlossPosition({ x: glossX, y: glossY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const active = slides[currentSlide];

  // Cinematic staggered text transition properties
  const titleWords = active.title.split(' ');

  return (
    <section className="relative min-h-screen flex items-center bg-slate-950 bg-textile-linen-dark overflow-hidden text-white pt-24 pb-12 lg:pt-32 lg:pb-12">
      
      {/* Background elegant breathing radial spotlights & silk threads */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/10 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[15%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-rose-600/5 blur-[160px] animate-pulse" style={{ animationDelay: '2.5s' }} />
        
        {/* Silk Thread Swirls representing warps/wefts */}
        <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,300 C300,100 500,500 1400,200" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="6 8" />
          <path d="M-100,500 C400,300 600,700 1500,400" fill="none" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="5 7" />
          <path d="M200,-100 C400,300 100,600 800,1200" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 6" />
        </svg>
      </div>

      {/* Grid Layout Container */}
      <div className="section-container relative z-10 w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Cinematic Text Pane */}
        <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
          
          {/* Badge indicator */}
          <div className="flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 backdrop-blur-md py-1.5 px-4.5 rounded-full shadow-lg"
              >
                <FontAwesomeIcon icon={active.icon} className={`${active.accentText} text-xs`} />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-200">
                  {active.badge}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cinematic Word-Staggered Heading */}
          <div className="min-h-[120px] md:min-h-[170px] flex items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide}
                  className="block"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: { transition: { staggerChildren: 0.06 } }
                  }}
                >
                  {/* First Word */}
                  <motion.span 
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
                      exit: { y: -20, opacity: 0 }
                    }}
                    className="inline-block mr-2"
                  >
                    {titleWords[0]}
                  </motion.span>

                  {/* Middle highlights (Gradients) */}
                  <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${active.accentGradient} mr-2`}>
                    {titleWords.slice(1, 3).map((w, idx) => (
                      <motion.span
                        key={idx}
                        variants={{
                          hidden: { y: 20, opacity: 0 },
                          visible: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.08 + idx * 0.04 } },
                          exit: { y: -20, opacity: 0 }
                        }}
                        className="inline-block mr-2"
                      >
                        {w}
                      </motion.span>
                    ))}
                  </span>

                  {/* Rest of the title words */}
                  {titleWords.slice(3).map((w, idx) => (
                    <motion.span
                      key={idx}
                      variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.16 + idx * 0.04 } },
                        exit: { y: -20, opacity: 0 }
                      }}
                      className="inline-block mr-2"
                    >
                      {w}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </h1>
          </div>

          {/* Description */}
          <div className="min-h-[70px] md:min-h-[90px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-slate-300 text-base md:text-lg font-normal leading-relaxed max-w-xl"
              >
                {active.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link to={active.cta1Link}>
                <button className="btn-primary py-3.5 px-8 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 group relative overflow-hidden transition-all duration-300">
                  <span className="relative z-10">{active.cta1}</span>
                  <FontAwesomeIcon icon={faArrowRight} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link to={active.cta2Link}>
                <button className="btn-secondary py-3.5 px-8 rounded-full font-bold text-xs uppercase tracking-wider border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-slate-950 transition-all duration-300 animate-pulse">
                  {active.cta2}
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Autoplay & Custom Progress Indicators */}
          <div className="flex items-center gap-8 pt-8 border-t border-white/5">
            
            {/* Nav numbered tabs */}
            <div className="flex items-center gap-4">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => selectSlide(idx)}
                  className="flex flex-col items-start gap-1 group focus:outline-none"
                >
                  <span className={`text-[11px] font-black tracking-widest transition-colors ${idx === currentSlide ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                    0{slide.id}
                  </span>
                  <div className="w-10 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
                    {idx === currentSlide && (
                      <motion.div 
                        layoutId="tabTimer"
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${active.accentGradient}`}
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Play/Pause/Chevrons Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 focus:outline-none"
                aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
              >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-[10px]" />
              </button>

              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 focus:outline-none"
                aria-label="Previous slide"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
              </button>

              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 focus:outline-none"
                aria-label="Next slide"
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Visual Showcase Column with 3D Tilt Card */}
        <div className="lg:col-span-5 flex justify-center items-center relative w-full h-full">
          
          {/* Floating abstract dynamic particle circles */}
          <div className="absolute top-[-10%] right-[10%] w-3 h-3 bg-indigo-400 rounded-full opacity-30 animate-bounce" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[5%] left-[0%] w-4 h-4 bg-rose-400 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <div className="absolute top-[40%] left-[-8%] w-2 h-2 bg-teal-400 rounded-full opacity-25 animate-ping" style={{ animationDuration: '3s' }} />

          {/* Glowing dynamic backdrop halo mapped to active slide theme colors */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${active.accentGradient} blur-[80px] rounded-3xl -z-10 opacity-15 pointer-events-none transition-all duration-1000`} />

          {/* Interactive 3D Tilt Gallery Frame */}
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isHovered 
                ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)` 
                : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
              transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              transformStyle: 'preserve-3d'
            }}
            className="w-full max-w-[440px] aspect-[4/5] rounded-[32px] overflow-hidden p-1.5 bg-slate-900 border border-white/10 shadow-2xl relative select-none"
          >
            {/* Slowly spinning color border ring glow inside the frame */}
            <div className={`absolute inset-0 -z-10 rounded-[28px] opacity-35 bg-gradient-to-tr ${active.accentGradient} animate-spin`} style={{ animationDuration: '10s' }} />
            
            {/* Inner embroidery stitch ring around the showcase frame */}
            <div className="absolute inset-[6px] border border-dashed border-amber-500/35 rounded-[28px] pointer-events-none z-10" />

            <div className="w-full h-full rounded-[26px] overflow-hidden relative group bg-slate-950" style={{ transform: 'translateZ(10px)' }}>
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={active.image}
                  alt={active.title}
                  initial={{ opacity: 0.4, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.4, scale: 0.95 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover filter brightness-[1.02] contrast-[1.02]"
                />
              </AnimatePresence>

              {/* Glossy spotlight reflection overlay simulating light catching silk texture */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 220px at ${glossPosition.x}% ${glossPosition.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
                }}
              />

              {/* Hanging clothing brand tag */}
              <div className="absolute -top-1 right-8 z-20 flex flex-col items-center pointer-events-none">
                {/* Sewing string */}
                <div className="w-[1.5px] bg-amber-500/50" 
                     style={{ 
                       backgroundImage: 'repeating-linear-gradient(180deg, #ca8a04 0px, #ca8a04 3px, transparent 3px, transparent 6px)',
                       height: '20px' 
                     }} 
                />
                {/* Tag body */}
                <div className="label-woven text-stone-800 bg-[#faf9f6] dark:bg-[#1c1917] dark:text-stone-300 text-[8px] px-2.5 py-1.5 rotate-3 shadow-lg flex flex-col items-center gap-1 border border-stone-200 dark:border-stone-800">
                  <span className="font-mono text-[7px] text-rose-600 font-extrabold uppercase tracking-widest leading-none">HANDLOOM</span>
                  <span className="font-black tracking-tight text-[9px] leading-none">VTA CERTIFIED</span>
                  <div className="w-8 h-[1px] bg-stone-300 dark:bg-stone-700 my-0.5" />
                  <span className="text-[6px] opacity-60 leading-none">100% ORGANIC</span>
                </div>
              </div>

              {/* High-end decorative brand badge floating inside image */}
              <div className="absolute top-4 left-4 bg-slate-950/70 border border-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/80 select-none">
                VTA DIVISION
              </div>

              {/* Micro border ring */}
              <div className="absolute inset-0 border border-white/5 rounded-[26px] pointer-events-none" />
            </div>

          </div>

        </div>

      </div>

      {/* Bottom fringe divider for fabric texture transition */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
        <div className="fringe-divider" />
      </div>
    </section>
  );
};

export default Hero;
