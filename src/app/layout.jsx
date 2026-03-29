"use client";

import './globals.css'
import Link from 'next/link'
import { useState } from 'react'

export default function RootLayout({ children }) {
  // State untuk mengontrol Hamburger Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Link Navigasi
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'AquaNime', href: '/aquanime' },
  ];

  return (
    <html lang="id">
      <head>
        <title>MRR | Graphic Designer & Community Founder</title>
        <meta name="description" content="Portofolio Profesional Muhammad Rafli Ramadhan (MRR). Spesialis Brand Identity, Packaging, dan Social Media Design." />
      </head>
      <body className="bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative min-h-screen flex flex-col">
        
        {/* Latar Belakang Clean Deep Cyber Space */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#060D1F] via-[#0D1836] to-[#060D1F] pointer-events-none z-0"></div>

        {/* =========================================================================
           HEADER & NAVBAR (z-50)
           ========================================================================= */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#060D1F]/90 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            
            {/* Logo MRR */}
            <Link href="/" className="group relative z-[60]">
              <span className="text-3xl font-extrabold tracking-tighter text-white group-hover:text-cyan-400 transition-colors duration-300">
                MRR<span className="text-cyan-500 group-hover:text-white">.</span>
              </span>
            </Link>

            {/* DEKSTOP MENU (Sembunyi di HP) */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10 font-medium text-sm tracking-widest uppercase relative z-[60]">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} className="text-slate-200 hover:text-cyan-400 transition-colors duration-300">
                  {link.name}
                </Link>
              ))}
            </div>

            {/* =========================================================================
               TOMBOL HAMBURGER PRESISI (z-60 agar selalu di atas menu)
               ========================================================================= */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-[60] w-12 h-12 flex flex-col justify-center items-end gap-1.5 focus:outline-none"
            >
              <span className={`block h-0.5 bg-cyan-400 rounded-full transition-all duration-400 ease-in-out ${isMenuOpen ? 'w-7 rotate-45 translate-y-2' : 'w-7'}`}></span>
              <span className={`block h-0.5 bg-cyan-400 rounded-full transition-all duration-400 ease-in-out ${isMenuOpen ? 'w-0 opacity-0' : 'w-5'}`}></span>
              <span className={`block h-0.5 bg-cyan-400 rounded-full transition-all duration-400 ease-in-out ${isMenuOpen ? 'w-7 -rotate-45 -translate-y-2' : 'w-7'}`}></span>
            </button>

          </div>
        </nav>

        {/* =========================================================================
           MOBILE MENU OVERLAY (PINDAH KE LUAR NAVBAR)
           ========================================================================= */}
        <div className={`fixed inset-0 bg-[#060D1F]/98 backdrop-blur-2xl z-40 transition-all duration-500 ease-in-out flex flex-col items-center justify-center ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <div className="flex flex-col items-center gap-10 text-4xl font-black tracking-tight">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)} // Tutup menu otomatis saat diklik
                className={`text-white hover:text-cyan-400 transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ transitionDelay: `${index * 75}ms` }} // Efek muncul berurutan (Cascade)
              >
                {link.name}<span className="text-cyan-500">.</span>
              </Link>
            ))}
          </div>
          {/* Garis Dekorasi Bawah Menu */}
          <div className={`w-16 h-1 bg-cyan-800 rounded-full mt-12 transition-all duration-700 delay-300 ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
        </div>

        {/* =========================================================================
           KONTEN HALAMAN (Diberi padding atas pt-28 agar tidak tertutup header)
           ========================================================================= */}
        <main className="relative z-10 pt-28 flex-grow">
          {children}
        </main>

        {/* =========================================================================
           FOOTER
           ========================================================================= */}
        <footer className="relative z-10 border-t border-white/5 bg-[#060D1F]/50 backdrop-blur-sm mt-32 py-12 px-6 text-center text-sm text-slate-500 font-light selection:bg-cyan-500">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
            <p>© 2026 Muhammad Rafli Ramadhan. All Rights Reserved.</p>
            <div className="flex gap-4 sm:gap-6 items-center uppercase tracking-widest text-[10px] sm:text-xs font-bold text-cyan-500/80">
              <span>Graphic Designer</span>
              <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
              <span>AquaNime Founder</span>
            </div>
            <p className="text-xs text-slate-700 mt-2">Built with Golden Ratio UI/UX</p>
          </div>
        </footer>

      </body>
    </html>
  )
}
