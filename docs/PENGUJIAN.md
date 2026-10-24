# Pengujian dan batas cakupan

## Menjalankan

```bash
npm run lint
npm run build
npm run test:integration
```

Tes memerlukan build produksi terbaru. Runner membuat file SQLite di folder temporary sistem, menjalankan migrasi yang sama dengan `db:deploy`, lalu menjalankan Next.js di port loopback kosong. Email/password uji dibuat secara terpisah, dan koneksi aplikasi diarahkan hanya ke file temporary. Server dihentikan dan file temporary dihapus setelah selesai. `.env` dan database Turso tidak diubah.

Jika sandbox memblokir server lokal atau pembuatan proses, jalankan dari terminal lokal dengan akses loopback. Tes tidak memerlukan akun Turso. Jangan menjalankan build lain bersamaan dengan tes yang sedang memakai hasil `.next`.

## Cakupan 16 tes integrasi

1. Migrasi dapat dipanggil ulang.
2. Migrasi gagal membatalkan tabel dan catatan migrasi dalam transaksi.
3. Perubahan checksum migrasi yang sudah diterapkan ditolak.
4. Halaman publik dan formulir admin dapat dirender.
5. Penyimpanan anonim serta login dari origin lain/tanpa origin ditolak.
6. Login JSON rusak, request terlalu besar, dan password salah ditolak.
7. Login valid membuat cookie HttpOnly/Secure/SameSite dan membuka editor.
8. Penyimpanan melalui Prisma terbaca kembali di API serta halaman publik.
9. Data tidak valid/request terlalu besar tidak mengganti data tersimpan.
10. Request chunked tanpa Content-Length tetap dibatasi ukurannya.
11. Dokumen database rusak menonaktifkan editor.
12. Sesi palsu ditolak.
13. Cookie lama setelah logout tidak dapat digunakan kembali.
14. Sesi kedaluwarsa tidak dapat menyimpan.
15. Versi kredensial sesi yang tidak cocok ditolak.
16. Pembatas percobaan login mengembalikan 429 dan Retry-After.

## Hasil pemeriksaan 17 Oktober 2026

Seluruh 16 tes lulus setelah memperbaiki pemeriksaan Origin. NextURL menormalkan hostname loopback; membandingkan langsung Origin browser dengan NextURL sebelumnya menyebabkan permintaan sah dari 127.0.0.1 ditolak. Perbandingan sekarang menggunakan Host request dan protokol aplikasi, tetap menolak origin lain.

Build produksi berhasil. Ini tidak menjamin tidak ada bug lain. Koneksi remote Turso, sertifikat/proxy deployment, dan perilaku browser seperti upload gambar, WebGL, serta layout mobile masih memerlukan pemeriksaan pada environment yang dikonfigurasi. Pengujian sesi di sini mengirim cookie melalui HTTP client; atribut cookie diperiksa, tetapi aturan pengiriman cookie oleh browser belum diuji otomatis.
