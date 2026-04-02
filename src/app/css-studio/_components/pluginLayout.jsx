"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, WorkspaceLayout, ControlHeader } from './ui';

export const PluginLayout = () => {
  const [padding, setPadding] = useState(32); 
  const [radius, setRadius] = useState(24); 
  const [bgColor, setBgColor] = useState('#1a1a1a'); 
  const [textColor, setTextColor] = useState('#ffffff');
  
  const handleReset = () => { setPadding(32); setRadius(24); setBgColor('#1a1a1a'); setTextColor('#ffffff'); };
  
  const css = `.box {\n  padding: ${padding}px;\n  border-radius: ${radius}px;\n  background-color: ${bgColor};\n  color: ${textColor};\n}`;
  const html = `<div style="padding: ${padding}px; border-radius: ${radius}px; background-color: ${bgColor}; color: ${textColor};">\n  Box Content\n</div>`;
  const jsx = `<div style={{ padding: '${padding}px', borderRadius: '${radius}px', backgroundColor: '${bgColor}', color: '${textColor}' }}>Box Content</div>`;
  
  const preview = <div style={{ padding: `${padding}px`, borderRadius: `${radius}px`, backgroundColor: bgColor, color: textColor, textAlign: 'center', border: '1px solid #333', transition: 'all 0.4s ease-out' }} className="font-bold tracking-wide shadow-lg">Elemen Container</div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TIPS DESAIN: KOTAK & RUANG" text="Whitespace (ruang kosong) adalah elemen desain yang paling penting. Gunakan Padding yang besar untuk memberikan ruang bernapas pada konten di dalamnya, sehingga tidak terlihat sesak. Sesuaikan Border Radius; desain modern biasanya menggunakan radius antara 16px hingga 24px untuk kesan bersahabat dan organik." />
      <ControlHeader title="Configuration" onReset={handleReset} />
      <div className="flex flex-col gap-0 sm:gap-4">
        <FigmaColorPicker label="Warna Latar (Background)" hexValue={bgColor} onChange={setBgColor} />
        <FigmaColorPicker label="Warna Teks (Color)" hexValue={textColor} onChange={setTextColor} />
      </div>
      <FigmaSlider label="Jarak Dalam (Padding)" min={0} max={100} value={padding} onChange={setPadding} unit="px" />
      <FigmaSlider label="Lengkungan (Border Radius)" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </div>
  );
  
  return <WorkspaceLayout name="Box Layout" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};
