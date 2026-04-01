"use client";

import React, { useState, useEffect } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaTextInput, FigmaCustomDropdown, WorkspaceLayout, hexToRgb, adjustBrightness, ControlHeader } from './ui';

export const PluginBackgroundGradient = () => {
  const [color1, setColor1] = useState('#0ea5e9'); const [color2, setColor2] = useState('#8b5cf6'); const [angle, setAngle] = useState(145);
  const handleReset = () => { setColor1('#0ea5e9'); setColor2('#8b5cf6'); setAngle(145); };
  const css = `.box-gradient {\n  background: linear-gradient(${angle}deg, ${color1}, ${color2});\n  border-radius: 16px;\n  width: 100%;\n  max-width: 320px;\n  aspect-ratio: 2/1;\n}`;
  const html = `<div class="box-gradient"\n     style="background: linear-gradient(${angle}deg, ${color1}, ${color2}); border-radius: 16px; width: 100%; max-width: 320px; aspect-ratio: 2/1;">\n</div>`;
  const jsx = `<div className="w-full max-w-xs aspect-[2/1] rounded-2xl shadow-xl" style={{ background: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}></div>`;
  const preview = <div style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} className="w-full max-w-[320px] aspect-[2/1] transition-all"></div>;
  const controls = (
    <>
      <PluginTip text="PANDUAN: Gunakan kombinasi warna yang memiliki kontras alami. Atur sudut (angle) untuk mengubah arah transisi warna." />
      <ControlHeader title="Gradient Setup" onReset={handleReset} />
      <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
      <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </>
  );
  return <WorkspaceLayout name="Box Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginTextGradient = () => {
  const [text, setText] = useState('GRADIENT'); const [color1, setColor1] = useState('#ec4899'); const [color2, setColor2] = useState('#f59e0b'); const [angle, setAngle] = useState(90);
  const handleReset = () => { setText('GRADIENT'); setColor1('#ec4899'); setColor2('#f59e0b'); setAngle(90); };
  const css = `.text-gradient {\n  background-image: linear-gradient(${angle}deg, ${color1}, ${color2});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}`;
  const html = `<h1 style="background-image: linear-gradient(${angle}deg, ${color1}, ${color2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${text}</h1>`;
  const jsx = `<h1 className="text-5xl font-black bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}>${text}</h1>`;
  const preview = <div className="w-full h-full flex items-center justify-center text-center"><span style={{ backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: '900', textTransform: 'uppercase' }}>{text || 'GRADIENT'}</span></div>;
  const controls = (
    <>
      <PluginTip text="PANDUAN: Pilih jenis font tebal dan gunakan huruf kapital agar efek gradasi menyelimuti teks secara utuh." />
      <ControlHeader title="Text Setup" onReset={handleReset} />
      <FigmaTextInput label="Custom Text" value={text} onChange={setText} placeholder="Misal: MRR STUDIO" />
      <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
      <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </>
  );
  return <WorkspaceLayout name="Text Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

const FONTS_DATA = { "Sans Serif": [{ name: "Inter", val: "Inter" }, { name: "Roboto", val: "Roboto" }, { name: "Montserrat", val: "Montserrat" }, { name: "Poppins", val: "Poppins" }], "Serif": [{ name: "Playfair Display", val: "Playfair Display" }, { name: "Merriweather", val: "Merriweather" }, { name: "Lora", val: "Lora" }] };

export const PluginTypography = () => {
  const [tab, setTab] = useState('Heading');
  const defaultH1 = { text: 'Hero Title', font: 'Montserrat', size: 48, color: '#ffffff', align: 'center', trans: 'none', space: 0, rot: 0, x: 0, y: -70 };
  const defaultH2 = { text: 'Beautiful Typography', font: 'Inter', size: 20, color: '#0ea5e9', align: 'center', trans: 'none', space: 0, rot: 0, x: 0, y: 0 };
  const defaultP = { text: 'Teks ini bisa digeser (Drag & Drop) di layar preview!', font: 'Inter', size: 14, color: '#94a3b8', align: 'center', trans: 'none', space: 0, rot: 0, x: 0, y: 70 };
  const [h1, setH1] = useState(defaultH1); const [h2, setH2] = useState(defaultH2); const [p, setP] = useState(defaultP);

  useEffect(() => {
    const allFonts = []; Object.values(FONTS_DATA).forEach(g => g.forEach(f => allFonts.push(f.val.replace(/\s+/g, '+'))));
    const fontUrl = `https://fonts.googleapis.com/css2?family=${[...new Set(allFonts)].join('&family=')}:wght@400;600;800&display=swap`;
    if (!document.getElementById('mrr-fonts')) { const link = document.createElement('link'); link.id = 'mrr-fonts'; link.href = fontUrl; link.rel = 'stylesheet'; document.head.appendChild(link); }
  }, []);

  const [dragging, setDragging] = useState(null); const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); const [elemStart, setElemStart] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e, type, state) => {
    setDragging(type); setTab(type === 'h1' ? 'Heading' : type === 'h2' ? 'Subheading' : 'Paragraph');
    setDragStart({ x: e.clientX, y: e.clientY }); setElemStart({ x: state.x, y: state.y }); e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.x; const dy = e.clientY - dragStart.y;
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
      <div className="animate-fade-in space-y-4">
        <FigmaTextInput label="Edit Text" value={state.text} onChange={(v) => update('text', v)} placeholder="Ketik disini..." isTextArea={isPara} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <FigmaCustomDropdown label="Font Family" groups={FONTS_DATA} value={state.font} onChange={(v) => update('font', v)} />
           <FigmaColorPicker label="Text Color" hexValue={state.color} onChange={(v) => update('color', v)} />
        </div>
        <FigmaSlider label="Font Size" min={10} max={100} value={state.size} onChange={(v) => update('size', v)} unit="px" />
        <FigmaSlider label="Letter Spacing" min={-5} max={20} step={0.5} value={state.space} onChange={(v) => update('space', v)} unit="px" />
        <FigmaSlider label="Rotate" min={-180} max={180} value={state.rot} onChange={(v) => update('rot', v)} unit="°" />
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#1f1f1f]">
          <FigmaSelect label="Alignment" options={['left', 'center', 'right', 'justify']} value={state.align} onChange={(v) => update('align', v)} />
          <FigmaSelect label="Transform" options={['none', 'uppercase', 'lowercase', 'capitalize']} value={state.trans} onChange={(v) => update('trans', v)} />
        </div>
      </div>
    );
  };

  const controls = (
    <>
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
    </>
  );
  return <WorkspaceLayout name="Interactive Typo" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};

export const PluginGlassmorphism = () => {
  const [blur, setBlur] = useState(12); const [opacity, setOpacity] = useState(15); const [color, setColor] = useState('#ffffff');
  const handleReset = () => { setBlur(12); setOpacity(15); setColor('#ffffff'); };
  const rgb = hexToRgb(color);
  const css = `.glass {\n  background: rgba(${rgb}, ${opacity / 100});\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 16px;\n}`;
  const html = `<div style="background: rgba(${rgb}, ${opacity/100}); backdrop-filter: blur(${blur}px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 16px; width: 240px; height: 140px;"></div>`;
  const jsx = `<div style={{ background: 'rgba(${rgb}, ${opacity/100})', backdropFilter: 'blur(${blur}px)', border: '1px solid rgba(255,255,255, 0.3)' }} className="w-60 h-36 rounded-2xl shadow-xl"></div>`;
  const preview = <div style={{ width: '80%', maxWidth: '240px', height: '140px', background: `rgba(${rgb}, ${opacity / 100})`, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, border: `1px solid rgba(255, 255, 255, 0.3)`, borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}></div>;
  const controls = (
    <>
      <PluginTip text="PANDUAN: Gunakan opacity rendah (sekitar 10-20%) agar background tembus, namun berikan Blur Intensity yang tinggi agar teks di atasnya tetap mudah dibaca." />
      <ControlHeader title="Glass Setup" onReset={handleReset} />
      <FigmaColorPicker label="Glass Tint" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Opacity" min={1} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="Blur Intensity" min={0} max={50} step={0.5} value={blur} onChange={setBlur} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Glassmorphism" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="glass" />;
};

export const PluginNeumorphism = () => {
  const [bg, setBg] = useState('#e0e5ec'); const [dist, setDist] = useState(10); const [blur, setBlur] = useState(20); const [invert, setInvert] = useState(false);
  const handleReset = () => { setBg('#e0e5ec'); setDist(10); setBlur(20); setInvert(false); };
  const lightShadow = adjustBrightness(bg, 15); const darkShadow = adjustBrightness(bg, -15);
  const shadowValue = invert ? `inset ${dist}px ${dist}px ${blur}px ${darkShadow}, inset -${dist}px -${dist}px ${blur}px ${lightShadow}` : `${dist}px ${dist}px ${blur}px ${darkShadow}, -${dist}px -${dist}px ${blur}px ${lightShadow}`;
  const css = `.neumorph {\n  background-color: ${bg};\n  border-radius: 20px;\n  box-shadow: ${shadowValue};\n}`;
  const html = `<div style="background-color: ${bg}; border-radius: 20px; box-shadow: ${shadowValue}; width: 140px; height: 140px;"></div>`;
  const jsx = `<div style={{ backgroundColor: '${bg}', boxShadow: '${shadowValue}' }} className="w-36 h-36 rounded-[20px]"></div>`;
  const preview = <div style={{ width: 160, height: 160, backgroundColor: bg, borderRadius: 24, boxShadow: shadowValue, transition: 'all 0.3s' }}></div>;
  const controls = (
    <>
      <PluginTip text="PANDUAN: Pilih warna Base Background lembut/pastel. Sistem kami secara pintar akan menghitung rumus bayangan terang dan gelap agar efek 3D terlihat natural." />
      <ControlHeader title="Neumorph Setup" onReset={handleReset} />
      <FigmaColorPicker label="Base Background" hexValue={bg} onChange={setBg} />
      <div className="mb-5">
         <div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-[#2a2a2a]">
            <button onClick={() => setInvert(false)} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase ${!invert ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-slate-500'}`}>Extrude (Timbul)</button>
            <button onClick={() => setInvert(true)} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase ${invert ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-slate-500'}`}>Inset (Cekung)</button>
         </div>
      </div>
      <FigmaSlider label="Distance" min={1} max={30} value={dist} onChange={setDist} unit="px" />
      <FigmaSlider label="Blur Radius" min={1} max={60} value={blur} onChange={setBlur} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Neumorphism" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="light" bgHex={bg} />;
};

export const PluginShadow = () => {
  const [x, setX] = useState(10); const [y, setY] = useState(15); const [blur, setBlur] = useState(30); const [spread, setSpread] = useState(0); const [opacity, setOpacity] = useState(40); const [color, setColor] = useState('#000000');
  const handleReset = () => { setX(10); setY(15); setBlur(30); setSpread(0); setOpacity(40); setColor('#000000'); };
  const css = `.shadow-box {\n  box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100});\n  border-radius: 12px;\n  background-color: #ffffff;\n}`;
  const html = `<div style="box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100}); border-radius: 12px; background-color: #ffffff; width: 140px; height: 140px;"></div>`;
  const jsx = `<div style={{ boxShadow: '${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})' }} className="w-36 h-36 rounded-xl bg-white"></div>`;
  const preview = <div style={{ width: 140, height: 140, backgroundColor: '#ffffff', borderRadius: 12, boxShadow: `${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})` }}></div>;
  const controls = (
    <>
      <PluginTip text="PANDUAN: Tren desain modern menyukai 'Soft Shadow'. Turunkan Opacity (sekitar 10-20%) lalu naikkan Blur Radius dan Y Offset agar elemen seakan melayang elegan." />
      <ControlHeader title="Shadow Setup" onReset={handleReset} />
      <FigmaColorPicker label="Shadow Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Opacity" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="X Offset" min={-50} max={50} value={x} onChange={setX} unit="px" />
      <FigmaSlider label="Y Offset" min={-50} max={50} value={y} onChange={setY} unit="px" />
      <FigmaSlider label="Blur Radius" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Spread Radius" min={-50} max={50} value={spread} onChange={setSpread} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Drop Shadow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="light" />;
};

export const PluginGlow = () => {
  const [color, setColor] = useState('#0ea5e9'); const [blur, setBlur] = useState(40); const [spread, setSpread] = useState(10);
  const handleReset = () => { setColor('#0ea5e9'); setBlur(40); setSpread(10); };
  const css = `.neon-glow {\n  box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8);\n  border-radius: 50%;\n  background-color: ${color};\n}`;
  const html = `<div style="box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8); border-radius: 50%; background-color: ${color}; width: 80px; height: 80px;"></div>`;
  const jsx = `<div style={{ boxShadow: '0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)', backgroundColor: '${color}' }} className="w-20 h-20 rounded-full"></div>`;
  const preview = <div style={{ width: 80, height: 80, backgroundColor: color, borderRadius: '50%', boxShadow: `0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)` }}></div>;
  const controls = (
    <>
      <PluginTip text="PANDUAN: Efek Glow sangat kuat di background hitam. Gunakan warna-warna vibran (Neon Green, dll) lalu tambah ukuran Blur agar cahaya menyebar." />
      <ControlHeader title="Glow Setup" onReset={handleReset} />
      <FigmaColorPicker label="Glow Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Blur Radius" min={0} max={150} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Spread Radius" min={0} max={100} value={spread} onChange={setSpread} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginBorder = () => {
  const [width, setWidth] = useState(4); const [radius, setRadius] = useState(20); const [style, setStyle] = useState('solid'); const [color, setColor] = useState('#0ea5e9');
  const handleReset = () => { setWidth(4); setRadius(20); setStyle('solid'); setColor('#0ea5e9'); };
  const css = `.bordered-box {\n  border: ${width}px ${style} ${color};\n  border-radius: ${radius}px;\n}`;
  const html = `<div style="border: ${width}px ${style} ${color}; border-radius: ${radius}px; width: 180px; height: 120px;"></div>`;
  const jsx = `<div style={{ border: '${width}px ${style} ${color}', borderRadius: '${radius}px' }} className="w-48 h-32 bg-transparent"></div>`;
  const preview = <div style={{ width: 180, height: 120, border: `${width}px ${style} ${color}`, borderRadius: `${radius}px`, backgroundColor: 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}></div>;
  const controls = (
    <>
      <PluginTip text="PANDUAN: Pilih ketebalan (width) yang selaras dengan radius lengkungan. Gaya 'dashed' sangat bagus dipakai untuk desain kupon." />
      <ControlHeader title="Border Setup" onReset={handleReset} />
      <FigmaColorPicker label="Border Color" hexValue={color} onChange={setColor} />
      <FigmaSelect label="Style" options={['solid', 'dashed', 'dotted', 'double']} value={style} onChange={setStyle} />
      <FigmaSlider label="Border Width" min={1} max={30} value={width} onChange={setWidth} unit="px" />
      <FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Border Styling" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginFilters = () => {
  const [bgImg, setBgImg] = useState("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800");
  const [brightness, setBrightness] = useState(100); const [contrast, setContrast] = useState(100); const [saturate, setSaturate] = useState(100); const [hue, setHue] = useState(0); const [blur, setBlur] = useState(0); const [shadow, setShadow] = useState(0); const [opacity, setOpacity] = useState(100);
  const handleReset = () => { setBrightness(100); setContrast(100); setSaturate(100); setHue(0); setBlur(0); setShadow(0); setOpacity(100); };
  
  const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg) blur(${blur}px) drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5)) opacity(${opacity}%)`;
  const css = `.filtered-img {\n  filter: \n    brightness(${brightness}%)\n    contrast(${contrast}%)\n    saturate(${saturate}%)\n    hue-rotate(${hue}deg)\n    blur(${blur}px)\n    drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5))\n    opacity(${opacity}%);\n}`;
  const html = `<img src="${bgImg}" style="filter: ${filterStr}; width: 100%; border-radius: 12px;" />`;
  const jsx = `<img src="${bgImg}" style={{ filter: '${filterStr}' }} className="w-full object-cover rounded-xl" />`;
  
  const preview = (
    <div className="relative w-full h-full max-w-[360px] max-h-[260px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group aspect-video">
       <img src={bgImg} alt="Filter Demo" className="w-full h-full object-cover transition-all duration-200" style={{ filter: filterStr }} />
    </div>
  );

  const controls = (
    <div className="space-y-4">
      <PluginTip text="PANDUAN: Trik agar gambar memukau: Naikkan sedikit Contrast dan Vibrance (Saturasi), lalu berikan sedikit efek Drop Shadow untuk efek timbul (pop-out)." />
      <ControlHeader title="Filters Setup" onReset={handleReset} />
      <FigmaSlider label="Exposure" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
      <FigmaSlider label="Contrast" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
      <FigmaSlider label="Vibrance" min={0} max={200} value={saturate} onChange={setSaturate} unit="%" />
      <FigmaSlider label="Tint (Hue)" min={0} max={360} value={hue} onChange={setHue} unit="°" />
      <div className="pt-4 border-t border-[#1f1f1f]">
        <FigmaSlider label="Lens Blur" min={0} max={20} step={0.5} value={blur} onChange={setBlur} unit="px" />
        <FigmaSlider label="Drop Shadow" min={0} max={50} value={shadow} onChange={setShadow} unit="px" />
        <FigmaSlider label="Opacity" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" />
      </div>
    </div>
  );
  return <WorkspaceLayout name="Pro Filters" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};

const ANIMATION_DATA = {
  "Attention": [{ name: "Bounce", val: "bounce" }, { name: "Flash", val: "flash" }, { name: "Pulse", val: "pulse" }, { name: "RubberBand", val: "rubberBand" }, { name: "Shake", val: "shake" }, { name: "Swing", val: "swing" }],
  "Fade Entrances": [{ name: "Fade In", val: "fadeIn" }, { name: "Fade In Down", val: "fadeInDown" }, { name: "Fade In Left", val: "fadeInLeft" }],
  "Zoom Entrances": [{ name: "Zoom In", val: "zoomIn" }, { name: "Zoom In Down", val: "zoomInDown" }, { name: "Zoom In Up", val: "zoomInUp" }],
  "Rotations": [{ name: "Spin 360", val: "spin" }, { name: "Flip X", val: "flipInX" }, { name: "Flip Y", val: "flipInY" }],
  "Looping": [{ name: "Floating", val: "float" }, { name: "Breathe", val: "breathe" }]
};

const getDynamicKeyframes = (type) => {
  const map = {
    bounce: `0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-30px);} 60% {transform: translateY(-15px);}`,
    flash: `0%, 50%, 100% {opacity: 1;} 25%, 75% {opacity: 0;}`,
    pulse: `0% {transform: scale(1);} 50% {transform: scale(1.05);} 100% {transform: scale(1);}`,
    rubberBand: `0% {transform: scale(1);} 30% {transform: scale3d(1.25, 0.75, 1);} 40% {transform: scale3d(0.75, 1.25, 1);} 50% {transform: scale3d(1.15, 0.85, 1);} 65% {transform: scale3d(.95, 1.05, 1);} 75% {transform: scale3d(1.05, .95, 1);} 100% {transform: scale(1);}`,
    shake: `0%, 100% {transform: translateX(0);} 10%, 30%, 50%, 70%, 90% {transform: translateX(-10px);} 20%, 40%, 60%, 80% {transform: translateX(10px);}`,
    swing: `20% {transform: rotate(15deg);} 40% {transform: rotate(-10deg);} 60% {transform: rotate(5deg);} 80% {transform: rotate(-5deg);} 100% {transform: rotate(0deg);}`,
    fadeIn: `from {opacity: 0;} to {opacity: 1;}`,
    fadeInDown: `from {opacity: 0; transform: translate3d(0, -100%, 0);} to {opacity: 1; transform: none;}`,
    fadeInLeft: `from {opacity: 0; transform: translate3d(-100%, 0, 0);} to {opacity: 1; transform: none;}`,
    zoomIn: `from {opacity: 0; transform: scale3d(0.3, 0.3, 0.3);} 50% {opacity: 1;}`,
    zoomInDown: `from {opacity: 0; transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);} 60% {opacity: 1; transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);}`,
    zoomInUp: `from {opacity: 0; transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);} 60% {opacity: 1; transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);}`,
    spin: `from {transform: rotate(0deg);} to {transform: rotate(360deg);}`,
    flipInX: `from {transform: perspective(400px) rotate3d(1, 0, 0, 90deg); opacity: 0;} 40% {transform: perspective(400px) rotate3d(1, 0, 0, -20deg);} 60% {transform: perspective(400px) rotate3d(1, 0, 0, 10deg); opacity: 1;} 80% {transform: perspective(400px) rotate3d(1, 0, 0, -5deg);} to {transform: perspective(400px);}`,
    flipInY: `from {transform: perspective(400px) rotate3d(0, 1, 0, 90deg); opacity: 0;} 40% {transform: perspective(400px) rotate3d(0, 1, 0, -20deg);} 60% {transform: perspective(400px) rotate3d(0, 1, 0, 10deg); opacity: 1;} 80% {transform: perspective(400px) rotate3d(0, 1, 0, -5deg);} to {transform: perspective(400px);}`,
    float: `0%, 100% {transform: translateY(0);} 50% {transform: translateY(-20px);}`,
    breathe: `0%, 100% {transform: scale(1); opacity: 0.8;} 50% {transform: scale(1.1); opacity: 1; box-shadow: 0 0 20px rgba(14,165,233,0.5);}`
  };
  return map[type] || map['bounce'];
};

export const PluginAnimation = () => {
  const [animType, setAnimType] = useState('bounce'); const [duration, setDuration] = useState(1.5); const [timing, setTiming] = useState('ease-in-out'); const [iteration, setIteration] = useState('infinite'); const [key, setKey] = useState(0); 
  const handleReset = () => { setAnimType('bounce'); setDuration(1.5); setTiming('ease-in-out'); setIteration('infinite'); setKey(k=>k+1); };

  const css = `@keyframes anim-${animType} {\n  ${getDynamicKeyframes(animType).replace(/\} /g, '}\n  ')}\n}\n\n.animate-element {\n  animation: anim-${animType} ${duration}s ${timing} ${iteration};\n}`;
  const html = `<style>\n  @keyframes anim-${animType} { ${getDynamicKeyframes(animType)} }\n  .animate-element { animation: anim-${animType} ${duration}s ${timing} ${iteration}; }\n</style>\n<div class="animate-element">Animate Me</div>`;
  const jsx = `// Tambahkan @keyframes ke global.css\n<div style={{ animation: 'anim-${animType} ${duration}s ${timing} ${iteration}' }}>\n  Animate Me\n</div>`;

  useEffect(() => { setKey(prev => prev + 1); }, [animType, duration, timing, iteration]);

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`@keyframes preview-${animType}-${key} { ${getDynamicKeyframes(animType)} }`}</style>
      <div key={key} className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-500 to-orange-400 shadow-2xl flex items-center justify-center border border-white/20" style={{ animation: `preview-${animType}-${key} ${duration}s ${timing} ${iteration === 'infinite' ? 'infinite' : iteration}` }}><Icons.Animation /></div>
    </div>
  );

  const controls = (
    <>
      <PluginTip text="PANDUAN: Pilih jenis animasi dan ubah Iteration ke 'infinite' jika ingin pergerakan berulang." />
      <ControlHeader title="Animation Setup" onReset={handleReset} />
      <FigmaCustomDropdown label="Animation Style" groups={ANIMATION_DATA} value={animType} onChange={setAnimType} />
      <FigmaSlider label="Duration" min={0.1} max={5} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Timing Function" options={['linear', 'ease', 'ease-in-out', 'ease-in']} value={timing} onChange={setTiming} />
      <FigmaSelect label="Iteration Count" options={['1', '2', '3', 'infinite']} value={iteration} onChange={setIteration} />
      <button onClick={() => setKey(k => k + 1)} className="w-full mt-4 py-3 bg-[#1a1a1a] hover:bg-cyan-500/20 border border-[#333] hover:border-cyan-500/50 text-cyan-400 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all">Replay Animation</button>
    </>
  );
  return <WorkspaceLayout name="Animation Builder" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};

const TRANSITIONS_DATA = {
  "Scale Effects": [{ name: "Grow", val: "scale(1.1)" }, { name: "Shrink", val: "scale(0.9)" }, { name: "Pop", val: "scale(1.2)" }],
  "Translates": [{ name: "Push Up", val: "translateY(-10px)" }, { name: "Push Down", val: "translateY(10px)" }, { name: "Push Left", val: "translateX(-10px)" }, { name: "Push Right", val: "translateX(10px)" }],
  "Rotations": [{ name: "Rotate Right", val: "rotate(15deg)" }, { name: "Rotate Left", val: "rotate(-15deg)" }, { name: "Spin Quarter", val: "rotate(90deg)" }, { name: "Spin Half", val: "rotate(180deg)" }],
  "Skews": [{ name: "Skew Forward", val: "skewX(-15deg)" }, { name: "Skew Backward", val: "skewX(15deg)" }]
};

export const PluginTransitions = () => {
  const [transType, setTransType] = useState('scale(1.1)'); const [duration, setDuration] = useState(0.3); const [timing, setTiming] = useState('ease-in-out');
  const handleReset = () => { setTransType('scale(1.1)'); setDuration(0.3); setTiming('ease-in-out'); };

  const css = `.element {\n  transition: transform ${duration}s ${timing};\n}\n\n.element:hover {\n  transform: ${transType};\n}`;
  const html = `<style>\n  .element { transition: transform ${duration}s ${timing}; }\n  .element:hover { transform: ${transType}; }\n</style>\n<div class="element">HOVER ME</div>`;
  const jsx = `<div \n  style={{ transition: 'transform ${duration}s ${timing}' }}\n  onMouseEnter={(e) => e.currentTarget.style.transform = '${transType}'}\n  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}\n>\n  HOVER ME\n</div>`;

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center group cursor-pointer">
      <div className="w-40 h-16 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-lg" style={{ transition: `transform ${duration}s ${timing}` }} onMouseEnter={(e) => e.currentTarget.style.transform = transType} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>HOVER ME</div>
      <div className="absolute top-10 text-[10px] text-slate-500 uppercase tracking-widest animate-pulse pointer-events-none">Interact to preview</div>
    </div>
  );

  const controls = (
    <>
      <PluginTip text="PANDUAN PENTING: Tempatkan output CSS '.element' di class default, dan pastikan menambahkan selector pseudo '.element:hover' untuk memicu efek transisinya." />
      <ControlHeader title="Hover Setup" onReset={handleReset} />
      <FigmaCustomDropdown label="Hover Effect Type" groups={TRANSITIONS_DATA} value={transType} onChange={setTransType} />
      <FigmaSlider label="Duration" min={0.1} max={3} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Timing/Easing" options={['ease', 'linear', 'ease-in-out', 'cubic']} value={timing} onChange={setTiming} />
    </>
  );
  return <WorkspaceLayout name="Hover Transitions" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};

// =========================================================================
// FITUR LANJUTAN: 3D STUDIO & SHAPES & PIXEL
// =========================================================================
