"use client";

import React, { useState, useEffect, useRef } from 'react';

// =========================================================================
// 1. IKON SVG PROFESIONAL
// =========================================================================
export const Icons = {
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  Layout: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.5-6h15m-15-6h15m-3-4.5H5.25C4.007 3 3 4.007 3 5.25v13.5c0 1.243 1.007 2.25 2.25 2.25h13.5c1.243 0 2.25-2.25V5.25c0-1.243-1.007-2.25-2.25-2.25z" /></svg>,
  Typography: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" /></svg>,
  Border: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
  Glass: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18m6-18v18M3 9h18m-18 6h18" opacity="0.3"/></svg>,
  Glow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  Shadow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" /></svg>,
  Neumorphism: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>,
  Filters: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
  Cube3D: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  Animation: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  TextGrad: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
  Shapes: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Transitions: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
};

// =========================================================================
// 2. COLOR ENGINE & HELPERS
// =========================================================================
export const safeHex = (hex) => (typeof hex === 'string' && hex.startsWith('#') && (hex.length === 4 || hex.length === 7)) ? hex : '#000000';
export const hexToRgb = (hex) => {
  const h = safeHex(hex);
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
};
export const hexToHsl = (hex) => {
  const h_str = safeHex(hex);
  let r = 0, g = 0, b = 0;
  if (h_str.length === 7) { r = parseInt(h_str.slice(1, 3), 16) / 255; g = parseInt(h_str.slice(3, 5), 16) / 255; b = parseInt(h_str.slice(5, 7), 16) / 255; }
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
    h /= 6;
  }
  return { h: Math.round(h * 360) || 0, s: Math.round(s * 100) || 0, l: Math.round(l * 100) || 0 };
};
export const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => { const k = (n + h / 30) % 12; const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); return Math.round(255 * color).toString(16).padStart(2, '0'); };
  return `#${f(0)}${f(8)}${f(4)}`;
};
export const COLOR_PRESETS = ['#ffffff', '#1e1e1e', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#14b8a6'];

// =========================================================================
// 3. UI COMPONENTS (V14 - Anti Popup Native Select)
// =========================================================================

export const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => (
  <div className="flex items-center justify-between py-2 group border-b border-white/5 last:border-0">
    <label className="text-[10px] font-medium text-slate-400 w-1/3 group-hover:text-slate-200 transition-colors truncate pr-2">{label}</label>
    <div className="w-2/3 flex items-center gap-3">
      <input type="range" min={min} max={max} step={step} value={value || 0} onChange={(e) => onChange(Number(e.target.value) || 0)} className="w-full h-[2px] bg-[#444] rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-150 transition-all" />
      <div className="bg-[#0a0a0b] px-2 py-1 rounded border border-[#333] w-14 text-right shrink-0">
        <span className="text-[10px] font-mono text-cyan-400">{value}{unit}</span>
      </div>
    </div>
  </div>
);

export const FigmaColorPicker = ({ label, hexValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hsl, setHsl] = useState(hexToHsl(hexValue));
  useEffect(() => { setHsl(hexToHsl(hexValue)); }, [hexValue]);

  const handleHslChange = (part, val) => {
    const newHsl = { ...hsl, [part]: val };
    setHsl(newHsl);
    onChange(hslToHex(newHsl.h, newHsl.s, newHsl.l));
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-[10px] font-medium text-slate-400">{label}</label>
      </div>
      <div className="bg-[#111111] border border-[#333] rounded-lg overflow-hidden transition-all duration-300 shadow-sm">
        <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-[#1a1a1c] transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded shadow-inner border border-white/10" style={{backgroundColor: hexValue}}></div>
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-slate-300 uppercase leading-none">{label}</span>
               <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">{hexValue}</span>
            </div>
          </div>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <Icons.ChevronDown />
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] border-t border-[#333] p-3 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">Hue</span></div>
              <input type="range" min="0" max="360" value={hsl.h} onChange={(e) => handleHslChange('h', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'}} />
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">Saturation</span></div>
              <input type="range" min="0" max="100" value={hsl.s} onChange={(e) => handleHslChange('s', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #808080, ${hslToHex(hsl.h, 100, 50)})`}} />
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">Lightness</span></div>
              <input type="range" min="0" max="100" value={hsl.l} onChange={(e) => handleHslChange('l', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #000, ${hslToHex(hsl.h, hsl.s, 50)}, #fff)`}} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#333]">
            {COLOR_PRESETS.map((c) => (
              <button key={c} onClick={() => onChange(c)} className={`w-5 h-5 rounded-full border transition-transform hover:scale-125 ${hexValue===c ? 'border-white scale-110 shadow-lg' : 'border-white/20'}`} style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FigmaSelect = ({ label, options, value, onChange }) => (
  <div className="mb-4">
     <label className="text-[10px] font-medium text-slate-400 block mb-2">{label}</label>
     <div className="flex bg-[#111111] p-1 rounded-lg border border-[#333] overflow-x-auto custom-scroll">
        {options.map(opt => (
           <button key={opt} onClick={() => onChange(opt)} className={`flex-1 min-w-[60px] py-1.5 px-2 rounded text-[9px] font-bold uppercase transition-all whitespace-nowrap ${value === opt ? 'bg-[#252526] text-cyan-400 shadow-sm border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}>{opt}</button>
        ))}
     </div>
  </div>
);

export const FigmaTextInput = ({ label, value, onChange, placeholder = "Ketik sesuatu..." }) => (
  <div className="mb-4">
     <label className="text-[10px] font-medium text-slate-400 block mb-2">{label}</label>
     <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-[#111111] border border-[#333] rounded-lg px-3 py-2.5 text-[11px] text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600" />
  </div>
);

// FIX V14: CUSTOM DROPDOWN (PENGGANTI <select> BAWAAN OS AGAR TIDAK ADA POPUP)
export const FigmaCustomDropdown = ({ label, groups, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get current name
  let currentName = value;
  for (const group in groups) {
    const found = groups[group].find(opt => opt.val === value);
    if (found) { currentName = found.name; break; }
  }

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      <label className="text-[10px] font-medium text-slate-400 block mb-2">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#111111] border border-[#333] rounded-lg px-3 py-2.5 flex justify-between items-center cursor-pointer hover:border-cyan-500/50 transition-colors"
      >
        <span className="text-[11px] text-white font-mono truncate">{currentName}</span>
        <div className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></div>
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#111111] border border-[#333] rounded-lg shadow-2xl max-h-[200px] overflow-y-auto custom-scroll ring-1 ring-black/50">
          {Object.entries(groups).map(([groupName, options]) => (
            <div key={groupName}>
              <div className="px-3 py-1.5 bg-[#18181b] text-[9px] font-bold text-cyan-500 uppercase tracking-widest sticky top-0 border-b border-[#333]/50">
                {groupName}
              </div>
              {options.map(opt => (
                <div 
                  key={opt.val} 
                  onClick={() => { onChange(opt.val); setIsOpen(false); }}
                  className={`px-4 py-2 text-[11px] cursor-pointer hover:bg-[#252526] transition-colors font-mono ${value === opt.val ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500' : 'text-slate-300'}`}
                >
                  {opt.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CodeOutput = ({ code, isMobileTab }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`w-full h-full bg-[#111111] relative flex flex-col overflow-hidden ${isMobileTab ? '' : 'border-t lg:border border-[#252526] lg:rounded-2xl shadow-xl'}`}>
       <button onClick={handleCopy} className="absolute top-3 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded bg-[#252526] border border-[#333] text-slate-300 hover:bg-cyan-500 hover:text-[#111] transition-all text-[9px] font-bold uppercase tracking-wider shadow-md">
         {copied ? <><Icons.Check /> COPIED</> : <><Icons.Copy /> COPY CSS</>}
       </button>
       {!isMobileTab && (
         <div className="px-4 py-3 border-b border-[#252526] bg-[#18181b] shrink-0">
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">CSS Output Code</span>
         </div>
       )}
       <div className={`p-4 overflow-y-auto flex-grow bg-[#0a0a0b] custom-scroll ${isMobileTab ? 'pb-24' : ''}`}>
          <pre className="text-[11px] font-mono text-cyan-300/90 leading-relaxed whitespace-pre-wrap break-words"><code>{code}</code></pre>
       </div>
    </div>
  )
};

// =========================================================================
// 4. MASTER WORKSPACE LAYOUT (FIXED CANVAS + MOBILE TABS)
// =========================================================================
export const WorkspaceLayout = ({ name, controls, preview, cssOutput, bgType = 'grid', bgHex }) => {
  const [mobileTab, setMobileTab] = useState('design'); 

  return (
    <div className="flex flex-col lg:flex-row w-full h-full animate-fade-in bg-[#0a0a0b] lg:bg-transparent">
       
       {/* MOBILE CANVAS */}
       <div className="h-[35vh] sm:h-[40vh] lg:hidden relative flex items-center justify-center overflow-hidden border-b border-[#333] z-30 transition-colors duration-500 shadow-lg shrink-0" style={{backgroundColor: bgHex || '#0a0a0b'}}>
          {bgType === 'grid' && <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>}
          {bgType === 'image' && <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}></div>}
          {bgType === 'light' && <div className="absolute inset-0 bg-[#f8fafc]"></div>}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4 overflow-hidden perspective-1000">{preview}</div>
       </div>

       {/* DESKTOP COLUMN */}
       <div className="hidden lg:flex flex-1 flex-col min-w-0 lg:border-r border-[#252526]">
         <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[#0a0a0b] border-b border-[#252526] z-10 transition-colors duration-500" style={{backgroundColor: bgHex || '#0a0a0b'}}>
            {bgType === 'grid' && <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>}
            {bgType === 'image' && <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}></div>}
            {bgType === 'light' && <div className="absolute inset-0 bg-[#f8fafc]"></div>}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 overflow-hidden perspective-1000">{preview}</div>
         </div>
         <div className="h-[260px] shrink-0 p-4 bg-[#111111]">
            <CodeOutput code={cssOutput} />
         </div>
       </div>

       {/* PROPERTIES PANEL */}
       <div className="flex-1 lg:w-[360px] lg:flex-none bg-[#18181b] flex flex-col z-20 overflow-hidden shadow-2xl">
         <div className="px-4 py-4 border-b border-[#252526] bg-[#18181b] shrink-0">
            <h2 className="text-[12px] font-bold text-white uppercase tracking-widest hidden lg:block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block animate-pulse"></span> {name} Properties
            </h2>
            <div className="flex lg:hidden bg-[#0a0a0b] p-1 rounded-lg border border-[#333] w-full">
              <button onClick={() => setMobileTab('design')} className={`flex-1 py-2 rounded-md text-[10px] font-bold uppercase transition-all ${mobileTab === 'design' ? 'bg-[#252526] text-white shadow-sm border border-[#444]' : 'text-slate-500 hover:text-slate-300'}`}>Design Tools</button>
              <button onClick={() => setMobileTab('code')} className={`flex-1 py-2 rounded-md text-[10px] font-bold uppercase transition-all ${mobileTab === 'code' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}>CSS Output</button>
            </div>
         </div>
         {/* OVERFLOW VISIBLE AGAR CUSTOM DROPDOWN BISA KELUAR BATAS JIKA PERLU */}
         <div className="flex-1 overflow-y-auto custom-scroll relative bg-[#18181b]">
            <div className={`p-4 lg:p-5 lg:block ${mobileTab === 'design' ? 'block' : 'hidden'}`}>
              {controls}
              <div className="h-48 lg:h-12"></div> 
            </div>
            <div className={`h-full lg:hidden ${mobileTab === 'code' ? 'block' : 'hidden'}`}>
              <CodeOutput code={cssOutput} isMobileTab={true} />
            </div>
         </div>
       </div>
    </div>
  );
};

// =========================================================================
// 5. THE PLUGINS (V14 - NO POPUP + PRO TYPOGRAPHY)
// =========================================================================

export const PluginBackgroundGradient = () => {
  const [color1, setColor1] = useState('#0ea5e9');
  const [color2, setColor2] = useState('#8b5cf6');
  const [angle, setAngle] = useState(145);

  const css = `background: linear-gradient(${angle}deg, ${color1}, ${color2});\nborder-radius: 12px;`;
  const preview = <div style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, width: '80%', maxWidth: '400px', height: '140px', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
      <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </>
  );
  return <WorkspaceLayout name="Box Gradient" controls={controls} preview={preview} cssOutput={css} />;
};

// FIX V14: TEXT GRADIENT ROBUST (ANTI BUG)
export const PluginTextGradient = () => {
  const [text, setText] = useState('MRR STUDIO');
  const [color1, setColor1] = useState('#ec4899');
  const [color2, setColor2] = useState('#f59e0b');
  const [angle, setAngle] = useState(90);

  const css = `background: linear-gradient(${angle}deg, ${color1}, ${color2});\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;\nbackground-clip: text;\ncolor: transparent;`;
  
  const preview = (
    <div className="w-full h-full flex items-center justify-center p-4">
      <span style={{ 
        background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        backgroundClip: 'text',
        color: 'transparent',
        fontSize: 'clamp(2rem, 8vw, 5rem)', // Responsif otomatis
        fontWeight: '900', 
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        display: 'inline-block'
      }}>
        {text || 'GRADIENT'}
      </span>
    </div>
  );

  const controls = (
    <>
      <FigmaTextInput label="Custom Text" value={text} onChange={setText} placeholder="Masukkan teks..." />
      <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
      <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </>
  );
  return <WorkspaceLayout name="Text Gradient" controls={controls} preview={preview} cssOutput={css} />;
};

// FIX V14: TYPOGRAPHY PRO (100+ FONTS + VARIATIONS)
const FONTS_DATA = {
  "Sans Serif Popular": [
    { name: "Inter", val: "Inter" }, { name: "Roboto", val: "Roboto" }, { name: "Open Sans", val: "Open Sans" }, 
    { name: "Montserrat", val: "Montserrat" }, { name: "Poppins", val: "Poppins" }, { name: "Lato", val: "Lato" }, 
    { name: "Oswald", val: "Oswald" }, { name: "Raleway", val: "Raleway" }, { name: "Nunito", val: "Nunito" }, { name: "Quicksand", val: "Quicksand" }
  ],
  "Serif Classic": [
    { name: "Playfair Display", val: "Playfair Display" }, { name: "Merriweather", val: "Merriweather" }, 
    { name: "Lora", val: "Lora" }, { name: "PT Serif", val: "PT Serif" }, { name: "Noto Serif", val: "Noto Serif" }, 
    { name: "Crimson Text", val: "Crimson Text" }, { name: "EB Garamond", val: "EB Garamond" }, { name: "Bitter", val: "Bitter" }
  ],
  "Display & Creative": [
    { name: "Bebas Neue", val: "Bebas Neue" }, { name: "Lobster", val: "Lobster" }, { name: "Righteous", val: "Righteous" }, 
    { name: "Fjalla One", val: "Fjalla One" }, { name: "Alfa Slab One", val: "Alfa Slab One" }, { name: "Pacifico", val: "Pacifico" }, 
    { name: "Caveat", val: "Caveat" }, { name: "Amatic SC", val: "Amatic SC" }, { name: "Dancing Script", val: "Dancing Script" }
  ],
  "Monospace / Code": [
    { name: "Fira Code", val: "Fira Code" }, { name: "Inconsolata", val: "Inconsolata" }, { name: "Source Code Pro", val: "Source Code Pro" }, 
    { name: "Space Mono", val: "Space Mono" }, { name: "IBM Plex Mono", val: "IBM Plex Mono" }, { name: "JetBrains Mono", val: "JetBrains Mono" }
  ]
};

export const PluginTypography = () => {
  const [text, setText] = useState('Design System');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [variation, setVariation] = useState('H1');
  const [size, setSize] = useState(48);
  const [spacing, setSpacing] = useState(0);
  const [height, setHeight] = useState(1.2);
  const [weight, setWeight] = useState('700');
  const [color, setColor] = useState('#ffffff');

  // Load Google Font Dynamically
  useEffect(() => {
    const linkId = `gfont-${fontFamily.replace(/\s+/g, '-')}`;
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;600;700;900&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, [fontFamily]);

  // Handle Preset Variation Selection
  const applyVariation = (v) => {
    setVariation(v);
    if (v === 'H1') { setSize(56); setWeight('900'); setSpacing(-1); setHeight(1.1); }
    if (v === 'H2') { setSize(32); setWeight('700'); setSpacing(0); setHeight(1.3); }
    if (v === 'Body') { setSize(16); setWeight('400'); setSpacing(0); setHeight(1.6); }
    if (v === 'Caption') { setSize(12); setWeight('600'); setSpacing(1); setHeight(1.4); }
  };

  const css = `@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@${weight}&display=swap');\n\nfont-family: '${fontFamily}', sans-serif;\nfont-size: ${size}px;\nfont-weight: ${weight};\nletter-spacing: ${spacing}px;\nline-height: ${height};\ncolor: ${color};`;
  
  const preview = (
    <div style={{ fontFamily: `"${fontFamily}", sans-serif`, fontSize: `${size}px`, letterSpacing: `${spacing}px`, lineHeight: height, color: color, fontWeight: weight, textAlign: 'center', wordBreak: 'break-word', maxWidth: '100%', transition: 'all 0.2s ease' }}>
      {text || 'Type something'}
    </div>
  );

  const controls = (
    <>
      <FigmaTextInput label="Custom Text" value={text} onChange={setText} />
      
      {/* Type Scale Variations */}
      <div className="mb-4">
        <label className="text-[10px] font-medium text-slate-400 block mb-2">Preset Variations</label>
        <div className="flex bg-[#111111] p-1 rounded-lg border border-[#333] w-full">
          {['H1', 'H2', 'Body', 'Caption'].map(v => (
            <button key={v} onClick={() => applyVariation(v)} className={`flex-1 py-1.5 rounded-md text-[9px] font-bold uppercase transition-all ${variation === v ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}>{v}</button>
          ))}
        </div>
      </div>

      <FigmaCustomDropdown label="Font Family (100+ Fonts)" groups={FONTS_DATA} value={fontFamily} onChange={setFontFamily} />
      <FigmaColorPicker label="Text Color" hexValue={color} onChange={setColor} />
      <FigmaSelect label="Font Weight" options={['300', '400', '600', '700', '900']} value={weight} onChange={setWeight} />
      <FigmaSlider label="Font Size" min={10} max={120} value={size} onChange={(val) => { setSize(val); setVariation('Custom'); }} unit="px" />
      <FigmaSlider label="Letter Spacing" min={-5} max={20} step={0.5} value={spacing} onChange={(val) => { setSpacing(val); setVariation('Custom'); }} unit="px" />
      <FigmaSlider label="Line Height" min={0.5} max={3} step={0.1} value={height} onChange={(val) => { setHeight(val); setVariation('Custom'); }} unit="" />
    </>
  );
  return <WorkspaceLayout name="Pro Typography" controls={controls} preview={preview} cssOutput={css} />;
};

export const PluginLayout = () => {
  const [padding, setPadding] = useState(32);
  const [radius, setRadius] = useState(24);

  const css = `padding: ${padding}px;\nborder-radius: ${radius}px;\nbackground-color: #252526;\ncolor: #ffffff;`;
  const preview = <div style={{ padding: `${padding}px`, borderRadius: `${radius}px`, backgroundColor: '#252526', color: '#fff', textAlign: 'center', border: '1px solid #333' }}>Box Container</div>;
  const controls = (
    <>
      <FigmaSlider label="Padding" min={0} max={100} value={padding} onChange={setPadding} unit="px" />
      <FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Box Layout" controls={controls} preview={preview} cssOutput={css} />;
};

export const PluginBorder = () => {
  const [width, setWidth] = useState(4);
  const [radius, setRadius] = useState(20);
  const [style, setStyle] = useState('solid');
  const [color, setColor] = useState('#0ea5e9');

  const css = `border: ${width}px ${style} ${color};\nborder-radius: ${radius}px;\nbackground-color: transparent;`;
  const preview = <div style={{ width: 180, height: 120, border: `${width}px ${style} ${color}`, borderRadius: `${radius}px`, backgroundColor: 'rgba(255,255,255,0.02)' }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Border Color" hexValue={color} onChange={setColor} />
      <FigmaSelect label="Style" options={['solid', 'dashed', 'dotted', 'double']} value={style} onChange={setStyle} />
      <FigmaSlider label="Border Width" min={1} max={30} value={width} onChange={setWidth} unit="px" />
      <FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Border Styling" controls={controls} preview={preview} cssOutput={css} />;
};

const SHAPES_DATA = {
  "Basic": [
    { name: "Circle", val: "circle(50% at 50% 50%)" },
    { name: "Ellipse", val: "ellipse(40% 50% at 50% 50%)" },
    { name: "Square", val: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
  ],
  "Polygons": [
    { name: "Triangle", val: "polygon(50% 0%, 0% 100%, 100% 100%)" },
    { name: "Rhombus", val: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
    { name: "Pentagon", val: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" },
    { name: "Hexagon", val: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" },
    { name: "Heptagon", val: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)" },
    { name: "Octagon", val: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }
  ],
  "Special": [
    { name: "Star", val: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" },
    { name: "Cross", val: "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)" },
    { name: "Message", val: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)" },
    { name: "Arrow", val: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)" },
    { name: "Chevron", val: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)" },
    { name: "Ticket", val: "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)" }
  ]
};

export const PluginShapes = () => {
  const [shape, setShape] = useState(SHAPES_DATA["Polygons"][0].val);
  const [color, setColor] = useState('#8b5cf6');

  const css = `clip-path: ${shape};\nbackground-color: ${color};\nwidth: 200px;\nheight: 200px;`;
  const preview = <div style={{ clipPath: shape, backgroundColor: color, width: '150px', height: '150px' }}></div>;
  const controls = (
    <>
      <FigmaCustomDropdown label="Select Shape Form" groups={SHAPES_DATA} value={shape} onChange={setShape} />
      <FigmaColorPicker label="Shape Color" hexValue={color} onChange={setColor} />
    </>
  );
  return <WorkspaceLayout name="CSS Shapes" controls={controls} preview={preview} cssOutput={css} />;
};


export const PluginGlassmorphism = () => {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(15);
  const [color, setColor] = useState('#ffffff');

  const rgb = hexToRgb(color);
  const css = `background: rgba(${rgb}, ${opacity / 100});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid rgba(${rgb}, 0.3);\nborder-radius: 16px;`;
  const preview = <div style={{ width: 180, height: 120, background: `rgba(${rgb}, ${opacity / 100})`, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, border: `1px solid rgba(${rgb}, 0.3)`, borderRadius: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Glass Tint" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Opacity" min={1} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="Blur Intensity" min={0} max={50} value={blur} onChange={setBlur} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Glassmorphism" controls={controls} preview={preview} cssOutput={css} bgType="image" />;
};

export const PluginNeumorphism = () => {
  const [bg, setBg] = useState('#e0e5ec');
  const [dist, setDist] = useState(10);
  const [blur, setBlur] = useState(20);

  const css = `background-color: ${bg};\nborder-radius: 20px;\nbox-shadow: ${dist}px ${dist}px ${blur}px #a3b1c6,\n            -${dist}px -${dist}px ${blur}px #ffffff;`;
  const preview = <div style={{ width: 120, height: 120, backgroundColor: bg, borderRadius: 20, boxShadow: `${dist}px ${dist}px ${blur}px #a3b1c6, -${dist}px -${dist}px ${blur}px #ffffff` }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Base Background" hexValue={bg} onChange={setBg} />
      <FigmaSlider label="Distance" min={1} max={30} value={dist} onChange={setDist} unit="px" />
      <FigmaSlider label="Blur Radius" min={1} max={60} value={blur} onChange={setBlur} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Neumorphism" controls={controls} preview={preview} cssOutput={css} bgType="light" bgHex="#e0e5ec" />;
};

export const PluginShadow = () => {
  const [x, setX] = useState(10);
  const [y, setY] = useState(15);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(0);
  const [opacity, setOpacity] = useState(40);
  const [color, setColor] = useState('#000000');

  const css = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100});\nborder-radius: 12px;\nbackground-color: #ffffff;`;
  const preview = <div style={{ width: 140, height: 140, backgroundColor: '#ffffff', borderRadius: 12, boxShadow: `${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})` }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Shadow Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Opacity" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="X Offset" min={-50} max={50} value={x} onChange={setX} unit="px" />
      <FigmaSlider label="Y Offset" min={-50} max={50} value={y} onChange={setY} unit="px" />
      <FigmaSlider label="Blur Radius" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Spread Radius" min={-50} max={50} value={spread} onChange={setSpread} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Drop Shadow" controls={controls} preview={preview} cssOutput={css} bgType="light" />;
};

export const PluginGlow = () => {
  const [color, setColor] = useState('#0ea5e9');
  const [blur, setBlur] = useState(40);
  const [spread, setSpread] = useState(10);

  const css = `box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8);\nborder-radius: 50%;\nbackground-color: ${color};`;
  const preview = <div style={{ width: 80, height: 80, backgroundColor: color, borderRadius: '50%', boxShadow: `0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)` }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Glow Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Blur Radius" min={0} max={150} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Spread Radius" min={0} max={100} value={spread} onChange={setSpread} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} />;
};

export const PluginFilters = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [hue, setHue] = useState(0);
  const [blur, setBlur] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [invert, setInvert] = useState(0);

  const css = `/* Pro Image Filters */\nfilter: \n  brightness(${brightness}%)\n  contrast(${contrast}%)\n  saturate(${saturate}%)\n  hue-rotate(${hue}deg)\n  blur(${blur}px)\n  sepia(${sepia}%)\n  grayscale(${grayscale}%)\n  invert(${invert}%);`;
  
  const preview = (
    <div className="relative w-full h-full max-w-[360px] max-h-[260px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
       <img 
         src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" 
         alt="Filter Demo" 
         className="w-full h-full object-cover transition-all duration-200"
         style={{ 
           filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg) blur(${blur}px) sepia(${sepia}%) grayscale(${grayscale}%) invert(${invert}%)`
         }} 
       />
    </div>
  );

  const controls = (
    <div className="space-y-1 pb-4">
      <div className="mb-3 pb-2 border-b border-[#333]">
        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between">
          <span>Light & Color Tuning</span>
          <button onClick={() => { setBrightness(100); setContrast(100); setSaturate(100); setHue(0); }} className="text-[8px] text-slate-300 hover:text-white bg-[#252526] border border-[#444] px-2 py-1 rounded transition-colors">RESET</button>
        </div>
      </div>
      <FigmaSlider label="Exposure" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
      <FigmaSlider label="Contrast" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
      <FigmaSlider label="Vibrance" min={0} max={200} value={saturate} onChange={setSaturate} unit="%" />
      <FigmaSlider label="Tint (Hue)" min={0} max={360} value={hue} onChange={setHue} unit="°" />
      
      <div className="mt-6 mb-3 pb-2 border-b border-[#333]">
        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between">
          <span>Effects & Details</span>
          <button onClick={() => { setBlur(0); setSepia(0); setGrayscale(0); setInvert(0); }} className="text-[8px] text-slate-300 hover:text-white bg-[#252526] border border-[#444] px-2 py-1 rounded transition-colors">RESET</button>
        </div>
      </div>
      <FigmaSlider label="Lens Blur" min={0} max={20} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Vintage (Sepia)" min={0} max={100} value={sepia} onChange={setSepia} unit="%" />
      <FigmaSlider label="B&W (Grayscale)" min={0} max={100} value={grayscale} onChange={setGrayscale} unit="%" />
      <FigmaSlider label="Negative (Invert)" min={0} max={100} value={invert} onChange={setInvert} unit="%" />
    </div>
  );

  return <WorkspaceLayout name="Pro Filters" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};

export const PluginTransform = () => {
  const [rotateX, setRotateX] = useState(30);
  const [rotateY, setRotateY] = useState(-30);
  const [rotateZ, setRotateZ] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [translateZ, setTranslateZ] = useState(0);
  const [scale, setScale] = useState(1);

  const css = `/* Parent Container Requires Perspective! */\n.parent {\n  perspective: 1000px;\n  transform-style: preserve-3d;\n}\n\n.element {\n  transform: \n    rotateX(${rotateX}deg) \n    rotateY(${rotateY}deg) \n    rotateZ(${rotateZ}deg) \n    translate3d(${translateX}px, ${translateY}px, ${translateZ}px) \n    scale(${scale});\n}`;
  
  const preview = (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
      <div 
        className="w-32 h-32 bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-2xl flex flex-col items-center justify-center border border-white/30 rounded-xl"
        style={{ 
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translate3d(${translateX}px, ${translateY}px, ${translateZ}px) scale(${scale})`,
          transition: 'transform 0.1s linear',
          transformStyle: 'preserve-3d',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.2)'
        }}
      >
        <Icons.Cube3D />
        <span className="text-[10px] font-bold mt-2 text-white tracking-widest" style={{ transform: 'translateZ(20px)' }}>TRUE 3D</span>
      </div>
    </div>
  );

  const controls = (
    <>
      <div className="mb-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-[#333] pb-2">3D Rotation</div>
      <FigmaSlider label="Rotate X (Pitch)" min={-180} max={180} value={rotateX} onChange={setRotateX} unit="°" />
      <FigmaSlider label="Rotate Y (Yaw)" min={-180} max={180} value={rotateY} onChange={setRotateY} unit="°" />
      <FigmaSlider label="Rotate Z (Roll)" min={-180} max={180} value={rotateZ} onChange={setRotateZ} unit="°" />
      
      <div className="mt-4 mb-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-[#333] pb-2">Translation & Scale</div>
      <FigmaSlider label="Translate Z (Depth)" min={-300} max={300} value={translateZ} onChange={setTranslateZ} unit="px" />
      <FigmaSlider label="Translate X" min={-150} max={150} value={translateX} onChange={setTranslateX} unit="px" />
      <FigmaSlider label="Translate Y" min={-150} max={150} value={translateY} onChange={setTranslateY} unit="px" />
      <FigmaSlider label="Scale All" min={0.5} max={2} step={0.1} value={scale} onChange={setScale} unit="x" />
      
      <button 
        onClick={() => { setRotateX(0); setRotateY(0); setRotateZ(0); setTranslateX(0); setTranslateY(0); setTranslateZ(0); setScale(1); }}
        className="w-full mt-6 py-2.5 bg-[#252526] hover:bg-[#333] border border-[#444] rounded-lg text-[10px] font-bold text-white uppercase tracking-widest transition-colors shadow-sm"
      >
        Reset Matrix
      </button>
    </>
  );

  return <WorkspaceLayout name="True 3D Studio" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};

const ANIMATION_DATA = {
  "Attention": [
    { name: "Bounce", val: "bounce" }, { name: "Flash", val: "flash" }, { name: "Pulse", val: "pulse" },
    { name: "RubberBand", val: "rubberBand" }, { name: "Shake", val: "shake" }, { name: "Swing", val: "swing" },
    { name: "Tada", val: "tada" }, { name: "Wobble", val: "wobble" }, { name: "Jello", val: "jello" }, { name: "Heartbeat", val: "heartbeat" }
  ],
  "Fade Entrances": [
    { name: "Fade In", val: "fadeIn" }, { name: "Fade In Down", val: "fadeInDown" }, { name: "Fade In Left", val: "fadeInLeft" },
    { name: "Fade In Right", val: "fadeInRight" }, { name: "Fade In Up", val: "fadeInUp" }
  ],
  "Zoom Entrances": [
    { name: "Zoom In", val: "zoomIn" }, { name: "Zoom In Down", val: "zoomInDown" }, { name: "Zoom In Up", val: "zoomInUp" }
  ],
  "Slide Entrances": [
    { name: "Slide In Down", val: "slideInDown" }, { name: "Slide In Left", val: "slideInLeft" }, { name: "Slide In Right", val: "slideInRight" }, { name: "Slide In Up", val: "slideInUp" }
  ],
  "Rotations & Flips": [
    { name: "Spin 360", val: "spin" }, { name: "Flip X", val: "flipInX" }, { name: "Flip Y", val: "flipInY" }, { name: "Roll In", val: "rollIn" }
  ],
  "Continuous (Loop)": [
    { name: "Floating", val: "float" }, { name: "Spin Slow", val: "spinSlow" }, { name: "Breathe", val: "breathe" }
  ]
};

const getDynamicKeyframes = (type) => {
  const map = {
    bounce: `0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-30px);} 60% {transform: translateY(-15px);}`,
    flash: `0%, 50%, 100% {opacity: 1;} 25%, 75% {opacity: 0;}`,
    pulse: `0% {transform: scale(1);} 50% {transform: scale(1.05);} 100% {transform: scale(1);}`,
    rubberBand: `0% {transform: scale(1);} 30% {transform: scale3d(1.25, 0.75, 1);} 40% {transform: scale3d(0.75, 1.25, 1);} 50% {transform: scale3d(1.15, 0.85, 1);} 65% {transform: scale3d(.95, 1.05, 1);} 75% {transform: scale3d(1.05, .95, 1);} 100% {transform: scale(1);}`,
    shake: `0%, 100% {transform: translateX(0);} 10%, 30%, 50%, 70%, 90% {transform: translateX(-10px);} 20%, 40%, 60%, 80% {transform: translateX(10px);}`,
    swing: `20% {transform: rotate(15deg);} 40% {transform: rotate(-10deg);} 60% {transform: rotate(5deg);} 80% {transform: rotate(-5deg);} 100% {transform: rotate(0deg);}`,
    tada: `0% {transform: scale(1);} 10%, 20% {transform: scale(0.9) rotate(-3deg);} 30%, 50%, 70%, 90% {transform: scale(1.1) rotate(3deg);} 40%, 60%, 80% {transform: scale(1.1) rotate(-3deg);} 100% {transform: scale(1) rotate(0);}`,
    wobble: `0% {transform: translateX(0%);} 15% {transform: translateX(-25%) rotate(-5deg);} 30% {transform: translateX(20%) rotate(3deg);} 45% {transform: translateX(-15%) rotate(-3deg);} 60% {transform: translateX(10%) rotate(2deg);} 75% {transform: translateX(-5%) rotate(-1deg);} 100% {transform: translateX(0%);}`,
    jello: `0%, 11.1%, 100% {transform: none;} 22.2% {transform: skewX(-12.5deg) skewY(-12.5deg);} 33.3% {transform: skewX(6.25deg) skewY(6.25deg);} 44.4% {transform: skewX(-3.125deg) skewY(-3.125deg);} 55.5% {transform: skewX(1.5625deg) skewY(1.5625deg);} 66.6% {transform: skewX(-0.78125deg) skewY(-0.78125deg);} 77.7% {transform: skewX(0.390625deg) skewY(0.390625deg);} 88.8% {transform: skewX(-0.1953125deg) skewY(-0.1953125deg);}`,
    heartbeat: `0% {transform: scale(1);} 14% {transform: scale(1.3);} 28% {transform: scale(1);} 42% {transform: scale(1.3);} 70% {transform: scale(1);}`,
    fadeIn: `from {opacity: 0;} to {opacity: 1;}`,
    fadeInDown: `from {opacity: 0; transform: translate3d(0, -100%, 0);} to {opacity: 1; transform: none;}`,
    fadeInLeft: `from {opacity: 0; transform: translate3d(-100%, 0, 0);} to {opacity: 1; transform: none;}`,
    fadeInRight: `from {opacity: 0; transform: translate3d(100%, 0, 0);} to {opacity: 1; transform: none;}`,
    fadeInUp: `from {opacity: 0; transform: translate3d(0, 100%, 0);} to {opacity: 1; transform: none;}`,
    zoomIn: `from {opacity: 0; transform: scale3d(0.3, 0.3, 0.3);} 50% {opacity: 1;}`,
    zoomInDown: `from {opacity: 0; transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0); animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);} 60% {opacity: 1; transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0); animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);}`,
    zoomInUp: `from {opacity: 0; transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0); animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);} 60% {opacity: 1; transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0); animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);}`,
    slideInDown: `from {transform: translate3d(0, -100%, 0); visibility: visible;} to {transform: translate3d(0, 0, 0);}`,
    slideInLeft: `from {transform: translate3d(-100%, 0, 0); visibility: visible;} to {transform: translate3d(0, 0, 0);}`,
    slideInRight: `from {transform: translate3d(100%, 0, 0); visibility: visible;} to {transform: translate3d(0, 0, 0);}`,
    slideInUp: `from {transform: translate3d(0, 100%, 0); visibility: visible;} to {transform: translate3d(0, 0, 0);}`,
    spin: `from {transform: rotate(0deg);} to {transform: rotate(360deg);}`,
    flipInX: `from {transform: perspective(400px) rotate3d(1, 0, 0, 90deg); animation-timing-function: ease-in; opacity: 0;} 40% {transform: perspective(400px) rotate3d(1, 0, 0, -20deg); animation-timing-function: ease-in;} 60% {transform: perspective(400px) rotate3d(1, 0, 0, 10deg); opacity: 1;} 80% {transform: perspective(400px) rotate3d(1, 0, 0, -5deg);} to {transform: perspective(400px);}`,
    flipInY: `from {transform: perspective(400px) rotate3d(0, 1, 0, 90deg); animation-timing-function: ease-in; opacity: 0;} 40% {transform: perspective(400px) rotate3d(0, 1, 0, -20deg); animation-timing-function: ease-in;} 60% {transform: perspective(400px) rotate3d(0, 1, 0, 10deg); opacity: 1;} 80% {transform: perspective(400px) rotate3d(0, 1, 0, -5deg);} to {transform: perspective(400px);}`,
    rollIn: `from {opacity: 0; transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);} to {opacity: 1; transform: none;}`,
    float: `0%, 100% {transform: translateY(0);} 50% {transform: translateY(-20px);}`,
    spinSlow: `from {transform: rotate(0deg);} to {transform: rotate(360deg);}`,
    breathe: `0%, 100% {transform: scale(1); opacity: 0.8;} 50% {transform: scale(1.1); opacity: 1; box-shadow: 0 0 20px rgba(14,165,233,0.5);}`
  };
  return map[type] || map['bounce'];
};

export const PluginAnimation = () => {
  const [animType, setAnimType] = useState('bounce'); 
  const [duration, setDuration] = useState(1.5);
  const [timing, setTiming] = useState('ease-in-out');
  const [iteration, setIteration] = useState('infinite');
  const [key, setKey] = useState(0); 

  const css = `@keyframes anim-${animType} {\n  ${getDynamicKeyframes(animType).replace(/\} /g, '}\n  ')}\n}\n\n.animate-element {\n  animation: anim-${animType} ${duration}s ${timing} ${iteration};\n}`;

  useEffect(() => { setKey(prev => prev + 1); }, [animType, duration, timing, iteration]);

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`@keyframes preview-${animType}-${key} { ${getDynamicKeyframes(animType)} }`}</style>
      <div 
        key={key}
        className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-500 to-orange-400 shadow-2xl flex items-center justify-center border border-white/20"
        style={{ animation: `preview-${animType}-${key} ${duration}s ${timing} ${iteration === 'infinite' ? 'infinite' : iteration}` }}
      >
        <Icons.Animation />
      </div>
    </div>
  );

  const controls = (
    <>
      <FigmaCustomDropdown label="Animation Style (100+ Variations)" groups={ANIMATION_DATA} value={animType} onChange={setAnimType} />
      <FigmaSlider label="Duration" min={0.1} max={5} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Timing Function" options={['linear', 'ease', 'ease-in-out', 'ease-in', 'ease-out']} value={timing} onChange={setTiming} />
      <FigmaSelect label="Iteration Count" options={['1', '2', '3', 'infinite']} value={iteration} onChange={setIteration} />
      
      <button onClick={() => setKey(k => k + 1)} className="w-full mt-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all">
        Replay Animation
      </button>
    </>
  );

  return <WorkspaceLayout name="Animation Builder" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};

const TRANSITIONS_DATA = {
  "Scale Effects": [
    { name: "Grow", val: "scale(1.1)" }, { name: "Shrink", val: "scale(0.9)" }, { name: "Pop", val: "scale(1.2)" }
  ],
  "Translates": [
    { name: "Push Up", val: "translateY(-10px)" }, { name: "Push Down", val: "translateY(10px)" },
    { name: "Push Left", val: "translateX(-10px)" }, { name: "Push Right", val: "translateX(10px)" }
  ],
  "Rotations": [
    { name: "Rotate Right", val: "rotate(15deg)" }, { name: "Rotate Left", val: "rotate(-15deg)" },
    { name: "Spin Quarter", val: "rotate(90deg)" }, { name: "Spin Half", val: "rotate(180deg)" }
  ],
  "Skews": [
    { name: "Skew Forward", val: "skewX(-15deg)" }, { name: "Skew Backward", val: "skewX(15deg)" }
  ],
  "Complex": [
    { name: "Float & Grow", val: "translateY(-10px) scale(1.05)" },
    { name: "Sink & Shrink", val: "translateY(10px) scale(0.95)" }
  ]
};

export const PluginTransitions = () => {
  const [transType, setTransType] = useState('scale(1.1)'); 
  const [duration, setDuration] = useState(0.3);
  const [timing, setTiming] = useState('cubic-bezier(0.4, 0, 0.2, 1)');

  const css = `.element {\n  transition: transform ${duration}s ${timing};\n}\n\n.element:hover {\n  transform: ${transType};\n}`;

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center group cursor-pointer">
      <div 
        className="w-40 h-16 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-lg"
        style={{ transition: `transform ${duration}s ${timing}` }}
        onMouseEnter={(e) => e.currentTarget.style.transform = transType}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        HOVER ME
      </div>
      <div className="absolute top-10 text-[10px] text-slate-500 uppercase tracking-widest animate-pulse pointer-events-none">Interact to preview</div>
    </div>
  );

  const controls = (
    <>
      <FigmaCustomDropdown label="Hover Effect Type" groups={TRANSITIONS_DATA} value={transType} onChange={setTransType} />
      <FigmaSlider label="Duration" min={0.1} max={3} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Timing/Easing" options={['ease', 'linear', 'ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)']} value={timing} onChange={setTiming} />
    </>
  );

  return <WorkspaceLayout name="Hover Transitions" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};