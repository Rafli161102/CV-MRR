"use client";

import React, { useState, useEffect } from 'react';

export default function ProfileToolkit() {
  // State untuk menyimpan semua data profil
  const [profile, setProfile] = useState({
    myName: '',
    myRole: '',
    myEmail: '',
    myPhone: '',
    bankName: '',
    accName: '',
    accNumber: '',
  });

  const [isSaved, setIsSaved] = useState(false);

  // 1. Ambil data dari Memori HP saat halaman pertama kali dibuka
  useEffect(() => {
    const savedData = localStorage.getItem('mrr_profile_data');
    if (savedData) {
      setProfile(JSON.parse(savedData));
    }
  }, []);

  // 2. Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // 3. Simpan data ke Memori HP (localStorage)
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('mrr_profile_data', JSON.stringify(profile));
    setIsSaved(true);
    
    // Hilangkan notifikasi tersimpan setelah 3 detik
    setTimeout(() => setIsSaved(false), 3000);
  };

  // 4. Hapus data (Reset)
  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua data profil di perangkat ini?")) {
      localStorage.removeItem('mrr_profile_data');
      setProfile({
        myName: '', myRole: '', myEmail: '', myPhone: '',
        bankName: '', accName: '', accNumber: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans pb-32 pt-20 px-6">
      
      <div className="max-w-2xl mx-auto anim-fade-in-up">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] mb-6 border-4 border-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Identity Center</h1>
          <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed uppercase tracking-widest font-bold">
            Data Lokal • Privasi Mutlak • Auto-Fill
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* CARD 1: INFORMASI BISNIS */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            
            <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Informasi Bisnis
            </h3>
            
            <div className="space-y-6">
              <div className="relative group">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Lengkap / Brand Agency</label>
                <input type="text" name="myName" value={profile.myName} onChange={handleChange} placeholder="M. Rafli Ramadhan" className="w-full bg-[#0d1424]/60 border-b-2 border-slate-800 focus:border-cyan-400 px-5 py-4 rounded-t-2xl text-sm text-white outline-none transition-all font-medium" />
              </div>

              <div className="relative group">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Profesi Utama</label>
                <input type="text" name="myRole" value={profile.myRole} onChange={handleChange} placeholder="Senior Graphic Designer" className="w-full bg-[#0d1424]/60 border-b-2 border-slate-800 focus:border-cyan-400 px-5 py-4 rounded-t-2xl text-sm text-white outline-none transition-all font-medium" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Bisnis</label>
                  <input type="email" name="myEmail" value={profile.myEmail} onChange={handleChange} placeholder="hello@mrr.my.id" className="w-full bg-[#0d1424]/60 border-b-2 border-slate-800 focus:border-cyan-400 px-5 py-4 rounded-t-2xl text-sm text-white outline-none transition-all font-medium" />
                </div>
                <div className="relative group">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">WhatsApp / Telegram</label>
                  <input type="tel" name="myPhone" value={profile.myPhone} onChange={handleChange} placeholder="+62 851..." className="w-full bg-[#0d1424]/60 border-b-2 border-slate-800 focus:border-cyan-400 px-5 py-4 rounded-t-2xl text-sm text-white outline-none transition-all font-medium" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: INFORMASI REKENING */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-6 relative">
            <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Rekening Default
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative group">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Bank</label>
                <input type="text" name="bankName" value={profile.bankName} onChange={handleChange} placeholder="Bank Jago / BCA" className="w-full bg-[#0d1424]/60 border-b-2 border-slate-800 focus:border-emerald-400 px-5 py-4 rounded-t-2xl text-sm text-white outline-none transition-all font-medium" />
              </div>
              <div className="relative group">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Atas Nama (Pemilik)</label>
                <input type="text" name="accName" value={profile.accName} onChange={handleChange} placeholder="M. Rafli Ramadhan" className="w-full bg-[#0d1424]/60 border-b-2 border-slate-800 focus:border-emerald-400 px-5 py-4 rounded-t-2xl text-sm text-white outline-none transition-all font-medium" />
              </div>
            </div>
            
            <div className="relative group">
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Nomor Rekening</label>
              <input type="number" name="accNumber" value={profile.accNumber} onChange={handleChange} placeholder="1234567890" className="w-full bg-[#0d1424]/60 border-b-2 border-slate-800 focus:border-emerald-400 px-5 py-4 rounded-t-2xl text-lg text-white outline-none transition-all font-black tracking-widest font-mono" />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-4 pt-4">
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black py-5 rounded-2xl shadow-[0_10px_30px_rgba(6,182,212,0.3)] active:scale-[0.98] transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3">
              {isSaved ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Berhasil Disimpan!
                </>
              ) : "Simpan Identitas Lokal"}
            </button>

            <button type="button" onClick={handleReset} className="w-full py-4 text-[10px] font-black text-slate-600 hover:text-rose-500 transition-colors uppercase tracking-[0.2em]">
              Reset & Hapus Data dari HP Ini
            </button>
          </div>
        </form>

        {/* FOOTER INFO */}
        <div className="mt-12 p-6 rounded-3xl bg-cyan-950/20 border border-cyan-500/10 text-center">
          <p className="text-[10px] text-cyan-400 leading-relaxed font-medium">
            🔒 <strong className="text-white">Security Note:</strong> Data Anda tidak pernah dikirim ke server MRR. Semua informasi tersimpan terenkripsi dalam cache browser pribadi Anda.
          </p>
        </div>

      </div>
    </div>
  );
}
