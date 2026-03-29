"use client";

import { useState } from 'react';

export default function CVMaker() {
  const [template, setTemplate] = useState('normal'); 
  const [lang, setLang] = useState('id'); 
  const [isTranslating, setIsTranslating] = useState(false);

  const t = {
    id: {
      personal: "Informasi Dasar", exp: "PENGALAMAN KERJA", edu: "PENDIDIKAN", proj: "PROYEK", cert: "SERTIFIKASI", summary: "PROFIL SINGKAT", skills: "KEAHLIAN DAN KOMPETENSI",
      add: "+ Tambah", del: "Hapus", print: "Cetak / Simpan PDF",
      placeholders: { 
        name: "Nama Lengkap (Contoh: Budi Santoso)", role: "Posisi Dilamar (Cth: UI/UX Designer)", loc: "Kota, Provinsi (Cth: Jakarta, Indonesia)", phone: "Nomor Telepon", email: "Alamat Email", linkedin: "URL Portofolio / LinkedIn", summary: "Tuliskan ringkasan profil Anda secara singkat dan profesional...", skills: "Keahlian 1, Keahlian 2, Keahlian 3", expRole: "Nama Jabatan", expComp: "Nama Perusahaan", expDate: "Cth: Jan 2021 - Des 2023", eduInst: "Nama Kampus / Sekolah", eduMaj: "Jurusan / Gelar", eduDate: "Bulan Tahun Lulus", projName: "Nama Proyek", projDate: "Bulan Tahun", certName: "Nama Sertifikasi", certDate: "Bulan Tahun"
      }
    },
    en: {
      personal: "Basic Information", exp: "EXPERIENCE", edu: "EDUCATION", proj: "PROJECTS", cert: "CERTIFICATION", summary: "PROFESSIONAL SUMMARY", skills: "SKILL AND COMPETENCIES",
      add: "+ Add New", del: "Remove", print: "Print / Save as PDF",
      placeholders: { 
        name: "Full Name", role: "Targeted Role", loc: "City, Country", phone: "Phone Number", email: "Email Address", linkedin: "LinkedIn / Portfolio", summary: "Write your professional summary here...", skills: "Core Skills (e.g. HTML, CSS, Figma)", expRole: "Job Title", expComp: "Company Name", expDate: "Month Year - Month Year", eduInst: "University / School Name", eduMaj: "Major / Degree", eduDate: "Graduation Date", projName: "Project Name", projDate: "Month Year", certName: "Certification Name", certDate: "Month Year"
      }
    },
    jp: {
      personal: "基本情報", exp: "職務経歴", edu: "学歴", proj: "プロジェクト", cert: "資格・免許", summary: "自己PR / 職務要約", skills: "スキル・知識",
      add: "+ 追加", del: "削除", print: "PDFとして保存",
      placeholders: { name: "氏名", role: "希望職種", loc: "住所", phone: "電話番号", email: "メールアドレス", linkedin: "リンク", summary: "自己PRを入力してください...", skills: "スキル (HTML, CSS...)", expRole: "役職", expComp: "会社名", expDate: "年月 - 年月", eduInst: "学校名", eduMaj: "学部・学科", eduDate: "卒業年月", projName: "プロジェクト名", projDate: "年月", certName: "資格名", certDate: "取得年月" }
    }
  }[lang];

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
          @page { size: A4; margin: 1.5cm; }
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
                <button onClick={() => setTemplate('normal')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'normal' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>1. Normal (Huda ATS)</button>
                <button onClick={() => setTemplate('modern')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'modern' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>2. Modern Pro</button>
                <button onClick={() => setTemplate('harvard')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'harvard' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>3. Harvard (Serif)</button>
                <button onClick={() => setTemplate('executive')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'executive' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>4. Tech Executive</button>
                <button onClick={() => setTemplate('jp_rirekisho')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'jp_rirekisho' ? 'bg-red-600 border-red-400 text-white' : 'border-white/10 text-slate-400 hover:border-red-500/50'}`}>5. JP Umum (履歴書)</button>
                <button onClick={() => setTemplate('jp_shokumu')} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'jp_shokumu' ? 'bg-red-600 border-red-400 text-white' : 'border-white/10 text-slate-400 hover:border-red-500/50'}`}>6. JP Detail (職務経歴書)</button>
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
                  <input type="text" name="phone" value={basics.phone} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.phone} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="email" name="email" value={basics.email} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.email} />
                  <input type="text" name="linkedin" value={basics.linkedin} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.linkedin} />
                </div>
                <textarea name="summary" value={basics.summary} onChange={handleBasicsChange} rows="4" className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.summary}></textarea>
                <textarea name="skills" value={basics.skills} onChange={handleBasicsChange} rows="3" className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.skills}></textarea>
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
                  <textarea value={exp.description} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'description', e.target.value)} rows="3" className="w-full mt-1 bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder="- Tulis tanggung jawab utama..."></textarea>
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
                    <input type="text" value={proj.period} onChange={(e) => handleArrayChange(setProjects, projects, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder={t.placeholders.projDate} />
                  </div>
                  <textarea value={proj.description} onChange={(e) => handleArrayChange(setProjects, projects, index, 'description', e.target.value)} rows="3" className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mt-1" placeholder="- Deskripsi proyek..."></textarea>
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
                    <input type="text" value={cert.period} onChange={(e) => handleArrayChange(setCerts, certs, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder={t.placeholders.certDate} />
                  </div>
                  <input type="text" value={cert.issuer} onChange={(e) => handleArrayChange(setCerts, certs, index, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder="Penerbit (Cth: Google)" />
                  <textarea value={cert.description} onChange={(e) => handleArrayChange(setCerts, certs, index, 'description', e.target.value)} rows="2" className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mt-1" placeholder="- Topik yang dipelajari..."></textarea>
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
                ${template === 'normal' ? 'font-[Arial,Helvetica,sans-serif]' : (template === 'harvard' || template.startsWith('jp_')) ? 'font-serif' : 'font-sans'}`}>
                
                {/* --------------------------------------------------------- */}
                {/* 1. HEADER RENDERER KHUSUS SELAIN JEPANG UMUM */}
                {/* --------------------------------------------------------- */}
                
                {/* TEMA 1: NORMAL (Persis Huda ATS) */}
                {template === 'normal' && (
                  <div className="pb-2 text-left">
                    <h1 className="text-[22pt] font-bold mb-1 tracking-wide uppercase leading-none">{basics.name || "NAMA LENGKAP"}</h1>
                    <p className="text-[10pt] text-black flex flex-wrap gap-x-1.5 mt-2 mb-3 font-medium">
                      {[basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' | ')}
                    </p>
                    {basics.summary && <p className="text-[10.5pt] leading-relaxed text-justify text-black mb-4 whitespace-pre-wrap">{basics.summary}</p>}
                  </div>
                )}

                {/* TEMA 2: MODERN PRO */}
                {template === 'modern' && (
                  <div className="border-b-[2px] border-gray-900 pb-4 mb-4 text-left">
                    <h1 className="text-[26pt] font-black text-gray-900 mb-1 uppercase tracking-tight leading-none">{basics.name || "NAMA LENGKAP"}</h1>
                    {basics.role && <h2 className="text-[13pt] font-bold text-gray-600 mb-2 uppercase tracking-wide">{basics.role}</h2>}
                    <p className="text-[10pt] text-gray-700 flex flex-wrap gap-x-3 gap-y-1 font-medium">
                      {[basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' • ')}
                    </p>
                    {basics.summary && <p className="text-[10.5pt] leading-relaxed text-gray-800 mt-3 text-justify">{basics.summary}</p>}
                  </div>
                )}

                {/* TEMA 3: HARVARD */}
                {template === 'harvard' && (
                  <div className="text-center mb-6">
                    <h1 className="text-[26pt] font-normal uppercase mb-1 tracking-wide">{basics.name || "NAMA LENGKAP"}</h1>
                    {basics.role && <p className="text-[12pt] italic text-gray-800 mb-1">{basics.role}</p>}
                    <p className="text-[10.5pt] text-gray-900 flex justify-center flex-wrap gap-x-2">
                      {[basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' • ')}
                    </p>
                    {basics.summary && <p className="text-[10.5pt] leading-relaxed text-justify text-gray-900 mt-4">{basics.summary}</p>}
                  </div>
                )}

                {/* TEMA 4: EXECUTIVE */}
                {template === 'executive' && (
                  <div className="text-center border-b border-gray-400 pb-4 mb-6">
                    <h1 className="text-[24pt] font-black tracking-tight uppercase mb-1">{basics.name || "NAMA LENGKAP"}</h1>
                    <p className="text-[10.5pt] text-gray-900 flex justify-center flex-wrap gap-x-2 font-medium">
                      {[basics.role ? `${basics.role} |` : null, basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' • ')}
                    </p>
                    {basics.summary && (
                      <div className="mt-4"><h2 className="text-[11pt] font-bold uppercase tracking-widest text-center mb-2">Profile</h2><p className="text-[10.5pt] leading-relaxed text-justify text-gray-800">{basics.summary}</p></div>
                    )}
                  </div>
                )}

                {/* TEMA 6: JP DETAIL (職務経歴書) */}
                {template === 'jp_shokumu' && (
                  <div className="mb-6">
                    <h1 className="text-center text-2xl tracking-[0.5em] font-bold border-b-2 border-gray-800 pb-2 mb-4">職務経歴書</h1>
                    <div className="flex justify-between items-end mb-4 text-[10.5pt] text-gray-900">
                      <div>{basics.role && <p className="font-bold border-b border-gray-400 inline-block px-2 mb-1">希望職種: {basics.role}</p>}</div>
                      <div className="text-right">
                        <p className="text-[13pt] font-bold tracking-wide mb-1">氏名: {basics.name || "氏名"}</p>
                        <p>住所: {basics.location}</p>
                        <p>電話: {basics.phone} | Email: {basics.email}</p>
                      </div>
                    </div>
                    {basics.summary && (
                      <div className="mb-4">
                        <h2 className="text-[11pt] font-bold border-l-4 border-gray-800 pl-2 mb-2 bg-gray-100 py-1">{t.summary}</h2>
                        <p className="text-[10.5pt] leading-relaxed text-gray-900 pl-2 whitespace-pre-wrap break-words">{basics.summary}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* --------------------------------------------------------- */}
                {/* TEMA 5 KHUSUS: JAPANESE RIREKISHO (CV UMUM KOTAK-KOTAK)   */}
                {/* --------------------------------------------------------- */}
                {template === 'jp_rirekisho' && (
                  <div className="text-black">
                    <div className="flex justify-between items-end mb-2">
                      <h1 className="text-[20pt] font-bold tracking-[1em] ml-4">履歴書</h1>
                      <span className="text-[10pt]">年　　月　　日 現在</span>
                    </div>

                    {/* Tabel Info Dasar */}
                    <table className="w-full border-collapse border-[1.5px] border-black text-[10.5pt] mb-4">
                      <tbody>
                        <tr>
                          <td className="border border-black p-1.5 w-24 bg-gray-50 text-center">氏名</td>
                          <td className="border border-black p-2 text-[14pt] font-bold" colSpan="3">{basics.name || "名前をここに入力"}</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-1.5 bg-gray-50 text-center">住所</td>
                          <td className="border border-black p-2" colSpan="3">{basics.location || "住所をここに入力"}</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-1.5 bg-gray-50 text-center">電話</td>
                          <td className="border border-black p-2 w-1/3">{basics.phone}</td>
                          <td className="border border-black p-1.5 w-24 bg-gray-50 text-center">Email</td>
                          <td className="border border-black p-2">{basics.email}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Tabel Pendidikan & Pengalaman */}
                    <table className="w-full border-collapse border-[1.5px] border-black text-[10.5pt] mb-4">
                      <thead>
                        <tr>
                          <th className="border border-black p-1 w-32 bg-gray-50 font-normal">年 月</th>
                          <th className="border border-black p-1 bg-gray-50 font-normal">学歴・職歴</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-black p-1"></td><td className="border border-black p-1 text-center tracking-[1em] font-bold">学歴</td></tr>
                        {educations.map((edu, i) => edu.institution && (
                          <tr key={'e'+i}>
                            <td className="border border-black p-1.5 text-center">{edu.period}</td>
                            <td className="border border-black p-1.5 pl-4">{edu.institution} {edu.major} 入学/卒業</td>
                          </tr>
                        ))}
                        <tr><td className="border border-black p-1"></td><td className="border border-black p-1 text-center tracking-[1em] font-bold mt-2">職歴</td></tr>
                        {experiences.map((exp, i) => exp.company && (
                          <tr key={'x'+i}>
                            <td className="border border-black p-1.5 text-center">{exp.period}</td>
                            <td className="border border-black p-1.5 pl-4">{exp.company} 入社 ({exp.role})</td>
                          </tr>
                        ))}
                        <tr><td className="border border-black p-1"></td><td className="border border-black p-1.5 pr-4 text-right font-bold">以上</td></tr>
                      </tbody>
                    </table>

                    {/* Tabel Sertifikasi */}
                    <table className="w-full border-collapse border-[1.5px] border-black text-[10.5pt] mb-4">
                      <thead>
                        <tr>
                          <th className="border border-black p-1 w-32 bg-gray-50 font-normal">年 月</th>
                          <th className="border border-black p-1 bg-gray-50 font-normal">免許・資格</th>
                        </tr>
                      </thead>
                      <tbody>
                        {certs.map((cert, i) => cert.name && (
                          <tr key={'c'+i}>
                            <td className="border border-black p-1.5 text-center">{cert.period}</td>
                            <td className="border border-black p-1.5 pl-4">{cert.name} 取得</td>
                          </tr>
                        ))}
                        {certs.length === 0 && <tr><td className="border border-black p-4"></td><td className="border border-black p-4"></td></tr>}
                      </tbody>
                    </table>

                    {/* Tabel PR */}
                    <table className="w-full border-collapse border-[1.5px] border-black text-[10.5pt]">
                      <tbody>
                        <tr>
                          <td className="p-3 align-top min-h-[150px] inline-block w-full">
                            <div className="font-bold mb-2 text-gray-800 border-b border-gray-300 inline-block">自己PR・志望動機・スキル (Self PR / Motivation / Skills)</div>
                            <div className="whitespace-pre-wrap mt-1">{basics.summary}</div>
                            {basics.skills && <div className="mt-3 font-bold">スキル: <span className="font-normal">{basics.skills}</span></div>}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* --------------------------------------------------------- */}
                {/* 2. RENDERER UNTUK TEMPLATE SELAIN JP_RIREKISHO */}
                {/* --------------------------------------------------------- */}
                
                {template !== 'jp_rirekisho' && (() => {
                  const formatDescription = (text) => {
                    if (!text) return null;
                    return text.split('\n').map((line, i) => {
                      const isBullet = line.trim().startsWith('-');
                      return (
                        <div key={i} className={`flex ${isBullet ? 'mt-1' : ''}`}>
                          {isBullet && <span className="mr-2 font-bold">•</span>}
                          <span className={`${isBullet ? 'flex-1' : ''} text-[10.5pt] leading-relaxed text-black text-justify`}>
                            {isBullet ? line.replace(/^-/, '').trim() : line}
                          </span>
                        </div>
                      );
                    });
                  };

                  const SectionTitle = ({ title }) => {
                    if (template === 'normal') return <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-2.5 pb-0.5 text-black tracking-wide mt-4">{title}</h2>;
                    if (template === 'executive') return <h2 className="text-[11pt] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-widest mt-3">{title}</h2>;
                    if (template === 'modern') return <h2 className="text-[13pt] font-black uppercase text-gray-900 border-b-2 border-gray-800 mb-3 pb-1 mt-4">{title}</h2>;
                    if (template === 'harvard') return <h2 className="text-[11pt] font-bold uppercase text-center border-b border-black mb-3 pb-1 tracking-widest mt-4">{title}</h2>;
                    if (template === 'jp_shokumu') return <h2 className="text-[11pt] font-bold border-l-4 border-gray-800 pl-2 mb-2 mt-4 bg-gray-100 py-1">{title}</h2>;
                  };

                  const RenderEducation = () => educations.some(e => e.institution.trim() !== "") && (
                    <div className="mb-3">
                      <SectionTitle title={t.edu} />
                      {educations.filter(e => e.institution.trim() !== "").map((edu, idx) => (
                        <div key={idx} className="mb-2.5 break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <h3 className={`text-[10.5pt] text-black ${template === 'normal' ? 'uppercase font-bold' : 'font-bold'}`}>{edu.institution}</h3>
                            <span className="text-[10.5pt] text-black whitespace-nowrap">{edu.period}</span>
                          </div>
                          <div className="text-[10.5pt] text-black">{edu.major}</div>
                          {edu.gpa && <div className="text-[10.5pt] text-black">{template === 'normal' && lang === 'en' ? `Graduated with a GPA of ${edu.gpa}.` : edu.gpa}</div>}
                        </div>
                      ))}
                    </div>
                  );

                  const RenderSkills = () => basics.skills.trim() !== "" && (
                    <div className="mb-3 break-inside-avoid">
                      <SectionTitle title={t.skills} />
                      {template === 'normal' ? (
                        <ul className="list-disc list-inside text-[10.5pt] text-black grid grid-cols-2 sm:grid-cols-3 gap-x-2 mt-1">
                          {basics.skills.split(',').map((skill, i) => <li key={i}>{skill.trim()}</li>)}
                        </ul>
                      ) : (
                        <p className="text-[10.5pt] text-black leading-relaxed whitespace-pre-wrap break-words pl-2">{basics.skills}</p>
                      )}
                    </div>
                  );

                  const RenderExperience = () => experiences.some(e => e.company.trim() !== "") && (
                    <div className="mb-3">
                      <SectionTitle title={t.exp} />
                      {experiences.filter(e => e.company.trim() !== "").map((exp, idx) => (
                        <div key={idx} className="mb-3.5 break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <h3 className={`text-[10.5pt] text-black font-bold`}>{exp.company}</h3>
                            <span className="text-[10.5pt] text-black whitespace-nowrap">{exp.period}</span>
                          </div>
                          <div className={`text-[10.5pt] text-black mb-1 ${template === 'normal' ? 'font-normal' : 'font-bold text-gray-800'}`}>{exp.role}</div>
                          <div className={`${template === 'normal' ? 'ml-0' : 'pl-3'}`}>
                             {formatDescription(exp.description)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );

                  const RenderProjects = () => projects.some(p => p.name.trim() !== "") && (
                    <div className="mb-3">
                      <SectionTitle title={t.proj} />
                      {projects.filter(p => p.name.trim() !== "").map((proj, idx) => (
                        <div key={idx} className="mb-3.5 break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[10.5pt] font-bold text-black">{proj.name}</h3>
                            <span className="text-[10.5pt] text-black whitespace-nowrap">{proj.period}</span>
                          </div>
                          <div className={`mt-1 ${template === 'normal' ? 'ml-0' : 'pl-3'}`}>
                            {formatDescription(proj.description)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );

                  const RenderCerts = () => certs.some(c => c.name.trim() !== "") && (
                    <div className="mb-3">
                      <SectionTitle title={t.cert} />
                      {certs.filter(c => c.name.trim() !== "").map((cert, idx) => (
                        <div key={idx} className="mb-3.5 break-inside-avoid">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[10.5pt] font-bold text-black">{cert.name}</h3>
                            <span className="text-[10.5pt] text-black whitespace-nowrap">{cert.period}</span>
                          </div>
                          <div className="text-[10.5pt] text-black italic mb-1">{cert.issuer}</div>
                          <div className={`${template === 'normal' ? 'ml-0' : 'pl-3'}`}>
                            {formatDescription(cert.description)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );

                  if (template === 'normal') return <>{RenderEducation()}{RenderSkills()}{RenderExperience()}{RenderProjects()}{RenderCerts()}</>;
                  if (template === 'modern' || template === 'jp_shokumu') return <>{RenderExperience()}{RenderEducation()}{RenderSkills()}{RenderProjects()}{RenderCerts()}</>;
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
