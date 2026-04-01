"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons';

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
  l /= 100; const a = s * Math.min(l, 1 - l) / 100;
  const f = n => { const k = (n + h / 30) % 12; const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); return Math.round(255 * color).toString(16).padStart(2, '0'); };
  return `#${f(0)}${f(8)}${f(4)}`;
};
export const adjustBrightness = (hex, percent) => {
    let { h, s, l } = hexToHsl(hex);
    l = Math.max(0, Math.min(100, l + percent));
    return hslToHex(h, s, l);
};

export const COLOR_PRESETS = ['#ffffff', '#f1f5f9', '#1e1e1e', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

export const PluginTip = ({ text, title = "PRO TIPS & PANDUAN" }) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 sm:p-4 flex gap-3 items-start mb-5 relative shadow-sm animate-fade-in group">
      <button onClick={() => setIsVisible(false)} className="absolute top-2.5 right-2.5 text-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10 p-1 rounded-md transition-all" title="Tutup Panduan">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div className="text-cyan-400 mt-0.5 shrink-0"><Icons.Info /></div>
      <div className="pr-6">
         <h4 className="text-[9px] font-black text-cyan-400 mb-1.5 uppercase tracking-widest">{title}</h4>
         <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed font-medium">{text}</p>
      </div>
    </div>
  );
};

export const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => (
  <div className="flex items-center justify-between py-2.5 group border-b border-[#1f1f1f] last:border-0">
    <label className="text-[10px] font-medium text-slate-400 w-1/3 group-hover:text-slate-200 transition-colors truncate pr-2">{label}</label>
    <div className="w-2/3 flex items-center gap-3">
      <input type="range" min={min} max={max} step={step} value={value || 0} onChange={(e) => onChange(Number(e.target.value) || 0)} className="w-full h-[3px] bg-[#333] rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all" />
      <div className="bg-[#0a0a0a] px-2 py-1 rounded border border-[#2a2a2a] min-w-[55px] text-right shrink-0">
        <span className="text-[10px] font-mono text-cyan-400">{value || 0}{unit}</span>
      </div>
    </div>
  </div>
);

export const FigmaColorPicker = ({ label, hexValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const safeHexVal = hexValue || '#ffffff';
  const [hsl, setHsl] = useState(hexToHsl(safeHexVal));
  
  useEffect(() => { setHsl(hexToHsl(safeHexVal)); }, [safeHexVal]);

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
            <div className="w-5 h-5 rounded-md shadow-inner border border-white/10 ring-1 ring-black/50" style={{backgroundColor: safeHexVal}}></div>
            <div className="flex flex-col">
               <span className="text-[10px] font-medium text-slate-200 leading-none">{label}</span>
               <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">{safeHexVal}</span>
            </div>
          </div>
          <div className={`text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#141414] ${isOpen ? 'max-h-[300px] border-t border-[#2a2a2a] p-3 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1.5"><span className="text-[9px] text-slate-400">Hue</span></div>
              <input type="range" min="0" max="360" value={hsl.h || 0} onChange={(e) => handleHslChange('h', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'}} />
            </div>
            <div>
              <div className="flex justify-between mb-1.5"><span className="text-[9px] text-slate-400">Saturation</span></div>
              <input type="range" min="0" max="100" value={hsl.s || 0} onChange={(e) => handleHslChange('s', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #808080, ${hslToHex(hsl.h || 0, 100, 50)})`}} />
            </div>
            <div>
              <div className="flex justify-between mb-1.5"><span className="text-[9px] text-slate-400">Lightness</span></div>
              <input type="range" min="0" max="100" value={hsl.l || 0} onChange={(e) => handleHslChange('l', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #000, ${hslToHex(hsl.h || 0, hsl.s || 0, 50)}, #fff)`}} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#2a2a2a]">
            {COLOR_PRESETS.map((c) => (
              <button key={c} onClick={() => onChange(c)} className={`w-5 h-5 rounded-md border transition-transform hover:scale-110 ${safeHexVal===c ? 'border-cyan-400 scale-110 shadow-lg' : 'border-[#333]'}`} style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FigmaSelect = ({ label, options = [], value, onChange }) => (
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
       <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-20 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-[11px] text-white outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600 resize-none" />
     ) : (
       <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-[11px] text-white outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600" />
     )}
  </div>
);

export const FigmaCustomDropdown = ({ label, groups = {}, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  let currentName = value || 'Select...';
  for (const group in groups) {
    const found = groups[group].find(opt => opt.val === value);
    if (found) { currentName = found.name; break; }
  }

  useEffect(() => {
    const handleClickOutside = (event) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      <label className="text-[10px] font-medium text-slate-400 block mb-2">{label}</label>
      <div onClick={() => setIsOpen(!isOpen)} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 flex justify-between items-center cursor-pointer hover:border-[#444] transition-colors">
        <span className="text-[10px] sm:text-[11px] text-white font-mono truncate mr-2" title={currentName}>{currentName}</span>
        <div className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></div>
      </div>
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#141414] border border-[#2a2a2a] rounded-lg shadow-2xl max-h-[220px] overflow-y-auto custom-scroll ring-1 ring-black/50">
          {Object.entries(groups).map(([groupName, options]) => (
            <div key={groupName}>
              <div className="px-3 py-2 bg-[#0a0a0a] text-[9px] font-bold text-cyan-500 uppercase tracking-widest sticky top-0 border-b border-[#2a2a2a]">{groupName}</div>
              {options.map(opt => (
                <div key={opt.val} onClick={() => { onChange(opt.val); setIsOpen(false); }} className={`px-4 py-2.5 text-[10px] sm:text-[11px] cursor-pointer hover:bg-[#1f1f1f] transition-colors font-mono truncate ${value === opt.val ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500' : 'text-slate-300'}`}>{opt.name}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CodeOutput = ({ cssCode, htmlCode, jsxCode, isMobileTab }) => {
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState('css');

  const getActiveCode = () => {
    if (lang === 'css') return cssCode || '/* CSS Output */';
    if (lang === 'html') return htmlCode || '';
    return jsxCode || '// JSX Output';
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
               <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase transition-all ${lang === l ? 'bg-[#2a2a2a] text-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-[#1f1f1f]'}`}>{l === 'jsx' ? 'React/TW' : l}</button>
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

export const WorkspaceLayout = ({ name, controls, preview, cssOutput, htmlOutput, jsxOutput, bgType = 'grid', bgHex }) => {
  const [mobileTab, setMobileTab] = useState('design'); 

  // FIX BUG NEUMORPH & GLASS: Memberikan izin background-color kustom agar 3D Timbul menyatu dengan background!
  const renderBackground = () => {
    if (bgType === 'grid') return <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>;
    if (bgType === 'light') return <div className="absolute inset-0 transition-colors duration-300" style={{ backgroundColor: bgHex || '#f8fafc' }}></div>;
    if (bgType === 'glass') return <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}></div>;
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full animate-fade-in bg-[#050505] lg:bg-transparent">
       <div className="h-[35vh] sm:h-[40vh] lg:hidden relative flex items-center justify-center overflow-hidden border-b border-[#1f1f1f] z-30 transition-colors duration-500 shadow-lg shrink-0" style={{backgroundColor: bgHex || '#050505'}}>
          {renderBackground()}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-6 overflow-hidden perspective-1000">{preview}</div>
       </div>

       <div className="hidden lg:flex flex-1 flex-col min-w-0 lg:border-r border-[#1f1f1f]">
         <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[#050505] border-b border-[#1f1f1f] z-10 transition-colors duration-500" style={{backgroundColor: bgHex || '#050505'}}>
            {renderBackground()}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 overflow-hidden perspective-1000">{preview}</div>
         </div>
         <div className="h-[280px] shrink-0 p-4 bg-[#0a0a0a]">
            <CodeOutput cssCode={cssOutput} htmlCode={htmlOutput} jsxCode={jsxOutput} />
         </div>
       </div>

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
