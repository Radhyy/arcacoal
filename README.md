# Arcacoal - PT Arcadia Charcoal Indonesia Official Website & Admin Panel

Sistem Website Company Profile & Live Visual Editor Admin Panel untuk **PT Arcadia Charcoal Indonesia**, produsen dan eksportir briket arang batok kelapa & arang kayu keras kelas dunia dari Indonesia.

## 🚀 Fitur Utama

- **Company Profile Landing Page**: Modern, responsif, elegan, cepat, dan teroptimasi SEO dengan visual 3D charcoal, animasi Framer Motion, & dual language (Bahasa Indonesia & English).
- **Admin Panel Visual Live Editor (`/admin`)**: Mengedit konten teks, gambar, spesifikasi produk, dan galeri secara visual real-time dengan pratinjau langsung.
- **Auto-Translate Bi-directional Groq AI**: Penerjemahan dua arah otomatis (ID ↔ EN) saat menyimpan perubahan dari Admin Panel.
- **Cloud Direct Upload ImgBB**: Mengunggah foto produk dan galeri baru langsung dari komputer ke CDN ImgBB.
- **Database Neon PostgreSQL**: Penyimpanan data terpusat serverless PostgreSQL yang cepat dan andal.
- **Autentikasi Admin JWT & Hash Password**: Akses aman ke Admin Panel dengan kredensial terenskripsi.

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 16 (App Router)
- **UI & Styling**: React 19, TailwindCSS v4, Framer Motion, Lucide React
- **Database**: Neon PostgreSQL Serverless (`@neondatabase/serverless`)
- **AI Translation**: Groq AI SDK (`groq-sdk`)
- **Image Storage**: ImgBB API CDN
- **Deployment Adapter**: `@netlify/plugin-nextjs`

## ⚙️ Environment Variables (`.env.local`)

```env
DATABASE_URL=your_database_url_here
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
ADMIN_JWT_SECRET=your_jwt_secret_key
```

## 💻 Jalankan di Lokal

```bash
# 1. Install dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev

# Buka http://localhost:3000 di browser Anda.
```

---
© 2026 PT Arcadia Charcoal Indonesia. All rights reserved.
