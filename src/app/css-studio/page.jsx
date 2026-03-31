"use client";

import { useState } from 'react';
import Link from 'next/link';

// =========================================================================
// IKON SVG PROFESIONAL (DITAMBAH UNTUK EFEK BARU)
// =========================================================================
const Icons = {
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  
  // Ikon Untuk Widget App
  Glass: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18m6-18v18M3 9h18m-18 6h18" opacity="0.3"/></svg>,
  Neumorphism: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>,
  Shadow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" /></svg>,
  Animation: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  Glow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  TextGrad: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>
};

// Preset Warna Mewah untuk fitur
const COLOR_PRESETS = [
  { hex: '#ffffff', name: 'White' },
  { hex: '#000000', name: 'Black' },
  { hex: '#06b6d4', name: 'Cyan' },
  { hex: '#8b5cf6', name: 'Violet' },
  { hex: '#ec4899', name: 'Pink' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#10b981', name: 'Emerald' }
];

export default function CssStudioPage() {
  const [activeTab, setActiveTab] = useState('glass');
  const [copied, setCopied] = useState(false);

  // --- STATE: GLASSMORPHISM ---
  const [glassBlur, setGlassBlur] = useState(12);
  const [glassOpacity, setGlassOpacity] = useState(0.2);
  const [glassColor, setGlassColor] = useState('255, 255, 255');
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

  // --- STATE: NEON GLOW (BARU) ---
  const [glowColor, setGlowColor] = useState('#06b6d4');
  const [glowBlur, setGlowBlur] = useState(30);
  const [glowSpread, setGlowSpread] = useState(10);
  const [glowOpacity, setGlowOpacity] = useState(0.6);

  // --- STATE: TEXT GRADIENT (BARU) ---
  const [gradAngle, setGradAngle] = useState(135);
  const [gradColor1, setGradColor1] = useState('#06b6d4');
  const [gradColor2, setGradColor2] = useState('#8b5cf6');

  // --- STATE: ANIMATIONS ---
  const [animType, setAnimType] = useState('float');
  const [animDuration, setAnimDuration] = useState(3);

  // Helper Konversi HEX ke RGBA (Untuk Glow)
  const hexToRgba = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

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
        return `/* Glassmorphism CSS */
background: rgba(${glassColor}, ${glassOpacity.toFixed(2)});
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
        return `/* Beautiful Text Gradient */
background: linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
color: transparent;`;

      case 'animation':
        let animCode = '';
        if (animType === 'float') {
          animCode = `@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}\n.animate-element {\n  animation: float ${animDuration}s ease-in-out infinite;\n}`;
        } else if (animType === 'pulse') {
          animCode = `@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }
  50% { box-shadow: 0 0 20px 10px rgba(6, 182, 212, 0); }
}\n.animate-element {\n  animation: pulse-glow ${animDuration}s infinite;\n}`;
        } else if (animType === 'spin') {
          animCode = `@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}\n.animate-element {\n  animation: spin-slow ${animDuration}s linear infinite;\n}`;
        }
        return `/* CSS Keyframes Animation */\n${animCode}`;
      default:
        return '';
    }
  };

  const cssOutput = generateCSS();

  // =========================================================================
  // KOMPONEN UI UX MICRO-INTERACTIONS
  // =========================================================================

  // Widget App Icon (Menggantikan tab kaku sebelumnya)
  const AppWidget = ({ id, title, icon, colorClass }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`relative flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-3xl transition-all duration-300 group ${
          isActive 
            ? 'bg-[#0A1329] border border-cyan-500/50 shadow-[0_10px_30px_rgba(6,182,212,0.2)] -translate-y-1' 
            : 'bg-[#0A1329]/50 border border-white/5 hover:bg-[#0A1329] hover:border-white/20'
        }`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-inner ${
          isActive ? colorClass : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
        }`}>
          {icon()}
        </div>
        <span className={`text-[10px] sm:text-xs font-bold tracking-wide transition-colors ${
          isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
        }`}>{title}</span>
      </button>
    );
  };

  // Slider Fluid (Perbaikan UX: step dibuat sangat kecil agar mentega/smooth)
  const RangeSlider = ({ label, min, max, step = 0.1, value, onChange, unit = "" }) => (
    <div className="mb-5 group">
      <div className="flex justify-between items-center mb-2">
        <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</label>
        <span className="text-[10px] sm:text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md transition-all group-hover:bg-cyan-500/20">{value}{unit}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all"
      />
    </div>
  );

  // Komponen Pemilih Warna Kustom yang Estetik
  const ColorSelector = ({ label, selectedColor, onSelect }) => (
    <div className="mb-6">
      <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">{label}</label>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {COLOR_PRESETS.map((color) => (
          <button
            key={color.hex}
            onClick={() => onSelect(color.hex)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 ${selectedColor === color.hex ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-110' : 'border-transparent shadow-md'}`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-24 relative w-full overflow-x-hidden bg-[#030712]">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-cyan-900/20 rounded-full blur-[100px] lg:blur-[140px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-indigo-900/20 rounded-full blur-[100px] lg:blur-[140px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full">
        
        {/* NAVIGASI KEMBALI */}
        <div className="mb-10 sm:mb-12 reveal stagger-1">
          <Link href="/toolkit" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0A1329]/50 backdrop-blur-sm border border-white/5 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-[#0A1329] shadow-lg transition-all duration-300 group w-fit">
            <Icons.ArrowLeft />
            Kembali ke Toolkit
          </Link>
        </div>

        {/* HEADER DENGAN GRID WIDGET APP */}
        <div className="mb-16 reveal stagger-1">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-4 sm:mb-6 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shrink-0"></span>
            Visual Development Engine
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
            CSS Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Studio.</span>
          </h1>
          
          {/* GRID APP WIDGETS (Menggantikan Tabs Pill Button) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mt-8">
            <AppWidget id="glass" title="Glassmorphism" icon={Icons.Glass} colorClass="bg-gradient-to-br from-blue-400 to-cyan-500 text-white" />
            <AppWidget id="glow" title="Neon Glow" icon={Icons.Glow} colorClass="bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white" />
            <AppWidget id="text-gradient" title="Text Gradient" icon={Icons.TextGrad} colorClass="bg-gradient-to-br from-amber-400 to-orange-500 text-white" />
            <AppWidget id="neumorphism" title="Neumorphism" icon={Icons.Neumorphism} colorClass="bg-gradient-to-br from-slate-600 to-slate-800 text-white" />
            <AppWidget id="shadow" title="Smooth Shadow" icon={Icons.Shadow} colorClass="bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800" />
            <AppWidget id="animation" title="Animations" icon={Icons.Animation} colorClass="bg-gradient-to-br from-rose-400 to-red-600 text-white" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* WORKSPACE AREA (GOLDEN RATIO: 38.2% Controls, 61.8% View) */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start reveal stagger-3">
          
          {/* PANEL KONTROL (KIRI - 38.2%) */}
          <div className="w-full lg:w-[38.2%] bg-gradient-to-b from-[#0A1329] to-[#0A1329]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <div className="w-2 h-6 bg-cyan-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">Konfigurasi</h2>
            </div>

            {/* TAB: GLASSMORPHISM */}
            {activeTab === 'glass' && (
              <div className="space-y-4 animate-fade-in">
                <RangeSlider label="Blur Radius" min="0" max="40" step="0.5" value={glassBlur} onChange={setGlassBlur} unit="px" />
                <RangeSlider label="Opacity / Transparansi" min="0" max="1" step="0.01" value={glassOpacity} onChange={setGlassOpacity} />
                <RangeSlider label="Ketebalan Garis Kaca" min="0" max="0.5" step="0.01" value={glassOutline} onChange={setGlassOutline} />
                
                <div className="mb-5 mt-6">
                  <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Tipe Pantulan Kaca</label>
                  <div className="flex gap-3">
                    <button onClick={() => setGlassColor('255, 255, 255')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${glassColor === '255, 255, 255' ? 'bg-white/20 text-white border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/20'}`}>Kaca Terang (Light)</button>
                    <button onClick={() => setGlassColor('0, 0, 0')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${glassColor === '0, 0, 0' ? 'bg-black/50 text-white border-white/40 shadow-inner' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/20'}`}>Kaca Gelap (Dark)</button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: NEON GLOW */}
            {activeTab === 'glow' && (
              <div className="space-y-4 animate-fade-in">
                <ColorSelector label="Pilih Warna Pendar" selectedColor={glowColor} onSelect={setGlowColor} />
                <RangeSlider label="Penyebaran Cahaya (Blur)" min="0" max="100" step="1" value={glowBlur} onChange={setGlowBlur} unit="px" />
                <RangeSlider label="Jangkauan Glow (Spread)" min="-10" max="50" step="1" value={glowSpread} onChange={setGlowSpread} unit="px" />
                <RangeSlider label="Intensitas Cahaya" min="0.1" max="1" step="0.01" value={glowOpacity} onChange={setGlowOpacity} />
              </div>
            )}

            {/* TAB: TEXT GRADIENT */}
            {activeTab === 'text-gradient' && (
              <div className="space-y-4 animate-fade-in">
                <RangeSlider label="Sudut Kemiringan Gradien" min="0" max="360" step="1" value={gradAngle} onChange={setGradAngle} unit="°" />
                <div className="h-px bg-white/5 my-4"></div>
                <ColorSelector label="Warna Awal (Kiri/Atas)" selectedColor={gradColor1} onSelect={setGradColor1} />
                <div className="h-px bg-white/5 my-4"></div>
                <ColorSelector label="Warna Akhir (Kanan/Bawah)" selectedColor={gradColor2} onSelect={setGradColor2} />
              </div>
            )}

            {/* TAB: NEUMORPHISM */}
            {activeTab === 'neumorphism' && (
              <div className="space-y-4 animate-fade-in">
                <div className="mb-6 p-4 bg-cyan-900/20 border border-cyan-500/20 rounded-xl text-[10px] sm:text-xs text-cyan-300 leading-relaxed font-medium">
                  <span className="font-bold">Pro Tip:</span> Neumorphism (Soft UI) terlihat sangat estetis di tema Dark Mode saat komponen dan latar belakang memiliki warna yang sama identik.
                </div>
                <RangeSlider label="Jarak Bayangan (Distance)" min="2" max="30" step="0.5" value={neuDistance} onChange={setNeoDistance} unit="px" />
                <RangeSlider label="Kehalusan (Blur)" min="0" max="60" step="0.5" value={neuBlur} onChange={setNeoBlur} unit="px" />
                <RangeSlider label="Kedalaman Timbul (Intensity)" min="0.05" max="0.5" step="0.01" value={neuIntensity} onChange={setNeoIntensity} />
                
                <div className="mb-5 mt-6">
                  <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Tipe Permukaan (Shape)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['flat', 'concave', 'convex'].map(shape => (
                      <button key={shape} onClick={() => setNeoShape(shape)} className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${neuShape === shape ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/20'}`}>{shape}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SHADOW */}
            {activeTab === 'shadow' && (
              <div className="space-y-4 animate-fade-in">
                <RangeSlider label="Jumlah Lapisan (Layers)" min="1" max="6" step="1" value={shadowLayers} onChange={setShadowLayers} />
                <RangeSlider label="Arah Jatuh (Y Offset)" min="-50" max="50" step="0.5" value={shadowY} onChange={setShadowY} unit="px" />
                <RangeSlider label="Sebaran Halus (Blur)" min="0" max="100" step="0.5" value={shadowBlur} onChange={setShadowBlur} unit="px" />
                <RangeSlider label="Ukuran Bayangan (Spread)" min="-20" max="20" step="0.5" value={shadowSpread} onChange={setShadowSpread} unit="px" />
                <RangeSlider label="Transparansi Dasar" min="0.05" max="0.8" step="0.01" value={shadowOpacity} onChange={setShadowOpacity} />
              </div>
            )}

            {/* TAB: ANIMATION */}
            {activeTab === 'animation' && (
              <div className="space-y-4 animate-fade-in">
                <div className="mb-8">
                  <label className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Library Animasi CSS</label>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'float', name: 'Floating (Mengambang Halus)' },
                      { id: 'pulse', name: 'Pulse Glow (Napas Bercahaya)' },
                      { id: 'spin', name: 'Spin Rotation (Putaran 360°)' }
                    ].map(anim => (
                      <button key={anim.id} onClick={() => setAnimType(anim.id)} className={`px-5 py-4 rounded-2xl text-xs sm:text-sm font-bold text-left transition-all border ${animType === anim.id ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-transparent text-slate-300 border-white/10 hover:bg-white/5 hover:border-white/20'}`}>
                        {anim.name}
                      </button>
                    ))}
                  </div>
                </div>
                <RangeSlider label="Kecepatan / Durasi (Detik)" min="0.5" max="10" step="0.1" value={animDuration} onChange={setAnimDuration} unit="s" />
              </div>
            )}

          </div>

          {/* ========================================================= */}
          {/* STAGE & KODE (KANAN - 61.8%)                              */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[61.8%] flex flex-col gap-6">
            
            {/* STAGE: LIVE PREVIEW AREA */}
            <div className="w-full h-[350px] sm:h-[450px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative border border-white/10 shadow-2xl flex items-center justify-center p-8 bg-[#050A14]">
              
              {/* Background Panggung Eksklusif (Berubah Sesuai Tab) */}
              {activeTab === 'glass' && (
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-opacity duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')" }}></div>
              )}
              {activeTab === 'neumorphism' && (
                <div className="absolute inset-0 bg-[#0A1329] z-0 transition-opacity duration-500"></div>
              )}
              {activeTab === 'shadow' && (
                <div className="absolute inset-0 bg-slate-100 z-0 transition-opacity duration-500">
                  {/* Grid background on light theme for scale */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                </div>
              )}
              {activeTab === 'glow' && (
                <div className="absolute inset-0 bg-[#030712] z-0 transition-opacity duration-500 flex items-center justify-center">
                  {/* Dekorasi Grid Gelap */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
                </div>
              )}
              {activeTab === 'text-gradient' && (
                <div className="absolute inset-0 bg-[#030712] z-0 transition-opacity duration-500"></div>
              )}
              {activeTab === 'animation' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050A14] to-[#0A1329] z-0 flex items-center justify-center"></div>
              )}

              {/* OBJEK YANG DIRENDER (THE ELEMENT) */}
              {activeTab !== 'text-gradient' ? (
                // Objek Kotak (Card) untuk selain Text Gradient
                <div className="relative z-10 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] flex items-center justify-center text-center p-6 transition-all duration-75"
                  style={{
                    ...(activeTab === 'glass' ? {
                      background: `rgba(${glassColor}, ${glassOpacity})`,
                      backdropFilter: `blur(${glassBlur}px)`,
                      WebkitBackdropFilter: `blur(${glassBlur}px)`,
                      border: `1px solid rgba(255, 255, 255, ${glassOutline})`,
                      borderRadius: '24px',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                    } : {}),
                    ...(activeTab === 'neumorphism' ? {
                      background: neuShape === 'convex' ? 'linear-gradient(145deg, #0b152c, #091125)' : neuShape === 'concave' ? 'linear-gradient(145deg, #091125, #0b152c)' : '#0A1329',
                      borderRadius: '24px',
                      boxShadow: `${neuShape === 'concave' ? 'inset ' : ''}${neuDistance}px ${neuDistance}px ${neuBlur}px rgba(0, 0, 0, ${neuIntensity + 0.3}), ${neuShape === 'concave' ? 'inset ' : ''}-${neuDistance}px -${neuDistance}px ${neuBlur}px rgba(255, 255, 255, ${neuIntensity / 2})`
                    } : {}),
                    ...(activeTab === 'shadow' ? {
                      background: '#ffffff',
                      borderRadius: '24px',
                      boxShadow: Array.from({length: shadowLayers}, (_, i) => {
                        const y = (shadowY / shadowLayers) * (i + 1);
                        const b = (shadowBlur / shadowLayers) * (i + 1);
                        const s = (shadowSpread / shadowLayers) * (i + 1);
                        let o = shadowOpacity - ((i + 1) * 0.05);
                        return `0 ${y}px ${b}px ${s}px rgba(0, 0, 0, ${Math.max(o, 0.02)})`;
                      }).join(', ')
                    } : {}),
                    ...(activeTab === 'glow' ? {
                      background: '#0A1329',
                      border: `1px solid ${hexToRgba(glowColor, 0.5)}`,
                      borderRadius: '24px',
                      boxShadow: `0 0 ${glowBlur}px ${glowSpread}px ${hexToRgba(glowColor, glowOpacity)}, inset 0 0 15px ${hexToRgba(glowColor, glowOpacity * 0.5)}`
                    } : {}),
                    ...(activeTab === 'animation' ? {
                      background: 'linear-gradient(135deg, #0A1329, #0d1a38)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '30px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      animation: animType === 'float' ? `float ${animDuration}s ease-in-out infinite` : 
                                 animType === 'pulse' ? `pulse-glow ${animDuration}s infinite` : 
                                 `spin-slow ${animDuration}s linear infinite`
                    } : {})
                  }}
                >
                  <div className="space-y-3">
                    <div className={`w-14 h-14 mx-auto rounded-2xl ${activeTab === 'shadow' ? 'bg-cyan-500 shadow-lg shadow-cyan-500/30' : 'bg-cyan-500/20 border border-cyan-500/30'} flex items-center justify-center`}>
                      <span className={`${activeTab === 'shadow' ? 'text-white' : 'text-cyan-400'}`}><Icons.Glass /></span>
                    </div>
                    <h3 className={`font-bold tracking-widest uppercase text-xs sm:text-sm ${activeTab === 'shadow' ? 'text-slate-800' : 'text-white'}`}>Live Preview</h3>
                  </div>
                </div>
              ) : (
                // Objek Khusus Text Gradient
                <div className="relative z-10 text-center w-full px-6">
                  <h2 
                    className="text-5xl sm:text-7xl font-black tracking-tighter"
                    style={{
                      background: `linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    Gradient<br/>Typography.
                  </h2>
                </div>
              )}

              {/* SUNTIKAN CSS KHUSUS ANIMASI PREVIEW */}
              {activeTab === 'animation' && (
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }
                    50% { box-shadow: 0 0 40px 20px rgba(6, 182, 212, 0); }
                  }
                  @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                `}} />
              )}
            </div>

            {/* KODE CSS RESULT (Editor Code Style) */}
            <div className="w-full bg-[#0A1329] rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative group">
              
              {/* Header Editor */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-8 py-5 bg-[#050A14] border-b border-white/5 gap-4 sm:gap-0">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-widest uppercase">Output CSS</span>
                </div>
                
                <button 
                  onClick={() => handleCopy(cssOutput)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-[#030712] hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all text-[11px] sm:text-xs font-black uppercase tracking-wider"
                >
                  {copied ? <><Icons.Check /> Tersalin</> : <><Icons.Copy /> Salin Kode</>}
                </button>
              </div>
              
              {/* Code Area */}
              <div className="p-6 sm:p-8 overflow-x-auto">
                <pre className="text-xs sm:text-sm font-mono text-cyan-100 leading-loose">
                  <code>{cssOutput}</code>
                </pre>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Tambahan CSS Global untuk halaman ini (Fade-in animasi kecil) */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}