"use client";

import { useState, useRef } from 'react';

// =========================================================================
// 1. KOMPONEN IKON SVG (BEBAS EMOJI & PROFESIONAL)
// =========================================================================
const SparklesIcon = ({ className = "w-4 h-4" }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.524-4.31a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-1.895-3.32a.5.5 0 00-.5.5v2.25c0 .276.224.5.5.5h2.25a.5.5 0 00.5-.5v-2.25a.5.5 0 00-.5-.5h-2.25zM12 21.75c3.55 0 6.544-2.185 7.91-5.326m-15.82 0A8.966 8.966 0 0112 2.25a8.964 8.964 0 017.91 5.326m-15.82 0a8.964 8.964 0 00-7.91 5.326M12 21.75a8.965 8.965 0 007.91-5.326m0 0H21m-9 0v-4.5" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const MagicPenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>;
const ZoomInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;

const LabeledInput = ({ label, helperText, children }) => (
  <div className="space-y-1 mb-4">
    <label className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest pl-1">{label}</label>
    {children}
    {helperText && <p className="text-[10px] text-slate-500 pl-1 mt-1">{helperText}</p>}
  </div>
);

// =========================================================================
// 2. UTILITAS PARSING BROWSER (PDF, DOCX, IMAGE) TANPA BACKEND
// =========================================================================
const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const loadScript = (src) => new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"]`)) return resolve();
  const script = document.createElement('script');
  script.src = src;
  script.onload = resolve;
  script.onerror = reject;
  document.head.appendChild(script);
});

const extractTextFromPDF = async (file) => {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js');
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
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

const extractTextFromDocx = async (file) => {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js');
  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

// =========================================================================
// 3. KOMPONEN UTAMA
// =========================================================================
export default function CVMaker() {
  const [template, setTemplate] = useState('normal'); 
  const [lang, setLang] = useState('id'); 
  const [isTranslating, setIsTranslating] = useState(false);
  const [docMode, setDocMode] = useState('cv');
  const [careerLevel, setCareerLevel] = useState('experienced');
  const [activeTab, setActiveTab] = useState('personal');
  const [scale, setScale] = useState(1);
  
  // Fitur Baru: Tutorial & Loading AI
  const [showTutorial, setShowTutorial] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const fileInputRef = useRef(null);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const formatVisualDate = (dateStr, currentLang) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    if (currentLang === 'id') return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    if (currentLang === 'en') return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if (currentLang === 'jp') return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    return dateStr;
  };

  // State CV
  const [basics, setBasics] = useState({ 
    name: "", furigana: "", role: "", location: "", addressFurigana: "", phone: "", email: "", summary: "", skills: "",
    birthdate: "", age: "", gender: "男", nationality: "", visa: "", commuteTime: "", commuteMinute: "", dependents: "", spouse: "", spouseSupport: ""
  });
  const [profiles, setProfiles] = useState([{ id: 1, platform: "", url: "" }]);
  const [experiences, setExperiences] = useState([{ id: 1, role: "", company: "", period: "", description: "" }]);
  const [educations, setEducations] = useState([{ id: 1, institution: "", major: "", period: "", gpa: "" }]);
  const [projects, setProjects] = useState([{ id: 1, name: "", period: "", description: "" }]);
  const [certs, setCerts] = useState([{ id: 1, name: "", issuer: "", period: "", description: "" }]);

  // State Cover Letter
  const [clData, setClData] = useState({
    senderName: "", senderLocation: "", senderPhone: "", senderEmail: "",
    targetRole: "", relevantSkills: "", company: "", hr: "", date: getTodayDate(), body: ""
  });

  const handleBasicsChange = (e) => setBasics({ ...basics, [e.target.name]: e.target.value });
  const handleClChange = (e) => setClData({ ...clData, [e.target.name]: e.target.value });
  const handleArrayChange = (setter, state, index, field, value) => { const newState = [...state]; newState[index][field] = value; setter(newState); };
  const addField = (setter, state, emptyObj) => setter([...state, { id: Date.now(), ...emptyObj }]);
  const removeField = (setter, state, index) => setter(state.filter((_, i) => i !== index));

  // =========================================================================
  // 4. FUNGSI MAGIC UPLOAD (AI EKSTRAKSI CV LAMA)
  // =========================================================================
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
      } else if (file.name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const docxText = await extractTextFromDocx(file);
        messagesContent = [{ type: "text", text: `Ekstrak data dari teks CV berikut ke JSON:\n\n${docxText}` }];
      } else {
        alert('Format file belum didukung. Mohon gunakan PDF, DOCX, atau Gambar (JPG/PNG).');
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
          model: "gpt-4o-mini", // Gunakan model vision jika mendukung gambar, atau default model text
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

      // Set data hasil ekstraksi ke state
      if(parsedData.basics) setBasics(prev => ({...prev, ...parsedData.basics}));
      if(parsedData.experiences && parsedData.experiences.length > 0) setExperiences(parsedData.experiences.map((v, i) => ({id: Date.now()+i, ...v})));
      if(parsedData.educations && parsedData.educations.length > 0) setEducations(parsedData.educations.map((v, i) => ({id: Date.now()+i, ...v})));
      if(parsedData.projects && parsedData.projects.length > 0) setProjects(parsedData.projects.map((v, i) => ({id: Date.now()+i, ...v})));
      if(parsedData.certs && parsedData.certs.length > 0) setCerts(parsedData.certs.map((v, i) => ({id: Date.now()+i, ...v})));

      alert('Berhasil! Data CV Anda telah otomatis terisi di formulir. Silakan cek dan sesuaikan.');
    } catch (err) {
      console.error(err);
      alert('Maaf, AI gagal membaca file ini. Silakan coba format lain atau isi manual.');
    } finally {
      setIsAiLoading(false);
      e.target.value = ''; // reset input file
    }
  };

  // =========================================================================
  // 5. FUNGSI GENERATE COVER LETTER (SINKRONISASI DATA)
  // =========================================================================
  const generateCoverLetter = () => {
    // Auto-sync data dari CV ke Surat Lamaran agar tidak ngetik dua kali
    const syncedName = clData.senderName || basics.name;
    const syncedLoc = clData.senderLocation || basics.location;
    const syncedPhone = clData.senderPhone || basics.phone;
    const syncedEmail = clData.senderEmail || basics.email;
    const syncedTargetRole = clData.targetRole || basics.role;
    const syncedSkills = clData.relevantSkills || basics.skills;

    setClData(prev => ({
        ...prev,
        senderName: syncedName,
        senderLocation: syncedLoc,
        senderPhone: syncedPhone,
        senderEmail: syncedEmail,
        targetRole: syncedTargetRole,
        relevantSkills: syncedSkills
    }));

    const role = syncedTargetRole || (lang === 'en' ? '[Targeted Role]' : lang === 'jp' ? '[希望職種]' : '[Posisi yang Dilamar]');
    const company = clData.company || (lang === 'en' ? '[Company Name]' : lang === 'jp' ? '[貴社]' : '[Nama Perusahaan]');
    const skills = syncedSkills || (lang === 'en' ? '[Relevant Skills]' : lang === 'jp' ? '[スキル]' : '[Keahlian yang Relevan]');
    
    let text = "";
    if (lang === 'id') {
      text = `Berdasarkan informasi lowongan pekerjaan yang saya peroleh, saya bermaksud menyampaikan ketertarikan saya untuk melamar posisi ${role} di ${company}.\n\nDengan latar belakang dan keahlian saya di bidang ${skills}, serta pengalaman yang relevan, saya yakin dapat belajar dengan cepat dan berkontribusi secara positif bagi perusahaan Anda.\n\nBersama surat lamaran ini, saya lampirkan Curriculum Vitae (CV) sebagai bahan pertimbangan Bapak/Ibu untuk melihat riwayat pendidikan dan profesional saya. Saya sangat berharap dapat diberikan kesempatan wawancara agar saya bisa memperkenalkan diri lebih jauh.\n\nTerima kasih atas waktu dan perhatian yang Bapak/Ibu berikan.`;
    } else if (lang === 'en') {
      text = `Please accept this letter as an expression of my strong interest in the ${role} position at ${company}.\n\nWith my background and proven expertise in ${skills}, along with my relevant professional experience, I am confident in my ability to make an immediate and positive impact on your operations.\n\nI have attached my resume for your review, which further details my career achievements and qualifications. I would welcome the opportunity to discuss how my skill set aligns with the needs of your organization in an interview.\n\nThank you very much for your time, consideration, and forthcoming response.`;
    } else if (lang === 'jp') {
      text = `貴社益々ご清栄のこととお慶び申し上げます。\n\nこの度、貴社の求人（${role}）を拝見し、私の${skills}のスキルとこれまでの経験が貴社の事業に貢献できると確信し、応募いたしました。\n\n同封いたしました履歴書および職務経歴書をご査収くださいますようお願い申し上げます。\n面接の機会をいただけますと幸甚に存じます。\n\n何卒ご検討のほど、よろしくお願い申し上げます。`;
    }
    
    setClData(prev => ({ ...prev, body: text }));
  };

// ==========================================
// BAGIAN 2: RENDER UI & MODAL PANDUAN
// ==========================================

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-[#060D1F] relative z-10 selection:bg-cyan-500 selection:text-white font-sans print:bg-white print:pt-0 print:pb-0 print:px-0 print:min-h-0">
      
      {/* --- MODAL PANDUAN PEMULA (BOOMER FRIENDLY) --- */}
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
                <p>CV ATS adalah resume standar internasional yang dirancang agar mudah dibaca oleh sistem komputer perusahaan (HRD). Kami mengatur desainnya secara otomatis: <b>Teks Hitam Putih, Rapi, Tanpa Grafik Aneh, dan Link Aktif</b>.</p>
              </div>
              <div className="bg-[#060D1F] p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-emerald-400 mb-2 text-lg">2. Cara Cepat: Gunakan Tombol Ajaib</h3>
                <p>Punya CV lama? Klik tombol <b>"✨ Auto-Fill dari CV Lama"</b>. Masukkan file PDF atau gambarnya, lalu AI kami akan otomatis memindahkan isinya ke dalam formulir ini. Anda tidak perlu mengetik ulang semuanya!</p>
              </div>
              <div className="bg-[#060D1F] p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-white mb-2 text-lg">3. Cara Manual</h3>
                <p>Isi data Anda di formulir sebelah kiri. Mulai dari Tab "Personal", klik tombol "Selanjutnya" di bawah untuk mengisi Pendidikan, Pengalaman, dan seterusnya.</p>
              </div>
              <div className="bg-[#060D1F] p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-blue-400 mb-2 text-lg">4. Cetak ke PDF</h3>
                <p>Setelah selesai, klik tombol <b>"Cetak ke PDF"</b>. Gunakan kertas ukuran A4 saat menyimpan. Hasilnya langsung siap dikirim ke HRD!</p>
              </div>
            </div>
            
            <button onClick={() => setShowTutorial(false)} className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg uppercase tracking-widest">Saya Mengerti, Mulai!</button>
          </div>
        </div>
      )}

      {/* --- PENGATURAN CETAK (MATIKAN SEMUA UI WEB SAAT PRINT) --- */}
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
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <ShieldIcon /> Data Aman & Diproses di Browser
            </div>
            <button onClick={() => setShowTutorial(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 text-[10px] font-bold tracking-wide transition-colors">
              <BookOpenIcon /> Baca Panduan Pemula
            </button>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">ATS <span className="text-cyan-500">CV Maker</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Buat resume standar HRD global secara otomatis. Masukkan CV lama Anda dan biarkan AI kami menyusunnya kembali dengan sempurna.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* KOLOM KIRI: KONTROL FORMULIR */}
          <div className="w-full xl:w-5/12 bg-[#0A1329] border border-white/10 p-5 sm:p-6 rounded-[2rem] no-print xl:sticky xl:top-32 h-fit max-h-none xl:max-h-[80vh] overflow-visible xl:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 shadow-2xl">
            
            {/* GANTI MODE: CV / SURAT LAMARAN */}
            <div className="flex p-1 bg-[#060D1F] border border-cyan-500/30 rounded-xl mb-6 shadow-inner relative overflow-hidden">
              <button onClick={() => setDocMode('cv')} className={`flex-1 flex justify-center items-center gap-2 py-3 text-xs font-bold rounded-lg transition-all z-10 ${docMode === 'cv' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>CV Mode</button>
              <button onClick={() => setDocMode('cl')} className={`flex-1 flex justify-center items-center gap-2 py-3 text-xs font-bold rounded-lg transition-all z-10 ${docMode === 'cl' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>Surat Lamaran</button>
            </div>

            {/* PENGATURAN GLOBAL */}
            <div className="mb-6 p-4 sm:p-5 bg-[#060D1F] border border-cyan-500/30 rounded-xl shadow-md">
              <h2 className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-3">1. Pilih Desain ATS</h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button onClick={() => {setTemplate('normal'); setLang('id');}} className={`py-2 text-[10px] sm:text-[11px] font-bold rounded border transition-all ${template === 'normal' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400'}`}>1. Standar ATS</button>
                <button onClick={() => {setTemplate('modern'); setLang('id');}} className={`py-2 text-[10px] sm:text-[11px] font-bold rounded border transition-all ${template === 'modern' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400'}`}>2. Modern ATS</button>
                <button onClick={() => {setTemplate('harvard'); setLang('id');}} className={`py-2 text-[10px] sm:text-[11px] font-bold rounded border transition-all ${template === 'harvard' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400'}`}>3. Harvard Serif</button>
                <button onClick={() => {setTemplate('executive'); setLang('id');}} className={`py-2 text-[10px] sm:text-[11px] font-bold rounded border transition-all ${template === 'executive' ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-white/10 text-slate-400'}`}>4. Tech Exec</button>
              </div>

              {docMode === 'cv' && (
                <>
                  <h2 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2 border-t border-white/10 pt-4">2. Level Karir (Atur Urutan)</h2>
                  <div className="flex bg-[#0A1329] rounded border border-white/10 overflow-hidden shadow-inner">
                    <button onClick={() => setCareerLevel('fresh')} className={`flex-1 px-2 py-2 text-[10px] sm:text-[11px] font-bold transition-colors ${careerLevel === 'fresh' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>Fresh Graduate</button>
                    <button onClick={() => setCareerLevel('experienced')} className={`flex-1 px-2 py-2 text-[10px] sm:text-[11px] font-bold transition-colors ${careerLevel === 'experienced' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>Profesional</button>
                  </div>
                </>
              )}
            </div>

            {/* FORM CV UTAMA */}
            {docMode === 'cv' && (
              <div className="animate-fade-in-up">
                
                {/* MAGIC UPLOAD AREA */}
                <div className="mb-5 p-4 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-900/10 relative overflow-hidden flex flex-col items-center justify-center text-center">
                  {isAiLoading ? (
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                      <SparklesIcon className="w-4 h-4 animate-spin"/> Robot AI sedang membaca file Anda...
                    </div>
                  ) : (
                    <>
                      <UploadIcon />
                      <h3 className="text-xs font-bold text-cyan-400 mt-2 mb-1">✨ Auto-Fill dari CV Lama</h3>
                      <p className="text-[10px] text-slate-400 mb-3 px-4">Upload PDF, DOCX, atau Gambar CV. Data akan terisi otomatis!</p>
                      <input type="file" accept=".pdf,.docx,image/*" onChange={handleMagicUpload} ref={fileInputRef} className="hidden" />
                      <button onClick={() => fileInputRef.current.click()} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-md transition-all">Pilih File</button>
                    </>
                  )}
                </div>

                {/* NAVIGASI TAB FORM */}
                <div className="flex overflow-x-auto gap-2 mb-6 pb-2 border-b border-white/10 sticky top-0 bg-[#0A1329] z-20 pt-1 [&::-webkit-scrollbar]:h-1">
                  {cvTabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`shrink-0 px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-[#060D1F] text-slate-500 border border-white/5'}`}>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* AREA INPUT BERDASARKAN TAB */}
                <div className="space-y-4">
                    {/* (Logika Tab Form akan dilanjutkan di Bagian 3 karena file yang sangat besar) */}

                  {/* --- LANJUTAN AREA INPUT TAB --- */}
                  {activeTab === 'personal' && (
                    <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5 shadow-inner">
                      <LabeledInput label="Nama Lengkap" helperText="Sesuai KTP untuk dokumen resmi.">
                        <input type="text" name="name" value={basics.name} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Cth: Budi Santoso" />
                      </LabeledInput>
                      <LabeledInput label="Posisi Yang Dilamar" helperText="Posisi target Anda (Cth: Staff Admin).">
                        <input type="text" name="role" value={basics.role} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Cth: Graphic Designer" />
                      </LabeledInput>
                      <div className="grid grid-cols-2 gap-3">
                        <LabeledInput label="Lokasi / Kota">
                          <input type="text" name="location" value={basics.location} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Cth: Jakarta" />
                        </LabeledInput>
                        <LabeledInput label="Nomor Telepon">
                          <input type="text" name="phone" value={basics.phone} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="0812-xxxx" />
                        </LabeledInput>
                      </div>
                      <LabeledInput label="Alamat Email">
                        <input type="email" name="email" value={basics.email} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="email@profesional.com" />
                      </LabeledInput>
                      <LabeledInput label="Profil Singkat (Summary)">
                        <textarea name="summary" value={basics.summary} onChange={handleBasicsChange} rows="4" className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="Jelaskan siapa Anda dan apa pencapaian utama Anda dalam 3 kalimat..."></textarea>
                      </LabeledInput>
                      <LabeledInput label="Keahlian Utama (Skills)" helperText="Pisahkan dengan koma (Cth: Adobe, Excel, Leadership).">
                        <textarea name="skills" value={basics.skills} onChange={handleBasicsChange} rows="3" className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="Keahlian 1, Keahlian 2, ..."></textarea>
                      </LabeledInput>
                    </div>
                  )}

                  {activeTab === 'edu' && (
                    <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                        <h3 className="text-xs font-bold text-cyan-400">Riwayat Pendidikan</h3>
                        <button onClick={() => addField(setEducations, educations, { institution: "", major: "", period: "", gpa: "" })} className="text-[10px] bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded hover:bg-cyan-600 hover:text-white transition-all">+ Tambah Baru</button>
                      </div>
                      {educations.map((edu, i) => (
                        <div key={edu.id} className="bg-[#060D1F] p-4 rounded-xl relative border border-white/5 group">
                          <button onClick={() => removeField(setEducations, educations, i)} className="absolute -top-2 -right-2 text-red-400 bg-[#0A1329] border border-red-500/30 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">✖</button>
                          <input type="text" value={edu.institution} onChange={(e) => handleArrayChange(setEducations, educations, i, 'institution', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2 font-bold" placeholder="Nama Kampus atau Sekolah" />
                          <input type="text" value={edu.major} onChange={(e) => handleArrayChange(setEducations, educations, i, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2" placeholder="Jurusan / Gelar" />
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" value={edu.period} onChange={(e) => handleArrayChange(setEducations, educations, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Tahun (Cth: 2018 - 2022)" />
                            <input type="text" value={edu.gpa} onChange={(e) => handleArrayChange(setEducations, educations, i, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="IPK (Cth: 3.8/4.0)" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'exp' && (
                    <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                        <h3 className="text-xs font-bold text-cyan-400">Pengalaman Kerja</h3>
                        <button onClick={() => addField(setExperiences, experiences, { role: "", company: "", period: "", description: "" })} className="text-[10px] bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded hover:bg-cyan-600 hover:text-white transition-all">+ Tambah</button>
                      </div>
                      {experiences.map((exp, i) => (
                        <div key={exp.id} className="bg-[#060D1F] p-4 rounded-xl relative border border-white/5 group">
                          <button onClick={() => removeField(setExperiences, experiences, i)} className="absolute -top-2 -right-2 text-red-400 bg-[#0A1329] border border-red-500/30 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">✖</button>
                          <input type="text" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, experiences, i, 'company', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2 font-bold uppercase" placeholder="Nama Perusahaan" />
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <input type="text" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, experiences, i, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Posisi / Jabatan" />
                            <input type="text" value={exp.period} onChange={(e) => handleArrayChange(setExperiences, experiences, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Tahun (Cth: 2021 - Present)" />
                          </div>
                          <textarea value={exp.description} onChange={(e) => handleArrayChange(setExperiences, experiences, i, 'description', e.target.value)} rows="3" className="w-full bg-[#0A1329] border border-white/10 p-2 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="- Tulis tugas Anda. Gunakan tanda strip (-) di awal setiap poin."></textarea>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'proj' && (
                    <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                        <h3 className="text-xs font-bold text-cyan-400">Proyek atau Organisasi</h3>
                        <button onClick={() => addField(setProjects, projects, { name: "", period: "", description: "" })} className="text-[10px] bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded">+ Tambah</button>
                      </div>
                      {projects.map((proj, i) => (
                        <div key={proj.id} className="bg-[#060D1F] p-4 rounded-xl relative border border-white/5">
                          <button onClick={() => removeField(setProjects, projects, i)} className="absolute top-2 right-2 text-red-400 text-xs">Hapus</button>
                          <input type="text" value={proj.name} onChange={(e) => handleArrayChange(setProjects, projects, i, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2 font-bold" placeholder="Nama Kegiatan / Proyek" />
                          <input type="text" value={proj.period} onChange={(e) => handleArrayChange(setProjects, projects, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2" placeholder="Tahun" />
                          <textarea value={proj.description} onChange={(e) => handleArrayChange(setProjects, projects, i, 'description', e.target.value)} rows="2" className="w-full bg-[#0A1329] border border-white/10 p-2 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Apa peran Anda dalam proyek ini?"></textarea>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'cert' && (
                    <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                        <h3 className="text-xs font-bold text-cyan-400">Sertifikasi</h3>
                        <button onClick={() => addField(setCerts, certs, { name: "", issuer: "", period: "" })} className="text-[10px] bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded">+ Tambah</button>
                      </div>
                      {certs.map((cert, i) => (
                        <div key={cert.id} className="bg-[#060D1F] p-4 rounded-xl relative border border-white/5">
                          <button onClick={() => removeField(setCerts, certs, i)} className="absolute top-2 right-2 text-red-400 text-xs">Hapus</button>
                          <input type="text" value={cert.name} onChange={(e) => handleArrayChange(setCerts, certs, i, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2 font-bold" placeholder="Nama Sertifikat" />
                          <input type="text" value={cert.issuer} onChange={(e) => handleArrayChange(setCerts, certs, i, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none mb-2" placeholder="Lembaga Penerbit (Cth: Google)" />
                          <input type="text" value={cert.period} onChange={(e) => handleArrayChange(setCerts, certs, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-2 text-white text-sm focus:border-cyan-500 outline-none" placeholder="Tahun Diperoleh" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* FOOTER NAVIGASI FORM */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                   <button onClick={() => currentTabIndex > 0 && setActiveTab(cvTabs[currentTabIndex - 1].id)} className={`px-5 py-2 text-xs font-bold rounded-xl transition-all border border-white/10 ${currentTabIndex > 0 ? 'bg-white/5 hover:bg-white/10 text-white' : 'opacity-30 cursor-not-allowed text-slate-500'}`}>&laquo; Kembali</button>
                   {currentTabIndex < cvTabs.length - 1 ? (
                      <button onClick={() => setActiveTab(cvTabs[currentTabIndex + 1].id)} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg uppercase tracking-wider">Selanjutnya &raquo;</button>
                   ) : (
                      <button onClick={() => window.print()} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg uppercase tracking-wider flex items-center gap-2"><PrintIcon /> Simpan Sebagai PDF</button>
                   )}
                </div>
              </div>
            )}

            {/* FORM SURAT LAMARAN (COVER LETTER) */}
            {docMode === 'cl' && (
              <div className="animate-fade-in-up space-y-5">
                <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <MagicPenIcon /> <h3 className="text-xs font-bold uppercase tracking-widest">Generator Surat Otomatis</h3>
                  </div>
                  <LabeledInput label="Perusahaan Tujuan"><input type="text" name="company" value={clData.company} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="PT Nama Perusahaan" /></LabeledInput>
                  <LabeledInput label="Posisi Yang Dilamar"><input type="text" name="targetRole" value={clData.targetRole || basics.role} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Cth: Administration Staff" /></LabeledInput>
                  <LabeledInput label="Nama Penerima (HRD)"><input type="text" name="hr" value={clData.hr} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/10 p-2.5 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="Bapak/Ibu Personalia" /></LabeledInput>
                  <button onClick={generateCoverLetter} className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all">🪄 Buatkan Surat Secara Ajaib</button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Isi Surat (Bisa Diedit Manual)</label>
                  <textarea name="body" value={clData.body} onChange={handleClChange} rows="12" className="w-full bg-[#0A1329] border border-white/10 p-4 rounded-2xl text-white text-sm focus:border-cyan-500 outline-none leading-relaxed shadow-inner" placeholder="Tulis surat lamaran Anda di sini atau gunakan tombol generator di atas..."></textarea>
                </div>

                <button onClick={() => window.print()} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-xl uppercase tracking-widest text-xs flex justify-center items-center gap-2"><PrintIcon /> Cetak Surat Lamaran PDF</button>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* KOLOM KANAN: PREVIEW KERTAS (CETAK)                         */}
          {/* ========================================================= */}
          <div id="preview-container" className="w-full xl:w-7/12 bg-[#030712] p-4 sm:p-6 rounded-[2rem] overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 shadow-inner border border-white/5 relative print-container">
            
            {/* KONTROL ZOOM PREVIEW (TIDAK IKUT DICETAK) */}
            <div className="sticky top-0 z-40 bg-[#0A1329]/90 backdrop-blur-md p-3 border border-white/10 rounded-2xl mb-6 flex justify-between items-center shadow-lg no-print w-fit min-w-[300px] mx-auto">
              <div className="flex items-center gap-3">
                <ZoomInIcon />
                <input type="range" min="0.4" max="1.5" step="0.05" value={scale} onChange={(e) => setScale(e.target.value)} className="w-24 sm:w-32 accent-cyan-500 cursor-pointer" />
                <span className="text-[10px] font-bold text-cyan-400 w-8">{Math.round(scale * 100)}%</span>
              </div>
              <button onClick={() => window.print()} className="bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all">Cetak PDF</button>
            </div>

            <div className="w-fit mx-auto relative print-container" style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.1s ease' }}>
              <div id="cv-preview" className={`w-[21cm] min-w-[21cm] min-h-[29.7cm] bg-white text-black py-10 px-12 sm:px-14 shadow-2xl shrink-0 border border-gray-200 
                ${template === 'normal' ? 'font-[Arial,Helvetica,sans-serif]' : template === 'harvard' || isJapanese ? 'font-serif' : 'font-sans'}`}>
                
                {docMode === 'cl' ? (
                  /* --- RENDER PREVIEW: SURAT LAMARAN (COVER LETTER) --- */
                  <div className="w-full text-black flex flex-col min-h-[25cm] text-[11pt] font-sans leading-relaxed">
                    <div className="mb-8 leading-snug">
                      <div className="font-bold text-[12pt] text-black tracking-wide">{clData.senderName || basics.name || <span className="text-gray-400 font-normal">[Nama Pengirim]</span>}</div>
                      <div>{clData.senderLocation || basics.location || <span className="text-gray-300 font-normal">[Lokasi]</span>} | {clData.senderPhone || basics.phone || <span className="text-gray-300 font-normal">[HP]</span>}</div>
                      <div>{clData.senderEmail || basics.email || <span className="text-gray-300 font-normal">[Email]</span>}</div>
                    </div>
                    <div className="mb-8">{formatVisualDate(clData.date, lang)}</div>
                    <div className="mb-10 leading-snug">
                      <div>Kepada Yth.</div>
                      <div className="font-bold">{clData.hr || <span className="text-gray-400 font-normal">[Nama HRD]</span>}</div>
                      <div className="font-bold text-[11.5pt]">{clData.company || <span className="text-gray-400 font-normal">[Perusahaan]</span>}</div>
                    </div>
                    <div className="mb-4">Dengan hormat,</div>
                    <div className="whitespace-pre-wrap text-justify break-words min-h-[200px] flex-1">
                      {clData.body || <span className="text-gray-300 italic">(Konten surat akan muncul di sini. Silakan gunakan generator otomatis di menu kiri agar data CV Anda disalin ke sini secara instan.)</span>}
                    </div>
                    <div className="mt-16">
                      Hormat saya,<br/><br/><br/><br/>
                      <span className="font-bold border-b border-black pb-0.5">{clData.senderName || basics.name || <span className="text-gray-400 font-normal">[Nama Anda]</span>}</span>
                    </div>
                  </div>
                ) : (
                  /* --- RENDER PREVIEW: CV ATS (INTERNATIONAL STANDARD) --- */
                  <>
                    {(() => {
                      const cList = [
                        { v: basics.location, p: "Kota, Provinsi" },
                        { v: basics.phone, p: "0812-3456-7890" },
                        { v: basics.email, p: "email@anda.com" }
                      ].filter(Boolean);

                      // FIX ATS: LINK WARNA HITAM UNDERLINE (BUKAN BIRU)
                      const renderHeaderContact = (separator) => (
                        <p className="text-[10.5pt] flex flex-wrap mt-1.5 mb-3 text-black">
                          {cList.map((item, i) => (
                            <span key={i} className="whitespace-nowrap">
                              {item.v || <span className="text-gray-300">{item.p}</span>}
                              {(i < cList.length - 1 || profiles.some(p => p.url)) && <span className="mx-1.5 font-bold text-black">{separator}</span>}
                            </span>
                          ))}
                          {profiles.map((prof, i) => {
                            if (!prof.url) return null;
                            const textLink = prof.platform ? `${prof.platform}: ${prof.url}` : prof.url;
                            return (
                              <span key={`p-${i}`} className="whitespace-nowrap">
                                <a href={`https://${prof.url.replace(/^https?:\/\//, '')}`} className="text-black underline underline-offset-2 decoration-gray-400 font-medium" target="_blank" rel="noopener noreferrer">{textLink}</a>
                                {i < profiles.length - 1 && <span className="mx-1.5 font-bold text-black">{separator}</span>}
                              </span>
                            );
                          })}
                        </p>
                      );

                      return (
                        <>
                          {/* HEADER CV */}
                          <div className="pb-2 text-left">
                            <h1 className="text-[22pt] font-bold mb-1 tracking-tight capitalize leading-none text-black">
                              {basics.name || <span className="text-gray-300">NAMA LENGKAP ANDA</span>}
                            </h1>
                            <h2 className="text-[12pt] font-semibold text-gray-700 mb-1">{basics.role || <span className="text-gray-300">POSISI PEKERJAAN TARGET</span>}</h2>
                            {renderHeaderContact(template === 'normal' ? '|' : '•')}
                            <div className={`text-[10.5pt] leading-[1.6] text-justify mb-4 break-words ${basics.summary ? 'text-black' : 'text-gray-300'}`}>
                              {basics.summary || "Tulis 2-3 kalimat ringkasan tentang pengalaman kerja dan keahlian terbaik Anda di sini untuk memikat HRD secara instan."}
                            </div>
                          </div>

                          {/* BODY CV (DINAMIS SESUAI URUTAN ATS) */}
                          {(() => {
                            const SecTitle = ({ t }) => <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-2.5 pb-0.5 text-black tracking-wide mt-5">{t}</h2>;
                            
                            const formatDesc = (text, isPh) => text ? text.split('\n').map((l, i) => {
                              const isBul = l.trim().startsWith('-');
                              return <div key={i} className={`flex ${isBul ? 'mt-0.5' : ''}`}><span className={`${isBul ? 'mr-2 font-bold text-black' : 'hidden'}`}>•</span><span className={`text-[10.5pt] leading-[1.5] text-justify flex-1 ${isPh ? 'text-gray-300' : 'text-black'}`}>{isBul ? l.replace(/^-/, '').trim() : l}</span></div>;
                            }) : null;

                            const vEdu = educations.filter(e => e.institution.trim() !== '');
                            const vExp = experiences.filter(e => e.company.trim() !== '');
                            const vPrj = projects.filter(p => p.name.trim() !== '');
                            const vCrt = certs.filter(c => c.name.trim() !== '');

                            const R_Edu = () => vEdu.length > 0 || educations.length === 1 ? <div className="mb-3"><SecTitle t="Pendidikan" />{(vEdu.length > 0 ? vEdu : [{institution: "Nama Universitas", major: "Sarjana ...", period: "20xx - 20xx", isPh: true}]).map((e, i) => <div key={i} className="mb-2.5 break-inside-avoid"><div className="flex justify-between items-baseline"><h3 className={`text-[10.5pt] font-bold ${e.isPh ? 'text-gray-200' : 'text-black'}`}>{e.institution}</h3><span className={`text-[10pt] ${e.isPh ? 'text-gray-200' : 'text-black'}`}>{e.period}</span></div><div className="flex justify-between items-baseline"><div className={`text-[10.5pt] ${e.isPh ? 'text-gray-200' : 'text-black'}`}>{e.major}</div>{e.gpa && <div className="text-[10pt] font-medium">IPK: {e.gpa}</div>}</div></div>)}</div> : null;
                            
                            const R_Exp = () => vExp.length > 0 || experiences.length === 1 ? <div className="mb-3"><SecTitle t="Pengalaman Kerja" />{(vExp.length > 0 ? vExp : [{company: "Nama Perusahaan", role: "Posisi Kerja", period: "Tahun", description: "- Detail kerja Anda...", isPh: true}]).map((e, i) => <div key={i} className="mb-4 break-inside-avoid"><div className="flex justify-between items-baseline"><h3 className={`text-[10.5pt] font-bold ${e.isPh ? 'text-gray-200' : 'text-black'}`}>{e.company}</h3><span className={`text-[10pt] font-medium ${e.isPh ? 'text-gray-200' : 'text-black'}`}>{e.period}</span></div><div className={`text-[10.5pt] font-bold italic mb-1 ${e.isPh ? 'text-gray-200' : 'text-gray-700'}`}>{e.role}</div><div className="ml-1">{formatDesc(e.description, e.isPh)}</div></div>)}</div> : null;
                            
                            const R_Skl = () => basics.skills ? <div className="mb-3 break-inside-avoid"><SecTitle t="Keahlian Utama" /><div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mt-1 text-[10.5pt] text-black">{basics.skills.split(',').map((s, i) => <div key={i} className="flex items-start"><span className="mr-2 font-bold">•</span><span className="flex-1">{s.trim()}</span></div>)}</div></div> : null;

                            const R_Prj = () => vPrj.length > 0 ? <div className="mb-3"><SecTitle t="Proyek & Organisasi" />{vPrj.map((p, i) => <div key={i} className="mb-3.5 break-inside-avoid"><div className="flex justify-between items-baseline"><h3 className="text-[10.5pt] font-bold text-black">{p.name}</h3><span className="text-[10pt] text-black">{p.period}</span></div><div className="mt-1 ml-1">{formatDesc(p.description)}</div></div>)}</div> : null;

                            const R_Crt = () => vCrt.length > 0 ? <div className="mb-3"><SecTitle t="Sertifikasi" />{vCrt.map((c, i) => <div key={i} className="mb-2 break-inside-avoid"><div className="flex justify-between items-baseline"><h3 className="text-[10.5pt] font-bold text-black">{c.name}</h3><span className="text-[10pt] text-black">{c.period}</span></div><div className="text-[10.5pt] italic text-gray-700">{c.issuer}</div></div>)}</div> : null;

                            // LOGIKA URUTAN BERDASARKAN LEVEL KARIR (ATS STANDARD)
                            return careerLevel === 'fresh' 
                              ? <><R_Edu /><R_Exp /><R_Skl /><R_Prj /><R_Crt /></> 
                              : <><R_Exp /><R_Edu /><R_Skl /><R_Prj /><R_Crt /></>;
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
