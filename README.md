<div align="center" style="padding: 20px 0;">
  <img src="https://img.shields.io/badge/NEXT.JS-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TAILWIND_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <br><br>

  <h1 style="color: #0284c7;">Repositori Resmi & Portofolio Digital Saya</h1>
  <h2>Muhammad Rafli Ramadhan (MRR)</h2>
  <p><b>Graphic Designer & Founder Komunitas AquaNime</b></p>
  <p>🌍 <b>Domain Utama:</b> <a href="https://mrr.my.id" style="color: #0284c7; text-decoration: none;">mrr.my.id</a></p>
  <p><i>Meskipun saya murni seorang desainer dan nggak bisa koding, saya berhasil menyusun source code website portofolio canggih ini dengan sistem update "Drag & Play" (Tanpa Koding).</i></p>
  <hr>
</div>

<h2 style="color: #0284c7;">🎯 Senjata & Keahlian Saya (Tools)</h2>
<p>Sebagai desainer serba bisa, saya terbiasa mengeksekusi ide visual dan mengurus dokumen administratif menggunakan software standar industri berikut:</p>

<div style="padding: 10px 0;">
  <p><b>🎨 Creative & Design Tools:</b></p>
  <img src="https://img.shields.io/badge/Adobe%20Illustrator-%23FF9A00.svg?style=for-the-badge&logo=adobe%20illustrator&logoColor=white" alt="Adobe Illustrator">
  <img src="https://img.shields.io/badge/Adobe%20Photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white" alt="Adobe Photoshop">
  <img src="https://img.shields.io/badge/Adobe%20InDesign-%23FF3366.svg?style=for-the-badge&logo=adobe%20indesign&logoColor=white" alt="Adobe InDesign">
  <img src="https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white" alt="Canva">
</div>

<div style="padding: 10px 0;">
  <p><b>📄 Office & Productivity Tools:</b></p>
  <img src="https://img.shields.io/badge/Microsoft%20Word-2B579A?style=for-the-badge&logo=microsoft%20word&logoColor=white" alt="Microsoft Word">
  <img src="https://img.shields.io/badge/Microsoft%20Excel-217346?style=for-the-badge&logo=microsoft%20excel&logoColor=white" alt="Microsoft Excel">
  <img src="https://img.shields.io/badge/Google%20Docs-4285F4?style=for-the-badge&logo=google%20docs&logoColor=white" alt="Google Docs">
  <img src="https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=google%20sheets&logoColor=white" alt="Google Sheets">
</div>
<br>

<h2 style="color: #0284c7;">🏗️ 1. Struktur Website & Folder</h2>
<p>Website ini saya bangun memakai <b>Next.js App Router</b>. Kodingannya sengaja saya pisah antara bagian tampilan UI dan bagian data. Jadi, karena saya memang awam soal pemograman, kalau ke depannya mau nambahin project desain, saya nggak perlu takut bikin kodingan utamanya error.</p>

<pre style="background-color: #0f172a; color: #e2e8f0; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.6;">
📁 CV-MRR/ (Direktori Utama Saya)
│
├── 📁 public/                     [TEMPAT SAYA NARUH FOTO]
│   ├── 📁 projects/               ├─ Folder foto high-res tiap karya desain saya
│   ├── 📁 certificates/           ├─ Folder scan sertifikat & penghargaan saya
│   ├── 📁 brands/                 ├─ Folder logo klien/brand yang pernah kerja bareng
│   ├── 🖼️ profile.jpg             ├─ Foto profil saya
│   └── ⚙️ sitemap.xml             └─ Peta web biar gampang dicari di Google
│
├── 📁 src/
│   ├── 📁 data/                   [PUSAT UPDATE KONTEN]
│   │   └── 📄 store.js            └─ ⚠️ TEMPAT SAYA NGEDIT TEKS & NAMBAH DESAIN BARU
│   │
│   ├── 📁 components/             [POTONGAN TAMPILAN]
│   │   ├── 🧩 Navbar.jsx          ├─ Menu atas
│   │   └── 🧩 Footer.jsx          └─ Bagian bawah (Sosmed dll)
│   │
│   └── 📁 app/                    [HALAMAN WEBSITE SAYA]
│       ├── 📄 layout.jsx          ├─ Pengaturan dasar web (Font, Header, Footer)
│       ├── 📄 page.jsx            ├─ (/) Halaman paling depan (Beranda)
│       ├── 📁 about/              ├─ (/about) Halaman CV dan Profil saya
│       ├── 📁 projects/           ├─ (/projects) Galeri lengkap hasil desain saya
│       ├── 📁 projects/[slug]/    ├─ (/projects/detail) Halaman detail pas desain diklik
│       └── 📁 aquanime/           └─ (/aquanime) Direct link ke ekosistem AquaNime
</pre>

<br>

<h2 style="color: #0284c7;">📝 2. Sistem Update Simpel (Buku Panduan store.js)</h2>
<p>Sebagai desainer yang nggak ngerti bahasa mesin, saya merancang sistem ini murni menjadi <b>"Drag & Play"</b>. Untuk mengubah seluruh isi teks dan foto di website, saya cuma butuh mengedit file <b><code>src/data/store.js</code></b>.</p>

<p><b>Tutorial Lengkap Cara Saya Mengubah <code>store.js</code>:</b></p>
<ol style="line-height: 1.8;">
  <li>Buka file <code>src/data/store.js</code> di aplikasi/web GitHub, klik tombol <b>Edit (ikon pensil)</b>.</li>
  <li>Di dalamnya, ada kerangka data seperti ini:<br>
<pre style="background-color: #1e293b; color: #a5b4fc; padding: 15px; border-radius: 6px; margin: 10px 0;">
export const PROJECT_LIST = [
  {
    id: "logo-best",
    title: "Konstruksi Logo BEST",  // 👈 SAYA CUMA GANTI TEKS DI DALAM KUTIPAN INI
    category: "Branding",
    description: "Penjelasan lengkap tentang desain ini...",
    images: ["/projects/logo-best/1.jpg", "/projects/logo-best/2.jpg"] // 👈 Sesuaikan nama foto
  }
];
</pre>
  </li>
  <li>Aturan mainnya: <b>Saya dilarang menghapus tanda kurung kurawal <code>{}</code> atau tanda kutip <code>""</code></b>. Saya murni hanya mengganti teks hurufnya saja.</li>
  <li>Kalau mau nambah karya baru, saya tinggal <i>copy-paste</i> satu blok dari <code>{</code> sampai <code>}</code>, lalu ganti isi teks dan nama fotonya. Persis kayak ngisi formulir biodata!</li>
</ol>

<table style="width: 100%; border-collapse: collapse; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 15px;">
  <tr style="background-color: #0284c7; color: white;">
    <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Apa yang mau saya update?</th>
    <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Gantinya di file <code>store.js</code></th>
    <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Fotonya ditaruh di mana?</th>
  </tr>
  <tr style="background-color: #f8fafc;">
    <td style="padding: 12px; border: 1px solid #ddd;"><b>Nambah Desain Baru</b></td>
    <td style="padding: 12px; border: 1px solid #ddd;">Tambah Array di <code>PROJECT_LIST</code></td>
    <td style="padding: 12px; border: 1px solid #ddd;"><code>public/projects/[nama]/</code></td>
  </tr>
  <tr style="background-color: #ffffff;">
    <td style="padding: 12px; border: 1px solid #ddd;"><b>Nambah Pengalaman Kerja</b></td>
    <td style="padding: 12px; border: 1px solid #ddd;">Tambah Baris di <code>WORK_EXPERIENCE</code></td>
    <td style="padding: 12px; border: 1px solid #ddd;"><i>(Otomatis jadi tulisan)</i></td>
  </tr>
  <tr style="background-color: #f8fafc;">
    <td style="padding: 12px; border: 1px solid #ddd;"><b>Nambah Sertifikat</b></td>
    <td style="padding: 12px; border: 1px solid #ddd;">Tambah Data di <code>CERTIFICATES</code></td>
    <td style="padding: 12px; border: 1px solid #ddd;"><code>public/certificates/</code></td>
  </tr>
</table>

<br>

<h2 style="color: #0284c7;">🚀 3. Eksekusi End-to-End (Cara Saya Update Web dari HP)</h2>
<p>Karena web ini terhubung otomatis ke Vercel, langkah saya kalau mau nge-<i>publish</i> desain baru gampang banget (walau nggak punya aplikasi koding di HP):</p>
<ul style="line-height: 1.8;">
  <li><b>Langkah 1 (Upload Visual):</b> Buka GitHub di HP > masuk ke folder <code>public/projects/</code> > klik <i>Add file/Upload</i> > masukin foto desain saya.</li>
  <li><b>Langkah 2 (Isi Formulir):</b> Buka folder <code>src/data/</code> > edit file <code>store.js</code> > ketik judul desain dan deskripsinya.</li>
  <li><b>Langkah 3 (Simpan & Tayang):</b> Scroll ke bawah, klik tombol hijau <b>Commit Changes</b>. </li>
  <li><b>Langkah 4 (Selesai!):</b> Saya tinggal nunggu 1 menit. Vercel bakal otomatis narik data dari GitHub saya dan web <a href="https://mrr.my.id" style="color: #0284c7;">mrr.my.id</a> bakal langsung berubah. Nggak perlu ribet!</li>
</ul>

<br>

<h2 style="color: #0284c7;">🖼️ 4. Tampilan Detail Karya (Anti Slider)</h2>
<p>Sebagai desainer grafis, saya kurang suka melihat portofolio yang pakai fitur <i>slider</i> karena bikin detail karya susah dilihat utuh. Makanya, web ini saya rancang biar merender foto desain secara vertikal memanjang (seperti format presentasi di Behance). Kalau 1 project punya 5 konsep:</p>
<ol style="line-height: 1.8;">
  <li>Bikin folder baru, contoh: <code>public/projects/kemasan-kopi/</code>.</li>
  <li>Masukin semua fotonya ke situ (namain aja <code>1.jpg</code>, <code>2.jpg</code>, dst).</li>
  <li>Daftarin fotonya di <code>store.js</code>, dan web otomatis nyusun fotonya ke bawah dengan rapi, lengkap dengan cerita proses kreatifnya.</li>
</ol>

<br>

<h2 style="color: #0284c7;">🌐 5. Daftar Halaman & Transisi (Multipage SPA)</h2>
<p>Meski ini website <i>multipage</i>, tapi saat pengunjung mengklik menu, <b>website tidak akan loading melainkan transisi super mulus layaknya sebuah aplikasi handphone (Single Page Application/SPA)</b> berkat bantuan teknologi Next.js. Berikut daftarnya:</p>
<ul style="line-height: 1.8;">
  <li><b>🏠 Beranda (<code>/</code>):</b> Halaman sapaan awal, ringkasan <i>skill</i> desain saya, dan cuplikan sedikit karya terbaik.</li>
  <li><b>💼 Portofolio (<code>/projects</code>):</b> Galeri lengkap semua karya yang siap dipamerin ke klien dan manajer HRD.</li>
  <li><b>🔍 Detail Proyek (<code>/projects/[nama]</code>):</b> Halaman khusus pas project-nya diklik. Isinya <i>problem solving</i> dari masalah klien sampai jadi visual akhir.</li>
  <li><b>👤 Tentang Saya (<code>/about</code>):</b> Timeline pengalaman, brand yang pernah saya bantu, dan pameran sertifikat sah.</li>
  <li><b>💧 Jembatan AquaNime (<code>/aquanime</code>):</b> Ini adalah <i>direct link</i> atau jalan pintas yang langsung mengalihkan pengunjung ke ekosistem komunitas AquaNime yang saya bangun. Nanti AquaNime bakal punya rumah website (domain) tersendiri.</li>
</ul>

<br>

<h2 style="color: #0284c7;">🔒 6. Keamanan & Performa Web</h2>
<ul style="line-height: 1.8;">
  <li><b>Aman dari Hacker:</b> Karena web ini sifatnya statis (tanpa database ribet SQL), web saya 100% aman dari orang iseng atau <i>hacker</i>.</li>
  <li><b>Gembok Hijau:</b> Jalur datanya udah otomatis dikunci pakai HTTPS dari server Vercel.</li>
  <li><b>Ramah Google:</b> Udah dilengkapi Meta Tag, <code>robots.txt</code>, dan sitemap supaya web portofolio ini (<a href="https://mrr.my.id" style="color: #0284c7;">mrr.my.id</a>) gampang dicari lewat pencarian Google.</li>
</ul>

<hr>
<p align="center" style="color: #64748b; font-size: 14px;">
  <i>Dirancang & Dikembangkan dengan bangga oleh Muhammad Rafli Ramadhan © 2026. All Rights Reserved.</i>
</p>