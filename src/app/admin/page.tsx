"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Save, LayoutDashboard,
  FileText,
  CheckSquare,
  LogOut,
  Bell,
  Search,
  CheckCircle2,
  TrendingUp,
  Globe,
  Sparkles,
  Edit3,
  Zap,
  Package,
  ShieldCheck,
  Plus,
  Trash2,
  Menu,
  X,
  ImageIcon,
  UploadCloud,
  ShoppingBag,
  Newspaper,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list',
  'link'
];


export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [editLang, setEditLang] = useState<"id" | "en">("id");

  // About Content State
  const [aboutForm, setAboutForm] = useState<any>({
    logo_url: "https://i.ibb.co/390VGD59/60dd68b6112c.png",
    company_name: "PT Arcadia Charcoal Indonesia",
    badge_id: "Tentang PT Arcadia Charcoal Indonesia",
    badge_en: "About PT Arcadia Charcoal Indonesia",
    title_id: "Mengekspor Briket Arang Terbaik Dari Indonesia",
    title_en: "Exporting Indonesia's Finest Charcoal Briquettes",
    subtitle_id: "Menghubungkan kekayaan alam murni Indonesia dengan standar kualitas internasional.",
    subtitle_en: "Bridging pure Indonesian natural resources with international quality standards.",
    paragraph1_id: "adalah eksportir terkemuka briket arang berkualitas tinggi, termasuk briket batok kelapa untuk shisha dan briket kayu keras untuk BBQ.",
    paragraph1_en: "is a leading exporter of high-quality charcoal briquettes, including coconut briquettes for shisha and hardwood briquettes for BBQ.",
    paragraph2_id: "Kami berkomitmen untuk terus berinovasi dalam setiap produk dan layanan kami.",
    paragraph2_en: "We are committed to continuous innovation in all of our products and services.",
    quote_id: "Kami mengundang Anda untuk menjalin kemitraan yang saling menguntungkan bersama kami.",
    quote_en: "We invite you to establish mutually beneficial partnerships with us.",
    bullet1_id: "Bahan Batok Kelapa Murni & Kayu Keras Pilihan",
    bullet1_en: "Pure Coconut & Top-Grade Hardwood Sourcing",
    bullet2_id: "Jaringan Pabrik Terintegrasi di Seluruh Indonesia",
    bullet2_en: "Integrated Factory Network Across Indonesia",
    bullet3_id: "Pengiriman Ekspor Langsung Melalui Pelabuhan Utama",
    bullet3_en: "Direct Export Shipping via Main Sea Ports",
  });
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [aboutAlert, setAboutAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [isUploadingAboutLogo, setIsUploadingAboutLogo] = useState(false);
  const [isUploadingOemImage, setIsUploadingOemImage] = useState(false);
  const [isUploadingNibImage, setIsUploadingNibImage] = useState(false);
  const [isUploadingNpwpImage, setIsUploadingNpwpImage] = useState(false);

  const handleUploadAboutLogo = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "949a3da1b4ea03c17bf20de030522347";
    setIsUploadingAboutLogo(true);
    setAboutAlert(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.data?.url) {
        const directUrl = json.data.url;
        setAboutForm({ ...aboutForm, logo_url: directUrl });
        setAboutAlert({ type: "success", msg: "Foto logo berhasil diunggah!" });
      } else {
        setAboutAlert({ type: "error", msg: `Gagal mengunggah foto logo: ${json.error?.message || "Error"}` });
      }
    } catch (err: any) {
      console.error("About logo upload error:", err);
      setAboutAlert({ type: "error", msg: "Gagal mengunggah foto logo." });
    } finally {
      setIsUploadingAboutLogo(false);
    }
  };

  // Features Content State
  const [featuresForm, setFeaturesForm] = useState<any>({
    badge_id: "Mengapa Memilih Arcacoal",
    badge_en: "Why Choose Arcacoal",
    header_title_id: "Keunggulan Alami & Ramah Lingkungan",
    header_title_en: "Natural & Eco-Friendly Excellence",
    header_subtitle_id: "Dirancang dari batok kelapa murni untuk menjamin pembakaran bersih dan standar internasional.",
    header_subtitle_en: "Engineered from pure raw coconut shells to guarantee clean combustion and international compliance.",
    item_number: "01.",
    item_title_id: "Produk Alami & Ramah Lingkungan",
    item_title_en: "Natural & Eco-Friendly Product",
    item_subtitle_id: "100% Bahan Baku Murni Tanpa Bahan Kimia Tambahan",
    item_subtitle_en: "100% Pure Raw Materials Without Chemical Additives",
    item_description_id: "Produk arang kami terbuat sepenuhnya dari bahan baku alami seperti batok kelapa tanpa bahan kimia tambahan.",
    item_description_en: "Our charcoal products are made entirely from natural raw materials such as coconut shells and without any chemical additives.",
    badge1_id: "100% Batok Kelapa Murni Alami",
    badge1_en: "100% Natural Coconut Shell",
    badge2_id: "Bebas Bahan Kimia Tambahan",
    badge2_en: "Zero Chemical Additives",
    badge3_id: "100% Dapat Terurai Alami",
    badge3_en: "100% Biodegradable",
    badge4_id: "Pasokan Ramah Lingkungan",
    badge4_en: "Sustainable Eco Sourcing",
  });
  const [isSavingFeatures, setIsSavingFeatures] = useState(false);
  const [featuresAlert, setFeaturesAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Performance Content State
  const [perfForm, setPerfForm] = useState<any>({
    badge_id: "Performa Standar Ekspor",
    badge_en: "Export Grade Performance",
    header_title_id: "Keunggulan Performa",
    header_title_en: "Performance Highlight",
    header_subtitle_id: "Tanpa Bau • Nyala Tahan Lama • Abu Minimal • Panas Tinggi",
    header_subtitle_en: "Odorless • Long Burning Time • Low Ash • High Heat",

    item1_title_id: "TANPA BAU",
    item1_title_en: "ODORLESS",
    item1_badge_id: "Perlindungan Rasa Murni",
    item1_badge_en: "Pure Flavor Protection",
    item1_desc_id: "Bakar tanpa bau yang tidak sedap, sangat ideal untuk shisha lounge, indoor BBQ, dan restoran kuliner.",
    item1_desc_en: "Burns without releasing any unpleasant odors, making it ideal for shisha lounges, indoor BBQs, and culinary settings.",

    item2_title_id: "ABU SEDIKIT",
    item2_title_en: "LOW ASH",
    item2_badge_id: "< 2.5% Abu Putih Alami",
    item2_badge_en: "< 2.5% Natural White Ash",
    item2_desc_id: "Menyisakan abu minimal setelah pembakaran, memastikan penggunaan yang lebih bersih.",
    item2_desc_en: "Leaves behind minimal ash after burning, ensuring a cleaner experience and less frequent maintenance.",

    item3_title_id: "NYALA TAHAN LAMA",
    item3_title_en: "LONG BURNING TIME",
    item3_badge_id: "Nyala 2.5+ Jam Tahan Lama",
    item3_badge_en: "2.5+ Hours Extended Burn",
    item3_desc_id: "Arang kami dirancang untuk menghasilkan durasi pembakaran yang lebih lama, ideal untuk BBQ maupun shisha.",
    item3_desc_en: "Our charcoal is engineered to deliver an extended burn duration, making it ideal for long sessions.",

    item4_title_id: "PANAS TINGGI",
    item4_title_en: "HIGH HEAT",
    item4_badge_id: "Kalori > 7.500 Kcal/kg",
    item4_badge_en: "> 7,500 Kcal/kg Calorific Value",
    item4_desc_id: "Dirancang untuk menghasilkan output panas tinggi secara cepat dan menjaga suhu optimal tetap stabil.",
    item4_desc_en: "Engineered to generate intense thermal output, this charcoal type reaches optimal temperatures quickly.",
  });
  const [isSavingPerf, setIsSavingPerf] = useState(false);
  const [perfAlert, setPerfAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // OEM Content State
  const [oemForm, setOemForm] = useState<any>({
    title_id: "LAYANAN OEM KHUSUS",
    title_en: "THE OEM EXPERIENCE",
    description_id: "Tingkatkan merk Anda ke tingkat berikutnya dengan layanan OEM private label kami.",
    description_en: "Take your brand to the next level with our OEM services.",
    link_text_id: "Solusi OEM kami.",
    link_text_en: "Our OEM Solution.",

    p1_title_id: "Formulasi Kustom & Cetakan Presisi",
    p1_title_en: "Custom Formulations & Shapes",
    p1_desc_id: "Pilih bentuk cube, kaloud, finger, atau heksagonal sesuai kebutuhan merk Anda.",
    p1_desc_en: "Select customized cube, kaloud, finger, or hexagonal shapes tailored to your brand.",

    p2_title_id: "Desain Kemasan Private Label",
    p2_title_en: "Private Label Packaging Design",
    p2_desc_id: "Layanan cetak kemasan master carton dan inner box khusus dengan logo dan identitas visual produk Anda.",
    p2_desc_en: "Full custom master carton and inner box packaging printing with your corporate brand identity.",

    p3_title_id: "Kontrol Kualitas Ekspor Ketat",
    p3_title_en: "Rigorous Export Quality Control",
    p3_desc_id: "Pemeriksaan konsistensi kadar air, abu, dan ketahanan benturan di laboratorium sebelum kontainer dikirim.",
    p3_desc_en: "Lab test inspection for moisture, ash content, and drop strength prior to container dispatch.",

    p4_title_id: "Dukungan Dokumen Ekspor Lengkap",
    p4_title_en: "Full Export Documentation Support",
    p4_desc_id: "Penyiapan dokumen MSDS, SHT, Certificate of Origin (COO), dan Bill of Lading secara profesional.",
    p4_desc_en: "Professional preparation of MSDS, SHT, Certificate of Origin (COO), and Bill of Lading.",
  });
  const [isSavingOem, setIsSavingOem] = useState(false);
  const [oemAlert, setOemAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Legality Content State
  const [legalityForm, setLegalityForm] = useState<any>({
    badge_id: "Legalitas & Dokumen Ekspor",
    badge_en: "Legality & Export Documents",
    header_title_id: "Legalitas Resmi & Standar Ekspor Global",
    header_title_en: "Official Legality & Global Export Standard",
    header_subtitle_id: "PT Arcadia Charcoal Indonesia melengkapi setiap pengiriman internasional dengan sertifikasi pengapalan yang sah dan diakui secara global.",
    header_subtitle_en: "PT Arcadia Charcoal Indonesia accompanies every international shipment with globally recognized and valid shipping certifications.",
    paragraph_id: "Sebagai eksportir arang terkemuka di Indonesia, kami memahami pentingnya kepatuhan hukum dan kelengkapan dokumen pengapalan untuk menjamin kelancaran proses kepabeanan (customs clearance) di pelabuhan tujuan.",
    paragraph_en: "As a premier charcoal exporter in Indonesia, we understand the critical importance of legal compliance and complete shipping documentation to ensure smooth customs clearance at destination ports.",
    card_title_id: "Dokumen Ekspor Standar Arcacoal",
    card_title_en: "Arcacoal Standard Export Document Package",
    card_subtitle_id: "Setiap kontainer diproses dengan kelengkapan berkas resmi berikut:",
    card_subtitle_en: "Every container shipment is processed with the following official document package:",
    add_doc_title_id: "Dokumen Tambahan Berdasarkan Permintaan Buyer",
    add_doc_title_en: "Additional Buyer Custom Clearance Documents",
    footer_text_id: "Membutuhkan dokumen khusus untuk kepabeanan di negara Anda?",
    footer_text_en: "Need specific custom clearance documents for your destination port?",
    btn_text_id: "Tanyakan Kepada Tim Ekspor",
    btn_text_en: "Ask Our Export Specialist",
    standard_docs_json: [
      { id: "Sertifikat Hasil Uji Laboratorium (Sucofindo / Carsurin)", en: "Lab Test Certificate (Sucofindo / Carsurin)" },
      { id: "Material Safety Data Sheet (MSDS)", en: "Material Safety Data Sheet (MSDS)" },
      { id: "Self-Heating Test Certificate (SHT Certificate)", en: "Self-Heating Test Certificate (SHT Certificate)" },
      { id: "Bill of Lading (B/L)", en: "Bill of Lading (B/L)" },
      { id: "Commercial Invoice & Packing List", en: "Commercial Invoice & Packing List" },
      { id: "Certificate of Origin (COO / Form E / Form D)", en: "Certificate of Origin (COO / Form E / Form D)" },
    ],
    additional_docs_json: [
      { id: "Sertifikat Fumigasi Kontainer (Fumigation Certificate)", en: "Container Fumigation Certificate" },
      { id: "Sertifikat Fitosanitari (Phytosanitary Certificate)", en: "Phytosanitary Certificate" },
      { id: "Vanning & Loading Inspection Report", en: "Vanning & Loading Inspection Report" },
    ],
  });
  const [isSavingLegality, setIsSavingLegality] = useState(false);
  const [legalityAlert, setLegalityAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Gallery Content State
  const [galleryForm, setGalleryForm] = useState<any>({
    badge_id: "Galeri Pabrik & Produksi",
    badge_en: "Factory & Production Showcase",
    header_title_id: "Galeri",
    header_title_en: "Gallery",
    header_subtitle_id: "Foto asli dokumentasi aktivitas pabrik dan tungku produksi PT Arcadia Charcoal Indonesia.",
    header_subtitle_en: "Real production photos inside PT Arcadia Charcoal Indonesia's manufacturing & kiln facilities.",
    btn_text_id: "Lihat Semua Galeri",
    btn_text_en: "View All Gallery",
    photos_json: [],
  });
  const [isSavingGallery, setIsSavingGallery] = useState(false);
  const [galleryAlert, setGalleryAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [uploadingImgIndex, setUploadingImgIndex] = useState<number | null>(null);

  // News Content State
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isSavingNews, setIsSavingNews] = useState(false);
  const [newsAlert, setNewsAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [isUploadingNewsImg, setIsUploadingNewsImg] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [deleteConfirmNewsId, setDeleteConfirmNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState<any>({
    title_id: "",
    title_en: "",
    content_id: "",
    content_en: "",
    image_url: "",
  });


  // Products Content State
  const [productsForm, setProductsForm] = useState<any>({
    header_title_id: "Produk Arang & Spesifikasi",
    header_title_en: "Charcoal Products & Specifications",
    header_subtitle_id: "Spesifikasi teknis detail, tabel ukuran, dan komposisi bahan baku untuk lini produk standar ekspor PT Arcadia Charcoal Indonesia.",
    header_subtitle_en: "Detailed technical specifications, sizing charts, and material composition for PT Arcadia Charcoal Indonesia's export-grade product lineup.",
    products_json: [],
  });
  const [isSavingProducts, setIsSavingProducts] = useState(false);
  const [productsAlert, setProductsAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [uploadingProdImgIndex, setUploadingProdImgIndex] = useState<number | null>(null);

  // Custom Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    title: string;
    itemName: string;
    onConfirm: () => void;
  } | null>(null);

  const triggerDeleteConfirmation = (title: string, itemName: string, onConfirm: () => void) => {
    setDeleteModal({
      isOpen: true,
      title,
      itemName,
      onConfirm,
    });
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
    { id: "about", label: "Edit About", icon: FileText, badge: null },
    { id: "features", label: "Edit Keunggulan", icon: CheckSquare, badge: null },
    { id: "performance", label: "Edit Performa", icon: Zap, badge: null },
    { id: "oem", label: "Edit OEM", icon: Package, badge: null },
    { id: "legality", label: "Edit Legalitas", icon: ShieldCheck, badge: null },
    { id: "gallery", label: "Edit Galeri", icon: ImageIcon, badge: (galleryForm.photos_json || []).length },
    { id: "products", label: "Edit Produk", icon: ShoppingBag, badge: (productsForm.products_json || []).length },
    { id: "news", label: "Edit Berita", icon: FileText, badge: (newsItems || []).length },
  ];

  const filteredNavItems = navItems.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return item.label.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
  });

  const router = useRouter();
  const { t } = useLanguage();

  // Authentication Protection Guard
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("arcacoal_admin_session");
      if (!session) {
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  // Load All Content Data for Admin Editor
  useEffect(() => {
    async function loadData() {
      try {
        const [resAbout, resFeatures, resPerf, resOem, resLegality, resGallery, resProducts, resNews] = await Promise.all([
          fetch("/api/about"),
          fetch("/api/features"),
          fetch("/api/performance"),
          fetch("/api/oem"),
          fetch("/api/legality"),
          fetch("/api/gallery"),
          fetch("/api/products"),
          fetch("/api/news"),
        ]);
        const jsonAbout = await resAbout.json();
        const jsonFeatures = await resFeatures.json();
        const jsonPerf = await resPerf.json();
        const jsonOem = await resOem.json();
        const jsonLegality = await resLegality.json();
        const jsonGallery = await resGallery.json();
        const jsonProducts = await resProducts.json();
        const jsonNews = await resNews.json();

        if (jsonAbout.success && jsonAbout.data) setAboutForm(jsonAbout.data);
        if (jsonFeatures.success && jsonFeatures.data) setFeaturesForm(jsonFeatures.data);
        if (jsonPerf.success && jsonPerf.data) setPerfForm(jsonPerf.data);
        if (jsonOem.success && jsonOem.data) setOemForm(jsonOem.data);
        if (jsonLegality.success && jsonLegality.data) setLegalityForm(jsonLegality.data);
        if (jsonGallery.success && jsonGallery.data) setGalleryForm(jsonGallery.data);
        if (jsonProducts.success && jsonProducts.data) setProductsForm(jsonProducts.data);
        if (jsonNews.success && jsonNews.data) setNewsItems(jsonNews.data);
      } catch (err) {
        console.error("Error loading admin data:", err);
      }
    }
    loadData();
  }, []);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAbout(true);
    setAboutAlert(null);

    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...aboutForm, sourceLanguage: editLang }),
      });

      const json = await res.json();

      if (json.success) {
        setAboutAlert({ type: "success", msg: json.message || "Berhasil disimpan & diterjemahkan Groq AI!" });
        if (json.data) setAboutForm(json.data);
      } else {
        setAboutAlert({ type: "error", msg: json.message || "Gagal memperbarui konten." });
      }
    } catch (err: any) {
      console.error("Save About error:", err);
      setAboutAlert({ type: "error", msg: "Terjadi kesalahan saat menyimpan perubahan." });
    } finally {
      setIsSavingAbout(false);
    }
  };

  const handleSaveFeatures = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingFeatures(true);
    setFeaturesAlert(null);

    try {
      const res = await fetch("/api/features", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...featuresForm, sourceLanguage: editLang }),
      });

      const json = await res.json();

      if (json.success) {
        setFeaturesAlert({ type: "success", msg: json.message || "Berhasil disimpan & diterjemahkan Groq AI!" });
        if (json.data) setFeaturesForm(json.data);
      } else {
        setFeaturesAlert({ type: "error", msg: json.message || "Gagal memperbarui konten." });
      }
    } catch (err: any) {
      console.error("Save Features error:", err);
      setFeaturesAlert({ type: "error", msg: "Terjadi kesalahan saat menyimpan perubahan." });
    } finally {
      setIsSavingFeatures(false);
    }
  };

  const handleSavePerf = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPerf(true);
    setPerfAlert(null);

    try {
      const res = await fetch("/api/performance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...perfForm, sourceLanguage: editLang }),
      });

      const json = await res.json();

      if (json.success) {
        setPerfAlert({ type: "success", msg: json.message || "Berhasil disimpan & diterjemahkan Groq AI!" });
        if (json.data) setPerfForm(json.data);
      } else {
        setPerfAlert({ type: "error", msg: json.message || "Gagal memperbarui konten." });
      }
    } catch (err: any) {
      console.error("Save Performance error:", err);
      setPerfAlert({ type: "error", msg: "Terjadi kesalahan saat menyimpan perubahan." });
    } finally {
      setIsSavingPerf(false);
    }
  };

  const handleSaveOem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingOem(true);
    setOemAlert(null);

    try {
      const res = await fetch("/api/oem", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...oemForm, sourceLanguage: editLang }),
      });

      const json = await res.json();

      if (json.success) {
        setOemAlert({ type: "success", msg: json.message || "Berhasil disimpan & diterjemahkan Groq AI!" });
        if (json.data) setOemForm(json.data);
      } else {
        setOemAlert({ type: "error", msg: json.message || "Gagal memperbarui konten." });
      }
    } catch (err: any) {
      console.error("Save OEM error:", err);
      setOemAlert({ type: "error", msg: "Terjadi kesalahan saat menyimpan perubahan." });
    } finally {
      setIsSavingOem(false);
    }
  };

  const handleSaveLegality = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingLegality(true);
    setLegalityAlert(null);

    try {
      const res = await fetch("/api/legality", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...legalityForm, sourceLanguage: editLang }),
      });

      const json = await res.json();

      if (json.success) {
        setLegalityAlert({ type: "success", msg: json.message || "Berhasil disimpan & diterjemahkan Groq AI!" });
        if (json.data) setLegalityForm(json.data);
      } else {
        setLegalityAlert({ type: "error", msg: json.message || "Gagal memperbarui konten." });
      }
    } catch (err: any) {
      console.error("Save Legality error:", err);
      setLegalityAlert({ type: "error", msg: "Terjadi kesalahan saat menyimpan perubahan." });
    } finally {
      setIsSavingLegality(false);
    }
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingGallery(true);
    setGalleryAlert(null);

    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...galleryForm, sourceLanguage: editLang }),
      });

      const json = await res.json();

      if (json.success) {
        setGalleryAlert({ type: "success", msg: json.message || "Berhasil disimpan & diterjemahkan Groq AI!" });
        if (json.data) setGalleryForm(json.data);
      } else {
        setGalleryAlert({ type: "error", msg: json.message || "Gagal memperbarui konten." });
      }
    } catch (err: any) {
      console.error("Save Gallery error:", err);
      setGalleryAlert({ type: "error", msg: "Terjadi kesalahan saat menyimpan perubahan." });
    } finally {
      setIsSavingGallery(false);
    }
  };

  const handleSaveProducts = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProducts(true);
    setProductsAlert(null);

    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...productsForm, sourceLanguage: editLang }),
      });

      const json = await res.json();

      if (json.success) {
        setProductsAlert({ type: "success", msg: json.message || "Berhasil disimpan & diterjemahkan Groq AI!" });
        if (json.data) setProductsForm(json.data);
      } else {
        setProductsAlert({ type: "error", msg: json.message || "Gagal memperbarui konten." });
      }
    } catch (err: any) {
      console.error("Save Products error:", err);
      setProductsAlert({ type: "error", msg: "Terjadi kesalahan saat menyimpan perubahan." });
    } finally {
      setIsSavingProducts(false);
    }
  };

  // ImgBB Upload Handler for Gallery Photo Item
  const handleUploadImageToImgBB = async (file: File, index: number) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "949a3da1b4ea03c17bf20de030522347";
    setUploadingImgIndex(index);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.data?.url) {
        const directUrl = json.data.url;
        const updated = [...(galleryForm.photos_json || [])];
        updated[index].src = directUrl;
        setGalleryForm({ ...galleryForm, photos_json: updated });
        setGalleryAlert({ type: "success", msg: `Foto berhasil diunggah!` });
      } else {
        setGalleryAlert({ type: "error", msg: `Gagal mengunggah foto: ${json.error?.message || "Error"}` });
      }
    } catch (err: any) {
      console.error("Image upload error:", err);
      setGalleryAlert({ type: "error", msg: "Gagal mengunggah foto." });
    } finally {
      setUploadingImgIndex(null);
    }
  };

  // Upload Handler for Product Item Image
  const handleUploadProductImageToImgBB = async (file: File, index: number) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "949a3da1b4ea03c17bf20de030522347";
    setUploadingProdImgIndex(index);
    setProductsAlert(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.data?.url) {
        const directUrl = json.data.url;
        const updated = [...(productsForm.products_json || [])];
        updated[index].image = directUrl;
        setProductsForm({ ...productsForm, products_json: updated });
        setProductsAlert({ type: "success", msg: `Foto produk berhasil diunggah!` });
      } else {
        setProductsAlert({ type: "error", msg: `Gagal mengunggah foto: ${json.error?.message || "Error"}` });
      }
    } catch (err: any) {
      console.error("Product image upload error:", err);
      setProductsAlert({ type: "error", msg: "Gagal mengunggah foto produk." });
    } finally {
      setUploadingProdImgIndex(null);
    }
  };

  // Document Array Helpers for Adding/Removing Rows
  const addStandardDocItem = () => {
    const current = legalityForm.standard_docs_json || [];
    setLegalityForm({
      ...legalityForm,
      standard_docs_json: [...current, { id: "Dokumen Baru", en: "New Document" }],
    });
  };

  const removeStandardDocItem = (index: number) => {
    const current = [...(legalityForm.standard_docs_json || [])];
    current.splice(index, 1);
    setLegalityForm({
      ...legalityForm,
      standard_docs_json: current,
    });
  };

  const addAdditionalDocItem = () => {
    const current = legalityForm.additional_docs_json || [];
    setLegalityForm({
      ...legalityForm,
      additional_docs_json: [...current, { id: "Dokumen Tambahan Baru", en: "New Additional Document" }],
    });
  };

  const removeAdditionalDocItem = (index: number) => {
    const current = [...(legalityForm.additional_docs_json || [])];
    current.splice(index, 1);
    setLegalityForm({
      ...legalityForm,
      additional_docs_json: current,
    });
  };

  // Gallery Array Helpers
  const addGalleryItem = () => {
    const current = galleryForm.photos_json || [];
    setGalleryForm({
      ...galleryForm,
      photos_json: [
        ...current,
        {
          src: "https://i.ibb.co/KjxVYdHM/0f3b732b59f9.png",
          local_src: "/Website Content/Foto/1-17.png",
          title_id: "Foto Pabrik Baru",
          title_en: "New Factory Showcase",
          category_id: "Produksi",
          category_en: "Production",
        },
      ],
    });

    // Smooth scroll directly down to the newly added item at bottom
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const removeGalleryItem = async (index: number) => {
    const current = [...(galleryForm.photos_json || [])];
    current.splice(index, 1);
    const updatedForm = {
      ...galleryForm,
      photos_json: current,
    };
    setGalleryForm(updatedForm);

    // Auto-save deletion directly to Database so user doesn't need to click Simpan Perubahan!
    try {
      setGalleryAlert({ type: "success", msg: "Menghapus foto dan meng-update database..." });
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedForm, sourceLanguage: editLang }),
      });
      const json = await res.json();
      if (json.success) {
        setGalleryAlert({ type: "success", msg: "Foto berhasil dihapus dari database!" });
        if (json.data) setGalleryForm(json.data);
      }
    } catch (err) {
      console.error("Auto delete gallery item error:", err);
    }
  };

  // Product Array Helpers
  const addProductItem = () => {
    const current = productsForm.products_json || [];
    const newIdx = current.length + 1;
    setProductsForm({
      ...productsForm,
      products_json: [
        ...current,
        {
          id: `product_${Date.now()}`,
          number: `0${newIdx}.`,
          title_id: "Produk Briket Baru",
          title_en: "New Briquette Product",
          subtitle_id: "(Untuk Penggunaan Khusus)",
          subtitle_en: "(For Custom Application)",
          categoryTitle: "CUSTOM BRIQUETTES",
          image: "https://i.ibb.co/8nXP6SgM/fb5f29531ad5.png",
          local_src: "/products/shisha.png",
          description_id: "Deskripsi singkat produk arang briket baru kualitas ekspor.",
          description_en: "Short description of the new export-grade charcoal briquette product.",
          specs_json: [
            { label_id: "Kadar Abu", label_en: "Ash Content", value: "2% – 3%" },
            { label_id: "Waktu Nyala", label_en: "Burning Time", value_id: "120 Menit", value_en: "120 Minutes" },
          ],
          sizesLeft_json: [{ category: "Cube", items: ["25 x 25 x 25 mm"] }],
          sizesRight_json: [{ category_id: "Kemasan", category_en: "Packaging", items: ["10 kg Master Carton"] }],
          type: "Export Grade",
        },
      ],
    });

    // Smooth scroll directly down to the newly added item at bottom
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const removeProductItem = async (index: number) => {
    const current = [...(productsForm.products_json || [])];
    current.splice(index, 1);
    const updatedForm = {
      ...productsForm,
      products_json: current,
    };
    setProductsForm(updatedForm);

    // Auto-save deletion directly to Database so user doesn't need to click Simpan Perubahan!
    try {
      setProductsAlert({ type: "success", msg: "Menghapus produk dan meng-update database..." });
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedForm, sourceLanguage: editLang }),
      });
      const json = await res.json();
      if (json.success) {
        setProductsAlert({ type: "success", msg: "Produk berhasil dihapus dari database!" });
        if (json.data) setProductsForm(json.data);
      }
    } catch (err) {
      console.error("Auto delete product item error:", err);
    }
  };

  const addProdSpec = (pIdx: number) => {
    const updated = [...(productsForm.products_json || [])];
    const currentSpecs = updated[pIdx].specs_json || [];
    updated[pIdx].specs_json = [
      ...currentSpecs,
      { label_id: "Spesifikasi Baru", label_en: "New Specification", value_id: "Nilai", value_en: "Value" },
    ];
    setProductsForm({ ...productsForm, products_json: updated });
  };

  const removeProdSpec = (pIdx: number, sIdx: number) => {
    const updated = [...(productsForm.products_json || [])];
    const currentSpecs = [...(updated[pIdx].specs_json || [])];
    currentSpecs.splice(sIdx, 1);
    updated[pIdx].specs_json = currentSpecs;
    setProductsForm({ ...productsForm, products_json: updated });
  };

  const getAdminImgUrl = (url?: string, fallback: string = "/logo3.png") => {
    if (!url) return fallback;
    if (url.includes("i.ibb.co")) {
      return `https://wsrv.nl/?url=${encodeURIComponent(url)}`;
    }
    if (url.startsWith("/Website Content/")) {
      return fallback;
    }
    return url;
  };

  
  const handleUploadNewsImg = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "949a3da1b4ea03c17bf20de030522347";
    setIsUploadingNewsImg(true);
    setNewsAlert(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.data?.url) {
        const directUrl = json.data.url;
        setNewsForm({ ...newsForm, image_url: directUrl });
        setNewsAlert({ type: "success", msg: "Foto berita berhasil diunggah!" });
      } else {
        setNewsAlert({ type: "error", msg: `Gagal mengunggah foto: ${json.error?.message || "Error"}` });
      }
    } catch (err: any) {
      console.error("News image upload error:", err);
      setNewsAlert({ type: "error", msg: "Gagal mengunggah foto berita." });
    } finally {
      setIsUploadingNewsImg(false);
    }
  };


  const handleNewsImgUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingNewsImg(true);
    setNewsAlert(null);
    
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const newsApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "949a3da1b4ea03c17bf20de030522347";
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${newsApiKey}`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setNewsForm({ ...newsForm, image_url: json.data.url });
        setNewsAlert({ type: "success", msg: "Gambar berhasil diunggah!" });
      } else {
        setNewsAlert({ type: "error", msg: "Gagal mengunggah gambar." });
      }
    } catch (err) {
      setNewsAlert({ type: "error", msg: "Terjadi kesalahan saat mengunggah gambar." });
    }
    setIsUploadingNewsImg(false);
  };

  const handleSaveNews = async () => {
    setIsSavingNews(true);
    setNewsAlert(null);
    try {
      const method = (editingNewsId && editingNewsId !== "NEW") ? "PUT" : "POST";
      const body = { ...newsForm, id: editingNewsId === "NEW" ? undefined : editingNewsId, sourceLanguage: editLang };
      const res = await fetch("/api/news", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setNewsAlert({ type: "success", msg: "Berita berhasil disimpan!" });
        // Refresh news list
        const resNews = await fetch("/api/news");
        const dataNews = await resNews.json();
        if (dataNews.success) setNewsItems(dataNews.data);
        setEditingNewsId(null);
        setNewsForm({ title_id: "", title_en: "", content_id: "", content_en: "", image_url: "" });
      } else {
        setNewsAlert({ type: "error", msg: data.message || "Gagal menyimpan berita" });
      }
    } catch (err) {
      setNewsAlert({ type: "error", msg: "Terjadi kesalahan" });
    }
    setIsSavingNews(false);
  };

  const handleDeleteNews = async (id: string) => {
    setDeleteConfirmNewsId(id);
  };

  const confirmDeleteNews = async () => {
    if (!deleteConfirmNewsId) return;
    const id = deleteConfirmNewsId;
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setNewsItems(newsItems.filter(item => item.id !== id));
        setDeleteConfirmNewsId(null);
      } else {
        alert(data.message || "Gagal menghapus berita");
      }
    } catch (err) {
      alert("Terjadi kesalahan");
    }
  };

  const handleEditNews = (item: any) => {
    setEditingNewsId(item.id);
    setNewsForm({
      title_id: item.title_id || "",
      title_en: item.title_en || "",
      content_id: item.content_id || "",
      content_en: item.content_en || "",
      image_url: item.image_url || "",
    });
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("arcacoal_admin_session");
    }
    router.push("/login");
  };

  // Render loading spinner while checking auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-center font-sans">
        <div className="w-8 h-8 border-3 border-[#E31E24]/20 border-t-[#E31E24] rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold text-slate-500">Memeriksa Hak Akses Autentikasi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-slate-900 font-sans flex flex-col lg:flex-row selection:bg-red-600 selection:text-white">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
            <Image src="/logo3.png" alt="Logo" width={28} height={28} unoptimized className="w-5 h-5 object-contain" />
          </div>
          <span className="font-extrabold text-slate-900 text-sm">Arcacoal Admin</span>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Mobile Backdrop Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 h-screen z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between p-6 shrink-0 transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Top Brand Header */}
          <div className="flex items-center gap-3 mb-8 px-1">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
              <Image
                src="/logo3.png"
                alt="Arcacoal Flame"
                width={36}
                height={36}
                unoptimized
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-950 tracking-tight leading-none">Arcacoal</h2>
              <span className="text-[10px] font-bold text-[#E31E24] uppercase tracking-widest">ADMIN PANEL</span>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t("Search...", "Cari...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#E31E24] focus:bg-white transition-all"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ×
              </button>
            ) : (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                ⌘S
              </span>
            )}
          </div>

          {/* MAIN Navigation Items */}
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3 block">
                MAIN {searchQuery && `(${filteredNavItems.length})`}
              </span>
              <nav className="space-y-1.5">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#E31E24] text-white shadow-md shadow-red-500/25"
                          : "text-slate-600 hover:text-slate-950 hover:bg-red-50/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && item.badge !== undefined && (
                        <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#E31E24] text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                {filteredNavItems.length === 0 && (
                  <div className="p-4 text-center rounded-xl bg-slate-50 border border-slate-200/80">
                    <p className="text-xs font-medium text-slate-500">Menu tidak ditemukan</p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-[11px] font-bold text-[#E31E24] hover:underline mt-1 block mx-auto"
                    >
                      Reset Pencarian
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Sidebar Action Items */}
        <div className="pt-6 border-t border-slate-200/80 space-y-2">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all"
          >
            <Globe className="w-4 h-4 text-slate-400" />
            <span>{t("Landing Page", "Landing Page")}</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span>{t("Keluar", "Keluar")}</span>
          </button>
        </div>
      </aside>

      {/* Right Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              {activeTab === "dashboard" && t("Visual Live Editor - Dashboard", "Visual Live Editor - Dashboard")}
              {activeTab === "about" && t("Visual Live Editor - About", "Visual Live Editor - About")}
              {activeTab === "features" && t("Visual Live Editor - Keunggulan", "Visual Live Editor - Keunggulan")}
              {activeTab === "performance" && t("Visual Live Editor - Performa", "Visual Live Editor - Performa")}
              {activeTab === "oem" && t("Visual Live Editor - OEM", "Visual Live Editor - OEM")}
              {activeTab === "legality" && t("Visual Live Editor - Legalitas", "Visual Live Editor - Legalitas")}
              {activeTab === "gallery" && t("Visual Live Editor - Galeri Foto", "Visual Live Editor - Galeri Foto")}
            

              {activeTab === "products" && t("Visual Live Editor - Produk & Spesifikasi", "Visual Live Editor - Produk & Spesifikasi")}
              {activeTab === "news" && t("Manajemen Berita (News)", "News Management")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {t("Manage PT Arcadia Charcoal Indonesia content & international export inquiries.", "Kelola konten PT Arcadia Charcoal Indonesia & pesan ekspor internasional.")}
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Global Language Editing Switcher Toggle */}
            <div className="flex items-center bg-slate-200/80 p-1 rounded-xl border border-slate-300/80">
              <button
                type="button"
                onClick={() => setEditLang("id")}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                  editLang === "id"
                    ? "bg-[#E31E24] text-white shadow-md shadow-red-500/20"
                    : "text-slate-700 hover:text-slate-950"
                }`}
              >
                <span>🇮🇩 Indonesia</span>
              </button>
              <button
                type="button"
                onClick={() => setEditLang("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                  editLang === "en"
                    ? "bg-[#E31E24] text-white shadow-md shadow-red-500/20"
                    : "text-slate-700 hover:text-slate-950"
                }`}
              >
                <span>🇬🇧 English</span>
              </button>
            </div>

            <button className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-950 relative shadow-2xs transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#E31E24] absolute top-2 right-2 ring-2 ring-white" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-[#E31E24] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-red-500/20">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-950 leading-tight">Admin Arcacoal</p>
                <p className="text-[10px] text-slate-500 font-medium">admin@arcacoal.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* TAB CONTENTS */}
        <div>
          {/* TAB: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {t("Target Export Countries", "Negara Tujuan Ekspor")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">14</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-2">
                      <Globe className="w-3.5 h-3.5" /> Middle East & Europe
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Globe className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {t("Active Products", "Produk Arang Aktif")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">{(productsForm.products_json || []).length || 4}</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-2">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Export Specs Ready
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Package className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {t("Factory Documentation", "Foto Galeri")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">{(galleryForm.photos_json || []).length || 8}</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 mt-2">
                      <Sparkles className="w-3.5 h-3.5" /> Foto Aktif
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Jump Editor Grid */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
                <h3 className="text-lg font-extrabold text-slate-950 mb-2">Visual Editor Shortcut</h3>
                <p className="text-xs text-slate-500 font-medium mb-6">Pilih bagian website yang ingin diubah teks atau gambarnya secara langsung:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab("about")}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-left transition-all group cursor-pointer"
                  >
                    <FileText className="w-6 h-6 text-slate-700 group-hover:text-[#E31E24] mb-3" />
                    <h4 className="text-sm font-extrabold text-slate-950 group-hover:text-[#E31E24]">01. Section About Us</h4>
                    <p className="text-xs text-slate-500 mt-1">Edit profil PT Arcadia Charcoal Indonesia & poin keunggulan.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("features")}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-left transition-all group cursor-pointer"
                  >
                    <CheckSquare className="w-6 h-6 text-slate-700 group-hover:text-[#E31E24] mb-3" />
                    <h4 className="text-sm font-extrabold text-slate-950 group-hover:text-[#E31E24]">02. Section Keunggulan</h4>
                    <p className="text-xs text-slate-500 mt-1">Edit 4 badge ramah lingkungan & deskripsi produk murni.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("performance")}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-left transition-all group cursor-pointer"
                  >
                    <Zap className="w-6 h-6 text-slate-700 group-hover:text-[#E31E24] mb-3" />
                    <h4 className="text-sm font-extrabold text-slate-950 group-hover:text-[#E31E24]">03. Section Performa Ekspor</h4>
                    <p className="text-xs text-slate-500 mt-1">Edit 4 pilar performa (Tanpa Bau, Abu Sedikit, Panas Tinggi, Nyala Lama).</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("oem")}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-left transition-all group cursor-pointer"
                  >
                    <Package className="w-6 h-6 text-slate-700 group-hover:text-[#E31E24] mb-3" />
                    <h4 className="text-sm font-extrabold text-slate-950 group-hover:text-[#E31E24]">04. Section OEM Private Label</h4>
                    <p className="text-xs text-slate-500 mt-1">Edit 4 pilar layanan OEM (Formulasi, Kemasan Box, QC, Dokumen).</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("legality")}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-left transition-all group cursor-pointer"
                  >
                    <ShieldCheck className="w-6 h-6 text-slate-700 group-hover:text-[#E31E24] mb-3" />
                    <h4 className="text-sm font-extrabold text-slate-950 group-hover:text-[#E31E24]">05. Section Legalitas Ekspor</h4>
                    <p className="text-xs text-slate-500 mt-1">Edit daftar sertifikat resmi & dokumen ekspor buyer.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("gallery")}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-left transition-all group cursor-pointer"
                  >
                    <ImageIcon className="w-6 h-6 text-slate-700 group-hover:text-[#E31E24] mb-3" />
                    <h4 className="text-sm font-extrabold text-slate-950 group-hover:text-[#E31E24]">06. Section Galeri Foto</h4>
                    <p className="text-xs text-slate-500 mt-1">Edit & unggah foto galeri dokumentasi aktivitas pabrik.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("products")}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-left transition-all group cursor-pointer"
                  >
                    <ShoppingBag className="w-6 h-6 text-slate-700 group-hover:text-[#E31E24] mb-3" />
                    <h4 className="text-sm font-extrabold text-slate-950 group-hover:text-[#E31E24]">07. Section Produk & Spesifikasi</h4>
                    <p className="text-xs text-slate-500 mt-1">Edit spesifikasi produk briket, foto produk, tabel ukuran, & grade.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("news")}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 text-left transition-all group cursor-pointer"
                  >
                    <FileText className="w-6 h-6 text-slate-700 group-hover:text-[#E31E24] mb-3" />
                    <h4 className="text-sm font-extrabold text-slate-950 group-hover:text-[#E31E24]">08. Section Berita</h4>
                    <p className="text-xs text-slate-500 mt-1">Edit konten berita, hapus, & tambah dengan editor WYSIWYG.</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VISUAL LIVE EDITOR - ABOUT SECTION (01) */}
          {activeTab === "about" && (
            <div className="space-y-8">
              {/* Header Banner & Save Action */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                      Visual Live Editor - About Section (01) ({editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Mengedit dalam mode <strong>{editLang === "id" ? "Bahasa Indonesia" : "English"}</strong>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveAbout}
                  disabled={isSavingAbout}
                  className="btn-red-glossy shrink-0 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer disabled:opacity-70"
                >
                  {isSavingAbout ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan Perubahan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>

              {aboutAlert && (
                <div
                  className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between ${
                    aboutAlert.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span>{aboutAlert.msg}</span>
                  <button onClick={() => setAboutAlert(null)} className="text-xs font-bold underline">Tutup</button>
                </div>
              )}

              {/* REAL LIVE VISUAL COMPONENT PREVIEW FOR ABOUT SECTION */}
              <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden relative">
                <div className="bg-slate-950 px-6 py-3 text-white flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-slate-400 font-mono">
                      Tampilan Asli Website - Mode Editing: {editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"}
                    </span>
                  </div>
                  <span className="text-red-400 font-bold text-[11px] flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" /> Klik / Edit Teks Di Bawah
                  </span>
                </div>

                <div className="p-8 sm:p-12 bg-[#FCFCFC] space-y-12">
                  <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-black text-[#E31E24] font-mono">01.</span>
                      <input
                        type="text"
                        value={editLang === "id" ? aboutForm.badge_id || "" : aboutForm.badge_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setAboutForm({ ...aboutForm, badge_id: e.target.value })
                            : setAboutForm({ ...aboutForm, badge_en: e.target.value })
                        }
                        className="px-4 py-1.5 rounded-full bg-red-50 border border-red-300 text-xs font-bold tracking-widest text-[#E31E24] uppercase text-center focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
                      />
                    </div>

                    <div className="w-full mb-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">2. Judul Utama Section ({editLang.toUpperCase()})</label>
                      <input
                        type="text"
                        value={editLang === "id" ? aboutForm.title_id || "" : aboutForm.title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setAboutForm({ ...aboutForm, title_id: e.target.value })
                            : setAboutForm({ ...aboutForm, title_en: e.target.value })
                        }
                        className="w-full text-2xl sm:text-4xl font-extrabold text-slate-950 text-center tracking-tight bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#E31E24]"
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">3. Sub-Judul Deskripsi Singkat ({editLang.toUpperCase()})</label>
                      <textarea
                        rows={2}
                        value={editLang === "id" ? aboutForm.subtitle_id || "" : aboutForm.subtitle_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setAboutForm({ ...aboutForm, subtitle_id: e.target.value })
                            : setAboutForm({ ...aboutForm, subtitle_en: e.target.value })
                        }
                        className="w-full text-sm sm:text-base text-slate-600 font-medium text-center bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#E31E24]"
                      />
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-10 items-start border-t border-slate-200/80 pt-10">
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Logo Perusahaan</label>
                      
                      {/* Logo Preview Box */}
                      <div className="w-full max-w-sm p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center relative min-h-[140px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getAdminImgUrl(aboutForm.logo_url, "/logo3.png")}
                          alt="Logo Preview"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (!target.getAttribute("data-failed")) {
                              target.setAttribute("data-failed", "true");
                              target.src = "/logo3.png";
                            }
                          }}
                          className="h-24 w-auto object-contain filter drop-shadow-sm"
                        />

                        {isUploadingAboutLogo && (
                          <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex flex-col items-center justify-center text-white text-xs font-bold gap-2">
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Mengunggah Logo...</span>
                          </div>
                        )}
                      </div>

                      {/* Direct Upload File Button for Logo */}
                      <label className="w-full max-w-sm py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-[#E31E24] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Foto Logo Baru</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadAboutLogo(file);
                          }}
                        />
                      </label>

                      {/* URL Link Input for Logo */}
                      <div className="w-full max-w-sm">
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">URL Link Foto Logo</label>
                        <input
                          type="text"
                          value={aboutForm.logo_url || ""}
                          onChange={(e) => setAboutForm({ ...aboutForm, logo_url: e.target.value })}
                          className="w-full text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:bg-white focus:border-[#E31E24]"
                        />
                      </div>

                      <div className="w-full max-w-sm space-y-3 pt-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">4. Nama Perusahaan</label>
                        <input
                          type="text"
                          value={aboutForm.company_name || ""}
                          onChange={(e) => setAboutForm({ ...aboutForm, company_name: e.target.value })}
                          className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#E31E24]"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">5. Paragraf Utama 1 ({editLang.toUpperCase()})</label>
                        <textarea
                          rows={3}
                          value={editLang === "id" ? aboutForm.paragraph1_id || "" : aboutForm.paragraph1_en || ""}
                          onChange={(e) =>
                            editLang === "id"
                              ? setAboutForm({ ...aboutForm, paragraph1_id: e.target.value })
                              : setAboutForm({ ...aboutForm, paragraph1_en: e.target.value })
                          }
                          className="w-full text-xs sm:text-sm text-slate-700 bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#E31E24]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">6. Paragraf Utama 2 ({editLang.toUpperCase()})</label>
                        <textarea
                          rows={2}
                          value={editLang === "id" ? aboutForm.paragraph2_id || "" : aboutForm.paragraph2_en || ""}
                          onChange={(e) =>
                            editLang === "id"
                              ? setAboutForm({ ...aboutForm, paragraph2_id: e.target.value })
                              : setAboutForm({ ...aboutForm, paragraph2_en: e.target.value })
                          }
                          className="w-full text-xs sm:text-sm text-slate-700 bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#E31E24]"
                        />
                      </div>

                      <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200">
                        <label className="text-[10px] font-bold text-[#E31E24] uppercase tracking-widest block mb-1">7. Teks Kutipan Komitmen ({editLang.toUpperCase()})</label>
                        <input
                          type="text"
                          value={editLang === "id" ? aboutForm.quote_id || "" : aboutForm.quote_en || ""}
                          onChange={(e) =>
                            editLang === "id"
                              ? setAboutForm({ ...aboutForm, quote_id: e.target.value })
                              : setAboutForm({ ...aboutForm, quote_en: e.target.value })
                          }
                          className="w-full text-xs sm:text-sm font-semibold italic text-[#E31E24] bg-white border border-red-300 rounded-xl p-2.5"
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">8. Tiga Poin Keunggulan Utama Perusahaan ({editLang.toUpperCase()})</label>

                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#E31E24] shrink-0" />
                          <input
                            type="text"
                            value={editLang === "id" ? aboutForm.bullet1_id || "" : aboutForm.bullet1_en || ""}
                            onChange={(e) =>
                              editLang === "id"
                                ? setAboutForm({ ...aboutForm, bullet1_id: e.target.value })
                                : setAboutForm({ ...aboutForm, bullet1_en: e.target.value })
                            }
                            className="w-full text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl p-2"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#E31E24] shrink-0" />
                          <input
                            type="text"
                            value={editLang === "id" ? aboutForm.bullet2_id || "" : aboutForm.bullet2_en || ""}
                            onChange={(e) =>
                              editLang === "id"
                                ? setAboutForm({ ...aboutForm, bullet2_id: e.target.value })
                                : setAboutForm({ ...aboutForm, bullet2_en: e.target.value })
                            }
                            className="w-full text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl p-2"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#E31E24] shrink-0" />
                          <input
                            type="text"
                            value={editLang === "id" ? aboutForm.bullet3_id || "" : aboutForm.bullet3_en || ""}
                            onChange={(e) =>
                              editLang === "id"
                                ? setAboutForm({ ...aboutForm, bullet3_id: e.target.value })
                                : setAboutForm({ ...aboutForm, bullet3_en: e.target.value })
                            }
                            className="w-full text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl p-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VISUAL LIVE EDITOR - FEATURES SECTION (02) */}
          {activeTab === "features" && (
            <div className="space-y-8">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                      Visual Live Editor - Features Section (02) ({editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Kelola 4 badge ramah lingkungan & deskripsi produk murni PT Arcadia Charcoal Indonesia.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveFeatures}
                  disabled={isSavingFeatures}
                  className="btn-red-glossy shrink-0 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer disabled:opacity-70"
                >
                  {isSavingFeatures ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan Perubahan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>

              {featuresAlert && (
                <div
                  className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between ${
                    featuresAlert.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span>{featuresAlert.msg}</span>
                  <button onClick={() => setFeaturesAlert(null)} className="text-xs font-bold underline">Tutup</button>
                </div>
              )}

              <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden relative">
                <div className="bg-slate-950 px-6 py-3 text-white flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-slate-400 font-mono">Tampilan Section Keunggulan</span>
                  </div>
                </div>

                <div className="p-8 sm:p-12 bg-[#FCFCFC] space-y-12">
                  <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
                    <input
                      type="text"
                      value={editLang === "id" ? featuresForm.badge_id || "" : featuresForm.badge_en || ""}
                      onChange={(e) =>
                        editLang === "id"
                          ? setFeaturesForm({ ...featuresForm, badge_id: e.target.value })
                          : setFeaturesForm({ ...featuresForm, badge_en: e.target.value })
                      }
                      className="px-4 py-1.5 rounded-full bg-red-50 border border-red-300 text-xs font-bold tracking-widest text-[#E31E24] uppercase text-center"
                    />

                    <input
                      type="text"
                      value={editLang === "id" ? featuresForm.header_title_id || "" : featuresForm.header_title_en || ""}
                      onChange={(e) =>
                        editLang === "id"
                          ? setFeaturesForm({ ...featuresForm, header_title_id: e.target.value })
                          : setFeaturesForm({ ...featuresForm, header_title_en: e.target.value })
                      }
                      className="w-full text-2xl sm:text-4xl font-extrabold text-slate-950 text-center tracking-tight bg-white border border-slate-300 rounded-xl p-3"
                    />

                    <textarea
                      rows={2}
                      value={editLang === "id" ? featuresForm.header_subtitle_id || "" : featuresForm.header_subtitle_en || ""}
                      onChange={(e) =>
                        editLang === "id"
                          ? setFeaturesForm({ ...featuresForm, header_subtitle_id: e.target.value })
                          : setFeaturesForm({ ...featuresForm, header_subtitle_en: e.target.value })
                      }
                      className="w-full text-sm sm:text-base text-slate-600 font-medium text-center bg-white border border-slate-300 rounded-xl p-3"
                    />
                  </div>

                  <div className="border-t border-slate-200/80 pt-10 space-y-6">
                    <h4 className="text-base font-extrabold text-slate-950">Informasi Item Utama Keunggulan</h4>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Judul Item ({editLang.toUpperCase()})</label>
                        <input
                          type="text"
                          value={editLang === "id" ? featuresForm.item_title_id || "" : featuresForm.item_title_en || ""}
                          onChange={(e) =>
                            editLang === "id"
                              ? setFeaturesForm({ ...featuresForm, item_title_id: e.target.value })
                              : setFeaturesForm({ ...featuresForm, item_title_en: e.target.value })
                          }
                          className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-xl p-2.5"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Sub-Judul Item ({editLang.toUpperCase()})</label>
                        <input
                          type="text"
                          value={editLang === "id" ? featuresForm.item_subtitle_id || "" : featuresForm.item_subtitle_en || ""}
                          onChange={(e) =>
                            editLang === "id"
                              ? setFeaturesForm({ ...featuresForm, item_subtitle_id: e.target.value })
                              : setFeaturesForm({ ...featuresForm, item_subtitle_en: e.target.value })
                          }
                          className="w-full text-sm font-bold text-slate-700 bg-white border border-slate-300 rounded-xl p-2.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Deskripsi Item ({editLang.toUpperCase()})</label>
                      <textarea
                        rows={3}
                        value={editLang === "id" ? featuresForm.item_description_id || "" : featuresForm.item_description_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setFeaturesForm({ ...featuresForm, item_description_id: e.target.value })
                            : setFeaturesForm({ ...featuresForm, item_description_en: e.target.value })
                        }
                        className="w-full text-xs text-slate-600 bg-white border border-slate-300 rounded-xl p-3"
                      />
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">4 Badge Kualitas Alami ({editLang.toUpperCase()})</label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editLang === "id" ? featuresForm.badge1_id || "" : featuresForm.badge1_en || ""}
                          onChange={(e) =>
                            editLang === "id"
                              ? setFeaturesForm({ ...featuresForm, badge1_id: e.target.value })
                              : setFeaturesForm({ ...featuresForm, badge1_en: e.target.value })
                          }
                          className="text-xs font-bold text-[#E31E24] bg-red-50 border border-red-200 rounded-xl p-2.5"
                        />
                        <input
                          type="text"
                          value={editLang === "id" ? featuresForm.badge2_id || "" : featuresForm.badge2_en || ""}
                          onChange={(e) =>
                            editLang === "id"
                              ? setFeaturesForm({ ...featuresForm, badge2_id: e.target.value })
                              : setFeaturesForm({ ...featuresForm, badge2_en: e.target.value })
                          }
                          className="text-xs font-bold text-[#E31E24] bg-red-50 border border-red-200 rounded-xl p-2.5"
                        />
                        <input
                          type="text"
                          value={editLang === "id" ? featuresForm.badge3_id || "" : featuresForm.badge3_en || ""}
                          onChange={(e) =>
                            editLang === "id"
                              ? setFeaturesForm({ ...featuresForm, badge3_id: e.target.value })
                              : setFeaturesForm({ ...featuresForm, badge3_en: e.target.value })
                          }
                          className="text-xs font-bold text-[#E31E24] bg-red-50 border border-red-200 rounded-xl p-2.5"
                        />
                        <input
                          type="text"
                          value={editLang === "id" ? featuresForm.badge4_id || "" : featuresForm.badge4_en || ""}
                          onChange={(e) =>
                            editLang === "id"
                              ? setFeaturesForm({ ...featuresForm, badge4_id: e.target.value })
                              : setFeaturesForm({ ...featuresForm, badge4_en: e.target.value })
                          }
                          className="text-xs font-bold text-[#E31E24] bg-red-50 border border-red-200 rounded-xl p-2.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VISUAL LIVE EDITOR - PERFORMANCE SECTION (03) */}
          {activeTab === "performance" && (
            <div className="space-y-8">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                      Visual Live Editor - Performance Section (03) ({editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Kelola 4 pilar performa pembakaran arang (Tanpa Bau, Abu Minimal, Nyala Lama, Panas Tinggi).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSavePerf}
                  disabled={isSavingPerf}
                  className="btn-red-glossy shrink-0 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer disabled:opacity-70"
                >
                  {isSavingPerf ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan Perubahan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>

              {perfAlert && (
                <div
                  className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between ${
                    perfAlert.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span>{perfAlert.msg}</span>
                  <button onClick={() => setPerfAlert(null)} className="text-xs font-bold underline">Tutup</button>
                </div>
              )}

              <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden relative">
                <div className="bg-slate-950 px-6 py-3 text-white flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-slate-400 font-mono">Tampilan Section Performa</span>
                  </div>
                </div>

                <div className="p-8 sm:p-12 bg-[#FCFCFC] space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pilar 1 */}
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
                      <span className="text-xs font-mono font-bold text-[#E31E24]">Pilar 01</span>
                      <input
                        type="text"
                        value={editLang === "id" ? perfForm.item1_title_id || "" : perfForm.item1_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item1_title_id: e.target.value })
                            : setPerfForm({ ...perfForm, item1_title_en: e.target.value })
                        }
                        className="w-full text-base font-extrabold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <input
                        type="text"
                        value={editLang === "id" ? perfForm.item1_badge_id || "" : perfForm.item1_badge_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item1_badge_id: e.target.value })
                            : setPerfForm({ ...perfForm, item1_badge_en: e.target.value })
                        }
                        className="w-full text-xs font-bold text-[#E31E24] bg-red-50 border border-red-200 rounded-lg p-2"
                      />
                      <textarea
                        rows={2}
                        value={editLang === "id" ? perfForm.item1_desc_id || "" : perfForm.item1_desc_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item1_desc_id: e.target.value })
                            : setPerfForm({ ...perfForm, item1_desc_en: e.target.value })
                        }
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                    </div>

                    {/* Pilar 2 */}
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
                      <span className="text-xs font-mono font-bold text-[#E31E24]">Pilar 02</span>
                      <input
                        type="text"
                        value={editLang === "id" ? perfForm.item2_title_id || "" : perfForm.item2_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item2_title_id: e.target.value })
                            : setPerfForm({ ...perfForm, item2_title_en: e.target.value })
                        }
                        className="w-full text-base font-extrabold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <input
                        type="text"
                        value={editLang === "id" ? perfForm.item2_badge_id || "" : perfForm.item2_badge_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item2_badge_id: e.target.value })
                            : setPerfForm({ ...perfForm, item2_badge_en: e.target.value })
                        }
                        className="w-full text-xs font-bold text-[#E31E24] bg-red-50 border border-red-200 rounded-lg p-2"
                      />
                      <textarea
                        rows={2}
                        value={editLang === "id" ? perfForm.item2_desc_id || "" : perfForm.item2_desc_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item2_desc_id: e.target.value })
                            : setPerfForm({ ...perfForm, item2_desc_en: e.target.value })
                        }
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                    </div>

                    {/* Pilar 3 */}
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
                      <span className="text-xs font-mono font-bold text-[#E31E24]">Pilar 03</span>
                      <input
                        type="text"
                        value={editLang === "id" ? perfForm.item3_title_id || "" : perfForm.item3_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item3_title_id: e.target.value })
                            : setPerfForm({ ...perfForm, item3_title_en: e.target.value })
                        }
                        className="w-full text-base font-extrabold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <input
                        type="text"
                        value={editLang === "id" ? perfForm.item3_badge_id || "" : perfForm.item3_badge_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item3_badge_id: e.target.value })
                            : setPerfForm({ ...perfForm, item3_badge_en: e.target.value })
                        }
                        className="w-full text-xs font-bold text-[#E31E24] bg-red-50 border border-red-200 rounded-lg p-2"
                      />
                      <textarea
                        rows={2}
                        value={editLang === "id" ? perfForm.item3_desc_id || "" : perfForm.item3_desc_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item3_desc_id: e.target.value })
                            : setPerfForm({ ...perfForm, item3_desc_en: e.target.value })
                        }
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                    </div>

                    {/* Pilar 4 */}
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
                      <span className="text-xs font-mono font-bold text-[#E31E24]">Pilar 04</span>
                      <input
                        type="text"
                        value={editLang === "id" ? perfForm.item4_title_id || "" : perfForm.item4_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item4_title_id: e.target.value })
                            : setPerfForm({ ...perfForm, item4_title_en: e.target.value })
                        }
                        className="w-full text-base font-extrabold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <input
                        type="text"
                        value={editLang === "id" ? perfForm.item4_badge_id || "" : perfForm.item4_badge_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item4_badge_id: e.target.value })
                            : setPerfForm({ ...perfForm, item4_badge_en: e.target.value })
                        }
                        className="w-full text-xs font-bold text-[#E31E24] bg-red-50 border border-red-200 rounded-lg p-2"
                      />
                      <textarea
                        rows={2}
                        value={editLang === "id" ? perfForm.item4_desc_id || "" : perfForm.item4_desc_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setPerfForm({ ...perfForm, item4_desc_id: e.target.value })
                            : setPerfForm({ ...perfForm, item4_desc_en: e.target.value })
                        }
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VISUAL LIVE EDITOR - OEM SECTION (04) */}
          {activeTab === "oem" && (
            <div className="space-y-8">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                      Visual Live Editor - OEM Section (04) ({editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Kelola 4 pilar layanan OEM private label (Formulasi, Kemasan Box, QC, & Dokumen).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveOem}
                  disabled={isSavingOem}
                  className="btn-red-glossy shrink-0 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer disabled:opacity-70"
                >
                  {isSavingOem ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan Perubahan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>

              {oemAlert && (
                <div
                  className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between ${
                    oemAlert.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span>{oemAlert.msg}</span>
                  <button onClick={() => setOemAlert(null)} className="text-xs font-bold underline">Tutup</button>
                </div>
              )}

              <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden relative">
                <div className="bg-slate-950 px-6 py-3 text-white flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-slate-400 font-mono">Tampilan Section OEM Private Label</span>
                  </div>
                </div>

                <div className="p-8 sm:p-12 bg-[#FCFCFC] space-y-8">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editLang === "id" ? oemForm.title_id || "" : oemForm.title_en || ""}
                      onChange={(e) =>
                        editLang === "id"
                          ? setOemForm({ ...oemForm, title_id: e.target.value })
                          : setOemForm({ ...oemForm, title_en: e.target.value })
                      }
                      className="w-full text-2xl font-extrabold text-[#E31E24] bg-white border border-slate-300 rounded-xl p-3"
                    />

                    <textarea
                      rows={2}
                      value={editLang === "id" ? oemForm.description_id || "" : oemForm.description_en || ""}
                      onChange={(e) =>
                        editLang === "id"
                          ? setOemForm({ ...oemForm, description_id: e.target.value })
                          : setOemForm({ ...oemForm, description_en: e.target.value })
                      }
                      className="w-full text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl p-3"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
                      <span className="text-xs font-mono font-bold text-[#E31E24]">OEM Pilar 01</span>
                      <input
                        type="text"
                        value={editLang === "id" ? oemForm.p1_title_id || "" : oemForm.p1_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setOemForm({ ...oemForm, p1_title_id: e.target.value })
                            : setOemForm({ ...oemForm, p1_title_en: e.target.value })
                        }
                        className="w-full text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <textarea
                        rows={2}
                        value={editLang === "id" ? oemForm.p1_desc_id || "" : oemForm.p1_desc_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setOemForm({ ...oemForm, p1_desc_id: e.target.value })
                            : setOemForm({ ...oemForm, p1_desc_en: e.target.value })
                        }
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
                      <span className="text-xs font-mono font-bold text-[#E31E24]">OEM Pilar 02</span>
                      <input
                        type="text"
                        value={editLang === "id" ? oemForm.p2_title_id || "" : oemForm.p2_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setOemForm({ ...oemForm, p2_title_id: e.target.value })
                            : setOemForm({ ...oemForm, p2_title_en: e.target.value })
                        }
                        className="w-full text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <textarea
                        rows={2}
                        value={editLang === "id" ? oemForm.p2_desc_id || "" : oemForm.p2_desc_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setOemForm({ ...oemForm, p2_desc_id: e.target.value })
                            : setOemForm({ ...oemForm, p2_desc_en: e.target.value })
                        }
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
                      <span className="text-xs font-mono font-bold text-[#E31E24]">OEM Pilar 03</span>
                      <input
                        type="text"
                        value={editLang === "id" ? oemForm.p3_title_id || "" : oemForm.p3_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setOemForm({ ...oemForm, p3_title_id: e.target.value })
                            : setOemForm({ ...oemForm, p3_title_en: e.target.value })
                        }
                        className="w-full text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <textarea
                        rows={2}
                        value={editLang === "id" ? oemForm.p3_desc_id || "" : oemForm.p3_desc_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setOemForm({ ...oemForm, p3_desc_id: e.target.value })
                            : setOemForm({ ...oemForm, p3_desc_en: e.target.value })
                        }
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
                      <span className="text-xs font-mono font-bold text-[#E31E24]">OEM Pilar 04</span>
                      <input
                        type="text"
                        value={editLang === "id" ? oemForm.p4_title_id || "" : oemForm.p4_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setOemForm({ ...oemForm, p4_title_id: e.target.value })
                            : setOemForm({ ...oemForm, p4_title_en: e.target.value })
                        }
                        className="w-full text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <textarea
                        rows={2}
                        value={editLang === "id" ? oemForm.p4_desc_id || "" : oemForm.p4_desc_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setOemForm({ ...oemForm, p4_desc_id: e.target.value })
                            : setOemForm({ ...oemForm, p4_desc_en: e.target.value })
                        }
                        className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VISUAL LIVE EDITOR - LEGALITY SECTION (05) */}
          {activeTab === "legality" && (
            <div className="space-y-8">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                      Visual Live Editor - Legality Section (05) ({editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Kelola sertifikasi legalitas & daftar dokumen ekspor untuk buyer luar negeri.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveLegality}
                  disabled={isSavingLegality}
                  className="btn-red-glossy shrink-0 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer disabled:opacity-70"
                >
                  {isSavingLegality ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan Perubahan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>

              {legalityAlert && (
                <div
                  className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between ${
                    legalityAlert.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span>{legalityAlert.msg}</span>
                  <button onClick={() => setLegalityAlert(null)} className="text-xs font-bold underline">Tutup</button>
                </div>
              )}

              <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden relative">
                <div className="bg-slate-950 px-6 py-3 text-white flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-slate-400 font-mono">Tampilan Section Legalitas</span>
                  </div>
                </div>

                <div className="p-8 sm:p-12 bg-[#FCFCFC] space-y-8">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editLang === "id" ? legalityForm.header_title_id || "" : legalityForm.header_title_en || ""}
                      onChange={(e) =>
                        editLang === "id"
                          ? setLegalityForm({ ...legalityForm, header_title_id: e.target.value })
                          : setLegalityForm({ ...legalityForm, header_title_en: e.target.value })
                      }
                      className="w-full text-2xl font-extrabold text-slate-950 bg-white border border-slate-300 rounded-xl p-3"
                    />

                    <textarea
                      rows={2}
                      value={editLang === "id" ? legalityForm.header_subtitle_id || "" : legalityForm.header_subtitle_en || ""}
                      onChange={(e) =>
                        editLang === "id"
                          ? setLegalityForm({ ...legalityForm, header_subtitle_id: e.target.value })
                          : setLegalityForm({ ...legalityForm, header_subtitle_en: e.target.value })
                      }
                      className="w-full text-sm text-slate-600 bg-white border border-slate-300 rounded-xl p-3"
                    />
                  </div>

                  {/* Standard Docs Array Editor */}
                  <div className="border-t border-slate-200 pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-950">Daftar Dokumen Ekspor Standar ({editLang.toUpperCase()})</h4>
                      <button
                        type="button"
                        onClick={addStandardDocItem}
                        className="text-xs font-bold text-[#E31E24] flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Tambah Baris Dokumen
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(legalityForm.standard_docs_json || []).map((doc: any, dIdx: number) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <input
                            type="text"
                            value={editLang === "id" ? doc.id || doc.en || "" : doc.en || doc.id || ""}
                            onChange={(e) => {
                              const updated = [...(legalityForm.standard_docs_json || [])];
                              if (editLang === "id") updated[dIdx].id = e.target.value;
                              else updated[dIdx].en = e.target.value;
                              setLegalityForm({ ...legalityForm, standard_docs_json: updated });
                            }}
                            className="w-full text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl p-2.5"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              triggerDeleteConfirmation(
                                "Hapus Dokumen Standar",
                                doc.id || doc.en || `Dokumen #${dIdx + 1}`,
                                () => removeStandardDocItem(dIdx)
                              )
                            }
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors shrink-0 cursor-pointer"
                            title="Hapus Dokumen Ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Docs Array Editor */}
                  <div className="border-t border-slate-200 pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-950">Daftar Dokumen Tambahan Buyer ({editLang.toUpperCase()})</h4>
                      <button
                        type="button"
                        onClick={addAdditionalDocItem}
                        className="text-xs font-bold text-[#E31E24] flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Tambah Baris Dokumen Tambahan
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(legalityForm.additional_docs_json || []).map((doc: any, aIdx: number) => (
                        <div key={aIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                          <input
                            type="text"
                            value={editLang === "id" ? doc.id || doc.en || "" : doc.en || doc.id || ""}
                            onChange={(e) => {
                              const updated = [...(legalityForm.additional_docs_json || [])];
                              if (editLang === "id") updated[aIdx].id = e.target.value;
                              else updated[aIdx].en = e.target.value;
                              setLegalityForm({ ...legalityForm, additional_docs_json: updated });
                            }}
                            className="w-full text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl p-2.5"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              triggerDeleteConfirmation(
                                "Hapus Dokumen Tambahan",
                                doc.id || doc.en || `Dokumen Tambahan #${aIdx + 1}`,
                                () => removeAdditionalDocItem(aIdx)
                              )
                            }
                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors shrink-0 cursor-pointer"
                            title="Hapus Dokumen Ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VISUAL LIVE EDITOR - GALLERY SECTION (06) */}
          {activeTab === "gallery" && (
            <div className="space-y-8">
              {/* Header Banner & Save Action */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                      Visual Live Editor - Galeri Foto (06) ({editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Unggah foto baru, perbarui galeri, serta edit judul & kategori foto secara langsung.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveGallery}
                  disabled={isSavingGallery}
                  className="btn-red-glossy shrink-0 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer disabled:opacity-70"
                >
                  {isSavingGallery ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan Perubahan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>

              {galleryAlert && (
                <div
                  className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between ${
                    galleryAlert.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span>{galleryAlert.msg}</span>
                  <button onClick={() => setGalleryAlert(null)} className="text-xs font-bold underline">Tutup</button>
                </div>
              )}

              {/* REAL LIVE VISUAL COMPONENT PREVIEW FOR GALLERY SECTION */}
              <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden relative">
                <div className="bg-slate-950 px-6 py-3 text-white flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-slate-400 font-mono">
                      Tampilan Asli Website - Mode Editing: {editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"}
                    </span>
                  </div>
                  <span className="text-red-400 font-bold text-[11px] flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" /> Klik / Edit Teks & Foto Di Bawah
                  </span>
                </div>

                <div className="p-8 sm:p-12 bg-[#FCFCFC] space-y-12">
                  {/* Header Controls */}
                  <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-black text-[#E31E24] font-mono">03.</span>
                      <input
                        type="text"
                        value={editLang === "id" ? galleryForm.badge_id || "" : galleryForm.badge_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setGalleryForm({ ...galleryForm, badge_id: e.target.value })
                            : setGalleryForm({ ...galleryForm, badge_en: e.target.value })
                        }
                        className="px-4 py-1.5 rounded-full bg-red-50 border border-red-300 text-xs font-bold tracking-widest text-[#E31E24] uppercase text-center focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
                      />
                    </div>

                    <div className="w-full mb-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Judul Utama Galeri ({editLang.toUpperCase()})</label>
                      <input
                        type="text"
                        value={editLang === "id" ? galleryForm.header_title_id || "" : galleryForm.header_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setGalleryForm({ ...galleryForm, header_title_id: e.target.value })
                            : setGalleryForm({ ...galleryForm, header_title_en: e.target.value })
                        }
                        className="w-full text-2xl sm:text-4xl font-extrabold text-slate-950 text-center tracking-tight bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#E31E24]"
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Sub-Judul Deskripsi Galeri ({editLang.toUpperCase()})</label>
                      <textarea
                        rows={2}
                        value={editLang === "id" ? galleryForm.header_subtitle_id || "" : galleryForm.header_subtitle_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setGalleryForm({ ...galleryForm, header_subtitle_id: e.target.value })
                            : setGalleryForm({ ...galleryForm, header_subtitle_en: e.target.value })
                        }
                        className="w-full text-sm sm:text-base text-slate-600 font-medium text-center bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#E31E24]"
                      />
                    </div>
                  </div>

                  {/* Gallery Items Grid Live Editor */}
                  <div className="border-t border-slate-200/80 pt-10 space-y-8">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-[#E31E24]" />
                        <span>Daftar Foto Galeri ({(galleryForm.photos_json || []).length} Foto)</span>
                      </h4>

                      <button
                        type="button"
                        onClick={addGalleryItem}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Foto Galeri Baru</span>
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {(galleryForm.photos_json || []).map((photo: any, index: number) => (
                        <div key={index} className="bg-white border-2 border-slate-200 hover:border-red-300 rounded-3xl p-4 shadow-sm space-y-4 relative transition-all">
                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() =>
                              triggerDeleteConfirmation(
                                "Hapus Foto Galeri",
                                photo.title_id || photo.title_en || `Foto Galeri #${index + 1}`,
                                () => removeGalleryItem(index)
                              )
                            }
                            className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                            title="Hapus Foto Ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Image Preview Box */}
                          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={getAdminImgUrl(photo.src || photo.local_src, "/legalitas1.png")}
                              alt="Gallery Preview"
                              className="w-full h-full object-cover"
                            />

                            {/* Uploading Overlay Spinner */}
                            {uploadingImgIndex === index && (
                              <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white text-xs font-bold gap-2">
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Mengunggah Foto...</span>
                              </div>
                            )}
                          </div>

                          {/* Upload File Direct Button */}
                          <label className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-[#E31E24] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                            <UploadCloud className="w-4 h-4" />
                            <span>Upload Foto Baru</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUploadImageToImgBB(file, index);
                              }}
                            />
                          </label>

                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">URL Link Foto</label>
                            <input
                              type="text"
                              value={photo.src || ""}
                              onChange={(e) => {
                                const updated = [...(galleryForm.photos_json || [])];
                                updated[index].src = e.target.value;
                                setGalleryForm({ ...galleryForm, photos_json: updated });
                              }}
                              className="w-full text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:bg-white focus:border-[#E31E24]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Judul Foto ({editLang.toUpperCase()})</label>
                            <input
                              type="text"
                              value={editLang === "id" ? photo.title_id || "" : photo.title_en || ""}
                              onChange={(e) => {
                                const updated = [...(galleryForm.photos_json || [])];
                                if (editLang === "id") updated[index].title_id = e.target.value;
                                else updated[index].title_en = e.target.value;
                                setGalleryForm({ ...galleryForm, photos_json: updated });
                              }}
                              className="w-full text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:bg-white focus:border-[#E31E24]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Kategori Foto ({editLang.toUpperCase()})</label>
                            <select
                              value={
                                editLang === "id"
                                  ? photo.category_id || "Produksi"
                                  : photo.category_en || "Production"
                              }
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                const updated = [...(galleryForm.photos_json || [])];
                                const catMapping: Record<string, { id: string; en: string }> = {
                                  "Produksi": { id: "Produksi", en: "Production" },
                                  "Production": { id: "Produksi", en: "Production" },
                                  "Fasilitas & Tungku": { id: "Fasilitas & Tungku", en: "Kilns & Facilities" },
                                  "Kilns & Facilities": { id: "Fasilitas & Tungku", en: "Kilns & Facilities" },
                                  "Bahan Baku": { id: "Bahan Baku", en: "Raw Materials" },
                                  "Raw Materials": { id: "Bahan Baku", en: "Raw Materials" },
                                  "Kontrol Kualitas": { id: "Kontrol Kualitas", en: "Quality Control" },
                                  "Quality Control": { id: "Kontrol Kualitas", en: "Quality Control" },
                                  "Gudang & Logistik": { id: "Gudang & Logistik", en: "Logistics & Warehouse" },
                                  "Logistics & Warehouse": { id: "Gudang & Logistik", en: "Logistics & Warehouse" },
                                };

                                const match = catMapping[selectedValue];
                                if (match) {
                                  updated[index].category_id = match.id;
                                  updated[index].category_en = match.en;
                                } else {
                                  if (editLang === "id") updated[index].category_id = selectedValue;
                                  else updated[index].category_en = selectedValue;
                                }
                                setGalleryForm({ ...galleryForm, photos_json: updated });
                              }}
                              className="w-full text-xs font-bold text-[#E31E24] bg-red-50/80 border border-red-200 rounded-lg p-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E31E24] cursor-pointer"
                            >
                              <option value={editLang === "id" ? "Produksi" : "Production"}>
                                {editLang === "id" ? "Produksi" : "Production"}
                              </option>
                              <option value={editLang === "id" ? "Fasilitas & Tungku" : "Kilns & Facilities"}>
                                {editLang === "id" ? "Fasilitas & Tungku" : "Kilns & Facilities"}
                              </option>
                              <option value={editLang === "id" ? "Bahan Baku" : "Raw Materials"}>
                                {editLang === "id" ? "Bahan Baku" : "Raw Materials"}
                              </option>
                              <option value={editLang === "id" ? "Kontrol Kualitas" : "Quality Control"}>
                                {editLang === "id" ? "Kontrol Kualitas" : "Quality Control"}
                              </option>
                              <option value={editLang === "id" ? "Gudang & Logistik" : "Logistics & Warehouse"}>
                                {editLang === "id" ? "Gudang & Logistik" : "Logistics & Warehouse"}
                              </option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VISUAL LIVE EDITOR - PRODUCTS & SPECIFICATIONS (07) & IMGBB */}
          {activeTab === "products" && (
            <div className="space-y-8">
              {/* Header Banner & Save Action */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
                      Visual Live Editor - Produk & Spesifikasi (07) ({editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Anda dapat mengedit spesifikasi detail, jenis arang, deskripsi, serta mengunggah foto produk baru secara langsung.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveProducts}
                  disabled={isSavingProducts}
                  className="btn-red-glossy shrink-0 inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer disabled:opacity-70"
                >
                  {isSavingProducts ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan Perubahan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>

              {productsAlert && (
                <div
                  className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between ${
                    productsAlert.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span>{productsAlert.msg}</span>
                  <button onClick={() => setProductsAlert(null)} className="text-xs font-bold underline">Tutup</button>
                </div>
              )}

              {/* REAL LIVE VISUAL COMPONENT PREVIEW FOR PRODUCTS SECTION */}
              <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden relative">
                <div className="bg-slate-950 px-6 py-3 text-white flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-slate-400 font-mono">
                      Tampilan Asli Page Produk - Mode Editing: {editLang === "id" ? "🇮🇩 Bahasa Indonesia" : "🇬🇧 English"}
                    </span>
                  </div>
                  <span className="text-red-400 font-bold text-[11px] flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" /> Klik / Edit Teks & Foto Produk
                  </span>
                </div>

                <div className="p-8 sm:p-12 bg-[#FCFCFC] space-y-12">
                  {/* Header Controls */}
                  <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <div className="w-full mb-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Judul Utama Halaman Produk ({editLang.toUpperCase()})</label>
                      <input
                        type="text"
                        value={editLang === "id" ? productsForm.header_title_id || "" : productsForm.header_title_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setProductsForm({ ...productsForm, header_title_id: e.target.value })
                            : setProductsForm({ ...productsForm, header_title_en: e.target.value })
                        }
                        className="w-full text-2xl sm:text-4xl font-extrabold text-slate-950 text-center tracking-tight bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#E31E24]"
                      />
                    </div>

                    <div className="w-full">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Sub-Judul Deskripsi Produk ({editLang.toUpperCase()})</label>
                      <textarea
                        rows={2}
                        value={editLang === "id" ? productsForm.header_subtitle_id || "" : productsForm.header_subtitle_en || ""}
                        onChange={(e) =>
                          editLang === "id"
                            ? setProductsForm({ ...productsForm, header_subtitle_id: e.target.value })
                            : setProductsForm({ ...productsForm, header_subtitle_en: e.target.value })
                        }
                        className="w-full text-sm sm:text-base text-slate-600 font-medium text-center bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#E31E24]"
                      />
                    </div>
                  </div>

                  {/* Products Grid Live Editor */}
                  <div className="border-t border-slate-200/80 pt-10 space-y-12">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#E31E24]" />
                        <span>Daftar Produk Arang Ekspor ({(productsForm.products_json || []).length} Produk)</span>
                      </h4>

                      <button
                        type="button"
                        onClick={addProductItem}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Produk Baru</span>
                      </button>
                    </div>

                    {(productsForm.products_json || []).map((prod: any, pIdx: number) => (
                      <div
                        key={pIdx}
                        className="bg-white border-2 border-slate-200 hover:border-red-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative transition-all"
                      >
                        {/* Delete Product Button */}
                        <button
                          type="button"
                          onClick={() =>
                            triggerDeleteConfirmation(
                              "Hapus Produk Arang",
                              prod.title_id || prod.title_en || `Produk #${pIdx + 1}`,
                              () => removeProductItem(pIdx)
                            )
                          }
                          className="absolute top-4 right-4 p-2.5 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                          title="Hapus Produk Ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid lg:grid-cols-12 gap-8 items-start">
                          {/* Image Box */}
                          <div className="lg:col-span-4 space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Foto Produk</label>
                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-4 flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={getAdminImgUrl(prod.image || prod.local_src, "/products/shisha.png")}
                                alt="Product Preview"
                                onError={(e) => {
                                  const target = e.currentTarget as HTMLImageElement;
                                  const fallback = prod.local_src || "/products/shisha.png";
                                  if (!target.getAttribute("data-failed")) {
                                    target.setAttribute("data-failed", "true");
                                    target.src = fallback;
                                  }
                                }}
                                className="w-full h-full object-contain filter drop-shadow-xl"
                              />

                              {uploadingProdImgIndex === pIdx && (
                                <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white text-xs font-bold gap-2">
                                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span>Mengunggah Foto...</span>
                                </div>
                              )}
                            </div>

                            {/* Direct File Upload Button */}
                            <label className="w-full py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-[#E31E24] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                              <UploadCloud className="w-4 h-4" />
                              <span>Upload Foto Produk Baru</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleUploadProductImageToImgBB(file, pIdx);
                                }}
                              />
                            </label>

                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">URL Link Foto Produk</label>
                              <input
                                type="text"
                                value={prod.image || ""}
                                onChange={(e) => {
                                  const updated = [...(productsForm.products_json || [])];
                                  updated[pIdx].image = e.target.value;
                                  setProductsForm({ ...productsForm, products_json: updated });
                                }}
                                className="w-full text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:bg-white focus:border-[#E31E24]"
                              />
                            </div>
                          </div>

                          {/* Product Information Inputs */}
                          <div className="lg:col-span-8 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nomor Seri (contoh: 01.)</label>
                                <input
                                  type="text"
                                  value={prod.number || ""}
                                  onChange={(e) => {
                                    const updated = [...(productsForm.products_json || [])];
                                    updated[pIdx].number = e.target.value;
                                    setProductsForm({ ...productsForm, products_json: updated });
                                  }}
                                  className="w-full text-sm font-black text-[#E31E24] bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono"
                                />
                              </div>

                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Kategori Header (contoh: SHISHA BRIQUETTES)</label>
                                <input
                                  type="text"
                                  value={prod.categoryTitle || ""}
                                  onChange={(e) => {
                                    const updated = [...(productsForm.products_json || [])];
                                    updated[pIdx].categoryTitle = e.target.value;
                                    setProductsForm({ ...productsForm, products_json: updated });
                                  }}
                                  className="w-full text-sm font-bold text-red-600 bg-slate-50 border border-slate-300 rounded-xl p-2.5 uppercase"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Judul Produk ({editLang.toUpperCase()})</label>
                              <input
                                type="text"
                                value={editLang === "id" ? prod.title_id || "" : prod.title_en || ""}
                                onChange={(e) => {
                                  const updated = [...(productsForm.products_json || [])];
                                  if (editLang === "id") updated[pIdx].title_id = e.target.value;
                                  else updated[pIdx].title_en = e.target.value;
                                  setProductsForm({ ...productsForm, products_json: updated });
                                }}
                                className="w-full text-base font-extrabold text-slate-950 bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:border-[#E31E24]"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Sub-Judul Produk ({editLang.toUpperCase()})</label>
                              <input
                                type="text"
                                value={editLang === "id" ? prod.subtitle_id || "" : prod.subtitle_en || ""}
                                onChange={(e) => {
                                  const updated = [...(productsForm.products_json || [])];
                                  if (editLang === "id") updated[pIdx].subtitle_id = e.target.value;
                                  else updated[pIdx].subtitle_en = e.target.value;
                                  setProductsForm({ ...productsForm, products_json: updated });
                                }}
                                className="w-full text-xs font-bold text-slate-700 bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:bg-white"
                              />
                            </div>

                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Deskripsi Lengkap Produk ({editLang.toUpperCase()})</label>
                              <textarea
                                rows={3}
                                value={editLang === "id" ? prod.description_id || "" : prod.description_en || ""}
                                onChange={(e) => {
                                  const updated = [...(productsForm.products_json || [])];
                                  if (editLang === "id") updated[pIdx].description_id = e.target.value;
                                  else updated[pIdx].description_en = e.target.value;
                                  setProductsForm({ ...productsForm, products_json: updated });
                                }}
                                className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-300 rounded-xl p-3 focus:bg-white focus:border-[#E31E24]"
                              />
                            </div>

                            {/* Product Specs List Editor */}
                            <div className="space-y-3 pt-2">
                              <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">Tabel Spesifikasi Teknis Produk</label>
                                <button
                                  type="button"
                                  onClick={() => addProdSpec(pIdx)}
                                  className="text-[10px] font-bold text-[#E31E24] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" /> Tambah Baris Spek
                                </button>
                              </div>

                              <div className="space-y-2">
                                {(prod.specs_json || []).map((spec: any, sIdx: number) => (
                                  <div key={sIdx} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      placeholder="Nama Spek"
                                      value={editLang === "id" ? spec.label_id || spec.label_en || "" : spec.label_en || spec.label_id || ""}
                                      onChange={(e) => {
                                        const updated = [...(productsForm.products_json || [])];
                                        if (editLang === "id") updated[pIdx].specs_json[sIdx].label_id = e.target.value;
                                        else updated[pIdx].specs_json[sIdx].label_en = e.target.value;
                                        setProductsForm({ ...productsForm, products_json: updated });
                                      }}
                                      className="w-1/2 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Nilai Spek"
                                      value={editLang === "id" ? spec.value_id || spec.value_en || spec.value || "" : spec.value_en || spec.value_id || spec.value || ""}
                                      onChange={(e) => {
                                        const updated = [...(productsForm.products_json || [])];
                                        if (editLang === "id") updated[pIdx].specs_json[sIdx].value_id = e.target.value;
                                        else updated[pIdx].specs_json[sIdx].value_en = e.target.value;
                                        setProductsForm({ ...productsForm, products_json: updated });
                                      }}
                                      className="w-1/2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-2"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        triggerDeleteConfirmation(
                                          "Hapus Spesifikasi Teknis",
                                          spec.label_id || spec.label_en || `Spesifikasi #${sIdx + 1}`,
                                          () => removeProdSpec(pIdx, sIdx)
                                        )
                                      }
                                      className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors shrink-0 cursor-pointer"
                                      title="Hapus Spek Ini"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* TAB: VISUAL LIVE EDITOR - NEWS SECTION */}
          {activeTab === "news" && (
            <div className="space-y-8">
              {newsAlert && (
                <div className={`p-4 rounded-xl text-sm font-bold ${newsAlert.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {newsAlert.msg}
                </div>
              )}

              {/* LIST VIEW */}
              {!editingNewsId && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-950">Daftar Berita</h3>
                      <p className="text-sm text-slate-500 mt-1">Kelola publikasi artikel dan berita.</p>
                    </div>
                    <button
                      onClick={() => {
                        setNewsForm({ title_id: "", title_en: "", content_id: "", content_en: "", image_url: "" });
                        setEditingNewsId("NEW");
                      }}
                      className="px-5 py-2.5 bg-[#E31E24] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                    >
                      + Tambah Berita Baru
                    </button>
                  </div>

                  {newsItems.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl">
                      <p className="text-sm text-slate-500">Belum ada berita.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {newsItems.map((item) => (
                        <div key={item.id} className="group border border-slate-200 rounded-2xl overflow-hidden hover:border-red-300 hover:shadow-md transition-all flex flex-col bg-white">
                          <div className="w-full h-40 bg-slate-100 relative overflow-hidden">
                            {item.image_url ? (
                              <img src={item.image_url.includes("i.ibb.co") ? `https://wsrv.nl/?url=${encodeURIComponent(item.image_url)}` : item.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                            )}
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h4 className="font-bold text-sm text-slate-900 line-clamp-2 mb-2">{item.title_id || item.title_en}</h4>
                            <p className="text-[10px] text-slate-400 mb-4">{new Date(item.created_at).toLocaleDateString("id-ID")}</p>
                            <div className="mt-auto flex gap-2">
                              <button onClick={() => { setNewsForm(item); setEditingNewsId(item.id); }} className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition-colors">
                                Edit
                              </button>
                              <button onClick={() => handleDeleteNews(item.id)} className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-lg transition-colors">
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              
              {/* DELETE CONFIRMATION MODAL */}
              {deleteConfirmNewsId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl border border-slate-200">
                    <h3 className="text-xl font-extrabold text-slate-950 mb-2">Hapus Berita?</h3>
                    <p className="text-sm text-slate-500 mb-8">Tindakan ini tidak dapat dibatalkan. Berita ini akan dihapus secara permanen dari database.</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDeleteConfirmNewsId(null)}
                        className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={confirmDeleteNews}
                        className="flex-1 px-4 py-3 bg-[#E31E24] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                      >
                        Ya, Hapus
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FORM VIEW */}
              {editingNewsId && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-950">
                        {editingNewsId === "NEW" ? "Tambah Berita Baru" : "Edit Berita"}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">Isi detail konten berita di bawah ini.</p>
                    </div>
                    <button
                      onClick={() => { setEditingNewsId(null); setNewsAlert(null); }}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                    >
                      Batal / Kembali
                    </button>
                  </div>

                  <div className="space-y-6 max-w-4xl">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Judul (Title) - {editLang.toUpperCase()}</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                        value={editLang === "id" ? newsForm.title_id : newsForm.title_en}
                        onChange={(e) => setNewsForm({ ...newsForm, [editLang === "id" ? "title_id" : "title_en"]: e.target.value })}
                        placeholder="Masukkan judul berita"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Konten (Content) - {editLang.toUpperCase()}</label>
                      <div className="bg-white rounded-xl border border-slate-200">
                        {/* @ts-ignore */}
                        <ReactQuill 
                          theme="snow"
                          value={editLang === "id" ? newsForm.content_id : newsForm.content_en}
                          onChange={(content) => setNewsForm({ ...newsForm, [editLang === "id" ? "content_id" : "content_en"]: content })}
                          modules={quillModules}
                          formats={quillFormats}
                          className="bg-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Gambar Berita</label>
                      <div className="flex gap-4">
                        <div className="w-32 h-32 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {newsForm.image_url ? (
                            <img src={newsForm.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 space-y-3">
                          <button
                            type="button"
                            onClick={() => document.getElementById("news_img_upload")?.click()}
                            disabled={isUploadingNewsImg}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
                          >
                            <UploadCloud className="w-4 h-4" /> 
                            {isUploadingNewsImg ? "Mengunggah..." : "Unggah Gambar"}
                          </button>
                          <input 
                            type="file" 
                            id="news_img_upload" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleNewsImgUpload}
                          />
                          <p className="text-[10px] text-slate-400">Atau masukkan URL manual:</p>
                          <input
                            type="text"
                            placeholder="https://..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none"
                            value={newsForm.image_url}
                            onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <button
                        onClick={handleSaveNews}
                        disabled={isSavingNews}
                        className="w-full sm:w-auto px-8 py-3 bg-[#E31E24] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2"
                      >
                        {isSavingNews ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Save className="w-5 h-5" />
                        )}
                        Simpan Berita
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Custom Animated Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Blur Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModal(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-950">{deleteModal.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Konfirmasi tindakan penghapusan</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Apakah Anda yakin ingin menghapus item ini dari sistem?
                </p>
                <p className="text-xs font-bold text-slate-900 mt-2 truncate bg-white p-2.5 rounded-xl border border-slate-200/80">
                  &ldquo;{deleteModal.itemName}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={() => {
                    deleteModal.onConfirm();
                    setDeleteModal(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Ya, Hapus Sekarang</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
