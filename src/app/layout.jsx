import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav' // <--- Panggil komponen Bottom Nav baru di sini

// Ini untuk optimasi SEO pencarian Google & Konfigurasi PWA
export const metadata = {
  title: 'MRR | Graphic Designer & Community Founder',
  description: 'Portofolio Profesional Muhammad Rafli Ramadhan (MRR). Spesialis Brand Identity, Packaging, dan Social Media Design.',
  manifest: '/manifest.json', // Memanggil file manifest untuk instalasi PWA
  appleWebApp: {
    capable: true,
    title: 'MRR',
    statusBarStyle: 'black-translucent',
  },
}

// Konfigurasi warna tema browser
export const viewport = {
  themeColor: '#060D1F',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Tambahan class touch-pan-y (matikan zoom), overscroll-none (anti seret halaman), 
          select-none (anti blok teks), [-webkit-tap-highlight-color:transparent] (anti kotak biru saat diklik)
          agar rasa aplikasi Native yang kuat */}
      <body className="bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative min-h-screen flex flex-col touch-pan-y overscroll-none select-none antialiased [-webkit-tap-highlight-color:transparent]">
        
        {/* Latar Belakang Clean Deep Cyber Space */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#060D1F] via-[#0D1836] to-[#060D1F] pointer-events-none z-0"></div>

        {/* MANTRA GAIB: Sembunyikan Navbar Atas Portofolio kalau dibuka di Mode Aplikasi (PWA) */}
        <div className="hide-in-pwa relative z-50">
          <Navbar />
        </div>

        {/* KONTEN HALAMAN (Kita beri padding bawah pb-28 agar konten tidak tertutup BottomNav menonjol) */}
        <main className="relative z-10 flex-grow pb-28 md:pb-0">
          {children}
        </main>

        {/* MANTRA GAIB: Sembunyikan Footer Besar Portofolio kalau dibuka di Mode Aplikasi (PWA) */}
        <div className="hide-in-pwa relative z-10">
          <Footer />
        </div>

        {/* MANTRA GAIB: Munculkan BottomNav estetik dan menonjol INI HANYA saat dibuka di Mode Aplikasi (PWA) */}
        <BottomNav />

      </body>
    </html>
  )
}
