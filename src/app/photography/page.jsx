"use client";

import Link from 'next/link';

// =========================================================================
// IKON SVG PROFESIONAL
// =========================================================================
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.46 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

// Data Foto Placeholder (Silakan ganti URL-nya dengan link foto karya aslimu)
const PHOTO_GALLERY = [
  { id: 1, url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop", title: "Urban Exploration" },
  { id: 2, url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop", title: "Nature's Whisper" },
  { id: 3, url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop", title: "Night Lights" },
  { id: 4, url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop", title: "Mountain Peak" },
  { id: 5, url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop", title: "Forest Path" },
  { id: 6, url: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?q=80&w=800&auto=format&fit=crop", title: "Cityscapes" },
];

export default function PhotographyPage() {
  return (
    // FIX OVERFLOW ABSOLUTE: Layar HP aman dari kebocoran
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 relative w-full overflow-x-hidden bg-[#030712]">
      
      {/* ========================================================= */}
      {/* BACKGROUND DECOR 100% SINKRON DENGAN BERANDA              */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[5%] left-[-10%] w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-cyan-600/10 rounded-full blur-[100px] lg:blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-indigo-600/10 rounded-full blur-[100px] lg:blur-[140px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full">
        
        {/* ========================================================= */}
        {/* HEADER SECTION (GOLDEN RATIO 61.8 : 38.2)                 */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20 lg:mb-28 items-start">
          
          {/* KIRI (61.8%): Konten Narasi */}
          <div className="w-full lg:w-[61.8%] reveal stagger-1 pr-0 lg:pr-8 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-6 sm:mb-8 shadow-md">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-500 animate-pulse shrink-0"></span>
              Hobi & Eksplorasi Visual
            </div>
            
            {/* TEMA FONT: Gradient Hit menyamakan halaman depan */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tighter mb-6 sm:mb-8 leading-[1.1] drop-shadow-lg text-white">
              Bercerita Melalui <br className="hidden sm:block lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600">
                Lensa & Cahaya.
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed sm:leading-loose font-medium max-w-2xl mx-auto lg:mx-0">
              Selain merancang identitas visual di atas kanvas digital, saya mengeksplorasi dunia melalui lensa kamera. Ini adalah galeri hobi fotografi saya yang menangkap momen, emosi, dan cerita di balik setiap sudut kota.
            </p>
          </div>

          {/* KANAN (38.2%): Kartu Profil Instagram Eksklusif */}
          <div className="w-full lg:w-[38.2%] reveal stagger-2 mt-4 lg:mt-0">
            <div className="bg-gradient-to-br from-[#0A1329]/90 to-[#050A14]/90 backdrop-blur-xl border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
              
              {/* Efek Cahaya Dalam */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[40px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                {/* Foto Profil IG */}
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 mb-4 shadow-[0_0_20px_rgba(236,72,153,0.3)] group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full border-[3px] border-[#0A1329] overflow-hidden bg-[#030712]">
                    <img 
                      src="/profile.jpg" 
                      alt="Instagram Profile" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop'; }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Rafli Ramadhan</h3>
                <p className="text-sm font-medium text-slate-400 mb-6">@img_ischeznut.jpg</p>

                {/* Statistik IG */}
                <div className="flex items-center justify-center gap-6 sm:gap-8 w-full border-t border-b border-white/5 py-5 mb-8">
                  <div>
                    <p className="text-lg sm:text-xl font-black text-white">73</p>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Posts</p>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div>
                    <p className="text-lg sm:text-xl font-black text-white">588</p>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Followers</p>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div>
                    <p className="text-lg sm:text-xl font-black text-white">681</p>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Following</p>
                  </div>
                </div>

                {/* Tombol Follow/Visit */}
                <a 
                  href="https://instagram.com/img_ischeznut.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2 group/btn hover:-translate-y-1"
                >
                  <InstagramIcon />
                  Kunjungi Jurnal Visual
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MASONRY GALLERY GRID (Elegan & Profesional)               */}
        {/* ========================================================= */}
        <div className="reveal stagger-3">
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl shrink-0">
              <CameraIcon />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Koleksi <span className="text-cyan-500">Terbaru</span></h2>
            </div>
          </div>

          {/* Masonry Layout Menggunakan CSS Columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
            {PHOTO_GALLERY.map((photo, index) => {
              // Menambahkan efek tinggi gambar yang bervariasi (mensimulasikan masonry asli)
              const isTall = index % 2 === 0;
              
              return (
                <div 
                  key={photo.id} 
                  className="relative group rounded-3xl overflow-hidden bg-[#050A14] border border-white/5 shadow-xl hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] break-inside-avoid transition-all duration-500"
                >
                  <div className={`relative w-full ${isTall ? 'aspect-[3/4]' : 'aspect-square'} overflow-hidden`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 grayscale hover:grayscale-0"
                    />
                    {/* Overlay Hitam Halus Saat Di-Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    {/* Teks Muncul Saat Hover */}
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-between">
                      <p className="text-white font-bold tracking-wide">{photo.title}</p>
                      <a href="https://instagram.com/img_ischeznut.jpg" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors">
                        <ExternalLinkIcon />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="https://instagram.com/img_ischeznut.jpg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0A1329] border border-white/10 text-sm font-bold text-slate-300 hover:text-white hover:border-cyan-500/30 shadow-lg transition-all duration-300 group"
            >
              <InstagramIcon />
              Lihat Lebih Banyak di Instagram
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}