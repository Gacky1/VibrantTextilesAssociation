import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight, faMapMarkerAlt, faAward, faCertificate, faBookOpen,
  faPlay, faArrowLeft, faUsers, faGlobe, faBuilding, faLeaf,
  faEnvelope, faPhone, faTimes, faChevronLeft, faChartLine, faTools, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getTextileBySlug, getRelatedTextiles, schemes } from '../data/textileDatabase';

const TextileDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [textile, setTextile] = useState(null);

  // Gallery slider state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Active section for side Table of Contents
  const [activeSection, setActiveSection] = useState('overview');

  // Contact form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch textile data on slug change
  const [relatedTextiles, setRelatedTextiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getTextileBySlug(slug);
        if (!data) {
          navigate('/textile-explorer'); // Redirect if not found
        } else {
          setTextile(data);
          setActiveImageIndex(0);
          window.scrollTo(0, 0);

          // Fetch related textiles
          const related = await getRelatedTextiles(data.id);
          setRelatedTextiles(related);
        }
      } catch (err) {
        console.error("Error loading textile details:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [slug, navigate]);

  // Fetch applicable government schemes
  const applicableSchemes = useMemo(() => {
    // Return all schemes for simplicity, representing matching schemes
    return schemes;
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (inquiryName && inquiryEmail && inquiryMsg) {
      setFormSubmitted(true);
      setTimeout(() => {
        setInquiryName('');
        setInquiryEmail('');
        setInquiryMsg('');
        setFormSubmitted(false);
      }, 3000);
    }
  };

  if (isLoading || !textile) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-rose-600 animate-spin" />
      </div>
    );
  }

  // Calculate coordinates for Mini Highlight Map
  // Southern, Western, Northern, Eastern, Central
  const regionHighlights = {
    North: "M 300 40 L 350 90 L 390 120 L 370 170 L 350 200 L 270 200 L 230 140 L 230 90 Z",
    West: "M 230 140 L 270 200 L 250 280 L 190 320 L 130 320 L 120 250 L 150 170 Z",
    Central: "M 270 200 L 350 200 L 370 280 L 290 300 L 250 280 Z",
    East: "M 350 200 L 440 210 L 450 300 L 370 320 L 370 280 Z",
    Northeast: "M 440 210 L 520 180 L 570 210 L 540 270 L 460 260 L 450 230 Z",
    South: "M 250 280 L 290 300 L 370 320 L 350 440 L 300 530 L 260 440 L 190 320 Z"
  };

  const currentRegionPath = regionHighlights[textile.regionName] || "";

  return (
    <div className="min-h-screen bg-textile-linen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden pt-22 pb-16">
      <Navbar />

      {/* ── Breadcrumbs Panel ── */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 mt-6">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-500">
          <Link to="/" className="hover:text-rose-600">Home</Link>
          <FontAwesomeIcon icon={faChevronRight} className="text-[7px]" />
          <Link to="/textile-explorer" className="hover:text-rose-600">Textile Explorer</Link>
          <FontAwesomeIcon icon={faChevronRight} className="text-[7px]" />
          <span className="text-slate-600 dark:text-slate-350">{textile.name}</span>
        </div>
      </div>

      {/* ── Hero Full-width Banner ── */}
      <section className="relative w-full h-[55vh] min-h-[400px] mt-6 overflow-hidden select-none bg-slate-900">
        <img
          src={textile.hero_image}
          alt={textile.name}
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        {/* Parallax Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 max-w-[90rem] mx-auto px-4 sm:px-8 flex flex-col justify-end pb-12 text-white">
          <div className="max-w-4xl space-y-4">
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2.5">
              <span className="text-[9px] font-black uppercase tracking-widest bg-rose-600 px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <FontAwesomeIcon icon={faCertificate} className="text-[9px]" />
                {textile.regionName} India
              </span>
              {textile.gi_tag && (
                <span className="text-[9px] font-black uppercase tracking-widest bg-indigo-600 px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <FontAwesomeIcon icon={faAward} className="text-[9px]" />
                  GI Protected
                </span>
              )}
              {textile.recognition?.includes("UNESCO") && (
                <span className="text-[9px] font-black uppercase tracking-widest bg-amber-600 px-3 py-1 rounded-full shadow-md">
                  UNESCO Heritage
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {textile.name}
            </h1>

            {/* Description Summary */}
            <p className="text-base md:text-xl text-slate-200/90 leading-relaxed font-semibold italic max-w-3xl">
              "{textile.short_description}"
            </p>

            {/* Micro Details Grid */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300 font-bold uppercase tracking-wider pt-2">
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-rose-500" />
                {textile.cityName}, {textile.state?.name}
              </span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faLeaf} className="text-emerald-500" />
                {textile.material?.name}
              </span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faTools} className="text-indigo-400" />
                {textile.technique?.name}
              </span>
            </div>

          </div>
        </div>

        {/* Back navigation button */}
        <Link
          to="/textile-explorer"
          className="absolute top-8 left-8 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 p-3 rounded-full flex items-center justify-center transition-all shadow-md group"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
      </section>
      <div className="fringe-divider" />

      {/* ── Main content grid: sidebar Table of Contents + central layout + side widgets ── */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Table of Contents Left Sticky Menu (Col width: 2) */}
          <nav className="hidden xl:block lg:col-span-2 sticky top-28 space-y-2 pr-4 border-r border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4">Table of Contents</p>
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'history', name: 'History & Origin' },
              { id: 'process', name: 'Craft Process' },
              { id: 'design', name: 'Motifs & Palette' },
              { id: 'media', name: 'Gallery & Videos' },
              { id: 'people', name: 'Artisans & Clusters' },
              { id: 'economics', name: 'Export & Schemes' }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`w-full text-left text-xs font-bold py-2.5 px-3 rounded-xl transition-all ${
                  activeSection === sec.id
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {sec.name}
              </button>
            ))}
          </nav>

          {/* 2. Central details layout (Col width: 7 on LG, 10 on XL) */}
          <div className="lg:col-span-8 xl:col-span-7 space-y-16">
            
            {/* ── Section: Overview ── */}
            <div id="overview" className="scroll-mt-28 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Textile Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Card 1: Material */}
                <div className="p-6 bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 rounded-[24px] space-y-3 border-stitch">
                  <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-full">Material</span>
                  <h4 className="font-extrabold text-base text-slate-800 dark:text-white">{textile.material?.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {textile.material?.description}
                  </p>
                </div>

                {/* Card 2: Technique */}
                <div className="p-6 bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 rounded-[24px] space-y-3 border-stitch">
                  <span className="text-[10px] font-black uppercase text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 px-3 py-1 rounded-full">Technique</span>
                  <h4 className="font-extrabold text-base text-slate-800 dark:text-white">{textile.technique?.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {textile.technique?.description}
                  </p>
                </div>

                {/* Card 3: Categories */}
                <div className="p-6 bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 rounded-[24px] space-y-3 border-stitch">
                  <span className="text-[10px] font-black uppercase text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-3 py-1 rounded-full">Products</span>
                  <h4 className="font-extrabold text-base text-slate-800 dark:text-white">{textile.categoryName}s</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Primarily used to design luxury {textile.categoryName?.toLowerCase()}s, contemporary garments, and select home accents.
                  </p>
                </div>

              </div>
            </div>

            {/* ── Section: History & Origin ── */}
            <div id="history" className="scroll-mt-28 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                History & Origin
              </h2>
              <div className="p-8 bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 rounded-[32px] space-y-6 border-stitch">
                <div className="border-l-4 border-rose-500 pl-6 space-y-4">
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-semibold italic">
                    "{textile.history}"
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider mb-2">Atelier & Courtly Origins</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed font-medium">
                    {textile.origin}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Section: Crafting & Weaving Process ── */}
            <div id="process" className="scroll-mt-28 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                The Crafting Process
              </h2>
              <div className="space-y-6">
                
                {/* 1. Weaving Process */}
                <div className="p-8 bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 rounded-[32px] flex flex-col md:flex-row gap-8 border-stitch">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    W
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-lg text-slate-800 dark:text-white">Weaving Process</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed font-medium">
                      {textile.weaving_process} Weaving is carried out on custom counter-march pit looms or raised frame looms. Extra-weft design cards are created using Jala or Jacquard mechanisms.
                    </p>
                  </div>
                </div>

                {/* 2. Dyeing Process */}
                <div className="p-8 bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 rounded-[32px] flex flex-col md:flex-row gap-8 border-stitch">
                  <div className="h-12 w-12 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center text-xl font-bold flex-shrink-0">
                    D
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-lg text-slate-800 dark:text-white">Dyeing Process</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-450 leading-relaxed font-medium">
                      {textile.dyeing_process} Depending on the textile, yarns are either resist-dyed before weaving (Ikat) or dyed post-spinning using natural extracts (indigo, madder root, cochineal) and mineral mordants.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Section: Motifs & Color Palette ── */}
            <div id="design" className="scroll-mt-28 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Design Language & Aesthetics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Motifs Card */}
                <div className="p-8 bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 rounded-[32px] space-y-4 border-stitch">
                  <h4 className="font-extrabold text-lg text-slate-800 dark:text-white">Signature Motifs</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                    Symbolic patterns represent cultural values, local flora, fauna, and geometric structures.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {textile.motifs?.map(mot => (
                      <span key={mot} className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-55/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {mot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Color Swatches Card */}
                <div className="p-8 bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/50 rounded-[32px] space-y-4 border-stitch">
                  <h4 className="font-extrabold text-lg text-slate-800 dark:text-white">Heritage Color Palette</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                    A collection of traditional colors representing regional dyes and metallic threads.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {textile.color_palette?.map(col => (
                      <div key={col.name} className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/50">
                        <span className="h-7 w-7 rounded-lg shadow-inner flex-shrink-0" style={{ backgroundColor: col.hex }} />
                        <div className="min-w-0">
                          <p className="text-[10px] font-extrabold text-slate-800 dark:text-white truncate leading-tight">{col.name}</p>
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none mt-0.5">{col.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* ── Section: Multimedia Gallery & Video ── */}
            <div id="media" className="scroll-mt-28 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Visual Documentation
              </h2>
              
              {/* Photo Gallery Grid */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-lg text-slate-800 dark:text-white">Image Gallery</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {textile.gallery?.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsLightboxOpen(true);
                      }}
                      className="group relative h-48 rounded-[24px] overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-150/50 dark:border-white/5"
                    >
                      <img
                        src={item.image}
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1582142401825-783286395b4f?q=80&w=600&auto=format&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white text-[10px] font-bold">
                        {item.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* YouTube Video Player */}
              {textile.videos?.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h4 className="font-extrabold text-lg text-slate-800 dark:text-white">Video Demonstration</h4>
                  <div className="relative aspect-video rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm bg-black">
                    <iframe
                      src={textile.videos[0].youtube_url}
                      title={textile.videos[0].title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ── Section: People, Artisans & Clusters ── */}
            <div id="people" className="scroll-mt-28 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Ecosystem & Artisans
              </h2>
              
              {/* Artisans List */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                  <FontAwesomeIcon icon={faUsers} className="text-rose-500 text-base" />
                  Master Artisans / उस्ताद
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {textile.artisans?.map(art => (
                    <div key={art.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] flex items-center gap-4 shadow-sm">
                      <img
                        src={art.photo}
                        alt={art.name}
                        className="h-16 w-16 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=250&auto=format&fit=crop";
                        }}
                      />
                      <div className="min-w-0 space-y-1">
                        <h5 className="font-extrabold text-sm text-slate-800 dark:text-white">{art.name}</h5>
                        <p className="text-[10px] font-extrabold text-slate-450 dark:text-slate-500 uppercase">{art.city}, {art.state}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Exp: {art.experience} • Specializes in {art.specialization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cluster Card */}
              {textile.cluster && (
                <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] space-y-3">
                  <span className="text-[9px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 dark:bg-rose-950/20 px-3 py-1 rounded-full">
                    Active Textile Cluster
                  </span>
                  <h4 className="font-extrabold text-lg text-slate-800 dark:text-white pt-2">{textile.cluster.name}</h4>
                  <p className="text-xs font-black uppercase text-slate-400 dark:text-slate-500">
                    Location: {textile.cluster.city}, {textile.cluster.state}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {textile.cluster.description}
                  </p>
                </div>
              )}
            </div>

            {/* ── Section: Economics, Exports & Schemes ── */}
            <div id="economics" className="scroll-mt-28 space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Economic Performance & Support
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Custom SVG Bar Chart for Export Stats */}
                <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] space-y-4">
                  <h4 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faChartLine} className="text-rose-500 text-base" />
                    Export Statistics (USD)
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                    Annual export values across primary trade corridors (FY 2023 - 2024).
                  </p>

                  <div className="pt-4 flex justify-center">
                    <svg viewBox="0 0 320 220" className="w-full max-w-[280px] h-auto select-none">
                      {/* Grid Lines */}
                      <line x1="40" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800" />
                      <line x1="40" y1="70" x2="300" y2="70" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800" />
                      <line x1="40" y1="120" x2="300" y2="120" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800" />
                      <line x1="40" y1="170" x2="300" y2="170" stroke="#cbd5e1" strokeWidth="1" className="dark:stroke-slate-700" />

                      {/* Bar 1: US */}
                      <rect x="65" y="45" width="20" height="125" rx="4" fill="#6366f1" />
                      <text x="75" y="185" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-bold text-[9px]">USA</text>
                      <text x="75" y="38" textAnchor="middle" className="fill-slate-800 dark:fill-white font-extrabold text-[8px]">$520K</text>

                      {/* Bar 2: UK */}
                      <rect x="150" y="85" width="20" height="85" rx="4" fill="#ec4899" />
                      <text x="160" y="185" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-bold text-[9px]">UK</text>
                      <text x="160" y="78" textAnchor="middle" className="fill-slate-800 dark:fill-white font-extrabold text-[8px]">$350K</text>

                      {/* Bar 3: UAE */}
                      <rect x="235" y="92" width="20" height="78" rx="4" fill="#10b981" />
                      <text x="245" y="185" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-bold text-[9px]">UAE</text>
                      <text x="245" y="85" textAnchor="middle" className="fill-slate-800 dark:fill-white font-extrabold text-[8px]">$320K</text>
                    </svg>
                  </div>
                </div>

                {/* Government Schemes List */}
                <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] space-y-4">
                  <h4 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faBuilding} className="text-rose-500 text-base" />
                    Government Schemes
                  </h4>
                  <div className="space-y-4">
                    {applicableSchemes.map(sch => (
                      <div key={sch.id} className="space-y-1">
                        <a href={`https://${sch.website}`} target="_blank" rel="noopener noreferrer" className="font-extrabold text-xs text-rose-600 dark:text-rose-400 hover:underline">
                          {sch.name}
                        </a>
                        <p className="text-[11px] text-slate-550 dark:text-slate-450 leading-relaxed font-medium">
                          {sch.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Research Papers Section */}
              {textile.research?.length > 0 && (
                <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] space-y-4">
                  <h4 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faBookOpen} className="text-rose-500 text-base" />
                    Research & Publications
                  </h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {textile.research.map(paper => (
                      <div key={paper.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h5 className="font-extrabold text-sm text-slate-850 dark:text-white">{paper.title}</h5>
                          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">{paper.author} • {paper.journal}</p>
                        </div>
                        <a
                          href={paper.pdf}
                          className="text-[10px] font-black uppercase bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl hover:bg-rose-500 hover:text-white transition-all flex-shrink-0"
                        >
                          View PDF
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Section: Related Textiles Carousel ── */}
            <div className="pt-8 border-t border-slate-150 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Related Textiles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedTextiles.map(rel => (
                  <Link
                    key={rel.id}
                    to={`/textile-explorer/${rel.slug}`}
                    className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative h-36 bg-slate-100 dark:bg-slate-850">
                      <img
                        src={rel.thumbnail}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                        onError={(e) => {
                          e.target.src = "/assets/textiles/banarasi_silk.png";
                        }}
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h5 className="font-extrabold text-sm text-slate-800 dark:text-white group-hover:text-rose-600 transition-colors">{rel.name}</h5>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{rel.stateName}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* 3. Right Widgets (Col width: 3 on LG, XL) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-8">
            
            {/* Widget A: Geographic Map Widget */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] space-y-4">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faGlobe} className="text-rose-500 text-xs" />
                Geographical Origin
              </h4>
              
              {/* Mini Map SVG */}
              <div className="relative h-44 flex items-center justify-center bg-slate-50 dark:bg-slate-800/40 rounded-xl overflow-hidden border border-slate-100 dark:border-white/5">
                <svg viewBox="0 0 600 580" className="h-full w-auto">
                  <rect width="600" height="580" fill="transparent" />
                  <path
                    d={currentRegionPath}
                    fill="#be123c"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    className="opacity-70 dark:opacity-90 shadow-lg filter drop-shadow-md"
                  />
                </svg>
                <div className="absolute bottom-2 left-2 text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded">
                  {textile.regionName} Region
                </div>
              </div>

              {/* Coordinates Info */}
              <div className="space-y-3 pt-2 text-xs font-semibold">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 dark:text-slate-500 uppercase font-black text-[9px]">District</span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{textile.city?.district}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 dark:text-slate-500 uppercase font-black text-[9px]">Coordinates</span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold font-mono">
                    {textile.city?.latitude?.toFixed(4)}° N, {textile.city?.longitude?.toFixed(4)}° E
                  </span>
                </div>
              </div>
            </div>

            {/* Widget B: GI Tag Official Certificate Info */}
            {textile.giTagDetails && (
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] space-y-4">
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCertificate} className="text-rose-500 text-xs" />
                  GI Certification
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500 uppercase font-black text-[9px]">Reg No.</span>
                    <span className="text-rose-600 dark:text-rose-450 font-black">{textile.giTagDetails.registration_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500 uppercase font-black text-[9px]">Year</span>
                    <span className="text-slate-700 dark:text-slate-300 font-bold">{textile.giTagDetails.year}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-slate-400 dark:text-slate-500 uppercase font-black text-[9px]">Authority</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight font-medium">
                      {textile.giTagDetails.authority}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Widget C: Stakeholder Organizations Directory */}
            {textile.organizations?.length > 0 && (
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] space-y-4">
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="text-rose-500 text-xs" />
                  Cluster Network
                </h4>
                <div className="space-y-4">
                  {textile.organizations.map(org => (
                    <div key={org.id} className="space-y-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <h5 className="font-extrabold text-slate-800 dark:text-white">{org.name}</h5>
                      </div>
                      
                      <div className="pl-3 space-y-1 text-slate-500 dark:text-slate-400 font-semibold text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faGlobe} className="text-[10px]" />
                          <a href={`https://${org.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{org.website}</a>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faEnvelope} className="text-[10px]" />
                          <span>{org.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faPhone} className="text-[10px]" />
                          <span>{org.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Widget D: Inquiry Form */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] space-y-4">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                Inquire About Weave
              </h4>
              
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white"
                />
                <textarea
                  required
                  rows="3"
                  placeholder="Write your inquiry..."
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all shadow-sm"
                >
                  {formSubmitted ? 'Message Sent!' : 'Submit Inquiry'}
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

      {/* ── Lightbox Modal for Gallery Images ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4">
            
            {/* Close trigger backdrop */}
            <div className="absolute inset-0" onClick={() => setIsLightboxOpen(false)} />
            
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-8 right-8 z-20 text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            {/* Prev Image */}
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === 0 ? textile.gallery.length - 1 : prev - 1))}
              className="absolute left-8 z-10 text-white/55 hover:text-white p-4 hover:bg-white/5 rounded-full focus:outline-none"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
            </button>

            {/* Slider image wrapper */}
            <div className="relative max-w-4xl max-h-[80vh] flex flex-col justify-center items-center z-10 space-y-4">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={textile.gallery[activeImageIndex].image}
                alt={textile.gallery[activeImageIndex].caption}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-white/80 font-semibold text-center text-sm px-6 max-w-2xl">
                {textile.gallery[activeImageIndex].caption}
              </p>
            </div>

            {/* Next Image */}
            <button
              onClick={() => setActiveImageIndex((prev) => (prev === textile.gallery.length - 1 ? 0 : prev + 1))}
              className="absolute right-8 z-10 text-white/55 hover:text-white p-4 hover:bg-white/5 rounded-full focus:outline-none"
            >
              <FontAwesomeIcon icon={faChevronRight} size="2xl" />
            </button>
            
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default TextileDetail;
