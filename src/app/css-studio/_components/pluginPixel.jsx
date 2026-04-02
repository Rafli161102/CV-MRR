"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, WorkspaceLayout, ControlHeader, COLOR_PRESETS, useMultiTouch, FigmaToggle } from './ui';

const LocalIcons = {
  Focus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>,
  Grid: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25-15h17.25m-17.25 7.5h17.25m-10.5 7.5v-15m7.5 15v-15" /></svg>
};

const floodFill = (pixels, startIndex, targetColor, replacementColor, gridSize) => {
  if (targetColor === replacementColor) return pixels;
  const newPixels = [...pixels];
  const stack = [startIndex];
  while (stack.length > 0) {
    const idx = stack.pop();
    if (newPixels[idx] === targetColor) {
      newPixels[idx] = replacementColor;
      const x = idx % gridSize;
      const y = Math.floor(idx / gridSize);
      if (x > 0) stack.push(idx - 1);
      if (x < gridSize - 1) stack.push(idx + 1);
      if (y > 0) stack.push(idx - gridSize);
      if (y < gridSize - 1) stack.push(idx + gridSize);
    }
  }
  return newPixels;
};

export const PluginPixelDrawing = () => {
  const [gridSize, setGridSize] = useState(16);
  const [localGridInput, setLocalGridInput] = useState('16');
  const [canvasBgColor, setCanvasBgColor] = useState('#ffffff');
  const [isTransparent, setIsTransparent] = useState(false);
  const [showGrid, setShowGrid] = useState(true); 
  const [color, setColor] = useState('#0ea5e9');
  const [palette, setPalette] = useState([...COLOR_PRESETS]);
  const [outputSize, setOutputSize] = useState(1080);

  const createEmptyLayer = (id, name) => ({
    id, name, pixels: Array(gridSize * gridSize).fill('transparent'), visible: true, locked: false
  });
  
  const [layers, setLayers] = useState([createEmptyLayer(1, "Layer 1")]);
  const [activeLayerId, setActiveLayerId] = useState(1);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(-1);

  // FIX HYDRATION ERROR: Set Scale setelah Render di Browser
  const [baseScale, setBaseScale] = useState(1);
  useEffect(() => {
     setBaseScale(window.innerWidth < 768 ? 0.6 : 1);
  }, []);

  const { scale, pan, rotation, setScale, setPan, onTouchStart, onTouchMove, resetView } = useMultiTouch();
  const [activeTool, setActiveTool] = useState('draw'); 
  const [isDrawing, setIsDrawing] = useState(false);
  const parentRef = useRef(null);

  // FIX OOM CRASH: Batas maksimal grid 32
  useEffect(() => {
    const safeGrid = Math.min(Math.max(gridSize, 8), 32); 
    const newLayers = [createEmptyLayer(1, "Layer 1")];
    setLayers(newLayers); setHistory([newLayers]); setStep(0); setActiveLayerId(1);
    setLocalGridInput(safeGrid.toString()); resetView();
  }, [gridSize]);

  const mergedPixels = Array(gridSize * gridSize).fill('transparent');
  layers.forEach(layer => {
    if (!layer.visible) return;
    layer.pixels.forEach((p, j) => { if (p !== 'transparent') mergedPixels[j] = p; });
  });

  const saveHistory = (newLayers) => {
    const newHistory = history.slice(0, step + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLayers)));
    if (newHistory.length > 10) newHistory.shift(); 
    setHistory(newHistory); setStep(newHistory.length - 1);
  };

  const handleUndo = () => { const newStep = Math.max(0, step - 1); setStep(newStep); setLayers(JSON.parse(JSON.stringify(history[newStep]))); };
  const handleRedo = () => { const newStep = Math.min(history.length - 1, step + 1); setStep(newStep); setLayers(JSON.parse(JSON.stringify(history[newStep]))); };

  const paintPixel = (index) => {
    const newLayers = [...layers];
    const activeIdx = newLayers.findIndex(l => l.id === activeLayerId);
    if (activeIdx === -1 || newLayers[activeIdx].locked || !newLayers[activeIdx].visible) return;

    if (activeTool === 'bucket') {
      newLayers[activeIdx].pixels = floodFill(newLayers[activeIdx].pixels, index, newLayers[activeIdx].pixels[index], color, gridSize);
      setLayers(newLayers); saveHistory(newLayers);
    } else {
      const targetColor = activeTool === 'erase' ? 'transparent' : color;
      if (newLayers[activeIdx].pixels[index] === targetColor) return;
      newLayers[activeIdx].pixels[index] = targetColor;
      setLayers(newLayers);
    }
  };

  // RUMUS MATRIKS MATEMATIKA MURNI (DIJAMIN 100% KENA TITIK JARI)
  const paintByCoords = (clientX, clientY) => {
    if (!parentRef.current) return;

    // Mendapatkan batas kotak kanvas yang tidak di-rotasi
    const parentRect = parentRef.current.getBoundingClientRect();
    const pixelSizePx = gridSize <= 8 ? 20 : gridSize <= 16 ? 12 : gridSize <= 32 ? 6 : 4;
    
    // Titik pusat kanvas di layar
    const centerX = parentRect.left + parentRect.width / 2;
    const centerY = parentRect.top + parentRect.height / 2;
    
    // Jarak jari dari titik pusat
    const dx = clientX - centerX;
    const dy = clientY - centerY;

    // Invers Rotasi (memutar balik kordinat jari)
    const angleRad = -rotation * (Math.PI / 180);
    const rotatedX = dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
    const rotatedY = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);

    // Kordinat Asli ke dalam Grid
    const actualScale = scale * baseScale;
    const unscaledX = (rotatedX / actualScale) + ((gridSize * pixelSizePx) / 2);
    const unscaledY = (rotatedY / actualScale) + ((gridSize * pixelSizePx) / 2);

    // Cek apakah jari berada di luar batas kanvas
    if (unscaledX < 0 || unscaledY < 0 || unscaledX >= gridSize * pixelSizePx || unscaledY >= gridSize * pixelSizePx) return;

    const col = Math.floor(unscaledX / pixelSizePx);
    const row = Math.floor(unscaledY / pixelSizePx);
    const index = row * gridSize + col;

    if (index >= 0 && index < gridSize * gridSize) {
      if (activeTool === 'picker') {
        const picked = mergedPixels[index] !== 'transparent' ? mergedPixels[index] : (isTransparent ? '#ffffff' : canvasBgColor);
        setColor(picked); setActiveTool('draw'); return;
      }
      paintPixel(index);
    }
  };

  const handlePointerDown = (e) => {
    if (activeTool === 'pan') return;
    setIsDrawing(true); 
    paintByCoords(e.clientX, e.clientY);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDrawing && activeTool !== 'pan') paintByCoords(e.clientX, e.clientY);
  };

  const handlePointerUp = (e) => {
    if (isDrawing) { setIsDrawing(false); saveHistory(layers); }
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const addLayer = () => { const newId = Date.now(); const newLayers = [...layers, createEmptyLayer(newId, `Layer ${layers.length + 1}`)]; setLayers(newLayers); setActiveLayerId(newId); saveHistory(newLayers); };
  const duplicateLayer = (id) => { const layerToCopy = layers.find(l => l.id === id); if (!layerToCopy) return; const newId = Date.now(); const newLayers = [...layers, { ...layerToCopy, id: newId, name: `${layerToCopy.name} Copy` }]; setLayers(newLayers); setActiveLayerId(newId); saveHistory(newLayers); };
  const deleteLayer = (id) => { if (layers.length <= 1) return; const newLayers = layers.filter(l => l.id !== id); setLayers(newLayers); if (activeLayerId === id) setActiveLayerId(newLayers[newLayers.length - 1].id); saveHistory(newLayers); };
  const toggleLayerProp = (id, prop) => { const newLayers = layers.map(l => l.id === id ? { ...l, [prop]: !l[prop] } : l); setLayers(newLayers); saveHistory(newLayers); };

  const downloadImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = outputSize; canvas.height = outputSize;
    const pSize = outputSize / gridSize;
    if (!isTransparent) { ctx.fillStyle = canvasBgColor; ctx.fillRect(0, 0, outputSize, outputSize); }
    mergedPixels.forEach((p, i) => {
      if (p !== 'transparent') {
        ctx.fillStyle = p;
        ctx.fillRect((i % gridSize) * pSize, Math.floor(i / gridSize) * pSize, pSize, pSize);
      }
    });
    const link = document.createElement('a'); link.download = `pixel-art-hd.png`;
    link.href = canvas.toDataURL('image/png'); link.click();
  };

  const pixelSizePx = gridSize <= 8 ? 20 : gridSize <= 16 ? 12 : gridSize <= 32 ? 6 : 4;
  const boxShadowData = mergedPixels.map((p, i) => p !== 'transparent' ? `${(i % gridSize) * pixelSizePx}px ${Math.floor(i / gridSize) * pixelSizePx}px ${p}` : null).filter(Boolean).join(', ');

  const preview = (
    <div className="relative w-full h-[45vh] sm:h-[400px] flex items-center justify-center overflow-hidden bg-[#050505] touch-none"
      onPointerDown={handlePointerDown} 
      onPointerMove={handlePointerMove} 
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchStart(e); }}
      onTouchMove={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchMove(e); }}
    >
      {/* FIX MOBILE OVERLAP: Toolbar Menurun (Vertikal) di Kiri Layar agar Aman 100% */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-50 flex flex-col gap-2 p-1.5 bg-[#141414]/95 backdrop-blur-md border border-[#2a2a2a] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <button onClick={() => setActiveTool('draw')} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${activeTool === 'draw' ? 'bg-cyan-500 text-black shadow-lg scale-110' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Kuas"><div className="w-4 h-4"><Icons.Brush /></div></button>
        <button onClick={() => setActiveTool('erase')} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${activeTool === 'erase' ? 'bg-cyan-500 text-black shadow-lg scale-110' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Penghapus"><div className="w-4 h-4"><Icons.Eraser /></div></button>
        <button onClick={() => setActiveTool('bucket')} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${activeTool === 'bucket' ? 'bg-cyan-500 text-black shadow-lg scale-110' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Ember Cat"><div className="w-4 h-4"><Icons.Bucket /></div></button>
        <button onClick={() => setActiveTool('picker')} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${activeTool === 'picker' ? 'bg-cyan-500 text-black shadow-lg scale-110' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Pipet"><div className="w-4 h-4"><Icons.Picker /></div></button>
        <div className="w-full h-px bg-[#333] my-1"></div>
        <button onClick={() => setActiveTool('pan')} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${activeTool === 'pan' ? 'bg-cyan-500 text-black shadow-lg scale-110' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Geser"><div className="w-4 h-4"><Icons.HandPan /></div></button>
        <button onClick={resetView} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-[#2a2a2a] transition-all" title="Fokus"><div className="w-4 h-4"><LocalIcons.Focus /></div></button>
      </div>

      {/* WADAH PENGHITUNG MATRIKS MURNI */}
      <div 
        ref={parentRef}
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ 
          width: gridSize * pixelSizePx, height: gridSize * pixelSizePx,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale * baseScale})`, 
          transition: isDrawing ? 'none' : 'transform 0.1s ease-out' 
        }}
      >
         <div className="absolute -top-6 w-full flex justify-center pointer-events-none"><span className="bg-red-500 text-white text-[8px] font-black px-3 py-1 rounded-t-md shadow-lg uppercase tracking-widest">SISI ATAS</span></div>
         <div className="grid shadow-[0_0_50px_rgba(0,0,0,0.8)] border-t-[3px] border-t-red-500 w-full h-full pointer-events-none" 
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                backgroundColor: isTransparent ? 'transparent' : canvasBgColor,
                backgroundImage: isTransparent ? 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)' : 'none',
                backgroundSize: '12px 12px',
                transform: `rotate(${rotation}deg)`
              }}>
           {mergedPixels.map((bg, i) => (
             <div key={i} className={`w-full h-full transition-colors duration-75 ${showGrid ? 'border-[0.5px] border-black/10' : 'border-0'}`} style={{ backgroundColor: bg !== 'transparent' ? bg : undefined }} />
           ))}
         </div>
      </div>
      
      {/* UNDO REDO */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button onClick={handleUndo} disabled={step <= 0} className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2a2a2a] bg-[#141414]/90 backdrop-blur text-slate-300 disabled:opacity-30 shadow-lg hover:text-white"><div className="w-4 h-4"><Icons.Undo /></div></button>
        <button onClick={handleRedo} disabled={step >= history.length - 1} className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2a2a2a] bg-[#141414]/90 backdrop-blur text-slate-300 disabled:opacity-30 shadow-lg hover:text-white"><div className="w-4 h-4"><Icons.Redo /></div></button>
      </div>
    </div>
  );

  const controls = (
    <div className="space-y-4">
      <PluginTip title="TUTORIAL PIXEL STUDIO" text="1. Resolusi Maksimal dibatasi ke 32x32 agar browser HP Anda tidak kelebihan beban memori (Crash) dan tetap mulus. 2. Jika Anda ingin zoom dan menggeser layar menggunakan 2 jari, pastikan Anda sedang memilih alat 'Geser' (Ikon Tangan) agar kanvas tidak tercoret tanpa sengaja. 3. Matikan saklar 'Tampilkan Grid' jika Anda ingin melihat hasil gambar murni tanpa garis pembatas." />
      
      <ControlHeader title="Workspace Setup" onReset={handleReset} />
      
      <div className="mb-4 mt-2">
         <FigmaToggle label="Tampilkan Garis Grid" checked={showGrid} onChange={setShowGrid} />
      </div>

      <div className="flex gap-3 mb-6">
        <input type="number" value={localGridInput} onChange={(e) => setLocalGridInput(e.target.value)} className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-mono text-[12px] shadow-inner outline-none focus:border-cyan-500 transition-colors" />
        <button onClick={() => setGridSize(Math.min(32, Math.max(8, parseInt(localGridInput))))} className="px-5 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-cyan-500/20 active:scale-95 transition-all">Set Grid</button>
      </div>

      <FigmaColorPicker label="Warna Kuas (Brush Color)" hexValue={color} onChange={setColor} />
      
      <div className="flex flex-wrap gap-2.5 mt-4">
        {palette.map((c, i) => (
          <button key={i} onClick={() => {setColor(c); setActiveTool('draw');}} className={`w-9 h-9 rounded-xl border-2 transition-transform shadow-sm ${color === c ? 'border-cyan-400 scale-110 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'border-[#333] hover:scale-105'}`} style={{backgroundColor: c}} />
        ))}
        <button onClick={() => !palette.includes(color) && setPalette([color, ...palette].slice(0, 15))} className="w-9 h-9 rounded-xl border-2 border-[#333] flex items-center justify-center text-slate-500 hover:text-white hover:border-[#555] bg-[#141414] transition-all">+</button>
      </div>

      {/* LAYERS PANEL */}
      <div className="pt-6 border-t border-[#1f1f1f] mt-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2"><Icons.Layers /> Layers Panel</span>
          <button onClick={addLayer} className="text-[9px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg uppercase tracking-wider hover:bg-cyan-500/20 transition-all">+ Layer Baru</button>
        </div>
        <div className="space-y-3 max-h-[180px] overflow-y-auto custom-scroll pr-2">
          {[...layers].reverse().map(l => (
            <div key={l.id} onClick={() => setActiveLayerId(l.id)} className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${activeLayerId === l.id ? 'bg-[#1a1a1a] border-cyan-500 shadow-md' : 'bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#444]'}`}>
              <div className="flex items-center gap-3">
                <button onClick={(e) => {e.stopPropagation(); toggleLayerProp(l.id, 'visible')}} className={`w-5 h-5 transition-colors ${l.visible ? 'text-cyan-400' : 'text-slate-600'}`}>{l.visible ? <Icons.Eye /> : <Icons.EyeOff />}</button>
                <button onClick={(e) => {e.stopPropagation(); toggleLayerProp(l.id, 'locked')}} className={`w-5 h-5 transition-colors ${l.locked ? 'text-red-400' : 'text-slate-500'}`}>{l.locked ? <Icons.Lock /> : <Icons.Unlock />}</button>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${activeLayerId === l.id ? 'text-white' : 'text-slate-400'}`}>{l.name} {activeLayerId === l.id && '(Aktif)'}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={(e) => {e.stopPropagation(); duplicateLayer(l.id)}} className="w-5 h-5 text-slate-400 hover:text-white transition-colors" title="Gandakan"><Icons.Copy /></button>
                <button onClick={(e) => {e.stopPropagation(); deleteLayer(l.id)}} disabled={layers.length <= 1} className="w-5 h-5 text-slate-400 hover:text-red-400 disabled:opacity-30 transition-colors"><Icons.Trash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#1f1f1f] mt-6">
        <FigmaColorPicker label="Warna Background Kanvas" hexValue={canvasBgColor} onChange={setCanvasBgColor} />
        <div className="mt-4 mb-6">
           <FigmaToggle label="Background Transparan (PNG)" checked={isTransparent} onChange={setIsTransparent} />
        </div>
        <FigmaSlider label="HD Export Size" min={gridSize} max={1920} step={gridSize} value={outputSize} onChange={setOutputSize} unit="px" />
        <button onClick={downloadImage} className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-[12px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2"><div className="w-5 h-5"><Icons.Download /></div> Download HD PNG</button>
      </div>
    </div>
  );

  return (
    <WorkspaceLayout 
      name="Pixel Drawing Pro" 
      preview={preview}
      controls={controls}
      cssOutput={`.pixel-art {\n  width: ${pixelSizePx}px;\n  height: ${pixelSizePx}px;\n  background-color: ${isTransparent ? 'transparent' : canvasBgColor};\n  box-shadow: ${boxShadowData || 'none'};\n}`}
      htmlOutput={`\n<div class="pixel-art"></div>`}
      jsxOutput={`<div className="pixel-art" />`}
    />
  );
};
