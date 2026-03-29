import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Rafli Ramadhan | Portofolio',
  description: 'Graphic Designer & Founder AquaNime',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-slate-900 text-slate-100 font-sans">
        
        {/* NAVBAR (Menu Atas) */}
        <nav className="p-5 flex justify-between items-center bg-slate-900/90 backdrop-blur-md sticky top-0 border-b border-slate-800 z-50">
          <Link href="/" className="font-bold text-xl tracking-wider text-cyan-500">
            MRR.
          </Link>
          <div className="flex gap-5 font-medium text-sm">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
          </div>
        </nav>

        {/* KONTEN HALAMAN (Berubah-ubah saat menu diklik) */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* FOOTER (Bagian Bawah) */}
        <footer className="p-8 text-center border-t border-slate-800 text-slate-400 text-sm mt-10">
          <p>© 2026 Muhammad Rafli Ramadhan. All Rights Reserved.</p>
          <p className="mt-2 text-cyan-500">Graphic Designer | AquaNime Founder</p>
        </footer>

      </body>
    </html>
  )
}
