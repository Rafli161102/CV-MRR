// =========================================================================
// 3. PIXEL DRAWING (FIX 100%: DRAWING BUG ON ZOOM & ROTATE, LAYER SYSTEM)
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

  const initialScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.7 : 1;
  const { scale, pan, rotation, setScale, setPan, onTouchStart, onTouchMove, resetView } = useMultiTouch();
  const [activeTool, setActiveTool] = useState('draw'); 
  
  const [isDraggingPan, setIsDraggingPan] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

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
    const newHistory = history.slice(0, step + 1); newHistory.push(JSON.parse(JSON.stringify(newLayers))); 
    if (newHistory.length > 15) newHistory.shift(); 
    setHistory(newHistory); setStep(newHistory.length - 1);
  };

  const handleUndo = () => { const newStep = Math.max(0, step - 1); setStep(newStep); setLayers(JSON.parse(JSON.stringify(history[newStep]))); };
  const handleRedo = () => { const newStep = Math.min(history.length - 1, step + 1); setStep(newStep); setLayers(JSON.parse(JSON.stringify(history[newStep]))); };

  const paintPixel = (index) => {
    if (activeTool === 'pan' || activeTool === 'picker') return;
    const newLayers = [...layers]; const activeLayerIndex = newLayers.findIndex(l => l.id === activeLayerId);
    if (activeLayerIndex === -1 || newLayers[activeLayerIndex].locked || !newLayers[activeLayerIndex].visible) return;

    if (activeTool === 'bucket') {
       const targetColor = newLayers[activeLayerIndex].pixels[index];
       newLayers[activeLayerIndex].pixels = floodFill(newLayers[activeLayerIndex].pixels, index, targetColor, color, gridSize);
       setLayers(newLayers); saveHistory(newLayers); return;
    }
    const newColor = activeTool === 'erase' ? 'transparent' : color;
    if (newLayers[activeLayerIndex].pixels[index] === newColor) return; 
    newLayers[activeLayerIndex].pixels[index] = newColor; setLayers(newLayers);
  };

  // FIX MATH UTAMA: Menggunakan elementFromPoint yang aman dengan z-index khusus
  const paintByEvent = (e) => {
    if (activeTool === 'pan' || e.touches?.length > 1) return;
    
    let clientX = e.clientX; let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
    if (clientX === undefined || clientY === undefined) return;

    // Mendapatkan elemen tepat di bawah jari/kursor
    const elements = document.elementsFromPoint(clientX, clientY);
    let targetPixel = null;

    for(let el of elements) {
       if(el.getAttribute('data-pixel-index')) {
          targetPixel = el;
          break;
       }
    }

    if (targetPixel) {
      const idx = targetPixel.getAttribute('data-pixel-index');
      if (activeTool === 'picker') {
         const pickedColor = mergedPixels[Number(idx)] !== 'transparent' ? mergedPixels[Number(idx)] : (isTransparent ? '#ffffff' : canvasBgColor);
         setColor(pickedColor); setActiveTool('draw'); return;
      }
      paintPixel(Number(idx));
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
    canvas.width = outputSize; canvas.height = outputSize; const pSize = outputSize / gridSize;

    if (!isTransparent) { ctx.fillStyle = canvasBgColor; ctx.fillRect(0, 0, outputSize, outputSize); }
    mergedPixels.forEach((p, i) => {
      if (p !== 'transparent') {
        ctx.fillStyle = p; const x = (i % gridSize) * pSize; const y = Math.floor(i / gridSize) * pSize;
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
      <div className="absolute top-1/2 -translate-y-1/2 left-3 bg-[#141414]/90 backdrop-blur border border-[#2a2a2a] p-1.5 rounded-xl flex flex-col gap-2 z-20 shadow-2xl">
        <button onClick={() => setActiveTool('draw')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'draw' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Kuas"><div className="w-4 h-4"><Icons.Brush /></div></button>
        <button onClick={() => setActiveTool('erase')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'erase' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Penghapus"><div className="w-4 h-4"><Icons.Eraser /></div></button>
        <button onClick={() => setActiveTool('bucket')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'bucket' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Ember Cat"><div className="w-4 h-4"><Icons.Bucket /></div></button>
        <button onClick={() => setActiveTool('picker')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'picker' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Pipet Warna"><div className="w-4 h-4"><Icons.Picker /></div></button>
        <div className="w-full h-px bg-[#333] my-0.5"></div>
        <button onClick={() => setActiveTool('pan')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pan' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Geser Kanvas"><div className="w-4 h-4"><Icons.HandPan /></div></button>
      </div>

      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale * initialScale}) rotate(${rotation}deg)`, transition: isDraggingPan ? 'none' : 'transform 0.1s ease-out' }} className="absolute">
        <div className="absolute -top-4 left-0 w-full flex justify-center pointer-events-none">
           <span className="bg-red-500 text-white text-[7px] font-bold px-3 py-0.5 rounded-t-md tracking-widest shadow-lg">TOP</span>
        </div>
        <div 
           className="grid shadow-[0_0_50px_rgba(0,0,0,0.8)] border-t-2 border-t-red-500" 
           style={{ 
             width: gridSize * pixelSizePx, height: gridSize * pixelSizePx,
             gridTemplateColumns: `repeat(${gridSize}, ${pixelSizePx}px)`, gridTemplateRows: `repeat(${gridSize}, ${pixelSizePx}px)`,
             backgroundColor: isTransparent ? 'transparent' : canvasBgColor,
             backgroundImage: isTransparent ? 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)' : 'none',
             backgroundSize: '12px 12px', backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px'
           }}
        >
          {/* Layer Sentuh Aktual, index aman */}
          {mergedPixels.map((bg, i) => (
            <div 
              key={i} data-pixel-index={i} 
              className={`w-full h-full border-[0.5px] ${isTransparent ? 'border-white/10' : (canvasBgColor==='#ffffff'?'border-black/10':'border-white/20')} hover:bg-cyan-500/50 ${activeTool === 'pan' ? 'pointer-events-none' : 'pointer-events-auto cursor-crosshair'}`}
              style={{ backgroundColor: bg !== 'transparent' ? bg : undefined }}
            />
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
      <PluginTip text="CANVAS PRO: Saat TANGAN aktif, Kuas terkunci otomatis agar aman saat zoom/putar 2 jari. Klik angka di slider untuk mengetik ukuran manual." />
      <ControlHeader title="Workspace Setup" onReset={handleReset} />
      
      <div className="mb-4 mt-2">
         <label className="text-[10px] font-medium text-slate-400 block mb-2">Grid Resolusi (Min: 8, Max: 64)</label>
         <div className="flex gap-2">
            <input type="number" value={localGridInput} onChange={(e) => setLocalGridInput(e.target.value)} onBlur={handleGridSubmit} onKeyDown={(e) => { if (e.key === 'Enter') handleGridSubmit(); }} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-[11px] text-white outline-none focus:border-cyan-500 transition-all font-mono" />
            <button onClick={handleGridSubmit} className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg text-[9px] font-bold uppercase transition-all hover:bg-cyan-500/20">Terapkan</button>
         </div>
      </div>

      <div className="flex items-center gap-3 mb-3 border-t border-[#1f1f1f] pt-5">
        <div className="flex-1"><FigmaColorPicker label="Warna Kuas (Brush)" hexValue={color} onChange={setColor} /></div>
        <button onClick={addToPalette} className="mt-2 w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#333] hover:border-cyan-500 hover:bg-cyan-500/20 flex items-center justify-center text-cyan-400 transition-all shadow-sm"><div className="w-4 h-4"><Icons.Plus /></div></button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {palette.map((c, i) => (
           <button key={i} onClick={() => {setColor(c); setActiveTool('draw');}} className={`w-7 h-7 rounded-lg border transition-transform ${color === c && activeTool === 'draw' ? 'border-cyan-400 scale-110 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'border-[#333] hover:scale-105'}`} style={{backgroundColor: c}}></button>
        ))}
      </div>

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
    </div>
  );

  return <WorkspaceLayout name="Pixel Drawing Pro" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};
