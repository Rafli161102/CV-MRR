"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FigmaSlider, FigmaColorPicker, COLOR_PRESETS, useMultiTouch, FigmaToggle } from './ui';

// 1. IKON SVG (Ditanam langsung agar anti-hilang, dengan ukuran presisi)
const PixIcons = {
  Brush: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.813-3.814a1.151 1.151 0 00-1.628-1.628l-3.814 3.813a15.995 15.995 0 00-4.648 4.764z" /></svg>,
  Eraser: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" /></svg>,
  Bucket: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" /></svg>,
  Picker: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>,
  HandPan: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>,
  Focus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>,
  Undo: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>,
  Redo: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" /></svg>,
  Layers: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>,
  Expand: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71-.505-.781.929l-.149.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  EyeOff: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
  Unlock: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
  Copy: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.034 1.284.11 1.912.222a2.25 2.25 0 011.82 2.158v10.5a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25v-10.5a2.25 2.25 0 011.82-2.158A10.44 10.44 0 0113.5 2.25z" /></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
};

// Algoritma Cat Ember (Flood Fill)
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

// Pengunci Bubbling Event untuk UI agar tidak memicu coretan di belakangnya
const stopProp = (e) => { 
   e.stopPropagation(); 
   if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) e.nativeEvent.stopImmediatePropagation(); 
};

export const PluginPixelDrawing = () => {
  // SETTINGS
  const [gridSize, setGridSize] = useState(16);
  const [localGridInput, setLocalGridInput] = useState('16');
  const [canvasBgColor, setCanvasBgColor] = useState('#ffffff');
  const [isTransparent, setIsTransparent] = useState(false);
  const [showGrid, setShowGrid] = useState(true); 
  const [color, setColor] = useState('#0ea5e9');
  const [palette, setPalette] = useState(['#ffffff', '#1e1e1e', '#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444']);
  const [outputSize, setOutputSize] = useState(1080);
  
  // NAVIGASI MOBILE TAB TAMPILAN NATIVE
  const [mobileTab, setMobileTab] = useState('tools'); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // LAYER & HISTORY
  const createEmptyLayer = (id, name) => ({ id, name, pixels: Array(gridSize * gridSize).fill('transparent'), visible: true, locked: false });
  const [layers, setLayers] = useState([]);
  const [activeLayerId, setActiveLayerId] = useState(1);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(-1);
  const currentLayersRef = useRef([]);

  // KANVAS & MULTI-TOUCH
  const { scale, pan, rotation, setScale, setPan, onTouchStart: onTouchStartMulti, onTouchMove: onTouchMoveMulti, resetView } = useMultiTouch();
  const [activeTool, setActiveTool] = useState('draw'); 
  const [isDrawing, setIsDrawing] = useState(false);
  
  // REFERENSI DOM
  const containerRef = useRef(null);
  const canvasAreaRef = useRef(null);
  const gridRef = useRef(null);

  // 1. FIX MUTLAK PULL-TO-REFRESH & SCROLL BROWSER
  // Listener non-pasif agresif untuk mengunci scroll
  useEffect(() => {
    const el = canvasAreaRef.current;
    
    // Fungsi untuk mencegah scroll browser SAAT menyentuh area kanvas
    const preventScroll = (e) => { 
        // Biarkan zoom 2 jari lewat untuk fungsi pan/zoom
        if (e.touches && e.touches.length > 1) return;
        e.preventDefault(); 
    };
    
    if (el) {
      el.addEventListener('touchstart', preventScroll, { passive: false });
      el.addEventListener('touchmove', preventScroll, { passive: false });
    }
    
    return () => {
      if (el) {
        el.removeEventListener('touchstart', preventScroll);
        el.removeEventListener('touchmove', preventScroll);
      }
    };
  }, []);

  const [baseScale, setBaseScale] = useState(1);
  useEffect(() => { 
    if (typeof window !== 'undefined') setBaseScale(window.innerWidth < 768 ? 0.6 : 1); 
  }, []);

  // Inisialisasi Kanvas Awal saat Grid berubah
  useEffect(() => {
    const safeGrid = Math.min(Math.max(gridSize, 8), 32); 
    const initialLayers = [createEmptyLayer(1, "Layer 1")];
    setLayers(initialLayers); 
    currentLayersRef.current = initialLayers;
    setHistory([JSON.parse(JSON.stringify(initialLayers))]); 
    setStep(0); 
    setActiveLayerId(1);
    setLocalGridInput(safeGrid.toString()); 
    resetView();
  }, [gridSize]);

  // Pantau perubahan untuk tracking Ref mutlak
  useEffect(() => { currentLayersRef.current = layers; }, [layers]);

  const mergedPixels = Array(gridSize * gridSize).fill('transparent');
  if (layers && layers.length > 0) {
     layers.forEach(layer => {
       if (!layer.visible) return;
       layer.pixels.forEach((p, j) => { if (p !== 'transparent') mergedPixels[j] = p; });
     });
  }

  // 2. SISTEM UNDO/REDO MENCEGAH RACE CONDITION
  const saveHistory = useCallback(() => {
    const currentStr = JSON.stringify(currentLayersRef.current);
    const lastStr = JSON.stringify(history[step]);
    
    // Hanya simpan jika benar-benar ada perubahan piksel (mencegah bug history numpuk kosong)
    if (currentStr !== lastStr) {
        const newHistory = history.slice(0, step + 1);
        newHistory.push(JSON.parse(currentStr));
        if (newHistory.length > 20) newHistory.shift(); // Limit memori 20 step
        setHistory(newHistory); 
        setStep(newHistory.length - 1);
    }
  }, [history, step]);

  const handleUndo = () => { 
     if (step <= 0) return;
     const newStep = step - 1;
     setStep(newStep); 
     const oldState = JSON.parse(JSON.stringify(history[newStep]));
     setLayers(oldState); 
     currentLayersRef.current = oldState;
     lastPaintedIndex.current = -1; // Reset anti-lag
  };
  
  const handleRedo = () => { 
     if (step >= history.length - 1) return;
     const newStep = step + 1;
     setStep(newStep); 
     const newState = JSON.parse(JSON.stringify(history[newStep]));
     setLayers(newState); 
     currentLayersRef.current = newState;
     lastPaintedIndex.current = -1; // Reset anti-lag
  };

  const paintPixel = (index) => {
    if (activeTool === 'pan' || activeTool === 'picker') return;
    const newLayers = [...layers];
    const activeIdx = newLayers.findIndex(l => l.id === activeLayerId);
    if (activeIdx === -1 || newLayers[activeIdx].locked || !newLayers[activeIdx].visible) return;

    let changed = false;
    if (activeTool === 'bucket') {
      const newPixels = floodFill(newLayers[activeIdx].pixels, index, newLayers[activeIdx].pixels[index], color, gridSize);
      if (newPixels !== newLayers[activeIdx].pixels) { 
          newLayers[activeIdx] = { ...newLayers[activeIdx], pixels: newPixels }; 
          changed = true; 
      }
    } else {
      const targetColor = activeTool === 'erase' ? 'transparent' : color;
      if (newLayers[activeIdx].pixels[index] !== targetColor) {
         const newPixels = [...newLayers[activeIdx].pixels]; 
         newPixels[index] = targetColor;
         newLayers[activeIdx] = { ...newLayers[activeIdx], pixels: newPixels }; 
         changed = true;
      }
    }

    if (changed) {
       setLayers(newLayers); 
       currentLayersRef.current = newLayers; // Sinkronisasi ref instan!
    }
  };

  // 3. MATEMATIKA PENENTU KOORDINAT & PERFORMA ANTI-LAG
  const lastPaintedIndex = useRef(-1); // Menyimpan index kotak terakhir yg digambar

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

    // FIX LAG: Hentikan eksekusi jika jari masih di atas kotak piksel yang sama (Mencegah Overload RAM)
    if (index === lastPaintedIndex.current) return;
    lastPaintedIndex.current = index;

    if (index >= 0 && index < gridSize * gridSize) {
      if (activeTool === 'picker') {
        const picked = mergedPixels[index] !== 'transparent' ? mergedPixels[index] : (isTransparent ? '#ffffff' : canvasBgColor);
        setColor(picked); setActiveTool('draw'); return;
      }
      paintPixel(index);
    }
  };

  // ENGINE PENANGKAP SENSOR JARI SUPER MULUS
  const handlePointerDown = (e) => {
    if (e.pointerType === 'touch' && activeTool === 'pan') return; // Biarkan pan jalan via multi-touch
    setIsDrawing(true); 
    lastPaintedIndex.current = -1; // Reset memory saat mulai mencoret
    paintByCoords(e.clientX, e.clientY);
  };
  
  const handlePointerMove = (e) => {
    if (e.pointerType === 'touch' && activeTool === 'pan') return;
    if (!isDrawing) return;
    paintByCoords(e.clientX, e.clientY);
  };
  
  const handlePointerUp = () => {
    if (isDrawing) { 
        setIsDrawing(false); 
        lastPaintedIndex.current = -1;
        saveHistory(); // Simpan history saat jari diangkat
    }
  };

  // FULLSCREEN ENGINE CERDAS (Auto-Rotate to Landscape)
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current.requestFullscreen) await containerRef.current.requestFullscreen();
        else if (containerRef.current.webkitRequestFullscreen) await containerRef.current.webkitRequestFullscreen();
        
        // Memaksa HP miring saat fullscreen!
        if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
          await window.screen.orientation.lock('landscape').catch(() => console.log('Auto rotate tidak didukung.'));
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        
        if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
          window.screen.orientation.unlock();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error(err);
      setIsFullscreen(!isFullscreen);
    }
  };

  const addLayer = () => { const newId = Date.now(); const newLayers = [...layers, createEmptyLayer(newId, `Layer ${layers.length + 1}`)]; setLayers(newLayers); setActiveLayerId(newId); setTimeout(saveHistory, 50); };
  const duplicateLayer = (id) => { const layerToCopy = layers.find(l => l.id === id); if (!layerToCopy) return; const newId = Date.now(); const newLayers = [...layers, { ...layerToCopy, id: newId, name: `${layerToCopy.name} Copy` }]; setLayers(newLayers); setActiveLayerId(newId); setTimeout(saveHistory, 50); };
  const deleteLayer = (id) => { if (layers.length <= 1) return; const newLayers = layers.filter(l => l.id !== id); setLayers(newLayers); if (activeLayerId === id) setActiveLayerId(newLayers[newLayers.length - 1].id); setTimeout(saveHistory, 50); };
  const toggleLayerProp = (id, prop) => { const newLayers = layers.map(l => l.id === id ? { ...l, [prop]: !l[prop] } : l); setLayers(newLayers); setTimeout(saveHistory, 50); };

  const downloadImage = () => {
    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
    canvas.width = outputSize; canvas.height = outputSize; const pSize = outputSize / gridSize;
    if (!isTransparent) { ctx.fillStyle = canvasBgColor; ctx.fillRect(0, 0, outputSize, outputSize); }
    mergedPixels.forEach((p, i) => { if (p !== 'transparent') { ctx.fillStyle = p; ctx.fillRect((i % gridSize) * pSize, Math.floor(i / gridSize) * pSize, pSize, pSize); } });
    const link = document.createElement('a'); link.download = `pixel-art-hd.png`;
    link.href = canvas.toDataURL('image/png'); link.click();
  };

  const pixelSizePx = gridSize <= 8 ? 20 : gridSize <= 16 ? 12 : gridSize <= 32 ? 6 : 4;
  
  // FIX GRID COLOR: Menggunakan inset shadow 1px dengan opacity kelabu agar selalu terang & presisi di HP
  const gridStyle = showGrid ? 'inset 0 0 0 1px rgba(255,255,255,0.15)' : 'none';

  // --- KOMPONEN TAB NAVIGASI KHUSUS LACI ---
  const ToolsTab = () => (
    <div className="grid grid-cols-3 sm:grid-cols-6 landscape:grid-cols-6 lg:grid-cols-3 gap-3 animate-fade-in-fast h-full items-start">
      <button onClick={() => setActiveTool('draw')} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border ${activeTool === 'draw' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-[#141414] text-slate-400 border-transparent hover:bg-[#1f1f1f]'}`}><div className="w-6 h-6 shrink-0"><PixIcons.Brush /></div><span className="text-[10px] font-black tracking-widest uppercase">Kuas</span></button>
      <button onClick={() => setActiveTool('erase')} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border ${activeTool === 'erase' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-[#141414] text-slate-400 border-transparent hover:bg-[#1f1f1f]'}`}><div className="w-6 h-6 shrink-0"><PixIcons.Eraser /></div><span className="text-[10px] font-black tracking-widest uppercase">Hapus</span></button>
      <button onClick={() => {setActiveTool('bucket');}} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border ${activeTool === 'bucket' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-[#141414] text-slate-400 border-transparent hover:bg-[#1f1f1f]'}`}><div className="w-6 h-6 shrink-0"><PixIcons.Bucket /></div><span className="text-[10px] font-black tracking-widest uppercase">Isi</span></button>
      <button onClick={() => setActiveTool('picker')} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border ${activeTool === 'picker' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-[#141414] text-slate-400 border-transparent hover:bg-[#1f1f1f]'}`}><div className="w-6 h-6 shrink-0"><PixIcons.Picker /></div><span className="text-[10px] font-black tracking-widest uppercase">Ambil</span></button>
      <button onClick={() => setActiveTool('pan')} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border ${activeTool === 'pan' ? 'bg-amber-500/10 text-amber-500 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-[#141414] text-slate-400 border-transparent hover:bg-[#1f1f1f]'}`}><div className="w-6 h-6 shrink-0"><PixIcons.HandPan /></div><span className="text-[10px] font-black tracking-widest uppercase">Geser</span></button>
      <button onClick={() => { setScale(1); setPan({x:0, y:0}); rotation!==0&&window.location.reload(); }} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border bg-[#141414] border-transparent text-slate-400 hover:bg-[#1f1f1f] hover:text-white active:scale-95`}><div className="w-6 h-6 shrink-0"><PixIcons.Focus /></div><span className="text-[10px] font-black tracking-widest uppercase">Fokus</span></button>
    </div>
  );

  const ColorsTab = () => (
    <div className="space-y-4 animate-fade-in-fast">
      <FigmaColorPicker label="Warna Kuas Aktif" hexValue={color} onChange={setColor} />
      <div className="flex flex-wrap gap-3 mt-4">
        {palette.map((c, i) => (
          <button key={i} onClick={() => {setColor(c); setActiveTool('draw');}} className={`w-10 h-10 rounded-xl border-2 transition-transform shadow-sm shrink-0 ${color === c ? 'border-cyan-400 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'border-[#333] hover:scale-105'}`} style={{backgroundColor: c}} />
        ))}
      </div>
    </div>
  );

  const LayersTab = () => (
    <div className="animate-fade-in-fast flex flex-col h-full pb-8">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <span className="text-[12px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2"><div className="w-4 h-4 shrink-0"><PixIcons.Layers /></div> Layers Panel</span>
        <button onClick={addLayer} className="text-[9px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg uppercase tracking-wider hover:bg-cyan-500/20 transition-all">+ Layer Baru</button>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto custom-scroll pr-2">
        {[...layers].reverse().map(l => (
          <div key={l.id} onClick={() => setActiveLayerId(l.id)} className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${activeLayerId === l.id ? 'bg-[#1a1a1a] border-cyan-500 shadow-md' : 'bg-[#141414] border-[#2a2a2a] hover:border-[#444]'}`}>
            <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
              <button onClick={(e) => {e.stopPropagation(); toggleLayerProp(l.id, 'visible')}} className={`w-6 h-6 p-1 shrink-0 flex items-center justify-center transition-colors ${l.visible ? 'text-cyan-400' : 'text-slate-600'}`}>{l.visible ? <PixIcons.Eye /> : <PixIcons.EyeOff />}</button>
              <button onClick={(e) => {e.stopPropagation(); toggleLayerProp(l.id, 'locked')}} className={`w-6 h-6 p-1 shrink-0 flex items-center justify-center transition-colors ${l.locked ? 'text-red-400' : 'text-slate-500'}`}>{l.locked ? <PixIcons.Lock /> : <PixIcons.Unlock />}</button>
              <span className={`text-[11px] font-bold uppercase tracking-wider truncate ${activeLayerId === l.id ? 'text-white' : 'text-slate-400'}`}>{l.name} {activeLayerId === l.id && '(Aktif)'}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={(e) => {e.stopPropagation(); duplicateLayer(l.id)}} className="w-6 h-6 p-1 flex items-center justify-center shrink-0 text-slate-400 hover:text-white transition-colors" title="Gandakan"><PixIcons.Copy /></button>
              <button onClick={(e) => {e.stopPropagation(); deleteLayer(l.id)}} disabled={layers.length <= 1} className="w-6 h-6 p-1 flex items-center justify-center shrink-0 text-slate-400 hover:text-red-400 disabled:opacity-30 transition-colors"><PixIcons.Trash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6 animate-fade-in-fast pb-10">
      <div className="flex gap-3">
        <input type="number" value={localGridInput} onChange={(e) => setLocalGridInput(e.target.value)} className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white font-mono text-[14px] shadow-inner outline-none focus:border-cyan-500 transition-colors" />
        <button onClick={() => setGridSize(Math.min(32, Math.max(8, parseInt(localGridInput))))} className="px-6 py-4 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl text-[12px] font-black uppercase tracking-wider hover:bg-cyan-500/20 active:scale-95 transition-all">Set Grid</button>
      </div>
      <FigmaToggle label="Tampilkan Garis Grid" checked={showGrid} onChange={setShowGrid} />
      <FigmaColorPicker label="Warna Background Kanvas" hexValue={canvasBgColor} onChange={setCanvasBgColor} />
      <FigmaToggle label="Background Transparan (PNG)" checked={isTransparent} onChange={setIsTransparent} />
      <FigmaSlider label="HD Export Size" min={gridSize} max={1920} step={gridSize} value={outputSize} onChange={setOutputSize} unit="px" />
      <button onClick={downloadImage} className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-[12px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2"><div className="w-5 h-5 shrink-0"><PixIcons.Download /></div> Download Gambar HD</button>
    </div>
  );

  // THE CANVAS RENDERER Component
  const CanvasRenderer = () => (
    <div ref={canvasAreaRef} className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden bg-[#000]"
         style={{ touchAction: 'none' }} // Kunci Murni CSS
         onPointerDown={handlePointerDown} 
         onPointerMove={handlePointerMove} 
         onPointerUp={handlePointerUp} 
         onPointerCancel={handlePointerUp}
         onTouchStart={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchStartMulti(e); else handlePointerDown(e.touches[0]); }}
         onTouchMove={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchMoveMulti(e); else handlePointerMove(e.touches[0]); }}
         onTouchEnd={handlePointerUp}
    >
      {/* Tombol Undo/Redo di sudut kanvas yang diisolasi agar tidak merusak gambar */}
      <div className="absolute top-4 right-4 flex gap-2 z-30" onPointerDown={stopProp} onTouchStart={stopProp} onClick={stopProp}>
        <button onPointerDown={(e) => { stopProp(e); handleUndo(); }} disabled={step <= 0} className="w-11 h-11 flex items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#141414]/90 backdrop-blur text-slate-300 disabled:opacity-30 shadow-lg hover:text-white transition-colors active:scale-95"><div className="w-5 h-5 shrink-0"><PixIcons.Undo /></div></button>
        <button onPointerDown={(e) => { stopProp(e); handleRedo(); }} disabled={step >= history.length - 1} className="w-11 h-11 flex items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#141414]/90 backdrop-blur text-slate-300 disabled:opacity-30 shadow-lg hover:text-white transition-colors active:scale-95"><div className="w-5 h-5 shrink-0"><PixIcons.Redo /></div></button>
      </div>

      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale * baseScale}) rotate(${rotation}deg)`, transition: isDrawing ? 'none' : 'transform 0.1s ease-out' }} className="absolute pointer-events-none">
        <div className="absolute -top-7 left-0 w-full flex justify-center"><span className="bg-red-500 text-white text-[9px] font-black px-4 py-1.5 rounded-t-lg shadow-lg uppercase tracking-widest">SISI ATAS</span></div>
        <div ref={gridRef} className="grid shadow-[0_0_50px_rgba(0,0,0,0.8)] border-t-[4px] border-t-red-500" 
             style={{ 
               gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: gridSize * pixelSizePx, height: gridSize * pixelSizePx,
               backgroundColor: isTransparent ? 'transparent' : canvasBgColor,
               backgroundImage: isTransparent ? 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)' : 'none',
               backgroundSize: '12px 12px'
             }}>
          {mergedPixels.map((bg, i) => (
            <div key={i} data-pixel-index={i} className={`w-full h-full transition-colors duration-75`} 
                 style={{ backgroundColor: bg !== 'transparent' ? bg : undefined, boxShadow: gridStyle }} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className={`w-full h-full flex flex-col landscape:flex-row lg:flex-row bg-[#050505] overflow-hidden font-sans ${isFullscreen ? 'fixed inset-0 z-[100]' : 'absolute inset-0 z-10'}`}>
       
       {/* 1. BAGIAN KANVAS MENGGAMBAR */}
       <div className="flex-[55%] landscape:flex-1 lg:flex-[2] relative flex flex-col border-b landscape:border-b-0 landscape:border-r lg:border-b-0 lg:border-r border-[#1f1f1f] bg-[#000] overflow-hidden shadow-xl z-20">
          
          <div className="absolute top-4 left-4 z-30 lg:hidden" onPointerDown={stopProp} onTouchStart={stopProp} onClick={stopProp}>
             <button onClick={toggleFullscreen} className={`px-4 py-2.5 flex items-center justify-center gap-2 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 ${isFullscreen ? 'bg-amber-500 text-black border border-amber-400' : 'bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] text-cyan-400'}`}>
                <div className="w-4 h-4 shrink-0">{isFullscreen ? <PixIcons.Close /> : <PixIcons.Expand />}</div> 
                <span className="hidden sm:inline md:inline landscape:inline">{isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh (Landscape)'}</span>
                <span className="sm:hidden landscape:hidden">Layar Penuh</span>
             </button>
          </div>
          
          <CanvasRenderer />
       </div>

       {/* 2. BAGIAN ALAT & NAVIGASI (RESPONSIVE KHUSUS MOBILE LANDSCAPE & PORTRAIT) */}
       <div className="flex-[45%] landscape:flex-none landscape:w-[320px] lg:flex-none flex-col bg-[#050505] z-40 shrink-0 lg:w-[400px] lg:h-full flex shadow-[0_-10px_30px_rgba(0,0,0,0.5)] landscape:shadow-[-10px_0_30px_rgba(0,0,0,0.5)] lg:shadow-2xl">
          <div className="hidden lg:flex px-6 py-5 border-b border-[#1f1f1f] bg-[#0a0a0a] shrink-0 items-center justify-between">
             <h2 className="text-[13px] font-black text-white uppercase tracking-widest flex items-center gap-2">
               <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span> Pixel Studio Pro
             </h2>
          </div>

          <div className="flex-1 overflow-y-auto custom-scroll relative p-5 lg:p-7 bg-[#0a0a0a]">
             {mobileTab === 'tools' && <ToolsTab />}
             {mobileTab === 'colors' && <ColorsTab />}
             {mobileTab === 'layers' && <LayersTab />}
             {mobileTab === 'settings' && <SettingsTab />}
          </div>

          {/* TAB NAVIGASI KHUSUS MOBILE */}
          <div className="lg:hidden h-[70px] landscape:h-full landscape:w-[70px] bg-[#050505] border-t landscape:border-t-0 landscape:border-l border-[#1a1a1a] flex flex-row landscape:flex-col shrink-0 pb-safe">
             <button onClick={() => setMobileTab('tools')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 transition-all ${mobileTab === 'tools' ? 'text-cyan-400 border-t-2 landscape:border-t-0 landscape:border-l-2 border-cyan-500 bg-[#141414]' : 'text-slate-500 hover:text-slate-300 border-t-2 landscape:border-t-0 landscape:border-l-2 border-transparent'}`}><div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"><PixIcons.Brush /></div><span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider">Alat</span></button>
             <button onClick={() => setMobileTab('colors')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 transition-all ${mobileTab === 'colors' ? 'text-cyan-400 border-t-2 landscape:border-t-0 landscape:border-l-2 border-cyan-500 bg-[#141414]' : 'text-slate-500 hover:text-slate-300 border-t-2 landscape:border-t-0 landscape:border-l-2 border-transparent'}`}><div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"><PixIcons.Picker /></div><span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider">Warna</span></button>
             <button onClick={() => setMobileTab('layers')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 transition-all ${mobileTab === 'layers' ? 'text-cyan-400 border-t-2 landscape:border-t-0 landscape:border-l-2 border-cyan-500 bg-[#141414]' : 'text-slate-500 hover:text-slate-300 border-t-2 landscape:border-t-0 landscape:border-l-2 border-transparent'}`}><div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"><PixIcons.Layers /></div><span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider">Layers</span></button>
             <button onClick={() => setMobileTab('settings')} className={`flex-1 flex flex-col items-center justify-center gap-1.5 transition-all ${mobileTab === 'settings' ? 'text-cyan-400 border-t-2 landscape:border-t-0 landscape:border-l-2 border-cyan-500 bg-[#141414]' : 'text-slate-500 hover:text-slate-300 border-t-2 landscape:border-t-0 landscape:border-l-2 border-transparent'}`}><div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"><PixIcons.Settings /></div><span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider">Kanvas</span></button>
          </div>
       </div>

    </div>
  );
};
