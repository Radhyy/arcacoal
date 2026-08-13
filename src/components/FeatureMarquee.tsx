"use client";

import { Flame, Factory, Anchor, Handshake, ShieldCheck, Globe, Sparkles, Award } from "lucide-react";

export default function FeatureMarquee() {
  const cards = [
    {
      icon: Flame,
      title: "Pure Sourcing",
      desc: "100% pure coconut from Indonesia's rich regions & top-grade hardwood.",
      iconBg: "bg-red-50 text-[#E31E24] border-red-200/70",
    },
    {
      icon: Factory,
      title: "Vast Factory Network",
      desc: "Integrated manufacturing facilities maintaining strict international standards.",
      iconBg: "bg-red-50 text-red-600 border-red-200/70",
    },
    {
      icon: Anchor,
      title: "Strategic Port Logistics",
      desc: "Seamless shipping & distribution via Indonesia's main sea ports.",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200/70",
    },
    {
      icon: Handshake,
      title: "Global Partnerships",
      desc: "Long-term, mutually beneficial relationships expanding reach worldwide.",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/70",
    },
    {
      icon: ShieldCheck,
      title: "ISO & Lab Certified",
      desc: "Rigorous quality control & lab-tested heat output specifications.",
      iconBg: "bg-purple-50 text-purple-600 border-purple-200/70",
    },
    {
      icon: Globe,
      title: "Direct Port Shipments",
      desc: "Exported worldwide directly from Indonesia's primary shipping hubs.",
      iconBg: "bg-red-50 text-red-600 border-red-200/70",
    },
    {
      icon: Award,
      title: "Grade A+ Premium",
      desc: "Engineered specifically for premium Shisha, Hookah, and BBQ markets.",
      iconBg: "bg-red-50 text-red-600 border-red-200/70",
    },
  ];

  // Duplicate cards for seamless loop
  const marqueeList = [...cards, ...cards];

  return (
    <section className="py-12 bg-gradient-to-b from-[#FCFCFC] via-red-50/20 to-[#FCFCFC] overflow-hidden border-y border-slate-200/60 relative">
      {/* Edge Fade Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#FCFCFC] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#FCFCFC] to-transparent z-10 pointer-events-none" />

      <div className="w-full">
        {/* Infinite Moving Track to the Right */}
        <div className="animate-marquee-right flex gap-6">
          {marqueeList.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="w-80 sm:w-96 shrink-0 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-900/5 hover:border-red-300 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${card.iconBg} border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="text-lg font-bold text-slate-950 mb-2 tracking-tight group-hover:text-[#E31E24] transition-colors">
                  {card.title}
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
