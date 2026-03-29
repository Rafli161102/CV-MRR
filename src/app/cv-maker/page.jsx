"use client";

import { useState } from 'react';

export default function CVMaker() {
  // 1. STATE UNTUK DATA PRIBADI & SKILL
  const [basics, setBasics] = useState({
    name: "Nama Lengkap",
    role: "Posisi / Gelar (Misal: Software Engineer)",
    location: "Kota, Negara",
    phone: "+62 812-3456-7890",
    email: "email@anda.com",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
    summary: "Tulis ringkasan profil profesional Anda di sini. Jelaskan latar belakang, keahlian utama, dan nilai lebih yang Anda tawarkan...",
    skills: "HTML, CSS, JavaScript, React, Leadership, Problem Solving"
  });

  // 2. STATE UNTUK DATA BERLAPIS (ARRAY)
  const [experiences, setExperiences] = useState([
    { id: 1, role: "Jabatan", company: "Nama Perusahaan", period: "Bulan Tahun - Bulan Tahun", description: "- Tanggung jawab utama\n- Pencapaian..." }
  ]);
  const [educations, setEducations] = useState([
    { id: 1, institution: "Nama Universitas / Sekolah", major: "Jurusan / Gelar", period: "Tahun Masuk - Tahun Lulus", gpa: "IPK: 3.80" }
  ]);
  const [projects, setProjects] = useState([
    { id: 1, name: "Nama Proyek", period: "Bulan Tahun", description: "Jelaskan proyek ini dan teknologi yang digunakan..." }
  ]);
  const [certs, setCerts] = useState([
    { id: 1, name: "Nama Sertifikasi / Pelatihan", issuer: "Lembaga Penerbit", period: "Bulan Tahun", description: "Deskripsi singkat yang dipelajari..." }
  ]);

  // --- FUNGSI PENGENDALI FORMULIR ---
  const handleBasicsChange = (e) => setBasics({ ...basics, [e.target.name]: e.target.value });

  const handleArrayChange = (setter, state, index, field, value) => {
    const newState = [...state];
    newState[index][field] = value;
    setter(newState);
  };

  const addField = (setter, state, emptyObj) => setter([...state, { id: Date.now(), ...emptyObj }]);
  const removeField = (setter, state, index) => setter(state.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-[#060D1F] relative z-10 selection:bg-cyan-500 selection:text-white font-sans">
      
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
            border: none !important;
          }
          @page { size: A4; margin: 1.27cm; }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 no-print">
          <h1 className="text-4xl font-black text-white mb-3">ATS <span className="text-cyan-500">CV Maker</span></h1>
          <p className="text-slate-400">Buat CV ramah sistem HRD dengan format profesional. Tambahkan pengalaman tanpa batas!</p>
        </div>

        {/* LAYOUT: Flex-col di Layar Kecil (Mobile), Flex-row di Layar Lebar (PC) */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* ========================================================= */}
          {/* KOLOM KIRI: FORMULIR ISIAN                                  */}
          {/* ========================================================= */}
          {/* BUG FIX: 'sticky' hanya aktif di PC (xl:sticky). Di HP dia normal (static) sehingga mendorong kertas ke bawah. */}
          <div className="w-full xl:w-5/12 bg-[#0A1329] border border-white/10 p-6 md:p-8 rounded-[2rem] no-print xl:sticky xl:top-32 h-fit max-h-none xl:max-h-[80vh] overflow-visible xl:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full mb-4 xl:mb-0">
            
            {/* DATA PRIBADI */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-white/10 pb-2">Informasi Dasar</h2>
              <div className="space-y-3">
                <input type="text" name="name" value={basics.name} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Nama Lengkap" />
                <input type="text" name="role" value={basics.role} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Posisi Dilamar" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" name="location" value={basics.location} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Lokasi (Kota, Negara)" />
                  <input type="text" name="phone" value={basics.phone} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="No HP" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="email" name="email" value={basics.email} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Email" />
                  <input type="text" name="linkedin" value={basics.linkedin} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="LinkedIn Link" />
                </div>
                <textarea name="summary" value={basics.summary} onChange={handleBasicsChange} rows="4" className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Profil Singkat..."></textarea>
                <textarea name="skills" value={basics.skills} onChange={handleBasicsChange} rows="2" className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Keahlian (Pisahkan dengan koma)"></textarea>
              </div>
            </div>

            {/* PENGALAMAN KERJA DINAMIS */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold text-cyan-400">Pengalaman Kerja</h2>
                <button onClick={() => addField(setExperiences, experiences, { role: "", company: "", period: "", description: "" })} className="text-xs bg-cyan-600 text-white px-3 py-1 rounded hover:bg-cyan-500">+ Tambah</button>
              </div>
              {experiences.map((exp, index) => (
                <div key={exp.id} className="bg-[#060D1F] p-4 rounded-lg mb-4 border border-white/5 relative">
                  <button onClick={() => removeField(setExperiences, experiences, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs">Hapus</button>
                  <input type="text" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm mb-2 focus:outline-none" placeholder="Jabatan" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <input type="text" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'company', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="Perusahaan" />
                    <input type="text" value={exp.period} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="Periode (Cth: 2021 - 2023)" />
                  </div>
                  <textarea value={exp.description} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'description', e.target.value)} rows="3" className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="- Tanggung jawab (Gunakan strip '-' untuk poin)"></textarea>
                </div>
              ))}
            </div>

            {/* PENDIDIKAN DINAMIS */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold text-cyan-400">Pendidikan</h2>
                <button onClick={() => addField(setEducations, educations, { institution: "", major: "", period: "", gpa: "" })} className="text-xs bg-cyan-600 text-white px-3 py-1 rounded hover:bg-cyan-500">+ Tambah</button>
              </div>
              {educations.map((edu, index) => (
                <div key={edu.id} className="bg-[#060D1F] p-4 rounded-lg mb-4 border border-white/5 relative">
                  <button onClick={() => removeField(setEducations, educations, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs">Hapus</button>
                  <input type="text" value={edu.institution} onChange={(e) => handleArrayChange(setEducations, educations, index, 'institution', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm mb-2 focus:outline-none" placeholder="Nama Kampus / Sekolah" />
                  <input type="text" value={edu.major} onChange={(e) => handleArrayChange(setEducations, educations, index, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm mb-2 focus:outline-none" placeholder="Jurusan / Gelar" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input type="text" value={edu.period} onChange={(e) => handleArrayChange(setEducations, educations, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="Periode" />
                    <input type="text" value={edu.gpa} onChange={(e) => handleArrayChange(setEducations, educations, index, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="Info Tambahan (IPK / Nilai)" />
                  </div>
                </div>
              ))}
            </div>

             {/* PROYEK DINAMIS */}
             <div className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold text-cyan-400">Proyek (Opsional)</h2>
                <button onClick={() => addField(setProjects, projects, { name: "", period: "", description: "" })} className="text-xs bg-cyan-600 text-white px-3 py-1 rounded hover:bg-cyan-500">+ Tambah</button>
              </div>
              {projects.map((proj, index) => (
                <div key={proj.id} className="bg-[#060D1F] p-4 rounded-lg mb-4 border border-white/5 relative">
                  <button onClick={() => removeField(setProjects, projects, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs">Hapus</button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <input type="text" value={proj.name} onChange={(e) => handleArrayChange(setProjects, projects, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="Nama Proyek" />
                    <input type="text" value={proj.period} onChange={(e) => handleArrayChange(setProjects, projects, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="Periode" />
                  </div>
                  <textarea value={proj.description} onChange={(e) => handleArrayChange(setProjects, projects, index, 'description', e.target.value)} rows="2" className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="Deskripsi proyek..."></textarea>
                </div>
              ))}
            </div>

            {/* TOMBOL CETAK */}
            <button onClick={() => window.print()} className="w-full mt-4 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] uppercase tracking-widest text-sm">
              Cetak / Simpan PDF
            </button>
          </div>

          {/* ========================================================= */}
          {/* KOLOM KANAN: PREVIEW KERTAS CV (LIVE)                     */}
          {/* ========================================================= */}
          <div className="w-full xl:w-7/12 bg-[#0A1329]/50 p-4 sm:p-6 rounded-[2rem] overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full shadow-inner border border-white/5">
            
            {/* BUG FIX: 'w-fit mx-auto' memastikan scroll horizontal tidak terpotong di HP */}
            <div className="w-fit mx-auto">
              {/* KERTAS A4 STRICT WIDTH */}
              <div id="cv-preview" className="w-[21cm] min-w-[21cm] min-h-[29.7cm] bg-white text-black py-12 px-10 sm:px-14 shadow-2xl font-sans shrink-0 border border-gray-200">
                
                {/* HEADER - FORMAT HUDA STYLE */}
                <div className="border-b-2 border-black pb-4 mb-4">
                  <h1 className="text-3xl font-bold uppercase mb-1">{basics.name || "Nama Lengkap"}</h1>
                  <p className="text-[14px] font-medium text-gray-800 mb-2">{basics.location} | {basics.phone} | {basics.email} {basics.linkedin && `| ${basics.linkedin}`}</p>
                  <p className="text-[13px] leading-relaxed text-justify text-gray-800">{basics.summary}</p>
                </div>

                {/* EDUCATION */}
                {educations.length > 0 && educations[0].institution !== "" && (
                  <div className="mb-4">
                    <h2 className="text-[15px] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-wide">Education</h2>
                    <div className="flex flex-col gap-2">
                      {educations.map((edu, idx) => (
                        <div key={idx} className="break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[14px] font-bold text-gray-900 uppercase">{edu.institution}</h3>
                            <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">{edu.period}</span>
                          </div>
                          <div className="text-[13px] text-gray-800">{edu.major}</div>
                          {edu.gpa && <div className="text-[13px] text-gray-600">{edu.gpa}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SKILLS */}
                {basics.skills && (
                  <div className="mb-4 break-inside-avoid">
                    <h2 className="text-[15px] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-wide">Skill and Competencies</h2>
                    <p className="text-[13px] text-gray-800 leading-relaxed">{basics.skills}</p>
                  </div>
                )}

                {/* EXPERIENCE */}
                {experiences.length > 0 && experiences[0].role !== "" && (
                  <div className="mb-4">
                    <h2 className="text-[15px] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-wide">Experience</h2>
                    <div className="flex flex-col gap-3">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[14px] font-bold text-gray-900">{exp.company}</h3>
                            <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">{exp.period}</span>
                          </div>
                          <div className="text-[13px] font-medium italic text-gray-700 mb-1">{exp.role}</div>
                          <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-line text-justify ml-3">{exp.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PROJECTS */}
                {projects.length > 0 && projects[0].name !== "" && (
                  <div className="mb-4">
                    <h2 className="text-[15px] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-wide">Projects</h2>
                    <div className="flex flex-col gap-3">
                      {projects.map((proj, idx) => (
                        <div key={idx} className="break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[14px] font-bold text-gray-900">{proj.name}</h3>
                            <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">{proj.period}</span>
                          </div>
                          <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-line text-justify ml-3">{proj.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CERTIFICATIONS */}
                {certs.length > 0 && certs[0].name !== "" && (
                  <div className="mb-4">
                    <h2 className="text-[15px] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-wide">Certification</h2>
                    <div className="flex flex-col gap-3">
                      {certs.map((cert, idx) => (
                        <div key={idx} className="break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[14px] font-bold text-gray-900">{cert.name}</h3>
                            <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">{cert.period}</span>
                          </div>
                          <div className="text-[13px] text-gray-700 italic mb-1">{cert.issuer}</div>
                          <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-line text-justify ml-3">{cert.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
