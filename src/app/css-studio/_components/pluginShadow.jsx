"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, WorkspaceLayout, ControlHeader, hexToRgb } from './ui';

export const PluginShadow = () => {
  const [x, setX] = useState(10); const [y, setY] = useState(15); const [blur, setBlur] = useState(30); const [spread, setSpread] = useState(0); const [opacity, setOpacity] = useState(40); const [color, setColor] = useState('#000000');
  const handleReset = () => { setX(10); setY(15); setBlur(30); setSpread(0); setOpacity(40); setColor('#000000'); };
  
  const css = `.shadow-box {\n  box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100});\n  border-radius: 12px;\n  background-color: #ffffff;\n}`;
  const html = `<div style="box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100}); border-radius: 12px; background-color: #ffffff; width: 140px; height: 140px;"></div>`;
  const jsx = `<div style={{ boxShadow: '${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})' }} className="w-36 h-36 rounded-xl bg-white"></div>`;
  const preview = <div style={{ width: 140, height: 140, backgroundColor: '#ffffff', borderRadius: 12, transition: 'box-shadow 0.3s ease', boxShadow: `${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})` }}></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TEKNIK ELEGAN: SOFT SHADOW" text="Hindari penggunaan bayangan hitam solid yang kaku. Tren UI/UX modern mempopulerkan efek 'Soft Shadow'. Caranya: Turunkan Opacity bayangan ke angka 10% - 20%, lalu naikkan Blur Radius (30px ke atas) dan posisikan sedikit ke bawah (Y Offset positif). Elemen Anda akan terlihat melayang mulus di atas layar." />
      <ControlHeader title="Shadow Setup" onReset={handleReset} />
      <FigmaColorPicker label="Warna Bayangan (Shadow Color)" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Ketebalan/Transparansi (Opacity)" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="Posisi Horizontal (X Offset)" min={-50} max={50} value={x} onChange={setX} unit="px" />
      <FigmaSlider label="Posisi Vertikal (Y Offset)" min={-50} max={50} value={y} onChange={setY} unit="px" />
      <FigmaSlider label="Kelembutan (Blur Radius)" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Sebaran (Spread Radius)" min={-50} max={50} value={spread} onChange={setSpread} unit="px" />
    </div>
  );
  return <WorkspaceLayout name="Drop Shadow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="light" />;
};
