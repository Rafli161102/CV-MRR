"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// =========================================================================
// IKON SVG PROFESIONAL (Figma & VS Code Style)
// =========================================================================
const Icons = {
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  
  // App Toolbar Icons
  Layout: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.5-6h15m-15-6h15m-3-4.5H5.25C4.007 3 3 4.007 3 5.25v13.5c0 1.243 1.007 2.25 2.25 2.25h13.5c1.243 0 2.25-2.25V5.25c0-1.243-1.007-2.25-2.25-2.25z" /></svg>,
  Typography: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" /></svg>,
  Glass: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18m6-18v18M3 9h18m-18 6h18" opacity="0.3"/></svg>,
  Glow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  Shadow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" /></svg>,
  Neumorphism: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>,
  Filters: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
  Cube3D: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  Animation: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
};

// =========================================================================
// COLOR ENGINE (Hex & HSL Conversions)
// =========================================================================
const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
};

const hexToHsl = (hex) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 7) { r = parseInt(hex.slice(1, 3), 16) / 255; g = parseInt(hex.slice(3, 5), 16) / 255; b = parseInt(hex.slice(5, 7), 16) / 255; }
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
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
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
const COLOR_PRESETS = ['#ffffff', '#030712', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function CssStudioPage() {
  const [activeTab, setActiveTab] = useState('layout');
  const [copied, setCopied] = useState(false);

  // --- STAGE & ELEMENT SETTINGS ---
  const [previewShape, setPreviewShape] = useState('box'); // box, circle, pill, text
  const [previewText, setPreviewText] = useState('CSS Studio.');

  // --- STATE: LAYOUT & SHAPE ---
  const [layWidth, setLayWidth] = useState(250);
  const [layHeight, setLayHeight] = useState(150);
  const [layPad, setLayPad] = useState(24);
  const [borRadius, setBorRadius] = useState(24);
  const [borWidth, setBorWidth] = useState(1);
  const [borColor, setBorColor] = useState('#ffffff');
  const [layBg, setLayBg] = useState('#0ea5e9');

  // --- STATE: TYPOGRAPHY ---
  const [typoSize, setTypoSize] = useState(48);
  const [typoWeight, setTypoWeight] = useState(800);
  const [typoLetter, setTypoLetter] = useState(-1);
  const [typoColor, setTypoColor] = useState('#ffffff');
  const [typoAlign, setTypoAlign] = useState('center');
  const [gradTextEnabled, setGradTextEnabled] = useState(false);
  const [gradAngle, setGradAngle] = useState(135);
  const [gradColor1, setGradColor1] = useState('#0ea5e9');
  const [gradColor2, setGradColor2] = useState('#8b5cf6');

  // --- STATE: GLASSMORPHISM ---
  const [glassBlur, setGlassBlur] = useState(12);
  const [glassOpacity, setGlassOpacity] = useState(0.1);
  const [glassColor, setGlassColor] = useState('#ffffff');
  const [glassOutline, setGlassOutline] = useState(0.1);

  // --- STATE: NEON GLOW ---
  const [glowColor, setGlowColor] = useState('#0ea5e9');
  const [glowBlur, setGlowBlur] = useState(30);
  const [glowSpread, setGlowSpread] = useState(10);
  const [glowOpacity, setGlowOpacity] = useState(0.6);

  // --- STATE: SMOOTH SHADOW ---
  const [shadowLayers, setShadowLayers] = useState(4);
  const [shadowY, setShadowY] = useState(12);
  const [shadowBlur, setShadowBlur] = useState(24);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowOpacity, setShadowOpacity] = useState(0.25);

  // --- STATE: NEUMORPHISM ---
  const [neuDistance, setNeoDistance] = useState(8);
  const [neuBlur, setNeoBlur] = useState(16);
  const [neuIntensity, setNeoIntensity] = useState(0.15);
  const [neuShape, setNeoShape] = useState('flat');
  const [neuBg, setNeuBg] = useState('#18181b');

  // --- STATE: CSS FILTERS (Bg Image) ---
  const [filterBlur, setFilterBlur] = useState(0);
  const [filterBright, setFilterBright] = useState(100);
  const [filterContrast, setFilterContrast] = useState(100);
  const [filterGray, setFilterGray] = useState(0);

  // --- STATE: 3D TRANSFORM ---
  const [transRotX, setTransRotX] = useState(20);
  const [transRotY, setTransRotY] = useState(30);
  const [transScale, setTransScale] = useState(1);
  const [transPersp, setTransPersp] = useState(1000);

  // --- STATE: ANIMATION ---
  const [animType, setAnimType] = useState('float');
  const [animDuration, setAnimDuration] = useState(3);

  // =========================================================================
  // GENERATOR CSS ENGINE
  // =========================================================================
  const generateCSS = () => {
    let css = `/* CSS Studio Output */\n\n`;
    
    // Default Selector
    css += `.element {\n`;

    if (activeTab === 'layout') {
      css += `  width: ${layWidth}px;\n  height: ${layHeight}px;\n  padding: ${layPad}px;\n  background-color: ${layBg};\n  border: ${borWidth}px solid ${borColor};\n  border-radius: ${previewShape === 'circle' ? '50%' : previewShape === 'pill' ? '50px' : `${borRadius}px`};\n`;
    }

    if (activeTab === 'typography') {
      css += `  font-size: ${typoSize}px;\n  font-weight: ${typoWeight};\n  letter-spacing: ${typoLetter}px;\n  text-align: ${typoAlign};\n`;
      if (gradTextEnabled) {
        css += `  background: linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n`;
      } else {
        css += `  color: ${typoColor};\n`;
      }
    }

    if (activeTab === 'glass') {
      css += `  background: ${hexToRgba(glassColor, glassOpacity)};\n  backdrop-filter: blur(${glassBlur}px);\n  -webkit-backdrop-filter: blur(${glassBlur}px);\n  border: 1px solid ${hexToRgba('#ffffff', glassOutline)};\n  border-radius: ${previewShape === 'circle' ? '50%' : previewShape === 'pill' ? '50px' : `${borRadius}px`};\n  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);\n`;
    }

    if (activeTab === 'glow') {
      css += `  background: #0A1329;\n  border: 1px solid ${hexToRgba(glowColor, 0.5)};\n  border-radius: ${previewShape === 'circle' ? '50%' : previewShape === 'pill' ? '50px' : `${borRadius}px`};\n  box-shadow: 0 0 ${glowBlur}px ${glowSpread}px ${hexToRgba(glowColor, glowOpacity)}, inset 0 0 15px ${hexToRgba(glowColor, glowOpacity * 0.5)};\n`;
    }

    if (activeTab === 'shadow') {
      let shadows = [];
      for (let i = 1; i <= shadowLayers; i++) {
        let y = (shadowY / shadowLayers) * i;
        let b = (shadowBlur / shadowLayers) * i;
        let o = Math.max(shadowOpacity - (i * 0.03), 0.02);
        shadows.push(`0 ${y.toFixed(1)}px ${b.toFixed(1)}px 0 ${hexToRgba(shadowColor, o)}`);
      }
      css += `  background: #ffffff;\n  border-radius: ${previewShape === 'circle' ? '50%' : previewShape === 'pill' ? '50px' : `${borRadius}px`};\n  box-shadow:\n    ${shadows.join(',\n    ')};\n`;
    }

    if (activeTab === 'neumorphism') {
      let inset = neuShape === 'flat' ? '' : 'inset';
      let lightShadow = `${inset ? 'inset ' : ''}-${neuDistance}px -${neuDistance}px ${neuBlur}px ${hexToRgba('#ffffff', neuIntensity / 2)}`;
      let darkShadow = `${inset ? 'inset ' : ''}${neuDistance}px ${neuDistance}px ${neuBlur}px ${hexToRgba('#000000', neuIntensity + 0.3)}`;
      let shapeGradient = `  background: ${neuBg};\n`;
      if (neuShape === 'convex') shapeGradient = `  background: linear-gradient(145deg, ${hexToRgba(neuBg, 1.1)}, ${hexToRgba(neuBg, 0.9)});\n`;
      if (neuShape === 'concave') shapeGradient = `  background: linear-gradient(145deg, ${hexToRgba(neuBg, 0.9)}, ${hexToRgba(neuBg, 1.1)});\n`;

      css += shapeGradient;
      css += `  border-radius: ${previewShape === 'circle' ? '50%' : previewShape === 'pill' ? '50px' : `${borRadius}px`};\n  box-shadow: ${darkShadow}, ${lightShadow};\n`;
    }

    if (activeTab === 'transform') {
      css += `  transform: perspective(${transPersp}px) rotateX(${transRotX}deg) rotateY(${transRotY}deg) scale(${transScale});\n  transition: transform 0.3s ease;\n`;
    }

    if (activeTab === 'animation') {
      css += `  animation: ${animType} ${animDuration}s infinite ${animType==='spin'?'linear':'ease-in-out'};\n`;
    }

    if (activeTab === 'filters') {
      css += `  filter: blur(${filterBlur}px) brightness(${filterBright}%) contrast(${filterContrast}%) grayscale(${filterGray}%);\n`;
    }

    css += `}\n`;

    if (activeTab === 'animation') {
      css += `\n/* Keyframes */\n`;
      if (animType === 'float') css += `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }\n`;
      if (animType === 'pulse') css += `@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }\n`;
      if (animType === 'spin') css += `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\n`;
    }

    return css;
  };

  const cssOutput = generateCSS();
  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // KOMPONEN UI UX MICRO-INTERACTIONS (FIGMA STYLE)
  // =========================================================================

  const ToolButton = ({ id, title, icon }) => (
    <button 
      onClick={() => setActiveTab(id)} 
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 border-l-2 ${activeTab === id ? 'bg-[#2c2c2e] border-cyan-500 text-white' : 'bg-transparent border-transparent text-slate-400 hover:bg-[#2c2c2e]/50 hover:text-slate-200'}`}
    >
      <div className="shrink-0">{icon()}</div>
      <span className="text-[10px] font-semibold tracking-wide hidden lg:block">{title}</span>
    </button>
  );

  // 🔥 CUSTOM COLOR PICKER (ACCORDION INLINE) - 100% ANTI KETIBAN TEXT!
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
        <div className="bg-[#1e1e1e] border border-[#333] rounded-lg overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between p-1.5 cursor-pointer hover:bg-[#2c2c2e]/50 transition-colors" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded shadow-inner border border-white/10" style={{backgroundColor: hexValue}}></div>
              <span className="text-[10px] font-mono text-slate-300 uppercase">{hexValue}</span>
            </div>
            <Icons.ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 mr-1 ${isOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* INLINE EXPANSION (Accordion) - Mendorong elemen bawahnya, tidak melayang */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[200px] border-t border-[#333] p-3' : 'max-h-0'}`}>
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
                <button key={c} onClick={() => onChange(c)} className={`w-4 h-4 rounded-full border border-white/20 transition-transform hover:scale-125`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => (
    <div className="flex items-center justify-between py-1.5 group">
      <label className="text-[10px] font-medium text-slate-400 w-1/3 group-hover:text-slate-200 transition-colors">{label}</label>
      <div className="w-2/3 flex items-center gap-2">
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-[2px] bg-[#333] rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-150 transition-all" />
        <div className="bg-[#1e1e1e] px-1.5 py-0.5 rounded border border-[#333] w-12 text-right shrink-0">
          <span className="text-[9px] font-mono text-cyan-400">{value}{unit}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 w-full bg-[#111111] text-slate-200 flex flex-col font-sans overflow-hidden lg:h-screen">
      
      {/* HEADER NAV */}
      <div className="px-6 py-3 border-b border-[#252526] flex items-center justify-between bg-[#18181b] z-30 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/toolkit" className="text-slate-400 hover:text-white transition-colors"><Icons.ArrowLeft /></Link>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight">CSS Visual <span className="text-cyan-500">Studio</span></span>
            <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-[8px] font-bold uppercase tracking-widest hidden sm:block">V7.0 Enterprise</span>
          </div>
        </div>
      </div>

      {/* APP WORKSPACE (Tiruan Editor Figma Sejati) */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden bg-[#111111] relative">
        
        {/* KOLOM 1: TOOLBAR (Kiri - Background Hitam Figma) */}
        <div className="w-full lg:w-[60px] xl:w-[200px] bg-[#18181b] border-r border-[#252526] shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto p-2 lg:p-3 [&::-webkit-scrollbar]:hidden z-20">
          <ToolButton id="layout" title="Layout" icon={<Icons.Layout />} />
          <ToolButton id="typography" title="Typography" icon={<Icons.Typography />} />
          <ToolButton id="glass" title="Glassmorphism" icon={<Icons.Glass />} />
          <ToolButton id="neumorphism" title="Neumorphism" icon={<Icons.Neumorphism />} />
          <ToolButton id="shadow" title="Shadows" icon={<Icons.Shadow />} />
          <ToolButton id="glow" title="Neon Glow" icon={<Icons.Glow />} />
          <ToolButton id="filters" title="Image Filters" icon={<Icons.Filters />} />
          <ToolButton id="transform" title="3D Transform" icon={<Icons.Cube3D />} />
          <ToolButton id="animation" title="Animations" icon={<Icons.Animation />} />
        </div>

        {/* KOLOM TENGAH: CANVAS & OUTPUT CODE */}
        <div className="flex-1 flex flex-col relative z-10 bg-[#111111] h-[50vh] lg:h-auto overflow-hidden">
          
          {/* STAGE CANVAS */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {/* Dot Grid Layer (Mirip Figma) */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
            
            {/* Background Panggung Eksklusif */}
            {activeTab === 'glass' && <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}></div>}
            {activeTab === 'neumorphism' && <div className="absolute inset-0 transition-colors duration-500" style={{ background: neuBg }}></div>}
            {activeTab === 'shadow' && <div className="absolute inset-0 bg-slate-200"></div>}
            {activeTab === 'filters' && <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200" alt="Bg" className="absolute inset-0 w-full h-full object-cover" style={{ filter: `blur(${filterBlur}px) brightness(${filterBright}%) contrast(${filterContrast}%) grayscale(${filterGray}%)` }} />}

            {/* RENDER THE PREVIEW ELEMENT (Smooth Morphing) */}
            <div 
              className="relative z-10 flex flex-col overflow-hidden"
              style={{
                display: previewShape === 'text' ? 'block' : 'flex',
                alignItems: layFlex, justifyContent: layFlex, textAlign: 'center',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
                
                ...(previewShape === 'box' && { width: `${layWidth}px`, height: `${layHeight}px`, borderRadius: `${borRadius}px` }),
                ...(previewShape === 'circle' && { width: '200px', height: '200px', borderRadius: '50%' }),
                ...(previewShape === 'pill' && { width: '280px', height: '100px', borderRadius: '50px' }),
                ...(previewShape === 'text' && { width: 'auto', height: 'auto', background: 'transparent' }),
                
                ...(activeTab === 'layout' && previewShape !== 'text' ? { background: layBg, padding: `${layPad}px`, border: `${borWidth}px solid ${borColor}` } : {}),
                ...(activeTab === 'glass' && previewShape !== 'text' ? { background: `rgba(${hexToRgb(glassColor)}, ${glassOpacity})`, backdropFilter: `blur(${glassBlur}px)`, WebkitBackdropFilter: `blur(${glassBlur}px)`, border: `1px solid rgba(255, 255, 255, ${glassOutline})`, boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)' } : {}),
                ...(activeTab === 'neumorphism' && previewShape !== 'text' ? { background: neuShape === 'convex' ? `linear-gradient(145deg, ${hexToRgba(neuBg, 1.1)}, ${hexToRgba(neuBg, 0.9)})` : neuShape === 'concave' ? `linear-gradient(145deg, ${hexToRgba(neuBg, 0.9)}, ${hexToRgba(neuBg, 1.1)})` : neuBg, boxShadow: `${neuShape === 'concave' ? 'inset ' : ''}${neuDistance}px ${neuDistance}px ${neuBlur}px ${hexToRgba('#000', neuIntensity + 0.3)}, ${neuShape === 'concave' ? 'inset ' : ''}-${neuDistance}px -${neuDistance}px ${neuBlur}px ${hexToRgba('#fff', neuIntensity / 2)}` } : {}),
                ...(activeTab === 'shadow' && previewShape !== 'text' ? { background: '#ffffff', boxShadow: Array.from({length: shadowLayers}, (_, i) => `0 ${(shadowY / shadowLayers) * (i + 1)}px ${(shadowBlur / shadowLayers) * (i + 1)}px ${(shadowSpread / shadowLayers) * (i + 1)}px ${hexToRgba(shadowColor, Math.max(shadowOpacity - ((i + 1) * 0.03), 0.02))}`).join(', ') } : {}),
                ...(activeTab === 'glow' && previewShape !== 'text' ? { background: '#0A1329', border: `1px solid ${hexToRgba(glowColor, 0.5)}`, boxShadow: `0 0 ${glowBlur}px ${glowSpread}px ${hexToRgba(glowColor, glowOpacity)}, inset 0 0 15px ${hexToRgba(glowColor, glowOpacity * 0.5)}` } : {}),
                ...(activeTab === 'transform' && previewShape !== 'text' ? { background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', transform: `perspective(${transPersp}px) rotateX(${transRotX}deg) rotateY(${transRotY}deg) scale(${transScale})` } : {}),
                ...(activeTab === 'animation' && previewShape !== 'text' ? { background: 'linear-gradient(135deg, #0A1329, #0d1a38)', border: '1px solid rgba(6, 182, 212, 0.3)', animation: animType === 'float' ? `float ${animDuration}s ease-in-out infinite` : animType === 'pulse' ? `pulse ${animDuration}s infinite` : `spin ${animDuration}s linear infinite` } : {}),
              }}
            >
              {previewShape === 'text' ? (
                <div className="w-full text-center">
                  <h2 className="font-black tracking-tighter transition-all duration-300" style={{ fontSize: `${typoSize}px`, fontWeight: typoWeight, letterSpacing: `${typoLetter}px`, textAlign: typoAlign, ...(gradTextEnabled && activeTab === 'typography' ? { background: `linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' } : { color: typoColor, textShadow: `${typoShadowX}px ${typoShadowY}px ${typoShadowB}px ${hexToRgba(typoShadowC, typoShadowO)}` }) }}>
                    {previewText}
                  </h2>
                </div>
              ) : (
                <span className={`font-bold tracking-widest uppercase text-xs transition-colors duration-300 ${(activeTab === 'shadow' || activeTab === 'layout') ? 'text-slate-800' : 'text-white'}`}>{previewText}</span>
              )}
            </div>
          </div>

          {/* OUTPUT CSS BOTTOM PANEL */}
          <div className="h-[150px] lg:h-[220px] bg-[#18181b] border-t border-[#252526] relative flex flex-col shrink-0">
            <button onClick={handleCopy} className="absolute top-3 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded bg-[#27272a] border border-white/10 text-slate-300 hover:bg-cyan-500 hover:text-[#030712] transition-all text-[10px] font-bold uppercase tracking-wider shadow-md">
              {copied ? <><Icons.Check /> Copied</> : <><Icons.Copy /> Copy CSS</>}
            </button>
            <div className="px-5 py-2 border-b border-[#252526] bg-[#1e1e1e]">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">CSS Output</span>
            </div>
            <div className="p-5 overflow-y-auto custom-scroll flex-grow bg-[#111111]">
              <pre className="text-[10px] sm:text-xs font-mono text-cyan-200/80 leading-relaxed">
                <code>{cssOutput}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* KOLOM 3: PROPERTIES PANEL (Kanan - Tampilan Panel Properties Figma) */}
        <div className="w-full lg:w-[280px] shrink-0 bg-[#1e1e1e] border-l border-[#252526] flex flex-col z-20 h-auto lg:h-full">
          
          {/* Element Target Settings (Sticky Top) */}
          <div className="p-4 border-b border-[#252526] bg-[#1e1e1e] shrink-0">
            <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Element Properties</h2>
            <div className="flex bg-[#111111] p-1 rounded border border-[#333] mb-3">
              {['box', 'circle', 'pill', 'text'].map(s => (
                <button key={s} onClick={() => setPreviewShape(s)} className={`flex-1 py-1 rounded-sm text-[9px] font-bold uppercase transition-all ${previewShape === s ? 'bg-[#27272a] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>{s}</button>
              ))}
            </div>
            <div className="flex items-center bg-[#111111] border border-[#333] rounded px-2 py-1.5 hover:border-[#444] transition-colors">
               <span className="text-[9px] font-bold text-slate-500 w-10">TEXT</span>
               <input type="text" value={previewText} onChange={(e) => setPreviewText(e.target.value)} className="w-full bg-transparent text-[10px] text-white outline-none" />
            </div>
          </div>

          {/* Properties Scrollable Area */}
          <div className="p-4 overflow-y-auto custom-scroll flex-grow">
            <div className="flex items-center gap-2 mb-4 border-b border-[#252526] pb-2">
              <span className="w-1.5 h-3 bg-cyan-500 rounded-full"></span>
              <h2 className="text-[10px] font-bold text-white uppercase tracking-widest">{activeTab.replace('-', ' ')}</h2>
            </div>
            
            {activeTab === 'layout' && (
              <div className="animate-fade-in space-y-1">
                <FigmaSlider label="Width" min="50" max="500" value={layWidth} onChange={setLayWidth} />
                <FigmaSlider label="Height" min="50" max="500" value={layHeight} onChange={setLayHeight} />
                <FigmaSlider label="Padding" min="0" max="100" value={layPad} onChange={setLayPad} />
                <FigmaColorPicker label="Fill Color" hexValue={layBg} onChange={setLayBg} />
                <div className="mt-4 pt-4 border-t border-[#252526]">
                  <label className="text-[10px] font-medium text-slate-400 block mb-2">Border Radius</label>
                  <FigmaSlider label="Radius" min="0" max="200" value={borRadius} onChange={setBorRadius} />
                </div>
              </div>
            )}

            {activeTab === 'typography' && (
              <div className="animate-fade-in space-y-1">
                {previewShape !== 'text' && <div className="p-2 mb-3 bg-yellow-900/20 border border-yellow-500/20 rounded text-[9px] text-yellow-400 font-medium">Ubah Shape ke "TEXT" di panel atas agar properti tipografi terlihat jelas.</div>}
                <FigmaSlider label="Font Size" min="12" max="120" value={typoSize} onChange={setTypoSize} />
                <FigmaSlider label="Weight" min="100" max="900" step="100" value={typoWeight} onChange={setTypoWeight} />
                <FigmaSlider label="Spacing" min="-10" max="30" step="0.5" value={typoLetter} onChange={setTypoLetter} />
                
                <div className="mt-4 pt-4 border-t border-[#252526]">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] font-medium text-slate-400">Gradient Text</label>
                    <input type="checkbox" checked={gradTextEnabled} onChange={(e) => setGradTextEnabled(e.target.checked)} className="accent-cyan-500 cursor-pointer" />
                  </div>
                  {gradTextEnabled ? (
                    <>
                      <FigmaSlider label="Angle" min="0" max="360" value={gradAngle} onChange={setGradAngle} />
                      <FigmaColorPicker label="Color 1" hexValue={gradColor1} onChange={setGradColor1} />
                      <FigmaColorPicker label="Color 2" hexValue={gradColor2} onChange={setGradColor2} />
                    </>
                  ) : (
                    <FigmaColorPicker label="Fill Color" hexValue={typoColor} onChange={setTypoColor} />
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-[#252526]">
                  <label className="text-[10px] font-medium text-slate-400 block mb-3">Drop Shadow</label>
                  <FigmaSlider label="X Offset" min="-30" max="30" value={typoShadowX} onChange={setTypoShadowX} />
                  <FigmaSlider label="Y Offset" min="-30" max="30" value={typoShadowY} onChange={setTypoShadowY} />
                  <FigmaSlider label="Blur" min="0" max="50" value={typoShadowB} onChange={setTypoShadowB} />
                  <FigmaSlider label="Opacity" min="0" max="1" step="0.05" value={typoShadowO} onChange={setTypoShadowO} />
                  <FigmaColorPicker label="Color" hexValue={typoShadowC} onChange={setTypoShadowC} />
                </div>
              </div>
            )}

            {activeTab === 'glass' && (
              <div className="animate-fade-in space-y-1">
                <FigmaColorPicker label="Fill Color" hexValue={glassColor} onChange={setGlassColor} />
                <FigmaSlider label="Opacity" min="0" max="1" step="0.05" value={glassOpacity} onChange={setGlassOpacity} />
                <FigmaSlider label="Blur" min="0" max="50" value={glassBlur} onChange={setGlassBlur} />
                <FigmaSlider label="Outline" min="0" max="1" step="0.05" value={glassOutline} onChange={setGlassOutline} />
              </div>
            )}

            {activeTab === 'glow' && (
              <div className="animate-fade-in space-y-1">
                <FigmaColorPicker label="Glow Color" hexValue={glowColor} onChange={setGlowColor} />
                <FigmaSlider label="Blur" min="0" max="100" value={glowBlur} onChange={setGlowBlur} />
                <FigmaSlider label="Spread" min="-20" max="50" value={glowSpread} onChange={setGlowSpread} />
                <FigmaSlider label="Opacity" min="0" max="1" step="0.05" value={glowOpacity} onChange={setGlowOpacity} />
              </div>
            )}

            {activeTab === 'neumorphism' && (
              <div className="animate-fade-in space-y-1">
                <FigmaColorPicker label="Surface Color" hexValue={neuBg} onChange={setNeuBg} />
                <FigmaSlider label="Distance" min="2" max="30" value={neuDistance} onChange={setNeoDistance} />
                <FigmaSlider label="Blur" min="0" max="60" value={neuBlur} onChange={setNeoBlur} />
                <FigmaSlider label="Intensity" min="0.05" max="0.5" step="0.05" value={neuIntensity} onChange={setNeoIntensity} />
                <div className="mt-4 pt-4 border-t border-[#252526]">
                  <label className="text-[10px] font-medium text-slate-400 block mb-2">Lighting Shape</label>
                  <div className="flex bg-[#111111] p-1 rounded border border-[#333]">
                    {['flat', 'concave', 'convex'].map(shape => (
                      <button key={shape} onClick={() => setNeoShape(shape)} className={`flex-1 py-1 rounded-sm text-[9px] font-bold uppercase transition-all ${neuShape === shape ? 'bg-[#27272a] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>{shape}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shadow' && (
              <div className="animate-fade-in space-y-1">
                <FigmaSlider label="Layers" min="1" max="6" value={shadowLayers} onChange={setShadowLayers} />
                <FigmaSlider label="Y Offset" min="-50" max="50" value={shadowY} onChange={setShadowY} />
                <FigmaSlider label="Blur" min="0" max="100" value={shadowBlur} onChange={setShadowBlur} />
                <FigmaSlider label="Spread" min="-20" max="20" value={shadowSpread} onChange={setShadowSpread} />
                <FigmaSlider label="Opacity" min="0.05" max="1" step="0.05" value={shadowOpacity} onChange={setShadowOpacity} />
                <FigmaColorPicker label="Color" hexValue={shadowColor} onChange={setShadowColor} />
              </div>
            )}

            {activeTab === 'filters' && (
              <div className="animate-fade-in space-y-1">
                <FigmaSlider label="Blur" min="0" max="20" step="0.5" value={filterBlur} onChange={setFilterBlur} />
                <FigmaSlider label="Brightness" min="0" max="200" value={filterBright} onChange={setFilterBright} />
                <FigmaSlider label="Contrast" min="0" max="200" value={filterContrast} onChange={setFilterContrast} />
                <FigmaSlider label="Grayscale" min="0" max="100" value={filterGray} onChange={setFilterGray} />
              </div>
            )}

            {activeTab === 'transform' && (
              <div className="animate-fade-in space-y-1">
                <FigmaSlider label="Rotate X" min="-180" max="180" value={transRotX} onChange={setTransRotX} />
                <FigmaSlider label="Rotate Y" min="-180" max="180" value={transRotY} onChange={setTransRotY} />
                <FigmaSlider label="Scale" min="0.5" max="1.5" step="0.05" value={transScale} onChange={setTransScale} />
                <FigmaSlider label="Perspective" min="200" max="2000" step="50" value={transPersp} onChange={setTransPersp} />
              </div>
            )}

            {activeTab === 'animation' && (
              <div className="animate-fade-in space-y-1">
                <div className="mb-4">
                  <label className="text-[10px] font-medium text-slate-400 block mb-2">Keyframes</label>
                  <div className="flex flex-col gap-1.5">
                    {[{ id: 'float', name: 'Floating' }, { id: 'pulse', name: 'Pulse Glow' }, { id: 'spin', name: 'Spin Rotate' }].map(anim => (
                      <button key={anim.id} onClick={() => setAnimType(anim.id)} className={`px-3 py-2 rounded text-[10px] font-bold text-left transition-all ${animType === anim.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-[#111111] text-slate-400 border border-[#333] hover:bg-[#27272a] hover:text-slate-200'}`}>
                        {anim.name}
                      </button>
                    ))}
                  </div>
                </div>
                <FigmaSlider label="Duration (s)" min="0.5" max="10" step="0.5" value={animDuration} onChange={setAnimDuration} />
              </div>
            )}
            
          </div>
        </div>

      </div>

      {/* KEYFRAMES INJECTION */}
      {activeTab === 'animation' && (
        <style dangerouslySetInnerHTML={{__html: `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } } @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}} />
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        /* Custom Color Range Sliders HSL */
        input[type="range"].custom-color-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; background: white; border: 2px solid #111113; border-radius: 50%; cursor: pointer; box-shadow: 0 0 5px rgba(0,0,0,0.5); }
        /* Panel Scrollbar */
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      `}} />
    </div>
  );
}