"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, ChevronRight, ArrowLeft, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsPage() {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  const [productsData, setProductsData] = useState<any>({
    header_title_en: "Charcoal Products & Specifications",
    header_title_id: "Produk Arang & Spesifikasi",
    header_subtitle_en: "Detailed technical specifications, sizing charts, and material composition for PT Arcadia Charcoal Indonesia's export-grade product lineup.",
    header_subtitle_id: "Spesifikasi teknis detail, tabel ukuran, dan komposisi bahan baku untuk lini produk standar ekspor PT Arcadia Charcoal Indonesia.",
    products_json: [
      {
        id: "shisha",
        number: "01.",
        title_en: "Shisha Charcoal Briquettes",
        title_id: "Briket Arang Shisha",
        subtitle_en: "(For shisha/Hookah)",
        subtitle_id: "(Khusus Shisha/Hookah)",
        categoryTitle: "SHISHA BRIQUETTES",
        image: "https://i.ibb.co/hxC2DtFs/fb5f29531ad5.png",
        local_src: "/products/shisha.png",
        description_en: "PT Arcadia Charcoal Indonesia is a leading exporter of high-quality charcoal briquettes, including coconut briquettes for shisha and hardwood briquettes for BBQ. We use pure coconut sourced from various regions of Indonesia, along with top-grade hardwood, to ensure that the products we produce meet international standards.",
        description_id: "PT Arcadia Charcoal Indonesia adalah eksportir terkemuka briket arang berkualitas tinggi, termasuk briket batok kelapa untuk shisha dan briket kayu keras untuk BBQ. Kami menggunakan kelapa murni yang bersumber dari berbagai wilayah Indonesia, dipadukan dengan kayu keras pilihan, untuk memastikan produk yang kami hasilkan memenuhi standar internasional.",
        specs_json: [
          { label_en: "Ash Content", label_id: "Kadar Abu", value: "1,8% – 2,5%" },
          { label_en: "Ash Color", label_id: "Warna Abu", value_en: "White / Light Grey", value_id: "Putih / Abu Terang" },
          { label_en: "Burning Time", label_id: "Waktu Nyala", value_en: "90 – 120 Minutes", value_id: "90 – 120 Menit" },
          { label_en: "Ignition Time", label_id: "Waktu Menyala", value_en: "< 5 Minutes", value_id: "< 5 Menit" },
          { label_en: "Fix Carbon", label_id: "Karbon Terikat", value_en: "Minimum 80%", value_id: "Minimal 80%" },
          { label_en: "Moisture", label_id: "Kadar Air", value_en: "Maximum 5%", value_id: "Maksimal 5%" },
          { label_en: "Volatile matter", label_id: "Zat Menguap", value: "13,07%" },
          { label_en: "Calorific Value", label_id: "Nilai Kalori", value: "7000 – 7500 Kcal / Kg" },
          { label_en: "Heat Content", label_id: "Suhu Panas", value: "< 550 Degree Celsius" },
          { label_en: "Material", label_id: "Bahan Baku", value_en: "100% Coconut Shell Charcoal", value_id: "100% Arang Batok Kelapa" },
        ],
        sizesLeft_json: [
          { category: "Cube", items: ["22 x 22 x 22 mm", "25 x 25 x 25 mm", "26 x 26 x 26 mm", "27 x 27 x 27 mm"] },
          { category: "Flat", items: ["25 x 25 x 15 mm"] },
          { category: "Kaloud", items: ["K3 : 50 x 27 mm", "K4 : 48 x 22 mm"] },
        ],
        sizesRight_json: [
          { category: "Finger", items: ["20 x 35 mm", "20 x 40 mm"] },
          { category: "Dome", items: ["20 x 35 mm", "20 x 50 mm"] },
          { category: "Sigma", items: ["26 x 36 mm"] },
        ],
        type: "Super Premium, Premium, Grade A & B",
      },
      {
        id: "bbq",
        number: "02.",
        title_en: "Hexagonal Hardwood BBQ Briquettes",
        title_id: "Briket Arang Kayu Keras Heksagonal BBQ",
        subtitle_en: "(For Restaurant & Outdoor Barbecue)",
        subtitle_id: "(Untuk BBQ Restoran & Outdoor)",
        categoryTitle: "HARDWOOD BBQ BRIQUETTES",
        image: "https://i.ibb.co/qY9zH4Fj/8334c98916e0.png",
        local_src: "/products/bbq.png",
        description_en: "Premium hexagonal charcoal briquettes engineered from 100% selected Indonesian hardwood timber. Designed with a central airflow hole to reach high cooking temperatures quickly, maintain steady heat output for 3-4 hours, and produce minimal smoke.",
        description_id: "Briket arang heksagonal premium yang diproduksi dari 100% kayu keras Indonesia pilihan. Dirancang dengan lubang sirkulasi udara di tengah untuk mencapai suhu tinggi secara cepat, mempertahankan panas stabil selama 3-4 jam, dan menghasilkan asap minimal.",
        specs_json: [
          { label_en: "Ash Content", label_id: "Kadar Abu", value: "3% – 5%" },
          { label_en: "Ash Color", label_id: "Warna Abu", value_en: "Light Grey", value_id: "Abu Terang" },
          { label_en: "Burning Time", label_id: "Waktu Nyala", value_en: "180 – 240 Minutes", value_id: "180 – 240 Menit" },
          { label_en: "Fix Carbon", label_id: "Karbon Terikat", value_en: "Minimum 75%", value_id: "Minimal 75%" },
          { label_en: "Moisture", label_id: "Kadar Air", value_en: "Maximum 6%", value_id: "Maksimal 6%" },
          { label_en: "Calorific Value", label_id: "Nilai Kalori", value: "7200 – 7800 Kcal / Kg" },
          { label_en: "Material", label_id: "Bahan Baku", value_en: "100% Hardwood Timber", value_id: "100% Kayu Keras" },
        ],
        sizesLeft_json: [
          { category: "Hexagonal Stick", items: ["Diameter 3.8 – 4.5 cm", "Length 10 – 20 cm"] },
        ],
        sizesRight_json: [
          { category_en: "Packaging", category_id: "Kemasan", items: ["10 kg / 20 kg Master Carton"] },
        ],
        type: "Export Premium Grade A",
      },
      {
        id: "sawdust",
        number: "03.",
        title_en: "Extruded Sawdust Briquette Charcoal",
        title_id: "Batang Arang Briket Serbuk Gergaji",
        subtitle_en: "(For Gourmet BBQ & Korean/Japanese Grills)",
        subtitle_id: "(Untuk Yakiniku & BBQ Restoran)",
        categoryTitle: "SAWDUST BRIQUETTE CHARCOAL",
        image: "https://i.ibb.co/RGdJjjFk/feb06f775eae.png",
        local_src: "/products/sawdust.png",
        description_en: "High-density sawdust charcoal sticks compressed under extreme hydraulic pressure without chemical binders. Delivers an extended 4-5 hour burn duration, zero spark, and consistent intense heat output preferred by professional yakiniku and steakhouse restaurants.",
        description_id: "Batang arang serbuk gergaji berkerapatan tinggi yang dipres dengan tekanan hidrolik ekstrem tanpa bahan perekat kimia. Menghasilkan durasi pembakaran tahan lama 4-5 jam, tanpa percikan api, dan panas konsisten yang disukai restoran yakiniku profesional.",
        specs_json: [
          { label_en: "Ash Content", label_id: "Kadar Abu", value: "3.5% – 4.5%" },
          { label_en: "Ash Color", label_id: "Warna Abu", value_en: "White Ash", value_id: "Abu Putih" },
          { label_en: "Burning Time", label_id: "Waktu Nyala", value_en: "240 – 300 Minutes", value_id: "240 – 300 Menit" },
          { label_en: "Fix Carbon", label_id: "Karbon Terikat", value_en: "Minimum 82%", value_id: "Minimal 82%" },
          { label_en: "Moisture", label_id: "Kadar Air", value_en: "Maximum 4%", value_id: "Maksimal 4%" },
          { label_en: "Calorific Value", label_id: "Nilai Kalori", value: "7500 – 8000 Kcal / Kg" },
          { label_en: "Material", label_id: "Bahan Baku", value_en: "100% Hardwood Sawdust", value_id: "100% Serbuk Gergaji Kayu Keras" },
        ],
        sizesLeft_json: [
          { category: "Extruded Hexagon", items: ["Length 10 – 40 cm", "Hollow Center 1.5 cm"] },
        ],
        sizesRight_json: [
          { category: "Master Carton", items: ["10 kg Box"] },
        ],
        type: "Grade A Export Standard",
      },
      {
        id: "lump",
        number: "04.",
        title_en: "Natural Hardwood Lump Charcoal",
        title_id: "Arang Pecahan Kayu Keras Alami",
        subtitle_en: "(For Industrial & Traditional Grill House)",
        subtitle_id: "(Untuk Industri & Panggang Kayu Tradisional)",
        categoryTitle: "NATURAL HARDWOOD LUMP",
        image: "https://i.ibb.co/FbXZ9yPv/052231c99e61.png",
        local_src: "/products/lump.png",
        description_en: "Natural lump charcoal carbonized in traditional earth kilns from sustainable Indonesian hardwood species such as Halaban, Sonokeling, and Tamarind. Easy to ignite with authentic wood-smoke aroma for professional culinary grilling.",
        description_id: "Arang pecahan kayu alami yang dibakar dalam tungku tradisional dari jenis kayu keras Indonesia berkelanjutan seperti Halaban, Sonokeling, dan Asam Jawa. Mudah dinyalakan dengan aroma asap kayu alami untuk panggangan kuliner profesional.",
        specs_json: [
          { label_en: "Ash Content", label_id: "Kadar Abu", value: "2% – 4%" },
          { label_en: "Burning Time", label_id: "Waktu Nyala", value_en: "120 – 180 Minutes", value_id: "120 – 180 Menit" },
          { label_en: "Fix Carbon", label_id: "Karbon Terikat", value_en: "Minimum 75%", value_id: "Minimal 75%" },
          { label_en: "Moisture", label_id: "Kadar Air", value_en: "Maximum 7%", value_id: "Maksimal 7%" },
          { label_en: "Calorific Value", label_id: "Nilai Kalori", value: "7000 – 7400 Kcal / Kg" },
          { label_en: "Material", label_id: "Bahan Baku", value_en: "Halaban & Tamarind Timber", value_id: "Kayu Halaban & Asam Jawa" },
        ],
        sizesLeft_json: [
          { category: "Lump Size", items: ["Size 3 – 8 cm", "Size 5 – 10 cm"] },
        ],
        sizesRight_json: [
          { category: "Large Lump", items: ["Restaurant Size 10+ cm"] },
        ],
        type: "Grade A Lump & Restaurant Grade",
      },
    ],
  });

  // Fetch live Products data from Neon PostgreSQL DB API
  useEffect(() => {
    async function loadProductsData() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && json.data) {
          setProductsData(json.data);
        }
      } catch (err) {
        console.error("Failed to load Products data from DB:", err);
      }
    }
    loadProductsData();
  }, []);

  const productsList = Array.isArray(productsData.products_json) ? productsData.products_json : [];

  return (
    <main className="min-h-screen bg-[#FCFCFC] text-slate-950 selection:bg-orange-500 selection:text-white">
      <Navbar />

      <section className="relative pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Background Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center mb-16 lg:mb-24">
          {/* Breadcrumb Navigation Pill Bar */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-sm text-sm font-medium text-slate-700 mb-8 hover:border-orange-200 transition-colors">
            <Link
              href="/"
              className="hover:text-[#F06B33] transition-colors flex items-center gap-1.5"
            >
              <Home className="w-4 h-4 text-slate-600" />
              <span>{t("Home", "Beranda")}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F06B33] font-bold">{t("Products & Specifications", "Produk & Spesifikasi")}</span>
          </div>

          {/* Page Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12] mb-4">
            {isEn ? productsData.header_title_en : productsData.header_title_id}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
            {isEn ? productsData.header_subtitle_en : productsData.header_subtitle_id}
          </p>
        </div>

        {/* Balanced 4-4-4 Column Grid Layout */}
        <div className="space-y-28">
          {productsList.map((prod: any, idx: number) => {
            const fallbackSrc = prod.local_src || `/products/${prod.id || 'shisha'}.png`;
            const imageSrc = prod.image || fallbackSrc;
            const title = isEn ? prod.title_en || prod.title_id : prod.title_id || prod.title_en;
            const subtitle = isEn ? prod.subtitle_en || prod.subtitle_id : prod.subtitle_id || prod.subtitle_en;
            const description = isEn ? prod.description_en || prod.description_id : prod.description_id || prod.description_en;
            const specs = Array.isArray(prod.specs_json) ? prod.specs_json : [];
            const sizesLeft = Array.isArray(prod.sizesLeft_json) ? prod.sizesLeft_json : [];
            const sizesRight = Array.isArray(prod.sizesRight_json) ? prod.sizesRight_json : [];

            return (
              <div
                key={prod.id || idx}
                id={prod.id}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-12 border-t border-slate-200/70 first:border-0 first:pt-0"
              >
                {/* Left Column - Product ImgBB Image */}
                <div className="lg:col-span-4 flex items-center justify-start pt-2">
                  <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt={title || "Arcacoal Product"}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (!target.getAttribute("data-failed")) {
                          target.setAttribute("data-failed", "true");
                          target.src = fallbackSrc;
                        }
                      }}
                      className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Middle Column */}
                <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-2">
                  <div className="text-5xl font-black text-[#F06B33] font-mono leading-none mb-3">
                    {prod.number || `0${idx + 1}.`}
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-2">
                    {title}
                  </h2>

                  <h3 className="text-lg font-bold text-slate-800 italic mb-6">
                    {subtitle}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 flex flex-col items-start">
                  <h3 className="text-xl font-bold tracking-wider text-amber-500 uppercase mb-4">
                    {prod.categoryTitle}
                  </h3>

                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 mb-3">
                    PRODUCT SPESIFICATION
                  </h4>

                  <div className="space-y-1.5 w-full text-xs mb-8">
                    {specs.map((spec: any, sIdx: number) => {
                      const specLabel = isEn ? spec.label_en || spec.label_id || spec.label : spec.label_id || spec.label_en || spec.label;
                      const specVal = isEn ? spec.value_en || spec.value_id || spec.value : spec.value_id || spec.value_en || spec.value;

                      return (
                        <div key={sIdx} className="flex items-center justify-between py-0.5 border-b border-slate-100 last:border-0">
                          <span className="font-bold text-slate-800">{specLabel} :</span>
                          <span className="font-semibold text-slate-600">{specVal}</span>
                        </div>
                      );
                    })}
                  </div>

                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 mb-3">
                    PRODUCT SIZE
                  </h4>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full text-xs mb-8">
                    <div className="space-y-2">
                      {sizesLeft.map((group: any, gIdx: number) => (
                        <div key={gIdx}>
                          <p className="font-bold text-slate-900 mb-0.5">{group.category} :</p>
                          <ul className="space-y-0.5 text-slate-600 font-medium">
                            {(group.items || []).map((itemStr: string, iIdx: number) => (
                              <li key={iIdx}>{itemStr}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {sizesRight.map((group: any, gIdx: number) => {
                        const catLabel = isEn ? group.category_en || group.category_id || group.category : group.category_id || group.category_en || group.category;
                        return (
                          <div key={gIdx}>
                            <p className="font-bold text-slate-900 mb-0.5">{catLabel} :</p>
                            <ul className="space-y-0.5 text-slate-600 font-medium">
                              {(group.items || []).map((itemStr: string, iIdx: number) => (
                                <li key={iIdx}>{itemStr}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 w-full text-xs">
                    <span className="font-bold text-slate-900">Type : </span>
                    <span className="font-semibold text-slate-600">{prod.type}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to Home & Inquiry Actions */}
        <div className="mt-24 pt-10 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200/80 text-slate-800 text-sm font-bold shadow-2xs hover:border-orange-200 hover:text-[#F06B33] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("Back to Home", "Kembali ke Beranda")}</span>
          </Link>

          <Link
            href="https://wa.me/6282227130022?text=Hello%20Arcacoal,%20I%20want%20to%20request%20specifications%20and%20pricing."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark-glossy inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-bold text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>{t("Request Custom Spec Quote", "Minta Penawaran Spesifikasi")}</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
