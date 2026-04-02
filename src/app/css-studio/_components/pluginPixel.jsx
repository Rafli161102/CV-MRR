"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, ControlHeader, COLOR_PRESETS, useMultiTouch, FigmaToggle } from './ui';

// Tombol Pintar untuk Toolbar agar UI rapi
const ToolBtn = ({ icon, active, onClick, label }) => (
  <button onClick={onClick} className={`shrink-0 flex items-center justify-center gap-2 px-3 lg:w-12 lg:h-12 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider ${active ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)] lg:scale-110' : 'bg-[#141414] lg:bg-transparent text-slate-400 hover:bg-[#1f1f1f] hover:text-white'}`}>
     <div className="w-4 h-4 lg:w-5 lg:h-5">{icon}</div> <span className="lg:hidden">{label}</span>
  </button>
);

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

  const createEmptyLayer = (id, name) => ({ id, name, pixels: Array(gridSize * gridSize).fill('transparent'), visible: true, locked: false });
  const [layers, setLayers] = useState([createEmptyLayer(1, "Layer 1")]);
  const [activeLayerId, setActiveLayerId] = useState(1);
  
  // FIX UNDO/REDO: Gunakan state history dan useRef sebagai pemantau mutlak
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(-1);
  const currentLayersRef = useRef(layers);
  useEffect(() => { currentLayersRef.current = layers; }, [layers]);

  const [baseScale, setBaseScale] = useState(1);
  useEffect(() => { if (typeof window !== 'undefined') setBaseScale(window.innerWidth < 768 ? 0.6 : 1); }, []);

  const { scale, pan, rotation, setScale, setPan, onTouchStart, onTouchMove, resetView } = useMultiTouch();
  const [activeTool, setActiveTool] = useState('draw'); 
  const [isDrawing, setIsDrawing] = useState(false);
  const gridRef = useRef(null);

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

  const saveHistory = (newLayersToSave) => {
    const newHistory = history.slice(0, step + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLayersToSave)));
    if (newHistory.length > 10) newHistory.shift(); 
    setHistory(newHistory); setStep(newHistory.length - 1);
  };

  const handleUndo = () => { const newStep = Math.max(0, step - 1); setStep(newStep); setLayers(JSON.parse(JSON.stringify(history[newStep]))); };
  const handleRedo = () => { const newStep = Math.min(history.length - 1, step + 1); setStep(newStep); setLayers(JSON.parse(JSON.stringify(history[newStep]))); };

  const paintPixel = (index) => {
    if (activeTool === 'pan' || activeTool === 'picker') return;
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

  const paintByCoords = (clientX, clientY) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const pixelSizePx = gridSize <= 8 ? 20 : gridSize <= 16 ? 12 : gridSize <= 32 ? 6 : 4;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;

    const angleRad = -rotation * (Math.PI / 180);
    const rotatedX = dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
    const rotatedY = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);

    const actualScale = scale * baseScale;
    const unscaledX = (rotatedX / actualScale) + ((gridSize * pixelSizePx) / 2);
    const unscaledY = (rotatedY / actualScale) + ((gridSize * pixelSizePx) / 2);

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

  const handlePointerEvent = (e, isDown = false) => {
    if (activeTool === 'pan' || (e.touches && e.touches.length > 1)) return;
    let clientX = e.clientX, clientY = e.clientY;
    if (e.touches && e.touches.length > 0) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
    if (isDown) { setIsDrawing(true); paintByCoords(clientX, clientY); } 
    else if (isDrawing) { paintByCoords(clientX, clientY); }
  };

  const handlePointerUp = () => {
    // FIX UNDO MUTLAK: Mengunci history setelah jari diangkat!
    if (isDrawing) { setIsDrawing(false); saveHistory(currentLayersRef.current); }
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
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMobileSettings, setShowMobileSettings] = useState(false);

  // KOMPONEN KANVAS BERSAMA
  const renderCanvasArea = () => (
    <div className="flex-1 relative w-full flex items-center justify-center overflow-hidden bg-[#000000]"
      style={{ touchAction: 'none' }} // Kunci Anti-Overscroll
      onPointerDown={(e) => handlePointerEvent(e, true)} 
      onPointerMove={(e) => handlePointerEvent(e, false)} 
      onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
      onTouchStart={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchStart(e); else handlePointerEvent(e, true); }}
      onTouchMove={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchMove(e); else handlePointerEvent(e, false); }}
      onTouchEnd={handlePointerUp}
    >
      <div className={`absolute top-4 right-4 flex gap-2 z-20`}>
        <button onClick={handleUndo} disabled={step <= 0} className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#141414]/90 backdrop-blur text-slate-300 disabled:opacity-30 shadow-lg hover:text-white transition-colors"><Icons.Undo /></button>
        <button onClick={handleRedo} disabled={step >= history.length - 1} className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#141414]/90 backdrop-blur text-slate-300 disabled:opacity-30 shadow-lg hover:text-white transition-colors"><Icons.Redo /></button>
      </div>

      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale * baseScale}) rotate(${rotation}deg)`, transition: isDrawing ? 'none' : 'transform 0.1s ease-out' }} className="absolute">
        <div className="absolute -top-7 left-0 w-full flex justify-center pointer-events-none"><span className="bg-red-500 text-white text-[9px] font-black px-4 py-1.5 rounded-t-lg shadow-lg uppercase tracking-widest">SISI ATAS</span></div>
        <div ref={gridRef} className="grid shadow-[0_0_50px_rgba(0,0,0,0.8)] border-t-[4px] border-t-red-500" 
             style={{ 
               gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: gridSize * pixelSizePx, height: gridSize * pixelSizePx,
               backgroundColor: isTransparent ? 'transparent' : canvasBgColor,
               backgroundImage: isTransparent ? 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)' : 'none',
               backgroundSize: '12px 12px'
             }}>
          {mergedPixels.map((bg, i) => (
            // FIX BUG GRID GA NYALA: border-[#333] agar selalu terlihat meski background terang atau gelap!
            <div key={i} data-pixel-index={i} className={`w-full h-full pointer-events-none transition-colors duration-75 ${showGrid ? 'border-[0.5px] border-[#333]' : 'border-0'}`} style={{ backgroundColor: bg !== 'transparent' ? bg : undefined }} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderToolbar = () => (
    <>
      <ToolBtn icon={<Icons.Brush />} active={activeTool==='draw'} onClick={()=>setActiveTool('draw')} label="Kuas" />
      <ToolBtn icon={<Icons.Eraser />} active={activeTool==='erase'} onClick={()=>setActiveTool('erase')} label="Hapus" />
      <ToolBtn icon={<Icons.Bucket />} active={activeTool==='bucket'} onClick={()=>setActiveTool('bucket')} label="Ember" />
      <ToolBtn icon={<Icons.Picker />} active={activeTool==='picker'} onClick={()=>setActiveTool('picker')} label="Pipet" />
      <div className="w-px h-6 lg:w-8 lg:h-px bg-[#333] mx-1 lg:my-1 shrink-0"></div>
      <ToolBtn icon={<Icons.HandPan />} active={activeTool==='pan'} onClick={()=>setActiveTool('pan')} label="Geser" />
      <button onClick={resetView} className="shrink-0 flex items-center justify-center gap-2 px-3 lg:w-12 lg:h-12 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider bg-[#141414] lg:bg-transparent text-slate-400 hover:bg-[#1f1f1f] hover:text-white" title="Fokus"><div className="w-4 h-4 lg:w-5 lg:h-5"><Icons.Focus /></div> <span className="lg:hidden">Fokus</span></button>
    </>
  );

  const controlsContent = (
    <div className="space-y-4">
      {!isFullscreen && (
         <div className="lg:hidden mb-4">
            <button onClick={() => setIsFullscreen(true)} className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#141414] border border-[#333] hover:border-cyan-500 rounded-xl text-cyan-400 font-black uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all">
               <div className="w-4 h-4"><Icons.Expand /></div> LAYAR PENUH (FULLSCREEN)
            </button>
         </div>
      )}
      
      <PluginTip title="TUTORIAL PIXEL STUDIO" text="1. Resolusi Maksimal dibatasi ke 32x32 agar browser HP Anda tetap mulus. 2. Pilih alat 'Geser' (Ikon Tangan) jika ingin zoom menggunakan 2 jari agar kanvas tidak tercoret tanpa sengaja. 3. Matikan saklar 'Tampilkan Grid' untuk melihat hasil gambar bersih sebelum di-download." />
      <ControlHeader title="Workspace Setup" onReset={() => {}} />
      <div className="mb-4 mt-2"><FigmaToggle label="Tampilkan Garis Grid" checked={showGrid} onChange={setShowGrid} /></div>
      
      <div className="flex gap-3 mb-6">
        <input type="number" value={localGridInput} onChange={(e) => setLocalGridInput(e.target.value)} className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white font-mono text-[12px] shadow-inner outline-none focus:border-cyan-500 transition-colors" />
        <button onClick={() => setGridSize(Math.min(32, Math.max(8, parseInt(localGridInput))))} className="px-5 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-cyan-500/20 active:scale-95 transition-all">Set Grid</button>
      </div>

      <FigmaColorPicker label="Warna Kuas (Brush Color)" hexValue={color} onChange={setColor} />
      <div className="flex flex-wrap gap-2.5 mt-4">
        {palette.map((c, i) => (
          <button key={i} onClick={() => {setColor(c); setActiveTool('draw');}} className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 transition-transform shadow-sm shrink-0 ${color === c ? 'border-cyan-400 scale-110 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'border-[#333] hover:scale-105'}`} style={{backgroundColor: c}} />
        ))}
        <button onClick={() => !palette.includes(color) && setPalette([color, ...palette].slice(0, 15))} className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 border-[#333] flex items-center justify-center shrink-0 text-slate-500 hover:text-white hover:border-[#555] bg-[#141414] transition-all">+</button>
      </div>

      <div className="pt-6 border-t border-[#1f1f1f] mt-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2"><Icons.Layers /> Layers Panel</span>
          <button onClick={addLayer} className="text-[9px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg uppercase tracking-wider hover:bg-cyan-500/20 transition-all">+ Layer Baru</button>
        </div>
        {/* FIX BUG IKON LAYER KEPENYET: Pakai w-6 h-6 shrink-0 */}
        <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scroll pr-2">
          {[...layers].reverse().map(l => (
            <div key={l.id} onClick={() => setActiveLayerId(l.id)} className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all ${activeLayerId === l.id ? 'bg-[#1a1a1a] border-cyan-500 shadow-md' : 'bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#444]'}`}>
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
                <button onClick={(e) => {e.stopPropagation(); toggleLayerProp(l.id, 'visible')}} className={`w-6 h-6 p-1 shrink-0 flex items-center justify-center transition-colors ${l.visible ? 'text-cyan-400' : 'text-slate-600'}`}>{l.visible ? <Icons.Eye /> : <Icons.EyeOff />}</button>
                <button onClick={(e) => {e.stopPropagation(); toggleLayerProp(l.id, 'locked')}} className={`w-6 h-6 p-1 shrink-0 flex items-center justify-center transition-colors ${l.locked ? 'text-red-400' : 'text-slate-500'}`}>{l.locked ? <Icons.Lock /> : <Icons.Unlock />}</button>
                <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate ${activeLayerId === l.id ? 'text-white' : 'text-slate-400'}`}>{l.name} {activeLayerId === l.id && '(Aktif)'}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={(e) => {e.stopPropagation(); duplicateLayer(l.id)}} className="w-6 h-6 p-1 flex items-center justify-center shrink-0 text-slate-400 hover:text-white transition-colors" title="Gandakan"><Icons.Copy /></button>
                <button onClick={(e) => {e.stopPropagation(); deleteLayer(l.id)}} disabled={layers.length <= 1} className="w-6 h-6 p-1 flex items-center justify-center shrink-0 text-slate-400 hover:text-red-400 disabled:opacity-30 transition-colors"><Icons.Trash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#1f1f1f] mt-6">
        <FigmaColorPicker label="Warna Background Kanvas" hexValue={canvasBgColor} onChange={setCanvasBgColor} />
        <div className="mt-4 mb-6"><FigmaToggle label="Background Transparan (PNG)" checked={isTransparent} onChange={setIsTransparent} /></div>
        <FigmaSlider label="HD Export Size" min={gridSize} max={1920} step={gridSize} value={outputSize} onChange={setOutputSize} unit="px" />
        <button onClick={downloadImage} className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-[12px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2"><div className="w-5 h-5"><Icons.Download /></div> Download HD PNG</button>
      </div>
    </div>
  );

  // RENDER 1: FULLSCREEN MOBILE (FITUR BARU)
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col font-sans animate-fade-in-fast">
         {/* HEADER FULLSCREEN */}
         <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-[#1f1f1f] shadow-md z-30 shrink-0">
            <button onClick={() => setIsFullscreen(false)} className="flex items-center gap-2 text-red-400 font-bold text-[10px] uppercase tracking-widest bg-red-500/10 px-3 py-2 rounded-lg hover:bg-red-500/20"><div className="w-4 h-4"><Icons.Close /></div> Tutup Layar</button>
            <span className="text-[12px] font-black text-white uppercase tracking-widest">Pixel Studio</span>
         </div>
         
         {/* CANVAS AREA FULLSCREEN */}
         {renderCanvasArea()}
         
         {/* BOTTOM BAR TOOLBAR FULLSCREEN */}
         <div className="w-full bg-[#050505] border-t border-[#1f1f1f] p-3 flex items-center gap-2.5 overflow-x-auto custom-scroll shrink-0 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            {renderToolbar()}
            <div className="w-px h-6 bg-[#333] shrink-0 mx-1"></div>
            <button onClick={() => setShowMobileSettings(true)} className="shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20 active:scale-95"><div className="w-4 h-4"><Icons.Settings /></div> Alat Desain</button>
         </div>

         {/* BOTTOM SHEET: SETTINGS (MUNCUL DARI BAWAH) */}
         <div className={`fixed inset-0 z-[110] flex flex-col justify-end transition-all duration-300 ${showMobileSettings ? 'bg-black/60 backdrop-blur-sm pointer-events-auto opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-[#0a0a0a] border-t border-[#2a2a2a] rounded-t-3xl p-6 pb-12 w-full max-h-[85vh] overflow-y-auto custom-scroll shadow-[0_-20px_50px_rgba(0,0,0,0.8)] transition-transform duration-300 ${showMobileSettings ? 'translate-y-0' : 'translate-y-full'}`}>
               <div className="flex justify-between items-center mb-6 border-b border-[#1f1f1f] pb-4 sticky top-0 bg-[#0a0a0a] z-10">
                  <h3 className="font-black text-white uppercase tracking-widest text-[13px] flex items-center gap-2"><div className="w-5 h-5 text-cyan-500"><Icons.Settings /></div> Pengaturan Desain</h3>
                  <button onClick={() => setShowMobileSettings(false)} className="w-8 h-8 flex items-center justify-center bg-[#1f1f1f] text-slate-400 rounded-full hover:text-white"><div className="w-5 h-5"><Icons.Close /></div></button>
               </div>
               {controlsContent}
            </div>
         </div>
      </div>
    );
  }

  // RENDER 2: NORMAL DESKTOP LAYOUT (BYPASS WORKSPACELAYOUT)
  return (
    <div className="w-full h-full flex flex-col lg:flex-row bg-[#050505] overflow-hidden">
       {/* CANVAS SECTION */}
       <div className="relative flex-1 lg:flex-[2] flex flex-col border-b lg:border-b-0 lg:border-r border-[#1f1f1f] overflow-hidden">
          <div className="lg:hidden w-full bg-[#0a0a0a] border-b border-[#2a2a2a] p-2 flex items-center gap-2 overflow-x-auto custom-scroll shrink-0 z-20 shadow-md">
            {renderToolbar()}
          </div>
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-4 z-50 flex-col gap-2 p-1.5 bg-[#141414]/95 backdrop-blur-md border border-[#2a2a2a] rounded-2xl shadow-xl">
            {renderToolbar()}
          </div>
          {renderCanvasArea()}
       </div>

       {/* CONTROL SECTION DESKTOP/MOBILE NORMAL */}
       <div className="h-[45vh] lg:h-full lg:w-[400px] flex flex-col bg-[#0a0a0a] z-30 shrink-0 shadow-2xl">
          <div className="px-6 py-5 border-b border-[#1f1f1f] bg-[#0a0a0a] shrink-0">
             <h2 className="text-[15px] font-black text-white uppercase tracking-widest flex items-center gap-3">
               <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span> Pixel Drawing Pro
             </h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-6 lg:p-8 pb-32 lg:pb-12">
             {controlsContent}
          </div>
       </div>
    </div>
  );
};
