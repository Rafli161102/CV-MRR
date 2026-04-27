import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* Efek Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#fffa00]/5 blur-[100px] -z-10 pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Teks 404 Glitch Style */}
        <h1 className="text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#1a1a1a] tracking-tighter drop-shadow-2xl">
          404
        </h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Kehilangan Arah Visual?
          </h2>
          <p className="text-[#888] max-w-md mx-auto">
            Halaman yang kamu cari mungkin telah dihapus, pindah URL, atau belum pernah diciptakan dalam dimensi ini.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#fffa00] hover:bg-[#fff500] text-black font-bold transition-all shadow-[0_0_20px_rgba(255,250,0,0.3)] hover:shadow-[0_0_40px_rgba(255,250,0,0.6)] hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
      
    </div>
  );
}