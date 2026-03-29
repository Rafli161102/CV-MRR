"use client";

import { useState } from 'react';

export default function CVMaker() {
  // State: Ini adalah "Ingatan Sementara" untuk menyimpan ketikan pengunjung
  const [data, setData] = useState({
    name: "Nama Lengkap",
    role: "Posisi yang Dilamar",
    location: "Jakarta, Indonesia",
    phone: "08123456789",
    email: "email@kamu.com",
    linkedin: "linkedin.com/in/username",
    summary: "Tulis profil singkatmu di sini. Jelaskan siapa kamu, apa keahlian utamamu, dan apa nilai jual yang bisa kamu berikan ke perusahaan...",
    expRole: "Nama Jabatan / Posisi",
    expCompany: "Nama Perusahaan",
    expYear: "2020 - Sekarang",
    expDesc: "Jelaskan tanggung jawab dan pencapaianmu di sini...",
    eduCampus: "Nama Universitas / Sekolah",
    eduMajor: "Jurusan / Gelar",
    eduYear: "2016 - 2020",
    skills: "Ms. Office, Komunikasi, Desain Grafis, Teamwork"
  });

  // Fungsi untuk menangani perubahan saat pengunjung mengetik
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-[#060D1F] relative z-10 selection:bg-cyan-500 selection:text-white">
      
      {/* SIHIR CSS PRINT UNTUK PENGUNJUNG */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; }
          body * { visibility: hidden; }
          #cv-preview, #cv-preview * { visibility: visible; }
          #cv-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100%;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          @page { size: A4; margin: 1.27cm; }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 no-print">
          <h1 className="text-4xl font-black text-white mb-3">Public <span className="text-cyan-500">CV Maker</span></h1>
          <p className="text-slate-400">Buat CV ramah ATS milikmu sendiri secara gratis. Ketik data di kiri, dan cetak hasilnya!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* KOLOM KIRI: FORMULIR ISIAN (Hanya Tampil di Layar) */}
          <div className="bg-[#0A1329] border border-white/10 p-8 rounded-[2rem] no-print sticky top-32 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold text-cyan-400 mb-6 border-b border-white/10 pb-4">Data Pribadi</h2>
            
            <div className="space-y-4">
              <input type="text" name="name" value={data.name} onChange={handleChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Nama Lengkap" />
              <input type="text" name="role" value={data.role} onChange={handleChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Posisi yang dilamar" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="phone" value={data.phone} onChange={handleChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="No HP" />
                <input type="email" name="email" value={data.email} onChange={handleChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Email" />
              </div>
              <textarea name="summary" value={data.summary} onChange={handleChange} rows="4" className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Profil Singkat..."></textarea>
              
              <h2 className="text-xl font-bold text-cyan-400 mt-8 mb-4 border-b border-white/10 pb-4">Pengalaman & Pendidikan</h2>
              <input type="text" name="expRole" value={data.expRole} onChange={handleChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Jabatan Terakhir" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="expCompany" value={data.expCompany} onChange={handleChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Perusahaan" />
                <input type="text" name="expYear" value={data.expYear} onChange={handleChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Tahun (cth: 2022 - 2023)" />
              </div>
              <textarea name="expDesc" value={data.expDesc} onChange={handleChange} rows="3" className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Deskripsi Pekerjaan..."></textarea>

              <input type="text" name="eduCampus" value={data.eduCampus} onChange={handleChange} className="w-full mt-4 bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Nama Kampus/Sekolah" />
              <input type="text" name="skills" value={data.skills} onChange={handleChange} className="w-full mt-4 bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white focus:border-cyan-500 focus:outline-none" placeholder="Keahlian (pisahkan dengan koma)" />

              <button onClick={() => window.print()} className="w-full mt-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                Cetak / Simpan PDF
              </button>
            </div>
          </div>

          {/* KOLOM KANAN: PREVIEW KERTAS CV (LIVE) */}
          <div className="flex justify-center overflow-x-auto pb-10">
            <div id="cv-preview" className="w-full min-w-[21cm] max-w-[21cm] min-h-[29.7cm] bg-white text-black p-12 shadow-2xl font-sans shrink-0 transform origin-top-left scale-90 sm:scale-100">
              
              <div className="text-center border-b-2 border-black pb-4 mb-5">
                <h1 className="text-3xl font-black uppercase tracking-widest mb-1">{data.name}</h1>
                <h2 className="text-lg font-medium mb-3 text-gray-800 tracking-wider">{data.role}</h2>
                <div className="text-[13px] flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-700 font-medium">
                  <span>📍 {data.location}</span>
                  <span>📞 {data.phone}</span>
                  <span>✉️ {data.email}</span>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-2 pb-1">Professional Summary</h3>
                <p className="text-[13px] leading-relaxed text-justify text-gray-800">{data.summary}</p>
              </div>

              <div className="mb-5">
                <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Work Experience</h3>
                <div>
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="font-bold text-[14px] text-gray-900">{data.expRole}</h4>
                    <span className="text-[13px] font-bold text-gray-800">{data.expYear}</span>
                  </div>
                  <div className="text-[13px] font-medium italic text-gray-700 mb-1.5">{data.expCompany}</div>
                  <p className="text-[13px] leading-relaxed text-justify text-gray-800 whitespace-pre-line">{data.expDesc}</p>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Education</h3>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[14px] text-gray-900">{data.eduCampus}</h4>
                    <div className="text-[13px] text-gray-800">{data.eduMajor}</div>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800">{data.eduYear}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-2 pb-1">Skills</h3>
                <p className="text-[13px] leading-relaxed text-gray-800">{data.skills}</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
