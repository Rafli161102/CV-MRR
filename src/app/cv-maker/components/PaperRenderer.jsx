import React from 'react';

// =========================================================================
// HELPER FORMATTING
// =========================================================================
const formatVisualDate = (dateStr, lang) => {
  if (!dateStr) return ""; const d = new Date(dateStr); if (isNaN(d)) return dateStr;
  return lang === 'en' ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

const getActive = (arr, fields) => {
  const isEmpty = arr.length === 1 && fields.every(f => !arr[0][f]);
  return isEmpty ? null : arr.filter(item => fields.some(f => item[f].trim() !== '')); 
};

// Component Judul Kategori Dinamis
const SectionTitle = ({ title, template }) => {
  if (template === 'normal') return <h2 className="text-[11.5pt] font-bold uppercase border-b-[1.5px] border-black mb-2.5 pb-0.5 text-black mt-5 tracking-wide">{title}</h2>;
  if (template === 'executive') return <h2 className="text-[11pt] font-bold uppercase border-b border-gray-300 mb-2.5 pb-1 text-gray-900 tracking-widest mt-5">{title}</h2>;
  if (template === 'modern') return <h2 className="text-[14px] font-black uppercase text-gray-900 border-b-2 border-gray-800 mb-3 pb-1 mt-5 tracking-wide">{title}</h2>;
  return <h2 className="text-[12pt] font-bold uppercase text-center border-b border-black mb-3 pb-1 tracking-widest mt-5 text-black">{title}</h2>;
};

// Component Bullet Point Dinamis
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

// =========================================================================
// 1. PAPER: COVER LETTER
// =========================================================================
export const PaperCoverLetter = ({ basics, clData, lang, dBasics }) => {
  const isEn = lang === 'en';
  return (
    <div id="cv-paper" className="w-[21cm] min-h-[29.7cm] bg-white text-black py-[2cm] px-[2.5cm] shadow-2xl shrink-0 border border-gray-200" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="w-full text-black flex flex-col h-full text-[11pt] leading-relaxed">
        <div className="mb-10 leading-snug text-gray-800 border-b border-gray-300 pb-6">
          <div className="font-bold text-[14pt] text-black mb-2 uppercase tracking-wide">{basics.name || <span className="text-gray-400 font-normal">{dBasics.name}</span>}</div>
          <div>{basics.location || <span className="text-gray-400">{dBasics.location}</span>}</div>
          <div>{basics.phone || <span className="text-gray-400">{dBasics.phone}</span>}</div>
          <div>{basics.email || <span className="text-gray-400">{dBasics.email}</span>}</div>
        </div>
        <div className="mb-8 font-medium">{formatVisualDate(clData.date, lang)}</div>
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

// =========================================================================
// 2. PAPER: INTERNATIONAL CV
// =========================================================================
export const PaperCVInternational = ({ data, dBasics, ph }) => {
  const { basics, profiles, educations, experiences, projects, certs, template, lang, careerLevel } = data;
  const isEn = lang === 'en';
  
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
