"use client";

import React, { useState, useEffect } from 'react';
import { PluginTip, FigmaSlider, WorkspaceLayout, ControlHeader, useMultiTouch, FigmaToggle } from './ui';

const LocalIcons = {
  Focus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>,
};

export const PluginTransform = () => {
  const [rx, setRx] = useState(30); const [ry, setRy] = useState(-30); const [rz, setRz] = useState(0); 
  const [tx, setTx] = useState(0); const [ty, setTy] = useState(0); const [tz, setTz] = useState(0); 
  const [scale, setScale] = useState(1); const [cubeSize, setCubeSize] = useState(120);
  const [isWireframe, setIsWireframe] = useState(false); 
  
  const [baseScale, setBaseScale] = useState(1);
  useEffect(() => { 
    if (typeof window !== 'undefined') setBaseScale(window.innerWidth < 768 ? 0.7 : 1); 
  }, []);

  const { scale: touchScale, pan, onTouchStart, onTouchMove, resetView } = useMultiTouch();

  const handleReset = () => { setRx(30); setRy(-30); setRz(0); setTx(0); setTy(0); setTz(0); setScale(1); setCubeSize(120); setIsWireframe(false); resetView(); };

  const getFaceStyle = (bgAlpha) => `absolute flex items-center justify-center font-black ${isWireframe ? 'text-cyan-400' : 'text-white/90'} tracking-widest text-[16px] sm:text-[20px] ${isWireframe ? 'border-2 border-cyan-500 shadow-[inset_0_0_15px_rgba(6,182,212,0.3)] bg-cyan-900/10' : `border border-white/20 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] backdrop-blur-sm ${bgAlpha}`}`;

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center touch-none overflow-hidden" style={{ perspective: '1000px' }} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <div className="absolute top-3 left-3 bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] p-1.5 rounded-2xl flex flex-col gap-2 z-20 shadow-xl">
        <button onClick={resetView} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-[#2a2a2a] transition-all" title="Kembalikan ke Tengah"><div className="w-5 h-5"><LocalIcons.Focus /></div></button>
      </div>
      <div style={{ transformStyle: 'preserve-3d', transform: `translate(${pan.x}px, ${pan.y}px) scale(${touchScale * scale * baseScale})`, transition: 'transform 0.1s linear' }}>
        <div style={{ width: `${cubeSize}px`, height: `${cubeSize}px`, transformStyle: 'preserve-3d', transform: `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)` }}>
          <div className={getFaceStyle('bg-sky-500/70')} style={{ width: '100%', height: '100%', transform: `translateZ(${cubeSize/2}px)` }}>DEPAN</div>
          <div className={getFaceStyle('bg-violet-500/70')} style={{ width: '100%', height: '100%', transform: `rotateY(180deg) translateZ(${cubeSize/2}px)` }}>BELKNG</div>
          <div className={getFaceStyle('bg-pink-500/70')} style={{ width: '100%', height: '100%', transform: `rotateY(90deg) translateZ(${cubeSize/2}px)` }}>KANAN</div>
          <div className={getFaceStyle('bg-amber-500/70')} style={{ width: '100%', height: '100%', transform: `rotateY(-90deg) translateZ(${cubeSize/2}px)` }}>KIRI</div>
          <div className={getFaceStyle('bg-emerald-500/70')} style={{ width: '100%', height: '100%', transform: `rotateX(90deg) translateZ(${cubeSize/2}px)` }}>ATAS</div>
          <div className={getFaceStyle('bg-red-500/70')} style={{ width: '100%', height: '100%', transform: `rotateX(-90deg) translateZ(${cubeSize/2}px)` }}>BAWAH</div>
        </div>
      </div>
    </div>
  );

  const css = `.scene { perspective: 1000px; }\n.cube {\n  position: relative; width: ${cubeSize}px; height: ${cubeSize}px; transform-style: preserve-3d;\n  transform: rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translate3d(${tx}px, ${ty}px, ${tz}px) scale(${scale});\n}\n.face { position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: sans-serif; font-weight: bold; color: white; border: 1px solid rgba(255,255,255,0.2); }\n.front { transform: translateZ(${cubeSize/2}px); background: rgba(14, 165, 233, 0.8); }\n.back { transform: rotateY(180deg) translateZ(${cubeSize/2}px); background: rgba(139, 92, 246, 0.8); }\n.right { transform: rotateY(90deg) translateZ(${cubeSize/2}px); background: rgba(236, 72, 153, 0.8); }\n.left { transform: rotateY(-90deg) translateZ(${cubeSize/2}px); background: rgba(245, 158, 11, 0.8); }\n.top { transform: rotateX(90deg) translateZ(${cubeSize/2}px); background: rgba(16, 185, 129, 0.8); }\n.bottom { transform: rotateX(-90deg) translateZ(${cubeSize/2}px); background: rgba(239, 68, 68, 0.8); }`;
  const html = `<div class="scene">\n  <div class="cube">\n    <div class="face front">DEPAN</div>\n    <div class="face back">BELAKANG</div>\n    <div class="face right">KANAN</div>\n    <div class="face left">KIRI</div>\n    <div class="face top">ATAS</div>\n    <div class="face bottom">BAWAH</div>\n  </div>\n</div>`;
  const jsx = `// Silakan copy struktur CSS dan HTML untuk menerapkan efek Kubus 3D ini.`;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TIPS KENDALI 3D" text="Gunakan 2 jari di layar preview untuk zoom dan geser kanvas. Aktifkan X-Ray/Wireframe untuk melihat kerangka kubus menembus ke dalam." />
      <ControlHeader title="3D Matrix Setup" onReset={handleReset} />
      <div className="mb-5 mt-2"><FigmaToggle label="X-Ray (Wireframe Mode)" checked={isWireframe} onChange={setIsWireframe} /></div>
      <FigmaSlider label="Cube Size" min={50} max={300} value={cubeSize} onChange={setCubeSize} unit="px" />
      <div className="border-t border-[#1f1f1f] mt-6 pt-5 mb-2"><span className="text-[11px] font-bold text-cyan-500 uppercase tracking-widest">Rotasi 3D (X, Y, Z)</span></div>
      <FigmaSlider label="Rotate X" min={-180} max={180} value={rx} onChange={setRx} unit="°" />
      <FigmaSlider label="Rotate Y" min={-180} max={180} value={ry} onChange={setRy} unit="°" />
      <FigmaSlider label="Rotate Z" min={-180} max={180} value={rz} onChange={setRz} unit="°" />
      <div className="border-t border-[#1f1f1f] mt-6 pt-5 mb-2"><span className="text-[11px] font-bold text-cyan-500 uppercase tracking-widest">Posisi & Skala</span></div>
      <FigmaSlider label="Translate Z" min={-300} max={300} value={tz} onChange={setTz} unit="px" />
      <FigmaSlider label="Scale" min={0.5} max={2} step={0.1} value={scale} onChange={setScale} unit="x" />
    </div>
  );
  return <WorkspaceLayout name="3D Studio" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};
