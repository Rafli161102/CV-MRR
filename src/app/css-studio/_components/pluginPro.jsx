"use client";

import React, { useState, useEffect } from 'react';
import { Icons } from './icons';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaCustomDropdown, WorkspaceLayout, hexToRgb, adjustBrightness, ControlHeader, FigmaToggle } from './ui';

// =========================================================================
// 6. GLASSMORPHISM
// =========================================================================
export const PluginGlassmorphism = () => {
  const [blur, setBlur] = useState(12); const [opacity, setOpacity] = useState(15); const [color, setColor] = useState('#ffffff');
  const handleReset = () => { setBlur(12); setOpacity(15); setColor('#ffffff'); };
  
  const rgb = hexToRgb(color);
  const css = `.glass {\n  background: rgba(${rgb}, ${opacity / 100});\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 16px;\n}`;
  const html = `<div style="background: rgba(${rgb}, ${opacity/100}); backdrop-filter: blur(${blur}px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 16px; width: 240px; height: 140px;"></div>`;
  const jsx = `<div style={{ background: 'rgba(${rgb}, ${opacity/100})', backdropFilter: 'blur(${blur}px)', border: '1px solid rgba(255,255,255, 0.3)' }} className="w-60 h-36 rounded-2xl shadow-xl"></div>`;
  
  const preview = <div style={{ width: '80%', maxWidth: '240px', height: '140px', background: `rgba(${rgb}, ${opacity / 100})`, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, border: `1px solid rgba(255, 255, 255, 0.3)`, borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TIPS EFEK KACA (GLASSMORPHISM)" text="Kunci utama efek kaca yang mewah seperti desain Apple/iOS adalah menggunakan transparansi (Opacity) yang sangat rendah di kisaran 10% hingga 20%, dikombinasikan dengan efek blur latar (Blur Intensity) yang tinggi (sekitar 12px - 20px). Pastikan menambahkan border putih tipis transparan untuk menegaskan pantulan cahaya di tepi elemen." />
      <ControlHeader title="Glass Setup" onReset={handleReset} />
      <FigmaColorPicker label="Warna Kaca (Glass Tint)" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Tingkat Transparansi (Opacity)" min={1} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="Intensitas Blur Latar" min={0} max={50} step={0.5} value={blur} onChange={setBlur} unit="px" />
    </div>
  );
  return <WorkspaceLayout name="Glassmorphism" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="glass" />;
};

// =========================================================================
// 7. NEUMORPHISM
// =========================================================================
export const PluginNeumorphism = () => {
  const [bg, setBg] = useState('#e0e5ec'); const [dist, setDist] = useState(10); const [blur, setBlur] = useState(20); const [invert, setInvert] = useState(false);
  const handleReset = () => { setBg('#e0e5ec'); setDist(10); setBlur(20); setInvert(false); };
  
  const lightShadow = adjustBrightness(bg, 15); const darkShadow = adjustBrightness(bg, -15);
  const shadowValue = invert ? `inset ${dist}px ${dist}px ${blur}px ${darkShadow}, inset -${dist}px -${dist}px ${blur}px ${lightShadow}` : `${dist}px ${dist}px ${blur}px ${darkShadow}, -${dist}px -${dist}px ${blur}px ${lightShadow}`;
  
  const css = `.neumorph {\n  background-color: ${bg};\n  border-radius: 20px;\n  box-shadow: ${shadowValue};\n}`;
  const html = `<div style="background-color: ${bg}; border-radius: 20px; box-shadow: ${shadowValue}; width: 140px; height: 140px;"></div>`;
  const jsx = `<div style={{ backgroundColor: '${bg}', boxShadow: '${shadowValue}' }} className="w-36 h-36 rounded-[20px]"></div>`;
  const preview = <div style={{ width: 160, height: 160, backgroundColor: bg, borderRadius: 24, boxShadow: shadowValue, transition: 'all 0.4s ease-out' }}></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TIPS DESAIN NEUMORPHISM" text="Desain Neumorphism (Soft UI) mengandalkan manipulasi bayangan untuk membuat elemen terlihat menyatu dengan latar belakang. Wajib menggunakan warna dasar latar belakang yang lembut atau pastel (bukan murni hitam/putih). Nyalakan efek 'Cekung (Inset)' jika ingin membuat tombol yang sedang ditekan." />
      <ControlHeader title="Neumorph Setup" onReset={handleReset} />
      <FigmaColorPicker label="Base Background Color" hexValue={bg} onChange={setBg} />
      <div className="mt-2 mb-2">
         <FigmaToggle label="Efek Cekung (Inset Mode)" checked={invert} onChange={setInvert} />
      </div>
      <FigmaSlider label="Jarak Bayangan (Distance)" min={1} max={30} value={dist} onChange={setDist} unit="px" />
      <FigmaSlider label="Blur Radius" min={1} max={60} value={blur} onChange={setBlur} unit="px" />
    </div>
  );
  return <WorkspaceLayout name="Neumorphism" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="light" bgHex={bg} />;
};

// =========================================================================
// 8. DROP SHADOW
// =========================================================================
export const PluginShadow = () => {
  const [x, setX] = useState(10); const [y, setY] = useState(15); const [blur, setBlur] = useState(30); const [spread, setSpread] = useState(0); const [opacity, setOpacity] = useState(40); const [color, setColor] = useState('#000000');
  const handleReset = () => { setX(10); setY(15); setBlur(30); setSpread(0); setOpacity(40); setColor('#000000'); };
  
  const css = `.shadow-box {\n  box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100});\n  border-radius: 12px;\n  background-color: #ffffff;\n}`;
  const html = `<div style="box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100}); border-radius: 12px; background-color: #ffffff; width: 140px; height: 140px;"></div>`;
  const jsx = `<div style={{ boxShadow: '${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})' }} className="w-36 h-36 rounded-xl bg-white"></div>`;
  const preview = <div style={{ width: 140, height: 140, backgroundColor: '#ffffff', borderRadius: 12, transition: 'box-shadow 0.3s ease', boxShadow: `${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity/100})` }}></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TEKNIK ELEGAN: SOFT SHADOW" text="Hindari penggunaan bayangan hitam solid yang kaku. Tren UI/UX modern mempopulerkan efek 'Soft Shadow'. Caranya: Turunkan Opacity bayangan ke angka 10% - 20%, lalu naikkan Blur Radius (30px ke atas) dan posisikan sedikit ke bawah (Y Offset positif). Elemen Anda akan terlihat melayang mulus di atas layar." />
      <ControlHeader title="Shadow Setup" onReset={handleReset} />
      <FigmaColorPicker label="Warna Bayangan (Shadow Color)" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Ketebalan/Transparansi (Opacity)" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" />
      <FigmaSlider label="Posisi Horizontal (X Offset)" min={-50} max={50} value={x} onChange={setX} unit="px" />
      <FigmaSlider label="Posisi Vertikal (Y Offset)" min={-50} max={50} value={y} onChange={setY} unit="px" />
      <FigmaSlider label="Kelembutan (Blur Radius)" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Sebaran (Spread Radius)" min={-50} max={50} value={spread} onChange={setSpread} unit="px" />
    </div>
  );
  return <WorkspaceLayout name="Drop Shadow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="light" />;
};

// =========================================================================
// 9. NEON GLOW
// =========================================================================
export const PluginGlow = () => {
  const [color, setColor] = useState('#0ea5e9'); const [blur, setBlur] = useState(40); const [spread, setSpread] = useState(10);
  const handleReset = () => { setColor('#0ea5e9'); setBlur(40); setSpread(10); };
  
  const css = `.neon-glow {\n  box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8);\n  border-radius: 50%;\n  background-color: ${color};\n}`;
  const html = `<div style="box-shadow: 0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8); border-radius: 50%; background-color: ${color}; width: 80px; height: 80px;"></div>`;
  const jsx = `<div style={{ boxShadow: '0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)', backgroundColor: '${color}' }} className="w-20 h-20 rounded-full"></div>`;
  const preview = <div style={{ width: 80, height: 80, backgroundColor: color, borderRadius: '50%', transition: 'all 0.3s ease', boxShadow: `0 0 ${blur}px ${spread}px rgba(${hexToRgb(color)}, 0.8)` }}></div>;
  
  const controls = (
    <div className="space-y-1">
      <PluginTip title="TIPS DESAIN CYBERPUNK (GLOW)" text="Efek Neon/Glow sangat kuat saat diaplikasikan di latar belakang gelap (Dark Mode). Gunakan warna-warna vibran tinggi seperti Cyan terang, Magenta, atau Neon Green. Besarkan nilai 'Blur Radius' dan 'Spread' agar cahaya terlihat menyebar luas menyerupai efek pendaran lampu LED asli." />
      <ControlHeader title="Glow Setup" onReset={handleReset} />
      <FigmaColorPicker label="Warna Pendaran Cahaya" hexValue={color} onChange={setColor} />
      <FigmaSlider label="Penyebaran Cahaya (Blur Radius)" min={0} max={150} value={blur} onChange={setBlur} unit="px" />
      <FigmaSlider label="Jangkauan Terang (Spread Radius)" min={0} max={100} value={spread} onChange={setSpread} unit="px" />
    </div>
  );
  return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} />;
};

// =========================================================================
// 10. IMAGE FILTERS
// =========================================================================
const IMAGE_TEMPLATES = ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800", "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800"];

export const PluginFilters = () => {
  const [bgImg, setBgImg] = useState(IMAGE_TEMPLATES[0]);
  const [brightness, setBrightness] = useState(100); const [contrast, setContrast] = useState(100); const [saturate, setSaturate] = useState(100); const [hue, setHue] = useState(0); const [blur, setBlur] = useState(0); const [shadow, setShadow] = useState(0); const [opacity, setOpacity] = useState(100);
  const handleReset = () => { setBrightness(100); setContrast(100); setSaturate(100); setHue(0); setBlur(0); setShadow(0); setOpacity(100); };
  
  const filterStr = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg) blur(${blur}px) drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5)) opacity(${opacity}%)`;
  const css = `.filtered-img {\n  filter: \n    brightness(${brightness}%)\n    contrast(${contrast}%)\n    saturate(${saturate}%)\n    hue-rotate(${hue}deg)\n    blur(${blur}px)\n    drop-shadow(0px 10px ${shadow}px rgba(0,0,0,0.5))\n    opacity(${opacity}%);\n}`;
  const html = `<img src="${bgImg}" style="filter: ${filterStr}; width: 100%; border-radius: 12px;" />`;
  const jsx = `<img src="${bgImg}" style={{ filter: '${filterStr}' }} className="w-full object-cover rounded-xl" />`;
  
  const preview = <div className="relative w-full h-full max-w-[360px] max-h-[260px] rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] ring-1 ring-white/10 group aspect-video"><img src={bgImg} alt="Filter Demo" className="w-full h-full object-cover transition-all duration-200" style={{ filter: filterStr }} /></div>;

  const controls = (
    <div className="space-y-4">
      <PluginTip title="EDIT FOTO ALA INSTAGRAM" text="CSS Filter memungkinkan Anda merekayasa foto tanpa aplikasi editing. Trik membuat foto standar menjadi sangat sinematik: Naikkan Contrast hingga 110%, tambahkan Vibrance (Saturasi) ke 120% untuk warna kulit yang hidup, lalu berikan efek Drop Shadow tipis agar foto Anda terlihat menyembul keluar dari layar." />
      <div className="mb-4">
         <label className="text-[11px] font-bold text-slate-300 block mb-3 uppercase tracking-widest">Ganti Foto Template</label>
         <div className="flex gap-3">
            {IMAGE_TEMPLATES.map((img, idx) => (
              <button key={idx} onClick={() => setBgImg(img)} className={`w-14 h-14 rounded-xl bg-cover bg-center border-[3px] transition-all duration-300 ${bgImg === img ? 'border-cyan-400 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'border-[#333] hover:border-[#555] opacity-50 hover:opacity-100'}`} style={{backgroundImage: `url(${img})`}}></button>
            ))}
         </div>
      </div>
      <ControlHeader title="Filters Setup" onReset={handleReset} />
      <FigmaSlider label="Pencahayaan (Exposure)" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
      <FigmaSlider label="Ketajaman Warna (Contrast)" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
      <FigmaSlider label="Saturasi Warna (Vibrance)" min={0} max={200} value={saturate} onChange={setSaturate} unit="%" />
      <FigmaSlider label="Ubah Nada Warna (Hue Tint)" min={0} max={360} value={hue} onChange={setHue} unit="°" />
      <div className="pt-4 border-t border-[#1f1f1f]">
        <FigmaSlider label="Sensor Blur (Bokeh)" min={0} max={20} step={0.5} value={blur} onChange={setBlur} unit="px" />
        <FigmaSlider label="Efek Timbul (Drop Shadow)" min={0} max={50} value={shadow} onChange={setShadow} unit="px" />
        <FigmaSlider label="Transparansi Foto (Opacity)" min={0} max={100} value={opacity} onChange={setOpacity} unit="%" />
      </div>
    </div>
  );
  return <WorkspaceLayout name="Pro Filters" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};

// =========================================================================
// 11. KEYFRAME ANIMATIONS
// =========================================================================
const ANIMATION_DATA = { 
  "Attention (Perhatian)": [{ name: "Bounce (Memantul)", val: "bounce" }, { name: "Flash (Berkedip)", val: "flash" }, { name: "Pulse (Berdetak)", val: "pulse" }, { name: "RubberBand (Karet)", val: "rubberBand" }, { name: "Shake (Bergetar)", val: "shake" }, { name: "Swing (Berayun)", val: "swing" }], 
  "Fade Entrances (Masuk Halus)": [{ name: "Fade In", val: "fadeIn" }, { name: "Fade In Down", val: "fadeInDown" }, { name: "Fade In Left", val: "fadeInLeft" }], 
  "Zoom Entrances (Masuk Zoom)": [{ name: "Zoom In", val: "zoomIn" }, { name: "Zoom In Down", val: "zoomInDown" }, { name: "Zoom In Up", val: "zoomInUp" }], 
  "Rotations (Putaran)": [{ name: "Spin 360", val: "spin" }, { name: "Flip Horizontal", val: "flipInX" }, { name: "Flip Vertical", val: "flipInY" }], 
  "Looping (Berkelanjutan)": [{ name: "Floating (Melayang)", val: "float" }, { name: "Breathe (Bernapas)", val: "breathe" }] 
};

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
    <div className="space-y-1">
      <PluginTip title="PANDUAN KEYFRAME ANIMATION" text="Animasi web diatur oleh properti Waktu dan Gaya (Timing). Gunakan 'linear' untuk animasi memutar yang terus-menerus tanpa henti. Gunakan kategori 'Looping' (seperti Floating) dan atur Iteration menjadi 'Infinite' untuk menciptakan efek elemen yang terus melayang tanpa perlu disentuh." />
      <ControlHeader title="Animation Setup" onReset={handleReset} />
      <FigmaCustomDropdown label="Pilih Efek Animasi" groups={ANIMATION_DATA} value={animType} onChange={setAnimType} />
      <FigmaSlider label="Durasi / Kecepatan" min={0.1} max={5} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#1f1f1f]">
         <FigmaSelect label="Gaya Pergerakan (Timing)" options={['linear', 'ease', 'ease-in-out', 'ease-in']} value={timing} onChange={setTiming} />
         <FigmaSelect label="Pengulangan (Iteration)" options={['1', '2', '3', 'infinite']} value={iteration} onChange={setIteration} />
      </div>
      <button onClick={() => setKey(k => k + 1)} className="w-full mt-4 py-3.5 bg-[#141414] hover:bg-cyan-500/20 border border-[#333] hover:border-cyan-500 text-cyan-400 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95">Putar Ulang Animasi</button>
    </div>
  );
  return <WorkspaceLayout name="Animation Builder" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="grid" />;
};

// =========================================================================
// 12. HOVER TRANSITIONS
// =========================================================================
const TRANSITIONS_DATA = { 
  "Scale Effects": [{ name: "Grow (Membesar)", val: "scale(1.1)" }, { name: "Shrink (Mengecil)", val: "scale(0.9)" }, { name: "Pop (Ekstrim)", val: "scale(1.2)" }], 
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
      <div className="w-48 h-16 rounded-full bg-white text-black text-[13px] font-black tracking-widest flex items-center justify-center shadow-2xl transition-all" style={{ transition: `transform ${duration}s ${timing}` }} onMouseEnter={(e) => e.currentTarget.style.transform = transType} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>HOVER ME</div>
      <div className="absolute top-10 text-[10px] text-slate-500 font-bold uppercase tracking-widest animate-pulse pointer-events-none">Arahkan Kursor / Sentuh</div>
    </div>
  );

  const controls = (
    <div className="space-y-1">
      <PluginTip title="PANDUAN EFEK HOVER" text="Transisi Hover adalah nyawa dari tombol yang interaktif. PENTING: Pada kode CSS hasil ekspor Anda, pastikan atribut 'transition' diletakkan di class induk (default), sedangkan atribut 'transform' diletakkan di dalam pseudo class ':hover' agar kembalinya tombol ke ukuran semula menjadi mulus." />
      <ControlHeader title="Hover Setup" onReset={handleReset} />
      <FigmaCustomDropdown label="Jenis Efek Sentuhan" groups={TRANSITIONS_DATA} value={transType} onChange={setTransType} />
      <FigmaSlider label="Durasi Efek" min={0.1} max={3} step={0.1} value={duration} onChange={setDuration} unit="s" />
      <FigmaSelect label="Gaya Timing/Easing" options={['ease', 'linear', 'ease-in-out', 'cubic']} value={timing} onChange={setTiming} />
    </div>
  );
  return <WorkspaceLayout name="Hover Transitions" controls={controls} preview={preview} cssOutput={css} htmlOutput={html} jsxOutput={jsx} bgType="dark" />;
};
