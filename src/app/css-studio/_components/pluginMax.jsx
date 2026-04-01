"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaCustomDropdown, WorkspaceLayout, ControlHeader, COLOR_PRESETS, useMultiTouch } from './ui';

// Ikon tambahan internal
const LocalIcons = {
  Focus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>,
  Grid: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25-15h17.25m-17.25 7.5h17.25m-10.5 7.5v-15m7.5 15v-15" /></svg>
};

// =========================================================================
// 13. TRUE 3D CUBE STUDIO (FIX: KODE OUTPUT WARNA & WIREFRAME)
// =========================================================================
export const PluginTransform = () => {
  const [rx, setRx] = useState(30); const [ry, setRy] = useState(-30); const [rz, setRz] = useState(0); 
  const [tx, setTx] = useState(0); const [ty, setTy] = useState(0); const [tz, setTz] = useState(0); 
  const [scale, setScale] = useState(1); const [cubeSize, setCubeSize] = useState(120);
  const [isWireframe, setIsWireframe] = useState(false); 
  
  const initialScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.7 : 1;
  const { scale: touchScale, pan, onTouchStart, onTouchMove, resetView } = useMultiTouch();

  const handleReset = () => { setRx(30); setRy(-30); setRz(0); setTx(0); setTy(0); setTz(0); setScale(1); setCubeSize(120); setIsWireframe(false); resetView(); };

  const getFaceStyle = (bgAlpha) => `absolute flex items-center justify-center font-black ${isWireframe ? 'text-cyan-400' : 'text-white/90'} tracking-widest text-[16px] sm:text-[20px] ${isWireframe ? 'border-2 border-cyan-500 shadow-[inset_0_0_15px_rgba(6,182,212,0.3)] bg-cyan-900/10' : `border border-white/20 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] backdrop-blur-sm ${bgAlpha}`}`;

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center touch-none overflow-hidden" style={{ perspective: '1000px' }} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <div className="absolute top-3 left-3 bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] p-1.5 rounded-xl flex flex-col gap-2 z-20 shadow-xl">
        <button onClick={resetView} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-[#2a2a2a] transition-all" title="Kembalikan ke Tengah"><div className="w-4 h-4"><LocalIcons.Focus /></div></button>
      </div>

      <div style={{ transformStyle: 'preserve-3d', transform: `translate(${pan.x}px, ${pan.y}px) scale(${touchScale * scale * initialScale})`, transition: 'transform 0.1s linear' }}>
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

  // FIX BUG: Warna sekarang ikut terekspor di CSS!
  const css = `.scene { perspective: 1000px; }\n.cube {\n  position: relative; width: ${cubeSize}px; height: ${cubeSize}px; transform-style: preserve-3d;\n  transform: rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translate3d(${tx}px, ${ty}px, ${tz}px) scale(${scale});\n}\n.face { position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: sans-serif; font-weight: bold; color: white; border: 1px solid rgba(255,255,255,0.2); }\n.front { transform: translateZ(${cubeSize/2}px); background: rgba(14, 165, 233, 0.8); }\n.back { transform: rotateY(180deg) translateZ(${cubeSize/2}px); background: rgba(139, 92, 246, 0.8); }\n.right { transform: rotateY(90deg) translateZ(${cubeSize/2}px); background: rgba(236, 72, 153, 0.8); }\n.left { transform: rotateY(-90deg) translateZ(${cubeSize/2}px); background: rgba(245, 158, 11, 0.8); }\n.top { transform: rotateX(90deg) translateZ(${cubeSize/2}px); background: rgba(16, 185, 129, 0.8); }\n.bottom { transform: rotateX(-90deg) translateZ(${cubeSize/2}px); background: rgba(239, 68, 68, 0.8); }`;
  const html = `<div class="scene">\n  <div class="cube">\n    <div class="face front">DEPAN</div>\n    <div class="face back">BELAKANG</div>\n    <div class="face right">KANAN</div>\n    <div class="face left">KIRI</div>\n    <div class="face top">ATAS</div>\n    <div class="face bottom">BAWAH</div>\n  </div>\n</div>`;
  const jsx = `// Silakan copy struktur CSS dan HTML untuk menerapkan efek Kubus 3D ini.`;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip text="PANDUAN: Geser & Zoom menggunakan 2 jari! Aktifkan mode X-Ray/Wireframe untuk melihat kerangka kubus menembus ke dalam." />
      <ControlHeader title="3D Matrix Setup" onReset={handleReset} />
      
      <div className="flex items-center justify-between mb-4 bg-[#0a0a0a] p-3 rounded-xl border border-[#2a2a2a]">
         <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">X-Ray (Wireframe)</span>
         <button onClick={() => setIsWireframe(!isWireframe)} className={`w-10 h-5 rounded-full transition-colors relative ${isWireframe ? 'bg-cyan-500' : 'bg-[#333]'}`}>
            <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${isWireframe ? 'left-5.5' : 'left-0.5'}`}></div>
         </button>
      </div>

      <FigmaSlider label="Cube Size" min={50} max={300} value={cubeSize} onChange={setCubeSize} unit="px" />
      <div className="border-t border-[#1f1f1f] mt-4 pt-4 mb-2"><span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Rotasi 3D (X, Y, Z)</span></div>
      <FigmaSlider label="Rotate X" min={-180} max={180} value={rx} onChange={setRx} unit="°" />
      <FigmaSlider label="Rotate Y" min={-180} max={180} value={ry} onChange={setRy} unit="°" />
      <FigmaSlider label="Rotate Z" min={-180} max={180} value={rz} onChange={setRz} unit="°" />
      <div className="border-t border-[#1f1f1f] mt-4 pt-4 mb-2"><span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Posisi & Skala</span></div>
      <FigmaSlider label="Translate Z" min={-300} max={300} value={tz} onChange={setTz} unit="px" />
      <FigmaSlider label="Scale" min={0.5} max={2} step={0.1} value={scale} onChange={setScale} unit="x" />
    </div>
  );
  return <WorkspaceLayout name="3D Studio" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};

// =========================================================================
// 14. VECTOR SHAPES (LAYERS & MULTI-SHAPE)
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

  const initialScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.6 : 1;
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
  
  const handleReset = () => { setShapes([createShape(1, "Shape 1")]); setActiveShapeId(1); setSnapToGrid(true); resetView(); setActiveTool('pan'); };
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
        <div className="w-full h-px bg-[#333] my-0.5"></div>
        <button onClick={resetView} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-[#2a2a2a] transition-all" title="Kembalikan ke Tengah"><div className="w-4 h-4"><LocalIcons.Focus /></div></button>
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
      <PluginTip text="PANDUAN VECTOR: Batas kanvas terlihat dengan garis putus-putus. Jika kanvas hilang saat digeser, klik tombol Target (Recenter) di toolbar!" />
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

// Lanjut ke Bagian 2 di bawah

// =========================================================================
// 15. PIXEL DRAWING (FIX 100%: ANTI-MACET, LAYER SYSTEM, GRID TOGGLE)
// =========================================================================
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

  const initialScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.7 : 1;
  const { scale, pan, rotation, setScale, setPan, onTouchStart, onTouchMove, resetView } = useMultiTouch();
  
  const [activeTool, setActiveTool] = useState('draw'); 
  const [isDrawing, setIsDrawing] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const safeGrid = Math.min(Math.max(gridSize, 8), 64);
    const newLayers = [createEmptyLayer(1, "Layer 1")];
    setLayers(newLayers);
    setHistory([newLayers]);
    setStep(0);
    setActiveLayerId(1);
    setLocalGridInput(safeGrid.toString());
    resetView();
  }, [gridSize]);

  const mergedPixels = Array(gridSize * gridSize).fill('transparent');
  layers.forEach(layer => {
    if (!layer.visible) return;
    layer.pixels.forEach((p, j) => {
      if (p !== 'transparent') mergedPixels[j] = p;
    });
  });

  const saveHistory = (newLayers) => {
    const newHistory = history.slice(0, step + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLayers)));
    if (newHistory.length > 20) newHistory.shift();
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  };

  const handleUndo = () => {
    const newStep = Math.max(0, step - 1);
    setStep(newStep);
    setLayers(JSON.parse(JSON.stringify(history[newStep])));
  };

  const handleRedo = () => {
    const newStep = Math.min(history.length - 1, step + 1);
    setStep(newStep);
    setLayers(JSON.parse(JSON.stringify(history[newStep])));
  };

  // LOGIKA SMART DRAWING: Memanfaatkan document.elementsFromPoint agar 100% presisi walau layar di-zoom/rotate!
  const paintByEvent = (e) => {
    if (activeTool === 'pan' || !gridRef.current) return;
    if (e.touches && e.touches.length > 1) return;

    let clientX = e.clientX, clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX; clientY = e.touches[0].clientY;
    }

    const elements = document.elementsFromPoint(clientX, clientY);
    let targetPixel = null;
    for (let el of elements) {
      if (el.getAttribute('data-pixel-index')) {
        targetPixel = el; break;
      }
    }

    if (targetPixel) {
      const index = Number(targetPixel.getAttribute('data-pixel-index'));
      
      if (activeTool === 'picker') {
        const picked = mergedPixels[index] !== 'transparent' ? mergedPixels[index] : (isTransparent ? '#ffffff' : canvasBgColor);
        setColor(picked); setActiveTool('draw'); return;
      }

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
    }
  };

  const handlePointerDown = (e) => {
    if (activeTool !== 'pan') {
      setIsDrawing(true); paintByEvent(e);
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e) => {
    if (isDrawing) { setIsDrawing(false); saveHistory(layers); }
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

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
    const link = document.createElement('a');
    link.download = `pixel-art-hd.png`;
    link.href = canvas.toDataURL('image/png'); link.click();
  };

  const pixelSizePx = gridSize <= 8 ? 20 : gridSize <= 16 ? 12 : gridSize <= 32 ? 6 : 4;
  const boxShadowData = mergedPixels.map((p, i) => p !== 'transparent' ? `${(i % gridSize) * pixelSizePx}px ${Math.floor(i / gridSize) * pixelSizePx}px ${p}` : null).filter(Boolean).join(', ');

  return (
    <WorkspaceLayout 
      name="Pixel Drawing Pro" 
      preview={
        <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden bg-[#050505] touch-none"
          onPointerDown={handlePointerDown} onPointerMove={(e) => isDrawing && paintByEvent(e)} onPointerUp={handlePointerUp}
          onTouchStart={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchStart(e); else {setIsDrawing(true); paintByEvent(e);} }}
          onTouchMove={(e) => { if(activeTool === 'pan' || e.touches.length > 1) onTouchMove(e); else if(isDrawing) paintByEvent(e); }}
        >
          {/* Toolbar Pro Vertikal */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3 bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] p-1.5 rounded-xl flex flex-col gap-2 z-20 shadow-2xl">
            <button onClick={() => setActiveTool('draw')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'draw' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Kuas"><div className="w-4 h-4"><Icons.Brush /></div></button>
            <button onClick={() => setActiveTool('erase')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'erase' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Penghapus"><div className="w-4 h-4"><Icons.Eraser /></div></button>
            <button onClick={() => setActiveTool('bucket')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'bucket' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Ember Cat"><div className="w-4 h-4"><Icons.Bucket /></div></button>
            <button onClick={() => setActiveTool('picker')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'picker' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Pipet"><div className="w-4 h-4"><Icons.Picker /></div></button>
            <div className="w-full h-px bg-[#333]"></div>
            <button onClick={() => setActiveTool('pan')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pan' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Geser"><div className="w-4 h-4"><Icons.HandPan /></div></button>
            <button onClick={resetView} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-[#2a2a2a]" title="Fokus"><div className="w-4 h-4"><LocalIcons.Focus /></div></button>
          </div>

          <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale * initialScale}) rotate(${rotation}deg)`, transition: isDrawing ? 'none' : 'transform 0.1s ease-out' }} className="absolute">
            <div className="absolute -top-5 left-0 w-full flex justify-center pointer-events-none"><span className="bg-red-500 text-white text-[7px] font-black px-3 py-1 rounded-t-md shadow-lg uppercase">Atas</span></div>
            <div ref={gridRef} className="grid shadow-2xl border-t-2 border-t-red-500" 
                 style={{ 
                   gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                   width: gridSize * pixelSizePx, height: gridSize * pixelSizePx,
                   backgroundColor: isTransparent ? 'transparent' : canvasBgColor,
                   backgroundImage: isTransparent ? 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)' : 'none',
                   backgroundSize: '12px 12px'
                 }}>
              {mergedPixels.map((bg, i) => (
                <div key={i} data-pixel-index={i} className={`w-full h-full pointer-events-auto cursor-crosshair ${showGrid ? 'border-[0.5px] border-black/5' : 'border-0'}`} style={{ backgroundColor: bg !== 'transparent' ? bg : undefined }} />
              ))}
            </div>
          </div>

          <div className="absolute bottom-3 right-3 flex gap-2 z-20">
            <button onClick={handleUndo} disabled={step <= 0} className="w-10 h-10 flex items-center justify-center rounded-full border bg-[#141414] text-slate-300 disabled:opacity-30"><div className="w-4 h-4"><Icons.Undo /></div></button>
            <button onClick={handleRedo} disabled={step >= history.length - 1} className="w-10 h-10 flex items-center justify-center rounded-full border bg-[#141414] text-slate-300 disabled:opacity-30"><div className="w-4 h-4"><Icons.Redo /></div></button>
          </div>
        </div>
      }
      controls={
        <div className="space-y-4">
          <PluginTip text="TIPS: Gunakan tombol Target (Focus) di toolbar kiri jika kanvas hilang. Matikan garis Grid agar hasil gambarmu terlihat HD." />
          <ControlHeader title="Workspace Setup" onReset={handleReset} />
          
          <div className="flex items-center justify-between mb-2 bg-[#0a0a0a] p-3 rounded-xl border border-[#2a2a2a]">
             <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2"><div className="w-3 h-3"><LocalIcons.Grid /></div> Tampilkan Grid</span>
             <button onClick={() => setShowGrid(!showGrid)} className={`w-10 h-5 rounded-full transition-colors relative ${showGrid ? 'bg-cyan-500' : 'bg-[#333]'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${showGrid ? 'left-5.5' : 'left-0.5'}`}></div>
             </button>
          </div>

          <div className="flex gap-2">
            <input type="number" value={localGridInput} onChange={(e) => setLocalGridInput(e.target.value)} className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white font-mono text-[11px]" />
            <button onClick={() => setGridSize(Math.min(64, Math.max(8, parseInt(localGridInput))))} className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg text-[9px] font-bold uppercase">Set Grid</button>
          </div>

          <FigmaColorPicker label="Brush Color" hexValue={color} onChange={setColor} />
          
          <div className="flex flex-wrap gap-2">
            {palette.map((c, i) => (
              <button key={i} onClick={() => {setColor(c); setActiveTool('draw');}} className={`w-7 h-7 rounded-lg border transition-transform ${color === c ? 'border-cyan-400 scale-110 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'border-[#333] hover:scale-105'}`} style={{backgroundColor: c}} />
            ))}
            <button onClick={() => !palette.includes(color) && setPalette([color, ...palette].slice(0, 15))} className="w-7 h-7 rounded-lg border border-[#333] flex items-center justify-center text-slate-500 hover:text-white">+</button>
          </div>

          {/* LAYERS PANEL */}
          <div className="pt-4 border-t border-[#1f1f1f]">
            <div className="flex items-center justify-between mb-3"><span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Layers Panel</span><button onClick={addLayer} className="text-[8px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded">+ Layer</button></div>
            <div className="space-y-2 max-h-[140px] overflow-y-auto custom-scroll pr-1">
              {[...layers].reverse().map(l => (
                <div key={l.id} onClick={() => setActiveLayerId(l.id)} className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${activeLayerId === l.id ? 'bg-[#1a1a1a] border-cyan-500' : 'bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#444]'}`}>
                  <div className="flex items-center gap-3">
                     <button onClick={(e) => { e.stopPropagation(); toggleLayerProp(l.id, 'visible'); }} className={`w-4 h-4 transition-colors ${l.visible ? 'text-cyan-400 hover:text-cyan-300' : 'text-slate-600 hover:text-slate-400'}`}>{l.visible ? <Icons.Eye /> : <Icons.EyeOff />}</button>
                     <button onClick={(e) => { e.stopPropagation(); toggleLayerProp(l.id, 'locked'); }} className={`w-4 h-4 transition-colors ${l.locked ? 'text-red-400 hover:text-red-300' : 'text-slate-500 hover:text-slate-300'}`}>{l.locked ? <Icons.Lock /> : <Icons.Unlock />}</button>
                     <span className={`text-[10px] font-bold uppercase tracking-wider ${activeLayerId === l.id ? 'text-white' : 'text-slate-400'}`}>{l.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={(e) => { e.stopPropagation(); duplicateLayer(l.id); }} className="w-4 h-4 text-slate-400 hover:text-white" title="Gandakan Layer"><Icons.Copy /></button>
                     <button onClick={(e) => { e.stopPropagation(); deleteLayer(l.id); }} disabled={layers.length <= 1} className="w-4 h-4 text-slate-400 hover:text-red-400 disabled:opacity-30" title="Hapus Layer"><Icons.Trash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1f1f1f]">
            <FigmaColorPicker label="Canvas Background" hexValue={canvasBgColor} onChange={setCanvasBgColor} />
            <div className="flex items-center justify-between mb-4 mt-2">
               <span className="text-[10px] text-slate-400 font-bold uppercase">Transparent BG</span>
               <button onClick={() => setIsTransparent(!isTransparent)} className={`w-8 h-4 rounded-full relative ${isTransparent ? 'bg-cyan-500' : 'bg-[#333]'}`}><div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isTransparent ? 'left-4.5' : 'left-0.5'}`} /></button>
            </div>
            <FigmaSlider label="HD Export Size" min={gridSize} max={1920} step={gridSize} value={outputSize} onChange={setOutputSize} unit="px" />
            <button onClick={downloadImage} className="w-full mt-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-[11px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"><Icons.Download /> Download HD PNG</button>
          </div>
        </div>
      }
      cssOutput={`.pixel-art {\n  width: ${pixelSizePx}px;\n  height: ${pixelSizePx}px;\n  box-shadow: ${boxShadowData};\n}`}
      htmlOutput={`\n<div class="pixel-art"></div>`}
      jsxOutput={`<div className="pixel-art" />`}
    />
  );
};
