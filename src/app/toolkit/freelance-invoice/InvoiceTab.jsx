"use client";

import React, { useState, useRef, useEffect } from 'react';

// --- Komponen Pendukung Terintegrasi ---
const formatCurrency = (value, currency = "IDR") => {
  const isIDR = currency === "IDR";
  return new Intl.NumberFormat(isIDR ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: isIDR ? 0 : 2,
    maximumFractionDigits: isIDR ? 0 : 2
  }).format(value || 0);
};

const CleanInput = ({ label, type = "text", name, value, onChange, placeholder, hint, maxLength }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex justify-between">
        {label}
        {hint && <span className="text-slate-500 normal-case tracking-normal font-normal">{hint}</span>}
      </label>
    )}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
    />
  </div>
);

const CleanTextarea = ({ label, name, value, onChange, placeholder, rows = 2, hint }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex justify-between">
        {label}
        {hint && <span className="text-slate-500 normal-case tracking-normal font-normal">{hint}</span>}
      </label>
    )}
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none leading-relaxed"
    />
  </div>
);

// Custom Dropdown (Menggantikan Select Native OS)
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
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm flex justify-between items-center cursor-pointer transition-all ${isOpen ? 'border-indigo-500 ring-1 ring-indigo-500 text-white' : 'border-white/10 text-slate-300 hover:border-white/30'}`}
        >
          <span className="truncate">{selectedLabel}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : 'text-slate-500'}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>

        {isOpen && (
          <div className="absolute z-50 top-full mt-2 w-full bg-[#0f172a] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
            <div className="p-2 border-b border-white/10">
              <input 
                type="text" 
                placeholder="Cari Bank/Platform..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-56 overflow-y-auto no-scrollbar py-1">
              {filteredOptions.length > 0 ? filteredOptions.map((opt, i) => (
                <div 
                  key={i} 
                  onClick={() => { onChange(opt.value); setIsOpen(false); setSearchTerm(""); }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${value === opt.value ? 'bg-indigo-500/20 text-indigo-300 font-bold border-l-2 border-indigo-500' : 'text-slate-300 hover:bg-white/5 border-l-2 border-transparent'}`}
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

// --- DAFTAR BANK & PLATFORM GLOBAL LENGKAP ---
const bankOptions = [
  { value: "", label: "-- Pilih Metode Pembayaran / Bank --" },
  // Global & Payment Gateways
  { value: "PayPal", label: "PayPal" },
  { value: "Stripe", label: "Stripe" },
  { value: "Wise", label: "Wise (TransferWise)" },
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
  // National Banks (Indonesia)
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
  { value: "Bank BTN", label: "Bank BTPN / Jenius" },
  // Digital Banks (Indonesia)
  { value: "BCA Digital (Blu)", label: "BCA Digital (Blu)" },
  { value: "Bank Jago", label: "Bank Jago" },
  { value: "Bank Seabank", label: "SeaBank" },
  { value: "Bank Neo Commerce", label: "Bank Neo Commerce (BNC)" },
  { value: "Allo Bank", label: "Allo Bank" },
  // E-Wallets
  { value: "GoPay", label: "GoPay" },
  { value: "OVO", label: "OVO" },
  { value: "DANA", label: "DANA" },
  { value: "ShopeePay", label: "ShopeePay" },
  { value: "LinkAja", label: "LinkAja" },
];


// --- TEMPLATES COMPONENTS ---

const SignatureBlock = ({ invoiceData, stamp, themeColor }) => (
  <div className="relative inline-flex flex-col items-center justify-end pt-4 min-w-[220px]">
    <p className="text-[12px] md:text-[14px] text-slate-600 font-bold mb-4 relative z-10 w-full text-center">Hormat Kami,</p>
    
    <div className="relative h-24 md:h-32 flex items-center justify-center w-full">
      {/* Tanda Tangan */}
      <span className="text-4xl md:text-[56px] opacity-80 z-10 whitespace-nowrap" style={{ color: themeColor, fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
        {invoiceData.signatureName || invoiceData.myName || "Signature"}
      </span>
      
      {/* Cap Basah (Menimpa Tanda Tangan persis di tengah) */}
      {stamp && (
         <img 
           src={stamp} 
           alt="Stamp" 
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 object-contain opacity-85 mix-blend-multiply pointer-events-none transform -rotate-[15deg] z-20" 
         />
      )}
    </div>

    <div className="w-full border-b-[2px] md:border-b-[3px] rounded-full border-slate-300 mt-2 mb-2 z-10 relative"></div>
    <p className="text-[13px] md:text-[15px] font-black text-slate-800 z-10 relative text-center w-full">{invoiceData.myName || "Nama Pengirim"}</p>
    {invoiceData.myRole && <p className="text-[10px] md:text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1 z-10 relative text-center w-full">{invoiceData.myRole}</p>}
  </div>
);

// 1. Template Modern
const TemplateModern = ({ invoiceData, items, logo, stamp, themeColor, currency, subtotal, taxAmount, discountAmount, total }) => (
  <div className="relative bg-white text-slate-900 overflow-hidden h-full">
    <div className="absolute top-0 left-0 w-full h-3 transition-colors duration-300" style={{ backgroundColor: themeColor }}></div>
    {invoiceData.status === 'PAID' && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none transform -rotate-12 z-0">
        <div className="border-[12px] border-emerald-600 text-emerald-600 text-[140px] md:text-[180px] font-black p-4 md:p-8 rounded-3xl uppercase tracking-widest leading-none shadow-2xl">PAID</div>
      </div>
    )}
    
    <div className="p-8 sm:p-10 md:p-14 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6 md:gap-8">
        <div className="w-full md:w-[61.8%]">
          {logo ? (
            <img src={logo} alt="Logo" className="max-h-20 md:max-h-24 object-contain mb-4" />
          ) : (
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-4 flex items-center justify-center text-white font-black text-2xl md:text-3xl shadow-lg transition-colors duration-300" style={{ backgroundColor: themeColor }}>
              {invoiceData.myName ? invoiceData.myName.charAt(0).toUpperCase() : "I"}
            </div>
          )}
          {invoiceData.projectName && (
            <div className="mt-2 md:mt-4 inline-block bg-slate-50 border border-slate-200 px-3 py-1.5 md:px-4 md:py-2 rounded-xl">
              <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Referensi Proyek</p>
              <p className="text-xs md:text-sm font-bold text-slate-800">{invoiceData.projectName}</p>
            </div>
          )}
        </div>
        <div className="w-full md:w-[38.2%] md:text-right">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-1 md:mb-2 transition-colors duration-300" style={{ color: themeColor }}>Invoice</h1>
          <p className="text-slate-500 font-bold tracking-wider mb-3 md:mb-4 text-lg md:text-xl">#{invoiceData.invoiceNo || "INV-XXXX"}</p>
          <div className="flex flex-col md:items-end gap-1 md:gap-2 text-[10px] md:text-xs mt-2 md:mt-4 bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100">
            <div className="flex justify-between w-full">
              <p className="text-slate-400 font-bold uppercase tracking-widest">Tanggal</p>
              <p className="text-slate-800 font-semibold">{invoiceData.date || "-"}</p>
            </div>
            <div className="w-full h-px bg-slate-200 my-0.5 md:my-1"></div>
            <div className="flex justify-between w-full">
              <p className="text-slate-400 font-bold uppercase tracking-widest">Jatuh Tempo</p>
              <p className="text-slate-800 font-semibold">{invoiceData.dueDate || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10 mb-12 bg-slate-50/70 p-6 md:p-8 rounded-3xl border border-slate-100/80">
        <div className="w-full md:w-[38.2%] md:border-r border-slate-200/60 md:pr-8 border-b md:border-b-0 pb-6 md:pb-0">
          <h3 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 md:mb-4 border-b-2 inline-block pb-1.5 transition-colors duration-300" style={{ borderColor: themeColor }}>Dari (Pengirim)</h3>
          <p className="text-[14px] md:text-base font-bold text-slate-800 mb-1 leading-tight">{invoiceData.myName || "Nama Pengirim"}</p>
          {invoiceData.myRole && <p className="text-xs md:text-sm font-medium text-slate-500 mb-1 md:mb-2">{invoiceData.myRole}</p>}
          {invoiceData.myEmail && <p className="text-[11px] md:text-sm text-slate-600 mb-0.5">{invoiceData.myEmail}</p>}
          {invoiceData.myPhone && <p className="text-[11px] md:text-sm text-slate-600 mb-2 md:mb-3">{invoiceData.myPhone}</p>}
          {invoiceData.myTaxId && <p className="text-[9px] md:text-[11px] font-bold text-slate-500 bg-slate-200/50 px-2 md:px-2.5 py-1 rounded-md inline-block">Tax ID: {invoiceData.myTaxId}</p>}
        </div>
        <div className="w-full md:w-[61.8%] md:pl-2">
          <h3 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 md:mb-4 border-b-2 inline-block pb-1.5 transition-colors duration-300" style={{ borderColor: themeColor }}>Ditagihkan Kepada (Klien)</h3>
          <p className="text-[15px] md:text-lg font-bold text-slate-800 mb-1.5 md:mb-2 leading-tight">{invoiceData.clientName || "Nama Klien / Perusahaan"}</p>
          {invoiceData.clientAddress && <p className="text-xs md:text-sm text-slate-600 whitespace-pre-wrap leading-relaxed mb-2 md:mb-3">{invoiceData.clientAddress}</p>}
          {invoiceData.clientTaxId && <p className="text-[9px] md:text-[11px] font-bold text-slate-500 bg-slate-200/50 px-2 md:px-2.5 py-1 rounded-md inline-block">Tax ID: {invoiceData.clientTaxId}</p>}
        </div>
      </div>

      <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="transition-colors duration-300" style={{ backgroundColor: themeColor + '15' }}>
              <th className="py-3 px-4 md:py-4 md:px-6 text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-colors duration-300 w-[55%]" style={{ color: themeColor }}>Deskripsi Layanan / Item</th>
              <th className="py-3 px-2 md:py-4 md:px-6 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-center w-[10%] transition-colors duration-300" style={{ color: themeColor }}>Qty</th>
              <th className="py-3 px-4 md:py-4 md:px-6 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-right w-[17.5%] transition-colors duration-300" style={{ color: themeColor }}>Harga</th>
              <th className="py-3 px-4 md:py-4 md:px-6 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-right w-[17.5%] transition-colors duration-300" style={{ color: themeColor }}>Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 md:py-5 md:px-6">
                  <p className="text-xs md:text-sm text-slate-800 font-bold leading-tight">{item.description || `Item Tagihan #${index + 1}`}</p>
                  {item.details && <p className="text-[10px] md:text-[12.5px] text-slate-500 mt-1.5 md:mt-2 whitespace-pre-wrap leading-relaxed border-l-2 pl-2 md:pl-3" style={{ borderColor: themeColor + '40' }}>{item.details}</p>}
                </td>
                <td className="py-4 px-2 md:py-5 md:px-6 text-xs md:text-sm text-slate-600 font-medium text-center align-top pt-4 md:pt-5">{item.qty || 0}</td>
                <td className="py-4 px-4 md:py-5 md:px-6 text-xs md:text-sm text-slate-600 font-medium text-right align-top pt-4 md:pt-5">{formatCurrency(item.price || 0, currency)}</td>
                <td className="py-4 px-4 md:py-5 md:px-6 text-xs md:text-sm text-slate-800 font-bold text-right align-top bg-slate-50/40 pt-4 md:pt-5">{formatCurrency((item.qty || 0) * (item.price || 0), currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mt-10">
        <div className="w-full md:w-[50%] space-y-6 md:space-y-8">
          {(invoiceData.bankName || invoiceData.accNumber || invoiceData.accName || invoiceData.bankCode) && (
            <div>
              <h3 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-3 border-b-2 inline-block pb-1 md:pb-1.5 transition-colors duration-300" style={{ borderColor: themeColor }}>Metode Pembayaran</h3>
              <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 transition-colors duration-300" style={{ backgroundColor: themeColor }}></div>
                {invoiceData.bankName && <p className="text-xs md:text-sm font-bold text-slate-800 mb-1">{invoiceData.bankName}</p>}
                {invoiceData.accNumber && <p className="text-base md:text-xl font-mono font-black text-slate-700 mb-1.5 tracking-widest">{invoiceData.accNumber}</p>}
                {invoiceData.accName && <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">A/N: {invoiceData.accName}</p>}
                {invoiceData.bankCode && <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-2 md:mt-3 pt-2 md:pt-3 border-t border-slate-200">SWIFT / Routing: <span className="font-mono text-slate-700">{invoiceData.bankCode}</span></p>}
              </div>
            </div>
          )}
          {invoiceData.notes && (
            <div>
              <h3 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 md:mb-3 border-b-2 inline-block pb-1 md:pb-1.5 transition-colors duration-300" style={{ borderColor: themeColor }}>Syarat & Ketentuan</h3>
              <p className="text-[11px] md:text-[13px] text-slate-600 font-medium whitespace-pre-wrap leading-relaxed bg-slate-50/50 p-4 md:p-5 rounded-2xl border border-slate-100/80">{invoiceData.notes}</p>
            </div>
          )}
        </div>

        <div className="w-full md:w-[45%] flex flex-col items-end gap-8 md:gap-10">
          <div className="w-full space-y-2.5 md:space-y-3 bg-slate-50 p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-slate-500 font-bold">Subtotal</span>
              <span className="text-slate-800 font-bold">{formatCurrency(subtotal, currency)}</span>
            </div>
            {Number(invoiceData.discount) > 0 && (
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-slate-500 font-bold">Diskon {invoiceData.discountType === 'percent' ? `(${invoiceData.discount}%)` : ''}</span>
                <span className="text-red-500 font-bold">-{formatCurrency(discountAmount, currency)}</span>
              </div>
            )}
            {Number(invoiceData.taxRate) > 0 && (
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-slate-500 font-bold">Pajak ({invoiceData.taxRate}%)</span>
                <span className="text-slate-800 font-bold">{formatCurrency(taxAmount, currency)}</span>
              </div>
            )}
            <div className="h-px md:h-0.5 w-full bg-slate-200/80 my-3 md:my-4 rounded-full"></div>
            <div className="flex flex-col gap-1 md:gap-1.5">
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-500">Total Tagihan</span>
              <span className="text-xl md:text-[26px] font-black leading-tight transition-colors duration-300" style={{ color: themeColor }}>{formatCurrency(total, currency)}</span>
            </div>
          </div>

          <SignatureBlock invoiceData={invoiceData} stamp={stamp} themeColor={themeColor} />
        </div>
      </div>
    </div>
  </div>
);

// 2. Template Minimalis
const TemplateMinimal = ({ invoiceData, items, logo, stamp, themeColor, currency, subtotal, taxAmount, discountAmount, total }) => (
  <div className="relative bg-white text-slate-900 overflow-hidden h-full p-8 sm:p-10 md:p-14 font-sans">
    {invoiceData.status === 'PAID' && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none transform -rotate-12 z-0">
        <div className="border-[8px] md:border-[12px] border-black text-black text-[120px] md:text-[180px] font-black p-4 md:p-8 uppercase tracking-widest leading-none">PAID</div>
      </div>
    )}
    
    <div className="flex justify-between items-end border-b-[2px] md:border-b-[3px] pb-6 md:pb-8 mb-8 md:mb-12 transition-colors duration-300" style={{ borderColor: themeColor }}>
      <div className="w-[61.8%]">
        <h1 className="text-4xl md:text-6xl font-light tracking-widest mb-1.5 md:mb-3 text-slate-900">INVOICE</h1>
        <p className="text-slate-500 font-bold tracking-widest text-sm md:text-xl">#{invoiceData.invoiceNo || "INV-XXXX"}</p>
      </div>
      <div className="w-[38.2%] text-right flex justify-end">
        {logo ? (
          <img src={logo} alt="Logo" className="max-h-14 md:max-h-20 object-contain" />
        ) : (
          <h2 className="text-xl md:text-3xl font-black tracking-tight transition-colors duration-300" style={{ color: themeColor }}>{invoiceData.myName || "LOGO"}</h2>
        )}
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between mb-10 md:mb-16 gap-6 md:gap-8">
      <div className="w-full md:w-[61.8%] space-y-6 md:space-y-8">
        <div>
          <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2">Ditagihkan Kepada:</p>
          <p className="text-[16px] md:text-xl font-bold text-slate-800 leading-tight mb-1 md:mb-2">{invoiceData.clientName || "Nama Klien / Perusahaan"}</p>
          {invoiceData.clientAddress && <p className="text-[12px] md:text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{invoiceData.clientAddress}</p>}
          {invoiceData.clientTaxId && <p className="text-[10px] md:text-xs text-slate-500 mt-1 md:mt-2 font-medium">Tax ID: {invoiceData.clientTaxId}</p>}
        </div>
        {invoiceData.projectName && (
          <div>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 md:mb-1.5">Deskripsi Proyek:</p>
            <p className="text-[12px] md:text-sm font-bold text-slate-800">{invoiceData.projectName}</p>
          </div>
        )}
      </div>

      <div className="w-full md:w-[38.2%] space-y-6 md:space-y-8 md:text-right">
        <div>
          <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 md:mb-2">Informasi Pengirim:</p>
          <p className="text-[14px] md:text-base font-bold text-slate-800 mb-0.5 md:mb-1">{invoiceData.myName || "Nama Anda"}</p>
          {invoiceData.myEmail && <p className="text-[11px] md:text-sm text-slate-600">{invoiceData.myEmail}</p>}
          {invoiceData.myPhone && <p className="text-[11px] md:text-sm text-slate-600">{invoiceData.myPhone}</p>}
          {invoiceData.myTaxId && <p className="text-[10px] md:text-xs text-slate-500 mt-1 md:mt-2 font-medium">Tax ID: {invoiceData.myTaxId}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4 text-left bg-slate-50 p-3 md:p-4 rounded-xl">
          <div>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Tgl Terbit:</p>
            <p className="text-[11px] md:text-sm font-bold text-slate-800">{invoiceData.date || "-"}</p>
          </div>
          <div>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">Jatuh Tempo:</p>
            <p className="text-[11px] md:text-sm font-bold text-slate-800">{invoiceData.dueDate || "-"}</p>
          </div>
        </div>
      </div>
    </div>

    <table className="w-full text-left mb-10 md:mb-12">
      <thead>
        <tr className="border-b-[2px] md:border-b-[3px] border-slate-800">
          <th className="py-2 md:py-3 px-2 text-[9px] md:text-[11px] font-black text-slate-800 uppercase tracking-widest">Deskripsi Layanan</th>
          <th className="py-2 md:py-3 px-2 text-[9px] md:text-[11px] font-black text-slate-800 uppercase tracking-widest text-center w-12 md:w-20">Qty</th>
          <th className="py-2 md:py-3 px-2 text-[9px] md:text-[11px] font-black text-slate-800 uppercase tracking-widest text-right w-24 md:w-36">Harga</th>
          <th className="py-2 md:py-3 px-2 text-[9px] md:text-[11px] font-black text-slate-800 uppercase tracking-widest text-right w-28 md:w-44">Total</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {items.map((item, index) => (
          <tr key={item.id}>
            <td className="py-3 md:py-5 px-2">
              <p className="text-[12px] md:text-[15px] text-slate-800 font-bold">{item.description || `Item #${index + 1}`}</p>
              {item.details && <p className="text-[10px] md:text-[13px] text-slate-500 mt-1 md:mt-2 whitespace-pre-wrap leading-relaxed">{item.details}</p>}
            </td>
            <td className="py-3 md:py-5 px-2 text-[11px] md:text-sm text-slate-700 text-center align-top pt-4 md:pt-6">{item.qty || 0}</td>
            <td className="py-3 md:py-5 px-2 text-[11px] md:text-sm text-slate-700 text-right align-top pt-4 md:pt-6">{formatCurrency(item.price || 0, currency)}</td>
            <td className="py-3 md:py-5 px-2 text-[12px] md:text-[15px] text-slate-800 font-black text-right align-top pt-4 md:pt-6">{formatCurrency((item.qty || 0) * (item.price || 0), currency)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
      <div className="w-full md:w-[61.8%] space-y-6 md:space-y-8">
        {(invoiceData.bankName || invoiceData.accNumber || invoiceData.accName || invoiceData.bankCode) && (
          <div>
            <h3 className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Instruksi Pembayaran</h3>
            <div className="p-4 md:p-5 border border-slate-200 bg-slate-50 rounded-xl">
              {invoiceData.bankName && <p className="text-[11px] md:text-sm font-bold text-slate-800 mb-0.5 md:mb-1">{invoiceData.bankName}</p>}
              {invoiceData.accNumber && <p className="text-[14px] md:text-lg font-mono font-black text-slate-800 tracking-wider mb-1">{invoiceData.accNumber}</p>}
              {invoiceData.accName && <p className="text-[9px] md:text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 md:mt-1">A/N: {invoiceData.accName}</p>}
              {invoiceData.bankCode && <p className="text-[9px] md:text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-2 md:mt-3 pt-2 md:pt-3 border-t border-slate-200">SWIFT / Routing: <span className="font-mono text-slate-800">{invoiceData.bankCode}</span></p>}
            </div>
          </div>
        )}
        {invoiceData.notes && (
          <div>
            <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Catatan</h3>
            <p className="text-[11px] md:text-[13px] text-slate-600 whitespace-pre-wrap leading-relaxed">{invoiceData.notes}</p>
          </div>
        )}
      </div>

      <div className="w-full md:w-[38.2%] flex flex-col items-end">
        <div className="w-full space-y-3 md:space-y-4 border-b-[2px] md:border-b-[3px] border-slate-800 pb-4 md:pb-5 mb-4 md:mb-5">
          <div className="flex justify-between text-[11px] md:text-sm">
            <span className="text-slate-600 font-bold">Subtotal</span>
            <span className="font-black text-slate-800">{formatCurrency(subtotal, currency)}</span>
          </div>
          {Number(invoiceData.discount) > 0 && (
            <div className="flex justify-between text-[11px] md:text-sm">
              <span className="text-slate-600 font-bold">Diskon {invoiceData.discountType === 'percent' ? `(${invoiceData.discount}%)` : ''}</span>
              <span className="font-black text-red-600">-{formatCurrency(discountAmount, currency)}</span>
            </div>
          )}
          {Number(invoiceData.taxRate) > 0 && (
            <div className="flex justify-between text-[11px] md:text-sm">
              <span className="text-slate-600 font-bold">Pajak ({invoiceData.taxRate}%)</span>
              <span className="font-black text-slate-800">{formatCurrency(taxAmount, currency)}</span>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-0.5 md:gap-1 mb-10 md:mb-16 text-right">
          <span className="text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-500">Total Akhir</span>
          <span className="text-3xl md:text-4xl font-black transition-colors duration-300" style={{ color: themeColor }}>{formatCurrency(total, currency)}</span>
        </div>

        <SignatureBlock invoiceData={invoiceData} stamp={stamp} themeColor={themeColor} />
      </div>
    </div>
  </div>
);

// 3. Template Klasik
const TemplateClassic = ({ invoiceData, items, logo, stamp, themeColor, currency, subtotal, taxAmount, discountAmount, total }) => (
  <div className="relative bg-white text-slate-900 overflow-hidden h-full p-10 sm:p-12 md:p-16" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
    <div className="text-center mb-8 md:mb-12 border-b-2 md:border-b-4 border-slate-800 pb-6 md:pb-10">
      {logo ? (
        <img src={logo} alt="Logo" className="max-h-20 md:max-h-28 mx-auto mb-4 md:mb-6" />
      ) : (
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-5 transition-colors duration-300 uppercase" style={{ color: themeColor }}>{invoiceData.myName || "NAMA PERUSAHAAN"}</h2>
      )}
      <p className="text-[12px] md:text-[15px] text-slate-700 leading-relaxed max-w-xl mx-auto">{invoiceData.clientAddress || "Gedung Pusat Bisnis Lt. 3, Jl. Protokol No. 1, Jakarta Pusat, Indonesia"}</p>
      <p className="text-[12px] md:text-[15px] text-slate-700 mt-1">{invoiceData.myEmail} &nbsp;&bull;&nbsp; {invoiceData.myPhone}</p>
      {invoiceData.myTaxId && <p className="text-[10px] md:text-sm text-slate-600 mt-1.5 md:mt-2">Tax ID: {invoiceData.myTaxId}</p>}
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 md:mb-12 gap-4">
      <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-900 text-center md:text-left">INVOICE</h1>
      <div className="text-center md:text-right border md:border-2 border-slate-800 p-3 md:p-4 bg-slate-50 min-w-[200px] md:min-w-[250px]">
        <p className="text-[10px] md:text-xs text-slate-600 font-bold uppercase tracking-widest mb-1 md:mb-1.5">Nomor Referensi</p>
        <p className="text-lg md:text-xl font-bold text-slate-900">{invoiceData.invoiceNo || "INV-XXXX-001"}</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10 mb-8 md:mb-12">
      <div className="w-full md:w-[61.8%] border md:border-2 border-slate-800 p-4 md:p-6 relative">
        <h3 className="absolute -top-2.5 md:-top-3 left-3 md:left-4 bg-white px-1.5 md:px-2 text-[10px] md:text-xs font-bold text-slate-800 uppercase tracking-widest">Kepada Yth:</h3>
        <p className="text-[15px] md:text-lg font-bold text-slate-900 mb-1 md:mb-2 mt-1 md:mt-2">{invoiceData.clientName || "Nama Klien / Instansi"}</p>
        {invoiceData.clientAddress && <p className="text-[12px] md:text-[15px] text-slate-700 whitespace-pre-wrap leading-relaxed">{invoiceData.clientAddress}</p>}
        {invoiceData.clientTaxId && <p className="text-[11px] md:text-sm text-slate-600 mt-2 md:mt-3">Tax ID: {invoiceData.clientTaxId}</p>}
      </div>
      <div className="w-full md:w-[38.2%] flex flex-col gap-4">
        <div className="border md:border-2 border-slate-800 p-4 md:p-5 relative flex-1">
           <h3 className="absolute -top-2.5 md:-top-3 left-3 md:left-4 bg-white px-1.5 md:px-2 text-[10px] md:text-xs font-bold text-slate-800 uppercase tracking-widest">Detail Penagihan</h3>
           <div className="mt-2 md:mt-3 flex justify-between">
             <p className="text-[11px] md:text-sm font-bold text-slate-600">Tgl Terbit:</p>
             <p className="text-[11px] md:text-sm font-bold text-slate-900">{invoiceData.date || "-"}</p>
           </div>
           <div className="mt-1 md:mt-2 flex justify-between">
             <p className="text-[11px] md:text-sm font-bold text-slate-600">Jatuh Tempo:</p>
             <p className="text-[11px] md:text-sm font-bold text-slate-900">{invoiceData.dueDate || "-"}</p>
           </div>
        </div>
        {invoiceData.projectName && (
          <div className="border md:border-2 border-slate-800 p-4 md:p-5 relative flex-1 bg-slate-50">
            <h3 className="absolute -top-2.5 md:-top-3 left-3 md:left-4 bg-slate-50 px-1.5 md:px-2 text-[10px] md:text-xs font-bold text-slate-800 uppercase tracking-widest">Proyek</h3>
            <p className="text-[12px] md:text-[15px] font-bold text-slate-900 mt-2 md:mt-3 leading-tight">{invoiceData.projectName}</p>
          </div>
        )}
      </div>
    </div>

    <table className="w-full text-left mb-8 md:mb-12 border-collapse border md:border-2 border-slate-800">
      <thead>
        <tr className="transition-colors duration-300" style={{ backgroundColor: themeColor, color: '#ffffff' }}>
          <th className="py-2 px-3 md:py-3 md:px-5 text-[10px] md:text-sm font-bold uppercase tracking-widest border md:border-2 border-slate-800 w-[55%]">Rincian Deskripsi</th>
          <th className="py-2 px-2 md:py-3 md:px-5 text-[10px] md:text-sm font-bold uppercase tracking-widest text-center w-[15%] border md:border-2 border-slate-800">Qty</th>
          <th className="py-2 px-3 md:py-3 md:px-5 text-[10px] md:text-sm font-bold uppercase tracking-widest text-right w-[15%] border md:border-2 border-slate-800">Harga Satuan</th>
          <th className="py-2 px-3 md:py-3 md:px-5 text-[10px] md:text-sm font-bold uppercase tracking-widest text-right w-[15%] border md:border-2 border-slate-800">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            <td className="py-3 px-3 md:py-4 md:px-5 border md:border-2 border-slate-800">
              <p className="text-[12px] md:text-[15px] text-slate-900 font-bold">{item.description || `Deskripsi Item Ke-${index + 1}`}</p>
              {item.details && <p className="text-[11px] md:text-[14px] text-slate-700 mt-1 md:mt-1.5 whitespace-pre-wrap leading-relaxed">{item.details}</p>}
            </td>
            <td className="py-3 px-2 md:py-4 md:px-5 text-[12px] md:text-[15px] text-slate-900 text-center border md:border-2 border-slate-800 align-top">{item.qty || 0}</td>
            <td className="py-3 px-3 md:py-4 md:px-5 text-[12px] md:text-[15px] text-slate-900 text-right border md:border-2 border-slate-800 align-top">{formatCurrency(item.price || 0, currency)}</td>
            <td className="py-3 px-3 md:py-4 md:px-5 text-[12px] md:text-[15px] text-slate-900 font-bold text-right border md:border-2 border-slate-800 align-top">{formatCurrency((item.qty || 0) * (item.price || 0), currency)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="flex justify-end mb-10 md:mb-16">
      <div className="w-full sm:w-[60%] md:w-[50%]">
        <table className="w-full border-collapse border md:border-2 border-slate-800">
          <tbody>
            <tr>
              <td className="py-2 px-3 md:py-3 md:px-5 border md:border-2 border-slate-800 text-[12px] md:text-[15px] text-slate-800 font-bold bg-slate-50">Subtotal</td>
              <td className="py-2 px-3 md:py-3 md:px-5 border md:border-2 border-slate-800 text-[12px] md:text-[15px] text-slate-900 font-bold text-right">{formatCurrency(subtotal, currency)}</td>
            </tr>
            {Number(invoiceData.discount) > 0 && (
              <tr>
                <td className="py-2 px-3 md:py-3 md:px-5 border md:border-2 border-slate-800 text-[12px] md:text-[15px] text-slate-800 font-bold bg-slate-50">Potongan {invoiceData.discountType === 'percent' ? `(${invoiceData.discount}%)` : ''}</td>
                <td className="py-2 px-3 md:py-3 md:px-5 border md:border-2 border-slate-800 text-[12px] md:text-[15px] text-red-700 font-bold text-right">-{formatCurrency(discountAmount, currency)}</td>
              </tr>
            )}
            {Number(invoiceData.taxRate) > 0 && (
              <tr>
                <td className="py-2 px-3 md:py-3 md:px-5 border md:border-2 border-slate-800 text-[12px] md:text-[15px] text-slate-800 font-bold bg-slate-50">PPN ({invoiceData.taxRate}%)</td>
                <td className="py-2 px-3 md:py-3 md:px-5 border md:border-2 border-slate-800 text-[12px] md:text-[15px] text-slate-900 font-bold text-right">{formatCurrency(taxAmount, currency)}</td>
              </tr>
            )}
            <tr className="transition-colors duration-300">
              <td className="py-3 px-3 md:py-4 md:px-5 border md:border-2 border-slate-800 text-[13px] md:text-lg font-bold uppercase tracking-widest text-white transition-colors duration-300" style={{ backgroundColor: themeColor }}>Total Keseluruhan</td>
              <td className="py-3 px-3 md:py-4 md:px-5 border md:border-2 border-slate-800 text-[16px] md:text-2xl font-bold text-right text-slate-900 bg-slate-100">{formatCurrency(total, currency)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mt-8 md:mt-12">
      <div className="w-full md:w-[61.8%]">
        {(invoiceData.bankName || invoiceData.accNumber || invoiceData.accName || invoiceData.bankCode) && (
          <div className="mb-6 md:mb-8">
            <h3 className="text-[11px] md:text-sm font-bold text-slate-900 uppercase tracking-widest border-b md:border-b-2 border-slate-800 pb-1.5 md:pb-2 mb-2 md:mb-3">Informasi Rekening Bank</h3>
            <div className="text-[12px] md:text-[15px] text-slate-800 leading-relaxed bg-slate-50 p-3 md:p-4 border border-slate-200">
              {invoiceData.bankName && <p><strong>Bank/Platform:</strong> {invoiceData.bankName}</p>}
              {invoiceData.accNumber && <p><strong>No. Rekening/Akun:</strong> <span className="font-mono">{invoiceData.accNumber}</span></p>}
              {invoiceData.accName && <p><strong>Atas Nama:</strong> {invoiceData.accName}</p>}
              {invoiceData.bankCode && <p className="mt-1 md:mt-2 pt-1 md:pt-2 border-t border-slate-300"><strong>SWIFT/BIC Code:</strong> <span className="font-mono">{invoiceData.bankCode}</span></p>}
            </div>
          </div>
        )}
        {invoiceData.notes && (
          <div>
            <h3 className="text-[11px] md:text-sm font-bold text-slate-900 uppercase tracking-widest border-b md:border-b-2 border-slate-800 pb-1.5 md:pb-2 mb-2 md:mb-3">Catatan / Syarat Ketentuan</h3>
            <p className="text-[11px] md:text-[14px] text-slate-800 whitespace-pre-wrap leading-relaxed">{invoiceData.notes}</p>
          </div>
        )}
      </div>
      
      <div className="w-full md:w-[38.2%] text-center flex flex-col items-center justify-end pt-4">
        <SignatureBlock invoiceData={invoiceData} stamp={stamp} themeColor={themeColor} />
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

  const addToPalette = () => {
    if (!palette.includes(themeColor)) {
      setPalette([...palette, themeColor]);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.price)), 0);
  
  let discountAmount = 0;
  if (invoiceData.discountType === 'percent') {
    discountAmount = subtotal * (Number(invoiceData.discount) / 100);
  } else {
    discountAmount = Number(invoiceData.discount) || 0;
  }
  
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = subtotalAfterDiscount * (Number(invoiceData.taxRate) / 100);
  const total = subtotalAfterDiscount + taxAmount;

  // Ukuran Pixel Fisik Konversi @96DPI (Lebih presisi dari MM pada web display)
  const paperDimensionsPx = {
    A4: { width: 794, height: 1123 }, // A4
    Letter: { width: 816, height: 1056 }, // US Letter
    Folio: { width: 816, height: 1248 } // F4 / Folio
  };

  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        const targetWidth = paperDimensionsPx[paperSize].width;
        // Memberi jarak margin agar preview tidak nempel mentok
        const availableWidth = containerWidth - 32; 
        
        if (availableWidth < targetWidth) {
          setPreviewScale(availableWidth / targetWidth);
        } else {
          setPreviewScale(1);
        }
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [paperSize]);

  return (
    <div className="w-full relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        input[type=range].custom-color-slider {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }
        input[type=range].custom-color-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: white;
          border: 4px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          cursor: pointer;
          margin-top: -7px;
        }
        input[type=range].custom-color-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .track-hue::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
        }
        @media print {
          @page {
            size: ${paperSize === 'A4' ? 'A4' : paperSize === 'Letter' ? 'letter' : 'legal'};
            margin: 0;
          }
          body {
             -webkit-print-color-adjust: exact !important;
             print-color-adjust: exact !important;
          }
          .print-scale-reset {
             transform: scale(1) !important;
             transform-origin: top left !important;
             width: 100% !important;
             height: auto !important;
             margin: 0 !important;
          }
        }
      `}} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
        
        {/* ======================= */}
        {/* EDITOR PANEL (KIRI)     */}
        {/* ======================= */}
        <div className="xl:col-span-5 space-y-6 print:hidden">
          
          {/* Card: Pengaturan Tampilan */}
          <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden shadow-xl">
             <div className={`absolute left-0 top-0 w-1.5 h-full transition-colors duration-300`} style={{ background: themeColor }}></div>
             <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="transition-colors duration-300" style={{ color: themeColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </span>
              Personalisasi Desain (No Popup)
            </h3>

            <div className="grid grid-cols-1 gap-5 mb-6">
               <div>
                 <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-widest flex justify-between">Pilih Template Visual</p>
                  <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl">
                    {[
                      { id: 'modern', name: 'Modern' },
                      { id: 'minimal', name: 'Minimalis' },
                      { id: 'classic', name: 'Klasik' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTemplate(t.id)}
                        className={`flex-1 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${template === t.id ? 'bg-opacity-20 text-white shadow-md' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                        style={template === t.id ? { backgroundColor: `${themeColor}40`, color: themeColor } : {}}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-widest flex justify-between">Ukuran Kertas</p>
                    <div className="flex flex-col gap-1 bg-white/5 p-1.5 border border-white/10 rounded-xl">
                      {[
                        { id: 'A4', name: 'A4 (Standar)' },
                        { id: 'Letter', name: 'US Letter' },
                        { id: 'Folio', name: 'Folio / F4' }
                      ].map(p => (
                        <button
                          key={p.id}
                          onClick={() => setPaperSize(p.id)}
                          className={`py-2 px-3 text-left rounded-lg text-xs font-semibold transition-all ${paperSize === p.id ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-widest flex justify-between">Mata Uang</p>
                    <div className="flex flex-col gap-1 bg-white/5 p-1.5 border border-white/10 rounded-xl max-h-[110px] overflow-y-auto no-scrollbar">
                      {[
                        { id: 'IDR', name: 'Rupiah (IDR)' },
                        { id: 'USD', name: 'US Dollar (USD)' },
                        { id: 'EUR', name: 'Euro (EUR)' },
                        { id: 'GBP', name: 'Pound (GBP)' },
                        { id: 'SGD', name: 'SGD Dollar' }
                      ].map(c => (
                        <button
                          key={c.id}
                          onClick={() => setCurrency(c.id)}
                          className={`py-2 px-3 text-left rounded-lg text-xs font-semibold transition-all ${currency === c.id ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                 </div>
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
                      className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer border-0 p-0" 
                    />
                  </div>
                  <input 
                    type="text" 
                    value={themeColor} 
                    onChange={handleHexChange} 
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                        Upload Logo
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
                        Upload Stempel
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
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status Invoice</label>
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
                placeholder="Misal: Redesign Website B2B & Integrasi Payment Gateway" 
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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
                        placeholder="Misal: &#10;- 3 Alternatif Konsep Desain&#10;- Revisi maksimal 3 kali&#10;- Source file diserahkan dalam bentuk Figma" 
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
              
              <button onClick={addItem} className="w-full py-3.5 rounded-xl border border-dashed border-white/20 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-indigo-200 transition-all flex items-center justify-center gap-2 text-sm font-bold bg-[#030712]/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Tambah Item / Layanan
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
                 <div className="relative">
                    <CleanInput 
                      type="number" 
                      name="discount" 
                      value={invoiceData.discount} 
                      onChange={handleInvoiceChange} 
                      placeholder={invoiceData.discountType === 'fixed' ? "Misal: 50000" : "Misal: 10"} 
                    />
                    <span className="absolute right-4 top-[38px] text-slate-500 text-sm font-bold">{invoiceData.discountType === 'percent' ? '%' : currency}</span>
                 </div>
              </div>

              {/* Modul Pajak */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                 <p className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-widest">Pengaturan Pajak</p>
                 <div className="relative mb-3">
                    <CleanInput 
                      type="number" 
                      name="taxRate" 
                      value={invoiceData.taxRate} 
                      onChange={handleInvoiceChange} 
                      placeholder="Misal: 11" 
                    />
                    <span className="absolute right-4 top-[38px] text-slate-500 text-sm font-bold">%</span>
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
              <CleanInput label="Nomor Akun / Rekening / Email" name="accNumber" value={invoiceData.accNumber} onChange={handleInvoiceChange} placeholder="Misal: 1234 5678 90 atau email@paypal.com" />
              <CleanInput label="Atas Nama (A/N)" name="accName" value={invoiceData.accName} onChange={handleInvoiceChange} placeholder="Misal: Ahmad Fulan" />
            </div>

            <h3 className="text-white font-bold mb-4 mt-6 border-t border-white/10 pt-6">Catatan & Pengesahan</h3>
            <div className="space-y-4">
              <CleanTextarea 
                label="Catatan Tambahan (Tampil di Invoice)" 
                name="notes" 
                value={invoiceData.notes} 
                onChange={handleInvoiceChange} 
                placeholder="Misal: Pembayaran harap ditransfer maksimal 14 hari kerja setelah invoice diterbitkan. Mohon cantumkan nomor invoice pada berita acara transfer. Terima kasih atas kerjasamanya." 
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

          <button onClick={() => window.print()} className="w-full py-4 bg-gradient-to-r hover:bg-gradient-to-l from-indigo-600 to-cyan-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-all flex justify-center items-center gap-2 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Cetak Dokumen PDF
          </button>
        </div>

        {/* ======================= */}
        {/* PREVIEW PANEL (KANAN)   */}
        {/* ======================= */}
        <div className="xl:col-span-7 print:col-span-12 print:w-full print:m-0 print:p-0 flex justify-center">
          <div className="sticky top-6 w-full flex justify-center" ref={previewContainerRef}>
            {/* Scrollable Container */}
            <div className="overflow-hidden w-full print:overflow-visible flex justify-center items-start">
              
              {/* Kertas Render Area (Scale Realistis & Responsif) */}
              <div 
                className="bg-white print:bg-transparent shadow-[0_10px_40px_rgba(0,0,0,0.15)] print:shadow-none transition-all duration-300 print-scale-reset transform-origin-top shrink-0"
                style={{ 
                  width: `${paperDimensionsPx[paperSize].width}px`,
                  minHeight: `${paperDimensionsPx[paperSize].height}px`,
                  transform: `scale(${previewScale})`,
                  marginBottom: `-${paperDimensionsPx[paperSize].height * (1 - previewScale)}px`
                }}
              >
                {template === 'modern' && <TemplateModern invoiceData={invoiceData} items={items} logo={logo} stamp={stamp} themeColor={themeColor} currency={currency} subtotal={subtotal} taxAmount={taxAmount} discountAmount={discountAmount} total={total} />}
                {template === 'minimal' && <TemplateMinimal invoiceData={invoiceData} items={items} logo={logo} stamp={stamp} themeColor={themeColor} currency={currency} subtotal={subtotal} taxAmount={taxAmount} discountAmount={discountAmount} total={total} />}
                {template === 'classic' && <TemplateClassic invoiceData={invoiceData} items={items} logo={logo} stamp={stamp} themeColor={themeColor} currency={currency} subtotal={subtotal} taxAmount={taxAmount} discountAmount={discountAmount} total={total} />}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}