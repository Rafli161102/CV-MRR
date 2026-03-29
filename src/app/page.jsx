import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-5 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        Halo, Saya <br className="md:hidden" />
        <span className="text-cyan-500">Rafli Ramadhan</span>
      </h1>
      
      <p className="text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed">
        Seorang Graphic Designer yang berfokus pada solusi visual memukau, 
        sekaligus Founder dari komunitas kreatif AquaNime.
      </p>
      
      <div className="flex gap-4">
        <Link href="/projects" className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-cyan-500/30">
          Lihat Karya
        </Link>
        <Link href="/about" className="border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 px-8 py-3 rounded-full font-bold transition-all">
          Tentang Saya
        </Link>
      </div>
    </div>
  )
}
