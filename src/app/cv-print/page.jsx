"use client";

import { WORK_EXPERIENCE, EDUCATION } from '../../data/store'

export default function CVPrint() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center relative z-10 bg-[#060D1F]">
      
      {/* =====================================================================
          SIHIR CSS PRINT PRO (Margin Rapi & Anti-Terpotong)
          ===================================================================== */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background: white !important;
          }
          /* Menyembunyikan elemen website luar */
          body * {
            visibility: hidden;
          }
          /* Menampilkan khusus CV */
          #cv-container, #cv-container * {
            visibility: visible;
          }
          /* Setting Posisi Kertas */
          #cv-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100%;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            padding: 0 !important; /* Menghapus double padding saat di-print */
            margin: 0 !important;
          }
          /* Margin Kertas Profesional (0.5 inch) */
          @page { 
            size: A4; 
            margin: 1.27cm; 
          }
          .no-print { display: none !important; }
          
          /* MENCEGAH TEKS TERPOTONG DI TENGAH SAAT PINDAH HALAMAN */
          .avoid-break { 
            break-inside: avoid; 
            page-break-inside: avoid; 
          }
        }
      `}} />

      {/* =====================================================================
          TOMBOL KONTROL
          ===================================================================== */}
      <div className="mb-8 text-center no-print">
        <h1 className="text-3xl font-bold text-white mb-4">Generator CV ATS</h1>
        <p className="text-slate-400 mb-6 max-w-lg mx-auto">
          Halaman ini otomatis menarik data dari <b>store.js</b>. Tekan tombol di bawah untuk menyimpannya sebagai file PDF standar HRD (ATS Friendly).
        </p>
        <button 
          onClick={() => window.print()} 
          className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>
          Print / Save as PDF
        </button>
      </div>

      {/* =====================================================================
          KERTAS A4 CV (Layout Super Rapi)
          ===================================================================== */}
      <div 
        id="cv-container" 
        className="w-full max-w-[21cm] min-h-[29.7cm] bg-white text-black p-12 shadow-2xl rounded-sm font-sans"
      >
        {/* HEADER */}
        <div className="text-center border-b-2 border-black pb-4 mb-5">
          <h1 className="text-3xl font-black uppercase tracking-widest mb-1">Muhammad Rafli Ramadhan</h1>
          <h2 className="text-lg font-medium mb-3 text-gray-800 tracking-wider">Graphic Designer</h2>
          <div className="text-[13px] flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-700 font-medium">
            <span>📍 Jakarta, Indonesia</span>
            <span>📞 085155020363</span>
            <span>✉️ raflisoenter@gmail.com</span>
            <span>🔗 linkedin.com/in/muhammad-rafli-ramadhan-0209b1211</span>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mb-5 avoid-break">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-2 pb-1">Professional Summary</h3>
          <p className="text-[13px] leading-relaxed text-justify text-gray-800">
            Desainer grafis berpengalaman dengan rekam jejak dalam menciptakan desain visual yang strategis dan memikat. Ahli dalam mengoperasikan perangkat lunak industri (Adobe Creative Suite) dan fotografi DSLR. Memiliki keahlian menyeluruh dari tahap pra-produksi hingga *print quality control*, serta berpengalaman dalam merancang identitas merek (logo), desain cetak, dan presentasi B2B untuk klien korporat berskala nasional.
          </p>
        </div>

        {/* WORK EXPERIENCE */}
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Work Experience</h3>
          <div className="flex flex-col gap-4">
            {WORK_EXPERIENCE.map((exp, index) => (
              <div key={index} className="avoid-break">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="font-bold text-[14px] text-gray-900">{exp.role}</h4>
                  <span className="text-[13px] font-bold whitespace-nowrap text-gray-800">{exp.year}</span>
                </div>
                <div className="text-[13px] font-medium italic text-gray-700 mb-1.5">{exp.company}</div>
                <p className="text-[13px] leading-relaxed text-justify text-gray-800">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Education</h3>
          <div className="flex flex-col gap-3">
            {EDUCATION.map((edu, index) => (
              <div key={index} className="flex justify-between items-start avoid-break">
                <div>
                  <h4 className="font-bold text-[14px] text-gray-900">{edu.institution}</h4>
                  <div className="text-[13px] text-gray-800">{edu.degree}</div>
                  {edu.description && <div className="text-[12px] text-gray-600 italic mt-0.5">{edu.description}</div>}
                </div>
                <span className="text-[13px] font-bold whitespace-nowrap text-gray-800">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div className="avoid-break">
          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-2 pb-1">Core Competencies & Tools</h3>
          <div className="text-[13px] leading-relaxed text-gray-800">
            <ul className="list-disc list-inside grid grid-cols-2 gap-y-1">
              <li>Adobe Illustrator, Photoshop, InDesign</li>
              <li>Print Quality Control (CMYK, Bleed)</li>
              <li>Brand Identity & Packaging Design</li>
              <li>B2B Pitching & Business Development</li>
              <li>Photography & Camera Operation</li>
              <li>Microsoft Office Suite (Word, Excel)</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}
