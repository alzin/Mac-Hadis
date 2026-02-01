import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Open_Sans, Noto_Sans_JP } from "next/font/google";
import dynamic from "next/dynamic";
import Script from "next/script";
import "@/styles/globals.css";
import Header from "@/components/common/sections/Header";
import { baseUrl } from "@/utils/baseUrl";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/schemas";

// ✅ Lazy load Footer - it's below the fold
const Footer = dynamic(() => import("@/components/common/sections/Footer"), {
  ssr: true,
});

// ═══════════════════════════════════════════════════════════════════════════════
// FONT OPTIMIZATION STRATEGY - Inlined Critical @font-face + Next.js Fonts
// ═══════════════════════════════════════════════════════════════════════════════
//
// 🔑 KEY FIX: Inline critical Latin @font-face + use Next.js for full subsets
// Based on: https://www.debugbear.com/blog/render-blocking-resources#inline-render-blocking-google-fonts-css
//
// STRATEGY:
// 1. Inline critical Latin subset @font-face in <head> for immediate availability
// 2. Next.js fonts handle full Japanese/extended subsets (loaded progressively)
// 3. font-display: swap ensures text is visible immediately with fallback
// 4. preload: false prevents render-blocking for non-critical subsets
//
// BENEFIT: FCP/LCP improves as Latin text renders immediately without waiting for CSS
// ═══════════════════════════════════════════════════════════════════════════════

// Next.js font configuration for full subset support
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  preload: false, // Non-blocking: full font loads progressively
  adjustFontFallback: true,
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false, // Non-blocking: Japanese subsets load on-demand
  adjustFontFallback: true,
});

// ═══════════════════════════════════════════════════════════════════════════════
// INLINED CRITICAL FONTS CSS
// This CSS is inlined directly in <head> to eliminate render-blocking request
// Contains only the most critical Latin subset @font-face declarations
// ═══════════════════════════════════════════════════════════════════════════════
const criticalFontCSS = `
/* Critical Latin subset - inlined for immediate availability */
/* Open Sans - Latin (woff2 for modern browsers) */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/opensans/v44/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/opensans/v44/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/opensans/v44/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Noto Sans JP - Latin subset (woff2) */
@font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notosansjp/v56/-F62fjtqLzI2JPCgQBnw7HFYwQgP.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notosansjp/v56/-F62fjtqLzI2JPCgQBnw7HFYwQgP.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notosansjp/v56/-F62fjtqLzI2JPCgQBnw7HFYwQgP.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Japanese Hiragana/Katakana/Common Kanji - Critical for Japanese site */
@font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notosansjp/v56/-F62fjtqLzI2JPCgQBnw7HFow2oe2EcP5pp0erwTqsSWs9Jezazjcb4.119.woff2) format('woff2');
  unicode-range: U+20, U+2027, U+3001-3002, U+3041-307f, U+3081-308f, U+3091-3093, U+3099-309a, U+309d-309e, U+30a1-30e1, U+30e3-30ed, U+30ef-30f0, U+30f2-30f4, U+30fb-30fe, U+ff0c, U+ff0e;
}
@font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notosansjp/v56/-F62fjtqLzI2JPCgQBnw7HFow2oe2EcP5pp0erwTqsSWs9Jezazjcb4.119.woff2) format('woff2');
  unicode-range: U+20, U+2027, U+3001-3002, U+3041-307f, U+3081-308f, U+3091-3093, U+3099-309a, U+309d-309e, U+30a1-30e1, U+30e3-30ed, U+30ef-30f0, U+30f2-30f4, U+30fb-30fe, U+ff0c, U+ff0e;
}
@font-face {
  font-family: 'Noto Sans JP';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notosansjp/v56/-F62fjtqLzI2JPCgQBnw7HFow2oe2EcP5pp0erwTqsSWs9Jezazjcb4.119.woff2) format('woff2');
  unicode-range: U+20, U+2027, U+3001-3002, U+3041-307f, U+3081-308f, U+3091-3093, U+3099-309a, U+309d-309e, U+30a1-30e1, U+30e3-30ed, U+30ef-30f0, U+30f2-30f4, U+30fb-30fe, U+ff0c, U+ff0e;
}
`;

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
        {/* ═══════════════════════════════════════════════════════════════════
            CSS DEFERRAL - MUST BE FIRST IN HEAD
            Based on web.dev/articles/defer-non-critical-css
            
            This script intercepts stylesheets as they're added and converts
            them to non-blocking using the media="print" trick.
            ═══════════════════════════════════════════════════════════════════ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  // Helper to check if link is a Next.js/font stylesheet
  function shouldDefer(href) {
    if (!href) return false;
    // Match Next.js static files, fonts, and CSS modules
    return (
      href.includes('/_next/') ||
      href.includes('%5Bnext%5D') ||
      href.includes('%5Broot-of-the-server%5D') ||
      href.includes('[root-of-the-server]') ||
      href.includes('/font/') ||
      href.includes('open_sans') ||
      href.includes('noto_sans') ||
      href.includes('.module.css') ||
      (href.endsWith('.css') && href.includes('localhost'))
    );
  }
  
  // Intercept stylesheets as they're added to head
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.tagName === 'LINK' && 
            node.rel === 'stylesheet' && 
            shouldDefer(node.href) &&
            !node.hasAttribute('data-deferred')) {
          node.setAttribute('data-deferred', 'true');
          var originalMedia = node.media || 'all';
          node.media = 'print';
          node.onload = function() {
            this.media = originalMedia;
            this.onload = null;
          };
        }
      });
    });
  });
  
  // Start observing immediately
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
            `,
          }}
        />

        {/* ═══════════════════════════════════════════════════════════════════
            RESOURCE HINTS - Order matters for priority
            ═══════════════════════════════════════════════════════════════════ */}

        {/* ✅ DNS Prefetch - resolve CDN hostname early */}
        <link
          rel="dns-prefetch"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com"
        />

        {/* ✅ Preconnect - establish connection before resources are needed */}
        <link
          rel="preconnect"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com"
          crossOrigin="anonymous"
        />

        {/* ✅ Preconnect to Google Fonts static CDN (for font files only - no CSS request needed) */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ═══════════════════════════════════════════════════════════════════
            INLINED GOOGLE FONTS CSS - Eliminates render-blocking request
            Based on: debugbear.com/blog/render-blocking-resources#inline-render-blocking-google-fonts-css
            
            Instead of: <link href="https://fonts.googleapis.com/css2?..."> (render-blocking)
            We inline: @font-face rules directly in <style> tag (non-blocking)
            ═══════════════════════════════════════════════════════════════════ */}
        <style dangerouslySetInnerHTML={{ __html: criticalFontCSS }} />

        {/* ═══════════════════════════════════════════════════════════════════
            LCP IMAGE PRELOAD - Critical for mobile performance
            ═══════════════════════════════════════════════════════════════════ */}

        {/* ✅ Mobile LCP Image (< 768px viewport) */}
        <link
          rel="preload"
          as="image"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background-mobile.webp"
          fetchPriority="high"
          media="(max-width: 767px)"
          type="image/webp"
        />

        {/* ✅ Tablet/Desktop LCP Image (>= 768px viewport) */}
        <link
          rel="preload"
          as="image"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background.webp"
          fetchPriority="high"
          media="(min-width: 768px)"
          type="image/webp"
        />

        {/* ✅ Preload logo for faster header paint */}
        <link
          rel="preload"
          as="image"
          href="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/hadis-logo.png"
          fetchPriority="high"
        />

        {/* Schema.org structured data */}
        <OrganizationSchema />
        <WebsiteSchema />
      </head>

      <body
        className={`${notoSansJP.variable} ${openSans.variable} font-noto antialiased`}
        suppressHydrationWarning
      >
        <main className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </main>

        {/* ═══════════════════════════════════════════════════════════════════
            CSS DEFERRAL - Based on web.dev/articles/defer-non-critical-css
            
            This script converts render-blocking stylesheets to non-blocking
            by using the media="print" trick after initial render.
            
            Technique: Change media to "print" initially, then switch to "all"
            after stylesheet loads. This allows FCP/LCP without waiting for CSS.
            ═══════════════════════════════════════════════════════════════════ */}
        <Script
          id="defer-css"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  // Helper to check if link is a Next.js stylesheet (including fonts)
  function isNextStylesheet(href) {
    return href && (
      href.includes('/_next/') ||
      href.includes('%5Bnext%5D') ||
      href.includes('[next]') ||
      href.includes('%5Broot-of-the-server%5D') ||
      href.includes('[root-of-the-server]') ||
      href.includes('/font/google/') ||
      href.includes('internal/font') ||
      href.includes('open_sans') ||
      href.includes('noto_sans') ||
      href.includes('.module.css') ||
      (href.includes('.css') && !href.includes('fonts.googleapis.com'))
    );
  }
  
  // Create MutationObserver to catch dynamically added stylesheets
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.tagName === 'LINK' && 
            node.rel === 'stylesheet' && 
            isNextStylesheet(node.href) &&
            !node.hasAttribute('data-deferred')) {
          // Mark as processed
          node.setAttribute('data-deferred', 'true');
          // Set media to print (non-blocking)
          var originalMedia = node.media || 'all';
          node.media = 'print';
          // Switch back to all after load
          node.onload = function() {
            node.media = originalMedia;
            node.onload = null;
          };
        }
      });
    });
  });
  
  // Start observing head for stylesheet additions
  if (document.head) {
    observer.observe(document.head, { childList: true, subtree: true });
  }
  
  // Also process any existing stylesheets (production & dev patterns & fonts)
  document.querySelectorAll('link[rel="stylesheet"]').forEach(function(link) {
    if (isNextStylesheet(link.href) && !link.hasAttribute('data-deferred')) {
      link.setAttribute('data-deferred', 'true');
    }
  });
})();
            `,
          }}
        />

        {/* ✅ GTM loads with afterInteractive strategy by default */}
        <GoogleTagManager gtmId="GTM-W9W78KMS" />
      </body>
    </html>
  );
}
