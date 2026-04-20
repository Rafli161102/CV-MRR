"use client";

import React, { useState, useRef, useEffect } from 'react';

// --- Komponen Pendukung Terintegrasi ---
const Icons = {
  Document: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
  Print: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Image: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Stamp: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>,
};

const formatCurrency = (value, currency = "IDR") => {
  const isIDR = currency === "IDR";
  const numValue = Number(value) || 0;
  return new Intl.NumberFormat(isIDR ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: isIDR ? 0 : 2,
    maximumFractionDigits: isIDR ? 0 : 2
  }).format(numValue);
};

const CleanInput = ({ label, type = "text", name, value, onChange, onBlur, placeholder, hint, maxLength, prefix, suffix }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center">
        <span>{label}</span>
        {hint && <span className="text-slate-500 normal-case tracking-normal font-normal text-[10px]">{hint}</span>}
      </label>
    )}
    <div className="relative flex items-center w-full">
      {prefix && <span className="absolute left-4 text-slate-500 font-medium text-sm z-10 pointer-events-none">{prefix}</span>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all ${prefix ? 'pl-10' : 'pl-4'} ${suffix ? 'pr-16' : 'pr-4'}`}
      />
      {suffix && <span className="absolute right-4 text-slate-500 font-bold text-[11px] uppercase tracking-widest z-10 pointer-events-none">{suffix}</span>}
    </div>
  </div>
);

const CleanTextarea = ({ label, name, value, onChange, placeholder, rows = 2, hint }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center">
        <span>{label}</span>
        {hint && <span className="text-slate-500 normal-case tracking-normal font-normal text-[10px]">{hint}</span>}
      </label>
    )}
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none leading-relaxed"
    />
  </div>
);

const CustomDropdown = ({ label, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={dropdownRef}>
      {label && <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>}
      <div className="relative">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm flex justify-between items-center cursor-pointer transition-all ${isOpen ? 'border-cyan-500 ring-1 ring-cyan-500 text-white' : 'border-white/10 text-slate-300 hover:border-white/30'}`}
        >
          <span className="truncate">{selectedLabel}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>

        {isOpen && (
          <div className="absolute z-50 top-full mt-2 w-full bg-[#0f172a] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
            <div className="p-2 border-b border-white/10">
              <input 
                type="text" 
                placeholder="Cari Bank/Platform..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-56 overflow-y-auto no-scrollbar py-1">
              {filteredOptions.length > 0 ? filteredOptions.map((opt, i) => (
                <div 
                  key={i} 
                  onClick={() => { onChange(opt.value); setIsOpen(false); setSearchTerm(""); }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${value === opt.value ? 'bg-cyan-500/20 text-cyan-300 font-bold border-l-2 border-cyan-500' : 'text-slate-300 hover:bg-white/5 border-l-2 border-transparent'}`}
                >
                  {opt.label}
                </div>
              )) : <div className="px-4 py-3 text-xs text-slate-500 text-center">Pencarian tidak ditemukan</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- KAMUS TRANSLATE (AI MULTI-LANGUAGE) ---
const dict = {
  id: {
    invoice: "INVOICE", ref: "Referensi Proyek", date: "Tanggal Terbit", dueDate: "Jatuh Tempo",
    from: "Informasi Pengirim", to: "Ditagihkan Kepada",
    desc: "Deskripsi Layanan / Item", qty: "Qty", price: "Harga Satuan", total: "Jumlah",
    subtotal: "Subtotal", discount: "Diskon", tax: "Pajak", grandTotal: "Total Keseluruhan",
    payment: "Instruksi Pembayaran", bank: "Bank/Platform", accNum: "No. Rekening/Akun", accName: "Atas Nama", swift: "SWIFT / Routing",
    notes: "Catatan & Syarat", signature: "Hormat Kami,", paid: "LUNAS", companyPlaceholder: "NAMA PERUSAHAAN"
  },
  en: {
    invoice: "INVOICE", ref: "Project Reference", date: "Date of Issue", dueDate: "Due Date",
    from: "Sender Information", to: "Billed To",
    desc: "Service Description", qty: "Qty", price: "Unit Price", total: "Amount",
    subtotal: "Subtotal", discount: "Discount", tax: "Tax", grandTotal: "Grand Total",
    payment: "Payment Instructions", bank: "Bank/Platform", accNum: "Account Number", accName: "Account Name", swift: "SWIFT / Routing",
    notes: "Notes & Terms", signature: "Sincerely,", paid: "PAID", companyPlaceholder: "COMPANY NAME"
  }
};

// --- DAFTAR BANK LENGKAP ---
const bankOptions = [
  { value: "", label: "-- Pilih Metode Pembayaran / Bank --" },
  { value: "PayPal", label: "PayPal" },
  { value: "Stripe", label: "Stripe" },
  { value: "Wise (TransferWise)", label: "Wise (TransferWise)" },
  { value: "Payoneer", label: "Payoneer" },
  { value: "JPMorgan Chase", label: "JPMorgan Chase" },
  { value: "Bank of America", label: "Bank of America" },
  { value: "Citibank", label: "Citibank" },
  { value: "Wells Fargo", label: "Wells Fargo" },
  { value: "HSBC", label: "HSBC" },
  { value: "Standard Chartered", label: "Standard Chartered" },
  { value: "DBS Bank", label: "DBS Bank" },
  { value: "OCBC", label: "OCBC Bank" },
  { value: "Revolut", label: "Revolut" },
  { value: "Bank Central Asia (BCA)", label: "BCA (Bank Central Asia)" },
  { value: "Bank Mandiri", label: "Bank Mandiri" },
  { value: "Bank Negara Indonesia (BNI)", label: "BNI (Bank Negara Indonesia)" },
  { value: "Bank Rakyat Indonesia (BRI)", label: "BRI (Bank Rakyat Indonesia)" },
  { value: "Bank Syariah Indonesia (BSI)", label: "BSI (Bank Syariah Indonesia)" },
  { value: "Bank CIMB Niaga", label: "Bank CIMB Niaga" },
  { value: "Bank Permata", label: "Bank Permata" },
  { value: "Bank Danamon", label: "Bank Danamon" },
  { value: "Bank Mega", label: "Bank Mega" },
  { value: "Bank OCBC NISP", label: "Bank OCBC NISP" },
  { value: "Bank BTN", label: "Bank BTN" },
  { value: "Bank BTPN", label: "Bank BTPN" },
  { value: "BCA Digital (Blu)", label: "BCA Digital (Blu)" },
  { value: "Bank Jago", label: "Bank Jago" },
  { value: "SeaBank", label: "SeaBank" },
  { value: "Bank Neo Commerce (BNC)", label: "Bank Neo Commerce (BNC)" },
  { value: "GoPay", label: "GoPay (E-Wallet)" },
  { value: "OVO", label: "OVO (E-Wallet)" },
  { value: "DANA", label: "DANA (E-Wallet)" },
  { value: "ShopeePay", label: "ShopeePay (E-Wallet)" }
];

// --- TEMPLATES COMPONENTS (KONSISTEN FIXED SCALING & COMPACT 1 PAGE A4) ---

const SignatureBlock = ({ invoiceData, stamp, themeColor, t }) => (
  <div className="relative inline-flex flex-col items-center justify-end pt-2 min-w-[200px] page-break-inside-avoid">
    <p className="text-[11px] text-slate-600 font-bold mb-2 relative z-10 w-full text-center">{t.signature}</p>
    
    <div className="relative h-20 flex items-center justify-center w-full">
      <span className="text-[40px] opacity-80 z-10 whitespace-nowrap" style={{ color: themeColor, fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
        {invoiceData.signatureName || invoiceData.myName || "Signature"}
      </span>
      {stamp && (
         <img 
           src={stamp} 
           alt="Stamp" 
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 object-contain opacity-90 mix-blend-multiply pointer-events-none transform -rotate-[15deg] z-20" 
         />
      )}
    </div>

    <div className="w-full border-b-[2px] rounded-full border-slate-300 mt-1 mb-1.5 z-10 relative"></div>
    <p className="text-[12px] font-black text-slate-800 z-10 relative text-center w-full">{invoiceData.myName || "Nama Pengirim"}</p>
    {invoiceData.myRole && <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 z-10 relative text-center w-full">{invoiceData.myRole}</p>}
  </div>
);

// 1. Template Modern
const TemplateModern = ({ invoiceData, items, logo, stamp, themeColor, currency, subtotal, taxAmount, discountAmount, total, t }) => (
  <div className="relative bg-white text-slate-900 overflow-hidden w-full h-full flex flex-col font-sans">
    <div className="absolute top-0 left-0 w-full h-2.5 transition-colors duration-300" style={{ backgroundColor: themeColor }}></div>
    {invoiceData.status === 'PAID' && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none transform -rotate-12 z-0">
        <div className="border-[12px] border-emerald-600 text-emerald-600 text-[140px] font-black p-6 rounded-3xl uppercase tracking-widest leading-none shadow-2xl">{t.paid}</div>
      </div>
    )}
    
    <div className="p-10 relative z-10 flex-grow flex flex-col">
      {/* Header */}
      <div className="flex flex-row justify-between items-start mb-6 gap-6 shrink-0">
        <div style={{ flex: 1.618 }}>
          {logo ? (
            <img src={logo} alt="Logo" className="max-h-16 object-contain mb-2" />
          ) : (
            <h2 className="text-2xl font-black tracking-tight mb-2 transition-colors duration-300 uppercase" style={{ color: themeColor }}>
              {invoiceData.myName || t.companyPlaceholder}
            </h2>
          )}
          {invoiceData.projectName && (
            <div className="mt-1 inline-block bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t.ref}</p>
              <p className="text-[12px] font-bold text-slate-800">{invoiceData.projectName}</p>
            </div>
          )}
        </div>
        <div className="text-right" style={{ flex: 1 }}>
          <h1 className="text-3xl font-black uppercase tracking-widest mb-1 transition-colors duration-300" style={{ color: themeColor }}>{t.invoice}</h1>
          <p className="text-slate-500 font-bold tracking-wider mb-2 text-sm">#{invoiceData.invoiceNo || "INV-XXXX"}</p>
          <div className="flex flex-col items-end gap-1 text-[9px] mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex justify-between w-full">
              <p className="text-slate-400 font-bold uppercase tracking-widest">{t.date}</p>
              <p className="text-slate-800 font-semibold">{invoiceData.date || "-"}</p>
            </div>
            <div className="w-full h-px bg-slate-200 my-0.5"></div>
            <div className="flex justify-between w-full">
              <p className="text-slate-400 font-bold uppercase tracking-widest">{t.dueDate}</p>
              <p className="text-slate-800 font-semibold">{invoiceData.dueDate || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Block */}
      <div className="flex flex-row gap-6 mb-6 bg-slate-50/70 p-4 rounded-2xl border border-slate-100/80 shrink-0">
        <div className="border-r border-slate-200/60 pr-5" style={{ flex: 1 }}>
          <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 border-b-2 inline-block pb-1 transition-colors duration-300" style={{ borderColor: themeColor }}>{t.from}</h3>
          <p className="text-[12px] font-bold text-slate-800 mb-1 leading-tight">{invoiceData.myName || "Nama Pengirim"}</p>
          {invoiceData.myRole && <p className="text-[10px] font-medium text-slate-500 mb-1">{invoiceData.myRole}</p>}
          {invoiceData.myEmail && <p className="text-[10px] text-slate-600 mb-0.5">{invoiceData.myEmail}</p>}
          {invoiceData.myPhone && <p className="text-[10px] text-slate-600 mb-1.5">{invoiceData.myPhone}</p>}
          {invoiceData.myTaxId && <p className="text-[9px] font-bold text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-md inline-block">Tax ID: {invoiceData.myTaxId}</p>}
        </div>
        <div className="pl-1" style={{ flex: 1.618 }}>
          <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 border-b-2 inline-block pb-1 transition-colors duration-300" style={{ borderColor: themeColor }}>{t.to}</h3>
          <p className="text-[12px] font-bold text-slate-800 mb-1 leading-tight">{invoiceData.clientName || "Nama Klien / Perusahaan"}</p>
          {invoiceData.clientAddress && <p className="text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed mb-1.5">{invoiceData.clientAddress}</p>}
          {invoiceData.clientTaxId && <p className="text-[9px] font-bold text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-md inline-block">Tax ID: {invoiceData.clientTaxId}</p>}
        </div>
      </div>

      {/* Table Item (Super Padat) */}
      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200/80 shadow-sm shrink-0">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="transition-colors duration-300" style={{ backgroundColor: themeColor + '15' }}>
              <th className="py-2.5 px-4 text-[9px] font-black uppercase tracking-widest transition-colors duration-300 w-[55%]" style={{ color: themeColor }}>{t.desc}</th>
              <th className="py-2.5 px-3 text-[9px] font-black uppercase tracking-widest text-center transition-colors duration-300 w-[10%]" style={{ color: themeColor }}>{t.qty}</th>
              <th className="py-2.5 px-4 text-[9px] font-black uppercase tracking-widest text-right transition-colors duration-300 w-[17.5%]" style={{ color: themeColor }}>{t.price}</th>
              <th className="py-2.5 px-4 text-[9px] font-black uppercase tracking-widest text-right transition-colors duration-300 w-[17.5%]" style={{ color: themeColor }}>{t.total}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors break-inside-avoid">
                <td className="py-2.5 px-4">
                  <p className="text-[11px] text-slate-800 font-bold leading-tight">{item.description || `Item Tagihan #${index + 1}`}</p>
                  {item.details && <p className="text-[9px] text-slate-500 mt-0.5 whitespace-pre-wrap leading-relaxed border-l-2 pl-1.5" style={{ borderColor: themeColor + '40' }}>{item.details}</p>}
                </td>
                <td className="py-2.5 px-3 text-[10px] text-slate-600 font-medium text-center align-top pt-2.5">{item.qty || 0}</td>
                <td className="py-2.5 px-4 text-[10px] text-slate-600 font-medium text-right align-top pt-2.5">{formatCurrency(item.price || 0, currency)}</td>
                <td className="py-2.5 px-4 text-[10px] text-slate-800 font-bold text-right align-top bg-slate-50/40 pt-2.5">{formatCurrency((item.qty || 0) * (item.price || 0), currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Bawah */}
      <div className="flex flex-row items-start gap-6 mt-auto pt-2 break-inside-avoid pb-6">
        <div className="space-y-4" style={{ flex: 1.618 }}>
          {(invoiceData.bankName || invoiceData.accNumber || invoiceData.accName || invoiceData.bankCode) && (
            <div>
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 border-b-2 inline-block pb-1 transition-colors duration-300" style={{ borderColor: themeColor }}>{t.payment}</h3>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300" style={{ backgroundColor: themeColor }}></div>
                {invoiceData.bankName && <p className="text-[10px] font-bold text-slate-800 mb-0.5">{invoiceData.bankName}</p>}
                {invoiceData.accNumber && <p className="text-[13px] font-mono font-black text-slate-700 mb-1 tracking-widest">{invoiceData.accNumber}</p>}
                {invoiceData.accName && <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">{t.accName}: {invoiceData.accName}</p>}
                {invoiceData.bankCode && <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 pt-1.5 border-t border-slate-200">{t.swift}: <span className="font-mono text-slate-700">{invoiceData.bankCode}</span></p>}
              </div>
            </div>
          )}
          {invoiceData.notes && (
            <div>
              <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 border-b-2 inline-block pb-1 transition-colors duration-300" style={{ borderColor: themeColor }}>{t.notes}</h3>
              <p className="text-[9px] text-slate-600 font-medium whitespace-pre-wrap leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100/80">{invoiceData.notes}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4" style={{ flex: 1 }}>
          <div className="w-full space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-500 font-bold">{t.subtotal}</span>
              <span className="text-slate-800 font-bold">{formatCurrency(subtotal, currency)}</span>
            </div>
            {Number(invoiceData.discount) > 0 && (
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-bold">{t.discount} {invoiceData.discountType === 'percent' ? `(${invoiceData.discount}%)` : ''}</span>
                <span className="text-red-500 font-bold">-{formatCurrency(discountAmount, currency)}</span>
              </div>
            )}
            {Number(invoiceData.taxRate) > 0 && (
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-bold">{t.tax} ({invoiceData.taxRate}%)</span>
                <span className="text-slate-800 font-bold">{formatCurrency(taxAmount, currency)}</span>
              </div>
            )}
            <div className="h-px w-full bg-slate-200/80 my-1.5"></div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{t.grandTotal}</span>
              <span className="text-[18px] font-black leading-tight transition-colors duration-300" style={{ color: themeColor }}>{formatCurrency(total, currency)}</span>
            </div>
          </div>

          <div className="flex justify-end w-full">
            <SignatureBlock invoiceData={invoiceData} stamp={stamp} themeColor={themeColor} t={t} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 2. Template Minimalis
const TemplateMinimal = ({ invoiceData, items, logo, stamp, themeColor, currency, subtotal, taxAmount, discountAmount, total, t }) => (
  <div className="relative bg-white text-slate-900 overflow-hidden w-full h-full p-10 font-sans flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.15)] print:shadow-none">
    {invoiceData.status === 'PAID' && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none transform -rotate-12 z-0">
        <div className="border-[12px] border-black text-black text-[140px] font-black p-6 uppercase tracking-widest leading-none">{t.paid}</div>
      </div>
    )}
    
    <div className="flex flex-row justify-between items-end border-b-[2px] pb-4 mb-6 transition-colors duration-300 shrink-0" style={{ borderColor: themeColor }}>
      <div style={{ flex: 1.618 }}>
        <h1 className="text-4xl font-light tracking-widest mb-1.5 text-slate-900">{t.invoice}</h1>
        <p className="text-slate-500 font-bold tracking-widest text-sm">#{invoiceData.invoiceNo || "INV-XXXX"}</p>
      </div>
      <div className="text-right flex justify-end" style={{ flex: 1 }}>
        {logo ? (
          <img src={logo} alt="Logo" className="max-h-14 object-contain" />
        ) : (
          <h2 className="text-2xl font-black tracking-tight transition-colors duration-300 uppercase" style={{ color: themeColor }}>
             {invoiceData.myName || t.companyPlaceholder}
          </h2>
        )}
      </div>
    </div>

    <div className="flex flex-row gap-6 mb-6 shrink-0">
      <div className="space-y-3" style={{ flex: 1.618 }}>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.to}:</p>
          <p className="text-[13px] font-bold text-slate-800 leading-tight mb-1">{invoiceData.clientName || "Nama Klien / Perusahaan"}</p>
          {invoiceData.clientAddress && <p className="text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed">{invoiceData.clientAddress}</p>}
          {invoiceData.clientTaxId && <p className="text-[9px] text-slate-500 mt-1.5 font-medium">Tax ID: {invoiceData.clientTaxId}</p>}
        </div>
        {invoiceData.projectName && (
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.ref}:</p>
            <p className="text-[11px] font-bold text-slate-800">{invoiceData.projectName}</p>
          </div>
        )}
      </div>

      <div className="space-y-4 text-right" style={{ flex: 1 }}>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.from}:</p>
          <p className="text-[12px] font-bold text-slate-800 mb-0.5">{invoiceData.myName || "Nama Anda"}</p>
          {invoiceData.myEmail && <p className="text-[10px] text-slate-600">{invoiceData.myEmail}</p>}
          {invoiceData.myPhone && <p className="text-[10px] text-slate-600">{invoiceData.myPhone}</p>}
          {invoiceData.myTaxId && <p className="text-[9px] text-slate-500 mt-1 font-medium">Tax ID: {invoiceData.myTaxId}</p>}
        </div>
        <div className="grid grid-cols-2 gap-2 text-left bg-slate-50 p-2.5 rounded-xl">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t.date}:</p>
            <p className="text-[10px] font-bold text-slate-800">{invoiceData.date || "-"}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t.dueDate}:</p>
            <p className="text-[10px] font-bold text-slate-800">{invoiceData.dueDate || "-"}</p>
          </div>
        </div>
      </div>
    </div>

    <table className="w-full text-left mb-6 table-fixed shrink-0">
      <thead>
        <tr className="border-b-[2px] border-slate-800">
          <th className="py-2.5 px-2 text-[9px] font-black text-slate-800 uppercase tracking-widest w-[55%]">{t.desc}</th>
          <th className="py-2.5 px-2 text-[9px] font-black text-slate-800 uppercase tracking-widest text-center w-[10%]">{t.qty}</th>
          <th className="py-2.5 px-2 text-[9px] font-black text-slate-800 uppercase tracking-widest text-right w-[17.5%]">{t.price}</th>
          <th className="py-2.5 px-2 text-[9px] font-black text-slate-800 uppercase tracking-widest text-right w-[17.5%]">{t.total}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {items.map((item, index) => (
          <tr key={item.id} className="break-inside-avoid">
            <td className="py-2.5 px-2">
              <p className="text-[11px] text-slate-800 font-bold">{item.description || `Item #${index + 1}`}</p>
              {item.details && <p className="text-[9px] text-slate-500 mt-1 whitespace-pre-wrap leading-relaxed">{item.details}</p>}
            </td>
            <td className="py-2.5 px-2 text-[10px] text-slate-700 text-center align-top pt-2.5">{item.qty || 0}</td>
            <td className="py-2.5 px-2 text-[10px] text-slate-700 text-right align-top pt-2.5">{formatCurrency(item.price || 0, currency)}</td>
            <td className="py-2.5 px-2 text-[11px] text-slate-800 font-black text-right align-top pt-2.5">{formatCurrency((item.qty || 0) * (item.price || 0), currency)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="flex flex-row items-start gap-6 mt-auto pt-4 break-inside-avoid pb-4">
      <div className="space-y-4" style={{ flex: 1.618 }}>
        {(invoiceData.bankName || invoiceData.accNumber || invoiceData.accName || invoiceData.bankCode) && (
          <div>
            <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t.payment}</h3>
            <div className="p-3 border border-slate-200 bg-slate-50 rounded-xl">
              {invoiceData.bankName && <p className="text-[11px] font-bold text-slate-800 mb-0.5">{invoiceData.bankName}</p>}
              {invoiceData.accNumber && <p className="text-[13px] font-mono font-black text-slate-800 tracking-wider mb-1">{invoiceData.accNumber}</p>}
              {invoiceData.accName && <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{t.accName}: {invoiceData.accName}</p>}
              {invoiceData.bankCode && <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1.5 pt-1.5 border-t border-slate-200">{t.swift}: <span className="font-mono text-slate-800">{invoiceData.bankCode}</span></p>}
            </div>
          </div>
        )}
        {invoiceData.notes && (
          <div>
            <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t.notes}</h3>
            <p className="text-[10px] text-slate-600 whitespace-pre-wrap leading-relaxed">{invoiceData.notes}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end" style={{ flex: 1 }}>
        <div className="w-full space-y-2 border-b-[2px] border-slate-800 pb-3 mb-3">
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-600 font-bold">{t.subtotal}</span>
            <span className="font-black text-slate-800">{formatCurrency(subtotal, currency)}</span>
          </div>
          {Number(invoiceData.discount) > 0 && (
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-600 font-bold">{t.discount} {invoiceData.discountType === 'percent' ? `(${invoiceData.discount}%)` : ''}</span>
              <span className="font-black text-red-600">-{formatCurrency(discountAmount, currency)}</span>
            </div>
          )}
          {Number(invoiceData.taxRate) > 0 && (
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-600 font-bold">{t.tax} ({invoiceData.taxRate}%)</span>
              <span className="font-black text-slate-800">{formatCurrency(taxAmount, currency)}</span>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-1 mb-6 text-right">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{t.grandTotal}</span>
          <span className="text-[20px] font-black transition-colors duration-300" style={{ color: themeColor }}>{formatCurrency(total, currency)}</span>
        </div>

        <div className="flex justify-end w-full">
           <SignatureBlock invoiceData={invoiceData} stamp={stamp} themeColor={themeColor} t={t} />
        </div>
      </div>
    </div>
  </div>
);

// 3. Template Klasik
const TemplateClassic = ({ invoiceData, items, logo, stamp, themeColor, currency, subtotal, taxAmount, discountAmount, total, t }) => (
  <div className="relative bg-white text-slate-900 overflow-hidden w-full h-full p-10 shadow-[0_10px_40px_rgba(0,0,0,0.15)] print:shadow-none flex flex-col" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
    <div className="text-center mb-6 border-b-2 border-slate-800 pb-4 shrink-0">
      {logo ? (
        <img src={logo} alt="Logo" className="max-h-16 mx-auto mb-3" />
      ) : (
        <h2 className="text-3xl font-bold tracking-tight mb-2 transition-colors duration-300 uppercase" style={{ color: themeColor }}>
          {invoiceData.myName || t.companyPlaceholder}
        </h2>
      )}
      <p className="text-[11px] text-slate-700 leading-relaxed max-w-xl mx-auto">{invoiceData.clientAddress || "Gedung Pusat Bisnis Lt. 3, Jl. Protokol No. 1, Jakarta Pusat, Indonesia"}</p>
      <p className="text-[11px] text-slate-700 mt-0.5">{invoiceData.myEmail} &nbsp;&bull;&nbsp; {invoiceData.myPhone}</p>
      {invoiceData.myTaxId && <p className="text-[10px] text-slate-600 mt-1">Tax ID: {invoiceData.myTaxId}</p>}
    </div>

    <div className="flex flex-row justify-between items-end mb-6 gap-4 shrink-0">
      <h1 className="text-3xl font-bold uppercase tracking-[0.2em] text-slate-900">{t.invoice}</h1>
      <div className="text-right border border-slate-800 p-2.5 bg-slate-50 min-w-[180px]">
        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mb-0.5">{t.ref}</p>
        <p className="text-base font-bold text-slate-900">{invoiceData.invoiceNo || "INV-XXXX-001"}</p>
      </div>
    </div>

    <div className="flex flex-row gap-6 mb-6 shrink-0">
      <div className="border border-slate-800 p-4 relative" style={{ flex: 1.618 }}>
        <h3 className="absolute -top-2.5 left-3 bg-white px-1.5 text-[9px] font-bold text-slate-800 uppercase tracking-widest">{t.to}:</h3>
        <p className="text-[13px] font-bold text-slate-900 mb-1 mt-1">{invoiceData.clientName || "Nama Klien / Instansi"}</p>
        {invoiceData.clientAddress && <p className="text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed">{invoiceData.clientAddress}</p>}
        {invoiceData.clientTaxId && <p className="text-[9px] text-slate-600 mt-1.5">Tax ID: {invoiceData.clientTaxId}</p>}
      </div>
      <div className="flex flex-col gap-3" style={{ flex: 1 }}>
        <div className="border border-slate-800 p-3 relative flex-1">
           <h3 className="absolute -top-2.5 left-3 bg-white px-1.5 text-[9px] font-bold text-slate-800 uppercase tracking-widest">Detail Penagihan</h3>
           <div className="mt-1 flex justify-between">
             <p className="text-[9px] font-bold text-slate-600">{t.date}:</p>
             <p className="text-[10px] font-bold text-slate-900">{invoiceData.date || "-"}</p>
           </div>
           <div className="mt-1 flex justify-between">
             <p className="text-[9px] font-bold text-slate-600">{t.dueDate}:</p>
             <p className="text-[10px] font-bold text-slate-900">{invoiceData.dueDate || "-"}</p>
           </div>
        </div>
        {invoiceData.projectName && (
          <div className="border border-slate-800 p-3 relative flex-1 bg-slate-50">
            <h3 className="absolute -top-2.5 left-3 bg-slate-50 px-1.5 text-[9px] font-bold text-slate-800 uppercase tracking-widest">{t.ref}</h3>
            <p className="text-[11px] font-bold text-slate-900 mt-1.5 leading-tight">{invoiceData.projectName}</p>
          </div>
        )}
      </div>
    </div>

    <table className="w-full text-left mb-6 border-collapse border border-slate-800 table-fixed shrink-0">
      <thead>
        <tr className="transition-colors duration-300" style={{ backgroundColor: themeColor, color: '#ffffff' }}>
          <th className="py-2 px-3 text-[10px] font-bold uppercase tracking-widest border border-slate-800 w-[55%]">{t.desc}</th>
          <th className="py-2 px-2 text-[10px] font-bold uppercase tracking-widest text-center border border-slate-800 w-[10%]">{t.qty}</th>
          <th className="py-2 px-3 text-[10px] font-bold uppercase tracking-widest text-right border border-slate-800 w-[17.5%]">{t.price}</th>
          <th className="py-2 px-3 text-[10px] font-bold uppercase tracking-widest text-right border border-slate-800 w-[17.5%]">{t.total}</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id} className="break-inside-avoid">
            <td className="py-2 px-3 border border-slate-800">
              <p className="text-[11px] text-slate-900 font-bold">{item.description || `Deskripsi Item Ke-${index + 1}`}</p>
              {item.details && <p className="text-[9px] text-slate-700 mt-1 whitespace-pre-wrap leading-relaxed">{item.details}</p>}
            </td>
            <td className="py-2 px-2 text-[10px] text-slate-900 text-center border border-slate-800 align-top pt-2.5">{item.qty || 0}</td>
            <td className="py-2 px-3 text-[10px] text-slate-900 text-right border border-slate-800 align-top pt-2.5">{formatCurrency(item.price || 0, currency)}</td>
            <td className="py-2 px-3 text-[11px] text-slate-900 font-bold text-right border border-slate-800 align-top pt-2.5">{formatCurrency((item.qty || 0) * (item.price || 0), currency)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="flex justify-end mb-6 break-inside-avoid">
      <div className="w-[50%]">
        <table className="w-full border-collapse border border-slate-800">
          <tbody>
            <tr>
              <td className="py-1.5 px-3 border border-slate-800 text-[10px] text-slate-800 font-bold bg-slate-50">{t.subtotal}</td>
              <td className="py-1.5 px-3 border border-slate-800 text-[10px] text-slate-900 font-bold text-right">{formatCurrency(subtotal, currency)}</td>
            </tr>
            {Number(invoiceData.discount) > 0 && (
              <tr>
                <td className="py-1.5 px-3 border border-slate-800 text-[10px] text-slate-800 font-bold bg-slate-50">{t.discount} {invoiceData.discountType === 'percent' ? `(${invoiceData.discount}%)` : ''}</td>
                <td className="py-1.5 px-3 border border-slate-800 text-[10px] text-red-700 font-bold text-right">-{formatCurrency(discountAmount, currency)}</td>
              </tr>
            )}
            {Number(invoiceData.taxRate) > 0 && (
              <tr>
                <td className="py-1.5 px-3 border border-slate-800 text-[10px] text-slate-800 font-bold bg-slate-50">{t.tax} ({invoiceData.taxRate}%)</td>
                <td className="py-1.5 px-3 border border-slate-800 text-[10px] text-slate-900 font-bold text-right">{formatCurrency(taxAmount, currency)}</td>
              </tr>
            )}
            <tr className="transition-colors duration-300">
              <td className="py-2.5 px-3 border border-slate-800 text-[11px] font-bold uppercase tracking-widest text-white transition-colors duration-300" style={{ backgroundColor: themeColor }}>{t.grandTotal}</td>
              <td className="py-2.5 px-3 border border-slate-800 text-[14px] font-bold text-right text-slate-900 bg-slate-100">{formatCurrency(total, currency)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="flex flex-row gap-6 mt-auto pt-2 break-inside-avoid pb-6">
      <div style={{ flex: 1.618 }}>
        {(invoiceData.bankName || invoiceData.accNumber || invoiceData.accName || invoiceData.bankCode) && (
          <div className="mb-4">
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-800 pb-1 mb-1.5">{t.payment}</h3>
            <div className="text-[10px] text-slate-800 leading-relaxed bg-slate-50 p-2.5 border border-slate-200">
              {invoiceData.bankName && <p><strong>{t.bank}:</strong> {invoiceData.bankName}</p>}
              {invoiceData.accNumber && <p><strong>{t.accNum}:</strong> <span className="font-mono">{invoiceData.accNumber}</span></p>}
              {invoiceData.accName && <p><strong>{t.accName}:</strong> {invoiceData.accName}</p>}
              {invoiceData.bankCode && <p className="mt-1 pt-1 border-t border-slate-300"><strong>{t.swift}:</strong> <span className="font-mono">{invoiceData.bankCode}</span></p>}
            </div>
          </div>
        )}
        {invoiceData.notes && (
          <div>
            <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-800 pb-1 mb-1.5">{t.notes}</h3>
            <p className="text-[9px] text-slate-800 whitespace-pre-wrap leading-relaxed">{invoiceData.notes}</p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-end" style={{ flex: 1 }}>
        <SignatureBlock invoiceData={invoiceData} stamp={stamp} themeColor={themeColor} t={t} />
      </div>
    </div>
  </div>
);

// -------------------------------------------------------------------------------

export default function InvoiceTab() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "", date: "", dueDate: "", projectName: "",
    myName: "", myRole: "", myEmail: "", myPhone: "", myTaxId: "",
    clientName: "", clientAddress: "", clientTaxId: "", 
    bankName: "", bankCode: "", accName: "", accNumber: "", 
    taxRate: "", discount: "", discountType: "fixed", notes: "", signatureName: "", status: "UNPAID", 
  });

  useEffect(() => {
    const today = new Date();
    const defaultDueDate = new Date(today);
    defaultDueDate.setDate(defaultDueDate.getDate() + 14);

    setInvoiceData(prev => ({ 
      ...prev, 
      date: today.toISOString().split('T')[0], 
      dueDate: defaultDueDate.toISOString().split('T')[0] 
    }));
  }, []);

  const [language, setLanguage] = useState("id");
  const [currency, setCurrency] = useState("IDR");
  const [template, setTemplate] = useState("modern"); 
  const [paperSize, setPaperSize] = useState("A4"); 
  
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);

  const [stamp, setStamp] = useState(null);
  const stampInputRef = useRef(null);
  
  const presetColors = ["#0891b2", "#2563eb", "#4f46e5", "#059669", "#e11d48", "#1e293b", "#f59e0b", "#9333ea"];
  const [palette, setPalette] = useState(presetColors);
  
  const [hue, setHue] = useState(190);
  const [intensity, setIntensity] = useState(45);
  const [themeColor, setThemeColor] = useState("#0891b2");
  
  const [previewScale, setPreviewScale] = useState(1);
  const previewContainerRef = useRef(null);
  const printAreaRef = useRef(null);

  const [items, setItems] = useState([{ id: 1, description: "", details: "", qty: 1, price: "" }]);
  
  const handleInvoiceChange = (e) => setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  
  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: "", details: "", qty: 1, price: "" }]);
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

  const handleStampUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setStamp(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeStamp = () => {
    setStamp(null);
    if (stampInputRef.current) stampInputRef.current.value = '';
  };

  const setDueDateDays = (days) => {
    if (!invoiceData.date) return;
    const date = new Date(invoiceData.date);
    date.setDate(date.getDate() + days);
    setInvoiceData({ ...invoiceData, dueDate: date.toISOString().split('T')[0] });
  };

  const handleSliderChange = (type, value) => {
    if (type === 'hue') {
      setHue(value);
      setThemeColor(`hsl(${value}, 85%, ${intensity}%)`);
    } else {
      setIntensity(value);
      setThemeColor(`hsl(${hue}, 85%, ${value}%)`);
    }
  };

  const handleHexChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('#') && val.length > 0) val = '#' + val;
    setThemeColor(val);
  };
  
  const handleHexBlur = () => {
    if (themeColor.length === 7 && !palette.includes(themeColor)) {
      setPalette([...palette, themeColor]);
    }
  };

  const addToPalette = () => {
    if (themeColor && !palette.includes(themeColor)) {
      setPalette([...palette, themeColor]);
    }
  };

  // Safe Calculation (Mencegah Bug NaN jika field kosong)
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0), 0);
  
  let discountAmount = 0;
  const numDiscount = parseFloat(invoiceData.discount) || 0;
  if (invoiceData.discountType === 'percent') {
    discountAmount = subtotal * (numDiscount / 100);
  } else {
    discountAmount = numDiscount;
  }
  
  const subtotalAfterDiscount = subtotal - discountAmount;
  const numTaxRate = parseFloat(invoiceData.taxRate) || 0;
  const taxAmount = subtotalAfterDiscount * (numTaxRate / 100);
  const total = subtotalAfterDiscount + taxAmount;

  // Ukuran Pixel Fisik Konversi
  const PAPER_WIDTH = 794; 
  const PAPER_MIN_HEIGHT = 1123; 

  const [actualHeight, setActualHeight] = useState(PAPER_MIN_HEIGHT);

  // Observer untuk mendeteksi penambahan konten melebihi batas 1 halaman
  useEffect(() => {
    if (!printAreaRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for(let entry of entries) {
        setActualHeight(Math.max(entry.contentRect.height, PAPER_MIN_HEIGHT));
      }
    });
    observer.observe(printAreaRef.current);
    return () => observer.disconnect();
  }, [items, template]);

  // Observer untuk auto-scale di desktop / mobile (Hanya Lebar)
  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const containerWidth = entry.contentRect.width;
        if (containerWidth < PAPER_WIDTH) {
          setPreviewScale(containerWidth / PAPER_WIDTH);
        } else {
          setPreviewScale(1);
        }
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const t = dict[language];

  return (
    <div className="w-full relative pb-20 anim-fade-in-up print-reset-layout print:bg-white print:pb-0">
      
      <style dangerouslySetInnerHTML={{__html: `
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        
        input[type=range].custom-color-slider { -webkit-appearance: none; width: 100%; background: transparent; }
        input[type=range].custom-color-slider::-webkit-slider-thumb { -webkit-appearance: none; height: 22px; width: 22px; border-radius: 50%; background: white; border: 4px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); cursor: pointer; margin-top: -7px; }
        input[type=range].custom-color-slider::-webkit-slider-runnable-track { width: 100%; height: 8px; cursor: pointer; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); }
        .track-hue::-webkit-slider-runnable-track { background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%); }
        
        /* ISOLASI PRINT MUTLAK WYSIWYG A4 */
        @media print {
          @page { size: A4; margin: 0; }
          html, body { 
            width: 100% !important; 
            height: auto !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          * {
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
          }
          
          /* Sembunyikan elemen website luar KECUALI area cetak secara penuh */
          body *:not(#print-area):not(#print-area *) { 
             display: none !important;
          }
          
          .no-print, header, nav, footer, aside, .sidebar { display: none !important; }
          
          /* Reset Wrapper Kertas Skala (Penting untuk mengatasi bug margin/background luar) */
          .print-reset-layout {
             display: block !important;
             width: 100% !important;
             height: auto !important;
             margin: 0 !important;
             padding: 0 !important;
             transform: none !important;
             position: static !important;
             overflow: visible !important;
             background: transparent !important;
          }
          
          /* Fokus mutlak pada Kertas (Print Area) ke Arus Dokumen Normal */
          #print-area { 
             display: block !important;
             position: relative !important;
             left: auto !important;
             top: auto !important;
             width: 100% !important; 
             max-width: 210mm !important; 
             height: auto !important;
             box-shadow: none !important;
             margin: 0 auto !important; 
             padding: 0 !important; 
             transform: none !important; /* Hancurkan skala dari layar web */
             background-color: white !important;
             color: black !important;
          }
          
          .break-inside-avoid { break-inside: avoid !important; page-break-inside: avoid !important; }
          .page-break-inside-avoid { page-break-inside: avoid !important; }
          .page-indicator { background-image: none !important; }
        }
        
        /* Garis Putus-putus pembatas halaman (1123px = 1 A4) */
        .page-indicator {
           background-image: repeating-linear-gradient(to bottom, transparent, transparent 1121px, #ef4444 1121px, #ef4444 1123px);
           background-size: 100% 1123px;
        }
      `}} />

      {/* HEADER / JUDUL UTAMA (Style RAB Tab) */}
      <div className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30"><Icons.Document /></div>
            Invoice <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Generator</span>
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">Buat tagihan digital profesional untuk klien Anda secara instan dengan tata letak padat, standar cetak A4 presisi, dan mode bilingual.</p>
        </div>
        <button onClick={() => window.print()} className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-1 z-10">
          <Icons.Print /> Simpan PDF / Cetak
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 print-reset-layout">
        
        {/* ======================= */}
        {/* EDITOR PANEL (KIRI)     */}
        {/* ======================= */}
        <div className="xl:col-span-5 space-y-6 no-print">
          
          {/* Card: Pengaturan Tampilan & Bahasa */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden shadow-xl">
             <div className={`absolute left-0 top-0 w-1.5 h-full transition-colors duration-300`} style={{ background: themeColor }}></div>
             
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-white font-bold flex items-center gap-2">
                <span className="transition-colors duration-300" style={{ color: themeColor }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </span>
                Pengaturan Desain
               </h3>
               {/* AI Translate Toggle */}
               <div className="flex bg-[#1e293b] p-1 rounded-lg border border-white/10 shadow-inner">
                  <button onClick={() => setLanguage('id')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${language === 'id' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>ID</button>
                  <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${language === 'en' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>EN</button>
               </div>
             </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
               <div>
                 <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-widest flex justify-between">Pilih Template Visual</p>
                  <div className="flex flex-col gap-1 bg-white/5 p-1.5 border border-white/10 rounded-xl">
                    {[
                      { id: 'modern', name: 'Modern' },
                      { id: 'minimal', name: 'Minimalis' },
                      { id: 'classic', name: 'Klasik' }
                    ].map(tpl => (
                      <button
                        key={tpl.id}
                        onClick={() => setTemplate(tpl.id)}
                        className={`py-2 px-3 text-left rounded-lg text-xs font-semibold transition-all ${template === tpl.id ? 'bg-white/10 text-white shadow-md' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                        style={template === tpl.id ? { backgroundColor: `${themeColor}40`, color: themeColor } : {}}
                      >
                        {tpl.name}
                      </button>
                    ))}
                  </div>
               </div>

               <div>
                  <CustomDropdown 
                    label="Mata Uang (Currency)" 
                    value={currency} 
                    onChange={setCurrency} 
                    options={[
                      { value: 'IDR', label: 'Rupiah (IDR)' },
                      { value: 'USD', label: 'US Dollar (USD)' },
                      { value: 'EUR', label: 'Euro (EUR)' },
                      { value: 'GBP', label: 'Pound Sterling (GBP)' },
                      { value: 'SGD', label: 'Singapore Dollar (SGD)' }
                    ]} 
                    placeholder="Pilih Mata Uang"
                  />
               </div>
            </div>

            <div className="mb-5 bg-white/5 p-5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-4">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Palet Warna (Bisa Custom)</p>
                 <span className="w-6 h-6 rounded-full shadow-inner border-2 border-white/20 transition-colors duration-300" style={{ backgroundColor: themeColor }}></span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {palette.map((color, idx) => (
                  <button
                    key={`${color}-${idx}`}
                    onClick={() => setThemeColor(color)}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${themeColor === color ? 'border-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.4)] z-10' : 'border-transparent opacity-50 hover:opacity-100 hover:scale-110'}`}
                    style={{ backgroundColor: color }}
                    title={`Pilih warna ${color}`}
                  />
                ))}
                
                <div className="w-px h-6 bg-white/20 mx-1"></div>
                
                {/* Custom HEX Code Input */}
                <div className="flex bg-[#030712] rounded-lg p-1 border border-white/10 items-center hover:border-white/30 transition-colors" title="Input Kustom HEX Kode Warna (Bisa Di-Paste)">
                  <div className="relative w-6 h-6 rounded overflow-hidden mr-2 shadow-inner border border-white/20 cursor-pointer">
                    <input 
                      type="color" 
                      value={themeColor.length === 7 ? themeColor : "#0891b2"} 
                      onChange={(e) => setThemeColor(e.target.value)} 
                      onBlur={handleHexBlur}
                      className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer border-0 p-0" 
                    />
                  </div>
                  <input 
                    type="text" 
                    value={themeColor} 
                    onChange={handleHexChange} 
                    onBlur={handleHexBlur}
                    className="bg-transparent border-none text-white text-[11px] w-[60px] uppercase font-mono focus:outline-none tracking-widest" 
                    placeholder="#HEX"
                    maxLength={7}
                  />
                </div>

                {/* Add to Palette Button */}
                <button 
                  onClick={addToPalette} 
                  className="w-7 h-7 rounded-full border border-dashed border-white/40 flex items-center justify-center text-white/50 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                  title="Simpan Warna Ini"
                >
                  <Icons.Plus />
                </button>
              </div>

              {/* Slider Warna Tingkat Lanjut */}
              <div className="space-y-5 pt-5 border-t border-white/10">
                <div>
                  <div className="flex justify-between text-[9px] text-slate-500 mb-2 font-bold uppercase tracking-widest">
                    <span>Hue Slider (Spektrum Warna)</span>
                  </div>
                  <input type="range" min="0" max="360" value={hue} onChange={(e) => handleSliderChange('hue', e.target.value)} className="custom-color-slider track-hue" />
                </div>
                
                <div>
                  <div className="flex justify-between text-[9px] text-slate-500 mb-2 font-bold uppercase tracking-widest">
                    <span>Intensitas (Gelap/Terang)</span>
                  </div>
                  <input type="range" min="20" max="80" value={intensity} onChange={(e) => handleSliderChange('intensity', e.target.value)} className="custom-color-slider" />
                  <style dangerouslySetInnerHTML={{__html: `
                    input[type=range].custom-color-slider:not(.track-hue)::-webkit-slider-runnable-track {
                      background: linear-gradient(to right, hsl(${hue}, 85%, 20%), hsl(${hue}, 85%, 50%), hsl(${hue}, 85%, 80%));
                    }
                  `}} />
                </div>
              </div>
            </div>

            <div>
               <p className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-widest">Aset Branding</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Upload Logo */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">Logo Perusahaan</span>
                    {logo ? (
                      <div className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2 h-14 flex items-center justify-center">
                        <img src={logo} alt="Logo" className="max-h-10 w-auto object-contain" />
                        <button onClick={removeLogo} className="absolute inset-0 bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] uppercase tracking-wider">
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 px-4 py-0 h-14 bg-white/5 border border-dashed border-white/20 rounded-xl text-[11px] text-slate-300 hover:bg-white/10 hover:border-white/40 transition-colors w-full font-medium">
                        <Icons.Image /> Upload Logo
                      </button>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                  </div>

                  {/* Upload Cap Basah */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">Cap Basah / Stempel</span>
                    {stamp ? (
                      <div className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2 h-14 flex items-center justify-center">
                        <img src={stamp} alt="Stamp" className="max-h-10 w-auto object-contain bg-white mix-blend-screen rounded-md px-2" />
                        <button onClick={removeStamp} className="absolute inset-0 bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold text-[10px] uppercase tracking-wider">
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => stampInputRef.current?.click()} className="flex items-center justify-center gap-2 px-4 py-0 h-14 bg-white/5 border border-dashed border-white/20 rounded-xl text-[11px] text-slate-300 hover:bg-white/10 hover:border-white/40 transition-colors w-full font-medium">
                        <Icons.Stamp /> Upload Stempel
                      </button>
                    )}
                    <input type="file" ref={stampInputRef} onChange={handleStampUpload} accept="image/*" className="hidden" />
                  </div>
                </div>
            </div>
          </div>

          {/* Card: Detail Utama */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative shadow-xl">
             <h3 className="text-white font-bold mb-5 flex items-center gap-2">Detail Dokumen</h3>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CleanInput 
                label="No. Invoice" 
                name="invoiceNo" 
                value={invoiceData.invoiceNo} 
                onChange={handleInvoiceChange} 
                placeholder="Misal: INV/2026/04/001" 
              />
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status Tagihan</label>
                <div className="flex bg-[#1e293b] sm:bg-white/5 border border-white/10 rounded-xl p-1">
                    <button onClick={() => setInvoiceData({...invoiceData, status: 'UNPAID'})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${invoiceData.status === 'UNPAID' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-slate-500 hover:text-slate-300'}`}>UNPAID</button>
                    <button onClick={() => setInvoiceData({...invoiceData, status: 'PAID'})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${invoiceData.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'}`}>PAID</button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <CleanInput 
                label="Nama / Referensi Project" 
                name="projectName" 
                value={invoiceData.projectName} 
                onChange={handleInvoiceChange} 
                placeholder="Misal: Redesign Website B2B" 
                hint="Opsional"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CleanInput label="Tanggal Terbit" type="date" name="date" value={invoiceData.date} onChange={handleInvoiceChange} />
              <div>
                <CleanInput label="Jatuh Tempo" type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleInvoiceChange} />
                <div className="flex gap-2 mt-2">
                   <button onClick={() => setDueDateDays(7)} className="flex-1 text-[9px] font-bold bg-[#030712] border border-white/10 hover:bg-white/10 text-slate-400 px-2 py-1.5 rounded-lg transition-colors shadow-sm">+7 Hari</button>
                   <button onClick={() => setDueDateDays(14)} className="flex-1 text-[9px] font-bold bg-[#030712] border border-white/10 hover:bg-white/10 text-slate-400 px-2 py-1.5 rounded-lg transition-colors shadow-sm">+14 Hari</button>
                   <button onClick={() => setDueDateDays(30)} className="flex-1 text-[9px] font-bold bg-[#030712] border border-white/10 hover:bg-white/10 text-slate-400 px-2 py-1.5 rounded-lg transition-colors shadow-sm">+1 Bln</button>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Info Sender & Client */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative shadow-xl">
            <h3 className="text-white font-bold mb-4">Informasi Pengirim</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CleanInput label="Nama Anda / Instansi" name="myName" value={invoiceData.myName} onChange={handleInvoiceChange} placeholder="Misal: Ahmad Fulan / Kreatif Studio" />
              <CleanInput label="Profesi / Jabatan" name="myRole" value={invoiceData.myRole} onChange={handleInvoiceChange} placeholder="Misal: Freelance UI/UX Designer" />
              <CleanInput label="Email Aktif" type="email" name="myEmail" value={invoiceData.myEmail} onChange={handleInvoiceChange} placeholder="Misal: kontak@kreatifstudio.com" />
              <CleanInput label="No. WhatsApp / Telp" name="myPhone" value={invoiceData.myPhone} onChange={handleInvoiceChange} placeholder="Misal: +62 812 3456 7890" />
            </div>
            <div className="mb-6">
              <CleanInput label="NPWP / Tax ID Pribadi" name="myTaxId" value={invoiceData.myTaxId} onChange={handleInvoiceChange} placeholder="Misal: 12.345.678.9-012.000" hint="Opsional" />
            </div>

            <div className="h-px w-full bg-white/10 mb-6"></div>

            <h3 className="text-white font-bold mb-4">Informasi Klien (Ditagihkan Kepada)</h3>
            <div className="space-y-4">
              <CleanInput label="Nama Klien / Perusahaan" name="clientName" value={invoiceData.clientName} onChange={handleInvoiceChange} placeholder="Misal: PT Maju Mundur Sejahtera" />
              <CleanTextarea label="Alamat Klien" name="clientAddress" value={invoiceData.clientAddress} onChange={handleInvoiceChange} placeholder="Misal: Gedung Cyber Lt. 12, Jl. Jend. Sudirman Kav. 21, Jakarta Selatan 12920" rows={2} />
              <CleanInput label="NPWP / Tax ID Klien" name="clientTaxId" value={invoiceData.clientTaxId} onChange={handleInvoiceChange} placeholder="Misal: 98.765.432.1-098.000" hint="Opsional" />
            </div>
          </div>

          {/* Card: Items */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative shadow-xl">
            <h3 className="text-white font-bold mb-4">Rincian Item Penagihan</h3>
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={item.id} className="p-5 bg-white/5 border border-white/10 rounded-xl relative group">
                  <div className="absolute top-3 left-4 text-[10px] font-bold text-slate-500 bg-[#030712] px-2 py-0.5 rounded-md border border-white/10">Item #{index + 1}</div>
                  <button onClick={() => removeItem(item.id)} className="absolute -top-3 -right-3 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" title="Hapus Item">
                    <Icons.Trash />
                  </button>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
                    <div className="sm:col-span-12">
                      <CleanInput label="Nama Pekerjaan / Item" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} placeholder="Misal: UI/UX Design - Landing Page Utama" />
                    </div>
                    <div className="sm:col-span-12">
                      <CleanTextarea 
                        label="Sub-Deskripsi / Rincian Lanjutan" 
                        value={item.details} 
                        onChange={(e) => handleItemChange(item.id, 'details', e.target.value)} 
                        placeholder="Misal: &#10;- 3 Alternatif Konsep Desain&#10;- Revisi maksimal 3 kali" 
                        rows={3} 
                        hint="Opsional"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <CleanInput label="Kuantitas (Qty)" type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} placeholder="1" />
                    </div>
                    <div className="sm:col-span-8">
                      <CleanInput label="Harga Satuan" type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} placeholder="Misal: 2500000" />
                    </div>
                  </div>
                </div>
              ))}
              
              <button onClick={addItem} className="w-full py-3.5 rounded-xl border border-dashed border-white/20 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-300 transition-all flex items-center justify-center gap-2 text-sm font-bold bg-[#030712]/50">
                <Icons.Plus /> Tambah Item / Layanan
              </button>
            </div>
            
            <div className="h-px w-full bg-white/10 my-6"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Modul Potongan / Diskon */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                 <p className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-widest">Pengaturan Diskon</p>
                 <div className="flex mb-3 bg-[#030712] rounded-lg p-1 border border-white/10">
                    <button onClick={() => setInvoiceData(prev => ({...prev, discountType: 'fixed'}))} className={`flex-1 text-[10px] py-1.5 rounded-md transition-all font-bold uppercase tracking-widest ${invoiceData.discountType === 'fixed' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Nominal</button>
                    <button onClick={() => setInvoiceData(prev => ({...prev, discountType: 'percent'}))} className={`flex-1 text-[10px] py-1.5 rounded-md transition-all font-bold uppercase tracking-widest ${invoiceData.discountType === 'percent' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Persen (%)</button>
                 </div>
                 <CleanInput 
                   type="number" 
                   name="discount" 
                   value={invoiceData.discount} 
                   onChange={handleInvoiceChange} 
                   placeholder={invoiceData.discountType === 'fixed' ? "Misal: 50000" : "Misal: 10"} 
                   suffix={invoiceData.discountType === 'percent' ? '%' : currency}
                 />
              </div>

              {/* Modul Pajak */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                 <p className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-widest">Pengaturan Pajak</p>
                 <div className="mb-3">
                    <CleanInput 
                      type="number" 
                      name="taxRate" 
                      value={invoiceData.taxRate} 
                      onChange={handleInvoiceChange} 
                      placeholder="Misal: 11" 
                      suffix="%"
                    />
                 </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setInvoiceData(prev => ({...prev, taxRate: "11"}))} className="text-[10px] font-bold bg-[#030712] border border-white/10 hover:bg-white/10 text-slate-300 px-2.5 py-1.5 rounded-lg transition-colors shadow-sm">PPN 11%</button>
                  <button onClick={() => setInvoiceData(prev => ({...prev, taxRate: "12"}))} className="text-[10px] font-bold bg-[#030712] border border-white/10 hover:bg-white/10 text-slate-300 px-2.5 py-1.5 rounded-lg transition-colors shadow-sm">PPN 12%</button>
                  <button onClick={() => setInvoiceData(prev => ({...prev, taxRate: "0"}))} className="text-[10px] font-bold bg-[#030712] border border-white/10 hover:bg-white/10 text-slate-300 px-2.5 py-1.5 rounded-lg transition-colors shadow-sm">Tanpa Pajak</button>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Info Pembayaran & Ekstra */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative shadow-xl">
            <h3 className="text-white font-bold mb-4">Instruksi Pembayaran</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="sm:col-span-2">
                 <CustomDropdown 
                    label="Bank / Platform Pembayaran" 
                    value={invoiceData.bankName} 
                    onChange={(val) => setInvoiceData({...invoiceData, bankName: val})} 
                    options={bankOptions} 
                    placeholder="-- Klik & Pilih Metode Pembayaran --"
                  />
              </div>
              <div className="sm:col-span-2">
                 <CleanInput 
                   label="SWIFT / BIC / IBAN / Routing Code" 
                   name="bankCode" 
                   value={invoiceData.bankCode} 
                   onChange={handleInvoiceChange} 
                   placeholder="Misal: BOCAUS3NXXX" 
                   hint="Opsional (Untuk Global)"
                 />
              </div>
              <CleanInput label="Nomor Akun / Rekening / Email" name="accNumber" value={invoiceData.accNumber} onChange={handleInvoiceChange} placeholder="Misal: 1234 5678 90" />
              <CleanInput label="Atas Nama (A/N)" name="accName" value={invoiceData.accName} onChange={handleInvoiceChange} placeholder="Misal: Ahmad Fulan" />
            </div>

            <h3 className="text-white font-bold mb-4 mt-6 border-t border-white/10 pt-6">Catatan & Pengesahan</h3>
            <div className="space-y-4">
              <CleanTextarea 
                label="Catatan Tambahan (Tampil di Invoice)" 
                name="notes" 
                value={invoiceData.notes} 
                onChange={handleInvoiceChange} 
                placeholder="Misal: Pembayaran harap ditransfer maksimal 14 hari kerja setelah invoice diterbitkan. Terima kasih." 
                rows={3} 
              />
              <CleanInput 
                label="Nama Tanda Tangan" 
                name="signatureName" 
                value={invoiceData.signatureName} 
                onChange={handleInvoiceChange} 
                placeholder="Misal: Ahmad Fulan, S.Ds." 
                hint="Kosongkan jika sama dg Pengirim"
              />
            </div>
          </div>

        </div>

        {/* ======================= */}
        {/* PREVIEW PANEL (KANAN)   */}
        {/* ======================= */}
        <div className="xl:col-span-7 print-reset-layout flex justify-center">
          
          <div className="sticky top-6 w-full flex justify-center h-fit print-reset-layout" ref={previewContainerRef}>
            
            {/* Auto Scale Wrapper: Membungkus area render agar scaling viewport berjalan mulus. */}
            <div 
               className="w-full flex justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] print-reset-layout"
               style={{ 
                  height: actualHeight * previewScale 
               }}
            >
              <div 
                className="relative transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] print-reset-layout"
                style={{ 
                  width: PAPER_WIDTH * previewScale, 
                  height: actualHeight * previewScale 
                }}
              >
                {/* Kertas Render Area Absolut (Dipaksa WYSIWYG saat Print) */}
                <div id="print-area" ref={printAreaRef}
                  className="bg-white print:bg-transparent shadow-[0_20px_60px_rgba(0,0,0,0.15)] page-indicator transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] print-scale-reset absolute top-0 left-0 origin-top-left"
                  style={{ 
                    width: `${PAPER_WIDTH}px`,
                    minHeight: `${PAPER_MIN_HEIGHT}px`,
                    transform: `scale(${previewScale})`
                  }}
                >
                  {template === 'modern' && <TemplateModern invoiceData={invoiceData} items={items} logo={logo} stamp={stamp} themeColor={themeColor} currency={currency} subtotal={subtotal} taxAmount={taxAmount} discountAmount={discountAmount} total={total} t={t} />}
                  {template === 'minimal' && <TemplateMinimal invoiceData={invoiceData} items={items} logo={logo} stamp={stamp} themeColor={themeColor} currency={currency} subtotal={subtotal} taxAmount={taxAmount} discountAmount={discountAmount} total={total} t={t} />}
                  {template === 'classic' && <TemplateClassic invoiceData={invoiceData} items={items} logo={logo} stamp={stamp} themeColor={themeColor} currency={currency} subtotal={subtotal} taxAmount={taxAmount} discountAmount={discountAmount} total={total} t={t} />}
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}