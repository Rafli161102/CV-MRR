"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Icons, CleanInput, CleanSelect, CustomColorSlider, formatCurrency } from './components';

export default function InvoiceTab() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "", date: "", dueDate: "", myName: "", myRole: "", myEmail: "", myPhone: "",
    clientName: "", clientAddress: "", bankName: "", accName: "", accNumber: "", taxRate: "", discount: "", notes: "", signatureName: "", status: "UNPAID", 
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setInvoiceData(prev => ({ ...prev, date: today, dueDate: today }));
  }, []);

  const [currency, setCurrency] = useState("IDR");
  const [themeColor, setThemeColor] = useState("#0891b2"); 
  const [template, setTemplate] = useState(1); 
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);
  
  const [items, setItems] = useState([{ id: 1, description: "", qty: 1, price: "" }]);
  
  // CustomColors array in case CustomColorSlider expects it
  const presetColors = ["#0891b2", "#2563eb", "#4f46e5", "#059669", "#e11d48", "#1e293b", "#f59e0b", "#9333ea"];
  
  const handleInvoiceChange = (e) => setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  
  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: "", qty: 1, price: "" }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0);
  const taxAmount = subtotal * (Number(invoiceData.taxRate) / 100);
  const discountAmount = Number(invoiceData.discount) || 0;
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
        
        {/* ======================= */}
        {/* EDITOR PANEL (KIRI)     */}
        {/* ======================= */}
        <div className="xl:col-span-5 space-y-6 print:hidden">
          
          {/* Card: Pengaturan & Status */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden">
            <div className={`absolute left-0 top-0 w-1.5 h-full`} style={{ background: themeColor }}></div>
            <h3 className="text-white font-bold mb-5 flex items-center gap-2">
              <span style={{ color: themeColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </span>
              Pengaturan Utama
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CleanInput label="No. Invoice" name="invoiceNo" value={invoiceData.invoiceNo} onChange={handleInvoiceChange} placeholder="INV-2026-001" />
              <CleanSelect 
                label="Mata Uang" 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)} 
                options={[{ value: "IDR", label: "Rupiah (IDR)" }, { value: "USD", label: "US Dollar (USD)" }]} 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <CleanInput label="Tanggal Terbit" type="date" name="date" value={invoiceData.date} onChange={handleInvoiceChange} />
              <CleanInput label="Jatuh Tempo" type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleInvoiceChange} />
            </div>
            
            <div className="mb-5">
              <p className="text-xs text-slate-400 font-medium mb-3">Warna Tema</p>
              <div className="flex flex-wrap gap-2">
                {presetColors.map(color => (
                  <button
                    key={color}
                    onClick={() => setThemeColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${themeColor === color ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-50 hover:opacity-100'} transition-all`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <CleanSelect 
                label="Status Invoice" 
                name="status" 
                value={invoiceData.status} 
                onChange={handleInvoiceChange}
                options={[
                  { value: 'UNPAID', label: 'Belum Lunas (UNPAID)' },
                  { value: 'PAID', label: 'Lunas (PAID)' }
                ]}
              />
            </div>

            <div className="mt-5">
              <p className="text-xs text-slate-400 font-medium mb-3">Logo (Opsional)</p>
              <div className="flex items-center gap-4">
                {logo ? (
                  <div className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2">
                    <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
                    <button onClick={removeLogo} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      Hapus
                    </button>
                  </div>
                ) : (
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-dashed border-white/20 rounded-xl text-xs text-slate-300 hover:bg-white/10 hover:border-white/40 transition-colors w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    Upload Logo
                  </button>
                )}
                <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
              </div>
            </div>
          </div>

          {/* Card: Info Sender & Client */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative">
            <h3 className="text-white font-bold mb-4">Informasi Pengirim</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <CleanInput label="Nama Anda / Perusahaan" name="myName" value={invoiceData.myName} onChange={handleInvoiceChange} placeholder="John Doe" />
              <CleanInput label="Profesi / Jabatan" name="myRole" value={invoiceData.myRole} onChange={handleInvoiceChange} placeholder="Freelance Designer" />
              <CleanInput label="Email" type="email" name="myEmail" value={invoiceData.myEmail} onChange={handleInvoiceChange} placeholder="hello@johndoe.com" />
              <CleanInput label="No. Telepon" name="myPhone" value={invoiceData.myPhone} onChange={handleInvoiceChange} placeholder="+62 812..." />
            </div>

            <div className="h-px w-full bg-white/10 mb-6"></div>

            <h3 className="text-white font-bold mb-4">Informasi Klien</h3>
            <div className="space-y-4">
              <CleanInput label="Ditagihkan Kepada" name="clientName" value={invoiceData.clientName} onChange={handleInvoiceChange} placeholder="PT Sukses Makmur" />
              <CleanInput label="Alamat Klien" name="clientAddress" value={invoiceData.clientAddress} onChange={handleInvoiceChange} placeholder="Jl. Sudirman No. 1..." />
            </div>
          </div>

          {/* Card: Items */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative">
            <h3 className="text-white font-bold mb-4">Item Tagihan</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="p-4 bg-white/5 border border-white/10 rounded-xl relative group">
                  <button onClick={() => removeItem(item.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" title="Hapus Item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-6">
                      <CleanInput label="Deskripsi Pekerjaan" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} placeholder="Misal: UI Design Web" />
                    </div>
                    <div className="sm:col-span-2">
                      <CleanInput label="Qty" type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} />
                    </div>
                    <div className="sm:col-span-4">
                      <CleanInput label="Harga Satuan" type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} placeholder="0" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addItem} className="w-full py-3 rounded-xl border border-dashed border-white/20 text-white/70 hover:bg-white/10 hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Tambah Item
              </button>
            </div>
            
            <div className="h-px w-full bg-white/10 my-6"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CleanInput label="Diskon (Nominal)" type="number" name="discount" value={invoiceData.discount} onChange={handleInvoiceChange} placeholder="0" />
              <CleanInput label="Pajak (%)" type="number" name="taxRate" value={invoiceData.taxRate} onChange={handleInvoiceChange} placeholder="0" />
            </div>
          </div>

          {/* Card: Info Pembayaran & Ekstra */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative">
            <h3 className="text-white font-bold mb-4">Informasi Pembayaran</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="sm:col-span-2">
                <CleanInput label="Nama Bank / E-Wallet" name="bankName" value={invoiceData.bankName} onChange={handleInvoiceChange} placeholder="BCA / GoPay / DANA" />
              </div>
              <CleanInput label="Nomor Rekening / No. HP" name="accNumber" value={invoiceData.accNumber} onChange={handleInvoiceChange} placeholder="1234567890" />
              <CleanInput label="Atas Nama (A/N)" name="accName" value={invoiceData.accName} onChange={handleInvoiceChange} placeholder="John Doe" />
            </div>

            <h3 className="text-white font-bold mb-4 mt-6">Catatan & TTD</h3>
            <div className="space-y-4">
              <CleanInput label="Catatan Tambahan (Opsional)" name="notes" value={invoiceData.notes} onChange={handleInvoiceChange} placeholder="Terima kasih atas kerjasamanya..." />
              <CleanInput label="Nama Terang (Signature)" name="signatureName" value={invoiceData.signatureName} onChange={handleInvoiceChange} placeholder="Biarkan kosong jika sama dengan Nama" />
            </div>
          </div>

          <button onClick={() => window.print()} className="w-full py-4 bg-gradient-to-r hover:bg-gradient-to-l from-indigo-500 to-cyan-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-all flex justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print / Simpan PDF
          </button>
        </div>

        {/* ======================= */}
        {/* PREVIEW PANEL (KANAN)   */}
        {/* ======================= */}
        <div className="xl:col-span-7 print:col-span-12 print:w-full print:m-0 print:p-0">
          <div className="sticky top-6">
            <div className="overflow-x-auto pb-10 w-full no-scrollbar print:overflow-visible">
              
              {/* Kertas A4 Container */}
              <div className="min-w-[800px] w-full max-w-[900px] mx-auto bg-white print:bg-transparent shadow-2xl print:shadow-none rounded-2xl print:rounded-none overflow-hidden relative">
                
                {/* Stamp Status Overlay */}
                {invoiceData.status === 'PAID' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none transform -rotate-12 z-0">
                    <div className="border-[12px] border-emerald-600 text-emerald-600 text-[180px] font-black p-8 rounded-3xl uppercase tracking-widest leading-none">PAID</div>
                  </div>
                )}

                <div className="p-12 sm:p-14 relative z-10">
                  
                  {/* Header Invoice */}
                  <div className="flex justify-between items-start mb-14">
                    <div className="max-w-[300px]">
                      {logo ? (
                        <img src={logo} alt="Logo" className="max-h-24 object-contain mb-4" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-white font-black text-3xl shadow-lg" style={{ backgroundColor: themeColor }}>
                          {invoiceData.myName ? invoiceData.myName.charAt(0).toUpperCase() : "I"}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-widest mb-2" style={{ color: themeColor }}>Invoice</h1>
                      <p className="text-slate-500 font-bold tracking-wider mb-2 text-lg">#{invoiceData.invoiceNo || "INV-XXXX-001"}</p>
                      <div className="flex justify-end items-center gap-5 text-xs mt-6">
                        <div className="text-right">
                          <p className="text-slate-400 font-bold uppercase tracking-widest mb-1">Tanggal</p>
                          <p className="text-slate-800 font-semibold">{invoiceData.date || "-"}</p>
                        </div>
                        <div className="h-10 w-px bg-slate-200"></div>
                        <div className="text-right">
                          <p className="text-slate-400 font-bold uppercase tracking-widest mb-1">Jatuh Tempo</p>
                          <p className="text-slate-800 font-semibold">{invoiceData.dueDate || "-"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billed To & From */}
                  <div className="grid grid-cols-2 gap-12 mb-12">
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b-2 inline-block pb-1.5" style={{ borderColor: themeColor }}>Informasi Pengirim</h3>
                      <p className="text-base font-bold text-slate-800 mb-1">{invoiceData.myName || "Nama Anda"}</p>
                      {invoiceData.myRole && <p className="text-sm font-medium text-slate-500 mb-1">{invoiceData.myRole}</p>}
                      {invoiceData.myEmail && <p className="text-sm text-slate-600 mb-1">{invoiceData.myEmail}</p>}
                      {invoiceData.myPhone && <p className="text-sm text-slate-600">{invoiceData.myPhone}</p>}
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b-2 inline-block pb-1.5" style={{ borderColor: themeColor }}>Tagihan Kepada</h3>
                      <p className="text-base font-bold text-slate-800 mb-1">{invoiceData.clientName || "Nama Klien / Perusahaan"}</p>
                      {invoiceData.clientAddress && <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{invoiceData.clientAddress}</p>}
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="mb-10 overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr style={{ backgroundColor: themeColor + '15' }}>
                          <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest" style={{ color: themeColor }}>Deskripsi Item</th>
                          <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest text-center w-24" style={{ color: themeColor }}>Qty</th>
                          <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest text-right w-44" style={{ color: themeColor }}>Harga</th>
                          <th className="py-4 px-6 text-[11px] font-bold uppercase tracking-widest text-right w-44" style={{ color: themeColor }}>Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {items.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-6 text-sm text-slate-800 font-medium">{item.description || "-"}</td>
                            <td className="py-4 px-6 text-sm text-slate-600 font-medium text-center">{item.qty || 0}</td>
                            <td className="py-4 px-6 text-sm text-slate-600 font-medium text-right">{formatCurrency(item.price || 0, currency)}</td>
                            <td className="py-4 px-6 text-sm text-slate-800 font-bold text-right">{formatCurrency((item.qty || 0) * (item.price || 0), currency)}</td>
                          </tr>
                        ))}
                        {items.length === 0 && (
                          <tr>
                            <td colSpan="4" className="py-8 text-center text-slate-400 text-sm font-medium">Belum ada item ditambahkan.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals Calculation */}
                  <div className="flex justify-end mb-16">
                    <div className="w-full max-w-[320px] space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-semibold">Subtotal</span>
                        <span className="text-slate-800 font-bold">{formatCurrency(subtotal, currency)}</span>
                      </div>
                      {Number(invoiceData.taxRate) > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 font-semibold">Pajak ({invoiceData.taxRate}%)</span>
                          <span className="text-slate-800 font-bold">{formatCurrency(taxAmount, currency)}</span>
                        </div>
                      )}
                      {Number(invoiceData.discount) > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 font-semibold">Diskon</span>
                          <span className="text-red-500 font-bold">-{formatCurrency(discountAmount, currency)}</span>
                        </div>
                      )}
                      <div className="h-[2px] w-full bg-slate-100 my-4"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-black uppercase tracking-widest text-slate-800">Total Akhir</span>
                        <span className="text-2xl font-black" style={{ color: themeColor }}>{formatCurrency(total, currency)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment & Signature Grid */}
                  <div className="grid grid-cols-2 gap-8 items-end mt-12">
                    <div className="space-y-8">
                      {/* Bank Detail */}
                      {(invoiceData.bankName || invoiceData.accNumber || invoiceData.accName) && (
                        <div>
                          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b-2 inline-block pb-1.5" style={{ borderColor: themeColor }}>Info Pembayaran</h3>
                          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                            {invoiceData.bankName && <p className="text-sm font-bold text-slate-800 mb-1">{invoiceData.bankName}</p>}
                            {invoiceData.accNumber && <p className="text-lg font-mono font-bold text-slate-700 mb-1 tracking-wider">{invoiceData.accNumber}</p>}
                            {invoiceData.accName && <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">A/N {invoiceData.accName}</p>}
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {invoiceData.notes && (
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Catatan:</p>
                          <p className="text-xs text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">{invoiceData.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Signature */}
                    <div className="text-right flex flex-col items-end pr-4">
                      <p className="text-xs text-slate-500 font-bold mb-2">Hormat Kami,</p>
                      <div className="h-24 flex items-center justify-end overflow-hidden">
                        <span className="text-6xl opacity-80 whitespace-nowrap" style={{ color: themeColor, fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
                          {invoiceData.signatureName || invoiceData.myName || "Signature"}
                        </span>
                      </div>
                      <div className="w-56 border-b-2 border-slate-200 mt-2 mb-3"></div>
                      <p className="text-sm font-bold text-slate-800">{invoiceData.myName || "Nama Anda"}</p>
                      {invoiceData.myRole && <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{invoiceData.myRole}</p>}
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