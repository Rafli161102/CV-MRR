```react
"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Linkedin, Briefcase, PenTool, GraduationCap } from 'lucide-react';

// =========================================================================
// 🌟 DATA CV (SEMUA TEKS ADA DI SINI, BISA LANGSUNG DIEDIT NANTI)
// =========================================================================
const cvData = {
  personal: {
    name: "Muhammad Rafli Ramadhan",
    role: "Graphic Designer",
    summary: "Desainer grafis berpengalaman lebih dari 1 tahun dengan keahlian dalam menciptakan desain visual yang menarik dan efektif. Memiliki keahlian dalam penggunaan perangkat lunak desain seperti Adobe Creative Suite (Photoshop, Illustrator, InDesign) dan mampu mengoperasikan kamera DLSR dengan baik.",
    email: "raflisoenter@gmail.com",
    phone: "6285155020363",
    linkedin: "https://linkedin.com/in/muhammad-rafli-ramadhan-0209b1211",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
  },
  skills: {
    design: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "DSLR Photography", "Print Design", "Digital Design", "Brand Identity"],
    office: ["Microsoft Word", "Microsoft Excel"]
  },
  experience: [
    {
      id: 1,
      title: "Graphic Design Printing",
      company: "PT Wellen Brother",
      period: "Sep 2024 - Sep 2025",
      description: ["Mendesain banner, brosur, flyer, kartu nama, stiker, poster, dan merchandise.", "Menyiapkan file siap cetak (CMYK, bleed, crop marks, 300 DPI)."]
    },
    {
      id: 2,
      title: "Business Dev Officer",
      company: "PT Megatama Jaya Makmur",
      period: "Feb 2024 - Agu 2024",
      description: ["Mengidentifikasi peluang B2B dengan klien korporat.", "Menyiapkan proposal bisnis, presentasi, dan penawaran komersial."]
    },
    {
      id: 3,
      title: "Freelance Designer",
      company: "Bstation Indonesia",
      period: "Des 2023 - Jan 2024",
      description: ["Ketua tim koordinasi perlengkapan.", "Desainer grafis flyer event untuk media sosial Bstation pada event Anime Carnival 2023."]
    }
  ],
  education: [
    {
      id: 1,
      school: "Universitas Indraprasta PGRI",
      major: "Desain Komunikasi Visual",
      period: "Sep 2022 - Jan 2024 (Tidak Selesai)",
      highlights: []
    },
    {
      id: 2,
      school: "SMK Hang Tuah 2 Jakarta",
      major: "Teknik Komputer dan Jaringan",
      period: "Jun 2018 - Jul 2021",
      highlights: ["Wakil Ketua OSIS (2020 - 2021)", "Lulusan Terbaik (2021)"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Pertamina Packing Box",
      category: "Packaging Design",
      description: "Desain kotak souvenir untuk Pertamina One Solution.",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Bunker Buku Subsidi",
      category: "Print Design",
      description: "Desain cover buku Langganan Bunker BBM.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "Logo Konstruksi BEST",
      category: "Brand Identity",
      description: "Pembuatan konstruksi logo dan identitas merek perusahaan.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      title: "Kumpul Wibu Event",
      category: "Social Media Design",
      description: "Desain pamflet promosi untuk event di Bella Terra Lifestyle Center.",
      image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5,
      title: "Bstation Anime Carnival",
      category: "Social Media Design",
      description: "Visual promosi media sosial untuk publikasi acara di Bstation.",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 6,
      title: "AquaNime Community",
      category: "Community Design",
      description: "Desain identitas visual, maskot, dan layout media sosial untuk komunitas AquaNime.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    }
  ]
};

// =========================================================================
// 🚀 KOMPONEN EFEK ENKRIPSI
// =========================================================================
const DecryptText = ({ text, className = "" }) => {
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

      if (distance < 0.25) {
        setDisplayText(text);
        setIsDecrypted(true);
      } else {
        setIsDecrypted(false);
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+/?';
        const scrambleIntensity = Math.min((distance - 0.25) * 2, 1); 

        const scrambled = text.split('').map(char => {
          if (char === ' ') return ' '; 
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
  }, [text]);

  return (
    <span ref={ref} className={`transition-all duration-100 ${isDecrypted ? 'text-black drop-shadow-sm' : 'font-mono text-cyan-600/80 tracking-widest blur-[0.5px]'} ${className}`}>
      {displayText}
      {!isDecrypted && <span className="animate-pulse text-cyan-400">_</span>}
    </span>
  );
};

// =========================================================================
// 🎨 DESAIN UI UTAMA
// =========================================================================
export default function PortfolioNextJS() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-cyan-500 selection:text-white pb-32 relative overflow-hidden">
      
      <div className="fixed top-1/2 left-0 w-full h-[200px] -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent border-y border-cyan-500/20 pointer-events-none z-0 flex flex-col justify-between py-2">
        <div className="text-[10px] text-cyan-500/50 font-mono font-bold tracking-[0.3em] pl-4">DATA DECRYPTION ZONE // START</div>
        <div className="text-[10px] text-cyan-500/50 font-mono font-bold tracking-[0.3em] pl-4">DATA DECRYPTION ZONE // END</div>
      </div>

      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter z-10 relative">
            RAFLI<span className="text-cyan-500">.</span>
          </div>
          <div className="flex items-center space-x-2 z-10 relative">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-[10px] font-mono text-cyan-600 tracking-widest border border-cyan-200 bg-cyan-50 px-3 py-1 rounded-full hidden sm:block">
              SYSTEM ACTIVE : SCROLL TO DECRYPT
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 space-y-48 relative z-10">
        
        <section id="about" className="min-h-[60vh] flex items-center">
          <div className="grid md:grid-cols-12 gap-12 items-center w-full">
            <div className="md:col-span-8 space-y-8">
              <div className="inline-block">
                <span className="text-xs font-mono font-bold text-cyan-500 tracking-widest uppercase mb-2 block">
                  // IDENTITY VERIFIED
                </span>
                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]">
                  <DecryptText text={cvData.personal.name} />
                </h1>
              </div>
              <p className="text-2xl text-zinc-500 font-medium">
                <DecryptText text={cvData.personal.role} />
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-zinc-100 shadow-sm">
                {cvData.personal.summary}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href={`mailto:${cvData.personal.email}`} className="flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors shadow-lg shadow-cyan-500/20 text-sm font-medium">
                  <Mail className="w-4 h-4 mr-2" /> Hubungi via Email
                </a>
                <a href={cvData.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center px-6 py-3 bg-white border border-zinc-200 text-zinc-700 rounded-full hover:bg-zinc-50 transition-colors text-sm font-medium">
                  <Linkedin className="w-4 h-4 mr-2 text-[#0A66C2]" /> LinkedIn
                </a>
              </div>
            </div>
            
            <div className="hidden md:flex md:col-span-4 justify-end">
              <div className="relative w-72 h-72 rounded-[2rem] overflow-hidden bg-zinc-100 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                <img src={cvData.personal.profileImage} alt="Rafli Ramadhan" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-16">
          <div className="flex flex-col space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">
              <DecryptText text="Karya Desain Unggulan" />
            </h2>
            <p className="text-zinc-500 max-w-xl text-lg">Arahkan item ke zona tengah layar untuk mendekripsi detail proyek.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cvData.projects.map((project) => (
              <div key={project.id} className="group flex flex-col bg-white p-3 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:border-cyan-200 transition-all duration-300">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 mb-5">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="px-3 pb-4">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-500 uppercase mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold mb-3 min-h-[3.5rem]">
                    <DecryptText text={project.title} />
                  </h3>
                  <p className="text-sm text-zinc-500 line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-16">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-black text-cyan-400 rounded-2xl shadow-lg shadow-cyan-500/20"><Briefcase className="w-6 h-6" /></div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              <DecryptText text="Pengalaman Profesional" />
            </h2>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-10 lg:col-span-9 space-y-12 border-l-2 border-zinc-200 pl-6 sm:pl-10 ml-2">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="relative group bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:border-cyan-200 transition-colors">
                  <span className="absolute -left-[35px] sm:-left-[51px] top-8 w-4 h-4 rounded-full border-4 border-white bg-cyan-500 shadow-sm group-hover:scale-150 transition-transform"></span>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className="text-2xl font-bold">
                       <DecryptText text={exp.title} />
                    </h3>
                    <span className="text-xs font-mono font-bold text-cyan-600 mt-2 sm:mt-0 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-full">{exp.period}</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-500 mb-6">{exp.company}</h4>
                  
                  <ul className="space-y-3">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start text-zinc-600">
                         <span className="mr-3 font-mono text-cyan-400 mt-0.5 text-sm">{'>'}</span>
                         <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

```
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS PORTFOLIO */}
        <section id="projects" className="space-y-16">
          <div className="flex flex-col space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">
              <DecryptText text="Karya Desain Unggulan" />
            </h2>
            <p className="text-zinc-500 max-w-xl text-lg">Arahkan item ke zona tengah layar untuk mendekripsi detail proyek.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cvData.projects && cvData.projects.map((project) => (
              <div key={project.id} className="group flex flex-col bg-white p-3 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:border-cyan-200 transition-all duration-300">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 mb-5">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="px-3 pb-4">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-500 uppercase mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold mb-3 min-h-[3.5rem]">
                    <DecryptText text={project.title} />
                  </h3>
                  <p className="text-sm text-zinc-500 line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="space-y-16">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-black text-cyan-400 rounded-2xl shadow-lg shadow-cyan-500/20"><Briefcase className="w-6 h-6" /></div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              <DecryptText text="Pengalaman Profesional" />
            </h2>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-10 lg:col-span-9 space-y-12 border-l-2 border-zinc-200 pl-6 sm:pl-10 ml-2">
              {cvData.experience && cvData.experience.map((exp) => (
                <div key={exp.id} className="relative group bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:border-cyan-200 transition-colors">
                  <span className="absolute -left-[35px] sm:-left-[51px] top-8 w-4 h-4 rounded-full border-4 border-white bg-cyan-500 shadow-sm group-hover:scale-150 transition-transform"></span>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className="text-2xl font-bold">
                       <DecryptText text={exp.title} />
                    </h3>
                    <span className="text-xs font-mono font-bold text-cyan-600 mt-2 sm:mt-0 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-full">{exp.period}</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-500 mb-6">{exp.company}</h4>
                  
                  <ul className="space-y-3">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start text-zinc-600">
                         <span className="mr-3 font-mono text-cyan-400 mt-0.5 text-sm">{'>'}</span>
                         <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
      {/* Konten Website (Z-10 agar berada di atas scanner) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 space-y-48 relative z-10">
        
        {/* HERO SECTION */}
        <section id="about" className="min-h-[60vh] flex items-center">
          <div className="grid md:grid-cols-12 gap-12 items-center w-full">
            <div className="md:col-span-8 space-y-8">
              <div className="inline-block">
                <span className="text-xs font-mono font-bold text-cyan-500 tracking-widest uppercase mb-2 block">
                  // IDENTITY VERIFIED
                </span>
                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1]">
                  <DecryptText text={cvData.personal.name} />
                </h1>
              </div>
              <p className="text-2xl text-zinc-500 font-medium">
                <DecryptText text={cvData.personal.role} />
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-zinc-100 shadow-sm">
                {cvData.personal.summary}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href={`mailto:${cvData.personal.email}`} className="flex items-center px-6 py-3 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors shadow-lg shadow-cyan-500/20 text-sm font-medium">
                  <Mail className="w-4 h-4 mr-2" /> Hubungi via Email
                </a>
                <a href={cvData.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center px-6 py-3 bg-white border border-zinc-200 text-zinc-700 rounded-full hover:bg-zinc-50 transition-colors text-sm font-medium">
                  <Linkedin className="w-4 h-4 mr-2 text-[#0A66C2]" /> LinkedIn
                </a>
              </div>
            </div>
            
            <div className="hidden md:flex md:col-span-4 justify-end">
              <div className="relative w-72 h-72 rounded-[2rem] overflow-hidden bg-zinc-100 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                <img src={cvData.personal.profileImage} alt="Rafli Ramadhan" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS PORTFOLIO */}
        <section id="projects" className="space-y-16">
          <div className="flex flex-col space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">
              <DecryptText text="Karya Desain Unggulan" />
            </h2>
            <p className="text-zinc-500 max-w-xl text-lg">Arahkan item ke zona tengah layar untuk mendekripsi detail proyek.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cvData.projects.map((project) => (
              <div key={project.id} className="group flex flex-col bg-white p-3 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:border-cyan-200 transition-all duration-300">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 mb-5">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="px-3 pb-4">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-500 uppercase mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold mb-3 min-h-[3.5rem]">
                    <DecryptText text={project.title} />
                  </h3>
                  <p className="text-sm text-zinc-500 line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="space-y-16">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-black text-cyan-400 rounded-2xl shadow-lg shadow-cyan-500/20"><Briefcase className="w-6 h-6" /></div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              <DecryptText text="Pengalaman Profesional" />
            </h2>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-10 lg:col-span-9 space-y-12 border-l-2 border-zinc-200 pl-6 sm:pl-10 ml-2">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="relative group bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:border-cyan-200 transition-colors">
                  <span className="absolute -left-[35px] sm:-left-[51px] top-8 w-4 h-4 rounded-full border-4 border-white bg-cyan-500 shadow-sm group-hover:scale-150 transition-transform"></span>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className="text-2xl font-bold">
                       <DecryptText text={exp.title} />
                    </h3>
                    <span className="text-xs font-mono font-bold text-cyan-600 mt-2 sm:mt-0 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-full">{exp.period}</span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-500 mb-6">{exp.company}</h4>
                  
                  <ul className="space-y-3">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start text-zinc-600">
                         <span className="mr-3 font-mono text-cyan-400 mt-0.5 text-sm">{'>'}</span>
                         <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
