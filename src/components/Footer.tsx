"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.12,
      },
    },
  };

  const colVariants: Variants = {
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
    <footer id="contact" className="relative bg-slate-950 text-white pt-16 pb-12 overflow-hidden border-t border-slate-900">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-[#E31E24]/10 via-red-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/* Footer Navigation Columns */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800"
        >
          {/* Column 1: /logo.png Enlarged Logo */}
          <motion.div variants={colVariants} className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-6">
            <Link href="/" className="inline-flex items-center group mb-6">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Image
                  src="/logo.png"
                  alt="Arcacoal Logo"
                  width={240}
                  height={80}
                  unoptimized
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </motion.div>
            </Link>

            <p className="text-slate-400 text-sm font-normal leading-relaxed mb-6">
              <strong className="text-slate-200">PT Arcadia Charcoal Indonesia</strong>{" "}
              {t(
                "is a leading manufacturer and exporter of 100% natural coconut shell briquettes for shisha and hardwood charcoal for BBQ, delivering premium quality from Indonesia to global markets.",
                "adalah produsen dan eksportir terkemuka briket arang batok kelapa 100% murni untuk shisha dan arang kayu keras untuk BBQ, mengantarkan kualitas terbaik Indonesia ke pasar dunia."
              )}
            </p>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-[#E31E24] shrink-0" />
              <span className="text-xs font-semibold text-slate-300">
                {t("Verified Export Company & ISO Compliant Factory", "Perusahaan Ekspor Terverifikasi & Pabrik Standar ISO")}
              </span>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={colVariants} className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              {t("Quick Links", "Navigasi Cepat")}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              {[
                { name: t("Home", "Beranda"), href: "#home" },
                { name: t("About Us", "Tentang Kami"), href: "#about" },
                { name: t("Products & Specs", "Produk & Spesifikasi"), href: "/products" },
                { name: t("Factory Gallery", "Galeri Pabrik"), href: "/gallery" },
                { name: t("OEM Experience", "Layanan OEM"), href: "#oem" },
                { name: t("Company Legality", "Legalitas Usaha"), href: "#legality" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-red-400 transition-colors inline-block hover:translate-x-1 duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Products */}
          <motion.div variants={colVariants} className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              {t("Products", "Produk Arang")}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              {[
                t("Coconut Shisha Briquettes", "Briket Kelapa Shisha"),
                t("Hardwood BBQ Charcoal", "Arang Kayu Keras BBQ"),
                t("Sawdust Charcoal Sticks", "Batang Briket Serbuk Gergaji"),
                t("Lump Charcoal", "Arang Pecahan Kayu"),
                t("OEM Private Labeling", "OEM & Merk Sendiri"),
              ].map((prod, idx) => (
                <li key={idx} className="hover:text-slate-200 transition-colors">
                  {prod}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div variants={colVariants} className="lg:col-span-3 flex flex-col items-start">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              {t("Contact Info", "Informasi Kontak")}
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-xs text-slate-500 font-medium mb-0.5">Email</p>
                <a href="mailto:hello@arcacoal.com" className="font-bold text-slate-200 hover:text-red-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  hello@arcacoal.com
                </a>
              </li>
              <li>
                <p className="text-xs text-slate-500 font-medium mb-0.5">No hp/wa</p>
                <a href="https://wa.me/6282227130022" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-400 hover:underline inline-block hover:translate-x-1 duration-200">
                  +6282227130022
                </a>
              </li>
              <li>
                <p className="text-xs text-slate-500 font-medium mb-0.5">{t("Head Office & Ports", "Kantor Pusat & Pelabuhan")}</p>
                <p className="font-semibold text-slate-300">
                  {t("Indonesia Main Shipping Sea Ports", "Pelabuhan Utama Pengiriman Ekspor Indonesia")}
                </p>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium"
        >
          <p>© 2026 PT Arcadia Charcoal Indonesia. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>{t("Indonesia Export Supplier", "Pemasok Ekspor Resmi Indonesia")}</span>
            <span>&bull;</span>
            <span>www.arcacoal.com</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
