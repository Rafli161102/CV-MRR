"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// =========================================================================
// KOMPONEN IKON SVG (Aman untuk Vercel SSR)
// =========================================================================
const IconCalc = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm3.75-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm-7.5-12h7.5A2.25 2.25 0 0121 4.5v15a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 019 19.5v-15A2.25 2.25 0 0111.25 2.25z" /></svg>;
const IconDoc = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const IconPrint = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.588-4.138c.48.061.96.115 1.44.16m-1.44-.16l-3.36 3.36m3.36-3.36l3.36 3.36m-9.504 4.148c-.24-.03-.48-.062-.724-.092m9.504 0c.24.03.48.062.724.092m-9.504 0C5.138 17.5 4 16.5 4 15.25V12.75A2.25 2.25 0 016.25 10.5h11.5A2.25 2.25 0 0120 12.75v2.5c0 1.25-1.138 2.25-2.5 2.25m-9.504 0C7.325 17.584 8.1 18.5 9.25 18.5h5.5c1.15 0 1.925-.916 2.05-2.021m-9.504 0H6.72m6.588-4.138c.48.061.96.115 1.44.16m-1.44-.16l-3.36 3.36m3.36-3.36l3.36 3.36m-1.44-4.66L12 4.5m0 0l-3.36 3.36M12 4.5v9.5" /></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
const IconLeft = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>;
const IconImage = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;
const IconLayout = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6A1.125 1.125 0 012.25 10.875v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.375 14.25c-.621 0-1.125.504-1.125 1.125v3.75c0 .621.504 1.125 1.125 1.125h6c.621 0 1.125-.504 1.125-1.125v-3.75c0-.621-.504-1.125-1.125-1.125h-6z" /></svg>;
const IconPalette = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" /></svg>;

// =========================================================================
// ALGORITMA KONVERSI & FORMATTER
// =========================================================================
const formatCurrency = (number, currencyCode) => {
  if (!number) return "0";
  if (currencyCode === "USD") return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
  if (currencyCode === "EUR") return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(number);
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);
};

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// =========================================================================
// KOMPONEN UI EKSTERNAL (Anti Keyboard Hilang)
// =========================================================================
const CleanInput = ({ label, name, type = "text", value, onChange, placeholder = "", prefix = "" }) => (
  <div className="relative group w-full">
    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
    <div className="flex items-center bg-[#0d1424]/40 border-b border-slate-700/50 group-hover:border-cyan-500/50 transition-colors focus-within:border-cyan-400 focus-within:bg-[#0d1424]/80 px-4 py-2.5 rounded-t-xl">
      {prefix && <span className="text-slate-500 font-bold mr-2 text-sm">{prefix}</span>}
      <input 
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600 transition-all font-medium" 
      />
    </div>
  </div>
);

const CleanSelect = ({ label, name, value, onChange, options }) => (
  <div className="relative group w-full">
    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
    <div className="flex items-center bg-[#0d1424]/40 border-b border-slate-700/50 group-hover:border-cyan-500/50 transition-colors focus-within:border-cyan-400 focus-within:bg-[#0d1424]/80 px-4 py-2.5 rounded-t-xl">
      <select name={name} value={value} onChange={onChange} className="w-full bg-transparent text-sm text-white outline-none cursor-pointer appearance-none font-medium">
        {options.map((opt, i) => <option key={i} value={opt.value} className="bg-slate-900 text-white">{opt.label}</option>)}
      </select>
    </div>
  </div>
);

const CustomColorSlider = ({ color, onChange }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="relative w-full h-6 rounded-lg overflow-hidden border border-white/10" style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}>
        <input 
          type="range" min="0" max="360" defaultValue="190"
          onChange={(e) => onChange(hslToHex(e.target.value, 100, 50))} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
      </div>
      <div className="flex justify-between items-center bg-[#141414] rounded-lg px-3 py-1.5 border border-white/5">
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Geser & Pilih Warna</span>
        <span className="text-xs font-mono font-black" style={{ color: color }}>{color.toUpperCase()}</span>
      </div>
    </div>
  );
};

// =========================================================================
// KOMPONEN UTAMA INVOICE STUDIO
// =========================================================================
export default function InvoiceStudio() {
  const [activeTab, setActiveTab] = useState('invoice'); 

  // STATE: RATE CALCULATOR
  const [calcMode, setCalcMode] = useState('monthly'); 
  const [targetAmount, setTargetAmount] = useState("");
  const [expenses, setExpenses] = useState("");
  const [workDays, setWorkDays] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [profitMargin, setProfitMargin] = useState(20);
  const [experienceLevel, setExperienceLevel] = useState("1"); 

  const numTarget = Number(targetAmount) || 0;
  const numExpenses = Number(expenses) || 0;
  const numWorkDays = Number(workDays) || 0;
  const numWorkHours = Number(workHours) || 0;
  const multiplier = Number(experienceLevel) || 1;

  const totalNeed = numTarget + numExpenses;
  const totalHours = calcMode === 'monthly' ? (numWorkDays * numWorkHours) : numWorkHours;
  
  const baseHourlyRate = totalHours > 0 ? totalNeed / totalHours : 0;
  const marginHourlyRate = baseHourlyRate + (baseHourlyRate * (profitMargin / 100));
  const finalHourlyRate = marginHourlyRate * multiplier;
  const finalDailyRate = calcMode === 'monthly' ? (finalHourlyRate * numWorkHours) : 0;
  const finalProjectTotal = calcMode === 'project' ? (finalHourlyRate * totalHours) : 0;

  // STATE: INVOICE GENERATOR
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "",
    date: "", // Dikosongkan agar aman dari Hydration Mismatch di Next.js
    dueDate: "",
    myName: "",
    myRole: "",
    myEmail: "",
    myPhone: "",
    clientName: "",
    clientAddress: "",
    bankName: "",
    accName: "",
    accNumber: "",
    taxRate: "",
    discount: "",
    notes: "",
    status: "UNPAID", 
  });

  // Efek untuk mengisi tanggal hari ini secara aman di sisi Client
  useEffect(() => {
    setInvoiceData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const [currency, setCurrency] = useState("IDR");
  const [themeColor, setThemeColor] = useState("#0891b2"); 
  const [template, setTemplate] = useState(1); 
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([{ id: 1, description: "", qty: 1, price: "" }]);
  const presetColors = ["#0891b2", "#2563eb", "#4f46e5", "#059669", "#e11d48", "#1e293b", "#f59e0b", "#9333ea"];
  
  const handleInvoiceChange = (e) => setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  const handleItemChange = (id, field, value) => setItems(items.map(item => item.id === id ? { ...item, [field]: field === 'description' ? value : value } : item));
  const addItem = () => setItems([...items, { id: Date.now(), description: "", qty: 1, price: "" }]);
  const removeItem = (id) => setItems(items.filter(item => item.id !== id));

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => setLogo(null);

  const subTotal = items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0);
  const taxAmount = subTotal * (Number(invoiceData.taxRate) / 100);
  const discountAmount = Number(invoiceData.discount) || 0;
  const grandTotal = subTotal + taxAmount - discountAmount;

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white pb-32">
      
      <div className="print:hidden relative pt-24 md:pt-32 pb-8 border-b border-white/5 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link href="/toolkit" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white shrink-0">
              <IconLeft />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight truncate tracking-tight">Invoice <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Studio</span></h1>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide truncate">Rate Calculator & Professional Builder</p>
            </div>
          </div>
          <div className="flex bg-[#0a0a0a] p-1.5 rounded-full border border-white/5 w-full sm:w-auto shadow-inner">
            <button onClick={() => setActiveTab('invoice')} className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 tracking-wide ${activeTab === 'invoice' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              Invoice Builder
            </button>
            <button onClick={() => setActiveTab('rate')} className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 tracking-wide ${activeTab === 'rate' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              Rate Calculator
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        {/* ======================= RATE CALCULATOR TAB ======================= */}
        {activeTab === 'rate' && (
          <div className="print:hidden grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20"><IconCalc /></div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">Kalkulator Rate</h2>
                      <p className="text-xs text-slate-400 mt-1">Estimasi harga jasa profesionalmu.</p>
                    </div>
                  </div>
                  <div className="flex bg-[#141414] p-1 rounded-xl border border-[#2a2a2a] shrink-0">
                    <button onClick={() => {setCalcMode('monthly'); setTargetAmount(""); setExpenses(""); setWorkDays(""); setWorkHours("");}} className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest ${calcMode === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}>Bulanan</button>
                    <button onClick={() => {setCalcMode('project'); setTargetAmount(""); setExpenses(""); setWorkDays("1"); setWorkHours("");}} className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all uppercase tracking-widest ${calcMode === 'project' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}>Per Projek</button>
                  </div>
                </div>

                <div className="space-y-8">
                  <CleanSelect 
                    label="Level Pengalaman (Multiplier)" name="experienceLevel" value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)}
                    options={[{ value: "1", label: "Junior / Entry Level (1x)" }, { value: "1.5", label: "Mid-Level Professional (1.5x)" }, { value: "2.5", label: "Senior / Expert (2.5x)" }]}
                  />
                  <CleanInput label={calcMode === 'monthly' ? "Target Penghasilan Bersih (Per Bulan)" : "Target Upah Bersih (Untuk Projek Ini)"} name="targetAmount" type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} prefix="Rp" placeholder={calcMode === 'monthly' ? "10000000" : "3000000"} />
                  <CleanInput label={calcMode === 'monthly' ? "Pengeluaran Operasional (Internet, Software, dll)" : "Biaya Tambahan Projek (Aset, Server, dll)"} name="expenses" type="number" value={expenses} onChange={e => setExpenses(e.target.value)} prefix="Rp" placeholder={calcMode === 'monthly' ? "2000000" : "500000"} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {calcMode === 'monthly' && <CleanInput label="Hari Kerja / Bulan" name="workDays" type="number" value={workDays} onChange={e => setWorkDays(e.target.value)} placeholder="20" />}
                    <CleanInput label={calcMode === 'monthly' ? "Jam Efektif / Hari" : "Estimasi Waktu Pengerjaan (Total Jam)"} name="workHours" type="number" value={workHours} onChange={e => setWorkHours(e.target.value)} placeholder={calcMode === 'monthly' ? "6" : "15"} />
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-end mb-4">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Margin Keuntungan Tambahan</label>
                      <span className="text-cyan-400 font-mono font-bold text-xl bg-cyan-900/30 px-3 py-1 rounded-lg border border-cyan-500/30">{profitMargin}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={profitMargin} onChange={e => setProfitMargin(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-10 bg-gradient-to-b from-cyan-950/20 to-[#0a0a0a] border border-cyan-500/20 rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_40px_rgba(6,182,212,0.1)]">
                <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Hasil Final</h3>
                <div className="space-y-8">
                  {calcMode === 'monthly' ? (
                     <>
                        <div>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Hourly Rate (Per Jam)</p>
                          <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{formatCurrency(finalHourlyRate, "IDR")}</div>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                        <div>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Daily Rate (Per Hari)</p>
                          <div className="text-3xl lg:text-4xl font-bold text-slate-300 tracking-tight">{formatCurrency(finalDailyRate, "IDR")}</div>
                        </div>
                     </>
                  ) : (
                     <>
                        <div>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Total Penawaran Projek (Fixed Price)</p>
                          <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{formatCurrency(finalProjectTotal, "IDR")}</div>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                        <div>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Breakdown Rate (Per Jam)</p>
                          <div className="text-2xl lg:text-3xl font-bold text-slate-300 tracking-tight">{formatCurrency(finalHourlyRate, "IDR")}</div>
                        </div>
                     </>
                  )}
                  <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group mt-6">
                    <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-cyan-500"></div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-3 font-medium">💡 <strong className="text-white">Tips Penawaran:</strong> Jadikan hasil ini sebagai harga dasar minimum. Anda bisa menaikkan harga jika klien memiliki skala bisnis yang besar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= INVOICE GENERATOR TAB ======================= */}
        <div className={`${activeTab === 'invoice' ? 'block' : 'hidden'}`}>
          <div className="print:hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3"><IconDoc /> Invoice Builder</h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">Rakit tagihan digital profesional. Pilih Tema, Custom Warna, & Export PDF.</p>
            </div>
            <button onClick={handlePrint} className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] shrink-0 z-10">
              <IconPrint /> Simpan PDF / Print
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:w-full">
            <div className="lg:col-span-5 space-y-6 print:hidden">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
                <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-cyan-500"></span> Identitas Pengirim</h3>
                <div className="mb-6">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Logo Brand / Perusahaan</label>
                  <div className="flex items-center gap-4">
                    {logo ? (
                      <div className="relative group">
                        <img src={logo} alt="Logo" className="h-14 w-auto object-contain bg-[#0d1424]/40 p-2 rounded-xl border border-white/5" />
                        <button onClick={removeLogo} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><IconTrash /></button>
                      </div>
                    ) : (
                      <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-5 py-3 bg-[#0d1424]/40 hover:bg-[#0d1424]/80 border border-dashed border-slate-700 hover:border-cyan-500 rounded-xl text-xs font-bold text-slate-400 transition-all">
                        <IconImage /> Upload Logo
                      </button>
                    )}
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" />
                  </div>
                </div>
                <div className="space-y-4">
                  <CleanInput label="Nama Lengkap / Brand" name="myName" value={invoiceData.myName} onChange={handleInvoiceChange} placeholder="M. Rafli Ramadhan" />
                  <CleanInput label="Profesi / Jabatan" name="myRole" value={invoiceData.myRole} onChange={handleInvoiceChange} placeholder="Graphic Designer" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CleanInput label="Email" name="myEmail" type="email" value={invoiceData.myEmail} onChange={handleInvoiceChange} placeholder="hello@mrr.my.id" />
                    <CleanInput label="No. Telepon" name="myPhone" value={invoiceData.myPhone} onChange={handleInvoiceChange} placeholder="+62 851-xxxx-xxxx" />
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
                 <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-cyan-500"></span> Detail Klien & Dokumen</h3>
                 <div className="space-y-4">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <CleanInput label="No. Invoice" name="invoiceNo" value={invoiceData.invoiceNo} onChange={handleInvoiceChange} placeholder="INV-2026-001" />
                     <CleanInput label="Tenggat Waktu (Due Date)" name="dueDate" type="date" value={invoiceData.dueDate} onChange={handleInvoiceChange} />
                   </div>
                   <div className="h-px bg-white/5 my-2"></div>
                   <CleanInput label="Ditagihkan Kepada (Klien)" name="clientName" value={invoiceData.clientName} onChange={handleInvoiceChange} placeholder="Nama Perusahaan Klien" />
                   <div>
                     <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Alamat Klien Lengkap</label>
                     <textarea name="clientAddress" value={invoiceData.clientAddress} onChange={handleInvoiceChange} rows={2} placeholder="Jl. Sudirman No. 1, Jakarta" className="w-full bg-[#0d1424]/40 border-b border-slate-700/50 focus:border-cyan-400 rounded-t-xl px-4 py-2.5 text-sm text-white outline-none resize-none transition-colors placeholder:text-slate-600"></textarea>
                   </div>
                 </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] flex items-center gap-2"><span className="w-4 h-px bg-cyan-500"></span> Daftar Pekerjaan</h3>
                   <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md">{items.length} Item</span>
                </div>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="p-5 bg-[#0d1424]/20 border border-white/5 hover:border-cyan-500/30 transition-colors rounded-2xl relative group">
                      <button onClick={() => removeItem(item.id)} className="absolute -top-3 -right-3 bg-red-500/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><IconTrash /></button>
                      <div className="flex items-center gap-2 mb-4">
                         <span className="text-xs font-bold text-slate-600">#{index + 1}</span>
                         <input type="text" placeholder="Deskripsi Jasa (Misal: Desain Logo)" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full bg-transparent border-b border-slate-700 focus:border-cyan-400 pb-1 text-sm text-white outline-none font-bold placeholder:font-normal placeholder:text-slate-600" />
                      </div>
                      <div className="flex gap-4">
                        <div className="w-20">
                          <label className="block text-[8px] uppercase tracking-widest text-slate-500 mb-1.5">Qty</label>
                          <input type="number" min="1" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} className="w-full bg-[#050505] border border-slate-800 focus:border-cyan-500 rounded-lg p-2 text-sm text-white outline-none text-center transition-all" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[8px] uppercase tracking-widest text-slate-500 mb-1.5">Harga Satuan</label>
                          <input type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} placeholder="2500000" className="w-full bg-[#050505] border border-slate-800 focus:border-cyan-500 rounded-lg p-2 text-sm text-white outline-none font-mono placeholder:text-slate-700 transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-slate-700 hover:border-cyan-500 text-slate-500 hover:text-cyan-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-4"><IconPlus /> Tambah Baris</button>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
                <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-cyan-500"></span> Tema & Finalisasi</h3>
                <div className="space-y-6 mb-8 bg-[#0d1424]/30 p-5 rounded-2xl border border-white/5">
                   <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1"><IconLayout /> Pilih Template Style</label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                         {[{ id: 1, name: "Classic" }, { id: 2, name: "Bold" }, { id: 3, name: "Elegant" }, { id: 4, name: "Accent" }, { id: 5, name: "Dark" }].map(t => (
                           <button key={t.id} onClick={() => setTemplate(t.id)} className={`py-2 px-1 text-[10px] font-bold rounded-lg transition-all ${template === t.id ? 'bg-cyan-500 text-white' : 'bg-[#141414] text-slate-400 hover:bg-white/10'}`}>{t.name}</button>
                         ))}
                      </div>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                     <div className="flex-1">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1"><IconPalette /> Warna Aksen Custom</label>
                        <CustomColorSlider color={themeColor} onChange={setThemeColor} />
                     </div>
                     <div className="w-full sm:w-[80px] shrink-0 pt-2 sm:pt-0">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Preset</label>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {presetColors.map((hex) => (
                             <button key={hex} onClick={() => setThemeColor(hex)} className={`w-6 h-6 rounded-full border-2 transition-all ${themeColor === hex ? 'scale-125 border-white shadow-lg' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: hex }} />
                          ))}
                        </div>
                     </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <CleanSelect label="Mata Uang" name="currency" value={currency} onChange={e => setCurrency(e.target.value)} options={[{value:"IDR", label:"IDR - Rupiah"}, {value:"USD", label:"USD - Dollar"}, {value:"EUR", label:"EUR - Euro"}]} />
                   <CleanSelect label="Status Tagihan" name="status" value={invoiceData.status} onChange={handleInvoiceChange} options={[{value:"UNPAID", label:"Belum Lunas"}, {value:"PAID", label:"Lunas (Paid)"}, {value:"DRAFT", label:"Draft Penawaran"}]} />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8 border-t border-white/5 pt-6">
                  <CleanInput label={`Pajak / PPN (%)`} name="taxRate" type="number" value={invoiceData.taxRate} onChange={handleInvoiceChange} placeholder="11" />
                  <CleanInput label={`Diskon (${currency})`} name="discount" type="number" value={invoiceData.discount} onChange={handleInvoiceChange} placeholder="500000" />
                </div>
                <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Informasi Rekening Bank</h4>
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <CleanInput label="Nama Bank" name="bankName" value={invoiceData.bankName} onChange={handleInvoiceChange} placeholder="BCA / Mandiri / Jago" />
                     <CleanInput label="Nama Pemilik" name="accName" value={invoiceData.accName} onChange={handleInvoiceChange} placeholder="A.n Nama Anda" />
                  </div>
                  <CleanInput label="Nomor Rekening Tujuan" name="accNumber" value={invoiceData.accNumber} onChange={handleInvoiceChange} placeholder="1234567890" />
                </div>
                <div className="mt-4">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tenggat Waktu & Catatan (Bawah)</label>
                  <div className="space-y-3">
                    <input type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleInvoiceChange} className="w-full bg-[#0d1424]/40 border-b border-slate-700/50 focus:border-cyan-400 rounded-t-xl px-4 py-2.5 text-sm text-slate-300 outline-none transition-all" />
                    <textarea name="notes" value={invoiceData.notes} onChange={handleInvoiceChange} rows={2} placeholder="Terima kasih atas kerjasamanya..." className="w-full bg-[#0d1424]/40 border-b border-slate-700/50 focus:border-cyan-400 rounded-t-xl px-4 py-3 text-xs text-slate-300 outline-none resize-none transition-all placeholder:text-slate-600"></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* PREVIEW INVOICE A4 STRICT */}
            <div className="lg:col-span-7 print:col-span-12 w-full">
              <div className="w-full overflow-x-auto bg-[#0a0a0a] rounded-[2rem] p-4 md:p-8 custom-scroll border border-white/5 print:border-none print:p-0 print:bg-white">
                
                <div className="w-[794px] min-h-[1123px] mx-auto bg-white text-slate-900 shadow-2xl print:w-full print:min-h-0 print:shadow-none flex flex-col relative overflow-hidden transition-all duration-500">
                  {template === 4 && <div className="absolute left-0 top-0 h-full w-4" style={{ backgroundColor: themeColor }}></div>}
                  <div className={`flex-1 flex flex-col ${template === 4 ? 'pl-10' : ''}`}>
                    <div className={`
                      ${template === 1 ? 'p-12 pb-8 flex justify-between items-start' : ''}
                      ${template === 2 ? 'p-12 text-white flex justify-between items-start' : ''}
                      ${template === 3 ? 'p-12 pb-8 flex flex-col items-center text-center' : ''}
                      ${template === 4 ? 'p-12 pb-8 flex justify-between items-start' : ''}
                      ${template === 5 ? 'p-10 m-12 mb-8 rounded-2xl flex justify-between items-center text-white bg-slate-900' : ''}
                    `} style={template === 2 ? { backgroundColor: themeColor } : {}}>
                      <div className={`flex flex-col ${template === 3 ? 'items-center w-full' : 'max-w-[55%]'}`}>
                        {logo ? (
                          <img src={logo} alt="Brand Logo" className={`max-w-[160px] max-h-[80px] w-auto h-auto object-contain mb-6 print:max-h-[80px] ${template === 3 ? 'mx-auto' : 'object-left'}`} />
                        ) : (
                          <h2 className={`text-3xl font-black uppercase tracking-tighter mb-4 ${template === 3 ? 'text-center w-full' : ''}`} style={{ color: (template === 2 || template === 5) ? 'white' : themeColor }}>
                            {invoiceData.myName || "NAMA BRAND"}
                          </h2>
                        )}
                        {logo && invoiceData.myName && <h2 className={`text-xl font-bold ${template === 2 || template === 5 ? 'text-white' : 'text-slate-800'}`}>{invoiceData.myName}</h2>}
                        {invoiceData.myRole && <p className={`text-sm font-semibold mt-1 ${template === 2 || template === 5 ? 'text-slate-200' : 'text-slate-500'}`}>{invoiceData.myRole}</p>}
                        {invoiceData.myEmail && <p className={`text-sm mt-2 ${template === 2 || template === 5 ? 'text-slate-200' : 'text-slate-500'}`}>{invoiceData.myEmail}</p>}
                        {invoiceData.myPhone && <p className={`text-sm ${template === 2 || template === 5 ? 'text-slate-200' : 'text-slate-500'}`}>{invoiceData.myPhone}</p>}
                      </div>
                      <div className={`flex flex-col ${template === 3 ? 'items-center mt-8 border-t-2 pt-6 w-full' : 'items-end shrink-0'}`} style={template === 3 ? { borderColor: themeColor } : {}}>
                        <h1 className={`text-5xl font-black uppercase tracking-tighter mb-3 ${template === 3 ? '' : 'text-right'}`} style={{ color: (template === 2 || template === 5) ? 'white' : themeColor }}>Invoice</h1>
                        <div className={`px-4 py-2 rounded-lg font-bold tracking-wide ${template === 2 ? 'bg-white/20 text-white' : template === 5 ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-800 border border-slate-200'}`}>
                           {invoiceData.invoiceNo || "INV-000"}
                        </div>
                      </div>
                    </div>

                    <div className="px-12 flex-1 flex flex-col">
                      <div className={`flex justify-between items-end mb-10 pb-6 border-b-2`} style={{ borderColor: themeColor }}>
                        <div className="max-w-[60%]">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Ditagihkan Kepada:</p>
                          <h3 className="text-xl font-black text-slate-800">{invoiceData.clientName || "Nama Klien"}</h3>
                          <p className="text-sm font-medium text-slate-500 whitespace-pre-wrap mt-1 leading-relaxed">{invoiceData.clientAddress || "Alamat Klien Lengkap"}</p>
                        </div>
                        <div className="text-right space-y-3">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tanggal Terbit:</p>
                            <p className="text-sm font-black text-slate-800">{invoiceData.date ? new Date(invoiceData.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : "-"}</p>
                          </div>
                          {invoiceData.dueDate && (
                             <div>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Jatuh Tempo:</p>
                               <p className="text-sm font-black text-red-600">{new Date(invoiceData.dueDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                             </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 w-full mb-8">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className={`text-xs font-bold uppercase tracking-wider ${template === 5 ? 'text-white' : 'text-slate-600 border-b-2'}`} style={template === 5 ? { backgroundColor: themeColor } : { borderColor: themeColor }}>
                              <th className={`py-4 px-3 ${template === 5 ? 'rounded-tl-lg' : ''}`}>Deskripsi Layanan</th>
                              <th className="py-4 px-2 text-center w-20">Qty</th>
                              <th className="py-4 px-2 text-right w-36">Harga Satuan</th>
                              <th className={`py-4 px-3 text-right w-44 ${template === 5 ? 'text-white rounded-tr-lg' : 'text-slate-900'}`}>Total Harga</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item, idx) => (
                              <tr key={item.id} className={`${idx !== items.length - 1 ? 'border-b border-slate-100' : ''} text-sm text-slate-700`}>
                                <td className="py-5 px-3 font-bold text-slate-800">{item.description || "-"}</td>
                                <td className="py-5 px-2 text-center font-medium">{item.qty || 0}</td>
                                <td className="py-5 px-2 text-right font-mono text-slate-500">{formatCurrency(item.price, currency)}</td>
                                <td className="py-5 px-3 text-right font-mono font-black text-slate-900">{formatCurrency((item.qty || 0) * (item.price || 0), currency)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-between items-start mb-12 page-break-inside-avoid w-full">
                        <div className="w-1/2 pr-12">
                          <div className={`rounded-2xl p-6 ${template === 5 ? 'bg-slate-800 text-white' : 'bg-slate-50 border border-slate-200'}`}>
                            <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${template === 5 ? 'text-slate-400' : 'text-slate-400'}`}>Informasi Transfer Bank</p>
                            <p className={`text-sm font-bold mb-1 ${template === 5 ? 'text-white' : 'text-slate-800'}`}>{invoiceData.bankName || "Nama Bank"}</p>
                            <p className={`text-sm mb-3 ${template === 5 ? 'text-slate-300' : 'text-slate-500'}`}>a.n {invoiceData.accName || "Nama Pemilik"}</p>
                            <p className="text-xl font-mono font-black tracking-wider" style={{ color: template === 5 ? '#fff' : themeColor }}>{invoiceData.accNumber || "0000000000"}</p>
                          </div>
                        </div>

                        <div className="w-[45%] space-y-4 pt-2">
                          <div className="flex justify-between text-sm font-medium text-slate-500 px-2">
                            <span>Subtotal</span>
                            <span className="font-mono">{formatCurrency(subTotal, currency)}</span>
                          </div>
                          {invoiceData.taxRate > 0 && (
                            <div className="flex justify-between text-sm font-medium text-slate-500 px-2">
                              <span>Pajak ({invoiceData.taxRate}%)</span>
                              <span className="font-mono">{formatCurrency(taxAmount, currency)}</span>
                            </div>
                          )}
                          {invoiceData.discount > 0 && (
                            <div className="flex justify-between text-sm font-bold text-red-500 px-2">
                              <span>Diskon Khusus</span>
                              <span className="font-mono">-{formatCurrency(invoiceData.discount, currency)}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center border-t-4 pt-5 mt-5 px-2" style={{ borderColor: themeColor }}>
                            <span className="text-base font-black text-slate-900 uppercase tracking-widest">Total Bayar</span>
                            <span className="text-3xl font-black font-mono tracking-tighter" style={{ color: themeColor }}>{formatCurrency(grandTotal, currency)}</span>
                          </div>
                          {invoiceData.status !== 'DRAFT' && (
                             <div className="flex justify-end px-2 mt-4">
                                <div className={`px-4 py-1.5 rounded-md font-black text-xs tracking-widest uppercase border-2 ${invoiceData.status === 'PAID' ? 'text-emerald-500 border-emerald-500' : 'text-red-500 border-red-500'}`}>
                                  {invoiceData.status === 'PAID' ? 'LUNAS / PAID' : 'BELUM LUNAS'}
                                </div>
                             </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto border-t border-slate-200 pt-6 pb-12 page-break-inside-avoid w-full">
                        {invoiceData.notes && (
                          <div className="mb-6 max-w-[80%]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Catatan Tambahan:</p>
                            <p className="text-xs text-slate-500 font-medium whitespace-pre-wrap leading-relaxed">{invoiceData.notes}</p>
                          </div>
                        )}
                        <div className="text-center text-slate-300 text-[10px] font-bold tracking-widest uppercase border-t border-slate-100 pt-4">
                          <p>— Dibuat Secara Profesional Melalui MRR Toolkit Ecosystem —</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
