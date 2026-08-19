"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsTeaser() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load liked items from localStorage
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
        setNews(json.data.slice(0, 3)); // Only take 3 for the teaser
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    if (likedItems[id]) return; // Already liked

    // Optimistic UI update
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

  if (loading || news.length === 0) return null; // Don't show if empty or loading

  return (
    <section className="relative w-full py-20 bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="inline-block py-1.5 px-3 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-red-100">
              {isEn ? "Latest News" : "Berita Terbaru"}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              {isEn ? "Insights & Updates" : "Informasi & Pembaruan"}
            </h2>
          </div>
          
          <Link href="/news" className="hidden md:inline-flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors group">
            {isEn ? "See All News" : "Lihat Semua Berita"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => {
            const isLiked = likedItems[item.id];
            const rawContent = isEn ? item.content_en : item.content_id;
            const plainTextContent = rawContent ? rawContent.replace(/<[^>]+>/g, '') : '';
            
            return (
              <Link href={`/news/${item.id}`} key={item.id} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                      {isEn ? item.title_en : item.title_id}
                    </h3>
                    
                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow">
                      {plainTextContent}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link href="/news" className="inline-flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors group">
            {isEn ? "See All News" : "Lihat Semua Berita"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
