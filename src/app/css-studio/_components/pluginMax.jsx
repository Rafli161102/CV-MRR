"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaCustomDropdown, WorkspaceLayout, ControlHeader, COLOR_PRESETS, useMultiTouch } from './ui';

// =========================================================================
// 13. TRUE 3D CUBE STUDIO (6 SISI DENGAN PANDUAN)
// =========================================================================
export const PluginTransform = () => {
  const [rx, setRx] = useState(30); const [ry, setRy] = useState(-30); const [rz, setRz] = useState(0); 
  const [tx, setTx] = useState(0); const [ty, setTy] = useState(0); const [tz, setTz] = useState(0); 
  const [scale, setScale] = useState(1); const [cubeSize, setCubeSize] = useState(120);
  const { scale: touchScale, pan, onTouchStart, onTouchMove, resetView } = useMultiTouch();

  const handleReset = () => { setRx(30); setRy(-30); setRz(0); setTx(0); setTy(0); setTz(0); setScale(1); setCubeSize(120); resetView(); };
  const faceStyle = "absolute flex items-center justify-center font-black text-white/80 tracking-widest text-[16px] border border-white/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]";

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center touch-none" style={{ perspective: '1000px' }} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <div style={{ transformStyle: 'preserve-3d', transform: `translate(${pan.x}px, ${pan.y}px) scale(${touchScale * scale})`, transition: 'transform 0.1s linear' }}>
        <div style={{ width: `${cubeSize}px`, height: `${cubeSize}px`, transformStyle: 'preserve-3d', transform: `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)` }}>
          <div className={faceStyle} style={{ width: '100%', height: '100%', background: 'rgba(14, 165, 233, 0.8)', transform: `translateZ(${cubeSize/2}px)` }}>FRONT</div>
          <div className={faceStyle} style={{ width: '100%', height: '100%', background: 'rgba(139, 92, 246, 0.8)', transform: `rotateY(180deg) translateZ(${cubeSize/2}px)` }}>BACK</div>
          <div className={faceStyle} style={{ width: '100%', height: '100%', background: 'rgba(236, 72, 153, 0.8)', transform: `rotateY(90deg) translateZ(${cubeSize/2}px)` }}>RIGHT</div>
          <div className={faceStyle} style={{ width: '100%', height: '100%', background: 'rgba(245, 158, 11, 0.8)', transform: `rotateY(-90deg) translateZ(${cubeSize/2}px)` }}>LEFT</div>
          <div className={faceStyle} style={{ width: '100%', height: '100%', background: 'rgba(16, 185, 129, 0.8)', transform: `rotateX(90deg) translateZ(${cubeSize/2}px)` }}>TOP</div>
          <div className={faceStyle} style={{ width: '100%', height: '100%', background: 'rgba(239, 68, 68, 0.8)', transform: `rotateX(-90deg) translateZ(${cubeSize/2}px)` }}>BOTTOM</div>
        </div>
      </div>
    </div>
  );

  const css = `.cube-container { perspective: 1000px; }\n.cube {\n  position: relative; width: ${cubeSize}px; height: ${cubeSize}px; transform-style: preserve-3d;\n  transform: rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translate3d(${tx}px, ${ty}px, ${tz}px) scale(${scale});\n}`;
  const html = `<div class="cube-container">\n  <div class="cube">\n    <div class="face front">Front</div>\n    <div class="face back">Back</div>\n    ...\n  </div>\n</div>`;
  const jsx = `// Gunakan properti transform-style: preserve-3d pada elemen parent.`;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip text="PANDUAN: Ini adalah Kubus 3D Sungguhan! Gunakan 2 jari di layar preview untuk zoom dan geser kanvas." />
      <ControlHeader title="3D Matrix Setup" onReset={handleReset} />
      <FigmaSlider label="Cube Size" min={50} max={300} value={cubeSize} onChange={setCubeSize} unit="px" />
      <FigmaSlider label="Rotate X" min={-180} max={180} value={rx} onChange={setRx} unit="°" />
      <FigmaSlider label="Rotate Y" min={-180} max={180} value={ry} onChange={setRy} unit="°" />
      <FigmaSlider label="Rotate Z" min={-180} max={180} value={rz} onChange={setRz} unit="°" />
      <FigmaSlider label="Translate Z" min={-300} max={300} value={tz} onChange={setTz} unit="px" />
      <FigmaSlider label="Scale" min={0.5} max={2} step={0.1} value={scale} onChange={setScale} unit="x" />
    </div>
  );
  return <WorkspaceLayout name="3D Studio" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};

// =========================================================================
// 14. VECTOR SHAPES (MULTI-SHAPE & LAYERS)
// =========================================================================
const SHAPES_PRESET = { "Polygon Base": [{ name: "Triangle", val: "triangle" }, { name: "Square", val: "square" }, { name: "Hexagon", val: "hexagon" }] };
const P_NODES = {
  "triangle": [{id:1, x:50, y:0}, {id:2, x:0, y:100}, {id:3, x:100, y:100}],
  "square": [{id:1, x:0, y:0}, {id:2, x:100, y:0}, {id:3, x:100, y:100}, {id:4, x:0, y:100}],
  "hexagon": [{id:1, x:25, y:0}, {id:2, x:75, y:0}, {id:3, x:100, y:50}, {id:4, x:75, y:100}, {id:5, x:25, y:100}, {id:6, x:0, y:50}]
};

export const PluginShapes = () => {
  const createShape = (id, name) => ({ id, name, mode: 'preset', shapeVal: 'square', color: '#8b5cf6', nodes: P_NODES['square'], rounded: 0, x: 100, y: 100, w: 200, h: 200, visible: true, locked: false });
  const [shapes, setShapes] = useState([createShape(1, "Shape 1")]);
  const [activeShapeId, setActiveShapeId] = useState(1);
  const [snapToGrid, setSnapToGrid] = useState(true); 
  const { scale, pan, onTouchStart, onTouchMove, resetView } = useMultiTouch();
  const [activeTool, setActiveTool] = useState('pan');
  const [draggingNode, setDraggingNode] = useState(null);
  const [isDraggingPan, setIsDraggingPan] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggingShape, setDraggingShape] = useState(null);
  const [elemStart, setElemStart] = useState({ x: 0, y: 0 });

  const activeShape = shapes.find(s => s.id === activeShapeId) || shapes[0];
  const updateActive = (key, val) => setShapes(shapes.map(s => s.id === activeShapeId ? { ...s, [key]: val } : s));
  const toggleLayerProp = (id, prop) => setShapes(shapes.map(s => s.id === id ? { ...s, [prop]: !s[prop] } : s));
  const handleReset = () => { setShapes([createShape(1, "Shape 1")]); setActiveShapeId(1); setSnapToGrid(true); resetView(); };
  
  const handleShapeChange = (val) => setShapes(shapes.map(s => s.id === activeShapeId ? { ...s, shapeVal: val, nodes: P_NODES[val] || [], mode: 'preset' } : s));
  const addShapeLayer = () => { const newId = Date.now(); setShapes([...shapes, createShape(newId, `Shape ${shapes.length + 1}`)]); setActiveShapeId(newId); };
  const duplicateShape = (id) => { const toCopy = shapes.find(s => s.id === id); if (!toCopy) return; const newId = Date.now(); setShapes([...shapes, { ...toCopy, id: newId, name: `${toCopy.name} Copy`, x: toCopy.x + 20, y: toCopy.y + 20 }]); setActiveShapeId(newId); };
  const deleteShape = (id) => { if (shapes.length <= 1) return; const newShapes = shapes.filter(s => s.id !== id); setShapes(newShapes); if (activeShapeId === id) setActiveShapeId(newShapes[newShapes.length - 1].id); };
  const snapCoordinate = (val) => snapToGrid ? Math.round(val / 5) * 5 : Math.round(val);

  const handlePointerDownCanvas = (e) => {
    if (activeTool === 'pan') {
      setIsDraggingPan(true); setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y }); e.currentTarget.setPointerCapture(e.pointerId);
    } else if (activeTool === 'pen' && activeShape) {
      const rect = e.currentTarget.getBoundingClientRect();
      const xPercent = (((e.clientX - rect.left) / scale) / activeShape.w) * 100; const yPercent = (((e.clientY - rect.top) / scale) / activeShape.h) * 100;
      updateActive('nodes', [...activeShape.nodes, { id: Date.now(), x: Math.max(0, Math.min(100, snapCoordinate(xPercent))), y: Math.max(0, Math.min(100, snapCoordinate(yPercent))) }]); updateActive('mode', 'custom');
    }
  };
  const handlePointerMove = (e) => {
    if (isDraggingPan) { setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); }
    else if (draggingNode && activeTool === 'pen' && activeShape) {
      const rect = e.currentTarget.getBoundingClientRect();
      const xPercent = (((e.clientX - rect.left) / scale) / activeShape.w) * 100; const yPercent = (((e.clientY - rect.top) / scale) / activeShape.h) * 100;
      updateActive('nodes', activeShape.nodes.map(n => n.id === draggingNode ? { ...n, x: Math.max(0, Math.min(100, snapCoordinate(xPercent))), y: Math.max(0, Math.min(100, snapCoordinate(yPercent))) } : n));
    } else if (draggingShape && activeTool === 'pan') {
      const dx = (e.clientX - dragStart.x) / scale; const dy = (e.clientY - dragStart.y) / scale;
      updateActive('x', snapCoordinate(elemStart.x + dx)); updateActive('y', snapCoordinate(elemStart.y + dy));
    }
  };
  const handlePointerUp = (e) => { if (isDraggingPan) setIsDraggingPan(false); if (draggingNode) setDraggingNode(null); if (draggingShape) setDraggingShape(null); e.currentTarget.releasePointerCapture(e.pointerId); };

  const getShapeCss = (s) => {
    const isSquare = s.mode === 'preset' && s.shapeVal === 'square';
    if (isSquare) return `border-radius: ${s.rounded}%; background-color: ${s.color}; width: ${s.w}px; height: ${s.h}px; transform: translate(${s.x}px, ${s.y}px);`;
    return `clip-path: polygon(${s.nodes.length >= 3 ? s.nodes.map(n => `${n.x}% ${n.y}%`).join(', ') : '0 0'}); background-color: ${s.color}; width: ${s.w}px; height: ${s.h}px; transform: translate(${s.x}px, ${s.y}px);`;
  };

  const preview = (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden border border-white/5 bg-[#050505] rounded-xl touch-none" onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <div className="absolute top-3 left-3 bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] p-1.5 rounded-xl flex flex-col gap-2 z-20 shadow-xl">
        <button onClick={() => setActiveTool('pen')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pen' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Pen Tool"><div className="w-4 h-4"><Icons.Pen /></div></button>
        <button onClick={() => setActiveTool('pan')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pan' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Geser/Pilih Layer"><div className="w-4 h-4"><Icons.HandPan /></div></button>
      </div>
      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }} className="absolute">
        <div className={`relative ${activeTool === 'pen' ? 'cursor-crosshair' : ''}`} style={{ width: '400px', height: '400px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed #444' }} onPointerDown={handlePointerDownCanvas} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
          {snapToGrid && activeTool === 'pen' && <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>}
          {shapes.map((s) => {
            if (!s.visible) return null;
            const isActive = s.id === activeShapeId;
            return (
              <div key={s.id} onPointerDown={(e) => { e.stopPropagation(); setActiveShapeId(s.id); if(!s.locked && activeTool==='pan'){setDraggingShape(s.id); setDragStart({x:e.clientX, y:e.clientY}); setElemStart({x:s.x, y:s.y}); e.currentTarget.setPointerCapture(e.pointerId);}}} className={`absolute ${activeTool === 'pan' ? (isActive ? 'ring-1 ring-cyan-500 shadow-2xl' : 'hover:ring-1 ring-white/30') : ''}`} style={{ width: `${s.w}px`, height: `${s.h}px`, transform: `translate(${s.x}px, ${s.y}px)`, zIndex: isActive ? 10 : 1, opacity: s.locked ? 0.7 : 1 }}>
                <div style={{ backgroundColor: s.color, width: '100%', height: '100%', borderRadius: s.mode==='preset'&&s.shapeVal==='square'?`${s.rounded}%`:'0', clipPath: s.mode==='preset'&&s.shapeVal==='square'?'none':`polygon(${s.nodes.map(n=>`${n.x}% ${n.y}%`).join(', ')})`, pointerEvents: 'none' }} />
                {isActive && activeTool === 'pen' && !s.locked && s.nodes.map((node) => (
                   <div key={node.id} onPointerDown={(e) => {e.stopPropagation(); setDraggingNode(node.id); e.currentTarget.setPointerCapture(e.pointerId);}} className="absolute w-3 h-3 bg-white border border-cyan-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing pointer-events-auto" style={{ left: `calc(${node.x}% - 6px)`, top: `calc(${node.y}% - 6px)`, zIndex: 50 }} />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );

  const controls = (
    <div className="space-y-1">
      <PluginTip text="PANDUAN VECTOR: Gunakan Panel Layer untuk menumpuk shape! Atur Width & Height untuk resize objek yang dipilih." />
      <ControlHeader title="Shapes Configuration" onReset={handleReset} />
      <div className="border-t border-[#1f1f1f] pt-4 pb-2 mb-4">
         <div className="flex items-center justify-between mb-3"><span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2"><Icons.Layers /> Shapes Panel</span><button onClick={addShapeLayer} className="text-[8px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded uppercase tracking-widest hover:bg-cyan-500/20">+ Shape</button></div>
         <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scroll pr-1">
            {[...shapes].reverse().map(s => (
               <div key={s.id} onClick={() => setActiveShapeId(s.id)} className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${activeShapeId === s.id ? 'bg-[#1a1a1a] border-cyan-500' : 'bg-[#0a0a0a] border-[#2a2a2a]'}`}>
                  <div className="flex items-center gap-3"><button onClick={(e) => {e.stopPropagation(); toggleLayerProp(s.id, 'visible');}} className={s.visible ? 'text-cyan-400' : 'text-slate-600'}>{s.visible ? <Icons.Eye/> : <Icons.EyeOff/>}</button><button onClick={(e) => {e.stopPropagation(); toggleLayerProp(s.id, 'locked');}} className={s.locked ? 'text-red-400' : 'text-slate-500'}>{s.locked ? <Icons.Lock/> : <Icons.Unlock/>}</button><span className={`text-[10px] font-bold uppercase ${activeShapeId === s.id ? 'text-white' : 'text-slate-400'}`}>{s.name}</span></div>
                  <div className="flex items-center gap-2"><button onClick={(e) => {e.stopPropagation(); duplicateShape(s.id);}} className="text-slate-400 hover:text-white"><Icons.Copy/></button><button onClick={(e) => {e.stopPropagation(); deleteShape(s.id);}} disabled={shapes.length <= 1} className="text-slate-400 hover:text-red-400"><Icons.Trash/></button></div>
               </div>
            ))}
         </div>
      </div>
      <FigmaColorPicker label="Shape Color" hexValue={activeShape?.color} onChange={(v) => updateActive('color', v)} />
      <div className="grid grid-cols-2 gap-4 mt-2 mb-4">
        <FigmaSlider label="Width" min={50} max={400} value={activeShape?.w} onChange={(v) => updateActive('w', v)} unit="px" />
        <FigmaSlider label="Height" min={50} max={400} value={activeShape?.h} onChange={(v) => updateActive('h', v)} unit="px" />
      </div>
      <FigmaCustomDropdown label="Shape Form" groups={SHAPES_PRESET} value={activeShape?.shapeVal} onChange={handleShapeChange} />
      {activeShape?.shapeVal === 'square' && <FigmaSlider label="Smooth Rounded" min={0} max={50} value={activeShape.rounded} onChange={(v) => updateActive('rounded', v)} unit="%" />}
    </div>
  );
  return <WorkspaceLayout name="Vector Shapes" controls={controls} preview={preview} cssOutput={shapes.map((s,i)=>`.shape-${i+1}{\n ${getShapeCss(s)}\n}`).join('\n')} htmlOutput="" jsxOutput="" />;
};

// =========================================================================
// 15. PIXEL DRAWING (FIXED: PRECISION DRAWING + LAYERS + BUCKET)
// =========================================================================
const floodFill = (pixels, startIndex, targetColor, replacementColor, gridSize) => {
  if (targetColor === replacementColor) return pixels;
  const newPixels = [...pixels]; const stack = [startIndex];
  while (stack.length > 0) {
    const idx = stack.pop();
    if (newPixels[idx] === targetColor) {
      newPixels[idx] = replacementColor;
      const x = idx % gridSize; const y = Math.floor(idx / gridSize);
      if (x > 0) stack.push(idx - 1); if (x < gridSize - 1) stack.push(idx + 1);
      if (y > 0) stack.push(idx - gridSize); if (y < gridSize - 1) stack.push(idx + gridSize);
    }
  }
  return newPixels;
};

export const PluginPixelArt = () => {
  const [gridSize, setGridSize] = useState(16); const [localGridInput, setLocalGridInput] = useState('16'); 
  const [canvasBgColor, setCanvasBgColor] = useState('#ffffff'); const [isTransparent, setIsTransparent] = useState(false); 
  const [color, setColor] = useState('#0ea5e9'); const [palette, setPalette] = useState([...COLOR_PRESETS]);
  const [outputSize, setOutputSize] = useState(1080);
  const createEmptyLayer = (id, name) => ({ id, name, pixels: Array(gridSize * gridSize).fill('transparent'), visible: true, locked: false });
  const [layers, setLayers] = useState([createEmptyLayer(1, "Layer 1")]);
  const [activeLayerId, setActiveLayerId] = useState(1);
  const [history, setHistory] = useState([]); const [step, setStep] = useState(-1);
  const { scale, pan, rotation, setScale, setPan, setRotation, onTouchStart, onTouchMove, resetView } = useMultiTouch();
  const [activeTool, setActiveTool] = useState('draw'); const [isDrawing, setIsDrawing] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const safeGrid = Math.min(Math.max(gridSize, 8), 64);
    const newLayers = [createEmptyLayer(1, "Layer 1")];
    setLayers(newLayers); setHistory([newLayers]); setStep(0); setActiveLayerId(1);
    setLocalGridInput(safeGrid.toString()); resetView();
  }, [gridSize]);

  const mergedPixels = Array(gridSize * gridSize).fill('transparent');
  layers.forEach(layer => { if (layer.visible) { layer.pixels.forEach((p, j) => { if (p !== 'transparent') mergedPixels[j] = p; }); } });

  const saveHistory = (newLayers) => {
    const newHistory = history.slice(0, step + 1); newHistory.push(JSON.parse(JSON.stringify(newLayers)));
    if (newHistory.length > 15) newHistory.shift(); setHistory(newHistory); setStep(newHistory.length - 1);
  };

  const paintPixel = (index) => {
    if (activeTool === 'pan' || activeTool === 'picker') return;
    const newLayers = [...layers]; const activeIndex = newLayers.findIndex(l => l.id === activeLayerId);
    if (activeIndex === -1 || newLayers[activeIndex].locked || !newLayers[activeIndex].visible) return;
    if (activeTool === 'bucket') {
       newLayers[activeIndex].pixels = floodFill(newLayers[activeIndex].pixels, index, newLayers[activeIndex].pixels[index], color, gridSize);
       setLayers(newLayers); saveHistory(newLayers); return;
    }
    const newColor = activeTool === 'erase' ? 'transparent' : color;
    if (newLayers[activeIndex].pixels[index] === newColor) return;
    newLayers[activeIndex].pixels[index] = newColor; setLayers(newLayers);
  };

  const paintByEvent = (e) => {
    if (activeTool === 'pan' || !gridRef.current || (e.touches && e.touches.length > 1)) return;
    let clientX = e.clientX, clientY = e.clientY;
    if (e.touches) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
    const rect = gridRef.current.getBoundingClientRect();
    const pixelSizePx = gridSize <= 8 ? 20 : gridSize <= 16 ? 12 : gridSize <= 32 ? 6 : 4;
    const dx = clientX - (rect.left + rect.width / 2); const dy = clientY - (rect.top + rect.height / 2);
    const angleRad = -rotation * (Math.PI / 180);
    const rotatedX = dx * Math.cos(angleRad) - dy * Math.sin(angleRad); const rotatedY = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);
    const xReal = (rotatedX + (gridSize * pixelSizePx * scale) / 2) / scale; const yReal = (rotatedY + (gridSize * pixelSizePx * scale) / 2) / scale;
    if (xReal < 0 || yReal < 0 || xReal >= (gridSize * pixelSizePx) || yReal >= (gridSize * pixelSizePx)) return;
    const index = Math.floor(yReal / pixelSizePx) * gridSize + Math.floor(xReal / pixelSizePx);
    if (index >= 0 && index < gridSize * gridSize) {
       if (activeTool === 'picker') { setColor(mergedPixels[index] !== 'transparent' ? mergedPixels[index] : (isTransparent ? '#ffffff' : canvasBgColor)); setActiveTool('draw'); return; }
       paintPixel(index);
    }
  };

  const preview = (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden border border-white/5 bg-[#050505] rounded-xl touch-none" onPointerDown={(e)=>{ if(activeTool==='pan'){setIsDrawing(false);} else {setIsDrawing(true); paintByEvent(e);} e.currentTarget.setPointerCapture(e.pointerId); }} onPointerMove={(e)=>{ if(isDrawing) paintByEvent(e); }} onPointerUp={(e)=>{ if(isDrawing){setIsDrawing(false); saveHistory(layers);} e.currentTarget.releasePointerCapture(e.pointerId); }} onTouchStart={(e)=>{ if(activeTool==='pan'||e.touches.length>1) onTouchStart(e); else {setIsDrawing(true); paintByEvent(e);} }} onTouchMove={(e)=>{ if(activeTool==='pan'||e.touches.length>1) onTouchMove(e); else if(isDrawing) paintByEvent(e); }}>
      <div className="absolute top-1/2 -translate-y-1/2 left-3 bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] p-1.5 rounded-xl flex flex-col gap-2 z-20 shadow-2xl">
        <button onClick={() => setActiveTool('draw')} className={`w-8 h-8 flex items-center justify-center rounded-lg ${activeTool === 'draw' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}><div className="w-4 h-4"><Icons.Brush/></div></button>
        <button onClick={() => setActiveTool('erase')} className={`w-8 h-8 flex items-center justify-center rounded-lg ${activeTool === 'erase' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}><div className="w-4 h-4"><Icons.Eraser/></div></button>
        <button onClick={() => setActiveTool('bucket')} className={`w-8 h-8 flex items-center justify-center rounded-lg ${activeTool === 'bucket' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}><div className="w-4 h-4"><Icons.Bucket/></div></button>
        <button onClick={() => setActiveTool('picker')} className={`w-8 h-8 flex items-center justify-center rounded-lg ${activeTool === 'picker' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}><div className="w-4 h-4"><Icons.Picker/></div></button>
        <div className="w-full h-px bg-[#333]"></div>
        <button onClick={() => setActiveTool('pan')} className={`w-8 h-8 flex items-center justify-center rounded-lg ${activeTool === 'pan' ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}><div className="w-4 h-4"><Icons.HandPan/></div></button>
      </div>
      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale}) rotate(${rotation}deg)` }} className="absolute">
        <div className="absolute -top-5 left-0 w-full flex justify-center"><span className="bg-red-500 text-white text-[8px] font-black px-3 py-1 rounded-t-lg tracking-widest">TOP SIDE</span></div>
        <div ref={gridRef} className="grid shadow-2xl border-t-2 border-t-red-500 bg-white" style={{ width: gridSize * (gridSize<=8?20:gridSize<=16?12:gridSize<=32?6:4), height: gridSize * (gridSize<=8?20:gridSize<=16?12:gridSize<=32?6:4), gridTemplateColumns: `repeat(${gridSize}, 1fr)`, backgroundColor: isTransparent ? 'transparent' : canvasBgColor, backgroundImage: isTransparent ? 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)' : 'none', backgroundSize: '12px 12px' }}>
          {mergedPixels.map((bg, i) => (<div key={i} data-pixel-index={i} className="w-full h-full border-[0.5px] border-black/5 pointer-events-none" style={{ backgroundColor: bg !== 'transparent' ? bg : undefined }} />))}
        </div>
      </div>
    </div>
  );

  const controls = (
    <div className="space-y-2">
      <PluginTip text="PANDUAN: Gunakan 2 jari untuk Zoom & Rotate. Alat PAN mematikan Brush agar aman saat menggeser kanvas." />
      <ControlHeader title="Workspace Setup" onReset={handleReset} />
      <div className="flex gap-2 mb-4">
        <input type="number" value={localGridInput} onChange={(e)=>setLocalGridInput(e.target.value)} className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-[11px] text-white" />
        <button onClick={()=>{let v=parseInt(localGridInput); setGridSize(Math.min(64, Math.max(8, v)));}} className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg text-[9px] font-bold uppercase">Terapkan</button>
      </div>
      <FigmaColorPicker label="Warna Kuas" hexValue={color} onChange={setColor} />
      <div className="border-t border-[#1f1f1f] pt-4 mb-4">
         <div className="flex items-center justify-between mb-3"><span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2"><Icons.Layers /> Layers</span><button onClick={()=>{const nid=Date.now(); const nl=[...layers, createEmptyLayer(nid, `Lyr ${layers.length+1}`)]; setLayers(nl); setActiveLayerId(nid); saveHistory(nl);}} className="text-[8px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded">+ Baru</button></div>
         <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
            {[...layers].reverse().map(l => (
               <div key={l.id} onClick={()=>setActiveLayerId(l.id)} className={`flex items-center justify-between p-2 rounded-lg border ${activeLayerId===l.id?'bg-[#1a1a1a] border-cyan-500':'bg-[#0a0a0a] border-[#2a2a2a]'}`}>
                  <div className="flex items-center gap-2"><button onClick={(e)=>{e.stopPropagation(); setLayers(layers.map(lx=>lx.id===l.id?{...lx,visible:!lx.visible}:lx));}}>{l.visible?<Icons.Eye/>:<Icons.EyeOff/>}</button><span className="text-[10px] font-bold text-white uppercase">{l.name}</span></div>
                  <button onClick={(e)=>{e.stopPropagation(); if(layers.length>1)setLayers(layers.filter(lx=>lx.id!==l.id));}} className="text-red-400"><Icons.Trash/></button>
               </div>
            ))}
         </div>
      </div>
      <FigmaColorPicker label="Canvas BG" hexValue={canvasBgColor} onChange={setCanvasBgColor} />
      <FigmaSlider label="HD Size" min={gridSize} max={1920} value={outputSize} onChange={setOutputSize} unit="px" />
    </div>
  );
  return <WorkspaceLayout name="Pixel Drawing" controls={controls} preview={preview} cssOutput="" htmlOutput="" jsxOutput="" />;
};
