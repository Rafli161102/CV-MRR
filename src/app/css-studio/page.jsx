"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from './_components/icons';
import { 
  PluginLayout, PluginBorder, PluginShapes, PluginTypography, PluginTextGradient, 
  PluginBackgroundGradient, PluginGlassmorphism, PluginNeumorphism, PluginShadow, 
  PluginGlow, PluginFilters, PluginTransform, PluginAnimation, PluginTransitions, PluginPixelDrawing
} from './_components/plugins';

const CATEGORIES = [
  { id: 'Structure', title: 'Structure', icon: Icons.Layout },
  { id: 'Typography', title: 'Typography', icon: Icons.Typography },
  { id: 'Colors', title: 'Colors', icon: Icons.Picker },
  { id: 'Effects', title: 'Effects', icon: Icons.Glow },
  { id: 'Advanced', title: 'Advanced', icon: Icons.Cube3D }
];

const PLUGINS = [
  { id: 'layout', title: 'Box Layout', Icon: Icons.Layout, Component: PluginLayout, cat: 'Structure' },
  { id: 'shapes', title: 'CSS Shapes', Icon: Icons.Shapes, Component: PluginShapes, cat: 'Structure' },
  { id: 'border', title: 'Border Style', Icon: Icons.Border, Component: PluginBorder, cat: 'Structure' },
  { id: 'typography', title: 'Multi Typo', Icon: Icons.Typography, Component: PluginTypography, cat: 'Typography' },
  { id: 'text-gradient', title: 'Text Grad', Icon: Icons.TextGrad, Component: PluginTextGradient, cat: 'Typography' },
  { id: 'bg-gradient', title: 'BG Gradient', Icon: Icons.Border, Component: PluginBackgroundGradient, cat: 'Colors' },
  { id: 'glass', title: 'Glass Effect', Icon: Icons.Glass, Component: PluginGlassmorphism, cat: 'Effects' },
  { id: 'neumorphism', title: 'Neumorphism', Icon: Icons.Neumorphism, Component: PluginNeumorphism, cat: 'Effects' },
  { id: 'shadow', title: 'Drop Shadow', Icon: Icons.Shadow, Component: PluginShadow, cat: 'Effects' },
  { id: 'glow', title: 'Neon Glow', Icon: Icons.Glow, Component: PluginGlow, cat: 'Effects' },
  { id: 'filters', title: 'Image Pro', Icon: Icons.Filters, Component: PluginFilters, cat: 'Advanced' },
  { id: 'transform', title: '3D Studio', Icon: Icons.Cube3D, Component: PluginTransform, cat: 'Advanced' },
  { id: 'animation', title: 'Keyframes', Icon: Icons.Animation, Component: PluginAnimation, cat: 'Advanced' },
  { id: 'transitions', title: 'Transitions', Icon: Icons.Transitions, Component: PluginTransitions, cat: 'Advanced' },
  { id: 'pixelart', title: 'Pixel Draw', Icon: Icons.Brush, Component: PluginPixelDrawing, cat: 'Advanced' } // NAMA SESUAI PLUGINMAX
];

export default function CssStudioPage() {
  const [activeCat, setActiveCat] = useState('Structure');
  const [activeId, setActiveId] = useState('layout');
  const [animKey, setAnimKey] = useState(0); // Trigger Animasi Transisi
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handlePluginChange = (id) => {
    if (activeId !== id) {
       setActiveId(id);
       setAnimKey(prev => prev + 1); // Me-restart animasi fade-in
    }
  };

  const handleCategoryChange = (catId) => {
    if (activeCat !== catId) {
      setActiveCat(catId);
      const firstPlugin = PLUGINS.find(p => p.cat === catId);
      if (firstPlugin) handlePluginChange(firstPlugin.id);
    }
  };

  const currentPlugins = PLUGINS.filter(p => p.cat === activeCat);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] flex flex-col font-sans bg-[#050505] text-[#d4d4d4] overflow-hidden z-[90]">
      
      {/* APP BAR HEADER */}
      <div className="h-14 px-4 border-b border-[#1f1f1f] flex items-center justify-between bg-[#0a0a0a] shrink-0 shadow-md z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/toolkit')} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white bg-[#141414] hover:bg-[#1f1f1f] rounded-full transition-all shadow-sm border border-[#2a2a2a]">
            <Icons.ArrowLeft />
          </button>
          <span className="font-black text-white tracking-wide text-sm sm:text-base">Dev Visual <span className="text-cyan-500">Studio</span></span>
        </div>
      </div>

      {/* MOBILE NAV: HORIZONTAL SLIDER */}
      <div className="flex lg:hidden flex-col bg-[#0a0a0a] border-b border-[#1f1f1f] shrink-0 z-40 shadow-xl">
        <div className="flex overflow-x-auto custom-scroll px-3 pt-3 pb-2 gap-2 snap-x">
          {CATEGORIES.map(cat => (
              <button 
                key={cat.id} onClick={() => handleCategoryChange(cat.id)} 
                className={`snap-start shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 ${activeCat === cat.id ? 'bg-[#141414] text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-[#0a0a0a] text-slate-500 border-[#1f1f1f]'}`}
              >
                <div className="w-4 h-4"><cat.icon /></div>
                <span className="text-[11px] font-black uppercase tracking-wider">{cat.title}</span>
              </button>
          ))}
        </div>
        <div className="flex overflow-x-auto custom-scroll px-3 py-2 gap-2 bg-[#050505] shadow-inner border-t border-[#1a1a1a]">
          {currentPlugins.map(plugin => (
               <button 
                 key={plugin.id} onClick={() => handlePluginChange(plugin.id)} 
                 className={`shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 border ${activeId === plugin.id ? 'bg-[#1a1a1a] text-white border-cyan-500/50 shadow-md' : 'bg-transparent text-slate-500 border-transparent hover:bg-[#141414]'}`}
               >
                 <div className="w-4 h-4"><plugin.Icon /></div>
                 <span className="text-[10px] font-bold tracking-wide whitespace-nowrap">{plugin.title}</span>
               </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-row overflow-hidden relative z-40 bg-[#050505]">
        
        {/* DESKTOP NAV: SIDEBAR */}
        <div className="hidden lg:flex w-[240px] bg-[#0a0a0a] border-r border-[#1f1f1f] shrink-0 flex-col overflow-y-auto custom-scroll z-30 shadow-md">
           {CATEGORIES.map(cat => (
              <div key={cat.id} className="flex flex-col w-full border-b border-[#1f1f1f] pb-3 mb-3 last:border-0">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 mt-5 px-5 flex items-center gap-2">
                    <cat.icon /> {cat.title}
                 </div>
                 {PLUGINS.filter(p => p.cat === cat.id).map(plugin => (
                    <button 
                      key={plugin.id} onClick={() => handlePluginChange(plugin.id)} 
                      className={`flex items-center justify-start gap-3 w-full px-6 py-3 transition-all duration-200 border-l-[4px] ${activeId === plugin.id ? 'bg-[#141414] border-cyan-500 text-cyan-400 shadow-sm' : 'bg-transparent border-transparent text-slate-400 hover:bg-[#141414] hover:text-slate-200'}`}
                    >
                      <div className="w-4 h-4"><plugin.Icon /></div>
                      <span className="text-[12px] font-bold tracking-wide leading-tight">{plugin.title}</span>
                    </button>
                 ))}
              </div>
           ))}
        </div>
        
        {/* KONTEN PLUGIN (Ditambah key untuk me-restart animasi saat ganti alat) */}
        <div key={animKey} className="flex-1 overflow-hidden bg-[#050505] flex flex-col relative z-10 animate-fade-in-fast">
           {PLUGINS.map(plugin => {
              if (plugin.id !== activeId) return null;
              const ActivePlugin = plugin.Component;
              return <ActivePlugin key={plugin.id} />;
           })}
        </div>
      </div>

      <style>{`
        .animate-fade-in-fast { animation: fadeInFast 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes fadeInFast { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        input[type="range"].custom-color-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; background: white; border: 2px solid #111113; border-radius: 50%; box-shadow: 0 1px 4px rgba(0,0,0,0.3); cursor: pointer; }
        .custom-scroll::-webkit-scrollbar { height: 0px; width: 4px; display: none; }
        .custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 10px; }
      `}</style>
    </div>
  );
}
