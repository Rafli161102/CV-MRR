"use client";

import React, { useState, useEffect } from 'react';

// =========================================================================
// 1. IKON SVG PROFESIONAL
// =========================================================================
export const Icons = {
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
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
  if (h_str.length === 7) { 
    r = parseInt(h_str.slice(1, 3), 16) / 255; g = parseInt(h_str.slice(3, 5), 16) / 255; b = parseInt(h_str.slice(5, 7), 16) / 255; 
  }
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
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const hexToRgba = (hex, alpha) => `rgba(${hexToRgb(hex)}, ${alpha})`;
export const COLOR_PRESETS = ['#ffffff', '#1e1e1e', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

// =========================================================================
// 3. UI COMPONENTS
// =========================================================================

export const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => (
  <div className="flex items-center justify-between py-1.5 group">
    <label className="text-[10px] font-medium text-slate-400 w-1/3 group-hover:text-slate-200 transition-colors truncate pr-2">{label}</label>
    <div className="w-2/3 flex items-center gap-2">
      <input type="range" min={min} max={max} step={step} value={value || 0} onChange={(e) => onChange(Number(e.target.value) || 0)} className="w-full h-[2px] bg-[#444] rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-150 transition-all" />
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
           <button key={opt} onClick={() => onChange(opt)} className={`flex-1 py-1 rounded-sm text-[8px] sm:text-[9px] font-bold uppercase transition-all ${value === opt ? 'bg-[#3f3f46] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>{opt}</button>
        ))}
     </div>
  </div>
);

export const CodeOutput = ({ code, isMobileTab }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`w-full h-full bg-[#111111] relative flex flex-col overflow-hidden ${isMobileTab ? '' : 'border-t lg:border border-[#252526] lg:rounded-2xl shadow-xl'}`}>
       <button onClick={handleCopy} className="absolute top-3 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded bg-[#252526] border border-[#333333] text-slate-300 hover:bg-cyan-500 hover:text-[#111] transition-all text-[9px] font-bold uppercase tracking-wider shadow-md">
         {copied ? <><Icons.Check /> COPIED</> : <><Icons.Copy /> COPY CSS</>}
       </button>
       {!isMobileTab && (
         <div className="px-4 py-2.5 border-b border-[#252526] bg-[#18181b] shrink-0">
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">CSS Output Code</span>
         </div>
       )}
       <div className={`p-4 overflow-y-auto flex-grow bg-[#111111] custom-scroll ${isMobileTab ? 'pb-24' : ''}`}>
          <pre className="text-[11px] font-mono text-cyan-300/80 leading-relaxed whitespace-pre-wrap break-words"><code>{code}</code></pre>
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
       
       {/* MOBILE: CANVAS */}
       <div className="h-[30vh] sm:h-[35vh] lg:hidden relative flex items-center justify-center overflow-hidden border-b border-[#333] z-30 transition-colors duration-500 shadow-lg shrink-0" style={{backgroundColor: bgHex || '#0a0a0b'}}>
          {bgType === 'grid' && <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>}
          {bgType === 'image' && <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}></div>}
          {bgType === 'light' && <div className="absolute inset-0 bg-[#e5e7eb]"></div>}
          {bgType === 'dark' && <div className="absolute inset-0 bg-[#030712]"></div>}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4 overflow-hidden">{preview}</div>
       </div>

       {/* DESKTOP: MIDDLE COLUMN (CANVAS + CODE) */}
       <div className="hidden lg:flex flex-1 flex-col min-w-0 lg:border-r border-[#252526]">
         <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[#0a0a0b] border-b border-[#252526] z-10 transition-colors duration-500 shadow-inner" style={{backgroundColor: bgHex || 'transparent'}}>
            {bgType === 'grid' && <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>}
            {bgType === 'image' && <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}></div>}
            {bgType === 'light' && <div className="absolute inset-0 bg-[#e5e7eb]"></div>}
            {bgType === 'dark' && <div className="absolute inset-0 bg-[#030712]"></div>}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4 overflow-hidden">{preview}</div>
         </div>
         <div className="h-[220px] shrink-0 p-4 bg-[#111111]">
            <CodeOutput code={cssOutput} />
         </div>
       </div>

       {/* PROPERTIES PANEL */}
       <div className="flex-1 lg:w-[320px] lg:flex-none bg-[#18181b] flex flex-col z-20 overflow-hidden">
         <div className="px-4 py-3 border-b border-[#252526] bg-[#18181b] shrink-0">
            <h2 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest hidden lg:block">{name} Properties</h2>
            <div className="flex lg:hidden bg-[#111111] p-1 rounded-lg border border-[#333] w-full">
              <button onClick={() => setMobileTab('design')} className={`flex-1 py-1.5 rounded-md text-[9px] font-bold uppercase transition-all ${mobileTab === 'design' ? 'bg-[#333] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Design Properties</button>
              <button onClick={() => setMobileTab('code')} className={`flex-1 py-1.5 rounded-md text-[9px] font-bold uppercase transition-all ${mobileTab === 'code' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}>View CSS Code</button>
            </div>
         </div>
         <div className="flex-1 overflow-y-auto custom-scroll relative">
            <div className={`p-4 lg:block ${mobileTab === 'design' ? 'block' : 'hidden'}`}>
              {controls}
              <div className="h-32 lg:h-4"></div> 
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
// 5. PLUGIN COMPONENTS (SEMUA 11 PLUGIN ADA DI SINI)
// =========================================================================

export const PluginTextGradient = () => {
  const [color1, setColor1] = useState('#0ea5e9');
  const [color2, setColor2] = useState('#8b5cf6');
  const [angle, setAngle] = useState(45);

  const css = `background: linear-gradient(${angle}deg, ${color1}, ${color2});\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;`;
  const preview = <h1 style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3rem', fontWeight: 'bold', textAlign: 'center' }}>GRADIENT</h1>;
  const controls = (
    <>
      <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
      <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </>
  );
  return <WorkspaceLayout name="Text Gradient" controls={controls} preview={preview} cssOutput={css} />;
};

export const PluginTypography = () => {
  const [size, setSize] = useState(32);
  const [spacing, setSpacing] = useState(2);
  const [color, setColor] = useState('#ffffff');

  const css = `font-size: ${size}px;\nletter-spacing: ${spacing}px;\ncolor: ${color};\nfont-weight: 600;`;
  const preview = <div style={{ fontSize: `${size}px`, letterSpacing: `${spacing}px`, color: color, fontWeight: 600 }}>Typography</div>;
  const controls = (
    <>
      <FigmaColorPicker label="Text Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Font Size" min={12} max={100} value={size} onChange={setSize} unit="px" />
      <FigmaSlider label="Letter Spacing" min={0} max={20} value={spacing} onChange={setSpacing} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Typography" controls={controls} preview={preview} cssOutput={css} />;
};

export const PluginLayout = () => {
  const [padding, setPadding] = useState(24);
  const [radius, setRadius] = useState(16);

  const css = `padding: ${padding}px;\nborder-radius: ${radius}px;\nbackground-color: #252526;\ncolor: #ffffff;`;
  const preview = <div style={{ padding: `${padding}px`, borderRadius: `${radius}px`, backgroundColor: '#252526', color: '#fff', textAlign: 'center' }}>Box Layout Element</div>;
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
  const [color, setColor] = useState('#0ea5e9');

  const css = `border: ${width}px solid ${color};\nborder-radius: ${radius}px;\nbackground-color: transparent;`;
  const preview = <div style={{ width: 150, height: 100, border: `${width}px solid ${color}`, borderRadius: `${radius}px`, backgroundColor: 'transparent' }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Border Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Border Width" min={1} max={30} value={width} onChange={setWidth} unit="px" />
      <FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Border" controls={controls} preview={preview} cssOutput={css} />;
};

export const PluginGlassmorphism = () => {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(15);
  const [color, setColor] = useState('#ffffff');

  const rgb = hexToRgb(color);
  const css = `background: rgba(${rgb}, ${opacity / 100});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid rgba(${rgb}, 0.3);\nborder-radius: 16px;`;
  const preview = <div style={{ width: 180, height: 120, background: `rgba(${rgb}, ${opacity / 100})`, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, border: `1px solid rgba(${rgb}, 0.3)`, borderRadius: '16px' }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Glass Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Opacity" min={1} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="Blur Filter" min={0} max={50} value={blur} onChange={setBlur} unit="px" />
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
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(25);
  const [color, setColor] = useState('#000000');

  const css = `box-shadow: ${x}px ${y}px ${blur}px rgba(${hexToRgb(color)}, 0.5);\nborder-radius: 12px;\nbackground-color: #ffffff;`;
  const preview = <div style={{ width: 120, height: 120, backgroundColor: '#ffffff', borderRadius: 12, boxShadow: `${x}px ${y}px ${blur}px rgba(${hexToRgb(color)}, 0.5)` }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Shadow Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="X Offset" min={-50} max={50} value={x} onChange={setX} unit="px" />
      <FigmaSlider label="Y Offset" min={-50} max={50} value={y} onChange={setY} unit="px" />
      <FigmaSlider label="Blur Radius" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Drop Shadow" controls={controls} preview={preview} cssOutput={css} bgType="light" />;
};

export const PluginGlow = () => {
  const [color, setColor] = useState('#0ea5e9');
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(5);

  const css = `box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8);\nborder-radius: 50%;\nbackground-color: ${color};`;
  const preview = <div style={{ width: 80, height: 80, backgroundColor: color, borderRadius: '50%', boxShadow: `0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)` }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Glow Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Blur Radius" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Spread Radius" min={0} max={50} value={spread} onChange={setSpread} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} />;
};

// =========================================================================
// 5.1 FITUR BARU: LIGHTROOM PROFESSIONAL IMAGE FILTERS
// =========================================================================
export const PluginFilters = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [hue, setHue] = useState(0);
  const [blur, setBlur] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [invert, setInvert] = useState(0);

  const css = `/* Lightroom Style Image Filters */\nfilter: \n  brightness(${brightness}%)\n  contrast(${contrast}%)\n  saturate(${saturate}%)\n  hue-rotate(${hue}deg)\n  blur(${blur}px)\n  sepia(${sepia}%)\n  grayscale(${grayscale}%)\n  invert(${invert}%);`;
  
  const preview = (
    <div className="relative w-full h-full max-w-[320px] max-h-[240px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
       <img 
         src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600" 
         alt="Filter Demo" 
         className="w-full h-full object-cover transition-all duration-200"
         style={{ 
           filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg) blur(${blur}px) sepia(${sepia}%) grayscale(${grayscale}%) invert(${invert}%)`
         }} 
       />
       <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white/80 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
         Lightroom Output
       </div>
    </div>
  );

  const controls = (
    <div className="space-y-1">
      <div className="mb-3 pb-2 border-b border-[#333]">
        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between">
          <span>Light & Color</span>
          <button onClick={() => { setBrightness(100); setContrast(100); setSaturate(100); setHue(0); }} className="text-[8px] text-slate-500 hover:text-white bg-[#222] px-1.5 py-0.5 rounded transition-colors">RESET</button>
        </div>
      </div>
      <FigmaSlider label="Exposure" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
      <FigmaSlider label="Contrast" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
      <FigmaSlider label="Vibrance" min={0} max={200} value={saturate} onChange={setSaturate} unit="%" />
      <FigmaSlider label="Tint (Hue)" min={0} max={360} value={hue} onChange={setHue} unit="°" />
      
      <div className="mt-5 mb-3 pb-2 border-b border-[#333]">
        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between">
          <span>Effects & Details</span>
          <button onClick={() => { setBlur(0); setSepia(0); setGrayscale(0); setInvert(0); }} className="text-[8px] text-slate-500 hover:text-white bg-[#222] px-1.5 py-0.5 rounded transition-colors">RESET</button>
        </div>
      </div>
      <FigmaSlider label="Lens Blur" min={0} max={20} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Vintage (Sepia)" min={0} max={100} value={sepia} onChange={setSepia} unit="%" />
      <FigmaSlider label="B&W (Grayscale)" min={0} max={100} value={grayscale} onChange={setGrayscale} unit="%" />
      <FigmaSlider label="Negative (Invert)" min={0} max={100} value={invert} onChange={setInvert} unit="%" />
    </div>
  );

  return <WorkspaceLayout name="Pro Image Filters" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};

// =========================================================================
// 5.2 FITUR BARU: 3D TRANSFORM (DENGAN RESET BUTTON)
// =========================================================================
export const PluginTransform = () => {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);

  const css = `transform: \n  translate(${translateX}px, ${translateY}px) \n  rotate(${rotate}deg) \n  scale(${scale}) \n  skew(${skewX}deg, ${skewY}deg);`;
  
  const preview = (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 shadow-2xl flex flex-col items-center justify-center border border-white/20"
        style={{ 
          transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale}) skew(${skewX}deg, ${skewY}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Icons.Cube3D />
        <span className="text-[10px] font-bold mt-2 text-white">TRANSFORM</span>
      </div>
    </div>
  );

  const controls = (
    <>
      <FigmaSlider label="Translate X" min={-150} max={150} value={translateX} onChange={setTranslateX} unit="px" />
      <FigmaSlider label="Translate Y" min={-150} max={150} value={translateY} onChange={setTranslateY} unit="px" />
      <FigmaSlider label="Rotate" min={-360} max={360} value={rotate} onChange={setRotate} unit="°" />
      <FigmaSlider label="Scale" min={0.5} max={2.5} step={0.1} value={scale} onChange={setScale} unit="x" />
      <FigmaSlider label="Skew X" min={-90} max={90} value={skewX} onChange={setSkewX} unit="°" />
      <FigmaSlider label="Skew Y" min={-90} max={90} value={skewY} onChange={setSkewY} unit="°" />
      
      <button 
        onClick={() => { setTranslateX(0); setTranslateY(0); setRotate(0); setScale(1); setSkewX(0); setSkewY(0); }}
        className="w-full mt-4 py-2 bg-[#252526] hover:bg-[#333] border border-[#333] rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-colors"
      >
        Reset Transform
      </button>
    </>
  );

  return <WorkspaceLayout name="3D Transform" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};

// =========================================================================
// 5.3 FITUR BARU: KEYFRAME ANIMATION BUILDER
// =========================================================================
export const PluginAnimation = () => {
  const [animType, setAnimType] = useState('float'); 
  const [duration, setDuration] = useState(3);
  const [timing, setTiming] = useState('ease-in-out');
  const [iteration, setIteration] = useState('infinite');

  const getKeyframes = () => {
    switch(animType) {
      case 'float': return `@keyframes cssAnim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }`;
      case 'pulse': return `@keyframes cssAnim { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } }`;
      case 'spin': return `@keyframes cssAnim { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
      case 'wiggle': return `@keyframes cssAnim { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }`;
      default: return '';
    }
  };

  const css = `${getKeyframes()}\n\n.animate-element {\n  animation: cssAnim ${duration}s ${timing} ${iteration};\n}`;

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{getKeyframes()}</style>
      <div 
        className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-2xl flex items-center justify-center border border-white/20"
        style={{ animation: `cssAnim ${duration}s ${timing} ${iteration}` }}
      >
        <Icons.Animation />
      </div>
    </div>
  );

  const controls = (
    <>
      <FigmaSelect label="Anim Style" options={['float', 'pulse', 'spin', 'wiggle']} value={animType} onChange={setAnimType} />
      <FigmaSlider label="Duration" min={0.5} max={10} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Timing" options={['linear', 'ease', 'ease-in-out']} value={timing} onChange={setTiming} />
      <FigmaSelect label="Iteration" options={['1', '3', 'infinite']} value={iteration} onChange={setIteration} />
    </>
  );

  return <WorkspaceLayout name="Keyframe Animation" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};