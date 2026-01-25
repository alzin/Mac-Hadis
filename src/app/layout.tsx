import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import localFont from "next/font/local";
// 1. next/font/google から Open Sans をインポート
import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
// sections
import Header from "@/components/common/sections/Header";
import Footer from "@/components/common/sections/Footer";
// baseUrl
import { baseUrl } from "@/utils/baseUrl";

// 2. Open Sans の設定
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans", // Tailwind等で使う変数名
});

// Define local font (Noto Sans JP)
const notoSansJP = localFont({
  src: [
    {
      path: "./fonts/noto-sans-jp-japanese-400-normal.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/noto-sans-jp-japanese-500-normal.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/noto-sans-jp-japanese-700-normal.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/noto-sans-jp-japanese-900-normal.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-noto-sans-jp",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  // ... (メタデータ部分は変更なしでOK) ...
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
  creator: "機械工具買取ハディズs",
  publisher: "機械工具買取ハディズ",
  alternates: {
    canonical: baseUrl,
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
    <html lang="ja" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com"
        />
        <link
          rel="dns-prefetch"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com"
        />
      </head>
      <body className={`${notoSansJP.variable} ${openSans.variable} font-noto`}>
      <GoogleTagManager gtmId="GTM-W9W78KMS" />
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
