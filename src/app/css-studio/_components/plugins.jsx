"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaTextInput, FigmaCustomDropdown, WorkspaceLayout, hexToRgb, adjustBrightness, COLOR_PRESETS, ControlHeader } from './ui';

// =========================================================================
// HELPER: Multi-Touch Zoom, Pan, & ROTATE
// =========================================================================
const useMultiTouch = () => {
  const [scale, setScale] = useState(1); const [pan, setPan] = useState({ x: 0, y: 0 }); const [rotation, setRotation] = useState(0);
  const touchRef = useRef({ dist: 0, cx: 0, cy: 0, panX: 0, panY: 0, scale: 1, angle: 0, rotation: 0 });

  const getAngle = (touches) => Math.atan2(touches[0].clientY - touches[1].clientY, touches[0].clientX - touches[1].clientX) * (180 / Math.PI);
  
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      touchRef.current.dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      touchRef.current.cx = (e.touches[0].clientX + e.touches[1].clientX) / 2; touchRef.current.cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      touchRef.current.panX = pan.x; touchRef.current.panY = pan.y; touchRef.current.scale = scale;
      touchRef.current.angle = getAngle(e.touches); touchRef.current.rotation = rotation;
    }
  };
  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2; const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      setScale(Math.max(0.3, Math.min(touchRef.current.scale * (dist / touchRef.current.dist), 6)));
      setPan({ x: touchRef.current.panX + (cx - touchRef.current.cx), y: touchRef.current.panY + (cy - touchRef.current.cy) });
      let angleDiff = getAngle(e.touches) - touchRef.current.angle;
      if (angleDiff > 180) angleDiff -= 360; if (angleDiff < -180) angleDiff += 360;
      setRotation(touchRef.current.rotation + angleDiff);
    }
  };
  const resetView = () => { setScale(1); setPan({ x: 0, y: 0 }); setRotation(0); };
  return { scale, pan, rotation, setScale, setPan, setRotation, onTouchStart, onTouchMove, resetView };
};

// =========================================================================
// FITUR DASAR
// =========================================================================
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

export const PluginLayout = () => {
  const [padding, setPadding] = useState(32); const [radius, setRadius] = useState(24); const [bgColor, setBgColor] = useState('#1a1a1a'); const [textColor, setTextColor] = useState('#ffffff');
  const handleReset = () => { setPadding(32); setRadius(24); setBgColor('#1a1a1a'); setTextColor('#ffffff'); };
  const css = `.box {\n  padding: ${padding}px;\n  border-radius: ${radius}px;\n  background-color: ${bgColor};\n  color: ${textColor};\n}`;
  const html = `<div style="padding: ${padding}px; border-radius: ${radius}px; background-color: ${bgColor}; color: ${textColor};">\n  Box Content\n</div>`;
  const jsx = `<div style={{ padding: '${padding}px', borderRadius: '${radius}px', backgroundColor: '${bgColor}', color: '${textColor}' }}>Box Content</div>`;
  const preview = <div style={{ padding: `${padding}px`, borderRadius: `${radius}px`, backgroundColor: bgColor, color: textColor, textAlign: 'center', border: '1px solid #333', transition: 'all 0.3s' }}>Box Container</div>;
  const controls = (
    <>
      <PluginTip text="PANDUAN: Gunakan Padding untuk mengatur ruang bernapas di dalam elemen. Kamu sekarang bisa menyesuaikan warna background dan teks!" />
      <ControlHeader title="Configuration" onReset={handleReset} />
      <div className="flex gap-4 mb-4"><div className="flex-1"><FigmaColorPicker label="Background" hexValue={bgColor} onChange={setBgColor} /></div><div className="flex-1"><FigmaColorPicker label="Text Color" hexValue={textColor} onChange={setTextColor} /></div></div>
      <FigmaSlider label="Padding" min={0} max={100} value={padding} onChange={setPadding} unit="px" />
      <FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Box Layout" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
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
      <PluginTip text="PANDUAN: Gunakan opacity rendah (sekitar 10-20%) agar background tembus, namun berikan Blur Intensity yang tinggi agar teks mudah dibaca." />
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
      <PluginTip text="PANDUAN: Pilih warna Base Background yang lembut/pastel. Sistem kami secara otomatis menghitung rumus bayangan terang dan gelap." />
      <ControlHeader title="Neumorph Setup" onReset={handleReset} />
      <FigmaColorPicker label="Base Background" hexValue={bg} onChange={setBg} />
      <div className="mb-5"><div className="flex bg-[#0a0a0a] p-1.5 rounded-xl border border-[#2a2a2a]"><button onClick={() => setInvert(false)} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase ${!invert ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-slate-500'}`}>Extrude</button><button onClick={() => setInvert(true)} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase ${invert ? 'bg-[#1f1f1f] text-white border border-[#333]' : 'text-slate-500'}`}>Inset</button></div></div>
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
      <PluginTip text="PANDUAN: Turunkan Opacity lalu naikkan Blur Radius dan Y Offset agar elemen seakan melayang elegan." />
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
      <PluginTip text="PANDUAN: Efek pendaran (Glow) sangat kuat di background hitam. Gunakan warna-warna vibran lalu tambah ukuran Blur." />
      <ControlHeader title="Glow Setup" onReset={handleReset} />
      <FigmaColorPicker label="Glow Color" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Blur Radius" min={0} max={150} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Spread Radius" min={0} max={100} value={spread} onChange={setSpread} unit="px" />
    </>
  );
  return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// =========================================================================
// 3. ADVANCED PLUGINS
// =========================================================================
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

const IMAGE_TEMPLATES = ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800", "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800"];
export const PluginFilters = () => {
  const [bgImg, setBgImg] = useState(IMAGE_TEMPLATES[0]);
  const [brightness, setBrightness] = useState(100); const [contrast, setContrast] = useState(100); const [saturate, setSaturate] = useState(100); const [hue, setHue] = useState(0); const [blur, setBlur] = useState(0); const [shadow, setShadow] = useState(0); const [opacity, setOpacity] = useState(100);
  const handleReset = () => { setBrightness(100); setContrast(100); setSaturate(100); setHue(0); setBlur(0); setShadow(0); setOpacity(100); };
  
  const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg) blur(${blur}px) drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5)) opacity(${opacity}%)`;
  const css = `.filtered-img {\n  filter: \n    brightness(${brightness}%)\n    contrast(${contrast}%)\n    saturate(${saturate}%)\n    hue-rotate(${hue}deg)\n    blur(${blur}px)\n    drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5))\n    opacity(${opacity}%);\n}`;
  const html = `<img src="${bgImg}" style="filter: ${filterStr}; width: 100%; border-radius: 12px;" />`;
  const jsx = `<img src="${bgImg}" style={{ filter: '${filterStr}' }} className="w-full object-cover rounded-xl" />`;
  const preview = <div className="relative w-full h-full max-w-[360px] max-h-[260px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group aspect-video"><img src={bgImg} alt="Filter Demo" className="w-full h-full object-cover transition-all duration-200" style={{ filter: filterStr }} /></div>;

  const controls = (
    <div className="space-y-4">
      <PluginTip text="PANDUAN: Trik agar gambar memukau: Naikkan sedikit Contrast dan Vibrance (Saturasi), lalu berikan efek Drop Shadow untuk efek timbul (pop-out)." />
      <div className="mb-4">
         <label className="text-[10px] font-medium text-slate-400 block mb-2">Pilih Foto Template</label>
         <div className="flex gap-2">
            {IMAGE_TEMPLATES.map((img, idx) => (
              <button key={idx} onClick={() => setBgImg(img)} className={`w-12 h-12 rounded-lg bg-cover bg-center border-2 transition-all ${bgImg === img ? 'border-cyan-400 scale-110 shadow-lg' : 'border-[#333] hover:border-[#555]'}`} style={{backgroundImage: `url(${img})`}}></button>
            ))}
         </div>
      </div>
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

const ANIMATION_DATA = { "Attention": [{ name: "Bounce", val: "bounce" }, { name: "Flash", val: "flash" }, { name: "Pulse", val: "pulse" }, { name: "RubberBand", val: "rubberBand" }, { name: "Shake", val: "shake" }, { name: "Swing", val: "swing" }], "Fade Entrances": [{ name: "Fade In", val: "fadeIn" }, { name: "Fade In Down", val: "fadeInDown" }, { name: "Fade In Left", val: "fadeInLeft" }], "Zoom Entrances": [{ name: "Zoom In", val: "zoomIn" }, { name: "Zoom In Down", val: "zoomInDown" }, { name: "Zoom In Up", val: "zoomInUp" }], "Rotations": [{ name: "Spin 360", val: "spin" }, { name: "Flip X", val: "flipInX" }, { name: "Flip Y", val: "flipInY" }], "Looping": [{ name: "Floating", val: "float" }, { name: "Breathe", val: "breathe" }] };
const getDynamicKeyframes = (type) => {
  const map = {
    bounce: `0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-30px);} 60% {transform: translateY(-15px);}`,
    flash: `0%, 50%, 100% {opacity: 1;} 25%, 75% {opacity: 0;}`,
    pulse: `0% {transform: scale(1);} 50% {transform: scale(1.05);} 100% {transform: scale(1);}`,
    rubberBand: `0% {transform: scale(1);} 30% {transform: scale3d(1.25, 0.75, 1);} 40% {transform: scale3d(0.75, 1.25, 1);} 50% {transform: scale3d(1.15, 0.85, 1);} 65% {transform: scale3d(.95, 1.05, 1);} 75% {transform: scale3d(1.05, .95, 1);} 100% {transform: scale(1);}`,
    shake: `0%, 100% {transform: translateX(0);} 10%, 30%, 50%, 70%, 90% {transform: translateX(-10px);} 20%, 40%, 60%, 80% {transform: translateX(10px);}`,
    swing: `20% {transform: rotate(15deg);} 40% {transform: rotate(-10deg);} 60% {transform: rotate(5deg);} 80% {transform: rotate(-5deg);} 100% {transform: rotate(0deg);}`,
    fadeIn: `from {opacity: 0;} to {opacity: 1;}`, fadeInDown: `from {opacity: 0; transform: translate3d(0, -100%, 0);} to {opacity: 1; transform: none;}`, fadeInLeft: `from {opacity: 0; transform: translate3d(-100%, 0, 0);} to {opacity: 1; transform: none;}`,
    zoomIn: `from {opacity: 0; transform: scale3d(0.3, 0.3, 0.3);} 50% {opacity: 1;}`, zoomInDown: `from {opacity: 0; transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);} 60% {opacity: 1; transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);}`, zoomInUp: `from {opacity: 0; transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);} 60% {opacity: 1; transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);}`,
    spin: `from {transform: rotate(0deg);} to {transform: rotate(360deg);}`, flipInX: `from {transform: perspective(400px) rotate3d(1, 0, 0, 90deg); opacity: 0;} 40% {transform: perspective(400px) rotate3d(1, 0, 0, -20deg);} 60% {transform: perspective(400px) rotate3d(1, 0, 0, 10deg); opacity: 1;} 80% {transform: perspective(400px) rotate3d(1, 0, 0, -5deg);} to {transform: perspective(400px);}`, flipInY: `from {transform: perspective(400px) rotate3d(0, 1, 0, 90deg); opacity: 0;} 40% {transform: perspective(400px) rotate3d(0, 1, 0, -20deg);} 60% {transform: perspective(400px) rotate3d(0, 1, 0, 10deg); opacity: 1;} 80% {transform: perspective(400px) rotate3d(0, 1, 0, -5deg);} to {transform: perspective(400px);}`,
    float: `0%, 100% {transform: translateY(0);} 50% {transform: translateY(-20px);}`, breathe: `0%, 100% {transform: scale(1); opacity: 0.8;} 50% {transform: scale(1.1); opacity: 1; box-shadow: 0 0 20px rgba(14,165,233,0.5);}`
  };
  return map[type] || map['bounce'];
};

export const PluginAnimation = () => {
  const [animType, setAnimType] = useState('bounce'); const [duration, setDuration] = useState(1.5); const [timing, setTiming] = useState('ease-in-out'); const [iteration, setIteration] = useState('infinite'); const [key, setKey] = useState(0); 
  const handleReset = () => { setAnimType('bounce'); setDuration(1.5); setTiming('ease-in-out'); setIteration('infinite'); setKey(k=>k+1); };

  const css = `@keyframes anim-${animType} {\n  ${getDynamicKeyframes(animType).replace(/\} /g, '}\n  ')}\n}\n\n.animate-element {\n  animation: anim-${animType} ${duration}s ${timing} ${iteration};\n}`;
  const html = `<style>\n  @keyframes anim-${animType} { ${getDynamicKeyframes(animType)} }\n  .animate-element { animation: anim-${animType} ${duration}s ${timing} ${iteration}; }\n</style>\n<div class="animate-element">Animate Me</div>`;
  const jsx = `// Tambahkan @keyframes ke global.css terlebih dahulu\n<div style={{ animation: 'anim-${animType} ${duration}s ${timing} ${iteration}' }}>\n  Animate Me\n</div>`;

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

const TRANSITIONS_DATA = { "Scale Effects": [{ name: "Grow", val: "scale(1.1)" }, { name: "Shrink", val: "scale(0.9)" }, { name: "Pop", val: "scale(1.2)" }], "Translates": [{ name: "Push Up", val: "translateY(-10px)" }, { name: "Push Down", val: "translateY(10px)" }, { name: "Push Left", val: "translateX(-10px)" }, { name: "Push Right", val: "translateX(10px)" }], "Rotations": [{ name: "Rotate Right", val: "rotate(15deg)" }, { name: "Rotate Left", val: "rotate(-15deg)" }, { name: "Spin Quarter", val: "rotate(90deg)" }, { name: "Spin Half", val: "rotate(180deg)" }], "Skews": [{ name: "Skew Forward", val: "skewX(-15deg)" }, { name: "Skew Backward", val: "skewX(15deg)" }] };
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
// VECTOR SHAPES (MULTI-SHAPE, RESIZE, ROUNDED SQUARE, LAYERS)
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
        <button onClick={() => setActiveTool('pen')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pen' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Pen Tool"><div className="w-4 h-4"><Icons.Pen /></div></button>
        <button onClick={() => setActiveTool('pan')} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${activeTool === 'pan' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:bg-[#2a2a2a]'}`} title="Geser/Pilih Layer"><div className="w-4 h-4"><Icons.HandPan /></div></button>
      </div>

      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }} className="absolute">
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
    <div className="space-y-1">
      <PluginTip text="PANDUAN VECTOR: Batas kanvas terlihat dengan garis putus-putus. Gunakan Panel Layer untuk mengunci atau menumpuk shape! Atur Width & Height untuk resize." />
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
          <FigmaCustomDropdown label="Select Preset Form" groups={SHAPES_DATA} value={activeShape.shapeVal} onChange={handleShapeChange} />
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

// =========================================================================
// 3. PIXEL DRAWING (FIX MATH MATRIX: BISA GAMBAR SAAT ZOOM & ROTATE)
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

  const { scale, pan, rotation, setScale, setPan, setRotation, onTouchStart, onTouchMove, resetView } = useMultiTouch();
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

  // FIX MATH UTAMA: Menghitung kordinat sentuh menggunakan matriks agar tetap bisa gambar walau layar di-Rotate / di-Zoom
  const paintByEvent = (e) => {
    if (activeTool === 'pan' || e.touches?.length > 1 || !gridRef.current) return;
    
    let clientX = e.clientX; let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
    if (clientX === undefined || clientY === undefined) return;

    const rect = gridRef.current.getBoundingClientRect();
    const pixelSizePx = gridSize <= 8 ? 20 : gridSize <= 16 ? 12 : gridSize <= 32 ? 6 : 4;
    
    const centerX = rect.left + rect.width / 2; const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX; const dy = clientY - centerY;

    // Hitung posisi putaran balik ke origin (0 derajat)
    const angleRad = -rotation * (Math.PI / 180);
    const rotatedX = dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
    const rotatedY = dx * Math.sin(angleRad) + dy * Math.cos(angleRad);

    const xReal = (rotatedX + (gridSize * pixelSizePx * scale) / 2) / scale;
    const yReal = (rotatedY + (gridSize * pixelSizePx * scale) / 2) / scale;

    if (xReal < 0 || yReal < 0 || xReal >= (gridSize * pixelSizePx) || yReal >= (gridSize * pixelSizePx)) return;

    const col = Math.floor(xReal / pixelSizePx); const row = Math.floor(yReal / pixelSizePx);
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
    if (activeTool === 'pan') { setIsDraggingPan(true); setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y }); e.currentTarget.setPointerCapture(e.pointerId); } 
    else { setIsDrawing(true); paintByEvent(e); e.currentTarget.setPointerCapture(e.pointerId); }
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

      <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale}) rotate(${rotation}deg)`, transition: isDraggingPan ? 'none' : 'transform 0.1s ease-out' }} className="absolute">
        <div className="absolute -top-4 left-0 w-full flex justify-center pointer-events-none">
           <span className="bg-red-500 text-white text-[7px] font-bold px-3 py-0.5 rounded-t-md tracking-widest shadow-lg">TOP</span>
        </div>
        <div 
           ref={gridRef}
           className="grid shadow-[0_0_50px_rgba(0,0,0,0.8)] border-t-2 border-t-red-500" 
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
      <PluginTip text="CANVAS PRO: Saat TANGAN aktif, Kuas terkunci otomatis agar aman saat zoom/putar 2 jari. Klik angka di slider untuk mengetik ukuran secara manual." />
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
    </div>
  );

  return <WorkspaceLayout name="Pixel Drawing Pro" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};
