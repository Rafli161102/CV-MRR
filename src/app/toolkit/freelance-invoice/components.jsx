import React from 'react';

// ==========================================
// 1. IKON SVG (Ditambah Ikon RAB/Clipboard)
// ==========================================
export const Icons = {
  Calculator: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm3.75-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm-7.5-12h7.5A2.25 2.25 0 0121 4.5v15a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 019 19.5v-15A2.25 2.25 0 0111.25 2.25z" /></svg>,
  Document: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  Rab: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>,
  Print: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.588-4.138c.48.061.96.115 1.44.16m-1.44-.16l-3.36 3.36m3.36-3.36l3.36 3.36m-9.504 4.148c-.24-.03-.48-.062-.724-.092m9.504 0c.24.03.48.062.724.092m-9.504 0C5.138 17.5 4 16.5 4 15.25V12.75A2.25 2.25 0 016.25 10.5h11.5A2.25 2.25 0 0120 12.75v2.5c0 1.25-1.138 2.25-2.5 2.25m-9.504 0C7.325 17.584 8.1 18.5 9.25 18.5h5.5c1.15 0 1.925-.916 2.05-2.021m-9.504 0H6.72m6.588-4.138c.48.061.96.115 1.44.16m-1.44-.16l-3.36 3.36m3.36-3.36l3.36 3.36m-1.44-4.66L12 4.5m0 0l-3.36 3.36M12 4.5v9.5" /></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Image: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  Layout: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6A1.125 1.125 0 012.25 10.875v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.375 14.25c-.621 0-1.125.504-1.125 1.125v3.75c0 .621.504 1.125 1.125 1.125h6c.621 0 1.125-.504 1.125-1.125v-3.75c0-.621-.504-1.125-1.125-1.125h-6z" /></svg>,
  Palette: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" /></svg>,
  Signature: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.12l-2.827.942a.75.75 0 01-.95-.95l.942-2.827a4.5 4.5 0 011.12-1.89l13.635-13.731zm0 0L19.5 7.125" /></svg>
};

// ==========================================
// 2. FUNGSI HELPER / FORMATTER
// ==========================================
export const formatCurrency = (number, currencyCode) => {
  if (!number) return "0";
  if (currencyCode === "USD") return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
  if (currencyCode === "EUR") return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(number);
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);
};

export const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const hexToHue = (hex) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) { r = parseInt(hex[1] + hex[1], 16); g = parseInt(hex[2] + hex[2], 16); b = parseInt(hex[3] + hex[3], 16); } 
  else if (hex.length === 7) { r = parseInt(hex.substring(1, 3), 16); g = parseInt(hex.substring(3, 5), 16); b = parseInt(hex.substring(5, 7), 16); }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return h * 360;
};

// ==========================================
// 3. UI COMPONENTS REUSABLE
// ==========================================
export const CleanInput = ({ label, name, type = "text", value, onChange, placeholder = "", prefix = "", isTextarea = false }) => (
  <div className="relative group w-full">
    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
    <div className={`flex items-start bg-[#0d1424]/40 border-b border-slate-700/50 group-hover:border-cyan-500/50 transition-colors focus-within:border-cyan-400 focus-within:bg-[#0d1424]/80 px-4 py-2.5 rounded-t-xl`}>
      {prefix && <span className="text-slate-500 font-bold mr-2 text-sm mt-0.5">{prefix}</span>}
      {isTextarea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={2} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600 transition-all font-medium resize-none" />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600 transition-all font-medium" />
      )}
    </div>
  </div>
);

export const CleanSelect = ({ label, name, value, onChange, options }) => (
  <div className="relative group w-full">
    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
    <div className="flex items-center bg-[#0d1424]/40 border-b border-slate-700/50 group-hover:border-cyan-500/50 transition-colors focus-within:border-cyan-400 focus-within:bg-[#0d1424]/80 px-4 py-2.5 rounded-t-xl">
      <select name={name} value={value} onChange={onChange} className="w-full bg-transparent text-sm text-white outline-none cursor-pointer appearance-none font-medium">
        {options.map((opt, i) => <option key={i} value={opt.value} className="bg-slate-900 text-white">{opt.label}</option>)}
      </select>
    </div>
  </div>
);

export const CustomColorSlider = ({ color, onChange }) => {
  const hue = hexToHue(color) || 0;
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="relative w-full h-8 rounded-xl overflow-hidden border border-white/10 shadow-inner" style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}>
        <div className="absolute top-0 bottom-0 w-4 bg-white border-2 border-slate-900 rounded-md shadow-md pointer-events-none transition-transform duration-75" style={{ left: `clamp(0px, calc(${(hue / 360) * 100}% - 8px), calc(100% - 16px))` }} />
        <input type="range" min="0" max="360" value={hue} onChange={(e) => onChange(hslToHex(e.target.value, 100, 50))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      </div>
      <div className="flex justify-between items-center bg-[#141414] rounded-xl px-4 py-2 border border-white/5">
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Warna Terpilih</span>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: color }}></span>
          <span className="text-xs font-mono font-black text-white">{color.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
