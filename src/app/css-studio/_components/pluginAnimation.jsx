"use client";

import React, { useState, useEffect } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaSelect, FigmaCustomDropdown, WorkspaceLayout, ControlHeader } from './ui';

const ANIMATION_DATA = { 
  "Attention (Perhatian)": [{ name: "Bounce (Memantul)", val: "bounce" }, { name: "Flash (Berkedip)", val: "flash" }, { name: "Pulse (Berdetak)", val: "pulse" }, { name: "RubberBand (Karet)", val: "rubberBand" }, { name: "Shake (Bergetar)", val: "shake" }, { name: "Swing (Berayun)", val: "swing" }], 
  "Fade Entrances (Masuk Halus)": [{ name: "Fade In", val: "fadeIn" }, { name: "Fade In Down", val: "fadeInDown" }, { name: "Fade In Left", val: "fadeInLeft" }], 
  "Zoom Entrances (Masuk Zoom)": [{ name: "Zoom In", val: "zoomIn" }, { name: "Zoom In Down", val: "zoomInDown" }, { name: "Zoom In Up", val: "zoomInUp" }], 
  "Rotations (Putaran)": [{ name: "Spin 360", val: "spin" }, { name: "Flip Horizontal", val: "flipInX" }, { name: "Flip Vertical", val: "flipInY" }], 
  "Looping (Berkelanjutan)": [{ name: "Floating (Melayang)", val: "float" }, { name: "Breathe (Bernapas)", val: "breathe" }] 
};

const getDynamicKeyframes = (type) => {
  const map = {
    bounce: `0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-30px);} 60% {transform: translateY(-15px);}`,
    flash: `0%, 50%, 100% {opacity: 1;} 25%, 75% {opacity: 0;}`,
    pulse: `0% {transform: scale(1);} 50% {transform: scale(1.05);} 100% {transform: scale(1);}`,
    rubberBand: `0% {transform: scale(1);} 30% {transform: scale3d(1.25, 0.75, 1);} 40% {transform: scale3d(0.75, 1.25, 1);} 50% {transform: scale3d(1.15, 0.85, 1);} 65% {transform: scale3d(.95, 1.05, 1);} 75% {transform: scale3d(1.05, .95, 1);} 100% {transform: scale(1);}`,
    shake: `0%, 100% {transform: translateX(0);} 10%, 30%, 50%, 70%, 90% {transform: translateX(-10px);} 20%, 40%, 60%, 80% {transform: translateX(10px);}`,
    swing: `20% {transform: rotate(15deg);} 40% {transform: rotate(-10deg);} 60% {transform: rotate(5deg);} 80% {transform: rotate(-5deg);} 100% {transform: rotate(0deg);}`,
    fadeIn: `from {opacity: 0;} to {opacity: 1;}`, fadeInDown: `from {opacity: 0; transform: translate3d(0, -100%, 0);} to {opacity: 1; transform: none;}`, fadeInLeft: `from {opacity: 0; transform: translate3d(-100%, 0, 0);} to {opacity: 1; transform: none;}`,
    zoomIn: `from {opacity: 0; transform: scale3d(0.3, 0.3, 0.3);} 50% {opacity: 1;}`, zoomInDown: `from {opacity: 0; transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);} 60% {opacity: 1; transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);}`, zoomInUp: `from {opacity: 0; transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);} 60% {opacity: 1; transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);}`,
    spin: `from {transform: rotate(0deg);} to {transform: rotate(360deg);}`, flipInX: `from {transform: perspective(400px) rotate3d(1, 0, 0, 90deg); opacity: 0;} 40% {transform: perspective(400px) rotate3d(1, 0, 0, -20deg);} 60% {transform: perspective(400px) rotate3d(1, 0, 0, 10deg); opacity: 1;} 80% {transform: perspective(400px) rotate3d(1, 0, 0, -5deg);} to {transform: perspective(400px);}`, flipInY: `from {transform: perspective(400px) rotate3d(0, 1, 0, 90deg); opacity: 0;} 40% {transform: perspective(400px) rotate3d(0, 1, 0, -20deg);} 60% {transform: perspective(400px) rotate3d(0, 1, 0, 10deg); opacity: 1;} 80% {transform: perspective(400px) rotate3d(0, 1, 0, -5deg);} to {transform: perspective(400px);}`,
    float: `0%, 100% {transform: translateY(0);} 50% {transform: translateY(-20px);}`, breathe: `0%, 100% {transform: scale(1); opacity: 0.8;} 50% {transform: scale(1.1); opacity: 1; box-shadow: 0 0 20px rgba(14,165,233,0.5);}`
  };
  return map[type] || map['bounce'];
};

export const PluginAnimation = () => {
  const [animType, setAnimType] = useState('bounce'); const [duration, setDuration] = useState(1.5); const [timing, setTiming] = useState('ease-in-out'); const [iteration, setIteration] = useState('infinite'); const [key, setKey] = useState(0); 
  const handleReset = () => { setAnimType('bounce'); setDuration(1.5); setTiming('ease-in-out'); setIteration('infinite'); setKey(k=>k+1); };

  const css = `@keyframes anim-${animType} {\n  ${getDynamicKeyframes(animType).replace(/\} /g, '}\n  ')}\n}\n\n.animate-element {\n  animation: anim-${animType} ${duration}s ${timing} ${iteration};\n}`;
  const html = `<style>\n  @keyframes anim-${animType} { ${getDynamicKeyframes(animType)} }\n  .animate-element { animation: anim-${animType} ${duration}s ${timing} ${iteration}; }\n</style>\n<div class="animate-element">Animate Me</div>`;
  const jsx = `// Tambahkan @keyframes ke global.css terlebih dahulu\n<div style={{ animation: 'anim-${animType} ${duration}s ${timing} ${iteration}' }}>\n  Animate Me\n</div>`;

  useEffect(() => { setKey(prev => prev + 1); }, [animType, duration, timing, iteration]);

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`@keyframes preview-${animType}-${key} { ${getDynamicKeyframes(animType)} }`}</style>
      <div key={key} className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-500 to-orange-400 shadow-2xl flex items-center justify-center border border-white/20" style={{ animation: `preview-${animType}-${key} ${duration}s ${timing} ${iteration === 'infinite' ? 'infinite' : iteration}` }}><Icons.Animation /></div>
    </div>
  );

  const controls = (
    <div className="space-y-1">
      <PluginTip title="PANDUAN KEYFRAME ANIMATION" text="Animasi web diatur oleh properti Waktu dan Gaya (Timing). Gunakan 'linear' untuk animasi memutar yang terus-menerus tanpa henti. Gunakan kategori 'Looping' (seperti Floating) dan atur Iteration menjadi 'Infinite' untuk menciptakan efek elemen yang terus melayang tanpa perlu disentuh." />
      <ControlHeader title="Animation Setup" onReset={handleReset} />
      <FigmaCustomDropdown label="Pilih Efek Animasi" groups={ANIMATION_DATA} value={animType} onChange={setAnimType} />
      <FigmaSlider label="Durasi / Kecepatan" min={0.1} max={5} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#1f1f1f]">
         <FigmaSelect label="Gaya Pergerakan (Timing)" options={['linear', 'ease', 'ease-in-out', 'ease-in']} value={timing} onChange={setTiming} />
         <FigmaSelect label="Pengulangan (Iteration)" options={['1', '2', '3', 'infinite']} value={iteration} onChange={setIteration} />
      </div>
      <button onClick={() => setKey(k => k + 1)} className="w-full mt-4 py-3.5 bg-[#141414] hover:bg-cyan-500/20 border border-[#333] hover:border-cyan-500 text-cyan-400 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95">Putar Ulang Animasi</button>
    </div>
  );
  return <WorkspaceLayout name="Animation Builder" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};
