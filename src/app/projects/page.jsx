export default function Projects() {
  return (
    <div className="py-16 px-5 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 border-b border-slate-700 pb-4 text-cyan-500">Galeri Portofolio</h1>
      <p className="text-slate-300 mb-10">
        Kumpulan mahakarya desain terbaik saya. (Sistem *update* gambar otomatis "Drag & Play" akan diaktifkan pada Fase 4).
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Kotak Dummy Project (Hanya Placeholder sementara) */}
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all cursor-pointer">
          <div className="h-48 bg-slate-700 flex items-center justify-center text-slate-400 font-medium">
            [ Foto Desain Akan Muncul Di Sini ]
          </div>
          <div className="p-5">
            <h3 className="font-bold text-lg text-white">Proyek Desain Logo</h3>
            <p className="text-sm text-cyan-500 mt-2">Klien: PT Bumi Eka Sukses</p>
          </div>
        </div>

      </div>
    </div>
  )
}
