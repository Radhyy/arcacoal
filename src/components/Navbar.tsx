"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown, Flame, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("Home", "Beranda"), href: "/#home" },
    { name: t("About", "Tentang"), href: "/#about" },
    { name: t("Products", "Produk"), href: "/products" },
    { name: t("Gallery", "Galeri"), href: "/gallery" },
    { name: t("OEM", "OEM"), href: "/#oem" },
    { name: t("Legality", "Legalitas"), href: "/#legality" },
    { name: t("Contact", "Kontak"), href: "/#contact" },
  ];

  const productItems = [
    {
      number: "01.",
      title: t("Shisha Charcoal Briquettes", "Briket Arang Shisha"),
      desc: t("100% Coconut Shell for Shisha / Hookah", "100% Batok Kelapa Murni untuk Shisha"),
      href: "/products#shisha",
      image: "/Website Content/Shisha.png",
      fallbackImage: "/Shisha.png",
    },
    {
      number: "02.",
      title: "Hexagonal Hardwood BBQ",
      desc: t("Restaurant & Outdoor Barbecue Sticks", "Batang Arang Kayu Keras Restoran & BBQ"),
      href: "/products#bbq",
      image: "/Website Content/BBQ.png",
      fallbackImage: "/BBQ.png",
    },
    {
      number: "03.",
      title: t("Extruded Sawdust Charcoal", "Arang Briket Serbuk Gergaji"),
      desc: t("Extended 4-5 Hr Yakiniku Charcoal", "Arang Khusus Yakiniku Nyala 4-5 Jam"),
      href: "/products#sawdust",
      image: "/Website Content/Sawdust.png",
      fallbackImage: "/Sawdust.png",
    },
    {
      number: "04.",
      title: t("Natural Hardwood Lump", "Arang Kayu Keras Alami"),
      desc: t("Halaban & Tamarind Timber Lump", "Arang Kayu Halaban & Asam Jawa"),
      href: "/products#lump",
      image: "/Website Content/Lump.png",
      fallbackImage: "/Lump.png",
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#") && !href.startsWith("/products")) {
      const targetId = href.split("#")[1];
      const element = document.getElementById(targetId);

      if ((pathname === "/" || pathname === "") && element) {
        e.preventDefault();
        setMobileMenuOpen(false);
        setProductsDropdownOpen(false);

        const windowWithLenis = window as unknown as {
          lenis?: { scrollTo: (target: HTMLElement, options?: Record<string, unknown>) => void };
        };

        if (windowWithLenis.lenis) {
          windowWithLenis.lenis.scrollTo(element, { offset: -90, duration: 1.2 });
        } else {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 90;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "glass-header-clean py-3 shadow-xs border-b border-slate-100"
          : "bg-transparent py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          {/* Slightly Enlarged Official Logo Image logo4.png */}
          <Link href="/" className="flex items-center shrink-0 group focus:outline-none py-1">
            <div className="transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo4.png"
                alt="PT Arcadia Charcoal Indonesia Logo"
                width={260}
                height={65}
                unoptimized
                className="h-11 sm:h-13 w-auto object-contain object-left"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/Website Content/logo4.png";
                }}
              />
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0">
            {navLinks.map((link, idx) => (
              <div key={idx} className="relative py-1">
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors duration-200 whitespace-nowrap py-1 group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E31E24] group-hover:w-full transition-all duration-200 rounded-full" />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 shrink-0">
              <Globe className="w-3.5 h-3.5 text-red-700 ml-1.5" />
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                  lang === "en"
                    ? "bg-white text-slate-950 shadow-2xs border border-slate-200/60"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                EN
              </button>
              <span className="text-slate-300">/</span>
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                  lang === "id"
                    ? "bg-white text-[#E31E24] shadow-2xs border border-slate-200/60"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                ID
              </button>
            </div>

            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="px-4 py-2 text-sm font-semibold text-slate-800 bg-white border border-slate-200/90 rounded-xl shadow-2xs hover:bg-slate-50 transition-all duration-200 whitespace-nowrap"
            >
              {t("Contact Us", "Hubungi Kami")}
            </Link>

            <Link
              href="/products"
              className="btn-dark-glossy px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              {t("Products & Specs", "Produk & Spesifikasi")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-950 bg-slate-100 border border-slate-200 focus:outline-none shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-xl">
            <div className="flex flex-col gap-3">
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase">Language / Bahasa:</span>
                <div className="flex items-center gap-1 text-xs font-semibold bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      lang === "en"
                        ? "bg-white text-slate-950 shadow-2xs"
                        : "text-slate-500"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("id")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      lang === "id"
                        ? "bg-white text-[#E31E24] shadow-2xs"
                        : "text-slate-500"
                    }`}
                  >
                    ID
                  </button>
                </div>
              </div>

              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-lg transition-all whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <Link
                  href="/#contact"
                  onClick={(e) => {
                    handleNavClick(e, "/#contact");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl shadow-2xs whitespace-nowrap"
                >
                  {t("Contact Us", "Hubungi Kami")}
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center btn-dark-glossy px-4 py-2.5 text-sm font-semibold text-white rounded-xl whitespace-nowrap"
                >
                  {t("Products & Specs", "Produk & Spesifikasi")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
