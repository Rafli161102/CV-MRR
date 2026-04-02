"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, WorkspaceLayout, ControlHeader } from './ui';

const IMAGE_TEMPLATES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", 
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800", 
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800"
];

export const PluginFilters = () => {
  const [bgImg, setBgImg] = useState(IMAGE_TEMPLATES[0]);
  const [brightness, setBrightness] = useState(100); const [contrast, setContrast] = useState(100); const [saturate, setSaturate] = useState(100); const [hue, setHue] = useState(0); const [blur, setBlur] = useState(0); const [shadow, setShadow] = useState(0); const [opacity, setOpacity] = useState(100);
  
  const handleReset = () => { setBrightness(100); setContrast(100); setSaturate(100); setHue(0); setBlur(0); setShadow(0); setOpacity(100); };
  
  const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg) blur(${blur}px) drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5)) opacity(${opacity}%)`;
  const css = `.filtered-img {\n  filter: \n    brightness(${brightness}%)\n    contrast(${contrast}%)\n    saturate(${saturate}%)\n    hue-rotate(${hue}deg)\n    blur(${blur}px)\n    drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5))\n    opacity(${opacity}%);\n}`;
  const html = `<img src="${bgImg}" style="filter: ${filterStr}; width: 100%; border-radius: 12px;" />`;
  const jsx = `<img src="${bgImg}" style={{ filter: '${filterStr}' }} className="w-full object-cover rounded-xl" />`;
  
  const preview = <div className="relative w-full h-full max-w-[360px] max-h-[260px] rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] ring-1 ring-white/10 group aspect-video"><img src={bgImg} alt="Filter Demo" className="w-full h-full object-cover transition-all duration-200" style={{ filter: filterStr }} /></div>;

  const controls = (
    <div className="space-y-4">
      <PluginTip title="EDIT FOTO ALA INSTAGRAM" text="CSS Filter memungkinkan Anda merekayasa foto tanpa aplikasi editing. Trik membuat foto standar menjadi sangat sinematik: Naikkan Contrast hingga 110%, tambahkan Vibrance (Saturasi) ke 120% untuk warna kulit yang hidup, lalu berikan efek Drop Shadow tipis agar foto Anda terlihat menyembul keluar dari layar." />
      <div className="mb-4">
         <label className="text-[11px] font-bold text-slate-300 block mb-3 uppercase tracking-widest">Ganti Foto Template</label>
         <div className="flex gap-3">
            {IMAGE_TEMPLATES.map((img, idx) => (
              <button key={idx} onClick={() => setBgImg(img)} className={`w-14 h-14 rounded-xl bg-cover bg-center border-[3px] transition-all duration-300 ${bgImg === img ? 'border-cyan-400 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'border-[#333] hover:border-[#555] opacity-50 hover:opacity-100'}`} style={{backgroundImage: `url(${img})`}}></button>
            ))}
         </div>
      </div>
      <ControlHeader title="Filters Setup" onReset={handleReset} />
      <FigmaSlider label="Pencahayaan (Exposure)" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
      <FigmaSlider label="Ketajaman Warna (Contrast)" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
      <FigmaSlider label="Saturasi Warna (Vibrance)" min={0} max={200} value={saturate} onChange={setSaturate} unit="%" />
      <FigmaSlider label="Ubah Nada Warna (Hue Tint)" min={0} max={360} value={hue} onChange={setHue} unit="°" />
      <div className="pt-4 border-t border-[#1f1f1f]">
        <FigmaSlider label="Sensor Blur (Bokeh)" min={0} max={20} step={0.5} value={blur} onChange={setBlur} unit="px" />
        <FigmaSlider label="Efek Timbul (Drop Shadow)" min={0} max={50} value={shadow} onChange={setShadow} unit="px" />
        <FigmaSlider label="Transparansi Foto (Opacity)" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" />
      </div>
    </div>
  );
  return <WorkspaceLayout name="Pro Filters" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};
