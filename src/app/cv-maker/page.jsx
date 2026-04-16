"use client";

import { useState } from 'react';

const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" /></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.724.092m6.524-4.31a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-1.895-3.32a.5.5 0 00-.5.5v2.25c0 .276.224.5.5.5h2.25a.5.5 0 00.5-.5v-2.25a.5.5 0 00-.5-.5h-2.25zM12 21.75c3.55 0 6.544-2.185 7.91-5.326m-15.82 0A8.966 8.966 0 0112 2.25a8.964 8.964 0 017.91 5.326m-15.82 0a8.964 8.964 0 00-7.91 5.326M12 21.75a8.965 8.965 0 007.91-5.326m0 0H21m-9 0v-4.5" /></svg>;
const ZoomInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;

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

const getPlaceholders = (lang) => ({
  basics: {
    name: lang === 'en' ? 'JOHN DOE' : (lang === 'jp' ? '山田 太郎' : 'NAMA LENGKAP ANDA'),
    role: lang === 'en' ? 'Graphic Designer' : (lang === 'jp' ? 'グラフィックデザイナー' : 'Posisi Pekerjaan'),
    location: lang === 'en' ? 'New York, USA' : (lang === 'jp' ? '東京都渋谷区' : 'Kota, Provinsi'),
    phone: lang === 'en' ? '+1 234 567 890' : (lang === 'jp' ? '090-1234-5678' : '0812-3456-7890'),
    email: lang === 'en' ? 'johndoe@email.com' : (lang === 'jp' ? 'yamada@email.com' : 'email@anda.com'),
    summary: lang === 'en' ? 'A highly motivated professional ready to contribute to your company with a proven track record of excellence.' : (lang === 'jp' ? '3年以上のデザイン経験を持つグラフィックデザイナー。' : 'Saya adalah individu yang disiplin dan bertanggung jawab. Mampu bekerja sama dalam tim maupun individu, serta memiliki semangat belajar yang tinggi untuk berkontribusi maksimal bagi perusahaan.'),
    skills: lang === 'en' ? 'Microsoft Office, Communication, Teamwork' : (lang === 'jp' ? 'コミュニケーション, チームワーク, 問題解決' : 'Microsoft Word, Komunikasi, Disiplin Waktu, Adaptasi Cepat'),
    furigana: 'やまだ たろう', birthdate: '1995/01/01', age: '28', gender: '男', addressFurigana: 'とうきょうと しぶやく', nationality: 'インドネシア', visa: '特定技能1号', commuteTime: '1', commuteMinute: '30', dependents: '0', spouse: '無', spouseSupport: '無'
  },
  profiles: [{ platform: lang==='en'?'LinkedIn':(lang==='jp'?'リンク':'LinkedIn'), url: 'linkedin.com/in/namaanda', isPh: true }],
  educations: [{ institution: lang==='en'?'University Name':(lang==='jp'?'〇〇大学':'Nama Kampus atau Sekolah'), major: lang==='en'?'Degree/Major':(lang==='jp'?'〇〇学部':'Jurusan (Cth: Ilmu Komunikasi)'), period: lang==='en'?'2018 - 2022':(lang==='jp'?'2022/03':'Tahun Masuk - Lulus'), gpa: lang==='en'?'GPA: 3.8/4.0':'IPK: 3.80 / 4.00', isPh: true }],
  experiences: (isFresh) => [{ company: lang==='en'?'Company Name Inc.':(lang==='jp'?'〇〇株式会社':'PT Nama Perusahaan'), role: lang==='en'?'Job Title':(lang==='jp'?'役職名':'Nama Jabatan'), period: lang==='en'?'2021 - Present':(lang==='jp'?'2021/04':'Tahun Mulai - Selesai'), description: isFresh ? (lang === 'en' ? '- Describe your internship or organizational experience.\n- Highlight the soft skills you developed.' : '- Tulis pengalaman magang, kepanitiaan, atau proyek lepas (freelance) jika ada.\n- Fokus pada kemampuan beradaptasi dan kerjasama tim yang Anda pelajari.') : (lang === 'en' ? '- Describe your responsibilities here.\n- Focus on what you achieved using numbers/metrics.' : '- Tulis tugas utama dan tanggung jawab Anda di sini.\n- Fokus pada pencapaian, gunakan persentase atau angka jika memungkinkan (Contoh: Meningkatkan target 20%).'), isPh: true }],
  projects: [{ name: lang==='en'?'Project Title':(lang==='jp'?'〇〇プロジェクト':'Nama Kegiatan / Proyek / Tugas Akhir'), period: lang==='en'?'2023':(lang==='jp'?'2023/08':'Tahun Pelaksanaan'), description: lang==='en'?'- Briefly describe the project goal and your role.':(lang==='jp'?'〇〇の開発を担当\n〇〇を達成':'- Ceritakan singkat tentang proyek ini dan kontribusi utama Anda.'), isPh: true }],
  certs: [{ name: lang==='en'?'Certificate Name':(lang==='jp'?'日本語能力試験 N2':'Nama Sertifikasi / Pelatihan'), issuer: lang==='en'?'Issuing Organization':(lang==='jp'?'発行機関':'Lembaga Penyelenggara (Cth: Google)'), period: lang==='en'?'2023':(lang==='jp'?'2023/12':'Tahun Lulus'), description: lang==='en'?'- What skills did you acquire?':'- Ilmu praktis apa yang didapat dari pelatihan ini?', isPh: true }]
});

const RenderBullet = ({ text, isPh, template }) => {
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

const SectionTitle = ({ title, template }) => {
  if (template === 'normal') return <h2 className="text-[11.5pt] font-bold uppercase border-b-[1.5px] border-black mb-2.5 pb-0.5 text-black mt-5 tracking-wide">{title}</h2>;
  if (template === 'executive') return <h2 className="text-[11pt] font-bold uppercase border-b border-gray-300 mb-2.5 pb-1 text-gray-900 tracking-widest mt-5">{title}</h2>;
  if (template === 'modern') return <h2 className="text-[14px] font-black uppercase text-gray-900 border-b-2 border-gray-800 mb-3 pb-1 mt-5 tracking-wide">{title}</h2>;
  return <h2 className="text-[12pt] font-bold uppercase text-center border-b border-black mb-3 pb-1 tracking-widest mt-5 text-black">{title}</h2>;
};

// =========================================================================
// PAPER RENDERERS
// =========================================================================
const PaperCoverLetter = ({ basics, clData, lang, isEn, dBasics }) => {
  const formatVisualDate = (dateStr) => {
    if (!dateStr) return ""; const d = new Date(dateStr); if (isNaN(d)) return dateStr;
    return isEn ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  return (
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
          {clData.body || <span className="text-gray-400 italic">{(isEn ? 'Your cover letter body will appear here. Please use the template button.' : 'Isi surat Anda masih kosong. Silakan gunakan tombol hijau "Gunakan Template Standar" di panel sebelah kiri.')}</span>}
        </div>
        <div className="mt-16">{isEn ? 'Sincerely,' : 'Hormat saya,'}<br/><br/><br/><br/><span className="font-bold underline decoration-gray-400 underline-offset-4">{basics.name || <span className="text-gray-400 font-normal no-underline">{dBasics.name}</span>}</span></div>
      </div>
    </div>
  );
};

const PaperCVInternational = ({ data }) => {
  const { basics, profiles, educations, experiences, projects, certs, template, lang, careerLevel } = data;
  const isEn = lang === 'en';
  const ph = getPlaceholders(lang);
  
  const getActive = (arr, fields) => {
    const isEmpty = arr.length === 1 && fields.every(f => !arr[0][f]);
    return isEmpty ? null : arr.filter(item => fields.some(f => item[f].trim() !== '')); 
  };

  const aProf = getActive(profiles, ['platform', 'url']) || ph.profiles;
  const aEdu = getActive(educations, ['institution', 'major']) || ph.educations;
  const aExp = getActive(experiences, ['company', 'role']) || ph.experiences(careerLevel === 'fresh');
  const aProj = getActive(projects, ['name', 'description']) || ph.projects;
  const aCert = getActive(certs, ['name', 'issuer']) || ph.certs;

  const txt = {
    edu: isEn ? "Education" : "Pendidikan", exp: isEn ? "Experience" : "Pengalaman Kerja", proj: isEn ? "Projects" : "Proyek & Organisasi", cert: isEn ? "Certificates" : "Sertifikasi", skills: isEn ? "Skills" : "Keahlian Utama"
  };

  const cList = [{ v: basics.location, p: ph.basics.location }, { v: basics.phone, p: ph.basics.phone }, { v: basics.email, p: ph.basics.email }].filter(Boolean);
  const sep = template === 'normal' ? '|' : '•';
  
  return (
    <div id="cv-paper" className="w-[21cm] min-h-[29.7cm] bg-white text-black py-[1.5cm] px-[1.5cm] shadow-2xl shrink-0 border border-gray-200" style={{ fontFamily: template === 'normal' ? 'Arial, Helvetica, sans-serif' : template === 'harvard' ? 'Georgia, serif' : 'system-ui, -apple-system, sans-serif' }}>
      
      {/* HEADER CONTACT */}
      {template === 'normal' && (
        <div className="pb-3 text-left">
          <h1 className="text-[22pt] font-bold mb-1 tracking-tight capitalize leading-none text-black">{basics.name || <span className="text-gray-400">{ph.basics.name}</span>}</h1>
          <h2 className="text-[12pt] font-semibold mb-1 mt-1 text-black">{basics.role ? <span>{basics.role}</span> : <span className="text-gray-400">{ph.basics.role}</span>}</h2>
          <p className="text-[10.5pt] flex flex-wrap mt-1 mb-4 leading-relaxed">
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
          </p>
          <div className={`text-[10.5pt] leading-[1.6] text-justify mb-4 break-words ${basics.summary ? 'text-black' : 'text-gray-400'}`}>{basics.summary || ph.basics.summary}</div>
        </div>
      )}
      {template === 'modern' && (
        <div className="border-b-[3px] border-gray-900 pb-4 mb-4 text-left">
          <h1 className="text-[24pt] font-black text-gray-900 mb-1 uppercase tracking-tight leading-none">{basics.name || <span className="text-gray-400">{ph.basics.name}</span>}</h1>
          <h2 className="text-[12pt] font-bold mb-2 uppercase tracking-wide">{basics.role ? <span className="text-gray-600">{basics.role}</span> : <span className="text-gray-400">{ph.basics.role}</span>}</h2>
          <p className="text-[10pt] flex flex-wrap gap-y-1 font-medium">
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
          </p>
          <p className={`text-[10.5pt] leading-relaxed mt-4 text-justify ${basics.summary ? 'text-gray-800' : 'text-gray-400'}`}>{basics.summary || ph.basics.summary}</p>
        </div>
      )}
      {(template === 'harvard' || template === 'executive') && (
        <div className={`text-center mb-6 ${template==='executive' ? 'border-b border-gray-400 pb-5' : ''}`}>
          <h1 className={`${template==='harvard' ? 'text-[28pt] font-serif font-normal' : 'text-[24pt] font-black tracking-tight'} uppercase mb-1 text-black leading-none`}>{basics.name || <span className="text-gray-400">{ph.basics.name}</span>}</h1>
          <p className="text-[10.5pt] flex justify-center flex-wrap font-medium mt-2 leading-relaxed">
            {basics.role ? <span className="text-gray-900 font-bold">{basics.role}</span> : <span className="text-gray-400">{ph.basics.role}</span>}
            <span className="mx-2 text-black font-bold select-none">•</span>
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
          </p>
          {template === 'harvard' ? (
            <p className={`text-[11pt] leading-relaxed text-justify mt-5 ${basics.summary ? 'text-gray-900' : 'text-gray-400'}`}>{basics.summary || ph.basics.summary}</p>
          ) : (
            <div className="mt-5"><h2 className="text-[11pt] font-bold uppercase tracking-widest text-center mb-2 text-black">Profile</h2><p className={`text-[10.5pt] leading-relaxed text-justify ${basics.summary ? 'text-gray-800' : 'text-gray-400'}`}>{basics.summary || ph.basics.summary}</p></div>
          )}
        </div>
      )}

      {/* RENDER LISTS */}
      {(() => {
        const Edu = () => !getActive(educations, ['institution', 'major']) && !aEdu[0].isPh ? null : (
          <div className="mb-4"><SectionTitle title={txt.edu} template={template} />
          {aEdu.map((e, i) => (
            <div key={i} className="mb-3 break-inside-avoid">
              <div className="flex justify-between items-end"><h3 className={`text-[10.5pt] font-bold ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.institution}</h3><span className={`text-[10pt] whitespace-nowrap ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.period}</span></div>
              <div className="flex justify-between items-start mt-0.5"><div className={`text-[10.5pt] ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.major}</div>{e.gpa && <div className={`text-[10pt] font-medium ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.gpa}</div>}</div>
            </div>
          ))}</div>
        );
        const Exp = () => !getActive(experiences, ['company', 'role']) && !aExp[0].isPh ? null : (
          <div className="mb-4"><SectionTitle title={txt.exp} template={template} />
          {aExp.map((e, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <div className="flex justify-between items-end mb-0.5"><h3 className={`text-[10.5pt] font-bold uppercase ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.company}</h3><span className={`text-[10pt] whitespace-nowrap ${e.isPh ? 'text-gray-400' : 'text-black'}`}>{e.period}</span></div>
              <div className={`text-[10.5pt] mb-1.5 ${template === 'modern' ? 'font-bold' : 'font-medium italic'} ${e.isPh ? 'text-gray-400' : (template === 'modern' ? 'text-gray-800' : 'text-black')}`}>{e.role}</div>
              <div className={`${template === 'normal' ? 'ml-0' : 'pl-3.5'}`}><RenderBullet text={e.description} isPh={e.isPh} template={template} /></div>
            </div>
          ))}</div>
        );
        const Proj = () => !getActive(projects, ['name', 'description']) && !aProj[0].isPh ? null : (
          <div className="mb-4"><SectionTitle title={txt.proj} template={template} />
          {aProj.map((p, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <div className="flex justify-between items-end mb-0.5"><h3 className={`text-[10.5pt] font-bold ${p.isPh ? 'text-gray-400' : 'text-black'}`}>{p.name}</h3><span className={`text-[10pt] whitespace-nowrap ${p.isPh ? 'text-gray-400' : 'text-black'}`}>{p.period}</span></div>
              <div className={`mt-1 ${template === 'normal' ? 'ml-0' : 'pl-3.5'}`}><RenderBullet text={p.description} isPh={p.isPh} template={template} /></div>
            </div>
          ))}</div>
        );
        const Cert = () => !getActive(certs, ['name', 'issuer']) && !aCert[0].isPh ? null : (
          <div className="mb-4"><SectionTitle title={txt.cert} template={template} />
          {aCert.map((c, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <div className="flex justify-between items-end"><h3 className={`text-[10.5pt] font-bold ${c.isPh ? 'text-gray-400' : 'text-black'}`}>{c.name}</h3><span className={`text-[10pt] whitespace-nowrap ${c.isPh ? 'text-gray-400' : 'text-black'}`}>{c.period}</span></div>
              <div className={`text-[10.5pt] italic mb-1 ${c.isPh ? 'text-gray-400' : 'text-black'}`}>{c.issuer}</div>
              <div className={`${template === 'normal' ? 'ml-0' : 'pl-3.5'}`}><RenderBullet text={c.description} isPh={c.isPh} template={template} /></div>
            </div>
          ))}</div>
        );
        const Skl = () => {
          if (!basics.skills && !ph.basics.skills) return null;
          const isPh = !basics.skills;
          return (
            <div className="mb-4 break-inside-avoid"><SectionTitle title={txt.skills} template={template} />
            {template === 'normal' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1.5 mt-2 text-[10.5pt] text-black">
                {(basics.skills || ph.basics.skills).split(',').map((s, i) => <div key={i} className={`flex items-start ${isPh ? 'text-gray-400' : 'text-black'}`}><span className="mr-2 font-bold select-none">•</span><span>{s.trim()}</span></div>)}
              </div>
            ) : <p className={`text-[10.5pt] leading-relaxed whitespace-pre-wrap break-words mt-1 text-justify ${isPh ? 'text-gray-400' : 'text-black'}`}>{basics.skills || ph.basics.skills}</p>}
            </div>
          );
        };

        if (careerLevel === 'fresh') return <><Edu/><Exp/><Proj/><Skl/><Cert/></>;
        return <><Exp/><Edu/><Skl/><Proj/><Cert/></>;
      })()}
    </div>
  );
};

const PaperCVJapanese = ({ data }) => {
  const { basics, educations, experiences, certs, template } = data;
  const ph = getPlaceholders('jp');

  const getActive = (arr, fields) => {
    const isEmpty = arr.length === 1 && fields.every(f => !arr[0][f]);
    return isEmpty ? null : arr.filter(item => fields.some(f => item[f].trim() !== '')); 
  };

  const aEdu = getActive(educations, ['institution', 'major']) || ph.educations;
  const aExp = getActive(experiences, ['company', 'role']) || ph.experiences(true);
  const aCert = getActive(certs, ['name', 'issuer']) || ph.certs;

  const parseJpDate = (ds) => { if (!ds) return { y: '', m: '' }; const p = ds.split(/[\/\-\s]+/); return p.length >= 2 ? { y: p[0], m: p[1].replace(/^0+/, '') } : { y: ds, m: '' }; };
  
  const rowsEduExp = [{ y: '', m: '', c: '学歴', center: true }];
  aEdu.forEach(e => { const d = parseJpDate(e.period); rowsEduExp.push({ y: d.y, m: d.m, c: `${e.institution} ${e.major} 入学/卒業`, isPh: e.isPh }); });
  rowsEduExp.push({ y: '', m: '', c: '', center: true }); 
  rowsEduExp.push({ y: '', m: '', c: '職歴', center: true });
  if (getActive(experiences, ['company'])) {
    getActive(experiences, ['company']).forEach(e => { const d = parseJpDate(e.period); rowsEduExp.push({ y: d.y, m: d.m, c: `${e.company} 入社` }); if (e.role) rowsEduExp.push({ y: '', m: '', c: `　${e.role}` }); });
    rowsEduExp.push({ y: '', m: '', c: '現在に至る', right: true }); rowsEduExp.push({ y: '', m: '', c: '以上', right: true });
  } else {
    rowsEduExp.push({ y: '2021', m: '04', c: '〇〇株式会社 入社', isPh: true }); rowsEduExp.push({ y: '', m: '', c: '現在に至る', right: true, isPh: true }); rowsEduExp.push({ y: '', m: '', c: '以上', right: true, isPh: true });
  }
  while(rowsEduExp.length < 16) rowsEduExp.push({ y: '', m: '', c: '' });
  const finalEduExp = rowsEduExp.slice(0, 16);

  const rowsCert = [];
  aCert.forEach(c => { const d = parseJpDate(c.period); rowsCert.push({ y: d.y, m: d.m, c: `${c.name} 取得`, isPh: c.isPh }); });
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
              <td className="w-[60%] p-1.5 border-r border-black leading-none">{basics.furigana || <span className="text-gray-400">{ph.basics.furigana}</span>}</td>
              <td rowSpan={3} className="w-[30%] p-2 text-center text-gray-400 border-l border-black align-middle text-[10px] leading-tight border-dashed relative">写真を貼る位置<br/><span className="text-[8px]">(36~40mm x 24~30mm)</span></td>
            </tr>
            <tr className="border-b border-black h-[50px]">
              <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">氏名</td>
              <td className="p-2 text-xl tracking-[0.5em] border-r border-black align-middle">{basics.name || <span className="text-gray-400">{ph.basics.name}</span>}</td>
            </tr>
            <tr>
              <td colSpan={2} className="border-r border-black p-1">
                <div className="flex justify-between items-center w-full px-2 mt-1">
                  <span>{basics.birthdate ? `${basics.birthdate} 生` : <span className="text-gray-400">{ph.basics.birthdate} 生</span>}</span>
                  <span>(満 {basics.age || <span className="text-gray-400">{ph.basics.age}</span>} 歳)</span>
                  <span>{basics.gender || <span className="text-gray-400">{ph.basics.gender}</span>}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="w-full border-collapse border border-black text-[11px] font-serif mb-2">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">ふりがな</td>
              <td className="w-[50%] p-1.5 border-r border-black">{basics.addressFurigana || <span className="text-gray-400">{ph.basics.addressFurigana}</span>}</td>
              <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">電話</td>
              <td className="w-[30%] p-1.5">{basics.phone || <span className="text-gray-400">{ph.basics.phone}</span>}</td>
            </tr>
            <tr className="h-12 border-b border-black">
              <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">現住所</td>
              <td className="p-1.5 border-r border-black align-top leading-tight">〒<br/><span className="mt-1 block">{basics.location || <span className="text-gray-400">{ph.basics.location}</span>}</span></td>
              <td className="w-[10%] border-r border-black p-1 text-center bg-gray-50/50 print:bg-transparent text-[10px]">Email</td>
              <td className="p-1.5 align-top break-all leading-tight">{basics.email || <span className="text-gray-400">{ph.basics.email}</span>}</td>
            </tr>
          </tbody>
        </table>
        {template === 'jp-asing' && (
        <table className="w-full border-collapse border border-black text-[11px] font-serif mb-2">
          <tbody>
            <tr>
              <td className="w-[15%] border-r border-black p-1.5 text-center bg-gray-50/50 print:bg-transparent text-[9px]">国籍 (Nationality)</td>
              <td className="w-[35%] p-1.5 border-r border-black">{basics.nationality || <span className="text-gray-400">{ph.basics.nationality}</span>}</td>
              <td className="w-[15%] border-r border-black p-1.5 text-center bg-gray-50/50 print:bg-transparent text-[9px]">在留資格 (Visa)</td>
              <td className="w-[35%] p-1.5">{basics.visa || <span className="text-gray-400">{ph.basics.visa}</span>}</td>
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
              <div className={`flex-1 text-[10.5px] whitespace-pre-wrap leading-[1.6] ${basics.summary ? 'text-black' : 'text-gray-400'}`}>{basics.summary || ph.basics.summary}</div>
           </div>
           <div className="w-[30%] flex flex-col gap-[0.2rem]">
              <div className="flex-1 border border-black p-2 relative">
                 <span className="text-[9px] absolute top-1 left-2">通勤時間</span>
                 <div className="flex items-center justify-center h-full w-full text-[11px] mt-2">約 <span className="mx-2 border-b border-black w-6 text-center">{basics.commuteTime || <span className="text-gray-400">{ph.basics.commuteTime}</span>}</span> 時間 <span className="mx-2 border-b border-black w-6 text-center">{basics.commuteMinute || <span className="text-gray-400">{ph.basics.commuteMinute}</span>}</span> 分</div>
              </div>
              <div className="flex-1 flex gap-[0.2rem]">
                 <div className="w-1/2 border border-black p-2 relative">
                    <span className="text-[8px] absolute top-1 left-1 leading-tight text-center w-full">扶養家族<br/>(配偶者を除く)</span>
                    <div className="flex items-center justify-center h-full w-full text-[11px] mt-2"><span className="mx-1 border-b border-black w-6 text-center">{basics.dependents || <span className="text-gray-400">{ph.basics.dependents}</span>}</span> 人</div>
                 </div>
                 <div className="w-1/2 flex flex-col gap-[0.2rem]">
                    <div className="border border-black h-1/2 flex flex-col items-center justify-center relative">
                       <span className="text-[8px] absolute top-0.5 w-full text-center">配偶者</span>
                       <span className="text-[11px] mt-2">{basics.spouse || <span className="text-gray-400">{ph.basics.spouse}</span>}</span>
                    </div>
                    <div className="border border-black h-1/2 flex flex-col items-center justify-center relative">
                       <span className="text-[7px] absolute top-0.5 w-full text-center">配偶者の扶養義務</span>
                       <span className="text-[11px] mt-2">{basics.spouseSupport || <span className="text-gray-400">{ph.basics.spouseSupport}</span>}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
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

  const isEn = lang === 'en';
  const isJapanese = lang === 'jp' || template === 'jp-umum' || template === 'jp-asing';

  const cvTabs = [
    { id: 'personal', label: '1. Personal' },
    ...(careerLevel === 'fresh' ? [{ id: 'edu', label: '2. Pendidikan' }, { id: 'exp', label: '3. Pengalaman' }] : [{ id: 'exp', label: '2. Pengalaman' }, { id: 'edu', label: '3. Pendidikan' }]),
    { id: 'proj', label: '4. Proyek' },
    { id: 'cert', label: '5. Sertif/Kursus' }
  ];
  const currentTabIndex = cvTabs.findIndex(t => t.id === activeTab);

  return (
    <div className="flex flex-col h-[100dvh] bg-[#040914] text-slate-200 font-sans overflow-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* PRINT FIX MUTLAK (Meruntuhkan Hirarki Web & Membunuh Melengkung) */}
      {/* ------------------------------------------------------------- */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 0; }
          body, html { background: white !important; margin: 0 !important; padding: 0 !important; height: auto !important; overflow: hidden !important; }
          .no-print, header, nav, footer, aside, button, .show-in-pwa { display: none !important; }
          .print-container { display: block !important; width: 100% !important; height: auto !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; overflow: visible !important; position: static !important; background: transparent !important; }
          #cv-paper { width: 21cm !important; margin: 0 auto !important; padding: 1.5cm !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; transform: none !important; page-break-inside: avoid; }
          .break-inside-avoid, h2, h3, tr { break-inside: avoid !important; page-break-inside: avoid !important; }
        }
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
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row print-container">
        
        {/* ========================================================= */}
        {/* PANEL KIRI: FORMULIR INPUT                                  */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto panel-scroll bg-[#060D1F] p-5 sm:p-8 no-print border-r border-white/10 relative z-10 pb-32">
          
          {docMode === 'cv' ? (
            <>
              {/* TABS KONTROL GLOBAL */}
              <div className="mb-6 bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md">
                <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3">1. Bahasa & Terjemahan Otomatis</h3>
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
                      {careerLevel === 'fresh' ? '💡 Mode Fresh Grad: Pendidikan & Proyek (Tugas Akhir) diutamakan agar HRD fokus pada pencapaian akademik.' : '💡 Mode Profesional: Pengalaman Kerja diletakkan paling atas agar HRD fokus pada riwayat karir Anda.'}
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

              {isTranslating && (
                <div className="mb-6 flex justify-center items-center gap-2 text-xs font-bold text-cyan-400 bg-cyan-900/20 p-3 rounded-lg border border-cyan-500/30">
                  <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Robot AI sedang memproses terjemahan...
                </div>
              )}

              {/* TAB: PERSONAL */}
              {activeTab === 'personal' && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md">
                    <SectionHeader title="Informasi Dasar" tips="Hindari mengisi alamat terlalu detail. Cukup Kota dan Provinsi." />
                    <LabeledInput label="Nama Lengkap" helper="Sesuai KTP atau Nama Profesional."><input type="text" name="name" value={basics.name} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={isEn?'John Doe':'Contoh: Budi Santoso'}/></LabeledInput>
                    <LabeledInput label="Posisi yang Dilamar" helper="Akan dicetak tebal tepat di bawah nama Anda."><input type="text" name="role" value={basics.role} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none" placeholder={isEn?'Data Analyst':'Contoh: Staff Administrasi'}/></LabeledInput>
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
                    <SectionHeader title="Tautan Profil Digital" onAdd={() => addArr(setProfiles, profiles, {platform:"", url:""})} tips="LinkedIn sangat disarankan. Hapus baris URL jika tidak ada agar elemen otomatis hilang di kertas." />
                    {profiles.map((prof, i) => (
                      <div key={prof.id} className="flex flex-col sm:flex-row gap-3 mb-3 relative bg-[#060D1F] p-4 sm:p-3 rounded-lg border border-white/10 shadow-inner">
                        <button onClick={() => remArr(setProfiles, profiles, i)} className="absolute top-2 right-2 sm:-top-2 sm:-right-2 bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded-full z-10">Hapus</button>
                        <div className="w-full sm:w-1/3"><LabeledInput label="Nama Situs"><input type="text" value={prof.platform} onChange={(e) => handleArr(setProfiles, profiles, i, 'platform', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Cth: LinkedIn" /></LabeledInput></div>
                        <div className="w-full sm:w-2/3"><LabeledInput label="URL Tautan"><input type="text" value={prof.url} onChange={(e) => handleArr(setProfiles, profiles, i, 'url', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="linkedin.com/in/nama" /></LabeledInput></div>
                      </div>
                    ))}
                  </div>
                  )}

                  {isJapanese && (
                    <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md">
                      <SectionHeader title="Detail Khusus JIS (Jepang)" />
                      <div className="grid grid-cols-2 gap-4">
                        <LabeledInput label="Furigana Nama"><input type="text" name="furigana" value={basics.furigana} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm outline-none" placeholder="ふりがな" /></LabeledInput>
                        <LabeledInput label="Furigana Alamat"><input type="text" name="addressFurigana" value={basics.addressFurigana} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm outline-none" placeholder="ふりがな (Alamat)" /></LabeledInput>
                        <LabeledInput label="Tahun Lahir"><input type="text" name="birthdate" value={basics.birthdate} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm outline-none" placeholder="1995/01/01" /></LabeledInput>
                        <LabeledInput label="Umur"><input type="text" name="age" value={basics.age} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm outline-none" placeholder="28" /></LabeledInput>
                        <LabeledInput label="Waktu Perjalanan (Jam)"><input type="text" name="commuteTime" value={basics.commuteTime} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm outline-none" placeholder="1" /></LabeledInput>
                        <LabeledInput label="Waktu (Menit)"><input type="text" name="commuteMinute" value={basics.commuteMinute} onChange={handleBasics} className="w-full bg-[#060D1F] border border-white/10 p-3 rounded-lg text-white text-sm outline-none" placeholder="30" /></LabeledInput>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: PENDIDIKAN */}
              {activeTab === 'edu' && (
                <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md animate-fade-in-up">
                  <SectionHeader title="Pendidikan Terakhir" onAdd={() => addArr(setEducations, educations, {institution:"", major:"", period:"", gpa:""})} tips={careerLevel === 'fresh' ? 'Sebagai Fresh Grad, Anda bisa menambahkan info organisasi intra-kampus di bagian Proyek.' : 'Cukup masukkan pendidikan terakhir (Universitas/SMA).'} />
                  {educations.map((edu, i) => (
                    <div key={edu.id} className="bg-[#060D1F] p-5 rounded-lg border border-white/10 relative shadow-inner mb-4">
                      <button onClick={() => remArr(setEducations, educations, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                      <LabeledInput label="Nama Instansi"><input type="text" value={edu.institution} onChange={(e) => handleArr(setEducations, educations, i, 'institution', e.target.value)} className="w-11/12 bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500 font-bold" placeholder="Nama Kampus/Sekolah"/></LabeledInput>
                      <LabeledInput label="Jurusan / Gelar"><input type="text" value={edu.major} onChange={(e) => handleArr(setEducations, educations, i, 'major', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Cth: S1 Ilmu Komputer"/></LabeledInput>
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <LabeledInput label="Tahun"><input type="text" value={edu.period} onChange={(e) => handleArr(setEducations, educations, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="2018 - 2022"/></LabeledInput>
                        {!isJapanese && <LabeledInput label="Nilai/IPK (Opsional)"><input type="text" value={edu.gpa} onChange={(e) => handleArr(setEducations, educations, i, 'gpa', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="3.80 / 4.00"/></LabeledInput>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: PENGALAMAN */}
              {activeTab === 'exp' && (
                <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md animate-fade-in-up">
                  <SectionHeader title="Pengalaman Kerja" onAdd={() => addArr(setExperiences, experiences, {role:"", company:"", period:"", description:""})} tips={careerLevel === 'fresh' ? 'Kosongkan (Hapus) jika belum ada. Anda bisa memasukkan Magang/Freelance di sini.' : 'Gunakan tanda strip (-) di kolom Deskripsi untuk membuat Bullet Poin rapi.'} />
                  {experiences.map((exp, i) => (
                    <div key={exp.id} className="bg-[#060D1F] p-5 rounded-lg border border-white/10 relative shadow-inner mb-4">
                      <button onClick={() => remArr(setExperiences, experiences, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                      <LabeledInput label="Nama Perusahaan"><input type="text" value={exp.company} onChange={(e) => handleArr(setExperiences, experiences, i, 'company', e.target.value)} className="w-11/12 bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500 font-bold" placeholder="PT Nama Perusahaan"/></LabeledInput>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <LabeledInput label="Posisi"><input type="text" value={exp.role} onChange={(e) => handleArr(setExperiences, experiences, i, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Cth: Staff Admin"/></LabeledInput>
                        <LabeledInput label="Tahun Bekerja"><input type="text" value={exp.period} onChange={(e) => handleArr(setExperiences, experiences, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Jan 2022 - Des 2023"/></LabeledInput>
                      </div>
                      {!isJapanese && (
                        <LabeledInput label="Deskripsi (Gunakan Strip - di Awal)"><textarea value={exp.description} onChange={(e) => handleArr(setExperiences, experiences, i, 'description', e.target.value)} rows="5" className="w-full bg-[#0A1329] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="- Fokus pada pencapaian dengan metrik angka.&#10;- Berhasil meningkatkan efisiensi operasional 20%."></textarea></LabeledInput>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: PROYEK */}
              {activeTab === 'proj' && !isJapanese && (
                <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md animate-fade-in-up">
                  <SectionHeader title="Proyek Spesial" onAdd={() => addArr(setProjects, projects, {name:"", period:"", description:""})} tips="Tempat terbaik untuk Tugas Akhir Kampus, Kepanitiaan Organisasi, atau Proyek Pribadi." />
                  {projects.map((proj, i) => (
                    <div key={proj.id} className="bg-[#060D1F] p-5 rounded-lg border border-white/10 relative shadow-inner mb-4">
                      <button onClick={() => remArr(setProjects, projects, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <LabeledInput label="Nama Kegiatan/Proyek"><input type="text" value={proj.name} onChange={(e) => handleArr(setProjects, projects, i, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500 font-bold" placeholder="Cth: Skripsi / Riset A"/></LabeledInput>
                        <LabeledInput label="Waktu Pelaksanaan"><input type="text" value={proj.period} onChange={(e) => handleArr(setProjects, projects, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Tahun"/></LabeledInput>
                      </div>
                      <LabeledInput label="Peran Anda (Gunakan Strip - di Awal)"><textarea value={proj.description} onChange={(e) => handleArr(setProjects, projects, i, 'description', e.target.value)} rows="3" className="w-full bg-[#0A1329] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="- Bertanggung jawab sebagai ketua pelaksana."></textarea></LabeledInput>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: SERTIFIKASI */}
              {activeTab === 'cert' && !isJapanese && (
                <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 shadow-md animate-fade-in-up">
                  <SectionHeader title="Sertifikasi & Kursus" onAdd={() => addArr(setCerts, certs, {name:"", issuer:"", period:"", description:""})} tips="Tidak punya? Silakan klik 'Hapus' dan elemen akan otomatis bersih dari kertas cetak." />
                  {certs.map((cert, i) => (
                    <div key={cert.id} className="bg-[#060D1F] p-5 rounded-lg border border-white/10 relative shadow-inner mb-4">
                      <button onClick={() => remArr(setCerts, certs, i)} className="absolute top-3 right-3 text-red-400 text-[10px] font-bold bg-red-400/10 px-2 py-1 rounded">Hapus</button>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <LabeledInput label="Nama Pelatihan"><input type="text" value={cert.name} onChange={(e) => handleArr(setCerts, certs, i, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500 font-bold" placeholder="Cth: Bootcamp UX"/></LabeledInput>
                        <LabeledInput label="Tahun Diperoleh"><input type="text" value={cert.period} onChange={(e) => handleArr(setCerts, certs, i, 'period', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Tahun Lulus"/></LabeledInput>
                      </div>
                      <LabeledInput label="Lembaga Penyelenggara"><input type="text" value={cert.issuer} onChange={(e) => handleArr(setCerts, certs, i, 'issuer', e.target.value)} className="w-full bg-transparent border-b border-white/20 p-2 text-white text-sm outline-none focus:border-cyan-500" placeholder="Cth: Google, BNSP"/></LabeledInput>
                      <LabeledInput label="Topik yang Didapat"><textarea value={cert.description} onChange={(e) => handleArr(setCerts, certs, i, 'description', e.target.value)} rows="3" className="w-full bg-[#0A1329] border border-white/10 p-3 rounded-lg text-white text-sm focus:border-cyan-500 outline-none leading-relaxed" placeholder="- Mempelajari dasar-dasar digital marketing."></textarea></LabeledInput>
                    </div>
                  ))}
                </div>
              )}

              {/* NAVIGASI BAWAH UNTUK BOOMERS */}
              <div className="flex justify-between items-center mt-8 pt-5 border-t border-white/10">
                 <button onClick={() => currentTabIndex > 0 && setActiveTab(cvTabs[currentTabIndex - 1].id)} className={`px-5 py-2.5 text-xs font-bold rounded-lg transition-colors border border-white/10 ${currentTabIndex > 0 ? 'bg-white/5 hover:bg-white/10 text-white' : 'opacity-50 cursor-not-allowed text-slate-500'}`}>
                    &laquo; Kembali
                 </button>
                 
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
            </>
          ) : (
            // =========================================================
            // MODE COVER LETTER
            // =========================================================
            <div className="bg-[#0A1329] p-5 rounded-xl border border-white/5 space-y-6 animate-fade-in-up shadow-md">
              <SectionHeader title="Cover Letter Builder" tips="Data pribadi Anda (Nama, Email, dll) langsung ditarik dari form 'Mode CV'. Anda cukup merancang tujuan surat di sini." />
              
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
                <button onClick={generateCoverLetter} className="w-full mb-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold text-xs uppercase tracking-widest rounded transition-colors border border-emerald-500/50">Gunakan Template Standar</button>
                <textarea name="body" value={clData.body} onChange={handleCL} rows="12" className="w-full bg-[#0A1329] border border-white/10 p-4 rounded-lg text-white text-sm focus:border-emerald-500 outline-none leading-relaxed" placeholder="Ketik surat pengantar Anda di sini... Atau klik tombol hijau di atas."></textarea>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* PANEL KANAN: PREVIEW KERTAS                                 */}
        {/* ========================================================= */}
        <div id="preview-area" className="w-full lg:w-[55%] xl:w-[60%] h-full overflow-y-auto panel-scroll bg-[#030712] relative flex flex-col no-print border-l border-white/5 print-container">
          
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

          <div className="flex-1 overflow-visible flex justify-center py-10 pb-32 print-container">
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.15s ease' }} className="w-fit h-fit print-container">
              
              {docMode === 'cl' ? (
                <PaperCoverLetter basics={basics} clData={clData} lang={lang} isEn={isEn} dBasics={dBasics} />
              ) : (
                isJapanese ? (
                  <PaperCVJapanese data={{ basics, educations, experiences, certs, template }} />
                ) : (
                  <PaperCVInternational data={{ basics, profiles, educations, experiences, projects, certs, template, lang, careerLevel }} />
                )
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
