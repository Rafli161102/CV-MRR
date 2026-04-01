"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from './_components/icons';
import { 
  PluginLayout, PluginBorder, PluginShapes, PluginTypography, PluginTextGradient, 
  PluginBackgroundGradient, PluginGlassmorphism, PluginNeumorphism, PluginShadow, 
  PluginGlow, PluginFilters, PluginTransform, PluginAnimation, PluginTransitions, PluginPixelDrawing
} from './_components/plugins';

const PLUGINS = [
  { id: 'layout', title: 'Box Layout', Icon: Icons.Layout, Component: PluginLayout, cat: 'Structure' },
  { id: 'shapes', title: 'CSS Shapes', Icon: Icons.Shapes, Component: PluginShapes, cat: 'Structure' },
  { id: 'border', title: 'Border', Icon: Icons.Border, Component: PluginBorder, cat: 'Structure' },
  { id: 'typography', title: 'Multi Typo', Icon: Icons.Typography, Component: PluginTypography, cat: 'Typography' },
  { id: 'text-gradient', title: 'Txt Gradient', Icon: Icons.TextGrad, Component: PluginTextGradient, cat: 'Typography' },
  { id: 'bg-gradient', title: 'Bg Gradient', Icon: Icons.Border, Component: PluginBackgroundGradient, cat: 'Colors' },
  { id: 'glass', title: 'Glassmorphism', Icon: Icons.Glass, Component: PluginGlassmorphism, cat: 'Effects' },
  { id: 'neumorphism', title: 'Neumorph', Icon: Icons.Neumorphism, Component: PluginNeumorphism, cat: 'Effects' },
  { id: 'shadow', title: 'Drop Shadow', Icon: Icons.Shadow, Component: PluginShadow, cat: 'Effects' },
  { id: 'glow', title: 'Neon Glow', Icon: Icons.Glow, Component: PluginGlow, cat: 'Effects' },
  { id: 'filters', title: 'Image Pro', Icon: Icons.Filters, Component: PluginFilters, cat: 'Advanced' },
  { id: 'transform', title: '3D Studio', Icon: Icons.Cube3D, Component: PluginTransform, cat: 'Advanced' },
  { id: 'animation', title: 'Keyframes', Icon: Icons.Animation, Component: PluginAnimation, cat: 'Advanced' },
  { id: 'transitions', title: 'Transitions', Icon: Icons.Transitions, Component: PluginTransitions, cat: 'Advanced' },
  { id: 'pixelart', title: 'Pixel Drawing', Icon: Icons.Brush, Component: PluginPixelDrawing, cat: 'Advanced' }
];

export default function CssStudioPage() {
  const [activeId, setActiveId] = useState('layout');
  const router = useRouter();

  useEffect(() => {
    // Kunci scroll body
    document.body.style.overflow = 'hidden';
    // Force scroll ke paling atas (berjaga-jaga jika browser menyimpan history scroll)
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    // FIX BUG PENTING: Tambahkan `fixed inset-0 z-[90]` di sini.
    // Ini akan memaksa aplikasi membentang penuh di layar dan mengabaikan padding dari layout.jsx!
    <div className="fixed inset-0 w-full h-[100dvh] flex flex-col font-sans bg-[#050505] text-[#d4d4d4] overflow-hidden box-border z-[90]">
      
      {/* HEADER STUDIO */}
      <div className="h-14 px-4 sm:px-6 border-b border-[#1f1f1f] flex items-center justify-between bg-[#0a0a0a] z-50 shrink-0 shadow-sm relative">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/toolkit')} className="text-slate-400 hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
            <Icons.ArrowLeft />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight text-sm sm:text-base">Dev Visual <span className="text-cyan-500">Studio</span></span>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-40 bg-[#050505]">
        
        {/* NAVIGASI KIRI */}
        <div className="w-full lg:w-[100px] xl:w-[220px] bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-[#1f1f1f] shrink-0 flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto [&::-webkit-scrollbar]:hidden custom-scroll z-30 shadow-md">
           {['Structure', 'Typography', 'Colors', 'Effects', 'Advanced'].map(cat => (
              <div key={cat} className="flex flex-row lg:flex-col shrink-0 lg:w-full border-r lg:border-r-0 lg:border-b border-[#1f1f1f] lg:pb-2 lg:mb-2 last:border-0">
                 <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4 px-4 hidden xl:block">{cat}</div>
                 {PLUGINS.filter(p => p.cat === cat).map(plugin => (
                    <button 
                      key={plugin.id} 
                      onClick={() => setActiveId(plugin.id)} 
                      className={`flex flex-col xl:flex-row items-center xl:justify-start justify-center gap-1.5 xl:gap-3 min-w-[76px] xl:w-full p-2.5 xl:px-4 xl:py-2.5 transition-all duration-200 border-b-[3px] lg:border-b-0 lg:border-l-[3px] rounded-lg lg:rounded-none lg:mx-0 mx-1 my-1 lg:my-0 ${activeId === plugin.id ? 'bg-[#141414] border-cyan-500 text-cyan-400' : 'bg-transparent border-transparent text-slate-400 hover:bg-[#141414] hover:text-slate-200'}`}
                    >
                      <div className="shrink-0 w-5 h-5 flex items-center justify-center"><plugin.Icon /></div>
                      <span className="text-[8px] xl:text-[11px] font-medium tracking-wide text-center xl:text-left leading-tight">{plugin.title}</span>
                    </button>
                 ))}
              </div>
           ))}
        </div>
        
        {/* KONTEN PLUGIN */}
        <div className="flex-1 overflow-hidden bg-[#050505] flex flex-col relative z-10">
           {PLUGINS.map(plugin => {
              if (plugin.id !== activeId) return null;
              const ActivePlugin = plugin.Component;
              return <ActivePlugin key={plugin.id} />;
           })}
        </div>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        input[type="range"].custom-color-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; background: white; border: 2px solid #111113; border-radius: 50%; box-shadow: 0 1px 4px rgba(0,0,0,0.3); cursor: pointer; }
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #0ea5e9; }
      `}</style>
    </div>
  );
}
