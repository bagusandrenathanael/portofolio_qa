# Penggunaan portofolio

## Mengganti bahasa

Di header website publik, pilih Bahasa Indonesia, English, 한국어, 日本語, atau 中文. Pilihan disimpan dalam cookie browser selama satu tahun dan halaman diperbarui otomatis. Atribut bahasa dokumen juga mengikuti pilihan ini. Pada ponsel, gunakan tab bawah untuk Beranda, Tentang, Keahlian, Proyek, dan Kontak; menu di header tetap menyediakan tautan ke bagian lainnya.

Label navigasi, bagian, tombol, dan teks bawaan yang tersedia memiliki terjemahan. Nama, tautan, istilah teknis, serta konten yang ditulis sendiri di admin dipertahankan. Jika Anda memasukkan teks Indonesia di admin, sediakan padanan teks terpisah untuk bahasa lain sebelum memilih bahasa tersebut; pengelolaan terjemahan per konten belum tersedia.

## Mendapatkan konfigurasi Turso

Buat database libSQL melalui dashboard Turso. Salin URL database dan token akses tulis ke `.env`. Jangan memakai URL halaman dashboard sebagai URL database. Token database bukan password login admin.

Alternatif jika Turso CLI sudah terpasang dan Anda sudah login:

```bash
turso db create portfolio
turso db show portfolio --url
turso db tokens create portfolio
```

Perintah terakhir menampilkan token rahasia: salin hanya ke `.env` atau environment Vercel. Lihat [panduan resmi](https://docs.prisma.io/docs/orm/v6/overview/databases/turso) untuk provisioning dan koneksi.

## Setup dan login

Ikuti urutan di README: `npm install`, `npm run admin:setup`, `npm run setup:check`, `npm run db:deploy`, lalu `npm run dev`. Jalankan `admin:setup` pada terminal interaktif (PowerShell/terminal VS Code atau Git Bash dengan dukungan TTY). Jika terminal menolak TTY, gunakan terminal PowerShell biasa.

Isi email Anda dan password minimal 12 karakter. Password tidak terlihat saat diketik. Hanya satu akun admin didukung. Tidak perlu membuat user di Supabase. Restart server setelah mengubah `.env`.

## Editor

- Pilih bagian sidebar, edit teks/angka, dan gunakan tambah/hapus untuk mengubah daftar.
- Foto JPG, PNG, atau WebP dikompresi di browser. Anda juga bisa memakai path dari folder `public` atau URL HTTPS gambar langsung.
- Tombol simpan menyimpan seluruh dokumen, termasuk draft di bagian sidebar lain.
- Tunggu pesan berhasil, lalu buka pratinjau untuk melihat versi yang tersimpan.
- Jika gagal, jangan refresh tab: draft tetap ada selama editor terbuka. Ada peringatan sebelum refresh/menutup tab; simpan sebelum berpindah melalui tautan aplikasi.
- Klik Keluar setelah selesai. Sesi dihapus dari database saat logout berhasil, dan kedaluwarsa setelah delapan jam.

Hindari dua admin/tab mengedit bersamaan: penyimpanan terakhir menggantikan seluruh dokumen. Total request dibatasi 1.000.000 byte termasuk foto dan teks.

## Dashboard QA dan modul admin

Dashboard `/admin` menampilkan jumlah proyek publik, test case, bug report, tingkat pass automation, distribusi status test case, tren test case delapan minggu, aktivitas, dan proyek terbaru. Grafik dan angka QA dihitung dari data yang dimasukkan; kondisi kosong ditampilkan sebagai kosong/0, tanpa angka contoh.

- **Profile Management:** profil, pengalaman kerja, pendidikan, keahlian, tautan CV, dan SEO umum website. Pendidikan yang diisi dapat tampil pada halaman publik.
- **Project Management / Pages & Content:** proyek portofolio dengan status publikasi, studi kasus, blog, dan urutan/visibilitas navigasi. Konten post memiliki status publikasi.
- **Test Case, Bug Report, API, Automation, Performance:** tambah, edit, hapus; setiap catatan menyimpan status, prioritas, serta kolom spesifik modul.
- **Evidence:** simpan URL atau unggah gambar JPG/PNG/WebP maksimal 1,5 MB per gambar. File disimpan sebagai data di Turso; batasi ukuran agar database tetap ringan.
- **Settings:** akun admin tetap dikelola melalui `npm run admin:setup`; rahasia tidak ditampilkan atau disimpan sebagai catatan CMS.

Setelah mengambil pembaruan yang menambah tabel QA, jalankan `npm run db:deploy` terhadap database Turso yang dipakai aplikasi, lalu refresh `/admin`. `npm run db:generate` membuat Prisma Client bila diperlukan. Dashboard dan modul QA memerlukan migrasi `admin_record`; editor konten lama tetap memakai dokumen portofolio utama.

## Troubleshooting

| Gejala | Solusi |
| --- | --- |
| Login 503 | Jalankan setup:check, lengkapi Turso dan hash admin, jalankan db:deploy. Periksa koneksi/token. |
| Login 401 | Gunakan email/password dari admin:setup. Untuk reset jalankan perintah itu lagi, lalu restart/redeploy. |
| Login 429 | Batas global 20 percobaan dalam jendela 15 menit. Tunggu sesuai Retry-After. |
| API 403 | Buka admin pada domain aplikasi yang sama. Permintaan API manual perlu Origin sesuai URL aplikasi. Periksa konfigurasi reverse proxy jika digunakan. |
| Tidak ada tabel | Jalankan npm run db:deploy pada database yang sama dengan aplikasi. |
| Prisma meminta LOCAL_DATABASE_URL | Tambahkan LOCAL_DATABASE_URL="file:./dev.db" dalam .env. |
| Simpan 400 | Periksa nama kolom dalam pesan; format email dan bilangan harus valid. |
| Simpan 413 | Kurangi gambar/teks agar total dokumen di bawah batas. |
| Publik normal tetapi admin gagal | Publik dapat memakai konten bawaan saat koneksi gagal. Itu tidak membuktikan database tersambung. |
| Impor tidak mengganti konten | Default mempertahankan konten yang ada; backup sebelum menggunakan --replace. |
| Login lokal berjalan tetapi Vercel gagal | Periksa environment Vercel lalu redeploy; .env lokal tidak otomatis dikirim. Gunakan HTTPS. |

## Backup dan impor

Backup database Turso sebelum mengubah skema atau mengganti dokumen. Skrip impor hanya membaca D1 lokal dan tidak menghapusnya. Data PostgreSQL tidak otomatis dipindahkan; ekspor dan konversikan terpisah jika pernah menyimpan konten di sana. Arsip migrasi PostgreSQL bukan backup datanya.
