"use client";

import React, { useState, useEffect, useRef } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, WorkspaceLayout, ControlHeader, COLOR_PRESETS, useMultiTouch, FigmaToggle } from './ui';

// FIX MUTLAK ICON HILANG: Semua ikon ditanamkan langsung (Inline SVG) agar 100% aman dari bug render
const LocalIcons = {
  Focus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>,
  Brush: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.813-3.814a1.151 1.151 0 00-1.628-1.628l-3.814 3.813a15.995 15.995 0 00-4.648 4.764z" /></svg>,
  Eraser: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" /></svg>,
  Bucket: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" /></svg>,
  Picker: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>,
  HandPan: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>,
  Undo: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>,
  Redo: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" /></svg>,
  Expand: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71-.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  EyeOff: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
  Unlock: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.034 1.284.11 1.912.222a2.25 2.25 0 011.82 2.158v10.5a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25v-10.5a2.25 2.25 0 011.82-2.158A10.44 10.44 0 0113.5 2.25z" /></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
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
  
  // STATE BARU: FULLSCREEN KHUSUS MOBILE
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMobileSettings, setShowMobileSettings] = useState(false);

  const createEmptyLayer = (id, name) => ({
    id, name, pixels: Array(gridSize * gridSize).fill('transparent'), visible: true, locked: false
  });
  
  const [layers, setLayers] = useState([createEmptyLayer(1, "Layer 1")]);
  const [activeLayerId, setActiveLayerId] = useState(1);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(-1);
  
  // FIX BUG UNDO/REDO: Gunakan useRef untuk menyimpan data layer terbaru secara real-time saat dicoret
  const currentLayersRef = useRef(layers);
  useEffect(() => { currentLayersRef.current = layers; }, [layers]);

  const [baseScale, setBaseScale] = useState(1);
  useEffect(() => { 
    if (typeof window !== 'undefined') setBaseScale(window.innerWidth < 768 ? 0.6 : 1); 
  }, []);

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
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX; clientY = e.touches[0].clientY;
    }
    if (isDown) { setIsDrawing(true); paintByCoords(clientX, clientY); } 
    else if (isDrawing) { paintByCoords(clientX, clientY); }
  };

  const handlePointerUp = () => {
    // FIX UNDO BUG: Simpan perubahan ke history SAAT jari diangkat
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
  const boxShadowData = mergedPixels.map((p, i) => p !== 'transparent' ? `${(i % gridSize) * pixelSizePx}px ${Math.floor(i / gridSize) * pixelSizePx}px ${p}` : null).filter(Boolean).join(', ');

  // KOMPONEN AREA KANVAS (DIGUNAKAN BERSAMA OLEH MODE NORMAL & FULLSCREEN)
  const renderCanvasArea = () => (
    <div className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden bg-[#050505]"
      style={{ touchAction: 'none' }} // Kunci Anti-Overscroll
      onPointerDown={(e) => handlePointerEvent(e, true)} 
      onPointerMove={(e) => handlePointerEvent(e, false)} 
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchStart(e); else handlePointerEvent(e, true); }}
      onTouchMove={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchMove(e); else handlePointerEvent(e, false); }}
      onTouchEnd={handlePointerUp}
    >
      {/* UNDO REDO */}
      <div className={`absolute top-4 right-4 flex gap-2 z-20 ${isFullscreen ? 'opacity-100' : 'lg:opacity-100 opacity-50 hover:opacity-100'}`}>
        <button onClick={handleUndo} disabled={step <= 0} className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#141414]/90 backdrop-blur text-slate-300 disabled:opacity-30 shadow-lg hover:text-white transition-colors"><div className="w-5 h-5"><LocalIcons.Undo /></div></button>
        <button onClick={handleRedo} disabled={step >= history.length - 1} className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#141414]/90 backdrop-blur text-slate-300 disabled:opacity-30 shadow-lg hover:text-white transition-colors"><div className="w-5 h-5"><LocalIcons.Redo /></div></button>
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
            // FIX BUG GRID HILANG: Ubah warna grid jadi border-slate-500/30 agar terlihat di background putih/hitam
            <div key={i} className={`w-full h-full pointer-events-none transition-colors duration-75 ${showGrid ? 'border-[0.5px] border-slate-500/30' : 'border-0'}`} style={{ backgroundColor: bg !== 'transparent' ? bg : undefined }} />
          ))}
        </div>
      </div>
    </div>
  );

  // KOMPONEN TOOLBAR (Kuas, Penghapus, dll)
  const renderToolbar = () => (
    <>
      <button onClick={() => setActiveTool('draw')} className={`shrink-0 flex items-center justify-center gap-2 px-3 lg:w-12 lg:h-12 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider ${activeTool === 'draw' ? 'bg-cyan-500 text-black shadow-md lg:scale-110' : 'bg-[#141414] lg:bg-transparent text-slate-400 hover:bg-[#1f1f1f]'}`} title="Kuas"><div className="w-4 h-4 lg:w-5 lg:h-5"><LocalIcons.Brush /></div> <span className="lg:hidden">Kuas</span></button>
      <button onClick={() => setActiveTool('erase')} className={`shrink-0 flex items-center justify-center gap-2 px-3 lg:w-12 lg:h-12 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider ${activeTool === 'erase' ? 'bg-cyan-500 text-black shadow-md lg:scale-110' : 'bg-[#141414] lg:bg-transparent text-slate-400 hover:bg-[#1f1f1f]'}`} title="Penghapus"><div className="w-4 h-4 lg:w-5 lg:h-5"><LocalIcons.Eraser /></div> <span className="lg:hidden">Hapus</span></button>
      <button onClick={() => setActiveTool('bucket')} className={`shrink-0 flex items-center justify-center gap-2 px-3 lg:w-12 lg:h-12 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider ${activeTool === 'bucket' ? 'bg-cyan-500 text-black shadow-md lg:scale-110' : 'bg-[#141414] lg:bg-transparent text-slate-400 hover:bg-[#1f1f1f]'}`} title="Ember Cat"><div className="w-4 h-4 lg:w-5 lg:h-5"><LocalIcons.Bucket /></div> <span className="lg:hidden">Isi</span></button>
      <button onClick={() => setActiveTool('picker')} className={`shrink-0 flex items-center justify-center gap-2 px-3 lg:w-12 lg:h-12 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider ${activeTool === 'picker' ? 'bg-cyan-500 text-black shadow-md lg:scale-110' : 'bg-[#141414] lg:bg-transparent text-slate-400 hover:bg-[#1f1f1f]'}`} title="Pipet"><div className="w-4 h-4 lg:w-5 lg:h-5"><LocalIcons.Picker /></div> <span className="lg:hidden">Pipet</span></button>
      <div className="w-px h-6 lg:w-8 lg:h-px bg-[#333] shrink-0 mx-1 lg:my-1"></div>
      <button onClick={() => setActiveTool('pan')} className={`shrink-0 flex items-center justify-center gap-2 px-3 lg:w-12 lg:h-12 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider ${activeTool === 'pan' ? 'bg-amber-500 text-black shadow-md lg:scale-110' : 'bg-[#141414] lg:bg-transparent text-slate-400 hover:bg-[#1f1f1f]'}`} title="Geser Kanvas"><div className="w-4 h-4 lg:w-5 lg:h-5"><LocalIcons.HandPan /></div> <span className="lg:hidden">Geser</span></button>
      <button onClick={resetView} className="shrink-0 flex items-center justify-center gap-2 px-3 lg:w-12 lg:h-12 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider bg-[#141414] lg:bg-transparent text-slate-400 hover:bg-[#1f1f1f] hover:text-white" title="Fokus/Tengah"><div className="w-4 h-4 lg:w-5 lg:h-5"><LocalIcons.Focus /></div> <span className="lg:hidden">Fokus</span></button>
    </>
  );

  const controlsContent = (
    <div className="space-y-4">
      {!isFullscreen && (
         <div className="lg:hidden mb-4">
            <button onClick={() => setIsFullscreen(true)} className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#141414] border border-[#333] hover:border-cyan-500 rounded-xl text-cyan-400 font-black uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all">
               <div className="w-4 h-4"><LocalIcons.Expand /></div> BUKA LAYAR PENUH (FULLSCREEN)
            </button>
         </div>
      )}
      
      <PluginTip title="TUTORIAL PIXEL STUDIO" text="1. Resolusi Maksimal dibatasi ke 32x32 agar browser HP Anda tetap mulus. 2. Pilih alat 'Geser' (Ikon Tangan) jika ingin zoom menggunakan 2 jari agar kanvas tidak tercoret tanpa sengaja. 3. Klik tombol Layar Penuh di atas untuk menggambar tanpa gangguan!" />
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
          <span className="text-[12px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2"><LocalIcons.Layers /> Layers Panel</span>
          <button onClick={addLayer} className="text-[9px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg uppercase tracking-wider hover:bg-cyan-500/20 transition-all">+ Layer Baru</button>
        </div>
        {/* FIX BUG IKON PENYOK: Menambahkan class w-6 h-6 shrink-0 dan p-1 */}
        <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scroll pr-2">
          {[...layers].reverse().map(l => (
            <div key={l.id} onClick={() => setActiveLayerId(l.id)} className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all ${activeLayerId === l.id ? 'bg-[#1a1a1a] border-cyan-500 shadow-md' : 'bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#444]'}`}>
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-2">
                <button onClick={(e) => {e.stopPropagation(); toggleLayerProp(l.id, 'visible')}} className={`w-6 h-6 p-1 shrink-0 flex items-center justify-center transition-colors ${l.visible ? 'text-cyan-400' : 'text-slate-600'}`}>{l.visible ? <LocalIcons.Eye /> : <LocalIcons.EyeOff />}</button>
                <button onClick={(e) => {e.stopPropagation(); toggleLayerProp(l.id, 'locked')}} className={`w-6 h-6 p-1 shrink-0 flex items-center justify-center transition-colors ${l.locked ? 'text-red-400' : 'text-slate-500'}`}>{l.locked ? <LocalIcons.Lock /> : <LocalIcons.Unlock />}</button>
                <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate ${activeLayerId === l.id ? 'text-white' : 'text-slate-400'}`}>{l.name} {activeLayerId === l.id && '(Aktif)'}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={(e) => {e.stopPropagation(); duplicateLayer(l.id)}} className="w-6 h-6 p-1 flex items-center justify-center shrink-0 text-slate-400 hover:text-white transition-colors" title="Gandakan"><LocalIcons.Copy /></button>
                <button onClick={(e) => {e.stopPropagation(); deleteLayer(l.id)}} disabled={layers.length <= 1} className="w-6 h-6 p-1 flex items-center justify-center shrink-0 text-slate-400 hover:text-red-400 disabled:opacity-30 transition-colors"><LocalIcons.Trash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#1f1f1f] mt-6">
        <FigmaColorPicker label="Warna Background Kanvas" hexValue={canvasBgColor} onChange={setCanvasBgColor} />
        <div className="mt-4 mb-6"><FigmaToggle label="Background Transparan (PNG)" checked={isTransparent} onChange={setIsTransparent} /></div>
        <FigmaSlider label="HD Export Size" min={gridSize} max={1920} step={gridSize} value={outputSize} onChange={setOutputSize} unit="px" />
        <button onClick={downloadImage} className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-[12px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2"><div className="w-5 h-5"><LocalIcons.Download /></div> Download HD PNG</button>
      </div>
    </div>
  );

  // RENDER: FULLSCREEN MODE (KHUSUS MOBILE)
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col font-sans animate-fade-in-fast">
         {/* HEADER FULLSCREEN */}
         <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-[#1f1f1f] shadow-md z-30">
            <button onClick={() => setIsFullscreen(false)} className="flex items-center gap-2 text-red-400 font-bold text-[10px] uppercase tracking-widest bg-red-500/10 px-3 py-2 rounded-lg"><div className="w-4 h-4"><LocalIcons.Close /></div> Tutup Layar</button>
            <span className="text-[12px] font-black text-white uppercase tracking-widest">Pixel Studio</span>
         </div>
         
         {/* CANVAS & BOTTOM TOOLBAR */}
         {renderCanvasArea()}
         <div className="w-full bg-[#0a0a0a] border-t border-[#2a2a2a] p-3 flex items-center gap-2.5 overflow-x-auto custom-scroll shrink-0 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            {renderToolbar()}
            <div className="w-px h-6 bg-[#333] shrink-0 mx-1"></div>
            <button onClick={() => setShowMobileSettings(true)} className="shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20 active:scale-95"><div className="w-4 h-4"><LocalIcons.Settings /></div> Alat Desain</button>
         </div>

         {/* BOTTOM SHEET (SETTINGS & LAYERS) */}
         <div className={`fixed inset-0 z-50 flex flex-col justify-end transition-all duration-300 ${showMobileSettings ? 'bg-black/60 backdrop-blur-sm pointer-events-auto opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-[#0a0a0a] border-t border-[#2a2a2a] rounded-t-3xl p-6 pb-12 w-full max-h-[85vh] overflow-y-auto shadow-[0_-20px_50px_rgba(0,0,0,0.8)] transition-transform duration-300 ${showMobileSettings ? 'translate-y-0' : 'translate-y-full'}`}>
               <div className="flex justify-between items-center mb-6 border-b border-[#1f1f1f] pb-4">
                  <h3 className="font-black text-white uppercase tracking-widest text-[13px] flex items-center gap-2"><div className="w-5 h-5 text-cyan-500"><LocalIcons.Settings /></div> Pengaturan Desain</h3>
                  <button onClick={() => setShowMobileSettings(false)} className="w-8 h-8 flex items-center justify-center bg-[#1f1f1f] text-slate-400 rounded-full hover:text-white"><div className="w-5 h-5"><LocalIcons.Close /></div></button>
               </div>
               {controlsContent}
            </div>
         </div>
      </div>
    );
  }

  // RENDER: NORMAL MODE
  return (
    <WorkspaceLayout 
      name="Pixel Drawing Pro" 
      preview={
        <div className="relative w-full h-[55vh] sm:h-[450px] flex flex-col overflow-hidden bg-[#050505] rounded-xl border border-[#1f1f1f]">
          <div className="lg:hidden w-full bg-[#0a0a0a] border-b border-[#2a2a2a] p-2 flex items-center gap-2.5 overflow-x-auto custom-scroll shrink-0 z-20 shadow-md">
            {renderToolbar()}
          </div>
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-4 z-50 flex-col gap-2 p-1.5 bg-[#141414]/95 backdrop-blur-md border border-[#2a2a2a] rounded-2xl shadow-xl">
            {renderToolbar()}
          </div>
          {renderCanvasArea()}
        </div>
      } 
      controls={controlsContent}
      cssOutput={`.pixel-art {\n  width: ${pixelSizePx}px;\n  height: ${pixelSizePx}px;\n  background-color: ${isTransparent ? 'transparent' : canvasBgColor};\n  box-shadow: ${boxShadowData || 'none'};\n}`}
      htmlOutput={`\n<div class="pixel-art"></div>`}
      jsxOutput={`<div className="pixel-art" />`}
    />
  );
};
