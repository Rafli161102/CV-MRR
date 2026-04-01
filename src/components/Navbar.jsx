"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BoltIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // FIX: Sembunyikan Navbar global jika sedang di dalam CSS Studio
  if (pathname === '/css-studio') return null;

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Portofolio', href: '/projects' },
    { name: 'Fotografi', href: '/photography' },
    { name: 'Tentang', href: '/about' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-[#030712]/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="relative z-[110] group flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
              MRR<span className="text-cyan-500">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`text-sm font-semibold tracking-wide transition-colors ${pathname === link.href ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>
                {link.name}
              </Link>
            ))}
            <Link href="/toolkit" className="group relative px-5 py-2 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-full group-hover:bg-cyan-500/20 transition-all duration-300"></div>
              <span className="relative z-10 flex items-center gap-2 text-sm font-bold text-cyan-400 group-hover:text-cyan-300">
                <BoltIcon /> Toolkit
              </span>
            </Link>
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden relative z-[110] p-2 text-slate-300 hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>
      </header>

      <div className={`md:hidden fixed inset-0 z-[95] bg-[#030712] transition-all duration-300 flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-300 hover:text-cyan-400">{link.name}</Link>
        ))}
        <Link href="/toolkit" onClick={() => setIsMobileMenuOpen(false)} className="mt-6 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-900/40 to-[#030712] border border-cyan-500/30 text-cyan-400 font-bold text-lg flex items-center gap-3">
          <BoltIcon className="w-5 h-5" /> Toolkit Ekosistem
        </Link>
      </div>
    </>
  );
}
