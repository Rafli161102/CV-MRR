"use client";

import React, { useState, useEffect } from 'react';
import { PluginTip, FigmaSlider, FigmaColorPicker, FigmaSelect, FigmaTextInput, FigmaCustomDropdown, WorkspaceLayout, ControlHeader } from './ui';

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

  // ==========================================
  // STATE TAMBAHAN UNTUK FITUR AI
  // ==========================================
  const [aiPrompt, setAiPrompt] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

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

  // ==========================================
  // FUNGSI LOGIKA AI UNTUK MANIPULASI STATE
  // ==========================================
  const handleAIGenerate = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsLoadingAI(true);
    try {
      const sysPrompt = `Kamu adalah Expert UI/UX Designer. Balas HANYA dengan JSON murni untuk Hero Section. Struktur: {"h1": {"text": "...", "font": "...", "color": "..."}, "h2": {...}, "p": {...}}. Aturan: Pilihan font WAJIB: Inter, Roboto, Montserrat, Poppins, Playfair Display, Merriweather, Lora.`;
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, systemPrompt: sysPrompt })
      });
      const data = await res.json();
      if (data.result) {
        const cleanJSON = data.result.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJSON);
        if (parsed.h1) setH1(prev => ({ ...prev, ...parsed.h1 }));
        if (parsed.h2) setH2(prev => ({ ...prev, ...parsed.h2 }));
        if (parsed.p) setP(prev => ({ ...prev, ...parsed.p }));
        setAiPrompt('');
      }
    } catch (err) {
      alert("AI Gagal merespons. Pastikan API Route & Key sudah siap.");
    } finally {
      setIsLoadingAI(false);
    }
  };

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
    <div className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center overflow-hidden border border-white/5 bg-[#0a0a0a] rounded-xl touch-none">
      <div className="absolute top-2 left-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-black rounded-lg uppercase tracking-widest pointer-events-none z-10 shadow-sm">Interactive Canvas Mode</div>
      {renderInteractiveText(h1, 'h1')}{renderInteractiveText(h2, 'h2')}{renderInteractiveText(p, 'p', true)}
    </div>
  );

  const renderTextControls = (state, setState, isPara = false) => {
    const update = (key, val) => setState(prev => ({ ...prev, [key]: val }));
    return (
      <div className="animate-fade-in space-y-4 mt-2">
        <FigmaTextInput label="Isi Konten Teks" value={state.text} onChange={(v) => update('text', v)} placeholder="Ketik disini..." isTextArea={isPara} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <FigmaCustomDropdown label="Pilih Jenis Font" groups={FONTS_DATA} value={state.font} onChange={(v) => update('font', v)} />
           <FigmaColorPicker label="Warna Teks" hexValue={state.color} onChange={(v) => update('color', v)} />
        </div>
        <FigmaSlider label="Ukuran Font (Size)" min={10} max={100} value={state.size} onChange={(v) => update('size', v)} unit="px" />
        <FigmaSlider label="Jarak Huruf (Letter Spacing)" min={-5} max={20} step={0.5} value={state.space} onChange={(v) => update('space', v)} unit="px" />
        <FigmaSlider label="Rotasi (Rotate)" min={-180} max={180} value={state.rot} onChange={(v) => update('rot', v)} unit="°" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1f1f1f]">
          <FigmaSelect label="Perataan (Alignment)" options={['left', 'center', 'right', 'justify']} value={state.align} onChange={(v) => update('align', v)} />
          <FigmaSelect label="Huruf Kapital (Transform)" options={['none', 'uppercase', 'lowercase', 'capitalize']} value={state.trans} onChange={(v) => update('trans', v)} />
        </div>
      </div>
    );
  };

  const controls = (
    <div className="space-y-1">
      {/* BOX INPUT AI BARU */}
      <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-3xl p-5 mb-6">
        <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">✨ AI Designer</h3>
        <form onSubmit={handleAIGenerate} className="flex gap-2">
          <input type="text" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Tulis tema desain..." className="flex-1 bg-black/40 border border-slate-700/50 rounded-xl px-4 text-xs text-white outline-none focus:border-cyan-500 transition-all" />
          <button type="submit" disabled={isLoadingAI || !aiPrompt} className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-[10px] uppercase transition-all shrink-0">
            {isLoadingAI ? "..." : "Generate"}
          </button>
        </form>
      </div>

      <PluginTip title="TUTORIAL: INTERACTIVE TYPO" text="1. Sentuh dan geser (Drag & Drop) teks apa saja di kanvas hitam di atas untuk mengatur tata letaknya secara presisi. Koordinat geseran akan otomatis ditulis ke dalam kode CSS! 2. Gunakan Hierarki: Heading harus besar & tebal, Subheading sedang, dan Paragraf kecil & tipis. Tambahkan jarak huruf (Letter Spacing) jika menggunakan efek Uppercase agar teks terlihat mewah." />
      <div className="flex bg-[#050505] p-1.5 rounded-2xl border border-[#1f1f1f] w-full mb-6 shadow-inner">
        {['Heading', 'Subheading', 'Paragraph'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all ${tab === t ? 'bg-[#1a1a1a] text-cyan-400 shadow-md border border-[#333]' : 'text-slate-500 hover:text-slate-300'}`}>{t}</button>
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
