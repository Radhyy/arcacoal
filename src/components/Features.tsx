"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Features() {
  const { lang } = useLanguage();

  const [featuresData, setFeaturesData] = useState<any>({
    badge_en: "Why Choose Arcacoal",
    badge_id: "Mengapa Memilih Arcacoal",
    header_title_en: "Natural & Eco-Friendly Excellence",
    header_title_id: "Keunggulan Alami & Ramah Lingkungan",
    header_subtitle_en: "Engineered from pure raw coconut shells to guarantee clean combustion and international compliance.",
    header_subtitle_id: "Dirancang dari batok kelapa murni untuk menjamin pembakaran bersih dan standar internasional.",
    item_number: "01.",
    item_title_en: "Natural & Eco-Friendly Product",
    item_title_id: "Produk Alami & Ramah Lingkungan",
    item_subtitle_en: "100% Pure Raw Materials Without Chemical Additives",
    item_subtitle_id: "100% Bahan Baku Murni Tanpa Bahan Kimia Tambahan",
    item_description_en: "Our charcoal products are made entirely from natural raw materials such as coconut shells and without any chemical additives. We are committed to environmentally responsible practices, ensuring that every briquette you receive is sustainable, safe, and biodegradable. Perfect for customers who prioritize both quality and eco-conscious sourcing.",
    item_description_id: "Produk arang kami terbuat sepenuhnya dari bahan baku alami seperti batok kelapa tanpa bahan kimia tambahan. Kami berkomitmen pada praktik ramah lingkungan, memastikan setiap briket yang Anda terima berkelanjutan, aman, dan dapat terurai secara alami. Sangat cocok bagi pelanggan yang mengutamakan kualitas sekaligus kepedulian lingkungan.",
    badge1_en: "100% Natural Coconut Shell",
    badge1_id: "100% Batok Kelapa Murni Alami",
    badge2_en: "Zero Chemical Additives",
    badge2_id: "Bebas Bahan Kimia Tambahan",
    badge3_en: "100% Biodegradable",
    badge3_id: "100% Dapat Terurai Alami",
    badge4_en: "Sustainable Eco Sourcing",
    badge4_id: "Pasokan Ramah Lingkungan",
  });

  // Fetch live content from Neon PostgreSQL DB API
  useEffect(() => {
    async function loadFeaturesData() {
      try {
        const res = await fetch("/api/features");
        const json = await res.json();
        if (json.success && json.data) {
          setFeaturesData(json.data);
        }
      } catch (err) {
        console.error("Failed to load Features data from DB:", err);
      }
    }
    loadFeaturesData();
  }, []);

  const isEn = lang === "en";

  const item = {
    number: featuresData.item_number || "01.",
    title: isEn ? featuresData.item_title_en : featuresData.item_title_id,
    subtitle: isEn ? featuresData.item_subtitle_en : featuresData.item_subtitle_id,
    description: isEn ? featuresData.item_description_en : featuresData.item_description_id,
    badges: [
      isEn ? featuresData.badge1_en : featuresData.badge1_id,
      isEn ? featuresData.badge2_en : featuresData.badge2_id,
      isEn ? featuresData.badge3_en : featuresData.badge3_id,
      isEn ? featuresData.badge4_en : featuresData.badge4_id,
    ],
    image: "/CoalSection1.png",
  };

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

  const leftColVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
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

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="specs" className="relative py-20 lg:py-28 bg-[#FCFCFC] overflow-hidden border-t border-slate-100">
      {/* Background Accent Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-red-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#E31E24]" />
            <span className="text-xs font-bold tracking-widest text-[#E31E24] uppercase">
              {isEn ? featuresData.badge_en : featuresData.badge_id}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.18] mb-4">
            {isEn ? featuresData.header_title_en : featuresData.header_title_id}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {isEn ? featuresData.header_subtitle_en : featuresData.header_subtitle_id}
          </p>
        </motion.div>

        {/* Minimalist Editorial Block */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Content Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={leftColVariants}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <motion.div variants={childVariants} className="flex items-center gap-3 mb-4">
              <span className="text-3xl sm:text-4xl font-black text-[#E31E24] font-mono">
                {item.number}
              </span>
            </motion.div>

            <motion.h3 variants={childVariants} className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              {item.title}
            </motion.h3>

            <motion.p variants={childVariants} className="text-sm font-semibold text-slate-500 mb-6">
              {item.subtitle}
            </motion.p>

            <motion.p variants={childVariants} className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8">
              {item.description}
            </motion.p>

            {/* Feature Check Grid */}
            <motion.div variants={childVariants} className="grid sm:grid-cols-2 gap-3.5 w-full pt-4 border-t border-slate-200/70">
              {item.badges.map((badge, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2.5 group">
                  <CheckCircle2 className="w-4 h-4 text-[#E31E24] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-slate-800">{badge}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Transparent Charcoal Image with Floating Organic Stamp Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg p-2">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={500}
                unoptimized
                className="w-full h-auto object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />

              {/* Floating & Tilted Organic Stamp Logo */}
              <motion.div
                animate={{ y: [0, -7, 0], rotate: [12, 14, 12] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="absolute bottom-12 sm:bottom-16 right-0 sm:-right-2 cursor-pointer"
              >
                <Image
                  src="/GuaranteeOrganicIngredients.png"
                  alt="Guarantee Organic Ingredients Badge"
                  width={160}
                  height={160}
                  unoptimized
                  className="w-28 sm:w-36 h-auto object-contain filter drop-shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
