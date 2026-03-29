import './globals.css'
import Navbar from '../components/Navbar' // <--- Kita panggil file menu yang baru dibuat

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
        <main className="relative z-10 pt-28 flex-grow">
          {children}
        </main>

        {/* FOOTER */}
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
