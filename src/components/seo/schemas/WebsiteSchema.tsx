import { baseUrl } from "@/utils/baseUrl";
/**
 * Website Schema - For sitelinks search box in Google
 * Use this in: layout.tsx (global)
 */

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  "name": "機械工具買取ハディズ",
  "alternateName": "ハディズ・インターナショナル",
  "url": baseUrl,
  "description": "中古機械、電動工具の高額買取のハディズ",
  "publisher": {
    "@id": `${baseUrl}/#organization`
  },
  "inLanguage": "ja-JP",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${baseUrl}/?s={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export const WebsiteSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
};
