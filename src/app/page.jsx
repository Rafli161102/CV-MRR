"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef } from 'react';

// =========================================================================
// 🛠️ IKON MANDIRI (Bebas Error Vercel)
// =========================================================================
const IconMail = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>);
const IconPhone = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const IconLinkedin = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);
const IconBriefcase = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const IconGraduation = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>);

// =========================================================================
// 🌟 DATA CV (PERSIS 100% DENGAN FILE PDF)
// =========================================================================
const cvData = {
  personal: {
    name: "Muhammad Rafli Ramadhan",
    role: "Graphic Designer",
    summary: "Desainer grafis berpengalaman lebih dari 1 tahun dengan keahlian dalam menciptakan desain visual yang menarik dan efektif. Memiliki keahlian dalam penggunaan perangkat lunak desain seperti Adobe Creative Suite (Photoshop, Illustrator, InDesign) dan mampu mengoperasikan kamera DLSR dengan baik. Berpengalaman dalam desain cetak dan digital, termasuk pembuatan logo, dan materi pemasaran.",
    email: "raflisoenter@gmail.com",
    phone: "085155020363",
    linkedin: "linkedin.com/in/muhammad-rafli-ramadhan-0209b1211",
    profileImage: "/profile.jpg",
  },
  experience: [
    {
      company: "PT Wellen Brother",
      title: "Design Graphic Printing",
      period: "September 2024 - September 2025",
      description: [
        "Designed banners, brochures, flyers, business cards, stickers, posters, and merchandise. Created designs based on client briefs and brand identity.",
        "Prepared print-ready files (CMYK, bleed, crop marks, 300 DPI).",
        "Performed quality control and proofing before printing.",
        "Coordinated with production team and handled client revisions.",
        "Selected appropriate materials (paper, vinyl, finishing) based on project needs.",
        "Ensured color accuracy and print consistency across different print formats."
      ]
    },
    {
      company: "PT Megatama Jaya Makmur",
      title: "Bussiness Development Officer",
      period: "Februari 2024 - Agustus 2024",
      description: [
        "Identified and developed B2B opportunities with corporate clients and partners.",
        "Analyzed client needs and translated them into business and creative solutions.",
        "Prepared business proposals, presentations, and commercial offers.",
        "Created visual materials and mockups to support pitches and client presentations.",
        "Coordinated with design and production teams to deliver client projects.",
        "Conducted pricing, budgeting, and cost efficiency analysis.",
        "Maintained long-term relationships with clients and monitored project satisfaction."
      ]
    },
    {
      company: "Bstation Indonesia",
      title: "Freelance Designer",
      period: "Desember 2023 - Januari 2024",
      description: [
        "As head of the equipment coordination team",
        "as a graphic designer who designed event flyers on Bstation social media at the 2023 Anime Carnival event located at Artha Gading Mall On January 13-14 2024"
      ]
    },
    {
      company: "MineskiInfinity Sunter",
      title: "Costumer Service Associate",
      period: "Maret 2023 - Desember 2023",
      description: [
        "Serving transactions to customers who want to top up member cards",
        "Serve customers who want to make purchases of food and drinks",
        "when entering the night shift, cleaning the internet cafe"
      ]
    },
    {
      company: "PT Berlian Busana Cemerlang.",
      title: "Counter Retail",
      period: "Januari 2022 - Desember 2022",
      description: [
        "Checking customers' dirty clothes",
        "Serving customer transactions when paying and collecting clean clothes",
        "Move the clothes that are ready to the rack near the counter"
      ]
    }
  ],
  education: [
    {
      school: "Universitas Indraprasta PGRI",
      major: "Desain Komunikasi Visual",
      period: "September 2022 - Januari 2024 (Tidak Selesai)",
      highlights: []
    },
    {
      school: "SMK Hang Tuah 2 Jakarta",
      major: "Teknik Komputer dan Jaringan",
      period: "Juni 2018 - Juli 2021",
      highlights: [
        "Wakil Ketua Osis tahun 2020 - 2021",
        "Lulusan terbaik tahun 2021"
      ]
    }
  ],
  skills: {
    design: ["Ai Illustrator", "Ps Photoshop", "Id Indesign"],
    office: ["W Word", "X Excel"]
  },
  projects: [
    {
      title: "KONTRUKSI LOGO",
      company: "Bumi Eka Sukses Tridaya",
      description: "Create a Bumi Eka Sukses Tridaya \"BEST\" Logo Company",
      image: "/projects/logo-best.jpg"
    },
    {
      title: "Packing Box",
      company: "Pertamina One Solution",
      description: "Designing Pertamina one solution souvenir boxes",
      image: "/projects/box-pertamina.jpg"
    },
    {
      title: "Cover Book",
      company: "Pertamina Patra Niaga",
      description: "Designing Pertamina Patra Niaga cover books Langganan Bunker BBM Subsidi",
      image: "/projects/buku-bunker.jpg"
    },
    {
      title: "Pamflet Design",
      company: "Event Kumpul Wibu",
      description: "Designing Pamflet Event Kumpul Wibu. 1-3 November 2023 Bella Terra Lifestyle Center",
      image: "/projects/kumpul-wibu.jpg"
    },
    {
      title: "Pamflet Design",
      company: "Anime Carnival 2023",
      description: "Social Media Designer at Event Bstation Anime Carnival 2023",
      image: "/projects/anime-carnival.jpg"
    },
    {
      title: "AquaNime",
      company: "Community Founder",
      description: "founder of the AquaNime community and composing and designing its social media",
      image: "/projects/aquanime.jpg"
    }
  ]
};

// =========================================================================
// 🚀 KOMPONEN EFEK ENKRIPSI (MUTLAK ANTI-LONCAT / ZERO LAYOUT SHIFT)
// =========================================================================
const DecryptText = ({ text, className = "", as: Tag = "span" }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!text) return;
    let animationFrameId;

    const checkPosition = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      const elementCenter = rect.top + rect.height / 2;
      const viewCenter = viewHeight / 2;
      const distance = Math.abs(elementCenter - viewCenter) / (viewHeight / 2);

      // Zona baca sangat lega (75% layar aman)
      if (distance < 0.75) {
        if (!isDecrypted) {
          setDisplayText(text);
          setIsDecrypted(true);
        }
      } else {
        setIsDecrypted(false);
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*+?';
        const scrambleIntensity = Math.min((distance - 0.75) * 1.5, 1); 

        const scrambled = text.split('').map(char => {
          if (char === ' ' || char === '\n') return char; 
          if (Math.random() < scrambleIntensity) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char; 
        }).join('');

        setDisplayText(scrambled);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(checkPosition);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    checkPosition(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, isDecrypted]);

  return (
    // 'inline-block' dengan 'max-w-full' memastikan teks membungkus (wrap) dengan benar
    <Tag ref={ref} className={`relative inline-block max-w-full align-top ${className}`}>
      
      {/* 🧱 BATU BATA TRANSPARAN: 
          Teks asli dirender di sini tapi tidak terlihat (opacity-0). 
          Fungsinya HANYA untuk menahan ukuran layout 100% akurat 
          sehingga elemen MUSTAHIL loncat/bergetar saat diacak! */}
      <span className="opacity-0 pointer-events-none block whitespace-pre-wrap select-none">
        {text}
      </span>

      {/* 🎭 OVERLAY EFEK:
          Teks acak diletakkan secara melayang (absolute) menutupi batu bata di atas.
          Karena sifatnya absolute, perubahan ukurannya tidak akan mendorong layout lain. */}
      <span className={`absolute top-0 left-0 w-full h-full overflow-hidden block whitespace-pre-wrap transition-colors duration-300 ${
        isDecrypted 
          ? 'text-inherit' // Mengikuti warna asli bawaan parent
          : 'font-mono text-cyan-400 opacity-90 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] encrypted-zone'
      }`}>
        {displayText}
      </span>
    </Tag>
  );
};

// =========================================================================
// 🖱️ CUSTOM CURSOR GLITCH
// =========================================================================
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (e.target.closest('.encrypted-zone')) {
        setIsGlitching(true);
      } else {
        setIsGlitching(false);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block" style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}>
      <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-cyan-400 transition-all duration-300 ease-out ${isGlitching ? 'opacity-0 scale-50' : 'opacity-100 scale-100 shadow-[0_0_15px_rgba(6,182,212,0.4)] bg-cyan-500/5'}`}></div>
      <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 transition-all duration-300 ${isGlitching ? 'opacity-0' : 'opacity-100'}`}></div>
      {isGlitching && (
        <div className="relative">
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-cyan-400 translate-x-[3px] translate-y-[-3px] mix-blend-screen animate-pulse"></div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-rose-500 translate-x-[-4px] translate-y-[4px] mix-blend-screen animate-ping opacity-70"></div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white skew-x-12 animate-bounce"></div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 🎨 DESAIN UI UTAMA (Golden Ratio & Ruang Baca Ekstra Lega)
// =========================================================================
export default function PortfolioNextJS() {
  return (
    <div className="min-h-screen bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white pb-40 overflow-hidden md:cursor-none">
      
      <CustomCursor />

      {/* Latar Belakang Clean Deep Cyber Space */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#060D1F] via-[#0D1836] to-[#060D1F] pointer-events-none z-0"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#060D1F]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex justify-between items-center">
          <div className="text-3xl font-extrabold tracking-tighter text-white">
            RAFLI<span className="text-cyan-500">.</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_12px_#06b6d4]"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 hidden sm:block">
              System Active
            </span>
          </div>
        </div>
      </nav>

      {/* KONTEN UTAMA */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-48 relative z-10">
        
        {/* HERO SECTION (Margin super lega, Proporsi 62% Kiri) */}
        <section className="min-h-[80vh] flex items-center mb-32 md:mb-56">
          <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-8 items-center w-full">
            <div className="w-full lg:w-[61.8%] space-y-12">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-white drop-shadow-xl">
                  <DecryptText text={cvData.personal.name} />
                </h1>
                <h2 className="text-2xl sm:text-4xl text-cyan-400 font-medium tracking-wide">
                  <DecryptText text={cvData.personal.role} />
                </h2>
              </div>
              
              <p className="text-lg sm:text-xl text-slate-400 leading-[2.2] text-justify max-w-2xl font-light">
                <DecryptText text={cvData.personal.summary} className="w-full" />
              </p>
              
              <div className="flex flex-wrap gap-5 pt-8">
                <a href={`mailto:${cvData.personal.email}`} className="group flex items-center px-8 py-5 bg-white text-slate-900 rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.2)] text-base font-bold tracking-wide">
                  <IconMail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <DecryptText text="Email" className="text-slate-900" />
                </a>
                <a href={`https://${cvData.personal.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center px-8 py-5 bg-white/5 border border-cyan-500/30 text-slate-200 rounded-2xl hover:bg-white/10 hover:border-cyan-400 transition-all text-base font-bold tracking-wide">
                  <IconLinkedin className="w-5 h-5 mr-3 text-cyan-500" />
                  <DecryptText text="LinkedIn" />
                </a>
              </div>
            </div>
            
            <div className="w-full lg:w-[38.2%] flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 sm:w-[32rem] sm:h-[32rem] rounded-[5rem] overflow-hidden bg-[#0A1329] shadow-[0_0_60px_rgba(6,182,212,0.15)] rotate-3 hover:rotate-0 transition-transform duration-700 border border-white/5">
                <img src={cvData.personal.profileImage} alt="Rafli Ramadhan" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000" onError={(e) => { e.target.style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-transparent mix-blend-overlay pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* PENGALAMAN KERJA (Margin Antar Elemen Diperlebar Ekstrem) */}
        <section className="py-24 md:py-32 mb-32 md:mb-56">
          <div className="flex items-center space-x-6 border-b border-white/10 pb-10 mb-20 md:mb-32">
            <IconBriefcase className="w-12 h-12 text-cyan-500" />
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              <DecryptText text="Pengalaman Kerja" />
            </h2>
          </div>
          
          <div className="grid gap-24 md:gap-40"> {/* Jarak antar pekerjaan super lega */}
            {cvData.experience.map((exp, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row gap-10 lg:gap-20 group relative">
                {/* Garis dekorasi timeline */}
                <div className="hidden lg:block absolute left-[38.2%] top-0 bottom-[-160px] w-px bg-white/5 group-last:bg-transparent"></div>
                <div className="hidden lg:block absolute left-[38.2%] top-4 w-3 h-3 -translate-x-1.5 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"></div>

                <div className="w-full lg:w-[35%] space-y-6">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                    <DecryptText text={exp.title} />
                  </h3>
                  <div className="text-cyan-400 font-semibold text-xl tracking-wide">
                    <DecryptText text={exp.company} />
                  </div>
                  <div className="inline-block mt-4">
                    <div className="text-sm font-bold tracking-widest text-slate-400 bg-[#0A1329] px-6 py-3 rounded-xl border border-white/10 shadow-lg">
                      <DecryptText text={exp.period} />
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-[60%] lg:pl-10">
                  <ul className="space-y-10 md:space-y-12"> {/* Jarak antar list point sangat lega */}
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start">
                         <span className="mr-6 mt-1.5 text-cyan-500 opacity-80 select-none text-xl">✦</span>
                         <p className="text-lg sm:text-xl text-slate-300 leading-[2.2] font-light flex-1">
                           <DecryptText text={item} className="w-full text-slate-300" />
                         </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROYEK / PORTOFOLIO */}
        <section className="py-24 md:py-32 mb-32 md:mb-56">
          <div className="flex items-center space-x-6 border-b border-white/10 pb-10 mb-20 md:mb-24">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              <DecryptText text="Projek" />
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {cvData.projects.map((project, idx) => (
              <div key={idx} className="group flex flex-col bg-[#0A1329]/80 backdrop-blur-sm p-6 rounded-[3rem] border border-white/5 hover:border-cyan-500/40 hover:bg-[#0D1836] transition-all duration-500 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-[#060D1F] mb-10">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" onError={(e) => { e.target.style.display = 'none'; }} />
                  <IconBriefcase className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white/5 -z-10" />
                </div>
                <div className="px-4 pb-6 flex flex-col flex-grow">
                  <div className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase mb-5">
                    <DecryptText text={project.title} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                    <DecryptText text={project.company} />
                  </h3>
                  <p className="text-slate-400 text-lg leading-[2] font-light mt-auto">
                    <DecryptText text={project.description} className="w-full text-slate-400" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PENDIDIKAN & KEAHLIAN (Split 50/50, Margin Lega) */}
        <section className="grid lg:grid-cols-2 gap-24 md:gap-32 pt-20 border-t border-white/10">
          
          {/* PENDIDIKAN */}
          <div className="space-y-20">
            <div className="flex items-center space-x-6">
              <IconGraduation className="w-12 h-12 text-cyan-500" />
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                <DecryptText text="Pendidikan" />
              </h2>
            </div>
            
            <div className="space-y-24">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="space-y-6 relative pl-12 before:absolute before:left-2 before:top-4 before:bottom-0 before:w-px before:bg-white/10">
                  <span className="absolute left-0 top-3 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_20px_#06b6d4]"></span>
                  <h3 className="text-3xl font-bold text-white"><DecryptText text={edu.school} /></h3>
                  <div className="text-cyan-400 text-2xl font-medium"><DecryptText text={edu.major} /></div>
                  <div className="text-sm font-bold tracking-widest text-slate-500"><DecryptText text={edu.period} /></div>
                  
                  {edu.highlights.length > 0 && (
                    <ul className="pt-8 space-y-5 bg-[#0A1329] p-8 rounded-[2rem] border border-white/5 shadow-xl mt-6">
                      {edu.highlights.map((hl, i) => (
                        <li key={i} className="text-slate-300 text-lg leading-relaxed font-light flex items-start">
                          <span className="mr-5 text-cyan-500 font-bold opacity-80">»</span>
                          <DecryptText text={hl} className="text-slate-300" />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* KEAHLIAN */}
          <div className="space-y-20">
            <div className="flex items-center space-x-6">
              <IconBriefcase className="w-12 h-12 text-cyan-500" />
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                <DecryptText text="Keahlian" />
              </h2>
            </div>
            
            <div className="bg-[#0A1329]/80 backdrop-blur-sm p-12 sm:p-16 rounded-[4rem] border border-white/5 space-y-16 shadow-2xl">
              <div>
                <div className="text-sm font-bold tracking-[0.25em] text-cyan-500 uppercase mb-10">
                  <DecryptText text="Design Tools" />
                </div>
                <div className="flex flex-wrap gap-5">
                  {cvData.skills.design.map((skill, idx) => (
                    <span key={idx} className="px-8 py-5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-2xl text-base font-bold tracking-wider shadow-sm">
                      <DecryptText text={skill} />
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-12 border-t border-white/10">
                <div className="text-sm font-bold tracking-[0.25em] text-slate-500 uppercase mb-10">
                  <DecryptText text="Office Tools" />
                </div>
                <div className="flex flex-wrap gap-5">
                  {cvData.skills.office.map((skill, idx) => (
                    <span key={idx} className="px-8 py-5 bg-white/5 border border-white/10 text-slate-300 rounded-2xl text-base font-bold tracking-wider">
                      <DecryptText text={skill} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
