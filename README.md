<div align="center" style="padding: 20px 0;">
<img src="https://img.shields.io/badge/NEXT.JS-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/TAILWIND_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">



​<h1 style="color: #0284c7;">Repositori Resmi & Portofolio Digital Saya</h1>
<h2>Muhammad Rafli Ramadhan (MRR)</h2>
<p><b>Graphic Designer & Founder Komunitas AquaNime</b></p>
<p><i>Source code website portofolio pribadi saya yang dibikin dengan sistem update "Tanpa Koding".</i></p>
<hr>
</div>
​<h2 style="color: #0284c7;">🏗️ 1. Struktur Website & Folder</h2>
<p>Website ini saya bangun sendiri pakai <b>Next.js App Router</b>. Kodingannya sengaja saya pisah antara bagian tampilan (UI) dan bagian data. Jadi, kalau ke depannya saya mau nambahin project desain atau update CV, saya nggak perlu takut merusak kodingan utamanya.</p>
​<pre style="background-color: #0f172a; color: #e2e8f0; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.6;">
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
​<h2 style="color: #0284c7;">📝 2. Sistem Update Simpel (Tanpa Koding)</h2>
<p>Saya bikin website ini supaya gampang di-update tanpa bikin pusing. Jadi, saya nggak perlu ngedit file <code>.jsx</code> sama sekali. Kalau ada karya baru, cukup buka satu file andalan saya: <b><code>src/data/store.js</code></b>. Tinggal ketik-ketik di situ kayak ngisi formulir, website langsung otomatis berubah!</p>
​<table style="width: 100%; border-collapse: collapse; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
<tr style="background-color: #0284c7; color: white;">
<th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Apa yang mau di-update?</th>
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
​<h2 style="color: #0284c7;">🖼️ 3. Tampilan Detail Karya (Anti Slider)</h2>
<p>Sebagai desainer, saya jujur kurang suka fitur <i>slider</i> (geser-geser gambar) karena bikin detail karya susah dilihat. Makanya, saya rancang website ini supaya nampilin karya secara vertikal memanjang. Kalau 1 project saya punya 5 konsep:</p>
<ol style="line-height: 1.8;">
<li>Tinggal bikin folder baru, contoh: <code>public/projects/kemasan-kopi/</code>.</li>
<li>Masukin semua fotonya ke situ (namain aja <code>1.jpg</code>, <code>2.jpg</code>, dst).</li>
<li>Daftarin urutan fotonya di <code>store.js</code>, dan web bakal otomatis nyusun fotonya ke bawah dengan rapi, lengkap sama cerita desainnya.</li>
</ol>
​<h2 style="color: #0284c7;">🌐 4. Daftar Halaman (Multipage)</h2>
<ul style="line-height: 1.8;">
<li><b>🏠 Beranda (<code>/</code>):</b> Halaman sapaan awal, ringkasan siapa saya, dan nampilin sedikit mahakarya terbaik saya.</li>
<li><b>💼 Portofolio (<code>/projects</code>):</b> Galeri lengkap semua karya yang saya tata rapi. Siap buat dipamerin ke klien dan HRD.</li>
<li><b>🔍 Detail Proyek (<code>/projects/[nama]</code>):</b> Halaman khusus pas project-nya diklik. Isinya cerita masalah dari klien dan gimana saya bikin solusi visualnya.</li>
<li><b>👤 Tentang Saya (<code>/about</code>):</b> Timeline pengalaman kerja, brand yang pernah kolaborasi bareng saya, sampai pameran sertifikat.</li>
<li><b>💧 Jembatan AquaNime (<code>/aquanime</code>):</b> Karena ke depannya AquaNime bakal punya website sendiri, menu ini bakal berfungsi sebagai <i>direct link</i> atau jalan pintas yang langsung ngelempar pengunjung ke ekosistem komunitas saya.</li>
</ul>
​<h2 style="color: #0284c7;">🔒 5. Keamanan & Performa Web</h2>
<ul style="line-height: 1.8;">
<li><b>Aman dari Hacker:</b> Karena web ini sifatnya statis (tanpa database ribet), web saya 100% aman dari orang iseng atau <i>hacker</i>.</li>
<li><b>Gembok Hijau:</b> Jalur datanya udah otomatis dikunci pakai HTTPS dari server Vercel.</li>
<li><b>Ramah Google:</b> Udah saya lengkapi pakai Meta Tag, <code>robots.txt</code>, dan sitemap supaya namaku gampang nongkrong di halaman depan Google.</li>
</ul>
​<hr>
<p align="center" style="color: #64748b; font-size: 14px;">
<i>Dirancang & Dikembangkan dengan bangga oleh Muhammad Rafli Ramadhan © 2026. All Rights Reserved.</i>
</p>