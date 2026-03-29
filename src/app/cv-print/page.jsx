"use client";

import { WORK_EXPERIENCE, EDUCATION } from '../../data/store'

export default function CVPrint() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center relative z-10">
      
      {/* =====================================================================
          SIHIR CSS PRINT (Hanya Aktif Saat Tombol Print Ditekan)
          ===================================================================== */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          /* Menyembunyikan seluruh website (Navbar, Footer, Background Cyber) */
          body * {
            visibility: hidden;
          }
          /* Menampilkan hanya kertas CV */
          #cv-container, #cv-container * {
            visibility: visible;
          }
          /* Mengatur posisi kertas CV ke ujung kiri atas kertas */
          #cv-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          /* Mengatur Margin Kertas Printer A4 */
          @page { size: A4; margin: 1.5cm; }
          /* Menyembunyikan elemen dengan class no-print */
          .no-print { display: none !important; }
        }
      `}} />

      {/* =====================================================================
          TOMBOL KONTROL (Tampil di Web, Sembunyi Saat di Print)
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
          KERTAS A4 CV (Format Minimalis ATS)
          ===================================================================== */}
      <div 
        id="cv-container" 
        className="w-full max-w-[21cm] min-h-[29.7cm] bg-white text-black p-10 shadow-2xl rounded-sm font-sans"
      >
        {/* HEADER / KONTAK */}
        <div className="text-center border-b-2 border-black pb-6 mb-6">
          <h1 className="text-4xl font-black uppercase tracking-wider mb-2">Muhammad Rafli Ramadhan</h1>
          <h2 className="text-xl font-medium mb-4 text-gray-800">Graphic Designer</h2>
          <div className="text-sm flex flex-wrap justify-center gap-4 text-gray-700 font-medium">
            <span>📍 Jakarta, Indonesia</span>
            <span>📞 085155020363</span>
            <span>✉️ raflisoenter@gmail.com</span>
            <span>🔗 linkedin.com/in/muhammad-rafli-ramadhan-0209b1211</span>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Professional Summary</h3>
          <p className="text-sm leading-relaxed text-justify">
            Desainer grafis berpengalaman dengan rekam jejak dalam menciptakan desain visual yang strategis dan memikat. Ahli dalam mengoperasikan perangkat lunak industri (Adobe Creative Suite) dan fotografi DSLR. Memiliki keahlian menyeluruh dari tahap pra-produksi hingga *print quality control*, serta berpengalaman dalam merancang identitas merek (logo), desain cetak, dan presentasi B2B untuk klien korporat berskala nasional.
          </p>
        </div>

        {/* WORK EXPERIENCE (Dari store.js) */}
        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Work Experience</h3>
          <div className="flex flex-col gap-5">
            {WORK_EXPERIENCE.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-base">{exp.role}</h4>
                  <span className="text-sm font-bold whitespace-nowrap text-gray-800">{exp.year}</span>
                </div>
                <div className="text-sm font-medium italic text-gray-700 mb-2">{exp.company}</div>
                <p className="text-sm leading-relaxed text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION (Dari store.js) */}
        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Education</h3>
          <div className="flex flex-col gap-4">
            {EDUCATION.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-base">{edu.institution}</h4>
                  <div className="text-sm">{edu.degree}</div>
                  {edu.description && <div className="text-sm text-gray-600 italic mt-1">{edu.description}</div>}
                </div>
                <span className="text-sm font-bold whitespace-nowrap text-gray-800">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div>
          <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Core Competencies & Tools</h3>
          <div className="text-sm leading-relaxed">
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
