import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Inquiry = dynamic(() => import("@/components/common/sections/Inquiry"));

// baseUrl
import { baseUrl } from "@/utils/baseUrl";
import ContactBanner from "@/components/pages/home/sections/ContactBanner";
import { ServiceSchema, BreadcrumbSchema, generateBreadcrumbs } from '@/components/seo/schemas';

// metadata
export const metadata: Metadata = {
  title: "中古機械・工具買取の無料査定",
  description:
    "中古機械・工具・設備の無料査定ならハディズ。出張査定、持込査定、メール査定に対応し、メーカー・型式・状態を確認し、買取価格をご案内します。査定料無料で、安心・スピーディーにご対応します。",
  alternates: {
    canonical: `${baseUrl}/satei`,
  },
  openGraph: {
    type: "website",
    url: `${baseUrl}/satei`,
    title: "中古機械買取の無料査定 | 高価買取ならハディズ",
    description: "中古機械・工具・設備の無料査定ならハディズ。出張査定、持込査定、メール査定に対応し、メーカー・型式・状態を確認し、買取価格をご案内します。",
    siteName: "機械工具買取ハディズ",
    images: [{ url: "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/main-ogp.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "中古機械買取の無料査定 | 高価買取ならハディズ",
    description: "中古機械・工具・設備の無料査定ならハディズ。出張査定、持込査定、メール査定に対応し、メーカー・型式・状態を確認し、買取価格をご案内します。",
    images: "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/main-ogp.jpg",
  },
};

const page = () => {
  return (
    <>
      {/* ✅ 追加: Structured Data */}
      <ServiceSchema
        name="無料価格査定"
        description="弊社にとって、お客様に納得して頂けるお見積を提供出来る事は何よりも大切です。査定料は一切いただきません。"
        url={`${baseUrl}/satei`}
        serviceType="無料査定サービス"
      />
      <BreadcrumbSchema items={generateBreadcrumbs.satei()} />

      <Inquiry />
      <ContactBanner showFormBtn={false} />
    </>
  );
};

export default page;
