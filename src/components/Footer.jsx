"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DiamondSparkleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0 text-cyan-400 group-hover:scale-110 transition-transform duration-500"><path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25c.343.186.343.682 0 .868l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-.868l9.75-5.25z" /><path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.129-8.425 4.536a.75.75 0 01-.712 0l-8.425-4.536zM3.265 13.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.129-8.425 4.536a.75.75 0 01-.712 0l-8.425-4.536z" opacity="0.4" /><path d="M12 21.75a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM18.75 12a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM5.25 12a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75z" /></svg>);
const MailIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>);
const WhatsAppSmallIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>);
const BoltIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // FIX BUG: Gunakan display none agar DOM Tree Footer tetap ter-render tapi tak terlihat
  const isStudio = pathname === '/css-studio';

  return (
    <footer style={{ display: isStudio ? 'none' : 'block' }} className="bg-[#030712] relative z-20 w-full overflow-x-hidden pt-16 border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-8 relative z-10">
        <div className="mb-20 p-6 sm:p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#0A1329] to-[#030712] border border-cyan-500/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 group overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-cyan-500/20 transition-all"></div>
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 lg:w-[61.8%]">
            <div className="p-4 bg-cyan-950/40 rounded-2xl border border-cyan-500/30 shrink-0"><DiamondSparkleIcon /></div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">Dukung Perjalanan Kreatif Ini</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">Jika <span className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">Ekosistem Toolkit Gratis</span> ini membantu Anda, pertimbangkan untuk memberi apresiasi demi pemeliharaan server dan komunitas AquaNime.</p>
            </div>
          </div>
          <div className="w-full md:w-auto flex justify-center lg:w-[38.2%] lg:justify-end">
            <a href="https://saweria.co/mrr0" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3">
              Beri Apresiasi
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 mb-16">
          <div className="w-full lg:w-[61.8%] pr-0 lg:pr-20">
            <Link href="/" className="inline-block mb-6"><span className="text-3xl font-black tracking-tighter text-white">MRR<span className="text-cyan-500">.</span></span></Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Menerjemahkan imajinasi menjadi realitas visual melalui desain identitas yang presisi dan strategis.</p>
          </div>
          <div className="w-full lg:w-[38.2%] grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold tracking-widest uppercase text-[10px] mb-6 opacity-60">Navigasi</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li><Link href="/projects" className="hover:text-cyan-400 transition-colors">Portofolio</Link></li>
                <li><Link href="/photography" className="hover:text-cyan-400 transition-colors">Fotografi</Link></li>
                <li><Link href="/toolkit" className="flex items-center gap-2 group w-fit"><div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 shrink-0"><div className="absolute inset-0 bg-cyan-400/20 animate-ping rounded-full"></div><BoltIcon /></div><span className="text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors">Toolkit Ekosistem</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold tracking-widest uppercase text-[10px] mb-6 opacity-60">Kontak</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li><a href="mailto:hello@mrr.my.id" className="flex items-center gap-3 hover:text-cyan-400"><MailIcon /> Email</a></li>
                <li><a href="https://wa.me/6285155020363" className="flex items-center gap-3 hover:text-cyan-400"><WhatsAppSmallIcon /> WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-slate-500 font-medium">
          <p>© {currentYear} Muhammad Rafli Ramadhan. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="https://instagram.com/img_ischeznut.jpg" className="hover:text-cyan-400 tracking-widest uppercase transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/muhammad-rafli-ramadhan" className="hover:text-cyan-400 tracking-widest uppercase transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
