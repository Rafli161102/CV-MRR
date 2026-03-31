"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// =========================================================================
// IKON SVG PROFESIONAL (Figma-like Minimalist)
// =========================================================================
const Icons = {
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  
  // App Icons
  Glass: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18m6-18v18M3 9h18m-18 6h18" opacity="0.3"/></svg>,
  Neumorphism: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>,
  Shadow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" /></svg>,
  Animation: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  Glow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  TextGrad: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
  Filter: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
  Cube3D: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
};

// Helper: Hex ke RGB
const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
};

const hexToRgba = (hex, alpha) => {
  return `rgba(${hexToRgb(hex)}, ${alpha})`;
};

export default function CssStudioPage() {
  const [activeTab, setActiveTab] = useState('glass');
  const [copied, setCopied] = useState(false);

  // --- STATE: GLASSMORPHISM ---
  const [glassBlur, setGlassBlur] = useState(12);
  const [glassOpacity, setGlassOpacity] = useState(0.2);
  const [glassColorHex, setGlassColorHex] = useState('#ffffff');
  const [glassOutline, setGlassOutline] = useState(0.1);

  // --- STATE: NEUMORPHISM ---
  const [neuDistance, setNeoDistance] = useState(8);
  const [neuBlur, setNeoBlur] = useState(16);
  const [neuIntensity, setNeoIntensity] = useState(0.15);
  const [neuShape, setNeoShape] = useState('flat');

  // --- STATE: SMOOTH SHADOW ---
  const [shadowLayers, setShadowLayers] = useState(4);
  const [shadowY, setShadowY] = useState(12);
  const [shadowBlur, setShadowBlur] = useState(24);
  const [shadowSpread, setShadowSpread] = useState(-4);
  const [shadowOpacity, setShadowOpacity] = useState(0.25);

  // --- STATE: NEON GLOW ---
  const [glowColor, setGlowColor] = useState('#06b6d4');
  const [glowBlur, setGlowBlur] = useState(30);
  const [glowSpread, setGlowSpread] = useState(10);
  const [glowOpacity, setGlowOpacity] = useState(0.6);

  // --- STATE: TEXT GRADIENT ---
  const [gradAngle, setGradAngle] = useState(135);
  const [gradColor1, setGradColor1] = useState('#06b6d4');
  const [gradColor2, setGradColor2] = useState('#8b5cf6');

  // --- STATE: CSS FILTERS (BARU) ---
  const [filterBlur, setFilterBlur] = useState(0);
  const [filterBrightness, setFilterBrightness] = useState(100);
  const [filterContrast, setFilterContrast] = useState(100);
  const [filterGrayscale, setFilterGrayscale] = useState(0);
  const [filterSepia, setFilterSepia] = useState(0);

  // --- STATE: 3D TRANSFORM (BARU) ---
  const [transRotX, setTransRotX] = useState(20);
  const [transRotY, setTransRotY] = useState(30);
  const [transScale, setTransScale] = useState(1);
  const [transPerspective, setTransPerspective] = useState(1000);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // LOGIKA GENERATOR KODE CSS
  // =========================================================================
  const generateCSS = () => {
    switch (activeTab) {
      case 'glass':
        return `/* Glassmorphism */
background: rgba(${hexToRgb(glassColorHex)}, ${glassOpacity.toFixed(2)});
backdrop-filter: blur(${glassBlur}px);
-webkit-backdrop-filter: blur(${glassBlur}px);
border: 1px solid rgba(255, 255, 255, ${glassOutline.toFixed(2)});
border-radius: 24px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);`;

      case 'neumorphism':
        let bg = '#0A1329';
        let inset = neuShape === 'flat' ? '' : 'inset';
        let lightShadow = `${inset ? 'inset ' : ''}-${neuDistance}px -${neuDistance}px ${neuBlur}px rgba(255, 255, 255, ${(neuIntensity / 2).toFixed(2)})`;
        let darkShadow = `${inset ? 'inset ' : ''}${neuDistance}px ${neuDistance}px ${neuBlur}px rgba(0, 0, 0, ${(neuIntensity + 0.3).toFixed(2)})`;
        let shapeGradient = '';
        if (neuShape === 'convex') shapeGradient = `background: linear-gradient(145deg, #0b152c, #091125);`;
        if (neuShape === 'concave') shapeGradient = `background: linear-gradient(145deg, #091125, #0b152c);`;

        return `/* Dark Neumorphism */
${shapeGradient || `background: ${bg};`}
border-radius: 24px;
box-shadow: ${darkShadow},
            ${lightShadow};`;

      case 'shadow':
        let shadows = [];
        for (let i = 1; i <= shadowLayers; i++) {
          let y = (shadowY / shadowLayers) * i;
          let b = (shadowBlur / shadowLayers) * i;
          let s = (shadowSpread / shadowLayers) * i;
          let o = shadowOpacity - (i * 0.05);
          if (o < 0.02) o = 0.02;
          shadows.push(`0 ${y.toFixed(1)}px ${b.toFixed(1)}px ${s.toFixed(1)}px rgba(0, 0, 0, ${o.toFixed(2)})`);
        }
        return `/* Smooth Layered Shadow */
background: #ffffff;
border-radius: 24px;
box-shadow: 
  ${shadows.join(',\n  ')};`;

      case 'glow':
        return `/* Neon Glow Effect */
background: #0A1329;
border: 1px solid ${hexToRgba(glowColor, 0.5)};
border-radius: 24px;
box-shadow: 0 0 ${glowBlur}px ${glowSpread}px ${hexToRgba(glowColor, glowOpacity)},
            inset 0 0 15px ${hexToRgba(glowColor, glowOpacity * 0.5)};`;

      case 'text-gradient':
        return `/* Text Gradient */
background: linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
color: transparent;`;

      case 'filters':
        return `/* CSS Image Filters */
filter: blur(${filterBlur}px) 
        brightness(${filterBrightness}%) 
        contrast(${filterContrast}%) 
        grayscale(${filterGrayscale}%) 
        sepia(${filterSepia}%);
border-radius: 16px;`;

      case 'transform':
        return `/* 3D Transform */
transform: perspective(${transPerspective}px) 
           rotateX(${transRotX}deg) 
           rotateY(${transRotY}deg) 
           scale(${transScale});
border-radius: 24px;
box-shadow: 0 20px 40px rgba(0,0,0,0.3);
transition: transform 0.3s ease;`;

      default:
        return '';
    }
  };

  const cssOutput = generateCSS();

  // =========================================================================
  // KOMPONEN UI UX MICRO-INTERACTIONS (FIGMA STYLE)
  // =========================================================================

  // 1. Tool Button (Sleek Sidebar Style)
  const ToolButton = ({ id, title, icon }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-xl transition-all duration-200 border ${
          isActive 
            ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' 
            : 'bg-[#18181b] border-transparent text-slate-400 hover:bg-[#27272a] hover:text-slate-200'
        }`}
      >
        <div className="shrink-0">{icon()}</div>
        <span className="text-[9px] sm:text-[10px] font-semibold text-center leading-tight">{title}</span>
      </button>
    );
  };

  // 2. Native Color Wheel Picker (Bisa pilih jutaan warna real-time)
  const NativeColorPicker = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between mb-4 bg-[#18181b] p-2 rounded-lg border border-white/5">
      <span className="text-[10px] sm:text-xs font-semibold text-slate-400 pl-2">{label}</span>
      <div className="flex items-center gap-2 bg-[#0f0f11] px-2 py-1 rounded border border-white/5">
        <span className="text-[10px] font-mono text-slate-300 uppercase">{value}</span>
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-6 p-0 border-0 rounded cursor-pointer outline-none bg-transparent"
        />
      </div>
    </div>
  );

  // 3. Figma-style Slider (Garis tipis, Input angka monospace)
  const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-[10px] sm:text-xs font-semibold text-slate-400">{label}</label>
        {/* Box Angka ala Figma */}
        <div className="bg-[#0f0f11] px-2 py-1 rounded border border-white/5 min-w-[50px] text-right">
          <span className="text-[10px] sm:text-xs font-mono text-cyan-400">{value}{unit}</span>
        </div>
      </div>
      {/* Track Custom Super Tipis & Halus */}
      <input 
        type="range" min={min} max={max} step={step} value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-[2px] bg-slate-700 rounded-lg appearance-none cursor-pointer outline-none 
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                   [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md 
                   focus:[&::-webkit-slider-thumb]:ring-2 focus:[&::-webkit-slider-thumb]:ring-cyan-500/50 transition-all"
      />
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-24 relative w-full overflow-x-hidden bg-[#0a0a0b] text-slate-200">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* HEADER MINI (Editor Style) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/toolkit" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Icons.ArrowLeft />
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                CSS Visual <span className="text-cyan-400">Studio</span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 ml-11">Real-time code generator by MRR Ecosystem</p>
          </div>
          
          <button 
            onClick={() => handleCopy(cssOutput)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-[#030712] hover:bg-cyan-400 transition-all text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] ml-11 sm:ml-0"
          >
            {copied ? <><Icons.Check /> Copied</> : <><Icons.Copy /> Copy CSS</>}
          </button>
        </div>

        {/* ========================================================= */}
        {/* WORKSPACE (Grid Layout: 1 Tools, 2 Properties, 3 Canvas)  */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-6 items-start h-full">
          
          {/* KOLOM 1: TOOLBAR (Kiri Kiri - Mobile: Scroll Horizontal) */}
          <div className="w-full lg:w-24 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden">
            <ToolButton id="glass" title="Glass" icon={Icons.Glass} />
            <ToolButton id="glow" title="Neon Glow" icon={Icons.Glow} />
            <ToolButton id="neumorphism" title="Neumorph" icon={Icons.Neumorphism} />
            <ToolButton id="shadow" title="Shadow" icon={Icons.Shadow} />
            <ToolButton id="text-gradient" title="Gradient" icon={Icons.TextGrad} />
            <ToolButton id="filters" title="Filters" icon={Icons.Filter} />
            <ToolButton id="transform" title="3D Transform" icon={Icons.Cube3D} />
          </div>

          {/* KOLOM 2: PROPERTIES PANEL (Figma Style Sidebar) */}
          <div className="w-full lg:w-[300px] xl:w-[350px] shrink-0 bg-[#111113] border border-white/5 rounded-2xl p-5 shadow-2xl flex flex-col gap-6">
            
            <div className="border-b border-white/5 pb-3">
              <h2 className="text-xs font-bold text-white uppercase tracking-widest">{activeTab} Properties</h2>
            </div>

            {/* TAB: GLASSMORPHISM */}
            {activeTab === 'glass' && (
              <div className="animate-fade-in space-y-2">
                <NativeColorPicker label="Glass Color" value={glassColorHex} onChange={setGlassColorHex} />
                <FigmaSlider label="Blur Level" min="0" max="40" step="0.5" value={glassBlur} onChange={setGlassBlur} unit="px" />
                <FigmaSlider label="Opacity" min="0" max="1" step="0.01" value={glassOpacity} onChange={setGlassOpacity} />
                <FigmaSlider label="Border Outline" min="0" max="1" step="0.01" value={glassOutline} onChange={setGlassOutline} />
              </div>
            )}

            {/* TAB: NEON GLOW */}
            {activeTab === 'glow' && (
              <div className="animate-fade-in space-y-2">
                <NativeColorPicker label="Glow Color" value={glowColor} onChange={setGlowColor} />
                <FigmaSlider label="Blur Radius" min="0" max="100" step="1" value={glowBlur} onChange={setGlowBlur} unit="px" />
                <FigmaSlider label="Spread Radius" min="-20" max="50" step="1" value={glowSpread} onChange={setGlowSpread} unit="px" />
                <FigmaSlider label="Intensity" min="0.1" max="1" step="0.01" value={glowOpacity} onChange={setGlowOpacity} />
              </div>
            )}

            {/* TAB: TEXT GRADIENT */}
            {activeTab === 'text-gradient' && (
              <div className="animate-fade-in space-y-2">
                <FigmaSlider label="Angle" min="0" max="360" step="1" value={gradAngle} onChange={setGradAngle} unit="°" />
                <div className="h-px bg-white/5 my-4"></div>
                <NativeColorPicker label="Color 1" value={gradColor1} onChange={setGradColor1} />
                <NativeColorPicker label="Color 2" value={gradColor2} onChange={setGradColor2} />
              </div>
            )}

            {/* TAB: NEUMORPHISM */}
            {activeTab === 'neumorphism' && (
              <div className="animate-fade-in space-y-2">
                <FigmaSlider label="Distance" min="2" max="30" step="0.5" value={neuDistance} onChange={setNeoDistance} unit="px" />
                <FigmaSlider label="Blur" min="0" max="60" step="0.5" value={neuBlur} onChange={setNeoBlur} unit="px" />
                <FigmaSlider label="Intensity" min="0.05" max="0.5" step="0.01" value={neuIntensity} onChange={setNeoIntensity} />
                <div className="mb-4">
                  <label className="text-[10px] font-semibold text-slate-400 block mb-2">Shape</label>
                  <div className="flex bg-[#0f0f11] p-1 rounded-lg border border-white/5">
                    {['flat', 'concave', 'convex'].map(shape => (
                      <button key={shape} onClick={() => setNeoShape(shape)} className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${neuShape === shape ? 'bg-cyan-500 text-[#030712] shadow-sm' : 'text-slate-400 hover:text-white'}`}>{shape}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SHADOW */}
            {activeTab === 'shadow' && (
              <div className="animate-fade-in space-y-2">
                <FigmaSlider label="Layers" min="1" max="6" step="1" value={shadowLayers} onChange={setShadowLayers} />
                <FigmaSlider label="Y Offset" min="-50" max="50" step="0.5" value={shadowY} onChange={setShadowY} unit="px" />
                <FigmaSlider label="Blur" min="0" max="100" step="0.5" value={shadowBlur} onChange={setShadowBlur} unit="px" />
                <FigmaSlider label="Spread" min="-20" max="20" step="0.5" value={shadowSpread} onChange={setShadowSpread} unit="px" />
                <FigmaSlider label="Opacity" min="0.05" max="0.8" step="0.01" value={shadowOpacity} onChange={setShadowOpacity} />
              </div>
            )}

            {/* TAB: FILTERS */}
            {activeTab === 'filters' && (
              <div className="animate-fade-in space-y-2">
                <div className="text-[10px] text-cyan-400/80 mb-4 bg-cyan-900/20 p-2 rounded border border-cyan-500/20 leading-relaxed">Filter bekerja langsung pada elemen gambar (Image).</div>
                <FigmaSlider label="Blur" min="0" max="20" step="0.1" value={filterBlur} onChange={setFilterBlur} unit="px" />
                <FigmaSlider label="Brightness" min="0" max="200" step="1" value={filterBrightness} onChange={setFilterBrightness} unit="%" />
                <FigmaSlider label="Contrast" min="0" max="200" step="1" value={filterContrast} onChange={setFilterContrast} unit="%" />
                <FigmaSlider label="Grayscale" min="0" max="100" step="1" value={filterGrayscale} onChange={setFilterGrayscale} unit="%" />
                <FigmaSlider label="Sepia" min="0" max="100" step="1" value={filterSepia} onChange={setFilterSepia} unit="%" />
              </div>
            )}

            {/* TAB: TRANSFORM 3D */}
            {activeTab === 'transform' && (
              <div className="animate-fade-in space-y-2">
                <FigmaSlider label="Rotate X" min="-180" max="180" step="1" value={transRotX} onChange={setTransRotX} unit="°" />
                <FigmaSlider label="Rotate Y" min="-180" max="180" step="1" value={transRotY} onChange={setTransRotY} unit="°" />
                <FigmaSlider label="Scale" min="0.5" max="1.5" step="0.01" value={transScale} onChange={setTransScale} />
                <FigmaSlider label="Perspective" min="200" max="2000" step="10" value={transPerspective} onChange={setTransPerspective} unit="px" />
              </div>
            )}
          </div>

          {/* KOLOM 3: CANVAS & CODE (Kanan/Tengah - Fleksibel) */}
          <div className="w-full flex-grow flex flex-col gap-6">
            
            {/* CANVAS AREA (Dot Grid Background) */}
            <div className="w-full h-[350px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden relative border border-white/5 bg-[#0a0a0b] flex items-center justify-center shadow-inner">
              
              {/* Dot Grid Layer (Ciri khas Canvas Design Tool) */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              
              {/* Custom Canvas Backgrounds */}
              {activeTab === 'glass' && (
                <div className="absolute inset-0 bg-cover bg-center z-0 opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')" }}></div>
              )}
              {activeTab === 'shadow' && (
                <div className="absolute inset-0 bg-slate-200 z-0"></div>
              )}

              {/* OBJEK THE ELEMENT (Kotak Preview) */}
              {activeTab === 'text-gradient' ? (
                <div className="relative z-10 text-center w-full px-6">
                  <h2 className="text-5xl sm:text-7xl font-black tracking-tighter" style={{ background: `linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
                    CSS<br/>Studio.
                  </h2>
                </div>
              ) : activeTab === 'filters' ? (
                <div className="relative z-10 w-[250px] sm:w-[350px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-75">
                  <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop" alt="Filter Preview" className="w-full h-full object-cover transition-all duration-75"
                    style={{ filter: `blur(${filterBlur}px) brightness(${filterBrightness}%) contrast(${filterContrast}%) grayscale(${filterGrayscale}%) sepia(${filterSepia}%)` }}
                  />
                </div>
              ) : (
                <div className="relative z-10 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] flex items-center justify-center text-center p-6 transition-all duration-75"
                  style={{
                    ...(activeTab === 'glass' ? { background: `rgba(${hexToRgb(glassColorHex)}, ${glassOpacity})`, backdropFilter: `blur(${glassBlur}px)`, WebkitBackdropFilter: `blur(${glassBlur}px)`, border: `1px solid rgba(255, 255, 255, ${glassOutline})`, borderRadius: '24px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' } : {}),
                    ...(activeTab === 'neumorphism' ? { background: neuShape === 'convex' ? 'linear-gradient(145deg, #0b152c, #091125)' : neuShape === 'concave' ? 'linear-gradient(145deg, #091125, #0b152c)' : '#0A1329', borderRadius: '24px', boxShadow: `${neuShape === 'concave' ? 'inset ' : ''}${neuDistance}px ${neuDistance}px ${neuBlur}px rgba(0, 0, 0, ${neuIntensity + 0.3}), ${neuShape === 'concave' ? 'inset ' : ''}-${neuDistance}px -${neuDistance}px ${neuBlur}px rgba(255, 255, 255, ${neuIntensity / 2})` } : {}),
                    ...(activeTab === 'shadow' ? { background: '#ffffff', borderRadius: '24px', boxShadow: Array.from({length: shadowLayers}, (_, i) => { const y = (shadowY / shadowLayers) * (i + 1); const b = (shadowBlur / shadowLayers) * (i + 1); const s = (shadowSpread / shadowLayers) * (i + 1); let o = shadowOpacity - ((i + 1) * 0.05); return `0 ${y}px ${b}px ${s}px rgba(0, 0, 0, ${Math.max(o, 0.02)})`; }).join(', ') } : {}),
                    ...(activeTab === 'glow' ? { background: '#0A1329', border: `1px solid ${hexToRgba(glowColor, 0.5)}`, borderRadius: '24px', boxShadow: `0 0 ${glowBlur}px ${glowSpread}px ${hexToRgba(glowColor, glowOpacity)}, inset 0 0 15px ${hexToRgba(glowColor, glowOpacity * 0.5)}` } : {}),
                    ...(activeTab === 'transform' ? { background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', transform: `perspective(${transPerspective}px) rotateX(${transRotX}deg) rotateY(${transRotY}deg) scale(${transScale})` } : {})
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTab === 'shadow' ? 'bg-cyan-500' : 'bg-white/20'}`}>
                    <span className={`${activeTab === 'shadow' ? 'text-white' : 'text-white'}`}><Icons.Glass /></span>
                  </div>
                </div>
              )}
            </div>

            {/* CSS CODE OUTPUT PANEL (Bottom) */}
            <div className="w-full bg-[#111113] rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative">
              <div className="flex items-center px-5 py-3 bg-[#0a0a0b] border-b border-white/5">
                <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">CSS Code Output</span>
              </div>
              <div className="p-5 overflow-x-auto">
                <pre className="text-xs font-mono text-cyan-100/90 leading-loose">
                  <code>{cssOutput}</code>
                </pre>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Global CSS for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}