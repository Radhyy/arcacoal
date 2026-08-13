"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, FileText, CheckCircle2, Maximize2, X, MessageSquare, Info, Globe } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Legality() {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const { lang, t } = useLanguage();

  const [legalityData, setLegalityData] = useState<any>({
    badge_en: "VERIFIED COMPLIANCE & EXPORT",
    badge_id: "LEGALITAS RESMI & EKSPOR TERVERIFIKASI",
    header_title_en: "Company Legality & Export Document",
    header_title_id: "Legalitas Perusahaan & Dokumen Ekspor",
    header_subtitle_en: "We are a legally established company in Indonesia, fully compliant with national regulations for secure global export.",
    header_subtitle_id: "Kami adalah perusahaan yang berdiri sah secara hukum di Indonesia dan memenuhi seluruh regulasi nasional untuk pengiriman ekspor aman.",

    paragraph_en: "We are a legally established company in Indonesia, fully compliant with all national regulations. Our company operates with official legal documentation to ensure smooth, transparent, and secure export activities worldwide.",
    paragraph_id: "Kami adalah perusahaan berbadan hukum resmi di Indonesia yang mematuhi seluruh regulasi nasional. Perusahaan kami beroperasi dengan dokumentasi legal resmi untuk menjamin kegiatan ekspor yang lancar, transparan, dan aman ke seluruh dunia.",

    nib_title_en: "Business Identification Number (NIB)",
    nib_title_id: "Nomor Induk Berusaha (NIB)",
    nib_sub_en: "Official Indonesian Government Trade License",
    nib_sub_id: "Izin Usaha Perdagangan Resmi Pemerintah Indonesia",

    npwp_title_en: "Tax Identification Number (NPWP)",
    npwp_title_id: "Nomor Pokok Wajib Pajak (NPWP)",
    npwp_sub_en: "Registered Indonesian Corporate Taxpayer ID",
    npwp_sub_id: "Identitas Pajak Badan Usaha Resmi Indonesia",

    dest_text_en: "We provide a full package of export documents to bring your coconut charcoal briquettes for shisha to the USA, Germany, Canada, Russia, Turkey, and Australia.",
    dest_text_id: "Kami menyediakan paket dokumen ekspor lengkap untuk pengiriman briket arang kelapa shisha Anda ke Amerika Serikat, Jerman, Kanada, Rusia, Turki, dan Australia.",

    note_text_en: "We are a factory and cannot do customs clearance in your country, but we can recommend a trusted customs broker if you need assistance.",
    note_text_id: "Kami adalah pabrik produsen dan tidak melakukan customs clearance di negara tujuan Anda, namun kami dapat merekomendasikan agen bea cukai terpercaya jika diperlukan.",

    box_title_en: "Comprehensive Export Document Package",
    box_title_id: "Paket Dokumen Ekspor Lengkap",
    box_sub_en: "We prepare complete shipping documentation tailored to your destination port requirements.",
    box_sub_id: "Kami menyiapkan dokumentasi pengiriman lengkap sesuai persyaratan pelabuhan tujuan Anda.",

    std_doc_title_en: "Standard Shipping Documents",
    std_doc_title_id: "Dokumen Standar Pengiriman",
    add_doc_title_en: "Additional Compliance Docs",
    add_doc_title_id: "Dokumen Tambahan Sesuai Negara",

    footer_text_en: "Have specific document requirements for your country? Talk to our export compliance team.",
    footer_text_id: "Punya kebutuhan dokumen khusus untuk negara Anda? Konsultasikan dengan tim ekspor kami.",

    btn_text_en: "Ask Us About Export Documents",
    btn_text_id: "Tanyakan Dokumen Ekspor",

    standard_docs_json: [
      { id: "Bill of Lading (Original or Telex Released)", en: "Bill of Lading (Original or Telex Released)" },
      { id: "Faktur Komersial (Commercial Invoice)", en: "Commercial Invoice" },
      { id: "Daftar Kemasan (Packing List)", en: "Packing List" },
      { id: "Surat Keterangan Asal (COO)", en: "Certificate of Origin (COO)" },
      { id: "Pemberitahuan Ekspor Barang (PEB)", en: "Export Declaration (PEB)" },
    ],
    additional_docs_json: [
      { id: "Self Heating Test (SHT)", en: "Self Heating Test (SHT)" },
      { id: "Result of Analysis (ROA)", en: "Result of Analysis (ROA)" },
      { id: "Factory Audit (FA)", en: "Factory Audit (FA)" },
      { id: "Manufacturer Declaration", en: "Manufacturer Declaration" },
      { id: "Material Safety Data Sheet (MSDS)", en: "Material Safety Data Sheet (MSDS)" },
      { id: "Weathering Report", en: "Weathering Report" },
      { id: "Vanning Certificate", en: "Vanning Certificate" },
      { id: "Fumigation Certificate", en: "Fumigation Certificate" },
      { id: "Phytosanitary Certificate", en: "Phytosanitary Certificate" },
      { id: "Formulir ISF (untuk pengiriman AS)", en: "ISF Form (for US shipments)" },
    ],
  });

  // Fetch live content from Neon PostgreSQL DB API
  useEffect(() => {
    async function loadLegalityData() {
      try {
        const res = await fetch("/api/legality");
        const json = await res.json();
        if (json.success && json.data) {
          setLegalityData(json.data);
        }
      } catch (err) {
        console.error("Failed to load Legality data from DB:", err);
      }
    }
    loadLegalityData();
  }, []);

  const isEn = lang === "en";

  const nibRawUrl = legalityData.nib_image_url || "https://i.ibb.co/1YM69QWV/f888812aba50.png";
  const npwpRawUrl = legalityData.npwp_image_url || "https://i.ibb.co/MDGtXBCm/9917de3fdd30.png";

  const legalDocs = [
    {
      src: nibRawUrl.includes("i.ibb.co") ? `https://wsrv.nl/?url=${encodeURIComponent(nibRawUrl)}` : nibRawUrl,
      fallbackSrc: "/legalitas1.png",
      title: isEn ? legalityData.nib_title_en : legalityData.nib_title_id,
      subtitle: isEn ? legalityData.nib_sub_en : legalityData.nib_sub_id,
    },
    {
      src: npwpRawUrl.includes("i.ibb.co") ? `https://wsrv.nl/?url=${encodeURIComponent(npwpRawUrl)}` : npwpRawUrl,
      fallbackSrc: "/legalitas2.png",
      title: isEn ? legalityData.npwp_title_en : legalityData.npwp_title_id,
      subtitle: isEn ? legalityData.npwp_sub_en : legalityData.npwp_sub_id,
    },
  ];

  const stdDocsList = Array.isArray(legalityData.standard_docs_json)
    ? legalityData.standard_docs_json.map((item: any) => (isEn ? item.en : item.id))
    : [
        t("Bill of Lading (Original or Telex Released)", "Bill of Lading (Original / Telex Release)"),
        t("Commercial Invoice", "Faktur Komersial (Commercial Invoice)"),
        t("Packing List", "Daftar Kemasan (Packing List)"),
        t("Certificate of Origin (COO)", "Surat Keterangan Asal (COO)"),
        t("Export Declaration (PEB)", "Pemberitahuan Ekspor Barang (PEB)"),
      ];

  const addDocsList = Array.isArray(legalityData.additional_docs_json)
    ? legalityData.additional_docs_json.map((item: any) => (isEn ? item.en : item.id))
    : [
        "Self Heating Test (SHT)",
        "Result of Analysis (ROA)",
        "Factory Audit (FA)",
        "Manufacturer Declaration",
        "Material Safety Data Sheet (MSDS)",
        "Weathering Report",
        "Vanning Certificate",
        "Fumigation Certificate",
        "Phytosanitary Certificate",
        "ISF Form (for US shipments)",
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

  const childVariants: Variants = {
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
    <section id="legality" className="relative py-20 lg:py-32 bg-[#FCFCFC] overflow-hidden border-t border-slate-200/60">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-red-100/20 rounded-full blur-3xl pointer-events-none" />

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
            <span className="text-2xl sm:text-3xl font-black text-[#E31E24] font-mono">04.</span>
            <span className="px-3 sm:px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-[10px] sm:text-xs font-bold text-[#E31E24] uppercase tracking-widest whitespace-nowrap">
              {isEn ? legalityData.badge_en : legalityData.badge_id}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-4">
            {isEn ? legalityData.header_title_en : legalityData.header_title_id}<span className="text-[#E31E24]">.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {isEn ? legalityData.header_subtitle_en : legalityData.header_subtitle_id}
          </p>
        </motion.div>

        {/* Top 2-Column */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 lg:mb-20">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={leftColVariants}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <motion.p variants={childVariants} className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8">
              {isEn ? legalityData.paragraph_en : legalityData.paragraph_id}
            </motion.p>

            {/* Registration Badges */}
            <motion.div variants={childVariants} className="space-y-4 w-full mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-red-50 text-[#E31E24] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-950">{isEn ? legalityData.nib_title_en : legalityData.nib_title_id}</h4>
                  <p className="text-xs text-slate-500 font-medium">{isEn ? legalityData.nib_sub_en : legalityData.nib_sub_id}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-950">{isEn ? legalityData.npwp_title_en : legalityData.npwp_title_id}</h4>
                  <p className="text-xs text-slate-500 font-medium">{isEn ? legalityData.npwp_sub_en : legalityData.npwp_sub_id}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Destinations */}
            <motion.p variants={childVariants} className="text-sm text-slate-600 font-normal leading-relaxed mb-4">
              {isEn ? legalityData.dest_text_en : legalityData.dest_text_id}
            </motion.p>

            {/* Disclaimer Callout Box */}
            <motion.div variants={childVariants} className="p-4 sm:p-5 rounded-2xl bg-slate-100/90 border border-slate-200/80 flex items-start gap-3 w-full">
              <Info className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                <strong>{t("Note:", "Catatan:")}</strong>{" "}
                {isEn ? legalityData.note_text_en : legalityData.note_text_id}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: 2-Column Side-by-Side Mobile Layout for NIB & NPWP */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightColVariants}
            className="lg:col-span-6 grid grid-cols-2 gap-3.5 sm:gap-6"
          >
            {legalDocs.map((doc, index) => (
              <motion.div
                key={index}
                variants={childVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={() => setActiveDoc(doc.src)}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-lg group cursor-pointer aspect-[3/4] hover:shadow-2xl hover:border-red-300 flex flex-col justify-between p-2 sm:p-3"
              >
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden w-full h-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={doc.src}
                    alt={doc.title}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.getAttribute("data-failed")) {
                        target.setAttribute("data-failed", "true");
                        target.src = doc.fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-contain object-center p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-2 sm:p-3 rounded-full bg-white/90 text-slate-900 shadow-lg">
                      <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E31E24]" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 px-1">
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-950 line-clamp-1">{doc.title}</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium line-clamp-1">{doc.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
          className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-900/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-[#E31E24] to-red-600" />

          <div className="max-w-3xl mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2 sm:mb-3">
              {isEn ? legalityData.box_title_en : legalityData.box_title_id}
            </h3>
            <p className="text-xs sm:text-base text-slate-600 font-normal leading-relaxed">
              {isEn ? legalityData.box_sub_en : legalityData.box_sub_id}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 mb-8 sm:mb-10">
            {/* Standard Documents Column */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-950 mb-3 sm:mb-4 pb-2 border-b border-slate-200/70 flex items-center gap-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#E31E24]" />
                <span>{isEn ? (legalityData.std_doc_title_en || "Standard Shipping Documents") : (legalityData.std_doc_title_id || "Dokumen Standar Pengiriman")}</span>
              </h4>

              <ul className="space-y-2.5 sm:space-y-3">
                {stdDocsList.map((doc: string, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                    className="flex items-center gap-2.5 sm:gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{doc}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Additional Documents Column */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-950 mb-3 sm:mb-4 pb-2 border-b border-slate-200/70 flex items-center gap-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#E31E24]" />
                <span>{isEn ? (legalityData.add_doc_title_en || "Additional Compliance Docs") : (legalityData.add_doc_title_id || "Dokumen Tambahan Sesuai Negara")}</span>
              </h4>

              <ul className="space-y-2 sm:space-y-2.5">
                {addDocsList.map((doc: string, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04, duration: 0.5 }}
                    className="flex items-center gap-2.5 sm:gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E31E24] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{doc}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-medium text-center sm:text-left">
              {isEn ? legalityData.footer_text_en : legalityData.footer_text_id}
            </p>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="https://wa.me/6282227130022?text=Hello%20Arcacoal,%20I%20want%20to%20ask%20about%20export%20documents."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto shrink-0 btn-dark-glossy inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-white rounded-xl shadow-lg transition-transform"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{isEn ? legalityData.btn_text_en : legalityData.btn_text_id}</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDoc(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-3xl w-full max-h-[90vh] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white p-3 sm:p-4"
            >
              <Image
                src={activeDoc}
                alt="Official Arcacoal Legal Document"
                fill
                className="object-contain p-2 sm:p-4"
              />

              <button
                onClick={() => setActiveDoc(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white backdrop-blur-md border border-white/30 transition-colors"
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
