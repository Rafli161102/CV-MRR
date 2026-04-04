"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Icons, CleanInput, CleanSelect, CustomColorSlider, formatCurrency } from './components';

export default function InvoiceTab() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "", date: "", dueDate: "", myName: "", myRole: "", myEmail: "", myPhone: "",
    clientName: "", clientAddress: "", bankName: "", accName: "", accNumber: "", taxRate: "", discount: "", notes: "", signatureName: "", status: "UNPAID", 
  });

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
    <div className="anim-fade-in-up">
      <div className="print:hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3"><Icons.Document /> Invoice Builder</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">Rakit tagihan digital profesional. Pilih Tema, Custom Warna, & Export PDF.</p>
        </div>
        <button onClick={handlePrint} className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-1 z-10">
          <Icons.Print /> Simpan PDF / Print
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
                    <button onClick={removeLogo} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Icons.Trash /></button>
                  </div>
                ) : (
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-5 py-3 bg-[#0d1424]/40 hover:bg-[#0d1424]/80 border border-dashed border-slate-700 hover:border-cyan-500 rounded-xl text-xs font-bold text-slate-400 transition-all"><Icons.Image /> Upload Logo</button>
                )}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" />
              </div>
            </div>
            <div className="space-y-4">
              <CleanInput label="Nama Lengkap / Brand" name="myName" value={invoiceData.myName} onChange={handleInvoiceChange} placeholder="Misal: John Doe Design" />
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
               <CleanInput label="Alamat Klien Lengkap" name="clientAddress" value={invoiceData.clientAddress} onChange={handleInvoiceChange} placeholder="Jl. Sudirman No. 1, Jakarta" isTextarea={true} />
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
                  <button onClick={() => removeItem(item.id)} className="absolute -top-3 -right-3 bg-red-500/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Icons.Trash /></button>
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
              <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-slate-700 hover:border-cyan-500 text-slate-500 hover:text-cyan-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-4"><Icons.Plus /> Tambah Baris</button>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
            <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-cyan-500"></span> Tema & Finalisasi</h3>
            <div className="space-y-6 mb-8 bg-[#0d1424]/30 p-5 rounded-2xl border border-white/5">
               <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1"><Icons.Layout /> Pilih Template Style</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                     {[{ id: 1, name: "Classic" }, { id: 2, name: "Bold" }, { id: 3, name: "Elegant" }, { id: 4, name: "Accent" }, { id: 5, name: "Dark" }].map(t => (
                       <button key={t.id} onClick={() => setTemplate(t.id)} className={`py-2 px-1 text-[10px] font-bold rounded-lg transition-all ${template === t.id ? 'bg-cyan-500 text-white' : 'bg-[#141414] text-slate-400 hover:bg-white/10'}`}>{t.name}</button>
                     ))}
                  </div>
               </div>
               <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                 <div className="flex-1">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1"><Icons.Palette /> Warna Aksen Custom</label>
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
            <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2 mt-8">Penutup & Tanda Tangan</h4>
            <div className="space-y-4 mt-4">
              <CleanInput label="Nama Penanda Tangan" name="signatureName" value={invoiceData.signatureName} onChange={handleInvoiceChange} placeholder="Nama Tanda Tangan Anda" prefix={<Icons.Signature />} />
              <CleanInput label="Syarat & Ketentuan (Catatan Kaki)" name="notes" value={invoiceData.notes} onChange={handleInvoiceChange} placeholder="Misal: Tagihan harap dilunasi dalam waktu 7 hari kerja..." isTextarea={true} />
            </div>
          </div>
        </div>

        {/* ===================== PREVIEW INVOICE A4 STRICT ===================== */}
        <div className="lg:col-span-7 print:col-span-12 w-full">
          <div className="w-full overflow-x-auto bg-[#0a0a0a] rounded-[2rem] p-4 md:p-8 custom-scroll border border-white/5 print:border-none print:p-0 print:bg-white">
            <div className="w-[794px] min-h-[1123px] mx-auto bg-white text-slate-900 shadow-2xl print:w-full print:min-h-0 print:shadow-none flex flex-col relative overflow-hidden transition-all duration-500">
              
              {invoiceData.status === 'PAID' && (
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-10 select-none z-0">
                  <div className="text-[120px] font-black tracking-widest text-emerald-500 border-[12px] border-emerald-500 px-12 py-6 rounded-3xl uppercase">LUNAS</div>
                </div>
              )}
              {invoiceData.status === 'UNPAID' && (
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-5 select-none z-0">
                  <div className="text-[100px] font-black tracking-widest text-rose-500 border-[12px] border-rose-500 px-12 py-6 rounded-3xl uppercase text-center leading-tight">BELUM<br/>LUNAS</div>
                </div>
              )}

              {template === 4 && <div className="absolute left-0 top-0 h-full w-4" style={{ backgroundColor: themeColor }}></div>}
              
              <div className={`flex-1 flex flex-col z-10 ${template === 4 ? 'pl-10' : ''}`}>
                <div className={`
                  ${template === 1 ? 'p-12 pb-8 flex justify-between items-start' : ''}
                  ${template === 2 ? 'p-12 text-white flex justify-between items-start' : ''}
                  ${template === 3 ? 'p-12 pb-8 flex flex-col items-center text-center' : ''}
                  ${template === 4 ? 'p-12 pb-8 flex justify-between items-start' : ''}
                  ${template === 5 ? 'p-10 m-12 mb-8 rounded-3xl flex justify-between items-center text-white bg-slate-900 shadow-xl' : ''}
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
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-4 mb-6 page-break-inside-avoid w-full">
                    <div className="max-w-[60%]">
                      {invoiceData.notes && (
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Syarat & Ketentuan:</p>
                          <p className="text-xs text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">{invoiceData.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right flex flex-col items-end pr-4">
                      <p className="text-xs text-slate-500 font-bold mb-2">Hormat Kami,</p>
                      <div className="h-20 flex items-center justify-end overflow-hidden">
                        <span className="text-5xl opacity-80" style={{ color: themeColor, fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
                          {invoiceData.signatureName || invoiceData.myName || "Signature"}
                        </span>
                      </div>
                      <div className="w-48 border-b-2 border-slate-200 mt-2 mb-2"></div>
                      <p className="text-sm font-bold text-slate-800">{invoiceData.myName || "Nama Anda"}</p>
                      {invoiceData.myRole && <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{invoiceData.myRole}</p>}
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
