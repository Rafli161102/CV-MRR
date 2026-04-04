"use client";

import React, { useState } from 'react';
import { Icons, CleanInput, CleanSelect, formatCurrency } from './components';

export default function RateTab() {
  // 4 Mode Kalkulasi: monthly, project, gig (Manggung), task (Programmer/Dev)
  const [calcMode, setCalcMode] = useState('monthly'); 
  
  const [targetAmount, setTargetAmount] = useState("");
  const [expenses, setExpenses] = useState("");
  const [workDays, setWorkDays] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [prepHours, setPrepHours] = useState(""); // Khusus untuk Latihan/GR (Manggung)
  
  const [profitMargin, setProfitMargin] = useState(20);
  const [experienceLevel, setExperienceLevel] = useState("1"); 

  const numTarget = Number(targetAmount) || 0;
  const numExpenses = Number(expenses) || 0;
  const numWorkDays = Number(workDays) || 0;
  const numWorkHours = Number(workHours) || 0;
  const numPrepHours = Number(prepHours) || 0;
  const multiplier = Number(experienceLevel) || 1;

  // KALKULASI ALGORITMA ENTERPRISE
  const totalNeed = numTarget + numExpenses;
  
  let totalHours = 0;
  if (calcMode === 'monthly') totalHours = numWorkDays * numWorkHours;
  else if (calcMode === 'gig') totalHours = numWorkHours + numPrepHours; // Manggung + Latihan
  else totalHours = numWorkHours; // Projek & Task

  const baseHourlyRate = totalHours > 0 ? totalNeed / totalHours : 0;
  const marginHourlyRate = baseHourlyRate + (baseHourlyRate * (profitMargin / 100));
  const finalHourlyRate = marginHourlyRate * multiplier;
  
  // Output Khusus
  const finalDailyRate = calcMode === 'monthly' ? (finalHourlyRate * numWorkHours) : 0;
  const finalTotalFee = finalHourlyRate * totalHours;

  // Handler Ganti Mode & Reset State yang relevan
  const handleModeChange = (mode) => {
    setCalcMode(mode);
    setTargetAmount("");
    setExpenses("");
    setWorkDays(mode === 'monthly' ? "" : "1");
    setWorkHours("");
    setPrepHours("");
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
                <h2 className="text-2xl font-black text-white tracking-tight">Kalkulator Rate Multi-Profesi</h2>
                <p className="text-xs text-slate-400 mt-1">Sesuaikan model bisnis penawaran jasamu.</p>
              </div>
            </div>
            
            {/* TOGGLE 4 MODE KALKULASI */}
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#141414] p-1.5 rounded-2xl border border-[#2a2a2a] gap-1.5 w-full">
              <button onClick={() => handleModeChange('monthly')} className={`py-2.5 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest ${calcMode === 'monthly' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Bulanan</button>
              <button onClick={() => handleModeChange('project')} className={`py-2.5 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest ${calcMode === 'project' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Per Projek</button>
              <button onClick={() => handleModeChange('gig')} className={`py-2.5 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest ${calcMode === 'gig' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Manggung</button>
              <button onClick={() => handleModeChange('task')} className={`py-2.5 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest ${calcMode === 'task' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>Per Task</button>
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

            {/* Label Dinamis Berdasarkan Mode */}
            <CleanInput 
              label={
                calcMode === 'monthly' ? "Target Penghasilan Bersih (Per Bulan)" : 
                calcMode === 'project' ? "Target Upah Bersih (Satu Projek Ini)" :
                calcMode === 'gig' ? "Target Fee Bersih Tampil (Satu Acara)" :
                "Target Upah Bersih (Satu Task/Fitur Ini)"
              } 
              name="targetAmount" type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} prefix="Rp" 
              placeholder={calcMode === 'monthly' ? "10000000" : calcMode === 'gig' ? "5000000" : "1500000"} 
            />

            <CleanInput 
              label={
                calcMode === 'monthly' ? "Pengeluaran Operasional (Internet, Software, dll)" : 
                calcMode === 'project' ? "Biaya Tambahan Projek (Aset, Lisensi, dll)" :
                calcMode === 'gig' ? "Biaya Transport, Akomodasi, Sewa Alat & Studio" :
                "Biaya Operasional Task (Server, API, Aset)"
              } 
              name="expenses" type="number" value={expenses} onChange={e => setExpenses(e.target.value)} prefix="Rp" 
              placeholder={calcMode === 'monthly' ? "2000000" : calcMode === 'gig' ? "1000000" : "200000"} 
            />
            
            {/* Grid Waktu Dinamis */}
            <div className={`grid ${calcMode === 'monthly' || calcMode === 'gig' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-6`}>
              
              {calcMode === 'monthly' && <CleanInput label="Hari Kerja / Bulan" name="workDays" type="number" value={workDays} onChange={e => setWorkDays(e.target.value)} placeholder="20" />}
              
              {calcMode === 'gig' && <CleanInput label="Durasi Latihan / Gladi Bersih (Jam)" name="prepHours" type="number" value={prepHours} onChange={e => setPrepHours(e.target.value)} placeholder="4" />}

              <CleanInput 
                label={
                  calcMode === 'monthly' ? "Jam Efektif / Hari" : 
                  calcMode === 'gig' ? "Durasi Tampil Manggung (Jam)" :
                  "Estimasi Waktu Pengerjaan (Total Jam)"
                } 
                name="workHours" type="number" value={workHours} onChange={e => setWorkHours(e.target.value)} 
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

      {/* PANEL HASIL */}
      <div className="lg:col-span-5">
        <div className="sticky top-10 bg-gradient-to-b from-cyan-950/20 to-[#0a0a0a] border border-cyan-500/20 rounded-[2rem] p-6 sm:p-10 shadow-[0_20px_40px_rgba(6,182,212,0.1)]">
          <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Hasil Kalkulasi Final
          </h3>
          
          <div className="space-y-8">
            
            {/* TAMPILAN BULANAN */}
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

            {/* TAMPILAN GIG/MANGGUNG */}
            {calcMode === 'gig' && (
               <>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Total Performance Fee (Tarif Manggung)</p>
                    <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tighter">{formatCurrency(finalTotalFee, "IDR")}</div>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Breakdown Value (Per Jam Efektif)</p>
                    <div className="text-2xl lg:text-3xl font-bold text-slate-300 tracking-tight">{formatCurrency(finalHourlyRate, "IDR")}</div>
                  </div>
               </>
            )}

            {/* TAMPILAN PROJECT & TASK */}
            {(calcMode === 'project' || calcMode === 'task') && (
               <>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Total Penawaran Harga (Fixed Price)</p>
                    <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{formatCurrency(finalTotalFee, "IDR")}</div>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Breakdown Value (Per Jam)</p>
                    <div className="text-2xl lg:text-3xl font-bold text-slate-300 tracking-tight">{formatCurrency(finalHourlyRate, "IDR")}</div>
                  </div>
               </>
            )}
            
            {/* TIPS DINAMIS */}
            <div className="bg-[#030712]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group mt-6">
              <div className={`absolute left-0 top-0 w-1.5 h-full ${calcMode === 'gig' ? 'bg-gradient-to-b from-indigo-400 to-cyan-500' : 'bg-gradient-to-b from-emerald-400 to-cyan-500'}`}></div>
              <p className="text-xs text-slate-300 leading-relaxed pl-3 font-medium">
                💡 <strong className="text-white">Tips Negosiasi:</strong> 
                {calcMode === 'monthly' ? " Gunakan rate ini sebagai standar negosiasi kontrak panjang. Jangan turunkan margin melebihi 10%." : 
                 calcMode === 'gig' ? " Nilai ini sudah mencakup keringat saat latihan/GR. Klien wajib tahu bahwa mereka tidak hanya membayar durasi Anda tampil di panggung." : 
                 calcMode === 'task' ? " Ajukan harga ini untuk 1 fitur/task. Pastikan spesifikasi tugas terkunci (lock scope) agar tidak ada revisi tak terbatas." : 
                 " Jadikan hasil ini sebagai harga dasar (floor price). Anda selalu bisa menaikkan harga jika skala bisnis klien lebih besar."}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
