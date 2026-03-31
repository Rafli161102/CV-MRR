"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// =========================================================================
// IKON SVG PROFESIONAL (Figma-style)
// =========================================================================
const Icons = {
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>,
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
  
  // App Icons
  Glass: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18m6-18v18M3 9h18m-18 6h18" opacity="0.3"/></svg>,
  Neumorphism: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>,
  Shadow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" /></svg>,
  Animation: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  Glow: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  TextGrad: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
  Filter: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
  Cube3D: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  Typography: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" /></svg>,
  Layout: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.5-6h15m-15-6h15m-3-4.5H5.25C4.007 3 3 4.007 3 5.25v13.5c0 1.243 1.007 2.25 2.25 2.25h13.5c1.243 0 2.25-2.25V5.25c0-1.243-1.007-2.25-2.25-2.25z" /></svg>,
  Border: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
};

// =========================================================================
// COLOR ENGINE 2.0 (Custom HSL to HEX - Menolak Popup Native!)
// =========================================================================
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

const hexToRgba = (hex, alpha) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})` : `rgba(255,255,255,${alpha})`;
};

const COLOR_PRESETS = ['#ffffff', '#030712', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function CssStudioPage() {
  const [activeTab, setActiveTab] = useState('glass');
  const [copied, setCopied] = useState(false);

  // --- STAGE ELEMENT CONTROLLER (User bisa ganti Teks & Bentuk) ---
  const [previewText, setPreviewText] = useState('CSS Studio.');
  const [previewShape, setPreviewShape] = useState('box'); // box, circle, pill, text

  // --- STATE: GLASSMORPHISM ---
  const [glassBlur, setGlassBlur] = useState(12);
  const [glassOpacity, setGlassOpacity] = useState(0.2);
  const [glassColor, setGlassColor] = useState('#ffffff');
  const [glassOutline, setGlassOutline] = useState(0.1);

  // --- STATE: NEUMORPHISM ---
  const [neuDistance, setNeoDistance] = useState(8);
  const [neuBlur, setNeoBlur] = useState(16);
  const [neuIntensity, setNeoIntensity] = useState(0.15);
  const [neuShape, setNeoShape] = useState('flat');
  const [neuBg, setNeuBg] = useState('#0A1329');

  // --- STATE: SMOOTH SHADOW ---
  const [shadowLayers, setShadowLayers] = useState(4);
  const [shadowY, setShadowY] = useState(12);
  const [shadowBlur, setShadowBlur] = useState(24);
  const [shadowSpread, setShadowSpread] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.25);
  const [shadowColor, setShadowColor] = useState('#000000');

  // --- STATE: NEON GLOW ---
  const [glowColor, setGlowColor] = useState('#06b6d4');
  const [glowBlur, setGlowBlur] = useState(30);
  const [glowSpread, setGlowSpread] = useState(10);
  const [glowOpacity, setGlowOpacity] = useState(0.6);

  // --- STATE: TEXT GRADIENT ---
  const [gradAngle, setGradAngle] = useState(135);
  const [gradColor1, setGradColor1] = useState('#06b6d4');
  const [gradColor2, setGradColor2] = useState('#8b5cf6');

  // --- STATE: TYPOGRAPHY ---
  const [typoSize, setTypoSize] = useState(42);
  const [typoWeight, setTypoWeight] = useState(800);
  const [typoLetter, setTypoLetter] = useState(-1);
  const [typoColor, setTypoColor] = useState('#ffffff');
  const [typoShadowX, setTypoShadowX] = useState(0);
  const [typoShadowY, setTypoShadowY] = useState(4);
  const [typoShadowB, setTypoShadowB] = useState(15);
  const [typoShadowC, setTypoShadowC] = useState('#06b6d4');
  const [typoShadowO, setTypoShadowO] = useState(0.5);

  // --- STATE: LAYOUT & FLEX ---
  const [layWidth, setLayWidth] = useState(250);
  const [layHeight, setLayHeight] = useState(150);
  const [layPad, setLayPad] = useState(24);
  const [layFlex, setLayFlex] = useState('center'); 

  // --- STATE: BORDER & SHAPE ---
  const [borWidth, setBorWidth] = useState(2);
  const [borRadius, setBorRadius] = useState(24);
  const [borColor, setBorColor] = useState('#06b6d4');
  const [borStyle, setBorStyle] = useState('solid'); 

  // --- STATE: CSS FILTERS ---
  const [filterBlur, setFilterBlur] = useState(0);
  const [filterBright, setFilterBright] = useState(100);
  const [filterContrast, setFilterContrast] = useState(100);
  const [filterGray, setFilterGray] = useState(0);

  // --- STATE: 3D TRANSFORM ---
  const [transRotX, setTransRotX] = useState(20);
  const [transRotY, setTransRotY] = useState(30);
  const [transScale, setTransScale] = useState(1);
  const [transPersp, setTransPersp] = useState(1000);

  // --- STATE: ANIMATIONS ---
  const [animType, setAnimType] = useState('float');
  const [animDuration, setAnimDuration] = useState(3);

  // =========================================================================
  // GENERATOR CSS ENGINE
  // =========================================================================
  const generateCSS = () => {
    switch (activeTab) {
      case 'glass':
        return `/* Glassmorphism Effect */
background: ${hexToRgba(glassColor, glassOpacity)};
backdrop-filter: blur(${glassBlur}px);
-webkit-backdrop-filter: blur(${glassBlur}px);
border: 1px solid ${hexToRgba('#ffffff', glassOutline)};
border-radius: ${previewShape === 'circle' ? '50%' : previewShape === 'pill' ? '50px' : '24px'};
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);`;

      case 'neumorphism':
        let inset = neuShape === 'flat' ? '' : 'inset';
        let lightShadow = `${inset ? 'inset ' : ''}-${neuDistance}px -${neuDistance}px ${neuBlur}px ${hexToRgba('#ffffff', neuIntensity / 2)}`;
        let darkShadow = `${inset ? 'inset ' : ''}${neuDistance}px ${neuDistance}px ${neuBlur}px ${hexToRgba('#000000', neuIntensity + 0.3)}`;
        let shapeGradient = `background: ${neuBg};`;
        if (neuShape === 'convex') shapeGradient = `background: linear-gradient(145deg, ${hexToRgba(neuBg, 1.1)}, ${hexToRgba(neuBg, 0.9)});`;
        if (neuShape === 'concave') shapeGradient = `background: linear-gradient(145deg, ${hexToRgba(neuBg, 0.9)}, ${hexToRgba(neuBg, 1.1)});`;

        return `/* Soft UI Neumorphism */
${shapeGradient}
border-radius: ${previewShape === 'circle' ? '50%' : previewShape === 'pill' ? '50px' : '24px'};
box-shadow: ${darkShadow},
            ${lightShadow};`;

      case 'shadow':
        let shadows = [];
        for (let i = 1; i <= shadowLayers; i++) {
          let y = (shadowY / shadowLayers) * i;
          let b = (shadowBlur / shadowLayers) * i;
          let s = (shadowSpread / shadowLayers) * i;
          let o = shadowOpacity - (i * 0.03);
          shadows.push(`0 ${y.toFixed(1)}px ${b.toFixed(1)}px ${s.toFixed(1)}px ${hexToRgba(shadowColor, Math.max(o, 0.02))}`);
        }
        return `/* Smooth Layered Shadow */
background: #ffffff;
border-radius: ${previewShape === 'circle' ? '50%' : previewShape === 'pill' ? '50px' : '24px'};
box-shadow: \n  ${shadows.join(',\n  ')};`;

      case 'glow':
        return `/* Neon Glow Effect */
background: #0A1329;
border: 1px solid ${hexToRgba(glowColor, 0.5)};
border-radius: ${previewShape === 'circle' ? '50%' : previewShape === 'pill' ? '50px' : '24px'};
box-shadow: 0 0 ${glowBlur}px ${glowSpread}px ${hexToRgba(glowColor, glowOpacity)},
            inset 0 0 15px ${hexToRgba(glowColor, glowOpacity * 0.5)};`;

      case 'text-gradient':
        return `/* Text Gradient */
background: linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
color: transparent;`;

      case 'typography':
        return `/* Typography & Text Shadow */
font-size: ${typoSize}px;
font-weight: ${typoWeight};
letter-spacing: ${typoLetter}px;
color: ${typoColor};
text-shadow: ${typoShadowX}px ${typoShadowY}px ${typoShadowB}px ${hexToRgba(typoShadowC, typoShadowO)};`;

      case 'layout':
        return `/* Layout & Flexbox */
width: ${layWidth}px;
height: ${layHeight}px;
padding: ${layPad}px;
display: flex;
align-items: ${layFlex};
justify-content: ${layFlex};
background: #06b6d4;`;

      case 'border':
        return `/* Custom Border */
border: ${borWidth}px ${borStyle} ${borColor};
border-radius: ${borRadius}px;
background: transparent;`;

      case 'filters':
        return `/* Image CSS Filters */
filter: blur(${filterBlur}px) 
        brightness(${filterBright}%) 
        contrast(${filterContrast}%) 
        grayscale(${filterGray}%);
border-radius: 16px;`;

      case 'transform':
        return `/* 3D Transform */
transform: perspective(${transPersp}px) 
           rotateX(${transRotX}deg) 
           rotateY(${transRotY}deg) 
           scale(${transScale});
background: linear-gradient(135deg, #06b6d4, #3b82f6);
border-radius: 24px;
box-shadow: 0 20px 40px rgba(0,0,0,0.3);
transition: transform 0.3s ease;`;

      case 'animation':
        let animCode = '';
        if (animType === 'float') {
          animCode = `@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}\n.animate-element {\n  animation: float ${animDuration}s ease-in-out infinite;\n}`;
        } else if (animType === 'pulse') {
          animCode = `@keyframes pulse-glow {\n  0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }\n  50% { box-shadow: 0 0 30px 15px rgba(6, 182, 212, 0); }\n}\n.animate-element {\n  animation: pulse-glow ${animDuration}s infinite;\n}`;
        } else if (animType === 'spin') {
          animCode = `@keyframes spin-slow {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n.animate-element {\n  animation: spin-slow ${animDuration}s linear infinite;\n}`;
        }
        return `/* CSS Keyframes Animation */\n${animCode}`;
      default:
        return '';
    }
  };

  const cssOutput = generateCSS();

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // =========================================================================
  // KOMPONEN UI UX MICRO-INTERACTIONS
  // =========================================================================

  const ToolButton = ({ id, title, icon }) => (
    <button onClick={() => setActiveTab(id)} className={`flex flex-col items-center justify-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all duration-200 border ${activeTab === id ? 'bg-[#0f0f11] border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.02] z-10' : 'bg-[#18181b] border-transparent text-slate-400 hover:bg-[#27272a] hover:text-slate-200'}`}>
      <div className="shrink-0">{icon()}</div>
      <span className="text-[9px] sm:text-[10px] font-semibold text-center leading-tight">{title}</span>
    </button>
  );

  // 🔥 CUSTOM COLOR ENGINE (Menghapus total input type="color" bawaan HP)
  const FigmaCustomColorPicker = ({ label, hexValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hsl, setHsl] = useState(hexToHsl(hexValue));
    
    useEffect(() => { setHsl(hexToHsl(hexValue)); }, [hexValue]);

    const handleHslChange = (part, val) => {
      const newHsl = { ...hsl, [part]: val };
      setHsl(newHsl);
      onChange(hslToHex(newHsl.h, newHsl.s, newHsl.l));
    };

    return (
      <div className="mb-4 bg-[#18181b]/80 border border-white/5 rounded-xl p-3">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider cursor-pointer">{label}</label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#0f0f11] px-2 py-1 rounded-md border border-white/10">
              <div className="w-3 h-3 rounded-full border border-white/20 shadow-sm" style={{backgroundColor: hexValue}}></div>
              <span className="text-[10px] font-mono text-white">{hexValue.toUpperCase()}</span>
            </div>
            <div className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></div>
          </div>
        </div>

        {isOpen && (
          <div className="pt-4 mt-3 border-t border-white/5 space-y-4 animate-fade-in">
            {/* Custom Sliders yg tidak trigger popup OS */}
            <div>
              <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">Hue</span><span className="text-[9px] text-slate-400 font-mono">{hsl.h}°</span></div>
              <input type="range" min="0" max="360" value={hsl.h} onChange={(e) => handleHslChange('h', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'}} />
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">Saturation</span><span className="text-[9px] text-slate-400 font-mono">{hsl.s}%</span></div>
              <input type="range" min="0" max="100" value={hsl.s} onChange={(e) => handleHslChange('s', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #808080, ${hslToHex(hsl.h, 100, 50)})`}} />
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">Lightness</span><span className="text-[9px] text-slate-400 font-mono">{hsl.l}%</span></div>
              <input type="range" min="0" max="100" value={hsl.l} onChange={(e) => handleHslChange('l', Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #000, ${hslToHex(hsl.h, hsl.s, 50)}, #fff)`}} />
            </div>
            {/* Quick Swatches */}
            <div className="flex flex-wrap gap-2 pt-2">
              {COLOR_PRESETS.map((c) => (
                <button key={c} onClick={() => onChange(c)} className={`w-5 h-5 rounded-full border-2 transition-all ${hexValue === c ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => (
    <div className="mb-4 group">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-[10px] sm:text-xs font-semibold text-slate-400">{label}</label>
        <div className="bg-[#0f0f11] px-2 py-0.5 rounded border border-white/5 min-w-[45px] text-right group-hover:border-white/10 transition-colors">
          <span className="text-[10px] font-mono text-cyan-400">{value}{unit}</span>
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-[2px] bg-slate-700 rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-125 transition-all" />
    </div>
  );

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-24 w-full bg-[#0a0a0b] text-slate-200 flex flex-col">
      
      {/* HEADER NAVBAR */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 z-20">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Link href="/toolkit" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Icons.ArrowLeft /></Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              CSS Visual <span className="text-cyan-400">Studio.</span>
            </h1>
            <p className="text-[10px] text-slate-500">Advanced Design Engine</p>
          </div>
        </div>
      </div>

      {/* WORKSPACE MAIN LAYOUT */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col lg:flex-row gap-4 sm:gap-6 relative z-10">
        
        {/* KOLOM 1: TOOLBAR */}
        <div className="w-full lg:w-[85px] shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden snap-x px-1">
          <ToolButton id="text-gradient" title="Gradient" icon={Icons.TextGrad} />
          <ToolButton id="typography" title="Typo" icon={Icons.Typography} />
          <ToolButton id="layout" title="Layout" icon={Icons.Layout} />
          <ToolButton id="border" title="Border" icon={Icons.Border} />
          <ToolButton id="glass" title="Glass" icon={Icons.Glass} />
          <ToolButton id="glow" title="Glow" icon={Icons.Glow} />
          <ToolButton id="neumorphism" title="Neumorph" icon={Icons.Neumorphism} />
          <ToolButton id="shadow" title="Shadow" icon={Icons.Shadow} />
          <ToolButton id="filters" title="Filters" icon={Icons.Filter} />
          <ToolButton id="transform" title="3D Move" icon={Icons.Cube3D} />
          <ToolButton id="animation" title="Animate" icon={Icons.Animation} />
        </div>

        {/* KOLOM 2: PROPERTIES PANEL */}
        <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0 bg-[#111113] border border-white/5 rounded-2xl shadow-xl flex flex-col h-auto lg:h-[80vh]">
          
          {/* ELEMENT SETTINGS (Selalu terlihat di atas) */}
          <div className="p-5 border-b border-white/5 bg-[#18181b]/80 rounded-t-2xl shrink-0">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Element Target</h2>
            </div>
            <div className="flex bg-[#0f0f11] p-1 rounded-lg border border-white/5 mb-3">
              {['box', 'circle', 'pill', 'text'].map(s => (
                <button key={s} onClick={() => setPreviewShape(s)} className={`flex-1 py-1.5 rounded text-[9px] font-bold uppercase transition-all ${previewShape === s ? 'bg-cyan-500 text-[#030712] shadow-sm' : 'text-slate-400 hover:text-white'}`}>{s}</button>
              ))}
            </div>
            <input 
              type="text" 
              value={previewText} 
              onChange={(e) => setPreviewText(e.target.value)}
              placeholder="Preview Text"
              className="w-full bg-[#0f0f11] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* TAB CONTENT (Bisa di-scroll) */}
          <div className="p-5 overflow-y-auto custom-scroll flex-grow relative">
            <h2 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-5 sticky top-0 bg-[#111113] py-2 z-10 border-b border-white/5">{activeTab.replace('-', ' ')} Settings</h2>
            
            {activeTab === 'text-gradient' && (
              <div className="animate-fade-in space-y-2">
                <div className="p-3 bg-cyan-900/20 border border-cyan-500/20 rounded-lg text-[10px] text-cyan-300 mb-4">Pastikan Element Target adalah "TEXT" agar gradien terlihat sempurna.</div>
                <FigmaSlider label="Angle" min="0" max="360" step="1" value={gradAngle} onChange={setGradAngle} unit="°" />
                <div className="h-px bg-white/5 my-4"></div>
                <FigmaCustomColorPicker label="Color 1 (Start)" hexValue={gradColor1} onChange={setGradColor1} />
                <FigmaCustomColorPicker label="Color 2 (End)" hexValue={gradColor2} onChange={setGradColor2} />
              </div>
            )}

            {activeTab === 'typography' && (
              <div className="animate-fade-in space-y-2">
                <FigmaSlider label="Font Size" min="12" max="120" step="1" value={typoSize} onChange={setTypoSize} unit="px" />
                <FigmaSlider label="Font Weight" min="100" max="900" step="100" value={typoWeight} onChange={setTypoWeight} />
                <FigmaSlider label="Letter Spacing" min="-10" max="30" step="0.5" value={typoLetter} onChange={setTypoLetter} unit="px" />
                <div className="h-px bg-white/5 my-4"></div>
                <FigmaCustomColorPicker label="Text Color" hexValue={typoColor} onChange={setTypoColor} />
                <div className="h-px bg-white/5 my-4"></div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Text Shadow</h3>
                <FigmaSlider label="X Offset" min="-30" max="30" step="1" value={typoShadowX} onChange={setTypoShadowX} unit="px" />
                <FigmaSlider label="Y Offset" min="-30" max="30" step="1" value={typoShadowY} onChange={setTypoShadowY} unit="px" />
                <FigmaSlider label="Blur" min="0" max="50" step="1" value={typoShadowB} onChange={setTypoShadowB} unit="px" />
                <FigmaSlider label="Opacity" min="0" max="1" step="0.05" value={typoShadowO} onChange={setTypoShadowO} />
                <FigmaCustomColorPicker label="Shadow Color" hexValue={typoShadowC} onChange={setTypoShadowC} />
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="animate-fade-in space-y-2">
                <FigmaSlider label="Width" min="50" max="400" step="1" value={layWidth} onChange={setLayWidth} unit="px" />
                <FigmaSlider label="Height" min="50" max="400" step="1" value={layHeight} onChange={setLayHeight} unit="px" />
                <FigmaSlider label="Padding" min="0" max="100" step="1" value={layPad} onChange={setLayPad} unit="px" />
                <div className="mb-4 mt-4">
                  <label className="text-[10px] font-semibold text-slate-400 block mb-2">Flex Align & Justify</label>
                  <div className="flex bg-[#0f0f11] p-1 rounded-lg border border-white/5">
                    {['flex-start', 'center', 'flex-end'].map(flex => (
                      <button key={flex} onClick={() => setLayFlex(flex)} className={`flex-1 py-1.5 rounded text-[9px] font-bold uppercase transition-all ${layFlex === flex ? 'bg-cyan-500 text-[#030712]' : 'text-slate-400 hover:text-white'}`}>{flex.split('-')[1] || flex}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'border' && (
              <div className="animate-fade-in space-y-2">
                <FigmaSlider label="Border Width" min="0" max="30" step="1" value={borWidth} onChange={setBorWidth} unit="px" />
                <FigmaSlider label="Border Radius" min="0" max="200" step="1" value={borRadius} onChange={setBorRadius} unit="px" />
                <div className="mb-5 mt-4">
                  <label className="text-[10px] font-semibold text-slate-400 block mb-2">Border Style</label>
                  <div className="flex bg-[#0f0f11] p-1 rounded-lg border border-white/5">
                    {['solid', 'dashed', 'dotted'].map(s => (
                      <button key={s} onClick={() => setBorStyle(s)} className={`flex-1 py-1.5 rounded text-[9px] font-bold uppercase transition-all ${borStyle === s ? 'bg-cyan-500 text-[#030712]' : 'text-slate-400 hover:text-white'}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <FigmaCustomColorPicker label="Border Color" hexValue={borColor} onChange={setBorColor} />
              </div>
            )}

            {activeTab === 'glass' && (
              <div className="animate-fade-in space-y-2">
                <FigmaCustomColorPicker label="Base Color" hexValue={glassColor} onChange={setGlassColor} />
                <FigmaSlider label="Blur Background" min="0" max="40" step="0.5" value={glassBlur} onChange={setGlassBlur} unit="px" />
                <FigmaSlider label="Opacity" min="0" max="1" step="0.01" value={glassOpacity} onChange={setGlassOpacity} />
                <FigmaSlider label="Border Outline" min="0" max="1" step="0.01" value={glassOutline} onChange={setGlassOutline} />
              </div>
            )}

            {activeTab === 'neumorphism' && (
              <div className="animate-fade-in space-y-2">
                <FigmaCustomColorPicker label="Base Element Color" hexValue={neuBg} onChange={setNeuBg} />
                <FigmaSlider label="Distance" min="2" max="30" step="0.5" value={neuDistance} onChange={setNeoDistance} unit="px" />
                <FigmaSlider label="Blur" min="0" max="60" step="0.5" value={neuBlur} onChange={setNeoBlur} unit="px" />
                <FigmaSlider label="Intensity" min="0.05" max="0.5" step="0.01" value={neuIntensity} onChange={setNeoIntensity} />
                <div className="mb-4 mt-4">
                  <label className="text-[10px] font-semibold text-slate-400 block mb-2">Shape Style</label>
                  <div className="flex bg-[#0f0f11] p-1 rounded-lg border border-white/5">
                    {['flat', 'concave', 'convex'].map(shape => (
                      <button key={shape} onClick={() => setNeoShape(shape)} className={`flex-1 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${neuShape === shape ? 'bg-cyan-500 text-[#030712]' : 'text-slate-400 hover:text-white'}`}>{shape}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shadow' && (
              <div className="animate-fade-in space-y-2">
                <FigmaSlider label="Layers (Smoothness)" min="1" max="6" step="1" value={shadowLayers} onChange={setShadowLayers} />
                <FigmaSlider label="Y Offset" min="-50" max="50" step="0.5" value={shadowY} onChange={setShadowY} unit="px" />
                <FigmaSlider label="Blur Radius" min="0" max="100" step="0.5" value={shadowBlur} onChange={setShadowBlur} unit="px" />
                <FigmaSlider label="Spread" min="-20" max="20" step="0.5" value={shadowSpread} onChange={setShadowSpread} unit="px" />
                <FigmaSlider label="Opacity" min="0.05" max="0.8" step="0.01" value={shadowOpacity} onChange={setShadowOpacity} />
                <FigmaCustomColorPicker label="Shadow Color" hexValue={shadowColor} onChange={setShadowColor} />
              </div>
            )}

            {activeTab === 'glow' && (
              <div className="animate-fade-in space-y-2">
                <FigmaCustomColorPicker label="Glow Color" hexValue={glowColor} onChange={setGlowColor} />
                <FigmaSlider label="Blur Radius" min="0" max="100" step="1" value={glowBlur} onChange={setGlowBlur} unit="px" />
                <FigmaSlider label="Spread Radius" min="-20" max="50" step="1" value={glowSpread} onChange={setGlowSpread} unit="px" />
                <FigmaSlider label="Intensity" min="0.1" max="1" step="0.01" value={glowOpacity} onChange={setGlowOpacity} />
              </div>
            )}

            {activeTab === 'filters' && (
              <div className="animate-fade-in space-y-2">
                <div className="text-[10px] text-cyan-400/80 mb-4 bg-cyan-900/20 p-2 rounded border border-cyan-500/20">Filter diterapkan ke background image.</div>
                <FigmaSlider label="Blur" min="0" max="20" step="0.1" value={filterBlur} onChange={setFilterBlur} unit="px" />
                <FigmaSlider label="Brightness" min="0" max="200" step="1" value={filterBright} onChange={setFilterBright} unit="%" />
                <FigmaSlider label="Contrast" min="0" max="200" step="1" value={filterContrast} onChange={setFilterContrast} unit="%" />
                <FigmaSlider label="Grayscale" min="0" max="100" step="1" value={filterGray} onChange={setFilterGray} unit="%" />
              </div>
            )}

            {activeTab === 'transform' && (
              <div className="animate-fade-in space-y-2">
                <FigmaSlider label="Rotate X" min="-180" max="180" step="1" value={transRotX} onChange={setTransRotX} unit="°" />
                <FigmaSlider label="Rotate Y" min="-180" max="180" step="1" value={transRotY} onChange={setTransRotY} unit="°" />
                <FigmaSlider label="Scale" min="0.5" max="1.5" step="0.01" value={transScale} onChange={setTransScale} />
                <FigmaSlider label="Perspective" min="200" max="2000" step="10" value={transPersp} onChange={setTransPersp} unit="px" />
              </div>
            )}

            {activeTab === 'animation' && (
              <div className="animate-fade-in space-y-2">
                <div className="mb-4">
                  <label className="text-[10px] font-semibold text-slate-400 block mb-2">Keyframes Animation</label>
                  <div className="flex flex-col gap-2">
                    {[{ id: 'float', name: 'Floating' }, { id: 'pulse', name: 'Pulse Glow' }, { id: 'spin', name: 'Spin Rotate' }].map(anim => (
                      <button key={anim.id} onClick={() => setAnimType(anim.id)} className={`px-4 py-2.5 rounded-lg text-xs font-bold text-left transition-all border ${animType === anim.id ? 'bg-cyan-500 text-[#030712] border-cyan-500' : 'bg-[#0f0f11] text-slate-300 border-white/5 hover:bg-white/5'}`}>
                        {anim.name}
                      </button>
                    ))}
                  </div>
                </div>
                <FigmaSlider label="Duration" min="0.5" max="10" step="0.1" value={animDuration} onChange={setAnimDuration} unit="s" />
              </div>
            )}

          </div>
        </div>

        {/* KOLOM 3: CANVAS & CODE (Kanan/Tengah - Mobile: Sticky Top/Fleksibel) */}
        <div className="w-full flex-grow flex flex-col gap-4 lg:h-[80vh]">
          
          {/* CANVAS AREA (Dot Grid Background) */}
          <div className="w-full h-[350px] sm:h-[400px] lg:flex-grow rounded-2xl overflow-hidden relative border border-white/5 bg-[#0a0a0b] flex items-center justify-center shadow-inner z-30 lg:z-10 sticky top-0 lg:static mt-4 lg:mt-0">
            
            {/* Background Glow Khas MRR */}
            <div className="absolute inset-0 z-0">
               <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[80px]"></div>
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px]"></div>
            </div>

            {/* Dot Grid Layer */}
            <div className="absolute inset-0 opacity-30 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
            
            {/* Background Image/Color Khusus */}
            {activeTab === 'glass' && <div className="absolute inset-0 bg-cover bg-center opacity-80 z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')" }}></div>}
            {activeTab === 'neumorphism' && <div className="absolute inset-0 z-0 transition-colors duration-500" style={{ background: neuBg }}></div>}
            {activeTab === 'shadow' && <div className="absolute inset-0 bg-slate-200 z-0 transition-colors duration-500"></div>}
            {activeTab === 'filters' && <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop" alt="Bg" className="absolute inset-0 w-full h-full object-cover z-0" style={{ filter: `blur(${filterBlur}px) brightness(${filterBright}%) contrast(${filterContrast}%) grayscale(${filterGray}%)` }} />}

            {/* THE PREVIEW ELEMENT (Smooth Morphing Transition) */}
            <div 
              className="relative z-10 flex flex-col items-center justify-center overflow-hidden"
              style={{
                display: previewShape === 'text' ? 'block' : 'flex',
                alignItems: layFlex,
                justifyContent: layFlex,
                textAlign: 'center',
                transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)', // Smooth morphing
                
                // Shape Override
                ...(previewShape === 'box' && { width: activeTab==='layout' ? `${layWidth}px` : '200px', height: activeTab==='layout' ? `${layHeight}px` : '200px', borderRadius: activeTab==='border' ? `${borRadius}px` : '24px' }),
                ...(previewShape === 'circle' && { width: '200px', height: '200px', borderRadius: '50%' }),
                ...(previewShape === 'pill' && { width: '280px', height: '100px', borderRadius: '50px' }),
                ...(previewShape === 'text' && { width: 'auto', height: 'auto', background: 'transparent', border: 'none', boxShadow: 'none' }),
                
                // Styles based on Active Tab
                ...(activeTab === 'glass' && previewShape !== 'text' ? { background: `rgba(${hexToRgb(glassColor)}, ${glassOpacity})`, backdropFilter: `blur(${glassBlur}px)`, WebkitBackdropFilter: `blur(${glassBlur}px)`, border: `1px solid rgba(255, 255, 255, ${glassOutline})`, boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' } : {}),
                ...(activeTab === 'neumorphism' && previewShape !== 'text' ? { background: neuShape === 'convex' ? `linear-gradient(145deg, ${hexToRgba(neuBg, 1.1)}, ${hexToRgba(neuBg, 0.9)})` : neuShape === 'concave' ? `linear-gradient(145deg, ${hexToRgba(neuBg, 0.9)}, ${hexToRgba(neuBg, 1.1)})` : neuBg, boxShadow: `${neuShape === 'concave' ? 'inset ' : ''}${neuDistance}px ${neuDistance}px ${neuBlur}px ${hexToRgba('#000', neuIntensity + 0.3)}, ${neuShape === 'concave' ? 'inset ' : ''}-${neuDistance}px -${neuDistance}px ${neuBlur}px ${hexToRgba('#fff', neuIntensity / 2)}` } : {}),
                ...(activeTab === 'shadow' && previewShape !== 'text' ? { background: '#ffffff', boxShadow: Array.from({length: shadowLayers}, (_, i) => `0 ${(shadowY / shadowLayers) * (i + 1)}px ${(shadowBlur / shadowLayers) * (i + 1)}px ${(shadowSpread / shadowLayers) * (i + 1)}px ${hexToRgba(shadowColor, Math.max(shadowOpacity - ((i + 1) * 0.03), 0.02))}`).join(', ') } : {}),
                ...(activeTab === 'glow' && previewShape !== 'text' ? { background: '#0A1329', border: `1px solid ${hexToRgba(glowColor, 0.5)}`, boxShadow: `0 0 ${glowBlur}px ${glowSpread}px ${hexToRgba(glowColor, glowOpacity)}, inset 0 0 15px ${hexToRgba(glowColor, glowOpacity * 0.5)}` } : {}),
                ...(activeTab === 'layout' && previewShape !== 'text' ? { background: '#06b6d4', padding: `${layPad}px` } : {}),
                ...(activeTab === 'border' && previewShape !== 'text' ? { background: 'transparent', border: `${borWidth}px ${borStyle} ${borColor}` } : {}),
                ...(activeTab === 'transform' && previewShape !== 'text' ? { background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', transform: `perspective(${transPersp}px) rotateX(${transRotX}deg) rotateY(${transRotY}deg) scale(${transScale})` } : {}),
                ...(activeTab === 'animation' && previewShape !== 'text' ? { background: 'linear-gradient(135deg, #0A1329, #0d1a38)', border: '1px solid rgba(6, 182, 212, 0.3)', animation: animType === 'float' ? `float ${animDuration}s ease-in-out infinite` : animType === 'pulse' ? `pulse-glow ${animDuration}s infinite` : `spin-slow ${animDuration}s linear infinite` } : {}),
              }}
            >
              
              {/* INNER TEXT CONTENT */}
              {previewShape === 'text' ? (
                <div className="w-full text-center">
                  {(activeTab === 'text-gradient') ? (
                    <h2 className="font-black tracking-tighter" style={{ fontSize: '48px', background: `linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
                      {previewText}
                    </h2>
                  ) : (
                    <h2 className="font-black" style={{ fontSize: `${typoSize}px`, fontWeight: typoWeight, letterSpacing: `${typoLetter}px`, color: typoColor, textShadow: `${typoShadowX}px ${typoShadowY}px ${typoShadowB}px ${hexToRgba(typoShadowC, typoShadowO)}` }}>
                      {previewText}
                    </h2>
                  )}
                </div>
              ) : (
                <span className={`font-bold tracking-widest uppercase text-xs ${(activeTab === 'shadow' || activeTab === 'layout') ? 'text-slate-800' : 'text-white'}`}>{previewText}</span>
              )}

            </div>

            {/* KEYFRAMES INJECTION */}
            {activeTab === 'animation' && (
              <style dangerouslySetInnerHTML={{__html: `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } } @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); } 50% { box-shadow: 0 0 40px 20px rgba(6, 182, 212, 0); } } @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}} />
            )}
          </div>

          {/* CSS CODE OUTPUT (Figma Developer Handoff Style) */}
          <div className="w-full bg-[#111113] rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden flex flex-col h-[200px] lg:h-[220px] shrink-0">
            
            {/* FLOATING COPY BUTTON DI DALAM KOTAK KODE */}
            <button 
              onClick={handleCopy}
              className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-500 hover:text-[#030712] hover:border-cyan-500 transition-all text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md"
            >
              {copied ? <><Icons.Check /> Copied</> : <><Icons.Copy /> Copy CSS</>}
            </button>

            <div className="flex items-center px-5 py-3 bg-[#0a0a0b] border-b border-white/5 sticky top-0">
              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Generated CSS Code</span>
            </div>
            <div className="p-5 overflow-y-auto custom-scroll flex-grow bg-[#0c0c0e]">
              <pre className="text-[11px] sm:text-xs font-mono text-cyan-200/80 leading-loose">
                <code>{cssOutput}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        /* Custom Color Range Sliders HSL */
        input[type="range"].custom-color-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 14px; height: 14px; background: white; border: 2px solid #111113; border-radius: 50%; cursor: pointer; box-shadow: 0 0 5px rgba(0,0,0,0.5);
        }
        /* Panel Scrollbar */
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      `}} />
    </div>
  );
}