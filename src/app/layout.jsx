import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer' // <--- Panggil Footer baru di sini

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

// Konfigurasi warna tema browser (Wajib dipisah dari metadata di Next.js 14)
export const viewport = {
  themeColor: '#060D1F', // Menyesuaikan dengan warna background web kamu
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Menambahkan touch-pan-y agar layar HP tidak sengaja ke-zoom (Khas Aplikasi Native) */}
      <body className="bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative min-h-screen flex flex-col touch-pan-y antialiased">
        
        {/* Latar Belakang Clean Deep Cyber Space */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#060D1F] via-[#0D1836] to-[#060D1F] pointer-events-none z-0"></div>

        {/* Memanggil Menu Navigasi */}
        <Navbar />

        {/* KONTEN HALAMAN */}
        <main className="relative z-10 flex-grow">
          {children}
        </main>

        {/* FOOTER ELEGAN */}
        <Footer />

      </body>
    </html>
  )
}
