"use client";

import React, { useState, useEffect } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaCustomDropdown, WorkspaceLayout, hexToRgb, adjustBrightness } from './ui';

export const PluginBackgroundGradient = () => {
  const [color1, setColor1] = useState('#0ea5e9'); const [color2, setColor2] = useState('#8b5cf6'); const [angle, setAngle] = useState(145);
  const css = `.box-gradient {\n  background: linear-gradient(${angle}deg, ${color1}, ${color2});\n  border-radius: 16px;\n  width: 100%;\n  max-width: 320px;\n  aspect-ratio: 2/1;\n}`;
  const html = `<div class="box-gradient"\n     style="background: linear-gradient(${angle}deg, ${color1}, ${color2}); border-radius: 16px; width: 100%; max-width: 320px; aspect-ratio: 2/1;">\n</div>`;
  const jsx = `<div \n  className="w-full max-w-xs aspect-[2/1] rounded-2xl shadow-xl"\n  style={{ background: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}\n></div>`;
  const preview = <div style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} className="w-full max-w-[320px] aspect-[2/1] transition-all"></div>;
  const controls = (
    <>
      <PluginTip text="Pilih warna awal dan akhir, lalu putar angle untuk mendapatkan arah gradasi." />
      <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
      <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </>
  );
  return <WorkspaceLayout name="Box Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginTextGradient = () => {
  const [color1, setColor1] = useState('#ec4899'); const [color2, setColor2] = useState('#f59e0b'); const [angle, setAngle] = useState(90);
  const css = `.text-gradient {\n  background-image: linear-gradient(${angle}deg, ${color1}, ${color2});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}`;
  const html = `<h1 style="background-image: linear-gradient(${angle}deg, ${color1}, ${color2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">GRADIENT</h1>`;
  const jsx = `<h1 className="text-5xl font-black bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(${angle}deg, ${color1}, ${color2})' }}>GRADIENT</h1>`;
  const preview = (
    <div className="w-full h-full flex items-center justify-center text-center">
      <span style={{ backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: '900', textTransform: 'uppercase' }}>GRADIENT</span>
    </div>
  );
  const controls = (
    <>
      <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
      <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
      <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
    </>
  );
  return <WorkspaceLayout name="Text Gradient" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

const FONTS_DATA = {
  "Sans Serif": [{ name: "Inter", val: "Inter" }, { name: "Roboto", val: "Roboto" }, { name: "Montserrat", val: "Montserrat" }],
  "Serif": [{ name: "Playfair Display", val: "Playfair Display" }, { name: "Merriweather", val: "Merriweather" }]
};

export const PluginTypography = () => {
  const [tab, setTab] = useState('Heading');
  const [h1, setH1] = useState({ font: 'Montserrat', size: 48, color: '#ffffff', align: 'center', space: 0, rot: 0 });
  const [h2, setH2] = useState({ font: 'Inter', size: 20, color: '#0ea5e9', align: 'center', space: 0, rot: 0 });
  const [p, setP] = useState({ font: 'Inter', size: 14, color: '#94a3b8', align: 'center', space: 0, rot: 0 });

  useEffect(() => {
    [h1.font, h2.font, p.font].forEach(f => {
      const linkId = `gfont-${f.replace(/\s+/g, '-')}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link'); link.id = linkId;
        link.href = `https://fonts.googleapis.com/css2?family=${f.replace(/\s+/g, '+')}:wght@400;600;800&display=swap`;
        link.rel = 'stylesheet'; document.head.appendChild(link);
      }
    });
  }, [h1.font, h2.font, p.font]);

  const css = `h1 {\n  font-family: '${h1.font}', sans-serif;\n  font-size: ${h1.size}px;\n  color: ${h1.color};\n  text-align: ${h1.align};\n  letter-spacing: ${h1.space}px;\n  transform: rotate(${h1.rot}deg);\n  transform-origin: center center;\n}\n/* Lakukan hal yang sama untuk h2 dan p */`;
  const html = `<div style="display: flex; flex-direction: column; gap: 30px;">\n  \n</div>`;
  const jsx = `// Gunakan flex gap untuk mencegah elemen menabrak saat di-rotate\n<div className="flex flex-col gap-8">\n  <h1 style={{ transform: 'rotate(${h1.rot}deg)' }}>Hero Title</h1>\n</div>`;

  // FIX BUG: Kita kasih padding/margin container agar saat di-rotate teks tidak bertumpuk/nabrak ke text lain!
  const preview = (
    <div className="w-full flex flex-col justify-center max-w-[440px] gap-8">
      <div className="flex justify-center w-full"><h1 style={{ fontFamily: `"${h1.font}", sans-serif`, fontSize: `${h1.size}px`, color: h1.color, fontWeight: 800, textAlign: h1.align, letterSpacing: `${h1.space}px`, transform: `rotate(${h1.rot}deg)`, transformOrigin: 'center center', transition: 'all 0.2s', margin:0 }}>Hero Title</h1></div>
      <div className="flex justify-center w-full"><h2 style={{ fontFamily: `"${h2.font}", sans-serif`, fontSize: `${h2.size}px`, color: h2.color, fontWeight: 600, textAlign: h2.align, letterSpacing: `${h2.space}px`, transform: `rotate(${h2.rot}deg)`, transformOrigin: 'center center', transition: 'all 0.2s', margin:0 }}>Beautiful Typography</h2></div>
      <div className="flex justify-center w-full"><p style={{ fontFamily: `"${p.font}", sans-serif`, fontSize: `${p.size}px`, color: p.color, lineHeight: 1.6, textAlign: p.align, letterSpacing: `${p.space}px`, transform: `rotate(${p.rot}deg)`, transformOrigin: 'center center', transition: 'all 0.2s', margin:0 }}>Ini adalah contoh paragraf di mana komponen teks aman saat dirotasi.</p></div>
    </div>
  );

  const TextControls = ({ state, setState }) => {
    const update = (key, val) => setState(prev => ({ ...prev, [key]: val }));
    return (
      <div className="animate-fade-in space-y-2">
        <FigmaCustomDropdown label="Font Family" groups={FONTS_DATA} value={state.font} onChange={(v) => update('font', v)} />
        <FigmaColorPicker label="Text Color" hexValue={state.color} onChange={(v) => update('color', v)} />
        <FigmaSlider label="Font Size" min={10} max={100} value={state.size} onChange={(v) => update('size', v)} unit="px" />
        <FigmaSlider label="Letter Spacing" min={-5} max={20} step={0.5} value={state.space} onChange={(v) => update('space', v)} unit="px" />
        <FigmaSlider label="Rotate" min={-180} max={180} value={state.rot} onChange={(v) => update('rot', v)} unit="°" />
        <FigmaSelect label="Alignment" options={['left', 'center', 'right', 'justify']} value={state.align} onChange={(v) => update('align', v)} />
      </div>
    );
  };

  const controls = (
    <>
      <PluginTip text="Bug rotasi nabrak sudah diperbaiki. Kini preview memiliki ruang aman untuk berputar." />
      <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-[#2a2a2a] w-full mb-5">
        {['Heading', 'Subheading', 'Paragraph'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-md text-[9px] font-bold uppercase transition-all ${tab === t ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}>{t}</button>
        ))}
      </div>
      {tab === 'Heading' && <TextControls state={h1} setState={setH1} />}
      {tab === 'Subheading' && <TextControls state={h2} setState={setH2} />}
      {tab === 'Paragraph' && <TextControls state={p} setState={setP} />}
    </>
  );
  return <WorkspaceLayout name="Advanced Typography" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginLayout = () => {
  const [padding, setPadding] = useState(32); const [radius, setRadius] = useState(24);
  const css = `.box {\n  padding: ${padding}px;\n  border-radius: ${radius}px;\n  background-color: #1a1a1a;\n}`;
  const html = `<div style="padding: ${padding}px; border-radius: ${radius}px; background-color: #1a1a1a;">Box Content</div>`;
  const jsx = `<div style={{ padding: '${padding}px', borderRadius: '${radius}px' }} className="bg-neutral-900 text-white">Box</div>`;
  const preview = <div style={{ padding: `${padding}px`, borderRadius: `${radius}px`, backgroundColor: '#1a1a1a', color: '#fff', textAlign: 'center', border: '1px solid #333', transition: 'all 0.3s' }}>Box Container</div>;
  const controls = (<><FigmaSlider label="Padding" min={0} max={100} value={padding} onChange={setPadding} unit="px" /><FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" /></>);
  return <WorkspaceLayout name="Box Layout" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginBorder = () => {
  const [width, setWidth] = useState(4); const [radius, setRadius] = useState(20); const [style, setStyle] = useState('solid'); const [color, setColor] = useState('#0ea5e9');
  const css = `.bordered-box {\n  border: ${width}px ${style} ${color};\n  border-radius: ${radius}px;\n}`;
  const html = `<div style="border: ${width}px ${style} ${color}; border-radius: ${radius}px; width: 180px; height: 120px;"></div>`;
  const jsx = `<div style={{ border: '${width}px ${style} ${color}', borderRadius: '${radius}px' }} className="w-48 h-32 bg-transparent"></div>`;
  const preview = <div style={{ width: 180, height: 120, border: `${width}px ${style} ${color}`, borderRadius: `${radius}px`, backgroundColor: 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}></div>;
  const controls = (<><FigmaColorPicker label="Border Color" hexValue={color} onChange={setColor} /><FigmaSelect label="Style" options={['solid', 'dashed', 'dotted', 'double']} value={style} onChange={setStyle} /><FigmaSlider label="Border Width" min={1} max={30} value={width} onChange={setWidth} unit="px" /><FigmaSlider label="Border Radius" min={0} max={100} value={radius} onChange={setRadius} unit="px" /></>);
  return <WorkspaceLayout name="Border Styling" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

const SHAPES_DATA = {
  "Organic Blobs": [{ name: "Blob 1", val: "blob1", css: "border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;" }, { name: "Blob 2", val: "blob2", css: "border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;" }],
  "Polygons": [{ name: "Triangle", val: "polygon(50% 0%, 0% 100%, 100% 100%)", css: "clip-path: polygon(50% 0%, 0% 100%, 100% 100%);" }, { name: "Hexagon", val: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", css: "clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);" }]
};

export const PluginShapes = () => {
  const [shapeVal, setShapeVal] = useState("blob1"); const [color, setColor] = useState('#8b5cf6'); const [rounded, setRounded] = useState(0);
  let shapeCss = ""; let isBlob = shapeVal.includes('blob');
  for (const group in SHAPES_DATA) { const found = SHAPES_DATA[group].find(opt => opt.val === shapeVal); if (found) shapeCss = found.css; }
  const css = isBlob ? `.shape {\n  ${shapeCss}\n  background-color: ${color};\n  width: 200px;\n  height: 200px;\n}` : `.shape {\n  border-radius: ${rounded}px;\n  ${shapeCss}\n  background-color: ${color};\n  width: 200px;\n  height: 200px;\n}`;
  const html = `<div style="${isBlob ? shapeCss : `border-radius: ${rounded}px; ${shapeCss}`} background-color: ${color}; width: 200px; height: 200px;"></div>`;
  const jsx = `<div style={{ ${isBlob ? (shapeVal==='blob1' ? "borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'" : "borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'") : `borderRadius: '${rounded}px', clipPath: '${shapeVal}'`}, backgroundColor: '${color}' }} className="w-48 h-48"></div>`;
  const previewStyle = isBlob ? { backgroundColor: color, width: '150px', height: '150px', borderRadius: shapeVal === 'blob1' ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '60% 40% 30% 70% / 60% 30% 70% 40%', transition: 'all 0.5s' } : { clipPath: shapeVal, backgroundColor: color, width: '150px', height: '150px', borderRadius: `${rounded}px`, transition: 'all 0.5s' };
  const controls = (<><FigmaCustomDropdown label="Select Shape Form" groups={SHAPES_DATA} value={shapeVal} onChange={setShapeVal} /><FigmaColorPicker label="Shape Color" hexValue={color} onChange={setColor} />{!isBlob && <FigmaSlider label="Base Rounded" min={0} max={100} value={rounded} onChange={setRounded} unit="px" />}</>);
  return <WorkspaceLayout name="CSS Shapes" controls={controls} preview={<div style={previewStyle}></div>} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginGlassmorphism = () => {
  const [blur, setBlur] = useState(12); const [opacity, setOpacity] = useState(15); const [color, setColor] = useState('#ffffff');
  const rgb = hexToRgb(color);
  const css = `.glass {\n  background: rgba(${rgb}, ${opacity / 100});\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n  border: 1px solid rgba(${rgb}, 0.3);\n  border-radius: 16px;\n}`;
  const html = `<div style="background: rgba(${rgb}, ${opacity/100}); backdrop-filter: blur(${blur}px); border: 1px solid rgba(${rgb}, 0.3); border-radius: 16px; width: 240px; height: 140px;"></div>`;
  const jsx = `<div \n  style={{ background: 'rgba(${rgb}, ${opacity/100})', backdropFilter: 'blur(${blur}px)', border: '1px solid rgba(${rgb}, 0.3)' }}\n  className="w-60 h-36 rounded-2xl shadow-xl"\n></div>`;
  const preview = <div className="bg-cover bg-center absolute inset-0 opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')" }}>
    <div className="absolute inset-0 flex items-center justify-center">
      <div style={{ width: '80%', maxWidth: '240px', height: '140px', background: `rgba(${rgb}, ${opacity / 100})`, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, border: `1px solid rgba(${rgb}, 0.3)`, borderRadius: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}></div>
    </div>
  </div>;
  const controls = (<><FigmaColorPicker label="Glass Tint" hexValue={color} onChange={setColor} /><FigmaSlider label="Opacity" min={1} max={100} value={opacity} onChange={setOpacity} unit="%" /><FigmaSlider label="Blur Intensity" min={0} max={50} step={0.5} value={blur} onChange={setBlur} unit="px" /></>);
  return <WorkspaceLayout name="Glassmorphism" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

export const PluginNeumorphism = () => {
  const [bg, setBg] = useState('#e0e5ec'); const [dist, setDist] = useState(10); const [blur, setBlur] = useState(20); const [invert, setInvert] = useState(false);
  const lightShadow = adjustBrightness(bg, 15); const darkShadow = adjustBrightness(bg, -15);
  const shadowValue = invert ? `inset ${dist}px ${dist}px ${blur}px ${darkShadow}, inset -${dist}px -${dist}px ${blur}px ${lightShadow}` : `${dist}px ${dist}px ${blur}px ${darkShadow}, -${dist}px -${dist}px ${blur}px ${lightShadow}`;
  const css = `.neumorph {\n  background-color: ${bg};\n  border-radius: 20px;\n  box-shadow: ${shadowValue};\n}`;
  const html = `<div style="background-color: ${bg}; border-radius: 20px; box-shadow: ${shadowValue}; width: 140px; height: 140px;"></div>`;
  const jsx = `<div style={{ backgroundColor: '${bg}', boxShadow: '${shadowValue}' }} className="w-36 h-36 rounded-[20px]"></div>`;
  const preview = <div style={{ width: 160, height: 160, backgroundColor: bg, borderRadius: 24, boxShadow: shadowValue, transition: 'all 0.3s' }}></div>;
  const controls = (
    <>
      <FigmaColorPicker label="Base Background" hexValue={bg} onChange={setBg} />
      <div className="mb-4">
         <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-[#2a2a2a]">
            <button onClick={() => setInvert(false)} className={`flex-1 py-1.5 rounded-md text-[9px] font-medium ${!invert ? 'bg-[#1f1f1f] text-white' : 'text-slate-500'}`}>Extrude (Timbul)</button>
            <button onClick={() => setInvert(true)} className={`flex-1 py-1.5 rounded-md text-[9px] font-medium ${invert ? 'bg-[#1f1f1f] text-white' : 'text-slate-500'}`}>Inset (Cekung)</button>
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
  const css = `.shadow-box {\n  box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100});\n  border-radius: 12px;\n  background-color: #ffffff;\n}`;
  const html = `<div style="box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100}); border-radius: 12px; background-color: #ffffff; width: 140px; height: 140px;"></div>`;
  const jsx = `<div style={{ boxShadow: '${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})' }} className="w-36 h-36 rounded-xl bg-white"></div>`;
  const preview = <div style={{ width: 140, height: 140, backgroundColor: '#ffffff', borderRadius: 12, boxShadow: `${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})` }}></div>;
  const controls = (<><FigmaColorPicker label="Shadow Color" hexValue={color} onChange={setColor} /><FigmaSlider label="Opacity" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" /><FigmaSlider label="X Offset" min={-50} max={50} value={x} onChange={setX} unit="px" /><FigmaSlider label="Y Offset" min={-50} max={50} value={y} onChange={setY} unit="px" /><FigmaSlider label="Blur Radius" min={0} max={100} value={blur} onChange={setBlur} unit="px" /><FigmaSlider label="Spread Radius" min={-50} max={50} value={spread} onChange={setSpread} unit="px" /></>);
  return <WorkspaceLayout name="Drop Shadow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="light" />;
};

export const PluginGlow = () => {
  const [color, setColor] = useState('#0ea5e9'); const [blur, setBlur] = useState(40); const [spread, setSpread] = useState(10);
  const css = `.neon-glow {\n  box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8);\n  border-radius: 50%;\n  background-color: ${color};\n}`;
  const html = `<div style="box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8); border-radius: 50%; background-color: ${color}; width: 80px; height: 80px;"></div>`;
  const jsx = `<div style={{ boxShadow: '0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)', backgroundColor: '${color}' }} className="w-20 h-20 rounded-full"></div>`;
  const preview = <div style={{ width: 80, height: 80, backgroundColor: color, borderRadius: '50%', boxShadow: `0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)` }}></div>;
  const controls = (<><FigmaColorPicker label="Glow Color" hexValue={color} onChange={setColor} /><FigmaSlider label="Blur Radius" min={0} max={150} value={blur} onChange={setBlur} unit="px" /><FigmaSlider label="Spread Radius" min={0} max={100} value={spread} onChange={setSpread} unit="px" /></>);
  return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// FIX BUG IMAGE PRO: Tambahkan pilihan template gambar
const IMAGE_TEMPLATES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800"
];

export const PluginFilters = () => {
  const [bgImg, setBgImg] = useState(IMAGE_TEMPLATES[0]);
  const [brightness, setBrightness] = useState(100); const [contrast, setContrast] = useState(100); const [saturate, setSaturate] = useState(100); const [hue, setHue] = useState(0); const [blur, setBlur] = useState(0); const [shadow, setShadow] = useState(0); const [opacity, setOpacity] = useState(100);
  const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg) blur(${blur}px) drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5)) opacity(${opacity}%)`;
  
  const css = `.filtered-img {\n  filter: \n    brightness(${brightness}%)\n    contrast(${contrast}%)\n    saturate(${saturate}%)\n    hue-rotate(${hue}deg)\n    blur(${blur}px)\n    drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5))\n    opacity(${opacity}%);\n}`;
  const html = `<img src="..." style="filter: ${filterStr};" />`;
  const jsx = `<img src="..." style={{ filter: '${filterStr}' }} className="w-full object-cover rounded-xl" />`;
  
  const preview = (
    <div className="relative w-full h-full max-w-[360px] max-h-[260px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group aspect-video">
       <img src={bgImg} alt="Filter Demo" className="w-full h-full object-cover transition-all duration-200" style={{ filter: filterStr }} />
    </div>
  );

  const controls = (
    <div className="space-y-1 pb-4">
      <div className="mb-4">
         <label className="text-[10px] font-medium text-slate-400 block mb-2">Pilih Foto Uji Coba</label>
         <div className="flex gap-2">
            {IMAGE_TEMPLATES.map((img, idx) => (
              <button key={idx} onClick={() => setBgImg(img)} className={`w-12 h-12 rounded-lg bg-cover bg-center border-2 transition-all ${bgImg === img ? 'border-cyan-400 scale-110 shadow-lg' : 'border-[#333] hover:border-[#555]'}`} style={{backgroundImage: `url(${img})`}}></button>
            ))}
         </div>
      </div>
      <div className="mb-3 pb-2 border-b border-[#1f1f1f]"><div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between"><span>Light & Color Tuning</span><button onClick={() => { setBrightness(100); setContrast(100); setSaturate(100); setHue(0); }} className="text-[8px] text-slate-300 hover:text-white bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded transition-colors">RESET</button></div></div>
      <FigmaSlider label="Exposure" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
      <FigmaSlider label="Contrast" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
      <FigmaSlider label="Vibrance" min={0} max={200} value={saturate} onChange={setSaturate} unit="%" />
      <FigmaSlider label="Tint (Hue)" min={0} max={360} value={hue} onChange={setHue} unit="°" />
      <div className="mt-6 mb-3 pb-2 border-b border-[#1f1f1f]"><div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between"><span>Effects & Details</span><button onClick={() => { setBlur(0); setShadow(0); setOpacity(100); }} className="text-[8px] text-slate-300 hover:text-white bg-[#1a1a1a] border border-[#333] px-2 py-1 rounded transition-colors">RESET</button></div></div>
      <FigmaSlider label="Lens Blur" min={0} max={20} step={0.5} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Drop Shadow" min={0} max={50} value={shadow} onChange={setShadow} unit="px" />
      <FigmaSlider label="Opacity" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" />
    </div>
  );
  return <WorkspaceLayout name="Pro Filters" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};

export const PluginTransform = () => {
  const [rx, setRx] = useState(30); const [ry, setRy] = useState(-30); const [rz, setRz] = useState(0); const [tx, setTx] = useState(0); const [ty, setTy] = useState(0); const [tz, setTz] = useState(0); const [scale, setScale] = useState(1);
  const transStr = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translate3d(${tx}px, ${ty}px, ${tz}px) scale(${scale})`;
  const css = `.parent { perspective: 1000px; transform-style: preserve-3d; }\n.element {\n  transform: ${transStr};\n}`;
  const html = `<div style="perspective: 1000px; transform-style: preserve-3d;">\n  <div style="transform: ${transStr};">3D Object</div>\n</div>`;
  const jsx = `<div style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>\n  <div style={{ transform: '${transStr}' }}>3D Object</div>\n</div>`;
  const preview = (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
      <div className="w-32 h-32 bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-2xl flex flex-col items-center justify-center border border-white/30 rounded-xl" style={{ transform: transStr, transition: 'transform 0.1s linear', transformStyle: 'preserve-3d', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.2)' }}>
        <Icons.Cube3D />
        <span className="text-[10px] font-bold mt-2 text-white tracking-widest" style={{ transform: 'translateZ(20px)' }}>TRUE 3D</span>
      </div>
    </div>
  );
  const controls = (<><FigmaSlider label="Rotate X" min={-180} max={180} value={rx} onChange={setRx} unit="°" /><FigmaSlider label="Rotate Y" min={-180} max={180} value={ry} onChange={setRy} unit="°" /><FigmaSlider label="Rotate Z" min={-180} max={180} value={rz} onChange={setRz} unit="°" /><FigmaSlider label="Translate Z" min={-300} max={300} value={tz} onChange={setTz} unit="px" /><FigmaSlider label="Scale" min={0.5} max={2} step={0.1} value={scale} onChange={setScale} unit="x" /><button onClick={() => { setRx(0); setRy(0); setRz(0); setTx(0); setTy(0); setTz(0); setScale(1); }} className="w-full mt-6 py-2.5 bg-[#1a1a1a] hover:bg-[#333] border border-[#2a2a2a] rounded-lg text-[10px] font-bold text-white uppercase tracking-widest transition-colors shadow-sm">Reset Matrix</button></>);
  return <WorkspaceLayout name="True 3D Studio" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};

// =========================================================================
// FITUR ANIMATION
// =========================================================================
const ANIMATION_DATA = {
  "Attention": [
    { name: "Bounce", val: "bounce" }, { name: "Flash", val: "flash" }, { name: "Pulse", val: "pulse" },
    { name: "RubberBand", val: "rubberBand" }, { name: "Shake", val: "shake" }, { name: "Swing", val: "swing" }
  ],
  "Fade Entrances": [
    { name: "Fade In", val: "fadeIn" }, { name: "Fade In Down", val: "fadeInDown" }, { name: "Fade In Left", val: "fadeInLeft" }
  ],
  "Zoom Entrances": [
    { name: "Zoom In", val: "zoomIn" }, { name: "Zoom In Down", val: "zoomInDown" }, { name: "Zoom In Up", val: "zoomInUp" }
  ],
  "Rotations": [
    { name: "Spin 360", val: "spin" }, { name: "Flip X", val: "flipInX" }, { name: "Flip Y", val: "flipInY" }
  ],
  "Looping": [
    { name: "Floating", val: "float" }, { name: "Breathe", val: "breathe" }
  ]
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
  const [animType, setAnimType] = useState('bounce'); 
  const [duration, setDuration] = useState(1.5);
  const [timing, setTiming] = useState('ease-in-out');
  const [iteration, setIteration] = useState('infinite');
  const [key, setKey] = useState(0); 

  const css = `@keyframes anim-${animType} {\n  ${getDynamicKeyframes(animType).replace(/\} /g, '}\n  ')}\n}\n\n.animate-element {\n  animation: anim-${animType} ${duration}s ${timing} ${iteration};\n}`;
  const html = `<style>\n  @keyframes anim-${animType} { ${getDynamicKeyframes(animType)} }\n  .animate-element { animation: anim-${animType} ${duration}s ${timing} ${iteration}; }\n</style>\n<div class="animate-element">Animate Me</div>`;
  const jsx = `// Tambahkan @keyframes ke global.css terlebih dahulu\n<div style={{ animation: 'anim-${animType} ${duration}s ${timing} ${iteration}' }}>\n  Animate Me\n</div>`;

  useEffect(() => { setKey(prev => prev + 1); }, [animType, duration, timing, iteration]);

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`@keyframes preview-${animType}-${key} { ${getDynamicKeyframes(animType)} }`}</style>
      <div 
        key={key}
        className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-500 to-orange-400 shadow-2xl flex items-center justify-center border border-white/20"
        style={{ animation: `preview-${animType}-${key} ${duration}s ${timing} ${iteration === 'infinite' ? 'infinite' : iteration}` }}
      >
        <Icons.Animation />
      </div>
    </div>
  );

  const controls = (
    <>
      <FigmaCustomDropdown label="Animation Style" groups={ANIMATION_DATA} value={animType} onChange={setAnimType} />
      <FigmaSlider label="Duration" min={0.1} max={5} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Timing Function" options={['linear', 'ease', 'ease-in-out', 'ease-in']} value={timing} onChange={setTiming} />
      <FigmaSelect label="Iteration Count" options={['1', '2', '3', 'infinite']} value={iteration} onChange={setIteration} />
      <button onClick={() => setKey(k => k + 1)} className="w-full mt-4 py-2.5 bg-[#1a1a1a] hover:bg-[#333] border border-[#2a2a2a] text-cyan-400 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">
        Replay Animation
      </button>
    </>
  );

  return <WorkspaceLayout name="Animation Builder" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};


// =========================================================================
// FITUR TRANSITIONS
// =========================================================================
const TRANSITIONS_DATA = {
  "Scale Effects": [
    { name: "Grow", val: "scale(1.1)" }, { name: "Shrink", val: "scale(0.9)" }, { name: "Pop", val: "scale(1.2)" }
  ],
  "Translates": [
    { name: "Push Up", val: "translateY(-10px)" }, { name: "Push Down", val: "translateY(10px)" },
    { name: "Push Left", val: "translateX(-10px)" }, { name: "Push Right", val: "translateX(10px)" }
  ],
  "Rotations": [
    { name: "Rotate Right", val: "rotate(15deg)" }, { name: "Rotate Left", val: "rotate(-15deg)" },
    { name: "Spin Quarter", val: "rotate(90deg)" }, { name: "Spin Half", val: "rotate(180deg)" }
  ],
  "Skews": [
    { name: "Skew Forward", val: "skewX(-15deg)" }, { name: "Skew Backward", val: "skewX(15deg)" }
  ]
};

export const PluginTransitions = () => {
  const [transType, setTransType] = useState('scale(1.1)'); 
  const [duration, setDuration] = useState(0.3);
  const [timing, setTiming] = useState('ease-in-out');

  const css = `.element {\n  transition: transform ${duration}s ${timing};\n}\n\n.element:hover {\n  transform: ${transType};\n}`;
  const html = `<style>\n  .element { transition: transform ${duration}s ${timing}; }\n  .element:hover { transform: ${transType}; }\n</style>\n<div class="element">HOVER ME</div>`;
  const jsx = `<div \n  style={{ transition: 'transform ${duration}s ${timing}' }}\n  onMouseEnter={(e) => e.currentTarget.style.transform = '${transType}'}\n  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}\n>\n  HOVER ME\n</div>`;

  const preview = (
    <div className="relative w-full h-full flex items-center justify-center group cursor-pointer">
      <div 
        className="w-40 h-16 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-lg"
        style={{ transition: `transform ${duration}s ${timing}` }}
        onMouseEnter={(e) => e.currentTarget.style.transform = transType}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        HOVER ME
      </div>
      <div className="absolute top-10 text-[10px] text-slate-500 uppercase tracking-widest animate-pulse pointer-events-none">Interact to preview</div>
    </div>
  );

  const controls = (
    <>
      <PluginTip text="Penting: Tempatkan output CSS '.element' di class default, dan '.element:hover' untuk memicu efeknya." />
      <FigmaCustomDropdown label="Hover Effect Type" groups={TRANSITIONS_DATA} value={transType} onChange={setTransType} />
      <FigmaSlider label="Duration" min={0.1} max={3} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Timing/Easing" options={['ease', 'linear', 'ease-in-out', 'cubic']} value={timing} onChange={setTiming} />
    </>
  );

  return <WorkspaceLayout name="Hover Transitions" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};


// =========================================================================
// FITUR PIXEL ART (Dengan Undo/Redo Baru)
// =========================================================================
export const PluginPixelArt = () => {
  const [gridSize, setGridSize] = useState(8); 
  const [color, setColor] = useState('#0ea5e9');
  
  // History State untuk Undo & Redo
  const [history, setHistory] = useState([Array(64).fill('transparent')]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const newEmpty = Array(gridSize * gridSize).fill('transparent');
    setHistory([newEmpty]);
    setStep(0);
  }, [gridSize]);

  const currentPixels = history[step] || Array(gridSize * gridSize).fill('transparent');

  const paintPixel = (index) => {
    const newPixels = [...currentPixels];
    newPixels[index] = newPixels[index] === color ? 'transparent' : color;
    
    // Menyimpan state ke history untuk fitur undo/redo
    const newHistory = history.slice(0, step + 1);
    newHistory.push(newPixels);
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  };

  const clearCanvas = () => {
    const newEmpty = Array(gridSize * gridSize).fill('transparent');
    const newHistory = history.slice(0, step + 1);
    newHistory.push(newEmpty);
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  };

  const handleUndo = () => setStep(Math.max(0, step - 1));
  const handleRedo = () => setStep(Math.min(history.length - 1, step + 1));

  const pixelSizePx = gridSize === 8 ? 10 : gridSize === 12 ? 8 : 6;

  const generateBoxShadow = () => {
    let shadow = [];
    currentPixels.forEach((p, i) => {
      if (p !== 'transparent') {
        const x = (i % gridSize) * pixelSizePx;
        const y = Math.floor(i / gridSize) * pixelSizePx;
        shadow.push(`${x}px ${y}px ${p}`);
      }
    });
    return shadow.length > 0 ? shadow.join(',\n    ') : 'none';
  };

  const css = `/* Pure CSS Pixel Art (${gridSize}x${gridSize}) */\n.pixel-art {\n  width: ${pixelSizePx}px;\n  height: ${pixelSizePx}px;\n  background: transparent;\n  box-shadow: \n    ${generateBoxShadow()};\n}`;
  const html = `<div style="width: ${pixelSizePx}px; height: ${pixelSizePx}px; box-shadow: ${generateBoxShadow().replace(/\n\s+/g, ' ')};"></div>`;
  const jsx = `<div style={{ width: '${pixelSizePx}px', height: '${pixelSizePx}px', boxShadow: '${generateBoxShadow().replace(/\n\s+/g, ' ')}' }} />`;

  const preview = (
    <div className="flex flex-col items-center">
      <div 
        className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] grid border border-[#1f1f1f] bg-[#0a0a0a]"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {currentPixels.map((bg, i) => (
          <div 
            key={i} 
            onClick={() => paintPixel(i)}
            className="border border-white/5 cursor-crosshair hover:bg-white/10 transition-colors w-full h-full"
            style={{ backgroundColor: bg !== 'transparent' ? bg : undefined }}
          />
        ))}
      </div>
      
      {/* Tombol Undo & Redo */}
      <div className="flex gap-4 mt-6">
        <button onClick={handleUndo} disabled={step === 0} className={`p-2 rounded-full border ${step === 0 ? 'border-[#1f1f1f] text-slate-600' : 'border-[#333] text-slate-300 hover:text-white hover:bg-[#1a1a1a]'}`}><Icons.Undo /></button>
        <button onClick={handleRedo} disabled={step === history.length - 1} className={`p-2 rounded-full border ${step === history.length - 1 ? 'border-[#1f1f1f] text-slate-600' : 'border-[#333] text-slate-300 hover:text-white hover:bg-[#1a1a1a]'}`}><Icons.Redo /></button>
      </div>
    </div>
  );

  const controls = (
    <>
      <PluginTip text="Kini kamu bisa leluasa menggambar! Jika salah, tekan tombol Undo (Kiri) atau Redo (Kanan) di bawah kanvas." />
      <FigmaSelect label="Canvas Size (Resolution)" options={['8', '12', '16']} value={gridSize.toString()} onChange={(val) => setGridSize(Number(val))} />
      
      <div className="flex justify-between items-center mb-4 mt-6 border-t border-[#1f1f1f] pt-4">
        <label className="text-[10px] font-medium text-slate-400 block">Brush Color</label>
        <button onClick={clearCanvas} className="text-[8px] text-red-400 hover:text-white bg-red-500/10 border border-red-500/30 px-2 py-1 rounded transition-colors uppercase font-bold tracking-widest">Clear Canvas</button>
      </div>
      <FigmaColorPicker label="Custom Hex" hexValue={color} onChange={setColor} />
      <div className="flex flex-wrap gap-2 mt-2">
        {['#0ea5e9', '#ec4899', '#f59e0b', '#10b981', '#ffffff', '#000000'].map(c => (
           <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-md border ${color === c ? 'border-cyan-400 scale-110 shadow-lg' : 'border-[#333]'}`} style={{backgroundColor: c}}></button>
        ))}
      </div>
    </>
  );

  return <WorkspaceLayout name="CSS Pixel Drawing" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};
