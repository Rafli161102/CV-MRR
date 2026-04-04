"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';

// =========================================================================
// IKON SVG MINIMALIS & PREMIUM
// =========================================================================
const Icons = {
  Calculator: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm3.75-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm-7.5-12h7.5A2.25 2.25 0 0121 4.5v15a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 019 19.5v-15A2.25 2.25 0 0111.25 2.25z" /></svg>,
  Document: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  Print: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.588-4.138c.48.061.96.115 1.44.16m-1.44-.16l-3.36 3.36m3.36-3.36l3.36 3.36m-9.504 4.148c-.24-.03-.48-.062-.724-.092m9.504 0c.24.03.48.062.724.092m-9.504 0C5.138 17.5 4 16.5 4 15.25V12.75A2.25 2.25 0 016.25 10.5h11.5A2.25 2.25 0 0120 12.75v2.5c0 1.25-1.138 2.25-2.5 2.25m-9.504 0C7.325 17.584 8.1 18.5 9.25 18.5h5.5c1.15 0 1.925-.916 2.05-2.021m-9.504 0H6.72m6.588-4.138c.48.061.96.115 1.44.16m-1.44-.16l-3.36 3.36m3.36-3.36l3.36 3.36m-1.44-4.66L12 4.5m0 0l-3.36 3.36M12 4.5v9.5" /></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>,
  Image: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
};

// FORMATTER MATA UANG RUPIAH
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);
};

export default function FreelanceToolkit() {
  const [activeTab, setActiveTab] = useState('rate'); // 'rate' atau 'invoice'

  // ==========================================
  // STATE: RATE CALCULATOR
  // ==========================================
  const [monthlyTarget, setMonthlyTarget] = useState(10000000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(2000000);
  const [workDays, setWorkDays] = useState(20);
  const [workHours, setWorkHours] = useState(6);
  const [profitMargin, setProfitMargin] = useState(20);

  // Kalkulasi
  const totalMonthlyNeed = monthlyTarget + monthlyExpenses;
  const totalBillableHours = workDays * workHours;
  const baseHourlyRate = totalBillableHours > 0 ? totalMonthlyNeed / totalBillableHours : 0;
  const finalHourlyRate = baseHourlyRate + (baseHourlyRate * (profitMargin / 100));
  const dailyRate = finalHourlyRate * workHours;

  // ==========================================
  // STATE: INVOICE GENERATOR
  // ==========================================
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "INV-2026-001",
    date: new Date().toISOString().split('T')[0],
    myName: "Muhammad Rafli Ramadhan",
    myRole: "Graphic Designer & Developer",
    myEmail: "hello@mrr.my.id",
    myPhone: "+62 851-5502-0363",
    clientName: "Nama Klien / Perusahaan",
    clientAddress: "Jakarta, Indonesia",
    bankName: "Bank BCA",
    accName: "M Rafli Ramadhan",
    accNumber: "1234567890",
    taxRate: 0,
    discount: 0,
    notes: "Terima kasih atas kerjasamanya. Pembayaran diharapkan sebelum tanggal jatuh tempo.",
  });

  const [logo, setLogo] = useState(null); // State untuk Logo Brand
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([
    { id: 1, description: "Desain Identitas Visual", qty: 1, price: 2500000 },
    { id: 2, description: "Buku Brand Guidelines", qty: 1, price: 1500000 }
  ]);

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: field === 'description' ? value : Number(value) } : item));
  };

  const addItem = () => setItems([...items, { id: Date.now(), description: "", qty: 1, price: 0 }]);
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

  const subTotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxAmount = subTotal * (invoiceData.taxRate / 100);
  const grandTotal = subTotal + taxAmount - invoiceData.discount;

  const handlePrint = () => {
    window.print();
  };

  // Komponen Input Reusable yang LEBIH MINIMALIS & "ENAKEUN" DILIHAT
  const CleanInput = ({ label, name, type = "text", value, onChange, placeholder = "", prefix = "" }) => (
    <div className="relative group">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</label>
      <div className="flex items-center bg-[#0d1424]/40 border border-white/5 group-hover:border-cyan-500/50 transition-colors focus-within:border-cyan-400 rounded-xl px-4 py-3">
        {prefix && <span className="text-slate-500 font-bold mr-2 text-sm">{prefix}</span>}
        <input 
          type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600 transition-all font-medium" 
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white pb-32">
      
      {/* HEADER NAVIGASI (HAPUS STICKY AGAR TIDAK NABRAK GLOBAL HEADER) */}
      <div className="print:hidden relative pt-24 md:pt-32 pb-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link href="/toolkit" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white shrink-0">
              <Icons.ArrowLeft />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight truncate tracking-tight">Toolkit <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pro</span></h1>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide truncate">Freelance Rate & Invoice Generator</p>
            </div>
          </div>

          {/* Navigasi Kapsul Modern */}
          <div className="flex bg-[#0a0a0a] p-1.5 rounded-full border border-white/5 w-full sm:w-auto shadow-inner">
            <button 
              onClick={() => setActiveTab('rate')} 
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 tracking-wide ${activeTab === 'rate' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              Kalkulator
            </button>
            <button 
              onClick={() => setActiveTab('invoice')} 
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 tracking-wide ${activeTab === 'invoice' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              Invoice
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        {/* ========================================================================= */}
        {/* TAB 1: RATE CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'rate' && (
          <div className="print:hidden grid grid-cols-1 lg:grid-cols-12 gap-8 anim-fade-in-up">
            
            {/* PANEL INPUT */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20"><Icons.Calculator /></div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Kalkulator Rate Ideal</h2>
                    <p className="text-xs text-slate-400 mt-1">Tentukan nilai jasamu secara terukur berdasarkan target.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <CleanInput label="Target Penghasilan Bersih (Per Bulan)" name="monthlyTarget" type="number" value={monthlyTarget} onChange={e => setMonthlyTarget(Number(e.target.value))} prefix="Rp" />
                  <CleanInput label="Pengeluaran Operasional (Internet, Software, Listrik)" name="monthlyExpenses" type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} prefix="Rp" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <CleanInput label="Hari Kerja / Bulan" name="workDays" type="number" value={workDays} onChange={e => setWorkDays(Number(e.target.value))} />
                    <CleanInput label="Jam Efektif / Hari" name="workHours" type="number" value={workHours} onChange={e => setWorkHours(Number(e.target.value))} />
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

            {/* PANEL HASIL */}
            <div className="lg:col-span-5">
              <div className="sticky top-10 bg-gradient-to-b from-cyan-950/20 to-[#0a0a0a] border border-cyan-500/20 rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_40px_rgba(6,182,212,0.1)]">
                <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Hasil Final
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Hourly Rate (Per Jam)</p>
                    <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{formatRupiah(finalHourlyRate)}</div>
                  </div>
                  
                  <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                  
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Daily Rate (Per Hari)</p>
                    <div className="text-3xl lg:text-4xl font-bold text-slate-300 tracking-tight">{formatRupiah(dailyRate)}</div>
                  </div>
                  
                  <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group mt-6">
                    <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-cyan-500"></div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-3 font-medium">
                      💡 <strong className="text-white">Pro Tip:</strong> Jika klien meminta harga borongan, estimasikan waktu kerjamu. Misal butuh 3 hari, tawarkan setidaknya <strong className="text-cyan-400 font-mono text-sm block mt-2">{formatRupiah(dailyRate * 3)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INVOICE GENERATOR */}
        {/* ========================================================================= */}
        <div className={`${activeTab === 'invoice' ? 'block' : 'hidden'} anim-fade-in-up`}>
          
          <div className="print:hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                Invoice Builder
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">Rakit tagihan digital profesional tanpa *watermark*. Data 100% aman karena hanya diproses di browser Anda.</p>
            </div>
            <button onClick={handlePrint} className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] shrink-0 z-10">
              <Icons.Print /> Simpan PDF
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:w-full">
            
            {/* EDITOR INVOICE (Disembunyikan saat print) */}
            <div className="lg:col-span-5 space-y-6 print:hidden">
              
              {/* SECTION: BRANDING & INFO DIRI */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
                <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-cyan-500"></span> Identitas Anda</h3>
                
                {/* Upload Logo */}
                <div className="mb-6">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Logo Brand / Perusahaan</label>
                  <div className="flex items-center gap-4">
                    {logo ? (
                      <div className="relative group">
                        <img src={logo} alt="Logo" className="h-14 w-auto object-contain bg-[#0d1424]/40 p-2 rounded-xl border border-white/5" />
                        <button onClick={removeLogo} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Icons.Trash /></button>
                      </div>
                    ) : (
                      <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 px-5 py-3 bg-[#0d1424]/40 hover:bg-[#0d1424]/80 border border-dashed border-slate-700 hover:border-cyan-500 rounded-xl text-xs font-bold text-slate-400 transition-all">
                        <Icons.Image /> Upload Gambar
                      </button>
                    )}
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" />
                  </div>
                </div>

                <div className="space-y-6">
                  <CleanInput label="Nama Lengkap / Brand" name="myName" value={invoiceData.myName} onChange={handleInvoiceChange} placeholder="Tuliskan nama lengkap Anda" />
                  <CleanInput label="Profesi / Jabatan" name="myRole" value={invoiceData.myRole} onChange={handleInvoiceChange} placeholder="Graphic Designer" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <CleanInput label="Alamat Email" name="myEmail" type="email" value={invoiceData.myEmail} onChange={handleInvoiceChange} placeholder="email@anda.com" />
                    <CleanInput label="Nomor Telepon" name="myPhone" value={invoiceData.myPhone} onChange={handleInvoiceChange} placeholder="08xx xxxx xxxx" />
                  </div>
                </div>
              </div>

              {/* SECTION: INFO KLIEN */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
                 <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-cyan-500"></span> Detail Klien & Dokumen</h3>
                 <div className="space-y-6">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <CleanInput label="No. Invoice" name="invoiceNo" value={invoiceData.invoiceNo} onChange={handleInvoiceChange} placeholder="INV-202X-001" />
                     <CleanInput label="Tanggal Terbit" name="date" type="date" value={invoiceData.date} onChange={handleInvoiceChange} />
                   </div>
                   <div className="h-px bg-white/5 my-2"></div>
                   <CleanInput label="Ditagihkan Kepada (Klien)" name="clientName" value={invoiceData.clientName} onChange={handleInvoiceChange} placeholder="Nama Perusahaan Klien" />
                   <div>
                     <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Alamat Klien Lengkap</label>
                     <textarea name="clientAddress" value={invoiceData.clientAddress} onChange={handleInvoiceChange} rows={2} placeholder="Kota, Negara" className="w-full bg-[#0d1424]/40 border border-white/5 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none resize-none transition-colors"></textarea>
                   </div>
                 </div>
              </div>

              {/* SECTION: ITEM PEKERJAAN */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] flex items-center gap-2"><span className="w-4 h-px bg-cyan-500"></span> Detail Pekerjaan</h3>
                   <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md">{items.length} Item</span>
                </div>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="p-5 bg-[#0d1424]/20 border border-white/5 hover:border-cyan-500/30 transition-colors rounded-2xl relative group">
                      <button onClick={() => removeItem(item.id)} className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" title="Hapus Item"><Icons.Trash /></button>
                      
                      <input type="text" placeholder="Deskripsi Jasa (Misal: Desain Logo)" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full bg-transparent border-b border-slate-700 focus:border-cyan-400 pb-2 mb-5 text-sm text-white outline-none font-bold placeholder:font-normal placeholder:text-slate-600" />
                      
                      <div className="flex gap-4">
                        <div className="w-24">
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Jumlah</label>
                          <input type="number" min="1" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} className="w-full bg-[#050505] border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-white outline-none text-center transition-all" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Harga Satuan (Rp)</label>
                          <input type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} className="w-full bg-[#050505] border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-white outline-none font-mono transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={addItem} className="w-full py-4 border-2 border-dashed border-slate-800 hover:border-cyan-500 text-slate-500 hover:text-cyan-400 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-4">
                    <Icons.Plus /> Tambahkan Baris Pekerjaan
                  </button>
                </div>
              </div>

              {/* SECTION: PEMBAYARAN */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
                <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-cyan-500"></span> Finalisasi Tagihan</h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <CleanInput label="Tambahkan Pajak (%)" name="taxRate" type="number" value={invoiceData.taxRate} onChange={handleInvoiceChange} placeholder="0" />
                  <CleanInput label="Berikan Diskon (Rp)" name="discount" type="number" value={invoiceData.discount} onChange={handleInvoiceChange} placeholder="0" />
                </div>
                
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Destinasi Pembayaran Bank</h4>
                <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <CleanInput label="Nama Bank Pemilik" name="bankName" value={invoiceData.bankName} onChange={handleInvoiceChange} placeholder="Bank BCA / Mandiri / dll" />
                     <CleanInput label="Nama Pemilik Rekening" name="accName" value={invoiceData.accName} onChange={handleInvoiceChange} placeholder="A.n Nama Anda" />
                  </div>
                  <CleanInput label="Nomor Rekening Tujuan" name="accNumber" value={invoiceData.accNumber} onChange={handleInvoiceChange} placeholder="1234567890" />
                </div>

                <div className="mt-4">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Catatan Tambahan / Pesan Manis</label>
                  <textarea name="notes" value={invoiceData.notes} onChange={handleInvoiceChange} rows={3} placeholder="Terima kasih atas kepercayaannya..." className="w-full bg-[#0d1424]/40 border border-white/5 focus:border-cyan-400 rounded-xl px-4 py-3 text-xs text-slate-300 outline-none resize-none transition-all leading-relaxed"></textarea>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* AREA PREVIEW INVOICE (PRINT-READY A4) */}
            {/* ========================================================================= */}
            <div className="lg:col-span-7 print:col-span-12 overflow-x-auto custom-scroll pb-10 print:pb-0 print:overflow-visible">
              
              {/* KERTAS A4: Ukuran proporsional, border diabaikan saat dicetak */}
              <div className="min-w-[700px] w-full max-w-[794px] mx-auto aspect-[1/1.414] bg-white print:bg-white text-slate-900 p-12 sm:p-16 rounded-[2rem] print:rounded-none shadow-2xl print:shadow-none relative flex flex-col">
                
                {/* Header Dokumen */}
                <div className="flex justify-between items-start mb-16">
                  <div className="flex flex-col max-w-[50%]">
                    {logo ? (
                      <img src={logo} alt="Brand Logo" className="h-16 w-auto object-contain mb-4 print:max-h-16" />
                    ) : (
                      <div className="h-16 flex items-center">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{invoiceData.myName}</h2>
                      </div>
                    )}
                    {logo && <h2 className="text-xl font-bold text-slate-800">{invoiceData.myName}</h2>}
                    <p className="text-sm font-semibold text-slate-500 mt-1">{invoiceData.myRole}</p>
                    <p className="text-sm text-slate-500 mt-2">{invoiceData.myEmail}</p>
                    <p className="text-sm text-slate-500">{invoiceData.myPhone}</p>
                  </div>
                  <div className="text-right">
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-200 uppercase tracking-tighter mb-2">Invoice</h1>
                    <p className="text-slate-800 font-bold text-lg">{invoiceData.invoiceNo}</p>
                  </div>
                </div>

                {/* Info Klien & Tanggal */}
                <div className="flex justify-between items-end mb-10 pb-6 border-b-2 border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Ditagihkan Kepada:</p>
                    <h3 className="text-lg font-black text-slate-800">{invoiceData.clientName || "Nama Klien"}</h3>
                    <p className="text-sm font-medium text-slate-500 whitespace-pre-wrap mt-1 leading-relaxed">{invoiceData.clientAddress || "Alamat Klien"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Terbit:</p>
                    <p className="text-sm font-black text-slate-800">{invoiceData.date ? new Date(invoiceData.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : "-"}</p>
                  </div>
                </div>

                {/* Tabel Item Pekerjaan */}
                <div className="flex-1">
                  <table className="w-full text-left mb-8">
                    <thead>
                      <tr className="border-b-2 border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-2">Deskripsi Pekerjaan</th>
                        <th className="py-3 px-2 text-center w-20">Qty</th>
                        <th className="py-3 px-2 text-right w-32">Harga Satuan</th>
                        <th className="py-3 px-2 text-right w-40 text-slate-800">Total (Rp)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => (
                        <tr key={item.id} className={`${idx !== items.length - 1 ? 'border-b border-slate-100' : ''} text-sm text-slate-700`}>
                          <td className="py-4 px-2 font-bold text-slate-800">{item.description || "-"}</td>
                          <td className="py-4 px-2 text-center font-medium">{item.qty}</td>
                          <td className="py-4 px-2 text-right font-mono text-slate-500">{new Intl.NumberFormat("id-ID").format(item.price)}</td>
                          <td className="py-4 px-2 text-right font-mono font-black text-slate-900">{new Intl.NumberFormat("id-ID").format(item.qty * item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total & Kalkulasi */}
                <div className="flex justify-between items-start mt-8 mb-12 page-break-inside-avoid">
                  
                  {/* Info Rekening (Kiri Bawah) */}
                  <div className="w-1/2 pr-12">
                    <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Informasi Pembayaran</p>
                      <p className="text-sm text-slate-800 font-bold mb-1">{invoiceData.bankName || "-"}</p>
                      <p className="text-sm text-slate-500 mb-3">a.n {invoiceData.accName || "-"}</p>
                      <p className="text-xl font-mono font-black text-slate-900 tracking-wider">{invoiceData.accNumber || "-"}</p>
                    </div>
                  </div>

                  {/* Ringkasan Biaya (Kanan Bawah) */}
                  <div className="w-1/2 space-y-4 pt-2">
                    <div className="flex justify-between text-sm font-medium text-slate-500 px-2">
                      <span>Subtotal</span>
                      <span className="font-mono">{formatRupiah(subTotal)}</span>
                    </div>
                    {invoiceData.taxRate > 0 && (
                      <div className="flex justify-between text-sm font-medium text-slate-500 px-2">
                        <span>Pajak ({invoiceData.taxRate}%)</span>
                        <span className="font-mono">{formatRupiah(taxAmount)}</span>
                      </div>
                    )}
                    {invoiceData.discount > 0 && (
                      <div className="flex justify-between text-sm font-bold text-red-500 px-2">
                        <span>Diskon Khusus</span>
                        <span className="font-mono">-{formatRupiah(invoiceData.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center border-t-2 border-slate-900 pt-5 mt-5 px-2">
                      <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Total Tagihan</span>
                      <span className="text-3xl font-black text-cyan-600 font-mono tracking-tighter">{formatRupiah(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Catatan Kaki / Footer Dokumen */}
                <div className="mt-auto border-t border-slate-200 pt-6 page-break-inside-avoid">
                  {invoiceData.notes && (
                    <div className="mb-6">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Catatan Tambahan:</p>
                      <p className="text-xs text-slate-500 font-medium whitespace-pre-wrap leading-relaxed">{invoiceData.notes}</p>
                    </div>
                  )}
                  <div className="text-center text-slate-300 text-[10px] font-bold tracking-widest uppercase mt-8">
                    <p>— Dibuat Secara Profesional Melalui MRR Toolkit Ecosystem —</p>
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
