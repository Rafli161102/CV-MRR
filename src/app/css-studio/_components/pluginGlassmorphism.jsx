"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, WorkspaceLayout, ControlHeader, hexToRgb } from './ui';

export const PluginGlassmorphism = () => {
  const [blur, setBlur] = useState(12); const [opacity, setOpacity] = useState(15); const [color, setColor] = useState('#ffffff');
  const handleReset = () => { setBlur(12); setOpacity(15); setColor('#ffffff'); };
  
  const rgb = hexToRgb(color);
  const css = `.glass {\n  background: rgba(${rgb}, ${opacity / 100});\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 16px;\n}`;
  const html = `<div style="background: rgba(${rgb}, ${opacity/100}); backdrop-filter: blur(${blur}px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 16px; width: 240px; height: 140px;"></div>`;
  const jsx = `<div style={{ background: 'rgba(${rgb}, ${opacity/100})', backdropFilter: 'blur(${blur}px)', border: '1px solid rgba(255,255,255, 0.3)' }} className="w-60 h-36 rounded-2xl shadow-xl"></div>`;
  
  const preview = <div style={{ width: '80%', maxWidth: '240px', height: '140px', background: `rgba(${rgb}, ${opacity / 100})`, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, border: `1px solid rgba(255, 255, 255, 0.3)`, borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TIPS EFEK KACA (GLASSMORPHISM)" text="Kunci utama efek kaca yang mewah seperti desain Apple/iOS adalah menggunakan transparansi (Opacity) yang sangat rendah di kisaran 10% hingga 20%, dikombinasikan dengan efek blur latar (Blur Intensity) yang tinggi (sekitar 12px - 20px). Pastikan menambahkan border putih tipis transparan untuk menegaskan pantulan cahaya di tepi elemen." />
      <ControlHeader title="Glass Setup" onReset={handleReset} />
      <FigmaColorPicker label="Warna Kaca (Glass Tint)" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Tingkat Transparansi (Opacity)" min={1} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="Intensitas Blur Latar" min={0} max={50} step={0.5} value={blur} onChange={setBlur} unit="px" />
    </div>
  );
  return <WorkspaceLayout name="Glassmorphism" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="glass" />;
};
