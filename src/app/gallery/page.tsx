"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, ChevronRight, Maximize2, X, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { lang, t } = useLanguage();

  const isEn = lang === "en";

  const fallbackPhotos = [
    "/Website Content/Foto/1-17.png",
    "/Website Content/Foto/1-16.png",
    "/Website Content/Foto/1-18.png",
    "/Website Content/Foto/1-20.png",
    "/Website Content/Foto/1-13.png",
    "/Website Content/Foto/1-14.png",
    "/Website Content/Foto/1-15.png",
    "/Website Content/Foto/1-12.png",
  ];

  const [galleryData, setGalleryData] = useState<any>({
    badge_en: "Factory & Production Showcase",
    badge_id: "Galeri Pabrik & Produksi",
    header_title_en: "Gallery",
    header_title_id: "Galeri",
    header_subtitle_en: "Real factory photo documentation inside PT Arcadia Charcoal Indonesia's manufacturing & kiln facilities.",
    header_subtitle_id: "Dokumentasi foto asli fasilitas pabrik pengolahan, tungku pembakaran, bahan baku, dan gudang PT Arcadia Charcoal Indonesia.",
    photos_json: [
      {
        src: "https://i.ibb.co/5WhsdmVN/0f3b732b59f9.png",
        local_src: "/Website Content/Foto/1-17.png",
        title_en: "Shisha Briquette Inspection",
        title_id: "Inspeksi Kualitas Briket Shisha",
        category_en: "Product Quality",
        category_id: "Kualitas Produk",
      },
      {
        src: "https://i.ibb.co/cXNKn7kg/9e0d78f5cf50.png",
        local_src: "/Website Content/Foto/1-16.png",
        title_en: "Extruded Sawdust Charcoal",
        title_id: "Produksi Briket Serbuk Gergaji",
        category_en: "Manufacturing",
        category_id: "Proses Produksi",
      },
      {
        src: "https://i.ibb.co/jPQgRzcP/a7e893dc631a.png",
        local_src: "/Website Content/Foto/1-18.png",
        title_en: "Traditional Kiln Carbonization",
        title_id: "Karbonisasi Tungku Tradisional",
        category_en: "Production Facility",
        category_id: "Fasilitas Produksi",
      },
      {
        src: "https://i.ibb.co/RTq9hLQf/28a28d30309a.png",
        local_src: "/Website Content/Foto/1-20.png",
        title_en: "Hardwood Charcoal Sorting",
        title_id: "Pemisahan Arang Kayu Keras",
        category_en: "Raw Material",
        category_id: "Bahan Baku",
      },
      {
        src: "https://i.ibb.co/ZzfKs6Pn/3e2ddfd9527f.png",
        local_src: "/Website Content/Foto/1-13.png",
        title_en: "Quality Control & Sizing",
        title_id: "Inspeksi Kuantitas Briket",
        category_en: "Quality Control",
        category_id: "Kontrol Kualitas",
      },
      {
        src: "https://i.ibb.co/39x9cL9G/7d6c10b4add8.png",
        local_src: "/Website Content/Foto/1-14.png",
        title_en: "Warehouse Stockpile & Logistics",
        title_id: "Gudang Penyiapan Ekspor",
        category_en: "Storage Facility",
        category_id: "Fasilitas Gudang",
      },
      {
        src: "https://i.ibb.co/HLv9SKbw/104ed7fabc11.png",
        local_src: "/Website Content/Foto/1-15.png",
        title_en: "Raw Hardwood Supply",
        title_id: "Pasokan Kayu Keras Alami",
        category_en: "Raw Material",
        category_id: "Bahan Baku",
      },
      {
        src: "https://i.ibb.co/fGH3h6Cx/d1b8b4f05e65.png",
        local_src: "/Website Content/Foto/1-12.png",
        title_en: "Processing Plant & Storage",
        title_id: "Pabrik Pengolahan Utama",
        category_en: "Factory Facility",
        category_id: "Fasilitas Pabrik",
      },
    ],
  });

  // Fetch live content from Neon PostgreSQL DB API
  useEffect(() => {
    async function loadGalleryData() {
      try {
        const res = await fetch("/api/gallery");
        const json = await res.json();
        if (json.success && json.data) {
          setGalleryData(json.data);
        }
      } catch (err) {
        console.error("Failed to load Gallery data from DB:", err);
      }
    }
    loadGalleryData();
  }, []);

  const photosList = Array.isArray(galleryData.photos_json) ? galleryData.photos_json : [];

  // Extract unique categories dynamically from DB photos
  const dynamicCategories: string[] = Array.from(
    new Set(
      photosList
        .map((p: any) => (isEn ? p.category_en || p.category_id : p.category_id || p.category_en))
        .filter(Boolean) as string[]
    )
  );

  const categories: { id: string; label: string }[] = [
    { id: "All", label: t("All", "Semua") },
    ...dynamicCategories.map((catName) => ({
      id: catName,
      label: catName,
    })),
  ];

  const filteredPhotos =
    activeCategory === "All"
      ? photosList
      : photosList.filter((p: any) => {
          const catName = isEn ? p.category_en || p.category_id : p.category_id || p.category_en;
          return catName === activeCategory;
        });

  return (
    <main className="min-h-screen bg-[#FCFCFC] text-slate-950 selection:bg-orange-500 selection:text-white">
      <Navbar />

      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Background Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-orange-100/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Breadcrumb Navigation Bar */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-sm font-medium text-slate-700 mb-8 hover:border-orange-200 transition-colors">
            <Link
              href="/"
              className="hover:text-[#F06B33] transition-colors flex items-center gap-1.5"
            >
              <Home className="w-4 h-4 text-slate-600" />
              <span>{t("Home", "Beranda")}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F06B33] font-bold">{t("Gallery", "Galeri")}</span>
          </div>

          {/* Page Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12] mb-4">
            {isEn ? galleryData.header_title_en : galleryData.header_title_id}{" "}
            <span className="text-[#F06B33]">{isEn ? "Factory Showcase" : "Pabrik & Produksi"}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mb-10">
            {isEn ? galleryData.header_subtitle_en : galleryData.header_subtitle_id}
          </p>

          {/* Dynamic Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-12 sm:mb-16 p-1.5 sm:p-2 rounded-2xl bg-slate-100/80 border border-slate-200/70">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-white text-slate-950 shadow-md shadow-slate-900/5 text-[#F06B33]"
                    : "text-slate-600 hover:text-slate-950 hover:bg-white/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Factory Photos Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredPhotos.map((photo: any, index: number) => {
            const fallbackSrc = photo.local_src || fallbackPhotos[index % fallbackPhotos.length];
            const photoSrc = photo.src || fallbackSrc;
            const photoTitle = isEn ? photo.title_en || photo.title_id : photo.title_id || photo.title_en;
            const photoCategory = isEn ? photo.category_en || photo.category_id : photo.category_id || photo.category_en;

            return (
              <div
                key={index}
                onClick={() => setActiveImage(photoSrc)}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-md group cursor-pointer aspect-[3/4] hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl hover:border-orange-300"
              >
                {/* HTML <img> tag with automatic failover fallback */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoSrc}
                  alt={photoTitle || "Arcacoal Factory Gallery"}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.getAttribute("data-failed")) {
                      target.setAttribute("data-failed", "true");
                      target.src = fallbackSrc;
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-md border border-white/50 text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F06B33]" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-orange-500/90 text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-wider mb-1 sm:mb-2 inline-block">
                    {photoCategory}
                  </span>
                  <h3 className="text-xs sm:text-base font-bold text-white leading-snug mb-0.5 sm:mb-1 line-clamp-2">
                    {photoTitle}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to Home & Contact Footer Actions */}
        <div className="mt-20 pt-10 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200/80 text-slate-800 text-sm font-bold shadow-2xs hover:border-orange-200 hover:text-[#F06B33] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("Back to Home", "Kembali ke Beranda")}</span>
          </Link>

          <Link
            href="/#contact"
            className="btn-dark-glossy inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-bold text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            <span>{t("Contact Us", "Hubungi Kami")}</span>
            <ChevronRight className="w-4 h-4 text-orange-400" />
          </Link>
        </div>
      </section>

      <Footer />

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt="Arcacoal Factory Photo HD"
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.getAttribute("data-failed")) {
                  target.setAttribute("data-failed", "true");
                  target.src = fallbackPhotos[0];
                }
              }}
            />

            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
