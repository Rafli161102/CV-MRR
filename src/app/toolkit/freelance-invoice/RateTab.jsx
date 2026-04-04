"use client";

import React, { useState } from 'react';
import { Icons, CleanInput, CleanSelect, formatCurrency } from './components';

export default function RateTab() {
  // 6 Mode Kalkulasi Enterprise
  const [calcMode, setCalcMode] = useState('monthly'); 
  
  const [targetAmount, setTargetAmount] = useState("");
  const [expenses, setExpenses] = useState("");
  const [workDays, setWorkDays] = useState("");
  const [workHours, setWorkHours] = useState("");
  
  // State Khusus Mode Baru
  const [prepHours, setPrepHours] = useState(""); // Latihan/GR (Manggung)
  const [itemCount, setItemCount] = useState(""); // Jumlah Konten (Satuan)
  const [hoursPerItem, setHoursPerItem] = useState(""); // Jam per Konten (Satuan)
  const [shiftCount, setShiftCount] = useState(""); // Jumlah Hari (Shift)
  const [hoursPerShift, setHoursPerShift] = useState(""); // Jam per Shift (Shift)

  const [profitMargin, setProfitMargin] = useState(20);
  const [experienceLevel, setExperienceLevel] = useState("1"); 

  const numTarget = Number(targetAmount) || 0;
  const numExpenses = Number(expenses) || 0;
  const numWorkDays = Number(workDays) || 0;
  const numWorkHours = Number(workHours) || 0;
  const numPrepHours = Number(prepHours) || 0;
  const numItemCount = Number(itemCount) || 0;
  const numHoursPerItem = Number(hoursPerItem) || 0;
  const numShiftCount = Number(shiftCount) || 0;
  const numHoursPerShift = Number(hoursPerShift) || 0;
  const multiplier = Number(experienceLevel) || 1;

  // =========================================================
  // ALGORITMA KALKULASI MULTI-PROFESI
  // =========================================================
  const totalNeed = numTarget + numExpenses;
  
  let totalHours = 0;
  if (calcMode === 'monthly') totalHours = numWorkDays * numWorkHours;
  else if (calcMode === 'project' || calcMode === 'task') totalHours = numWorkHours;
  else if (calcMode === 'gig') totalHours = numWorkHours + numPrepHours; // Tampil + Latihan
  else if (calcMode === 'batch') totalHours = numItemCount * numHoursPerItem; // Total Jam Aset
  else if (calcMode === 'shift') totalHours = numShiftCount * numHoursPerShift; // Total Jam Lapangan

  const baseHourlyRate = totalHours > 0 ? totalNeed / totalHours : 0;
  const marginHourlyRate = baseHourlyRate + (baseHourlyRate * (profitMargin / 100));
  const finalHourlyRate = marginHourlyRate * multiplier;
  
  // Output Final
  const finalTotalFee = finalHourlyRate * totalHours;
  const finalDailyRate = calcMode === 'monthly' ? (finalHourlyRate * numWorkHours) : 0;
  const pricePerItem = numItemCount > 0 ? finalTotalFee / numItemCount : 0; // Mode Batch
  const pricePerShift = numShiftCount > 0 ? finalTotalFee / numShiftCount : 0; // Mode Shift

  // Reset State saat ganti mode agar tidak bentrok
  const handleModeChange = (mode) => {
    setCalcMode(mode);
    setTargetAmount(""); setExpenses(""); setWorkDays(""); setWorkHours("");
    setPrepHours(""); setItemCount(""); setHoursPerItem(""); setShiftCount(""); setHoursPerShift("");
  };

  return (
    <div className="print:hidden grid grid-cols-1 lg:grid-cols-12 gap-8 anim-fade-in-up">
      
      {/* PANEL INPUT */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
          
          <div className="flex flex-col mb-10 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20"><Icons.Calculator /></div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Kalkulator Multi-Profesi</h2>
                <p className="text-xs text-slate-400 mt-1">Sesuaikan model bisnis penawaran jasamu.</p>
              </div>
            </div>
            
            {/* TOGGLE 6 MODE KALKULASI */}
            <div className="grid grid-cols-2 sm:grid-cols-3 bg-[#141414] p-1.5 rounded-2xl border border-[#2a2a2a] gap-1.5 w-full">
              <button onClick={() => handleModeChange('monthly')} className={`py-2.5 px-2 rounded-xl text-[9px] font-bold transition-all uppercase tracking-widest ${calcMode === 'monthly' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Bulanan</button>
              <button onClick={() => handleModeChange('project')} className={`py-2.5 px-2 rounded-xl text-[9px] font-bold transition-all uppercase tracking-widest ${calcMode === 'project' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Per Projek</button>
              <button onClick={() => handleModeChange('batch')} className={`py-2.5 px-2 rounded-xl text-[9px] font-bold transition-all uppercase tracking-widest ${calcMode === 'batch' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Per Satuan</button>
              <button onClick={() => handleModeChange('shift')} className={`py-2.5 px-2 rounded-xl text-[9px] font-bold transition-all uppercase tracking-widest ${calcMode === 'shift' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Per Shift/Hari</button>
              <button onClick={() => handleModeChange('gig')} className={`py-2.5 px-2 rounded-xl text-[9px] font-bold transition-all uppercase tracking-widest ${calcMode === 'gig' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Manggung</button>
              <button onClick={() => handleModeChange('task')} className={`py-2.5 px-2 rounded-xl text-[9px] font-bold transition-all uppercase tracking-widest ${calcMode === 'task' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Per Task</button>
            </div>
          </div>

          <div className="space-y-8">
            <CleanSelect 
              label="Level Pengalaman Pribadi (Multiplier)" name="experienceLevel" value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)}
              options={[
                { value: "1", label: "Entry Level / Pemula (1x)" },
                { value: "1.5", label: "Mid-Level / Berpengalaman (1.5x)" },
                { value: "2.5", label: "Senior / Pro / Expert (2.5x)" },
              ]}
            />

            {/* INPUT DINAMIS BERDASARKAN MODE */}
            <CleanInput 
              label={
                calcMode === 'monthly' ? "Target Penghasilan Bersih (Per Bulan)" : 
                calcMode === 'project' ? "Target Upah Bersih (Satu Projek Ini)" :
                calcMode === 'batch' ? "Target Upah Bersih (Untuk Seluruh Aset/Konten)" :
                calcMode === 'shift' ? "Target Upah Bersih (Total Seluruh Hari/Shift)" :
                calcMode === 'gig' ? "Target Fee Bersih Tampil (Satu Acara)" :
                "Target Upah Bersih (Satu Task/Fitur Ini)"
              } 
              name="targetAmount" type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} prefix="Rp" 
              placeholder={calcMode === 'monthly' ? "10000000" : calcMode === 'gig' ? "5000000" : "1500000"} 
            />

            <CleanInput 
              label={
                calcMode === 'monthly' ? "Pengeluaran Operasional (Internet, Software, dll)" : 
                calcMode === 'project' ? "Biaya Tambahan Projek (Aset Premium, Server, Lisensi)" :
                calcMode === 'batch' ? "Biaya Tambahan (Stok Foto, Template, Font)" :
                calcMode === 'shift' ? "Biaya Transport & Sewa Alat (Kamera, Studio)" :
                calcMode === 'gig' ? "Biaya Transport, MUA, & Akomodasi" :
                "Biaya Operasional Task (Server, API, Aset)"
              } 
              name="expenses" type="number" value={expenses} onChange={e => setExpenses(e.target.value)} prefix="Rp" 
              placeholder={calcMode === 'monthly' ? "2000000" : calcMode === 'gig' ? "1000000" : "200000"} 
            />
            
            {/* GRID WAKTU DINAMIS */}
            <div className={`grid ${calcMode === 'project' || calcMode === 'task' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-6`}>
              
              {calcMode === 'monthly' && <CleanInput label="Hari Kerja / Bulan" name="workDays" type="number" value={workDays} onChange={e => setWorkDays(e.target.value)} placeholder="20" />}
              {calcMode === 'gig' && <CleanInput label="Durasi Latihan / Gladi Bersih (Jam)" name="prepHours" type="number" value={prepHours} onChange={e => setPrepHours(e.target.value)} placeholder="4" />}
              {calcMode === 'batch' && <CleanInput label="Jumlah Output (Item/Artikel/Video)" name="itemCount" type="number" value={itemCount} onChange={e => setItemCount(e.target.value)} placeholder="10" />}
              {calcMode === 'shift' && <CleanInput label="Jumlah Hari Turun Lapangan / Shift" name="shiftCount" type="number" value={shiftCount} onChange={e => setShiftCount(e.target.value)} placeholder="3" />}

              <CleanInput 
                label={
                  calcMode === 'monthly' ? "Jam Efektif / Hari" : 
                  calcMode === 'batch' ? "Estimasi Waktu per Item (Jam)" :
                  calcMode === 'shift' ? "Durasi per Shift (Jam)" :
                  calcMode === 'gig' ? "Durasi Tampil Manggung (Jam)" :
                  "Estimasi Waktu Pengerjaan (Total Jam)"
                } 
                name="workHours" type="number" 
                value={calcMode === 'batch' ? hoursPerItem : calcMode === 'shift' ? hoursPerShift : workHours} 
                onChange={e => {
                  if(calcMode === 'batch') setHoursPerItem(e.target.value);
                  else if(calcMode === 'shift') setHoursPerShift(e.target.value);
                  else setWorkHours(e.target.value);
                }} 
                placeholder={calcMode === 'monthly' ? "6" : calcMode === 'gig' ? "2" : "15"} 
              />
            </div>
            
            <div className="pt-2 border-t border-white/5">
              <div className="flex justify-between items-end mb-4 pt-4">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Margin Keuntungan Tambahan</label>
                <span className="text-cyan-400 font-mono font-bold text-xl bg-cyan-900/30 px-3 py-1 rounded-lg border border-cyan-500/30">{profitMargin}%</span>
              </div>
              <input type="range" min="0" max="100" value={profitMargin} onChange={e => setProfitMargin(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
            </div>
          </div>
        </div>
      </div>

      {/* PANEL HASIL DINAMIS */}
      <div className="lg:col-span-5">
        <div className="sticky top-10 bg-gradient-to-b from-cyan-950/20 to-[#0a0a0a] border border-cyan-500/20 rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_40px_rgba(6,182,212,0.1)]">
          <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Hasil Kalkulasi Final
          </h3>
          
          <div className="space-y-8">
            
            {calcMode === 'monthly' && (
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
            )}

            {calcMode === 'batch' && (
               <>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Harga Penawaran Total</p>
                    <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tighter">{formatCurrency(finalTotalFee, "IDR")}</div>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Harga Per Satuan / Konten</p>
                    <div className="text-2xl lg:text-3xl font-bold text-slate-300 tracking-tight">{formatCurrency(pricePerItem, "IDR")}</div>
                  </div>
               </>
            )}

            {calcMode === 'shift' && (
               <>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Total Estimasi Tagihan Event</p>
                    <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tighter">{formatCurrency(finalTotalFee, "IDR")}</div>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Tarif Per Hari / Shift</p>
                    <div className="text-2xl lg:text-3xl font-bold text-slate-300 tracking-tight">{formatCurrency(pricePerShift, "IDR")}</div>
                  </div>
               </>
            )}

            {calcMode === 'gig' && (
               <>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Total Performance Fee</p>
                    <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 tracking-tighter">{formatCurrency(finalTotalFee, "IDR")}</div>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Breakdown Value (Per Jam Efektif)</p>
                    <div className="text-2xl lg:text-3xl font-bold text-slate-300 tracking-tight">{formatCurrency(finalHourlyRate, "IDR")}</div>
                  </div>
               </>
            )}

            {(calcMode === 'project' || calcMode === 'task') && (
               <>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Total Penawaran (Fixed Price)</p>
                    <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{formatCurrency(finalTotalFee, "IDR")}</div>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Breakdown Rate (Per Jam)</p>
                    <div className="text-2xl lg:text-3xl font-bold text-slate-300 tracking-tight">{formatCurrency(finalHourlyRate, "IDR")}</div>
                  </div>
               </>
            )}
            
            {/* TIPS PRO DINAMIS */}
            <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group mt-6">
              <div className={`absolute left-0 top-0 w-1.5 h-full 
                ${calcMode === 'gig' || calcMode === 'task' ? 'bg-gradient-to-b from-indigo-400 to-purple-500' : 
                  calcMode === 'batch' || calcMode === 'shift' ? 'bg-gradient-to-b from-blue-400 to-cyan-500' : 
                  'bg-gradient-to-b from-emerald-400 to-cyan-500'}`}>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-3 font-medium">
                💡 <strong className="text-white">Insights:</strong> 
                {calcMode === 'monthly' ? " Gunakan rate ini sebagai standar penawaran B2B. Jangan kurangi margin jika klien sering revisi." : 
                 calcMode === 'batch' ? " Bagus untuk menagih komisi ilustrasi, artikel, atau video Reels. Harga per satuan sudah mencakup margin aset." :
                 calcMode === 'shift' ? " Biaya sewa alat & akomodasi telah diamortisasi. Ajukan Tarif Per Hari secara bulat ke klien/EO." :
                 calcMode === 'gig' ? " Nilai ini sudah menutupi jam 'Tak Kasat Mata' Anda saat Latihan/GR. Jangan biarkan klien hanya membayar jam manggung!" : 
                 calcMode === 'task' ? " Ajukan harga final ini untuk 1 fitur/task. Lock scope pekerjaan agar klien tidak meminta tambahan fitur gratis." : 
                 " Jadikan hasil ini harga dasar (Floor Price). Naikkan 20-50% jika klien adalah perusahaan besar (Corporate)."}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
