"use client";

import React, { useState } from 'react';
import { Icons, CleanInput, CleanSelect, formatCurrency } from './components';

export default function RateTab() {
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

  return (
    <div className="print:hidden grid grid-cols-1 lg:grid-cols-12 gap-8 anim-fade-in-up">
      {/* PANEL INPUT */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20"><Icons.Calculator /></div>
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

      {/* PANEL HASIL */}
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
  );
}
