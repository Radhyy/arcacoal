"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function OemExperience() {
  const { lang } = useLanguage();

  const [oemData, setOemData] = useState<any>({
    title_en: "THE OEM EXPERIENCE",
    title_id: "LAYANAN OEM KHUSUS",
    description_en: "Take your brand to the next level with our OEM services. From custom product shapes and compositions to private labels and packaging, we create solutions tailored to your unique needs, for a fraction of the cost.",
    description_id: "Tingkatkan merk Anda ke tingkat berikutnya dengan layanan OEM private label kami. Mulai dari bentuk dan komposisi khusus hingga kemasan bermerk sendiri, kami ciptakan solusi sesuai kebutuhan bisnis Anda.",
    link_text_en: "Our OEM solutions.",
    link_text_id: "Solusi OEM kami.",

    p1_title_en: "Packaging",
    p1_title_id: "Kemasan Khusus",
    p1_desc_en: "Handling your packaging designs pre-shipping.",
    p1_desc_id: "Memproses desain kemasan cetak Anda sebelum pengiriman.",

    p2_title_en: "Branding",
    p2_title_id: "Branding Merk",
    p2_desc_en: "Showcase your unique brand with personalized labels and logos.",
    p2_desc_id: "Tampilkan merk unik Anda dengan label dan logo khusus kustom.",

    p3_title_en: "Products",
    p3_title_id: "Bentuk Produk",
    p3_desc_en: "Customize product shapes, sizes, and compositions to your specific needs.",
    p3_desc_id: "Kustomisasi bentuk, ukuran kubus/stick, dan komposisi arang sesuai kebutuhan.",

    p4_title_en: "End-to-End",
    p4_title_id: "Layanan Ujung ke Ujung",
    p4_desc_en: "From concept to delivery, we handle every detail to ensure your satisfaction.",
    p4_desc_id: "Dari konsep desain hingga pengiriman pelabuhan, kami tangani secara profesional.",
  });

  // Fetch live content from Neon PostgreSQL DB API
  useEffect(() => {
    async function loadOemData() {
      try {
        const res = await fetch("/api/oem");
        const json = await res.json();
        if (json.success && json.data) {
          setOemData(json.data);
        }
      } catch (err) {
        console.error("Failed to load OEM data from DB:", err);
      }
    }
    loadOemData();
  }, []);

  const isEn = lang === "en";

  const oemPillars = [
    {
      title: isEn ? oemData.p1_title_en : oemData.p1_title_id,
      description: isEn ? oemData.p1_desc_en : oemData.p1_desc_id,
    },
    {
      title: isEn ? oemData.p2_title_en : oemData.p2_title_id,
      description: isEn ? oemData.p2_desc_en : oemData.p2_desc_id,
    },
    {
      title: isEn ? oemData.p3_title_en : oemData.p3_title_id,
      description: isEn ? oemData.p3_desc_en : oemData.p3_desc_id,
    },
    {
      title: isEn ? oemData.p4_title_en : oemData.p4_title_id,
      description: isEn ? oemData.p4_desc_en : oemData.p4_desc_id,
    },
  ];

  const rightColVariants: Variants = {
    hidden: { opacity: 0, x: 35 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="oem" className="relative py-24 lg:py-32 bg-[#FCFCFC] overflow-hidden border-t border-slate-200/60">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Transparent Packaging Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -35 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-full max-w-lg p-2"
            >
            {(() => {
              const rawUrl = oemData.image_url || "https://i.ibb.co/0ydKbDLW/ebf20bdebb38.png";
              const displaySrc = rawUrl.includes("i.ibb.co") ? `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}` : rawUrl;
              return (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={displaySrc}
                  alt="Arcacoal OEM Charcoal Packaging Services"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.getAttribute("data-failed")) {
                      target.setAttribute("data-failed", "true");
                      target.src = "/oem_product.png";
                    }
                  }}
                  className="w-full h-auto object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500 max-w-lg"
                />
              );
            })()}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightColVariants}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Headline */}
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.12] mb-6 uppercase">
              {isEn ? oemData.title_en : oemData.title_id}
            </motion.h2>

            {/* Subtitle Paragraph */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-10">
              {isEn ? oemData.description_en : oemData.description_id}{" "}
              <Link href="#contact" className="text-[#F06B33] font-semibold underline underline-offset-4 hover:text-orange-600 transition-colors">
                {isEn ? oemData.link_text_en : oemData.link_text_id}
              </Link>
            </motion.p>

            {/* 2x2 Feature Pillars Grid */}
            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-8 w-full border-t border-slate-200/80 pt-8">
              {oemPillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="flex flex-col items-start group cursor-pointer"
                >
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#F06B33] tracking-tight mb-2 group-hover:translate-x-1 transition-transform">
                    {pillar.title}
                  </h3>
                  <p className="text-base text-slate-600 font-normal leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
