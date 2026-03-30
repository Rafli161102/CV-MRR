import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer' // <--- Panggil Footer baru di sini

// Ini untuk optimasi SEO pencarian Google
export const metadata = {
  title: 'MRR | Graphic Designer & Community Founder',
  description: 'Portofolio Profesional Muhammad Rafli Ramadhan (MRR). Spesialis Brand Identity, Packaging, dan Social Media Design.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[#060D1F] text-slate-300 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative min-h-screen flex flex-col">
        
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