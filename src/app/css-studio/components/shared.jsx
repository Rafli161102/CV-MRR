"use client";

import React, { useState, useEffect } from 'react';

// =========================================================================
// 1. IKON SVG PROFESIONAL
// =========================================================================
export const Icons = {
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  Layout: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.5-6h15m-15-6h15m-3-4.5H5.25C4.007 3 3 4.007 3 5.25v13.5c0 1.243 1.007 2.25 2.25 2.25h13.5c1.243 0 2.25-2.25V5.25c0-1.243-1.007-2.25-2.25-2.25z" /></svg>,
  Typography: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" /></svg>,
  Border: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
  Glass: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18m6-18v18M3 9h18m-18 6h18" opacity="0.3"/></svg>,
  Glow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  Shadow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" /></svg>,
  Neumorphism: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>,
  Filters: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
  Cube3D: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  Animation: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  TextGrad: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
};

// =========================================================================
// 2. COLOR ENGINE (Helper HSL)
// =========================================================================
export const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
};

export const hexToHsl = (hex) => {
  let r = 0, g = 0, b = 0;
  if (hex?.length === 7) { 
    r = parseInt(hex.slice(1, 3), 16) / 255; g = parseInt(hex.slice(3, 5), 16) / 255; b = parseInt(hex.slice(5, 7), 16) / 255; 
  }
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; } else {
    const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
    h /= 6;
  }
  return { h: Math.round(h * 360) || 0, s: Math.round(s * 100) || 0, l: Math.round(l * 100) || 0 };
};

export const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const hexToRgba = (hex, alpha) => `rgba(${hexToRgb(hex)}, ${alpha})`;
const COLOR_PRESETS = ['#ffffff', '#1e1e1e', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

// =========================================================================
// 3. UI COMPONENTS
// =========================================================================

export const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => (
  <div className="flex items-center justify-between py-1.5 group">
    <label className="text-[10px] font-medium text-slate-400 w-1/3 group-hover:text-slate-200 transition-colors truncate pr-2">{label}</label>
    <div className="w-2/3 flex items-center gap-2">
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-[2px] bg-[#444] rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-150 transition-all" />
      <div className="bg-[#111111] px-1.5 py-0.5 rounded border border-[#333] w-12 text-right shrink-0">
        <span className="text-[9px] font-mono text-cyan-400">{value}{unit}</span>
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
      <div className="bg-[#111111] border border-[#333] rounded-lg overflow-hidden transition-all duration-300 shadow-sm">
        <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-[#1a1a1c] transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded shadow-inner border border-white/10" style={{backgroundColor: hexValue}}></div>
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-slate-300 uppercase leading-none">{label}</span>
               <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">{hexValue}</span>
            </div>
          </div>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <Icons.ChevronDown />
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[250px] border-t border-[#333] p-3 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">Hue</span></div>
              <input type="range" min="0" max="360" value={hsl.h} onChange={(e) => handleHslChange('h', Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'}} />
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">Saturation</span></div>
              <input type="range" min="0" max="100" value={hsl.s} onChange={(e) => handleHslChange('s', Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #808080, ${hslToHex(hsl.h, 100, 50)})`}} />
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">Lightness</span></div>
              <input type="range" min="0" max="100" value={hsl.l} onChange={(e) => handleHslChange('l', Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #000, ${hslToHex(hsl.h, hsl.s, 50)}, #fff)`}} />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#333]">
            {COLOR_PRESETS.map((c) => (
              <button key={c} onClick={() => onChange(c)} className={`w-4 h-4 rounded-full border transition-transform hover:scale-125 ${hexValue===c ? 'border-white scale-110 shadow-lg' : 'border-white/20'}`} style={{ backgroundColor: c }} />
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
     <div className="flex bg-[#111111] p-1 rounded border border-[#333]">
        {options.map(opt => (
           <button key={opt} onClick={() => onChange(opt)} className={`flex-1 py-1 rounded-sm text-[9px] font-bold uppercase transition-all ${value === opt ? 'bg-[#3f3f46] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>{opt}</button>
        ))}
     </div>
  </div>
);

export const FigmaTextInput = ({ label, value, onChange }) => (
  <div className="mb-4">
     <label className="text-[10px] font-medium text-slate-400 block mb-2">{label}</label>
     <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-[#111111] border border-[#333] rounded px-3 py-2 text-[10px] text-white outline-none focus:border-cyan-500 transition-colors" />
  </div>
);

export const CodeOutput = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="h-[220px] bg-[#1e1e1e] border border-[#333] rounded-2xl relative flex flex-col shrink-0 overflow-hidden shadow-xl">
       <button onClick={handleCopy} className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded bg-[#252526] border border-[#444] text-slate-300 hover:bg-cyan-500 hover:text-[#111] transition-all text-[10px] font-bold uppercase tracking-wider shadow-md">
         {copied ? 'COPIED!' : 'COPY CSS'}
       </button>
       <div className="px-4 py-2 border-b border-[#333] bg-[#252526]">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CSS Output</span>
       </div>
       <div className="p-4 overflow-y-auto flex-grow bg-[#111111] custom-scroll">
          <pre className="text-[11px] font-mono text-cyan-300/80 leading-relaxed"><code>{code}</code></pre>
       </div>
    </div>
  )
};

export const WorkspaceLayout = ({ name, controls, preview, cssOutput, bgType = 'grid', bgHex }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full h-full pb-10 lg:pb-0 animate-fade-in">
       {/* KANAN: PROPERTIES PANEL (Mobile: Order 1, Desktop: Order 3) */}
       <div className="order-2 lg:order-3 w-full lg:w-[280px] xl:w-[320px] bg-[#18181b] border border-[#252526] rounded-2xl flex flex-col h-auto lg:h-[calc(100vh-100px)] shrink-0 shadow-xl overflow-hidden z-20">
         <div className="px-4 py-3 border-b border-[#252526] bg-[#1e1e1e]">
            <h2 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{name} Properties</h2>
         </div>
         <div className="p-4 overflow-y-auto custom-scroll flex-grow">
            {controls}
         </div>
       </div>

       {/* TENGAH: CANVAS & CODE (Mobile: Order 2, Desktop: Order 2) */}
       <div className="order-1 lg:order-2 flex-1 flex flex-col gap-4 overflow-visible lg:overflow-hidden h-auto lg:h-[calc(100vh-100px)]">
         {/* Canvas Preview */}
         <div className="h-[350px] lg:h-auto lg:flex-1 rounded-2xl border border-[#252526] relative flex items-center justify-center overflow-hidden shadow-inner sticky top-4 lg:static z-10 transition-colors duration-500" style={{backgroundColor: bgHex || '#0a0a0b'}}>
            {bgType === 'grid' && <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>}
            {bgType === 'image' && <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}></div>}
            {bgType === 'light' && <div className="absolute inset-0 bg-[#e5e7eb]"></div>}
            {bgType === 'dark' && <div className="absolute inset-0 bg-[#030712]"></div>}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4 overflow-hidden">{preview}</div>
         </div>
         
         <div className="hidden lg:block"><CodeOutput code={cssOutput} /></div>
       </div>

       {/* Mobile Code Output */}
       <div className="order-3 lg:hidden w-full"><CodeOutput code={cssOutput} /></div>
    </div>
  );
};