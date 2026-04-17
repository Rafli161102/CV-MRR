"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================================
// KUMPULAN IKON SVG PREMIUM
// ============================================================================
const Icons = {
  Document: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  Network: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
  Palette: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  Signature: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>,
  Grid: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  Receipt: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  Ratio: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>,
  Layers: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" /></svg>,
  Badge: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 10-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94-.19-1.28-.53l-.97-.97c-.34-.34-.53-.8-.53-1.28s.19-.94.53-1.28l8.47-8.47m0 0l2.5-2.5" /></svg>,
  Transform: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>,
  Typography: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
  Brackets: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  Markdown: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v-6h3v6m-3-3h3m-3-3h-3m10.5-3l-3 3m0 0l-3-3m3 3v-6" /></svg>,
  Key: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>,
  ArrowRight: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>,
  Lock: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
  ShieldCheck: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296a3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043a3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296a3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043a3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>,
  X: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  Brush: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  Code: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  ArrowUpRight: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>,
  Search: (p) => <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  
  // Ikon Kursor ala Video Game (Desain Modern Pointer)
  PointerCursor: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4.08 1.488a1 1 0 011.265-.175l14.4 9.6a1 1 0 01-.168 1.706l-5.748 2.395 3.864 7.728a1 1 0 01-1.789.894l-3.882-7.765-4.536 4.536A1 1 0 016 19.6V2.4a1 1 0 01.08-.312z" />
    </svg>
  )
};

// ============================================================================
// DATA MASTER TOOLKIT 
// ============================================================================
export const toolkits = [
  { id: "cv-maker", title: "ATS CV & Cover Letter", description: "Buat Curriculum Vitae dan Surat Lamaran Kerja standar mesin HRD.", iconName: "Document", link: "/cv-maker", status: "active", category: "Career & Freelance", theme: "purple", hoverAnim: "hover-float", clickAnim: "click-paper-fly" },
  { id: "css-studio", title: "CSS Visual Studio", description: "Generator visual All-in-One untuk efek Glassmorphism, Neumorphism, dll.", iconName: "Layers", link: "/css-studio", status: "active", category: "Web Developer", theme: "cyan", hoverAnim: "hover-pulse-soft", clickAnim: "click-layer-pop" },
  { id: "wa-generator", title: "Premium WA & QR Link", description: "Buat tautan otomatis WhatsApp dan ubah menjadi desain QR Code.", iconName: "Network", link: "/wa-generator", status: "coming_soon", category: "Community Tool", theme: "emerald", hoverAnim: "hover-connect", clickAnim: "click-send-msg" },
  { id: "color-extractor", title: "Brand Color Extractor", description: "Unggah gambar referensi dan ekstrak 5 palet warna dominan.", iconName: "Palette", link: "/color-extractor", status: "coming_soon", category: "Design Utility", theme: "pink", hoverAnim: "hover-rainbow", clickAnim: "click-color-splash" },
  { id: "email-signature", title: "Email Signature Builder", description: "Rakit desain tanda tangan email HTML profesional yang elegan.", iconName: "Signature", link: "/email-signature", status: "coming_soon", category: "Career & Freelance", theme: "orange", hoverAnim: "hover-draw", clickAnim: "click-sign-done" },
  { id: "ig-splitter", title: "Seamless IG Splitter", description: "Potong gambar panorama memanjang menjadi 2-10 kotak presisi.", iconName: "Grid", link: "/ig-splitter", status: "coming_soon", category: "Design Utility", theme: "rose", hoverAnim: "hover-split", clickAnim: "click-slice-apart" },
  { id: "freelance-invoice", title: "Freelance Rate & Invoice", description: "Kalkulator pintar harga per-jam dan generator dokumen Invoice PDF.", iconName: "Receipt", link: "/toolkit/freelance-invoice", status: "active", category: "Career & Freelance", theme: "green", hoverAnim: "hover-wiggle", clickAnim: "click-receipt-print" },
  { id: "golden-ratio", title: "Golden Ratio Calculator", description: "Dapatkan pembagian proporsi matematis (1:1.618) untuk layout.", iconName: "Ratio", link: "/golden-ratio", status: "coming_soon", category: "Design Utility", theme: "yellow", hoverAnim: "hover-spin-slow", clickAnim: "click-spiral-in" },
  { id: "event-ticket", title: "Event Badge Generator", description: "Render otomatis daftar peserta menjadi desain Name Badge.", iconName: "Badge", link: "/event-ticket", status: "coming_soon", category: "Community Tool", theme: "blue", hoverAnim: "hover-badge-swing", clickAnim: "click-stamp-approve" },
  { id: "image-converter", title: "Fast Image to WebP", description: "Kompres dan ubah format gambar (JPG/PNG) menjadi WebP.", iconName: "Transform", link: "/image-converter", status: "coming_soon", category: "Web Developer", theme: "indigo", hoverAnim: "hover-flip", clickAnim: "click-compress-poof" },
  { id: "type-scale", title: "Typographic Scale", description: "Dapatkan hirarki ukuran font (H1, H2, Paragraf) yang harmonis.", iconName: "Typography", link: "/type-scale", status: "coming_soon", category: "Design Utility", theme: "slate", hoverAnim: "hover-typewriter", clickAnim: "click-text-grow" },
  { id: "json-visual", title: "JSON Visualizer Tree", description: "Format dan visualisasikan data JSON rumit dalam bentuk cabang diagram.", iconName: "Brackets", link: "/json-visual", status: "coming_soon", category: "Web Developer", theme: "red", hoverAnim: "hover-expand", clickAnim: "click-node-branch" },
  { id: "markdown-pad", title: "Live Markdown Pad", description: "Editor teks Markdown dengan layar ganda (mengetik dan melihat hasil).", iconName: "Markdown", link: "/markdown-pad", status: "coming_soon", category: "Career & Freelance", theme: "teal", hoverAnim: "hover-slide-up", clickAnim: "click-page-turn" },
  { id: "jwt-decoder", title: "Offline JWT Decoder", description: "Bongkar dan lihat isi data dari JSON Web Token (JWT) secara aman.", iconName: "Key", link: "/jwt-decoder", status: "coming_soon", category: "Web Developer", theme: "yellow", hoverAnim: "hover-unlock", clickAnim: "click-key-turn" }
];

const toolThemes = {
  blue: { bg: 'from-blue-500/20 to-indigo-500/20', iconBg: 'from-blue-500 to-indigo-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]', text: 'text-blue-400', border: 'group-hover:border-blue-500/40' },
  purple: { bg: 'from-purple-500/20 to-fuchsia-500/20', iconBg: 'from-purple-500 to-fuchsia-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]', text: 'text-purple-400', border: 'group-hover:border-purple-500/40' },
  green: { bg: 'from-emerald-500/20 to-teal-500/20', iconBg: 'from-emerald-500 to-teal-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]', text: 'text-emerald-400', border: 'group-hover:border-emerald-500/40' },
  orange: { bg: 'from-orange-500/20 to-amber-500/20', iconBg: 'from-orange-500 to-amber-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]', text: 'text-orange-400', border: 'group-hover:border-orange-500/40' },
  rose: { bg: 'from-rose-500/20 to-pink-500/20', iconBg: 'from-rose-500 to-pink-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.4)]', text: 'text-rose-400', border: 'group-hover:border-rose-500/40' },
  yellow: { bg: 'from-yellow-400/20 to-amber-400/20', iconBg: 'from-yellow-400 to-amber-500', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(250,204,21,0.4)]', text: 'text-yellow-400', border: 'group-hover:border-yellow-500/40' },
  cyan: { bg: 'from-cyan-500/20 to-sky-500/20', iconBg: 'from-cyan-500 to-sky-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]', text: 'text-cyan-400', border: 'group-hover:border-cyan-500/40' },
  pink: { bg: 'from-pink-500/20 to-rose-400/20', iconBg: 'from-pink-500 to-rose-500', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)]', text: 'text-pink-400', border: 'group-hover:border-pink-500/40' },
  red: { bg: 'from-red-500/20 to-rose-600/20', iconBg: 'from-red-500 to-rose-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)]', text: 'text-red-400', border: 'group-hover:border-red-500/40' },
  indigo: { bg: 'from-indigo-500/20 to-blue-600/20', iconBg: 'from-indigo-500 to-blue-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]', text: 'text-indigo-400', border: 'group-hover:border-indigo-500/40' },
  teal: { bg: 'from-teal-500/20 to-cyan-600/20', iconBg: 'from-teal-500 to-cyan-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.4)]', text: 'text-teal-400', border: 'group-hover:border-teal-500/40' },
  emerald: { bg: 'from-emerald-400/20 to-green-500/20', iconBg: 'from-emerald-400 to-green-500', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)]', text: 'text-emerald-400', border: 'group-hover:border-emerald-400/40' },
  slate: { bg: 'from-slate-500/20 to-gray-500/20', iconBg: 'from-slate-500 to-gray-600', glow: 'group-hover:shadow-[0_0_30px_-5px_rgba(100,116,139,0.4)]', text: 'text-slate-400', border: 'group-hover:border-slate-500/40' },
};

// =========================================================================
// KOMPONEN KARTU MODUL (DENGAN ANCHOR TAG MURNI - ANTI CRASH)
// =========================================================================
const UnifiedCard = ({ tool, cardId }) => {
  const [isClicked, setIsClicked] = useState(false);
  const isActive = tool.status === 'active'; 
  const theme = toolThemes[tool.theme] || toolThemes.blue;
  const IconComponent = Icons[tool.iconName] || Icons.Document;
  const linkRef = useRef(null);

  const handleClick = (e) => {
    if (!isActive) return;
    e.preventDefault(); 
    setIsClicked(true); 
    
    setTimeout(() => {
      setIsClicked(false);
      // Fallback HTML navigation murni
      if (tool.link && tool.link.trim() !== '' && tool.link !== '#') {
        if (linkRef.current) {
          linkRef.current.click();
        } else {
          window.location.href = tool.link;
        }
      }
    }, 600);
  };

  return (
    <>
      {tool.link && tool.link.trim() !== '' && tool.link !== '#' && (
        <a ref={linkRef} href={tool.link} style={{ display: 'none' }} aria-hidden="true"></a>
      )}
      <div 
        id={cardId} 
        onClick={handleClick}
        className={`group relative flex flex-col justify-between p-4 sm:p-5 lg:p-6 transition-all duration-300 rounded-xl sm:rounded-[20px] lg:rounded-[24px] overflow-hidden min-h-[120px] sm:min-h-[140px] lg:aspect-[1.618/1] transform-gpu
          ${isActive 
            ? `bg-[#0a0f18] border border-white/[0.08] hover:border-white/[0.15] ${theme.glow} hover:-translate-y-1 cursor-pointer` 
            : `bg-white/[0.01] border border-white/[0.02] opacity-60 grayscale-[80%] transition-all cursor-not-allowed`
        } ${isClicked ? 'scale-[0.96] border-white/30 !shadow-none' : ''}`}
      >
        <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-bl ${theme.bg} rounded-full blur-[30px] sm:blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

        <div className="flex items-start justify-between mb-3 sm:mb-4 lg:mb-6 relative z-10">
          <div className={`w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-[10px] sm:rounded-[14px] flex items-center justify-center transition-all duration-500 shadow-lg shrink-0
            ${!isClicked && isActive ? `group-hover:${tool.hoverAnim}` : ''} 
            ${isClicked && tool.clickAnim ? tool.clickAnim : ''} 
            ${isActive ? `bg-gradient-to-tr ${theme.iconBg} text-white` : `bg-white/5 text-slate-400 border border-white/10`}
          `}>
             <IconComponent className="w-[18px] h-[18px] sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]" />
          </div>

          <div className="shrink-0">
            {isActive ? (
              <div className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full transition-all duration-300 bg-white/5 text-slate-400 group-hover:bg-white/10 ${theme.text} ${isClicked ? 'translate-x-2 opacity-0' : ''}`}>
                <Icons.ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            ) : (
              <div className="flex items-center gap-1 px-1.5 py-1 sm:px-2.5 sm:py-1.5 bg-black/40 border border-white/5 rounded-full">
                 <Icons.Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500" />
                 <span className="text-[7px] sm:text-[9px] font-bold tracking-widest text-slate-500">SOON</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-end">
          <h3 className={`text-[13px] sm:text-[16px] lg:text-[18px] font-bold tracking-tight mb-1 sm:mb-1.5 transition-colors ${isActive ? 'text-slate-100 group-hover:text-white' : 'text-slate-500'} line-clamp-1`}>
            {tool.title}
          </h3>
          <p className="text-[10px] sm:text-[11px] lg:text-[12px] text-slate-400/80 font-medium line-clamp-2 sm:line-clamp-2 leading-relaxed transition-colors">
            {tool.description}
          </p>
        </div>
      </div>
    </>
  );
};

// =========================================================================
// DATA LANGKAH TUTORIAL (Misi Utama)
// =========================================================================
const TOUR_STEPS = [
  { target: 'tut-start', title: 'Akses Panduan Utama', text: <>Ini adalah meja kerja digital Anda. <br/><br/>Kapanpun Anda merasa kebingungan, klik tombol ini untuk memanggil ulang instruksi sistem.</>, position: 'bottom' },
  { target: 'tut-filter', title: 'Filter Modul Cepat', text: <>Gunakan tab menu ini untuk menyaring alat. <br/><br/>Contoh: Klik <strong>"Design Utility"</strong> jika Anda hanya ingin melihat alat untuk keperluan merancang grafis UI/UX.</>, position: 'bottom' },
  { target: 'tut-active', title: 'Modul Aktif & Tersedia', text: <><ul className="list-disc pl-4 space-y-1 mb-2 text-left"><li>Bentuk menyala berwarna cerah</li><li>Memiliki ikon navigasi panah</li><li>Dapat diakses seketika</li></ul>Modul ini sudah 100% siap memproses data pekerjaan Anda.</>, position: 'bottom' },
  { target: 'tut-locked', title: 'Modul Dalam Perakitan', text: <>Kartu beraksen abu-abu dengan label <strong>"SOON"</strong> berarti alat ini masih dalam tahap pemrograman struktur oleh saya. <br/><br/>Nantikan pembaruan fitur eksklusif selanjutnya!</>, position: 'top' },
  { target: 'tut-security', title: 'Infrastruktur Privasi', text: <>Sangat krusial: Semua alat di sini <strong>beroperasi murni di RAM perangkat Anda</strong> (tanpa server backend atau database).<br/><br/>Karya dan data klien Anda dijamin tidak akan pernah bocor ke internet.</>, position: 'bottom' }
];

// =========================================================================
// KOMPONEN: BUBBLE TUTORIAL (GAMING HUD STYLE - 100% ANTI-GAGAL & PRESISI)
// =========================================================================
const GuidedTour = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const requestRef = useRef();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateRect = useCallback(() => {
    if (typeof window === 'undefined') return;
    const targetId = TOUR_STEPS[step]?.target;
    if (!targetId) return;

    const el = document.getElementById(targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setTargetRect({
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height,
          radius: window.getComputedStyle(el).borderRadius || '16px'
        });
      }
    }
    requestRef.current = requestAnimationFrame(updateRect);
  }, [step]);

  useEffect(() => {
    if (!isClient) return;

    let retries = 0;
    let timerId;
    let tracker;

    setIsScanning(true);
    setTargetRect(null); // Reset highlight kotak setiap ganti step untuk animasi mulus

    // RADAR PINTAR: Menunggu elemen dimuat secara penuh
    const findTarget = () => {
      const targetId = TOUR_STEPS[step]?.target;
      const el = document.getElementById(targetId);

      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0) {
           el.scrollIntoView({ behavior: 'smooth', block: 'center' });
           setIsScanning(false);
           updateRect(); // Mulai sorot
           tracker = setInterval(updateRect, 50); // Kunci posisi agar menempel walau layar di scroll
        } else {
           retry();
        }
      } else {
        retry();
      }
    };

    const retry = () => {
      if (retries < 30) { // Sabar mencari hingga 3 Detik (kebal lag/blank)
        retries++;
        timerId = setTimeout(findTarget, 100);
      } else {
        if (step < TOUR_STEPS.length - 1) setStep(s => s + 1);
        else onComplete();
      }
    };

    findTarget();

    return () => {
      if (timerId) clearTimeout(timerId);
      if (tracker) clearInterval(tracker);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [step, isClient, updateRect, onComplete]);

  if (!isClient) return null;

  const isMobile = window.innerWidth < 640;
  const padding = 10; 
  const bubbleWidth = isMobile ? window.innerWidth - 32 : 360;
  
  // Kalkulasi Penempatan Tooltip (Mencegah Ketutupan Layar atau Elemen)
  let bTop = '50%';
  let bLeft = '50%';
  let transformCalc = 'translate(-50%, -50%)';

  if (targetRect) {
      const spaceAbove = targetRect.top;
      const spaceBelow = window.innerHeight - targetRect.bottom;
      const prefPos = TOUR_STEPS[step].position;

      // Batasan X agar tooltip tidak keluar dari layar kiri/kanan
      let idealLeft = targetRect.left + (targetRect.width / 2);
      if (idealLeft - (bubbleWidth / 2) < 16) idealLeft = (bubbleWidth / 2) + 16;
      if (idealLeft + (bubbleWidth / 2) > window.innerWidth - 16) idealLeft = window.innerWidth - (bubbleWidth / 2) - 16;

      bLeft = isMobile ? '50%' : `${idealLeft}px`;

      // Logika Atas atau Bawah otomatis: Jika tempat yang diminta sempit, pindah ke sisi yang lebih luas
      if (prefPos === 'top') {
         if (spaceAbove > 200) {
            bTop = `${targetRect.top - padding - 20}px`;
            transformCalc = 'translate(-50%, -100%)';
         } else {
            bTop = `${targetRect.bottom + padding + 20}px`;
            transformCalc = 'translate(-50%, 0)';
         }
      } else { // default 'bottom'
         if (spaceBelow > 250 || spaceBelow > spaceAbove) {
            bTop = `${targetRect.bottom + padding + 20}px`;
            transformCalc = 'translate(-50%, 0)';
         } else {
            bTop = `${targetRect.top - padding - 20}px`;
            transformCalc = 'translate(-50%, -100%)';
         }
      }
  }

  return (
    // Z-INDEX TERTINGGI (999999) agar tak pernah tertutup Navbar/Footer global Anda
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999 }} onClick={(e) => e.stopPropagation()}>
      
      {/* Jika masih mencari, tampilkan Radar Loading. Jika ketemu, lubangi layarnya murni box-shadow tanpa blur. */}
      {isScanning ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#030712]/90 backdrop-blur-sm transition-all duration-300">
           <div className="flex flex-col items-center gap-3 text-cyan-400 font-bold tracking-widest animate-pulse">
              <Icons.Search className="w-10 h-10 animate-spin-slow" />
              <span className="text-[11px] uppercase">Memindai Target...</span>
           </div>
        </div>
      ) : targetRect ? (
        <>
          <div 
            className="absolute pointer-events-none transition-all duration-300 ease-out"
            style={{
              top: targetRect.top - padding,
              left: targetRect.left - padding,
              width: targetRect.width + padding * 2,
              height: targetRect.height + padding * 2,
              borderRadius: `calc(${targetRect.radius} + 6px)`,
              boxShadow: '0 0 0 9999px rgba(3,7,18,0.85)', 
            }}
          >
             {/* Sudut-Sudut Pembidik Kamera ala Sci-Fi HUD */}
             <div className="absolute top-[-4px] left-[-4px] w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl animate-pulse-fast"></div>
             <div className="absolute top-[-4px] right-[-4px] w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl animate-pulse-fast"></div>
             <div className="absolute bottom-[-4px] left-[-4px] w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl animate-pulse-fast"></div>
             <div className="absolute bottom-[-4px] right-[-4px] w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-xl animate-pulse-fast"></div>
             
             {/* Animasi Kursor Penunjuk ala Video Game (Diletakkan di Sudut Kanan Bawah target agar tidak menutupi tengah objek) */}
             <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 pointer-events-none z-[999999]">
                <Icons.PointerCursor className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-hud-click" />
             </div>
          </div>

          {/* Kotak Misi Panduan */}
          <div 
            className="bg-[#0f172a] border border-cyan-500/50 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-[24px] p-5 sm:p-6"
            style={{
              position: 'absolute',
              width: `${bubbleWidth}px`,
              left: bLeft,
              top: bTop,
              transform: transformCalc,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
             <div className="relative z-10 pointer-events-auto">
               <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                 <span className="text-[10px] font-black tracking-[0.15em] text-cyan-400 uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    Misi {step + 1} / {TOUR_STEPS.length}
                 </span>
                 <button onClick={onComplete} className="text-slate-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full">
                    <Icons.X className="w-3 h-3" />
                 </button>
               </div>
               
               <h4 className="text-[16px] sm:text-[18px] font-bold text-white mb-3 tracking-tight">{TOUR_STEPS[step].title}</h4>
               <div className="text-[13px] sm:text-[13.5px] text-slate-400 leading-relaxed font-medium mb-6">{TOUR_STEPS[step].text}</div>
               
               <div className="flex justify-between items-center pt-2">
                 <button onClick={onComplete} className="text-[11px] sm:text-[12px] font-bold text-slate-500 hover:text-white transition-colors px-2 py-2 uppercase tracking-wide">Tutup Panduan</button>
                 <button onClick={() => step < TOUR_STEPS.length - 1 ? setStep(s => s + 1) : onComplete()} className="group bg-cyan-500 hover:bg-cyan-400 text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[12px] sm:text-[13px] font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 flex items-center gap-2">
                   {step < TOUR_STEPS.length - 1 ? 'Lanjutkan' : 'Selesai!'}
                   <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                 </button>
               </div>
             </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

// =========================================================================
// KOMPONEN UTAMA HALAMAN
// =========================================================================
export default function ToolkitPage() {
  const categories = ['Semua', ...new Set(toolkits.map(tool => tool.category))];
  const [activeCat, setActiveCat] = useState('Semua');
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  useEffect(() => {
    // AUTO-START MUTLAK SETIAP KALI HALAMAN DI-MUAT
    // Memberikan jeda 1.2 detik agar UI sempat ter-render sempurna.
    const timer = setTimeout(() => setShowTutorial(true), 1200); 
    return () => clearTimeout(timer);
  }, []);

  const handleCompleteTutorial = () => {
    setShowTutorial(false);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const filteredTools = activeCat === 'Semua' ? [...toolkits] : toolkits.filter(tool => tool.category === activeCat);

  // Deklarasi target dinamis untuk Tour Guide
  const firstActiveToolId = toolkits.find(t => t.status === 'active')?.id;
  const firstLockedToolId = toolkits.find(t => t.status !== 'active')?.id;

  return (
    <div className="w-full bg-[#05050A] text-slate-200 font-sans relative overflow-x-hidden flex flex-col min-h-screen selection:bg-cyan-500/30 selection:text-cyan-300">
      
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] bg-blue-600/10 rounded-full blur-[120px] sm:blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] bg-purple-600/10 rounded-full blur-[120px] sm:blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 lg:pt-32 pb-0 flex flex-col flex-grow">
        
        {/* HEADER DIPERBAIKI (TOMBOL PANDUAN KIRI ATAS, INFO KEAMANAN KANAN) */}
        <header className="mb-6 sm:mb-8 lg:mb-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
            <div className="w-full md:w-[65%]">
              
              <button 
                id="tut-start"
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-5 lg:mb-6 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors w-max" 
                onClick={() => { 
                  setActiveCat('Semua'); 
                  setShowTutorial(false); // Reset State
                  setTimeout(() => {
                     window.scrollTo({top: 0, behavior: 'smooth'}); 
                     setShowTutorial(true); // Nyalakan ulang
                  }, 150); 
                }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-fast"></div>
                <span className="text-[10px] sm:text-xs font-bold tracking-wide text-slate-300 uppercase">Mulai Ulang Panduan</span>
              </button>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight mb-3 sm:mb-4 leading-[1.1]">
                Creative <span className="text-rgb-animated">Override.</span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-2xl">
                Koleksi utilitas canggih. Semuanya bekerja langsung di dalam browser Anda dengan privasi terjamin sepenuhnya.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex md:justify-end">
              <button 
                id="tut-security" 
                onClick={() => setIsSecurityModalOpen(true)}
                className="w-full md:w-auto justify-center flex items-center gap-2 sm:gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-emerald-400"
              >
                <Icons.ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[13px] sm:text-[14px] font-bold">Info Keamanan</span>
              </button>
            </div>
          </div>
        </header>

        <div id="tut-filter" className="w-full overflow-x-auto no-scrollbar py-2 mb-6 sm:mb-8 lg:mb-10 sticky top-[70px] sm:top-[90px] z-[5] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/[0.03] p-1.5 rounded-[16px] sm:rounded-[20px] border border-white/5 backdrop-blur-xl">
            {categories.map(cat => (
              <button 
                key={cat} onClick={() => setActiveCat(cat)}
                className={`relative px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-[11px] sm:text-[12px] lg:text-[14px] font-bold transition-all duration-300 rounded-xl whitespace-nowrap ${
                  activeCat === cat ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                {activeCat === cat && <div className="absolute inset-0 bg-white/10 rounded-xl pointer-events-none border border-white/10"></div>}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-up w-full" style={{ animationDelay: '0.2s' }}>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredTools.map((tool) => {
               const isTargetActive = tool.id === firstActiveToolId;
               const isTargetLocked = tool.id === firstLockedToolId;

               return <UnifiedCard 
                  key={tool.id} 
                  tool={tool} 
                  cardId={isTargetActive ? 'tut-active' : isTargetLocked ? 'tut-locked' : undefined} 
               />;
            })}
          </div>
        </div>

        {/* SHOWCASE EKSKLUSIF DESAINER GRAFIS (Pemisah Estetik Bersih, Bebas Emoticon) */}
        <div className="w-full mt-16 sm:mt-24 pt-12 sm:pt-16 pb-24 sm:pb-32 border-t border-white/5 relative flex flex-col items-center justify-center text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
           
           <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-tight">Karya Visual Tanpa Batas</h3>
           <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mb-8 sm:mb-10 leading-relaxed px-4">
             Sebagai seorang <strong>Desainer Grafis & Front-End Developer</strong>, antarmuka ini dirancang presisi hingga ke tingkat piksel. Seluruh utilitas beroperasi secara <strong>Client-Side (Tanpa Backend)</strong>, memastikan keamanan privasi data Anda secara mutlak.
           </p>
           
           <a href="mailto:rafli161102@gmail.com" className="group flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-slate-200 rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
             Mari Berkolaborasi
             <Icons.ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
           </a>
        </div>

      </div>

      {/* JENDELA INFO KEAMANAN (KOMPAK) */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-[#000000]/80 backdrop-blur-sm animate-fade-in">
           <div className="absolute inset-0 cursor-pointer" onClick={() => setIsSecurityModalOpen(false)}></div>
           
           <div className="relative w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-[20px] sm:rounded-[32px] overflow-hidden z-10 flex flex-col">
              
              <div className="p-4 sm:p-6 text-center border-b border-white/5 relative shrink-0">
                 <button onClick={() => setIsSecurityModalOpen(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 sm:p-2 rounded-full">
                   <Icons.X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                 </button>

                 <div className="w-10 h-10 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-[10px] sm:rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.3)] mb-2 sm:mb-4">
                    <Icons.ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                 </div>
                 <h3 className="text-base sm:text-2xl font-bold text-white tracking-tight">Privasi & Keamanan</h3>
                 <p className="hidden sm:block text-[11px] sm:text-sm text-slate-400 mt-1 sm:mt-2 font-medium">100% Aman. Nol Data di Server.</p>
              </div>

              <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-5 bg-white/[0.02]">
                 
                 <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-emerald-400 font-bold text-[9px] sm:text-xs mt-0.5">1</div>
                    <div>
                       <h4 className="text-white text-[12px] sm:text-[14px] font-bold">Pemrosesan Lokal</h4>
                       <p className="text-slate-400 text-[10px] sm:text-[12px] leading-snug sm:leading-relaxed mt-0.5 sm:mt-1">Berjalan murni di dalam perangkat Anda sendiri.</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-emerald-400 font-bold text-[9px] sm:text-xs mt-0.5">2</div>
                    <div>
                       <h4 className="text-white text-[12px] sm:text-[14px] font-bold">Tanpa Database Cloud</h4>
                       <p className="text-slate-400 text-[10px] sm:text-[12px] leading-snug sm:leading-relaxed mt-0.5 sm:mt-1">Data sensitif Anda tidak pernah terbang ke internet.</p>
                    </div>
                 </div>

                 <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-emerald-400 font-bold text-[9px] sm:text-xs mt-0.5">3</div>
                    <div>
                       <h4 className="text-white text-[12px] sm:text-[14px] font-bold">Penyimpanan Cache</h4>
                       <p className="text-slate-400 text-[10px] sm:text-[12px] leading-snug sm:leading-relaxed mt-0.5 sm:mt-1">Hanya dititipkan di browser Anda, dan bisa dihapus kapan saja.</p>
                    </div>
                 </div>

              </div>

              <div className="p-3 sm:p-5 border-t border-white/5 bg-[#050505]/50 shrink-0">
                 <button onClick={() => setIsSecurityModalOpen(false)} className="w-full py-2 sm:py-3 bg-white text-black text-[11px] sm:text-sm font-bold rounded-lg sm:rounded-xl hover:bg-slate-200 transition-colors active:scale-95">
                    Saya Mengerti
                 </button>
              </div>
           </div>
        </div>
      )}

      {showTutorial && <GuidedTour onComplete={handleCompleteTutorial} />}

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        
        /* EFEK ANIMASI RGB COLOR THEORY TRIAD Yg Aesthetic (Cyan -> Pink -> Yellow) */
        .text-rgb-animated {
          background: linear-gradient(
            to right, 
            #00c6ff, /* Cyan */
            #f093fb, /* Light Pink */
            #eab308, /* Yellow */
            #00c6ff  /* Cyan (loop back) */
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: rgbFlow 4s linear infinite;
        }
        @keyframes rgbFlow {
          to { background-position: -200% center; }
        }
        
        /* ========================================================= */
        /* ANIMASI KURSOR HUD "GAMING" UNTUK PANDUAN / TOUR GUIDE    */
        /* ========================================================= */
        @keyframes hudClick {
          0% { transform: translate(10px, 10px) scale(1); }
          50% { transform: translate(-2px, -2px) scale(0.9); }
          100% { transform: translate(10px, 10px) scale(1); }
        }
        .animate-hud-click {
          animation: hudClick 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-pulse-fast {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* 14 ANIMASI HOVER UNIK */
        .hover-pulse-soft { animation: pulseSoft 1.5s infinite; }
        @keyframes pulseSoft { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        .hover-float { animation: float 2s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        .hover-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
        @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        .group:hover .hover-draw { transform: rotate(-10deg) translate(2px, -2px) scale(1.1); }
        .group:hover .hover-expand { transform: scaleX(1.15) scaleY(0.9); }
        .group:hover .hover-slide-up { transform: translateY(-5px); }
        .group:hover .hover-unlock { transform: rotate(25deg) scale(1.1); }
        .group:hover .hover-flip { transform: perspective(400px) rotateY(25deg); }
        .group:hover .hover-split { transform: skewX(-10deg) translateX(4px); }
        .hover-rainbow { animation: rainbow 3s linear infinite; }
        @keyframes rainbow { 0% { filter: hue-rotate(0deg) saturate(1.5); } 100% { filter: hue-rotate(360deg) saturate(1.5); } }
        .hover-typewriter { animation: typewriter 0.3s infinite; }
        @keyframes typewriter { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
        .hover-connect { animation: connectPulse 1s infinite; }
        @keyframes connectPulse { 0% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.15); filter: brightness(1.4); } 100% { transform: scale(1); filter: brightness(1); } }
        .hover-spin-slow { animation: spinSlow 4s linear infinite; }
        @keyframes spinSlow { 100% { transform: rotate(360deg); } }
        .hover-badge-swing { transform-origin: top center; animation: swing 1.5s ease-in-out infinite; }
        @keyframes swing { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }

        /* 14 ANIMASI KLIK MUTLAK */
        .click-paper-fly { animation: paperFly 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards !important; }
        @keyframes paperFly { 0% { transform: translateY(0) scale(1); opacity: 1; } 50% { transform: translateY(-20px) scale(1.1) rotate(5deg); opacity: 0.8; } 100% { transform: translateY(-100px) scale(0.5) rotate(15deg); opacity: 0; } }
        .click-layer-pop { animation: layerPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important; }
        @keyframes layerPop { 0% { transform: scale(1); } 40% { transform: scale(1.4); filter: brightness(1.5); } 100% { transform: scale(0); opacity: 0; } }
        .click-send-msg { animation: sendMsg 0.6s ease-in forwards !important; }
        @keyframes sendMsg { 0% { transform: translateX(0); opacity: 1; } 30% { transform: translateX(-10px); } 100% { transform: translateX(100px); opacity: 0; } }
        .click-color-splash { animation: colorSplash 0.6s ease-out forwards !important; }
        @keyframes colorSplash { 0% { transform: scale(1); } 50% { transform: scale(1.5); filter: drop-shadow(0 0 10px pink) drop-shadow(0 0 20px cyan); } 100% { transform: scale(3); opacity: 0; } }
        .click-sign-done { animation: signDone 0.6s ease-in-out forwards !important; }
        @keyframes signDone { 0% { transform: translateX(0) skewX(0); } 100% { transform: translateX(50px) skewX(-30deg); opacity: 0; } }
        .click-slice-apart { animation: sliceApart 0.6s ease-out forwards !important; }
        @keyframes sliceApart { 0% { transform: scaleY(1); } 50% { transform: scaleY(1.2); } 100% { transform: scaleY(0); opacity: 0; } }
        .click-receipt-print { animation: receiptPrint 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards !important; }
        @keyframes receiptPrint { 0% { transform: translateY(0); clip-path: inset(0 0 0 0); } 40% { transform: translateY(10px); } 100% { transform: translateY(80px); opacity: 0; clip-path: inset(100% 0 0 0); } }
        .click-spiral-in { animation: spiralIn 0.6s ease-in forwards !important; }
        @keyframes spiralIn { 0% { transform: scale(1) rotate(0deg); } 100% { transform: scale(0) rotate(360deg); opacity: 0; } }
        .click-stamp-approve { animation: stampApprove 0.5s ease-out forwards !important; }
        @keyframes stampApprove { 0% { transform: scale(1); } 30% { transform: scale(2); opacity: 0.5; } 100% { transform: scale(0.9); opacity: 0; } }
        .click-compress-poof { animation: compressPoof 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important; }
        @keyframes compressPoof { 0% { transform: scale(1); } 10% { transform: scale(1.1); } 100% { transform: scale(0); opacity: 0; } }
        .click-text-grow { animation: textGrow 0.6s ease-out forwards !important; }
        @keyframes textGrow { 0% { transform: scale(1); } 100% { transform: scale(5); opacity: 0; } }
        .click-node-branch { animation: nodeBranch 0.6s ease-out forwards !important; }
        @keyframes nodeBranch { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(40px, -40px) scale(0); opacity: 0; } }
        .click-page-turn { animation: pageTurn 0.6s ease-in forwards !important; transform-style: preserve-3d; }
        @keyframes pageTurn { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(-180deg); opacity: 0; } }
        .click-key-turn { animation: keyTurn 0.6s ease-in-out forwards !important; }
        @keyframes keyTurn { 0% { transform: rotate(0deg); } 50% { transform: rotate(90deg); } 100% { transform: rotate(90deg) scale(0); opacity: 0; } }
      `}} />
    </div>
  );
}