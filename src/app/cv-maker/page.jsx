// ==========================================
// BAGIAN 1: IMPORTS, ICONS, & LOGIKA AI
// ==========================================
"use client";

import { useState, useRef } from 'react';

// --- KOMPONEN IKON ---
const SparklesIcon = ({ className = "w-4 h-4" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" /></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.524-4.31a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-1.895-3.32a.5.5 0 00-.5.5v2.25c0 .276.224.5.5.5h2.25a.5.5 0 00.5-.5v-2.25a.5.5 0 00-.5-.5h-2.25zM12 21.75c3.55 0 6.544-2.185 7.91-5.326m-15.82 0A8.966 8.966 0 0112 2.25a8.964 8.964 0 017.91 5.326m-15.82 0a8.964 8.964 0 00-7.91 5.326M12 21.75a8.965 8.965 0 007.91-5.326m0 0H21m-9 0v-4.5" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;

const LabeledInput = ({ label, helperText, children }) => (
  <div className="space-y-1 mb-4">
    <label className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest pl-1">{label}</label>
    {children}
    {helperText && <p className="text-[10px] text-slate-500 pl-1 mt-1">{helperText}</p>}
  </div>
);

// --- UTILITAS BACA FILE (PDF via CDN & Gambar via Base64) ---
const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const extractTextFromPDF = async (file) => {
  if (!window.pdfjsLib) {
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    fullText += textContent.items.map(s => s.str).join(' ') + '\n';
  }
  return fullText;
};

export default function CVMaker() {
  const [template, setTemplate] = useState('normal'); 
  const [lang, setLang] = useState('id'); 
  const [isTranslating, setIsTranslating] = useState(false);
  const [docMode, setDocMode] = useState('cv');
  const [careerLevel, setCareerLevel] = useState('experienced');
  const [activeTab, setActiveTab] = useState('personal');
  const [scale, setScale] = useState(1);
  
  // Fitur Tambahan Boomer/Awam
  const [showTutorial, setShowTutorial] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const fileInputRef = useRef(null);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // --- STATE FORMULIR UTAMA ---
  const [basics, setBasics] = useState({ 
    name: "", furigana: "", role: "", location: "", addressFurigana: "", phone: "", email: "", summary: "", skills: "",
    birthdate: "", age: "", gender: "男", nationality: "", visa: "", commuteTime: "", commuteMinute: "", dependents: "", spouse: "", spouseSupport: ""
  });
  const [profiles, setProfiles] = useState([{ id: 1, platform: "", url: "" }]);
  const [experiences, setExperiences] = useState([{ id: 1, role: "", company: "", period: "", description: "" }]);
  const [educations, setEducations] = useState([{ id: 1, institution: "", major: "", period: "", gpa: "" }]);
  const [projects, setProjects] = useState([{ id: 1, name: "", period: "", description: "" }]);
  const [certs, setCerts] = useState([{ id: 1, name: "", issuer: "", period: "", description: "" }]);

  const [clData, setClData] = useState({
    senderName: "", senderLocation: "", senderPhone: "", senderEmail: "",
    targetRole: "", relevantSkills: "", company: "", hr: "", date: getTodayDate(), body: ""
  });

  const handleBasicsChange = (e) => setBasics({ ...basics, [e.target.name]: e.target.value });
  const handleClChange = (e) => setClData({ ...clData, [e.target.name]: e.target.value });
  const handleArrayChange = (setter, state, index, field, value) => { const newState = [...state]; newState[index][field] = value; setter(newState); };
  const addField = (setter, state, emptyObj) => setter([...state, { id: Date.now(), ...emptyObj }]);
  const removeField = (setter, state, index) => setter(state.filter((_, i) => i !== index));

  // --- FUNGSI AUTO-FILL AI (Mengekstrak file upload via API Tegar) ---
  const handleMagicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsAiLoading(true);

    try {
      let messagesContent = [];
      
      if (file.type.startsWith('image/')) {
        const base64Img = await getBase64(file);
        messagesContent = [
          { type: "text", text: "Ekstrak teks dari gambar CV ini menjadi data terstruktur JSON." },
          { type: "image_url", image_url: { url: base64Img } }
        ];
      } else if (file.type === 'application/pdf') {
        const pdfText = await extractTextFromPDF(file);
        messagesContent = [{ type: "text", text: `Ekstrak data dari teks CV berikut ke JSON:\n\n${pdfText}` }];
      } else {
        alert('Format file belum didukung. Mohon gunakan PDF atau Gambar (JPG/PNG).');
        setIsAiLoading(false);
        return;
      }

      const response = await fetch('https://api-ai.tegarfirman.site/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-e0dde619-2dd3-4018-aad1-e7f602d58534`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Gunakan model vision jika memungkinkan
          messages: [
            {
              role: "system",
              content: `Kamu adalah asisten HRD untuk parsing CV. JANGAN membalas dengan markdown \`\`\`json. Balas HANYA dengan objek JSON murni dengan format persis seperti ini:
              {
                "basics": { "name": "", "role": "", "location": "", "phone": "", "email": "", "summary": "", "skills": "" },
                "experiences": [{ "company": "", "role": "", "period": "", "description": "" }],
                "educations": [{ "institution": "", "major": "", "period": "", "gpa": "" }],
                "projects": [{ "name": "", "period": "", "description": "" }],
                "certs": [{ "name": "", "issuer": "", "period": "", "description": "" }]
              }
              Gabungkan pengalaman/pendidikan jika banyak. Kosongkan string ("") jika tidak ada. Pisahkan skills dengan koma.`
            },
            {
              role: "user",
              content: messagesContent
            }
          ]
        })
      });

      const result = await response.json();
      let aiText = result.choices[0].message.content.trim();
      if(aiText.startsWith('```json')) aiText = aiText.replace(/```json/g, '').replace(/```/g, '');
      
      const parsedData = JSON.parse(aiText);

      if(parsedData.basics) setBasics(prev => ({...prev, ...parsedData.basics}));
      if(parsedData.experiences && parsedData.experiences.length > 0) setExperiences(parsedData.experiences.map((v, i) => ({id: Date.now()+i, ...v})));
      if(parsedData.educations && parsedData.educations.length > 0) setEducations(parsedData.educations.map((v, i) => ({id: Date.now()+i, ...v})));
      if(parsedData.projects && parsedData.projects.length > 0) setProjects(parsedData.projects.map((v, i) => ({id: Date.now()+i, ...v})));
      if(parsedData.certs && parsedData.certs.length > 0) setCerts(parsedData.certs.map((v, i) => ({id: Date.now()+i, ...v})));

      alert('Berhasil! Data CV Anda telah otomatis terisi di formulir. Silakan cek dan sesuaikan.');
    } catch (err) {
      console.error(err);
      alert('Maaf, AI gagal membaca file ini. Silakan coba lagi atau isi manual.');
    } finally {
      setIsAiLoading(false);
      e.target.value = ''; // reset input
    }
  };

  const generateCoverLetter = () => {
    // Sinkronisasi otomatis data basic ke Cover Letter
    setClData(prev => ({
        ...prev,
        senderName: prev.senderName || basics.name,
        senderLocation: prev.senderLocation || basics.location,
        senderPhone: prev.senderPhone || basics.phone,
        senderEmail: prev.senderEmail || basics.email,
        targetRole: prev.targetRole || basics.role
    }));

    const role = clData.targetRole || basics.role || '[Posisi yang Dilamar]';
    const company = clData.company || '[Nama Perusahaan]';
    const skills = clData.relevantSkills || basics.skills || '[Keahlian yang Relevan]';
    
    let text = `Berdasarkan informasi lowongan pekerjaan yang saya peroleh, saya bermaksud menyampaikan ketertarikan saya untuk melamar posisi ${role} di ${company}.\n\nDengan latar belakang dan keahlian saya di bidang ${skills}, serta pengalaman yang relevan, saya yakin dapat belajar dengan cepat dan berkontribusi secara positif bagi perusahaan Anda.\n\nBersama surat lamaran ini, saya lampirkan Curriculum Vitae (CV) sebagai bahan pertimbangan Bapak/Ibu untuk melihat riwayat pendidikan dan profesional saya. Saya sangat berharap dapat diberikan kesempatan wawancara agar saya bisa memperkenalkan diri lebih jauh.\n\nTerima kasih atas waktu dan perhatian yang Bapak/Ibu berikan.`;
    setClData(prev => ({ ...prev, body: text }));
  };

  const cvTabs = [
    { id: 'personal', label: '1. Personal' },
    ...(careerLevel === 'fresh' ? [{ id: 'edu', label: '2. Pendidikan' }, { id: 'exp', label: '3. Pengalaman' }] : [{ id: 'exp', label: '2. Pengalaman' }, { id: 'edu', label: '3. Pendidikan' }]),
    { id: 'proj', label: '4. Proyek' },
    { id: 'cert', label: '5. Sertif' }
  ];
  const currentTabIndex = cvTabs.findIndex(t => t.id === activeTab);
  const isJapanese = template === 'jp-umum' || template === 'jp-asing';

// === BAGIAN 1 SELESAI ===

// ==========================================
// BAGIAN 2: RENDER UI & MODAL PANDUAN
// ==========================================

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-[#060D1F] relative z-10 selection:bg-cyan-500 selection:text-white font-sans print:bg-white print:pt-0 print:pb-0 print:px-0 print:min-h-0">
      
      {/* --- MODAL PANDUAN BOOMER/AWAM --- */}
      {showTutorial && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#0A1329] border border-cyan-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-cyan-400">💡 Panduan Pemula (Cara Pakai)</h2>
              <button onClick={() => setShowTutorial(false)} className="text-slate-400 hover:text-white bg-white/5 p-2 rounded-full">Tutup ✖</button>
            </div>
            
            <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
              <div className="bg-[#060D1F] p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-white mb-2 text-lg">1. Apa itu CV ATS?</h3>
                <p>CV ATS (Applicant Tracking System) adalah standar resume internasional yang dibaca oleh robot HRD. Kami mengatur desainnya secara otomatis agar CV Anda: <b>Hitam Putih, Rapi, Bebas Grafik Aneh, dan Link Terbaca</b>.</p>
              </div>
              <div className="bg-[#060D1F] p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-emerald-400 mb-2 text-lg">2. Cara Kilat (Gunakan Magic Upload)</h3>
                <p>Sudah punya CV tapi formatnya berantakan? Atau punya file PDF/Gambar CV lama? Klik tombol <b>"✨ Auto-Fill dari CV Lama"</b> di panel sebelah kiri. Masukkan filenya, dan Robot AI kami akan membacanya dan memasukkan datanya ke formulir otomatis!</p>
              </div>
              <div className="bg-[#060D1F] p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-white mb-2 text-lg">3. Cara Manual</h3>
                <p>Isi data diri Anda di formulir sebelah kiri. Mulai dari Tab "Personal", klik "Selanjutnya", lalu isi "Pendidikan" hingga selesai. Anda bisa melihat hasilnya langsung di layar sebelah kanan.</p>
              </div>
              <div className="bg-[#060D1F] p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-blue-400 mb-2 text-lg">4. Buat Surat Lamaran Otomatis</h3>
                <p>Klik tombol <b>"Surat Lamaran" (Cover Letter)</b> di atas. Karena data Anda sudah tersimpan, Anda hanya perlu memasukkan nama perusahaan tujuan, klik tombol "Gunakan Template Standar", lalu cetak PDF.</p>
              </div>
            </div>
            
            <button onClick={() => setShowTutorial(false)} className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg uppercase tracking-widest">Saya Mengerti, Mulai Buat CV!</button>
          </div>
        </div>
      )}

      {/* --- CSS PRINT STANDAR ATS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 10mm; }
          html, body { background: white !important; color: black !important; margin: 0 !important; padding: 0 !important; height: auto !important; overflow: visible !important; }
          header, nav, footer, aside, iframe, .show-in-pwa, .mrr-navbar, .mrr-footer, button, a { display: none !important; }
          .no-print { display: none !important; }
          .min-h-screen, .max-w-\\[1400px\\], .xl\\:flex-row, .xl\\:w-7\\/12, #preview-container, .w-fit {
            display: block !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; position: static !important; background: transparent !important; border: none !important; box-shadow: none !important; transform: none !important; overflow: visible !important;
          }
          #cv-preview {
            display: block !important; width: 100% !important; max-width: 100% !important; min-width: 100% !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; border: none !important; page-break-after: auto;
          }
          .break-inside-avoid, h2, h3, tr { break-inside: avoid !important; page-break-inside: avoid !important; }
        }
      `}} />

      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 no-print animate-fade-in-up">
          <div className="flex justify-center gap-3 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <ShieldIcon /> 100% Aman. Data di-proses di Browser.
            </div>
            <button onClick={() => setShowTutorial(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 text-[10px] font-bold tracking-wide transition-colors">
              <BookOpenIcon /> Baca Panduan Pemula
            </button>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">ATS <span className="text-cyan-500">CV Maker</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Sistem canggih penyusun CV Ramah HRD & Surat Lamaran Otomatis. Tersedia fitur ekstraksi ajaib dari CV lama Anda.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* ========================================================= */}
          {/* PANEL KIRI: KONTROL & FORMULIR                              */}
          {/* ========================================================= */}
          <div className="w-full xl:w-5/12 bg-[#0A1329] border border-white/10 p-5 sm:p-6 rounded-[2rem] no-print xl:sticky xl:top-32 h-fit max-h-none xl:max-h-[80vh] overflow-visible xl:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full shadow-2xl">
            
            {/* TOGGLE DOKUMEN */}
            <div className="flex p-1 bg-[#060D1F] border border-cyan-500/30 rounded-xl mb-6 shadow-inner relative overflow-hidden">
              <button onClick={() => setDocMode('cv')} className={`flex-1 flex justify-center items-center gap-2 py-3 text-xs font-bold rounded-lg transition-all z-10 ${docMode === 'cv' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>CV Mode</button>
              <button onClick={() => setDocMode('cl')} className={`flex-1 flex justify-center items-center gap-2 py-3 text-xs font-bold rounded-lg transition-all z-10 ${docMode === 'cl' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>Surat Lamaran</button>
            </div>

            {/* PANEL SETTING GLOBAL */}
            <div className="mb-6 p-4 sm:p-5 bg-[#060D1F] border border-cyan-500/30 rounded-xl shadow-md">
              <h2 className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-3">1. Desain ATS Kertas</h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button onClick={() => {setTemplate('normal'); setLang('id');}} className={`py-2 text-[10px] sm:text-[11px] font-bold rounded border transition-all ${template === 'normal' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400'}`}>1. ATS Standar</button>
                <button onClick={() => {setTemplate('modern'); setLang('id');}} className={`py-2 text-[10px] sm:text-[11px] font-bold rounded border transition-all ${template === 'modern' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400'}`}>2. ATS Modern</button>
                <button onClick={() => {setTemplate('harvard'); setLang('id');}} className={`py-2 text-[10px] sm:text-[11px] font-bold rounded border transition-all ${template === 'harvard' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400'}`}>3. Harvard Serif</button>
                <button onClick={() => {setTemplate('executive'); setLang('id');}} className={`py-2 text-[10px] sm:text-[11px] font-bold rounded border transition-all ${template === 'executive' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400'}`}>4. Tech Exec</button>
              </div>

              {!isJapanese && docMode === 'cv' && (
                <>
                  <h2 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2 border-t border-white/10 pt-4">2. Tipe Pelamar (Urutan Kertas)</h2>
                  <div className="flex bg-[#0A1329] rounded border border-white/10 overflow-hidden shadow-inner">
                    <button onClick={() => setCareerLevel('fresh')} className={`flex-1 px-2 py-2 text-[10px] sm:text-[11px] font-bold transition-colors ${careerLevel === 'fresh' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>Fresh Grad</button>
                    <button onClick={() => setCareerLevel('experienced')} className={`flex-1 px-2 py-2 text-[10px] sm:text-[11px] font-bold transition-colors ${careerLevel === 'experienced' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>Berpengalaman</button>
                  </div>
                </>
              )}
            </div>

            {/* TAB FORMULIR UTAMA */}
            {docMode === 'cv' && (
              <div className="animate-fade-in-up">
                
                {/* TOMBOL MAGIC UPLOAD CV LAMA */}
                <div className="mb-5 p-4 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-900/10 relative overflow-hidden flex flex-col items-center justify-center text-center">
                  {isAiLoading ? (
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs"><SparklesIcon className="w-4 h-4 animate-spin"/> Robot AI sedang menyalin CV Anda...</div>
                  ) : (
                    <>
                      <UploadIcon />
                      <h3 className="text-xs font-bold text-cyan-400 mt-2 mb-1">✨ Auto-Fill dari CV Lama</h3>
                      <p className="text-[10px] text-slate-400 mb-3">Upload PDF atau Gambar CV lama. AI akan merapikannya.</p>
                      <input type="file" accept=".pdf,image/png,image/jpeg,image/jpg" onChange={handleMagicUpload} ref={fileInputRef} className="hidden" />
                      <button onClick={() => fileInputRef.current.click()} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-md transition-all">Pilih File CV Lama</button>
                    </>
                  )}
                </div>

                <div className="flex overflow-x-auto gap-2 mb-6 pb-2 border-b border-white/10 sticky top-0 bg-[#0A1329] z-20 pt-1 [&::-webkit-scrollbar]:h-1">
                  {cvTabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`shrink-0 px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-[#060D1F] text-slate-500 border border-white/5'}`}>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* FORM: PERSONAL */}
                {activeTab === 'personal' && (
                  <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <LabeledInput label="Nama Lengkap"><input type="text" name="name" value={basics.name} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Cth: Budi Santoso" /></LabeledInput>
                    <LabeledInput label="Posisi Pekerjaan"><input type="text" name="role" value={basics.role} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Cth: Data Analyst" /></LabeledInput>
                    <div className="grid grid-cols-2 gap-3">
                      <LabeledInput label="Lokasi / Kota"><input type="text" name="location" value={basics.location} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Cth: Jakarta" /></LabeledInput>
                      <LabeledInput label="Nomor Telepon"><input type="text" name="phone" value={basics.phone} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="0812-xxx" /></LabeledInput>
                    </div>
                    <LabeledInput label="Alamat Email"><input type="email" name="email" value={basics.email} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="email@anda.com" /></LabeledInput>
                    <LabeledInput label="Profil Singkat" helperText="Ceritakan 2-3 kalimat kelebihan & motivasi kerja."><textarea name="summary" value={basics.summary} onChange={handleBasicsChange} rows="3" className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Saya adalah seorang profesional yang..."></textarea></LabeledInput>
                    <LabeledInput label="Keahlian (Skills)" helperText="Pisahkan dengan koma. Cth: MS Excel, Leadership."><textarea name="skills" value={basics.skills} onChange={handleBasicsChange} rows="2" className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="HTML, Komunikasi, MS Word"></textarea></LabeledInput>
                  </div>
                )}

                {/* FORM: PENDIDIKAN */}
                {activeTab === 'edu' && (
                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                      <h2 className="text-sm font-bold text-cyan-400">Riwayat Pendidikan</h2>
                      <button onClick={() => addField(setEducations, educations, { institution: "", major: "", period: "", gpa: "" })} className="text-[10px] bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded">+ Tambah</button>
                    </div>
                    {educations.map((edu, index) => (
                      <div key={edu.id} className="bg-[#060D1F] p-4 rounded-xl mb-4 relative border border-white/10">
                        <button onClick={() => removeField(setEducations, educations, index)} className="absolute top-2 right-2 text-red-400 text-[10px] bg-red-500/10 px-2 py-1 rounded">Hapus</button>
                        <input type="text" value={edu.institution} onChange={(e) => handleArrayChange(setEducations, educations, index, 'institution', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2 font-bold" placeholder="Nama Kampus/Sekolah" />
                        <input type="text" value={edu.major} onChange={(e) => handleArrayChange(setEducations, educations, index, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2" placeholder="Jurusan (Cth: S1 Manajemen)" />
                        <div className="grid grid-cols-2 gap-3 mt-1">
                          <input type="text" value={edu.period} onChange={(e) => handleArrayChange(setEducations, educations, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Tahun (Cth: 2018 - 2022)" />
                          <input type="text" value={edu.gpa} onChange={(e) => handleArrayChange(setEducations, educations, index, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="IPK/Nilai (Opsional)" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* FORM: PENGALAMAN */}
                {activeTab === 'exp' && (
                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                      <h2 className="text-sm font-bold text-cyan-400">Pengalaman Kerja</h2>
                      <button onClick={() => addField(setExperiences, experiences, { role: "", company: "", period: "", description: "" })} className="text-[10px] bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded">+ Tambah</button>
                    </div>
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className="bg-[#060D1F] p-4 rounded-xl mb-4 relative border border-white/10">
                        <button onClick={() => removeField(setExperiences, experiences, index)} className="absolute top-2 right-2 text-red-400 text-[10px] bg-red-500/10 px-2 py-1 rounded">Hapus</button>
                        <input type="text" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'company', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2 font-bold" placeholder="Nama Perusahaan" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                           <input type="text" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Jabatan (Cth: Staff Admin)" />
                           <input type="text" value={exp.period} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Tahun (Cth: Jan 2021 - Des 2023)" />
                        </div>
                        <textarea value={exp.description} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'description', e.target.value)} rows="3" className="w-full mt-2 bg-[#0A1329] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-cyan-500 outline-none" placeholder="- Tulis poin deskripsi kerja di sini.&#10;- Awali dengan tanda strip (-)"></textarea>
                      </div>
                    ))}
                  </div>
                )}

                {/* FORM: PROYEK */}
                {activeTab === 'proj' && (
                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                      <h2 className="text-sm font-bold text-cyan-400">Proyek / Organisasi</h2>
                      <button onClick={() => addField(setProjects, projects, { name: "", period: "", description: "" })} className="text-[10px] bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded">+ Tambah</button>
                    </div>
                    {projects.map((proj, index) => (
                      <div key={proj.id} className="bg-[#060D1F] p-4 rounded-xl mb-4 relative border border-white/10">
                        <button onClick={() => removeField(setProjects, projects, index)} className="absolute top-2 right-2 text-red-400 text-[10px] bg-red-500/10 px-2 py-1 rounded">Hapus</button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2 mt-3">
                           <input type="text" value={proj.name} onChange={(e) => handleArrayChange(setProjects, projects, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none font-bold" placeholder="Nama Proyek / Kepanitiaan" />
                           <input type="text" value={proj.period} onChange={(e) => handleArrayChange(setProjects, projects, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Tahun Pelaksanaan" />
                        </div>
                        <textarea value={proj.description} onChange={(e) => handleArrayChange(setProjects, projects, index, 'description', e.target.value)} rows="2" className="w-full mt-2 bg-[#0A1329] border border-white/10 rounded-lg p-2.5 text-white text-sm focus:border-cyan-500 outline-none" placeholder="- Jelaskan peran Anda di sini."></textarea>
                      </div>
                    ))}
                  </div>
                )}

                {/* FORM: SERTIFIKASI */}
                {activeTab === 'cert' && (
                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                      <h2 className="text-sm font-bold text-cyan-400">Sertifikasi & Kursus</h2>
                      <button onClick={() => addField(setCerts, certs, { name: "", issuer: "", period: "", description: "" })} className="text-[10px] bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded">+ Tambah</button>
                    </div>
                    {certs.map((cert, index) => (
                      <div key={cert.id} className="bg-[#060D1F] p-4 rounded-xl mb-4 relative border border-white/10">
                        <button onClick={() => removeField(setCerts, certs, index)} className="absolute top-2 right-2 text-red-400 text-[10px] bg-red-500/10 px-2 py-1 rounded">Hapus</button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2 mt-3">
                           <input type="text" value={cert.name} onChange={(e) => handleArrayChange(setCerts, certs, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none font-bold" placeholder="Nama Sertifikasi" />
                           <input type="text" value={cert.period} onChange={(e) => handleArrayChange(setCerts, certs, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Tahun Lulus" />
                        </div>
                        <input type="text" value={cert.issuer} onChange={(e) => handleArrayChange(setCerts, certs, index, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2" placeholder="Penyelenggara (Cth: Google, BLK)" />
                      </div>
                    ))}
                  </div>
                )}

                {/* NAVIGASI TAB BAWAH */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                   <button onClick={() => currentTabIndex > 0 && setActiveTab(cvTabs[currentTabIndex - 1].id)} className={`px-4 py-2 text-[10px] font-bold rounded transition-colors border border-white/10 ${currentTabIndex > 0 ? 'bg-white/5 hover:bg-white/10 text-white' : 'opacity-50 text-slate-500 cursor-not-allowed'}`}>&laquo; Kembali</button>
                   {currentTabIndex < cvTabs.length - 1 ? (
                      <button onClick={() => setActiveTab(cvTabs[currentTabIndex + 1].id)} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold rounded shadow-lg uppercase">Selanjutnya &raquo;</button>
                   ) : (
                      <button onClick={() => window.print()} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded shadow-lg uppercase flex items-center gap-1"><PrintIcon /> Cetak PDF</button>
                   )}
                </div>
              </div>
            )}

            {/* FORM COVER LETTER (SURAT LAMARAN) */}
            {docMode === 'cl' && (
              <div className="animate-fade-in-up space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                  <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-cyan-500/20 pb-2">Destinasi Surat</h3>
                  <LabeledInput label="Perusahaan Tujuan"><input type="text" name="company" value={clData.company} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/10 p-2 rounded text-white text-sm focus:border-cyan-500 outline-none" placeholder="PT Nama Perusahaan"/></LabeledInput>
                  <LabeledInput label="Posisi yang Dilamar (Ambil dari CV)"><input type="text" name="targetRole" value={clData.targetRole || basics.role} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/10 p-2 rounded text-white text-sm focus:border-cyan-500 outline-none" placeholder="Cth: Staff Administrasi"/></LabeledInput>
                  <LabeledInput label="Nama Penerima (Opsional)"><input type="text" name="hr" value={clData.hr} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/10 p-2 rounded text-white text-sm focus:border-cyan-500 outline-none" placeholder="Bapak/Ibu HRD"/></LabeledInput>
                </div>
                
                <button onClick={generateCoverLetter} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                  <MagicPenIcon /> Buatkan Surat Otomatis
                </button>
                
                <textarea name="body" value={clData.body} onChange={handleClChange} rows="10" className="w-full bg-[#0A1329] border border-white/10 p-4 rounded-xl text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder='Ketuk tombol di atas agar AI merangkai surat lamaran sesuai profil CV Anda...'></textarea>
                
                <button onClick={() => window.print()} className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg uppercase tracking-widest text-xs flex justify-center items-center gap-2">
                  <PrintIcon /> Cetak PDF Surat
                </button>
              </div>
            )}
          </div>

// === BAGIAN 2 SELESAI ===

// ==========================================
// BAGIAN 3: KERTAS PREVIEW & RENDERER ATS
// ==========================================

          {/* PANEL KANAN: PREVIEW KERTAS CETAK */}
          <div id="preview-container" className="w-full xl:w-7/12 bg-[#0A1329]/50 p-4 sm:p-6 rounded-[2rem] overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full shadow-inner border border-white/5 relative print-container">
            
            <div className="sticky top-0 z-40 bg-[#0A1329]/90 backdrop-blur-md p-3 border border-white/10 rounded-xl mb-4 flex justify-between items-center shadow-lg no-print w-fit min-w-[21cm] mx-auto">
              <div className="flex items-center gap-3">
                <ZoomInIcon />
                <input type="range" min="0.4" max="1.5" step="0.05" value={scale} onChange={(e) => setScale(e.target.value)} className="w-24 sm:w-32 accent-cyan-500 cursor-pointer" />
                <span className="text-[10px] font-bold text-cyan-400 w-8">{Math.round(scale * 100)}%</span>
              </div>
            </div>

            <div className="w-fit mx-auto relative print-container" style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.1s ease' }}>
              <div id="cv-preview" className={`w-[21cm] min-w-[21cm] min-h-[29.7cm] bg-white text-black py-10 px-12 sm:px-14 shadow-2xl shrink-0 border border-gray-200 
                ${template === 'normal' ? 'font-[Arial,Helvetica,sans-serif]' : template === 'harvard' || isJapanese ? 'font-serif' : 'font-sans'}`}>
                
                {docMode === 'cl' ? (
                  // --- RENDER SURAT LAMARAN (COVER LETTER) ---
                  <div className="w-full text-black flex flex-col min-h-[25cm] text-[11pt] font-sans leading-relaxed">
                    <div className="mb-8 leading-snug">
                      <div className="font-bold text-[12pt] text-black tracking-wide">{clData.senderName || basics.name || <span className="text-gray-400 font-normal">[Nama Lengkap Anda]</span>}</div>
                      <div>{clData.senderLocation || basics.location || <span className="text-gray-400">[Kota, Provinsi]</span>}</div>
                      <div>{clData.senderPhone || basics.phone || <span className="text-gray-400">[Nomor Telepon]</span>}</div>
                      <div>{clData.senderEmail || basics.email || <span className="text-gray-400">[Alamat Email]</span>}</div>
                    </div>
                    <div className="mb-8 text-black">{formatVisualDate(clData.date, lang)}</div>
                    <div className="mb-8 leading-snug text-black">
                      <div>Kepada Yth.</div>
                      <div className="font-bold">{clData.hr || <span className="text-gray-400 font-normal">[Bapak/Ibu HRD]</span>}</div>
                      <div className="font-bold text-[11.5pt]">{clData.company || <span className="text-gray-400 font-normal">[Nama Perusahaan]</span>}</div>
                    </div>
                    <div className="mb-4 text-black">Dengan hormat,</div>
                    <div className="whitespace-pre-wrap text-justify break-words min-h-[150px] text-black">
                      {clData.body || <span className="text-gray-400 italic">(Isi surat masih kosong. Silakan gunakan tombol "Buatkan Surat Otomatis" di menu kiri)</span>}
                    </div>
                    <div className="mt-12 text-black">Hormat saya,<br/><br/><br/><br/><span className="font-bold border-b border-black pb-0.5">{clData.senderName || basics.name || <span className="text-gray-400 font-normal border-none">[Nama Anda]</span>}</span></div>
                  </div>
                ) : (
                  // --- RENDER CV UTAMA ---
                  <>
                    {(() => {
                      const cList = [{ v: basics.location, p: "Kota, Provinsi" }, { v: basics.phone, p: "0812-3456-7890" }, { v: basics.email, p: "email@anda.com" }].filter(Boolean);
                      
                      // FIX: STANDAR ATS LINK HITAM UNDERLINE
                      const renderContact = (sep) => (
                        <>
                          {cList.map((item, i) => (
                            <span key={i} className="whitespace-nowrap text-black">
                              {item.v || <span className="text-gray-400">{item.p}</span>}
                              {(i < cList.length - 1 || profiles.length > 0) && <span className="mx-1.5 font-bold">{sep}</span>}
                            </span>
                          ))}
                          {profiles.map((prof, i) => {
                            if (!prof.url && !prof.platform) return null;
                            const linkText = prof.platform ? `${prof.platform}: ${prof.url}` : prof.url;
                            return (
                              <span key={`p-${i}`} className="whitespace-nowrap">
                                <a href={`https://${prof.url.replace(/^https?:\/\//, '')}`} className="text-black font-medium underline underline-offset-2" style={{textDecorationColor: '#475569'}} target="_blank" rel="noopener noreferrer">{linkText}</a>
                                {i < profiles.length - 1 && <span className="mx-1.5 text-black font-bold">{sep}</span>}
                              </span>
                            );
                          })}
                        </>
                      );

                      return (
                        <>
                          {/* HEADER CV */}
                          <div className="pb-2 text-left">
                            <h1 className="text-[20pt] font-bold mb-1 tracking-tight capitalize leading-none text-black">
                              {basics.name || <span className="text-gray-400">NAMA LENGKAP ANDA</span>}
                            </h1>
                            {template === 'modern' && <h2 className="text-[13pt] font-bold text-gray-700 uppercase tracking-wide mb-1">{basics.role || 'POSISI PEKERJAAN'}</h2>}
                            <p className="text-[10.5pt] flex flex-wrap mt-1.5 mb-3 text-black">
                              {renderContact(template === 'normal' ? '|' : '•')}
                            </p>
                            <div className={`text-[10.5pt] leading-[1.6] text-justify mb-4 break-words ${basics.summary ? 'text-black' : 'text-gray-400'}`}>
                              {basics.summary || "Profil ringkas Anda akan muncul di sini. Tulis deskripsi padat tentang pengalaman dan kelebihan Anda..."}
                            </div>
                          </div>

                          {/* FUNGSI RENDER BODY ATS */}
                          {(() => {
                            const formatDesc = (t, isPh) => t ? t.split('\n').map((l, i) => { 
                              const isBul = l.trim().startsWith('-'); 
                              return <div key={i} className={`flex ${isBul ? 'mt-1' : ''}`}><span className={`${isBul?'mr-2 font-bold':'hidden'}`}>•</span><span className={`text-[10.5pt] leading-[1.5] text-justify flex-1 ${isPh?'text-gray-400':'text-black'}`}>{isBul ? l.replace(/^-/, '').trim() : l}</span></div>; 
                            }) : null;

                            const SecTitle = ({ txt }) => <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-2.5 pb-0.5 text-black tracking-wide mt-5">{txt}</h2>;
                            
                            const validObj = (arr, fields) => arr.filter(item => fields.some(f => item[f] && item[f].trim() !== ''));

                            const vEdu = validObj(educations, ['institution', 'major']);
                            const vExp = validObj(experiences, ['company', 'role']);
                            const vPrj = validObj(projects, ['name', 'description']);
                            const vCrt = validObj(certs, ['name', 'issuer']);

                            const R_Edu = () => vEdu.length > 0 || educations.length===1 ? <div className="mb-3"><SecTitle txt="PENDIDIKAN" />{(vEdu.length > 0 ? vEdu : [{institution: "Nama Kampus", major: "Jurusan", period: "Tahun", isPh: true}]).map((e, i) => <div key={i} className="mb-2.5 break-inside-avoid"><div className="flex justify-between"><h3 className={`text-[10.5pt] font-bold ${e.isPh?'text-gray-400':'text-black'}`}>{e.institution}</h3><span className={`text-[10.5pt] whitespace-nowrap ${e.isPh?'text-gray-400':'text-black'}`}>{e.period}</span></div><div className="flex justify-between"><div className={`text-[10.5pt] ${e.isPh?'text-gray-400':'text-black'}`}>{e.major}</div>{e.gpa && <div className="text-[10.5pt] text-black">IPK: {e.gpa}</div>}</div></div>)}</div> : null;
                            
                            const R_Exp = () => vExp.length > 0 || experiences.length===1 ? <div className="mb-3"><SecTitle txt="PENGALAMAN KERJA" />{(vExp.length > 0 ? vExp : [{company: "Nama Perusahaan", role: "Posisi Kerja", period: "Tahun", description: "- Detail kerja", isPh: true}]).map((e, i) => <div key={i} className="mb-3.5 break-inside-avoid"><div className="flex justify-between"><h3 className={`text-[10.5pt] font-bold ${e.isPh?'text-gray-400':'text-black'}`}>{e.company}</h3><span className={`text-[10.5pt] whitespace-nowrap ${e.isPh?'text-gray-400':'text-black'}`}>{e.period}</span></div><div className={`text-[10.5pt] font-bold mb-1 ${e.isPh?'text-gray-400':'text-gray-800'}`}>{e.role}</div><div>{formatDesc(e.description, e.isPh)}</div></div>)}</div> : null;
                            
                            const R_Prj = () => vPrj.length > 0 ? <div className="mb-3"><SecTitle txt="PROYEK / ORGANISASI" />{vPrj.map((p, i) => <div key={i} className="mb-3.5 break-inside-avoid"><div className="flex justify-between"><h3 className="text-[10.5pt] font-bold text-black">{p.name}</h3><span className="text-[10.5pt] whitespace-nowrap text-black">{p.period}</span></div><div className="mt-1">{formatDesc(p.description)}</div></div>)}</div> : null;
                            
                            const R_Skl = () => basics.skills ? <div className="mb-3 break-inside-avoid"><SecTitle txt="KEAHLIAN" /><div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mt-1 text-[10.5pt] text-black">{basics.skills.split(',').map((s, i) => <div key={i} className="flex items-start text-black"><span className="mr-2 font-bold">•</span><span>{s.trim()}</span></div>)}</div></div> : null;
                            
                            const R_Crt = () => vCrt.length > 0 ? <div className="mb-3"><SecTitle txt="SERTIFIKASI" />{vCrt.map((c, i) => <div key={i} className="mb-3.5 break-inside-avoid"><div className="flex justify-between"><h3 className="text-[10.5pt] font-bold text-black">{c.name}</h3><span className="text-[10.5pt] whitespace-nowrap text-black">{c.period}</span></div><div className="text-[10.5pt] italic mb-1 text-black">{c.issuer}</div><div>{formatDesc(c.description)}</div></div>)}</div> : null;

                            // URUTAN OTOMATIS: FRESH GRAD VS EXPERIENCED
                            return careerLevel === 'fresh' 
                               ? <><R_Edu/><R_Exp/><R_Prj/><R_Skl/><R_Crt/></> 
                               : <><R_Exp/><R_Edu/><R_Skl/><R_Prj/><R_Crt/></>;
                          })()}
                        </>
                      );
                    })()}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// === BAGIAN 3 SELESAI ===
