import { useState } from 'react';
import { motion } from 'framer-motion';
import { regions } from '../data/textileDatabase';
import indiaMapData from '@svg-maps/india';

// Mapping state IDs to the 6 geographic regions
const stateToRegion = {
  // North
  ch: 'North', dl: 'North', hr: 'North', hp: 'North', jk: 'North', pb: 'North', up: 'North', ut: 'North', ua: 'North', la: 'North',
  // West
  dn: 'West', dd: 'West', ga: 'West', gj: 'West', mh: 'West', rj: 'West',
  // Central
  ct: 'Central', mp: 'Central',
  // East
  br: 'East', jh: 'East', or: 'East', od: 'East', wb: 'East',
  // Northeast
  ar: 'Northeast', as: 'Northeast', mn: 'Northeast', ml: 'Northeast', mz: 'Northeast', nl: 'Northeast', sk: 'Northeast', tr: 'Northeast',
  // South
  an: 'South', ap: 'South', ka: 'South', kl: 'South', ld: 'South', py: 'South', tn: 'South', tg: 'South', ts: 'South'
};

// Region metadata (without custom paths, which are loaded dynamically)
const regionPaths = [
  {
    id: "North",
    name: "North India",
    color: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/20",
    states: ["Uttar Pradesh", "Delhi", "Punjab", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Uttarakhand"]
  },
  {
    id: "West",
    name: "West India",
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20",
    states: ["Gujarat", "Rajasthan", "Maharashtra", "Goa"]
  },
  {
    id: "Central",
    name: "Central India",
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    states: ["Madhya Pradesh", "Chhattisgarh"]
  },
  {
    id: "East",
    name: "East India",
    color: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/20",
    states: ["Odisha", "West Bengal", "Bihar", "Jharkhand"]
  },
  {
    id: "Northeast",
    name: "Northeast India",
    color: "from-fuchsia-500 to-pink-600",
    shadow: "shadow-fuchsia-500/20",
    states: ["Assam", "Arunachal Pradesh", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"]
  },
  {
    id: "South",
    name: "South India",
    color: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-500/20",
    states: ["Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana", "Kerala"]
  }
];

const InteractiveIndiaMap = ({ selectedRegion, onSelectRegion }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const handleRegionClick = (regionId) => {
    if (selectedRegion === regionId) {
      onSelectRegion(null); // Deselect if already selected
    } else {
      onSelectRegion(regionId);
    }
  };

  return (
    <div className="w-full relative bg-textile-linen-dark p-8 border border-stone-850/80 rounded-[32px] overflow-hidden shadow-2xl border-stitch-gold">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* Left Side: SVG Map container */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative">
          
          {/* Subtle Background Glow Rings */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />
          
          <svg
            viewBox="0 0 612 696"
            className="w-full max-w-[450px] h-auto filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 select-none"
          >
            {/* Definitions for Gradients */}
            <defs>
              {regionPaths.map((region) => (
                <linearGradient id={`grad-${region.id}`} key={region.id} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={`stop-${region.id}-start`} style={{ stopColor: region.id === 'North' ? '#6366f1' : region.id === 'West' ? '#f59e0b' : region.id === 'Central' ? '#10b981' : region.id === 'East' ? '#06b6d4' : region.id === 'Northeast' ? '#d946ef' : '#f43f5e' }} />
                  <stop offset="100%" className={`stop-${region.id}-end`} style={{ stopColor: region.id === 'North' ? '#8b5cf6' : region.id === 'West' ? '#ea580c' : region.id === 'Central' ? '#0f766e' : region.id === 'East' ? '#3b82f6' : region.id === 'Northeast' ? '#ec4899' : '#e11d48' }} />
                </linearGradient>
              ))}
              
              {/* Highlight Glow Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Region Paths */}
            <g className="cursor-pointer">
              {indiaMapData.locations.map((loc) => {
                const regionId = stateToRegion[loc.id] || 'Other';
                const isSelected = selectedRegion === regionId;
                const isHovered = hoveredRegion === regionId;
                
                return (
                  <path
                    key={loc.id}
                    id={loc.id}
                    d={loc.path}
                    fill={`url(#grad-${regionId})`}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 1.5 : 0.8}
                    strokeOpacity={isSelected ? 0.9 : 0.4}
                    opacity={selectedRegion ? (isSelected ? 1 : 0.2) : (hoveredRegion ? (isHovered ? 1 : 0.4) : 0.85)}
                    className="transition-all duration-300"
                    filter={isHovered || isSelected ? "url(#glow)" : "none"}
                    style={{
                      transform: isHovered || isSelected ? "scale(1.015)" : "scale(1)",
                      transformOrigin: "306px 348px",
                    }}
                    onClick={() => handleRegionClick(regionId)}
                    onMouseEnter={() => setHoveredRegion(regionId)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  />
                );
              })}
            </g>

            {/* Region Labels */}
            {regionPaths.map((region) => {
              // Approximate center coordinates for labels
              const centers = {
                North: { x: 240, y: 180 },
                West: { x: 140, y: 310 },
                Central: { x: 260, y: 330 },
                East: { x: 400, y: 310 },
                Northeast: { x: 530, y: 220 },
                South: { x: 220, y: 530 }
              };
              
              const isSelected = selectedRegion === region.id;
              
              return (
                <text
                  key={`label-${region.id}`}
                  x={centers[region.id].x}
                  y={centers[region.id].y}
                  textAnchor="middle"
                  className={`pointer-events-none select-none font-bold text-[10px] tracking-widest uppercase transition-all duration-300 ${
                    isSelected ? 'fill-white scale-110 font-black' : 'fill-white/80'
                  }`}
                  style={{
                    filter: "drop-shadow(0px 1px 3px rgba(0,0,0,0.5))"
                  }}
                >
                  {region.id}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Right Side: Map Controls & Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 text-left">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.2em] rounded-full">Interactive Experience</span>
            <h3 className="text-3xl font-black text-stone-100 tracking-tight leading-none mt-2">
              Heritage Map of India
            </h3>
            <p className="text-sm text-stone-300 mt-3 leading-relaxed">
              Hover over the geographic regions of the Indian subcontinent to discover localized weaving styles and materials. Click a region to filter the list below.
            </p>
          </div>

          {/* Dynamic Details Box */}
          <div className="min-h-[140px] p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300">
            {hoveredRegion || selectedRegion ? (
              (() => {
                const activeId = hoveredRegion || selectedRegion;
                const rData = regionPaths.find(r => r.id === activeId);
                return (
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full bg-gradient-to-r ${rData.color}`} />
                      <h4 className="font-extrabold text-lg text-stone-100 uppercase tracking-wider">{rData.name}</h4>
                      {selectedRegion === activeId && (
                        <span className="text-[9px] font-black uppercase bg-rose-500 text-white px-2 py-0.5 rounded-full ml-auto">Active Filter</span>
                      )}
                    </div>
                    
                    <p className="text-xs text-stone-300 leading-relaxed font-medium">
                      {regions.find(r => r.name === activeId)?.description}
                    </p>

                    <div className="pt-2 border-t border-white/10">
                      <p className="text-[9px] font-black uppercase text-stone-400 tracking-wider">Associated States:</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {rData.states.map((st) => (
                          <span key={st} className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-850 text-stone-300">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })()
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center text-stone-400 py-6">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-600 animate-ping mb-3" />
                <p className="text-xs italic font-medium text-stone-400">No region selected. Hover over the map or click a region to explore details.</p>
              </div>
            )}
          </div>

          {/* Quick Selection Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {regionPaths.map(r => (
              <button
                key={`btn-${r.id}`}
                onClick={() => handleRegionClick(r.id)}
                className={`text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedRegion === r.id
                    ? `bg-gradient-to-r ${r.color} text-white border-transparent shadow-lg ${r.shadow}`
                    : 'bg-stone-900/50 border-stone-800 text-stone-300 hover:bg-stone-800'
                }`}
              >
                {r.id}
              </button>
            ))}
            {selectedRegion && (
              <button
                onClick={() => onSelectRegion(null)}
                className="text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300"
              >
                Reset Filter
              </button>
            )}
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default InteractiveIndiaMap;

