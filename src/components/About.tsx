"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t, lang } = useLanguage();

  // About Content State with Default Fallbacks
  const [aboutData, setAboutData] = useState<any>({
    badge_en: "About PT Arcadia Charcoal Indonesia",
    badge_id: "Tentang PT Arcadia Charcoal Indonesia",
    title_en: "Exporting Indonesia's Finest",
    title_id: "Mengekspor Briket Arang Terbaik",
    subtitle_en: "Bridging pure Indonesian natural resources with international quality standards.",
    subtitle_id: "Menghubungkan kekayaan alam murni Indonesia dengan standar kualitas internasional.",
    company_name: "PT Arcadia Charcoal Indonesia",
    paragraph1_en: "is a leading exporter of high-quality charcoal briquettes, including coconut briquettes for shisha and hardwood briquettes for BBQ. We use pure coconut sourced from various regions of Indonesia, along with top-grade hardwood, to ensure that the products we produce meet international standards.",
    paragraph1_id: "adalah eksportir terkemuka briket arang berkualitas tinggi, termasuk briket batok kelapa untuk shisha dan briket kayu keras untuk BBQ. Kami menggunakan kelapa murni yang bersumber dari berbagai wilayah Indonesia, dipadukan dengan kayu keras berkualitas tinggi, untuk memastikan produk yang kami hasilkan memenuhi standar internasional.",
    paragraph2_en: "We are committed to continuous innovation in all of our products and services. Supported by a vast network of factories and efficient distribution through Indonesia's main ports, we are ready to meet the global market's needs.",
    paragraph2_id: "Kami berkomitmen untuk terus berinovasi dalam setiap produk dan layanan kami. Didukung oleh jaringan pabrik yang luas dan distribusi efisien melalui pelabuhan-pelabuhan utama di Indonesia, kami siap memenuhi kebutuhan pasar global.",
    quote_en: "We invite you to establish mutually beneficial partnerships with us, working together to enhance the quality and expand the reach of Indonesian products worldwide.",
    quote_id: "Kami mengundang Anda untuk menjalin kemitraan yang saling menguntungkan bersama kami, bekerja sama meningkatkan kualitas dan memperluas jangkauan produk Indonesia di seluruh dunia.",
    bullet1_en: "Pure Coconut & Top-Grade Hardwood Sourcing",
    bullet1_id: "Bahan Batok Kelapa Murni & Kayu Keras Pilihan",
    bullet2_en: "Integrated Factory Network Across Indonesia",
    bullet2_id: "Jaringan Pabrik Terintegrasi di Seluruh Indonesia",
    bullet3_en: "Direct Export Shipping via Main Sea Ports",
    bullet3_id: "Pengiriman Ekspor Langsung Melalui Pelabuhan Utama",
  });

  // Fetch Live Content from Neon PostgreSQL API
  useEffect(() => {
    async function loadAboutData() {
      try {
        const res = await fetch("/api/about");
        const json = await res.json();
        if (json.success && json.data) {
          setAboutData(json.data);
        }
      } catch (err) {
        console.error("Failed to load About content from DB:", err);
      }
    }
    loadAboutData();
  }, []);

  const isEn = lang === "en";

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
      },
    },
  };

  const rightColVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#FCFCFC] overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#E31E24]" />
            <span className="text-xs font-bold tracking-widest text-[#E31E24] uppercase">
              {isEn ? aboutData.badge_en : aboutData.badge_id}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.18] mb-4">
            {isEn ? aboutData.title_en : aboutData.title_id}{" "}
            <span className="text-[#E31E24]">
              {isEn ? "Charcoal Briquettes" : "Dari Indonesia"}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {isEn ? aboutData.subtitle_en : aboutData.subtitle_id}
          </p>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={leftColVariants}
            className="lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-md py-4 flex items-center justify-center lg:justify-start"
            >
              <Image
                src={aboutData.logo_url || "/logo3.png"}
                alt="PT Arcadia Charcoal Indonesia Official Industry Logo"
                width={480}
                height={260}
                unoptimized
                className="w-full max-w-sm sm:max-w-md h-auto object-contain filter drop-shadow-sm"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.getAttribute("data-failed")) {
                    target.setAttribute("data-failed", "true");
                    target.src = "/logo3.png";
                  }
                }}
              />
            </motion.div>

            {/* Fact Highlights */}
            <div className="mt-8 space-y-3.5 w-full max-w-md border-t border-slate-200/70 pt-6">
              {[
                isEn ? aboutData.bullet1_en : aboutData.bullet1_id,
                isEn ? aboutData.bullet2_en : aboutData.bullet2_id,
                isEn ? aboutData.bullet3_en : aboutData.bullet3_id,
              ].map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#E31E24] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-slate-800">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightColVariants}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <motion.h3
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6 tracking-tight"
            >
              {aboutData.company_name}
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-6"
            >
              <strong className="font-semibold text-slate-900">{aboutData.company_name}</strong>{" "}
              {isEn ? aboutData.paragraph1_en : aboutData.paragraph1_id}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8"
            >
              {isEn ? aboutData.paragraph2_en : aboutData.paragraph2_id}
            </motion.p>

            {/* Partnership Quote */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="pl-6 border-l-4 border-[#E31E24] py-3 my-2 bg-red-50/40 rounded-r-2xl shadow-2xs transition-all"
            >
              <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed italic">
                &ldquo;{isEn ? aboutData.quote_en : aboutData.quote_id}&rdquo;
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 pt-4">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <a
                  href="https://wa.me/6282227130022?text=Hello%20Arcacoal,%20I%20want%20to%20inquire%20about%20your%20charcoal%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark-glossy inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white rounded-xl shadow-lg transition-all group"
                >
                  <span>{t("Contact Us", "Hubungi Kami")}</span>
                  <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
