# Portofolio QA Engineer

Portofolio publik dan panel admin dalam satu aplikasi Next.js. Website publik menyediakan pilihan Bahasa Indonesia, English, 한국어, 日本語, dan 中文 serta navigasi tab bergaya aplikasi pada layar mobile.

Admin `/admin` menyediakan dashboard QA, analitik, CRUD test case/bug/API/automation/performance, evidence screenshot, serta akses ke editor profil, pendidikan, proyek, blog, navigasi, dan konten publik. SEO umum serta status publikasi proyek/post juga dapat dikelola. Data QA disimpan di tabel `admin_record` Turso; migrasi database baru perlu dijalankan setelah pembaruan kode.

## Stack

| Bagian | Teknologi |
| --- | --- |
| Frontend | Next.js App Router, React, TypeScript, Tailwind CSS |
| Backend | Next.js Route Handlers |
| Database | Turso (libSQL / SQLite) |
| ORM | Prisma 6 + adapter libSQL |
| Login | Satu admin, password scrypt dan sesi database |
| Hosting | Vercel, deploy dari GitHub |

Supabase tidak diperlukan lagi. URL dan token Turso adalah rahasia server dan tidak memakai prefix `NEXT_PUBLIC_`.

## Setup pertama

Persyaratan: Node.js >=22.13.0, npm, dan database Turso berbasis libSQL.

1. Buat database di [dashboard Turso](https://app.turso.tech). Ambil database URL `libsql://...` dan token akses database.
2. Jika belum ada `.env`, salin `.env.example` menjadi `.env`. Lengkapi `TURSO_DATABASE_URL` dan `TURSO_AUTH_TOKEN`. Biarkan `LOCAL_DATABASE_URL="file:./dev.db"` untuk CLI Prisma.
3. Jalankan satu per satu dan lanjutkan hanya jika perintah sebelumnya berhasil:

   ```bash
   npm install
   npm run admin:setup
   npm run setup:check
   npm run db:deploy
   npm run dev
   ```

4. Buka http://localhost:3000/admin. Gunakan email dan password yang dimasukkan saat `admin:setup`. Password yang pernah ditulis di chat tidak otomatis diaktifkan.
5. Opsional: jalankan `npm run db:import-legacy` setelah migrasi untuk menyalin konten D1 lokal di `.wrangler/state`. Konten Turso yang sudah ada dipertahankan. `--replace` hanya untuk penggantian yang disengaja setelah backup.

`admin:setup` menyembunyikan input password dan menulis hash ke `.env`; password asli tidak disimpan. Jalankan kembali untuk mengganti password, lalu restart server. Sesi lama otomatis ditolak setelah hash baru digunakan.

## Variabel lingkungan

| Nama | Fungsi |
| --- | --- |
| `TURSO_DATABASE_URL` | URL libSQL database remote untuk aplikasi, migrasi deploy, dan impor |
| `TURSO_AUTH_TOKEN` | Token database Turso dengan akses tulis |
| `LOCAL_DATABASE_URL` | File SQLite untuk Prisma CLI; bukan database aplikasi |
| `ADMIN_EMAIL` | Email satu akun admin |
| `ADMIN_PASSWORD_HASH` | Dibuat oleh `npm run admin:setup` |

Variabel Supabase lama, `DATABASE_URL`, `DIRECT_URL`, dan `ADMIN_EMAILS` tidak digunakan lagi. Konfigurasi lama yang ada di `.env` boleh dihapus setelah migrasi; jangan hapus data lama sebelum memastikan hasilnya.

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Server pengembangan |
| `npm run build` | Build produksi dengan webpack |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | Pemeriksaan ESLint |
| `npm run test:integration` | 16 tes integrasi HTTP + SQLite sementara; jalankan build dahulu |
| `npm run admin:setup` | Membuat/mengubah kredensial admin lokal |
| `npm run setup:check` | Memeriksa format konfigurasi tanpa mencetak nilai rahasia |
| `npm run db:generate` | Membuat Prisma Client |
| `npm run db:migrate -- --name nama` | Membuat migrasi baru pada SQLite lokal |
| `npm run db:deploy` | Menerapkan SQL ke Turso, mencatat checksum setiap migrasi |
| `npm run db:import-legacy` | Menyalin konten D1 lama ke Turso |
| `npm run db:studio` | Melihat SQLite lokal untuk pengembangan, bukan Turso remote |

## Vercel

### Deploy otomatis lewat GitHub

Hubungkan repository GitHub ini ke proyek Vercel dan atur **Production Branch** ke `main`. Setelah itu, setiap push ke `main` akan memicu production deployment:

```bash
git add README.md
git commit -m "Document Vercel deployment commands"
git push origin main
```

Ganti nama file dan pesan commit sesuai perubahan yang dibuat. Pantau prosesnya pada **Vercel → Project → Deployments**.

### Deploy manual lewat Vercel CLI

Instal dan hubungkan proyek satu kali. Jalankan dari folder proyek; `vercel link` akan meminta pemilihan akun dan proyek:

```bash
npm install --global vercel
vercel login
vercel link
```

Untuk membuat production deployment berikutnya:

```bash
vercel --prod
```

Pastikan variabel lingkungan di bagian sebelumnya sudah diisi pada **Vercel → Project → Settings → Environment Variables**. Jika ada migrasi database baru, jalankan `npm run db:deploy` dengan konfigurasi database tujuan sebelum deploy aplikasi. Build command adalah `npm run build`; Prisma Client dibuat saat instalasi. Jangan commit `.env` atau token rahasia.

Login melalui HTTPS setelah deployment. Perubahan variabel Vercel memerlukan redeploy. SQLite lokal tidak digunakan sebagai penyimpanan aplikasi di Vercel.

Halaman publik menampilkan konten bawaan ketika database belum tersedia. Editor memerlukan koneksi database yang berhasil. Setup kode tidak membuat akun/database Turso atau memindahkan data PostgreSQL secara otomatis.

## Dokumentasi

- [Penggunaan dan troubleshooting](docs/PENGGUNAAN.md)
- [Arsitektur, keamanan, dan migrasi](docs/PENGEMBANGAN.md)
- [Cakupan pengujian](docs/PENGUJIAN.md)
- [Dokumentasi resmi Prisma 6 untuk Turso](https://docs.prisma.io/docs/orm/v6/overview/databases/turso)
