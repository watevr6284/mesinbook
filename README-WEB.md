# MESINBOOK — Booking Fasilitas Teknik Mesin (Versi Web · Firebase · Gratis)

**Cara pakai aplikasi sekarang (login diperlukan):**

- **Siswa / Kelas**: akun kelas (dibuat admin, mis. `1trm1` s/d `3trm5`) → masuk lewat layar **Login** (username + password dari admin) → menu **Dashboard, Peminjaman, Pengembalian, Pinjaman Saya, Akun Saya**.
- **Admin**: masuk dengan username + password admin → menu lengkap terbuka: **Dashboard, Data Proyektor, Data Ruang, Transaksi, Laporan, Pengguna** — dan berhak **memverifikasi pengembalian & menghapus data**.

Arsitektur: **Firebase Authentication (Email/Password)** untuk semua akun + **Cloud Firestore** untuk database; **Vercel** untuk hosting (gratis). Tidak ada lagi mode tanpa login — semua akses menuntut akun.

Biaya: **Rp 0** (kuota gratis Firebase lebih dari cukup untuk sekolah/kampus).

---

## Langkah 1 — Buat project Firebase (±5 menit)

1. Buka **https://console.firebase.google.com** → login dengan akun Google kamu
2. Klik **Tambah project** → nama mis. `pinlcd` → (boleh matikan Google Analytics) → **Buat project**
3. Di menu kiri: **Build → Firestore Database → Create database**
   - Pilih lokasi terdekat: **asia-southeast2** (Jakarta)
   - Pilih **Start in production mode** → Create
4. Di menu kiri: **Build → Authentication → Get started**
   - Klik **Email/Password** → **Enable** → **Save** ← **WAJIB**
   - (Jangan aktifkan Anonymous — aplikasi tidak lagi memakainya)
5. Klik ikon **gerigi** (⚙ Project settings) → bagian *Your apps* → ikon `</>` (Web) → nickname mis. `pinlcd-web` → **Register app**
6. Salin objek `firebaseConfig` yang muncul

## Langkah 2 — Isi `firebase-config.js`

Ganti placeholder dengan config dari langkah 5 (contoh sudah ada di file).

## Langkah 3 — Pasang Aturan Keamanan Firestore (WAJIB untuk versi ini)

Firestore → tab **Rules** → hapus semua isinya → tempel **seluruh isi file `firestore.rules`** → **Publish**.

Aturan ini memastikan:
- Hanya akun **Email/Password** (admin & akun kelas) yang bisa membaca/menulis data — akun anonim tidak bisa apa-apa;
- Admin (`role: admin` + email terverifikasi) boleh membuat/mengelola unit, akun, menghapus riwayat;
- Pengembalian disubmit dengan status `menunggu_verifikasi`; verifikasi/penolakan hanya admin;
- Riwayat peminjaman tidak bisa dihapus oleh siapa pun selain admin.

> Jika rules di server masih versi lama, aplikasi akan menolak aksi tertentu (mis. hapus gagal dengan `permission-denied`). Tempel ulang rules terbaru lalu **Publish** + Ctrl+F5.

## Langkah 4 — Buat Akun ADMIN pertama

Semua akun dibuat lewat menu **Pengguna** (admin), tapi admin pertama dibuat lewat **Firebase Console**:

1. **Authentication → Users → Add user** → isi email + password admin
2. **Firestore Database → koleksi `users` → Add document**
   - Document ID = **UID** user tadi (kolom UID di Authentication)
   - Field (string): `nama`, `role: "admin"`, `username` (mis. `admin`), `email`, `nim: ""`, `kelas: ""`, `tipe: "pegawai"`, `createdAt` (mis. `2026-11-18`)
3. **Koleksi `usernames` → Add document**
   - Document ID = `username` (mis. `admin` — huruf kecil)
   - Field: `uid` (string UID tadi), `email` (string)
4. Buka aplikasi → Login → username + password tadi → menu admin terbuka

> Admin bisa menambah/mengedit akun sendiri & akun kelas lewat menu **Pengguna** (Tambah Pengguna / Edit Pengguna / Impor Excel).

> Email admin harus **terverifikasi** (khusus untuk role admin). Akun yang dibuat lewat menu Pengguna otomatis dikirimi link verifikasi (hanya untuk peran Admin).

## Langkah 5 — Online-kan ke Vercel

Lihat **`README-DEPLOY.md`** — langkah lengkap dengan screenshot-esque checklist: repo GitHub → Import ke Vercel → otomatis deploy. Drag & drop zip statis juga masih bisa, tapi koneksi Git membuat update jadi otomatis.

## Langkah 6 — Isi datanya

Login sebagai admin → **Data Proyektor** / **Data Ruang** → tombol **Muat 8 Unit Contoh** (saat database kosong) atau tambah manual → **Pengguna → Impor Excel** untuk membuat akun kelas massal.

---

## Yang baru di versi ini

- **Semua akun kini login** (tidak ada mode tanpa login). Akun kelas (User) bisa masuk & melihat: Dashboard, Peminjaman, Pengembalian, **Pinjaman Saya**.
- **Dashboard untuk akun kelas** — tampilan ringkas (peminjaman aktif, selesai, ketersediaan unit/ruang).
- **Pinjaman Saya** — riwayat peminjaman milik kelas yang login (difilter otomatis dari kolom Kelas).
- **Statistik per Kelas** di Dashboard admin (bar chart peminjaman per kelas).
- **Export CSV** di menu Laporan (untuk Excel) + **Cetak / PDF**.
- **Impor Akun dari Excel** (menu Pengguna) — buat 30+ akun kelas sekaligus dari file .xlsx/.csv, password acak otomatis, email tidak perlu diverifikasi, username/email yang dipakai ditimpa.
- **Edit Pengguna** — ubah nama, username, tipe, NIM/NIP, kelas, peran (akun Anda sendiri tidak bisa diubah perannya; admin terakhir dilindungi).
- **Hapus data transaksi** (admin) — riwayat & paket LCD+Ruang bisa dihapus permanen (khusus admin, dengan konfirmasi + unit otomatis kembali `Tersedia` bila masih Dipinjam).
- **Notifikasi pengembalian** via email (FormSubmit, gratis, perlu klik aktivasi sekali saja di inbox).
- **Logo terkompresi** (16 KB) + meta share/preview.
- **Verifikasi email hanya untuk Admin** — akun kelas tidak perlu diverifikasi.
- **Kiosk/anonim dihapus seluruhnya** — login wajib.

---

## Batasan & catatan jujur

- **Akun kelas bersifat bersama per kelas** — siapa pun yang memegang username+password kelas itu bisa masuk sebagai kelas tersebut. Untuk riwayat perorangan, pertimbangkan akun per individu (impor Excel mendukung kolom NIM/PASSWORD per baris).
- **Verifikasi pengembalian** dilakukan admin pada barang fisik (tanpa foto) — sampai admin mengklik **Verifikasi**, unit belum kembali `Tersedia`.
- **Notifikasi email**: hanya terkirim setelah Anda klik link aktivasi yang dikirim FormSubmit ke inbox saat pengembalian PERTAMA terjadi.
- **Menghapus akun** hanya menghapus profil di database; kredensial di Firebase Authentication tetap ada (nonaktifkan total lewat Console → Authentication → ⋮ Disable).
- **Backup**: Firestore managed tapi plan gratis tidak punya backup otomatis — sebaiknya ekspor berkala lewat menu Laporan/CSV atau console Firestore.
- **Kuota gratis** (50rb baca / 20rb tulis per hari) lebih dari cukup untuk kampus kecil.
- **Lupa password admin**: layar Login → **Lupa password?** → link reset dikirim ke email admin.

## Pengembalian dengan Verifikasi Admin

1. Peminjam (akun kelas) membuka menu **Pengembalian** → klik **Kembalikan** pada baris paket.
2. Dialog konfirmasi menampilkan item + **Waktu pengembalian**.
3. Setelah konfirmasi, status menjadi **Menunggu Verifikasi**.
4. Admin membuka menu **Pengembalian** → **Verifikasi** (unit kembali `Tersedia`, status `Dikembalikan`) atau **Tolak** (kembali `Dipinjam`; peminjam mengajukan lagi).
5. Menu **Transaksi** & **Laporan** ikut menampilkan status **Menunggu Verifikasi**; filter status Laporan punya opsi **Menunggu verifikasi**; cetak/PDF menampilkan label yang sama.

## Impor Akun Mahasiswa dari Excel (menu Pengguna)

1. **Pengguna → Impor Excel**
2. Unggah file `.xlsx`/`.csv` dengan kolom: **NAMA, USERNAME, TIPE PENGGUNA, NIM, KELAS, PERAN, PASSWORD**.
   - Kolom **PASSWORD** opsional: isi untuk dipakai, kosongkan → dibuat acak (10 karakter).
   - Username/email yang sudah dipakai akan **ditimpa** (profil akun lama diperbarui — password & email lama TIDAK berubah; gunakan **Edit Pengguna → Kirim Reset Password** untuk mengganti password akun lama).
   - Baris judul di atas baris header diabaikan.
3. Periksa pratinjau → **Buat Semua Akun** → unduh **CSV** kredensial (hanya tampil sekali).
4. Email akun bersifat sintetis (`<username>@siswa.mesinbook.app`) — tidak perlu email sungguhan & tidak perlu diverifikasi.

**Login akun kelas:** akun PERAN *User* masuk lewat Login (username + password) dan melihat menu **Dashboard, Peminjaman, Pengembalian, Pinjaman Saya, Akun Saya**. Menu admin tetap tersembunyi.

**Format contoh:** `NAMA;USERNAME;TIPE PENGGUNA;NIM;KELAS;PERAN;PASSWORD`
(atau .xlsx dengan header sama — lihat file DAFTAR NAMA USER MESINBOOK.xlsx).

## Ringkasan file di folder ini

| File | Fungsi |
|------|--------|
| `index.html` | Aplikasi (tampilan & seluruh logika) |
| `firebase-config.js` | Config Firebase (aman dipublikasikan) |
| `firestore.rules` | Aturan keamanan (tempel ke Firestore → Rules → **Publish**) |
| `README-WEB.md` | Panduan ini |
| `README-DEPLOY.md` | Panduan deploy otomatis ke Vercel via GitHub |
| `logo-kecil.webp` | Logo MESINBOOK (16 KB) |
