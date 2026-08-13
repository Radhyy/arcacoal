"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function PerformanceHighlights() {
  const { lang } = useLanguage();

  const [perfData, setPerfData] = useState<any>({
    badge_en: "Export Grade Performance",
    badge_id: "Performa Standar Ekspor",
    header_title_en: "Performance Highlight",
    header_title_id: "Keunggulan Performa",
    header_subtitle_en: "Odorless • Long Burning Time • Low Ash • High Heat",
    header_subtitle_id: "Tanpa Bau • Nyala Tahan Lama • Abu Minimal • Panas Tinggi",

    item1_title_en: "ODORLESS",
    item1_title_id: "TANPA BAU",
    item1_badge_en: "Pure Flavor Protection",
    item1_badge_id: "Perlindungan Rasa Murni",
    item1_desc_en: "Burns without releasing any unpleasant odors, making it ideal for shisha lounges, indoor BBQs, and culinary settings where purity of flavor is essential.",
    item1_desc_id: "Bakar tanpa bau yang tidak sedap, sangat ideal untuk shisha lounge, indoor BBQ, dan restoran kuliner yang mengutamakan kemurnian rasa.",

    item2_title_en: "LOW ASH",
    item2_title_id: "ABU SEDIKIT",
    item2_badge_en: "< 2.5% Natural White Ash",
    item2_badge_id: "< 2.5% Abu Putih Alami",
    item2_desc_en: "Leaves behind minimal ash after burning, ensuring a cleaner experience and less frequent maintenance. This feature is especially valuable for restaurants & shisha lounges.",
    item2_desc_id: "Menyisakan abu minimal setelah pembakaran, memastikan penggunaan yang lebih bersih dan pembersihan yang lebih jarang.",

    item3_title_en: "LONG BURNING TIME",
    item3_title_id: "NYALA TAHAN LAMA",
    item3_badge_en: "2.5+ Hours Extended Burn",
    item3_badge_id: "Nyala 2.5+ Jam Tahan Lama",
    item3_desc_en: "Our charcoal is engineered to deliver an extended burn duration, making it ideal for long sessions—whether you're grilling outdoors or enjoying a smooth shisha experience.",
    item3_desc_id: "Arang kami dirancang untuk menghasilkan durasi pembakaran yang lebih lama, ideal untuk sesi panjang BBQ maupun shisha.",

    item4_title_en: "HIGH HEAT",
    item4_title_id: "PANAS TINGGI",
    item4_badge_en: "> 7,500 Kcal/kg Calorific Value",
    item4_badge_id: "Kalori > 7.500 Kcal/kg",
    item4_desc_en: "Engineered to generate intense thermal output, this charcoal type reaches optimal temperatures quickly and maintains them steadily.",
    item4_desc_id: "Dirancang untuk menghasilkan output panas tinggi secara cepat dan menjaga suhu optimal tetap stabil secara konsisten.",
  });

  // Fetch live content from Neon PostgreSQL DB API
  useEffect(() => {
    async function loadPerfData() {
      try {
        const res = await fetch("/api/performance");
        const json = await res.json();
        if (json.success && json.data) {
          setPerfData(json.data);
        }
      } catch (err) {
        console.error("Failed to load Performance data from DB:", err);
      }
    }
    loadPerfData();
  }, []);

  const isEn = lang === "en";

  const highlights = [
    {
      title: isEn ? perfData.item1_title_en : perfData.item1_title_id,
      badge: isEn ? perfData.item1_badge_en : perfData.item1_badge_id,
      description: isEn ? perfData.item1_desc_en : perfData.item1_desc_id,
      icon: "/iconsection2/1.png",
    },
    {
      title: isEn ? perfData.item2_title_en : perfData.item2_title_id,
      badge: isEn ? perfData.item2_badge_en : perfData.item2_badge_id,
      description: isEn ? perfData.item2_desc_en : perfData.item2_desc_id,
      icon: "/iconsection2/2.png",
    },
    {
      title: isEn ? perfData.item3_title_en : perfData.item3_title_id,
      badge: isEn ? perfData.item3_badge_en : perfData.item3_badge_id,
      description: isEn ? perfData.item3_desc_en : perfData.item3_desc_id,
      icon: "/iconsection2/3.png",
    },
    {
      title: isEn ? perfData.item4_title_en : perfData.item4_title_id,
      badge: isEn ? perfData.item4_badge_en : perfData.item4_badge_id,
      description: isEn ? perfData.item4_desc_en : perfData.item4_desc_id,
      icon: "/iconsection2/4.png",
    },
  ];

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
    hidden: { opacity: 0, y: 35, scale: 0.96 },
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
    <section id="performance" className="relative py-24 lg:py-32 bg-[#FCFCFC] overflow-hidden border-t border-slate-200/60">
      {/* Ambient Accent Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-orange-100/30 via-amber-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-black text-[#F06B33] font-mono">02.</span>
            <span className="px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-xs font-bold text-[#F06B33] uppercase tracking-widest">
              {isEn ? perfData.badge_en : perfData.badge_id}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-4">
            {isEn ? perfData.header_title_en : perfData.header_title_id}<span className="text-[#F06B33]">.</span>
          </h2>

          <p className="text-sm sm:text-base font-bold text-slate-600 tracking-wider uppercase">
            {isEn ? perfData.header_subtitle_en : perfData.header_subtitle_id}
          </p>
        </motion.div>

        {/* 4 Performance Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridVariants}
          className="grid md:grid-cols-2 gap-8 lg:gap-10"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/5 transition-colors duration-300 group relative overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F06B33] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Top Icon & Badge Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-orange-50/50 border border-orange-100 group-hover:scale-110 group-hover:bg-orange-100/60 transition-all duration-300 flex items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={64}
                      height={64}
                      unoptimized
                      className="w-14 h-14 object-contain group-hover:rotate-6 transition-transform duration-300"
                    />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 group-hover:border-orange-200 group-hover:text-slate-900 transition-colors">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mb-4 group-hover:text-[#F06B33] transition-colors">
                  {item.title}
                </h3>

                {/* Description Copy */}
                <p className="text-base text-slate-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
