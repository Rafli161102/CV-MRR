"use client";

import React, { useState, useEffect } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaCustomDropdown, WorkspaceLayout, ControlHeader, useMultiTouch, FigmaToggle } from './ui';

const LocalIcons = {
  Focus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>,
};

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

  const [baseScale, setBaseScale] = useState(1);
  useEffect(() => { 
    if (typeof window !== 'undefined') setBaseScale(window.innerWidth < 768 ? 0.6 : 1); 
  }, []);

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
      const actualScale = scale * baseScale;
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
      const actualScale = scale * baseScale;
      const xPercent = (((e.clientX - rect.left) / actualScale) / activeShape.w) * 100; 
      const yPercent = (((e.clientY - rect.top) / actualScale) / activeShape.h) * 100;
      updateActive('nodes', activeShape.nodes.map(n => n.id === draggingNode ? { ...n, x: Math.max(0, Math.min(100, snapCoordinate(xPercent))), y: Math.max(0, Math.min(100, snapCoordinate(yPercent))) } : n));
    } else if (draggingShape && activeTool === 'pan') {
      const actualScale = scale * baseScale;
      const dx = (e.clientX - dragStart.x) / actualScale; 
      const dy = (e.clientY - dragStart.y) / actualScale;
      updateActive('x', snapCoordinate(elemStart.x + dx)); updateActive('y', snapCoordinate(elemStart.y + dy));
    }
  };

  const handlePointerUp = (e) => { if (isDraggingPan) setIsDraggingPan(false); if (draggingNode) setDraggingNode(null); if (draggingShape) setDraggingShape(null); e.currentTarget.releasePointerCapture(e.pointerId); };

  const getShapeCss = (s) => {
    const isSquare = s.mode === 'preset' && s.shapeVal === 'square';
    if (isSquare) return `border-radius: ${s.rounded}%; background-color: ${s.color}; width: ${s.w}px; height: ${s.h}px; transform: translate(${s.x}px, ${s.y}px); transition: all 0.3s ease-in-out;`;
    const polyString = s.nodes.length >= 3 ? s.nodes.map(n => `${n.x}% ${n.y}%`).join(', ') : '0 0, 0 0, 0 0';
    return `clip-path: polygon(${polyString}); background-color: ${s.color}; width: ${s.w}px; height: ${s.h}px; transform: translate(${s.x}px, ${s.y}px); transition: all 0.3s ease-in-out;`;
  };

  const css = `.canvas-wrapper { position: relative; width: 400px; height: 400px; }\n${shapes.map((s, i) => `.shape-${i+1} {\n  position: absolute;\n  ${getShapeCss(s)}\n}`).join('\n\n')}`;
  const html = `<div class="canvas-wrapper">\n${shapes.map((s,i) => `  <div class="shape-${i+1}"></div>`).join('\n')}\n</div>`;
  const jsx = `<div className="relative w-[400px] h-[400px]">\n${shapes.map((s,i) => `  <div style={{ position: 'absolute', transform: 'translate(${s.x}px, ${s.y}px)', width: '${s.w}px', height: '${s.h}px', ${s.mode === 'preset' && s.shapeVal === 'square' ? `borderRadius: '${s.rounded}%'` : `clipPath: 'polygon(${s.nodes.length >= 3 ? s.nodes.map(n => `${n.x}% ${n.y}%`).join(', ') : '0 0'})'`}, backgroundColor: '${s.color}', transition: 'all 0.3s ease-in-out' }} />`).join('\n')}\n</div>`;

  const preview = (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden border border-white/5 bg-[#050505] rounded-xl touch-none" onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <div className="absolute top-3 left-3 bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] p-1.5 rounded-2xl flex flex-col gap-2 z-20 shadow-xl">
        <button onClick={() => setActiveTool('pen')} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${activeTool === 'pen' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Pen Tool"><div className="w-5 h-5"><Icons.Pen /></div></button>
        <button onClick={() => setActiveTool('pan')} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${activeTool === 'pan' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Geser/Pilih Layer"><div className="w-5 h-5"><Icons.HandPan /></div></button>
        <div className="w-full h-px bg-[#333] my-0.5"></div>
        <button onClick={resetView} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-[#2a2a2a] transition-all" title="Kembalikan ke Tengah"><div className="w-5 h-5"><LocalIcons.Focus /></div></button>
      </div>

      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale * baseScale})` }} className="absolute">
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
                className={`absolute ${activeTool === 'pan' ? (isActive ? 'cursor-grabbing ring-2 ring-cyan-500 shadow-2xl' : (s.locked ? '' : 'cursor-grab hover:ring-2 ring-white/30')) : 'pointer-events-none'}`}
                style={{ width: `${s.w}px`, height: `${s.h}px`, transform: `translate(${s.x}px, ${s.y}px)`, zIndex: isActive ? 10 : 1, opacity: s.locked ? 0.7 : 1 }}
              >
                <div style={{ backgroundColor: s.color, width: '100%', height: '100%', borderRadius: isSquare ? `${s.rounded}%` : '0', clipPath: isSquare ? 'none' : `polygon(${polyString})`, pointerEvents: 'none', transition: 'all 0.3s ease-in-out' }} />
                {isActive && activeTool === 'pen' && !isSquare && !s.locked && s.nodes.map((node, i) => (
                   <div key={node.id} onPointerDown={(e) => handlePointerDownNode(e, node.id)} className="absolute w-5 h-5 bg-white border-[3px] border-cyan-500 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing hover:scale-125 transition-transform pointer-events-auto" style={{ left: `calc(${node.x}% - 10px)`, top: `calc(${node.y}% - 10px)`, zIndex: 50 }} />
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
      <PluginTip title="PANDUAN VECTOR SHAPES" text="Batas kanvas 400x400 terlihat dengan garis putus-putus. Gunakan Panel Layer untuk mengunci atau menumpuk shape! Atur Width & Height untuk resize. Coba ubah 'Smooth Rounded' pada preset Square untuk melihat transisi halus menjadi lingkaran." />
      <ControlHeader title="Workspace Configuration" onReset={handleReset} />
      
      <div className="border-t border-[#1f1f1f] pt-5 pb-2 mb-5">
         <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2"><Icons.Layers /> Shapes Layer</span>
            <button onClick={addShapeLayer} className="text-[9px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg uppercase tracking-widest hover:bg-cyan-500/20 transition-all">+ Shape</button>
         </div>
         <div className="space-y-3 max-h-[180px] overflow-y-auto custom-scroll pr-2">
            {[...shapes].reverse().map(s => (
               <div key={s.id} onClick={() => setActiveShapeId(s.id)} className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${activeShapeId === s.id ? 'bg-[#1a1a1a] border-cyan-500 shadow-md' : 'bg-[#0a0a0a] border-[#2a2a2a] hover:border-[#444]'}`}>
                  <div className="flex items-center gap-4">
                     <button onClick={(e) => { e.stopPropagation(); toggleLayerProp(s.id, 'visible'); }} className={`w-4 h-4 ${s.visible ? 'text-cyan-400' : 'text-slate-600'}`}>{s.visible ? <Icons.Eye /> : <Icons.EyeOff />}</button>
                     <button onClick={(e) => { e.stopPropagation(); toggleLayerProp(s.id, 'locked'); }} className={`w-4 h-4 ${s.locked ? 'text-red-400' : 'text-slate-500'}`}>{s.locked ? <Icons.Lock /> : <Icons.Unlock />}</button>
                     <div className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{backgroundColor: s.color}}></div>
                     <span className={`text-[11px] font-bold uppercase tracking-wider ${activeShapeId === s.id ? 'text-white' : 'text-slate-400'}`}>{s.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <button onClick={(e) => { e.stopPropagation(); duplicateShape(s.id); }} className="w-4 h-4 text-slate-400 hover:text-white" title="Gandakan"><Icons.Copy /></button>
                     <button onClick={(e) => { e.stopPropagation(); deleteShape(s.id); }} disabled={shapes.length <= 1} className="w-4 h-4 text-slate-400 hover:text-red-400 disabled:opacity-30"><Icons.Trash /></button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-[#2a2a2a] w-full mb-5 shadow-inner">
        <button onClick={() => {updateActive('mode', 'preset'); setActiveTool('pan');}} className={`flex-1 py-3.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${activeShape?.mode === 'preset' ? 'bg-[#1f1f1f] text-white border border-[#444] shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Preset Library</button>
        <button onClick={() => {updateActive('mode', 'custom'); setActiveTool('pen');}} className={`flex-1 py-3.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${activeShape?.mode === 'custom' ? 'bg-[#1f1f1f] text-white border border-[#444] shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Custom Pen</button>
      </div>

      <FigmaColorPicker label="Shape Color" hexValue={activeShape?.color} onChange={(v) => updateActive('color', v)} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-5">
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
         <button onClick={() => updateActive('nodes', [])} className="w-full mt-2 py-3 bg-[#1a1a1a] hover:bg-red-500/20 border border-[#333] hover:border-red-500/50 text-slate-300 hover:text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors shadow-sm">Clear Custom Shape</button>
      )}

      <div className="mt-5 mb-2">
         <FigmaToggle label="Magnet (Snap To Grid)" checked={snapToGrid} onChange={setSnapToGrid} />
      </div>
    </div>
  );
  return <WorkspaceLayout name="Vector Shapes" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};
