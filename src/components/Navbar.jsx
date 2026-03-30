"use client";

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Link Navigasi
  const navLinks = [
    { name: 'Home', href: '/', isExternal: false },
    { name: 'Projects', href: '/projects', isExternal: false },
    { name: 'Photography', href: '/photography', isExternal: false }, // 📸 Link ke Galeri IG
    { name: 'About', href: '/about', isExternal: false },
    { name: 'CV Tools', href: '/cv-maker', isExternal: false }, // 💼 Nama baru yang lebih profesional
    { name: 'AquaNime', href: 'https://aqua-nime.vercel.app/', isExternal: true },
  ];

  return (
    <>
      {/* HEADER & NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#060D1F]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo MRR */}
          <Link href="/" className="group relative z-[60]" onClick={() => setIsMenuOpen(false)}>
            <span className="text-3xl font-extrabold tracking-tighter text-white group-hover:text-cyan-400 transition-colors duration-300">
              MRR<span className="text-cyan-500 group-hover:text-white">.</span>
            </span>
          </Link>

          {/* DEKSTOP MENU */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 font-medium text-sm tracking-widest uppercase relative z-[60]">
            {navLinks.map((link, index) => (
              link.isExternal ? (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1">
                  {link.name} <span className="text-xs">↗</span>
                </a>
              ) : (
                <Link key={index} href={link.href} className="text-slate-200 hover:text-cyan-400 transition-colors duration-300">
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* TOMBOL HAMBURGER PRESISI */}
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

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-[#060D1F]/98 backdrop-blur-2xl z-40 transition-all duration-500 ease-in-out flex flex-col items-center justify-center ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-10 text-4xl font-black tracking-tight">
          {navLinks.map((link, index) => (
             link.isExternal ? (
              <a 
                key={index} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)} 
                className={`text-white hover:text-cyan-400 transition-all duration-500 flex items-center gap-2 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ transitionDelay: `${index * 75}ms` }} 
              >
                {link.name}<span className="text-cyan-500 text-2xl mb-4">↗</span>
              </a>
             ) : (
              <Link 
                key={index} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)} 
                className={`text-white hover:text-cyan-400 transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ transitionDelay: `${index * 75}ms` }} 
              >
                {link.name}<span className="text-cyan-500">.</span>
              </Link>
             )
          ))}
        </div>
        <div className={`w-16 h-1 bg-cyan-800 rounded-full mt-12 transition-all duration-700 delay-300 ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
      </div>
    </>
  )
}
