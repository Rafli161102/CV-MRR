"use client";

import React, { useState, useEffect, useRef } from 'react';

// =========================================================================
// 1. IKON SVG PROFESIONAL & BARU
// =========================================================================
export const Icons = {
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
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
  Brush: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.879-3.879a3 3 0 10-4.242-4.242l-3.879 3.879a15.995 15.995 0 00-4.648 4.764m3.42 3.42a6.976 6.976 0 00-3.42-3.42" /></svg>,
  Info: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>,
  Undo: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>,
  Redo: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" /></svg>
};

// =========================================================================
// 2. COLOR ENGINE & HELPERS (DIPERKUAT)
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
// Helper Neumorphism
export const adjustBrightness = (hex, percent) => {
    let { h, s, l } = hexToHsl(hex);
    l = Math.max(0, Math.min(100, l + percent));
    return hslToHex(h, s, l);
};

export const COLOR_PRESETS = ['#ffffff', '#f1f5f9', '#1e1e1e', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

// =========================================================================
// 3. UI COMPONENTS (MODERN MINIMALIST)
// =========================================================================

export const PluginTip = ({ text }) => (
  <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-3 flex gap-3 items-start mb-5 shadow-sm">
    <div className="text-cyan-400 mt-0.5 shrink-0"><Icons.Info /></div>
    <p className="text-[10px] text-slate-300 leading-relaxed font-medium">{text}</p>
  </div>
);

export const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => (
  <div className="flex items-center justify-between py-2.5 group border-b border-[#1f1f1f] last:border-0">
    <label className="text-[10px] font-medium text-slate-400 w-1/3 group-hover:text-slate-200 transition-colors truncate pr-2">{label}</label>
    <div className="w-2/3 flex items-center gap-3">
      <input type="range" min={min} max={max} step={step} value={value || 0} onChange={(e) => onChange(Number(e.target.value) || 0)} className="w-full h-[3px] bg-[#333] rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all" />
      <div className="bg-[#0a0a0a] px-2 py-1 rounded border border-[#2a2a2a] min-w-[55px] text-right shrink-0">
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
      <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:border-[#444]">
        <div className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-[#141414] transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md shadow-inner border border-white/10 ring-1 ring-black/50" style={{backgroundColor: hexValue}}></div>
            <div className="flex flex-col">
               <span className="text-[10px] font-medium text-slate-200 leading-none">{label}</span>
               <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">{hexValue}</span>
            </div>
          </div>
          <div className={`text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <Icons.ChevronDown />
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#141414] ${isOpen ? 'max-h-[300px] border-t border-[#2a2a2a] p-3 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1.5"><span className="text-[9px] text-slate-400">Hue</span></div>
              <input type="range" min="0" max="360" value={hsl.h} onChange={(e) => handleHslChange('h', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'}} />
            </div>
            <div>
              <div className="flex justify-between mb-1.5"><span className="text-[9px] text-slate-400">Saturation</span></div>
              <input type="range" min="0" max="100" value={hsl.s} onChange={(e) => handleHslChange('s', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #808080, ${hslToHex(hsl.h, 100, 50)})`}} />
            </div>
            <div>
              <div className="flex justify-between mb-1.5"><span className="text-[9px] text-slate-400">Lightness</span></div>
              <input type="range" min="0" max="100" value={hsl.l} onChange={(e) => handleHslChange('l', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #000, ${hslToHex(hsl.h, hsl.s, 50)}, #fff)`}} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#2a2a2a]">
            {COLOR_PRESETS.map((c) => (
              <button key={c} onClick={() => onChange(c)} className={`w-5 h-5 rounded-md border transition-transform hover:scale-110 ${hexValue===c ? 'border-cyan-400 scale-110 shadow-lg' : 'border-[#333]'}`} style={{ backgroundColor: c }} />
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
     <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-[#2a2a2a] overflow-x-auto custom-scroll">
        {options.map(opt => (
           <button key={opt} onClick={() => onChange(opt)} className={`flex-1 min-w-[60px] py-1.5 px-2 rounded-md text-[9px] font-medium transition-all whitespace-nowrap ${value === opt ? 'bg-[#1f1f1f] text-white shadow-sm border border-[#333]' : 'text-slate-500 hover:text-slate-300'}`}>{opt}</button>
        ))}
     </div>
  </div>
);

export const FigmaTextInput = ({ label, value, onChange, placeholder = "Ketik sesuatu...", isTextArea = false }) => (
  <div className="mb-4">
     <label className="text-[10px] font-medium text-slate-400 block mb-2">{label}</label>
     {isTextArea ? (
       <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-20 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-[11px] text-white outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600 resize-none" />
     ) : (
       <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-[11px] text-white outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600" />
     )}
  </div>
);

export const FigmaCustomDropdown = ({ label, groups, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  let currentName = value;
  for (const group in groups) {
    const found = groups[group].find(opt => opt.val === value);
    if (found) { currentName = found.name; break; }
  }

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
        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 flex justify-between items-center cursor-pointer hover:border-[#444] transition-colors"
      >
        <span className="text-[10px] sm:text-[11px] text-white font-mono truncate mr-2" title={currentName}>{currentName}</span>
        <div className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></div>
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#141414] border border-[#2a2a2a] rounded-lg shadow-2xl max-h-[220px] overflow-y-auto custom-scroll ring-1 ring-black/50">
          {Object.entries(groups).map(([groupName, options]) => (
            <div key={groupName}>
              <div className="px-3 py-2 bg-[#0a0a0a] text-[9px] font-bold text-cyan-500 uppercase tracking-widest sticky top-0 border-b border-[#2a2a2a]">
                {groupName}
              </div>
              {options.map(opt => (
                <div 
                  key={opt.val} 
                  onClick={() => { onChange(opt.val); setIsOpen(false); }}
                  className={`px-4 py-2.5 text-[10px] sm:text-[11px] cursor-pointer hover:bg-[#1f1f1f] transition-colors font-mono truncate ${value === opt.val ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500' : 'text-slate-300'}`}
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

// =========================================================================
// 4. MULTI-LANGUAGE CODE OUTPUT 
// =========================================================================
export const CodeOutput = ({ cssCode, htmlCode, jsxCode, isMobileTab }) => {
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState('css');

  const getActiveCode = () => {
    if (lang === 'css') return cssCode;
    if (lang === 'html') return htmlCode;
    if (lang === 'jsx') return jsxCode;
    return cssCode;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full h-full bg-[#0a0a0a] relative flex flex-col overflow-hidden ${isMobileTab ? '' : 'border-t lg:border border-[#1f1f1f] lg:rounded-2xl shadow-xl'}`}>
       
       <div className="flex justify-between items-center px-2 py-2 border-b border-[#1f1f1f] bg-[#141414] shrink-0">
          <div className="flex gap-1">
             {['css', 'html', 'jsx'].map(l => (
               <button 
                 key={l} onClick={() => setLang(l)} 
                 className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase transition-all ${lang === l ? 'bg-[#2a2a2a] text-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-[#1f1f1f]'}`}
               >
                 {l === 'jsx' ? 'React/Tailwind' : l}
               </button>
             ))}
          </div>
          <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all text-[9px] font-bold uppercase tracking-wider">
            {copied ? <><Icons.Check /> Copied</> : <><Icons.Copy /> Copy</>}
          </button>
       </div>

       <div className={`p-4 overflow-y-auto flex-grow bg-[#050505] custom-scroll ${isMobileTab ? 'pb-24' : ''}`}>
          <pre className="text-[11px] font-mono text-slate-300 leading-relaxed whitespace-pre-wrap break-words"><code>{getActiveCode()}</code></pre>
       </div>
    </div>
  )
};

// =========================================================================
// 5. MASTER WORKSPACE LAYOUT
// =========================================================================
export const WorkspaceLayout = ({ name, controls, preview, cssOutput, htmlOutput, jsxOutput, bgType = 'grid', bgHex }) => {
  const [mobileTab, setMobileTab] = useState('design'); 

  return (
    <div className="flex flex-col lg:flex-row w-full h-full animate-fade-in bg-[#050505] lg:bg-transparent">
       
       {/* MOBILE CANVAS */}
       <div className="h-[35vh] sm:h-[40vh] lg:hidden relative flex items-center justify-center overflow-hidden border-b border-[#1f1f1f] z-30 transition-colors duration-500 shadow-lg shrink-0" style={{backgroundColor: bgHex || '#050505'}}>
          {bgType === 'grid' && <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>}
          {bgType === 'image' && <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}></div>}
          {bgType === 'light' && <div className="absolute inset-0 bg-[#f8fafc]"></div>}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-6 overflow-hidden perspective-1000">{preview}</div>
       </div>

       {/* DESKTOP COLUMN */}
       <div className="hidden lg:flex flex-1 flex-col min-w-0 lg:border-r border-[#1f1f1f]">
         <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[#050505] border-b border-[#1f1f1f] z-10 transition-colors duration-500" style={{backgroundColor: bgHex || '#050505'}}>
            {bgType === 'grid' && <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>}
            {bgType === 'image' && <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}></div>}
            {bgType === 'light' && <div className="absolute inset-0 bg-[#f8fafc]"></div>}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 overflow-hidden perspective-1000">{preview}</div>
         </div>
         <div className="h-[280px] shrink-0 p-4 bg-[#0a0a0a]">
            <CodeOutput cssCode={cssOutput} htmlCode={htmlOutput} jsxCode={jsxOutput} />
         </div>
       </div>

       {/* PROPERTIES PANEL */}
       <div className="flex-1 lg:w-[380px] lg:flex-none bg-[#0a0a0a] flex flex-col z-20 overflow-hidden shadow-2xl relative">
         <div className="px-4 py-3 border-b border-[#1f1f1f] bg-[#0a0a0a] shrink-0 z-10 relative">
            <h2 className="text-[12px] font-bold text-white uppercase tracking-widest hidden lg:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block animate-pulse"></span> {name} Setup
            </h2>
            <div className="flex lg:hidden bg-[#050505] p-1 rounded-lg border border-[#1f1f1f] w-full">
              <button onClick={() => setMobileTab('design')} className={`flex-1 py-2 rounded-md text-[10px] font-medium transition-all ${mobileTab === 'design' ? 'bg-[#1f1f1f] text-white shadow-sm border border-[#333]' : 'text-slate-500 hover:text-slate-300'}`}>Design Tools</button>
              <button onClick={() => setMobileTab('code')} className={`flex-1 py-2 rounded-md text-[10px] font-medium transition-all ${mobileTab === 'code' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}>Get Code</button>
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto custom-scroll relative bg-[#0a0a0a]">
            <div className={`p-4 lg:p-5 lg:block ${mobileTab === 'design' ? 'block' : 'hidden'}`}>
              {controls}
              <div className="h-40 lg:h-12"></div>
            </div>
            <div className={`h-full lg:hidden ${mobileTab === 'code' ? 'block' : 'hidden'}`}>
              <CodeOutput cssCode={cssOutput} htmlCode={htmlOutput} jsxCode={jsxOutput} isMobileTab={true} />
            </div>
         </div>
       </div>
    </div>
  );
};

// =========================================================================
// 6. THE PLUGINS (V19 ULTIMATE)
// =========================================================================

export const PluginBackgroundGradient = () => {
  const [color1, setColor1] = useState('#0ea5e9');
  const [color2, setColor2] = useState('#8b5cf6');
  const [angle, setAngle] = useState(145);

  const css = `.box-gradient {\n  background: linear-gradient(${angle}deg, ${color1}, ${color2});\n  border-radius: 16px;\n  width: 100%;\n  max-width: 320px;\n  aspect-ratio: 2/1;\n}`;
  const html = `<div class="box-gradient"\n     style="background: linear-gradient(${angle}deg, ${color1}, ${color2}); border-radius: 16px; width: 100%; max-width: 320px; aspect-ratio: 2/1;">\n</div>`;
  const jsx = `<div \n  className="w-full max-w-xs aspect-[2/1] rounded-2xl shadow-xl"\n  style={{ background: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}\n></div>`;

  const preview = <div style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} className="w-full max-w-[320px] aspect-[2/1] transition-all"></div>;
  const controls = (
    <>
      <PluginTip text="Pilih warna awal dan akhir, lalu putar angle untuk mendapatkan arah gradasi yang kamu inginkan." />
      <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
      <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </>
  );
  return <WorkspaceLayout name="Box Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginTextGradient = () => {
  const [text, setText] = useState('');
  const [color1, setColor1] = useState('#ec4899');
  const [color2, setColor2] = useState('#f59e0b');
  const [angle, setAngle] = useState(90);

  const css = `.text-gradient {\n  background-image: linear-gradient(${angle}deg, ${color1}, ${color2});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  color: transparent;\n}`;
  const html = `<h1 class="text-gradient" style="background-image: linear-gradient(${angle}deg, ${color1}, ${color2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">\n  ${text || 'GRADIENT'}\n</h1>`;
  const jsx = `<h1 \n  className="text-5xl font-black uppercase tracking-wider bg-clip-text text-transparent"\n  style={{ backgroundImage: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}\n>\n  ${text || 'GRADIENT'}\n</h1>`;
  
  const preview = (
    <div className="w-full h-full flex items-center justify-center p-2 text-center">
      <span style={{ 
        backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`, 
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent',
        fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', display: 'inline-block'
      }}>
        {text || 'GRADIENT'}
      </span>
    </div>
  );

  const controls = (
    <>
      <PluginTip text="Teks akan otomatis menyesuaikan ukuran layar (clamp). Jika di HP, teks akan mengecil agar tidak terpotong." />
      <FigmaTextInput label="Custom Text" value={text} onChange={setText} placeholder="Misal: MRR STUDIO" />
      <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
      <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </>
  );
  return <WorkspaceLayout name="Text Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

const FONTS_DATA = {
  "Sans Serif Popular": [{ name: "Inter", val: "Inter" }, { name: "Roboto", val: "Roboto" }, { name: "Montserrat", val: "Montserrat" }, { name: "Poppins", val: "Poppins" }],
  "Serif Classic": [{ name: "Playfair Display", val: "Playfair Display" }, { name: "Merriweather", val: "Merriweather" }, { name: "Lora", val: "Lora" }],
  "Display & Creative": [{ name: "Bebas Neue", val: "Bebas Neue" }, { name: "Lobster", val: "Lobster" }, { name: "Righteous", val: "Righteous" }]
};

export const PluginTypography = () => {
  const [tab, setTab] = useState('Heading');
  
  // States: Added letterSpacing & rotation
  const [h1, setH1] = useState({ text: '', font: 'Montserrat', size: 48, color: '#ffffff', align: 'center', trans: 'none', space: 0, rot: 0 });
  const [h2, setH2] = useState({ text: '', font: 'Inter', size: 20, color: '#0ea5e9', align: 'center', trans: 'none', space: 0, rot: 0 });
  const [p, setP] = useState({ text: '', font: 'Inter', size: 14, color: '#94a3b8', align: 'center', trans: 'none', space: 0, rot: 0 });

  useEffect(() => {
    [h1.font, h2.font, p.font].forEach(f => {
      const linkId = `gfont-${f.replace(/\s+/g, '-')}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link'); link.id = linkId;
        link.href = `https://fonts.googleapis.com/css2?family=${f.replace(/\s+/g, '+')}:wght@400;600;800&display=swap`;
        link.rel = 'stylesheet'; document.head.appendChild(link);
      }
    });
  }, [h1.font, h2.font, p.font]);

  const css = `/* Heading */\nh1 {\n  font-family: '${h1.font}', sans-serif;\n  font-size: ${h1.size}px;\n  color: ${h1.color};\n  font-weight: 800;\n  text-align: ${h1.align};\n  text-transform: ${h1.trans};\n  letter-spacing: ${h1.space}px;\n  transform: rotate(${h1.rot}deg);\n}\n\n/* Subheading */\nh2 {\n  font-family: '${h2.font}', sans-serif;\n  font-size: ${h2.size}px;\n  color: ${h2.color};\n  font-weight: 600;\n  text-align: ${h2.align};\n  text-transform: ${h2.trans};\n  letter-spacing: ${h2.space}px;\n  transform: rotate(${h2.rot}deg);\n}\n\n/* Paragraph */\np {\n  font-family: '${p.font}', sans-serif;\n  font-size: ${p.size}px;\n  color: ${p.color};\n  line-height: 1.6;\n  text-align: ${p.align};\n  text-transform: ${p.trans};\n  letter-spacing: ${p.space}px;\n  transform: rotate(${p.rot}deg);\n}`;
  
  const html = `<div style="display: flex; flex-direction: column; gap: 16px;">\n  <h1 style="font-family: '${h1.font}'; font-size: ${h1.size}px; color: ${h1.color}; text-align: ${h1.align}; text-transform: ${h1.trans}; letter-spacing: ${h1.space}px; transform: rotate(${h1.rot}deg); margin:0;">${h1.text || 'Hero Title'}</h1>\n  <h2 style="font-family: '${h2.font}'; font-size: ${h2.size}px; color: ${h2.color}; text-align: ${h2.align}; text-transform: ${h2.trans}; letter-spacing: ${h2.space}px; transform: rotate(${h2.rot}deg); margin:0;">${h2.text || 'Beautiful Typography'}</h2>\n  <p style="font-family: '${p.font}'; font-size: ${p.size}px; color: ${p.color}; text-align: ${p.align}; line-height: 1.6; letter-spacing: ${p.space}px; transform: rotate(${p.rot}deg); margin:0;">${p.text || 'Ini adalah contoh teks paragraf...'}</p>\n</div>`;
  
  const jsx = `<div className="flex flex-col gap-4">\n  <h1 style={{ fontFamily: '"${h1.font}", sans-serif', fontSize: '${h1.size}px', color: '${h1.color}', textAlign: '${h1.align}', textTransform: '${h1.trans}', letterSpacing: '${h1.space}px', transform: 'rotate(${h1.rot}deg)' }} className="font-extrabold m-0">\n    ${h1.text || 'Hero Title'}\n  </h1>\n  {/* Tambahkan h2 dan p mengikuti pola di atas */}\n</div>`;

  const preview = (
    <div className="w-full flex flex-col justify-center max-w-[440px] gap-3">
      <h1 style={{ fontFamily: `"${h1.font}", sans-serif`, fontSize: `${h1.size}px`, color: h1.color, fontWeight: 800, textAlign: h1.align, textTransform: h1.trans, letterSpacing: `${h1.space}px`, transform: `rotate(${h1.rot}deg)`, transition: 'all 0.2s', margin:0 }}>{h1.text || 'Hero Title'}</h1>
      <h2 style={{ fontFamily: `"${h2.font}", sans-serif`, fontSize: `${h2.size}px`, color: h2.color, fontWeight: 600, textAlign: h2.align, textTransform: h2.trans, letterSpacing: `${h2.space}px`, transform: `rotate(${h2.rot}deg)`, transition: 'all 0.2s', margin:0 }}>{h2.text || 'Beautiful Typography'}</h2>
      <p style={{ fontFamily: `"${p.font}", sans-serif`, fontSize: `${p.size}px`, color: p.color, lineHeight: 1.6, textAlign: p.align, textTransform: p.trans, letterSpacing: `${p.space}px`, transform: `rotate(${p.rot}deg)`, transition: 'all 0.2s', margin:0 }}>{p.text || 'Ini adalah contoh multi-paragraf di mana kamu bisa mengatur font, ukuran, warna, spasi, hingga rotasi untuk setiap komponen teks secara terpisah.'}</p>
    </div>
  );

  const TextControls = ({ state, setState, isPara = false }) => {
    const update = (key, val) => setState(prev => ({ ...prev, [key]: val }));
    return (
      <div className="animate-fade-in space-y-2">
        <FigmaTextInput label="Edit Text" value={state.text} onChange={(v) => update('text', v)} placeholder={isPara ? "Ketik paragraf..." : "Ketik judul..."} isTextArea={isPara} />
        <FigmaCustomDropdown label="Font Family" groups={FONTS_DATA} value={state.font} onChange={(v) => update('font', v)} />
        <FigmaColorPicker label="Text Color" hexValue={state.color} onChange={(v) => update('color', v)} />
        <FigmaSlider label="Font Size" min={isPara ? 10 : 20} max={isPara ? 36 : 100} value={state.size} onChange={(v) => update('size', v)} unit="px" />
        <FigmaSlider label="Letter Spacing" min={-5} max={20} step={0.5} value={state.space} onChange={(v) => update('space', v)} unit="px" />
        <FigmaSlider label="Rotate" min={-180} max={180} value={state.rot} onChange={(v) => update('rot', v)} unit="°" />
        <div className="grid grid-cols-2 gap-4 mt-2">
          <FigmaSelect label="Alignment" options={['left', 'center', 'right', 'justify']} value={state.align} onChange={(v) => update('align', v)} />
          <FigmaSelect label="Transform" options={['none', 'uppercase', 'lowercase', 'capitalize']} value={state.trans} onChange={(v) => update('trans', v)} />
        </div>
      </div>
    );
  };

  const controls = (
    <>
      <PluginTip text="Pilih elemen (H1, H2, P). Kini kamu bisa mengatur jarak antar huruf (kerenggangan) dan memutar teks!" />
      <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-[#2a2a2a] w-full mb-5">
        {['Heading', 'Subheading', 'Paragraph'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-md text-[9px] font-bold uppercase transition-all ${tab === t ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}>{t}</button>
        ))}
      </div>
      {tab === 'Heading' && <TextControls state={h1} setState={setH1} />}
      {tab === 'Subheading' && <TextControls state={h2} setState={setH2} />}
      {tab === 'Paragraph' && <TextControls state={p} setState={setP} isPara={true} />}
    </>
  );
  return <WorkspaceLayout name="Advanced Typography" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginLayout = () => {
  const [padding, setPadding] = useState(32);
  const [radius, setRadius] = useState(24);

  const css = `.box {\n  padding: ${padding}px;\n  border-radius: ${radius}px;\n  background-color: #1a1a1a;\n  color: #ffffff;\n}`;
  const html = `<div style="padding: ${padding}px; border-radius: ${radius}px; background-color: #1a1a1a; color: #fff;">\n  Box Content\n</div>`;
  const jsx = `<div \n  style={{ padding: '${padding}px', borderRadius: '${radius}px' }}\n  className="bg-neutral-900 text-white text-center"\n>\n  Box Content\n</div>`;

  const preview = <div style={{ padding: `${padding}px`, borderRadius: `${radius}px`, backgroundColor: '#1a1a1a', color: '#fff', textAlign: 'center', border: '1px solid #333', transition: 'all 0.3s' }}>Box Container</div>;
  const controls = (
    <>
      <FigmaSlider label="Padding" min={0} max={100} value={padding} onChange={setPadding} unit="px" />
      <FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Box Layout" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginBorder = () => {
  const [width, setWidth] = useState(4);
  const [radius, setRadius] = useState(20);
  const [style, setStyle] = useState('solid');
  const [color, setColor] = useState('#0ea5e9');

  const css = `.bordered-box {\n  border: ${width}px ${style} ${color};\n  border-radius: ${radius}px;\n  background-color: transparent;\n}`;
  const html = `<div style="border: ${width}px ${style} ${color}; border-radius: ${radius}px; width: 180px; height: 120px;"></div>`;
  const jsx = `<div style={{ border: '${width}px ${style} ${color}', borderRadius: '${radius}px' }} className="w-48 h-32 bg-transparent"></div>`;

  const preview = <div style={{ width: 180, height: 120, border: `${width}px ${style} ${color}`, borderRadius: `${radius}px`, backgroundColor: 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Border Color" hexValue={color} onChange={setColor} />
      <FigmaSelect label="Style" options={['solid', 'dashed', 'dotted', 'double']} value={style} onChange={setStyle} />
      <FigmaSlider label="Border Width" min={1} max={30} value={width} onChange={setWidth} unit="px" />
      <FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Border Styling" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

const SHAPES_DATA = {
  "Organic Blobs": [{ name: "Blob 1", val: "blob1", css: "border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;" }, { name: "Blob 2", val: "blob2", css: "border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;" }],
  "Polygons": [{ name: "Triangle", val: "polygon(50% 0%, 0% 100%, 100% 100%)", css: "clip-path: polygon(50% 0%, 0% 100%, 100% 100%);" }, { name: "Hexagon", val: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", css: "clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);" }]
};

export const PluginShapes = () => {
  const [shapeVal, setShapeVal] = useState("blob1");
  const [color, setColor] = useState('#8b5cf6');
  const [rounded, setRounded] = useState(0);

  let shapeCss = "";
  let isBlob = shapeVal.includes('blob');
  for (const group in SHAPES_DATA) {
    const found = SHAPES_DATA[group].find(opt => opt.val === shapeVal);
    if (found) shapeCss = found.css;
  }

  const css = isBlob 
    ? `.shape {\n  ${shapeCss}\n  background-color: ${color};\n  width: 200px;\n  height: 200px;\n}`
    : `.shape {\n  border-radius: ${rounded}px;\n  ${shapeCss}\n  background-color: ${color};\n  width: 200px;\n  height: 200px;\n}`;
  
  const html = `<div style="${isBlob ? shapeCss : `border-radius: ${rounded}px; ${shapeCss}`} background-color: ${color}; width: 200px; height: 200px;"></div>`;
  const jsx = `<div style={{ ${isBlob ? (shapeVal==='blob1' ? "borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'" : "borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'") : `borderRadius: '${rounded}px', clipPath: '${shapeVal}'`}, backgroundColor: '${color}' }} className="w-48 h-48"></div>`;

  const previewStyle = isBlob 
    ? { backgroundColor: color, width: '150px', height: '150px', borderRadius: shapeVal === 'blob1' ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '60% 40% 30% 70% / 60% 30% 70% 40%', transition: 'all 0.5s' }
    : { clipPath: shapeVal, backgroundColor: color, width: '150px', height: '150px', borderRadius: `${rounded}px`, transition: 'all 0.5s' };

  const controls = (
    <>
      <FigmaCustomDropdown label="Select Shape Form" groups={SHAPES_DATA} value={shapeVal} onChange={setShapeVal} />
      <FigmaColorPicker label="Shape Color" hexValue={color} onChange={setColor} />
      {!isBlob && <FigmaSlider label="Base Rounded" min={0} max={100} value={rounded} onChange={setRounded} unit="px" />}
    </>
  );
  return <WorkspaceLayout name="CSS Shapes" controls={controls} preview={<div style={previewStyle}></div>} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginGlassmorphism = () => {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(15);
  const [color, setColor] = useState('#ffffff');

  const rgb = hexToRgb(color);
  const css = `.glass {\n  background: rgba(${rgb}, ${opacity / 100});\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n  border: 1px solid rgba(${rgb}, 0.3);\n  border-radius: 16px;\n}`;
  const html = `<div style="background: rgba(${rgb}, ${opacity/100}); backdrop-filter: blur(${blur}px); border: 1px solid rgba(${rgb}, 0.3); border-radius: 16px; width: 240px; height: 140px;"></div>`;
  const jsx = `<div \n  style={{ background: 'rgba(${rgb}, ${opacity/100})', backdropFilter: 'blur(${blur}px)', border: '1px solid rgba(${rgb}, 0.3)' }}\n  className="w-60 h-36 rounded-2xl shadow-xl"\n></div>`;

  const preview = <div style={{ width: '80%', maxWidth: '240px', height: '140px', background: `rgba(${rgb}, ${opacity / 100})`, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, border: `1px solid rgba(${rgb}, 0.3)`, borderRadius: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Glass Tint" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Opacity" min={1} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="Blur Intensity" min={0} max={50} step={0.5} value={blur} onChange={setBlur} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Glassmorphism" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="image" />;
};

export const PluginNeumorphism = () => {
  const [bg, setBg] = useState('#e0e5ec');
  const [dist, setDist] = useState(10);
  const [blur, setBlur] = useState(20);
  const [invert, setInvert] = useState(false);

  // Kalkulasi bayangan Neumorphism yang TEPAT!
  const lightShadow = adjustBrightness(bg, 15);
  const darkShadow = adjustBrightness(bg, -15);
  
  const shadowValue = invert 
    ? `inset ${dist}px ${dist}px ${blur}px ${darkShadow}, inset -${dist}px -${dist}px ${blur}px ${lightShadow}`
    : `${dist}px ${dist}px ${blur}px ${darkShadow}, -${dist}px -${dist}px ${blur}px ${lightShadow}`;

  const css = `.neumorph {\n  background-color: ${bg};\n  border-radius: 20px;\n  box-shadow: ${shadowValue};\n}`;
  const html = `<div style="background-color: ${bg}; border-radius: 20px; box-shadow: ${shadowValue}; width: 140px; height: 140px;"></div>`;
  const jsx = `<div \n  style={{ backgroundColor: '${bg}', boxShadow: '${shadowValue}' }}\n  className="w-36 h-36 rounded-[20px]"\n></div>`;

  const preview = <div style={{ width: 160, height: 160, backgroundColor: bg, borderRadius: 24, boxShadow: shadowValue, transition: 'all 0.3s' }}></div>;
  const controls = (
    <>
      <PluginTip text="Sistem kini mengkalkulasi bayangan terang dan gelap secara otomatis berdasarkan base color agar efek 'timbul' terlihat sempurna." />
      <FigmaColorPicker label="Base Background" hexValue={bg} onChange={setBg} />
      <div className="mb-4">
         <label className="text-[10px] font-medium text-slate-400 block mb-2">Style</label>
         <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-[#2a2a2a]">
            <button onClick={() => setInvert(false)} className={`flex-1 py-1.5 rounded-md text-[9px] font-medium ${!invert ? 'bg-[#1f1f1f] text-white' : 'text-slate-500'}`}>Extrude (Timbul)</button>
            <button onClick={() => setInvert(true)} className={`flex-1 py-1.5 rounded-md text-[9px] font-medium ${invert ? 'bg-[#1f1f1f] text-white' : 'text-slate-500'}`}>Inset (Cekung)</button>
         </div>
      </div>
      <FigmaSlider label="Distance" min={1} max={30} value={dist} onChange={setDist} unit="px" />
      <FigmaSlider label="Blur Radius" min={1} max={60} value={blur} onChange={setBlur} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Neumorphism" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="light" bgHex={bg} />;
};

export const PluginShadow = () => {
  const [x, setX] = useState(10); const [y, setY] = useState(15);
  const [blur, setBlur] = useState(30); const [spread, setSpread] = useState(0);
  const [opacity, setOpacity] = useState(40); const [color, setColor] = useState('#000000');

  const css = `.shadow-box {\n  box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100});\n  border-radius: 12px;\n  background-color: #ffffff;\n}`;
  const html = `<div style="box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100}); border-radius: 12px; background-color: #ffffff; width: 140px; height: 140px;"></div>`;
  const jsx = `<div style={{ boxShadow: '${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})' }} className="w-36 h-36 rounded-xl bg-white"></div>`;

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
  return <WorkspaceLayout name="Drop Shadow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="light" />;
};

export const PluginGlow = () => {
  const [color, setColor] = useState('#0ea5e9');
  const [blur, setBlur] = useState(40);
  const [spread, setSpread] = useState(10);

  const css = `.neon-glow {\n  box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8);\n  border-radius: 50%;\n  background-color: ${color};\n}`;
  const html = `<div style="box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8); border-radius: 50%; background-color: ${color}; width: 80px; height: 80px;"></div>`;
  const jsx = `<div style={{ boxShadow: '0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)', backgroundColor: '${color}' }} className="w-20 h-20 rounded-full"></div>`;

  const preview = <div style={{ width: 80, height: 80, backgroundColor: color, borderRadius: '50%', boxShadow: `0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)` }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Glow Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Blur Radius" min={0} max={150} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Spread Radius" min={0} max={100} value={spread} onChange={setSpread} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginFilters = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [hue, setHue] = useState(0);
  const [blur, setBlur] = useState(0);
  const [shadow, setShadow] = useState(0);
  const [opacity, setOpacity] = useState(100);

  const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg) blur(${blur}px) drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5)) opacity(${opacity}%)`;

  const css = `.filtered-img {\n  filter: \n    brightness(${brightness}%)\n    contrast(${contrast}%)\n    saturate(${saturate}%)\n    hue-rotate(${hue}deg)\n    blur(${blur}px)\n    drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5))\n    opacity(${opacity}%);\n}`;
  const html = `<img src="..." style="filter: ${filterStr};" />`;
  const jsx = `<img src="..." style={{ filter: '${filterStr}' }} className="w-full object-cover rounded-xl" />`;
  
  const preview = (
    <div className="relative w-full h-full max-w-[360px] max-h-[260px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group aspect-video">
       <img 
         src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" 
         alt="Filter Demo" 
         className="w-full h-full object-cover transition-all duration-200"
         style={{ filter: filterStr }} 
       />
    </div>
  );

  const controls = (
    <div className="space-y-1 pb-4">
      <PluginTip text="Pilih gambar, lalu gunakan Drop Shadow dan Contrast tinggi untuk simulasi efek Curve pop-out yang modern." />
      <div className="mb-3 pb-2 border-b border-[#1f1f1f]">
        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between">
          <span>Light & Color Tuning</span>
          <button onClick={() => { setBrightness(100); setContrast(100); setSaturate(100); setHue(0); }} className="text-[8px] text-slate-300 hover:text-white bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded transition-colors">RESET</button>
        </div>
      </div>
      <FigmaSlider label="Exposure" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
      <FigmaSlider label="Contrast" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
      <FigmaSlider label="Vibrance" min={0} max={200} value={saturate} onChange={setSaturate} unit="%" />
      <FigmaSlider label="Tint (Hue)" min={0} max={360} value={hue} onChange={setHue} unit="°" />
      
      <div className="mt-6 mb-3 pb-2 border-b border-[#1f1f1f]">
        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between">
          <span>Effects & Details</span>
          <button onClick={() => { setBlur(0); setShadow(0); setOpacity(100); }} className="text-[8px] text-slate-300 hover:text-white bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded transition-colors">RESET</button>
        </div>
      </div>
      <FigmaSlider label="Lens Blur" min={0} max={20} step={0.5} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Drop Shadow" min={0} max={50} value={shadow} onChange={setShadow} unit="px" />
      <FigmaSlider label="Opacity" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" />
    </div>
  );

  return <WorkspaceLayout name="Pro Filters" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};

export const PluginTransform = () => {
  const [rx, setRx] = useState(30); const [ry, setRy] = useState(-30); const [rz, setRz] = useState(0);
  const [tx, setTx] = useState(0); const [ty, setTy] = useState(0); const [tz, setTz] = useState(0);
  const [scale, setScale] = useState(1);

  const transStr = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translate3d(${tx}px, ${ty}px, ${tz}px) scale(${scale})`;

  const css = `.parent { perspective: 1000px; transform-style: preserve-3d; }\n.element {\n  transform: ${transStr};\n}`;
  const html = `<div style="perspective: 1000px; transform-style: preserve-3d;">\n  <div style="transform: ${transStr};">3D Object</div>\n</div>`;
  const jsx = `<div style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>\n  <div style={{ transform: '${transStr}' }}>3D Object</div>\n</div>`;
  
  const preview = (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
      <div 
        className="w-32 h-32 bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-2xl flex flex-col items-center justify-center border border-white/30 rounded-xl"
        style={{ transform: transStr, transition: 'transform 0.1s linear', transformStyle: 'preserve-3d', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.2)' }}
      >
        <Icons.Cube3D />
        <span className="text-[10px] font-bold mt-2 text-white tracking-widest" style={{ transform: 'translateZ(20px)' }}>TRUE 3D</span>
      </div>
    </div>
  );

  const controls = (
    <>
      <FigmaSlider label="Rotate X (Pitch)" min={-180} max={180} value={rx} onChange={setRx} unit="°" />
      <FigmaSlider label="Rotate Y (Yaw)" min={-180} max={180} value={ry} onChange={setRy} unit="°" />
      <FigmaSlider label="Rotate Z (Roll)" min={-180} max={180} value={rz} onChange={setRz} unit="°" />
      <FigmaSlider label="Translate Z (Depth)" min={-300} max={300} value={tz} onChange={setTz} unit="px" />
      <FigmaSlider label="Scale All" min={0.5} max={2} step={0.1} value={scale} onChange={setScale} unit="x" />
      <button onClick={() => { setRx(0); setRy(0); setRz(0); setTx(0); setTy(0); setTz(0); setScale(1); }} className="w-full mt-6 py-2.5 bg-[#1a1a1a] hover:bg-[#333] border border-[#2a2a2a] rounded-lg text-[10px] font-bold text-white uppercase tracking-widest transition-colors shadow-sm">Reset Matrix</button>
    </>
  );

  return <WorkspaceLayout name="True 3D Studio" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};

const ANIMATION_DATA = {
  "Attention": [{ name: "Bounce", val: "bounce" }, { name: "Pulse", val: "pulse" }, { name: "Shake", val: "shake" }],
  "Entrances": [{ name: "Fade In Up", val: "fadeInUp" }, { name: "Zoom In", val: "zoomIn" }],
  "Looping": [{ name: "Floating", val: "float" }, { name: "Spin 360", val: "spin" }]
};

const getDynamicKeyframes = (type) => {
  const map = {
    bounce: `0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-30px);} 60% {transform: translateY(-15px);}`,
    pulse: `0% {transform: scale(1);} 50% {transform: scale(1.15);} 100% {transform: scale(1);}`,
    shake: `0%, 100% {transform: translateX(0);} 10%, 30%, 50%, 70%, 90% {transform: translateX(-15px);} 20%, 40%, 60%, 80% {transform: translateX(15px);}`,
    fadeInUp: `from {opacity: 0; transform: translate3d(0, 100%, 0);} to {opacity: 1; transform: none;}`,
    zoomIn: `from {opacity: 0; transform: scale3d(0.3, 0.3, 0.3);} 50% {opacity: 1;}`,
    spin: `from {transform: rotate(0deg);} to {transform: rotate(360deg);}`,
    float: `0%, 100% {transform: translateY(0);} 50% {transform: translateY(-25px);}`
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
  const html = `<style>\n  @keyframes anim-${animType} { ${getDynamicKeyframes(animType)} }\n  .my-anim { animation: anim-${animType} ${duration}s ${timing} ${iteration}; }\n</style>\n<div class="my-anim">Animate Me</div>`;
  const jsx = `// Tambahkan keyframes ke global.css\n<div style={{ animation: 'anim-${animType} ${duration}s ${timing} ${iteration}' }}>\n  Animate Me\n</div>`;

  useEffect(() => { setKey(prev => prev + 1); }, [animType, duration, timing, iteration]);

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`@keyframes preview-${animType}-${key} { ${getDynamicKeyframes(animType)} }`}</style>
      <div 
        key={key}
        className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-pink-500 to-orange-400 shadow-2xl flex items-center justify-center border border-white/20"
        style={{ animation: `preview-${animType}-${key} ${duration}s ${timing} ${iteration === 'infinite' ? 'infinite' : iteration}` }}
      >
        <Icons.Animation />
      </div>
    </div>
  );

  const controls = (
    <>
      <FigmaCustomDropdown label="Animation Style" groups={ANIMATION_DATA} value={animType} onChange={setAnimType} />
      <FigmaSlider label="Duration" min={0.1} max={5} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Timing Function" options={['linear', 'ease', 'ease-in-out', 'ease-in']} value={timing} onChange={setTiming} />
      <FigmaSelect label="Iteration Count" options={['1', '2', '3', 'infinite']} value={iteration} onChange={setIteration} />
      <button onClick={() => setKey(k => k + 1)} className="w-full mt-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all">Replay Animation</button>
    </>
  );

  return <WorkspaceLayout name="Animation Builder" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};

const TRANSITIONS_DATA = {
  "Scale Effects": [{ name: "Grow", val: "scale(1.2)" }, { name: "Shrink", val: "scale(0.8)" }],
  "Translates": [{ name: "Push Up", val: "translateY(-20px)" }, { name: "Push Left", val: "translateX(-20px)" }],
  "Rotations": [{ name: "Rotate Right", val: "rotate(15deg) scale(1.1)" }, { name: "Spin Half", val: "rotate(180deg)" }]
};

export const PluginTransitions = () => {
  const [transType, setTransType] = useState('scale(1.2)'); 
  const [duration, setDuration] = useState(0.4);
  const [timing, setTiming] = useState('ease-in-out');

  const css = `.element {\n  transition: transform ${duration}s ${timing};\n}\n.element:hover {\n  transform: ${transType};\n}`;
  const html = `<style>.el { transition: transform ${duration}s ${timing}; } .el:hover { transform: ${transType}; }</style>\n<div class="el">Hover Me</div>`;
  const jsx = `<div \n  style={{ transition: 'transform ${duration}s ${timing}' }}\n  onMouseEnter={(e) => e.currentTarget.style.transform = '${transType}'}\n  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}\n>\n  Hover Me\n</div>`;

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center group cursor-pointer">
      <div 
        className="w-48 h-48 rounded-2xl bg-white flex flex-col items-center justify-center shadow-2xl"
        style={{ transition: `transform ${duration}s ${timing}` }}
        onMouseEnter={(e) => e.currentTarget.style.transform = transType}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        <div className="w-16 h-16 text-black mb-2"><Icons.Transitions /></div>
        <span className="text-black font-black uppercase tracking-widest text-sm">Hover Me</span>
      </div>
    </div>
  );

  const controls = (
    <>
      <PluginTip text="Pilih jenis efek. Saat di hover, transisi akan jauh lebih mulus dan terasa perubahannya." />
      <FigmaCustomDropdown label="Hover Effect Type" groups={TRANSITIONS_DATA} value={transType} onChange={setTransType} />
      <FigmaSlider label="Duration" min={0.1} max={3} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Timing/Easing" options={['ease', 'linear', 'ease-in-out', 'cubic']} value={timing} onChange={setTiming} />
    </>
  );

  return <WorkspaceLayout name="Hover Transitions" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};

export const PluginPixelArt = () => {
  const [gridSize, setGridSize] = useState(8); 
  const [color, setColor] = useState('#0ea5e9');
  
  // History State for Undo/Redo
  const [history, setHistory] = useState([Array(64).fill('transparent')]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const newEmpty = Array(gridSize * gridSize).fill('transparent');
    setHistory([newEmpty]);
    setStep(0);
  }, [gridSize]);

  const currentPixels = history[step];

  const paintPixel = (index) => {
    const newPixels = [...currentPixels];
    newPixels[index] = newPixels[index] === color ? 'transparent' : color;
    
    // Save to history
    const newHistory = history.slice(0, step + 1);
    newHistory.push(newPixels);
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  };

  const clearCanvas = () => {
    const newEmpty = Array(gridSize * gridSize).fill('transparent');
    const newHistory = history.slice(0, step + 1);
    newHistory.push(newEmpty);
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  };

  const handleUndo = () => setStep(Math.max(0, step - 1));
  const handleRedo = () => setStep(Math.min(history.length - 1, step + 1));

  const pixelSizePx = gridSize === 8 ? 10 : gridSize === 12 ? 8 : 6;

  const generateBoxShadow = () => {
    let shadow = [];
    currentPixels.forEach((p, i) => {
      if (p !== 'transparent') {
        const x = (i % gridSize) * pixelSizePx;
        const y = Math.floor(i / gridSize) * pixelSizePx;
        shadow.push(`${x}px ${y}px ${p}`);
      }
    });
    return shadow.length > 0 ? shadow.join(',\n    ') : 'none';
  };

  const css = `.pixel-art {\n  width: ${pixelSizePx}px;\n  height: ${pixelSizePx}px;\n  background: transparent;\n  box-shadow: \n    ${generateBoxShadow()};\n}`;
  const html = `<div style="width: ${pixelSizePx}px; height: ${pixelSizePx}px; box-shadow: ${generateBoxShadow().replace(/\n\s+/g, ' ')};"></div>`;
  const jsx = `<div style={{ width: '${pixelSizePx}px', height: '${pixelSizePx}px', boxShadow: '${generateBoxShadow().replace(/\n\s+/g, ' ')}' }} />`;

  const preview = (
    <div className="flex flex-col items-center">
      <div 
        className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] grid border border-[#1f1f1f] bg-[#0a0a0a]"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {currentPixels.map((bg, i) => (
          <div 
            key={i} 
            onClick={() => paintPixel(i)}
            className="border border-white/5 cursor-crosshair hover:bg-white/10 transition-colors w-full h-full"
            style={{ backgroundColor: bg !== 'transparent' ? bg : undefined }}
          />
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <button onClick={handleUndo} disabled={step === 0} className={`p-2 rounded-full border ${step === 0 ? 'border-[#1f1f1f] text-slate-600' : 'border-[#333] text-slate-300 hover:text-white hover:bg-[#1a1a1a]'}`}><Icons.Undo /></button>
        <button onClick={handleRedo} disabled={step === history.length - 1} className={`p-2 rounded-full border ${step === history.length - 1 ? 'border-[#1f1f1f] text-slate-600' : 'border-[#333] text-slate-300 hover:text-white hover:bg-[#1a1a1a]'}`}><Icons.Redo /></button>
      </div>
    </div>
  );

  const controls = (
    <>
      <PluginTip text="Kini kamu bisa leluasa menggambar! Jika salah, tekan tombol Undo (Kiri) atau Redo (Kanan) di bawah kanvas." />
      <FigmaSelect label="Canvas Size (Resolution)" options={['8', '12', '16']} value={gridSize.toString()} onChange={(val) => setGridSize(Number(val))} />
      
      <div className="flex justify-between items-center mb-4 mt-6 border-t border-[#1f1f1f] pt-4">
        <label className="text-[10px] font-medium text-slate-400 block">Brush Color</label>
        <button onClick={clearCanvas} className="text-[8px] text-red-400 hover:text-white bg-red-500/10 border border-red-500/30 px-2 py-1 rounded transition-colors uppercase font-bold tracking-widest">Clear Canvas</button>
      </div>
      <FigmaColorPicker label="Custom Hex" hexValue={color} onChange={setColor} />
      <div className="flex flex-wrap gap-2 mt-2">
        {['#0ea5e9', '#ec4899', '#f59e0b', '#10b981', '#ffffff', '#000000'].map(c => (
           <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-md border ${color === c ? 'border-cyan-400 scale-110 shadow-lg' : 'border-[#333]'}`} style={{backgroundColor: c}}></button>
        ))}
      </div>
    </>
  );

  return <WorkspaceLayout name="CSS Pixel Drawing" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};