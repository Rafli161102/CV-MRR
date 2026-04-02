"use client";

import React, { useState } from 'react';
import { PluginTip, FigmaSlider, FigmaSelect, FigmaCustomDropdown, WorkspaceLayout, ControlHeader } from './ui';

const TRANSITIONS_DATA = { 
  "Scale Effects": [{ name: "Grow (Membesar)", val: "scale(1.1)" }, { name: "Shrink (Mengecil)", val: "scale(0.9)" }, { name: "Pop (Ekstrim)", val: "scale(1.2)" }], 
  "Translates": [{ name: "Push Up", val: "translateY(-10px)" }, { name: "Push Down", val: "translateY(10px)" }, { name: "Push Left", val: "translateX(-10px)" }, { name: "Push Right", val: "translateX(10px)" }], 
  "Rotations": [{ name: "Rotate Right", val: "rotate(15deg)" }, { name: "Rotate Left", val: "rotate(-15deg)" }, { name: "Spin Quarter", val: "rotate(90deg)" }, { name: "Spin Half", val: "rotate(180deg)" }], 
  "Skews": [{ name: "Skew Forward", val: "skewX(-15deg)" }, { name: "Skew Backward", val: "skewX(15deg)" }] 
};

export const PluginTransitions = () => {
  const [transType, setTransType] = useState('scale(1.1)'); const [duration, setDuration] = useState(0.3); const [timing, setTiming] = useState('ease-in-out');
  const handleReset = () => { setTransType('scale(1.1)'); setDuration(0.3); setTiming('ease-in-out'); };

  const css = `.element {\n  transition: transform ${duration}s ${timing};\n}\n\n.element:hover {\n  transform: ${transType};\n}`;
  const html = `<style>\n  .element { transition: transform ${duration}s ${timing}; }\n  .element:hover { transform: ${transType}; }\n</style>\n<div class="element">HOVER ME</div>`;
  const jsx = `<div \n  style={{ transition: 'transform ${duration}s ${timing}' }}\n  onMouseEnter={(e) => e.currentTarget.style.transform = '${transType}'}\n  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}\n>\n  HOVER ME\n</div>`;

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center group cursor-pointer">
      <div className="w-48 h-16 rounded-full bg-white text-black text-[13px] font-black tracking-widest flex items-center justify-center shadow-2xl transition-all" style={{ transition: `transform ${duration}s ${timing}` }} onMouseEnter={(e) => e.currentTarget.style.transform = transType} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>HOVER ME</div>
      <div className="absolute top-10 text-[10px] text-slate-500 font-bold uppercase tracking-widest animate-pulse pointer-events-none">Arahkan Kursor / Sentuh</div>
    </div>
  );

  const controls = (
    <div className="space-y-1">
      <PluginTip title="PANDUAN EFEK HOVER" text="Transisi Hover adalah nyawa dari tombol yang interaktif. PENTING: Pada kode CSS hasil ekspor Anda, pastikan atribut 'transition' diletakkan di class induk (default), sedangkan atribut 'transform' diletakkan di dalam pseudo class ':hover' agar kembalinya tombol ke ukuran semula menjadi mulus." />
      <ControlHeader title="Hover Setup" onReset={handleReset} />
      <FigmaCustomDropdown label="Jenis Efek Sentuhan" groups={TRANSITIONS_DATA} value={transType} onChange={setTransType} />
      <FigmaSlider label="Durasi Efek" min={0.1} max={3} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Gaya Timing/Easing" options={['ease', 'linear', 'ease-in-out', 'cubic']} value={timing} onChange={setTiming} />
    </div>
  );
  return <WorkspaceLayout name="Hover Transitions" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};
