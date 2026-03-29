import { PROJECT_LIST } from '../../data/store'

export default function Projects() {
  return (
    <div className="py-16 px-5 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 border-b border-slate-700 pb-4 text-cyan-500">Galeri Portofolio</h1>
      <p className="text-slate-300 mb-10">
        Kumpulan mahakarya desain terbaik saya. Di-update otomatis dari sistem <i>Drag & Play</i>.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Sistem Looping Otomatis (Membaca dari store.js) */}
        {PROJECT_LIST.map((project, index) => (
          <div key={index} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all cursor-pointer group shadow-lg">
            
            <div className="h-56 bg-slate-900 overflow-hidden relative border-b border-slate-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
                onError={(e) => { e.target.src = '[https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop)'; }} 
              />
            </div>
            
            <div className="p-5">
              <div className="text-[10px] font-bold text-cyan-500 mb-2 uppercase tracking-widest">{project.category}</div>
              <h3 className="font-bold text-xl text-white mb-1">{project.title}</h3>
              <p className="text-xs text-cyan-400 font-medium mb-3">{project.company}</p>
              <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">{project.description}</p>
            </div>
            
          </div>
        ))}

      </div>
    </div>
  )
}
