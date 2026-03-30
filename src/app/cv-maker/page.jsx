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

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const MagicPenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

export default function CVMaker() {
  const [template, setTemplate] = useState('normal'); 
  const [lang, setLang] = useState('id'); 
  const [isTranslating, setIsTranslating] = useState(false);
  const [docMode, setDocMode] = useState('cv'); // 'cv' or 'cl'

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const formatVisualDate = (dateStr, currentLang) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    if (currentLang === 'id') return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    if (currentLang === 'en') return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if (currentLang === 'jp') return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    return dateStr;
  };

  // =========================================================================
  // KAMUS BAHASA & PLACEHOLDER TEKS
  // =========================================================================
  const t = {
    id: {
      personal: "Informasi Dasar", exp: "PENGALAMAN KERJA", edu: "PENDIDIKAN", proj: "PROYEK", cert: "SERTIFIKASI", summary: "PROFIL SINGKAT", skills: "KEAHLIAN DAN KOMPETENSI",
      add: "+ Tambah", del: "Hapus", print: "Cetak / Simpan PDF",
      cvMode: "Data CV", clMode: "Surat Lamaran", clTarget: "Perusahaan Tujuan", clHr: "Nama HRD / Penerima", clDate: "Pilih Tanggal", clBody: "Isi Surat Lamaran", clAuto: "Auto-Generate Isi Surat",
      placeholders: { 
        name: "Nama Lengkap", role: "Posisi Dilamar", loc: "Kota, Provinsi", phone: "Nomor Telepon", email: "Alamat Email", linkedin: "URL Portofolio / LinkedIn",
        summary: "Tuliskan ringkasan profil Anda secara profesional...", 
        skills: "Keahlian 1, Keahlian 2, Keahlian 3 (Pisahkan koma)", 
        expRole: "Nama Jabatan", expComp: "Nama Perusahaan", expDate: "Bulan Tahun - Bulan Tahun", 
        eduInst: "Nama Kampus / Sekolah", eduMaj: "Jurusan / Gelar", eduDate: "Bulan Tahun Lulus",
        projName: "Nama Proyek", projDate: "Bulan Tahun", certName: "Nama Sertifikasi", certDate: "Bulan Tahun",
        clHr: "Bapak/Ibu HRD", clTarget: "PT Nama Perusahaan", clSenderLoc: "Kota, Provinsi", clSenderPhone: "0812-xxxx-xxxx", clSenderEmail: "email@anda.com", clTargetRole: "Contoh: Graphic Designer", clRelevantSkills: "Contoh: Adobe Illustrator, Photoshop"
      }
    },
    en: {
      personal: "Basic Information", exp: "EXPERIENCE", edu: "EDUCATION", proj: "PROJECTS", cert: "CERTIFICATION", summary: "PROFESSIONAL SUMMARY", skills: "SKILLS AND COMPETENCIES",
      add: "+ Add New", del: "Remove", print: "Print / Save as PDF",
      cvMode: "CV Data", clMode: "Cover Letter", clTarget: "Target Company", clHr: "Hiring Manager", clDate: "Select Date", clBody: "Cover Letter Body", clAuto: "Auto-Generate Content",
      placeholders: { 
        name: "Full Name", role: "Targeted Role", loc: "City, Country", phone: "Phone Number", email: "Email Address", linkedin: "LinkedIn / Portfolio URL",
        summary: "Write your professional summary here...", skills: "Core Skills (e.g. HTML, CSS, Figma)", 
        expRole: "Job Title", expComp: "Company Name", expDate: "Month Year - Month Year", 
        eduInst: "University Name", eduMaj: "Major / Degree", eduDate: "Graduation Date",
        projName: "Project Name", projDate: "Month Year", certName: "Certification Name", certDate: "Month Year",
        clHr: "Hiring Manager", clTarget: "Target Company Inc.", clSenderLoc: "City, Province", clSenderPhone: "+1 234 567 890", clSenderEmail: "your@email.com", clTargetRole: "e.g. Graphic Designer", clRelevantSkills: "e.g. Adobe Creative Suite, Design"
      }
    },
    jp: {
      personal: "基本情報", exp: "職務経歴", edu: "学歴", proj: "プロジェクト", cert: "資格・免許", summary: "自己PR / 職務要約", skills: "スキル・知識",
      add: "+ 追加", del: "削除", print: "PDFとして保存",
      cvMode: "履歴書 (CV)", clMode: "送付状 (Cover Letter)", clTarget: "応募先企業名", clHr: "採用担当者名", clDate: "日付を選択", clBody: "本文", clAuto: "AI 自動生成",
      placeholders: { 
        name: "氏名", role: "希望職種", loc: "住所", phone: "電話番号", email: "メールアドレス", linkedin: "リンク", 
        summary: "自己PRを入力してください...", skills: "スキル (HTML, CSS...)", 
        expRole: "役職", expComp: "会社名", expDate: "YYYY/MM", 
        eduInst: "学校名", eduMaj: "学部・学科", eduDate: "YYYY/MM", 
        projName: "プロジェクト名", projDate: "YYYY/MM", certName: "資格名", certDate: "YYYY/MM",
        clHr: "採用ご担当者様", clTarget: "〇〇株式会社", clSenderLoc: "住所", clSenderPhone: "電話番号", clSenderEmail: "メールアドレス", clTargetRole: "希望職種", clRelevantSkills: "関連スキル"
      }
    }
  }[lang];

  // =========================================================================
  // STATE FORMULIR UTAMA (CV)
  // =========================================================================
  const [basics, setBasics] = useState({ 
    name: "", furigana: "", role: "", location: "", addressFurigana: "", phone: "", email: "", linkedin: "", summary: "", skills: "",
    birthdate: "", age: "", gender: "男", nationality: "", visa: "", commuteTime: "", commuteMinute: "", dependents: "", spouse: "", spouseSupport: ""
  });
  const [experiences, setExperiences] = useState([{ id: 1, role: "", company: "", period: "", description: "" }]);
  const [educations, setEducations] = useState([{ id: 1, institution: "", major: "", period: "", gpa: "" }]);
  const [projects, setProjects] = useState([{ id: 1, name: "", period: "", description: "" }]);
  const [certs, setCerts] = useState([{ id: 1, name: "", issuer: "", period: "", description: "" }]);

  // =========================================================================
  // STATE COVER LETTER
  // =========================================================================
  const [clData, setClData] = useState({
    senderName: "", senderLocation: "", senderPhone: "", senderEmail: "",
    targetRole: "", relevantSkills: "", company: "", hr: "", date: getTodayDate(), body: ""
  });

  const handleBasicsChange = (e) => setBasics({ ...basics, [e.target.name]: e.target.value });
  const handleClChange = (e) => setClData({ ...clData, [e.target.name]: e.target.value });
  const handleArrayChange = (setter, state, index, field, value) => { const newState = [...state]; newState[index][field] = value; setter(newState); };
  const addField = (setter, state, emptyObj) => setter([...state, { id: Date.now(), ...emptyObj }]);
  const removeField = (setter, state, index) => setter(state.filter((_, i) => i !== index));

  const generateCoverLetter = () => {
    const role = clData.targetRole || (lang === 'en' ? '[Targeted Role]' : lang === 'jp' ? '[希望職種]' : '[Posisi yang Dilamar]');
    const company = clData.company || (lang === 'en' ? '[Company Name]' : lang === 'jp' ? '[貴社]' : '[Nama Perusahaan]');
    const skills = clData.relevantSkills || (lang === 'en' ? '[Relevant Skills]' : lang === 'jp' ? '[スキル]' : '[Keahlian yang Relevan]');
    
    let text = "";
    if (lang === 'id') {
      text = `Berdasarkan informasi lowongan pekerjaan yang saya peroleh, saya bermaksud menyampaikan ketertarikan saya untuk melamar posisi ${role} di ${company}.\n\nDengan latar belakang dan spesialisasi saya di bidang ${skills}, serta pengalaman kerja yang relevan, saya yakin dapat beradaptasi dengan cepat dan memberikan kontribusi nyata bagi tim Anda.\n\nBersama surat lamaran ini, saya lampirkan Curriculum Vitae (CV) sebagai bahan pertimbangan Bapak/Ibu untuk melihat detail kualifikasi dan riwayat profesional saya. Saya sangat berharap dapat diberikan kesempatan wawancara guna mendiskusikan bagaimana potensi saya dapat sejalan dengan visi perusahaan.\n\nTerima kasih atas waktu dan perhatian yang Bapak/Ibu berikan.`;
    } else if (lang === 'en') {
      text = `Please accept this letter as an expression of my strong interest in the ${role} position at ${company}.\n\nWith my background and proven expertise in ${skills}, along with my relevant professional experience, I am confident in my ability to make an immediate and positive impact on your operations.\n\nI have attached my resume for your review, which further details my career achievements and qualifications. I would welcome the opportunity to discuss how my skill set aligns with the needs of your organization in an interview.\n\nThank you very much for your time, consideration, and forthcoming response.`;
    } else if (lang === 'jp') {
      text = `貴社益々ご清栄のこととお慶び申し上げます。\n\nこの度、貴社の求人（${role}）を拝見し、私の${skills}のスキルとこれまでの経験が貴社の事業に貢献できると確信し、応募いたしました。\n\n同封いたしました履歴書および職務経歴書をご査収くださいますようお願い申し上げます。\n面接の機会をいただけますと幸甚に存じます。\n\n何卒ご検討のほど、よろしくお願い申し上げます。`;
    }
    setClData({ ...clData, body: text });
  };

  const handleMagicTranslate = async (targetLangCode) => {
    setIsTranslating(true); setLang(targetLangCode); const apiLang = targetLangCode === 'jp' ? 'ja' : targetLangCode;
    const translateText = async (text) => {
      if (!text || text.trim() === "") return text;
      try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${apiLang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await res.json(); return data[0].map(item => item[0]).join(''); 
      } catch (err) { return text; }
    };
    const tRole = await translateText(basics.role); const tSummary = await translateText(basics.summary); const tSkills = await translateText(basics.skills); const tLocation = await translateText(basics.location); const tNationality = await translateText(basics.nationality); const tVisa = await translateText(basics.visa);
    setBasics(prev => ({ ...prev, role: tRole, summary: tSummary, skills: tSkills, location: tLocation, nationality: tNationality, visa: tVisa }));
    const tClHr = await translateText(clData.hr); const tClBody = await translateText(clData.body); const tClLoc = await translateText(clData.senderLocation); const tClTargetRole = await translateText(clData.targetRole); const tClRelSkills = await translateText(clData.relevantSkills);
    setClData(prev => ({ ...prev, hr: tClHr, body: tClBody, senderLocation: tClLoc, targetRole: tClTargetRole, relevantSkills: tClRelSkills }));
    const translatedEdu = await Promise.all(educations.map(async (edu) => ({ ...edu, institution: await translateText(edu.institution), major: await translateText(edu.major) }))); setEducations(translatedEdu);
    const translatedExp = await Promise.all(experiences.map(async (exp) => ({ ...exp, company: await translateText(exp.company), role: await translateText(exp.role), description: await translateText(exp.description) }))); setExperiences(translatedExp);
    const translatedProj = await Promise.all(projects.map(async (proj) => ({ ...proj, name: await translateText(proj.name), description: await translateText(proj.description) }))); setProjects(translatedProj);
    const translatedCerts = await Promise.all(certs.map(async (cert) => ({ ...cert, name: await translateText(cert.name), issuer: await translateText(cert.issuer) }))); setCerts(translatedCerts);
    setIsTranslating(false);
  };

  // =========================================================================
  // DATA DUMMY PLACEHOLDER (TAMPIL JIKA FORM KOSONG)
  // =========================================================================
  const dBasics = {
    name: lang === 'en' ? 'JOHN DOE' : lang === 'jp' ? '山田 太郎' : 'NAMA ANDA (PENGIRIM)',
    role: lang === 'en' ? 'Graphic Designer' : lang === 'jp' ? 'グラフィックデザイナー' : 'Graphic Designer / Posisi',
    location: lang === 'en' ? 'New York, USA' : lang === 'jp' ? '東京都渋谷区' : 'Jakarta, Indonesia',
    phone: lang === 'en' ? '+1 234 567 890' : lang === 'jp' ? '090-1234-5678' : '0812-3456-7890',
    email: lang === 'en' ? 'johndoe@email.com' : lang === 'jp' ? 'yamada@email.com' : 'email@anda.com',
    linkedin: lang === 'en' ? 'linkedin.com/in/johndoe' : lang === 'jp' ? 'linkedin.com/in/yamada' : 'linkedin.com/in/namaanda',
    summary: lang === 'en' 
      ? 'A highly motivated Graphic Designer with 3+ years of experience in visual branding and UI design. Passionate about creating engaging digital content that drives user engagement.' 
      : lang === 'jp' 
      ? '3年以上のデザイン経験を持つグラフィックデザイナー。ブランドアイデンティティやUIデザインに強みがあり、ユーザーの心を動かすビジュアル制作を得意としています。' 
      : 'Seorang Graphic Designer dengan pengalaman lebih dari 3 tahun dalam merancang identitas visual dan materi pemasaran. Memiliki minat yang kuat dalam menciptakan desain digital yang efektif.',
    skills: lang === 'en' ? 'Adobe Photoshop, Illustrator, Figma, UI/UX Design' : lang === 'jp' ? 'Adobe Photoshop, Illustrator, Figma, UI/UXデザイン' : 'Adobe Photoshop, Illustrator, Figma, Desain UI/UX',
    furigana: 'やまだ たろう', birthdate: '1995/01/01', age: '28', gender: '男', addressFurigana: 'とうきょうと しぶやく', nationality: 'インドネシア', visa: '特定技能1号', commuteTime: '1', commuteMinute: '30', dependents: '0', spouse: '無', spouseSupport: '無'
  };

  const isExpEmpty = experiences.length === 1 && !experiences[0].company && !experiences[0].role;
  const activeExp = isExpEmpty ? [
    { company: lang==='en'?'Creative Agency Inc.':lang==='jp'?'クリエイティブ株式会社':'PT Agensi Kreatif', role: lang==='en'?'Senior Designer':lang==='jp'?'シニアデザイナー':'Senior Designer', period: lang==='en'?'2021 - Present':lang==='jp'?'2021/04':'2021 - Sekarang', description: lang==='en'?'- Lead the visual design team for 5 major client campaigns.\n- Increased engagement by 30% through rebranding.':lang==='jp'?'〇〇プロジェクトのデザイン制作をリード\nエンゲージメント率を30％向上':'- Memimpin tim desain visual untuk 5 kampanye klien besar.\n- Meningkatkan engagement sebesar 30% melalui strategi rebranding.', isPlaceholder: true }
  ] : experiences.filter(e => e.company.trim() || e.role.trim());

  const isEduEmpty = educations.length === 1 && !educations[0].institution && !educations[0].major;
  const activeEdu = isEduEmpty ? [
    { institution: lang==='en'?'University of Design':lang==='jp'?'〇〇デザイン大学':'Universitas Desain Indonesia', major: lang==='en'?'Bachelor of Arts in Graphic Design':lang==='jp'?'芸術学部 デザイン学科':'S1 Desain Komunikasi Visual', period: lang==='en'?'2016 - 2020':lang==='jp'?'2020/03':'2016 - 2020', gpa: '3.80 / 4.00', isPlaceholder: true }
  ] : educations.filter(e => e.institution.trim() || e.major.trim());

  const isProjEmpty = projects.length === 1 && !projects[0].name && !projects[0].description;
  const activeProj = isProjEmpty ? [
    { name: lang==='en'?'E-Commerce UI Redesign':lang==='jp'?'ECサイトUIリニューアル':'Redesign UI E-Commerce', period: lang==='en'?'2022':lang==='jp'?'2022/08':'2022', description: lang==='en'?'- Redesigned the entire checkout flow.\n- Decreased cart abandonment by 15%.':lang==='jp'?'カート画面のUIを改善\nカゴ落ち率を15％削減':'- Merancang ulang seluruh alur checkout pengguna.\n- Berhasil mengurangi cart abandonment sebesar 15%.', isPlaceholder: true }
  ] : projects.filter(p => p.name.trim() || p.description.trim());

  const isCertEmpty = certs.length === 1 && !certs[0].name && !certs[0].issuer;
  const activeCerts = isCertEmpty ? [
    { name: lang==='en'?'UX Design Professional':lang==='jp'?'日本語能力試験 N2':'Sertifikasi Profesional UX', period: lang==='en'?'2023':lang==='jp'?'2023/12':'2023', issuer: 'Google', description: lang==='en'?'- Mastered user research and wireframing.':'- Spesialisasi dalam riset pengguna dan wireframing.', isPlaceholder: true }
  ] : certs.filter(c => c.name.trim() || c.issuer.trim());

  // PARSER TABEL JEPANG (JIS)
  const parseJpDate = (dateStr) => {
    if (!dateStr) return { year: '', month: '' };
    const parts = dateStr.split(/[\/\-\s]+/);
    if (parts.length >= 2) return { year: parts[0], month: parts[1].replace(/^0+/, '') };
    return { year: dateStr, month: '' };
  };

  const getJpEduExpRows = () => {
    const rows = [];
    rows.push({ year: '', month: '', content: '学歴', center: true, isPlaceholder: false });
    activeEdu.forEach(item => { const d = parseJpDate(item.period); rows.push({ year: d.year, month: d.month, content: `${item.institution} ${item.major} 入学/卒業`, isPlaceholder: item.isPlaceholder }); });
    rows.push({ year: '', month: '', content: '', center: true, isPlaceholder: false }); 
    rows.push({ year: '', month: '', content: '職歴', center: true, isPlaceholder: false });
    activeExp.forEach(item => { const d = parseJpDate(item.period); rows.push({ year: d.year, month: d.month, content: `${item.company} 入社`, isPlaceholder: item.isPlaceholder }); if (item.role) rows.push({ year: '', month: '', content: `　${item.role}`, isPlaceholder: item.isPlaceholder }); });
    if (activeExp.some(e => e.company && !e.isPlaceholder)) { rows.push({ year: '', month: '', content: '現在に至る', right: true }); rows.push({ year: '', month: '', content: '以上', right: true }); }
    else if (activeExp[0]?.isPlaceholder) { rows.push({ year: '', month: '', content: '現在に至る', right: true, isPlaceholder: true }); rows.push({ year: '', month: '', content: '以上', right: true, isPlaceholder: true }); }
    while(rows.length < 16) rows.push({ year: '', month: '', content: '', isPlaceholder: false });
    return rows.slice(0, 16); 
  };

  const getJpCertRows = () => {
    const rows = [];
    activeCerts.forEach(item => { const d = parseJpDate(item.period); rows.push({ year: d.year, month: d.month, content: `${item.name} 取得`, isPlaceholder: item.isPlaceholder }); });
    if (activeCerts.some(e => e.name)) rows.push({ year: '', month: '', content: '以上', right: true, isPlaceholder: activeCerts[0]?.isPlaceholder });
    while(rows.length < 5) rows.push({ year: '', month: '', content: '', isPlaceholder: false });
    return rows.slice(0, 5);
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
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; opacity: 0.7; }
        input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 1; }
      `}} />

      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 no-print animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wide mb-5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <ShieldIcon /> 100% Aman. Kami tidak menyimpan atau merekam data Anda.
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">ATS <span className="text-cyan-500">CV Maker</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Sistem canggih untuk menyusun CV yang ramah mesin ATS (HRD), sekaligus generator otomatis untuk Surat Lamaran Kerja (Cover Letter). <span className="text-cyan-400 font-medium">Langsung cetak ke PDF secara gratis.</span>
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* ========================================================= */}
          {/* KOLOM KIRI: FORMULIR ISIAN                                  */}
          {/* ========================================================= */}
          <div className="w-full xl:w-5/12 bg-[#0A1329] border border-white/10 p-6 rounded-[2rem] no-print xl:sticky xl:top-32 h-fit max-h-none xl:max-h-[80vh] overflow-visible xl:overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="flex p-1 bg-[#060D1F] border border-cyan-500/30 rounded-xl mb-6 shadow-inner relative overflow-hidden">
              <button onClick={() => setDocMode('cv')} className={`flex-1 flex justify-center items-center gap-2 py-3 text-xs font-bold rounded-lg transition-all z-10 ${docMode === 'cv' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <DocumentIcon /> {t.cvMode}
              </button>
              <button onClick={() => setDocMode('cl')} className={`flex-1 flex justify-center items-center gap-2 py-3 text-xs font-bold rounded-lg transition-all z-10 ${docMode === 'cl' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <MagicPenIcon /> {t.clMode}
              </button>
            </div>

            {/* PANDUAN DINAMIS & SANGAT DETAIL */}
            <div className="mb-6 p-5 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-[#0A1329] shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
              <div className="flex items-start gap-3 mb-3">
                <InfoIcon />
                <div>
                  <h3 className="text-cyan-400 font-bold text-[13px] mb-1 tracking-wide">
                    {docMode === 'cv' ? 'Panduan Super Mudah Mengisi CV' : 'Panduan Membuat Surat Lamaran Sakti'}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {docMode === 'cv' 
                      ? 'CV ATS (Applicant Tracking System) adalah format CV yang dirancang khusus agar data Anda mudah dibaca oleh sistem robot (scanner) HRD perusahaan.'
                      : 'Cover Letter (Surat Lamaran) adalah dokumen pengantar mandiri. Anda tidak perlu repot mengisi tab CV untuk bisa membuat surat lamaran di sini.'}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 text-[11px] text-slate-300 ml-1">
                {docMode === 'cv' ? (
                  <>
                    <li className="flex gap-2">
                      <span className="text-cyan-400 font-bold">1.</span>
                      <span><b>Mulai dari Bahasa Indonesia:</b> Isi seluruh kotak form di bawah ini dengan bahasa ibu agar Anda lebih mudah menyusun kalimatnya.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400 font-bold">2.</span>
                      <span><b>Fitur Bullet Point:</b> Saat mengisi kotak "Deskripsi" pekerjaan/proyek, gunakan tanda strip (-) di awal kalimat untuk membuat poin otomatis di kertas.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400 font-bold">3.</span>
                      <span><b>Sistem Translate Instan:</b> Tekan tombol kotak <b>EN</b> atau <b>JP</b> di panel "Magic Translate" bawah. AI akan otomatis menerjemahkan seluruh CV Anda tanpa merusak tata letak.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400 font-bold">4.</span>
                      <span><b>Placeholder Cerdas:</b> Teks abu-abu di kertas hanyalah <i>contoh</i> visual. Teks abu-abu itu akan otomatis terganti menjadi hitam rapi ketika Anda mengetik di form.</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex gap-2">
                      <span className="text-cyan-400 font-bold">1.</span>
                      <span><b>Langkah Pertama:</b> Isi kotak Data Pengirim (nama & kontak Anda). Kertas di sebelah kanan akan otomatis menyusunnya rata kiri layaknya surat resmi internasional.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400 font-bold">2.</span>
                      <span><b>Tentukan Tanggal:</b> Klik <i>Ikon Kalender</i>. Sistem akan otomatis memformat penulisan tanggal sesuai bahasa yang dipilih (misal: 30 Maret 2026 atau 2026年3月30日).</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-400 font-bold">3.</span>
                      <span><b>Senjata AI Auto-Generate:</b> Ketik spesifik posisi incaran dan keahlian andalan Anda. Lalu klik tombol biru <b>"Auto-Generate"</b>. AI akan merangkai paragraf pembuka, isi, dan penutup super profesional secara instan!</span>
                    </li>
                  </>
                )}
              </ul>
              
              <div className="mt-4 bg-cyan-900/30 p-2.5 rounded border border-cyan-500/30 flex gap-2">
                <div className="text-cyan-400 mt-0.5"><SparklesIcon className="w-4 h-4"/></div>
                <div className="text-[11px] text-cyan-50 leading-relaxed font-medium">
                  <span className="text-cyan-300 font-bold uppercase">Aturan Cetak Wajib:</span> Saat Anda menekan tombol cetak, selalu pastikan pengaturan Ukuran Kertas di browser diset ke <b>"A4"</b>, dan Margin (Batas Tepi) diset ke <b>"None" (Tidak Ada)</b> agar tidak terpotong.
                </div>
              </div>
            </div>

            <div className="mb-6 p-5 bg-[#060D1F] border border-cyan-500/30 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <SparklesIcon /> <h2 className="text-xs font-bold uppercase tracking-wider">Magic Translate</h2>
                </div>
                <div className="flex bg-[#0A1329] rounded border border-white/10 overflow-hidden shadow-inner">
                  <button onClick={() => handleMagicTranslate('id')} disabled={isTranslating} className={`px-4 py-1.5 text-xs font-bold transition-colors ${lang === 'id' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>ID</button>
                  <button onClick={() => handleMagicTranslate('en')} disabled={isTranslating} className={`px-4 py-1.5 text-xs font-bold transition-colors ${lang === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>EN</button>
                  <button onClick={() => { handleMagicTranslate('jp'); setTemplate('jp-umum'); }} disabled={isTranslating} className={`px-4 py-1.5 text-xs font-bold transition-colors ${lang === 'jp' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>JP</button>
                </div>
              </div>
              <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Pilih Template {docMode === 'cv' ? 'Kertas CV' : 'Font Surat'}</h2>
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
                <svg className="animate-spin h-4 w-4 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Mesin AI sedang memproses terjemahan...
              </div>
            )}

            {/* FORMULIR CV */}
            {docMode === 'cv' && (
              <div className="animate-fade-in-up">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-cyan-400 mb-3 border-b border-white/10 pb-1">{t.personal}</h2>
                  <div className="space-y-2">
                    <input type="text" name="name" value={basics.name} onChange={handleBasicsChange} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.name} />
                    {isJapanese && (
                      <>
                        <div className="flex gap-2">
                          <input type="text" name="furigana" value={basics.furigana} onChange={handleBasicsChange} className="w-1/2 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="ふりがな (Furigana Nama)" />
                          <input type="text" name="birthdate" value={basics.birthdate} onChange={handleBasicsChange} className="w-1/4 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Tahun Lahir" />
                          <input type="text" name="age" value={basics.age} onChange={handleBasicsChange} className="w-1/4 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="Umur" />
                        </div>
                        <div className="flex gap-2">
                          <input type="text" name="addressFurigana" value={basics.addressFurigana} onChange={handleBasicsChange} className="w-2/3 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="ふりがな (Furigana Alamat)" />
                          <select name="gender" value={basics.gender} onChange={handleBasicsChange} className="w-1/3 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none">
                            <option value="男">男 (Pria)</option>
                            <option value="女">女 (Wanita)</option>
                          </select>
                        </div>
                      </>
                    )}
                    {template === 'jp-asing' && (
                      <div className="flex gap-2">
                        <input type="text" name="nationality" value={basics.nationality} onChange={handleBasicsChange} className="w-1/2 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="国籍 (Kewarganegaraan)" />
                        <input type="text" name="visa" value={basics.visa} onChange={handleBasicsChange} className="w-1/2 bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="在留資格 (Status Visa)" />
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
                    <textarea name="summary" value={basics.summary} onChange={handleBasicsChange} rows={isJapanese ? 3 : 4} className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.summary}></textarea>
                    {!isJapanese && <textarea name="skills" value={basics.skills} onChange={handleBasicsChange} rows="3" className="w-full bg-[#060D1F] border border-white/5 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.skills}></textarea>}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                    <h2 className="text-lg font-bold text-cyan-400">{t.exp}</h2>
                    <button onClick={() => addField(setExperiences, experiences, { role: "", company: "", period: "", description: "" })} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-2 py-1 rounded transition-colors">{t.add}</button>
                  </div>
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="bg-[#060D1F] p-4 rounded-xl mb-3 relative border border-white/5">
                      <button onClick={() => removeField(setExperiences, experiences, index)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-[10px] font-bold px-2 py-1 bg-red-400/10 rounded">{t.del}</button>
                      <input type="text" value={exp.company} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'company', e.target.value)} className="w-11/12 bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder={t.placeholders.expComp} />
                      <input type="text" value={exp.role} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder={t.placeholders.expRole} />
                      <input type="text" value={exp.period} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder={t.placeholders.expDate} />
                      {!isJapanese && <textarea value={exp.description} onChange={(e) => handleArrayChange(setExperiences, experiences, index, 'description', e.target.value)} rows="3" className="w-full mt-2 bg-transparent border border-white/5 rounded p-2 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="- Tulis deskripsi pencapaian atau pekerjaan..."></textarea>}
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                    <h2 className="text-lg font-bold text-cyan-400">{t.edu}</h2>
                    <button onClick={() => addField(setEducations, educations, { institution: "", major: "", period: "", gpa: "" })} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-2 py-1 rounded transition-colors">{t.add}</button>
                  </div>
                  {educations.map((edu, index) => (
                    <div key={edu.id} className="bg-[#060D1F] p-4 rounded-xl mb-3 relative border border-white/5">
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

                {!isJapanese && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                    <h2 className="text-lg font-bold text-cyan-400">{t.proj}</h2>
                    <button onClick={() => addField(setProjects, projects, { name: "", period: "", description: "" })} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-2 py-1 rounded transition-colors">{t.add}</button>
                  </div>
                  {projects.map((proj, index) => (
                    <div key={proj.id} className="bg-[#060D1F] p-4 rounded-xl mb-3 relative border border-white/5">
                      <button onClick={() => removeField(setProjects, projects, index)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-[10px] font-bold px-2 py-1 bg-red-400/10 rounded">{t.del}</button>
                      <div className="grid grid-cols-2 gap-3 mb-2 pr-12">
                        <input type="text" value={proj.name} onChange={(e) => handleArrayChange(setProjects, projects, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.projName} />
                        <input type="text" value={proj.period} onChange={(e) => handleArrayChange(setProjects, projects, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.projDate} />
                      </div>
                      <textarea value={proj.description} onChange={(e) => handleArrayChange(setProjects, projects, index, 'description', e.target.value)} rows="3" className="w-full mt-2 bg-transparent border border-white/5 rounded p-2 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="- Deskripsi proyek..."></textarea>
                    </div>
                  ))}
                </div>
                )}

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-1">
                    <h2 className="text-lg font-bold text-cyan-400">{t.cert}</h2>
                    <button onClick={() => addField(setCerts, certs, { name: "", issuer: "", period: "", description: "" })} className="text-[10px] font-bold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white px-2 py-1 rounded transition-colors">{t.add}</button>
                  </div>
                  {certs.map((cert, index) => (
                    <div key={cert.id} className="bg-[#060D1F] p-4 rounded-xl mb-3 relative border border-white/5">
                      <button onClick={() => removeField(setCerts, certs, index)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-[10px] font-bold px-2 py-1 bg-red-400/10 rounded">{t.del}</button>
                      <div className="grid grid-cols-2 gap-3 mb-2 pr-12">
                        <input type="text" value={cert.name} onChange={(e) => handleArrayChange(setCerts, certs, index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.certName} />
                        <input type="text" value={cert.period} onChange={(e) => handleArrayChange(setCerts, certs, index, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.certDate} />
                      </div>
                      {!isJapanese && (
                        <>
                          <input type="text" value={cert.issuer} onChange={(e) => handleArrayChange(setCerts, certs, index, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/10 p-1.5 text-white text-sm focus:border-cyan-500 focus:outline-none mb-2" placeholder="Penerbit (Cth: Google, Dicoding)" />
                          <textarea value={cert.description} onChange={(e) => handleArrayChange(setCerts, certs, index, 'description', e.target.value)} rows="2" className="w-full mt-1 bg-transparent border border-white/5 rounded p-2 text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder="- Topik yang dipelajari..."></textarea>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {isJapanese && (
                  <div className="mb-6 bg-[#060D1F] p-4 rounded-xl border border-red-500/30">
                    <h2 className="text-sm font-bold text-red-400 mb-3 border-b border-red-500/20 pb-1">Detail Tambahan JIS</h2>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" name="commuteTime" value={basics.commuteTime} onChange={handleBasicsChange} className="w-full bg-transparent border border-white/10 p-2 text-white text-sm focus:border-red-500 focus:outline-none rounded" placeholder="Waktu Perjalanan (Jam)" />
                      <input type="text" name="commuteMinute" value={basics.commuteMinute} onChange={handleBasicsChange} className="w-full bg-transparent border border-white/10 p-2 text-white text-sm focus:border-red-500 focus:outline-none rounded" placeholder="Waktu (Menit)" />
                      <input type="text" name="dependents" value={basics.dependents} onChange={handleBasicsChange} className="w-full bg-transparent border border-white/10 p-2 text-white text-sm focus:border-red-500 focus:outline-none rounded" placeholder="Tanggungan (Anak)" />
                      <select name="spouse" value={basics.spouse} onChange={handleBasicsChange} className="w-full bg-transparent border border-white/10 p-2 text-white text-sm focus:border-red-500 focus:outline-none rounded">
                        <option value="" className="text-black">Status Pasangan</option>
                        <option value="有" className="text-black">Ada (Menikah)</option>
                        <option value="無" className="text-black">Tidak (Lajang)</option>
                      </select>
                      <select name="spouseSupport" value={basics.spouseSupport} onChange={handleBasicsChange} className="w-full bg-transparent border border-white/10 p-2 text-white text-sm focus:border-red-500 focus:outline-none rounded col-span-2">
                        <option value="" className="text-black">Wajib Menafkahi Pasangan?</option>
                        <option value="有" className="text-black">Ya</option>
                        <option value="無" className="text-black">Tidak</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FORMULIR COVER LETTER */}
            {docMode === 'cl' && (
              <div className="mb-6 animate-fade-in-up">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/10">
                  <h2 className="text-lg font-bold text-cyan-400">{t.clMode}</h2>
                  <button onClick={generateCoverLetter} className="flex items-center gap-1.5 text-[11px] font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-3 py-1.5 rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <MagicPenIcon /> {t.clAuto}
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">1. Data Anda (Pengirim)</div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold ml-1">Nama Lengkap Pengirim</label>
                      <input type="text" name="senderName" value={clData.senderName} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/5 p-2 rounded text-white text-sm focus:border-emerald-500 focus:outline-none" placeholder={t.placeholders.clSenderName} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold ml-1">Kota / Domisili Pengirim</label>
                      <input type="text" name="senderLocation" value={clData.senderLocation} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/5 p-2 rounded text-white text-sm focus:border-emerald-500 focus:outline-none" placeholder={t.placeholders.clSenderLoc} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold ml-1">Nomor Telepon/WA</label>
                        <input type="text" name="senderPhone" value={clData.senderPhone} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/5 p-2 rounded text-white text-sm focus:border-emerald-500 focus:outline-none" placeholder={t.placeholders.clSenderPhone} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold ml-1">Alamat Email</label>
                        <input type="email" name="senderEmail" value={clData.senderEmail} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/5 p-2 rounded text-white text-sm focus:border-emerald-500 focus:outline-none" placeholder={t.placeholders.clSenderEmail} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">2. Posisi & Keahlian</div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold ml-1">Posisi Pekerjaan yang Dilamar</label>
                      <input type="text" name="targetRole" value={clData.targetRole} onChange={handleClChange} className="w-full bg-[#060D1F] border border-cyan-500/40 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.clTargetRole} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold ml-1">Keahlian Relevan (Untuk disorot AI)</label>
                      <input type="text" name="relevantSkills" value={clData.relevantSkills} onChange={handleClChange} className="w-full bg-[#060D1F] border border-cyan-500/40 p-2.5 rounded text-white text-sm focus:border-cyan-500 focus:outline-none" placeholder={t.placeholders.clRelevantSkills} />
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">3. Tujuan & Isi Surat</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold ml-1">{t.clTarget}</label>
                        <input type="text" name="company" value={clData.company} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/5 p-2 rounded text-white text-sm focus:border-blue-500 focus:outline-none" placeholder={t.placeholders.clTarget} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold ml-1">{t.clDate} (Kalender)</label>
                        <input type="date" name="date" value={clData.date} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/5 p-2 rounded text-white text-sm focus:border-blue-500 focus:outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold ml-1">{t.clHr}</label>
                      <input type="text" name="hr" value={clData.hr} onChange={handleClChange} className="w-full bg-[#060D1F] border border-white/5 p-2 rounded text-white text-sm focus:border-blue-500 focus:outline-none" placeholder={t.placeholders.clHr} />
                    </div>
                    <div className="space-y-1 mt-4">
                      <label className="text-[10px] text-slate-400 font-bold ml-1">{t.clBody}</label>
                      <textarea name="body" value={clData.body} onChange={handleClChange} rows="10" className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none leading-relaxed" placeholder='Ketuk tombol "Auto-Generate" di pojok kanan atas agar AI merangkai surat lamaran ini secara profesional...'></textarea>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button onClick={() => window.print()} className="w-full mt-6 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] uppercase tracking-widest text-sm flex justify-center items-center gap-2">
              <PrintIcon /> {t.print}
            </button>
          </div>

          {/* ========================================================= */}
          {/* KOLOM KANAN: PREVIEW KERTAS (CV / COVER LETTER)             */}
          {/* ========================================================= */}
          <div className="w-full xl:w-7/12 bg-[#0A1329]/50 p-4 sm:p-6 rounded-[2rem] overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-cyan-600 [&::-webkit-scrollbar-thumb]:rounded-full shadow-inner border border-white/5">
            <div className="w-fit mx-auto relative">
              
              <div id="cv-preview" className={`w-[21cm] min-w-[21cm] min-h-[29.7cm] bg-white text-black py-10 px-12 sm:px-14 shadow-2xl shrink-0 border border-gray-200 
                ${template === 'normal' ? 'font-[Arial,Helvetica,sans-serif]' : template === 'harvard' || isJapanese ? 'font-serif' : 'font-sans'}`}>
                
                {/* ========================================================= */}
                {/* RENDER MODE: COVER LETTER                                 */}
                {/* ========================================================= */}
                {docMode === 'cl' ? (
                  <div className="w-full text-black flex flex-col min-h-[25cm]">
                    {isJapanese ? (
                      <div className="mb-10 text-[11px] font-serif leading-relaxed">
                        <div className="text-right mb-6">{formatVisualDate(clData.date, lang) || '日付'}</div>
                        <div className="text-left mb-6">
                          <div className="text-[12px]">{clData.company || <span className="text-gray-400">〇〇株式会社</span>} 御中</div>
                          {clData.hr && <div className="text-[12px] mt-1">{clData.hr} 様</div>}
                        </div>
                        <div className="text-right mb-12 leading-snug">
                          <div>〒 {clData.senderLocation || <span className="text-gray-400">住所</span>}</div>
                          <div className="font-bold text-[12px] mt-1">{clData.senderName || <span className="text-gray-400">氏名 (Pengirim)</span>}</div>
                          <div className="mt-1">{clData.senderPhone || <span className="text-gray-400">電話番号</span>}</div>
                          <div className="mt-1">{clData.senderEmail || <span className="text-gray-400">メールアドレス</span>}</div>
                        </div>
                        <h1 className="text-center text-[16px] tracking-widest font-bold mb-8 border-b border-black pb-2 mx-10">書類送付のご案内</h1>
                        <div className="flex-1 text-[11px] leading-[2]">
                          <div className="whitespace-pre-wrap break-words">{clData.body || <span className="text-gray-400 italic">(本文を入力するか、「自動生成」ボタンをクリックしてください)</span>}</div>
                          <div className="mt-12 text-center tracking-widest">記</div>
                          <div className="mt-4 text-center"><div>一、 履歴書　　　1通</div><div>一、 職務経歴書　1通</div></div>
                          <div className="mt-8 text-right">以上</div>
                        </div>
                      </div>
                    ) : (

                      /* ====================================================================== */
                      /* FORMAT COVER LETTER STANDAR INTERNASIONAL (DIKEMBALIKAN BLOCK RATA KIRI) */
                      /* TIDAK ADA LAGI HEADER RAKSASA, TIDAK ADA GARIS BAWAH                   */
                      /* ====================================================================== */
                      <div className="flex-1 text-[11pt] font-sans leading-relaxed text-black">
                        
                        {/* 1. Blok Pengirim (Rata Kiri Murni) */}
                        <div className="mb-8 leading-snug">
                          <div className="font-bold text-[12pt]">
                            {clData.senderName || <span className="text-gray-400 font-normal">{lang === 'en' ? '[Your Full Name]' : '[Nama Lengkap Anda]'}</span>}
                          </div>
                          <div>
                            {clData.senderLocation || <span className="text-gray-400">{lang === 'en' ? '[City, Province]' : '[Kota, Provinsi]'}</span>}
                          </div>
                          <div>
                            {clData.senderPhone || <span className="text-gray-400">{lang === 'en' ? '[Phone Number]' : '[Nomor Telepon]'}</span>}
                          </div>
                          <div>
                            {clData.senderEmail || <span className="text-gray-400">{lang === 'en' ? '[Email Address]' : '[Alamat Email]'}</span>}
                          </div>
                        </div>

                        {/* 2. Tanggal Surat */}
                        <div className="mb-8">{formatVisualDate(clData.date, lang)}</div>
                        
                        {/* 3. Blok Penerima (Tujuan Surat) */}
                        <div className="mb-8 leading-snug">
                          <div>{lang === 'id' ? 'Kepada Yth.' : 'To:'}</div>
                          <div className="font-bold">{clData.hr || <span className="text-gray-400 font-normal">{lang === 'en' ? '[Hiring Manager]' : '[Bapak/Ibu HRD]'}</span>}</div>
                          <div className="font-bold">{clData.company || <span className="text-gray-400 font-normal">{lang === 'en' ? '[Target Company]' : '[Nama Perusahaan]'}</span>}</div>
                        </div>
                        
                        {/* 4. Salam Pembuka */}
                        <div className="mb-4">{lang === 'id' ? 'Dengan hormat,' : `Dear ${clData.hr || 'Hiring Manager'},`}</div>
                        
                        {/* 5. Isi Surat Lamaran */}
                        <div className="whitespace-pre-wrap text-justify break-words min-h-[150px]">
                          {clData.body || <span className="text-gray-400 italic">{lang === 'id' ? '(Isi surat masih kosong. Silakan ketik di formulir, atau klik tombol "Auto-Generate" untuk merangkai surat otomatis berdasarkan posisi dan keahlian Anda.)' : '(Body is empty. Please type in the form, or click the "Auto-Generate" button on the left)'}</span>}
                        </div>
                        
                        {/* 6. Salam Penutup */}
                        <div className="mt-12">{lang === 'id' ? 'Hormat saya,' : 'Sincerely,'}<br/><br/><br/><br/><span className="font-bold">{clData.senderName || <span className="text-gray-400 font-normal">{lang === 'en' ? '[Your Name]' : '[Nama Anda]'}</span>}</span></div>
                      </div>
                    )}
                  </div>
                ) : (

                /* ========================================================= */
                /* RENDER MODE: DATA CV (DENGAN PLACEHOLDER VISUAL OTOMATIS) */
                /* ========================================================= */
                  <>
                    {isJapanese ? (
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
                            {getJpEduExpRows().map((r, i) => (
                              <tr key={`eduexp-${i}`} className="h-[22px]">
                                <td className="border border-black text-center">{r.year}</td>
                                <td className="border border-black text-center">{r.month}</td>
                                <td className={`border border-black px-2 ${r.center ? 'text-center tracking-[2em] pl-8' : r.right ? 'text-right pr-6' : ''} ${r.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{r.content}</td>
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
                            {getJpCertRows().map((r, i) => (
                              <tr key={`cert-${i}`} className="h-[22px]">
                                <td className="border border-black text-center">{r.year}</td>
                                <td className="border border-black text-center">{r.month}</td>
                                <td className={`border border-black px-2 ${r.right ? 'text-right pr-6' : ''} ${r.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{r.content}</td>
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
                    ) : (
                      /* TAMPILAN CV UMUM DENGAN PLACEHOLDER VISUAL */
                      <>
                        {(() => {
                          const contactItems = [
                            { val: basics.location, ph: dBasics.location },
                            { val: basics.phone, ph: dBasics.phone },
                            { val: basics.email, ph: dBasics.email },
                            { val: basics.linkedin, ph: dBasics.linkedin }
                          ].filter(Boolean);

                          const renderContactLine = (separator) => (
                            <>
                              {contactItems.map((item, i) => (
                                <span key={i} className="whitespace-nowrap">
                                  {item.val ? <span className="text-black">{item.val}</span> : <span className="text-gray-400">{item.ph}</span>}
                                  {i < contactItems.length - 1 && <span className="mx-1.5 text-black font-bold">{separator}</span>}
                                </span>
                              ))}
                            </>
                          );

                          return (
                            <>
                              {template === 'normal' && (
                                <div className="pb-2 text-left">
                                  <h1 className="text-[20pt] font-bold mb-1 tracking-tight capitalize leading-none text-black">
                                    {basics.name || <span className="text-gray-400">{dBasics.name}</span>}
                                  </h1>
                                  <p className="text-[10.5pt] flex flex-wrap mt-1.5 mb-3">
                                    {renderContactLine('|')}
                                  </p>
                                  <div className={`text-[10.5pt] leading-[1.6] text-justify mb-4 break-words ${basics.summary ? 'text-black' : 'text-gray-400'}`}>
                                    {basics.summary || dBasics.summary}
                                  </div>
                                </div>
                              )}
                              {template === 'modern' && (
                                <div className="border-b-[3px] border-gray-900 pb-4 mb-4 text-left">
                                  <h1 className="text-3xl font-black text-gray-900 mb-1 uppercase tracking-tight">
                                    {basics.name || <span className="text-gray-400">{dBasics.name}</span>}
                                  </h1>
                                  <h2 className="text-[15px] font-bold mb-2 uppercase tracking-wide">
                                    {basics.role ? <span className="text-gray-600">{basics.role}</span> : <span className="text-gray-400">{dBasics.role}</span>}
                                  </h2>
                                  <p className="text-[13px] flex flex-wrap gap-y-1 font-medium">
                                    {renderContactLine('•')}
                                  </p>
                                  <p className={`text-[13px] leading-relaxed mt-3 ${basics.summary ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {basics.summary || dBasics.summary}
                                  </p>
                                </div>
                              )}
                              {(template === 'harvard' || template === 'executive') && (
                                <div className={`text-center mb-6 ${template==='executive' ? 'border-b border-gray-400 pb-4' : ''}`}>
                                  <h1 className={`${template==='harvard' ? 'text-[24pt] font-serif font-normal' : 'text-3xl font-black tracking-tight'} uppercase mb-2 text-black`}>
                                    {basics.name || <span className="text-gray-400">{dBasics.name}</span>}
                                  </h1>
                                  <p className="text-[10pt] flex justify-center flex-wrap font-medium">
                                    {basics.role ? <span className="text-gray-900">{basics.role}</span> : <span className="text-gray-400">{dBasics.role}</span>}
                                    <span className="mx-1.5 text-black font-bold">•</span>
                                    {renderContactLine('•')}
                                  </p>
                                  {template === 'harvard' ? (
                                    <p className={`text-[11pt] leading-relaxed text-justify mt-4 ${basics.summary ? 'text-gray-900' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</p>
                                  ) : (
                                    <div className="mt-4">
                                      <h2 className="text-[13px] font-bold uppercase tracking-widest text-center mb-2 text-black">Profile</h2>
                                      <p className={`text-[13px] leading-relaxed text-justify ${basics.summary ? 'text-gray-800' : 'text-gray-400'}`}>{basics.summary || dBasics.summary}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          );
                        })()}

                        {/* MESIN RENDER DAFTAR (PENGALAMAN DLL) DENGAN PLACEHOLDER GRAY */}
                        {(() => {
                          const formatDesc = (text, isNorm, isPh) => text ? text.split('\n').map((l, i) => { const isBul = l.trim().startsWith('-'); return <div key={i} className={`flex ${isBul ? 'mt-1' : ''}`}>{isBul && <span className="mr-2 font-bold">•</span>}<span className={`${isBul ? 'flex-1' : ''} ${isNorm ? 'text-[10.5pt] leading-[1.5]' : 'text-[13px] leading-relaxed'} ${isPh ? 'text-gray-400' : 'text-black'} text-justify`}>{isBul ? l.replace(/^-/, '').trim() : l}</span></div>; }) : null;
                          const SecTitle = ({ t }) => {
                            if (template === 'normal') return <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-2.5 pb-0.5 text-black tracking-wide mt-5">{t}</h2>;
                            if (template === 'executive') return <h2 className="text-[12px] font-bold uppercase border-b border-gray-300 mb-2 pb-1 text-gray-900 tracking-widest mt-3">{t}</h2>;
                            if (template === 'modern') return <h2 className="text-[15px] font-black uppercase text-gray-900 border-b-2 border-gray-800 mb-3 pb-1 mt-4">{t}</h2>;
                            return <h2 className="text-[12pt] font-bold uppercase text-center border-b border-black mb-3 pb-1 tracking-widest mt-4">{t}</h2>;
                          };
                          
                          const R_Edu = () => <div className="mb-3"><SecTitle t={t.edu} />{activeEdu.map((e, i) => <div key={i} className="mb-2.5 break-inside-avoid"><div className="flex justify-between"><h3 className={`text-[10.5pt] font-bold ${e.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{e.institution}</h3><span className={`text-[10.5pt] whitespace-nowrap ${e.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{e.period}</span></div><div className={`text-[10.5pt] ${e.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{e.major}</div>{e.gpa && <div className={`text-[10.5pt] ${e.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{e.gpa}</div>}</div>)}</div>;
                          
                          const R_Skl = () => <div className="mb-3 break-inside-avoid"><SecTitle t={t.skills} />{template === 'normal' ? <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mt-1 text-[10.5pt] text-black">{(basics.skills || dBasics.skills).split(',').map((s, i) => <div key={i} className={`flex items-start ${basics.skills ? 'text-black' : 'text-gray-400'}`}><span className="mr-2 font-bold">•</span><span>{s.trim()}</span></div>)}</div> : <p className={`text-[10.5pt] leading-relaxed whitespace-pre-wrap break-words ${basics.skills ? 'text-black' : 'text-gray-400'}`}>{basics.skills || dBasics.skills}</p>}</div>;
                          
                          const R_Exp = () => <div className="mb-3"><SecTitle t={t.exp} />{activeExp.map((e, i) => <div key={i} className="mb-3.5 break-inside-avoid"><div className="flex justify-between"><h3 className={`text-[10.5pt] font-bold ${e.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{e.company}</h3><span className={`text-[10.5pt] whitespace-nowrap ${e.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{e.period}</span></div><div className={`text-[10.5pt] mb-1 ${template === 'modern' ? 'font-bold' : 'font-medium'} ${e.isPlaceholder ? 'text-gray-400' : template === 'modern' ? 'text-gray-800' : 'text-black'}`}>{e.role}</div><div className={`${template === 'normal' ? 'ml-0' : 'pl-3'}`}>{formatDesc(e.description, template === 'normal', e.isPlaceholder)}</div></div>)}</div>;
                          
                          const R_Prj = () => <div className="mb-3"><SecTitle t={t.proj} />{activeProj.map((p, i) => <div key={i} className="mb-3.5 break-inside-avoid"><div className="flex justify-between"><h3 className={`text-[10.5pt] font-bold ${p.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{p.name}</h3><span className={`text-[10.5pt] whitespace-nowrap ${p.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{p.period}</span></div><div className={`mt-1 ${template === 'normal' ? 'ml-0' : 'pl-3'}`}>{formatDesc(p.description, template === 'normal', p.isPlaceholder)}</div></div>)}</div>;
                          
                          const R_Crt = () => <div className="mb-3"><SecTitle t={t.cert} />{activeCerts.map((c, i) => <div key={i} className="mb-3.5 break-inside-avoid"><div className="flex justify-between"><h3 className={`text-[10.5pt] font-bold ${c.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{c.name}</h3><span className={`text-[10.5pt] whitespace-nowrap ${c.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{c.period}</span></div><div className={`text-[10.5pt] italic mb-1 ${c.isPlaceholder ? 'text-gray-400' : 'text-black'}`}>{c.issuer}</div><div className={`${template === 'normal' ? 'ml-0' : 'pl-3'}`}>{formatDesc(c.description, template === 'normal', c.isPlaceholder)}</div></div>)}</div>;

                          if (template === 'normal') return <><R_Edu/><R_Skl/><R_Exp/><R_Prj/><R_Crt/></>;
                          if (template === 'modern') return <><R_Exp/><R_Edu/><R_Skl/><R_Prj/><R_Crt/></>;
                          return <><R_Edu/><R_Exp/><R_Prj/><R_Crt/><R_Skl/></>;
                        })()}
                      </>
                    )}
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