"use client";

import { useState } from 'react';

export default function CVMaker() {
  // 1. STATE TEMA & BAHASA
  const [template, setTemplate] = useState('huda');
  const [lang, setLang] = useState('en'); 
  const [isTranslating, setIsTranslating] = useState(false); // State untuk Loading Animasi

  // KAMUS BAHASA UI
  const t = {
    id: {
      title: "Desain CV", langText: "Bahasa CV", personal: "Informasi Dasar", exp: "Pengalaman Kerja", edu: "Pendidikan", proj: "Proyek (Opsional)", cert: "Sertifikasi (Opsional)", summary: "Profil Singkat", skills: "Keahlian & Kompetensi", add: "+ Tambah", del: "Hapus", print: "Cetak / Simpan PDF",
      placeholders: { name: "Nama Lengkap", role: "Posisi Dilamar", loc: "Kota, Negara", summary: "Tulis ringkasan profil profesional Anda...", skills: "Keahlian utama (HTML, CSS, Manajemen Waktu...)", expRole: "Jabatan", expComp: "Nama Perusahaan", expDate: "Bulan Tahun - Bulan Tahun", eduInst: "Nama Kampus / Sekolah", eduMaj: "Jurusan / Gelar", eduDate: "Tahun Masuk - Lulus", projName: "Nama Proyek", certName: "Nama Sertifikasi" }
    },
    en: {
      title: "CV Template", langText: "CV Language", personal: "Basic Information", exp: "Work Experience", edu: "Education", proj: "Projects (Optional)", cert: "Certifications (Optional)", summary: "Professional Summary", skills: "Skill and Competencies", add: "+ Add New", del: "Remove", print: "Print / Save as PDF",
      placeholders: { name: "Full Name", role: "Targeted Role", loc: "City, Country", summary: "Write your professional summary here...", skills: "Core skills (HTML, CSS, Time Management...)", expRole: "Job Title", expComp: "Company Name", expDate: "Month Year - Month Year", eduInst: "University / School Name", eduMaj: "Major / Degree", eduDate: "Start Year - End Year", projName: "Project Name", certName: "Certification Name" }
    }
  }[lang];

  // 2. STATE FORMULIR
  const [basics, setBasics] = useState({ name: "", role: "", location: "", phone: "", email: "", linkedin: "", summary: "", skills: "" });
  const [experiences, setExperiences] = useState([{ id: 1, role: "", company: "", period: "", description: "" }]);
  const [educations, setEducations] = useState([{ id: 1, institution: "", major: "", period: "", gpa: "" }]);
  const [projects, setProjects] = useState([{ id: 1, name: "", period: "", description: "" }]);
  const [certs, setCerts] = useState([{ id: 1, name: "", issuer: "", period: "", description: "" }]);

  // --- FUNGSI PENGENDALI FORMULIR ---
  const handleBasicsChange = (e) => setBasics({ ...basics, [e.target.name]: e.target.value });
  const handleArrayChange = (setter, state, index, field, value) => {
    const newState = [...state];
    newState[index][field] = value;
    setter(newState);
  };
  const addField = (setter, state, emptyObj) => setter([...state, { id: Date.now(), ...emptyObj }]);
  const removeField = (setter, state, index) => setter(state.filter((_, i) => i !== index));

  // =========================================================================
  // FUNGSI MAGIC TRANSLATE (MENGGUNAKAN API LIBRETRANSLATE)
  // =========================================================================
  const handleMagicTranslate = async () => {
    setIsTranslating(true);
    
    // Tentukan arah terjemahan berdasarkan bahasa UI saat ini
    const sourceLang = lang === 'en' ? 'id' : 'en'; 
    const targetLang = lang;

    // Fungsi pemanggil API LibreTranslate
    const translateText = async (text) => {
      if (!text || text.trim() === "") return text;
      try {
        const res = await fetch("https://translate.argosopentech.com/translate", {
          method: "POST",
          body: JSON.stringify({ q: text, source: sourceLang, target: targetLang, format: "text" }),
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        return data.translatedText || text;
      } catch (err) {
        console.error("Translate error:", err);
        return text; // Jika gagal/limit, kembalikan teks asli agar tidak hilang
      }
    };

    // 1. Terjemahkan Data Dasar (Berurutan agar API gratisan tidak kelebihan beban / Timeout)
    const tRole = await translateText(basics.role);
    const tSummary = await translateText(basics.summary);
    const tSkills = await translateText(basics.skills);
    setBasics(prev => ({ ...prev, role: tRole, summary: tSummary, skills: tSkills }));

    // 2. Terjemahkan Pengalaman
    const translatedExp = [];
    for (let exp of experiences) {
      const tExpRole = await translateText(exp.role);
      const tExpDesc = await translateText(exp.description);
      translatedExp.push({ ...exp, role: tExpRole, description: tExpDesc });
    }
    setExperiences(translatedExp);

    // 3. Terjemahkan Proyek
    const translatedProj = [];
    for (let proj of projects) {
      const tProjDesc = await translateText(proj.description);
      translatedProj.push({ ...proj, description: tProjDesc });
    }
    setProjects(translatedProj);

    setIsTranslating(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-[#060D1F] relative z-10 selection:bg-cyan-500 selection:text-white font-sans">
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; }
          body * { visibility: hidden; }
          #cv-preview, #cv-preview * { visibility: visible; }
          #cv-preview {
            position: absolute; left: 0; top: 0; width: 100%; max-width: 100%;
            padding: 0 !important; margin: 0 !important; box-shadow: none !important; border: none !important;
          }
          @page { size: A4; margin: 1.27cm; }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8 no-print">
          <h1 className="text-4xl font-black text-white mb-2">ATS <span className="text-cyan-500">CV Maker</span></h1>
          <p className="text-slate-400">Professional auto-formatting standard for HR Systems.</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* ========================================================= */}
          {/* KOLOM KIRI: FORMULIR ISIAN                                  */}
          {/* ========================================================= */}
          <div className="w-full xl:w-5/12 bg-[#0A1329] border border-white/10 p-6 rounded-[2rem] no-print xl:sticky xl:top-32 h-fit max-h-none xl:max-h-[80vh] overflow-visible xl:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full">
            
            {/* PANEL KONTROL */}
            <div className="mb-8 p-5 bg-[#060D1F] border border-cyan-500/30 rounded-xl">
              
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{t.langText}</h2>
                <div className="flex items-center gap-3">
                  {/* TOMBOL MAGIC TRANSLATE (BARU) */}
                  <button 
                    onClick={handleMagicTranslate} 
                    disabled={isTranslating}
                    className="flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-3 py-1.5 rounded transition-all disabled:opacity-50"
                  >
                    {isTranslating ? "Translating..." : "✨ Auto-Translate Isi"}
                  </button>

                  <div className="flex bg-[#0A1329] rounded border border-white/10 overflow-hidden">
                    <button onClick={() => setLang('id')} className={`px-3 py-1 text-xs font-bold transition-colors ${lang === 'id' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-white'}`}>ID</button>
                    <button onClick={() => setLang('en')} className={`px-3 py-1 text-xs font-bold transition-colors ${lang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-white'}`}>EN</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button onClick={() => setTemplate('huda')} className={`py-2 px-2 text-xs font-bold rounded border transition-all ${template === 'huda' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>1. Huda ATS (Strict)</button>
                <button onClick={() => setTemplate('modern')} className={`py-2 px-2 text-xs font-bold rounded border transition-all ${template === 'modern' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>2. Modern Pro</button>
                <button onClick={() => setTemplate('harvard')} className={`py-2 px-2 text-xs font-bold rounded border transition-all ${template === 'harvard' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>3. Harvard (Serif)</button>
                <button onClick={() => setTemplate('executive')} className={`py-2 px-2 text-xs font-bold rounded border transition-all ${template === 'executive' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>4. Tech Executive</button>
              </div>
            </div>

            {/* FORM: DATA PRIBADI */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-white/10 pb-2">{t.personal}</h2>
              <div className="space-y-3">
                <input type="text" name="name" value={basics.name} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.name} />
                <input type="text" name="role" value={basics.role} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.role} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" name="location" value={basics.location} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.loc} />
                  <input type="text" name="phone" value={basics.phone} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Phone" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="email" name="email" value={basics.email} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Email" />
                  <input type="text" name="linkedin" value={basics.linkedin} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="LinkedIn URL" />
                </div>
                <textarea name="summary" value={basics.summary} onChange={handleBasicsChange} rows="3" className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.summary}></textarea>
                <textarea name="skills" value={basics.skills} onChange={handleBasicsChange} rows="2" className="w-full bg-[#060D1F] border border-white/5 p-3 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.skills}></textarea>
              </div>
            </div>

            {/* FORM: PENGALAMAN */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold text-cyan-400">{t.exp}</h2>
                <button onClick={() => addField(setExperiences, experiences, { role: "", company: "", period: "", description: "" })} className="text-xs bg-cyan-600 text-white px-3 py-1 rounded">{t.add}</button>
              </div>
              {experiences.map((exp, index) => (
                <div key={exp.id} className="bg-[#060D1F] p-4 rounded-lg mb-4 border border-white/5 relative">
                  <button onClick={() => removeField(setExperiences, experiences, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs">{t.del}</button>
                  <input type="text" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'company', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder={t.placeholders.expComp} />
                  <input type="text" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder={t.placeholders.expRole} />
                  <input type="text" value={exp.period} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder={t.placeholders.expDate} />
                  <textarea value={exp.description} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'description', e.target.value)} rows="2" className="w-full mt-2 bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="- Job description..."></textarea>
                </div>
              ))}
            </div>

            {/* FORM: PENDIDIKAN */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold text-cyan-400">{t.edu}</h2>
                <button onClick={() => addField(setEducations, educations, { institution: "", major: "", period: "", gpa: "" })} className="text-xs bg-cyan-600 text-white px-3 py-1 rounded">{t.add}</button>
              </div>
              {educations.map((edu, index) => (
                <div key={edu.id} className="bg-[#060D1F] p-4 rounded-lg mb-4 border border-white/5 relative">
                  <button onClick={() => removeField(setEducations, educations, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs">{t.del}</button>
                  <input type="text" value={edu.institution} onChange={(e) => handleArrayChange(setEducations, educations, index, 'institution', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder={t.placeholders.eduInst} />
                  <input type="text" value={edu.major} onChange={(e) => handleArrayChange(setEducations, educations, index, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder={t.placeholders.eduMaj} />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input type="text" value={edu.period} onChange={(e) => handleArrayChange(setEducations, educations, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder={t.placeholders.eduDate} />
                    <input type="text" value={edu.gpa} onChange={(e) => handleArrayChange(setEducations, educations, index, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="GPA / IPK" />
                  </div>
                </div>
              ))}
            </div>

            {/* FORM: PROYEK */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold text-cyan-400">{t.proj}</h2>
                <button onClick={() => addField(setProjects, projects, { name: "", period: "", description: "" })} className="text-xs bg-cyan-600 text-white px-3 py-1 rounded">{t.add}</button>
              </div>
              {projects.map((proj, index) => (
                <div key={proj.id} className="bg-[#060D1F] p-4 rounded-lg mb-4 border border-white/5 relative">
                  <button onClick={() => removeField(setProjects, projects, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs">{t.del}</button>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input type="text" value={proj.name} onChange={(e) => handleArrayChange(setProjects, projects, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder={t.placeholders.projName} />
                    <input type="text" value={proj.period} onChange={(e) => handleArrayChange(setProjects, projects, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="Date" />
                  </div>
                  <textarea value={proj.description} onChange={(e) => handleArrayChange(setProjects, projects, index, 'description', e.target.value)} rows="2" className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="- Project details..."></textarea>
                </div>
              ))}
            </div>

            {/* FORM: SERTIFIKASI */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold text-cyan-400">{t.cert}</h2>
                <button onClick={() => addField(setCerts, certs, { name: "", issuer: "", period: "", description: "" })} className="text-xs bg-cyan-600 text-white px-3 py-1 rounded">{t.add}</button>
              </div>
              {certs.map((cert, index) => (
                <div key={cert.id} className="bg-[#060D1F] p-4 rounded-lg mb-4 border border-white/5 relative">
                  <button onClick={() => removeField(setCerts, certs, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs">{t.del}</button>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input type="text" value={cert.name} onChange={(e) => handleArrayChange(setCerts, certs, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder={t.placeholders.certName} />
                    <input type="text" value={cert.period} onChange={(e) => handleArrayChange(setCerts, certs, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="Date" />
                  </div>
                  <input type="text" value={cert.issuer} onChange={(e) => handleArrayChange(setCerts, certs, index, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm mb-2 focus:outline-none" placeholder="Issuer (e.g. Google, Coursera)" />
                  <textarea value={cert.description} onChange={(e) => handleArrayChange(setCerts, certs, index, 'description', e.target.value)} rows="2" className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:outline-none" placeholder="- Certification details..."></textarea>
                </div>
              ))}
            </div>

            <button onClick={() => window.print()} className="w-full mt-4 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all">{t.print}</button>
          </div>

          {/* ========================================================= */}
          {/* KOLOM KANAN: PREVIEW KERTAS CV MULTI-TEMPLATE               */}
          {/* ========================================================= */}
          <div className="w-full xl:w-7/12 bg-[#0A1329]/50 p-4 sm:p-6 rounded-[2rem] overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="w-fit mx-auto">
              
              <div id="cv-preview" className={`w-[21cm] min-w-[21cm] min-h-[29.7cm] bg-white text-black py-10 px-12 sm:px-14 shadow-2xl shrink-0 border border-gray-200 
                ${template === 'harvard' ? 'font-serif' : 'font-sans'}`}>
                
                {/* HEADER RENDERER */}
                {template === 'huda' && (
                  <div className="text-center pb-2">
                    <h1 className="text-3xl font-bold uppercase mb-2">{basics.name || "YOUR NAME"}</h1>
                    {(basics.location || basics.phone || basics.email) && (
                      <p className="text-[14px] text-gray-900 mb-4">
                        {basics.location} {basics.phone && `| ${basics.phone}`} {basics.email && `| ${basics.email}`} {basics.linkedin && `| ${basics.linkedin}`}
                      </p>
                    )}
                    {basics.summary && <p className="text-[13px] leading-relaxed text-justify text-gray-900 mb-5">{basics.summary}</p>}
                  </div>
                )}

                {template === 'modern' && (
                  <div className="border-b-4 border-gray-900 pb-5 mb-5 text-left">
                    <h1 className="text-4xl font-black text-gray-900 mb-1">{basics.name || "YOUR NAME"}</h1>
                    {basics.role && <h2 className="text-lg font-bold text-gray-600 mb-3">{basics.role}</h2>}
                    <p className="text-[13px] text-gray-700 flex flex-wrap gap-x-4 gap-y-1 font-medium">
                      {basics.location && <span>📍 {basics.location}</span>} {basics.phone && <span>📞 {basics.phone}</span>} {basics.email && <span>✉️ {basics.email}</span>}
                    </p>
                    {basics.summary && <p className="text-[13px] leading-relaxed text-gray-800 mt-4 border-l-2 border-gray-300 pl-3">{basics.summary}</p>}
                  </div>
                )}

                {(template === 'harvard' || template === 'executive') && (
                  <div className={`text-center mb-6 ${template==='executive' ? 'border-b-2 border-gray-300 pb-4' : ''}`}>
                    <h1 className={`${template==='harvard' ? 'text-3xl font-normal' : 'text-4xl font-black tracking-tight'} uppercase mb-2`}>{basics.name || "YOUR NAME"}</h1>
                    <p className="text-[13px] text-gray-900 flex justify-center flex-wrap gap-1">
                      {basics.role && <span className="font-bold">{basics.role} | </span>}
                      {basics.location} {basics.phone && `• ${basics.phone}`} {basics.email && `• ${basics.email}`}
                    </p>
                    {basics.summary && (
                      template === 'harvard' 
                      ? <p className="text-[13px] leading-relaxed text-justify text-gray-900 mt-3">{basics.summary}</p>
                      : <div className="mt-4"><h2 className="text-[14px] font-bold uppercase tracking-widest text-center mb-2">Profile</h2><p className="text-[13px] leading-relaxed text-justify text-gray-800">{basics.summary}</p></div>
                    )}
                  </div>
                )}

                {/* SECTION RENDERER */}
                {(() => {
                  const SectionTitle = ({ title }) => {
                    if (template === 'huda' || template === 'executive') return <h2 className="text-[14px] font-bold uppercase border-b border-gray-400 mb-3 pb-1 text-gray-900 tracking-wide">{title}</h2>;
                    if (template === 'modern') return <h2 className="text-[16px] font-black uppercase text-gray-900 border-b-2 border-gray-800 mb-3 pb-1">{title}</h2>;
                    if (template === 'harvard') return <h2 className="text-[14px] font-bold uppercase text-center border-b border-black mb-3 pb-1 tracking-widest">{title}</h2>;
                  };

                  const RenderEducation = () => educations.some(e => e.institution.trim() !== "") && (
                    <div className="mb-4">
                      <SectionTitle title={t.edu} />
                      {educations.filter(e => e.institution.trim() !== "").map((edu, idx) => (
                        <div key={idx} className="mb-2 break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <h3 className={`text-[14px] text-gray-900 ${template === 'huda' || template === 'modern' ? 'font-bold uppercase' : 'font-bold'}`}>{edu.institution}</h3>
                            <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">{edu.period}</span>
                          </div>
                          <div className="text-[13px] text-gray-800">{edu.major}</div>
                          {edu.gpa && <div className="text-[13px] text-gray-600">{edu.gpa}</div>}
                        </div>
                      ))}
                    </div>
                  );

                  const RenderSkills = () => basics.skills.trim() !== "" && (
                    <div className="mb-4 break-inside-avoid">
                      <SectionTitle title={t.skills} />
                      <p className="text-[13px] text-gray-800 leading-relaxed whitespace-pre-line">{basics.skills}</p>
                    </div>
                  );

                  const RenderExperience = () => experiences.some(e => e.company.trim() !== "") && (
                    <div className="mb-4">
                      <SectionTitle title={t.exp} />
                      {experiences.filter(e => e.company.trim() !== "").map((exp, idx) => (
                        <div key={idx} className="mb-3 break-inside-avoid">
                          <div className="flex justify-between items-start mb-0.5">
                            <h3 className="text-[14px] font-bold text-gray-900">{exp.company}</h3>
                            <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">{exp.period}</span>
                          </div>
                          <div className={`text-[13px] text-gray-800 mb-1 ${template === 'modern' ? 'font-bold text-cyan-700' : 'font-medium italic'}`}>{exp.role}</div>
                          <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-line text-justify pl-3 border-l border-gray-200">{exp.description}</div>
                        </div>
                      ))}
                    </div>
                  );

                  const RenderProjects = () => projects.some(p => p.name.trim() !== "") && (
                    <div className="mb-4">
                      <SectionTitle title={t.proj} />
                      {projects.filter(p => p.name.trim() !== "").map((proj, idx) => (
                        <div key={idx} className="mb-3 break-inside-avoid">
                          <div className="flex justify-between items-start mb-0.5">
                            <h3 className="text-[14px] font-bold text-gray-900">{proj.name}</h3>
                            <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">{proj.period}</span>
                          </div>
                          <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-line text-justify pl-3 border-l border-gray-200">{proj.description}</div>
                        </div>
                      ))}
                    </div>
                  );

                  const RenderCerts = () => certs.some(c => c.name.trim() !== "") && (
                    <div className="mb-4">
                      <SectionTitle title={t.cert} />
                      {certs.filter(c => c.name.trim() !== "").map((cert, idx) => (
                        <div key={idx} className="mb-3 break-inside-avoid">
                          <div className="flex justify-between items-start mb-0.5">
                            <h3 className="text-[14px] font-bold text-gray-900">{cert.name}</h3>
                            <span className="text-[13px] font-medium text-gray-800 whitespace-nowrap">{cert.period}</span>
                          </div>
                          <div className="text-[13px] text-gray-700 italic mb-1.5">{cert.issuer}</div>
                          <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-line text-justify pl-3 border-l border-gray-200">{cert.description}</div>
                        </div>
                      ))}
                    </div>
                  );

                  if (template === 'huda') return <>{RenderEducation()}{RenderSkills()}{RenderExperience()}{RenderProjects()}{RenderCerts()}</>;
                  if (template === 'modern') return <>{RenderExperience()}{RenderEducation()}{RenderProjects()}{RenderSkills()}{RenderCerts()}</>;
                  return <>{RenderEducation()}{RenderExperience()}{RenderProjects()}{RenderCerts()}{RenderSkills()}</>;
                  
                })()}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
