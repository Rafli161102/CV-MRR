"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, WorkspaceLayout, ControlHeader } from './ui';

export const PluginBackgroundGradient = () => {
  const [color1, setColor1] = useState('#0ea5e9'); 
  const [color2, setColor2] = useState('#8b5cf6'); 
  const [angle, setAngle] = useState(145);
  
  const handleReset = () => { setColor1('#0ea5e9'); setColor2('#8b5cf6'); setAngle(145); };
  
  const css = `.box-gradient {\n  background: linear-gradient(${angle}deg, ${color1}, ${color2});\n  border-radius: 16px;\n  width: 100%;\n  max-width: 320px;\n  aspect-ratio: 2/1;\n}`;
  const html = `<div class="box-gradient"\n     style="background: linear-gradient(${angle}deg, ${color1}, ${color2}); border-radius: 16px; width: 100%; max-width: 320px; aspect-ratio: 2/1;">\n</div>`;
  const jsx = `<div className="w-full max-w-xs aspect-[2/1] rounded-2xl shadow-xl" style={{ background: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}></div>`;
  
  const preview = <div style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} className="w-full max-w-[320px] aspect-[2/1] transition-all duration-500"></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TIPS DESAIN: GRADIENT" text="Gunakan kombinasi warna Analogous (warna yang bersebelahan di roda warna seperti Biru & Ungu) untuk hasil yang elegan dan modern. Hindari warna komplementer yang terlalu kontras karena dapat menyakiti mata. Atur sudut (angle) di 135°-145° untuk transisi cahaya yang natural dari sudut kiri atas ke kanan bawah." />
      <ControlHeader title="Gradient Setup" onReset={handleReset} />
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
        <div className="flex-1"><FigmaColorPicker label="Warna Awal (Start)" hexValue={color1} onChange={setColor1} /></div>
        <div className="flex-1"><FigmaColorPicker label="Warna Akhir (End)" hexValue={color2} onChange={setColor2} /></div>
      </div>
      <FigmaSlider label="Rotasi Sudut" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </div>
  );
  
  return <WorkspaceLayout name="Box Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};
