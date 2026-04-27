import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'

export const metadata = {
  title: 'MRR | Graphic Designer & Community Founder',
  description: 'Portofolio Profesional Muhammad Rafli Ramadhan (MRR). Spesialis Brand Identity, Packaging, dan Social Media Design.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'MRR',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport = {
  themeColor: '#000000',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-black text-white font-sans overflow-x-hidden relative min-h-screen flex flex-col touch-pan-y overscroll-none select-none antialiased [-webkit-tap-highlight-color:transparent]">

        <div className="fixed inset-0 bg-black pointer-events-none z-0"></div>

        <div className="hide-in-pwa relative z-50">
          <Navbar />
        </div>

        <main className="relative z-10 flex-grow pb-28 md:pb-0">
          {children}
        </main>

        <div className="hide-in-pwa relative z-10">
          <Footer />
        </div>

        <BottomNav />

      </body>
    </html>
  )
}
