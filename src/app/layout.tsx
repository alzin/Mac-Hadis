import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Open_Sans, Noto_Sans_JP } from "next/font/google";
import dynamic from "next/dynamic";
import Script from "next/script";
import "@/styles/globals.css";
import Header from "@/components/common/sections/Header";
import { baseUrl } from "@/utils/baseUrl";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/schemas";
import fs from "fs";
import path from "path";

// Lazy load Footer
const Footer = dynamic(() => import("@/components/common/sections/Footer"), {
  ssr: true,
});

// ✅ OPTIMIZED: font-display: optional prevents FOUT/FOIT, improving LCP
// ✅ Turbopack handles preloading automatically
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-open-sans",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "optional",
  // Using variable font (no weight array) reduces CSS chunks
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
    canonical: "./",
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
  // ✅ Read critical CSS at build time for inlining
  let criticalCSS = "";
  try {
    const criticalPath = path.join(process.cwd(), "src/styles/critical.css");
    criticalCSS = fs.readFileSync(criticalPath, "utf8");
  } catch {
    // Fallback if critical.css doesn't exist yet
    criticalCSS = "";
  }

  return (
    <html lang="ja">
      <head>
        {/* ✅ CRITICAL: Inline above-the-fold CSS for instant first paint */}
        {criticalCSS && (
          <style
            dangerouslySetInnerHTML={{ __html: criticalCSS }}
            data-critical="true"
          />
        )}

        {/* ✅ Preconnect to CDN early */}
        <link
          rel="dns-prefetch"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com"
        />
        <link
          rel="preconnect"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com"
          crossOrigin="anonymous"
        />

        {/* ✅ Preload LCP image with high priority */}
        <link
          rel="preload"
          as="image"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background-mobile.webp"
          fetchPriority="high"
          media="(max-width: 768px)"
        />

        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body
        className={`${notoSansJP.variable} ${openSans.variable} font-noto antialiased`}
      >
        {/* ✅ Defer non-critical CSS using media="print" trick */}
        <Script
          id="defer-styles"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var links = document.querySelectorAll('link[rel="stylesheet"][media="print"]');
                links.forEach(function(link) {
                  link.media = 'all';
                });
              })();
            `,
          }}
        />

        <main className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </main>
        <GoogleTagManager gtmId="GTM-W9W78KMS" />
      </body>
    </html>
  );
}
