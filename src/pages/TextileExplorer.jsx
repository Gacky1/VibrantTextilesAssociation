import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faThLarge, faList, faMoon, faSun,
  faCertificate, faMapMarkerAlt, faStar, faChevronRight,
  faChevronDown, faUndo, faFilter, faCheck, faTimes, faLeaf, faTag, faCogs
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InteractiveIndiaMap from '../components/InteractiveIndiaMap';
import { getAllTextiles, regions, states } from '../data/textileDatabase';

const TextileExplorer = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') || 
           localStorage.getItem('vta_theme') === 'dark';
  });

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vta_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vta_theme', 'light');
    }
  }, [isDarkMode]);

  // Layout View State: grid vs list
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedTextileType, setSelectedTextileType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState('');
  const [selectedWeavingStyle, setSelectedWeavingStyle] = useState('');
  const [selectedDyeingMethod, setSelectedDyeingMethod] = useState('');
  const [selectedEmbroideryType, setSelectedEmbroideryType] = useState('');

  // Multi-select Arrays
  const [selectedRecognitions, setSelectedRecognitions] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSustainability, setSelectedSustainability] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  // Mobile Filter Drawer toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Expanded states for Sidebar collapsible groups
  const [expandedGroups, setExpandedGroups] = useState({
    location: true,
    textile: true,
    recognition: true,
    industry: true,
    sustainability: true,
    occasion: true,
    price: true
  });

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // Get full textile list from Supabase database
  const [allTextiles, setAllTextiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTextiles = async () => {
      try {
        setIsLoading(true);
        const data = await getAllTextiles();
        setAllTextiles(data);
      } catch (err) {
        console.error("Error loading textiles:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTextiles();
  }, []);

  // Filter lists derived from data for dropdowns
  const uniqueTextileTypes = useMemo(() => {
    return [...new Set(allTextiles.map(t => t.textile_type).filter(Boolean))];
  }, [allTextiles]);

  const uniqueWeavingStyles = useMemo(() => {
    return [...new Set(allTextiles.map(t => t.weaving_style).filter(Boolean))];
  }, [allTextiles]);

  const uniqueDyeingMethods = useMemo(() => {
    return [...new Set(allTextiles.map(t => t.dyeing_method).filter(Boolean))];
  }, [allTextiles]);

  const uniqueEmbroideryTypes = useMemo(() => {
    return [...new Set(allTextiles.map(t => t.embroidery_type).filter(Boolean))];
  }, [allTextiles]);

  const uniqueMaterials = useMemo(() => {
    return [...new Set(allTextiles.map(t => t.materialName).filter(Boolean))];
  }, [allTextiles]);

  const uniqueCategories = useMemo(() => {
    return [...new Set(allTextiles.map(t => t.categoryName).filter(Boolean))];
  }, [allTextiles]);

  const uniqueTechniques = useMemo(() => {
    return [...new Set(allTextiles.map(t => t.techniqueName).filter(Boolean))];
  }, [allTextiles]);

  // States list filtered by selected Region
  const filteredStatesList = useMemo(() => {
    if (!selectedRegion) return states;
    const regionObj = regions.find(r => r.id === selectedRegion || r.name === selectedRegion);
    return states.filter(s => s.region_id === regionObj?.id);
  }, [selectedRegion]);

  // Cities list filtered by selected State
  const filteredCitiesList = useMemo(() => {
    let targetTextiles = allTextiles;
    if (selectedState) {
      targetTextiles = targetTextiles.filter(t => t.stateName === selectedState);
    } else if (selectedRegion) {
      targetTextiles = targetTextiles.filter(t => t.regionName === selectedRegion);
    }

    const cityNames = [...new Set(targetTextiles.map(t => t.cityName).filter(Boolean))].sort();
    return cityNames.map((city, idx) => ({
      id: idx + 1,
      name: city
    }));
  }, [allTextiles, selectedRegion, selectedState]);

  // Handle Multi-select arrays toggle
  const handleToggleFilter = (item, activeList, setActiveList) => {
    if (activeList.includes(item)) {
      setActiveList(activeList.filter(i => i !== item));
    } else {
      setActiveList([...activeList, item]);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion(null);
    setSelectedState('');
    setSelectedCity('');
    setSelectedMaterial('');
    setSelectedTextileType('');
    setSelectedCategory('');
    setSelectedTechnique('');
    setSelectedWeavingStyle('');
    setSelectedDyeingMethod('');
    setSelectedEmbroideryType('');
    setSelectedRecognitions([]);
    setSelectedIndustries([]);
    setSelectedSustainability([]);
    setSelectedOccasions([]);
    setSelectedPrices([]);
  };

  // Main Filtering Logic
  const filteredTextiles = useMemo(() => {
    return allTextiles.filter(textile => {
      // 1. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = textile.name.toLowerCase().includes(query);
        const matchesDesc = textile.short_description.toLowerCase().includes(query);
        const matchesFamous = textile.primary_uses?.toLowerCase().includes(query);
        const matchesState = textile.stateName.toLowerCase().includes(query);
        const matchesCity = textile.cityName.toLowerCase().includes(query);
        const matchesMaterial = textile.materialName.toLowerCase().includes(query);
        const matchesTechnique = textile.techniqueName.toLowerCase().includes(query);
        
        if (!matchesName && !matchesDesc && !matchesFamous && !matchesState && !matchesCity && !matchesMaterial && !matchesTechnique) {
          return false;
        }
      }

      // 2. Region Map
      if (selectedRegion && textile.regionName !== selectedRegion) {
        return false;
      }

      // 3. Location Dropdowns
      if (selectedState && textile.stateName !== selectedState) {
        return false;
      }
      if (selectedCity && textile.cityName !== selectedCity) {
        return false;
      }

      // 4. Textile Attributes
      if (selectedMaterial && textile.materialName !== selectedMaterial) {
        return false;
      }
      if (selectedTextileType && textile.textile_type !== selectedTextileType) {
        return false;
      }
      if (selectedCategory && textile.categoryName !== selectedCategory) {
        return false;
      }
      if (selectedTechnique && textile.techniqueName !== selectedTechnique) {
        return false;
      }
      if (selectedWeavingStyle && textile.weaving_style !== selectedWeavingStyle) {
        return false;
      }
      if (selectedDyeingMethod && textile.dyeing_method !== selectedDyeingMethod) {
        return false;
      }
      if (selectedEmbroideryType && textile.embroidery_type !== selectedEmbroideryType) {
        return false;
      }

      // 5. Recognition Checklist (GI, UNESCO, Award)
      if (selectedRecognitions.length > 0) {
        const hasAllRecognitions = selectedRecognitions.every(rec => 
          textile.recognition?.includes(rec) || (rec === "GI Tagged" && textile.gi_tag)
        );
        if (!hasAllRecognitions) return false;
      }

      // 6. Industry Stakeholders Checklist
      if (selectedIndustries.length > 0) {
        const hasAllIndustries = selectedIndustries.every(ind => textile.industry?.includes(ind));
        if (!hasAllIndustries) return false;
      }

      // 7. Sustainability Checklist
      if (selectedSustainability.length > 0) {
        const hasAllSustainability = selectedSustainability.every(sust => textile.sustainability?.includes(sust));
        if (!hasAllSustainability) return false;
      }

      // 8. Occasions Checklist
      if (selectedOccasions.length > 0) {
        const hasAllOccasions = selectedOccasions.every(occ => textile.occasion?.includes(occ));
        if (!hasAllOccasions) return false;
      }

      // 9. Price Ranges Checklist
      if (selectedPrices.length > 0) {
        if (!selectedPrices.includes(textile.price_range)) {
          return false;
        }
      }

      return true;
    });
  }, [allTextiles, searchQuery, selectedRegion, selectedState, selectedCity, selectedMaterial, selectedTextileType, selectedCategory, selectedTechnique, selectedWeavingStyle, selectedDyeingMethod, selectedEmbroideryType, selectedRecognitions, selectedIndustries, selectedSustainability, selectedOccasions, selectedPrices]);

  // Sidebar Filter Panel (Reusable)
  const FilterPanel = () => (
    <div className="space-y-6">
      
      {/* 1. Location Section */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <button
          onClick={() => toggleGroup('location')}
          className="flex justify-between items-center w-full font-extrabold text-[11px] uppercase tracking-wider text-slate-800 dark:text-slate-200"
        >
          <span>Location</span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform ${expandedGroups.location ? '' : '-rotate-90'}`} />
        </button>
        
        {expandedGroups.location && (
          <div className="mt-3 space-y-3">
            {/* Region select */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Region</label>
              <select
                value={selectedRegion || ''}
                onChange={(e) => {
                  setSelectedRegion(e.target.value || null);
                  setSelectedState('');
                  setSelectedCity('');
                }}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All Regions</option>
                {regions.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* State select */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">State</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                }}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All States</option>
                {filteredStatesList.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* City select */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All Cities</option>
                {filteredCitiesList.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 2. Textile Details Section */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <button
          onClick={() => toggleGroup('textile')}
          className="flex justify-between items-center w-full font-extrabold text-[11px] uppercase tracking-wider text-slate-800 dark:text-slate-200"
        >
          <span>Textile Specifications</span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform ${expandedGroups.textile ? '' : '-rotate-90'}`} />
        </button>

        {expandedGroups.textile && (
          <div className="mt-3 space-y-3">
            {/* Material */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Material</label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All Materials</option>
                {uniqueMaterials.map(mat => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>

            {/* Product Category */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Technique */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Technique</label>
              <select
                value={selectedTechnique}
                onChange={(e) => setSelectedTechnique(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All Techniques</option>
                {uniqueTechniques.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            {/* Textile Type */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Textile Type</label>
              <select
                value={selectedTextileType}
                onChange={(e) => setSelectedTextileType(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All Types</option>
                {uniqueTextileTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Weaving Style */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Weaving Style</label>
              <select
                value={selectedWeavingStyle}
                onChange={(e) => setSelectedWeavingStyle(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All Weaving Styles</option>
                {uniqueWeavingStyles.map(ws => (
                  <option key={ws} value={ws}>{ws}</option>
                ))}
              </select>
            </div>

            {/* Dyeing Method */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Dyeing Method</label>
              <select
                value={selectedDyeingMethod}
                onChange={(e) => setSelectedDyeingMethod(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All Dyeing Methods</option>
                {uniqueDyeingMethods.map(dm => (
                  <option key={dm} value={dm}>{dm}</option>
                ))}
              </select>
            </div>

            {/* Embroidery Type */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Embroidery Type</label>
              <select
                value={selectedEmbroideryType}
                onChange={(e) => setSelectedEmbroideryType(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
              >
                <option value="">All Embroidery Types</option>
                {uniqueEmbroideryTypes.map(em => (
                  <option key={em} value={em}>{em}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 3. Recognition Section */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <button
          onClick={() => toggleGroup('recognition')}
          className="flex justify-between items-center w-full font-extrabold text-[11px] uppercase tracking-wider text-slate-800 dark:text-slate-200"
        >
          <span>Recognition</span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform ${expandedGroups.recognition ? '' : '-rotate-90'}`} />
        </button>

        {expandedGroups.recognition && (
          <div className="mt-3 space-y-2">
            {["GI Tagged", "UNESCO", "National Award"].map((rec) => (
              <label key={rec} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedRecognitions.includes(rec)}
                  onChange={() => handleToggleFilter(rec, selectedRecognitions, setSelectedRecognitions)}
                  className="rounded text-rose-600 focus:ring-rose-500/20 border-slate-300 dark:border-slate-700 dark:bg-slate-800 h-4 w-4"
                />
                <span>{rec}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Industry Stakeholders */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <button
          onClick={() => toggleGroup('industry')}
          className="flex justify-between items-center w-full font-extrabold text-[11px] uppercase tracking-wider text-slate-800 dark:text-slate-200"
        >
          <span>Industry Sector</span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform ${expandedGroups.industry ? '' : '-rotate-90'}`} />
        </button>

        {expandedGroups.industry && (
          <div className="mt-3 space-y-2">
            {["Cluster", "Artisan", "Weaver", "Cooperative", "Manufacturer", "Exporter", "Brand", "Designer"].map((ind) => (
              <label key={ind} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedIndustries.includes(ind)}
                  onChange={() => handleToggleFilter(ind, selectedIndustries, setSelectedIndustries)}
                  className="rounded text-rose-600 focus:ring-rose-500/20 border-slate-300 dark:border-slate-700 dark:bg-slate-800 h-4 w-4"
                />
                <span>{ind}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. Sustainability Section */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <button
          onClick={() => toggleGroup('sustainability')}
          className="flex justify-between items-center w-full font-extrabold text-[11px] uppercase tracking-wider text-slate-800 dark:text-slate-200"
        >
          <span>Sustainability</span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform ${expandedGroups.sustainability ? '' : '-rotate-90'}`} />
        </button>

        {expandedGroups.sustainability && (
          <div className="mt-3 space-y-2">
            {["Organic", "Natural Dye", "Handloom", "Fair Trade", "Eco Friendly"].map((sust) => (
              <label key={sust} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedSustainability.includes(sust)}
                  onChange={() => handleToggleFilter(sust, selectedSustainability, setSelectedSustainability)}
                  className="rounded text-rose-600 focus:ring-rose-500/20 border-slate-300 dark:border-slate-700 dark:bg-slate-800 h-4 w-4"
                />
                <span>{sust}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 6. Occasion Section */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <button
          onClick={() => toggleGroup('occasion')}
          className="flex justify-between items-center w-full font-extrabold text-[11px] uppercase tracking-wider text-slate-800 dark:text-slate-200"
        >
          <span>Occasion</span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform ${expandedGroups.occasion ? '' : '-rotate-90'}`} />
        </button>

        {expandedGroups.occasion && (
          <div className="mt-3 space-y-2">
            {["Wedding", "Festive", "Daily", "Luxury", "Export"].map((occ) => (
              <label key={occ} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedOccasions.includes(occ)}
                  onChange={() => handleToggleFilter(occ, selectedOccasions, setSelectedOccasions)}
                  className="rounded text-rose-600 focus:ring-rose-500/20 border-slate-300 dark:border-slate-700 dark:bg-slate-800 h-4 w-4"
                />
                <span>{occ}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 7. Price Section */}
      <div>
        <button
          onClick={() => toggleGroup('price')}
          className="flex justify-between items-center w-full font-extrabold text-[11px] uppercase tracking-wider text-slate-800 dark:text-slate-200"
        >
          <span>Price Class</span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition-transform ${expandedGroups.price ? '' : '-rotate-90'}`} />
        </button>

        {expandedGroups.price && (
          <div className="mt-3 space-y-2">
            {["Budget", "Mid", "Premium", "Luxury"].map((pr) => (
              <label key={pr} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(pr)}
                  onChange={() => handleToggleFilter(pr, selectedPrices, setSelectedPrices)}
                  className="rounded text-rose-600 focus:ring-rose-500/20 border-slate-300 dark:border-slate-700 dark:bg-slate-800 h-4 w-4"
                />
                <span>{pr}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden pt-24 pb-16">
      <Navbar />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 mt-6">
        
        {/* Top Header Panel: Breadcrumbs, Search, Layout Controllers */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[32px] shadow-sm mb-8">
          
          {/* Breadcrumbs & Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              <Link to="/" className="hover:text-rose-600">Home</Link>
              <FontAwesomeIcon icon={faChevronRight} className="text-[7px]" />
              <span className="text-slate-600 dark:text-slate-300">Textile Explorer</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              Textile Explorer
            </h1>
          </div>

          {/* Search bar & Controller Toolbar */}
          <div className="flex flex-wrap items-center gap-4 flex-grow md:max-w-2xl justify-end">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md group">
              <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-rose-600 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials, weaves, states..."
                className="w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-rose-500/20 focus:bg-white dark:focus:bg-slate-900 transition-all text-xs font-semibold text-slate-800 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600"
                >
                  <FontAwesomeIcon icon={faTimes} size="xs" />
                </button>
              )}
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 px-3 rounded-lg text-xs transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 shadow-md text-rose-600 font-extrabold'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
                }`}
              >
                <FontAwesomeIcon icon={faThLarge} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 px-3 rounded-lg text-xs transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 shadow-md text-rose-600 font-extrabold'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
                }`}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700 rounded-xl transition-all text-slate-600 dark:text-slate-300"
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>

            {/* Mobile Filter Toggle (Visible only on mobile/tablet) */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-100 dark:border-rose-950/30 rounded-xl flex items-center gap-2 text-xs font-bold"
            >
              <FontAwesomeIcon icon={faFilter} />
              Filters
            </button>
          </div>

        </div>

        {/* Interactive India Map Panel (Collapsible Toggle) */}
        <div className="mb-8">
          <InteractiveIndiaMap
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
          />
        </div>

        {/* Main Body Grid */}
        <div className="flex gap-8 items-start">
          
          {/* Left Sidebar (Sticky Filters) - Hidden on mobile/tablet */}
          <aside className="hidden lg:block w-72 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] p-6 shadow-sm sticky top-28 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 pb-12">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FontAwesomeIcon icon={faFilter} className="text-xs text-rose-500" />
                Refine Search
              </h3>
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-black uppercase text-rose-500 hover:underline flex items-center gap-1.5"
              >
                <FontAwesomeIcon icon={faUndo} className="text-[8px]" />
                Reset
              </button>
            </div>
            
            <FilterPanel />
          </aside>

          {/* Right Content Area: Cards List */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Showing {filteredTextiles.length} textiles
              </p>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-rose-600 animate-spin" />
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Loading Live Textiles from Database...
                </p>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${viewMode}-${filteredTextiles.length}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={
                      viewMode === 'grid'
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "flex flex-col gap-6"
                    }
                  >
                    {filteredTextiles.map((textile) => {
                      const hasGi = textile.gi_tag;
                      
                      return (
                        <motion.div
                          layout
                          key={textile.id}
                          className={`glass-panel border border-white/5 dark:border-white/5 bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex ${
                            viewMode === 'grid' ? 'flex-col h-[540px]' : 'flex-col md:flex-row h-auto md:h-80'
                          }`}
                        >
                          {/* Image Frame */}
                          <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-850 flex-shrink-0 ${
                            viewMode === 'grid' ? 'w-full h-56' : 'w-full md:w-80 h-56 md:h-full'
                          }`}>
                            <img
                              src={textile.thumbnail}
                              alt={textile.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1582142401825-783286395b4f?q=80&w=600&auto=format&fit=crop";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                            
                            {/* Region & GI tag floating badges */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                              <span className="text-[8px] font-black uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-full">
                                {textile.regionName}
                              </span>
                              {hasGi && (
                                <span className="text-[8px] font-black uppercase tracking-wider text-rose-50 bg-rose-600/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                                  <FontAwesomeIcon icon={faCertificate} className="text-[8px]" />
                                  GI Tagged
                                </span>
                              )}
                            </div>

                            {/* Popularity Circle */}
                            <div className="absolute bottom-4 right-4 h-10 w-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full flex flex-col items-center justify-center shadow-md">
                              <span className="text-[10px] font-black text-rose-600 leading-none">{textile.popularity_score}</span>
                              <span className="text-[6px] font-bold text-slate-400 dark:text-slate-500 uppercase leading-none mt-0.5">Rating</span>
                            </div>
                          </div>

                          {/* Content Area */}
                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-3">
                              
                              {/* Location & category badges */}
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                                <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-rose-500 text-[8px]" />
                                  {textile.cityName}, {textile.stateName}
                                </span>
                                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                <span className="text-[9px] font-black uppercase text-indigo-500 bg-indigo-500/5 px-2 py-0.5 rounded-full">
                                  {textile.categoryName}
                                </span>
                              </div>

                              {/* Textile Name */}
                              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-rose-600 transition-colors">
                                {textile.name}
                              </h3>

                              {/* Quick details */}
                              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100/50 dark:border-white/5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1.5 truncate">
                                  <FontAwesomeIcon icon={faLeaf} className="text-[8px] text-emerald-500" />
                                  <span className="truncate">{textile.materialName}</span>
                                </div>
                                <div className="flex items-center gap-1.5 truncate">
                                  <FontAwesomeIcon icon={faCogs} className="text-[8px] text-indigo-500" />
                                  <span className="truncate">{textile.techniqueName}</span>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">
                                {textile.short_description}
                              </p>

                              {/* Primary Uses */}
                              <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate mt-1">
                                Uses: <span className="text-slate-600 dark:text-slate-350">{textile.primary_uses}</span>
                              </div>

                            </div>

                            {/* Footer Explore action */}
                            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-center mt-3">
                              <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                                {textile.price_range} Class
                              </span>
                              
                              <Link to={`/textile-explorer/${textile.slug}`} className="flex-shrink-0">
                                <button className="text-[10px] font-black uppercase tracking-wider bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-1">
                                  Explore
                                  <FontAwesomeIcon icon={faChevronRight} className="text-[8px] ml-1" />
                                </button>
                              </Link>
                            </div>
                          </div>

                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Empty state placeholder */}
                {filteredTextiles.length === 0 && (
                  <div className="py-24 text-center space-y-4 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-slate-450 mx-auto">
                      <FontAwesomeIcon icon={faFilter} size="lg" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">No textiles match your filters</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
                      Try relaxing your criteria, typing different keywords, or resetting the filters using the button.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="btn-primary py-2 px-6 text-xs uppercase tracking-wider font-extrabold shadow-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

        </div>

      </div>

      {/* Mobile/Tablet Filter Drawer Overlay */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md h-full bg-white dark:bg-slate-950 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-900 flex justify-between items-center bg-white dark:bg-slate-950 z-10">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
                  <FontAwesomeIcon icon={faFilter} className="text-rose-500" />
                  Filter Options
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-slate-400 hover:text-rose-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950">
                <FilterPanel />
              </div>

              {/* Drawer Footer actions */}
              <div className="p-6 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 flex gap-4">
                <button
                  onClick={() => {
                    handleResetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-1/2 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 py-3 btn-primary text-xs font-bold uppercase justify-center"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default TextileExplorer;
