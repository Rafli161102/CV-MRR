"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaCustomDropdown, WorkspaceLayout, ControlHeader, COLOR_PRESETS } from './ui';
import { useMultiTouch } from './ui'; // Mengambil fungsi touch dari ui.jsx

// =========================================================================
// 1. TRUE 3D CUBE STUDIO (6 SISI)
// =========================================================================
export const PluginTransform = () => {
  const [rx, setRx] = useState(30); const [ry, setRy] = useState(-30); const [rz, setRz] = useState(0); 
  const [tx, setTx] = useState(0); const [ty, setTy] = useState(0); const [tz, setTz] = useState(0); 
  const [scale, setScale] = useState(1); const [cubeSize, setCubeSize] = useState(120);
  const { scale: touchScale, pan, onTouchStart, onTouchMove, resetView } = useMultiTouch();

  const handleReset = () => { setRx(30); setRy(-30); setRz(0); setTx(0); setTy(0); setTz(0); setScale(1); setCubeSize(120); resetView(); };

  const faceStyle = "absolute flex items-center justify-center font-black text-white/90 tracking-widest text-[16px] border border-white/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]";

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

  const css = `.scene { perspective: 1000px; }\n.cube {\n  position: relative; width: ${cubeSize}px; height: ${cubeSize}px; transform-style: preserve-3d;\n  transform: rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translate3d(${tx}px, ${ty}px, ${tz}px) scale(${scale});\n}\n.face { position: absolute; width: 100%; height: 100%; }\n.front { transform: translateZ(${cubeSize/2}px); }\n.back { transform: rotateY(180deg) translateZ(${cubeSize/2}px); }\n.right { transform: rotateY(90deg) translateZ(${cubeSize/2}px); }\n.left { transform: rotateY(-90deg) translateZ(${cubeSize/2}px); }\n.top { transform: rotateX(90deg) translateZ(${cubeSize/2}px); }\n.bottom { transform: rotateX(-90deg) translateZ(${cubeSize/2}px); }`;
  const html = `<div class="scene">\n  <div class="cube">\n    <div class="face front">Front</div>\n    <div class="face back">Back</div>\n    <div class="face right">Right</div>\n    <div class="face left">Left</div>\n    <div class="face top">Top</div>\n    <div class="face bottom">Bottom</div>\n  </div>\n</div>`;
  const jsx = `// Copy struktur CSS & HTML untuk menerapkan efek Kubus 3D ini.`;
  
  const controls = (
    <div className="space-y-2">
      <PluginTip text="PANDUAN: Ini adalah Kubus 3D Sungguhan (6 Sisi)! Gunakan 2 jari di layar preview untuk zoom dan geser kanvas. Klik angka di ujung slider untuk mengetik nilai secara manual." />
      <ControlHeader title="3D Matrix Setup" onReset={handleReset} />
      <FigmaSlider label="Cube Size" min={50} max={300} value={cubeSize} onChange={setCubeSize} unit="px" />
      <div className="border-t border-[#1f1f1f] mt-4 pt-4 mb-2"><span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">3D Rotation</span></div>
      <FigmaSlider label="Rotate X" min={-180} max={180} value={rx} onChange={setRx} unit="°" />
      <FigmaSlider label="Rotate Y" min={-180} max={180} value={ry} onChange={setRy} unit="°" />
      <FigmaSlider label="Rotate Z" min={-180} max={180} value={rz} onChange={setRz} unit="°" />
      <div className="border-t border-[#1f1f1f] mt-4 pt-4 mb-2"><span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Position & Scale</span></div>
      <FigmaSlider label="Translate Z" min={-300} max={300} value={tz} onChange={setTz} unit="px" />
      <FigmaSlider label="Scale" min={0.5} max={2} step={0.1} value={scale} onChange={setScale} unit="x" />
    </div>
  );
  return <WorkspaceLayout name="True 3D Studio" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};

// =========================================================================
// 2. VECTOR SHAPES (MULTI-SHAPE, RESIZE, ROUNDED SQUARE, LAYERS)
// =========================================================================
const SHAPES_DATA = { "Polygon Base": [{ name: "Triangle", val: "triangle" }, { name: "Square", val: "square" }, { name: "Hexagon", val: "hexagon" }] };
const PRESET_NODES = {
  "triangle": [{id:1, x:50, y:0}, {id:2, x:0, y:100}, {id:3, x:100, y:100}],
  "square": [{id:1, x:0, y:0}, {id:2, x:100, y:0}, {id:3, x:100, y:100}, {id:4, x:0, y:100}],
  "hexagon": [{id:1, x:25, y:0}, {id:2, x:75, y:0}, {id:3, x:100, y:50}, {id:4, x:75, y:100}, {id:5, x:25, y:100}, {id:6, x:0, y:50}]
};

export const PluginShapes = () => {
  const createShape = (id, name) => ({ id, name, mode: 'preset', shapeVal: 'square', color: '#8b5cf6', nodes: PRESET_NODES['square'], rounded: 0, x: 100, y: 100, w: 200, h: 200, visible: true, locked: false });
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
  const handleShapeChange = (val) => setShapes(shapes.map(s => s.id === activeShapeId ? { ...s, shapeVal: val, nodes: PRESET_NODES[val] || [], mode: 'preset' } : s));

  const addShapeLayer = () => { const newId = Date.now(); setShapes([...shapes, createShape(newId, `Shape ${shapes.length + 1}`)]); setActiveShapeId(newId); };
  const duplicateShape = (id) => { const toCopy = shapes.find(s => s.id === id); if (!toCopy) return; const newId = Date.now(); setShapes([...shapes, { ...toCopy, id: newId, name: `${toCopy.name} Copy`, x: toCopy.x + 20, y: toCopy.y + 20 }]); setActiveShapeId(newId); };
  const deleteShape = (id) => { if (shapes.length <= 1) return; const newShapes = shapes.filter(s => s.id !== id); setShapes(newShapes); if (activeShapeId === id) setActiveShapeId(newShapes[newShapes.length - 1].id); };
  const snapCoordinate = (val) => snapToGrid ? Math.round(val / 5) * 5 : Math.round(val);

  const handlePointerDownCanvas = (e) => {
    if (activeTool === 'pan') {
      setIsDraggingPan(true); setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y }); e.currentTarget.setPointerCapture(e.pointerId);
    } else if (activeTool === 'pen' && activeShape) {
      const rect = e.currentTarget.getBoundingClientRect();
      const xPercent = (((e.clientX - rect.left) / scale) / activeShape.w) * 100;
      const yPercent = (((e.clientY - rect.top) / scale) / activeShape.h) * 100;
      const newNode = { id: Date.now(), x: Math.max(0, Math.min(100, snapCoordinate(xPercent))), y: Math.max(0, Math.min(100, snapCoordinate(yPercent))) };
      updateActive('nodes', [...activeShape.nodes, newNode]); updateActive('mode', 'custom');
    }
  };
  const handlePointerDownNode = (e, id) => { if (activeTool === 'pen') { e.stopPropagation(); setDraggingNode(id); e.currentTarget.setPointerCapture(e.pointerId); } };
  const handlePointerDownShape = (e, id, shapeState) => {
    if (activeTool === 'pan') {
      e.stopPropagation(); setActiveShapeId(id);
      if (!shapeState.locked) { setDraggingShape(id); setDragStart({ x: e.clientX, y: e.clientY }); setElemStart({ x: shapeState.x, y: shapeState.y }); e.currentTarget.setPointerCapture(e.pointerId); }
    }
  };
  const handlePointerMove = (e) => {
    if (isDraggingPan) { setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); }
    else if (draggingNode && activeTool === 'pen' && activeShape) {
      const rect = e.currentTarget.getBoundingClientRect();
      const xPercent = (((e.clientX - rect.left) / scale) / activeShape.w) * 100; const yPercent = (((e.clientY - rect.top) / scale) / activeShape.h) * 100;
      updateActive('nodes', activeShape.nodes.map(n => n.id === draggingNode ? { ...n, x: Math.max(0, Math.min(100, snapCoordinate(xPercent))), y: Math.max(0, Math.min(100, snapCoordinate(yPercent))) } : n)); updateActive('mode', 'custom');
    } else if (draggingShape && activeTool === 'pan') {
      const dx = (e.clientX - dragStart.x) / scale; const dy = (e.clientY - dragStart.y) / scale;
      updateActive('x', snapCoordinate(elemStart.x + dx)); updateActive('y', snapCoordinate(elemStart.y + dy));
    }
  };
  const handlePointerUp = (e) => { if (isDraggingPan) setIsDraggingPan(false); if (draggingNode) setDraggingNode(null); if (draggingShape) setDraggingShape(null); e.currentTarget.releasePointerCapture(e.pointerId); };

  const getShapeCss = (s) => {
    const isSquare = s.mode === 'preset' && s.shapeVal === 'square';
    if (isSquare) return `border-radius: ${s.rounded}%; background-color: ${s.color}; width: ${s.w}px; height: ${s.h}px; transform: translate(${s.x}px, ${s.y}px);`;
    const polyString = s.nodes.length >= 3 ? s.nodes.map(n => `${n.x}% ${n.y}%`).join(', ') : '0 0, 0 0, 0 0';
    return `clip-path: polygon(${polyString}); background-color: ${s.color}; width: ${s.w}px; height: ${s.h}px; transform: translate(${s.x}px, ${s.y}px);`;
  };
  const css = `.canvas-wrapper { position: relative; width: 400px; height: 400px; }\n${shapes.map((s, i) => `.shape-${i+1} {\n  position: absolute;\n  ${getShapeCss(s)}\n}`).join('\n\n')}`;
  const html = `<div class="canvas-wrapper">\n${shapes.map((s,i) => `  <div class="shape-${i+1}"></div>`).join('\n')}\n</div>`;
  const jsx = `<div className="relative w-[400px] h-[400px]">\n${shapes.map((s,i) => `  <div style={{ position: 'absolute', transform: 'translate(${s.x}px, ${s.y}px)', width: '${s.w}px', height: '${s.h}px', ${s.mode === 'preset' && s.shapeVal === 'square' ? `borderRadius: '${s.rounded}%'` : `clipPath: 'polygon(${s.nodes.length >= 3 ? s.nodes.map(n => `${n.x}% ${n.y}%`).join(', ') : '0 0'})'`}, backgroundColor: '${s.color}' }} />`).join('\n')}\n</div>`;

  const preview = (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden border border-white/5 bg-[#050505] rounded-xl touch-none" onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <div className="absolute top-3 left-3 bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] p-1.5 rounded-xl flex flex-col gap-2 z-20 shadow-xl">
        <button onClick={() => setActiveTool('pen')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pen' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`}><div className="w-4 h-4"><Icons.Pen /></div></button>
        <button onClick={() => setActiveTool('pan')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pan' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`}><div className="w-4 h-4"><Icons.HandPan /></div></button>
      </div>

      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`, transition: isDraggingPan ? 'none' : 'transform 0.1s ease-out' }} className="absolute">
        <div className={`relative ${activeTool === 'pen' ? 'cursor-crosshair' : ''}`} style={{ width: '400px', height: '400px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed #444' }} onPointerDown={handlePointerDownCanvas} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
          {snapToGrid && activeTool === 'pen' && <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>}
          
          {shapes.map((s) => {
            if (!s.visible) return null;
            const isSquare = s.mode === 'preset' && s.shapeVal === 'square';
            const polyString = s.nodes.length >= 3 ? s.nodes.map(n => `${n.x}% ${n.y}%`).join(', ') : '0 0, 0 0, 0 0';
            const isActive = s.id === activeShapeId;

            return (
              <div key={s.id} onPointerDown={(e) => handlePointerDownShape(e, s.id, s)} className={`absolute ${activeTool === 'pan' ? (isActive ? 'cursor-grabbing ring-1 ring-cyan-500 shadow-2xl' : (s.locked ? '' : 'cursor-grab hover:ring-1 ring-white/30')) : 'pointer-events-none'}`} style={{ width: `${s.w}px`, height: `${s.h}px`, transform: `translate(${s.x}px, ${s.y}px)`, zIndex: isActive ? 10 : 1, opacity: s.locked ? 0.7 : 1 }}>
                <div style={{ backgroundColor: s.color, width: '100%', height: '100%', borderRadius: isSquare ? `${s.rounded}%` : '0', clipPath: isSquare ? 'none' : `polygon(${polyString})`, pointerEvents: 'none' }} />
                {isActive && activeTool === 'pen' && !isSquare && !s.locked && s.nodes.map((node, i) => (
                   <div key={node.id} onPointerDown={(e) => handlePointerDownNode(e, node.id)} className="absolute w-3 h-3 bg-white border border-cyan-500 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing hover:scale-150 transition-transform pointer-events-auto" style={{ left: `calc(${node.x}% - 6px)`, top: `calc(${node.y}% - 6px)`, zIndex: 50 }} />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
  
  const controls = (
    <div className="space-y-2">
      <PluginTip text="PANDUAN VECTOR: Batas kanvas bergaris putus-putus. Gunakan Panel Layer untuk mengunci atau menumpuk shape! Atur Width & Height untuk merubah ukuran." />
      <ControlHeader title="Workspace Configuration" onReset={handleReset} />
      
      <div className="border-t border-[#1f1f1f] pt-4 pb-2 mb-4">
         <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2"><Icons.Layers /> Shapes Layer</span>
            <button onClick={addShapeLayer} className="text-[8px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded uppercase tracking-widest hover:bg-cyan-500/20 transition-all">+ Shape Baru</button>
         </div>
         <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scroll pr-1">
            {[...shapes].reverse().map(s => (
               <div key={s.id} onClick={() => setActiveShapeId(s.id)} className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${activeShapeId === s.id ? 'bg-[#1a1a1a] border-cyan-500' : 'bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#444]'}`}>
                  <div className="flex items-center gap-3">
                     <button onClick={(e) => { e.stopPropagation(); toggleLayerProp(s.id, 'visible'); }} className={`w-4 h-4 ${s.visible ? 'text-cyan-400' : 'text-slate-600'}`}>{s.visible ? <Icons.Eye /> : <Icons.EyeOff />}</button>
                     <button onClick={(e) => { e.stopPropagation(); toggleLayerProp(s.id, 'locked'); }} className={`w-4 h-4 ${s.locked ? 'text-red-400' : 'text-slate-500'}`}>{s.locked ? <Icons.Lock /> : <Icons.Unlock />}</button>
                     <div className="w-3 h-3 rounded-full border border-white/20" style={{backgroundColor: s.color}}></div>
                     <span className={`text-[10px] font-bold uppercase tracking-wider ${activeShapeId === s.id ? 'text-white' : 'text-slate-400'}`}>{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={(e) => { e.stopPropagation(); duplicateShape(s.id); }} className="w-4 h-4 text-slate-400 hover:text-white" title="Gandakan"><Icons.Copy /></button>
                     <button onClick={(e) => { e.stopPropagation(); deleteShape(s.id); }} disabled={shapes.length <= 1} className="w-4 h-4 text-slate-400 hover:text-red-400 disabled:opacity-30"><Icons.Trash /></button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-[#2a2a2a] w-full mb-5">
        <button onClick={() => {updateActive('mode', 'preset'); setActiveTool('pan');}} className={`flex-1 py-3 rounded-lg text-[9px] font-bold uppercase transition-all ${activeShape?.mode === 'preset' ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-slate-500 hover:text-slate-300'}`}>Preset Library</button>
        <button onClick={() => {updateActive('mode', 'custom'); setActiveTool('pen');}} className={`flex-1 py-3 rounded-lg text-[9px] font-bold uppercase transition-all ${activeShape?.mode === 'custom' ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-slate-500 hover:text-slate-300'}`}>Custom Pen</button>
      </div>

      <FigmaColorPicker label="Shape Color" hexValue={activeShape?.color} onChange={(v) => updateActive('color', v)} />
      
      <div className="grid grid-cols-2 gap-4 mt-2 mb-4">
        <FigmaSlider label="Width" min={50} max={400} value={activeShape?.w} onChange={(v) => updateActive('w', v)} unit="px" />
        <FigmaSlider label="Height" min={50} max={400} value={activeShape?.h} onChange={(v) => updateActive('h', v)} unit="px" />
      </div>

      {activeShape?.mode === 'preset' && (
        <>
          <FigmaCustomDropdown label="Select Preset Form" groups={SHAPES_DATA} value={activeShape.shapeVal} onChange={handleShapeChange} />
          {activeShape.shapeVal === 'square' && <FigmaSlider label="Smooth Rounded" min={0} max={50} value={activeShape.rounded} onChange={(v) => updateActive('rounded', v)} unit="%" />}
        </>
      )}

      {activeShape?.mode === 'custom' && (
         <button onClick={() => updateActive('nodes', [])} className="w-full mt-2 py-3 bg-[#1a1a1a] hover:bg-red-500/20 border border-[#333] hover:border-red-500/50 text-slate-300 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm">
           Clear Custom Shape
         </button>
      )}

      <div className="flex items-center justify-between py-3 border-t border-[#1f1f1f] mt-4">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Magnet / Snap To Grid</span>
         <button onClick={() => setSnapToGrid(!snapToGrid)} className={`w-8 h-4 rounded-full transition-colors relative ${snapToGrid ? 'bg-cyan-500' : 'bg-[#333]'}`}>
            <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all ${snapToGrid ? 'left-4.5' : 'left-0.5'}`}></div>
         </button>
      </div>
    </div>
  );
  return <WorkspaceLayout name="Vector Shapes" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// =========================================================================
// 3. PIXEL DRAWING (FIX: ROTASI 2 JARI, MATH MATRIX PRESISI, UI REVAMP)
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

export const PluginPixelDrawing = () => {
  const [gridSize, setGridSize] = useState(16); 
  const [localGridInput, setLocalGridInput] = useState('16'); 
  const [canvasBgColor, setCanvasBgColor] = useState('#ffffff');
  const [isTransparent, setIsTransparent] = useState(false); 
  const [color, setColor] = useState('#0ea5e9');
  const [palette, setPalette] = useState([...COLOR_PRESETS]);
  const [outputSize, setOutputSize] = useState(1080); 

  const createEmptyLayer = (id, name) => ({ id, name, pixels: Array(gridSize * gridSize).fill('transparent'), visible: true, locked: false });
  const [layers, setLayers] = useState([createEmptyLayer(1, "Layer 1")]);
  const [activeLayerId, setActiveLayerId] = useState(1);
  const [history, setHistory] = useState([[{...createEmptyLayer(1, "Layer 1")}]]);
  const [step, setStep] = useState(0);

  const { scale, pan, rotation, setScale, setPan, onTouchStart, onTouchMove, resetView } = useMultiTouch();
  const [activeTool, setActiveTool] = useState('draw'); 
  
  const [isDraggingPan, setIsDraggingPan] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const safeGrid = Math.min(Math.max(gridSize, 8), 64);
    const newLayers = [createEmptyLayer(1, "Layer 1")];
    setLayers(newLayers); setHistory([newLayers]); setStep(0); setActiveLayerId(1);
    setLocalGridInput(safeGrid.toString()); resetView(); setOutputSize(Math.max(outputSize, safeGrid));
  }, [gridSize]);

  const handleReset = () => {
    setGridSize(16); setLocalGridInput('16'); setCanvasBgColor('#ffffff'); setIsTransparent(false); 
    setColor('#0ea5e9'); setOutputSize(1080); resetView(); setActiveTool('draw');
    const newLayers = [createEmptyLayer(1, "Layer 1")];
    setLayers(newLayers); setHistory([newLayers]); setStep(0); setActiveLayerId(1);
  };

  const mergedPixels = Array(gridSize * gridSize).fill('transparent');
  layers.forEach(layer => {
    if (!layer.visible) return;
    layer.pixels.forEach((p, j) => { if (p !== 'transparent') mergedPixels[j] = p; });
  });

  const saveHistory = (newLayers) => {
    const newHistory = history.slice(0, step + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLayers))); 
    if (newHistory.length > 15) newHistory.shift(); 
    setHistory(newHistory); setStep(newHistory.length - 1);
  };

  const handleUndo = () => { const newStep = Math.max(0, step - 1); setStep(newStep); setLayers(JSON.parse(JSON.stringify(history[newStep]))); };
  const handleRedo = () => { const newStep = Math.min(history.length - 1, step + 1); setStep(newStep); setLayers(JSON.parse(JSON.stringify(history[newStep]))); };

  const paintPixel = (index) => {
    if (activeTool === 'pan' || activeTool === 'picker') return;
    const newLayers = [...layers];
    const activeLayerIndex = newLayers.findIndex(l => l.id === activeLayerId);
    if (activeLayerIndex === -1 || newLayers[activeLayerIndex].locked || !newLayers[activeLayerIndex].visible) return;

    if (activeTool === 'bucket') {
       const targetColor = newLayers[activeLayerIndex].pixels[index];
       newLayers[activeLayerIndex].pixels = floodFill(newLayers[activeLayerIndex].pixels, index, targetColor, color, gridSize);
       setLayers(newLayers); saveHistory(newLayers); return;
    }
    const newColor = activeTool === 'erase' ? 'transparent' : color;
    if (newLayers[activeLayerIndex].pixels[index] === newColor) return; 
    newLayers[activeLayerIndex].pixels[index] = newColor;
    setLayers(newLayers);
  };

  // FIX MATH UTAMA: Mengkalkulasi kordinat sentuh menggunakan matriks matematika murni (Tanpa elementFromPoint) agar kebal dari Wrapper Layer saat Rotasi & Zoom!
  const paintByEvent = (e) => {
    if (activeTool === 'pan' || e.touches?.length > 1 || !gridRef.current) return;
    
    let clientX = e.clientX; let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
    if (clientX === undefined || clientY === undefined) return;

    const rect = gridRef.current.getBoundingClientRect();
    const pixelSizePx = gridSize <= 8 ? 20 : gridSize <= 16 ? 12 : gridSize <= 32 ? 6 : 4;
    
    // Perhitungkan rotasi dan scale kanvas untuk menemukan kordinat XY sesungguhnya
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;

    const angleRad = -rotation * (Math.PI / 180);
    const rotatedX = dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
    const rotatedY = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);

    const xReal = (rotatedX + (gridSize * pixelSizePx * scale) / 2) / scale;
    const yReal = (rotatedY + (gridSize * pixelSizePx * scale) / 2) / scale;

    if (xReal < 0 || yReal < 0 || xReal >= (gridSize * pixelSizePx) || yReal >= (gridSize * pixelSizePx)) return;

    const col = Math.floor(xReal / pixelSizePx);
    const row = Math.floor(yReal / pixelSizePx);
    const index = row * gridSize + col;

    if (index >= 0 && index < gridSize * gridSize) {
      if (activeTool === 'picker') {
         const pickedColor = mergedPixels[index] !== 'transparent' ? mergedPixels[index] : (isTransparent ? '#ffffff' : canvasBgColor);
         setColor(pickedColor); setActiveTool('draw'); return;
      }
      paintPixel(index);
    }
  };

  const handlePointerDown = (e) => {
    if (activeTool === 'pan') {
      setIsDraggingPan(true); setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y }); e.currentTarget.setPointerCapture(e.pointerId);
    } else {
      setIsDrawing(true); paintByEvent(e); e.currentTarget.setPointerCapture(e.pointerId);
    }
  };
  const handlePointerMove = (e) => {
    if (isDraggingPan && activeTool === 'pan') setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    else if (isDrawing && activeTool !== 'bucket' && activeTool !== 'picker') paintByEvent(e);
  };
  const handlePointerUp = (e) => {
    if (isDraggingPan) setIsDraggingPan(false);
    if (isDrawing) { setIsDrawing(false); if(activeTool === 'draw' || activeTool === 'erase') saveHistory(layers); }
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const addLayer = () => { const newId = Date.now(); const newLayers = [...layers, createEmptyLayer(newId, `Layer ${layers.length + 1}`)]; setLayers(newLayers); setActiveLayerId(newId); saveHistory(newLayers); };
  const duplicateLayer = (id) => { const layerToCopy = layers.find(l => l.id === id); if (!layerToCopy) return; const newId = Date.now(); const newLayers = [...layers, { ...layerToCopy, id: newId, name: `${layerToCopy.name} Copy` }]; setLayers(newLayers); setActiveLayerId(newId); saveHistory(newLayers); };
  const deleteLayer = (id) => { if (layers.length <= 1) return; const newLayers = layers.filter(l => l.id !== id); setLayers(newLayers); if (activeLayerId === id) setActiveLayerId(newLayers[newLayers.length - 1].id); saveHistory(newLayers); };
  const toggleLayerProp = (id, prop) => { const newLayers = layers.map(l => l.id === id ? { ...l, [prop]: !l[prop] } : l); setLayers(newLayers); saveHistory(newLayers); };
  const handleGridSubmit = () => { let val = parseInt(localGridInput, 10); if (isNaN(val) || val < 8) val = 8; if (val > 64) val = 64; setGridSize(val); setLocalGridInput(val.toString()); };
  const addToPalette = () => { if (!palette.includes(color)) setPalette([color, ...palette].slice(0, 15)); };

  const downloadImage = () => {
    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
    canvas.width = outputSize; canvas.height = outputSize;
    const pSize = outputSize / gridSize;

    if (!isTransparent) { ctx.fillStyle = canvasBgColor; ctx.fillRect(0, 0, outputSize, outputSize); }
    mergedPixels.forEach((p, i) => {
      if (p !== 'transparent') {
        ctx.fillStyle = p;
        const x = (i % gridSize) * pSize; const y = Math.floor(i / gridSize) * pSize;
        ctx.fillRect(x, y, pSize, pSize);
      }
    });

    const link = document.createElement('a'); link.download = `pixel-art-${outputSize}px.png`;
    link.href = canvas.toDataURL('image/png'); link.click();
  };

  const pixelSizePx = gridSize <= 8 ? 20 : gridSize <= 16 ? 12 : gridSize <= 32 ? 6 : 4;
  const generateBoxShadow = () => {
    let shadow = [];
    mergedPixels.forEach((p, i) => {
      if (p !== 'transparent') {
        const x = (i % gridSize) * pixelSizePx; const y = Math.floor(i / gridSize) * pixelSizePx;
        shadow.push(`${x}px ${y}px ${p}`);
      }
    });
    return shadow.length > 0 ? shadow.join(',\n    ') : 'none';
  };

  const actualBg = isTransparent ? 'transparent' : canvasBgColor;
  const css = `/* Pure CSS Pixel Art (${gridSize}x${gridSize}) */\n.pixel-art {\n  width: ${pixelSizePx}px;\n  height: ${pixelSizePx}px;\n  background: ${actualBg};\n  box-shadow: \n    ${generateBoxShadow()};\n}`;
  const html = `<div style="width: ${pixelSizePx}px; height: ${pixelSizePx}px; background: ${actualBg}; box-shadow: ${generateBoxShadow().replace(/\n\s+/g, ' ')};"></div>`;
  const jsx = `<div style={{ width: '${pixelSizePx}px', height: '${pixelSizePx}px', background: '${actualBg}', boxShadow: '${generateBoxShadow().replace(/\n\s+/g, ' ')}' }} />`;

  const preview = (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden border border-white/5 bg-[#050505] rounded-xl touch-none"
      onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
      onTouchStart={(e) => { if (activeTool === 'pan' || e.touches.length > 1) onTouchStart(e); }} 
      onTouchMove={(e) => { if (activeTool === 'pan' || e.touches.length > 1) onTouchMove(e); else if(isDrawing) paintByEvent(e); }}
    >
      {/* TOOLBAR KIRI (Dibuat vertikal melayang agar tidak menutupi gambar) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-3 bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] p-1.5 rounded-xl flex flex-col gap-2 z-20 shadow-2xl">
        <button onClick={() => setActiveTool('draw')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'draw' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Kuas"><div className="w-4 h-4"><Icons.Brush /></div></button>
        <button onClick={() => setActiveTool('erase')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'erase' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Penghapus"><div className="w-4 h-4"><Icons.Eraser /></div></button>
        <button onClick={() => setActiveTool('bucket')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'bucket' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Ember Cat"><div className="w-4 h-4"><Icons.Bucket /></div></button>
        <button onClick={() => setActiveTool('picker')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'picker' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Pipet Warna"><div className="w-4 h-4"><Icons.Picker /></div></button>
        <div className="w-full h-px bg-[#333] my-0.5"></div>
        <button onClick={() => setActiveTool('pan')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pan' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Geser Kanvas"><div className="w-4 h-4"><Icons.HandPan /></div></button>
      </div>

      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale}) rotate(${rotation}deg)`, transition: isDraggingPan ? 'none' : 'transform 0.1s ease-out' }} className="absolute">
        {/* PETUNJUK TOP / ATAS */}
        <div className="absolute -top-5 left-0 w-full flex justify-center pointer-events-none">
           <span className="bg-red-500 text-white text-[8px] font-black px-3 py-1 rounded-t-lg tracking-widest shadow-xl">TOP SIDE</span>
        </div>
        <div 
           ref={gridRef}
           className="grid shadow-[0_0_50px_rgba(0,0,0,0.8)] border-t-2 border-t-red-500 bg-[#ffffff]" 
           style={{ 
             width: gridSize * pixelSizePx, height: gridSize * pixelSizePx,
             gridTemplateColumns: `repeat(${gridSize}, ${pixelSizePx}px)`, gridTemplateRows: `repeat(${gridSize}, ${pixelSizePx}px)`,
             backgroundColor: isTransparent ? 'transparent' : canvasBgColor,
             backgroundImage: isTransparent ? 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)' : 'none',
             backgroundSize: '12px 12px', backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px'
           }}
        >
          {mergedPixels.map((bg, i) => (
            <div key={i} className={`w-full h-full border-[0.5px] pointer-events-none ${isTransparent ? 'border-white/10' : (canvasBgColor==='#ffffff'?'border-black/10':'border-white/20')}`} style={{ backgroundColor: bg !== 'transparent' ? bg : undefined }} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 flex gap-2 z-20">
        <button onClick={handleUndo} disabled={step === 0} className={`w-10 h-10 flex items-center justify-center rounded-full border bg-[#141414] ${step === 0 ? 'border-[#1f1f1f] text-slate-600' : 'border-[#333] text-slate-300 hover:text-white hover:bg-[#1f1f1f] shadow-lg'}`}><div className="w-4 h-4"><Icons.Undo /></div></button>
        <button onClick={handleRedo} disabled={step === history.length - 1} className={`w-10 h-10 flex items-center justify-center rounded-full border bg-[#141414] ${step === history.length - 1 ? 'border-[#1f1f1f] text-slate-600' : 'border-[#333] text-slate-300 hover:text-white hover:bg-[#1f1f1f] shadow-lg'}`}><div className="w-4 h-4"><Icons.Redo /></div></button>
      </div>
    </div>
  );

  const controls = (
    <div className="space-y-2">
      <PluginTip text="CANVAS PRO: Gunakan 2 Jari untuk memutar & zoom layar. Gunakan Ember untuk warna cepat, dan Sistem Layer untuk desain kompleks layaknya Photoshop!" />
      <ControlHeader title="Workspace Setup" onReset={handleReset} />
      
      <div className="mb-5 mt-2">
         <label className="text-[10px] font-medium text-slate-400 block mb-2">Grid Resolusi (Min: 8, Max: 64)</label>
         <div className="flex gap-2">
            <input type="number" value={localGridInput} onChange={(e) => setLocalGridInput(e.target.value)} onBlur={handleGridSubmit} onKeyDown={(e) => { if (e.key === 'Enter') handleGridSubmit(); }} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-[11px] text-white outline-none focus:border-cyan-500 transition-all font-mono" />
            <button onClick={handleGridSubmit} className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg text-[9px] font-bold uppercase transition-all hover:bg-cyan-500/20">Terapkan</button>
         </div>
      </div>

      <div className="flex items-center gap-3 mb-3 border-t border-[#1f1f1f] pt-5">
        <div className="flex-1"><FigmaColorPicker label="Warna Kuas (Brush)" hexValue={color} onChange={setColor} /></div>
        <button onClick={addToPalette} className="mt-2 w-10 h-10 rounded-lg bg-[#141414] border border-[#2a2a2a] text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500 flex items-center justify-center transition-all shadow-sm"><div className="w-4 h-4"><Icons.Plus /></div></button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {palette.map((c, i) => (
           <button key={i} onClick={() => {setColor(c); setActiveTool('draw');}} className={`w-7 h-7 rounded-lg border transition-transform ${color === c && activeTool === 'draw' ? 'border-cyan-400 scale-110 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'border-[#333] hover:scale-105'}`} style={{backgroundColor: c}}></button>
        ))}
      </div>

      {/* LAYER MANAGEMENT */}
      <div className="border-t border-[#1f1f1f] pt-5 pb-2 mb-5">
         <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2"><Icons.Layers /> Layers Panel</span>
            <button onClick={addLayer} className="text-[8px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded uppercase tracking-widest hover:bg-cyan-500/20 transition-all">+ Layer Baru</button>
         </div>
         <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scroll pr-2">
            {[...layers].reverse().map(layer => (
               <div key={layer.id} onClick={() => setActiveLayerId(layer.id)} className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${activeLayerId === layer.id ? 'bg-[#1a1a1a] border-cyan-500' : 'bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#444]'}`}>
                  <div className="flex items-center gap-3">
                     <button onClick={(e) => { e.stopPropagation(); toggleLayerProp(layer.id, 'visible'); }} className={`w-4 h-4 transition-colors ${layer.visible ? 'text-cyan-400 hover:text-cyan-300' : 'text-slate-600 hover:text-slate-400'}`}>{layer.visible ? <Icons.Eye /> : <Icons.EyeOff />}</button>
                     <button onClick={(e) => { e.stopPropagation(); toggleLayerProp(layer.id, 'locked'); }} className={`w-4 h-4 transition-colors ${layer.locked ? 'text-red-400 hover:text-red-300' : 'text-slate-500 hover:text-slate-300'}`}>{layer.locked ? <Icons.Lock /> : <Icons.Unlock />}</button>
                     <span className={`text-[10px] font-bold uppercase tracking-wider ${activeLayerId === layer.id ? 'text-white' : 'text-slate-400'}`}>{layer.name} {activeLayerId === layer.id && '(Aktif)'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={(e) => { e.stopPropagation(); duplicateLayer(layer.id); }} className="w-4 h-4 text-slate-400 hover:text-white transition-colors" title="Gandakan Layer"><Icons.Copy /></button>
                     <button onClick={(e) => { e.stopPropagation(); deleteLayer(layer.id); }} disabled={layers.length <= 1} className="w-4 h-4 text-slate-400 hover:text-red-400 disabled:opacity-30 transition-colors" title="Hapus Layer"><Icons.Trash /></button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="border-t border-[#1f1f1f] pt-5 pb-2">
         <FigmaColorPicker label="Warna Background Kanvas" hexValue={canvasBgColor} onChange={setCanvasBgColor} />
         <div className="flex items-center justify-between mb-4 mt-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Export Settings</span>
            <div className="flex items-center gap-2">
               <span className="text-[9px] text-slate-400 uppercase font-bold">Transparan BG</span>
               <button onClick={() => setIsTransparent(!isTransparent)} className={`w-8 h-4 rounded-full transition-colors relative ${isTransparent ? 'bg-cyan-500' : 'bg-[#333]'}`}>
                  <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all ${isTransparent ? 'left-4.5' : 'left-0.5'}`}></div>
               </button>
            </div>
         </div>
         <FigmaSlider label="Output Size" min={gridSize} max={1920} step={gridSize} value={outputSize} onChange={setOutputSize} unit="px" />
         <button onClick={downloadImage} className="mt-5 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
           <div className="w-5 h-5"><Icons.Download /></div> Download HD PNG
         </button>
      </div>
    </>
  );

  return <WorkspaceLayout name="Pixel Drawing Pro" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// =========================================================================
// EXPORT SEMUA PLUGIN KE PAGE.JSX
// =========================================================================
