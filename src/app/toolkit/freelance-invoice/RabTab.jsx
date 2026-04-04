"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Icons, CleanInput, CleanSelect, CustomColorSlider, formatCurrency } from './components';

export default function RabTab() {
  const [rabData, setRabData] = useState({
    rabNo: "", date: "", validUntil: "", myName: "", myRole: "", myEmail: "", myPhone: "",
    clientName: "", clientAddress: "", paymentTerms: "", taxRate: "", discount: "", notes: "", signatureName: "", status: "PENDING", 
  });

  useEffect(() => {
    setRabData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const [currency, setCurrency] = useState("IDR");
  const [themeColor, setThemeColor] = useState("#059669"); // Default Emerald untuk RAB
  const [template, setTemplate] = useState(1); 
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([{ id: 1, description: "", qty: 1, price: "" }]);
  const presetColors = ["#0891b2", "#2563eb", "#4f46e5", "#059669", "#e11d48", "#1e293b", "#f59e0b", "#9333ea"];
  
  const handleRabChange = (e) => setRabData({ ...rabData, [e.target.name]: e.target.value });
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
  const taxAmount = subTotal * (Number(rabData.taxRate) / 100);
  const discountAmount = Number(rabData.discount) || 0;
  const grandTotal = subTotal + taxAmount - discountAmount;

  const handlePrint = () => window.print();

  return (
    <div className="anim-fade-in-up">
      <div className="print:hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3"><Icons.Rab /> Penawaran (RAB)</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">Buat proposal penawaran harga untuk prospek klien.</p>
        </div>
        <button onClick={handlePrint} className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-1 z-10">
          <Icons.Print /> Simpan PDF / Print
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:w-full">
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
            <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-emerald-500"></span> Identitas Pihak Penawar</h3>
            <div className="mb-6">
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Logo Brand / Perusahaan</label>
              <div className="flex items-center gap-4">
                {logo ? (
                  <div className="relative group">
                    <img src={logo} alt="Logo" className="h-14 w-auto object-contain bg-[#0d1424]/40 p-2 rounded-xl border border-white/5" />
                    <button onClick={removeLogo} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Icons.Trash /></button>
                  </div>
                ) : (
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-5 py-3 bg-[#0d1424]/40 hover:bg-[#0d1424]/80 border border-dashed border-slate-700 hover:border-emerald-500 rounded-xl text-xs font-bold text-slate-400 transition-all"><Icons.Image /> Upload Logo</button>
                )}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" />
              </div>
            </div>
            <div className="space-y-4">
              <CleanInput label="Nama Lengkap / Brand" name="myName" value={rabData.myName} onChange={handleRabChange} placeholder="Misal: John Doe Design" />
              <CleanInput label="Profesi / Jabatan" name="myRole" value={rabData.myRole} onChange={handleRabChange} placeholder="Graphic Designer" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CleanInput label="Email" name="myEmail" type="email" value={rabData.myEmail} onChange={handleRabChange} placeholder="hello@mrr.my.id" />
                <CleanInput label="No. Telepon" name="myPhone" value={rabData.myPhone} onChange={handleRabChange} placeholder="+62 851-xxxx-xxxx" />
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
             <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-emerald-500"></span> Detail Prospek & RAB</h3>
             <div className="space-y-4">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <CleanInput label="No. RAB" name="rabNo" value={rabData.rabNo} onChange={handleRabChange} placeholder="RAB-2026-001" />
                 <CleanInput label="Berlaku Hingga (Valid Until)" name="validUntil" type="date" value={rabData.validUntil} onChange={handleRabChange} />
               </div>
               <div className="h-px bg-white/5 my-2"></div>
               <CleanInput label="Ditujukan Kepada (Prospek Klien)" name="clientName" value={rabData.clientName} onChange={handleRabChange} placeholder="Nama Perusahaan Klien" />
               <CleanInput label="Alamat Prospek Lengkap" name="clientAddress" value={rabData.clientAddress} onChange={handleRabChange} placeholder="Jl. Sudirman No. 1, Jakarta" isTextarea={true} />
             </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2"><span className="w-4 h-px bg-emerald-500"></span> Rencana Pekerjaan</h3>
               <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md">{items.length} Item</span>
            </div>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="p-5 bg-[#0d1424]/20 border border-white/5 hover:border-emerald-500/30 transition-colors rounded-2xl relative group">
                  <button onClick={() => removeItem(item.id)} className="absolute -top-3 -right-3 bg-red-500/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Icons.Trash /></button>
                  <div className="flex items-center gap-2 mb-4">
                     <span className="text-xs font-bold text-slate-600">#{index + 1}</span>
                     <input type="text" placeholder="Deskripsi Jasa (Misal: Desain Logo)" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full bg-transparent border-b border-slate-700 focus:border-emerald-400 pb-1 text-sm text-white outline-none font-bold placeholder:font-normal placeholder:text-slate-600" />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20">
                      <label className="block text-[8px] uppercase tracking-widest text-slate-500 mb-1.5">Qty</label>
                      <input type="number" min="1" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} className="w-full bg-[#050505] border border-slate-800 focus:border-emerald-500 rounded-lg p-2 text-sm text-white outline-none text-center transition-all" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[8px] uppercase tracking-widest text-slate-500 mb-1.5">Estimasi Harga Satuan</label>
                      <input type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} placeholder="2500000" className="w-full bg-[#050505] border border-slate-800 focus:border-emerald-500 rounded-lg p-2 text-sm text-white outline-none font-mono placeholder:text-slate-700 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addItem} className="w-full py-3 border-2 border-dashed border-slate-700 hover:border-emerald-500 text-slate-500 hover:text-emerald-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-4"><Icons.Plus /> Tambah Rencana Baris</button>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 sm:p-8 shadow-xl">
            <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><span className="w-4 h-px bg-emerald-500"></span> Finalisasi & Termin Pembayaran</h3>
            <div className="space-y-6 mb-8 bg-[#0d1424]/30 p-5 rounded-2xl border border-white/5">
               <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1"><Icons.Layout /> Pilih Template Style</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                     {[{ id: 1, name: "Classic" }, { id: 2, name: "Bold" }, { id: 3, name: "Elegant" }, { id: 4, name: "Accent" }, { id: 5, name: "Dark" }].map(t => (
                       <button key={t.id} onClick={() => setTemplate(t.id)} className={`py-2 px-1 text-[10px] font-bold rounded-lg transition-all ${template === t.id ? 'bg-emerald-500 text-white' : 'bg-[#141414] text-slate-400 hover:bg-white/10'}`}>{t.name}</button>
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
               <CleanSelect label="Status RAB" name="status" value={rabData.status} onChange={handleRabChange} options={[{value:"PENDING", label:"Menunggu Keputusan"}, {value:"APPROVED", label:"Disetujui (Approved)"}, {value:"REJECTED", label:"Ditolak (Rejected)"}]} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8 border-t border-white/5 pt-6">
              <CleanInput label={`Pajak / PPN (%)`} name="taxRate" type="number" value={rabData.taxRate} onChange={handleRabChange} placeholder="11" />
              <CleanInput label={`Diskon (${currency})`} name="discount" type="number" value={rabData.discount} onChange={handleRabChange} placeholder="500000" />
            </div>
            <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Termin Pembayaran (Payment Terms)</h4>
            <div className="space-y-4 mb-6">
              <CleanInput label="Detail Termin" name="paymentTerms" value={rabData.paymentTerms} onChange={handleRabChange} placeholder="Misal: DP 50% di awal, 50% pelunasan setelah..." isTextarea={true} />
            </div>
            <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2 mt-8">Penutup & Tanda Tangan</h4>
            <div className="space-y-4 mt-4">
              <CleanInput label="Nama Penanda Tangan" name="signatureName" value={rabData.signatureName} onChange={handleRabChange} placeholder="Nama Tanda Tangan Anda" prefix={<Icons.Signature />} />
              <CleanInput label="Syarat & Ketentuan (Catatan Kaki)" name="notes" value={rabData.notes} onChange={handleRabChange} placeholder="Harga penawaran ini dapat berubah jika ruang lingkup proyek berubah..." isTextarea={true} />
            </div>
          </div>
        </div>

        {/* ===================== PREVIEW RAB A4 STRICT ===================== */}
        <div className="lg:col-span-7 print:col-span-12 w-full">
          <div className="w-full overflow-x-auto bg-[#0a0a0a] rounded-[2rem] p-4 md:p-8 custom-scroll border border-white/5 print:border-none print:p-0 print:bg-white">
            <div className="w-[794px] min-h-[1123px] mx-auto bg-white text-slate-900 shadow-2xl print:w-full print:min-h-0 print:shadow-none flex flex-col relative overflow-hidden transition-all duration-500">
              
              {rabData.status === 'APPROVED' && (
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-10 select-none z-0">
                  <div className="text-[100px] font-black tracking-widest text-emerald-500 border-[12px] border-emerald-500 px-12 py-6 rounded-3xl uppercase text-center leading-tight">DISETUJUI<br/>APPROVED</div>
                </div>
              )}
              {rabData.status === 'REJECTED' && (
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-5 select-none z-0">
                  <div className="text-[100px] font-black tracking-widest text-rose-500 border-[12px] border-rose-500 px-12 py-6 rounded-3xl uppercase text-center leading-tight">DITOLAK<br/>REJECTED</div>
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
                        {rabData.myName || "NAMA BRAND"}
                      </h2>
                    )}
                    {logo && rabData.myName && <h2 className={`text-xl font-bold ${template === 2 || template === 5 ? 'text-white' : 'text-slate-800'}`}>{rabData.myName}</h2>}
                    {rabData.myRole && <p className={`text-sm font-semibold mt-1 ${template === 2 || template === 5 ? 'text-slate-200' : 'text-slate-500'}`}>{rabData.myRole}</p>}
                    {rabData.myEmail && <p className={`text-sm mt-2 ${template === 2 || template === 5 ? 'text-slate-200' : 'text-slate-500'}`}>{rabData.myEmail}</p>}
                    {rabData.myPhone && <p className={`text-sm ${template === 2 || template === 5 ? 'text-slate-200' : 'text-slate-500'}`}>{rabData.myPhone}</p>}
                  </div>
                  <div className={`flex flex-col ${template === 3 ? 'items-center mt-8 border-t-2 pt-6 w-full' : 'items-end shrink-0'}`} style={template === 3 ? { borderColor: themeColor } : {}}>
                    <h1 className={`text-4xl font-black uppercase tracking-tighter mb-3 ${template === 3 ? '' : 'text-right'}`} style={{ color: (template === 2 || template === 5) ? 'white' : themeColor }}>QUOTATION / RAB</h1>
                    <div className={`px-4 py-2 rounded-lg font-bold tracking-wide ${template === 2 ? 'bg-white/20 text-white' : template === 5 ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-800 border border-slate-200'}`}>
                       {rabData.rabNo || "RAB-000"}
                    </div>
                  </div>
                </div>

                <div className="px-12 flex-1 flex flex-col">
                  <div className={`flex justify-between items-end mb-10 pb-6 border-b-2`} style={{ borderColor: themeColor }}>
                    <div className="max-w-[60%]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Penawaran Untuk:</p>
                      <h3 className="text-xl font-black text-slate-800">{rabData.clientName || "Nama Klien/Prospek"}</h3>
                      <p className="text-sm font-medium text-slate-500 whitespace-pre-wrap mt-1 leading-relaxed">{rabData.clientAddress || "Alamat Klien Lengkap"}</p>
                    </div>
                    <div className="text-right space-y-3">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tanggal Dokumen:</p>
                        <p className="text-sm font-black text-slate-800">{rabData.date ? new Date(rabData.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : "-"}</p>
                      </div>
                      {rabData.validUntil && (
                         <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Berlaku Hingga:</p>
                           <p className="text-sm font-black text-red-600">{new Date(rabData.validUntil).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                         </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 w-full mb-8">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className={`text-xs font-bold uppercase tracking-wider ${template === 5 ? 'text-white' : 'text-slate-600 border-b-2'}`} style={template === 5 ? { backgroundColor: themeColor } : { borderColor: themeColor }}>
                          <th className={`py-4 px-3 ${template === 5 ? 'rounded-tl-lg' : ''}`}>Deskripsi Penawaran Jasa/Produk</th>
                          <th className="py-4 px-2 text-center w-20">Qty</th>
                          <th className="py-4 px-2 text-right w-36">Estimasi Harga</th>
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
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${template === 5 ? 'text-slate-400' : 'text-slate-400'}`}>Termin Pembayaran</p>
                        <p className={`text-xs whitespace-pre-wrap leading-relaxed ${template === 5 ? 'text-slate-200' : 'text-slate-600'}`}>{rabData.paymentTerms || "Tidak ada kesepakatan termin spesifik."}</p>
                      </div>
                    </div>

                    <div className="w-[45%] space-y-4 pt-2">
                      <div className="flex justify-between text-sm font-medium text-slate-500 px-2">
                        <span>Subtotal</span>
                        <span className="font-mono">{formatCurrency(subTotal, currency)}</span>
                      </div>
                      {rabData.taxRate > 0 && (
                        <div className="flex justify-between text-sm font-medium text-slate-500 px-2">
                          <span>Estimasi Pajak ({rabData.taxRate}%)</span>
                          <span className="font-mono">{formatCurrency(taxAmount, currency)}</span>
                        </div>
                      )}
                      {rabData.discount > 0 && (
                        <div className="flex justify-between text-sm font-bold text-red-500 px-2">
                          <span>Diskon Penawaran</span>
                          <span className="font-mono">-{formatCurrency(rabData.discount, currency)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center border-t-4 pt-5 mt-5 px-2" style={{ borderColor: themeColor }}>
                        <span className="text-base font-black text-slate-900 uppercase tracking-widest">Total Estimasi Biaya</span>
                        <span className="text-2xl lg:text-3xl font-black font-mono tracking-tighter" style={{ color: themeColor }}>{formatCurrency(grandTotal, currency)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-4 mb-6 page-break-inside-avoid w-full">
                    <div className="max-w-[60%]">
                      {rabData.notes && (
                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Syarat & Ketentuan Penawaran:</p>
                          <p className="text-xs text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">{rabData.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right flex flex-col items-end pr-4">
                      <p className="text-xs text-slate-500 font-bold mb-2">Penawar / Pengaju,</p>
                      <div className="h-20 flex items-center justify-end overflow-hidden">
                        <span className="text-5xl opacity-80" style={{ color: themeColor, fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
                          {rabData.signatureName || rabData.myName || "Signature"}
                        </span>
                      </div>
                      <div className="w-48 border-b-2 border-slate-200 mt-2 mb-2"></div>
                      <p className="text-sm font-bold text-slate-800">{rabData.myName || "Nama Anda"}</p>
                      {rabData.myRole && <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{rabData.myRole}</p>}
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
