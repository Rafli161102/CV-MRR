"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Icons, 
  PluginLayout, PluginBorder, PluginShapes,
  PluginTypography, PluginTextGradient, 
  PluginBackgroundGradient, 
  PluginGlassmorphism, PluginNeumorphism, PluginShadow, PluginGlow, 
  PluginTransform, PluginAnimation, PluginTransitions, PluginFilters, PluginPixelArt
} from './_components/plugins';

// =========================================================================
// THE MASTER REGISTRY (V18 Ultimate Edition)
// =========================================================================
const PLUGINS = [
  // 1. STRUCTURE
  { id: 'layout', title: 'Box Layout', icon: <Icons.Layout />, component: PluginLayout, cat: 'Structure' },
  { id: 'shapes', title: 'CSS Shapes', icon: <Icons.Shapes />, component: PluginShapes, cat: 'Structure' },
  { id: 'border', title: 'Border', icon: <Icons.Border />, component: PluginBorder, cat: 'Structure' },
  
  // 2. TYPOGRAPHY
  { id: 'typography', title: 'Multi Typo', icon: <Icons.Typography />, component: PluginTypography, cat: 'Typography' },
  { id: 'text-gradient', title: 'Txt Gradient', icon: <Icons.TextGrad />, component: PluginTextGradient, cat: 'Typography' },
  
  // 3. COLORS
  { id: 'bg-gradient', title: 'Bg Gradient', icon: <Icons.Border />, component: PluginBackgroundGradient, cat: 'Colors' },
  
  // 4. EFFECTS
  { id: 'glass', title: 'Glassmorphism', icon: <Icons.Glass />, component: PluginGlassmorphism, cat: 'Effects' },
  { id: 'neumorphism', title: 'Neumorph', icon: <Icons.Neumorphism />, component: PluginNeumorphism, cat: 'Effects' },
  { id: 'shadow', title: 'Drop Shadow', icon: <Icons.Shadow />, component: PluginShadow, cat: 'Effects' },
  { id: 'glow', title: 'Neon Glow', icon: <Icons.Glow />, component: PluginGlow, cat: 'Effects' },
  
  // 5. ADVANCED
  { id: 'transform', title: '3D Studio', icon: <Icons.Cube3D />, component: PluginTransform, cat: 'Advanced' },
  { id: 'animation', title: 'Keyframes', icon: <Icons.Animation />, component: PluginAnimation, cat: 'Advanced' },
  { id: 'transitions', title: 'Transitions', icon: <Icons.Transitions />, component: PluginTransitions, cat: 'Advanced' },
  { id: 'filters', title: 'Image Pro', icon: <Icons.Filters />, component: PluginFilters, cat: 'Advanced' },
  { id: 'pixelart', title: 'CSS Drawing', icon: <Icons.Brush />, component: PluginPixelArt, cat: 'Advanced' }
];

export default function CssStudioPage() {
  const [activeId, setActiveId] = useState('layout');

  useEffect(() => {
    // Mengunci scroll body agar aplikasi internal berfungsi seperti software native
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    // FIX LAYOUT BLANK: Membuang "fixed inset-0". 
    // Menggunakan `h-[100dvh]` dengan padding-top menyesuaikan tinggi Navbar bawaanmu (sekitar 76-88px).
    <div className="w-full h-[100dvh] pt-[76px] md:pt-[88px] flex flex-col font-sans bg-[#0a0a0b] text-[#d4d4d4] overflow-hidden box-border">
      
      {/* HEADER STUDIO ASLI (Sesuai Versi Awal) */}
      <div className="h-14 px-4 sm:px-6 border-b border-[#252526] flex items-center justify-between bg-[#111111] z-50 shrink-0 shadow-sm relative">
        <div className="flex items-center gap-4">
          <Link href="/toolkit" className="text-slate-400 hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5"><Icons.ArrowLeft /></Link>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight text-sm sm:text-base">CSS Visual <span className="text-cyan-500">Studio</span></span>
            <span className="px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded text-[8px] font-bold uppercase tracking-widest hidden sm:block">V18 Ultimate Edition</span>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-40 bg-[#0a0a0b]">
        
        {/* KOLOM 1: TOOLBAR NAVIGASI (Kategori Diurutkan) */}
        <div className="w-full lg:w-[100px] xl:w-[220px] bg-[#111111] border-b lg:border-b-0 lg:border-r border-[#252526] shrink-0 flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto [&::-webkit-scrollbar]:hidden custom-scroll z-30 shadow-md">
           {['Structure', 'Typography', 'Colors', 'Effects', 'Advanced'].map(cat => (
              <div key={cat} className="flex flex-row lg:flex-col shrink-0 lg:w-full border-r lg:border-r-0 lg:border-b border-[#252526] lg:pb-2 lg:mb-2 last:border-0">
                 <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4 px-4 hidden xl:block">{cat}</div>
                 {PLUGINS.filter(p => p.cat === cat).map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => setActiveId(p.id)} 
                      className={`flex flex-col xl:flex-row items-center xl:justify-start justify-center gap-1.5 xl:gap-3 min-w-[76px] xl:w-full p-2.5 xl:px-4 xl:py-2.5 transition-all duration-200 border-b-[3px] lg:border-b-0 lg:border-l-[3px] ${activeId === p.id ? 'bg-[#18181b] border-cyan-500 text-cyan-400' : 'bg-transparent border-transparent text-slate-400 hover:bg-[#18181b] hover:text-slate-200'}`}
                    >
                      <div className="shrink-0 w-5 h-5 flex items-center justify-center">{p.icon}</div>
                      <span className="text-[8px] xl:text-[11px] font-semibold tracking-wide text-center xl:text-left leading-tight">{p.title}</span>
                    </button>
                 ))}
              </div>
           ))}
        </div>

        {/* KOLOM 2 & 3: PLUGIN CONTENT AREA */}
        <div className="flex-1 overflow-hidden bg-[#0a0a0b] flex flex-col relative z-10">
           {PLUGINS.map(p => p.id === activeId && <p.component key={p.id} />)}
        </div>

      </div>

      {/* GLOBAL STYLES */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        input[type="range"].custom-color-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; background: white; border: 2px solid #111113; border-radius: 50%; box-shadow: 0 1px 4px rgba(0,0,0,0.3); cursor: pointer; }
        .custom-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #0ea5e9; }
      `}} />
    </div>
  );
}