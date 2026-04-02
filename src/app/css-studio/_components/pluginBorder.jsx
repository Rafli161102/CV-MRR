"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, WorkspaceLayout, ControlHeader } from './ui';

export const PluginBorder = () => {
  const [width, setWidth] = useState(4); 
  const [radius, setRadius] = useState(20); 
  const [style, setStyle] = useState('solid'); 
  const [color, setColor] = useState('#0ea5e9');
  
  const handleReset = () => { setWidth(4); setRadius(20); setStyle('solid'); setColor('#0ea5e9'); };
  
  const css = `.bordered-box {\n  border: ${width}px ${style} ${color};\n  border-radius: ${radius}px;\n}`;
  const html = `<div style="border: ${width}px ${style} ${color}; border-radius: ${radius}px; width: 180px; height: 120px;"></div>`;
  const jsx = `<div style={{ border: '${width}px ${style} ${color}', borderRadius: '${radius}px' }} className="w-48 h-32 bg-transparent"></div>`;
  
  const preview = <div style={{ width: 180, height: 120, border: `${width}px ${style} ${color}`, borderRadius: `${radius}px`, backgroundColor: 'rgba(255,255,255,0.02)', transition: 'all 0.3s ease' }} className="flex items-center justify-center text-white/30 text-xs font-mono">Pratinjau Border</div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="PANDUAN: GAYA GARIS" text="Sesuaikan ketebalan Border dengan warna dan gaya. Border 'Solid' cocok untuk tombol dan card utama. Gunakan Border 'Dashed' (putus-putus tebal) untuk area drop-zone upload file atau desain bergaya kupon/tiket promo. Pastikan Border Radius selaras dengan desain keseluruhan aplikasi Anda." />
      <ControlHeader title="Border Setup" onReset={handleReset} />
      <FigmaColorPicker label="Warna Garis (Border Color)" hexValue={color} onChange={setColor} />
      <FigmaSelect label="Gaya Garis (Border Style)" options={['solid', 'dashed', 'dotted', 'double']} value={style} onChange={setStyle} />
      <div className="pt-2 border-t border-[#1f1f1f]">
        <FigmaSlider label="Ketebalan (Width)" min={1} max={30} value={width} onChange={setWidth} unit="px" />
        <FigmaSlider label="Lengkungan (Radius)" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
      </div>
    </div>
  );
  
  return <WorkspaceLayout name="Border Styling" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};
