"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password) {
      setErrorMessage(t("Please fill in both email and password.", "Harap isi email dan kata sandi."));
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || t("Invalid email or password.", "Email atau kata sandi tidak valid."));
        setIsLoading(false);
        return;
      }

      // Save authenticated admin session into localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "arcacoal_admin_session",
          JSON.stringify({
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            loggedInAt: new Date().toISOString(),
          })
        );
      }

      setSuccessMessage(t("Neon DB Authentication successful! Redirecting to Admin...", "Autentikasi Database Neon Berhasil! Mengalihkan ke Dasbor Admin..."));
      
      setTimeout(() => {
        router.push("/admin");
      }, 700);
    } catch (err: any) {
      console.error("Login fetch error:", err);
      setErrorMessage(t("Database connection error. Please try again.", "Gagal terhubung ke server database."));
      setIsLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#FCFCFC] text-slate-950 flex flex-col justify-between relative overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Ambient Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-orange-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center group py-1">
          <Image
            src="/logo4.png"
            alt="Arcacoal Logo"
            width={260}
            height={65}
            unoptimized
            className="h-12 sm:h-14 w-auto object-contain object-left group-hover:scale-105 transition-transform"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/Website Content/logo4.png";
            }}
          />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:border-orange-200 hover:text-[#F06B33] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("Back to Website", "Kembali ke Website")}</span>
        </Link>
      </header>

      {/* Ultra-Clean & Professional Minimalist Login Card Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-5 py-6 flex-1 flex flex-col justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 relative"
        >
          {/* Card Header Title with Tight-Cropped Scaled Red Flame Emblem logo3.png */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-3 flex items-center justify-center overflow-visible">
              <Image
                src="/logo3.png"
                alt="Arcacoal Flame Emblem"
                width={120}
                height={120}
                unoptimized
                className="w-full h-full object-contain scale-140 filter drop-shadow-md hover:scale-150 transition-transform duration-300"
                priority
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
              {t("Welcome Back", "Selamat Datang")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
              {t(
                "Sign in to access PT Arcadia Charcoal Indonesia client portal",
                "Masuk untuk mengakses portal resmi PT Arcadia Charcoal Indonesia"
              )}
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Address Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                {t("Email Address", "Alamat Email")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@arcacoal.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F06B33] focus:ring-2 focus:ring-[#F06B33]/15 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                  {t("Password", "Kata Sandi")}
                </label>
                <Link href="#" className="text-xs font-semibold text-[#F06B33] hover:underline">
                  {t("Forgot password?", "Lupa kata sandi?")}
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F06B33] focus:ring-2 focus:ring-[#F06B33]/15 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#F06B33] focus:ring-[#F06B33] cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-700">
                  {t("Remember for 30 days", "Ingat selama 30 hari")}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-sm font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t("Verifying Neon DB...", "Memeriksa Database Neon...")}</span>
                </div>
              ) : (
                <>
                  <span>{t("Sign In to Portal", "Masuk ke Portal")}</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </>
              )}
            </motion.button>
          </form>

          {/* Security Badge Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t("256-Bit Encrypted Corporate Security", "Keamanan Enkripsi Korporat 256-Bit")}</span>
          </div>
        </motion.div>
      </div>

      {/* Page Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-slate-500 font-medium">
        <p>© 2026 PT Arcadia Charcoal Indonesia. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
