```html
<div align="center" style="padding: 20px 0;">
  <img src="https://img.shields.io/badge/NEXT.JS-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TAILWIND_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <br><br>

  <h1 style="color: #0284c7;">Arsitektur Digital & Repositori Resmi</h1>
  <h2>Muhammad Rafli Ramadhan (MRR)</h2>
  <p><b>Platform Portofolio Desain Grafis Interaktif & Pusat Komunitas AquaNime</b></p>
  <p><i>Sistem Website Multipage Berbasis Data-Driven dengan Fitur Update Tanpa Koding.</i></p>
  <hr>
</div>

<h2 style="color: #0284c7;">🏗️ 1. Topologi & Hierarki Sistem (Arsitektur Folder)</h2>
<p>Infrastruktur website ini dibangun menggunakan teknologi mutakhir <b>Next.js App Router</b>. Desain sistem memisahkan lapisan antarmuka (UI/Frontend) dengan lapisan data (Content/Backend). Hal ini memungkinkan pemilik website melakukan pembaruan konten berskala besar tanpa perlu menyentuh bahasa pemrograman dasar.</p>

<pre style="background-color: #0f172a; color: #e2e8f0; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.6;">
📁 CV-MRR/ (Direktori Utama)
│
├── 📁 public/                     [DATABASE ASET VISUAL]
│   ├── 📁 projects/               ├─ Folder aset resolusi tinggi tiap karya (misal: /logo-best/)
│   ├── 📁 certificates/           ├─ Direktori pindaian sertifikat & penghargaan
│   ├── 📁 brands/                 ├─ Direktori logo identitas mitra/klien
│   ├── 🖼️ profile.jpg             ├─ Potret profil profesional
│   └── ⚙️ sitemap.xml             └─ Peta indeks untuk optimasi Google Search
│
├── 📁 src/
│   ├── 📁 data/                   [PUSAT KENDALI KONTEN - DRAG & PLAY]
│   │   └── 📄 store.js            └─ ⚠️ UPDATE SELURUH TEKS & DATA PROYEK DI SINI
│   │
│   ├── 📁 components/             [MODUL ANTARMUKA] 
│   │   ├── 🧩 Navbar.jsx          ├─ Modul Navigasi Utama
│   │   └── 🧩 Footer.jsx          └─ Modul Kredensial & Tautan Bawah
│   │
│   └── 📁 app/                    [SISTEM ROUTING HALAMAN]
│       ├── 📄 layout.jsx          ├─ Konfigurasi Induk (Header, Footer, Metadata SEO)
│       ├── 📄 page.jsx            ├─ (/) Landing Page Utama
│       ├── 📁 about/              ├─ (/about) Eksebisi Profil & Curriculum Vitae
│       ├── 📁 projects/           ├─ (/projects) Galeri Portofolio Komprehensif
│       ├── 📁 projects/[slug]/    ├─ (/projects/detail) Generator Halaman Studi Kasus
│       └── 📁 aquanime/           └─ (/aquanime) Hub & Jembatan Komunitas AquaNime
</pre>

<br>

<h2 style="color: #0284c7;">📝 2. Panduan Sistem Manajemen Konten (CMS Tanpa Koding)</h2>
<p>Website ini mengadaptasi sistem <b>"Drag & Play"</b>. Anda tidak perlu mengedit file <code>.jsx</code>. Seluruh pembaruan narasi, penambahan proyek desain, hingga rekam jejak karir diatur secara terpusat melalui satu file: <b><code>src/data/store.js</code></b>.</p>

<table style="width: 100%; border-collapse: collapse; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <tr style="background-color: #0284c7; color: white;">
    <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Aktivitas Pembaruan</th>
    <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Modifikasi di File <code>store.js</code></th>
    <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Tujuan Upload Visual</th>
  </tr>
  <tr style="background-color: #f8fafc;">
    <td style="padding: 12px; border: 1px solid #ddd;"><b>Publikasi Karya Baru</b></td>
    <td style="padding: 12px; border: 1px solid #ddd;">Tambahkan Array di <code>PROJECT_LIST</code></td>
    <td style="padding: 12px; border: 1px solid #ddd;"><code>public/projects/[nama]/</code></td>
  </tr>
  <tr style="background-color: #ffffff;">
    <td style="padding: 12px; border: 1px solid #ddd;"><b>Update Histori Karir</b></td>
    <td style="padding: 12px; border: 1px solid #ddd;">Tambahkan Baris di <code>WORK_EXPERIENCE</code></td>
    <td style="padding: 12px; border: 1px solid #ddd;"><i>(Otomatis dirender)</i></td>
  </tr>
  <tr style="background-color: #f8fafc;">
    <td style="padding: 12px; border: 1px solid #ddd;"><b>Validasi Sertifikat</b></td>
    <td style="padding: 12px; border: 1px solid #ddd;">Tambahkan Data di <code>CERTIFICATES</code></td>
    <td style="padding: 12px; border: 1px solid #ddd;"><code>public/certificates/</code></td>
  </tr>
  <tr style="background-color: #ffffff;">
    <td style="padding: 12px; border: 1px solid #ddd;"><b>Pembaruan AquaNime</b></td>
    <td style="padding: 12px; border: 1px solid #ddd;">Ubah Variabel di <code>AQUANIME_STATS</code></td>
    <td style="padding: 12px; border: 1px solid #ddd;"><i>(Otomatis dirender)</i></td>
  </tr>
</table>

<br>

<h2 style="color: #0284c7;">🖼️ 3. Mekanisme Rendering Studi Kasus (Multi-Konsep Visual)</h2>
<p>Untuk menghindari penggunaan <i>slider</i> yang menyembunyikan detail karya, website ini dirancang untuk merender seluruh proses <i>Problem Solving</i> secara vertikal. Jika satu proyek memiliki 5 variasi desain:</p>
<ol style="line-height: 1.8;">
  <li>Buat direktori baru, contoh: <code>public/projects/kemasan-kopi/</code>.</li>
  <li>Unggah seluruh aset dengan penamaan terstruktur (misal: <code>konsep-1.jpg</code>, <code>konsep-2.jpg</code>).</li>
  <li>Deklarasikan array gambar di <code>store.js</code>. Sistem akan otomatis menyusunnya menjadi presentasi visual yang elegan dengan narasi di setiap halamannya.</li>
</ol>

<br>

<h2 style="color: #0284c7;">🌐 4. Pemetaan Rute Multipage & Fungsionalitas</h2>
<ul style="line-height: 1.8;">
  <li><b>🏠 Main Hub (<code>/</code>):</b> Menyajikan identitas eksklusif (Graphic Designer & Founder), rangkuman karir, serta cuplikan mahakarya tertinggi.</li>
  <li><b>💼 Portfolio Grid (<code>/projects</code>):</b> Galeri komprehensif seluruh karya yang terarsip rapi, dioptimalkan untuk inspeksi HRD dan Klien.</li>
  <li><b>🔍 Deep Dive Project (<code>/projects/[nama]</code>):</b> Halaman dinamis yang menyajikan bedah desain secara mendalam (Latar Belakang Masalah & Solusi Visual).</li>
  <li><b>👤 Professional Identity (<code>/about</code>):</b> Menampilkan kronologi pengalaman kerja, kolaborasi merek (Brand Partners), dan pembuktian legal melalui Sertifikasi.</li>
  <li><b>💧 AquaNime Ecosystem (<code>/aquanime</code>):</b> Pintu gerbang utama komunitas. Menampilkan filosofi pergerakan, dokumentasi acara (Event Gallery), metrik anggota, dan integrasi pendaftaran (Discord/WhatsApp).</li>
</ul>

<br>

<h2 style="color: #0284c7;">🔒 5. Infrastruktur Keamanan & Skalabilitas</h2>
<ul style="line-height: 1.8;">
  <li><b>Serverless Architecture:</b> Generasi statis yang mengeliminasi kebutuhan database relasional, membuat sistem ini 100% kebal terhadap injeksi <i>Malware</i> atau peretasan konvensional.</li>
  <li><b>Enkripsi Tingkat Militer:</b> Distribusi jaringan dijamin oleh protokol SSL/HTTPS otomatis dari *edge network* Vercel.</li>
  <li><b>SEO Readiness:</b> Penempatan meta tag strategis, kompilasi <code>robots.txt</code>, dan arsitektur sitemap otomatis untuk dominasi kata kunci di Google Engine.</li>
</ul>

<hr>
<p align="center" style="color: #64748b; font-size: 14px;">
  <i>Dirancang & Dikembangkan oleh Muhammad Rafli Ramadhan © 2024. All Rights Reserved.</i>
</p>

```
```

```
