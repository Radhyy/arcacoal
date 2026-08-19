"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, ChevronRight, Heart, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsPage() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getLikedItems = () => {
    if (typeof window !== "undefined") {
      const liked = localStorage.getItem("likedNews");
      return liked ? JSON.parse(liked) : {};
    }
    return {};
  };

  const [likedItems, setLikedItems] = useState<Record<string, boolean>>(getLikedItems());

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const json = await res.json();
      if (json.success) {
        setNews(json.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    if (likedItems[id]) return;

    setLikedItems((prev) => {
      const newLiked = { ...prev, [id]: true };
      localStorage.setItem("likedNews", JSON.stringify(newLiked));
      return newLiked;
    });

    setNews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes_count: item.likes_count + 1 } : item
      )
    );

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

  return (
    <main className="min-h-screen bg-[#FCFCFC] text-slate-950 selection:bg-red-600 selection:text-white pt-24">
      <Navbar />

      <section className="relative w-full py-16 bg-white overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 z-10 flex flex-col md:flex-row justify-between items-end">
          <div className="max-w-2xl">
            <nav className="flex mb-6 text-sm text-slate-500 font-medium" aria-label="Breadcrumb">
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
                    <span className="text-slate-900 font-semibold">{isEn ? "News" : "Berita"}</span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              {isEn ? "Company News & Updates" : "Berita & Pembaruan Perusahaan"}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              {isEn 
                ? "Stay up-to-date with the latest announcements, achievements, and insights from PT Arcadia Charcoal Indonesia." 
                : "Tetap ikuti pengumuman, pencapaian, dan wawasan terbaru dari PT Arcadia Charcoal Indonesia."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-medium">
              {isEn ? "No news items available." : "Belum ada berita yang tersedia."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => {
                const isLiked = likedItems[item.id];
                const rawContent = isEn ? item.content_en : item.content_id;
                const plainTextContent = rawContent ? rawContent.replace(/<[^>]+>/g, '') : '';

                return (
                  <Link href={`/news/${item.id}`} key={item.id} className="block group">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                        <img
                          src={item.image_url.includes("i.ibb.co") ? `https://wsrv.nl/?url=${encodeURIComponent(item.image_url)}` : item.image_url}
                          alt={isEn ? item.title_en : item.title_id}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                          <button 
                            onClick={(e) => { e.preventDefault(); handleLike(item.id); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-md transition-all ${
                              isLiked ? "bg-red-50 text-red-600" : "bg-white/90 text-slate-700 hover:bg-white"
                            } backdrop-blur-sm`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-600 text-red-600" : ""}`} />
                            {item.likes_count}
                          </button>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item.created_at).toLocaleDateString(isEn ? "en-US" : "id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-red-600 transition-colors">
                          {isEn ? item.title_en : item.title_id}
                        </h3>
                        <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                          {plainTextContent}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
