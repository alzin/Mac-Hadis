import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Open_Sans, Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/common/sections/Header";
import Footer from "@/components/common/sections/Footer";
import { baseUrl } from "@/utils/baseUrl";

import { OrganizationSchema, WebsiteSchema } from '@/components/seo/schemas';

// ✅ Optimized font loading - only load weights you actually use
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  adjustFontFallback: true,
  preload: false, // Only preload critical fonts
});

const notoSansJP = Noto_Sans_JP({
  preload: true, // Critical for Japanese text in hero
  subsets: ["latin"], 
  variable: "--font-noto-sans-jp",
  display: "swap",
  adjustFontFallback: true,
  // ✅ Specify only the weights you use to reduce font file size
  weight: ["400", "700", "900"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  icons: "/favicon.ico",
  title: {
    default: "中古機械、電動工具の高額買取のハディズ",
    template: "%s | 機械工具買取ハディズ",
  },
  description:
    "中古機械、電動工具の高額買取ならハディズへ。ハディズでは、業務用機器の買取を「全国対応」で行っています。",
  applicationName: "機械工具買取ハディズ",
  generator: "Next.js",
  keywords: [
    "大型UVインクジェットプリンター買取",
    "機械・電動工具の高価買取",
    "簡単！買取の手順",
    "Hadis INTERNATIONAL",
  ],
  referrer: "origin",
  creator: "機械工具買取ハディズ",
  publisher: "機械工具買取ハディズ",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "中古機械、電動工具の高額買取のハディズ",
    description:
      "中古機械、電動工具の高額買取ならハディズへ。ハディズでは、業務用機器の買取を「全国対応」で行っています。",
    siteName: "機械工具買取ハディズ",
    images: [
      { url: "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/main-ogp.jpg" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    description:
      "中古機械、電動工具の高額買取ならハディズへ。ハディズでは、業務用機器の買取を「全国対応」で行っています。",
    title: "中古機械、電動工具の高額買取のハディズ",
    images: "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/main-ogp.jpg",
  },
  verification: {
    google: "id",
  },
  category: "Sells",
  classification: "Sells",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* ✅ STEP 1: DNS Prefetch - Resolve DNS before any requests */}
        <link rel="dns-prefetch" href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* ✅ STEP 2: Preconnect - Establish connection early */}
        <link
          rel="preconnect"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        
        {/* ✅ STEP 3: CRITICAL - Preload LCP Images (THE MOST IMPORTANT FIX!) */}
        {/* Mobile hero background (shown on screens <= 1023px) */}
        <link
          rel="preload"
          as="image"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background-mobile.webp"
          imageSrcSet="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background-mobile.webp 640w, https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background-mobile.webp 750w, https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background-mobile.webp 828w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
          media="(max-width: 1023px)"
        />
        
        {/* Desktop hero background (shown on screens >= 1024px) */}
        <link
          rel="preload"
          as="image"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background.webp"
          imageSrcSet="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background.webp 1080w, https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background.webp 1200w, https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background.webp 1920w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
          media="(min-width: 1024px)"
        />

        {/* ✅ STEP 4: Preload hero text images (they have priority prop) */}
        <link
          rel="preload"
          as="image"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-1.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-2.webp"
          type="image/webp"
          fetchPriority="high"
        />

        {/* ✅ Structured Data */}
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className={`${notoSansJP.variable} ${openSans.variable} font-noto antialiased`}>
        <main className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </main>
        {/* ✅ GTM loaded after main content */}
        <GoogleTagManager gtmId="GTM-W9W78KMS" />
      </body>
    </html>
  );
}