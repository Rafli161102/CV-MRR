"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Import Komponen dari folder _components
import { Icons } from './_components/shared';
import { PluginLayout, PluginBorder, PluginTypography, PluginTextGradient, PluginGlassmorphism, PluginNeumorphism, PluginShadow, PluginGlow, PluginFilters, PluginTransform, PluginAnimation } from './_components/plugins';

// =========================================================================
// THE MASTER REGISTRY (Sistem Plugin Pusat)
// =========================================================================
const PLUGINS = [
  { id: 'text-gradient', title: 'Txt Gradient', icon: <Icons.TextGrad />, component: PluginTextGradient, cat: 'Text' },
  { id: 'typography', title: 'Typography', icon: <Icons.Typography />, component: PluginTypography, cat: 'Text' },
  { id: 'layout', title: 'Box Layout', icon: <Icons.Layout />, component: PluginLayout, cat: 'Structure' },
  { id: 'border', title: 'Border', icon: <Icons.Border />, component: PluginBorder, cat: 'Structure' },
  { id: 'glass', title: 'Glassmorphism', icon: <Icons.Glass />, component: PluginGlassmorphism, cat: 'Effects' },
  { id: 'neumorphism', title: 'Neumorph', icon: <Icons.Neumorphism />, component: PluginNeumorphism, cat: 'Effects' },
  { id: 'shadow', title: 'Shadow', icon: <Icons.Shadow />, component: PluginShadow, cat: 'Effects' },
  { id: 'glow', title: 'Neon Glow', icon: <Icons.Glow />, component: PluginGlow, cat: 'Effects' },
  { id: 'filters', title: 'Image Filters', icon: <Icons.Filters />, component: PluginFilters, cat: 'Advanced' },
  { id: 'transform', title: '3D Move', icon: <Icons.Cube3D />, component: PluginTransform, cat: 'Advanced' },
  { id: 'animation', title: 'Animate', icon: <Icons.Animation />, component: PluginAnimation, cat: 'Advanced' }
];

export default function CssStudioPage() {
  const [activeId, setActiveId] = useState('text-gradient');

  return (
    // FIX BUG NAV & SCROLL: 
    // - pt-[90px] didorong sangat jauh agar bebas hambatan Navbar.
    // - overflow-y-auto memungkinkan layar HP untuk di-scroll layaknya halaman normal (mencegah kepotong).
    <div className="h-[100dvh] w-full flex flex-col font-sans bg-[#111111] text-[#d4d4d4] overflow-hidden pt-[90px] sm:pt-[100px]">
      
      {/* HEADER NAV (Studio Header) */}
      <div className="h-14 px-4 sm:px-6 border-b border-[#333333] flex items-center justify-between bg-[#252526] z-50 shrink-0 shadow-sm relative">
        <div className="flex items-center gap-4">
          <Link href="/toolkit" className="text-slate-400 hover:text-white transition-colors"><Icons.ArrowLeft /></Link>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight text-sm sm:text-base">CSS Visual <span className="text-cyan-500">Studio</span></span>
            <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-[8px] font-bold uppercase tracking-widest hidden sm:block">V11 Enterprise Plugin Mode</span>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE - FIX BUG SCROLL (Di Mobile ini jadi Parent Scroll) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative z-40 custom-scroll">
        
        {/* KOLOM 1: TOOLBAR (Fixed Top di HP, Kiri di Desktop) */}
        <div className="w-full lg:w-[60px] xl:w-[220px] bg-[#18181b] border-b lg:border-b-0 lg:border-r border-[#252526] shrink-0 flex flex-row lg:flex-col lg:gap-1 overflow-x-auto lg:overflow-y-auto p-2 lg:p-3 [&::-webkit-scrollbar]:hidden sticky top-0 lg:static z-50 shadow-md lg:shadow-none">
           {['Structure', 'Text', 'Effects', 'Advanced'].map(cat => (
              <div key={cat} className="flex flex-row lg:flex-col gap-1 shrink-0">
                 <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1 mt-3 px-2 hidden xl:block">{cat}</div>
                 {PLUGINS.filter(p => p.cat === cat).map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => setActiveId(p.id)} 
                      className={`flex items-center gap-3 w-auto xl:w-full p-3 lg:px-3 lg:py-2.5 rounded-none lg:rounded-lg transition-all duration-200 border-b-[3px] lg:border-b-0 lg:border-l-[3px] shrink-0 pointer-events-auto ${activeId === p.id ? 'bg-[#2c2c2e] border-cyan-500 text-white shadow-sm' : 'bg-transparent border-transparent text-slate-400 hover:bg-[#2c2c2e]/50 hover:text-slate-200'}`}
                    >
                      <div className="shrink-0">{p.icon}</div>
                      <span className="text-[10px] font-semibold tracking-wide hidden xl:block whitespace-nowrap">{p.title}</span>
                    </button>
                 ))}
              </div>
           ))}
        </div>

        {/* KOLOM 2 & 3: PLUGIN CONTENT AREA */}
        <div className="flex-1 bg-[#111111] lg:p-6 p-0 flex flex-col relative z-10">
           {PLUGINS.map(p => p.id === activeId && <p.component key={p.id} />)}
        </div>

      </div>

      {/* Global CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        input[type="range"].custom-color-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; background: white; border: 2px solid #111113; border-radius: 50%; cursor: pointer; box-shadow: 0 0 5px rgba(0,0,0,0.8); }
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #333333; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #0ea5e9; }
      `}} />
    </div>
  );
}
