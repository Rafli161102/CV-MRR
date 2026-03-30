export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center w-full">
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Lingkaran Cahaya Berdenyut (Glow Effect) */}
        <div className="absolute w-32 h-32 bg-cyan-600/20 rounded-full blur-2xl animate-[pulse_2s_ease-in-out_infinite]"></div>
        
        {/* Teks Logo MRR Bergerak Halus */}
        <div className="relative z-10 flex items-center justify-center mb-6 animate-[bounce_2s_infinite]">
          <span className="text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            MRR<span className="text-cyan-500">.</span>
          </span>
        </div>

        {/* Indikator Teks */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-4 h-4 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-cyan-400 animate-pulse">
            Memuat Visual...
          </p>
        </div>

      </div>
    </div>
  );
}