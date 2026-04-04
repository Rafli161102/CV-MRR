"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// =========================================================================
// IKON SVG MINIMALIS
// =========================================================================
const Icons = {
  Calculator: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm3.75-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm-7.5-12h7.5A2.25 2.25 0 0121 4.5v15a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 019 19.5v-15A2.25 2.25 0 0111.25 2.25z" /></svg>,
  Document: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  Print: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.588-4.138c.48.061.96.115 1.44.16m-1.44-.16l-3.36 3.36m3.36-3.36l3.36 3.36m-9.504 4.148c-.24-.03-.48-.062-.724-.092m9.504 0c.24.03.48.062.724.092m-9.504 0C5.138 17.5 4 16.5 4 15.25V12.75A2.25 2.25 0 016.25 10.5h11.5A2.25 2.25 0 0120 12.75v2.5c0 1.25-1.138 2.25-2.5 2.25m-9.504 0C7.325 17.584 8.1 18.5 9.25 18.5h5.5c1.15 0 1.925-.916 2.05-2.021m-9.504 0H6.72m6.588-4.138c.48.061.96.115 1.44.16m-1.44-.16l-3.36 3.36m3.36-3.36l3.36 3.36m-1.44-4.66L12 4.5m0 0l-3.36 3.36M12 4.5v9.5" /></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
};

// FORMATTER RUPIAH
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);
};

export default function FreelanceToolkit() {
  const [activeTab, setActiveTab] = useState('rate'); // 'rate' atau 'invoice'

  // STATE: RATE CALCULATOR
  const [monthlyTarget, setMonthlyTarget] = useState(10000000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(2000000);
  const [workDays, setWorkDays] = useState(20);
  const [workHours, setWorkHours] = useState(6);
  const [profitMargin, setProfitMargin] = useState(20);

  // Kalkulasi Rate
  const totalMonthlyNeed = monthlyTarget + monthlyExpenses;
  const totalBillableHours = workDays * workHours;
  const baseHourlyRate = totalBillableHours > 0 ? totalMonthlyNeed / totalBillableHours : 0;
  const finalHourlyRate = baseHourlyRate + (baseHourlyRate * (profitMargin / 100));
  const dailyRate = finalHourlyRate * workHours;

  // STATE: INVOICE GENERATOR
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "INV-2026-001",
    date: new Date().toISOString().split('T')[0],
    myName: "Muhammad Rafli Ramadhan",
    myRole: "Graphic Designer & Developer",
    myEmail: "hello@mrr.my.id",
    myPhone: "+62 851-5502-0363",
    clientName: "Nama Klien / Perusahaan",
    clientAddress: "Alamat Klien Lengkap\nJakarta, Indonesia",
    notes: "Pembayaran dapat ditransfer ke:\nBank BCA 1234567890 a.n M Rafli Ramadhan",
    taxRate: 0,
    discount: 0,
  });

  const [items, setItems] = useState([
    { id: 1, description: "Desain Logo Corporate", qty: 1, price: 2500000 },
    { id: 2, description: "Brand Guidelines (PDF)", qty: 1, price: 1500000 }
  ]);

  const handleInvoiceChange = (e) => setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  const handleItemChange = (id, field, value) => setItems(items.map(item => item.id === id ? { ...item, [field]: field === 'description' ? value : Number(value) } : item));
  const addItem = () => setItems([...items, { id: Date.now(), description: "Item Baru", qty: 1, price: 0 }]);
  const removeItem = (id) => setItems(items.filter(item => item.id !== id));

  const subTotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxAmount = subTotal * (invoiceData.taxRate / 100);
  const grandTotal = subTotal + taxAmount - invoiceData.discount;

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* HEADER NAVIGASI (Hilang saat dicetak ke PDF) */}
      <div className="print:hidden sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/toolkit" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white">
              <Icons.ArrowLeft />
            </Link>
            <div>
              <h1 className="text-lg md:text-xl font-black text-white leading-none">MRR <span className="text-cyan-400">Toolkit</span></h1>
              <p className="text-[10px] md:text-xs text-slate-400 font-medium">Rate Calculator & Invoice</p>
            </div>
          </div>

          <div className="flex bg-[#141414] p-1 rounded-xl border border-[#2a2a2a]">
            <button onClick={() => setActiveTab('rate')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'rate' ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Calculator</button>
            <button onClick={() => setActiveTab('invoice')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'invoice' ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Invoice</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8 pb-24">
        
        {/* TAB 1: RATE CALCULATOR */}
        {activeTab === 'rate' && (
          <div className="print:hidden grid grid-cols-1 lg:grid-cols-12 gap-8 anim-fade-in-up">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl"><Icons.Calculator /></div>
                  <h2 className="text-xl font-bold text-white">Hitung Rate Idealmu</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Penghasilan Bersih (Per Bulan)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                      <input type="number" value={monthlyTarget} onChange={e => setMonthlyTarget(Number(e.target.value))} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-xl py-3 pl-12 pr-4 text-white outline-none transition-all font-mono" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pengeluaran Operasional (Internet, Software, dll)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                      <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-xl py-3 pl-12 pr-4 text-white outline-none transition-all font-mono" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Hari Kerja /Bulan</label>
                      <input type="number" value={workDays} onChange={e => setWorkDays(Number(e.target.value))} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-xl p-3 text-white outline-none transition-all font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Jam Kerja /Hari</label>
                      <input type="number" value={workHours} onChange={e => setWorkHours(Number(e.target.value))} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-xl p-3 text-white outline-none transition-all font-mono" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Margin Keuntungan (%)</label>
                    <div className="flex items-center gap-4">
                      <input type="range" min="0" max="100" value={profitMargin} onChange={e => setProfitMargin(Number(e.target.value))} className="flex-1 accent-cyan-500" />
                      <span className="bg-[#141414] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white font-mono min-w-[80px] text-center">{profitMargin}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-gradient-to-b from-cyan-900/20 to-[#0a0a0a] border border-cyan-500/20 rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_rgba(6,182,212,0.1)]">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-6">Ringkasan Rate</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Rate Per Jam (Hourly Rate)</p>
                    <div className="text-3xl lg:text-4xl font-black text-white tracking-tight">{formatRupiah(finalHourlyRate)}<span className="text-lg text-slate-500 font-normal">/jam</span></div>
                  </div>
                  <div className="h-px w-full bg-white/10"></div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Rate Per Hari (Daily Rate)</p>
                    <div className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{formatRupiah(dailyRate)}<span className="text-base text-slate-500 font-normal">/hari</span></div>
                  </div>
                  
                  <div className="bg-[#030712] rounded-2xl p-5 mt-6 border border-white/5">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      💡 <strong className="text-white">Tips Project Fixed-Price:</strong> Jika proyek memakan waktu estimasi 3 hari kerja, tawarkan minimal <strong className="text-cyan-400">{formatRupiah(dailyRate * 3)}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVOICE GENERATOR */}
        <div className={`${activeTab === 'invoice' ? 'block' : 'hidden'} anim-fade-in-up`}>
          
          <div className="print:hidden flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><Icons.Document /></div> Pembuat Invoice
            </h2>
            <button onClick={handlePrint} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-1">
              <Icons.Print /> Cetak / Save PDF
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:w-full">
            
            {/* EDITOR INVOICE (Hanya tampil di layar) */}
            <div className="lg:col-span-5 space-y-6 print:hidden">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Informasi Dokumen</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">No. Invoice</label>
                    <input type="text" name="invoiceNo" value={invoiceData.invoiceNo} onChange={handleInvoiceChange} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-lg p-2.5 text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Tanggal</label>
                    <input type="date" name="date" value={invoiceData.date} onChange={handleInvoiceChange} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-lg p-2.5 text-sm text-white outline-none" />
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Data Klien</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Nama Perusahaan/Klien</label>
                    <input type="text" name="clientName" value={invoiceData.clientName} onChange={handleInvoiceChange} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-lg p-2.5 text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Alamat Klien</label>
                    <textarea name="clientAddress" value={invoiceData.clientAddress} onChange={handleInvoiceChange} rows={2} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-lg p-2.5 text-sm text-white outline-none resize-none"></textarea>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Item Pekerjaan</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 bg-[#141414] border border-[#2a2a2a] rounded-xl relative group">
                      <button onClick={() => removeItem(item.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Icons.Trash /></button>
                      <input type="text" placeholder="Deskripsi Pekerjaan" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full bg-transparent border-b border-white/10 focus:border-cyan-500 pb-2 mb-3 text-sm text-white outline-none font-bold" />
                      <div className="flex gap-3">
                        <div className="w-20">
                          <label className="block text-[9px] text-slate-500 mb-1">Qty</label>
                          <input type="number" min="1" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-md p-2 text-sm text-white outline-none text-center" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[9px] text-slate-500 mb-1">Harga Satuan (Rp)</label>
                          <input type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-md p-2 text-sm text-white outline-none font-mono" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={addItem} className="w-full py-3 border border-dashed border-cyan-500/50 text-cyan-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-cyan-500/10 transition-colors">
                    <Icons.Plus /> Tambah Item
                  </button>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Pengaturan Tagihan</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Pajak (%)</label>
                    <input type="number" name="taxRate" value={invoiceData.taxRate} onChange={handleInvoiceChange} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-lg p-2.5 text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Diskon (Rp)</label>
                    <input type="number" name="discount" value={invoiceData.discount} onChange={handleInvoiceChange} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-lg p-2.5 text-sm text-white outline-none font-mono" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Catatan / Info Bank</label>
                  <textarea name="notes" value={invoiceData.notes} onChange={handleInvoiceChange} rows={3} className="w-full bg-[#141414] border border-[#2a2a2a] focus:border-cyan-500 rounded-lg p-2.5 text-sm text-white outline-none resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* PREVIEW & PRINTABLE AREA */}
            {/* Tailwind print: classes memastikan saat di print ke PDF tampilannya putih bersih resmi */}
            <div className="lg:col-span-7 print:col-span-12">
              <div className="sticky top-28 bg-white print:bg-white text-black p-8 sm:p-12 min-h-[800px] rounded-3xl shadow-2xl print:shadow-none print:p-0">
                
                <div className="flex justify-between items-start mb-16">
                  <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">INVOICE</h1>
                    <p className="text-slate-500 font-mono text-sm">{invoiceData.invoiceNo}</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-xl font-bold text-slate-900">{invoiceData.myName}</h2>
                    <p className="text-sm text-slate-500 mt-1">{invoiceData.myRole}</p>
                    <p className="text-sm text-slate-500">{invoiceData.myEmail}</p>
                    <p className="text-sm text-slate-500">{invoiceData.myPhone}</p>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-12 border-b border-slate-200 pb-8">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ditagihkan Kepada:</p>
                    <h3 className="text-lg font-bold text-slate-900">{invoiceData.clientName}</h3>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap mt-1">{invoiceData.clientAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tanggal Invoice:</p>
                    <p className="text-sm font-bold text-slate-900">{new Date(invoiceData.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>

                <div className="mb-12">
                  <div className="grid grid-cols-12 gap-4 border-b-2 border-slate-900 pb-3 mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <div className="col-span-6">Deskripsi Pekerjaan</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-4 text-right">Harga</div>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 text-sm text-slate-800 items-center">
                        <div className="col-span-6 font-medium">{item.description || "-"}</div>
                        <div className="col-span-2 text-center">{item.qty}</div>
                        <div className="col-span-4 text-right font-mono">{formatRupiah(item.qty * item.price)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mb-16">
                  <div className="w-full sm:w-1/2 space-y-3">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-mono">{formatRupiah(subTotal)}</span>
                    </div>
                    {invoiceData.taxRate > 0 && (
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Pajak ({invoiceData.taxRate}%)</span>
                        <span className="font-mono">{formatRupiah(taxAmount)}</span>
                      </div>
                    )}
                    {invoiceData.discount > 0 && (
                      <div className="flex justify-between text-sm text-red-500">
                        <span>Diskon</span>
                        <span className="font-mono">-{formatRupiah(invoiceData.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center border-t-2 border-slate-900 pt-4 mt-4">
                      <span className="text-base font-bold text-slate-900 uppercase">Total Tagihan</span>
                      <span className="text-xl font-black text-cyan-600 font-mono tracking-tight">{formatRupiah(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Catatan / Info Pembayaran:</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{invoiceData.notes}</p>
                </div>
                
                <div className="mt-16 text-center text-slate-400 text-xs print:mt-32">
                  <p>Dibuat melalui MRR Toolkit Ecosystem</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
