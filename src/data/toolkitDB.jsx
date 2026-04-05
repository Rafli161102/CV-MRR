// DATABASE DAFTAR TOOLKIT / MICRO-SAAS (MRR ECOSYSTEM)
// Semua data aplikasi gratis (aktif & coming soon) diatur dari file ini.

import React from 'react';

// ============================================================================
// KUMPULAN IKON SVG PREMIUM (Minimalist & Professional)
// ============================================================================
const Icons = {
  Document: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  Network: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
  Palette: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  Signature: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>,
  Grid: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  Receipt: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  Ratio: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>,
  Badge: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 10-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94-.19-1.28-.53l-.97-.97c-.34-.34-.53-.8-.53-1.28s.19-.94.53-1.28l8.47-8.47m0 0l2.5-2.5" /></svg>,
  Transform: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>,
  Typography: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>,
  Studio: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
};

// ============================================================================
// DATA MASTER TOOLKIT
// ============================================================================
export const toolkits = [
  // --- FASE 1: PONDASI UTAMA ---
  {
    id: "cv-maker",
    title: "ATS CV & Cover Letter",
    description: "Buat Curriculum Vitae dan Surat Lamaran Kerja standar mesin HRD (ATS Friendly) secara instan. Drag & Play, aman tanpa simpan data di server.",
    icon: <Icons.Document />, 
    link: "/cv-maker", 
    status: "active",
    category: "Career & Freelance",
    tags: ["ATS", "Resume", "Cover Letter"]
  },
  
  // --- CSS VISUAL STUDIO (The Monster) ---
  {
    id: 'css-studio',
    title: 'Dev Visual Studio',
    description: 'Laboratorium desain berbasis AI untuk membangun komponen UI, tipografi interaktif, dan pixel art secara instan tanpa koding manual.',
    icon: <Icons.Studio />,
    category: 'Design Utility',
    link: '/css-studio',
    status: "active",
    isNew: true,
    isPremium: true,
    badge: 'AI Hybrid',
    tags: ["AI", "CSS", "Design Engine"]
  },

  // --- FASE 2: QUICK WINS & KOMUNITAS ---
  {
    id: "wa-generator",
    title: "Premium WA & QR Link",
    description: "Buat tautan otomatis WhatsApp (wa.me) dan ubah menjadi desain QR Code resolusi tinggi siap cetak untuk keperluan poster atau event.",
    icon: <Icons.Network />,
    link: "/wa-generator",
    status: "coming_soon",
    category: "Community Tool",
    tags: ["WhatsApp", "QR Code", "Event"]
  },
  {
    id: "color-extractor",
    title: "Brand Color Extractor",
    description: "Unggah gambar referensi dan biarkan sistem kami mengekstrak 5 palet warna dominan beserta kode HEX secara real-time.",
    icon: <Icons.Palette />,
    link: "/color-extractor",
    status: "coming_soon",
    category: "Design Utility",
    tags: ["Color", "Branding", "UI/UX"]
  },

  // --- FASE 3: ALAT PERANG FREELANCER ---
  {
    id: "email-signature",
    title: "Email Signature Builder",
    description: "Rakit desain tanda tangan email HTML profesional yang elegan, lengkap dengan foto profil dan tautan portofolio.",
    icon: <Icons.Signature />,
    link: "/email-signature",
    status: "coming_soon",
    category: "Career & Freelance",
    tags: ["Email", "HTML", "Branding"]
  },
  {
    id: "ig-splitter",
    title: "Seamless IG Splitter",
    description: "Potong gambar panorama memanjang menjadi 2-10 kotak presisi untuk desain feed carousel Instagram yang menyambung sempurna.",
    icon: <Icons.Grid />,
    link: "/ig-splitter",
    status: "coming_soon",
    category: "Design Utility",
    tags: ["Instagram", "Social Media", "Crop"]
  },
  {
    id: "freelance-invoice",
    title: "Freelance Rate & Invoice",
    description: "Kalkulator pintar untuk menentukan harga per-jam, sekaligus generator dokumen Invoice (Tagihan) PDF untuk dikirim ke klien.",
    icon: <Icons.Receipt />,
    link: "/toolkit/freelance-invoice", // Perbaikan link agar sesuai struktur
    status: "active",
    category: "Career & Freelance",
    tags: ["Invoice", "Pricing", "PDF"]
  },

  // --- FASE 4: TANTANGAN TEKNIS (UI/UX) ---
  {
    id: "golden-ratio",
    title: "Golden Ratio Calculator",
    description: "Masukkan dimensi awal, dan dapatkan pembagian proporsi matematis (1:1.618) untuk merancang layout website atau logo yang sempurna.",
    icon: <Icons.Ratio />,
    link: "/golden-ratio",
    status: "coming_soon",
    category: "Design Utility",
    tags: ["Layout", "Math", "Proportion"]
  },
  {
    id: "event-ticket",
    title: "Event Badge Generator",
    description: "Masukkan daftar nama peserta dan render otomatis menjadi desain Name Badge (ID Card) atau Tiket siap cetak untuk event AquaNime.",
    icon: <Icons.Badge />,
    link: "/event-ticket",
    status: "coming_soon",
    category: "Community Tool",
    tags: ["Print", "ID Card", "Management"]
  },

  // --- BONUS: EXTRA TOOLS ---
  {
    id: "image-converter",
    title: "Fast Image to WebP",
    description: "Kompres dan ubah format gambar (JPG/PNG) menjadi WebP generasi terbaru langsung di browser tanpa perlu upload ke server.",
    icon: <Icons.Transform />,
    link: "/image-converter",
    status: "coming_soon",
    category: "Web Developer",
    tags: ["Converter", "WebP", "Optimization"]
  },
  {
    id: "type-scale",
    title: "Typographic Scale",
    description: "Tentukan satu ukuran font dasar, dan dapatkan hirarki ukuran font (H1, H2, Paragraf) yang harmonis secara visual.",
    icon: <Icons.Typography />,
    link: "/type-scale",
    status: "coming_soon",
    category: "Design Utility",
    tags: ["Typography", "Font", "Hierarchy"]
  }
];
