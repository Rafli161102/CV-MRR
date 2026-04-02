"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaTextInput, WorkspaceLayout, ControlHeader } from './ui';

export const PluginTextGradient = () => {
  const [text, setText] = useState('GRADIENT'); 
  const [color1, setColor1] = useState('#ec4899'); 
  const [color2, setColor2] = useState('#f59e0b'); 
  const [angle, setAngle] = useState(90);
  
  const handleReset = () => { setText('GRADIENT'); setColor1('#ec4899'); setColor2('#f59e0b'); setAngle(90); };
  
  const css = `.text-gradient {\n  background-image: linear-gradient(${angle}deg, ${color1}, ${color2});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}`;
  const html = `<h1 style="background-image: linear-gradient(${angle}deg, ${color1}, ${color2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${text}</h1>`;
  const jsx = `<h1 className="text-5xl font-black bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}>${text}</h1>`;
  
  const preview = <div className="w-full h-full flex items-center justify-center text-center p-4"><span style={{ backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(2rem, 10vw, 5rem)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1.2' }}>{text || 'GRADIENT'}</span></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="PANDUAN: TEXT GRADIENT" text="Efek teks gradasi sangat bergantung pada ketebalan Font. Semakin tebal Font yang digunakan (Bold/Black), efek gradasi akan semakin terlihat jelas dan memukau. Sangat direkomendasikan untuk digunakan pada Judul Utama (Hero Title) di website Anda, bukan untuk teks paragraf panjang." />
      <ControlHeader title="Text Setup" onReset={handleReset} />
      <FigmaTextInput label="Custom Text (Ketik disini)" value={text} onChange={setText} placeholder="Misal: STUDIO" />
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
        <div className="flex-1"><FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} /></div>
        <div className="flex-1"><FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} /></div>
      </div>
      <FigmaSlider label="Rotasi Gradasi" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </div>
  );
  
  return <WorkspaceLayout name="Text Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};
