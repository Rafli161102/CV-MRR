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
      <div className="my-4 border-t border-[#252526] pt-4"></div>
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

  const css = `.gradient-text {\n  font-size: ${size}px;\n  font-weight: ${weight};\n  background-image: linear-gradient(${angle}deg, ${color1}, ${color2});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  color: transparent;\n  display: inline-block;\n}`;
  
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
// 9. IMAGE FILTERS PLUGIN (LIGHTROOM EDITION)
// =========================================================================
export const PluginFilters = () => {
   // State untuk mengatur gambar kustom dari user
   const [imgUrl, setImgUrl] = useState('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop');
   
   // State untuk kontrol filter
   const [blurEnabled, setBlurEnabled] = useState(false);
   const [blur, setBlur] = useState(0);
   const [brightness, setBrightness] = useState(100);
   const [contrast, setContrast] = useState(100);
   const [grayscale, setGrayscale] = useState(0);
   const [sepia, setSepia] = useState(0);

   // Filter resetter
   const handleReset = () => {
      setBlurEnabled(false);
      setBlur(0);
      setBrightness(100);
      setContrast(100);
      setGrayscale(0);
      setSepia(0);
   };

   // CSS Generator
   const css = `.filter-image {\n  filter: ${blurEnabled ? `blur(${blur}px) ` : ''}brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%);\n  border-radius: 16px;\n}`;
   
   // Preview
   const preview = (
     <div className="w-[90%] max-w-[500px] aspect-video rounded-2xl overflow-hidden shadow-2xl relative border border-white/10">
       <img 
          src={imgUrl || 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop'} 
          alt="Filter preview" 
          className="w-full h-full object-cover transition-all duration-300" 
          style={{ filter: `${blurEnabled ? `blur(${blur}px) ` : ''}brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%)` }} 
          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800'}
        />
       <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white font-mono uppercase">IMAGE ELEMENT</div>
     </div>
   );

   // Lightroom-style Controls
   const controls = (
     <>
       <div className="flex items-center justify-between mb-4">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image Source</label>
          <button onClick={handleReset} className="text-[9px] text-cyan-400 hover:text-cyan-300 px-2 py-1 bg-cyan-900/30 rounded border border-cyan-800/50">Reset Filters</button>
       </div>
       <FigmaTextInput label="Custom Image URL" value={imgUrl} onChange={setImgUrl} />
       
       <div className="my-4 border-t border-[#252526] pt-4"></div>
       <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Color Grading</div>
       
       <FigmaSlider label="Brightness" min={0} max={200} value={brightness} onChange={setBrightness} unit="%" />
       <FigmaSlider label="Contrast" min={0} max={200} value={contrast} onChange={setContrast} unit="%" />
       <FigmaSlider label="Grayscale" min={0} max={100} value={grayscale} onChange={setGrayscale} unit="%" />
       <FigmaSlider label="Sepia" min={0} max={100} value={sepia} onChange={setSepia} unit="%" />
       
       <div className="mt-4 pt-4 border-t border-[#252526]">
          <div className="flex items-center justify-between mb-3">
             <label className="text-[10px] font-medium text-slate-400">Enable Blur</label>
             <input type="checkbox" checked={blurEnabled} onChange={(e) => setBlurEnabled(e.target.checked)} className="accent-cyan-500 cursor-pointer" />
          </div>
          {blurEnabled && <FigmaSlider label="Blur Radius" min={0} max={20} step={0.5} value={blur} onChange={setBlur} unit="px" />}
       </div>
     </>
   );
   return <WorkspaceLayout name="Image Filters" controls={controls} preview={preview} cssOutput={css} bgType="grid" />;
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
// 11. CSS ANIMATION PLUGIN
// =========================================================================
// Database 45 Animasi CSS Lengkap yang Dikategorikan
const ANIMATION_LIST = [
  // 1. BASE
  { id: 'float', name: 'Floating', cat: 'Base', timing: 'ease-in-out', keyframes: `@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}` },
  { id: 'pulse-glow', name: 'Pulse Glow', cat: 'Base', timing: 'ease-in-out', keyframes: `@keyframes pulse-glow {\n  0%, 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.5); }\n  50% { box-shadow: 0 0 40px 20px rgba(14, 165, 233, 0); }\n}` },
  { id: 'spin', name: 'Spin', cat: 'Base', timing: 'linear', keyframes: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}` },
  { id: 'spin-reverse', name: 'Spin Rev', cat: 'Base', timing: 'linear', keyframes: `@keyframes spin-reverse {\n  from { transform: rotate(360deg); }\n  to { transform: rotate(0deg); }\n}` },
  { id: 'breathe', name: 'Breathe', cat: 'Base', timing: 'ease-in-out', keyframes: `@keyframes breathe {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.05); }\n}` },
  { id: 'seesaw', name: 'Seesaw', cat: 'Base', timing: 'ease-in-out', keyframes: `@keyframes seesaw {\n  0%, 100% { transform: rotate(0deg); }\n  25% { transform: rotate(5deg); }\n  75% { transform: rotate(-5deg); }\n}` },
  
  // 2. ATTENTION SEEKERS
  { id: 'bounce', name: 'Bounce', cat: 'Attention', timing: 'ease', keyframes: `@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n  40% { transform: translateY(-30px); }\n  60% { transform: translateY(-15px); }\n}` },
  { id: 'flash', name: 'Flash', cat: 'Attention', timing: 'ease', keyframes: `@keyframes flash {\n  0%, 50%, 100% { opacity: 1; }\n  25%, 75% { opacity: 0; }\n}` },
  { id: 'shake-x', name: 'Shake X', cat: 'Attention', timing: 'ease-in-out', keyframes: `@keyframes shake-x {\n  0%, 100% { transform: translateX(0); }\n  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\n  20%, 40%, 60%, 80% { transform: translateX(10px); }\n}` },
  { id: 'shake-y', name: 'Shake Y', cat: 'Attention', timing: 'ease-in-out', keyframes: `@keyframes shake-y {\n  0%, 100% { transform: translateY(0); }\n  10%, 30%, 50%, 70%, 90% { transform: translateY(-10px); }\n  20%, 40%, 60%, 80% { transform: translateY(10px); }\n}` },
  { id: 'rubber-band', name: 'Rubber Band', cat: 'Attention', timing: 'ease-in-out', keyframes: `@keyframes rubber-band {\n  0% { transform: scale(1); }\n  30% { transform: scaleX(1.25) scaleY(0.75); }\n  40% { transform: scaleX(0.75) scaleY(1.25); }\n  50% { transform: scaleX(1.15) scaleY(0.85); }\n  65% { transform: scaleX(0.95) scaleY(1.05); }\n  75% { transform: scaleX(1.05) scaleY(0.95); }\n  100% { transform: scale(1); }\n}` },
  { id: 'tada', name: 'Tada', cat: 'Attention', timing: 'ease-in-out', keyframes: `@keyframes tada {\n  0% { transform: scale(1); }\n  10%, 20% { transform: scale(0.9) rotate(-3deg); }\n  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }\n  40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }\n  100% { transform: scale(1); }\n}` },
  { id: 'wobble', name: 'Wobble', cat: 'Attention', timing: 'ease-in-out', keyframes: `@keyframes wobble {\n  0% { transform: translateX(0%); }\n  15% { transform: translateX(-25%) rotate(-5deg); }\n  30% { transform: translateX(20%) rotate(3deg); }\n  45% { transform: translateX(-15%) rotate(-3deg); }\n  60% { transform: translateX(10%) rotate(2deg); }\n  75% { transform: translateX(-5%) rotate(-1deg); }\n  100% { transform: translateX(0%); }\n}` },
  { id: 'heartbeat', name: 'Heartbeat', cat: 'Attention', timing: 'ease-in-out', keyframes: `@keyframes heartbeat {\n  0% { transform: scale(1); }\n  14% { transform: scale(1.3); }\n  28% { transform: scale(1); }\n  42% { transform: scale(1.3); }\n  70% { transform: scale(1); }\n}` },
  { id: 'swing', name: 'Swing', cat: 'Attention', timing: 'ease-in-out', keyframes: `@keyframes swing {\n  20% { transform: rotate(15deg); }\n  40% { transform: rotate(-10deg); }\n  60% { transform: rotate(5deg); }\n  80% { transform: rotate(-5deg); }\n  100% { transform: rotate(0deg); }\n}` },
  { id: 'jello', name: 'Jello', cat: 'Attention', timing: 'ease-in-out', keyframes: `@keyframes jello {\n  0%, 11.1%, 100% { transform: translate(0,0); }\n  22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% { transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); }\n  88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); }\n}` },

  // 3. ENTRANCES
  { id: 'fade-in', name: 'Fade In', cat: 'Entrance', timing: 'ease-in', keyframes: `@keyframes fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}` },
  { id: 'fade-in-up', name: 'Fade In Up', cat: 'Entrance', timing: 'ease-out', keyframes: `@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}` },
  { id: 'fade-in-down', name: 'Fade In Down', cat: 'Entrance', timing: 'ease-out', keyframes: `@keyframes fade-in-down {\n  from { opacity: 0; transform: translateY(-20px); }\n  to { opacity: 1; transform: translateY(0); }\n}` },
  { id: 'zoom-in', name: 'Zoom In', cat: 'Entrance', timing: 'ease-out', keyframes: `@keyframes zoom-in {\n  from { opacity: 0; transform: scale(0.5); }\n  to { opacity: 1; transform: scale(1); }\n}` },
  { id: 'zoom-in-up', name: 'Zoom In Up', cat: 'Entrance', timing: 'ease-out', keyframes: `@keyframes zoom-in-up {\n  from { opacity: 0; transform: scale(0.5) translateY(50px); }\n  to { opacity: 1; transform: scale(1) translateY(0); }\n}` },
  { id: 'slide-in-left', name: 'Slide Left', cat: 'Entrance', timing: 'ease-out', keyframes: `@keyframes slide-in-left {\n  from { transform: translateX(-100%); }\n  to { transform: translateX(0); }\n}` },
  { id: 'slide-in-right', name: 'Slide Right', cat: 'Entrance', timing: 'ease-out', keyframes: `@keyframes slide-in-right {\n  from { transform: translateX(100%); }\n  to { transform: translateX(0); }\n}` },
  { id: 'bounce-in', name: 'Bounce In', cat: 'Entrance', timing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes: `@keyframes bounce-in {\n  0% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }\n  20% { transform: scale3d(1.1, 1.1, 1.1); }\n  40% { transform: scale3d(0.9, 0.9, 0.9); }\n  60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }\n  80% { transform: scale3d(0.97, 0.97, 0.97); }\n  100% { opacity: 1; transform: scale3d(1, 1, 1); }\n}` },

  // 4. EXITS
  { id: 'fade-out', name: 'Fade Out', cat: 'Exit', timing: 'ease-out', keyframes: `@keyframes fade-out {\n  from { opacity: 1; }\n  to { opacity: 0; }\n}` },
  { id: 'fade-out-up', name: 'Fade Out Up', cat: 'Exit', timing: 'ease-in', keyframes: `@keyframes fade-out-up {\n  from { opacity: 1; transform: translateY(0); }\n  to { opacity: 0; transform: translateY(-20px); }\n}` },
  { id: 'fade-out-down', name: 'Fade Out Down', cat: 'Exit', timing: 'ease-in', keyframes: `@keyframes fade-out-down {\n  from { opacity: 1; transform: translateY(0); }\n  to { opacity: 0; transform: translateY(20px); }\n}` },
  { id: 'zoom-out', name: 'Zoom Out', cat: 'Exit', timing: 'ease-in', keyframes: `@keyframes zoom-out {\n  from { opacity: 1; transform: scale(1); }\n  to { opacity: 0; transform: scale(0.5); }\n}` },
  { id: 'slide-out-left', name: 'Slide Left', cat: 'Exit', timing: 'ease-in', keyframes: `@keyframes slide-out-left {\n  from { transform: translateX(0); }\n  to { transform: translateX(-100%); }\n}` },
  { id: 'slide-out-right', name: 'Slide Right', cat: 'Exit', timing: 'ease-in', keyframes: `@keyframes slide-out-right {\n  from { transform: translateX(0); }\n  to { transform: translateX(100%); }\n}` },
  { id: 'bounce-out', name: 'Bounce Out', cat: 'Exit', timing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes: `@keyframes bounce-out {\n  20% { transform: scale3d(0.9, 0.9, 0.9); }\n  50%, 55% { opacity: 1; transform: scale3d(1.1, 1.1, 1.1); }\n  100% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }\n}` },

  // 5. ROTATING & FLIPPING
  { id: 'flip-x', name: 'Flip X', cat: 'Rotate', timing: 'ease-in-out', keyframes: `@keyframes flip-x {\n  0% { transform: perspective(400px) rotateX(0); }\n  100% { transform: perspective(400px) rotateX(360deg); }\n}` },
  { id: 'flip-y', name: 'Flip Y', cat: 'Rotate', timing: 'ease-in-out', keyframes: `@keyframes flip-y {\n  0% { transform: perspective(400px) rotateY(0); }\n  100% { transform: perspective(400px) rotateY(360deg); }\n}` },
  { id: 'rotate-in', name: 'Rotate In', cat: 'Rotate', timing: 'ease-out', keyframes: `@keyframes rotate-in {\n  from { transform: rotate(-200deg); opacity: 0; }\n  to { transform: translate3d(0, 0, 0); opacity: 1; }\n}` },
  { id: 'rotate-out', name: 'Rotate Out', cat: 'Rotate', timing: 'ease-in', keyframes: `@keyframes rotate-out {\n  from { transform: translate3d(0, 0, 0); opacity: 1; }\n  to { transform: rotate(200deg); opacity: 0; }\n}` },
  { id: 'roll-in', name: 'Roll In', cat: 'Rotate', timing: 'ease-out', keyframes: `@keyframes roll-in {\n  from { opacity: 0; transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); }\n  to { opacity: 1; transform: translate3d(0, 0, 0); }\n}` },
  { id: 'roll-out', name: 'Roll Out', cat: 'Rotate', timing: 'ease-in', keyframes: `@keyframes roll-out {\n  from { opacity: 1; transform: translate3d(0, 0, 0); }\n  to { opacity: 0; transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); }\n}` },

  // 6. SPECIALS
  { id: 'hinge', name: 'Hinge', cat: 'Special', timing: 'ease-in-out', keyframes: `@keyframes hinge {\n  0% { transform-origin: top left; }\n  20%, 60% { transform: rotate(80deg); transform-origin: top left; }\n  40%, 80% { transform: rotate(60deg); transform-origin: top left; opacity: 1; }\n  to { transform: translateY(700px); opacity: 0; }\n}` },
  { id: 'jack-in-the-box', name: 'Jack In Box', cat: 'Special', timing: 'ease-out', keyframes: `@keyframes jack-in-the-box {\n  from { opacity: 0; transform: scale(0.1) rotate(30deg); transform-origin: center bottom; }\n  50% { transform: rotate(-10deg); }\n  70% { transform: rotate(3deg); }\n  to { opacity: 1; transform: scale(1); }\n}` },
  { id: 'light-speed-in', name: 'Light In', cat: 'Special', timing: 'ease-out', keyframes: `@keyframes light-speed-in {\n  from { transform: translateX(100%) skewX(-30deg); opacity: 0; }\n  60% { transform: skewX(20deg); opacity: 1; }\n  80% { transform: skewX(-5deg); }\n  to { transform: translate(0); }\n}` },
  { id: 'light-speed-out', name: 'Light Out', cat: 'Special', timing: 'ease-in', keyframes: `@keyframes light-speed-out {\n  from { opacity: 1; }\n  to { transform: translateX(100%) skewX(30deg); opacity: 0; }\n}` },
  { id: 'drop', name: 'Drop', cat: 'Special', timing: 'ease-in', keyframes: `@keyframes drop {\n  0% { transform: translateY(-200px); opacity: 0; }\n  50% { transform: translateY(0); opacity: 1; }\n  65% { transform: translateY(-15px); }\n  100% { transform: translateY(0); }\n}` },
  { id: 'blur-in', name: 'Blur In', cat: 'Special', timing: 'ease-out', keyframes: `@keyframes blur-in {\n  from { filter: blur(20px); opacity: 0; }\n  to { filter: blur(0); opacity: 1; }\n}` },
  { id: 'blur-out', name: 'Blur Out', cat: 'Special', timing: 'ease-in', keyframes: `@keyframes blur-out {\n  from { filter: blur(0); opacity: 1; }\n  to { filter: blur(20px); opacity: 0; }\n}` }
];

export const PluginAnimation = () => {
   const [type, setType] = useState('float');
   const [duration, setDuration] = useState(3);
   const [shape, setShape] = useState('box');
   const [activeCat, setActiveCat] = useState('Base');

   // Temukan data animasi saat ini
   const currentAnim = ANIMATION_LIST.find(a => a.id === type) || ANIMATION_LIST[0];

   // Hanya render keyframes yang SEDANG aktif (Mencegah ratusan baris CSS menumpuk di Output)
   const css = `.animated-element {\n  animation: ${currentAnim.id} ${duration}s infinite ${currentAnim.timing};\n}\n\n/* Keyframes Khusus ${currentAnim.name} */\n${currentAnim.keyframes}`;
   
constnsconstt preview = (
     <>
       {/* Inject Keyframes langsung ke DOM */}
       <style dangerouslySetInnerHTML={{__html: currentAnim.keyframes}} />
       
       <div style={{ 
         width: shape === 'circle' ? '160px' : shape === 'pill' ? '260px' : '160px', 
         height: shape === 'circle' ? '160px' : shape === 'pill' ? '80px' : '160px', 
         borderRadius: shape === 'circle' ? '50%' : shape === 'pill' ? '50px' : '24px', 
         background: 'linear-gradient(135deg, #18181b, #252526)', 
         border: '1px solid rgba(14, 165, 233, 0.3)', 
         animation: `${currentAnim.id} ${duration}s infinite ${currentAnim.timing}` 
       }} className="flex items-center justify-center overflow-hidden shadow-lg">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-[10px] text-center px-4">{currentAnim.name}</span>
       </div>
     </>
   );

   const categories = [...new Set(ANIMATION_LIST.map(a => a.cat))];
   
   const controls = (
     <>
       <FigmaSelect label="Target Shape" options={['box', 'circle', 'pill']} value={shape} onChange={setShape} />
       <div className="my-4 border-t border-[#252526] pt-4"></div>
       
       <div className="mb-4">
         <label className="text-[10px] font-medium text-slate-400 block mb-3">Animation Library (45+)</label>
         
         {/* Category Navigation Tabs */}
         <div className="flex overflow-x-auto gap-2 pb-2 mb-3 border-b border-[#252526] custom-scroll">
           {categories.map(cat => (
             <button 
                key={cat} 
                onClick={() => setActiveCat(cat)} 
                className={`text-[9px] font-bold px-1 pb-1.5 whitespace-nowrap border-b-2 transition-all ${activeCat === cat ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
               {cat}
             </button>
           ))}
         </div>

         {/* Animasi Buttons Grid */}
         <div className="grid grid-cols-2 gap-1.5 mt-2">
           {ANIMATION_LIST.filter(a => a.cat === activeCat).map(anim => (
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
       <FigmaSlider label="Duration (s)" min={0.5} max={10} step={0.1} value={duration} onChange={setDuration} />
     </>
   );
   return <WorkspaceLayout name="CSS Animations" controls={controls} preview={preview} cssOutput={css} bgType="dark" />;
};