"use client";

import { useState } from 'react';

export default function CVMaker() {
  const [template, setTemplate] = useState('normal'); 
  const [lang, setLang] = useState('id'); 
  const [isTranslating, setIsTranslating] = useState(false);

  // KAMUS BAHASA & PLACEHOLDER
  const t = {
    id: {
      personal: "Informasi Dasar", exp: "PENGALAMAN KERJA", edu: "PENDIDIKAN", proj: "PROYEK", cert: "SERTIFIKASI", summary: "PROFIL SINGKAT", skills: "KEAHLIAN DAN KOMPETENSI",
      add: "+ Tambah", del: "Hapus", print: "Cetak / Simpan PDF",
      placeholders: { 
        name: "Nama Lengkap", role: "Posisi Dilamar", loc: "Kota, Provinsi", phone: "Nomor Telepon", email: "Alamat Email", linkedin: "URL LinkedIn / Portofolio",
        summary: "Tuliskan ringkasan profil Anda secara profesional...", skills: "Keahlian (Cth: HTML, CSS, Figma)", 
        expRole: "Nama Jabatan", expComp: "Nama Perusahaan", expDate: "Tahun - Tahun (Cth: 2021 - 2023)", 
        eduInst: "Nama Kampus / Sekolah", eduMaj: "Jurusan / Gelar", eduDate: "Tahun Lulus",
        projName: "Nama Proyek", projDate: "Tahun", certName: "Nama Sertifikasi", certDate: "Tahun"
      }
    },
    en: {
      personal: "Basic Information", exp: "EXPERIENCE", edu: "EDUCATION", proj: "PROJECTS", cert: "CERTIFICATION", summary: "PROFESSIONAL SUMMARY", skills: "SKILL AND COMPETENCIES",
      add: "+ Add New", del: "Remove", print: "Print / Save as PDF",
      placeholders: { 
        name: "Full Name", role: "Targeted Role", loc: "City, Country", phone: "Phone Number", email: "Email Address", linkedin: "LinkedIn URL",
        summary: "Write your professional summary here...", skills: "Core Skills (e.g. HTML, CSS)", 
        expRole: "Job Title", expComp: "Company Name", expDate: "Year - Year", 
        eduInst: "University / School Name", eduMaj: "Major / Degree", eduDate: "Graduation Year",
        projName: "Project Name", projDate: "Year", certName: "Certification Name", certDate: "Year"
      }
    },
    jp: {
      personal: "基本情報", exp: "職務経歴", edu: "学歴", proj: "プロジェクト", cert: "免許・資格", summary: "自己PR / 志望動機", skills: "特技・スキル",
      add: "+ 追加", del: "削除", print: "PDFとして保存",
      placeholders: { 
        name: "氏名 (Nama)", role: "希望職種 (Posisi)", loc: "現住所 (Alamat)", phone: "電話番号 (No HP)", email: "メールアドレス (Email)", linkedin: "リンク (Link)",
        summary: "自己PRや志望動機を入力してください (Motivasi/PR)...", skills: "特技 (Keahlian)", 
        expRole: "役職 (Jabatan)", expComp: "会社名 (Perusahaan)", expDate: "入社年 - 退社年", 
        eduInst: "学校名 (Sekolah)", eduMaj: "学部・学科 (Jurusan)", eduDate: "卒業年",
        projName: "プロジェクト名", projDate: "年", certName: "資格名 (Sertifikat/JLPT)", certDate: "取得年"
      }
    }
  }[lang];

  // STATE FORMULIR UTAMA
  const [basics, setBasics] = useState({ 
    name: "", furigana: "", role: "", location: "", phone: "", email: "", linkedin: "", summary: "", skills: "",
    birthdate: "", age: "", gender: "男", nationality: "", visa: "" // Field Khusus Jepang
  });
  const [experiences, setExperiences] = useState([{ id: 1, role: "", company: "", period: "", description: "" }]);
  const [educations, setEducations] = useState([{ id: 1, institution: "", major: "", period: "", gpa: "" }]);
  const [projects, setProjects] = useState([{ id: 1, name: "", period: "", description: "" }]);
  const [certs, setCerts] = useState([{ id: 1, name: "", issuer: "", period: "", description: "" }]);

  const handleBasicsChange = (e) => setBasics({ ...basics, [e.target.name]: e.target.value });
  const handleArrayChange = (setter, state, index, field, value) => {
    const newState = [...state]; newState[index][field] = value; setter(newState);
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
      } catch (err) { return text; }
    };

    const tRole = await translateText(basics.role);
    const tSummary = await translateText(basics.summary);
    const tSkills = await translateText(basics.skills);
    setBasics(prev => ({ ...prev, role: tRole, summary: tSummary, skills: tSkills }));

    const translatedExp = await Promise.all(experiences.map(async (exp) => ({ ...exp, role: await translateText(exp.role), description: await translateText(exp.description) })));
    setExperiences(translatedExp);
    const translatedProj = await Promise.all(projects.map(async (proj) => ({ ...proj, description: await translateText(proj.description) })));
    setProjects(translatedProj);

    setIsTranslating(false);
  };

  // HELPER UNTUK TABEL JEPANG (Membuat baris kosong agar tabel penuh seperti form asli)
  const generateJpRows = (items, type) => {
    const rows = [];
    rows.push({ period: '', content: type === 'edu' ? '学歴' : type === 'exp' ? '職歴' : '', center: true });
    items.forEach(item => {
      if (type === 'edu' && item.institution) {
        rows.push({ period: item.period || '', content: `${item.institution} ${item.major} 入学/卒業` });
      }
      if (type === 'exp' && item.company) {
        rows.push({ period: item.period ? item.period.split('-')[0]?.trim() : '', content: `${item.company} 入社` });
        if (item.role) rows.push({ period: '', content: `　${item.role}` });
      }
      if (type === 'cert' && item.name) {
        rows.push({ period: item.period || '', content: `${item.name} 取得` });
      }
    });
    if (type === 'exp' && items.some(e => e.company)) {
      rows.push({ period: '', content: '現在に至る', right: true });
      rows.push({ period: '', content: '以上', right: true });
    }
    return rows;
  };

  const isJapanese = template === 'jp-umum' || template === 'jp-asing';

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
                  <button onClick={() => { handleMagicTranslate('jp'); setTemplate('jp-umum'); }} disabled={isTranslating} className={`px-3 py-1 text-xs font-bold transition-colors ${lang === 'jp' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-white'}`}>JP</button>
                </div>
              </div>
              <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Template ATS</h2>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => {setTemplate('normal'); if(lang==='jp') setLang('en');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'normal' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>1. Normal (Huda Clone)</button>
                <button onClick={() => {setTemplate('modern'); if(lang==='jp') setLang('en');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'modern' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>2. Modern Pro</button>
                <button onClick={() => {setTemplate('harvard'); if(lang==='jp') setLang('en');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'harvard' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>3. Harvard (Serif)</button>
                <button onClick={() => {setTemplate('executive'); if(lang==='jp') setLang('en');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'executive' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400 hover:border-cyan-500/50'}`}>4. Executive</button>
                <button onClick={() => {setTemplate('jp-umum'); setLang('jp');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'jp-umum' ? 'bg-red-600 border-red-400 text-white' : 'border-white/10 text-slate-400 hover:border-red-500/50'}`}>5a. JP Rirekisho (Umum)</button>
                <button onClick={() => {setTemplate('jp-asing'); setLang('jp');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'jp-asing' ? 'bg-red-600 border-red-400 text-white' : 'border-white/10 text-slate-400 hover:border-red-500/50'}`}>5b. JP Tokutei (Magang/Asing)</button>
              </div>
            </div>

            {isTranslating && <div className="mb-4 text-center text-xs font-bold text-cyan-400 animate-pulse">Sedang menerjemahkan isi CV secara otomatis...</div>}

            {/* FORM: DATA PRIBADI */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-cyan-400 mb-3 border-b border-white/10 pb-1">{t.personal}</h2>
              <div className="space-y-2">
                <input type="text" name="name" value={basics.name} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.name} />
                
                {/* Input Khusus Jepang */}
                {isJapanese && (
                  <div className="flex gap-2">
                    <input type="text" name="furigana" value={basics.furigana} onChange={handleBasicsChange} className="w-1/2 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="ふりがな (Furigana Nama)" />
                    <input type="text" name="birthdate" value={basics.birthdate} onChange={handleBasicsChange} className="w-1/4 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Tahun Lahir" />
                    <select name="gender" value={basics.gender} onChange={handleBasicsChange} className="w-1/4 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none">
                      <option value="男">男 (Pria)</option>
                      <option value="女">女 (Wanita)</option>
                    </select>
                  </div>
                )}
                {template === 'jp-asing' && (
                  <div className="flex gap-2">
                    <input type="text" name="nationality" value={basics.nationality} onChange={handleBasicsChange} className="w-1/2 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="国籍 (Kewarganegaraan, Cth: インドネシア)" />
                    <input type="text" name="visa" value={basics.visa} onChange={handleBasicsChange} className="w-1/2 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="在留資格 (Status Visa/KTP Jepang)" />
                  </div>
                )}

                <input type="text" name="role" value={basics.role} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.role} />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" name="location" value={basics.location} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.loc} />
                  <input type="text" name="phone" value={basics.phone} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.phone} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="email" name="email" value={basics.email} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.email} />
                  {!isJapanese && <input type="text" name="linkedin" value={basics.linkedin} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.linkedin} />}
                </div>
                <textarea name="summary" value={basics.summary} onChange={handleBasicsChange} rows={isJapanese ? 2 : 4} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.summary}></textarea>
                <textarea name="skills" value={basics.skills} onChange={handleBasicsChange} rows="2" className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.skills}></textarea>
              </div>
            </div>

            {/* FORM: PENGALAMAN & PENDIDIKAN DIBUAT SINGKAT ... */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1"><h2 className="text-lg font-bold text-cyan-400">{t.exp}</h2><button onClick={() => addField(setExperiences, experiences, { role: "", company: "", period: "", description: "" })} className="text-[10px] bg-cyan-600 text-white px-2 py-1 rounded">{t.add}</button></div>
              {experiences.map((exp, index) => (
                <div key={exp.id} className="bg-[#060D1F] p-3 rounded mb-3 relative"><button onClick={() => removeField(setExperiences, experiences, index)} className="absolute top-2 right-2 text-red-400 text-[10px]">{t.del}</button>
                  <input type="text" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'company', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.expComp} />
                  <input type="text" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.expRole} />
                  <input type="text" value={exp.period} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.expDate} />
                  {!isJapanese && <textarea value={exp.description} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'description', e.target.value)} rows="3" className="w-full mt-1 bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder="- Tulis tanggung jawab utama..."></textarea>}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1"><h2 className="text-lg font-bold text-cyan-400">{t.edu}</h2><button onClick={() => addField(setEducations, educations, { institution: "", major: "", period: "", gpa: "" })} className="text-[10px] bg-cyan-600 text-white px-2 py-1 rounded">{t.add}</button></div>
              {educations.map((edu, index) => (
                <div key={edu.id} className="bg-[#060D1F] p-3 rounded mb-3 relative"><button onClick={() => removeField(setEducations, educations, index)} className="absolute top-2 right-2 text-red-400 text-[10px]">{t.del}</button>
                  <input type="text" value={edu.institution} onChange={(e) => handleArrayChange(setEducations, educations, index, 'institution', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.eduInst} />
                  <input type="text" value={edu.major} onChange={(e) => handleArrayChange(setEducations, educations, index, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mb-1" placeholder={t.placeholders.eduMaj} />
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input type="text" value={edu.period} onChange={(e) => handleArrayChange(setEducations, educations, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder={t.placeholders.eduDate} />
                    {!isJapanese && <input type="text" value={edu.gpa} onChange={(e) => handleArrayChange(setEducations, educations, index, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder="GPA / IPK" />}
                  </div>
                </div>
              ))}
            </div>

            {/* SERTIFIKASI (JLPT PENTING UNTUK JEPANG) */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1"><h2 className="text-lg font-bold text-cyan-400">{t.cert}</h2><button onClick={() => addField(setCerts, certs, { name: "", issuer: "", period: "", description: "" })} className="text-[10px] bg-cyan-600 text-white px-2 py-1 rounded">{t.add}</button></div>
              {certs.map((cert, index) => (
                <div key={cert.id} className="bg-[#060D1F] p-3 rounded mb-3 relative"><button onClick={() => removeField(setCerts, certs, index)} className="absolute top-2 right-2 text-red-400 text-[10px]">{t.del}</button>
                  <div className="grid grid-cols-2 gap-2 mb-1">
                    <input type="text" value={cert.name} onChange={(e) => handleArrayChange(setCerts, certs, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder={template === 'jp-asing' ? "JLPT N3 / JFT Basic" : t.placeholders.certName} />
                    <input type="text" value={cert.period} onChange={(e) => handleArrayChange(setCerts, certs, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none" placeholder={t.placeholders.certDate} />
                  </div>
                  {!isJapanese && <textarea value={cert.description} onChange={(e) => handleArrayChange(setCerts, certs, index, 'description', e.target.value)} rows="2" className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:outline-none mt-1" placeholder="- Topik yang dipelajari..."></textarea>}
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
                ${template === 'normal' ? 'font-[Arial,Helvetica,sans-serif]' : template === 'harvard' || isJapanese ? 'font-serif' : 'font-sans'}`}>
                
                {/* --------------------------------------------------------- */}
                {/* 1. JIKA TEMPLATE JEPANG (JIS RIREKISHO)                   */}
                {/* --------------------------------------------------------- */}
                {isJapanese ? (
                  <div className="w-full text-[11px] leading-tight">
                    {/* Header Resume */}
                    <div className="flex justify-between items-end mb-1">
                      <h1 className="text-2xl tracking-[1em] font-bold ml-4">履歴書</h1>
                      <span>　　年　　月　　日 現在</span>
                    </div>

                    {/* Personal Info Box */}
                    <div className="flex border border-black mb-2 h-36">
                      <div className="flex-1 flex flex-col">
                        <div className="flex border-b border-black">
                          <div className="w-20 border-r border-black p-1 flex items-center">ふりがな</div>
                          <div className="flex-1 p-1">{basics.furigana}</div>
                        </div>
                        <div className="flex flex-1 border-b border-black items-center">
                          <div className="w-20 border-r border-black p-1 h-full flex items-center">氏名</div>
                          <div className="flex-1 p-2 text-2xl tracking-widest">{basics.name}</div>
                        </div>
                        <div className="flex h-10">
                          <div className="flex-1 border-r border-black p-1 flex items-center justify-between">
                            <span>{basics.birthdate ? `${basics.birthdate} 生` : '　　　年　　月　　日生'}</span>
                            <span>(満　　歳)</span>
                          </div>
                          <div className="w-16 p-1 flex items-center justify-center border-r border-black">{basics.gender}</div>
                        </div>
                      </div>
                      <div className="w-28 flex flex-col items-center justify-center text-center p-2 border-l border-black bg-gray-50/50 text-[9px] text-gray-500 border-dashed">
                        写真を貼る位置<br/>(36~40mm x 24~30mm)
                      </div>
                    </div>

                    {/* Address Box */}
                    <div className="border border-black mb-2">
                      <div className="flex border-b border-black">
                        <div className="w-20 border-r border-black p-1">ふりがな</div>
                        <div className="flex-1 p-1"></div>
                      </div>
                      <div className="flex">
                        <div className="flex-1 p-2 border-r border-black h-12">現住所 〒<br/><span className="text-sm mt-1 block">{basics.location}</span></div>
                        <div className="w-40 flex flex-col">
                          <div className="border-b border-black p-1 text-[9px]">電話</div>
                          <div className="p-1 flex-1">{basics.phone}</div>
                        </div>
                      </div>
                    </div>

                    {/* Tokutei Ginou Info (KHUSUS JP-ASING) */}
                    {template === 'jp-asing' && (
                      <div className="flex border border-black mb-3">
                        <div className="flex-1 border-r border-black p-2"><span className="text-[9px] text-gray-600 block">国籍・地域 (Nationality)</span>{basics.nationality || 'インドネシア'}</div>
                        <div className="flex-1 p-2"><span className="text-[9px] text-gray-600 block">在留資格 (Visa Status)</span>{basics.visa || '特定技能1号'}</div>
                      </div>
                    )}

                    {/* Edu & Exp Table */}
                    <table className="w-full border-collapse border border-black mb-3 text-[11px]">
                      <thead>
                        <tr>
                          <th className="border border-black w-14 font-normal p-1">年</th>
                          <th className="border border-black w-8 font-normal p-1">月</th>
                          <th className="border border-black font-normal p-1">学歴・職歴（各別にまとめて書く）</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generateJpRows(educations, 'edu').map((r, i) => (
                          <tr key={`edu-${i}`} className="h-6">
                            <td className="border border-black text-center">{r.period.split('-')[0]?.trim()}</td>
                            <td className="border border-black"></td>
                            <td className={`border border-black px-2 ${r.center ? 'text-center tracking-[1em]' : ''}`}>{r.content}</td>
                          </tr>
                        ))}
                        {generateJpRows(experiences, 'exp').map((r, i) => (
                          <tr key={`exp-${i}`} className="h-6">
                            <td className="border border-black text-center">{r.period}</td>
                            <td className="border border-black"></td>
                            <td className={`border border-black px-2 ${r.center ? 'text-center tracking-[1em]' : r.right ? 'text-right pr-4' : ''}`}>{r.content}</td>
                          </tr>
                        ))}
                        {/* Empty padding rows */}
                        {[...Array(Math.max(0, 10 - educations.length - experiences.length))].map((_, i) => (
                          <tr key={`pad-${i}`} className="h-6"><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td></tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Cert Table */}
                    <table className="w-full border-collapse border border-black mb-3 text-[11px]">
                      <thead>
                        <tr>
                          <th className="border border-black w-14 font-normal p-1">年</th>
                          <th className="border border-black w-8 font-normal p-1">月</th>
                          <th className="border border-black font-normal p-1">免許・資格</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generateJpRows(certs, 'cert').map((r, i) => (
                          <tr key={`cert-${i}`} className="h-6">
                            <td className="border border-black text-center">{r.period}</td>
                            <td className="border border-black"></td>
                            <td className="border border-black px-2">{r.content}</td>
                          </tr>
                        ))}
                        <tr className="h-6"><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black text-right pr-4">以上</td></tr>
                      </tbody>
                    </table>

                    {/* Motivation Box */}
                    <div className="border border-black p-2 min-h-[100px]">
                      <div className="text-[10px] mb-1">{template === 'jp-asing' ? '志望の動機、自己PR (Tulis Motivasi Kerja / Kelebihan Diri)' : '志望の動機、特技、好きな学科、アピールポイントなど'}</div>
                      <div className="whitespace-pre-wrap break-words">{basics.summary}</div>
                    </div>
                  </div>
                ) : (
                  /* --------------------------------------------------------- */
                  /* 2. JIKA TEMPLATE UMUM (NORMAL, MODERN, DLL)               */
                  /* --------------------------------------------------------- */
                  <>
                    {/* TEMA 1: NORMAL (Huda Clone) - 100% Persis PDF (Rata Kiri, Non-Center) */}
                    {template === 'normal' && (
                      <div className="pb-2 text-left">
                        {/* Judul Capitalize Standard */}
                        <h1 className="text-[20pt] font-bold mb-1 tracking-tight capitalize leading-none">{basics.name || "Muhamad Syaepul Huda"}</h1>
                        
                        <p className="text-[10pt] text-black flex flex-wrap gap-x-1.5 mt-1.5 mb-3">
                          {[basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' | ')}
                        </p>
                        
                        {/* Summary langsung paragraf rata kiri-kanan (justify) tanpa margin aneh */}
                        {basics.summary && <div className="text-[10.5pt] leading-[1.6] text-justify text-black mb-4 break-words">{basics.summary}</div>}
                      </div>
                    )}

                    {/* TEMA 2: MODERN PRO - Tanpa Icon, Rata Kiri Bersih */}
                    {template === 'modern' && (
                      <div className="border-b-[3px] border-gray-900 pb-4 mb-4 text-left">
                        <h1 className="text-3xl font-black text-gray-900 mb-1 uppercase tracking-tight">{basics.name || "YOUR NAME"}</h1>
                        {basics.role && <h2 className="text-[15px] font-bold text-gray-600 mb-2 uppercase tracking-wide">{basics.role}</h2>}
                        <p className="text-[13px] text-gray-700 flex flex-wrap gap-x-3 gap-y-1 font-medium">
                          {[basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' • ')}
                        </p>
                        {basics.summary && <p className="text-[13px] leading-relaxed text-gray-800 mt-3">{basics.summary}</p>}
                      </div>
                    )}

                    {/* TEMA 3 & 4: HARVARD & EXECUTIVE */}
                    {(template === 'harvard' || template === 'executive') && (
                      <div className={`text-center mb-6 ${template==='executive' ? 'border-b border-gray-400 pb-4' : ''}`}>
                        <h1 className={`${template==='harvard' ? 'text-[24pt] font-serif font-normal' : 'text-3xl font-black tracking-tight'} uppercase mb-2`}>{basics.name || "YOUR NAME"}</h1>
                        <p className="text-[10pt] text-gray-900 flex justify-center flex-wrap gap-x-1 font-medium">
                          {[basics.role ? `${basics.role} |` : null, basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' • ')}
                        </p>
                        {basics.summary && (
                          template === 'harvard' 
                          ? <p className="text-[11pt] leading-relaxed text-justify text-gray-900 mt-4">{basics.summary}</p>
                          : <div className="mt-4"><h2 className="text-[13px] font-bold uppercase tracking-widest text-center mb-2">Profile</h2><p className="text-[13px] leading-relaxed text-justify text-gray-800">{basics.summary}</p></div>
                        )}
                      </div>
                    )}

                    {/* MESIN PARSER SECTION */}
                    {(() => {
                      const formatDescription = (text, isNormal) => {
                        if (!text) return null;
                        return text.split('\n').map((line, i) => {
                          const isBullet = line.trim().startsWith('-');
                          return (
                            <div key={i} className={`flex ${isBullet ? 'mt-1' : ''}`}>
                              {isBullet && <span className="mr-2 font-bold">•</span>}
                              <span className={`${isBullet ? 'flex-1' : ''} ${isNormal ? 'text-[10.5pt] leading-[1.5]' : 'text-[13px] leading-relaxed'} text-black text-justify`}>
                                {isBullet ? line.replace(/^-/, '').trim() : line}
                              </span>
                            </div>
                          );
                        });
                      };

                      const SectionTitle = ({ title }) => {
                        if (template === 'normal') return <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-2.5 pb-0.5 text-black tracking-wide mt-5">{title}</h2>;
                        if (template === 'executive') return <h2 className="text-[12px] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-widest mt-3">{title}</h2>;
                        if (template === 'modern') return <h2 className="text-[15px] font-black uppercase text-gray-900 border-b-2 border-gray-800 mb-3 pb-1 mt-4">{title}</h2>;
                        if (template === 'harvard') return <h2 className="text-[12pt] font-bold uppercase text-center border-b border-black mb-3 pb-1 tracking-widest mt-4">{title}</h2>;
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
                            <ul className="list-disc list-inside text-[10.5pt] text-black grid grid-cols-2 gap-x-4 mt-1">
                              {basics.skills.split(',').map((skill, i) => <li key={i} className="pl-1">{skill.trim()}</li>)}
                            </ul>
                          ) : (
                            <p className="text-[10.5pt] text-black leading-relaxed whitespace-pre-wrap break-words">{basics.skills}</p>
                          )}
                        </div>
                      );

                      const RenderExperience = () => experiences.some(e => e.company.trim() !== "") && (
                        <div className="mb-3">
                          <SectionTitle title={t.exp} />
                          {experiences.filter(e => e.company.trim() !== "").map((exp, idx) => (
                            <div key={idx} className="mb-3.5 break-inside-avoid">
                              <div className="flex justify-between items-start">
                                <h3 className={`text-[10.5pt] text-black ${template === 'normal' ? 'font-bold' : 'font-bold'}`}>{exp.company}</h3>
                                <span className="text-[10.5pt] text-black whitespace-nowrap">{exp.period}</span>
                              </div>
                              <div className={`text-[10.5pt] text-black mb-1 ${template === 'modern' ? 'font-bold text-gray-800' : 'font-medium'}`}>{exp.role}</div>
                              <div className={`${template === 'normal' ? 'ml-0' : 'pl-3'}`}>
                                 {formatDescription(exp.description, template === 'normal')}
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
                                {formatDescription(proj.description, template === 'normal')}
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
                                {formatDescription(cert.description, template === 'normal')}
                              </div>
                            </div>
                          ))}
                        </div>
                      );

                      if (template === 'normal') return <>{RenderEducation()}{RenderSkills()}{RenderExperience()}{RenderProjects()}{RenderCerts()}</>;
                      if (template === 'modern') return <>{RenderExperience()}{RenderEducation()}{RenderSkills()}{RenderProjects()}{RenderCerts()}</>;
                      return <>{RenderEducation()}{RenderExperience()}{RenderProjects()}{RenderCerts()}{RenderSkills()}</>;
                    })()}
                  </>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
