"use client";

import React, { useState, useEffect } from 'react';

export default function ProfileToolkit() {
  const [profile, setProfile] = useState({
    myName: '',
    myRole: '',
    myEmail: '',
    myPhone: '',
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('mrr_profile_data');
    if (savedData) {
      // Hanya memuat data non-sensitif yang kita butuhkan
      const parsedData = JSON.parse(savedData);
      setProfile({
        myName: parsedData.myName || '',
        myRole: parsedData.myRole || '',
        myEmail: parsedData.myEmail || '',
        myPhone: parsedData.myPhone || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('mrr_profile_data', JSON.stringify(profile));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Hapus identitas lokal dari perangkat ini?")) {
      localStorage.removeItem('mrr_profile_data');
      setProfile({ myName: '', myRole: '', myEmail: '', myPhone: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans pb-32 pt-16 px-4">
      
      <div className="max-w-md mx-auto anim-fade-in-up">
        
        {/* HEADER AKUN */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-full flex items-center justify-center border border-white/10 shadow-xl mb-4 relative overflow-hidden">
            {profile.myName ? (
              <span className="text-2xl font-black text-cyan-400">
                {profile.myName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            )}
          </div>
          <h1 className="text-xl font-bold text-white">{profile.myName || 'Akun Lokal'}</h1>
          <p className="text-xs text-cyan-500 font-medium mt-1 uppercase tracking-widest">{profile.myRole || 'Pengguna Toolkit'}</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* LIST GRUP ALA SETTINGS NATIVE APP */}
          <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl overflow-hidden shadow-lg">
            
            {/* Field: Nama */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
              <label className="text-xs font-semibold text-slate-400 w-1/3">Nama Lengkap</label>
              <input 
                type="text" 
                name="myName" 
                value={profile.myName} 
                onChange={handleChange} 
                placeholder="Muhammad Rafli Ramadhan" 
                className="w-2/3 bg-transparent text-right text-sm text-white outline-none placeholder:text-slate-600 font-medium" 
              />
            </div>

            {/* Field: Role */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
              <label className="text-xs font-semibold text-slate-400 w-1/3">Profesi</label>
              <input 
                type="text" 
                name="myRole" 
                value={profile.myRole} 
                onChange={handleChange} 
                placeholder="Graphic Designer" 
                className="w-2/3 bg-transparent text-right text-sm text-white outline-none placeholder:text-slate-600 font-medium" 
              />
            </div>

            {/* Field: Email */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
              <label className="text-xs font-semibold text-slate-400 w-1/3">Email Bisnis</label>
              <input 
                type="email" 
                name="myEmail" 
                value={profile.myEmail} 
                onChange={handleChange} 
                placeholder="hello@mrr.my.id" 
                className="w-2/3 bg-transparent text-right text-sm text-white outline-none placeholder:text-slate-600 font-medium" 
              />
            </div>

            {/* Field: Telepon */}
            <div className="flex items-center justify-between p-4 bg-white/[0.02]">
              <label className="text-xs font-semibold text-slate-400 w-1/3">WhatsApp</label>
              <input 
                type="tel" 
                name="myPhone" 
                value={profile.myPhone} 
                onChange={handleChange} 
                placeholder="0851..." 
                className="w-2/3 bg-transparent text-right text-sm text-white outline-none placeholder:text-slate-600 font-medium" 
              />
            </div>

          </div>

          <p className="text-[10px] text-slate-500 text-center px-4 leading-relaxed">
            Data sinkronisasi ini disimpan secara lokal di memori perangkat Anda tanpa melibatkan server database, demi menjamin privasi mutlak.
          </p>

          {/* ACTION BUTTONS */}
          <div className="space-y-3 pt-2">
            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-[0_5px_20px_rgba(6,182,212,0.2)] active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
              {isSaved ? "Tersimpan ✓" : "Simpan Pengaturan"}
            </button>

            <button type="button" onClick={handleReset} className="w-full py-3 text-xs font-semibold text-slate-500 hover:text-rose-500 transition-colors">
              Hapus Data Perangkat
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
