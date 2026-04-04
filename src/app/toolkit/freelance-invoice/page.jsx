"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Icons } from './components';
import RateTab from './RateTab';
import InvoiceTab from './InvoiceTab';
import RabTab from './RabTab';

export default function InvoiceStudio() {
  // Sekarang kita punya 3 state: 'rate', 'rab', dan 'invoice'
  const [activeTab, setActiveTab] = useState('rate'); 

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white pb-32">
      
      {/* HEADER NAVIGASI */}
      <div className="print:hidden relative pt-24 md:pt-32 pb-8 border-b border-white/5 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link href="/toolkit" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white shrink-0">
              <Icons.ArrowLeft />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight truncate tracking-tight">Invoice <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">Studio</span></h1>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide truncate">Rate Calculator, Quotation, & Invoice</p>
            </div>
          </div>
          
          {/* TOMBOL TAB DENGAN HORIZONTAL SCROLL (AMAMAN DI HP) */}
          <div className="flex bg-[#0a0a0a] p-1.5 rounded-full border border-white/5 w-full sm:w-auto shadow-inner overflow-x-auto custom-scroll">
            <button onClick={() => setActiveTab('rate')} className={`flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 tracking-wide whitespace-nowrap ${activeTab === 'rate' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              Kalkulator Rate
            </button>
            <button onClick={() => setActiveTab('rab')} className={`flex-1 min-w-[140px] sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 tracking-wide whitespace-nowrap ${activeTab === 'rab' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              RAB / Penawaran
            </button>
            <button onClick={() => setActiveTab('invoice')} className={`flex-1 min-w-[120px] sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 tracking-wide whitespace-nowrap ${activeTab === 'invoice' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              Buat Invoice
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
         {/* RENDERING TAB SESUAI PILIHAN */}
         {activeTab === 'rate' && <RateTab />}
         {activeTab === 'rab' && <RabTab />}
         {activeTab === 'invoice' && <InvoiceTab />}
      </div>

    </div>
  );
}
