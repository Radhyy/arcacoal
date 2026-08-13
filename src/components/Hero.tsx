"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 sm:pt-32 pb-16 flex flex-col justify-center items-center bg-[#FCFCFC] overflow-hidden">
      {/* Wide Edge-to-Edge Parabolic Gradient Glow for Mobile & Desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none flex items-end justify-center z-0"
      >
        <svg
          className="w-[280%] sm:w-[160%] max-w-[2600px] h-full min-h-[700px] sm:min-h-[850px] -mb-10 sm:mb-0 scale-125 sm:scale-100 origin-bottom"
          viewBox="0 0 1400 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="shapeAiGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FCFCFC" stopOpacity="0" />
              <stop offset="35%" stopColor="#FFF0F1" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#FFE4E6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FCFCFC" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M -500 900 Q 700 -200 1900 900 Z"
            fill="url(#shapeAiGlow)"
          />
        </svg>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full text-center flex-1 flex flex-col items-center justify-center pt-2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* Main Headline (2 Clean Lines on Desktop) */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6 sm:mb-8 max-w-5xl px-1"
          >
            <span className="block">
              {t("Global Energy", "Energi Global")}{" "}
              <span className="text-[#E31E24]">{t("Powered by", "Didukung")}</span>
            </span>
            <span className="block mt-1 sm:mt-2">
              {t("Sustainable", "Arang Ramah")}{" "}
              <span className="text-[#E31E24]">{t("Charcoal", "Lingkungan")}</span>
            </span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed tracking-normal max-w-xl mx-auto mb-8 sm:mb-10 px-2 text-center"
          >
            {t(
              "Arcacoal manufactures 100% eco-friendly coconut shell briquettes engineered for Shisha, Hookah, and Industrial BBQ with superior heat output.",
              "Arcacoal memproduksi briket arang batok kelapa 100% ramah lingkungan khusus Shisha, Hookah, dan BBQ Industri dengan kalori panas tinggi."
            )}
          </motion.p>

          {/* Action Button & Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-7 sm:gap-8 w-full sm:w-auto"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full sm:w-auto px-4 sm:px-0"
            >
              <Link
                href="/products"
                className="btn-dark-glossy w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-semibold text-white rounded-xl shadow-xl transition-all duration-300 group"
              >
                <span>{t("View Products", "Lihat Produk")}</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={badgeVariants}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700 border-t border-slate-200/60 pt-6 mt-1 w-full"
            >
              <div className="flex items-center gap-2 hover:text-slate-900 transition-colors group">
                <ShieldCheck className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("ISO & Lab Tested Certified", "Tersertifikasi ISO & Uji Lab")}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-slate-900 transition-colors group">
                <Award className="w-4 h-4 text-[#E31E24] group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("100% Pure Coconut Shell", "100% Batok Kelapa Murni")}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-slate-900 transition-colors group">
                <Globe className="w-4 h-4 text-red-700 group-hover:scale-110 transition-transform shrink-0" />
                <span>{t("Direct Shipments From Indonesia", "Pengiriman Langsung Dari Indonesia")}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
