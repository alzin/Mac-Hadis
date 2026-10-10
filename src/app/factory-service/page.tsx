import React from "react";
import { Index as FactoryServicePage } from "@/components/pages/factory-service/index";
import { FactoryServiceSchema, BreadcrumbSchema, generateBreadcrumbs } from '@/components/seo/schemas';
import type { Metadata } from "next";
import { baseUrl } from "@/utils/baseUrl";

// メタデータを追加
export const metadata: Metadata = {
  title: "工場機械買取・撤去・整理サービス",
  description: "工場閉鎖・移転・廃業で不要になった機械設備の買取、撤去、解体、清掃まで一括対応。中古機械買取ならハディズにお任せください。",
  alternates: {
    canonical: `${baseUrl}/factory-service`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/factory-service`,
    title: "工場機械買取・撤去・整理サービス | ハディズ",
    description: "工場閉鎖・移転・廃業で不要になった機械設備の買取、撤去、解体、清掃まで一括対応。中古機械買取ならハディズにお任せください。",
    siteName: "機械工具買取ハディズ",
    images: [{ url: "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/main-ogp.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "工場機械買取・撤去・整理サービス | ハディズ",
    description: "工場閉鎖・移転・廃業で不要になった機械設備の買取、撤去、解体、清掃まで一括対応。中古機械買取ならハディズにお任せください。",
    images: "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/main-ogp.jpg",
  },
};

const FactoryService: React.FC = () => {
  return (
    <>
      {/* ✅ Structured Data */}
      <FactoryServiceSchema />
      <BreadcrumbSchema items={generateBreadcrumbs.factoryService()} />
      <FactoryServicePage />
    </>
  );
};

export default FactoryService;
