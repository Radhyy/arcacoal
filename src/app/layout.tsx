import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arcacoal.com"),
  title: {
    default: "PT Arcadia Charcoal Indonesia | Premium Coconut Charcoal Exporter",
    template: "%s | PT Arcadia Charcoal Indonesia",
  },
  description:
    "PT Arcadia Charcoal Indonesia (Arcacoal) is a premier manufacturer and exporter of 100% natural coconut shell charcoal briquettes for Shisha, Hookah, and Hardwood BBQ. Direct shipments from Indonesia.",
  keywords: [
    "PT Arcadia Charcoal Indonesia",
    "Arcacoal",
    "Coconut Charcoal Briquettes Exporter",
    "Indonesian Shisha Charcoal Supplier",
    "Coconut Shell Charcoal Factory Indonesia",
    "Hookah Charcoal Manufacturer",
    "Hardwood BBQ Charcoal Indonesia",
    "Sawdust Charcoal Briquettes",
    "Halaban Charcoal Exporter",
    "Indonesia Charcoal Factory",
  ],
  authors: [{ name: "PT Arcadia Charcoal Indonesia", url: "https://www.arcacoal.com" }],
  creator: "PT Arcadia Charcoal Indonesia",
  publisher: "PT Arcadia Charcoal Indonesia",
  icons: {
    icon: "/logo3.png",
    shortcut: "/logo3.png",
    apple: "/logo3.png",
  },
  verification: {
    google: "VYTNMVv0X4dD11WvQYJeWy5mzhjFSr7ym65yZE6H_UU",
  },
  openGraph: {
    title: "PT Arcadia Charcoal Indonesia | Premium Coconut Charcoal Exporter",
    description:
      "Global manufacturer and exporter of 100% natural coconut shell charcoal briquettes for Shisha, Hookah, and Hardwood BBQ. Certified ISO & NIB compliance.",
    url: "https://www.arcacoal.com",
    siteName: "PT Arcadia Charcoal Indonesia (Arcacoal)",
    images: [
      {
        url: "/logo3.png",
        width: 1200,
        height: 630,
        alt: "PT Arcadia Charcoal Indonesia Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Arcadia Charcoal Indonesia | Premium Coconut Charcoal Exporter",
    description:
      "Global manufacturer and exporter of 100% natural coconut shell charcoal briquettes for Shisha, Hookah, and Hardwood BBQ.",
    images: ["/logo3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.arcacoal.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.arcacoal.com/#organization",
      "name": "PT Arcadia Charcoal Indonesia",
      "alternateName": "Arcacoal",
      "url": "https://www.arcacoal.com",
      "logo": "https://www.arcacoal.com/logo3.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+6282227130022",
        "contactType": "Sales & Export Compliance",
        "email": "hello@arcacoal.com",
        "areaServed": ["Worldwide", "USA", "Germany", "Canada", "Russia", "Turkey", "Australia"],
        "availableLanguage": ["English", "Indonesian"]
      },
      "sameAs": ["https://www.arcacoal.com"]
    },
    {
      "@type": "Manufacturer",
      "@id": "https://www.arcacoal.com/#manufacturer",
      "name": "PT Arcadia Charcoal Indonesia",
      "description": "Leading Indonesian manufacturer & exporter of 100% natural coconut shell charcoal briquettes for Shisha, Hookah, and Hardwood BBQ.",
      "url": "https://www.arcacoal.com",
      "logo": "https://www.arcacoal.com/logo3.png",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Indonesia"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} light`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PNNMPZM8');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S5G4SJT4J3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S5G4SJT4J3');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FCFCFC] text-slate-950 font-sans antialiased min-h-screen selection:bg-red-600 selection:text-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PNNMPZM8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
