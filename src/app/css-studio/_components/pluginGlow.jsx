"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, WorkspaceLayout, ControlHeader, hexToRgb } from './ui';

export const PluginGlow = () => {
  const [color, setColor] = useState('#0ea5e9'); const [blur, setBlur] = useState(40); const [spread, setSpread] = useState(10);
  const handleReset = () => { setColor('#0ea5e9'); setBlur(40); setSpread(10); };
  
  const css = `.neon-glow {\n  box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8);\n  border-radius: 50%;\n  background-color: ${color};\n}`;
  const html = `<div style="box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8); border-radius: 50%; background-color: ${color}; width: 80px; height: 80px;"></div>`;
  const jsx = `<div style={{ boxShadow: '0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)', backgroundColor: '${color}' }} className="w-20 h-20 rounded-full"></div>`;
  const preview = <div style={{ width: 80, height: 80, backgroundColor: color, borderRadius: '50%', transition: 'all 0.3s ease', boxShadow: `0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)` }}></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TIPS DESAIN CYBERPUNK (GLOW)" text="Efek Neon/Glow sangat kuat saat diaplikasikan di latar belakang gelap (Dark Mode). Gunakan warna-warna vibran tinggi seperti Cyan terang, Magenta, atau Neon Green. Besarkan nilai 'Blur Radius' dan 'Spread' agar cahaya terlihat menyebar luas menyerupai efek pendaran lampu LED asli." />
      <ControlHeader title="Glow Setup" onReset={handleReset} />
      <FigmaColorPicker label="Warna Pendaran Cahaya" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Penyebaran Cahaya (Blur Radius)" min={0} max={150} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Jangkauan Terang (Spread Radius)" min={0} max={100} value={spread} onChange={setSpread} unit="px" />
    </div>
  );
  return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};
