"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, ChevronRight, Calendar, ArrowLeft, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsDetail() {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [newsItem, setNewsItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getLikedItems = () => {
    if (typeof window !== "undefined") {
      const liked = localStorage.getItem("likedNews");
      return liked ? JSON.parse(liked) : {};
    }
    return {};
  };
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>(getLikedItems());

  useEffect(() => {
    if (id) fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const res = await fetch(`/api/news/${id}`);
      const json = await res.json();
      if (json.success) {
        setNewsItem(json.data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!newsItem || likedItems[id]) return;

    setLikedItems((prev) => {
      const newLiked = { ...prev, [id]: true };
      localStorage.setItem("likedNews", JSON.stringify(newLiked));
      return newLiked;
    });

    setNewsItem({ ...newsItem, likes_count: newsItem.likes_count + 1 });

    try {
      await fetch("/api/news/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error("Error liking news:", error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isEn ? newsItem?.title_en : newsItem?.title_id,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isEn ? "Link copied to clipboard!" : "Tautan disalin ke papan klip!");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FCFCFC] pt-24">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !newsItem) {
    return (
      <main className="min-h-screen bg-[#FCFCFC] pt-24">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
          <p className="text-slate-600 mb-8">{isEn ? "News article not found." : "Artikel berita tidak ditemukan."}</p>
          <button onClick={() => router.push("/news")} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors">
            {isEn ? "Back to News" : "Kembali ke Berita"}
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const isLiked = likedItems[id];
  const title = isEn ? newsItem.title_en : newsItem.title_id;
  const content = isEn ? newsItem.content_en : newsItem.content_id;
  const imageUrl = newsItem.image_url.includes("i.ibb.co") ? `https://wsrv.nl/?url=${encodeURIComponent(newsItem.image_url)}` : newsItem.image_url;
  const dateStr = new Date(newsItem.created_at).toLocaleDateString(isEn ? "en-US" : "id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <main className="min-h-screen bg-[#FCFCFC] text-slate-950 selection:bg-red-600 selection:text-white pt-24">
      <Navbar />

      <article className="pb-24">
        {/* Header Section */}
        <section className="relative w-full pt-12 pb-16 bg-white overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6 sm:px-12 z-10">
            <nav className="flex mb-8 text-sm text-slate-500 font-medium" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center hover:text-red-600 transition-colors">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                    <Link href="/news" className="hover:text-red-600 transition-colors">
                      {isEn ? "News" : "Berita"}
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>

            <button onClick={() => router.push("/news")} className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {isEn ? "Back to News" : "Kembali ke Berita"}
            </button>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight"
            >
              {title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium border-t border-slate-100 pt-6"
            >
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full">
                <Calendar className="w-4 h-4 text-slate-400" />
                {dateStr}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                    isLiked ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-red-600 text-red-600" : ""}`} />
                  <span className="font-bold">{newsItem.likes_count}</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="font-bold">{isEn ? "Share" : "Bagikan"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative max-w-4xl mx-auto px-6 sm:px-12 -mt-8 z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-white mb-12"
          >
            {imageUrl && (
              <div className="relative h-64 md:h-[500px] w-full bg-slate-100">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8 md:p-12">
              <div 
                className="prose prose-lg prose-slate max-w-none text-slate-700 break-words overflow-hidden w-full"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </motion.div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
