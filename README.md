<div align="center">
<h1>🌊 Blueprint Website: Muhammad Rafli Ramadhan</h1>
<p><b>Panduan Lengkap Arsitektur Multipage Portfolio & AquaNime Hub</b></p>
</div>
​🏗️ 1. Hierarki Struktur Folder (Tree View)
​Website ini menggunakan arsitektur Next.js App Router. Struktur dibuat sedemikian rupa agar memisahkan antara "Mesin Tampilan" dan "Pusat Data", sehingga update bisa dilakukan tanpa mengotak-atik kode UI.

CV-MRR/ (Folder Utama)
│
├── public/                     📂 TEMPAT PENYIMPANAN FOTO & GAMBAR
│   ├── projects/               ├─ Folder untuk foto karya (misal: /best-logo/1.jpg)
│   ├── certificates/           ├─ Folder untuk scan sertifikat penghargaan
│   ├── brands/                 ├─ Folder untuk logo klien yang pernah kerja sama
│   ├── profile.jpg             ├─ Foto profil utama
│   ├── robots.txt              ├─ Akses mesin pencari Google
│   └── sitemap.xml             └─ Peta situs untuk SEO Google
│
├── src/
│   ├── data/                   📂 PUSAT UPDATE KONTEN (Tanpa Koding)
│   │   └── store.js            └─ ⚠️ EDIT FILE INI UNTUK UPDATE WEB (Drag & Play)
│   │
│   ├── components/             📂 POTONGAN PUZZLE UI (Jangan diubah)
│   │   ├── Navbar.jsx          ├─ Menu Navigasi Atas
│   │   ├── Footer.jsx          ├─ Bagian Bawah Web (Sosmed & Logo Brand)
│   │   └── ProjectCard.jsx     └─ Kotak Tampilan Tiap Proyek
│   │
│   └── app/                    📂 HALAMAN WEBSITE (Routing)
│       ├── layout.jsx          ├─ Induk Halaman (Pengatur Font, Header, Footer)
│       ├── page.jsx            ├─ Halaman 1: Beranda Utama (Home)
│       ├── globals.css         ├─ Pewarnaan (Tailwind CSS)
│       │
│       ├── about/              
│       │   └── page.jsx        ├─ Halaman 2: CV Lengkap, Keahlian & Sertifikat
│       │
│       ├── projects/           
│       │   ├── page.jsx        ├─ Halaman 3: Galeri Seluruh Karya (Grid)
│       │   └── [slug]/         
│       │       └── page.jsx    ├─ Halaman 4: Detail Proyek (Klik untuk baca lengkap)
│       │
│       └── aquanime/           
│           └── page.jsx        ├─ Halaman 5: Jembatan Komunitas AquaNime
│
├── package.json                ⚙️ Mesin penggerak aplikasi
└── tailwind.config.js          ⚙️ Pengatur palet warna website


📝 2. Panduan Update Konten (Sistem "Drag & Play")
​Sistem website ini dirancang khusus agar Pemilik (Rafli) tidak perlu bisa koding untuk melakukan update.
​ATURAN UTAMA: Jangan mengubah file berakhiran .jsx jika tidak mengerti. Semua update teks, tambah proyek, atau tambah pengalaman kerja HANYA dilakukan di file src/data/store.js.

Apa yang mau di-update? Tempat Mengubah di store.js Lokasi Upload Foto
Tambah Proyek Desain Copy & Paste blok di PROJECT_LIST public/projects/nama-proyek/
Tambah Pengalaman Kerja Tambah baris di WORK_EXPERIENCE -
Tambah Sertifikat Baru Tambah data di array CERTIFICATES public/certificates/
Tambah Logo Klien/Brand Tambah nama file di BRAND_PARTNERS public/brands/
Update Info Komunitas Ubah angka di AQUANIME_STATS -

🖼️ 3. Manajemen Foto Proyek (1 Proyek = Banyak Konsep)
​Website ini mendukung fitur Case Study Detail. Jika satu desain (misal: Logo BEST) memiliki 5 variasi/konsep, ikuti cara ini:
​Buat folder baru di dalam public/projects/. (Misal: public/projects/logo-best/)
​Upload semua fotonya ke folder tersebut. (Beri nama yang rapi: 1.jpg, 2.jpg, 3.jpg).
​Buka file src/data/store.js, lalu di bagian data proyek tersebut, tulis array fotonya:
images: ["/projects/logo-best/1.jpg", "/projects/logo-best/2.jpg"]
​Halaman detail proyek (/projects/[slug]) akan otomatis menyusun foto-foto tersebut berderet ke bawah disertai penjelasan teks untuk meminimalisir fitur 'slide' yang membosankan.
​🌐 4. Detail Halaman (Multipage Architecture)
​🏠 A. Halaman Beranda (/)
​Fungsi: Sambutan cepat (First Impression).
​Isi: Nama, Role (Graphic Designer & Founder), tombol Download CV/WA, dan cuplikan 3-4 karya terbaik.
​💼 B. Halaman Portofolio (/projects)
​Fungsi: Etalase utama untuk HRD dan Klien.
​Isi: Menampilkan grid seluruh karya yang bisa di-filter. Setiap gambar bisa diklik untuk menuju ke Halaman Detail.
​🔍 C. Halaman Detail Karya (/projects/[nama-proyek])
​Fungsi: Menjelaskan cara berpikir seorang desainer (Problem Solving).
​Isi: Foto mockup besar, penjelasan "Masalah klien", "Solusi desain", dan deretan variasi konsep.
​👤 D. Halaman Profil & CV (/about)
​Fungsi: Validasi profesionalitas.
​Isi: Timeline pengalaman kerja, riwayat pendidikan, logo tools (Photoshop, AI, dll), deretan logo brand partner, dan Galeri Sertifikat yang bisa di- zoom.
​💧 E. Halaman Komunitas (/aquanime)
​Fungsi: Membangun otoritas sebagai Community Developer.
​Isi: Sejarah/Visi AquaNime, foto-foto kegiatan komunitas (Event Kumpul Wibu, dll), statistik jumlah member, dan tombol gabung (Discord/WA).
​🔒 5. Keamanan & Performa (Frontend Build)
​100% Static & Aman: Website ini tidak memiliki Database Backend atau sistem login user. Oleh karena itu, website ini kebal dari serangan hacker (SQL Injection, dll).
​SSL Certified: Seluruh jalur koneksi sudah diamankan dengan gembok HTTPS dari Vercel secara otomatis.
​SEO Optimized: Sudah dilengkapi robots.txt, sitemap.xml, dan Tag HTML Google Console agar cepat terindeks di mesin pencari.
​🚀 6. Rencana Pengembangan (Roadmap)
​Fitur-fitur yang akan ditambahkan secara bertahap:
​Pencarian Karya (Search Bar): Memudahkan klien mencari jenis desain tertentu (misal ketik: "Pamflet").
​AI Assistant Chat: Mengintegrasikan AI sederhana di pojok layar yang bisa menjawab pertanyaan klien soal harga atau kesibukan Rafli berdasarkan data di store.js.