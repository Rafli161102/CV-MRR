"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// =========================================================================
// 📦 VIRTUAL FILE: shared.jsx (Berisi Ikon, Fungsi Warna & UI Components)
// =========================================================================

// FIX VERCEL BUG 1: Menambahkan kembali "() =>" agar menjadi valid React Function Component
const Icons = {
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  ChevronDown: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className || "w-3 h-3"}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  
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
// COLOR ENGINE (Mencegah Error Vercel & Mengatur HSL Konversi)
// =========================================================================
const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
};

const hexToHsl = (hex) => {
  let r = 0, g = 0, b = 0;
  if (hex?.length === 7) { 
    r = parseInt(hex.slice(1, 3), 16) / 255; 
    g = parseInt(hex.slice(3, 5), 16) / 255; 
    b = parseInt(hex.slice(5, 7), 16) / 255; 
  }
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; } 
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360) || 0, s: Math.round(s * 100) || 0, l: Math.round(l * 100) || 0 };
};

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const hexToRgba = (hex, alpha) => `rgba(${hexToRgb(hex)}, ${alpha})`;
const COLOR_PRESETS = ['#ffffff', '#1e1e1e', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

// =========================================================================
// REUSABLE UI COMPONENTS
// =========================================================================

const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => (
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

const FigmaColorPicker = ({ label, hexValue, onChange }) => {
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
            <div className="w-5 h-5 rounded shadow-inner border border-white/10" style={{backgroundColor: hexValue}}></div>
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-slate-300 uppercase leading-none">{label}</span>
               <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">{hexValue}</span>
            </div>
          </div>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <Icons.ChevronDown className="w-4 h-4 text-slate-500" />
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

const FigmaSelect = ({ label, options, value, onChange }) => (
  <div className="mb-4">
     <label className="text-[10px] font-medium text-slate-400 block mb-2">{label}</label>
     <div className="flex bg-[#111111] p-1 rounded border border-[#333]">
        {options.map(opt => (
           <button key={opt} onClick={() => onChange(opt)} className={`flex-1 py-1 rounded-sm text-[9px] font-bold uppercase transition-all ${value === opt ? 'bg-[#3f3f46] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>{opt}</button>
        ))}
     </div>
  </div>
);

const FigmaTextInput = ({ label, value, onChange }) => (
  <div className="mb-4">
     <label className="text-[10px] font-medium text-slate-400 block mb-2">{label}</label>
     <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-[#111111] border border-[#333] rounded px-3 py-2 text-[10px] text-white outline-none focus:border-cyan-500 transition-colors" />
  </div>
);

const CodeOutput = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="h-[220px] bg-[#1e1e1e] border border-[#333] rounded-2xl relative flex flex-col shrink-0 overflow-hidden shadow-xl mt-4 lg:mt-0">
       <button onClick={handleCopy} className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded bg-[#252526] border border-[#444] text-slate-300 hover:bg-cyan-500 hover:text-[#111] transition-all text-[10px] font-bold uppercase tracking-wider shadow-md">
         {copied ? 'COPIED!' : 'COPY CSS'}
       </button>
       <div className="px-4 py-2.5 border-b border-[#333] bg-[#252526]">
         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">CSS Output</span>
       </div>
       <div className="p-4 overflow-y-auto flex-grow bg-[#111111] custom-scroll">
          <pre className="text-[11px] font-mono text-cyan-300/80 leading-relaxed"><code>{code}</code></pre>
       </div>
    </div>
  )
};

const WorkspaceLayout = ({ name, controls, preview, cssOutput, bgType = 'grid', bgHex }) => {
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
            {bgType === 'image' && <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')" }}></div>}
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

// =========================================================================
// 📦 VIRTUAL FILE: plugins.jsx (Berisi Semua Efek CSS Studio)
// =========================================================================

const PluginLayout = () => {
  const [shape, setShape] = useState('box');
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState(150);
  const [padding, setPadding] = useState(24);
  const [radius, setRadius] = useState(24);
  const [bgColor, setBgColor] = useState('#0ea5e9');
  const [align, setAlign] = useState('center');

  const css = `.box-element {\n  display: flex;\n  align-items: ${align};\n  justify-content: ${align};\n  width: ${shape === 'circle' ? '200' : shape === 'pill' ? '300' : width}px;\n  height: ${shape === 'circle' ? '200' : shape === 'pill' ? '100' : height}px;\n  padding: ${padding}px;\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : `${radius}px`};\n  background-color: ${bgColor};\n}`;
  const preview = (
    <div style={{ display: 'flex', alignItems: align, justifyContent: align, width: `${shape === 'circle' ? 200 : shape === 'pill' ? 300 : width}px`, height: `${shape === 'circle' ? 200 : shape === 'pill' ? 100 : height}px`, padding: `${padding}px`, borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : `${radius}px`, backgroundColor: bgColor }} className="transition-all duration-300 shadow-xl max-w-full max-h-full">
      <div className="bg-black/20 w-full h-full border border-black/10 rounded flex items-center justify-center">
        <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest text-center">Layout Area</span>
      </div>
    </div>
  );
  const controls = (
    <>
      <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
      <div className="my-4 border-t border-[#333] pt-4"></div>
      <FigmaSlider label="Width" min={50} max={500} value={width} onChange={setWidth} unit="px" />
      <FigmaSlider label="Height" min={50} max={500} value={height} onChange={setHeight} unit="px" />
      <FigmaSlider label="Padding" min={0} max={100} value={padding} onChange={setPadding} unit="px" />
      {shape === 'box' && <FigmaSlider label="Border Radius" min={0} max={200} value={radius} onChange={setRadius} unit="px" />}
      <div className="my-4 border-t border-[#333] pt-4"></div>
      <FigmaSelect label="Flex Align" options={['flex-start', 'center', 'flex-end']} value={align} onChange={setAlign} />
      <FigmaColorPicker label="Background Color" hexValue={bgColor} onChange={setBgColor} />
    </>
  );
  return <WorkspaceLayout name="Layout & Flex" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};

const PluginBorder = () => {
  const [shape, setShape] = useState('box');
  const [width, setWidth] = useState(4);
  const [radius, setRadius] = useState(24);
  const [style, setStyle] = useState('solid');
  const [color, setColor] = useState('#0ea5e9');

  const css = `.border-element {\n  border: ${width}px ${style} ${color};\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : `${radius}px`};\n  background-color: transparent;\n}`;
  const preview = (
    <div style={{
      width: shape === 'circle' ? '200px' : shape === 'pill' ? '300px' : '200px',
      height: shape === 'circle' ? '200px' : shape === 'pill' ? '100px' : '200px',
      border: `${width}px ${style} ${color}`,
      borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : `${radius}px`,
    }} className="flex items-center justify-center transition-all duration-500">
      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Border Area</span>
    </div>
  );
  const controls = (
    <>
      <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
      <div className="my-4 border-t border-[#333] pt-4"></div>
      <FigmaSlider label="Border Width" min={0} max={30} value={width} onChange={setWidth} unit="px" />
      {shape === 'box' && <FigmaSlider label="Border Radius" min={0} max={200} value={radius} onChange={setRadius} unit="px" />}
      <FigmaSelect label="Border Style" options={['solid', 'dashed', 'dotted']} value={style} onChange={setStyle} />
      <FigmaColorPicker label="Border Color" hexValue={color} onChange={setColor} />
    </>
  );
  return <WorkspaceLayout name="Border Styling" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};

const PluginTypography = () => {
  const [text, setText] = useState('MRR Studio.');
  const [size, setSize] = useState(48);
  const [weight, setWeight] = useState(800);
  const [letter, setLetter] = useState(-1);
  const [align, setAlign] = useState('center');
  const [color, setColor] = useState('#ffffff');
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(4);
  const [shadowB, setShadowB] = useState(15);
  const [shadowC, setShadowC] = useState('#0ea5e9');
  const [shadowO, setShadowO] = useState(0.5);

  const css = `.text-element {\n  font-size: ${size}px;\n  font-weight: ${weight};\n  letter-spacing: ${letter}px;\n  text-align: ${align};\n  color: ${color};\n  text-shadow: ${shadowX}px ${shadowY}px ${shadowB}px ${hexToRgba(shadowC, shadowO)};\n}`;
  const preview = (
    <div className="w-full" style={{ textAlign: align }}>
       <h2 style={{ fontSize: `${size}px`, fontWeight: weight, letterSpacing: `${letter}px`, color: color, textShadow: `${shadowX}px ${shadowY}px ${shadowB}px ${hexToRgba(shadowC, shadowO)}`, transition: 'all 0.3s ease' }}>{text}</h2>
    </div>
  );
  const controls = (
    <>
      <FigmaTextInput label="Text Input" value={text} onChange={setText} />
      <FigmaSlider label="Font Size" min={12} max={120} value={size} onChange={setSize} />
      <FigmaSlider label="Font Weight" min={100} max={900} step={100} value={weight} onChange={setWeight} />
      <FigmaSlider label="Letter Spacing" min={-10} max={30} step={0.5} value={letter} onChange={setLetter} />
      <FigmaSelect label="Text Align" options={['left', 'center', 'right']} value={align} onChange={setAlign} />
      <FigmaColorPicker label="Text Color" hexValue={color} onChange={setColor} />
      <div className="mt-4 pt-4 border-t border-[#333]">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Drop Shadow</h3>
        <FigmaSlider label="X Offset" min={-30} max={30} value={shadowX} onChange={setShadowX} />
        <FigmaSlider label="Y Offset" min={-30} max={30} value={shadowY} onChange={setShadowY} />
        <FigmaSlider label="Blur Radius" min={0} max={50} value={shadowB} onChange={setShadowB} />
        <FigmaSlider label="Opacity" min={0} max={1} step={0.05} value={shadowO} onChange={setShadowO} />
        <FigmaColorPicker label="Shadow Color" hexValue={shadowC} onChange={setShadowC} />
      </div>
    </>
  );
  return <WorkspaceLayout name="Typography" controls={controls} preview={preview} cssOutput={css} />;
};

const PluginTextGradient = () => {
  const [text, setText] = useState('Gradient.');
  const [size, setSize] = useState(64);
  const [weight, setWeight] = useState(900);
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState('#0ea5e9');
  const [color2, setColor2] = useState('#8b5cf6');

  const css = `.gradient-text {\n  font-size: ${size}px;\n  font-weight: ${weight};\n  background: linear-gradient(${angle}deg, ${color1}, ${color2});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  color: transparent;\n}`;
  const preview = (
     <h2 className="tracking-tighter transition-all duration-300" style={{ fontSize: `${size}px`, fontWeight: weight, background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{text}</h2>
  );
  const controls = (
     <>
       <FigmaTextInput label="Text Input" value={text} onChange={setText} />
       <FigmaSlider label="Font Size" min={24} max={120} value={size} onChange={setSize} unit="px" />
       <FigmaSlider label="Font Weight" min={100} max={900} step={100} value={weight} onChange={setWeight} />
       <div className="my-4 border-t border-[#333] pt-4"></div>
       <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
       <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
       <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
     </>
  );
  return <WorkspaceLayout name="Text Gradient" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};

const PluginGlassmorphism = () => {
   const [shape, setShape] = useState('box');
   const [color, setColor] = useState('#ffffff');
   const [opacity, setOpacity] = useState(0.15);
   const [blur, setBlur] = useState(12);
   const [outline, setOutline] = useState(0.2);

   const css = `.glass-panel {\n  background: ${hexToRgba(color, opacity)};\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n  border: 1px solid ${hexToRgba('#ffffff', outline)};\n  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px'};\n}`;
   const preview = (
     <div style={{
        width: shape === 'circle' ? '220px' : shape === 'pill' ? '320px' : '220px',
        height: shape === 'circle' ? '220px' : shape === 'pill' ? '100px' : '220px',
        borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px',
        background: hexToRgba(color, opacity),
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: `1px solid ${hexToRgba('#ffffff', outline)}`,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
     }} className="flex items-center justify-center transition-all duration-500 max-w-[90%] max-h-[90%]">
       <span className="text-white font-bold tracking-widest uppercase text-[10px]">Glass Effect</span>
     </div>
   );
   const controls = (
     <>
        <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
        <div className="my-4 border-t border-[#333] pt-4"></div>
        <FigmaColorPicker label="Glass Tint Color" hexValue={color} onChange={setColor} />
        <FigmaSlider label="Opacity" min={0} max={1} step={0.05} value={opacity} onChange={setOpacity} />
        <FigmaSlider label="Blur Radius" min={0} max={50} value={blur} onChange={setBlur} unit="px" />
        <FigmaSlider label="Border Outline" min={0} max={1} step={0.05} value={outline} onChange={setOutline} />
     </>
   );
   return <WorkspaceLayout name="Glassmorphism" controls={controls} preview={preview} cssOutput={css} bgType="image" />;
};

const PluginNeumorphism = () => {
   const [shape, setShape] = useState('box');
   const [neuBg, setNeuBg] = useState('#1e1e1e');
   const [distance, setDistance] = useState(8);
   const [blur, setBlur] = useState(16);
   const [intensity, setIntensity] = useState(0.15);
   const [neuType, setNeuType] = useState('flat');

   let inset = neuType === 'concave' ? 'inset ' : '';
   let lightShadow = `${inset}-${distance}px -${distance}px ${blur}px ${hexToRgba('#ffffff', intensity / 2)}`;
   let darkShadow = `${inset}${distance}px ${distance}px ${blur}px ${hexToRgba('#000000', intensity + 0.3)}`;
   let bgGradient = neuType === 'convex' ? `linear-gradient(145deg, ${hexToRgba(neuBg, 1.1)}, ${hexToRgba(neuBg, 0.9)})` : neuType === 'concave' ? `linear-gradient(145deg, ${hexToRgba(neuBg, 0.9)}, ${hexToRgba(neuBg, 1.1)})` : neuBg;

   const css = `.soft-ui {\n  background: ${neuType === 'flat' ? neuBg : bgGradient};\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px'};\n  box-shadow: ${darkShadow}, ${lightShadow};\n}`;
   
   const preview = (
     <div style={{
       width: shape === 'circle' ? '200px' : shape === 'pill' ? '300px' : '200px',
       height: shape === 'circle' ? '200px' : shape === 'pill' ? '100px' : '200px',
       borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px',
       background: bgGradient,
       boxShadow: `${darkShadow}, ${lightShadow}`
     }} className="flex items-center justify-center transition-all duration-500 max-w-[90%] max-h-[90%]">
       <span className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Soft UI</span>
     </div>
   );
   const controls = (
     <>
        <FigmaSelect label="Shape Builder" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
        <FigmaSelect label="Light Direction" options={['flat', 'concave', 'convex']} value={neuType} onChange={setNeuType} />
        <div className="my-4 border-t border-[#333] pt-4"></div>
        <FigmaColorPicker label="Surface Color" hexValue={neuBg} onChange={setNeuBg} />
        <FigmaSlider label="Distance" min={2} max={30} step={0.5} value={distance} onChange={setDistance} unit="px" />
        <FigmaSlider label="Blur Radius" min={0} max={60} step={0.5} value={blur} onChange={setNeoBlur} unit="px" />
        <FigmaSlider label="Intensity" min={0.05} max={0.5} step={0.05} value={intensity} onChange={setIntensity} />
     </>
   );
   return (
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full h-full pb-10 lg:pb-0 animate-fade-in">
        <div className="order-2 lg:order-3 w-full lg:w-[280px] xl:w-[320px] bg-[#18181b] border border-[#252526] rounded-2xl flex flex-col h-auto lg:h-[calc(100vh-100px)] shrink-0 shadow-xl overflow-hidden z-20">
          <div className="px-4 py-3 border-b border-[#252526] bg-[#1e1e1e]"><h2 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Neumorphism</h2></div>
          <div className="p-4 overflow-y-auto custom-scroll flex-grow">{controls}</div>
        </div>
        <div className="order-1 lg:order-2 flex-1 flex flex-col gap-4 overflow-visible lg:overflow-hidden h-auto lg:h-[calc(100vh-100px)]">
          <div className="h-[350px] lg:h-auto lg:flex-1 rounded-2xl border border-[#252526] relative flex items-center justify-center overflow-hidden shadow-inner sticky top-4 lg:static z-10 transition-colors duration-500" style={{backgroundColor: neuBg}}>
             <div className="relative z-10 w-full h-full flex items-center justify-center p-4 overflow-hidden">{preview}</div>
          </div>
          <div className="hidden lg:block"><CodeOutput code={css} /></div>
        </div>
        <div className="order-3 lg:hidden w-full"><CodeOutput code={css} /></div>
      </div>
   );
};

const PluginShadow = () => {
   const [shape, setShape] = useState('box');
   const [layers, setLayers] = useState(4);
   const [y, setY] = useState(12);
   const [blur, setBlur] = useState(24);
   const [spread, setSpread] = useState(0);
   const [opacity, setOpacity] = useState(0.25);
   const [color, setColor] = useState('#000000');

   let shadows = [];
   for (let i = 1; i <= layers; i++) {
     shadows.push(`0 ${(y / layers) * i}px ${(blur / layers) * i}px ${(spread / layers) * i}px ${hexToRgba(color, Math.max(opacity - (i * 0.03), 0.02))}`);
   }
   const css = `.shadow-element {\n  background: #ffffff;\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px'};\n  box-shadow:\n    ${shadows.join(',\n    ')};\n}`;
   
   const preview = (
     <div style={{
       width: shape === 'circle' ? '180px' : shape === 'pill' ? '280px' : '180px',
       height: shape === 'circle' ? '180px' : shape === 'pill' ? '90px' : '180px',
       borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px',
       background: '#ffffff',
       boxShadow: shadows.join(', ')
     }} className="flex items-center justify-center transition-all duration-500">
       <span className="text-slate-800 font-bold tracking-widest uppercase text-[10px]">Shadow</span>
     </div>
   );
   const controls = (
     <>
       <FigmaSelect label="Shape Builder" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
       <div className="my-4 border-t border-[#333] pt-4"></div>
       <FigmaSlider label="Smooth Layers" min={1} max={6} value={layers} onChange={setLayers} />
       <FigmaSlider label="Y Offset" min={-50} max={50} value={y} onChange={setY} unit="px" />
       <FigmaSlider label="Blur Radius" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
       <FigmaSlider label="Spread" min={-20} max={20} value={spread} onChange={setSpread} unit="px" />
       <FigmaSlider label="Opacity" min={0.05} max={1} step={0.05} value={opacity} onChange={setOpacity} />
       <FigmaColorPicker label="Shadow Color" hexValue={color} onChange={setColor} />
     </>
   );
   return <WorkspaceLayout name="Smooth Shadow" controls={controls} preview={preview} cssOutput={css} bgType="light" />;
};

const PluginGlow = () => {
   const [shape, setShape] = useState('box');
   const [color, setColor] = useState('#0ea5e9');
   const [blur, setBlur] = useState(30);
   const [spread, setSpread] = useState(10);
   const [opacity, setOpacity] = useState(0.6);

   const css = `.neon-element {\n  background: #111111;\n  border: 1px solid ${hexToRgba(color, 0.5)};\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px'};\n  box-shadow: 0 0 ${blur}px ${spread}px ${hexToRgba(color, opacity)}, inset 0 0 15px ${hexToRgba(color, opacity * 0.5)};\n}`;
   
   const preview = (
     <div style={{
       width: shape === 'circle' ? '180px' : shape === 'pill' ? '280px' : '180px',
       height: shape === 'circle' ? '180px' : shape === 'pill' ? '90px' : '180px',
       borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px',
       background: '#111111',
       border: `1px solid ${hexToRgba(color, 0.5)}`,
       boxShadow: `0 0 ${blur}px ${spread}px ${hexToRgba(color, opacity)}, inset 0 0 15px ${hexToRgba(color, opacity * 0.5)}`
     }} className="flex items-center justify-center transition-all duration-500">
       <span className="text-white font-bold tracking-widest uppercase text-[10px]">Neon Glow</span>
     </div>
   );
   const controls = (
     <>
       <FigmaSelect label="Shape Builder" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
       <div className="my-4 border-t border-[#333] pt-4"></div>
       <FigmaColorPicker label="Glow Color" hexValue={color} onChange={setColor} />
       <FigmaSlider label="Blur Radius" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
       <FigmaSlider label="Spread Radius" min={-20} max={50} value={spread} onChange={setSpread} unit="px" />
       <FigmaSlider label="Opacity" min={0} max={1} step={0.05} value={opacity} onChange={setOpacity} />
     </>
   );
   return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};

const PluginFilters = () => {
   const [blur, setBlur] = useState(0);
   const [brightness, setBrightness] = useState(100);
   const [contrast, setContrast] = useState(100);
   const [grayscale, setGrayscale] = useState(0);
   const [sepia, setSepia] = useState(0);

   const css = `.filter-image {\n  filter: blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%);\n  border-radius: 16px;\n}`;
   
   const preview = (
     <div className="w-[90%] max-w-[400px] aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
       <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop" alt="Filter preview" className="w-full h-full object-cover transition-all duration-300" style={{ filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%)` }} />
       <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white font-mono uppercase">Image Element</div>
     </div>
   );
   const controls = (
     <>
       <div className="p-2 mb-4 bg-cyan-900/20 border border-cyan-500/20 rounded text-[9px] text-cyan-300">Filter diterapkan ke elemen gambar utuh.</div>
       <FigmaSlider label="Blur" min={0} max={20} step={0.5} value={blur} onChange={setBlur} unit="px" />
       <FigmaSlider label="Brightness" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
       <FigmaSlider label="Contrast" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
       <FigmaSlider label="Grayscale" min={0} max={100} value={grayscale} onChange={setGrayscale} unit="%" />
       <FigmaSlider label="Sepia" min={0} max={100} value={sepia} onChange={setSepia} unit="%" />
     </>
   );
   return <WorkspaceLayout name="CSS Filters" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};

const PluginTransform = () => {
   const [rotX, setRotX] = useState(20);
   const [rotY, setRotY] = useState(30);
   const [scale, setScale] = useState(1);
   const [persp, setPersp] = useState(1000);

   const css = `.transform-3d {\n  transform: perspective(${persp}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale});\n  background: linear-gradient(135deg, #0ea5e9, #3b82f6);\n  border-radius: 24px;\n  box-shadow: 0 30px 60px rgba(0,0,0,0.4);\n  transition: transform 0.3s ease;\n}`;
   
   const preview = (
     <div style={{
       width: '200px', height: '200px', borderRadius: '24px',
       background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
       boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
       transform: `perspective(${persp}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`
     }} className="flex items-center justify-center transition-all duration-300">
       <span className="text-white font-bold tracking-widest uppercase text-xs">3D Shape</span>
     </div>
   );
   const controls = (
     <>
       <FigmaSlider label="Rotate X" min={-180} max={180} value={rotX} onChange={setRotX} unit="°" />
       <FigmaSlider label="Rotate Y" min={-180} max={180} value={rotY} onChange={setRotY} unit="°" />
       <FigmaSlider label="Scale (Zoom)" min={0.5} max={1.5} step={0.05} value={scale} onChange={setScale} />
       <FigmaSlider label="Perspective" min={200} max={2000} step={50} value={persp} onChange={setPersp} unit="px" />
     </>
   );
   return <WorkspaceLayout name="3D Transform" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};

const PluginAnimation = () => {
   const [type, setType] = useState('float');
   const [duration, setDuration] = useState(3);
   const [shape, setShape] = useState('box');

   const css = `.animated-box {\n  animation: ${type} ${duration}s infinite ${type === 'spin' ? 'linear' : 'ease-in-out'};\n}\n\n/* Include Keyframes below */\n@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}\n@keyframes pulse-glow {\n  0%, 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); }\n  50% { box-shadow: 0 0 40px 20px rgba(14, 165, 233, 0); }\n}\n@keyframes spin-rotate {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`;
   
   const preview = (
     <>
       <style dangerouslySetInnerHTML={{__html: `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } } @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.5); } 50% { box-shadow: 0 0 40px 20px rgba(14, 165, 233, 0); } } @keyframes spin-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}} />
       <div style={{
         width: shape === 'circle' ? '180px' : shape === 'pill' ? '280px' : '180px',
         height: shape === 'circle' ? '180px' : shape === 'pill' ? '90px' : '180px',
         borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px',
         background: 'linear-gradient(135deg, #18181b, #252526)',
         border: '1px solid rgba(14, 165, 233, 0.3)',
         animation: `${type === 'spin' ? 'spin-rotate' : type === 'pulse' ? 'pulse-glow' : 'float'} ${duration}s infinite ${type === 'spin' ? 'linear' : 'ease-in-out'}`
       }} className="flex items-center justify-center">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-[10px]">Animate</span>
       </div>
     </>
   );
   const controls = (
     <>
       <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
       <div className="my-4 border-t border-[#333] pt-4"></div>
       <div className="mb-4">
         <label className="text-[10px] font-medium text-slate-400 block mb-2">Animation Keyframes</label>
         <div className="flex flex-col gap-1.5">
           {[{ id: 'float', name: 'Floating' }, { id: 'pulse', name: 'Pulse Glow' }, { id: 'spin', name: 'Spin Rotate' }].map(anim => (
             <button key={anim.id} onClick={() => setType(anim.id)} className={`px-3 py-2 rounded text-[10px] font-bold text-left transition-all ${type === anim.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-[#111111] text-slate-400 border border-[#333] hover:bg-[#2c2c2e]'}`}>
               {anim.name}
             </button>
           ))}
         </div>
       </div>
       <FigmaSlider label="Duration (s)" min={0.5} max={10} step={0.5} value={duration} onChange={setDuration} />
     </>
   );
   return <WorkspaceLayout name="CSS Animations" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};

// =========================================================================
// 5. MASTER REGISTRY (Database Plugin)
// =========================================================================
const PLUGINS = [
  { id: 'layout', title: 'Box Layout', icon: <Icons.Layout />, component: PluginLayout, cat: 'Structure' },
  { id: 'border', title: 'Border', icon: <Icons.Border />, component: PluginBorder, cat: 'Structure' },
  { id: 'typography', title: 'Typography', icon: <Icons.Typography />, component: PluginTypography, cat: 'Text' },
  { id: 'text-gradient', title: 'Txt Gradient', icon: <Icons.TextGrad />, component: PluginTextGradient, cat: 'Text' },
  { id: 'glass', title: 'Glassmorphism', icon: <Icons.Glass />, component: PluginGlassmorphism, cat: 'Effects' },
  { id: 'neumorphism', title: 'Neumorph', icon: <Icons.Neumorphism />, component: PluginNeumorphism, cat: 'Effects' },
  { id: 'shadow', title: 'Shadow', icon: <Icons.Shadow />, component: PluginShadow, cat: 'Effects' },
  { id: 'glow', title: 'Neon Glow', icon: <Icons.Glow />, component: PluginGlow, cat: 'Effects' },
  { id: 'filters', title: 'Image Filters', icon: <Icons.Filters />, component: PluginFilters, cat: 'Advanced' },
  { id: 'transform', title: '3D Move', icon: <Icons.Cube3D />, component: PluginTransform, cat: 'Advanced' },
  { id: 'animation', title: 'Animate', icon: <Icons.Animation />, component: PluginAnimation, cat: 'Advanced' }
];

// =========================================================================
// 6. MAIN PAGE COMPONENT (The App Shell)
// =========================================================================
export default function CssStudioPage() {
  const [activeId, setActiveId] = useState('text-gradient');

  return (
    <div className="h-screen w-full flex flex-col font-sans bg-[#111111] text-[#d4d4d4] overflow-hidden">
      
      {/* HEADER NAV */}
      <div className="h-14 px-4 sm:px-6 border-b border-[#333333] flex items-center justify-between bg-[#252526] z-50 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/toolkit" className="text-slate-400 hover:text-white transition-colors"><Icons.ArrowLeft /></Link>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight text-sm sm:text-base">CSS Visual <span className="text-cyan-500">Studio</span></span>
            <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-[8px] font-bold uppercase tracking-widest hidden sm:block">V10 Plugin Mode</span>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* KOLOM 1: TOOLBAR (Menampilkan Registry Plugin secara Dinamis) */}
        <div className="w-full lg:w-[60px] xl:w-[220px] bg-[#18181b] border-b lg:border-b-0 lg:border-r border-[#252526] shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto p-2 lg:p-3 [&::-webkit-scrollbar]:hidden z-40">
           {['Structure', 'Text', 'Effects', 'Advanced'].map(cat => (
              <div key={cat} className="flex flex-row lg:flex-col gap-1 shrink-0">
                 <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1 mt-3 px-2 hidden xl:block">{cat}</div>
                 {PLUGINS.filter(p => p.cat === cat).map(p => (
                    <button key={p.id} onClick={() => setActiveId(p.id)} className={`flex items-center gap-3 w-auto xl:w-full px-3 py-2.5 rounded-lg transition-all duration-200 xl:border-l-[3px] border-b-[3px] xl:border-b-0 shrink-0 ${activeId === p.id ? 'bg-[#2c2c2e] xl:border-cyan-500 border-b-cyan-500 text-white shadow-sm' : 'bg-transparent border-transparent text-slate-400 hover:bg-[#2c2c2e]/50 hover:text-slate-200'}`}>
                      <div className="shrink-0">{p.icon}</div>
                      <span className="text-[10px] font-semibold tracking-wide hidden xl:block whitespace-nowrap">{p.title}</span>
                    </button>
                 ))}
              </div>
           ))}
        </div>

        {/* KOLOM 2 & 3: PLUGIN CONTENT AREA */}
        <div className="flex-1 overflow-hidden bg-[#111111] p-4 lg:p-6">
           {/* Menampilkan Plugin Aktif secara Dinamis */}
           {PLUGINS.map(p => p.id === activeId && <p.component key={p.id} />)}
        </div>

      </div>

      {/* Global CSS for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        input[type="range"].custom-color-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; background: white; border: 2px solid #111113; border-radius: 50%; cursor: pointer; box-shadow: 0 0 5px rgba(0,0,0,0.5); }
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      `}} />
    </div>
  );
}
