/* ============================================================================
   KONFIGURASI FIREBASE — isi dulu sebelum aplikasi bisa dipakai!
   Cara mendapatkan config ini (±5 menit):
   1. Buka https://console.firebase.google.com → "Tambah project" (nama mis. "pinlcd")
   2. Di panel kiri: Build → Firestore Database → Create database → pilih
      lokasi terdekat (mis. asia-southeast2 / Jakarta) → Start in PRODUCTION MODE
   3. Di panel kiri: Build → Authentication → Get started →
      - tab Sign-in method → Email/Password → Enable → Save   (untuk admin)
      - tab Sign-in method → Anonymous → Enable → Save         (WAJIB, untuk mode pengunjung/kiosk)
   4. Klik ikon gerigi (Project settings) → bagian "Your apps" → ikon </> (Web) →
      nickname bebas (mis. "pinlcd-web") → Register app → salin objek firebaseConfig
      lalu tempel menggantikan placeholder di bawah.
   5. Firestore → tab Rules → salin isi file firestore.rules → Publish

   MEMBUAT AKUN ADMIN PERTAMA:
   Halaman login siswa sudah tidak ada — semua orang langsung masuk mode pengunjung.
   Login khusus ADMIN lewat tombol "Login Admin" (sidebar / halaman admin login).
   Untuk membuat admin pertama (sekali saja):
   a. Firebase Console → Authentication → tab Users → "Add user" →
      isi email + password admin
   b. Salin UID user tersebut → Firestore → koleksi "users" → Add document →
      Document ID = UID tadi, isi field:  nama (string), role: "admin",
      username: "admin", email, nim: "", kelas: "", tipe: "pegawai", createdAt: tanggal hari ini
   c. Buat koleksi "usernames" → Add document → Document ID = username (mis. admin),
      isi field:  uid (string UID di atas), email (string)
   d. Login lewat tombol "Login Admin" dengan username & password tadi
      (admin baru wajib email terverifikasi — Firebase Console bisa set manual
       atau klik link verifikasi yang dikirim saat akun dibuat)
   ========================================================================== */

export const firebaseConfig = {
  apiKey: "AIzaSyAJ-aGsRQR-AZWLE0F1HvQA3O3qu-7EGuY",
  authDomain: "pinlcd.firebaseapp.com",
  projectId: "pinlcd",
  storageBucket: "pinlcd.firebasestorage.app",
  messagingSenderId: "235140889760",
  appId: "1:235140889760:web:b748e3e55a7cb43fe51dc5"
};
