import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Open_Sans, Noto_Sans_JP } from "next/font/google";
import dynamic from "next/dynamic";
import "@/styles/globals.css"; // Now lightweight
import Header from "@/components/common/sections/Header";
import { baseUrl } from "@/utils/baseUrl";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/schemas";

// Lazy load Footer to reduce initial JS/CSS payload
const Footer = dynamic(() => import("@/components/common/sections/Footer"), {
  ssr: true,
});

// Optimized Font Loading: variable fonts prevent downloading multiple weight files
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
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
  return (
    <html lang="ja">
      <head>
        <link
          rel="dns-prefetch"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com"
        />
        <link
          rel="preconnect"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body
        className={`${notoSansJP.variable} ${openSans.variable} font-noto antialiased`}
      >
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