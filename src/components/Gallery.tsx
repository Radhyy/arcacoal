"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Maximize2, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { lang, t } = useLanguage();

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
    header_subtitle_en: "Real production photos inside PT Arcadia Charcoal Indonesia's manufacturing & kiln facilities.",
    header_subtitle_id: "Foto asli dokumentasi aktivitas pabrik dan tungku produksi PT Arcadia Charcoal Indonesia.",
    btn_text_en: "View All Gallery",
    btn_text_id: "Lihat Semua Galeri",
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
        title_en: "Premium Briquette Inspection",
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

  const isEn = lang === "en";

  const photosList = Array.isArray(galleryData.photos_json) ? galleryData.photos_json : [];

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="gallery" className="relative py-20 lg:py-32 bg-[#FCFCFC] overflow-hidden border-t border-slate-200/60">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <span className="text-2xl sm:text-3xl font-black text-[#F06B33] font-mono">03.</span>
            <span className="px-3 sm:px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-[10px] sm:text-xs font-bold text-[#F06B33] uppercase tracking-widest whitespace-nowrap">
              {isEn ? galleryData.badge_en : galleryData.badge_id}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-4">
            {isEn ? galleryData.header_title_en : galleryData.header_title_id}<span className="text-[#F06B33]">.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {isEn ? galleryData.header_subtitle_en : galleryData.header_subtitle_id}
          </p>
        </motion.div>

        {/* 2-Column Side-by-Side Mobile Layout, 4-Column Desktop Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-12 sm:mb-16"
        >
          {photosList.map((photo: any, index: number) => {
            const fallbackSrc = photo.local_src || fallbackPhotos[index % fallbackPhotos.length];
            const photoSrc = photo.src || fallbackSrc;
            const photoTitle = isEn ? photo.title_en || photo.title_id : photo.title_id || photo.title_en;
            const photoCategory = isEn ? photo.category_en || photo.category_id : photo.category_id || photo.category_en;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={() => setActiveImage(photoSrc)}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-md shadow-slate-900/5 group cursor-pointer aspect-[3/4] hover:shadow-xl hover:border-orange-300"
              >
                {/* HTML <img> tag with automatic failover fallback if ImgBB SSL/network fails */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoSrc}
                  alt={photoTitle || "Arcacoal Gallery"}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.getAttribute("data-failed")) {
                      target.setAttribute("data-failed", "true");
                      target.src = fallbackSrc;
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />

                {/* Hover Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-75 sm:opacity-60 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

                {/* Top Zoom Icon */}
                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-md border border-white/50 text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90 pointer-events-none">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F06B33]" />
                </div>

                {/* Bottom Caption Box */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-orange-500/90 backdrop-blur-xs text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-wider mb-1 inline-block">
                    {photoCategory}
                  </span>
                  <h4 className="text-xs sm:text-base font-bold text-white leading-snug line-clamp-2">
                    {photoTitle}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Gallery Page CTA Button */}
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-full sm:w-auto px-2 sm:px-0"
          >
            <Link
              href="/gallery"
              className="btn-dark-glossy w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-base font-bold text-white rounded-xl shadow-xl transition-all duration-300 group"
            >
              <span>{isEn ? galleryData.btn_text_en : galleryData.btn_text_id}</span>
              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full max-h-[90vh] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage}
                alt="Arcacoal Production Gallery"
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
                className="absolute top-[#F06B33] right-3 sm:top-4 sm:right-4 p-2.5 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/30 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
