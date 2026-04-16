"use client";

import { useState } from 'react';

// =========================================================================
// 1. ICONS (MODULAR ARROW FUNCTIONS)
// =========================================================================
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" /></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.524-4.31a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-1.895-3.32a.5.5 0 00-.5.5v2.25c0 .276.224.5.5.5h2.25a.5.5 0 00.5-.5v-2.25a.5.5 0 00-.5-.5h-2.25zM12 21.75c3.55 0 6.544-2.185 7.91-5.326m-15.82 0A8.966 8.966 0 0112 2.25a8.964 8.964 0 017.91 5.326m-15.82 0a8.964 8.964 0 00-7.91 5.326M12 21.75a8.965 8.965 0 007.91-5.326m0 0H21m-9 0v-4.5" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const MagicPenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>;
const ZoomInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;

// =========================================================================
// 2. UI ATOMS UNTUK FORM
// =========================================================================
const LabeledInput = ({ label, helper, children }) => (
  <div className="space-y-1.5 mb-4">
    <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest pl-1">{label}</label>
    {children}
    {helper && <p className="text-[10px] text-slate-500 pl-1 leading-relaxed">{helper}</p>}
  </div>
);

const SectionHeader = ({ title, onAdd, tips }) => (
  <div className="mb-5">
    <div className="flex justify-between items-center border-b border-white/10 pb-2">
      <h2 className="text-base font-bold text-white uppercase tracking-wider">{title}</h2>
      {onAdd && <button onClick={onAdd} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-3 py-1.5 rounded transition-colors shadow-sm">+ Tambah Baru</button>}
    </div>
    {tips && <p className="text-[10.5px] text-emerald-400 mt-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg leading-relaxed shadow-sm">💡 <b>TIPS:</b> {tips}</p>}
  </div>
);

// =========================================================================
// 3. MAIN APPLICATION COMPONENT
// =========================================================================
export default function AdvancedCVMaker() {
  // Global View States
  const [docMode, setDocMode] = useState('cv'); // 'cv' | 'cl'
  const [template, setTemplate] = useState('normal'); 
  const [lang, setLang] = useState('id'); 
  const [careerLevel, setCareerLevel] = useState('fresh'); // 'fresh' | 'experienced'
  const [activeTab, setActiveTab] = useState('personal'); 
  const [scale, setScale] = useState(0.80);
  const [isTranslating, setIsTranslating] = useState(false);

  // Form Data States (CV)
  const [basics, setBasics] = useState({ name: "", role: "", location: "", phone: "", email: "", summary: "", skills: "", furigana: "", birthdate: "", age: "", gender: "男", nationality: "", visa: "", commuteTime: "", commuteMinute: "", dependents: "", spouse: "", spouseSupport: "" });
  const [profiles, setProfiles] = useState([{ id: 1, platform: "", url: "" }]);
  const [educations, setEducations] = useState([{ id: 1, institution: "", major: "", period: "", gpa: "" }]);
  const [experiences, setExperiences] = useState([{ id: 1, role: "", company: "", period: "", description: "" }]);
  const [projects, setProjects] = useState([{ id: 1, name: "", period: "", description: "" }]);
  const [certs, setCerts] = useState([{ id: 1, name: "", issuer: "", period: "", description: "" }]);

  // Form Data States (Cover Letter)
  const [clData, setClData] = useState({ targetRole: "", company: "", hr: "", date: new Date().toISOString().split('T')[0], body: "" });

  // Input Handlers
  const handleBasics = (e) => setBasics({ ...basics, [e.target.name]: e.target.value });
  const handleCL = (e) => setClData({ ...clData, [e.target.name]: e.target.value });
  const handleArr = (setter, state, idx, field, val) => { const arr = [...state]; arr[idx][field] = val; setter(arr); };
  const addArr = (setter, state, obj) => setter([...state, { id: Date.now(), ...obj }]);
  const remArr = (setter, state, idx) => setter(state.filter((_, i) => i !== idx));

  // =========================================================================
  // DYNAMIC LOGIC & DATA GENERATOR
  // =========================================================================
  const getActive = (arr, fields) => {
    const isEmpty = arr.length === 1 && fields.every(f => !arr[0][f]);
    return isEmpty ? null : arr.filter(item => fields.some(f => item[f].trim() !== '')); 
  };

  const isEn = lang === 'en';
  const isJp = lang === 'jp' || template === 'jp-umum' || template === 'jp-asing';

  const dBasics = {
    name: isEn ? 'JOHN DOE' : (isJp ? '山田 太郎' : 'NAMA LENGKAP ANDA'),
    role: isEn ? 'Graphic Designer' : (isJp ? 'グラフィックデザイナー' : 'Posisi Pekerjaan (Cth: Akuntan)'),
    location: isEn ? 'New York, USA' : (isJp ? '東京都渋谷区' : 'Kota, Provinsi'),
    phone: isEn ? '+1 234 567 890' : (isJp ? '090-1234-5678' : '0812-3456-7890'),
    email: isEn ? 'johndoe@email.com' : (isJp ? 'yamada@email.com' : 'email@anda.com'),
    summary: isEn ? 'A highly motivated professional ready to contribute to your company with a proven track record of excellence.' : (isJp ? '3年以上の経験を持つ専門家。適応力が高く、チームに貢献できる人材です。' : 'Saya adalah individu yang disiplin dan bertanggung jawab. Mampu bekerja sama dalam tim maupun individu, serta memiliki semangat belajar yang tinggi untuk berkontribusi maksimal bagi perusahaan.'),
    skills: isEn ? 'Microsoft Office, Communication, Teamwork' : (isJp ? 'コミュニケーション, チームワーク, 問題解決' : 'Microsoft Word, Komunikasi, Disiplin Waktu, Adaptasi Cepat'),
  };

  const expPlaceholderDesc = careerLevel === 'fresh' 
    ? (isEn ? '- Describe your internship or organizational experience.\n- Highlight the soft skills you developed.' : '- Tulis pengalaman magang, kepanitiaan, atau proyek lepas (freelance) jika ada.\n- Fokus pada kemampuan beradaptasi dan kerjasama tim yang Anda pelajari.')
    : (isEn ? '- Describe your responsibilities here.\n- Focus on what you achieved using numbers/metrics.' : '- Tulis tugas utama dan tanggung jawab Anda di sini.\n- Fokus pada pencapaian, gunakan persentase atau angka jika memungkinkan (Contoh: Meningkatkan target 20%).');

  const aProf = getActive(profiles, ['platform', 'url']) || [{ platform: isEn?'LinkedIn':(isJp?'リンク':'LinkedIn'), url: 'linkedin.com/in/namaanda', isPh: true }];
  const aEdu = getActive(educations, ['institution', 'major']) || [{ institution: isEn?'University Name':(isJp?'〇〇大学':'Nama Kampus atau Sekolah'), major: isEn?'Degree/Major':(isJp?'〇〇学部':'Jurusan (Cth: Ilmu Komunikasi)'), period: isEn?'2018 - 2022':(isJp?'2022/03':'Tahun Masuk - Lulus'), gpa: isEn?'GPA: 3.8/4.0':'IPK: 3.80 / 4.00', isPh: true }];
  const aExp = getActive(experiences, ['company', 'role']) || [{ company: isEn?'Company Name Inc.':(isJp?'〇〇株式会社':'PT Nama Perusahaan'), role: isEn?'Job Title':(isJp?'役職名':'Nama Jabatan'), period: isEn?'2021 - Present':(isJp?'2021/04':'Tahun Mulai - Selesai'), description: expPlaceholderDesc, isPh: true }];
  const aProj = getActive(projects, ['name', 'description']) || [{ name: isEn?'Project Title':(isJp?'〇〇プロジェクト':'Nama Kegiatan / Proyek / Tugas Akhir'), period: isEn?'2023':(isJp?'2023/08':'Tahun Pelaksanaan'), description: isEn?'- Briefly describe the project goal and your role.':(isJp?'〇〇の開発を担当\n〇〇を達成':'- Ceritakan singkat tentang proyek ini dan kontribusi utama Anda.'), isPh: true }];
  const aCert = getActive(certs, ['name', 'issuer']) || [{ name: isEn?'Certificate Name':(isJp?'日本語能力試験 N2':'Nama Sertifikasi / Pelatihan'), issuer: isEn?'Issuing Organization':(isJp?'発行機関':'Lembaga Penyelenggara (Cth: Google)'), period: isEn?'2023':(isJp?'2023/12':'Tahun Lulus'), description: isEn?'- What skills did you acquire?':'- Ilmu praktis apa yang didapat dari pelatihan ini?', isPh: true }];

  const txt = {
    personal: isEn ? "Personal Info" : "Info Dasar", edu: isEn ? "Education" : "Pendidikan", exp: isEn ? "Experience" : "Pengalaman Kerja", proj: isEn ? "Projects" : "Proyek & Organisasi", cert: isEn ? "Certificates" : "Sertifikasi",
    summary: isEn ? "Summary" : "Profil Singkat", skills: isEn ? "Skills" : "Keahlian Utama", links: isEn ? "Links" : "Tautan Profil",
  };

  const handleMagicTranslate = async (targetLang) => {
    setIsTranslating(true); setLang(targetLang); const apiLang = targetLang === 'jp' ? 'ja' : targetLang;
    const tl = async (text) => {
      if (!text || text.trim() === "") return text;
      try { const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${apiLang}&dt=t&q=${encodeURIComponent(text)}`); const data = await res.json(); return data[0].map(item => item[0]).join(''); } catch (err) { return text; }
    };
    
    const tRole = await tl(basics.role); const tSummary = await tl(basics.summary); const tSkills = await tl(basics.skills); const tLocation = await tl(basics.location);
    const tClHr = await tl(clData.hr); const tClBody = await tl(clData.body); const tClTargetRole = await tl(clData.targetRole);
    
    setBasics({ ...basics, role: tRole, summary: tSummary, skills: tSkills, location: tLocation });
    setClData({ ...clData, hr: tClHr, body: tClBody, targetRole: tClTargetRole });
    
    const translatedProfiles = await Promise.all(profiles.map(async (prof) => ({ ...prof, platform: await tl(prof.platform) }))); setProfiles(translatedProfiles);
    const translatedEdu = await Promise.all(educations.map(async (edu) => ({ ...edu, institution: await tl(edu.institution), major: await tl(edu.major) }))); setEducations(translatedEdu);
    const translatedExp = await Promise.all(experiences.map(async (exp) => ({ ...exp, company: await tl(exp.company), role: await tl(exp.role), description: await tl(exp.description) }))); setExperiences(translatedExp);
    const translatedProj = await Promise.all(projects.map(async (proj) => ({ ...proj, name: await tl(proj.name), description: await tl(proj.description) }))); setProjects(translatedProj);
    const translatedCerts = await Promise.all(certs.map(async (cert) => ({ ...cert, name: await tl(cert.name), issuer: await tl(cert.issuer) }))); setCerts(translatedCerts);
    setIsTranslating(false);
  };

  const formatVisualDate = (dateStr) => {
    if (!dateStr) return ""; const d = new Date(dateStr); if (isNaN(d)) return dateStr;
    return isEn ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : (isJp ? `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日` : d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }));
  };

  const cvTabs = [
    { id: 'personal', label: '1. Personal' },
    ...(careerLevel === 'fresh' ? [{ id: 'edu', label: '2. Pendidikan' }, { id: 'exp', label: '3. Pengalaman' }] : [{ id: 'exp', label: '2. Pengalaman' }, { id: 'edu', label: '3. Pendidikan' }]),
    { id: 'proj', label: '4. Proyek' },
    { id: 'cert', label: '5. Sertif/Kursus' }
  ];

  const currentTabIndex = cvTabs.findIndex(t => t.id === activeTab);

  // =========================================================================
  // RENDERER KERTAS INTERNASIONAL (MODULAR)
  // =========================================================================
  const SectionTitle = ({ title }) => {
    if (template === 'normal') return <h2 className="text-[11.5pt] font-bold uppercase border-b-[1.5px] border-black mb-2.5 pb-0.5 text-black mt-5 tracking-wide">{title}</h2>;
    if (template === 'executive') return <h2 className="text-[11pt] font-bold uppercase border-b border-gray-300 mb-2.5 pb-1 text-gray-900 tracking-widest mt-5">{title}</h2>;
    if (template === 'modern') return <h2 className="text-[14px] font-black uppercase text-gray-900 border-b-2 border-gray-800 mb-3 pb-1 mt-5 tracking-wide">{title}</h2>;
    return <h2 className="text-[12pt] font-bold uppercase text-center border-b border-black mb-3 pb-1 tracking-widest mt-5 text-black">{title}</h2>;
  };

  const renderBullet = (text, isPh) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      const isBullet = line.trim().startsWith('-');
      return (
        <div key={i} className={`flex ${isBullet ? 'mt-1' : ''} ${isPh ? 'text-gray-400' : 'text-black'}`}>
          {isBullet && <span className="mr-2 font-bold select-none">•</span>}
          <span className={`${isBullet ? 'flex-1' : ''} ${template === 'normal' ? 'text-[10.5pt] leading-[1.6]' : 'text-[10pt] leading-relaxed'} text-justify`}>
            {isBullet ? line.replace(/^-/, '').trim() : line}
          </span>
        </div>
      );
    });
  };

  const RenderEdu = () => {
    if (!getActive(educations, ['institution', 'major']) && !aEdu[0].isPh) return null; 
    return (
      <div className="mb-4">
        <SectionTitle title={txt.edu} />
        {(getActive(educations, ['institution', 'major']) || aEdu).map((e, i) => (
          <div key={i} className="mb-3 break-inside-avoid">
            <div className="flex justify-between items-end">
              <h3 className={`text-[10.5pt] font-bold ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.institution}</h3>
              <span className={`text-[10pt] whitespace-nowrap ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.period}</span>
            </div>
            <div className="flex justify-between items-start mt-0.5">
              <div className={`text-[10.5pt] ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.major}</div>
              {e.gpa && <div className={`text-[10pt] font-medium ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.gpa}</div>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const RenderExp = () => {
    if (!getActive(experiences, ['company', 'role']) && !aExp[0].isPh) return null; 
    return (
      <div className="mb-4">
        <SectionTitle title={txt.exp} />
        {(getActive(experiences, ['company', 'role']) || aExp).map((e, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <div className="flex justify-between items-end mb-0.5">
              <h3 className={`text-[10.5pt] font-bold uppercase ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.company}</h3>
              <span className={`text-[10pt] whitespace-nowrap ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.period}</span>
            </div>
            <div className={`text-[10.5pt] mb-1.5 ${template === 'modern' ? 'font-bold' : 'font-medium italic'} ${e.isPh ? 'text-gray-400' : (template === 'modern' ? 'text-gray-800' : 'text-black')}`}>{e.role}</div>
            <div className={`${template === 'normal' ? 'ml-0' : 'pl-3.5'}`}>{renderBullet(e.description, e.isPh)}</div>
          </div>
        ))}
      </div>
    );
  };

  const RenderProj = () => {
    if (!getActive(projects, ['name', 'description']) && !aProj[0].isPh) return null;
    return (
      <div className="mb-4">
        <SectionTitle title={txt.proj} />
        {(getActive(projects, ['name', 'description']) || aProj).map((p, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <div className="flex justify-between items-end mb-0.5">
              <h3 className={`text-[10.5pt] font-bold ${p.isPh ? 'text-gray-400' : 'text-black'}`}>{p.name}</h3>
              <span className={`text-[10pt] whitespace-nowrap ${p.isPh ? 'text-gray-400' : 'text-black'}`}>{p.period}</span>
            </div>
            <div className={`mt-1 ${template === 'normal' ? 'ml-0' : 'pl-3.5'}`}>{renderBullet(p.description, p.isPh)}</div>
          </div>
        ))}
      </div>
    );
  };

  const RenderCert = () => {
    if (!getActive(certs, ['name', 'issuer']) && !aCert[0].isPh) return null;
    return (
      <div className="mb-4">
        <SectionTitle title={txt.cert} />
        {(getActive(certs, ['name', 'issuer']) || aCert).map((c, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <div className="flex justify-between items-end">
              <h3 className={`text-[10.5pt] font-bold ${c.isPh ? 'text-gray-400' : 'text-black'}`}>{c.name}</h3>
              <span className={`text-[10pt] whitespace-nowrap ${c.isPh ? 'text-gray-400' : 'text-black'}`}>{c.period}</span>
            </div>
            <div className={`text-[10.5pt] italic mb-1 ${c.isPh ? 'text-gray-400' : 'text-black'}`}>{c.issuer}</div>
            <div className={`${template === 'normal' ? 'ml-0' : 'pl-3.5'}`}>{renderBullet(c.description, c.isPh)}</div>
          </div>
        ))}
      </div>
    );
  };

  const RenderSkills = () => {
    if (!basics.skills && !dBasics.skills) return null;
    const isPh = !basics.skills;
    return (
      <div className="mb-4 break-inside-avoid">
        <SectionTitle title={txt.skills} />
        {template === 'normal' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1.5 mt-2 text-[10.5pt] text-black">
            {(basics.skills || dBasics.skills).split(',').map((s, i) => (
              <div key={i} className={`flex items-start ${isPh ? 'text-gray-400' : 'text-black'}`}>
                <span className="mr-2 font-bold select-none">•</span><span>{s.trim()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-[10.5pt] leading-relaxed whitespace-pre-wrap break-words mt-1 text-justify ${isPh ? 'text-gray-400' : 'text-black'}`}>{basics.skills || dBasics.skills}</p>
        )}
      </div>
    );
  };

  const International_CV_Renderer = () => {
    const cList = [{ v: basics.location, p: dBasics.location }, { v: basics.phone, p: dBasics.phone }, { v: basics.email, p: dBasics.email }].filter(Boolean);
    const sep = template === 'normal' ? '|' : '•';
    
    const renderContact = () => (
      <>
        {cList.map((item, i) => (
          <span key={i} className="whitespace-nowrap">
            {item.v ? <span className="text-black">{item.v}</span> : <span className="text-gray-400">{item.p}</span>}
            {(i < cList.length - 1 || (i === cList.length - 1 && aProf.length > 0)) && <span className="mx-1.5 text-black font-bold select-none">{sep}</span>}
          </span>
        ))}
        {aProf.map((prof, i) => (
           <span key={`p-${i}`} className="whitespace-nowrap">
              {prof.url && !prof.isPh ? (
                  <a href={`https://${prof.url.replace(/^https?:\/\//, '')}`} style={{color:'black', textDecorationLine:'underline', textDecorationColor:'#9ca3af', textUnderlineOffset:'2px'}} target="_blank" rel="noopener noreferrer">
                    {prof.platform ? `${prof.platform}: ${prof.url.replace(/^https?:\/\//, '')}` : prof.url.replace(/^https?:\/\//, '')}
                  </a>
              ) : (
                  <span className="text-gray-400">{prof.platform ? `${prof.platform}: ${prof.url}` : prof.url}</span>
              )}
              {i < aProf.length - 1 && <span className="mx-1.5 text-black font-bold select-none">{sep}</span>}
           </span>
        ))}
      </>
    );

    return (
      <div id="cv-paper" className="w-[21cm] min-h-[29.7cm] bg-white text-black py-[1.5cm] px-[1.5cm] shadow-2xl shrink-0 border border-gray-200" 
           style={{ fontFamily: template === 'normal' ? 'Arial, Helvetica, sans-serif' : template === 'harvard' ? 'Georgia, serif' : 'system-ui, -apple-system, sans-serif' }}>
        
        {/* HEADER */}
        {template === 'normal' && (
          <div className="pb-3 text-left">
            <h1 className="text-[22pt] font-bold mb-1 tracking-tight capitalize leading-none text-black">{basics.name || <span className="text-gray-400">{dBasics.name}</span>}</h1>
            <h2 className="text-[12pt] font-semibold mb-1 mt-1 text-black">{basics.role ? <span>{basics.role}</span> : <span className="text-gray-400">{dBasics.role}</span>}</h2>
            <p className="text-[10.5pt] flex flex-wrap mt-1 mb-4 leading-relaxed">{renderContact()}</p>
            <div className={`text-[10.5pt] leading-[1.6] text-justify mb-4 break-words ${basics.summary ? 'text-black' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</div>
          </div>
        )}
        {template === 'modern' && (
          <div className="border-b-[3px] border-gray-900 pb-4 mb-4 text-left">
            <h1 className="text-[24pt] font-black text-gray-900 mb-1 uppercase tracking-tight leading-none">{basics.name || <span className="text-gray-400">{dBasics.name}</span>}</h1>
            <h2 className="text-[12pt] font-bold mb-2 uppercase tracking-wide">{basics.role ? <span className="text-gray-600">{basics.role}</span> : <span className="text-gray-400">{dBasics.role}</span>}</h2>
            <p className="text-[10pt] flex flex-wrap gap-y-1 font-medium">{renderContact()}</p>
            <p className={`text-[10.5pt] leading-relaxed mt-4 text-justify ${basics.summary ? 'text-gray-800' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</p>
          </div>
        )}
        {(template === 'harvard' || template === 'executive') && (
          <div className={`text-center mb-6 ${template==='executive' ? 'border-b border-gray-400 pb-5' : ''}`}>
            <h1 className={`${template==='harvard' ? 'text-[28pt] font-serif font-normal' : 'text-[24pt] font-black tracking-tight'} uppercase mb-1 text-black leading-none`}>{basics.name || <span className="text-gray-400">{dBasics.name}</span>}</h1>
            <p className="text-[10.5pt] flex justify-center flex-wrap font-medium mt-2 leading-relaxed">
              {basics.role ? <span className="text-gray-900 font-bold">{basics.role}</span> : <span className="text-gray-400">{dBasics.role}</span>}
              <span className="mx-2 text-black font-bold select-none">•</span>
              {renderContact()}
            </p>
            {template === 'harvard' ? (
              <p className={`text-[11pt] leading-relaxed text-justify mt-5 ${basics.summary ? 'text-gray-900' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</p>
            ) : (
              <div className="mt-5"><h2 className="text-[11pt] font-bold uppercase tracking-widest text-center mb-2 text-black">Profile</h2><p className={`text-[10.5pt] leading-relaxed text-justify ${basics.summary ? 'text-gray-800' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</p></div>
            )}
          </div>
        )}

        {/* ORDER MESIN */}
        {careerLevel === 'fresh' ? (
          <><RenderEdu/><RenderExp/><RenderProj/><RenderSkills/><RenderCert/></>
        ) : (
          <><RenderExp/><RenderEdu/><RenderSkills/><RenderProj/><RenderCert/></>
        )}
      </div>
    );
  };

  // =========================================================================
  // RENDERER COVER LETTER
  // =========================================================================
  const CLPaperRenderer = () => (
    <div id="cv-paper" className="w-[21cm] min-h-[29.7cm] bg-white text-black py-[2cm] px-[2.5cm] shadow-2xl shrink-0 border border-gray-200" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="w-full text-black flex flex-col h-full text-[11pt] leading-relaxed">
        
        {/* Data Pengirim */}
        <div className="mb-10 leading-snug text-gray-800 border-b border-gray-300 pb-6">
          <div className="font-bold text-[14pt] text-black mb-2 uppercase tracking-wide">{basics.name || <span className="text-gray-400 font-normal">{dBasics.name}</span>}</div>
          <div>{basics.location || <span className="text-gray-400">{dBasics.location}</span>}</div>
          <div>{basics.phone || <span className="text-gray-400">{dBasics.phone}</span>}</div>
          <div>{basics.email || <span className="text-gray-400">{dBasics.email}</span>}</div>
        </div>

        <div className="mb-8 font-medium">{formatVisualDate(clData.date)}</div>
        
        {/* Data Tujuan */}
        <div className="mb-10 leading-snug">
          <div>{isEn ? 'To:' : 'Kepada Yth.'}</div>
          <div className="font-bold">{clData.hr || <span className="text-gray-400 font-normal">{isEn ? '[Hiring Manager Name]' : '[Bapak/Ibu HRD]'}</span>}</div>
          <div className="font-bold text-[12pt] mt-0.5">{clData.company || <span className="text-gray-400 font-normal">{isEn ? '[Target Company]' : '[Nama Perusahaan]'}</span>}</div>
        </div>
        
        <div className="mb-6 font-medium">{isEn ? `Dear ${clData.hr || 'Hiring Manager'},` : 'Dengan hormat,'}</div>
        
        {/* Isi Surat */}
        <div className="whitespace-pre-wrap text-justify break-words flex-1 min-h-[150px]">
          {clData.body || <span className="text-gray-400 italic">{(isEn ? 'Your cover letter body will appear here. Please use the "Auto-Generate" button to create a professional draft.' : 'Isi surat Anda masih kosong. Silakan gunakan tombol hijau "Gunakan Template Standar" di panel sebelah kiri untuk membuat draft profesional secara instan.')}</span>}
        </div>
        
        {/* Penutup */}
        <div className="mt-16">{isEn ? 'Sincerely,' : 'Hormat saya,'}<br/><br/><br/><br/><span className="font-bold underline decoration-gray-400 underline-offset-4">{basics.name || <span className="text-gray-400 font-normal no-underline">{dBasics.name}</span>}</span></div>
      </div>
    </div>
  );

  // =========================================================================
  // RENDERER JEPANG JIS (TETAP DIPERTAHANKAN)
  // =========================================================================
  const JPCvRenderer = () => {
    const parseJpDate = (ds) => { if (!ds) return { y: '', m: '' }; const p = ds.split(/[\/\-\s]+/); return p.length >= 2 ? { y: p[0], m: p[1].replace(/^0+/, '') } : { y: ds, m: '' }; };
    
    const rowsEduExp = [{ y: '', m: '', c: '学歴', center: true }];
    (getActive(educations, ['institution']) || aEdu).forEach(e => { const d = parseJpDate(e.period); rowsEduExp.push({ y: d.y, m: d.m, c: `${e.institution} ${e.major} 入学/卒業`, isPh: e.isPh }); });
    rowsEduExp.push({ y: '', m: '', c: '', center: true }); 
    rowsEduExp.push({ y: '', m: '', c: '職歴', center: true });
    const realExp = getActive(experiences, ['company']);
    if (realExp) {
      realExp.forEach(e => { const d = parseJpDate(e.period); rowsEduExp.push({ y: d.y, m: d.m, c: `${e.company} 入社` }); if (e.role) rowsEduExp.push({ y: '', m: '', c: `　${e.role}` }); });
      rowsEduExp.push({ y: '', m: '', c: '現在に至る', right: true }); rowsEduExp.push({ y: '', m: '', c: '以上', right: true });
    } else {
      rowsEduExp.push({ y: '2021', m: '04', c: '〇〇株式会社 入社', isPh: true }); rowsEduExp.push({ y: '', m: '', c: '現在に至る', right: true, isPh: true }); rowsEduExp.push({ y: '', m: '', c: '以上', right: true, isPh: true });
    }
    while(rowsEduExp.length < 16) rowsEduExp.push({ y: '', m: '', c: '' });
    const finalEduExp = rowsEduExp.slice(0, 16);

    const rowsCert = [];
    (getActive(certs, ['name']) || aCert).forEach(c => { const d = parseJpDate(c.period); rowsCert.push({ y: d.y, m: d.m, c: `${c.name} 取得`, isPh: c.isPh }); });
    if (getActive(certs, ['name'])) rowsCert.push({ y: '', m: '', c: '以上', right: true });
    while(rowsCert.length < 5) rowsCert.push({ y: '', m: '', c: '' });
    const finalCert = rowsCert.slice(0, 5);

    return (
      <div id="cv-paper" className="w-[21cm] min-h-[29.7cm] bg-white text-black py-[1.5cm] px-[1.5cm] shadow-2xl shrink-0 border border-gray-200" style={{ fontFamily: 'serif' }}>
        <div className="w-full text-black">
          <div className="flex justify-between items-end mb-1">
            <h1 className="text-[22px] tracking-[1em] font-bold ml-4 font-serif">履歴書</h1>
            <span className="text-[11px] font-serif">　　年　　月　　日 現在</span>
          </div>
          <table className="w-full border-collapse border border-black text-[11px] font-serif mb-1">
            <tbody>
              <tr className="border-b border-black">
                <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">ふりがな</td>
                <td className="w-[60%] p-1.5 border-r border-black leading-none">{basics.furigana || <span className="text-gray-400">{dBasics.furigana}</span>}</td>
                <td rowSpan={3} className="w-[30%] p-2 text-center text-gray-400 border-l border-black align-middle text-[10px] leading-tight border-dashed relative">写真を貼る位置<br/><span className="text-[8px]">(36~40mm x 24~30mm)</span></td>
              </tr>
              <tr className="border-b border-black h-[50px]">
                <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">氏名</td>
                <td className="p-2 text-xl tracking-[0.5em] border-r border-black align-middle">{basics.name || <span className="text-gray-400">{dBasics.name}</span>}</td>
              </tr>
              <tr>
                <td colSpan={2} className="border-r border-black p-1">
                  <div className="flex justify-between items-center w-full px-2 mt-1">
                    <span>{basics.birthdate ? `${basics.birthdate} 生` : <span className="text-gray-400">{dBasics.birthdate} 生</span>}</span>
                    <span>(満 {basics.age || <span className="text-gray-400">{dBasics.age}</span>} 歳)</span>
                    <span>{basics.gender || <span className="text-gray-400">{dBasics.gender}</span>}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border-collapse border border-black text-[11px] font-serif mb-2">
            <tbody>
              <tr className="border-b border-black">
                <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">ふりがな</td>
                <td className="w-[50%] p-1.5 border-r border-black">{basics.addressFurigana || <span className="text-gray-400">{dBasics.addressFurigana}</span>}</td>
                <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">電話</td>
                <td className="w-[30%] p-1.5">{basics.phone || <span className="text-gray-400">{dBasics.phone}</span>}</td>
              </tr>
              <tr className="h-12 border-b border-black">
                <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">現住所</td>
                <td className="p-1.5 border-r border-black align-top leading-tight">〒<br/><span className="mt-1 block">{basics.location || <span className="text-gray-400">{dBasics.location}</span>}</span></td>
                <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">Email</td>
                <td className="p-1.5 align-top break-all leading-tight">{basics.email || <span className="text-gray-400">{dBasics.email}</span>}</td>
              </tr>
            </tbody>
          </table>
          {template === 'jp-asing' && (
          <table className="w-full border-collapse border border-black text-[11px] font-serif mb-2">
            <tbody>
              <tr>
                <td className="w-[15%] border-r border-black p-1.5 text-center bg-gray-50/50 print:bg-transparent text-[9px]">国籍 (Nationality)</td>
                <td className="w-[35%] p-1.5 border-r border-black">{basics.nationality || <span className="text-gray-400">{dBasics.nationality}</span>}</td>
                <td className="w-[15%] border-r border-black p-1.5 text-center bg-gray-50/50 print:bg-transparent text-[9px]">在留資格 (Visa)</td>
                <td className="w-[35%] p-1.5">{basics.visa || <span className="text-gray-400">{dBasics.visa}</span>}</td>
              </tr>
            </tbody>
          </table>
          )}
          <table className="w-full border-collapse border border-black text-[11px] font-serif mb-2">
            <thead>
              <tr className="border-b border-black h-6">
                <th className="w-[12%] border-r border-black font-normal p-1 text-center">年</th>
                <th className="w-[8%] border-r border-black font-normal p-1 text-center">月</th>
                <th className="w-[80%] font-normal p-1 text-center">学歴・職歴（各別にまとめて書く）</th>
              </tr>
            </thead>
            <tbody>
              {finalEduExp.map((r, i) => (
                <tr key={`eduexp-${i}`} className="h-[22px]">
                  <td className="border border-black text-center">{r.y}</td>
                  <td className="border border-black text-center">{r.m}</td>
                  <td className={`border border-black px-2 ${r.center ? 'text-center tracking-[2em] pl-8' : r.right ? 'text-right pr-6' : ''} ${r.isPh ? 'text-gray-400' : 'text-black'}`}>{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full border-collapse border border-black text-[11px] font-serif mb-2">
            <thead>
              <tr className="border-b border-black h-6">
                <th className="w-[12%] border-r border-black font-normal p-1 text-center">年</th>
                <th className="w-[8%] border-r border-black font-normal p-1 text-center">月</th>
                <th className="w-[80%] font-normal p-1 text-center">免許・資格</th>
              </tr>
            </thead>
            <tbody>
              {finalCert.map((r, i) => (
                <tr key={`cert-${i}`} className="h-[22px]">
                  <td className="border border-black text-center">{r.y}</td>
                  <td className="border border-black text-center">{r.m}</td>
                  <td className={`border border-black px-2 ${r.right ? 'text-right pr-6' : ''} ${r.isPh ? 'text-gray-400' : 'text-black'}`}>{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-[0.2rem] w-full h-[140px] font-serif">
             <div className="w-[70%] border border-black p-2 flex flex-col">
                <span className="text-[10px] mb-2 font-bold border-b border-black/20 pb-1">{template === 'jp-asing' ? '志望の動機、自己PRなど' : '志望の動機、特技、好きな学科、アピールポイントなど'}</span>
                <div className={`flex-1 text-[10.5px] whitespace-pre-wrap leading-[1.6] ${basics.summary ? 'text-black' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</div>
             </div>
             <div className="w-[30%] flex flex-col gap-[0.2rem]">
                <div className="flex-1 border border-black p-2 relative">
                   <span className="text-[9px] absolute top-1 left-2">通勤時間</span>
                   <div className="flex items-center justify-center h-full w-full text-[11px] mt-2">約 <span className="mx-2 border-b border-black w-6 text-center">{basics.commuteTime || <span className="text-gray-400">{dBasics.commuteTime}</span>}</span> 時間 <span className="mx-2 border-b border-black w-6 text-center">{basics.commuteMinute || <span className="text-gray-400">{dBasics.commuteMinute}</span>}</span> 分</div>
                </div>
                <div className="flex-1 flex gap-[0.2rem]">
                   <div className="w-1/2 border border-black p-2 relative">
                      <span className="text-[8px] absolute top-1 left-1 leading-tight text-center w-full">扶養家族<br/>(配偶者を除く)</span>
                      <div className="flex items-center justify-center h-full w-full text-[11px] mt-2"><span className="mx-1 border-b border-black w-6 text-center">{basics.dependents || <span className="text-gray-400">{dBasics.dependents}</span>}</span> 人</div>
                   </div>
                   <div className="w-1/2 flex flex-col gap-[0.2rem]">
                      <div className="border border-black h-1/2 flex flex-col items-center justify-center relative">
                         <span className="text-[8px] absolute top-0.5 w-full text-center">配偶者</span>
                         <span className="text-[11px] mt-2">{basics.spouse || <span className="text-gray-400">{dBasics.spouse}</span>}</span>
                      </div>
                      <div className="border border-black h-1/2 flex flex-col items-center justify-center relative">
                         <span className="text-[7px] absolute top-0.5 w-full text-center">配偶者の扶養義務</span>
                         <span className="text-[11px] mt-2">{basics.spouseSupport || <span className="text-gray-400">{dBasics.spouseSupport}</span>}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  // =========================================================================
  // UI RENDER START
  // =========================================================================
  return (
    <div className="flex flex-col h-[100dvh] bg-[#040914] text-slate-200 font-sans overflow-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* GLOBAL CSS PRINT FIX: Menghapus Secara Paksa Area UI Website  */}
      {/* Memastikan kertas tidak melengkung dan tidak nembus ke lembar 2 */}
      {/* ------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white !important; margin: 0; padding: 0; }
          
          /* Hapus Semua UI Website */
          .no-print, header, nav, footer, aside, button, .show-in-pwa { display: none !important; }
          
          /* Runtuhkan (Flatten) hirarki flexbox agar ukuran mutlak milik kertas saja */
          #__next, main, div.flex-col, div.lg\\:flex-row, #preview-area {
            display: block !important; width: 100% !important; height: auto !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; overflow: visible !important; position: static !important; background: transparent !important;
          }
          
          /* Lepas Kertas dari Efek Zoom & Radius */
          #preview-area > div > div { transform: none !important; width: 100% !important; height: auto !important; margin: 0 !important; padding: 0 !important; display: block !important; }
          
          #cv-paper {
            width: 21cm !important; min-height: 29.7cm !important; margin: 0 auto !important; padding: 1.5cm !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; page-break-after: auto; transform: none !important;
          }
          
          .break-inside-avoid, h2, h3, tr { break-inside: avoid !important; page-break-inside: avoid !important; }
        }
        
        /* Custom Scrollbar Modern untuk Panel Kiri/Kanan */
        .panel-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .panel-scroll::-webkit-scrollbar-track { background: transparent; }
        .panel-scroll::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.3); border-radius: 10px; }
        .panel-scroll::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.6); }
      `}} />

      {/* HEADER NAV (NO PRINT) */}
      <div className="h-[65px] bg-[#0A1329] border-b border-white/10 flex items-center justify-between px-6 shrink-0 no-print z-50">
        <div className="flex items-center gap-3">
          <ShieldIcon />
          <h1 className="text-lg font-black tracking-widest uppercase">ATS <span className="text-cyan-500">CV Maker</span></h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setDocMode('cv')} className={`px-4 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all ${docMode === 'cv' ? 'bg-cyan-600 text-white shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Mode CV</button>
          <button onClick={() => setDocMode('cl')} className={`px-4 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all ${docMode === 'cl' ? 'bg-cyan-600 text-white shadow-md' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>Surat Lamaran</button>
        </div>
      </div>

      {/* MAIN WORKSPACE (INDEPENDENT SCROLL LAYOUT) */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        
        {/* ========================================================= */}
        {/* PANEL KIRI: FORMULIR INPUT                                  */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto panel-scroll bg-[#060D1F] p-5 sm:p-8 no-print border-r border-white/10 relative z-10 pb-32">
          
          {docMode === 'cv' ? (
            <>
              {/* TABS KONTROL GLOBAL (TEMPLATE, TRANSLATE, KARIR) */}
              <div className="mb-6 bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md">
                
                <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3">1. Pilih Bahasa Terjemahan Otomatis</h3>
                <div className="flex bg-[#060D1F] rounded border border-white/10 overflow-hidden mb-5 shadow-inner">
                  <button onClick={() => handleMagicTranslate('id')} disabled={isTranslating} className={`flex-1 py-2 text-[11px] font-bold tracking-wider transition-colors ${lang === 'id' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>Indonesia</button>
                  <button onClick={() => handleMagicTranslate('en')} disabled={isTranslating} className={`flex-1 py-2 text-[11px] font-bold tracking-wider transition-colors ${lang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>English</button>
                  <button onClick={() => { handleMagicTranslate('jp'); setTemplate('jp-umum'); }} disabled={isTranslating} className={`flex-1 py-2 text-[11px] font-bold tracking-wider transition-colors ${lang === 'jp' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>Jepang (JIS)</button>
                </div>
                
                <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3">2. Pilih Desain Kertas</h3>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <button onClick={() => {setTemplate('normal'); if(lang==='jp') setLang('id');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'normal' ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-cyan-500/30'}`}>Standar ATS</button>
                  <button onClick={() => {setTemplate('modern'); if(lang==='jp') setLang('id');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'modern' ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-cyan-500/30'}`}>Modern Pro</button>
                  <button onClick={() => {setTemplate('harvard'); if(lang==='jp') setLang('id');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'harvard' ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-cyan-500/30'}`}>Harvard (Serif)</button>
                  <button onClick={() => {setTemplate('executive'); if(lang==='jp') setLang('id');}} className={`py-2 px-2 text-[11px] font-bold rounded border transition-all ${template === 'executive' ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg' : 'border-white/10 text-slate-400 hover:bg-white/5 hover:border-cyan-500/30'}`}>Tech Executive</button>
                </div>

                {!isJapanese && (
                  <>
                    <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3 border-t border-white/10 pt-5">3. Tipe Pelamar (Standardisasi Urutan Kertas)</h3>
                    <div className="flex bg-[#060D1F] rounded border border-white/10 overflow-hidden mb-2 shadow-inner">
                      <button onClick={() => { setCareerLevel('fresh'); setActiveTab('edu'); }} className={`flex-1 px-4 py-2.5 text-[11px] font-bold tracking-wider transition-colors ${careerLevel === 'fresh' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>Fresh Graduate (Pemula)</button>
                      <button onClick={() => { setCareerLevel('experienced'); setActiveTab('exp'); }} className={`flex-1 px-4 py-2.5 text-[11px] font-bold tracking-wider transition-colors ${careerLevel === 'experienced' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>Berpengalaman</button>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                      {careerLevel === 'fresh' ? '💡 Mode Fresh Grad: Pendidikan & Proyek (Tugas Akhir) diletakkan di urutan atas agar HRD fokus pada pencapaian akademik.' : '💡 Mode Profesional: Pengalaman Kerja diletakkan di urutan pertama agar HRD langsung melihat riwayat karir Anda.'}
                    </p>
                  </>
                )}
              </div>

              {/* NAVIGASI TAB FORM */}
              <div className="flex overflow-x-auto panel-scroll gap-2 mb-6 pb-2 border-b border-white/10 sticky top-0 bg-[#060D1F] z-20 pt-2">
                {cvTabs.map(tab => (
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
                    <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md">
                      <SectionHeader title="Informasi Dasar" tips="HRD hanya butuh data relevan. Hindari mengisi alamat terlalu detail (cukup Kota, Provinsi)." />
                      <LabeledInput label="Nama Lengkap" helper="Sesuai KTP atau Nama Profesional."><input type="text" name="name" value={basics.name} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={isEn?'John Doe':'Contoh: Budi Santoso'}/></LabeledInput>
                      <LabeledInput label="Posisi yang Dilamar" helper="Akan dicetak tebal di bawah nama."><input type="text" name="role" value={basics.role} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={isEn?'Data Analyst':'Contoh: Admin Staff'}/></LabeledInput>
                      <div className="grid grid-cols-2 gap-4">
                        <LabeledInput label="Lokasi / Kota"><input type="text" name="location" value={basics.location} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={isEn?'Jakarta, ID':'Contoh: Jakarta Selatan'}/></LabeledInput>
                        <LabeledInput label="Nomor WA Aktif"><input type="text" name="phone" value={basics.phone} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="0812-xxxx-xxxx"/></LabeledInput>
                      </div>
                      <LabeledInput label="Email Profesional"><input type="email" name="email" value={basics.email} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder="email@anda.com"/></LabeledInput>
                      <LabeledInput label="Profil Singkat (Summary)" helper="Tulis 3-4 kalimat ringkasan tentang kekuatan dan visi karir Anda. Ini adalah kesan pertama HRD."><textarea name="summary" value={basics.summary} onChange={handleBasics} rows="4" className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="Ceritakan sedikit tentang diri Anda..."></textarea></LabeledInput>
                      {!isJapanese && (
                        <LabeledInput label="Keahlian Utama (Skills)" helper="Wajib dipisahkan dengan koma (,). Contoh: Kepemimpinan, Desain Grafis, MS Excel."><textarea name="skills" value={basics.skills} onChange={handleBasics} rows="3" className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="Keahlian 1, Keahlian 2, Keahlian 3"></textarea></LabeledInput>
                      )}
                    </div>

                    {!isJapanese && (
                    <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md">
                      <SectionHeader title="Tautan Profil Digital" onAdd={() => addArr(setProfiles, profiles, {platform:"", url:""})} tips="LinkedIn sangat disarankan. Kosongkan URL jika tidak ada agar otomatis hilang di kertas." />
                      {profiles.map((prof, i) => (
                        <div key={prof.id} className="flex flex-col sm:flex-row gap-3 mb-3 relative bg-[#060D1F] p-4 sm:p-3 rounded-lg border border-white/10 shadow-inner">
                          <button onClick={() => remArr(setProfiles, profiles, i)} className="absolute top-2 right-2 sm:-top-2 sm:-right-2 bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded-full z-10">Hapus</button>
                          <div className="w-full sm:w-1/3"><LabeledInput label="Nama Situs"><input type="text" value={prof.platform} onChange={(e) => handleArr(setProfiles, profiles, i, 'platform', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Cth: LinkedIn" /></LabeledInput></div>
                          <div className="w-full sm:w-2/3"><LabeledInput label="URL Tautan"><input type="text" value={prof.url} onChange={(e) => handleArr(setProfiles, profiles, i, 'url', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="linkedin.com/in/nama" /></LabeledInput></div>
                        </div>
                      ))}
                    </div>
                    )}
                  </div>
                )}

                {/* TAB: PENDIDIKAN */}
                {activeTab === 'edu' && (
                  <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md space-y-4">
                    <SectionHeader title="Pendidikan Terakhir" onAdd={() => addArr(setEducations, educations, {institution:"", major:"", period:"", gpa:""})} tips={careerLevel === 'fresh' ? 'Sebagai Fresh Grad, Anda bisa menambahkan info organisasi intra-kampus di bagian Proyek.' : 'Cukup masukkan pendidikan terakhir (Universitas/SMA).'} />
                    {educations.map((edu, i) => (
                      <div key={edu.id} className="bg-[#060D1F] p-5 rounded-lg border border-white/10 relative shadow-inner">
                        <button onClick={() => remArr(setEducations, educations, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                        <LabeledInput label="Nama Instansi"><input type="text" value={edu.institution} onChange={(e) => handleArr(setEducations, educations, i, 'institution', e.target.value)} className="w-11/12 bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500 font-bold" placeholder="Nama Kampus/Sekolah"/></LabeledInput>
                        <LabeledInput label="Jurusan / Gelar"><input type="text" value={edu.major} onChange={(e) => handleArr(setEducations, educations, i, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Cth: S1 Ilmu Komputer"/></LabeledInput>
                        <div className="grid grid-cols-2 gap-4">
                          <LabeledInput label="Tahun"><input type="text" value={edu.period} onChange={(e) => handleArr(setEducations, educations, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="2018 - 2022"/></LabeledInput>
                          <LabeledInput label="Nilai/IPK (Opsional)"><input type="text" value={edu.gpa} onChange={(e) => handleArr(setEducations, educations, i, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="3.80 / 4.00"/></LabeledInput>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB: PENGALAMAN */}
                {activeTab === 'exp' && (
                  <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md space-y-4">
                    <SectionHeader title="Pengalaman Kerja" onAdd={() => addArr(setExperiences, experiences, {role:"", company:"", period:"", description:""})} tips={careerLevel === 'fresh' ? 'Kosongkan (Hapus) jika belum ada. Anda bisa memasukkan Magang/Freelance di sini.' : 'Gunakan tanda strip (-) di kolom Deskripsi untuk membuat Bullet Poin rapi.'} />
                    {experiences.map((exp, i) => (
                      <div key={exp.id} className="bg-[#060D1F] p-5 rounded-lg border border-white/10 relative shadow-inner">
                        <button onClick={() => remArr(setExperiences, experiences, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                        <LabeledInput label="Nama Perusahaan"><input type="text" value={exp.company} onChange={(e) => handleArr(setExperiences, experiences, i, 'company', e.target.value)} className="w-11/12 bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500 font-bold" placeholder="PT Nama Perusahaan"/></LabeledInput>
                        <div className="grid grid-cols-2 gap-4">
                          <LabeledInput label="Posisi"><input type="text" value={exp.role} onChange={(e) => handleArr(setExperiences, experiences, i, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Cth: Staff Admin"/></LabeledInput>
                          <LabeledInput label="Tahun Bekerja"><input type="text" value={exp.period} onChange={(e) => handleArr(setExperiences, experiences, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Jan 2022 - Des 2023"/></LabeledInput>
                        </div>
                        <LabeledInput label="Deskripsi (Gunakan Strip - di Awal)"><textarea value={exp.description} onChange={(e) => handleArr(setExperiences, experiences, i, 'description', e.target.value)} rows="5" className="w-full bg-[#0A1329] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder={"- Fokus pada pencapaian dengan metrik angka.\n- Berhasil meningkatkan efisiensi operasional 20%."}></textarea></LabeledInput>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB: PROYEK */}
                {activeTab === 'proj' && (
                  <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md space-y-4">
                    <SectionHeader title="Proyek Spesial" onAdd={() => addArr(setProjects, projects, {name:"", period:"", description:""})} tips="Tempat terbaik untuk Tugas Akhir Kampus, Kepanitiaan Organisasi, atau Proyek Pribadi." />
                    {projects.map((proj, i) => (
                      <div key={proj.id} className="bg-[#060D1F] p-5 rounded-lg border border-white/10 relative shadow-inner">
                        <button onClick={() => remArr(setProjects, projects, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                        <div className="grid grid-cols-2 gap-4">
                          <LabeledInput label="Nama Kegiatan/Proyek"><input type="text" value={proj.name} onChange={(e) => handleArr(setProjects, projects, i, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500 font-bold" placeholder="Cth: Skripsi / Riset A"/></LabeledInput>
                          <LabeledInput label="Waktu Pelaksanaan"><input type="text" value={proj.period} onChange={(e) => handleArr(setProjects, projects, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Tahun"/></LabeledInput>
                        </div>
                        <LabeledInput label="Peran Anda (Gunakan Strip - di Awal)"><textarea value={proj.description} onChange={(e) => handleArr(setProjects, projects, i, 'description', e.target.value)} rows="3" className="w-full bg-[#0A1329] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder={"- Bertanggung jawab sebagai ketua pelaksana."}></textarea></LabeledInput>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB: SERTIFIKASI */}
                {activeTab === 'cert' && (
                  <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md space-y-4">
                    <SectionHeader title="Sertifikasi & Kursus" onAdd={() => addArr(setCerts, certs, {name:"", issuer:"", period:"", description:""})} tips="Tidak punya? Silakan klik 'Hapus' dan elemen akan otomatis bersih dari kertas cetak." />
                    {certs.map((cert, i) => (
                      <div key={cert.id} className="bg-[#060D1F] p-5 rounded-lg border border-white/10 relative shadow-inner">
                        <button onClick={() => remArr(setCerts, certs, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                        <div className="grid grid-cols-2 gap-4">
                          <LabeledInput label="Nama Pelatihan"><input type="text" value={cert.name} onChange={(e) => handleArr(setCerts, certs, i, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500 font-bold" placeholder="Cth: Bootcamp UX"/></LabeledInput>
                          <LabeledInput label="Tahun"><input type="text" value={cert.period} onChange={(e) => handleArr(setCerts, certs, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Tahun Lulus"/></LabeledInput>
                        </div>
                        <LabeledInput label="Lembaga Penyelenggara"><input type="text" value={cert.issuer} onChange={(e) => handleArr(setCerts, certs, i, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Cth: Google, BNSP"/></LabeledInput>
                        <LabeledInput label="Ilmu / Topik yang Didapat"><textarea value={cert.description} onChange={(e) => handleArr(setCerts, certs, i, 'description', e.target.value)} rows="3" className="w-full bg-[#0A1329] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder={"- Mempelajari dasar-dasar digital marketing."}></textarea></LabeledInput>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* NAVIGASI BAWAH UNTUK BOOMERS */}
                <div className="flex justify-between items-center mt-8 pt-5 border-t border-white/10">
                   {currentTabIndex > 0 ? (
                      <button onClick={() => setActiveTab(cvTabs[currentTabIndex - 1].id)} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-colors border border-white/10">
                         &laquo; Kembali
                      </button>
                   ) : <div />}
                   
                   {currentTabIndex < cvTabs.length - 1 ? (
                      <button onClick={() => setActiveTab(cvTabs[currentTabIndex + 1].id)} className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg">
                         Selanjutnya &raquo;
                      </button>
                   ) : (
                      <button onClick={() => window.print()} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg">
                         Cetak PDF Sekarang
                      </button>
                   )}
                </div>
              </div>
            ) : (
              // =========================================================
              // MODE COVER LETTER
              // =========================================================
              <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 space-y-6 animate-fade-in-up shadow-md">
                <SectionHeader title="Cover Letter Builder" tips="Data pribadi Anda (Nama, Email, dll) langsung ditarik dari form 'Mode CV'. Anda cukup merancang tujuan surat." />
                
                <div className="p-5 bg-[#060D1F] border border-blue-500/20 rounded-xl shadow-inner">
                  <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-blue-500/20 pb-2">Destinasi Surat</h3>
                  <LabeledInput label="Perusahaan Tujuan"><input type="text" name="company" value={clData.company} onChange={handleCL} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-blue-500 outline-none" placeholder="PT Nama Perusahaan"/></LabeledInput>
                  <LabeledInput label="Posisi yang Dilamar"><input type="text" name="targetRole" value={clData.targetRole} onChange={handleCL} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-blue-500 outline-none" placeholder="Cth: Staff Administrasi"/></LabeledInput>
                  <div className="grid grid-cols-2 gap-4">
                    <LabeledInput label="Nama Penerima (HRD)"><input type="text" name="hr" value={clData.hr} onChange={handleCL} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-blue-500 outline-none" placeholder="Bapak/Ibu HRD"/></LabeledInput>
                    <LabeledInput label="Tanggal Surat"><input type="date" name="date" value={clData.date} onChange={handleCL} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm focus:border-blue-500 outline-none cursor-pointer" /></LabeledInput>
                  </div>
                </div>

                <div className="p-5 bg-[#060D1F] border border-emerald-500/20 rounded-xl shadow-inner">
                  <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4 border-b border-emerald-500/20 pb-2">Konten Surat</h3>
                  <button onClick={() => {
                    const role = clData.targetRole || basics.role || '[Posisi yang Dilamar]';
                    const comp = clData.company || '[Nama Perusahaan]';
                    const text = lang === 'en' 
                      ? `Please accept this letter as an expression of my strong interest in the ${role} position at ${comp}.\n\nWith my background and proven expertise in my field, along with my relevant professional experience, I am confident in my ability to make an immediate and positive impact on your operations.\n\nI have attached my resume for your review, which further details my career achievements and qualifications. I would welcome the opportunity to discuss how my skill set aligns with the needs of your organization in an interview.\n\nThank you very much for your time, consideration, and forthcoming response.`
                      : `Berdasarkan informasi lowongan pekerjaan yang saya peroleh, saya bermaksud menyampaikan ketertarikan saya untuk melamar posisi ${role} di ${comp}.\n\nDengan latar belakang dan minat kuat yang saya miliki di bidang ini, serta pengalaman kerja yang relevan, saya yakin dapat beradaptasi dengan cepat dan memberikan kontribusi nyata bagi tim Anda.\n\nBersama surat lamaran ini, saya lampirkan Curriculum Vitae (CV) sebagai bahan pertimbangan Bapak/Ibu untuk melihat detail kualifikasi dan riwayat profesional saya. Saya sangat berharap dapat diberikan kesempatan wawancara guna mendiskusikan bagaimana potensi saya dapat sejalan dengan visi perusahaan.\n\nTerima kasih atas waktu dan perhatian yang Bapak/Ibu berikan.`;
                    setClData({...clData, body: text});
                  }} className="w-full mb-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold text-xs uppercase tracking-widest rounded transition-colors border border-emerald-500/50">Gunakan Template Standar</button>
                  <textarea name="body" value={clData.body} onChange={handleCL} rows="12" className="w-full bg-[#0A1329] border border-white/10 p-4 rounded-lg text-white text-sm focus:border-emerald-500 outline-none leading-relaxed" placeholder="Ketik surat pengantar Anda di sini... Atau klik tombol hijau di atas."></textarea>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* PANEL KANAN: PREVIEW KERTAS (SCROLL MANDIRI & ZOOMABLE)   */}
          {/* ========================================================= */}
          <div id="preview-area" className="w-full lg:w-[55%] xl:w-[60%] h-full overflow-y-auto panel-scroll bg-[#030712] relative flex flex-col no-print border-l border-white/5">
            
            {/* TOOLBAR KERTAS */}
            <div className="sticky top-0 z-40 bg-[#0A1329]/95 backdrop-blur-md p-4 border-b border-white/10 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <ZoomInIcon />
                <input type="range" min="0.4" max="1.5" step="0.05" value={scale} onChange={(e) => setScale(e.target.value)} className="w-20 sm:w-32 accent-cyan-500 cursor-pointer" />
                <span className="text-[10px] font-bold text-cyan-400 w-8">{Math.round(scale * 100)}%</span>
              </div>
              <button onClick={() => window.print()} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] text-[10px] uppercase tracking-widest flex items-center gap-2">
                <PrintIcon /> Cetak PDF
              </button>
            </div>

            {/* AREA KANVAS KERTAS (ZOOMABLE) */}
            <div className="flex-1 overflow-visible flex justify-center py-10 pb-32">
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.15s ease' }} className="w-fit h-fit">
                
                {docMode === 'cl' ? (
                  <div id="cv-paper" className="w-[21cm] min-h-[29.7cm] bg-white text-black py-[2cm] px-[2.5cm] shadow-2xl shrink-0 border border-gray-200" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div className="w-full text-black flex flex-col h-full text-[11pt] leading-relaxed">
                      
                      <div className="mb-10 leading-snug text-gray-800 border-b border-gray-300 pb-6">
                        <div className="font-bold text-[14pt] text-black mb-2 uppercase tracking-wide">{basics.name || <span className="text-gray-400 font-normal">{dBasics.name}</span>}</div>
                        <div>{basics.location || <span className="text-gray-400">{dBasics.location}</span>}</div>
                        <div>{basics.phone || <span className="text-gray-400">{dBasics.phone}</span>}</div>
                        <div>{basics.email || <span className="text-gray-400">{dBasics.email}</span>}</div>
                      </div>

                      <div className="mb-8 font-medium">{formatVisualDate(clData.date)}</div>
                      
                      <div className="mb-10 leading-snug">
                        <div>{isEn ? 'To:' : 'Kepada Yth.'}</div>
                        <div className="font-bold">{clData.hr || <span className="text-gray-400 font-normal">{isEn ? '[Hiring Manager Name]' : '[Bapak/Ibu HRD]'}</span>}</div>
                        <div className="font-bold text-[12pt] mt-0.5">{clData.company || <span className="text-gray-400 font-normal">{isEn ? '[Target Company]' : '[Nama Perusahaan]'}</span>}</div>
                      </div>
                      
                      <div className="mb-6 font-medium">{isEn ? `Dear ${clData.hr || 'Hiring Manager'},` : 'Dengan hormat,'}</div>
                      
                      <div className="whitespace-pre-wrap text-justify break-words flex-1 min-h-[150px]">
                        {clData.body || <span className="text-gray-400 italic">{(isEn ? 'Your cover letter body will appear here. Please use the "Auto-Generate" button to create a professional draft.' : 'Isi surat Anda masih kosong. Silakan gunakan tombol hijau "Gunakan Template Standar" di panel sebelah kiri untuk membuat draft profesional secara instan.')}</span>}
                      </div>
                      
                      <div className="mt-16">{isEn ? 'Sincerely,' : 'Hormat saya,'}<br/><br/><br/><br/><span className="font-bold underline decoration-gray-400 underline-offset-4">{basics.name || <span className="text-gray-400 font-normal no-underline">{dBasics.name}</span>}</span></div>
                    </div>
                  </div>
                ) : (
                  isJapanese ? <JPCvRenderer /> : <International_CV_Renderer />
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
