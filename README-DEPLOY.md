# MESINBOOK — Auto-Deploy via GitHub → Vercel (sekali setup, lalu otomatis)

Setelah ini, setiap perubahan file yang di-push/diunggah ke GitHub akan langsung live di Vercel.

## A. Siapkan isi folder (sudah siap)

Isi folder `MesinBook - Publish` adalah satu paket aplikasi:

```
index.html        ← aplikasi (semua tampilan & logika)
firebase-config.js← config Firebase (aman dipublikasikan; keamanan lewat Firestore Rules)
logo-kecil.webp   ← logo MESINBOOK (16 KB)
```

## B. Buat repo GitHub (10 menit, sekali saja)

1. Buka **https://github.com** → daftar/login.
2. Klik **+** (kanan atas) → **New repository**.
3. Nama repo: misalnya `mesinbook` → **Public** (aman; aplikasi & config memang untuk publik) → klik **Create repository**.
4. Di halaman repo kosong: klik **"uploading an existing file"** (link di tengah halaman).
5. Drag & drop KETIGA file dari folder `MesinBook - Publish` ke area upload → tulis pesan "Initial commit" → klik **Commit changes**.

Selesai — repo sudah berisi aplikasi Anda.

## C. Hubungkan repo ke Vercel (5 menit)

1. Buka **https://vercel.com** → login.
2. Klik **Add New…** → **Project**.
3. Pada daftar "Import Git Repository", pilih **mesinbook** (kalau belum muncul, klik **Adjust GitHub App Permissions** dan izinkan akses repo `mesinbook`).
4. Konfigurasi (biarkan default):
   - Framework Preset: **Other**
   - Root Directory: `.`
   - Build Command: (kosong)
   - Output Directory: (kosong / `.`)
5. Klik **Deploy** → tunggu 1–2 menit → aplikasi live 🎉

## D. Cara update aplikasi selanjutnya

**Cara 1 — edit lewat GitHub web:**
1. Buka repo `mesinbook` di GitHub.
2. Klik file `index.html` → ikon pensil (Edit) → tempel hasil update dari saya (jika Anda kirim file ke saya) → **Commit changes**.
3. Vercel otomatis deploy ulang (cek tab **Deployments**).

**Cara 2 — replace semua (rekomendasi):**
1. Dapatkan paket update (`MesinBook-Publish.zip`).
2. Di repo GitHub: klik **Add file** → **Upload files** → seret file-file dari folder publish → **Commit changes** → Vercel auto-deploy.

**Cara 3 — tanpa Git sama sekali:**
Buka project di Vercel → tab **Deployments** → **Redeploy** (kalau Anda pernah upload manual). Tapi dengan koneksi Git, langkah ini tidak perlu lagi.

## E. Catatan penting

- `firebase-config.js` **aman diunggah** — ia memang konfigurasi sisi-klien; keamanan ditegakkan oleh Firestore Rules (hanya admin yang bisa menulis/menghapus).
- Domain tetap `pinlcd.vercel.app` atau ganti lewat Vercel → Settings → Domains.
- Jika suatu saat ingin hapus riwayat, kosongkan repo GitHub terlebih dahulu lalu hapus project Vercel — data di Firestore tidak hilang.
