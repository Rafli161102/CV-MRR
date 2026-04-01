"use client";

import React, { useState, useEffect } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaTextInput, FigmaCustomDropdown, WorkspaceLayout, ControlHeader } from './ui';

// =========================================================================
// 1. BOX BACKGROUND GRADIENT
// =========================================================================
export const PluginBackgroundGradient = () => {
  const [color1, setColor1] = useState('#0ea5e9'); 
  const [color2, setColor2] = useState('#8b5cf6'); 
  const [angle, setAngle] = useState(145);
  
  const handleReset = () => { setColor1('#0ea5e9'); setColor2('#8b5cf6'); setAngle(145); };
  
  const css = `.box-gradient {\n  background: linear-gradient(${angle}deg, ${color1}, ${color2});\n  border-radius: 16px;\n  width: 100%;\n  max-width: 320px;\n  aspect-ratio: 2/1;\n}`;
  const html = `<div class="box-gradient"\n     style="background: linear-gradient(${angle}deg, ${color1}, ${color2}); border-radius: 16px; width: 100%; max-width: 320px; aspect-ratio: 2/1;">\n</div>`;
  const jsx = `<div className="w-full max-w-xs aspect-[2/1] rounded-2xl shadow-xl" style={{ background: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}></div>`;
  
  const preview = <div style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} className="w-full max-w-[320px] aspect-[2/1] transition-all"></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip text="PANDUAN: Gunakan kombinasi warna yang memiliki kontras alami. Atur sudut (angle) untuk mengubah arah transisi warna agar lebih dinamis." />
      <ControlHeader title="Gradient Setup" onReset={handleReset} />
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
        <div className="flex-1"><FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} /></div>
        <div className="flex-1"><FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} /></div>
      </div>
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </div>
  );
  
  return <WorkspaceLayout name="Box Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// =========================================================================
// 2. TEXT GRADIENT
// =========================================================================
export const PluginTextGradient = () => {
  const [text, setText] = useState('GRADIENT'); 
  const [color1, setColor1] = useState('#ec4899'); 
  const [color2, setColor2] = useState('#f59e0b'); 
  const [angle, setAngle] = useState(90);
  
  const handleReset = () => { setText('GRADIENT'); setColor1('#ec4899'); setColor2('#f59e0b'); setAngle(90); };
  
  const css = `.text-gradient {\n  background-image: linear-gradient(${angle}deg, ${color1}, ${color2});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}`;
  const html = `<h1 style="background-image: linear-gradient(${angle}deg, ${color1}, ${color2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${text}</h1>`;
  const jsx = `<h1 className="text-5xl font-black bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}>${text}</h1>`;
  
  const preview = <div className="w-full h-full flex items-center justify-center text-center"><span style={{ backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: '900', textTransform: 'uppercase' }}>{text || 'GRADIENT'}</span></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip text="PANDUAN: Pilih jenis font yang tebal (Bold/Black) agar efek gradasi warna terlihat menyelimuti teks secara utuh." />
      <ControlHeader title="Text Setup" onReset={handleReset} />
      <FigmaTextInput label="Custom Text" value={text} onChange={setText} placeholder="Misal: MRR STUDIO" />
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
        <div className="flex-1"><FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} /></div>
        <div className="flex-1"><FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} /></div>
      </div>
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </div>
  );
  
  return <WorkspaceLayout name="Text Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// =========================================================================
// 3. BOX LAYOUT (Background & Text Color)
// =========================================================================
export const PluginLayout = () => {
  const [padding, setPadding] = useState(32); 
  const [radius, setRadius] = useState(24); 
  const [bgColor, setBgColor] = useState('#1a1a1a'); 
  const [textColor, setTextColor] = useState('#ffffff');
  
  const handleReset = () => { setPadding(32); setRadius(24); setBgColor('#1a1a1a'); setTextColor('#ffffff'); };
  
  const css = `.box {\n  padding: ${padding}px;\n  border-radius: ${radius}px;\n  background-color: ${bgColor};\n  color: ${textColor};\n}`;
  const html = `<div style="padding: ${padding}px; border-radius: ${radius}px; background-color: ${bgColor}; color: ${textColor};">\n  Box Content\n</div>`;
  const jsx = `<div style={{ padding: '${padding}px', borderRadius: '${radius}px', backgroundColor: '${bgColor}', color: '${textColor}' }}>Box Content</div>`;
  
  const preview = <div style={{ padding: `${padding}px`, borderRadius: `${radius}px`, backgroundColor: bgColor, color: textColor, textAlign: 'center', border: '1px solid #333', transition: 'all 0.3s' }}>Box Container</div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip text="PANDUAN: Gunakan Padding untuk mengatur ruang bernapas di dalam elemen. Kamu sekarang bisa menyesuaikan warna background dan teks!" />
      <ControlHeader title="Configuration" onReset={handleReset} />
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
        <div className="flex-1"><FigmaColorPicker label="Background Color" hexValue={bgColor} onChange={setBgColor} /></div>
        <div className="flex-1"><FigmaColorPicker label="Text Color" hexValue={textColor} onChange={setTextColor} /></div>
      </div>
      <FigmaSlider label="Padding" min={0} max={100} value={padding} onChange={setPadding} unit="px" />
      <FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </div>
  );
  
  return <WorkspaceLayout name="Box Layout" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// =========================================================================
// 4. BORDER STYLING
// =========================================================================
export const PluginBorder = () => {
  const [width, setWidth] = useState(4); 
  const [radius, setRadius] = useState(20); 
  const [style, setStyle] = useState('solid'); 
  const [color, setColor] = useState('#0ea5e9');
  
  const handleReset = () => { setWidth(4); setRadius(20); setStyle('solid'); setColor('#0ea5e9'); };
  
  const css = `.bordered-box {\n  border: ${width}px ${style} ${color};\n  border-radius: ${radius}px;\n}`;
  const html = `<div style="border: ${width}px ${style} ${color}; border-radius: ${radius}px; width: 180px; height: 120px;"></div>`;
  const jsx = `<div style={{ border: '${width}px ${style} ${color}', borderRadius: '${radius}px' }} className="w-48 h-32 bg-transparent"></div>`;
  
  const preview = <div style={{ width: 180, height: 120, border: `${width}px ${style} ${color}`, borderRadius: `${radius}px`, backgroundColor: 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip text="PANDUAN: Pilih ketebalan (width) yang selaras dengan radius lengkungan. Gaya 'dashed' (putus-putus) sangat bagus untuk desain kupon." />
      <ControlHeader title="Border Setup" onReset={handleReset} />
      <FigmaColorPicker label="Border Color" hexValue={color} onChange={setColor} />
      <FigmaSelect label="Border Style" options={['solid', 'dashed', 'dotted', 'double']} value={style} onChange={setStyle} />
      <FigmaSlider label="Border Width" min={1} max={30} value={width} onChange={setWidth} unit="px" />
      <FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </div>
  );
  
  return <WorkspaceLayout name="Border Styling" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// =========================================================================
// 5. MULTI TYPOGRAPHY (DRAG & DROP FIX)
// =========================================================================
const FONTS_DATA = { 
  "Sans Serif": [{ name: "Inter", val: "Inter" }, { name: "Roboto", val: "Roboto" }, { name: "Montserrat", val: "Montserrat" }, { name: "Poppins", val: "Poppins" }], 
  "Serif": [{ name: "Playfair Display", val: "Playfair Display" }, { name: "Merriweather", val: "Merriweather" }, { name: "Lora", val: "Lora" }] 
};

export const PluginTypography = () => {
  const [tab, setTab] = useState('Heading');
  const defaultH1 = { text: 'Hero Title', font: 'Montserrat', size: 48, color: '#ffffff', align: 'center', trans: 'none', space: 0, rot: 0, x: 0, y: -70 };
  const defaultH2 = { text: 'Beautiful Typography', font: 'Inter', size: 20, color: '#0ea5e9', align: 'center', trans: 'none', space: 0, rot: 0, x: 0, y: 0 };
  const defaultP = { text: 'Teks ini bisa digeser (Drag & Drop) di layar preview!', font: 'Inter', size: 14, color: '#94a3b8', align: 'center', trans: 'none', space: 0, rot: 0, x: 0, y: 70 };
  
  const [h1, setH1] = useState(defaultH1); 
  const [h2, setH2] = useState(defaultH2); 
  const [p, setP] = useState(defaultP);

  useEffect(() => {
    const allFonts = []; 
    Object.values(FONTS_DATA).forEach(g => g.forEach(f => allFonts.push(f.val.replace(/\s+/g, '+'))));
    const fontUrl = `https://fonts.googleapis.com/css2?family=${[...new Set(allFonts)].join('&family=')}:wght@400;600;800&display=swap`;
    if (!document.getElementById('mrr-fonts')) { 
      const link = document.createElement('link'); link.id = 'mrr-fonts'; link.href = fontUrl; link.rel = 'stylesheet'; document.head.appendChild(link); 
    }
  }, []);

  const [dragging, setDragging] = useState(null); 
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); 
  const [elemStart, setElemStart] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e, type, state) => {
    setDragging(type); 
    setTab(type === 'h1' ? 'Heading' : type === 'h2' ? 'Subheading' : 'Paragraph');
    setDragStart({ x: e.clientX, y: e.clientY }); 
    setElemStart({ x: state.x, y: state.y }); 
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  
  const handlePointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.x; 
    const dy = e.clientY - dragStart.y;
    if (dragging === 'h1') setH1(prev => ({ ...prev, x: elemStart.x + dx, y: elemStart.y + dy }));
    if (dragging === 'h2') setH2(prev => ({ ...prev, x: elemStart.x + dx, y: elemStart.y + dy }));
    if (dragging === 'p') setP(prev => ({ ...prev, x: elemStart.x + dx, y: elemStart.y + dy }));
  };
  
  const handlePointerUp = (e) => { if (dragging) { e.currentTarget.releasePointerCapture(e.pointerId); setDragging(null); } };
  const handleReset = () => { if(tab==='Heading') setH1(defaultH1); if(tab==='Subheading') setH2(defaultH2); if(tab==='Paragraph') setP(defaultP); };

  const getCssClass = (state, tag) => `.${tag} {\n  position: absolute;\n  left: 50%; top: 50%;\n  width: 100%; max-width: 400px;\n  transform: translate(calc(-50% + ${Math.round(state.x)}px), calc(-50% + ${Math.round(state.y)}px)) rotate(${state.rot}deg);\n  font-family: '${state.font}', sans-serif;\n  font-size: ${state.size}px;\n  color: ${state.color};\n  text-align: ${state.align};\n}`;
  const css = `.canvas-container {\n  position: relative; width: 100%; height: 300px; overflow: hidden;\n}\n\n${getCssClass(h1, 'heading')}\n\n${getCssClass(h2, 'subheading')}\n\n${getCssClass(p, 'paragraph')}`;
  const html = `<div class="canvas-container">\n  <h1 class="heading">${h1.text}</h1>\n  <h2 class="subheading">${h2.text}</h2>\n  <p class="paragraph">${p.text}</p>\n</div>`;
  const jsx = `<div className="relative w-full h-[300px] overflow-hidden">\n  <h1 style={{ position: 'absolute', left: '50%', top: '50%', width: '100%', maxWidth: '400px', transform: 'translate(calc(-50% + ${Math.round(h1.x)}px), calc(-50% + ${Math.round(h1.y)}px)) rotate(${h1.rot}deg)', fontFamily: '"${h1.font}", sans-serif', fontSize: '${h1.size}px', color: '${h1.color}', textAlign: '${h1.align}', letterSpacing: '${h1.space}px', margin: 0 }}>\n    ${h1.text}\n  </h1>\n</div>`;

  const renderInteractiveText = (state, type, isPara = false) => (
    <div onPointerDown={(e) => handlePointerDown(e, type, state)} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
      style={{ position: 'absolute', left: '50%', top: '50%', width: '100%', maxWidth: '440px', transform: `translate(calc(-50% + ${state.x}px), calc(-50% + ${state.y}px)) rotate(${state.rot}deg)`, fontFamily: `"${state.font}", sans-serif`, fontSize: `${state.size}px`, color: state.color, textAlign: state.align, textTransform: state.trans, letterSpacing: `${state.space}px`, fontWeight: isPara ? 400 : (state.size > 30 ? 800 : 600), cursor: dragging === type ? 'grabbing' : 'grab', touchAction: 'none', userSelect: 'none', margin: 0, zIndex: dragging === type ? 50 : 10, textShadow: dragging === type ? '0 10px 30px rgba(0,0,0,0.5)' : 'none', transition: dragging === type ? 'none' : 'transform 0.1s ease-out' }}
    >{state.text || 'Text'}</div>
  );

  const preview = (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden border border-white/5 bg-[#0a0a0a] rounded-xl touch-none">
      <div className="absolute top-2 left-2 px-2 py-1 bg-cyan-500/10 text-cyan-400 text-[8px] font-bold rounded uppercase tracking-widest pointer-events-none z-10">Interactive Canvas</div>
      {renderInteractiveText(h1, 'h1')}{renderInteractiveText(h2, 'h2')}{renderInteractiveText(p, 'p', true)}
    </div>
  );

  const renderTextControls = (state, setState, isPara = false) => {
    const update = (key, val) => setState(prev => ({ ...prev, [key]: val }));
    return (
      <div className="animate-fade-in space-y-2 mt-2">
        <FigmaTextInput label="Edit Text" value={state.text} onChange={(v) => update('text', v)} placeholder="Ketik disini..." isTextArea={isPara} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4">
           <FigmaCustomDropdown label="Font Family" groups={FONTS_DATA} value={state.font} onChange={(v) => update('font', v)} />
           <FigmaColorPicker label="Text Color" hexValue={state.color} onChange={(v) => update('color', v)} />
        </div>
        <FigmaSlider label="Font Size" min={10} max={100} value={state.size} onChange={(v) => update('size', v)} unit="px" />
        <FigmaSlider label="Letter Spacing" min={-5} max={20} step={0.5} value={state.space} onChange={(v) => update('space', v)} unit="px" />
        <FigmaSlider label="Rotate" min={-180} max={180} value={state.rot} onChange={(v) => update('rot', v)} unit="°" />
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1f1f1f]">
          <FigmaSelect label="Alignment" options={['left', 'center', 'right', 'justify']} value={state.align} onChange={(v) => update('align', v)} />
          <FigmaSelect label="Transform" options={['none', 'uppercase', 'lowercase', 'capitalize']} value={state.trans} onChange={(v) => update('trans', v)} />
        </div>
      </div>
    );
  };

  const controls = (
    <div className="space-y-1">
      <PluginTip text="PANDUAN: Sentuh lalu geser (Drag & Drop) teks di layar preview atas untuk merubah tata letaknya secara bebas!" />
      <div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-[#2a2a2a] w-full mb-6">
        {['Heading', 'Subheading', 'Paragraph'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 rounded-lg text-[10px] font-bold uppercase transition-all ${tab === t ? 'bg-[#1f1f1f] text-white shadow-sm border border-[#333]' : 'text-slate-500 hover:text-slate-300'}`}>{t}</button>
        ))}
      </div>
      <ControlHeader title={`${tab} Configuration`} onReset={handleReset} />
      {tab === 'Heading' && renderTextControls(h1, setH1)}
      {tab === 'Subheading' && renderTextControls(h2, setH2)}
      {tab === 'Paragraph' && renderTextControls(p, setP, true)}
    </div>
  );
  
  return <WorkspaceLayout name="Interactive Typo" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};
