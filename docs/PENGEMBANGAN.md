# Pengembangan

## Arsitektur

- Halaman publik membaca `lib/portfolio-store.ts`, dengan fallback konten bawaan jika database gagal.
- Editor memakai pembacaan ketat agar kegagalan database tidak mengganti data tersimpan dengan fallback.
- `lib/prisma.ts` membuat Prisma Client menggunakan `@prisma/adapter-libsql` dan koneksi Turso server-side.
- `lib/content-schema.ts` memvalidasi dokumen; `lib/request-body.ts` membatasi ukuran stream JSON.
- `lib/admin-auth.ts` memverifikasi password scrypt dan menyimpan hash token sesi acak dalam Turso. Cookie HttpOnly, SameSite Strict, dan Secure dalam produksi.
- API selalu memverifikasi sesi; proxy memeriksa Origin pada operasi mutasi dan mencegah cache halaman admin.

Model: `portfolio_content` (dokumen main), `admin_session` (sesi), `login_attempt` (pembatas percobaan). Login dibatasi global 20 percobaan per 15 menit untuk satu admin; serangan berulang dapat mengunci login sementara. Untuk aplikasi multiuser perlu desain autentikasi dan rate limiting lain.

Mengubah hash password/email membatalkan validitas semua sesi sebelumnya setelah server menggunakan konfigurasi baru. Logout menghapus sesi aktif. Entri kedaluwarsa dibersihkan saat login. Tidak ada pendaftaran publik, reset melalui email, atau MFA pada implementasi ini.

## Migrasi SQLite/Turso

Prisma Migrate 6 menggunakan SQLite lokal untuk menghasilkan SQL; tidak menerapkan migrasi langsung melalui URL libSQL. Lihat [dokumentasi Prisma](https://docs.prisma.io/docs/orm/v6/overview/databases/turso).

1. Edit `prisma/schema.prisma`.
2. Jalankan `npm run db:migrate -- --name deskripsi`. LOCAL_DATABASE_URL menunjuk file lokal.
3. Tinjau SQL di `prisma/migrations` dan commit bersama skema.
4. Backup database tujuan, lalu jalankan `npm run db:deploy` untuk Turso.

Runner Turso menerapkan tiap migrasi dalam transaksi tulis dan mencatat nama/checksum pada `_portfolio_migrations`. Pemanggilan ulang melewati migrasi yang sama. File yang berubah setelah diterapkan ditolak. Gunakan migrasi baru untuk koreksi; jangan mengedit SQL lama. Hindari perintah SQL yang tidak didukung di dalam transaksi, termasuk pengaturan PRAGMA yang memerlukan di luar transaksi. Tinjau manual migrasi rebuild tabel dari Prisma sebelum deploy.

`prisma/legacy-postgresql` menyimpan sejarah migrasi provider sebelumnya, bukan bagian dari runner. Tidak ada RLS PostgreSQL pada SQLite. Token Turso dan otorisasi server menjaga akses tulis. Jangan menerapkan migrasi SQLite pada database PostgreSQL.

## Pengembangan dan rilis

`npm run db:studio` menampilkan SQLite lokal untuk pengembangan skema. Aplikasi tetap menggunakan Turso remote; gunakan database Turso terpisah untuk pengembangan dan produksi. Hindari menjalankan perintah impor/reset terhadap database produksi tanpa backup.

Jalankan `npm run build`, lalu `npm run test:integration` untuk menguji server Next.js dengan SQLite sementara melalui adapter Prisma libSQL yang sama. Tes menggunakan akun acak dan tidak mengubah `.env` atau database Turso. Lihat [cakupan pengujian](PENGUJIAN.md).

Lint, build, dan tes lokal tidak membuktikan koneksi Turso atau seluruh interaksi browser. Sebelum rilis, periksa kredensial Turso, upload foto, tambah/hapus daftar, dan tampilan seluler pada database pengembangan. Belum tersedia otomatisasi browser end-to-end.

Konten API publik bersifat publik seluruhnya. Jangan menyimpan token, password, atau dokumen privat dalam konten portofolio. Jangan mencatat nilai environment atau token sesi dalam log.
