"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsTeaser() {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [productsData, setProductsData] = useState<any>({
    products_json: [
      {
        id: "shisha",
        number: "01.",
        title_en: "Shisha Charcoal Briquettes",
        title_id: "Briket Arang Shisha",
        subtitle_en: "(For shisha/Hookah)",
        subtitle_id: "(Khusus Shisha/Hookah)",
        image: "https://i.ibb.co/hxC2DtFs/fb5f29531ad5.png",
        local_src: "/products/shisha.png",
        description_en: "PT Arcadia Charcoal Indonesia is a leading exporter of high-quality charcoal briquettes, including coconut briquettes for shisha and hardwood briquettes for BBQ.",
        description_id: "PT Arcadia Charcoal Indonesia adalah eksportir terkemuka briket arang berkualitas tinggi, termasuk briket batok kelapa untuk shisha dan briket kayu keras untuk BBQ.",
        type: "Super Premium, Premium, Grade A & B",
      },
      {
        id: "bbq",
        number: "02.",
        title_en: "Hexagonal Hardwood BBQ Briquettes",
        title_id: "Briket Arang Kayu Keras Heksagonal BBQ",
        subtitle_en: "(For Restaurant & Outdoor Barbecue)",
        subtitle_id: "(Untuk BBQ Restoran & Outdoor)",
        image: "https://i.ibb.co/qY9zH4Fj/8334c98916e0.png",
        local_src: "/products/bbq.png",
        description_en: "Premium hexagonal charcoal briquettes engineered from 100% selected Indonesian hardwood timber. Designed with a central airflow hole.",
        description_id: "Briket arang heksagonal premium yang diproduksi dari 100% kayu keras Indonesia pilihan. Dirancang dengan lubang sirkulasi udara di tengah.",
        type: "Export Premium Grade A",
      },
      {
        id: "sawdust",
        number: "03.",
        title_en: "Extruded Sawdust Briquette Charcoal",
        title_id: "Batang Arang Briket Serbuk Gergaji",
        subtitle_en: "(For Gourmet BBQ & Korean/Japanese Grills)",
        subtitle_id: "(Untuk Yakiniku & BBQ Restoran)",
        image: "https://i.ibb.co/RGdJjjFk/feb06f775eae.png",
        local_src: "/products/sawdust.png",
        description_en: "High-density sawdust charcoal sticks compressed under extreme hydraulic pressure without chemical binders. Delivers an extended 4-5 hour burn.",
        description_id: "Batang arang serbuk gergaji berkerapatan tinggi yang dipres dengan tekanan hidrolik ekstrem tanpa bahan perekat kimia. Menghasilkan nyala 4-5 jam.",
        type: "Grade A Export Standard",
      },
      {
        id: "lump",
        number: "04.",
        title_en: "Natural Hardwood Lump Charcoal",
        title_id: "Arang Pecahan Kayu Keras Alami",
        subtitle_en: "(For Industrial & Traditional Grill House)",
        subtitle_id: "(Untuk Industri & Panggang Kayu Tradisional)",
        image: "https://i.ibb.co/FbXZ9yPv/052231c99e61.png",
        local_src: "/products/lump.png",
        description_en: "Natural lump charcoal carbonized in traditional earth kilns from sustainable Indonesian hardwood species such as Halaban, Sonokeling, and Tamarind.",
        description_id: "Arang pecahan kayu alami yang dibakar dalam tungku tradisional dari jenis kayu keras Indonesia berkelanjutan seperti Halaban dan Asam Jawa.",
        type: "Grade A Lump & Restaurant Grade",
      },
    ],
  });

  // Fetch live Products data directly from Neon PostgreSQL DB API
  useEffect(() => {
    async function loadProductsData() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && json.data) {
          setProductsData(json.data);
        }
      } catch (err) {
        console.error("Failed to load Products Teaser data from DB:", err);
      }
    }
    loadProductsData();
  }, []);

  // Limit Landing Page Teaser grid strictly to MAX 4 PRODUCTS as requested
  const productsList = Array.isArray(productsData.products_json)
    ? productsData.products_json.slice(0, 4)
    : [];

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
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="products" className="relative py-20 lg:py-32 bg-[#FCFCFC] overflow-hidden border-t border-slate-200/60">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#F06B33]" />
            <span className="text-xs font-bold tracking-widest text-[#F06B33] uppercase">
              {t("Indonesian Export Lineup", "Lini Produk Ekspor Indonesia")}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-4">
            {t("Our Charcoal", "Produk Arang")}{" "}
            <span className="text-[#F06B33]">{t("Products", "Unggulan Kami")}</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {t(
              "Manufactured from 100% natural raw materials for shisha lounges, culinary BBQ, and industrial markets.",
              "Diproduksi dari 100% bahan baku alami untuk shisha lounge, kuliner BBQ, dan pasar industri."
            )}
          </p>
        </motion.div>

        {/* 2-Column Side-by-Side Grid on Mobile, 4-Column on Desktop (STRICTLY MAX 4 ITEMS) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
        >
          {productsList.map((prod: any, index: number) => {
            const fallbackSrc = prod.local_src || `/products/${prod.id || 'shisha'}.png`;
            const imageSrc = prod.image || fallbackSrc;
            const title = isEn ? prod.title_en || prod.title_id : prod.title_id || prod.title_en;
            const subtitle = isEn ? prod.subtitle_en || prod.subtitle_id : prod.subtitle_id || prod.subtitle_en;
            const description = isEn ? prod.description_en || prod.description_id : prod.description_id || prod.description_en;
            const displaySrc = imageSrc.includes("i.ibb.co") ? `https://wsrv.nl/?url=${encodeURIComponent(imageSrc)}` : imageSrc;

            return (
              <motion.div
                key={prod.id || index}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-orange-300 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative w-full aspect-square bg-slate-50/80 rounded-xl sm:rounded-2xl p-2 sm:p-4 mb-3 sm:mb-6 flex items-center justify-center overflow-hidden border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={displaySrc}
                      alt={title || "Arcacoal Product"}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (!target.getAttribute("data-failed")) {
                          target.setAttribute("data-failed", "true");
                          target.src = fallbackSrc;
                        }
                      }}
                      className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-orange-500/90 text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider line-clamp-1 max-w-[85%]">
                      {prod.type || "EXPORT GRADE"}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm sm:text-xl font-black text-[#F06B33] font-mono">
                      {prod.number || `0${index + 1}.`}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-lg font-extrabold text-slate-950 tracking-tight mb-0.5 sm:mb-1 group-hover:text-[#F06B33] transition-colors leading-tight line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-500 italic mb-2 sm:mb-3 leading-tight line-clamp-1">
                    {subtitle}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-normal leading-relaxed line-clamp-3 mb-3 sm:mb-4">
                    {description}
                  </p>
                </div>

                <Link
                  href={`/products#${prod.id || ''}`}
                  className="mt-1 sm:mt-2 inline-flex items-center justify-between w-full py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-lg sm:rounded-xl bg-slate-50 hover:bg-orange-50 text-[11px] sm:text-xs font-bold text-slate-800 hover:text-[#F06B33] border border-slate-200/80 hover:border-orange-200 transition-all group/btn"
                >
                  <span>{t("View Specs", "Lihat Spesifikasi")}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Products Page CTA Button */}
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-full sm:w-auto px-2 sm:px-0"
          >
            <Link
              href="/products"
              className="btn-dark-glossy w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-base font-bold text-white rounded-xl shadow-xl transition-all duration-300 group"
            >
              <span>{t("Explore All Products & Specifications", "Jelajahi Semua Produk & Spesifikasi Lengkap")}</span>
              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
