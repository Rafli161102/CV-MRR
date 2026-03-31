"use client";

import React, { useState } from 'react';
import { WorkspaceLayout, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaTextInput, hexToRgba } from './shared';

// =========================================================================
// 1. LAYOUT BOX PLUGIN
// =========================================================================
export const PluginLayout = () => {
  const [shape, setShape] = useState('box');
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState(150);
  const [padding, setPadding] = useState(24);
  const [radius, setRadius] = useState(24);
  const [bgColor, setBgColor] = useState('#0ea5e9');
  const [align, setAlign] = useState('center');

  const css = `.box-element {\n  display: flex;\n  align-items: ${align};\n  justify-content: ${align};\n  width: ${shape === 'circle' ? '200' : shape === 'pill' ? '300' : width}px;\n  height: ${shape === 'circle' ? '200' : shape === 'pill' ? '100' : height}px;\n  padding: ${padding}px;\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : `${radius}px`};\n  background-color: ${bgColor};\n}`;
  const preview = (
    <div style={{ display: 'flex', alignItems: align, justifyContent: align, width: `${shape === 'circle' ? 200 : shape === 'pill' ? 300 : width}px`, height: `${shape === 'circle' ? 200 : shape === 'pill' ? 100 : height}px`, padding: `${padding}px`, borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : `${radius}px`, backgroundColor: bgColor }} className="transition-all duration-500 cubic-bezier(0.25, 1, 0.5, 1) shadow-xl max-w-full max-h-full">
      <div className="bg-black/20 w-full h-full border border-black/10 rounded flex items-center justify-center overflow-hidden">
        <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest text-center truncate">Layout Area</span>
      </div>
    </div>
  );
  const controls = (
    <>
      <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
      <div className="my-4 border-t border-[#252526] pt-4"></div>
      <FigmaSlider label="Width" min={50} max={500} value={width} onChange={setWidth} unit="px" />
      <FigmaSlider label="Height" min={50} max={500} value={height} onChange={setHeight} unit="px" />
      <FigmaSlider label="Padding" min={0} max={100} value={padding} onChange={setPadding} unit="px" />
      {shape === 'box' && <FigmaSlider label="Border Radius" min={0} max={200} value={radius} onChange={setRadius} unit="px" />}
      <div className="my-4 border-t border-[#252526] pt-4"></div>
      <FigmaSelect label="Flex Align" options={['flex-start', 'center', 'flex-end']} value={align} onChange={setAlign} />
      <FigmaColorPicker label="Background Color" hexValue={bgColor} onChange={setBgColor} />
    </>
  );
  return <WorkspaceLayout name="Layout & Flex" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};

// =========================================================================
// 2. BORDER STYLING PLUGIN
// =========================================================================
export const PluginBorder = () => {
  const [shape, setShape] = useState('box');
  const [width, setWidth] = useState(4);
  const [radius, setRadius] = useState(24);
  const [style, setStyle] = useState('solid');
  const [color, setColor] = useState('#0ea5e9');

  const css = `.border-element {\n  border: ${width}px ${style} ${color};\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : `${radius}px`};\n  background-color: transparent;\n}`;
  const preview = (
    <div style={{
      width: shape === 'circle' ? '200px' : shape === 'pill' ? '300px' : '200px',
      height: shape === 'circle' ? '200px' : shape === 'pill' ? '100px' : '200px',
      border: `${width}px ${style} ${color}`,
      borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : `${radius}px`,
    }} className="flex items-center justify-center transition-all duration-500 overflow-hidden">
      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Border Area</span>
    </div>
  );
  const controls = (
    <>
      <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
      <div className="my-4 border-t border-[#252526] pt-4"></div>
      <FigmaSlider label="Border Width" min={0} max={30} value={width} onChange={setWidth} unit="px" />
      {shape === 'box' && <FigmaSlider label="Border Radius" min={0} max={200} value={radius} onChange={setRadius} unit="px" />}
      <FigmaSelect label="Border Style" options={['solid', 'dashed', 'dotted']} value={style} onChange={setStyle} />
      <FigmaColorPicker label="Border Color" hexValue={color} onChange={setColor} />
    </>
  );
  return <WorkspaceLayout name="Border Styling" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};

// =========================================================================
// 3. TYPOGRAPHY PLUGIN
// =========================================================================
export const PluginTypography = () => {
  const [text, setText] = useState('MRR Studio.');
  const [size, setSize] = useState(48);
  const [weight, setWeight] = useState(800);
  const [letter, setLetter] = useState(-1);
  const [align, setAlign] = useState('center');
  const [color, setColor] = useState('#ffffff');
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(4);
  const [shadowB, setShadowB] = useState(15);
  const [shadowC, setShadowC] = useState('#0ea5e9');
  const [shadowO, setShadowO] = useState(0.5);

  const css = `.text-element {\n  font-size: ${size}px;\n  font-weight: ${weight};\n  letter-spacing: ${letter}px;\n  text-align: ${align};\n  color: ${color};\n  text-shadow: ${shadowX}px ${shadowY}px ${shadowB}px ${hexToRgba(shadowC, shadowO)};\n}`;
  const preview = (
    <div className="w-full px-4 overflow-hidden" style={{ textAlign: align }}>
       <h2 style={{ display: 'inline-block', fontSize: `${size}px`, fontWeight: weight, letterSpacing: `${letter}px`, color: color, textShadow: `${shadowX}px ${shadowY}px ${shadowB}px ${hexToRgba(shadowC, shadowO)}`, transition: 'all 0.3s ease', lineHeight: 1.2 }}>{text}</h2>
    </div>
  );
  const controls = (
    <>
      <FigmaTextInput label="Text Input" value={text} onChange={setText} />
      <FigmaSlider label="Font Size" min={12} max={120} value={size} onChange={setSize} />
      <FigmaSlider label="Font Weight" min={100} max={900} step={100} value={weight} onChange={setWeight} />
      <FigmaSlider label="Letter Spacing" min={-10} max={30} step={0.5} value={letter} onChange={setLetter} />
      <FigmaSelect label="Text Align" options={['left', 'center', 'right']} value={align} onChange={setAlign} />
      <FigmaColorPicker label="Text Color" hexValue={color} onChange={setColor} />
      <div className="mt-4 pt-4 border-t border-[#252526]">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Drop Shadow</h3>
        <FigmaSlider label="X Offset" min={-30} max={30} value={shadowX} onChange={setShadowX} />
        <FigmaSlider label="Y Offset" min={-30} max={30} value={shadowY} onChange={setShadowY} />
        <FigmaSlider label="Blur Radius" min={0} max={50} value={shadowB} onChange={setShadowB} />
        <FigmaSlider label="Opacity" min={0} max={1} step={0.05} value={shadowO} onChange={setShadowO} />
        <FigmaColorPicker label="Shadow Color" hexValue={shadowC} onChange={setShadowC} />
      </div>
    </>
  );
  return <WorkspaceLayout name="Typography" controls={controls} preview={preview} cssOutput={css} />;
};

// =========================================================================
// 4. TEXT GRADIENT PLUGIN
// =========================================================================
export const PluginTextGradient = () => {
  const [text, setText] = useState('Gradient.');
  const [size, setSize] = useState(64);
  const [weight, setWeight] = useState(900);
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState('#0ea5e9');
  const [color2, setColor2] = useState('#8b5cf6');

  const css = `.gradient-text {\n  font-size: ${size}px;\n  font-weight: ${weight};\n  background: linear-gradient(${angle}deg, ${color1}, ${color2});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  color: transparent;\n  display: inline-block;\n}`;
  
  const preview = (
     <div className="w-full text-center px-4 flex items-center justify-center relative overflow-visible">
       <h2 className="tracking-tighter transition-all duration-300" 
           style={{ 
              display: 'inline-block',
              fontSize: `${size}px`, 
              fontWeight: weight, 
              backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`, 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.2 
           }}>
           {text}
       </h2>
     </div>
  );
  
  const controls = (
     <>
       <FigmaTextInput label="Text Input" value={text} onChange={setText} />
       <FigmaSlider label="Font Size" min={24} max={150} value={size} onChange={setSize} unit="px" />
       <FigmaSlider label="Font Weight" min={100} max={900} step={100} value={weight} onChange={setWeight} />
       <div className="my-4 border-t border-[#252526] pt-4"></div>
       <FigmaSlider label="Angle" min={0} max={360} value={angle} onChange={setAngle} unit="°" />
       <FigmaColorPicker label="Start Color" hexValue={color1} onChange={setColor1} />
       <FigmaColorPicker label="End Color" hexValue={color2} onChange={setColor2} />
     </>
  );
  return <WorkspaceLayout name="Text Gradient" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};

// =========================================================================
// 5. GLASSMORPHISM PLUGIN
// =========================================================================
export const PluginGlassmorphism = () => {
   const [shape, setShape] = useState('box');
   const [color, setColor] = useState('#ffffff');
   const [opacity, setOpacity] = useState(0.15);
   const [blur, setBlur] = useState(12);
   const [outline, setOutline] = useState(0.2);

   const css = `.glass-panel {\n  background: ${hexToRgba(color, opacity)};\n  backdrop-filter: blur(${blur}px);\n  -webkit-backdrop-filter: blur(${blur}px);\n  border: 1px solid ${hexToRgba('#ffffff', outline)};\n  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px'};\n}`;
   const preview = (
     <div style={{
        width: shape === 'circle' ? '220px' : shape === 'pill' ? '320px' : '220px',
        height: shape === 'circle' ? '220px' : shape === 'pill' ? '100px' : '220px',
        borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px',
        background: hexToRgba(color, opacity),
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: `1px solid ${hexToRgba('#ffffff', outline)}`,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
     }} className="flex items-center justify-center transition-all duration-500 max-w-[90%] max-h-[90%]">
       <span className="text-white font-bold tracking-widest uppercase text-[10px]">Glass Effect</span>
     </div>
   );
   const controls = (
     <>
        <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
        <div className="my-4 border-t border-[#252526] pt-4"></div>
        <FigmaColorPicker label="Glass Tint Color" hexValue={color} onChange={setColor} />
        <FigmaSlider label="Opacity" min={0} max={1} step={0.05} value={opacity} onChange={setOpacity} />
        <FigmaSlider label="Blur Radius" min={0} max={50} value={blur} onChange={setBlur} unit="px" />
        <FigmaSlider label="Border Outline" min={0} max={1} step={0.05} value={outline} onChange={setOutline} />
     </>
   );
   return <WorkspaceLayout name="Glassmorphism" controls={controls} preview={preview} cssOutput={css} bgType="image" />;
};

// =========================================================================
// 6. NEUMORPHISM PLUGIN
// =========================================================================
export const PluginNeumorphism = () => {
   const [shape, setShape] = useState('box');
   const [neuBg, setNeuBg] = useState('#1e1e1e');
   const [distance, setDistance] = useState(8);
   const [blur, setBlur] = useState(16);
   const [intensity, setIntensity] = useState(0.15);
   const [neuType, setNeuType] = useState('flat');

   let inset = neuType === 'concave' ? 'inset ' : '';
   let lightShadow = `${inset}-${distance}px -${distance}px ${blur}px ${hexToRgba('#ffffff', intensity / 2)}`;
   let darkShadow = `${inset}${distance}px ${distance}px ${blur}px ${hexToRgba('#000000', intensity + 0.3)}`;
   let bgGradient = neuType === 'convex' ? `linear-gradient(145deg, ${hexToRgba(neuBg, 1.1)}, ${hexToRgba(neuBg, 0.9)})` : neuType === 'concave' ? `linear-gradient(145deg, ${hexToRgba(neuBg, 0.9)}, ${hexToRgba(neuBg, 1.1)})` : neuBg;

   const css = `.soft-ui {\n  background: ${neuType === 'flat' ? neuBg : bgGradient};\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px'};\n  box-shadow: ${darkShadow}, ${lightShadow};\n}`;
   
   const preview = (
     <div style={{
       width: shape === 'circle' ? '200px' : shape === 'pill' ? '300px' : '200px',
       height: shape === 'circle' ? '200px' : shape === 'pill' ? '100px' : '200px',
       borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px',
       background: bgGradient,
       boxShadow: `${darkShadow}, ${lightShadow}`
     }} className="flex items-center justify-center transition-all duration-500 max-w-[90%] max-h-[90%]">
       <span className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Soft UI</span>
     </div>
   );
   const controls = (
     <>
        <div className="p-2 mb-3 bg-[#3f3f46] border border-[#555] rounded text-[9px] text-slate-300 font-medium leading-relaxed">Penting: Warna Surface harus sama dengan warna latar belakang agar menyatu.</div>
        <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
        <FigmaSelect label="Light Direction" options={['flat', 'concave', 'convex']} value={neuType} onChange={setNeuType} />
        <div className="my-4 border-t border-[#252526] pt-4"></div>
        <FigmaColorPicker label="Surface Color" hexValue={neuBg} onChange={setNeuBg} />
        <FigmaSlider label="Distance" min={2} max={30} step={0.5} value={distance} onChange={setDistance} unit="px" />
        <FigmaSlider label="Blur Radius" min={0} max={60} step={0.5} value={blur} onChange={setBlur} unit="px" />
        <FigmaSlider label="Intensity" min={0.05} max={0.5} step={0.05} value={intensity} onChange={setIntensity} />
     </>
   );
   return <WorkspaceLayout name="Neumorphism" controls={controls} preview={preview} cssOutput={css} bgType="custom" bgHex={neuBg} />;
};

// =========================================================================
// 7. SMOOTH SHADOW PLUGIN
// =========================================================================
export const PluginShadow = () => {
   const [shape, setShape] = useState('box');
   const [layers, setLayers] = useState(4);
   const [y, setY] = useState(12);
   const [blur, setBlur] = useState(24);
   const [spread, setSpread] = useState(0);
   const [opacity, setOpacity] = useState(0.25);
   const [color, setColor] = useState('#000000');

   let shadows = [];
   for (let i = 1; i <= layers; i++) {
     shadows.push(`0 ${(y / layers) * i}px ${(blur / layers) * i}px ${(spread / layers) * i}px ${hexToRgba(color, Math.max(opacity - (i * 0.03), 0.02))}`);
   }
   const css = `.shadow-element {\n  background: #ffffff;\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px'};\n  box-shadow:\n    ${shadows.join(',\n    ')};\n}`;
   
   const preview = (
     <div style={{
       width: shape === 'circle' ? '180px' : shape === 'pill' ? '280px' : '180px',
       height: shape === 'circle' ? '180px' : shape === 'pill' ? '90px' : '180px',
       borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px',
       background: '#ffffff',
       boxShadow: shadows.join(', ')
     }} className="flex items-center justify-center transition-all duration-500">
       <span className="text-slate-800 font-bold tracking-widest uppercase text-[10px]">Shadow</span>
     </div>
   );
   const controls = (
     <>
       <FigmaSelect label="Shape Builder" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
       <div className="my-4 border-t border-[#252526] pt-4"></div>
       <FigmaSlider label="Smooth Layers" min={1} max={6} value={layers} onChange={setLayers} />
       <FigmaSlider label="Y Offset" min={-50} max={50} value={y} onChange={setY} unit="px" />
       <FigmaSlider label="Blur Radius" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
       <FigmaSlider label="Spread" min={-20} max={20} value={spread} onChange={setSpread} unit="px" />
       <FigmaSlider label="Opacity" min={0.05} max={1} step={0.05} value={opacity} onChange={setOpacity} />
       <FigmaColorPicker label="Shadow Color" hexValue={color} onChange={setColor} />
     </>
   );
   return <WorkspaceLayout name="Smooth Shadow" controls={controls} preview={preview} cssOutput={css} bgType="light" />;
};

// =========================================================================
// 8. NEON GLOW PLUGIN
// =========================================================================
export const PluginGlow = () => {
   const [shape, setShape] = useState('box');
   const [color, setColor] = useState('#0ea5e9');
   const [blur, setBlur] = useState(30);
   const [spread, setSpread] = useState(10);
   const [opacity, setOpacity] = useState(0.6);

   const css = `.neon-element {\n  background: #111111;\n  border: 1px solid ${hexToRgba(color, 0.5)};\n  border-radius: ${shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px'};\n  box-shadow: 0 0 ${blur}px ${spread}px ${hexToRgba(color, opacity)}, inset 0 0 15px ${hexToRgba(color, opacity * 0.5)};\n}`;
   
   const preview = (
     <div style={{
       width: shape === 'circle' ? '180px' : shape === 'pill' ? '280px' : '180px',
       height: shape === 'circle' ? '180px' : shape === 'pill' ? '90px' : '180px',
       borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px',
       background: '#111111',
       border: `1px solid ${hexToRgba(color, 0.5)}`,
       boxShadow: `0 0 ${blur}px ${spread}px ${hexToRgba(color, opacity)}, inset 0 0 15px ${hexToRgba(color, opacity * 0.5)}`
     }} className="flex items-center justify-center transition-all duration-500">
       <span className="text-white font-bold tracking-widest uppercase text-[10px]">Neon Glow</span>
     </div>
   );
   const controls = (
     <>
       <FigmaSelect label="Shape Builder" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
       <div className="my-4 border-t border-[#252526] pt-4"></div>
       <FigmaColorPicker label="Glow Color" hexValue={color} onChange={setColor} />
       <FigmaSlider label="Blur Radius" min={0} max={100} value={blur} onChange={setBlur} unit="px" />
       <FigmaSlider label="Spread Radius" min={-20} max={50} value={spread} onChange={setSpread} unit="px" />
       <FigmaSlider label="Opacity" min={0} max={1} step={0.05} value={opacity} onChange={setOpacity} />
     </>
   );
   return <WorkspaceLayout name="Neon Glow" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};

// =========================================================================
// 9. IMAGE FILTERS PLUGIN
// =========================================================================
export const PluginFilters = () => {
   const [blur, setBlur] = useState(0);
   const [brightness, setBrightness] = useState(100);
   const [contrast, setContrast] = useState(100);
   const [grayscale, setGrayscale] = useState(0);
   const [sepia, setSepia] = useState(0);

   const css = `.filter-image {\n  filter: blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%);\n  border-radius: 16px;\n}`;
   
   const preview = (
     <div className="w-[90%] max-w-[400px] aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
       <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop" alt="Filter preview" className="w-full h-full object-cover transition-all duration-300" style={{ filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%)` }} />
       <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white font-mono uppercase">Image Element</div>
     </div>
   );
   const controls = (
     <>
       <div className="p-2 mb-4 bg-[#3f3f46] border border-[#555] rounded text-[9px] text-slate-300 font-medium">Filter diterapkan ke elemen gambar utuh.</div>
       <FigmaSlider label="Blur" min={0} max={20} step={0.5} value={blur} onChange={setBlur} unit="px" />
       <FigmaSlider label="Brightness" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
       <FigmaSlider label="Contrast" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
       <FigmaSlider label="Grayscale" min={0} max={100} value={grayscale} onChange={setGrayscale} unit="%" />
       <FigmaSlider label="Sepia" min={0} max={100} value={sepia} onChange={setSepia} unit="%" />
     </>
   );
   return <WorkspaceLayout name="CSS Filters" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
};

// =========================================================================
// 10. 3D TRANSFORM PLUGIN
// =========================================================================
export const PluginTransform = () => {
   const [rotX, setRotX] = useState(20);
   const [rotY, setRotY] = useState(30);
   const [scale, setScale] = useState(1);
   const [persp, setPersp] = useState(1000);

   const css = `.transform-3d {\n  transform: perspective(${persp}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale});\n  background: linear-gradient(135deg, #0ea5e9, #3b82f6);\n  border-radius: 24px;\n  box-shadow: 0 30px 60px rgba(0,0,0,0.4);\n  transition: transform 0.3s ease;\n}`;
   
   const preview = (
     <div style={{ width: '180px', height: '180px', borderRadius: '24px', background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', transform: `perspective(${persp}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})` }} className="flex items-center justify-center transition-all duration-300">
       <span className="text-white font-bold tracking-widest uppercase text-xs">3D Shape</span>
     </div>
   );
   const controls = (
     <>
       <FigmaSlider label="Rotate X" min={-180} max={180} value={rotX} onChange={setRotX} unit="°" />
       <FigmaSlider label="Rotate Y" min={-180} max={180} value={rotY} onChange={setRotY} unit="°" />
       <FigmaSlider label="Scale (Zoom)" min={0.5} max={1.5} step={0.05} value={scale} onChange={setScale} />
       <FigmaSlider label="Perspective" min={200} max={2000} step={50} value={persp} onChange={setPersp} unit="px" />
     </>
   );
   return <WorkspaceLayout name="3D Transform" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};

// =========================================================================
// 11. CSS ANIMATION PLUGIN (22+ ANIMATIONS)
// =========================================================================

// Database 22 Animasi CSS Lengkap
const ANIMATION_LIST = [
  { id: 'float', name: 'Floating', timing: 'ease-in-out', keyframes: `@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}` },
  { id: 'pulse-glow', name: 'Pulse Glow', timing: 'ease-in-out', keyframes: `@keyframes pulse-glow {\n  0%, 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.5); }\n  50% { box-shadow: 0 0 40px 20px rgba(14, 165, 233, 0); }\n}` },
  { id: 'spin', name: 'Spin', timing: 'linear', keyframes: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}` },
  { id: 'bounce', name: 'Bounce', timing: 'ease-in-out', keyframes: `@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n  40% { transform: translateY(-30px); }\n  60% { transform: translateY(-15px); }\n}` },
  { id: 'shake', name: 'Shake', timing: 'linear', keyframes: `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\n  20%, 40%, 60%, 80% { transform: translateX(10px); }\n}` },
  { id: 'heartbeat', name: 'Heartbeat', timing: 'ease-in-out', keyframes: `@keyframes heartbeat {\n  0% { transform: scale(1); }\n  14% { transform: scale(1.3); }\n  28% { transform: scale(1); }\n  42% { transform: scale(1.3); }\n  70% { transform: scale(1); }\n}` },
  { id: 'flip-y', name: 'Flip Y', timing: 'ease-in-out', keyframes: `@keyframes flip-y {\n  0% { transform: perspective(400px) rotateY(0); }\n  100% { transform: perspective(400px) rotateY(360deg); }\n}` },
  { id: 'flip-x', name: 'Flip X', timing: 'ease-in-out', keyframes: `@keyframes flip-x {\n  0% { transform: perspective(400px) rotateX(0); }\n  100% { transform: perspective(400px) rotateX(360deg); }\n}` },
  { id: 'wobble', name: 'Wobble', timing: 'linear', keyframes: `@keyframes wobble {\n  0% { transform: translateX(0%); }\n  15% { transform: translateX(-25%) rotate(-5deg); }\n  30% { transform: translateX(20%) rotate(3deg); }\n  45% { transform: translateX(-15%) rotate(-3deg); }\n  60% { transform: translateX(10%) rotate(2deg); }\n  75% { transform: translateX(-5%) rotate(-1deg); }\n  100% { transform: translateX(0%); }\n}` },
  { id: 'jello', name: 'Jello', timing: 'linear', keyframes: `@keyframes jello {\n  0%, 11.1%, 100% { transform: translate3d(0,0,0); }\n  22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% { transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); }\n  88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); }\n}` },
  { id: 'rubber-band', name: 'Rubber Band', timing: 'linear', keyframes: `@keyframes rubber-band {\n  0% { transform: scale3d(1,1,1); }\n  30% { transform: scale3d(1.25, 0.75, 1); }\n  40% { transform: scale3d(0.75, 1.25, 1); }\n  50% { transform: scale3d(1.15, 0.85, 1); }\n  65% { transform: scale3d(0.95, 1.05, 1); }\n  75% { transform: scale3d(1.05, 0.95, 1); }\n  100% { transform: scale3d(1,1,1); }\n}` },
  { id: 'flash', name: 'Flash', timing: 'linear', keyframes: `@keyframes flash {\n  0%, 50%, 100% { opacity: 1; }\n  25%, 75% { opacity: 0; }\n}` },
  { id: 'swing', name: 'Swing', timing: 'ease-in-out', keyframes: `@keyframes swing {\n  20% { transform: rotate3d(0, 0, 1, 15deg); }\n  40% { transform: rotate3d(0, 0, 1, -10deg); }\n  60% { transform: rotate3d(0, 0, 1, 5deg); }\n  80% { transform: rotate3d(0, 0, 1, -5deg); }\n  100% { transform: rotate3d(0, 0, 1, 0deg); }\n}` },
  { id: 'tada', name: 'Tada', timing: 'linear', keyframes: `@keyframes tada {\n  0% { transform: scale3d(1, 1, 1); }\n  10%, 20% { transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }\n  30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }\n  40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }\n  100% { transform: scale3d(1, 1, 1); }\n}` },
  { id: 'zoom-in', name: 'Zoom In', timing: 'ease-in-out', keyframes: `@keyframes zoom-in {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.2); }\n}` },
  { id: 'zoom-out', name: 'Zoom Out', timing: 'ease-in-out', keyframes: `@keyframes zoom-out {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(0.8); }\n}` },
  { id: 'slide-up', name: 'Slide Up', timing: 'ease-in-out', keyframes: `@keyframes slide-up {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-50px); }\n}` },
  { id: 'slide-down', name: 'Slide Down', timing: 'ease-in-out', keyframes: `@keyframes slide-down {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(50px); }\n}` },
  { id: 'slide-left', name: 'Slide Left', timing: 'ease-in-out', keyframes: `@keyframes slide-left {\n  0%, 100% { transform: translateX(0); }\n  50% { transform: translateX(-50px); }\n}` },
  { id: 'slide-right', name: 'Slide Right', timing: 'ease-in-out', keyframes: `@keyframes slide-right {\n  0%, 100% { transform: translateX(0); }\n  50% { transform: translateX(50px); }\n}` },
  { id: 'pendulum', name: 'Pendulum', timing: 'ease-in-out', keyframes: `@keyframes pendulum {\n  0%, 100% { transform: rotate(-10deg); }\n  50% { transform: rotate(10deg); }\n}` },
  { id: 'rotate-scale', name: 'Rotate Scale', timing: 'linear', keyframes: `@keyframes rotate-scale {\n  0%, 100% { transform: rotate(0deg) scale(1); }\n  50% { transform: rotate(180deg) scale(1.2); }\n}` }
];

export const PluginAnimation = () => {
   const [type, setType] = useState('float');
   const [duration, setDuration] = useState(3);
   const [shape, setShape] = useState('box');

   const currentAnim = ANIMATION_LIST.find(a => a.id === type) || ANIMATION_LIST[0];

   const css = `.animated-element {\n  animation: ${currentAnim.id} ${duration}s infinite ${currentAnim.timing};\n}\n\n/* Include Keyframes below */\n${currentAnim.keyframes}`;
   
   const preview = (
     <>
       <style dangerouslySetInnerHTML={{__html: currentAnim.keyframes}} />
       <div style={{ 
         width: shape === 'circle' ? '160px' : shape === 'pill' ? '260px' : '160px', 
         height: shape === 'circle' ? '160px' : shape === 'pill' ? '80px' : '160px', 
         borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px', 
         background: 'linear-gradient(135deg, #18181b, #252526)', 
         border: '1px solid rgba(14, 165, 233, 0.3)', 
         animation: `${currentAnim.id} ${duration}s infinite ${currentAnim.timing}` 
       }} className="flex items-center justify-center overflow-hidden">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-[10px] text-center">{currentAnim.name}</span>
       </div>
     </>
   );
   
   const controls = (
     <>
       <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
       <div className="my-4 border-t border-[#252526] pt-4"></div>
       <div className="mb-4">
         <label className="text-[10px] font-medium text-slate-400 block mb-3">Animation Library (22+)</label>
         <div className="grid grid-cols-2 gap-1.5">
           {ANIMATION_LIST.map(anim => (
             <button 
                key={anim.id} 
                onClick={() => setType(anim.id)} 
                className={`px-2 py-2 rounded text-[9px] font-bold transition-all truncate border ${type === anim.id ? 'bg-[#3f3f46] text-white border-[#555] shadow-sm' : 'bg-[#111111] text-slate-500 border-[#252526] hover:bg-[#1a1a1c]'}`}
                title={anim.name}
              >
               {anim.name}
             </button>
           ))}
         </div>
       </div>
       <div className="my-4 border-t border-[#252526] pt-4"></div>
       <FigmaSlider label="Duration (s)" min={0.5} max={10} step={0.5} value={duration} onChange={setDuration} />
     </>
   );
   return <WorkspaceLayout name="CSS Animations" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};