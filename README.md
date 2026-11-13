# JadwalKu — Aplikasi Manajemen Jadwal & Kegiatan

**Nama:** Aldi Pramana
**NIM:** 1247050031
**Mata Kuliah:** Pengembangan Aplikasi Web
**Tugas:** Component-Based UI Development with React

## Deskripsi Proyek
**JadwalKu** adalah aplikasi web *full-stack* berbasis React yang dirancang untuk membantu mahasiswa mengelola jadwal kegiatan sehari-hari dan memantau *deadline* tugas kuliah dalam satu *dashboard* terpusat. Aplikasi ini mengusung tema *dark mode* (hitam pekat) dengan antarmuka yang modern, bersih, dan responsif.

Aplikasi ini terintegrasi dengan **Supabase (PostgreSQL)** sebagai *backend*, sehingga data tidak hanya tersimpan di *local storage*, melainkan tersinkronisasi secara *real-time* di database.

## Teknologi yang Digunakan
- **React.js (Vite):** *Library* utama untuk membangun antarmuka.
- **Tailwind CSS v3:** *Framework* CSS untuk *styling* yang responsif dan konsisten.
- **React Router DOM v7:** Untuk navigasi antar halaman (*Single Page Application*).
- **Supabase:** *Backend as a Service* (Database PostgreSQL) untuk menyimpan data kegiatan.
- **Framer Motion & Lucide React:** Untuk animasi interaktif dan ikon antarmuka.
- **date-fns:** Untuk manipulasi dan format tanggal.

---

## Penerapan Konsep React (Sesuai Ketentuan Tugas)

### 1. Components (Komponen)
Aplikasi ini dipecah menjadi banyak komponen kecil yang terpisah ke dalam file masing-masing, mencakup lebih dari 15 komponen. 
- **Layout Components:** `Sidebar.jsx`, `Header.jsx`, `Layout.jsx`
- **UI Reusable Components:** `Button.jsx`, `Modal.jsx`, `Badge.jsx`, `EmptyState.jsx`, `PageHeader.jsx`, `SwipeRow.jsx`
- **Feature Components:** `ActivityCard.jsx`, `ActivityGrid.jsx`, `ActivityForm.jsx`, `FilterBar.jsx`, `StatCards.jsx`, `CalendarGrid.jsx`, `DayDetail.jsx`.

### 2. Props (Properti)
Props digunakan untuk mengirim data dari komponen *Parent* (induk) ke komponen *Child* (anak).
- **Contoh:** Komponen `ActivityGrid` menerima *props* `activities` (array data), `onEdit`, `onDelete`, dan `onToggle` dari halaman `Dashboard.jsx`. Data tersebut kemudian dilempar lagi ke `ActivityCard` untuk dirender.
- **Contoh Reusable:** Komponen `Button` menerima *props* `variant` (primary, ghost, danger) dan `size` untuk mengubah tampilannya secara dinamis di berbagai halaman.

### 3. State (useState & Context)
State digunakan untuk mengelola data yang dapat berubah selama aplikasi berjalan.
- **Local State (`useState`):** Digunakan di `ActivityForm.jsx` untuk menyimpan ketikan user pada form (judul, tanggal, jam). Digunakan juga di `Header.jsx` untuk melacak status buka/tutup menu *mobile*.
- **Global State (`useContext`):** Dibuat file `ActivitiesContext.jsx` untuk menyimpan data kegiatan dari Supabase. Ini memungkinkan halaman Dashboard, Kalender, dan Statistik mengakses data yang sama tanpa harus *passing props* secara berlebihan (*prop drilling*).

### 4. Event Handling
Event handling menangani interaksi pengguna seperti klik, input, dan submit.
- **Contoh:** Fungsi `handleSubmit` pada `ActivityForm` yang dipicu saat user menekan tombol "Tambah Kegiatan". Fungsi `onChange` pada input form untuk memperbarui state secara *real-time* saat user mengetik.

### 5. Conditional Rendering
Menampilkan konten berdasarkan kondisi tertentu.
- **Contoh:** Jika data kegiatan kosong (`activities.length === 0`), maka komponen `<EmptyState />` yang akan dirender, bukan list kegiatan.
- **Contoh:** Tombol "Edit" dan "Hapus" disembunyikan dan diganti dengan ikon Gembok 🔒 jika data tersebut berasal dari tabel `tasks` (data eksternal), sehingga mencegah *error* pengeditan.

### 6. List Rendering
Menampilkan data array menggunakan method `.map()` dan memberikan `key` unik pada setiap elemen.
- **Contoh:** Merender daftar kegiatan di Dashboard, daftar tanggal di Kalender (`CalendarGrid`), dan daftar notifikasi di halaman Notifikasi.

---

## Fitur-Fitur Interaktif (Sesuai Ketentuan Tugas)

Aplikasi ini memiliki lebih dari 3 fitur interaktif yang berjalan penuh:

1. **Dashboard Terintegrasi (CRUD Penuh)**
   - **Menambahkan data:** Form interaktif dengan *popup modal* untuk membuat jadwal baru.
   - **Mengedit data:** Mengubah judul, tanggal, jam, atau deskripsi kegiatan yang sudah ada.
   - **Menghapus data:** Menghapus kegiatan dengan konfirmasi *pop-up*.
   - **Mengubah status:** Tombol *Toggle* untuk menandai kegiatan "Selesai" atau "Belum Selesai".
2. **Pencarian & Filter Real-time**
   - **Search Bar di Header:** Mencari kegiatan berdasarkan judul secara instan. Pencarian ini tersinkronisasi di seluruh halaman (Dashboard & Daftar Kegiatan).
   - **Filter:** Menyaring daftar berdasarkan Kategori (Kuliah, Tugas, Organisasi, Pribadi) dan Status (Selesai/Belum).
3. **Kalender Interaktif (Sinkronisasi Data)**
   - Menampilkan kalender bulanan. Tanggal yang memiliki kegiatan akan ditandai dengan **titik putih (dot)**.
   - Jika tanggal diklik, panel di sebelah kanan akan menampilkan detail kegiatan pada hari tersebut.
   - Terintegrasi dengan data *deadline* tugas dari aplikasi eksternal (Pertemuan 6).
4. **Notifikasi & Swipe-to-Delete**
   - Mendeteksi tugas yang *deadline*-nya hari ini.
   - Menggunakan komponen `SwipeRow` (berbasis *Framer Motion*) yang memungkinkan pengguna menggeser kartu ke kiri untuk menghapus notifikasi (khusus di tampilan, data asli tetap aman).
   - Mendukung **Web Notification API** (notifikasi *pop-up* langsung ke layar laptop/HP jika diizinkan).
5. **Statistik Visual**
   - Menampilkan grafik batang (*progress bar*) persentase tugas yang sudah diselesaikan.
   - Rekap jumlah tugas per kategori (Kuliah, Tugas, Organisasi, Pribadi).

---

## Cara Menjalankan Proyek (Local Development)

1. *Clone repository* ini: `git clone https://github.com/allprmn/jadwalku.git`
2. Masuk ke folder: `cd jadwalku`
3. Install *dependency*: `npm install`
4. Buat file `.env` di *root folder* dan tambahkan kredensial Supabase:
   ```env
   VITE_SUPABASE_URL=url_supabase_kamu
   VITE_SUPABASE_ANON_KEY=anon_key_kamu