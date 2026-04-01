"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaCustomDropdown, WorkspaceLayout, ControlHeader, COLOR_PRESETS, useMultiTouch } from './ui';

// =========================================================================
// 1. TRUE 3D CUBE STUDIO
// =========================================================================
export const PluginTransform = () => {
  const [rx, setRx] = useState(30); const [ry, setRy] = useState(-30); const [rz, setRz] = useState(0); 
  const [tx, setTx] = useState(0); const [ty, setTy] = useState(0); const [tz, setTz] = useState(0); 
  const [scale, setScale] = useState(1); const [cubeSize, setCubeSize] = useState(120);
  
  // Auto scale untuk Mobile
  const initialScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.7 : 1;
  const { scale: touchScale, pan, onTouchStart, onTouchMove, resetView } = useMultiTouch();

  const handleReset = () => { setRx(30); setRy(-30); setRz(0); setTx(0); setTy(0); setTz(0); setScale(1); setCubeSize(120); resetView(); };

  const faceStyle = "absolute flex items-center justify-center font-black text-white/90 tracking-widest text-[16px] border border-white/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]";

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center touch-none overflow-hidden" style={{ perspective: '1000px' }} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <div style={{ transformStyle: 'preserve-3d', transform: `translate(${pan.x}px, ${pan.y}px) scale(${touchScale * scale * initialScale})`, transition: 'transform 0.1s linear' }}>
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
      <PluginTip text="PANDUAN: Ini adalah Kubus 3D Sungguhan (6 Sisi)! Gunakan 2 jari di layar preview untuk zoom dan geser kanvas." />
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
// 2. VECTOR SHAPES (LAYERS & MULTI-SHAPE)
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

  const initialScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.7 : 1;
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
    } else if (activeTool === 'pen' && activeShape && !activeShape.locked) {
      const rect = e.currentTarget.getBoundingClientRect();
      const actualScale = scale * initialScale;
      const xPercent = (((e.clientX - rect.left) / actualScale) / activeShape.w) * 100; 
      const yPercent = (((e.clientY - rect.top) / actualScale) / activeShape.h) * 100;
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
      const actualScale = scale * initialScale;
      const xPercent = (((e.clientX - rect.left) / actualScale) / activeShape.w) * 100; 
      const yPercent = (((e.clientY - rect.top) / actualScale) / activeShape.h) * 100;
      updateActive('nodes', activeShape.nodes.map(n => n.id === draggingNode ? { ...n, x: Math.max(0, Math.min(100, snapCoordinate(xPercent))), y: Math.max(0, Math.min(100, snapCoordinate(yPercent))) } : n));
    } else if (draggingShape && activeTool === 'pan') {
      const actualScale = scale * initialScale;
      const dx = (e.clientX - dragStart.x) / actualScale; 
      const dy = (e.clientY - dragStart.y) / actualScale;
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
        <button onClick={() => setActiveTool('pen')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pen' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Pen Tool"><div className="w-4 h-4"><Icons.Pen /></div></button>
        <button onClick={() => setActiveTool('pan')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pan' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Geser/Pilih Layer"><div className="w-4 h-4"><Icons.HandPan /></div></button>
      </div>

      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale * initialScale})` }} className="absolute">
        <div 
          className={`relative ${activeTool === 'pen' ? 'cursor-crosshair' : ''}`} 
          style={{ width: '400px', height: '400px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed #444' }}
          onPointerDown={handlePointerDownCanvas} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
        >
          {snapToGrid && activeTool === 'pen' && <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>}
          
          {shapes.map((s) => {
            if (!s.visible) return null;
            const isSquare = s.mode === 'preset' && s.shapeVal === 'square';
            const polyString = s.nodes.length >= 3 ? s.nodes.map(n => `${n.x}% ${n.y}%`).join(', ') : '0 0, 0 0, 0 0';
            const isActive = s.id === activeShapeId;

            return (
              <div 
                key={s.id} onPointerDown={(e) => handlePointerDownShape(e, s.id, s)}
                className={`absolute ${activeTool === 'pan' ? (isActive ? 'cursor-grabbing ring-1 ring-cyan-500 shadow-2xl' : (s.locked ? '' : 'cursor-grab hover:ring-1 ring-white/30')) : 'pointer-events-none'}`}
                style={{ width: `${s.w}px`, height: `${s.h}px`, transform: `translate(${s.x}px, ${s.y}px)`, zIndex: isActive ? 10 : 1, opacity: s.locked ? 0.7 : 1 }}
              >
                <div style={{ backgroundColor: s.color, width: '100%', height: '100%', borderRadius: isSquare ? `${s.rounded}%` : '0', clipPath: isSquare ? 'none' : `polygon(${polyString})`, pointerEvents: 'none' }} />
                {isActive && activeTool === 'pen' && !isSquare && !s.locked && s.nodes.map((node, i) => (
                   <div key={node.id} onPointerDown={(e) => handlePointerDownNode(e, node.id)} className="absolute w-4 h-4 bg-white border-2 border-cyan-500 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing hover:scale-125 transition-transform pointer-events-auto" style={{ left: `calc(${node.x}% - 8px)`, top: `calc(${node.y}% - 8px)`, zIndex: 50 }} />
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
      <PluginTip text="PANDUAN VECTOR: Batas kanvas 400x400 terlihat dengan garis putus-putus. Gunakan Panel Layer untuk mengunci atau menumpuk shape! Atur Width & Height untuk resize." />
      <ControlHeader title="Workspace Configuration" onReset={handleReset} />
      
      {/* SHAPE LAYERS PANEL */}
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-4">
        <FigmaSlider label="Width" min={50} max={400} value={activeShape?.w} onChange={(v) => updateActive('w', v)} unit="px" />
        <FigmaSlider label="Height" min={50} max={400} value={activeShape?.h} onChange={(v) => updateActive('h', v)} unit="px" />
      </div>

      {activeShape?.mode === 'preset' && (
        <>
          <FigmaCustomDropdown label="Select Preset Form" groups={SHAPES_PRESET} value={activeShape.shapeVal} onChange={handleShapeChange} />
          {activeShape.shapeVal === 'square' && <FigmaSlider label="Smooth Rounded" min={0} max={50} value={activeShape.rounded} onChange={(v) => updateActive('rounded', v)} unit="%" />}
        </>
      )}

      {activeShape?.mode === 'custom' && (
         <button onClick={() => updateActive('nodes', [])} className="w-full mt-2 py-3 bg-[#1a1a1a] hover:bg-red-500/20 border border-[#333] hover:border-red-500/50 text-slate-300 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors shadow-sm">Clear Custom Shape</button>
      )}

      <div className="flex items-center justify-between py-4 border-t border-[#1f1f1f] mt-5">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Magnet / Snap To Grid</span>
         <button onClick={() => setSnapToGrid(!snapToGrid)} className={`w-8 h-4 rounded-full transition-colors relative ${snapToGrid ? 'bg-cyan-500' : 'bg-[#333]'}`}>
            <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all ${snapToGrid ? 'left-4.5' : 'left-0.5'}`}></div>
         </button>
      </div>
    </div>
  );
  return <WorkspaceLayout name="Vector Shapes" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// --- LANJUTAN KODE PIXEL DRAWING DI BAWAH ---
