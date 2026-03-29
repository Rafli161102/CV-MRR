"use client";

import { useState } from 'react';

// =========================================================================
// KOMPONEN IKON SVG (BEBAS EMOJI & PROFESIONAL)
// =========================================================================
const SparklesIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-400 shrink-0 mt-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const PrintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.524-4.31a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-1.895-3.32a.5.5 0 00-.5.5v2.25c0 .276.224.5.5.5h2.25a.5.5 0 00.5-.5v-2.25a.5.5 0 00-.5-.5h-2.25zM12 21.75c3.55 0 6.544-2.185 7.91-5.326m-15.82 0A8.966 8.966 0 0112 2.25a8.964 8.964 0 017.91 5.326m-15.82 0a8.964 8.964 0 00-7.91 5.326M12 21.75a8.965 8.965 0 007.91-5.326m0 0H21m-9 0v-4.5" />
  </svg>
);


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
        name: "Nama Lengkap", role: "Posisi Dilamar (Opsional)", loc: "Kota, Provinsi", phone: "Nomor Telepon", email: "Alamat Email", linkedin: "URL Portofolio / LinkedIn (Opsional)",
        summary: "Tuliskan ringkasan profil Anda secara singkat dan profesional. Contoh: Lulusan Desain Grafis dengan pengalaman 3 tahun dalam merancang identitas visual...", 
        skills: "Keahlian 1, Keahlian 2, Keahlian 3 (Pisahkan dengan koma)", 
        expRole: "Nama Jabatan (Contoh: Graphic Designer)", expComp: "Nama Perusahaan (Contoh: PT Kreatif Maju)", expDate: "Bulan Tahun - Bulan Tahun", 
        eduInst: "Nama Kampus / Sekolah", eduMaj: "Jurusan / Gelar", eduDate: "Bulan Tahun Lulus",
        projName: "Nama Proyek", projDate: "Bulan Tahun", certName: "Nama Sertifikasi", certDate: "Bulan Tahun"
      }
    },
    en: {
      personal: "Basic Information", exp: "EXPERIENCE", edu: "EDUCATION", proj: "PROJECTS", cert: "CERTIFICATION", summary: "PROFESSIONAL SUMMARY", skills: "SKILL AND COMPETENCIES",
      add: "+ Add New", del: "Remove", print: "Print / Save as PDF",
      placeholders: { 
        name: "Full Name", role: "Targeted Role (Optional)", loc: "City, Country", phone: "Phone Number", email: "Email Address", linkedin: "LinkedIn / Portfolio URL (Optional)",
        summary: "Write your professional summary here...", skills: "Core Skills (e.g. HTML, CSS, Figma - separated by comma)", 
        expRole: "Job Title", expComp: "Company Name", expDate: "Month Year - Month Year", 
        eduInst: "University / School Name", eduMaj: "Major / Degree", eduDate: "Graduation Date",
        projName: "Project Name", projDate: "Month Year", certName: "Certification Name", certDate: "Month Year"
      }
    },
    jp: {
      personal: "基本情報", exp: "職務経歴", edu: "学歴", proj: "プロジェクト", cert: "資格・免許", summary: "自己PR / 職務要約", skills: "スキル・知識",
      add: "+ 追加", del: "削除", print: "PDFとして保存",
      placeholders: { 
        name: "氏名", role: "希望職種", loc: "住所", phone: "電話番号", email: "メールアドレス", linkedin: "リンク", 
        summary: "自己PRを入力してください...", skills: "スキル (HTML, CSS...)", 
        expRole: "役職", expComp: "会社名", expDate: "入社年 - 退社年", 
        eduInst: "学校名", eduMaj: "学部・学科", eduDate: "卒業年月", 
        projName: "プロジェクト名", projDate: "年月", certName: "資格名", certDate: "取得年月" 
      }
    }
  }[lang];

  // STATE FORMULIR UTAMA
  const [basics, setBasics] = useState({ 
    name: "", furigana: "", role: "", location: "", phone: "", email: "", linkedin: "", summary: "", skills: "",
    birthdate: "", age: "", gender: "男", nationality: "", visa: "" 
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
      } catch (err) {
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
        
        {/* ========================================================= */}
        {/* SECTION PENDAHULUAN (HERO & STORY)                        */}
        {/* ========================================================= */}
        <div className="text-center mb-12 no-print animate-fade-in-up">
          {/* Lencana Privasi */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wide mb-5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <ShieldIcon />
            100% Aman. Kami tidak menyimpan atau merekam data Anda.
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">ATS <span className="text-cyan-500">CV Maker</span></h1>
          
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Sistem ini dibangun untuk membantu siapa saja yang kesulitan mengatur <i>margin</i> dan format CV agar lolos seleksi mesin HRD (ATS). Pilih template, isi data Anda, dan alat ini akan menyusunnya secara presisi. <span className="text-cyan-400 font-medium">Sepenuhnya gratis dan langsung cetak.</span>
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* ========================================================= */}
          {/* KOLOM KIRI: FORMULIR ISIAN                                  */}
          {/* ========================================================= */}
          <div className="w-full xl:w-5/12 bg-[#0A1329] border border-white/10 p-6 rounded-[2rem] no-print xl:sticky xl:top-32 h-fit max-h-none xl:max-h-[80vh] overflow-visible xl:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full">
            
            {/* ------------------------------------------------------- */}
            {/* PANEL PANDUAN CETAK & TUTORIAL                          */}
            {/* ------------------------------------------------------- */}
            <div className="mb-6 p-5 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-[#0A1329] shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
              
              <div className="flex items-start gap-3 mb-3">
                <InfoIcon />
                <div>
                  <h3 className="text-cyan-400 font-bold text-sm mb-1">Panduan Cetak PDF Bebas Terpotong</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Ikuti 3 langkah mudah berikut agar hasil CV Anda sempurna:
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2.5 ml-8 text-[11px] text-slate-300 list-decimal list-outside">
                <li>Isi formulir menggunakan <b>Bahasa Indonesia</b> terlebih dahulu untuk memudahkan Anda.</li>
                <li>Gunakan panel <span className="text-cyan-400 font-bold flex inline-flex items-center gap-1 mx-1"><SparklesIcon className="w-3 h-3"/> Magic Translate</span> di bawah untuk menerjemahkan ke Bahasa Inggris/Jepang secara otomatis.</li>
                <li className="bg-cyan-900/30 p-2 rounded border border-cyan-500/30 font-medium leading-relaxed">
                  <span className="text-cyan-300 font-bold uppercase tracking-wider">Sangat Penting:</span> Saat menekan tombol Cetak PDF, pastikan opsi <b>Ukuran Kertas adalah "A4"</b> dan <b>Margin (Batas Tepi) diset ke "Tidak Ada" (None)</b>. Jarak tepi yang standar sudah kami tanamkan ke dalam kertas.
                </li>
              </ul>
            </div>

            {/* ------------------------------------------------------- */}
            {/* PANEL PANDUAN KHUSUS JEPANG (Muncul jika Template JP)   */}
            {/* ------------------------------------------------------- */}
            {isJapanese && (
              <div className="mb-6 p-5 rounded-xl border border-red-500/20 bg-gradient-to-br from-red-900/10 to-[#0A1329] shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex items-start gap-3 mb-3">
                  <AlertIcon />
                  <div>
                    <h3 className="text-red-400 font-bold text-sm mb-1">Standar CV Jepang (JIS 履歴書)</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">Format tabel ini sangat kaku dan diatur secara nasional di Jepang. Perhatikan aturan berikut:</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-8 text-[11px] text-slate-300 list-disc list-outside">
                  <li><b>Furigana:</b> Wajib isi huruf Katakana untuk cara baca nama Anda.</li>
                  <li><b>Tahun Masehi:</b> Cukup ketik angka tahun (Cth: 2023). Jangan ketik bulan.</li>
                  <li><b>Pas Foto:</b> Kertas ini sengaja menyediakan kolom kosong di kanan atas untuk Anda menempelkan foto fisik 3x4 (berjas rapi).</li>
                  {template === 'jp-asing' && (
                    <>
                      <li className="text-red-300 font-medium"><b>Aturan Pekerja Asing/Magang:</b> Kolom "Kewarganegaraan" dan "Status Visa" wajib diisi dengan jujur.</li>
                      <li className="text-red-300 font-medium"><b>Sertifikasi:</b> Taruh level JLPT / JFT Basic Anda di baris paling pertama pada kolom sertifikasi.</li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* PANEL KONTROL (TEMA & TRANSLATE)                        */}
            {/* ------------------------------------------------------- */}
            <div className="mb-6 p-5 bg-[#060D1F] border border-cyan-500/30 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <SparklesIcon />
                  <h2 className="text-xs font-bold uppercase tracking-wider">Magic Translate</h2>
                </div>
                <div className="flex bg-[#0A1329] rounded border border-white/10 overflow-hidden shadow-inner">
                  <button onClick={() => handleMagicTranslate('id')} disabled={isTranslating} className={`px-4 py-1.5 text-xs font-bold transition-colors ${lang === 'id' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>ID</button>
                  <button onClick={() => handleMagicTranslate('en')} disabled={isTranslating} className={`px-4 py-1.5 text-xs font-bold transition-colors ${lang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>EN</button>
                  <button onClick={() => { handleMagicTranslate('jp'); setTemplate('jp-umum'); }} disabled={isTranslating} className={`px-4 py-1.5 text-xs font-bold transition-colors ${lang === 'jp' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>JP</button>
                </div>
              </div>
              <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Pilih Template ATS</h2>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => {setTemplate('normal'); if(lang==='jp') setLang('id');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'normal' ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-cyan-500/30'}`}>1. Normal (Standar ATS)</button>
                <button onClick={() => {setTemplate('modern'); if(lang==='jp') setLang('id');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'modern' ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-cyan-500/30'}`}>2. Modern Pro</button>
                <button onClick={() => {setTemplate('harvard'); if(lang==='jp') setLang('id');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'harvard' ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-cyan-500/30'}`}>3. Harvard (Serif)</button>
                <button onClick={() => {setTemplate('executive'); if(lang==='jp') setLang('id');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'executive' ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-cyan-500/30'}`}>4. Tech Executive</button>
                <button onClick={() => {setTemplate('jp-umum'); setLang('jp');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'jp-umum' ? 'bg-red-600/90 border-red-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-red-500/30'}`}>5a. JP Rirekisho (Umum)</button>
                <button onClick={() => {setTemplate('jp-asing'); setLang('jp');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'jp-asing' ? 'bg-red-600/90 border-red-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-red-500/30'}`}>5b. JP Tokutei (Asing)</button>
              </div>
            </div>

            {isTranslating && (
              <div className="mb-4 flex justify-center items-center gap-2 text-xs font-bold text-cyan-400">
                <svg className="animate-spin h-4 w-4 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mesin AI sedang memproses terjemahan...
              </div>
            )}

            {/* FORM: DATA PRIBADI */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-cyan-400 mb-3 border-b border-white/10 pb-1">{t.personal}</h2>
              <div className="space-y-2">
                <input type="text" name="name" value={basics.name} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors" placeholder={t.placeholders.name} />
                
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

                <input type="text" name="role" value={basics.role} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors" placeholder={t.placeholders.role} />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" name="location" value={basics.location} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors" placeholder={t.placeholders.loc} />
                  <input type="text" name="phone" value={basics.phone} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors" placeholder={t.placeholders.phone} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="email" name="email" value={basics.email} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors" placeholder={t.placeholders.email} />
                  {!isJapanese && <input type="text" name="linkedin" value={basics.linkedin} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors" placeholder={t.placeholders.linkedin} />}
                </div>
                <textarea name="summary" value={basics.summary} onChange={handleBasicsChange} rows={isJapanese ? 2 : 4} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors" placeholder={t.placeholders.summary}></textarea>
                <textarea name="skills" value={basics.skills} onChange={handleBasicsChange} rows="3" className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none transition-colors" placeholder={t.placeholders.skills}></textarea>
              </div>
            </div>

            {/* FORM: PENGALAMAN */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                <h2 className="text-lg font-bold text-cyan-400">{t.exp}</h2>
                <button onClick={() => addField(setExperiences, experiences, { role: "", company: "", period: "", description: "" })} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-2 py-1 rounded transition-colors">{t.add}</button>
              </div>
              {experiences.map((exp, index) => (
                <div key={exp.id} className="bg-[#060D1F] p-4 rounded-xl mb-3 relative border border-white/5 hover:border-white/10 transition-colors">
                  <button onClick={() => removeField(setExperiences, experiences, index)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-[10px] font-bold px-2 py-1 bg-red-400/10 rounded">{t.del}</button>
                  <input type="text" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'company', e.target.value)} className="w-11/12 bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder={t.placeholders.expComp} />
                  <input type="text" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder={t.placeholders.expRole} />
                  <input type="text" value={exp.period} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder={t.placeholders.expDate} />
                  {!isJapanese && <textarea value={exp.description} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'description', e.target.value)} rows="3" className="w-full mt-2 bg-transparent border border-white/5 rounded p-2 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="- Tulis deskripsi (Gunakan strip untuk membuat bullet point)..."></textarea>}
                </div>
              ))}
            </div>

            {/* FORM: PENDIDIKAN */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                <h2 className="text-lg font-bold text-cyan-400">{t.edu}</h2>
                <button onClick={() => addField(setEducations, educations, { institution: "", major: "", period: "", gpa: "" })} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-2 py-1 rounded transition-colors">{t.add}</button>
              </div>
              {educations.map((edu, index) => (
                <div key={edu.id} className="bg-[#060D1F] p-4 rounded-xl mb-3 relative border border-white/5 hover:border-white/10 transition-colors">
                  <button onClick={() => removeField(setEducations, educations, index)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-[10px] font-bold px-2 py-1 bg-red-400/10 rounded">{t.del}</button>
                  <input type="text" value={edu.institution} onChange={(e) => handleArrayChange(setEducations, educations, index, 'institution', e.target.value)} className="w-11/12 bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder={t.placeholders.eduInst} />
                  <input type="text" value={edu.major} onChange={(e) => handleArrayChange(setEducations, educations, index, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder={t.placeholders.eduMaj} />
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <input type="text" value={edu.period} onChange={(e) => handleArrayChange(setEducations, educations, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.eduDate} />
                    {!isJapanese && <input type="text" value={edu.gpa} onChange={(e) => handleArrayChange(setEducations, educations, index, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="GPA / IPK" />}
                  </div>
                </div>
              ))}
            </div>

            {/* FORM: PROYEK */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                <h2 className="text-lg font-bold text-cyan-400">{t.proj}</h2>
                <button onClick={() => addField(setProjects, projects, { name: "", period: "", description: "" })} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-2 py-1 rounded transition-colors">{t.add}</button>
              </div>
              {projects.map((proj, index) => (
                <div key={proj.id} className="bg-[#060D1F] p-4 rounded-xl mb-3 relative border border-white/5 hover:border-white/10 transition-colors">
                  <button onClick={() => removeField(setProjects, projects, index)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-[10px] font-bold px-2 py-1 bg-red-400/10 rounded">{t.del}</button>
                  <div className="grid grid-cols-2 gap-3 mb-2 pr-12">
                    <input type="text" value={proj.name} onChange={(e) => handleArrayChange(setProjects, projects, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.projName} />
                    <input type="text" value={proj.period} onChange={(e) => handleArrayChange(setProjects, projects, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.projDate} />
                  </div>
                  <textarea value={proj.description} onChange={(e) => handleArrayChange(setProjects, projects, index, 'description', e.target.value)} rows="3" className="w-full mt-2 bg-transparent border border-white/5 rounded p-2 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="- Deskripsi proyek..."></textarea>
                </div>
              ))}
            </div>

            {/* FORM: SERTIFIKASI */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                <h2 className="text-lg font-bold text-cyan-400">{t.cert}</h2>
                <button onClick={() => addField(setCerts, certs, { name: "", issuer: "", period: "", description: "" })} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-2 py-1 rounded transition-colors">{t.add}</button>
              </div>
              {certs.map((cert, index) => (
                <div key={cert.id} className="bg-[#060D1F] p-4 rounded-xl mb-3 relative border border-white/5 hover:border-white/10 transition-colors">
                  <button onClick={() => removeField(setCerts, certs, index)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-[10px] font-bold px-2 py-1 bg-red-400/10 rounded">{t.del}</button>
                  <div className="grid grid-cols-2 gap-3 mb-2 pr-12">
                    <input type="text" value={cert.name} onChange={(e) => handleArrayChange(setCerts, certs, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.certName} />
                    <input type="text" value={cert.period} onChange={(e) => handleArrayChange(setCerts, certs, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.certDate} />
                  </div>
                  <input type="text" value={cert.issuer} onChange={(e) => handleArrayChange(setCerts, certs, index, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder="Penerbit (Cth: Google, Dicoding)" />
                  {!isJapanese && <textarea value={cert.description} onChange={(e) => handleArrayChange(setCerts, certs, index, 'description', e.target.value)} rows="2" className="w-full mt-1 bg-transparent border border-white/5 rounded p-2 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="- Topik yang dipelajari..."></textarea>}
                </div>
              ))}
            </div>

            <button onClick={() => window.print()} className="w-full mt-6 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] uppercase tracking-widest text-sm flex justify-center items-center gap-2">
              <PrintIcon />
              {t.print}
            </button>
          </div>

          {/* ========================================================= */}
          {/* KOLOM KANAN: PREVIEW KERTAS CV MULTI-TEMPLATE               */}
          {/* ========================================================= */}
          <div className="w-full xl:w-7/12 bg-[#0A1329]/50 p-4 sm:p-6 rounded-[2rem] overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full shadow-inner border border-white/5">
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
                    {/* TEMA 1: NORMAL (Standar ATS Huda Clone) */}
                    {template === 'normal' && (
                      <div className="pb-2 text-left">
                        <h1 className="text-[20pt] font-bold mb-1 tracking-tight capitalize leading-none text-black">{basics.name || t.placeholders.name.split(' (')[0]}</h1>
                        
                        <p className="text-[10.5pt] text-black flex flex-wrap gap-x-1.5 mt-1.5 mb-3">
                          {[basics.location, basics.phone, basics.email, basics.linkedin].filter(Boolean).join(' | ')}
                        </p>
                        
                        {basics.summary && <div className="text-[10.5pt] leading-[1.6] text-justify text-black mb-4 break-words">{basics.summary}</div>}
                      </div>
                    )}

                    {/* TEMA 2: MODERN PRO */}
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
                                <h3 className={`text-[10.5pt] text-black font-bold`}>{edu.institution}</h3>
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
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mt-1 text-[10.5pt] text-black">
                              {basics.skills.split(',').map((skill, i) => (
                                <div key={i} className="flex items-start">
                                  <span className="mr-2 font-bold">•</span>
                                  <span>{skill.trim()}</span>
                                </div>
                              ))}
                            </div>
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
                                <h3 className={`text-[10.5pt] text-black font-bold`}>{exp.company}</h3>
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
