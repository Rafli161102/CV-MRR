"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// =========================================================================
// IKON SVG PROFESIONAL
// =========================================================================
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export default function CssStudioPage() {
  // State untuk Tab Aktif
  const [activeTab, setActiveTab] = useState('glass');
  const [copied, setCopied] = useState(false);

  // --- STATE: GLASSMORPHISM ---
  const [glassBlur, setGlassBlur] = useState(12);
  const [glassOpacity, setGlassOpacity] = useState(0.2);
  const [glassColor, setGlassColor] = useState('255, 255, 255');
  const [glassOutline, setGlassOutline] = useState(0.1);

  // --- STATE: NEUMORPHISM (Dark Mode) ---
  const [neuDistance, setNeoDistance] = useState(8);
  const [neuBlur, setNeoBlur] = useState(16);
  const [neuIntensity, setNeoIntensity] = useState(0.15);
  const [neuShape, setNeoShape] = useState('flat'); // flat, concave, convex

  // --- STATE: SMOOTH SHADOW ---
  const [shadowLayers, setShadowLayers] = useState(3);
  const [shadowY, setShadowY] = useState(10);
  const [shadowBlur, setShadowBlur] = useState(20);
  const [shadowSpread, setShadowSpread] = useState(-5);
  const [shadowOpacity, setShadowOpacity] = useState(0.3);

  // --- STATE: ANIMATIONS ---
  const [animType, setAnimType] = useState('float');
  const [animDuration, setAnimDuration] = useState(3);

  // FUNGSI: Mengelola penyalinan kode ke clipboard
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
background: rgba(${glassColor}, ${glassOpacity});
backdrop-filter: blur(${glassBlur}px);
-webkit-backdrop-filter: blur(${glassBlur}px);
border: 1px solid rgba(255, 255, 255, ${glassOutline});
border-radius: 24px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);`;

      case 'neumorphism':
        let bg = '#0A1329';
        let inset = neuShape === 'flat' ? '' : 'inset';
        let lightShadow = `${inset ? 'inset ' : ''}-${neuDistance}px -${neuDistance}px ${neuBlur}px rgba(255, 255, 255, ${neuIntensity / 2})`;
        let darkShadow = `${inset ? 'inset ' : ''}${neuDistance}px ${neuDistance}px ${neuBlur}px rgba(0, 0, 0, ${neuIntensity + 0.3})`;
        
        let shapeGradient = '';
        if (neuShape === 'convex') shapeGradient = `background: linear-gradient(145deg, #0b152c, #091125);`;
        if (neuShape === 'concave') shapeGradient = `background: linear-gradient(145deg, #091125, #0b152c);`;

        return `/* Dark Neumorphism CSS */
${shapeGradient || `background: ${bg};`}
border-radius: 24px;
box-shadow: ${darkShadow},
            ${lightShadow};`;

      case 'shadow':
        // Membuat bayangan berlapis (Smooth Shadow) untuk hasil realistis
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

      case 'animation':
        let animCode = '';
        if (animType === 'float') {
          animCode = `@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.animate-element {
  animation: float ${animDuration}s ease-in-out infinite;
}`;
        } else if (animType === 'pulse') {
          animCode = `@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }
  50% { box-shadow: 0 0 20px 10px rgba(6, 182, 212, 0); }
}
.animate-element {
  animation: pulse-glow ${animDuration}s infinite;
}`;
        } else if (animType === 'spin') {
          animCode = `@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-element {
  animation: spin-slow ${animDuration}s linear infinite;
}`;
        }
        return `/* CSS Keyframes Animation */\n${animCode}`;
      default:
        return '';
    }
  };

  const cssOutput = generateCSS();

  // =========================================================================
  // KOMPONEN SLIDER KUSTOM
  // =========================================================================
  const RangeSlider = ({ label, min, max, step, value, onChange, unit = "" }) => (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</label>
        <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md">{value}{unit}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all"
      />
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
        
        {/* NAVIGASI & HEADER */}
        <div className="mb-10 sm:mb-12 reveal stagger-1">
          <Link href="/toolkit" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0A1329]/50 backdrop-blur-sm border border-white/5 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-[#0A1329] shadow-lg transition-all duration-300 group w-fit">
            <ArrowLeftIcon />
            Kembali ke Toolkit
          </Link>
        </div>

        <div className="mb-12 reveal stagger-1">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-4 sm:mb-6 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shrink-0"></span>
            Web Developer Tool
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-[1.1]">
            CSS Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Studio.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-medium max-w-2xl">
            Generator interaktif untuk membuat kode efek visual modern. Atur parameter di sebelah kiri, lihat hasilnya secara real-time, dan salin kode CSS-nya langsung ke proyek Anda.
          </p>
        </div>

        {/* TABS (Kategori Generator) */}
        <div className="mb-8 reveal stagger-2 relative w-full -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="flex overflow-x-auto gap-2.5 sm:gap-3 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
            {[
              { id: 'glass', name: 'Glassmorphism' },
              { id: 'neumorphism', name: 'Neumorphism' },
              { id: 'shadow', name: 'Smooth Shadow' },
              { id: 'animation', name: 'Animations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase transition-all duration-300 snap-center border ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-[#030712] border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-[#0A1329]/80 text-slate-400 border-white/5 hover:border-cyan-500/30 hover:bg-[#0A1329]'
                }`}
              >
                {tab.name}
              </button>
            ))}
            <div className="w-4 shrink-0 sm:hidden"></div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* WORKSPACE AREA (GOLDEN RATIO: 38.2% Controls, 61.8% View) */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start reveal stagger-3">
          
          {/* PANEL KONTROL (KIRI - 38.2%) */}
          <div className="w-full lg:w-[38.2%] bg-[#0A1329]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h2 className="text-lg font-black text-white mb-6 tracking-tight border-b border-white/10 pb-4">
              Konfigurasi Parameter
            </h2>

            {/* TAB: GLASSMORPHISM */}
            {activeTab === 'glass' && (
              <div className="space-y-2">
                <RangeSlider label="Blur Level" min="0" max="40" step="1" value={glassBlur} onChange={setGlassBlur} unit="px" />
                <RangeSlider label="Opacity" min="0" max="1" step="0.05" value={glassOpacity} onChange={setGlassOpacity} />
                <RangeSlider label="Outline (Border)" min="0" max="0.5" step="0.05" value={glassOutline} onChange={setGlassOutline} />
                
                <div className="mb-5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Tipe Kaca</label>
                  <div className="flex gap-3">
                    <button onClick={() => setGlassColor('255, 255, 255')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${glassColor === '255, 255, 255' ? 'bg-white/20 text-white border-white/40' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/20'}`}>Light Glass</button>
                    <button onClick={() => setGlassColor('0, 0, 0')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${glassColor === '0, 0, 0' ? 'bg-black/50 text-white border-white/40' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/20'}`}>Dark Glass</button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: NEUMORPHISM */}
            {activeTab === 'neumorphism' && (
              <div className="space-y-2">
                <div className="mb-6 p-4 bg-cyan-900/20 border border-cyan-500/20 rounded-xl text-xs text-cyan-300 leading-relaxed">
                  <span className="font-bold">Info:</span> Neumorphism bekerja paling baik jika warna objek sama dengan warna latar belakang. Generator ini dioptimasi untuk warna Dark Mode MRR Theme.
                </div>
                <RangeSlider label="Distance" min="2" max="30" step="1" value={neuDistance} onChange={setNeoDistance} unit="px" />
                <RangeSlider label="Blur" min="0" max="60" step="1" value={neuBlur} onChange={setNeoBlur} unit="px" />
                <RangeSlider label="Intensity (Shadow)" min="0.05" max="0.5" step="0.05" value={neuIntensity} onChange={setNeoIntensity} />
                
                <div className="mb-5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Shape Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['flat', 'concave', 'convex'].map(shape => (
                      <button key={shape} onClick={() => setNeoShape(shape)} className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${neuShape === shape ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/20'}`}>{shape}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SHADOW */}
            {activeTab === 'shadow' && (
              <div className="space-y-2">
                <RangeSlider label="Layers (Smoothness)" min="1" max="6" step="1" value={shadowLayers} onChange={setShadowLayers} />
                <RangeSlider label="Y Offset (Height)" min="-50" max="50" step="1" value={shadowY} onChange={setShadowY} unit="px" />
                <RangeSlider label="Blur Radius" min="0" max="100" step="1" value={shadowBlur} onChange={setShadowBlur} unit="px" />
                <RangeSlider label="Spread" min="-20" max="20" step="1" value={shadowSpread} onChange={setShadowSpread} unit="px" />
                <RangeSlider label="Base Opacity" min="0.1" max="1" step="0.05" value={shadowOpacity} onChange={setShadowOpacity} />
              </div>
            )}

            {/* TAB: ANIMATION */}
            {activeTab === 'animation' && (
              <div className="space-y-2">
                <div className="mb-6">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Pilih Animasi</label>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'float', name: 'Floating (Mengambang)' },
                      { id: 'pulse', name: 'Pulse Glow (Berdenyut)' },
                      { id: 'spin', name: 'Spin (Berputar Lambat)' }
                    ].map(anim => (
                      <button key={anim.id} onClick={() => setAnimType(anim.id)} className={`px-4 py-3 rounded-xl text-sm font-bold text-left transition-all border ${animType === anim.id ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-transparent text-slate-300 border-white/10 hover:bg-white/5'}`}>
                        {anim.name}
                      </button>
                    ))}
                  </div>
                </div>
                <RangeSlider label="Duration (Kecepatan)" min="0.5" max="10" step="0.5" value={animDuration} onChange={setAnimDuration} unit="s" />
              </div>
            )}

          </div>

          {/* STAGE & KODE (KANAN - 61.8%) */}
          <div className="w-full lg:w-[61.8%] flex flex-col gap-6">
            
            {/* STAGE: LIVE PREVIEW AREA */}
            <div className="w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl flex items-center justify-center p-8">
              
              {/* Background Panggung (Berubah Sesuai Tab) */}
              {activeTab === 'glass' && (
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')" }}></div>
              )}
              {activeTab === 'neumorphism' && (
                <div className="absolute inset-0 bg-[#0A1329] z-0"></div>
              )}
              {activeTab === 'shadow' && (
                <div className="absolute inset-0 bg-slate-100 z-0"></div>
              )}
              {activeTab === 'animation' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950 to-indigo-950 z-0 flex items-center justify-center">
                   <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px]"></div>
                </div>
              )}

              {/* OBJEK YANG DIRENDER (THE ELEMENT) */}
              <div className="relative z-10 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] flex items-center justify-center text-center p-6 transition-all duration-300"
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
                  ...(activeTab === 'animation' ? {
                    background: '#0A1329',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '24px',
                    animation: animType === 'float' ? `float ${animDuration}s ease-in-out infinite` : 
                               animType === 'pulse' ? `pulse-glow ${animDuration}s infinite` : 
                               `spin-slow ${animDuration}s linear infinite`
                  } : {})
                }}
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 mx-auto rounded-xl ${activeTab === 'shadow' ? 'bg-cyan-500' : 'bg-cyan-500/20'} flex items-center justify-center`}>
                    <span className={`${activeTab === 'shadow' ? 'text-white' : 'text-cyan-400'}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg></span>
                  </div>
                  <h3 className={`font-bold ${activeTab === 'shadow' ? 'text-slate-800' : 'text-white'}`}>Preview</h3>
                </div>
              </div>

              {/* SUNTIKAN CSS KHUSUS ANIMASI (Hanya berlaku untuk preview) */}
              {activeTab === 'animation' && (
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4); }
                    50% { box-shadow: 0 0 30px 15px rgba(6, 182, 212, 0); }
                  }
                  @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                `}} />
              )}
            </div>

            {/* KODE CSS RESULT (Syntax Highlight Style) */}
            <div className="w-full bg-[#050A14] rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
              <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase">CSS Code</span>
                </div>
                
                <button 
                  onClick={() => handleCopy(cssOutput)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-xs font-bold"
                >
                  {copied ? <><CheckIcon /> Tersalin</> : <><CopyIcon /> Salin Kode</>}
                </button>
              </div>
              
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm font-mono text-cyan-50 leading-relaxed">
                  <code>{cssOutput}</code>
                </pre>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
          }
