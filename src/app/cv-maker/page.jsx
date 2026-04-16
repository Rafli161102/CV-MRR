"use client";

import { useState, useEffect } from 'react';

// =========================================================================
// 1. ICONS (ARROW FUNCTIONS)
// =========================================================================
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" /></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.524-4.31a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-1.895-3.32a.5.5 0 00-.5.5v2.25c0 .276.224.5.5.5h2.25a.5.5 0 00.5-.5v-2.25a.5.5 0 00-.5-.5h-2.25zM12 21.75c3.55 0 6.544-2.185 7.91-5.326m-15.82 0A8.966 8.966 0 0112 2.25a8.964 8.964 0 017.91 5.326m-15.82 0a8.964 8.964 0 00-7.91 5.326M12 21.75a8.965 8.965 0 007.91-5.326m0 0H21m-9 0v-4.5" /></svg>;
const DocIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const ZoomInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;

// =========================================================================
// 2. UTILITY COMPONENTS & FUNCTIONS
// =========================================================================
const LabeledInput = ({ label, helper, children }) => (
  <div className="space-y-1.5 mb-4">
    <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest pl-1">{label}</label>
    {children}
    {helper && <p className="text-[10px] text-slate-500 pl-1 leading-relaxed">{helper}</p>}
  </div>
);

const SectionHeader = ({ title, onAdd, tips }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center border-b border-white/10 pb-2">
      <h2 className="text-base font-bold text-white uppercase tracking-wider">{title}</h2>
      {onAdd && <button onClick={onAdd} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-3 py-1.5 rounded transition-colors">+ Tambah Data</button>}
    </div>
    {tips && <p className="text-[10px] text-emerald-400 mt-2 bg-emerald-500/10 px-2 py-1.5 rounded inline-block">💡 Tips: {tips}</p>}
  </div>
);

const formatDate = (dateStr, lang) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  if (lang === 'en') return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  if (lang === 'jp') return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

// =========================================================================
// 3. MAIN APPLICATION COMPONENT
// =========================================================================
export default function AdvancedCVMaker() {
  // Global States
  const [docMode, setDocMode] = useState('cv'); // cv | cl
  const [template, setTemplate] = useState('normal'); 
  const [lang, setLang] = useState('id'); 
  const [careerLevel, setCareerLevel] = useState('fresh'); // fresh | experienced
  const [activeTab, setActiveTab] = useState('personal'); 
  const [scale, setScale] = useState(0.85);

  // Form States (CV)
  const [basics, setBasics] = useState({ name: "", role: "", location: "", phone: "", email: "", summary: "", skills: "" });
  const [profiles, setProfiles] = useState([{ id: 1, platform: "", url: "" }]);
  const [educations, setEducations] = useState([{ id: 1, institution: "", major: "", period: "", gpa: "" }]);
  const [experiences, setExperiences] = useState([{ id: 1, role: "", company: "", period: "", description: "" }]);
  const [projects, setProjects] = useState([{ id: 1, name: "", period: "", description: "" }]);
  const [certs, setCerts] = useState([{ id: 1, name: "", issuer: "", period: "", description: "" }]);

  // Form States (Cover Letter)
  const [clData, setClData] = useState({ targetRole: "", company: "", hr: "", date: new Date().toISOString().split('T')[0], body: "" });

  // Input Handlers
  const handleBasics = (e) => setBasics({ ...basics, [e.target.name]: e.target.value });
  const handleCL = (e) => setClData({ ...clData, [e.target.name]: e.target.value });
  const handleArr = (setter, state, idx, field, val) => { const arr = [...state]; arr[idx][field] = val; setter(arr); };
  const addArr = (setter, state, obj) => setter([...state, { id: Date.now(), ...obj }]);
  const remArr = (setter, state, idx) => setter(state.filter((_, i) => i !== idx));

  // Placeholder Data Generator (Tampil visual saat data kosong)
  const dBasics = {
    name: lang === 'en' ? 'JOHN DOE' : 'NAMA LENGKAP ANDA',
    role: lang === 'en' ? 'Graphic Designer' : 'Posisi Pekerjaan',
    location: lang === 'en' ? 'New York, USA' : 'Kota, Indonesia',
    phone: lang === 'en' ? '+1 234 567 890' : '0812-3456-7890',
    email: lang === 'en' ? 'johndoe@email.com' : 'email@anda.com',
    summary: lang === 'en' ? 'A highly motivated professional ready to contribute to your company.' : 'Saya adalah individu yang disiplin dan bertanggung jawab. Mampu bekerja sama dalam tim maupun individu. Cepat belajar dan siap berkontribusi maksimal untuk perusahaan.',
    skills: lang === 'en' ? 'Microsoft Office, Communication, Teamwork' : 'Microsoft Word, Komunikasi, Disiplin Waktu',
  };

  const getActive = (arr, fields) => {
    const isEmpty = arr.length === 1 && fields.every(f => !arr[0][f]);
    if (isEmpty) return null; // Jika form kosong total, return null agar section di kertas hilang.
    return arr.filter(item => fields.some(f => item[f].trim() !== '')); // Hanya tampilkan baris yang diisi.
  };

  const aProf = getActive(profiles, ['platform', 'url']) || [{ platform: lang==='en'?'LinkedIn':'LinkedIn', url: 'linkedin.com/in/namaanda', isPh: true }];
  const aEdu = getActive(educations, ['institution', 'major']) || [{ institution: 'Nama Kampus atau Sekolah', major: 'Nama Jurusan', period: 'Tahun Mulai - Lulus', gpa: 'Nilai/IPK', isPh: true }];
  const aExp = getActive(experiences, ['company', 'role']) || [{ company: 'Nama Perusahaan', role: 'Nama Jabatan', period: 'Tahun Mulai - Selesai', description: '- Tulis tugas harian Anda di sini.\n- Sebutkan pencapaian Anda.', isPh: true }];
  const aProj = getActive(projects, ['name', 'description']) || [{ name: 'Nama Kegiatan / Proyek', period: 'Tahun', description: '- Ceritakan singkat tentang proyek ini.', isPh: true }];
  const aCert = getActive(certs, ['name', 'issuer']) || [{ name: 'Nama Sertifikasi / Pelatihan', issuer: 'Lembaga Penyelenggara', period: 'Tahun', description: '- Ilmu yang didapat dari pelatihan.', isPh: true }];

  // Dictionaries
  const isEn = lang === 'en';
  const txt = {
    personal: isEn ? "Personal Info" : "Info Dasar", edu: isEn ? "Education" : "Pendidikan", exp: isEn ? "Experience" : "Pengalaman", proj: isEn ? "Projects" : "Proyek", cert: isEn ? "Certificates" : "Sertifikasi",
    summary: isEn ? "Summary" : "Profil", skills: isEn ? "Skills" : "Keahlian",
  };

  // =========================================================================
  // RENDERER KERTAS CV (ARROW FUNCTIONS MURNI & MODULAR)
  // =========================================================================
  const SectionTitle = ({ title }) => {
    if (template === 'normal') return <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-2.5 pb-0.5 text-black mt-5">{title}</h2>;
    if (template === 'executive') return <h2 className="text-[12px] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-widest mt-4">{title}</h2>;
    if (template === 'modern') return <h2 className="text-[15px] font-black uppercase text-gray-900 border-b-2 border-gray-800 mb-3 pb-1 mt-5">{title}</h2>;
    return <h2 className="text-[12pt] font-bold uppercase text-center border-b border-black mb-3 pb-1 tracking-widest mt-5">{title}</h2>;
  };

  const renderBullet = (text, isPh) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      const isBullet = line.trim().startsWith('-');
      return (
        <div key={i} className={`flex ${isBullet ? 'mt-1' : ''} ${isPh ? 'text-gray-400' : 'text-black'}`}>
          {isBullet && <span className="mr-2 font-bold">•</span>}
          <span className={`${isBullet ? 'flex-1' : ''} ${template === 'normal' ? 'text-[10.5pt] leading-[1.5]' : 'text-[13px] leading-relaxed'} text-justify`}>
            {isBullet ? line.replace(/^-/, '').trim() : line}
          </span>
        </div>
      );
    });
  };

  const RenderEdu = () => {
    const data = getActive(educations, ['institution', 'major']);
    if (!data && !aEdu[0].isPh) return null; // Sembunyikan section total jika user klik hapus semua
    const mapData = data || aEdu;
    return (
      <div className="mb-3">
        <SectionTitle title={txt.edu} />
        {mapData.map((e, i) => (
          <div key={i} className="mb-2.5 break-inside-avoid">
            <div className="flex justify-between">
              <h3 className={`text-[10.5pt] font-bold ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.institution}</h3>
              <span className={`text-[10.5pt] whitespace-nowrap ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.period}</span>
            </div>
            <div className={`text-[10.5pt] ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.major}</div>
            {e.gpa && <div className={`text-[10.5pt] ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.gpa}</div>}
          </div>
        ))}
      </div>
    );
  };

  const RenderExp = () => {
    const data = getActive(experiences, ['company', 'role']);
    if (!data && !aExp[0].isPh) return null; 
    const mapData = data || aExp;
    return (
      <div className="mb-3">
        <SectionTitle title={txt.exp} />
        {mapData.map((e, i) => (
          <div key={i} className="mb-3.5 break-inside-avoid">
            <div className="flex justify-between">
              <h3 className={`text-[10.5pt] font-bold ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.company}</h3>
              <span className={`text-[10.5pt] whitespace-nowrap ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.period}</span>
            </div>
            <div className={`text-[10.5pt] mb-1 ${template === 'modern' ? 'font-bold' : 'font-medium'} ${e.isPh ? 'text-gray-400' : (template === 'modern' ? 'text-gray-800' : 'text-black')}`}>{e.role}</div>
            <div className={`${template === 'normal' ? 'ml-0' : 'pl-3'}`}>{renderBullet(e.description, e.isPh)}</div>
          </div>
        ))}
      </div>
    );
  };

  const RenderProj = () => {
    const data = getActive(projects, ['name', 'description']);
    if (!data && !aProj[0].isPh) return null;
    const mapData = data || aProj;
    return (
      <div className="mb-3">
        <SectionTitle title={txt.proj} />
        {mapData.map((p, i) => (
          <div key={i} className="mb-3.5 break-inside-avoid">
            <div className="flex justify-between">
              <h3 className={`text-[10.5pt] font-bold ${p.isPh ? 'text-gray-400' : 'text-black'}`}>{p.name}</h3>
              <span className={`text-[10.5pt] whitespace-nowrap ${p.isPh ? 'text-gray-400' : 'text-black'}`}>{p.period}</span>
            </div>
            <div className={`mt-1 ${template === 'normal' ? 'ml-0' : 'pl-3'}`}>{renderBullet(p.description, p.isPh)}</div>
          </div>
        ))}
      </div>
    );
  };

  const RenderCert = () => {
    const data = getActive(certs, ['name', 'issuer']);
    if (!data && !aCert[0].isPh) return null;
    const mapData = data || aCert;
    return (
      <div className="mb-3">
        <SectionTitle title={txt.cert} />
        {mapData.map((c, i) => (
          <div key={i} className="mb-3.5 break-inside-avoid">
            <div className="flex justify-between">
              <h3 className={`text-[10.5pt] font-bold ${c.isPh ? 'text-gray-400' : 'text-black'}`}>{c.name}</h3>
              <span className={`text-[10.5pt] whitespace-nowrap ${c.isPh ? 'text-gray-400' : 'text-black'}`}>{c.period}</span>
            </div>
            <div className={`text-[10.5pt] italic mb-1 ${c.isPh ? 'text-gray-400' : 'text-black'}`}>{c.issuer}</div>
            <div className={`${template === 'normal' ? 'ml-0' : 'pl-3'}`}>{renderBullet(c.description, c.isPh)}</div>
          </div>
        ))}
      </div>
    );
  };

  const RenderSkills = () => {
    if (!basics.skills && !dBasics.skills) return null;
    const skillsText = basics.skills || dBasics.skills;
    const isPh = !basics.skills;
    return (
      <div className="mb-3 break-inside-avoid">
        <SectionTitle title={txt.skills} />
        {template === 'normal' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mt-1 text-[10.5pt] text-black">
            {skillsText.split(',').map((s, i) => (
              <div key={i} className={`flex items-start ${isPh ? 'text-gray-400' : 'text-black'}`}>
                <span className="mr-2 font-bold">•</span><span>{s.trim()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-[10.5pt] leading-relaxed whitespace-pre-wrap break-words ${isPh ? 'text-gray-400' : 'text-black'}`}>{skillsText}</p>
        )}
      </div>
    );
  };

  // =========================================================================
  // UI RENDER START
  // =========================================================================
  return (
    <div className="flex flex-col h-screen bg-[#060D1F] text-slate-200 font-sans overflow-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* GLOBAL CSS PRINT FIX: Menghapus Semua Layout Browser di Kertas*/}
      {/* ------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 10mm; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { background: white !important; color: black !important; margin: 0 !important; padding: 0 !important; height: auto !important; overflow: visible !important; }
          header, nav, footer, aside, .no-print { display: none !important; }
          
          /* RESET LAYOUT FLEXBOX AGAR KERTAS BISA MULTI-PAGE */
          .flex-col.h-screen, .lg\\:flex-row, .lg\\:w-\\[40\\%\\], .lg\\:w-\\[60\\%\\], #preview-area {
            display: block !important; width: 100% !important; height: auto !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; overflow: visible !important; position: static !important; background: transparent !important;
          }
          
          #cv-paper {
            display: block !important; width: 100% !important; max-width: 100% !important; min-width: 100% !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; transform: none !important; page-break-after: auto;
          }
          
          .break-inside-avoid { break-inside: avoid !important; page-break-inside: avoid !important; }
        }
      `}} />

      {/* HEADER NAV (NO PRINT) */}
      <div className="h-[60px] bg-[#0A1329] border-b border-white/10 flex items-center justify-between px-6 shrink-0 no-print z-50">
        <div className="flex items-center gap-3">
          <ShieldIcon className="w-5 h-5 text-emerald-400" />
          <h1 className="text-lg font-black tracking-widest uppercase">ATS <span className="text-cyan-500">CV Maker</span></h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setDocMode('cv')} className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${docMode === 'cv' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Mode CV</button>
          <button onClick={() => setDocMode('cl')} className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${docMode === 'cl' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Surat Lamaran</button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        
        {/* ========================================================= */}
        {/* PANEL KIRI: FORMULIR INPUT (SCROLL MANDIRI)                 */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[40%] h-full overflow-y-auto bg-[#060D1F] p-6 no-print border-r border-white/10 custom-scrollbar pb-32">
          
          {docMode === 'cv' ? (
            <>
              {/* TABS & SETTINGS CV */}
              <div className="mb-6 bg-[#0A1329] p-4 rounded-xl border border-white/5">
                <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3">Pilih Bahasa Template</h3>
                <div className="flex bg-[#060D1F] rounded border border-white/10 overflow-hidden mb-4">
                  <button onClick={() => {setLang('id'); setTemplate('normal');}} className={`flex-1 py-2 text-xs font-bold ${lang === 'id' ? 'bg-cyan-600' : 'text-slate-500 hover:bg-white/5'}`}>Indonesia</button>
                  <button onClick={() => {setLang('en'); setTemplate('modern');}} className={`flex-1 py-2 text-xs font-bold ${lang === 'en' ? 'bg-cyan-600' : 'text-slate-500 hover:bg-white/5'}`}>English</button>
                </div>
                
                <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">Tingkat Karir (Standardisasi Urutan)</h3>
                <div className="flex bg-[#060D1F] rounded border border-white/10 overflow-hidden mb-2">
                  <button onClick={() => setCareerLevel('fresh')} className={`flex-1 py-2 text-xs font-bold ${careerLevel === 'fresh' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-white/5'}`}>Pemula (Pendidikan Di Atas)</button>
                  <button onClick={() => setCareerLevel('experienced')} className={`flex-1 py-2 text-xs font-bold ${careerLevel === 'experienced' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-white/5'}`}>Berpengalaman (Kerja Di Atas)</button>
                </div>
              </div>

              {/* NAVIGASI TAB FORM */}
              <div className="flex overflow-x-auto gap-2 mb-6 pb-2 border-b border-white/10 custom-scrollbar sticky top-0 bg-[#060D1F] z-10 pt-2">
                {[
                  { id: 'personal', label: '1. Personal' },
                  ...(careerLevel === 'fresh' 
                      ? [{ id: 'edu', label: '2. Pendidikan' }, { id: 'exp', label: '3. Pengalaman' }] 
                      : [{ id: 'exp', label: '2. Pengalaman' }, { id: 'edu', label: '3. Pendidikan' }]),
                  { id: 'proj', label: '4. Proyek' },
                  { id: 'cert', label: '5. Sertifikasi' }
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`shrink-0 px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-[#0A1329] text-slate-500 border border-white/5 hover:bg-white/5'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* FORM KONTEN BERDASARKAN TAB AKTIF */}
              <div className="animate-fade-in-up">
                
                {/* TAB: PERSONAL */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5">
                      <SectionHeader title="Informasi Dasar" tips="HRD hanya butuh data relevan. Hindari mengisi alamat terlalu detail (cukup Kota, Provinsi)." />
                      <LabeledInput label="Nama Lengkap" helper="Sesuai KTP atau Nama Profesional."><input type="text" name="name" value={basics.name} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={t.placeholders.name}/></LabeledInput>
                      <LabeledInput label="Posisi yang Dilamar"><input type="text" name="role" value={basics.role} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={t.placeholders.role}/></LabeledInput>
                      <div className="grid grid-cols-2 gap-4">
                        <LabeledInput label="Lokasi / Kota"><input type="text" name="location" value={basics.location} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={t.placeholders.loc}/></LabeledInput>
                        <LabeledInput label="Nomor WA Aktif"><input type="text" name="phone" value={basics.phone} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={t.placeholders.phone}/></LabeledInput>
                      </div>
                      <LabeledInput label="Email Profesional"><input type="email" name="email" value={basics.email} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={t.placeholders.email}/></LabeledInput>
                      <LabeledInput label="Profil Singkat (Summary)" helper="Tulis 3-4 kalimat ringkasan tentang kekuatan dan visi karir Anda."><textarea name="summary" value={basics.summary} onChange={handleBasics} rows="4" className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder={t.placeholders.summary}></textarea></LabeledInput>
                      <LabeledInput label="Keahlian Utama (Skills)" helper="Pisahkan dengan koma (,). Contoh: Kepemimpinan, Desain Grafis, MS Excel."><textarea name="skills" value={basics.skills} onChange={handleBasics} rows="3" className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder={t.placeholders.skills}></textarea></LabeledInput>
                    </div>

                    <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5">
                      <SectionHeader title="Tautan Profil Digital" onAdd={() => addArr(setProfiles, profiles, {platform:"", url:""})} tips="LinkedIn sangat disarankan. Kosongkan URL jika tidak ada." />
                      {profiles.map((prof, i) => (
                        <div key={prof.id} className="flex gap-3 mb-3 relative bg-[#060D1F] p-3 rounded-lg border border-white/5">
                          <button onClick={() => remArr(setProfiles, profiles, i)} className="absolute -top-2 -right-2 bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded-full">Hapus</button>
                          <div className="w-1/3"><LabeledInput label="Nama Situs"><input type="text" value={prof.platform} onChange={(e) => handleArr(setProfiles, profiles, i, 'platform', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder="Cth: LinkedIn" /></LabeledInput></div>
                          <div className="w-2/3"><LabeledInput label="URL Tautan"><input type="text" value={prof.url} onChange={(e) => handleArr(setProfiles, profiles, i, 'url', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder="linkedin.com/in/nama" /></LabeledInput></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB: PENDIDIKAN */}
                {activeTab === 'edu' && (
                  <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 space-y-4">
                    <SectionHeader title="Pendidikan" onAdd={() => addArr(setEducations, educations, {institution:"", major:"", period:"", gpa:""})} tips="Cukup masukkan pendidikan terakhir Anda (SMA/SMK atau Universitas)." />
                    {educations.map((edu, i) => (
                      <div key={edu.id} className="bg-[#060D1F] p-4 rounded-lg border border-white/5 relative">
                        <button onClick={() => remArr(setEducations, educations, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                        <LabeledInput label="Nama Instansi"><input type="text" value={edu.institution} onChange={(e) => handleArr(setEducations, educations, i, 'institution', e.target.value)} className="w-11/12 bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none font-bold" placeholder={t.placeholders.eduInst}/></LabeledInput>
                        <LabeledInput label="Jurusan / Gelar"><input type="text" value={edu.major} onChange={(e) => handleArr(setEducations, educations, i, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder={t.placeholders.eduMaj}/></LabeledInput>
                        <div className="grid grid-cols-2 gap-4">
                          <LabeledInput label="Tahun"><input type="text" value={edu.period} onChange={(e) => handleArr(setEducations, educations, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder={t.placeholders.eduDate}/></LabeledInput>
                          <LabeledInput label="Nilai/IPK (Opsional)"><input type="text" value={edu.gpa} onChange={(e) => handleArr(setEducations, educations, i, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder="Cth: 3.80 / 4.00"/></LabeledInput>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB: PENGALAMAN */}
                {activeTab === 'exp' && (
                  <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 space-y-4">
                    <SectionHeader title="Pengalaman Kerja" onAdd={() => addArr(setExperiences, experiences, {role:"", company:"", period:"", description:""})} tips="Gunakan tanda strip (-) di kolom Deskripsi untuk membuat Bullet Poin otomatis di kertas." />
                    {experiences.map((exp, i) => (
                      <div key={exp.id} className="bg-[#060D1F] p-4 rounded-lg border border-white/5 relative">
                        <button onClick={() => remArr(setExperiences, experiences, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                        <LabeledInput label="Nama Perusahaan"><input type="text" value={exp.company} onChange={(e) => handleArr(setExperiences, experiences, i, 'company', e.target.value)} className="w-11/12 bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none font-bold" placeholder={t.placeholders.expComp}/></LabeledInput>
                        <div className="grid grid-cols-2 gap-4">
                          <LabeledInput label="Posisi"><input type="text" value={exp.role} onChange={(e) => handleArr(setExperiences, experiences, i, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder={t.placeholders.expRole}/></LabeledInput>
                          <LabeledInput label="Tahun Bekerja"><input type="text" value={exp.period} onChange={(e) => handleArr(setExperiences, experiences, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder={t.placeholders.expDate}/></LabeledInput>
                        </div>
                        <LabeledInput label="Deskripsi & Pencapaian"><textarea value={exp.description} onChange={(e) => handleArr(setExperiences, experiences, i, 'description', e.target.value)} rows="4" className="w-full bg-[#0A1329] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="- Fokus pada pencapaian, bukan hanya tugas harian.&#10;- Berhasil meningkatkan omset sebesar 20% dalam 1 bulan."></textarea></LabeledInput>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB: PROYEK */}
                {activeTab === 'proj' && (
                  <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 space-y-4">
                    <SectionHeader title="Proyek Spesial" onAdd={() => addArr(setProjects, projects, {name:"", period:"", description:""})} tips="Sangat berguna untuk Fresh Graduate memasukkan Tugas Akhir, PKL, atau pengalaman Organisasi/Kepanitiaan di sini." />
                    {projects.map((proj, i) => (
                      <div key={proj.id} className="bg-[#060D1F] p-4 rounded-lg border border-white/5 relative">
                        <button onClick={() => remArr(setProjects, projects, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                        <div className="grid grid-cols-2 gap-4">
                          <LabeledInput label="Nama Kegiatan/Proyek"><input type="text" value={proj.name} onChange={(e) => handleArr(setProjects, projects, i, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none font-bold" placeholder={t.placeholders.projName}/></LabeledInput>
                          <LabeledInput label="Waktu"><input type="text" value={proj.period} onChange={(e) => handleArr(setProjects, projects, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder={t.placeholders.projDate}/></LabeledInput>
                        </div>
                        <LabeledInput label="Detail & Peran Anda"><textarea value={proj.description} onChange={(e) => handleArr(setProjects, projects, i, 'description', e.target.value)} rows="3" className="w-full bg-[#0A1329] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="- Bertanggung jawab sebagai koordinator lapangan."></textarea></LabeledInput>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB: SERTIFIKASI */}
                {activeTab === 'cert' && (
                  <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 space-y-4">
                    <SectionHeader title="Sertifikasi & Pelatihan" onAdd={() => addArr(setCerts, certs, {name:"", issuer:"", period:"", description:""})} tips="Jangan ragu menekan tombol Hapus jika Anda tidak memiliki sertifikasi yang relevan. Bagian ini akan otomatis hilang dari kertas PDF." />
                    {certs.map((cert, i) => (
                      <div key={cert.id} className="bg-[#060D1F] p-4 rounded-lg border border-white/5 relative">
                        <button onClick={() => remArr(setCerts, certs, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                        <div className="grid grid-cols-2 gap-4">
                          <LabeledInput label="Nama Pelatihan"><input type="text" value={cert.name} onChange={(e) => handleArr(setCerts, certs, i, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none font-bold" placeholder={t.placeholders.certName}/></LabeledInput>
                          <LabeledInput label="Tahun"><input type="text" value={cert.period} onChange={(e) => handleArr(setCerts, certs, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder={t.placeholders.certDate}/></LabeledInput>
                        </div>
                        <LabeledInput label="Lembaga Penyelenggara"><input type="text" value={cert.issuer} onChange={(e) => handleArr(setCerts, certs, i, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none" placeholder="Cth: BNSP, Google, dll"/></LabeledInput>
                        <LabeledInput label="Ilmu yang Didapat"><textarea value={cert.description} onChange={(e) => handleArr(setCerts, certs, i, 'description', e.target.value)} rows="2" className="w-full bg-[#0A1329] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="- Memahami dasar-dasar digital marketing."></textarea></LabeledInput>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // =========================================================
              // MODE COVER LETTER
              // =========================================================
              <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 space-y-5 animate-fade-in-up">
                <SectionHeader title="Cover Letter Builder" tips="Data pribadi Anda (Nama, Email, Telepon, Lokasi) ditarik otomatis dari tab 'Mode CV' -> 'Personal'. Anda hanya perlu merancang tujuan suratnya di sini." />
                
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Tujuan Surat</h3>
                  <LabeledInput label="Tujuan Perusahaan"><input type="text" name="company" value={clData.company} onChange={handleCL} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm outline-none" placeholder={t.placeholders.clTarget}/></LabeledInput>
                  <div className="grid grid-cols-2 gap-4">
                    <LabeledInput label="Nama Penerima / HRD"><input type="text" name="hr" value={clData.hr} onChange={handleCL} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm outline-none" placeholder={t.placeholders.clHr}/></LabeledInput>
                    <LabeledInput label="Tanggal Surat (Klik Ikon)"><input type="date" name="date" value={clData.date} onChange={handleCL} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm outline-none cursor-pointer" /></LabeledInput>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Isi Surat</h3>
                  <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">Ketik manual surat Anda, atau gunakan template bawaan kami yang telah terbukti ampuh menarik perhatian HRD.</p>
                  
                  <button onClick={() => {
                    const role = basics.role || '[Posisi yang Dilamar]';
                    const comp = clData.company || '[Nama Perusahaan]';
                    const text = lang === 'en' 
                      ? `Please accept this letter as an expression of my strong interest in the ${role} position at ${comp}.\n\nWith my background and proven expertise in my field, along with my relevant professional experience, I am confident in my ability to make an immediate and positive impact on your operations.\n\nI have attached my resume for your review, which further details my career achievements and qualifications. I would welcome the opportunity to discuss how my skill set aligns with the needs of your organization in an interview.\n\nThank you very much for your time, consideration, and forthcoming response.`
                      : `Berdasarkan informasi lowongan pekerjaan yang saya peroleh, saya bermaksud menyampaikan ketertarikan saya untuk melamar posisi ${role} di ${comp}.\n\nDengan latar belakang pendidikan dan keahlian yang saya miliki, serta pengalaman yang relevan, saya yakin dapat belajar dengan cepat dan berkontribusi secara positif bagi perusahaan Anda.\n\nBersama surat lamaran ini, saya lampirkan Curriculum Vitae (CV) sebagai bahan pertimbangan Bapak/Ibu untuk melihat riwayat pendidikan dan profesional saya secara lebih detail. Saya sangat berharap dapat diberikan kesempatan wawancara agar saya bisa memperkenalkan potensi diri saya secara langsung.\n\nTerima kasih atas waktu dan perhatian yang Bapak/Ibu berikan.`;
                    setClData({...clData, body: text});
                  }} className="w-full mb-3 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold text-xs uppercase tracking-widest rounded transition-colors border border-emerald-500/50">Gunakan Template Standar</button>
                  
                  <textarea name="body" value={clData.body} onChange={handleCL} rows="8" className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-emerald-500 outline-none leading-relaxed" placeholder="Ketik isi surat pengantar Anda di sini..."></textarea>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* PANEL KANAN: PREVIEW KERTAS (SCROLL MANDIRI & ZOOMABLE)   */}
          {/* ========================================================= */}
          <div id="preview-area" className="w-full lg:w-[60%] h-full overflow-y-auto bg-[#040914] relative flex flex-col no-print border-l border-white/5">
            
            {/* TOOLBAR KERTAS (STICKY) */}
            <div className="sticky top-0 z-40 bg-[#0A1329]/90 backdrop-blur-md p-4 border-b border-white/10 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <ZoomInIcon />
                <input type="range" min="0.4" max="1.5" step="0.05" value={scale} onChange={(e) => setScale(e.target.value)} className="w-24 sm:w-32 accent-cyan-500" />
                <span className="text-[10px] font-bold text-cyan-400">{Math.round(scale * 100)}%</span>
              </div>
              <button onClick={() => window.print()} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] text-xs uppercase tracking-widest flex items-center gap-2">
                <PrintIcon /> Cetak PDF
              </button>
            </div>

            {/* AREA KANVAS KERTAS */}
            <div className="flex-1 overflow-auto flex justify-center py-10">
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }} className="w-fit h-fit mb-20">
                
                <div id="cv-paper" className={`w-[21cm] min-h-[29.7cm] bg-white text-black py-12 px-14 shadow-2xl shrink-0 border border-gray-200 
                  ${template === 'normal' ? 'font-[Arial,Helvetica,sans-serif]' : template === 'harvard' ? 'font-serif' : 'font-sans'}`}>
                  
                  {docMode === 'cl' ? (
                    // ----------------------------------------------------
                    // RENDER COVER LETTER
                    // ----------------------------------------------------
                    <div className="w-full text-black flex flex-col min-h-[25cm] text-[11pt] leading-relaxed">
                      {/* Data Pengirim (Diambil otomatis dari Form CV) */}
                      <div className="mb-8 leading-snug">
                        <div className="font-bold text-[12pt]">{basics.name || <span className="text-gray-400 font-normal">{dBasics.name}</span>}</div>
                        <div>{basics.location || <span className="text-gray-400">{dBasics.location}</span>}</div>
                        <div>{basics.phone || <span className="text-gray-400">{dBasics.phone}</span>}</div>
                        <div>{basics.email || <span className="text-gray-400">{dBasics.email}</span>}</div>
                      </div>

                      <div className="mb-8">{formatVisualDate(clData.date, lang)}</div>
                      
                      {/* Data Tujuan */}
                      <div className="mb-8 leading-snug">
                        <div>{lang === 'en' ? 'To:' : 'Kepada Yth.'}</div>
                        <div className="font-bold">{clData.hr || <span className="text-gray-400 font-normal">{lang === 'en' ? '[Hiring Manager]' : '[Bapak/Ibu HRD]'}</span>}</div>
                        <div className="font-bold">{clData.company || <span className="text-gray-400 font-normal">{lang === 'en' ? '[Target Company]' : '[Nama Perusahaan]'}</span>}</div>
                      </div>
                      
                      <div className="mb-4">{lang === 'en' ? `Dear ${clData.hr || 'Hiring Manager'},` : 'Dengan hormat,'}</div>
                      
                      {/* Isi Surat */}
                      <div className="whitespace-pre-wrap text-justify break-words min-h-[150px]">
                        {clData.body || <span className="text-gray-400 italic">{(lang === 'en' ? 'Cover letter body is empty. Please generate or type your letter.' : 'Isi surat masih kosong. Silakan gunakan tombol template di panel sebelah kiri.')}</span>}
                      </div>
                      
                      {/* Penutup */}
                      <div className="mt-12">{lang === 'en' ? 'Sincerely,' : 'Hormat saya,'}<br/><br/><br/><br/><span className="font-bold">{basics.name || <span className="text-gray-400 font-normal">{dBasics.name}</span>}</span></div>
                    </div>
                  ) : (
                    // ----------------------------------------------------
                    // RENDER CV ATS
                    // ----------------------------------------------------
                    <div className="w-full text-black">
                      {/* HEADER KONTAK */}
                      {(() => {
                        const contactItems = [
                          { val: basics.location, ph: dBasics.location }, { val: basics.phone, ph: dBasics.phone }, { val: basics.email, ph: dBasics.email }
                        ].filter(Boolean);

                        const renderContactLine = (separator) => (
                          <>
                            {contactItems.map((item, i) => (
                              <span key={i} className="whitespace-nowrap">
                                {item.val ? <span className="text-black">{item.val}</span> : <span className="text-gray-400">{item.ph}</span>}
                                {(i < contactItems.length - 1 || (i === contactItems.length - 1 && aProf.length > 0)) && <span className="mx-1.5 text-black font-bold">{separator}</span>}
                              </span>
                            ))}
                            {/* RENDER LINK DINAMIS (Anti Biru, Profesional) */}
                            {aProf.map((prof, i) => (
                               <span key={`prof-${i}`} className="whitespace-nowrap">
                                  {prof.url && !prof.isPh ? (
                                      <a href={`https://${prof.url.replace(/^https?:\/\//, '')}`} className="text-black hover:underline decoration-gray-400" target="_blank" rel="noopener noreferrer">{prof.platform ? `${prof.platform}: ${prof.url}` : prof.url}</a>
                                  ) : (
                                      <span className="text-gray-400">{prof.platform ? `${prof.platform}: ${prof.url}` : prof.url}</span>
                                  )}
                                  {i < aProf.length - 1 && <span className="mx-1.5 text-black font-bold">{separator}</span>}
                               </span>
                            ))}
                          </>
                        );

                        return (
                          <>
                            {template === 'normal' && (
                              <div className="pb-2 text-left">
                                <h1 className="text-[20pt] font-bold mb-0.5 tracking-tight capitalize leading-none text-black">{basics.name || <span className="text-gray-400">{dBasics.name}</span>}</h1>
                                {/* FIX: POSISI DITAMPILKAN DI SINI */}
                                <h2 className="text-[12pt] font-semibold mb-1 text-black">{basics.role ? <span>{basics.role}</span> : <span className="text-gray-400">{dBasics.role}</span>}</h2>
                                <p className="text-[10.5pt] flex flex-wrap mt-1.5 mb-3">{renderContactLine('|')}</p>
                                <div className={`text-[10.5pt] leading-[1.6] text-justify mb-4 break-words ${basics.summary ? 'text-black' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</div>
                              </div>
                            )}
                            {template === 'modern' && (
                              <div className="border-b-[3px] border-gray-900 pb-4 mb-4 text-left">
                                <h1 className="text-3xl font-black text-gray-900 mb-1 uppercase tracking-tight">{basics.name || <span className="text-gray-400">{dBasics.name}</span>}</h1>
                                <h2 className="text-[15px] font-bold mb-2 uppercase tracking-wide">{basics.role ? <span className="text-gray-600">{basics.role}</span> : <span className="text-gray-400">{dBasics.role}</span>}</h2>
                                <p className="text-[13px] flex flex-wrap gap-y-1 font-medium">{renderContactLine('•')}</p>
                                <p className={`text-[13px] leading-relaxed mt-3 ${basics.summary ? 'text-gray-800' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</p>
                              </div>
                            )}
                            {(template === 'harvard' || template === 'executive') && (
                              <div className={`text-center mb-6 ${template==='executive' ? 'border-b border-gray-400 pb-4' : ''}`}>
                                <h1 className={`${template==='harvard' ? 'text-[24pt] font-serif font-normal' : 'text-3xl font-black tracking-tight'} uppercase mb-2 text-black`}>{basics.name || <span className="text-gray-400">{dBasics.name}</span>}</h1>
                                <p className="text-[10pt] flex justify-center flex-wrap font-medium">
                                  {basics.role ? <span className="text-gray-900">{basics.role}</span> : <span className="text-gray-400">{dBasics.role}</span>}
                                  <span className="mx-1.5 text-black font-bold">•</span>
                                  {renderContactLine('•')}
                                </p>
                                {template === 'harvard' ? (
                                  <p className={`text-[11pt] leading-relaxed text-justify mt-4 ${basics.summary ? 'text-gray-900' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</p>
                                ) : (
                                  <div className="mt-4"><h2 className="text-[13px] font-bold uppercase tracking-widest text-center mb-2 text-black">Profile</h2><p className={`text-[13px] leading-relaxed text-justify ${basics.summary ? 'text-gray-800' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</p></div>
                                )}
                              </div>
                            )}
                          </>
                        );
                      })()}

                      {/* MESIN PENYUSUN URUTAN (FRESH GRAD VS EXPERIENCED) */}
                      {(() => {
                         if (careerLevel === 'fresh') {
                           return <><RenderEdu/><RenderExp/><RenderProj/><RenderSkills/><RenderCert/></>;
                         } else {
                           return <><RenderExp/><RenderEdu/><RenderSkills/><RenderProj/><RenderCert/></>;
                         }
                      })()}

                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* GLOBAL CUSTOM SCROLLBAR UNTUK PANEL */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.4); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.8); }
      `}}/>
    </div>
  )
}
