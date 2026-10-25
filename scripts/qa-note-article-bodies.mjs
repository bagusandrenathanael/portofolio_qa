export const articleBodies = {
  "qa-test-planning-by-risk": {
    body: `## 2. Permasalahan yang ingin diselesaikan
Jumlah test case yang besar belum tentu berarti risiko produk sudah tercakup. Waktu pengujian terbatas, sementara kegagalan pada login, pembayaran, atau pembaruan data bisa berdampak besar.

## 3. Penjelasan konsep
Risk-based testing mengurutkan pekerjaan berdasarkan kemungkinan kegagalan dan dampaknya. Skor sederhana kemungkinan × dampak membantu diskusi prioritas, tetapi tidak menggantikan konteks bisnis dan penilaian QA.

## 4. Contoh penerapan
Pada aplikasi transaksi sintetis, petakan login, lihat saldo, kirim transfer, dan status transfer. Catat dampak, kemungkinan, kontrol yang tersedia, dan bukti yang dibutuhkan. Prioritaskan transfer karena kegagalan dapat membuat pengguna tidak yakin apakah transaksi berhasil.

## 5. Test scenario
~~~text
ID: TRF-001 | Priority: High
Given akun uji memiliki saldo cukup
When pengguna mengirim transfer ke penerima uji yang valid
Then hanya satu transaksi berhasil yang tercatat
And saldo serta riwayat transaksi konsisten
~~~

Tambahkan skenario saldo tidak cukup, penerima tidak valid, timeout, dan pengiriman berulang. Gunakan akun serta nominal sintetis.

## 6. Kesimpulan dan rekomendasi
Mulai dari risiko tertinggi, tautkan kebutuhan ke skenario dan bukti, lalu sampaikan risiko tersisa sebelum rilis. Studi simulasi harus memakai data sintetis dan tidak memuat data nasabah, screenshot produksi, arsitektur internal, atau informasi perusahaan yang tidak publik.`,
    bodyEn: `## 2. Problem to solve
A large test suite does not guarantee that important product risks are covered. Testing time is limited, and a failure in login, payment, or data updates can have significant impact.

## 3. Concept
Risk-based testing prioritizes work by likelihood and impact. A simple likelihood × impact score helps teams discuss priority, but does not replace business context or QA judgment.

## 4. Example application
For a synthetic transaction app, map login, balance view, transfer submission, and transfer status. Record impact, likelihood, existing controls, and evidence needed. Prioritize transfer because failures can leave users unsure whether it completed.

## 5. Test scenario
~~~text
ID: TRF-001 | Priority: High
Given a test account has sufficient funds
When the user submits a transfer to a valid test recipient
Then exactly one successful transaction is recorded
And the balance and transaction history agree
~~~

Add scenarios for insufficient funds, invalid recipient, timeout, and repeated submission. Use synthetic accounts and amounts.

## 6. Conclusion and recommendation
Start with the highest risks, trace requirements to scenarios and evidence, and report remaining exposure before release. Simulated case studies should use synthetic data and omit customer information, production screenshots, internal architecture, and non-public company details.`
  },
  "choosing-regression-automation": {
    body: `## 2. Permasalahan yang ingin diselesaikan
Regression manual yang berulang memakan waktu, tetapi mengotomasi semua hal dapat menghasilkan suite rapuh dan mahal dirawat. Tantangannya adalah memilih pemeriksaan dengan sinyal cepat dan tepercaya.

## 3. Penjelasan konsep
Pilih alur yang stabil, sering dijalankan, penting bagi pengguna, dan hasilnya dapat diverifikasi. Eksplorasi manual digunakan untuk menemukan perilaku baru; otomasi mengulang pemeriksaan yang sudah dipahami.

## 4. Contoh penerapan
Contoh berikut memakai halaman login demo dan kredensial dari environment variable. Assertion memeriksa tujuan pengguna, bukan detail implementasi halaman.

## 5. Potongan kode Playwright
~~~ts
import { test, expect } from "@playwright/test";

test("valid user reaches the account overview", async ({ page }) => {
  await page.goto(process.env.QA_BASE_URL!);
  await page.getByLabel("Email").fill(process.env.QA_USERNAME!);
  await page.getByLabel("Password").fill(process.env.QA_PASSWORD!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Account overview" })).toBeVisible();
});
~~~

Jalankan hanya pada aplikasi demo yang diizinkan. Jangan simpan password di kode; siapkan data uji yang dapat digunakan ulang agar hasil stabil.

## 6. Kesimpulan dan rekomendasi
Mulai dengan smoke test untuk journey penting, ukur kestabilan dan biaya perawatan, lalu perluas bertahap. Padukan regression automation dengan exploratory testing dan review CI. Gunakan aplikasi serta data sintetis; jangan sertakan kredensial, endpoint internal, screenshot produksi, atau detail rahasia.`,
    bodyEn: `## 2. Problem to solve
Repeated manual regression takes time, while automating everything can create a brittle, expensive suite. The challenge is choosing checks that provide a fast, trustworthy signal.

## 3. Concept
Prefer flows that are stable, frequent, important to users, and have verifiable outcomes. Use exploration to discover new behavior; automation repeats checks the team already understands.

## 4. Example application
This example uses a demo login page and credentials from environment variables. Its assertion checks the user outcome rather than page implementation details.

## 5. Playwright snippet
~~~ts
import { test, expect } from "@playwright/test";

test("valid user reaches the account overview", async ({ page }) => {
  await page.goto(process.env.QA_BASE_URL!);
  await page.getByLabel("Email").fill(process.env.QA_USERNAME!);
  await page.getByLabel("Password").fill(process.env.QA_PASSWORD!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Account overview" })).toBeVisible();
});
~~~

Run only against an authorized demo application. Keep passwords out of source code and make test data repeatable for stable results.

## 6. Conclusion and recommendation
Start with smoke checks for important journeys, measure stability and maintenance cost, and expand gradually. Pair regression automation with exploratory testing and CI review. Use synthetic apps and data; omit credentials, internal endpoints, production screenshots, and confidential details.`
  },
  "bug-reports-that-help-teams": {
    body: `## 2. Permasalahan yang ingin diselesaikan
Laporan “fitur error” sulit direproduksi. Detail yang kabur memaksa developer menebak kondisi awal dan menyulitkan tim menilai dampaknya.

## 3. Penjelasan konsep
Laporan actionable menjelaskan apa yang gagal, lingkungan dan build, langkah reproduksi, hasil yang diharapkan dan aktual, serta dampak pengguna. Bukti harus relevan dan disanitasi.

## 4. Contoh penerapan
Pada API katalog demo, pencarian mengembalikan HTTP 200 tetapi satu item tidak memiliki field id. Catat request dan respons demo yang disanitasi, lalu jelaskan bahwa item tersebut tidak bisa dibuka dari hasil pencarian.

## 5. Contoh assertion Postman
~~~js
pm.test("response is successful", () => {
  pm.expect(pm.response.code).to.be.within(200, 299);
});

pm.test("each catalog item has an id", () => {
  const body = pm.response.json();
  pm.expect(body.items).to.be.an("array");
  body.items.forEach((item) => pm.expect(item).to.have.property("id"));
});
~~~

Contoh laporan: **[API] Item katalog tanpa id pada hasil pencarian** · Environment: demo QA · Langkah: kirim pencarian dengan query valid · Expected: setiap item memiliki id · Actual: satu item tidak memiliki id · Dampak: item tidak dapat dibuka.

## 6. Kesimpulan dan rekomendasi
Sertakan langkah reproduksi ringkas, expected dan actual terpisah, bukti yang disanitasi, serta dampak. Setelah fix, ulangi skenario dan pemeriksaan regresi terkait. Studi simulasi harus menggunakan data sintetis; jangan tampilkan data nasabah, screenshot produksi, arsitektur internal, token, atau informasi rahasia perusahaan.`,
    bodyEn: `## 2. Problem to solve
A report that only says “the feature is broken” is hard to reproduce. Vague details force developers to guess and make impact difficult to assess.

## 3. Concept
An actionable report explains what failed, the environment and build, reproduction steps, expected and actual results, and user impact. Evidence should be relevant and sanitized.

## 4. Example application
In a demo catalog API, search returns HTTP 200 but one item is missing its id field. Record the sanitized demo request and response, then explain that the item cannot be opened from search results.

## 5. Postman assertion
~~~js
pm.test("response is successful", () => {
  pm.expect(pm.response.code).to.be.within(200, 299);
});

pm.test("each catalog item has an id", () => {
  const body = pm.response.json();
  pm.expect(body.items).to.be.an("array");
  body.items.forEach((item) => pm.expect(item).to.have.property("id"));
});
~~~

Example report: **[API] Catalog search item is missing id** · Environment: QA demo · Steps: send a search request with a valid query · Expected: every item includes an id · Actual: one item has no id · Impact: the item cannot be opened.

## 6. Conclusion and recommendation
Include concise steps, separate expected and actual results, sanitized evidence, and user impact. After a fix, repeat the scenario and related regression checks. Simulated case studies should use synthetic data and omit customer data, production screenshots, internal architecture, tokens, and confidential company information.`
  }
};
