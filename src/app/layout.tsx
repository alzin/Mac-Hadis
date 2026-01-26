import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Open_Sans, Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/common/sections/Header";
import Footer from "@/components/common/sections/Footer";
import { baseUrl } from "@/utils/baseUrl";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "700"], // Optimization: Load only necessary weights
});

// 2. Configure Noto Sans JP
const notoSansJP = Noto_Sans_JP({
  // "preload: false" is strictly maintained as per your previous requirement
  preload: false, 
  variable: "--font-noto-sans-jp",
  display: "swap",
  // Optimization: Removed "500" and "900". 
  // Loading 4 weights of a Japanese font is the #1 cause of your slow render time.
  weight: ["400", "700"], 
});

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
      {/* 3. Apply the variable to the body */}
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