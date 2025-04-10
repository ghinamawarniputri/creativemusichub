# Creative Music Hub

Website layanan produksi musik yang dibangun dengan **React** dan **Vite**.

---

## 📋 Prasyarat

Pastikan perangkat kamu telah terinstall:

- **Node.js** versi **16** atau lebih tinggi
- **PNPM** Package Manager
- **Git**
- **Visual Studio Code** (disarankan)
- **Terminal/Command Prompt**

**Jika PNPM belum terinstall, jalankan perintah berikut:**

```bash
npm install -g pnpm
```

---

## 🚀 Cara Instalasi

1. **Clone repository**:
   ```bash
   git clone https://github.com/Syndrom2211/magang-fikri.git
   ```
2. **Masuk ke direktori proyek**:
   ```bash
   cd magang-fikri
   ```
3. **Install dependensi**:
   ```bash
   pnpm install
   ```
4. **Jalankan server development**:
   ```bash
   pnpm run dev
   ```

---

## 📊 Cara Instalasi Database

1. **Masuk ke direktori proyek**
```bash
cd magang-fikri
```

2. **Masuk ke direktori API**
```bash
cd api
```

3. **Instal npm (jika belum)**
```bash
npm install
```

4. **Jalankan server sekaligus menginstall database otomatis**
```bash
pnpm run dev
```

---

## 💻 Cara Menggunakan

1. Buka browser dan akses:
   ```
   http://localhost:5173
   ```
2. **Perintah yang tersedia**:
   - `pnpm run dev` → Menjalankan server development
   - `pnpm run build` → Build untuk production
   - `pnpm run preview` → Preview hasil build

---

## 📁 Struktur Folder

```
magang-fikri/
├── node_modules/      # Dependency dari package.json (TIDAK perlu dimasukkan ke Git)
├── src/
│   ├── assets/        # Gambar dan asset
│   ├── components/    # Komponen React
│   ├── data/          # Data statis
│   ├── pages/         # Halaman utama
│   ├── style/         # File CSS/SCSS
│   ├── App.jsx        # Komponen utama aplikasi
│   └── main.jsx       # Entry point aplikasi
│
├── public/            # Asset publik
│
├── .gitignore         # Mengabaikan file tertentu dari Git
├── eslint.config.js   # Konfigurasi ESLint
├── index.html         # File HTML utama
├── package.json       # Konfigurasi proyek (dependencies & scripts)
├── pnpm-lock.yaml     # Lock file untuk PNPM
├── vite.config.js     # Konfigurasi Vite
└── README.md          # Dokumentasi proyek
```

---

## ✏️ Cara Mengedit

### 1️⃣ Komponen

- Buka folder `components/`
- Edit file komponen yang diinginkan
- Komponen menggunakan format **.jsx**

### 2️⃣ Styling

- Buka folder `style/`
- Edit file `main.css` untuk styling global
- Gunakan class yang sudah ada

### 3️⃣ Data

- Buka folder `data/`
- Edit file `index.js` untuk mengubah konten

### 4️⃣ Assets

- Tambahkan gambar di `assets/`
- Import dan gunakan di komponen

---

## 🔧 Troubleshooting

### 1️⃣ Jika terjadi error saat instalasi:

```bash
pnpm install --force
```

### 2️⃣ Jika modul tidak ditemukan:

```bash
pnpm clean && pnpm install
```

### 3️⃣ Jika terjadi restriksi eksekusi di Windows, jalankan:

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📝 Catatan Penting

1. **Pastikan Node.js terinstall dengan benar**
2. **Gunakan Visual Studio Code** untuk pengalaman coding terbaik
3. **Install extension yang diperlukan di VS Code**:
   - **ES7 React Snippets**
   - **Prettier**
   - **ESLint**

---

Semoga sukses dengan proyek **Creative Music Hub**! 🚀
