"use client";

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] border-t border-white/5 pt-16 pb-8 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-extrabold tracking-tighter text-white">
                MRR<span className="text-cyan-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Menerjemahkan imajinasi menjadi realitas visual. Fokus pada pembuatan identitas merek yang presisi, estetis, dan strategis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Navigasi</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/projects" className="hover:text-cyan-400 transition-colors">Portofolio</Link></li>
              <li><Link href="/photography" className="hover:text-cyan-400 transition-colors">Galeri Fotografi</Link></li>
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">Tentang Saya</Link></li>
              <li><Link href="/cv-maker" className="hover:text-cyan-400 transition-colors">ATS CV Tools</Link></li>
            </ul>
          </div>

          {/* Contact Info (Di sinilah email barumu bersinar!) */}
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Mari Berdiskusi</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a href="mailto:hello@mrr.my.id" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                  <span className="p-2 rounded-full bg-white/5 group-hover:bg-cyan-500/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  hello@mrr.my.id
                </a>
              </li>
              <li>
                <a href="https://wa.me/6285155020363" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                  <span className="p-2 rounded-full bg-white/5 group-hover:bg-cyan-500/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                  </span>
                  +62 851-5502-0363
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Muhammad Rafli Ramadhan. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://instagram.com/img_ischeznut.jpg" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/muhammad-rafli-ramadhan" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}