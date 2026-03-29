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
      <body className="bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative">
        
        {/* Latar Belakang Clean Deep Cyber Space (Global) */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#060D1F] via-[#0D1836] to-[#060D1F] pointer-events-none z-0"></div>

        {/* =========================================================================
           HEADER & NAVBAR DENGAN GOLDEN RATIO & UNIK HAMBURGER
           ========================================================================= */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#060D1F]/80 backdrop-blur-lg border-b border-white/5 selection:bg-cyan-500">
          <div className="max-w-7xl mx-auto px-6 py-5 md:py-6 flex justify-between items-center relative">
            
            {/* Logo MRR (Golden Ratio Sizing) */}
            <Link href="/" className="group relative z-50">
              <span className="text-3xl font-extrabold tracking-tighter text-white group-hover:text-cyan-400 transition-colors duration-300">
                MRR<span className="text-cyan-500 group-hover:text-white">.</span>
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* DEKSTOP MENU (Hide on Mobile) */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10 font-medium text-sm tracking-widest uppercase">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} className="relative group text-slate-200 hover:text-white transition-colors duration-300">
                  {link.name}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(6,182,212,1)]"></div>
                </Link>
              ))}
            </div>

            {/* =========================================================================
               TOMBOL HAMBURGER UNIK & KEREN (Mobile Only)
               ========================================================================= */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center group bg-[#0A1329] rounded-full border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
              aria-label="Toggle Menu"
            >
              {/* Garis Hamburger Atas */}
              <div className={`w-5 h-0.5 bg-cyan-400 rounded-full transition-all duration-500 ease-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`}></div>
              {/* Garis Hamburger Tengah (Fade Out) */}
              <div className={`w-5 h-0.5 bg-cyan-400 rounded-full transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}></div>
              {/* Garis Hamburger Bawah */}
              <div className={`w-5 h-0.5 bg-cyan-400 rounded-full transition-all duration-500 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'mt-1.5'}`}></div>
              
              {/* Efek Cahaya Saat Hover */}
              <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300"></div>
            </button>

          </div>

          {/* =========================================================================
             MOBILE MENU OVERLAY (Slide & Fade Animation)
             ========================================================================= */}
          <div className={`fixed inset-0 bg-[#060D1F]/98 backdrop-blur-xl z-40 transition-all duration-700 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="flex flex-col items-center justify-center h-full gap-8 p-10 font-bold text-3xl sm:text-4xl tracking-tight selection:bg-cyan-500 selection:text-white">
              {navLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)} // Tutup menu saat link diklik
                  className={`text-white hover:text-cyan-400 transition-all duration-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }} // Efek muncul bergantian
                >
                  {link.name}<span className="text-cyan-500">.</span>
                </Link>
              ))}
              
              {/* Garis Dekorasi Golden Ratio Mobile */}
              <div className="w-16 h-0.5 bg-cyan-800 rounded-full mt-10"></div>
            </div>
          </div>
        </nav>

        {/* =========================================================================
           KONTEN HALAMAN (children)
           ========================================================================= */}
        <main className="relative z-10 pt-10 selection:bg-cyan-500 selection:text-white overflow-x-hidden">
          {children}
        </main>

        {/* =========================================================================
           FOOTER (Golden Ratio & Clean)
           ========================================================================= */}
        <footer className="relative z-10 border-t border-white/5 bg-[#060D1F]/50 backdrop-blur-sm mt-32 py-12 px-6 text-center text-sm text-slate-500 font-light selection:bg-cyan-500">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
            <p>© 2026 Muhammad Rafli Ramadhan. All Rights Reserved.</p>
            <div className="flex gap-6 items-center uppercase tracking-widest text-xs font-bold text-cyan-500/80">
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
