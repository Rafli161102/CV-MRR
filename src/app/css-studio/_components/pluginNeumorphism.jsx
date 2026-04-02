"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, WorkspaceLayout, ControlHeader, adjustBrightness, FigmaToggle } from './ui';

export const PluginNeumorphism = () => {
  const [bg, setBg] = useState('#e0e5ec'); const [dist, setDist] = useState(10); const [blur, setBlur] = useState(20); const [invert, setInvert] = useState(false);
  const handleReset = () => { setBg('#e0e5ec'); setDist(10); setBlur(20); setInvert(false); };
  
  const lightShadow = adjustBrightness(bg, 15); const darkShadow = adjustBrightness(bg, -15);
  const shadowValue = invert ? `inset ${dist}px ${dist}px ${blur}px ${darkShadow}, inset -${dist}px -${dist}px ${blur}px ${lightShadow}` : `${dist}px ${dist}px ${blur}px ${darkShadow}, -${dist}px -${dist}px ${blur}px ${lightShadow}`;
  
  const css = `.neumorph {\n  background-color: ${bg};\n  border-radius: 20px;\n  box-shadow: ${shadowValue};\n}`;
  const html = `<div style="background-color: ${bg}; border-radius: 20px; box-shadow: ${shadowValue}; width: 140px; height: 140px;"></div>`;
  const jsx = `<div style={{ backgroundColor: '${bg}', boxShadow: '${shadowValue}' }} className="w-36 h-36 rounded-[20px]"></div>`;
  const preview = <div style={{ width: 160, height: 160, backgroundColor: bg, borderRadius: 24, boxShadow: shadowValue, transition: 'all 0.4s ease-out' }}></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TIPS DESAIN NEUMORPHISM" text="Desain Neumorphism (Soft UI) mengandalkan manipulasi bayangan untuk membuat elemen terlihat menyatu dengan latar belakang. Wajib menggunakan warna dasar latar belakang yang lembut atau pastel (bukan murni hitam/putih). Nyalakan efek 'Cekung (Inset)' jika ingin membuat tombol yang sedang ditekan." />
      <ControlHeader title="Neumorph Setup" onReset={handleReset} />
      <FigmaColorPicker label="Base Background Color" hexValue={bg} onChange={setBg} />
      <div className="mt-2 mb-2">
         <FigmaToggle label="Efek Cekung (Inset Mode)" checked={invert} onChange={setInvert} />
      </div>
      <FigmaSlider label="Jarak Bayangan (Distance)" min={1} max={30} value={dist} onChange={setDist} unit="px" />
      <FigmaSlider label="Blur Radius" min={1} max={60} value={blur} onChange={setBlur} unit="px" />
    </div>
  );
  return <WorkspaceLayout name="Neumorphism" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="light" bgHex={bg} />;
};
