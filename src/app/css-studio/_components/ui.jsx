"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons';

export const safeHex = (hex) => (typeof hex === 'string' && hex.startsWith('#') && (hex.length === 4 || hex.length === 7)) ? hex : '#000000';
export const hexToRgb = (hex) => {
  const h = safeHex(hex); let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
};
export const hexToHsl = (hex) => {
  const h_str = safeHex(hex); let r = 0, g = 0, b = 0;
  if (h_str.length === 7) { r = parseInt(h_str.slice(1, 3), 16) / 255; g = parseInt(h_str.slice(3, 5), 16) / 255; b = parseInt(h_str.slice(5, 7), 16) / 255; }
  const max = Math.max(r, g, b), min = Math.min(r, g, b); let h = 0, s = 0, l = (max + min) / 2;
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
    let { h, s, l } = hexToHsl(hex); l = Math.max(0, Math.min(100, l + percent)); return hslToHex(h, s, l);
};
export const COLOR_PRESETS = ['#ffffff', '#f1f5f9', '#1e1e1e', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

export const useMultiTouch = () => {
  const [scale, setScale] = useState(1); const [pan, setPan] = useState({ x: 0, y: 0 }); const [rotation, setRotation] = useState(0);
  const touchRef = useRef({ dist: 0, cx: 0, cy: 0, panX: 0, panY: 0, scale: 1, angle: 0, rotation: 0 });

  const getAngle = (touches) => Math.atan2(touches[0].clientY - touches[1].clientY, touches[0].clientX - touches[1].clientX) * (180 / Math.PI);
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      touchRef.current.dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      touchRef.current.cx = (e.touches[0].clientX + e.touches[1].clientX) / 2; touchRef.current.cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      touchRef.current.panX = pan.x; touchRef.current.panY = pan.y; touchRef.current.scale = scale;
      touchRef.current.angle = getAngle(e.touches); touchRef.current.rotation = rotation;
    }
  };
  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2; const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      setScale(Math.max(0.3, Math.min(touchRef.current.scale * (dist / touchRef.current.dist), 6)));
      setPan({ x: touchRef.current.panX + (cx - touchRef.current.cx), y: touchRef.current.panY + (cy - touchRef.current.cy) });
      let angleDiff = getAngle(e.touches) - touchRef.current.angle;
      if (angleDiff > 180) angleDiff -= 360; if (angleDiff < -180) angleDiff += 360;
      setRotation(touchRef.current.rotation + angleDiff);
    }
  };
  const resetView = () => { setScale(1); setPan({ x: 0, y: 0 }); setRotation(0); };
  return { scale, pan, rotation, setScale, setPan, setRotation, onTouchStart, onTouchMove, resetView };
};

export const ControlHeader = ({ title, onReset }) => (
  <div className="flex items-center justify-between pb-3 border-b border-[#1f1f1f] mb-5">
     <span className="text-[11px] font-black text-cyan-400 uppercase tracking-widest">{title}</span>
     {onReset && (
       <button onClick={onReset} className="text-[9px] text-slate-300 hover:text-white bg-[#1a1a1a] border border-[#333] hover:border-red-500/50 px-2.5 py-1.5 rounded transition-colors uppercase tracking-wider shadow-sm">Reset</button>
     )}
  </div>
);

export const PluginTip = ({ text, title = "PANDUAN" }) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex gap-3 items-start mb-6 relative shadow-sm">
      <button onClick={() => setIsVisible(false)} className="absolute top-2.5 right-2.5 text-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10 p-1 rounded-md transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div className="text-cyan-400 mt-0.5 shrink-0"><Icons.Info /></div>
      <div className="pr-5">
         <h4 className="text-[10px] font-black text-cyan-400 mb-1.5 uppercase tracking-widest">{title}</h4>
         <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{text}</p>
      </div>
    </div>
  );
};

export const FigmaSlider = ({ label, min, max, step = 1, value, onChange, unit = "" }) => {
  const [localVal, setLocalVal] = useState(value);
  useEffect(() => { setLocalVal(value); }, [value]);

  const handleBlur = () => {
    let parsed = parseFloat(localVal);
    if (isNaN(parsed)) parsed = min;
    if (parsed < min) parsed = min; if (parsed > max) parsed = max;
    setLocalVal(parsed); onChange(parsed);
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#1f1f1f] last:border-0 gap-3 sm:gap-0">
      <label className="text-[11px] font-medium text-slate-400 w-full sm:w-1/3">{label}</label>
      <div className="w-full sm:w-2/3 flex items-center gap-3">
        <input type="range" min={min} max={max} step={step} value={value || 0} onChange={(e) => onChange(Number(e.target.value) || 0)} className="w-full h-[4px] bg-[#333] rounded-lg appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110" />
        <div className="bg-[#141414] px-2 py-1.5 rounded-md border border-[#333] min-w-[70px] flex items-center justify-end shrink-0 cursor-text focus-within:border-cyan-500 transition-colors">
          <input type="number" value={localVal} onChange={(e) => setLocalVal(e.target.value)} onBlur={handleBlur} onKeyDown={(e) => {if(e.key==='Enter') e.currentTarget.blur()}} className="w-full bg-transparent text-right outline-none font-mono text-cyan-400 text-[11px] p-0 m-0" style={{ appearance: 'textfield', MozAppearance: 'textfield' }} />
          <span className="text-[10px] font-mono text-slate-500 ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export const FigmaColorPicker = ({ label, hexValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const safeHexVal = hexValue || '#ffffff';
  const [hsl, setHsl] = useState(hexToHsl(safeHexVal));
  useEffect(() => { setHsl(hexToHsl(safeHexVal)); }, [safeHexVal]);

  const handleHslChange = (part, val) => {
    const newHsl = { ...hsl, [part]: val };
    setHsl(newHsl); onChange(hslToHex(newHsl.h, newHsl.s, newHsl.l));
  };
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2"><label className="text-[11px] font-medium text-slate-400">{label}</label></div>
      <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl overflow-hidden transition-all duration-300 shadow-sm">
        <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#141414]" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md border border-white/20" style={{backgroundColor: safeHexVal}}></div>
            <div className="flex flex-col"><span className="text-[11px] font-bold text-slate-200">{label}</span><span className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">{safeHexVal}</span></div>
          </div>
          <div className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 bg-[#141414] ${isOpen ? 'max-h-[300px] border-t border-[#2a2a2a] p-4 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-4">
            <div><div className="flex justify-between mb-2"><span className="text-[10px] text-slate-400">Hue</span></div><input type="range" min="0" max="360" value={hsl.h || 0} onChange={(e) => handleHslChange('h', Number(e.target.value))} className="w-full h-2.5 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'}} /></div>
            <div><div className="flex justify-between mb-2"><span className="text-[10px] text-slate-400">Saturation</span></div><input type="range" min="0" max="100" value={hsl.s || 0} onChange={(e) => handleHslChange('s', Number(e.target.value))} className="w-full h-2.5 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #808080, ${hslToHex(hsl.h || 0, 100, 50)})`}} /></div>
            <div><div className="flex justify-between mb-2"><span className="text-[10px] text-slate-400">Lightness</span></div><input type="range" min="0" max="100" value={hsl.l || 0} onChange={(e) => handleHslChange('l', Number(e.target.value))} className="w-full h-2.5 rounded-full appearance-none cursor-pointer custom-color-slider" style={{background: `linear-gradient(to right, #000, ${hslToHex(hsl.h || 0, hsl.s || 0, 50)}, #fff)`}} /></div>
          </div>
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[#2a2a2a]">
            {COLOR_PRESETS.map((c) => (<button key={c} onClick={() => onChange(c)} className={`w-6 h-6 rounded-md border hover:scale-110 ${safeHexVal===c ? 'border-cyan-400 scale-110' : 'border-[#333]'}`} style={{ backgroundColor: c }} />))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FigmaSelect = ({ label, options = [], value, onChange }) => (
  <div className="mb-5">
     <label className="text-[11px] font-medium text-slate-400 block mb-2">{label}</label>
     <div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-[#2a2a2a] overflow-x-auto custom-scroll">
        {options.map(opt => (
           <button key={opt} onClick={() => onChange(opt)} className={`flex-1 min-w-[70px] py-2 px-2 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${value === opt ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-slate-500 hover:text-slate-300'}`}>{opt}</button>
        ))}
     </div>
  </div>
);

export const FigmaTextInput = ({ label, value, onChange, placeholder = "Ketik sesuatu...", isTextArea = false }) => (
  <div className="mb-5">
     <label className="text-[11px] font-medium text-slate-400 block mb-2">{label}</label>
     {isTextArea ? (
       <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-24 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[12px] text-white outline-none focus:border-cyan-500 transition-all resize-none" />
     ) : (
       <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[12px] text-white outline-none focus:border-cyan-500 transition-all" />
     )}
  </div>
);

export const FigmaCustomDropdown = ({ label, groups = {}, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false); const dropdownRef = useRef(null);
  let currentName = value || 'Select...';
  for (const group in groups) { const found = groups[group].find(opt => opt.val === value); if (found) { currentName = found.name; break; } }
  useEffect(() => { const handleClickOutside = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false); }; document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }, []);
  return (
    <div className="mb-5 relative" ref={dropdownRef}>
      <label className="text-[11px] font-medium text-slate-400 block mb-2">{label}</label>
      <div onClick={() => setIsOpen(!isOpen)} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer hover:border-[#444]">
        <span className="text-[11px] text-white font-mono">{currentName}</span>
        <div className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></div>
      </div>
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#141414] border border-[#2a2a2a] rounded-xl shadow-2xl max-h-[250px] overflow-y-auto custom-scroll">
          {Object.entries(groups).map(([groupName, options]) => (
            <div key={groupName}>
              <div className="px-4 py-2.5 bg-[#0a0a0a] text-[9px] font-bold text-cyan-500 uppercase tracking-widest sticky top-0 border-b border-[#2a2a2a]">{groupName}</div>
              {options.map(opt => (
                <div key={opt.val} onClick={() => { onChange(opt.val); setIsOpen(false); }} className={`px-5 py-3 text-[11px] cursor-pointer hover:bg-[#1f1f1f] font-mono ${value === opt.val ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500' : 'text-slate-300'}`}>{opt.name}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CodeOutput = ({ cssCode, htmlCode, jsxCode, isMobileTab }) => {
  const [copied, setCopied] = useState(false); const [lang, setLang] = useState('css');
  const getActiveCode = () => { if (lang === 'css') return cssCode || '/* CSS Output */'; if (lang === 'html') return htmlCode || ''; return jsxCode || '// JSX Output'; };
  const handleCopy = () => { navigator.clipboard.writeText(getActiveCode()); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const formattedCode = getActiveCode().replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return (
    <div className={`w-full h-full bg-[#0a0a0a] relative flex flex-col overflow-hidden ${isMobileTab ? '' : 'border-t lg:border border-[#1f1f1f] lg:rounded-2xl shadow-xl'}`}>
       <div className="flex justify-between items-center px-3 py-2.5 border-b border-[#1f1f1f] bg-[#141414] shrink-0 overflow-x-auto custom-scroll">
          <div className="flex gap-1.5">
             {['css', 'html', 'jsx'].map(l => (
               <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-[#2a2a2a] text-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-[#1f1f1f]'}`}>{l === 'jsx' ? 'React' : l}</button>
             ))}
          </div>
          <button onClick={handleCopy} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all text-[10px] font-bold uppercase shrink-0">
            {copied ? <><Icons.Check /> Copied</> : <><Icons.Copy /> Copy</>}
          </button>
       </div>
       <div className={`p-5 overflow-y-auto flex-grow bg-[#050505] custom-scroll ${isMobileTab ? 'pb-32' : ''}`}>
          <pre className="text-[12px] font-mono text-slate-300 leading-relaxed whitespace-pre-wrap"><code dangerouslySetInnerHTML={{ __html: formattedCode }} /></pre>
       </div>
    </div>
  )
};

export const WorkspaceLayout = ({ name, controls, preview, cssOutput, htmlOutput, jsxOutput, bgType = 'grid', bgHex }) => {
  const [mobileTab, setMobileTab] = useState('design'); 
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
         <div className="h-[300px] shrink-0 p-4 bg-[#0a0a0a]"><CodeOutput cssCode={cssOutput} htmlCode={htmlOutput} jsxCode={jsxOutput} /></div>
       </div>

       <div className="flex-1 lg:w-[420px] lg:flex-none bg-[#0a0a0a] flex flex-col z-20 overflow-hidden shadow-2xl relative">
         <div className="px-5 py-4 border-b border-[#1f1f1f] bg-[#0a0a0a] shrink-0 z-10 relative">
            <h2 className="text-[13px] font-black text-white uppercase tracking-widest hidden lg:flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span> {name} Setup
            </h2>
            <div className="flex lg:hidden bg-[#050505] p-1.5 rounded-xl border border-[#1f1f1f] w-full gap-2">
              <button onClick={() => setMobileTab('design')} className={`flex-1 py-3 rounded-lg text-[11px] font-bold uppercase transition-all ${mobileTab === 'design' ? 'bg-[#1f1f1f] text-white shadow-sm border border-[#333]' : 'text-slate-500 hover:text-slate-300'}`}>Desain Tools</button>
              <button onClick={() => setMobileTab('code')} className={`flex-1 py-3 rounded-lg text-[11px] font-bold uppercase transition-all ${mobileTab === 'code' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}>Kode Output</button>
            </div>
         </div>
         <div className="flex-1 overflow-y-auto custom-scroll relative bg-[#0a0a0a]">
            <div className={`p-5 lg:p-7 lg:block ${mobileTab === 'design' ? 'block' : 'hidden'}`}>{controls}<div className="h-40 lg:h-12"></div></div>
            <div className={`h-full lg:hidden ${mobileTab === 'code' ? 'block' : 'hidden'}`}><CodeOutput cssCode={cssOutput} htmlCode={htmlOutput} jsxCode={jsxOutput} isMobileTab={true} /></div>
         </div>
       </div>
    </div>
  );
};
