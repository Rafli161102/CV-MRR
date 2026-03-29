"use client";

import { useState } from 'react';

export default function CVMaker() {
  // 1. STATE TEMA & BAHASA
  const [template, setTemplate] = useState('normal'); 
  const [lang, setLang] = useState('en'); 
  const [isTranslating, setIsTranslating] = useState(false);

  // 2. KAMUS BAHASA (UI & ATS HEADERS)
  const t = {
    id: {
      personal: "Informasi Dasar", exp: "PENGALAMAN KERJA", edu: "PENDIDIKAN", proj: "PROYEK", cert: "SERTIFIKASI", summary: "PROFIL SINGKAT", skills: "KEAHLIAN DAN KOMPETENSI",
      add: "+ Tambah", del: "Hapus", print: "Cetak / Simpan PDF",
      placeholders: { name: "Nama Lengkap", role: "Posisi Dilamar", loc: "Kota, Negara", summary: "Tulis ringkasan profil Anda di sini...", skills: "Keahlian utama (Contoh: HTML, CSS, Figma)", expRole: "Jabatan", expComp: "Nama Perusahaan", expDate: "Bulan Tahun - Bulan Tahun", eduInst: "Nama Kampus/Sekolah", eduMaj: "Jurusan / Gelar", projName: "Nama Proyek", certName: "Nama Sertifikasi" }
    },
    en: {
      personal: "Basic Information", exp: "EXPERIENCE", edu: "EDUCATION", proj: "PROJECTS", cert: "CERTIFICATION", summary: "PROFESSIONAL SUMMARY", skills: "SKILL AND COMPETENCIES",
      add: "+ Add New", del: "Remove", print: "Print / Save as PDF",
      placeholders: { name: "Full Name", role: "Targeted Role", loc: "City, Country", summary: "Write your professional summary here...", skills: "Core skills (e.g. HTML, CSS, Figma)", expRole: "Job Title", expComp: "Company Name", expDate: "Month Year - Month Year", eduInst: "University/School", eduMaj: "Major / Degree", projName: "Project Name", certName: "Certification Name" }
    },
    jp: {
      personal: "基本情報", exp: "職務経歴", edu: "学歴", proj: "プロジェクト", cert: "資格・免許", summary: "自己PR / 職務要約", skills: "スキル・知識",
      add: "+ 追加", del: "削除", print: "PDFとして保存",
      placeholders: { name: "氏名", role: "希望職種", loc: "住所", summary: "自己PRを入力してください...", skills: "スキル (HTML, CSS...)", expRole: "役職", expComp: "会社名", expDate: "年月 - 年月", eduInst: "学校名", eduMaj: "学部・学科", projName: "プロジェクト名", certName: "資格名" }
    }
  }[lang];

  // 3. STATE FORMULIR KOSONG
  const [basics, setBasics] = useState({ name: "", role: "", location: "", phone: "", email: "", linkedin: "", summary: "", skills: "" });
  const [experiences, setExperiences] = useState([{ id: 1, role: "", company: "", period: "", description: "" }]);
  const [educations, setEducations] = useState([{ id: 1, institution: "", major: "", period: "", gpa: "" }]);
  const [projects, setProjects] = useState([{ id: 1, name: "", period: "", description: "" }]);
  const [certs, setCerts] = useState([{ id: 1, name: "", issuer: "", period: "", description: "" }]);

  const handleBasicsChange = (e) => setBasics({ ...basics, [e.target.name]: e.target.value });
  const handleArrayChange = (setter, state, index, field, value) => {
    const newState = [...state];
    newState[index][field] = value;
    setter(newState);
  };
  const addField = (setter, state, emptyObj) => setter([...state, { id: Date.now(), ...emptyObj }]);
  const removeField = (setter, state, index) => setter(state.filter((_, i) => i !== index));

  const handleMagicTranslate = async (targetLangCode) => {
    setIsTranslating(true);
    setLang(targetLangCode); 
    
    const apiLang = targetLangCode === 'jp' ? 'ja' : targetLangCode;
    
    const translateText = async (text) => {
      if (!text || text.trim() === "") return text;
      try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${apiLang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await res.json();
        return data[0].map(item => item[0]).join(''); 
      } catch (err) {
        console.error("Translate error:", err);
        return text;
      }
    };

    const tRole = await translateText(basics.role);
    const tSummary = await translateText(basics.summary);
    const tSkills = await translateText(basics.skills);
    setBasics(prev => ({ ...prev, role: tRole, summary: tSummary, skills: tSkills }));

    const translatedExp = await Promise.all(experiences.map(async (exp) => ({
      ...exp, role: await translateText(exp.role), description: await translateText(exp.description)
    })));
    setExperiences(translatedExp);

    const translatedProj = await Promise.all(projects.map(async (proj) => ({
      ...proj, description: await translateText(proj.description)
    })));
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
          #cv-preview { position: absolute; left: 0; top: 0; width: 100%; max-width: 100%; padding: 0 !important; margin: 0 !important; box-shadow: none !important; border: none !important; }
          @page { size: A4; margin: 1.27cm; }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8 no-print">
          <h1 className="text-4xl font-black text-white mb-2">ATS <span className="text-cyan-500">CV Maker</span></h1>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* KOLOM KIRI: FORMULIR ISIAN */}
          <div className="w-full xl:w-5/12 bg-[#0A1329] border border-white/10 p-6 rounded-[2rem] no-print xl:sticky xl:top-32 h-fit max-h-none xl:max-h-[80vh] overflow-visible xl:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full">
            
            <div className="mb-6 p-5 bg-[#060D1F] border border-cyan-500/30 rounded-xl">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Magic Translate ✨</h2>
                <div className="flex bg-[#0A1329] rounded border border-white/10 overflow-hidden">
                  <button onClick={() => handleMagicTranslate('id')} disabled={isTranslating} className={`px-3 py-1 text-xs font-bold transition-colors ${lang === 'id' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-white'}`}>ID</button>
                  <button onClick={() => handleMagicTranslate('en')} disabled={isTranslating} className={`px-3 py-1 text-xs font-bold transition-colors ${lang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-white'}`}>EN</button>
                  <button onClick={() => handleMagicTranslate('jp')} disabled={isTranslating} className={`px-3 py-1 text-xs font-bold transition-colors ${lang === 'jp' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-white'}`}>JP</button>
                </div>
              </div>
              <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Template ATS</h2>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setTemplate('normal')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'normal' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>1. Normal (Standar ATS)</button>
                <button onClick={() => setTemplate('modern')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'modern' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>2. Modern Pro</button>
                <button onClick={() => setTemplate('harvard')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'harvard' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>3. Harvard (Serif)</button>
                <button onClick={() => setTemplate('executive')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'executive' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>4. Tech Executive</button>
                <button onClick={() => setTemplate('japanese')} className={`col-span-2 py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'japanese' ? 'bg-red-600 border-red-400 text-white' : 'border-white/10 text-slate-400 hover:border-red-500/50'}`}>5. Japanese (職務経歴書)</button>
              </div>
            </div>

            {isTranslating && <div className="mb-4 text-center text-xs font-bold text-cyan-400 animate-pulse">Sedang menerjemahkan isi CV secara otomatis...</div>}

            {/* FORM: DATA PRIBADI */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-cyan-400 mb-3 border-b border-white/10 pb-1">{t.personal}</h2>
              <div className="space-y-2">
                <input type="text" name="name" value={basics.name} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.name} />
                <input type="text" name="role" value={basics.role} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.role} />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" name="location" value={basics.location} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.loc} />
                  <input type="text" name="phone" value={basics.phone} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Phone" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="email" name="email" value={basics.email} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Email" />
                  <input type="text" name="linkedin" value={basics.linkedin} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="LinkedIn URL" />
                </div>
                <textarea name="summary" value={basics.summary} onChange={handleBasicsChange} rows="3" className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.summary}></textarea>
                <textarea name="skills" value={basics.skills} onChange={handleBasicsChange} rows="2" className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.skills}></textarea>
              </div>
            </div>

            {/* FORM: PENGALAMAN */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                <h2 className="text-lg font-bold text-cyan-400">{t.exp}</h2>
                <button onClick={() => addField(setExperiences, experiences, { role: "", company: "", period: "", description: "" })} className="text-[10px] bg-cyan-600 text-white px-2 py-1 rounded">{t.add}</button>
              </div>
              {experiences.map((exp, index) => (
                <div key={exp.id} className="bg-[#060D1F] p-3 rounded mb-3 border border-white/5 relative">
                  <button onClick={() => removeField(setExperiences, experiences, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-[10px]">{t.del}</button>
                  <input type="text" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'company', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.expComp} />
                  <input type="text" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.expRole} />
                  <input type="text" value={exp.period} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.expDate} />
                  <textarea value={exp.description} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'description', e.target.value)} rows="2" className="w-full mt-1 bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder="- Job description..."></textarea>
                </div>
              ))}
            </div>

            {/* FORM: PENDIDIKAN */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                <h2 className="text-lg font-bold text-cyan-400">{t.edu}</h2>
                <button onClick={() => addField(setEducations, educations, { institution: "", major: "", period: "", gpa: "" })} className="text-[10px] bg-cyan-600 text-white px-2 py-1 rounded">{t.add}</button>
              </div>
              {educations.map((edu, index) => (
                <div key={edu.id} className="bg-[#060D1F] p-3 rounded mb-3 border border-white/5 relative">
                  <button onClick={() => removeField(setEducations, educations, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-[10px]">{t.del}</button>
                  <input type="text" value={edu.institution} onChange={(e) => handleArrayChange(setEducations, educations, index, 'institution', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.eduInst} />
                  <input type="text" value={edu.major} onChange={(e) => handleArrayChange(setEducations, educations, index, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.eduMaj} />
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input type="text" value={edu.period} onChange={(e) => handleArrayChange(setEducations, educations, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder={t.placeholders.eduDate} />
                    <input type="text" value={edu.gpa} onChange={(e) => handleArrayChange(setEducations, educations, index, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder="GPA / IPK" />
                  </div>
                </div>
              ))}
            </div>

            {/* FORM: PROYEK */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                <h2 className="text-lg font-bold text-cyan-400">{t.proj}</h2>
                <button onClick={() => addField(setProjects, projects, { name: "", period: "", description: "" })} className="text-[10px] bg-cyan-600 text-white px-2 py-1 rounded">{t.add}</button>
              </div>
              {projects.map((proj, index) => (
                <div key={proj.id} className="bg-[#060D1F] p-3 rounded mb-3 border border-white/5 relative">
                  <button onClick={() => removeField(setProjects, projects, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-[10px]">{t.del}</button>
                  <div className="grid grid-cols-2 gap-2 mb-1">
                    <input type="text" value={proj.name} onChange={(e) => handleArrayChange(setProjects, projects, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder={t.placeholders.projName} />
                    <input type="text" value={proj.period} onChange={(e) => handleArrayChange(setProjects, projects, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder="Date" />
                  </div>
                  <textarea value={proj.description} onChange={(e) => handleArrayChange(setProjects, projects, index, 'description', e.target.value)} rows="2" className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mt-1" placeholder="- Project details..."></textarea>
                </div>
              ))}
            </div>

            {/* FORM: SERTIFIKASI */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                <h2 className="text-lg font-bold text-cyan-400">{t.cert}</h2>
                <button onClick={() => addField(setCerts, certs, { name: "", issuer: "", period: "", description: "" })} className="text-[10px] bg-cyan-600 text-white px-2 py-1 rounded">{t.add}</button>
              </div>
              {certs.map((cert, index) => (
                <div key={cert.id} className="bg-[#060D1F] p-3 rounded mb-3 border border-white/5 relative">
                  <button onClick={() => removeField(setCerts, certs, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-[10px]">{t.del}</button>
                  <div className="grid grid-cols-2 gap-2 mb-1">
                    <input type="text" value={cert.name} onChange={(e) => handleArrayChange(setCerts, certs, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder={t.placeholders.certName} />
                    <input type="text" value={cert.period} onChange={(e) => handleArrayChange(setCerts, certs, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder="Date" />
                  </div>
                  <input type="text" value={cert.issuer} onChange={(e) => handleArrayChange(setCerts, certs, index, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder="Issuer (e.g. Google)" />
                  <textarea value={cert.description} onChange={(e) => handleArrayChange(setCerts, certs, index, 'description', e.target.value)} rows="2" className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mt-1" placeholder="- Details..."></textarea>
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
                ${template === 'harvard' || template === 'japanese' ? 'font-serif' : 'font-sans'}`}>
                
                {/* --------------------------------------------------------- */}
                {/* 1. HEADER RENDERER */}
                {/* --------------------------------------------------------- */}
                
                {/* TEMA 1: NORMAL (Standar ATS) - 100% Bersih & Rapi */}
                {template === 'normal' && (
                  <div className="text-center pb-2">
                    <h1 className="text-[24px] font-bold mb-1 tracking-wide uppercase">{basics.name || "YOUR NAME"}</h1>
                    
                    {/* Render kontak dinamis dengan pemisah | persis seperti PDF */}
                    <p className="text-[13px] text-gray-900 mb-4 font-medium flex flex-wrap justify-center gap-x-1">
                      {[basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' | ')}
                    </p>
                    
                    {/* Summary tanpa judul */}
                    {basics.summary && <p className="text-[13px] leading-relaxed text-justify text-gray-900 mb-4">{basics.summary}</p>}
                  </div>
                )}

                {/* TEMA 2: MODERN PRO - Tanpa Icon, Rata Kiri */}
                {template === 'modern' && (
                  <div className="border-b-[3px] border-gray-900 pb-4 mb-4 text-left">
                    <h1 className="text-3xl font-black text-gray-900 mb-1 uppercase tracking-tight">{basics.name || "YOUR NAME"}</h1>
                    {basics.role && <h2 className="text-[15px] font-bold text-gray-600 mb-2 uppercase tracking-wide">{basics.role}</h2>}
                    <p className="text-[13px] text-gray-700 flex flex-wrap gap-x-3 gap-y-1 font-medium">
                      {[basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' • ')}
                    </p>
                    {basics.summary && <p className="text-[13px] leading-relaxed text-gray-800 mt-3 border-l-2 border-gray-400 pl-3">{basics.summary}</p>}
                  </div>
                )}

                {/* TEMA 3 & 4: HARVARD & EXECUTIVE */}
                {(template === 'harvard' || template === 'executive') && (
                  <div className={`text-center mb-6 ${template==='executive' ? 'border-b border-gray-400 pb-4' : ''}`}>
                    <h1 className={`${template==='harvard' ? 'text-3xl font-normal' : 'text-3xl font-black tracking-tight'} uppercase mb-1`}>{basics.name || "YOUR NAME"}</h1>
                    <p className="text-[13px] text-gray-900 flex justify-center flex-wrap gap-x-1 font-medium">
                      {[basics.role ? `${basics.role} |` : null, basics.location, basics.phone, basics.email].filter(Boolean).join(' • ')}
                    </p>
                    {basics.summary && (
                      template === 'harvard' 
                      ? <p className="text-[13px] leading-relaxed text-justify text-gray-900 mt-3">{basics.summary}</p>
                      : <div className="mt-4"><h2 className="text-[13px] font-bold uppercase tracking-widest text-center mb-2">Profile</h2><p className="text-[13px] leading-relaxed text-justify text-gray-800">{basics.summary}</p></div>
                    )}
                  </div>
                )}

                {/* TEMA 5: JAPANESE (職務経歴書) */}
                {template === 'japanese' && (
                  <div className="mb-6">
                    <h1 className="text-center text-2xl tracking-[0.5em] font-bold border-b-2 border-gray-800 pb-2 mb-4">職務経歴書</h1>
                    <div className="flex justify-between items-end mb-4 text-[13px] text-gray-900">
                      <div>
                        {basics.role && <p className="font-bold border-b border-gray-400 inline-block px-2 mb-1">希望職種: {basics.role}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-[15px] font-bold tracking-wide mb-1">氏名: {basics.name || "氏名"}</p>
                        <p>住所: {basics.location}</p>
                        <p>電話: {basics.phone} | Email: {basics.email}</p>
                      </div>
                    </div>
                    {basics.summary && (
                      <div className="mb-4">
                        <h2 className="text-[14px] font-bold border-l-4 border-gray-800 pl-2 mb-2 bg-gray-100 py-1">{t.summary}</h2>
                        <p className="text-[13px] leading-relaxed text-gray-900 pl-2">{basics.summary}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* --------------------------------------------------------- */}
                {/* 2. SECTION RENDERER BERDASARKAN TEMA */}
                {/* --------------------------------------------------------- */}
                
                {(() => {
                  const SectionTitle = ({ title }) => {
                    // Normal style persis seperti PDF yang diberikan (garis bawah tebal)
                    if (template === 'normal') return <h2 className="text-[13px] font-bold uppercase border-b-[1.5px] border-black mb-2 pb-1 text-gray-900 tracking-wide mt-3">{title}</h2>;
                    if (template === 'executive') return <h2 className="text-[12px] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-widest mt-3">{title}</h2>;
                    if (template === 'modern') return <h2 className="text-[15px] font-black uppercase text-gray-900 border-b-2 border-gray-800 mb-3 pb-1 mt-4">{title}</h2>;
                    if (template === 'harvard') return <h2 className="text-[13px] font-bold uppercase text-center border-b border-black mb-3 pb-1 tracking-widest mt-4">{title}</h2>;
                    if (template === 'japanese') return <h2 className="text-[14px] font-bold border-l-4 border-gray-800 pl-2 mb-2 mt-4 bg-gray-100 py-1">{title}</h2>;
                  };

                  const RenderEducation = () => educations.some(e => e.institution.trim() !== "") && (
                    <div className="mb-3">
                      <SectionTitle title={t.edu} />
                      {educations.filter(e => e.institution.trim() !== "").map((edu, idx) => (
                        <div key={idx} className="mb-2 break-inside-avoid">
                          <div className="flex justify-between items-start">
                            {/* Instansi Uppercase di mode Normal */}
                            <h3 className={`text-[13px] text-gray-900 ${template === 'normal' ? 'uppercase font-bold' : 'font-bold'}`}>{edu.institution}</h3>
                            <span className="text-[12px] font-medium text-gray-800 whitespace-nowrap">{edu.period}</span>
                          </div>
                          <div className="text-[13px] text-gray-800">{edu.major}</div>
                          {edu.gpa && <div className="text-[13px] text-gray-600">{template === 'normal' && lang === 'en' ? `Graduated with a GPA of ${edu.gpa}.` : edu.gpa}</div>}
                        </div>
                      ))}
                    </div>
                  );

                  const RenderSkills = () => basics.skills.trim() !== "" && (
                    <div className="mb-3 break-inside-avoid">
                      <SectionTitle title={t.skills} />
                      {template === 'normal' ? (
                        <ul className="list-disc list-inside text-[13px] text-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-x-2">
                          {basics.skills.split(',').map((skill, i) => <li key={i}>{skill.trim()}</li>)}
                        </ul>
                      ) : (
                        <p className="text-[13px] text-gray-800 leading-relaxed whitespace-pre-line pl-2">{basics.skills}</p>
                      )}
                    </div>
                  );

                  const RenderExperience = () => experiences.some(e => e.company.trim() !== "") && (
                    <div className="mb-3">
                      <SectionTitle title={t.exp} />
                      {experiences.filter(e => e.company.trim() !== "").map((exp, idx) => (
                        <div key={idx} className="mb-3 break-inside-avoid">
                          <div className="flex justify-between items-start mb-0.5">
                            <h3 className={`text-[13px] font-bold text-gray-900`}>{exp.company}</h3>
                            <span className="text-[12px] font-medium text-gray-800 whitespace-nowrap">{exp.period}</span>
                          </div>
                          <div className={`text-[13px] text-gray-800 mb-1 ${template === 'modern' ? 'font-bold text-gray-800' : 'font-medium'}`}>{exp.role}</div>
                          <div className={`text-[13px] leading-relaxed text-gray-800 whitespace-pre-line text-justify ${template === 'normal' ? 'ml-0' : 'pl-3'}`}>{exp.description}</div>
                        </div>
                      ))}
                    </div>
                  );

                  const RenderProjects = () => projects.some(p => p.name.trim() !== "") && (
                    <div className="mb-3">
                      <SectionTitle title={t.proj} />
                      {projects.filter(p => p.name.trim() !== "").map((proj, idx) => (
                        <div key={idx} className="mb-3 break-inside-avoid">
                          <div className="flex justify-between items-start mb-0.5">
                            <h3 className="text-[13px] font-bold text-gray-900">{proj.name}</h3>
                            <span className="text-[12px] font-medium text-gray-800 whitespace-nowrap">{proj.period}</span>
                          </div>
                          <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-line text-justify">{proj.description}</div>
                        </div>
                      ))}
                    </div>
                  );

                  const RenderCerts = () => certs.some(c => c.name.trim() !== "") && (
                    <div className="mb-3">
                      <SectionTitle title={t.cert} />
                      {certs.filter(c => c.name.trim() !== "").map((cert, idx) => (
                        <div key={idx} className="mb-3 break-inside-avoid">
                          <div className="flex justify-between items-start mb-0.5">
                            <h3 className="text-[13px] font-bold text-gray-900">{cert.name}</h3>
                            <span className="text-[12px] font-medium text-gray-800 whitespace-nowrap">{cert.period}</span>
                          </div>
                          <div className="text-[13px] text-gray-700 italic mb-1">{cert.issuer}</div>
                          <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-line text-justify">{cert.description}</div>
                        </div>
                      ))}
                    </div>
                  );

                  // URUTAN SESUAI TEMA
                  // NORMAL ATS (Persis PDF Huda): Edu -> Skills -> Exp -> Proj -> Certs
                  if (template === 'normal') return <>{RenderEducation()}{RenderSkills()}{RenderExperience()}{RenderProjects()}{RenderCerts()}</>;
                  
                  // MODERN & JAPANESE: Exp -> Edu -> Skills -> Proj -> Certs
                  if (template === 'modern' || template === 'japanese') return <>{RenderExperience()}{RenderEducation()}{RenderSkills()}{RenderProjects()}{RenderCerts()}</>;
                  
                  // UMUM: Edu -> Exp -> Proj -> Certs -> Skills
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
