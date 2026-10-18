import { baseUrl } from "@/utils/baseUrl";
/**
 * Service Schema - For service pages
 * Use this in: Factory service page, Category pages
 */

export interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  areaServed?: string;
  serviceType?: string;
}

export const ServiceSchema = ({
  name,
  description,
  url,
  image = "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/main-ogp.jpg",
  areaServed = "Japan",
  serviceType = "買取サービス"
}: ServiceSchemaProps) => {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "serviceType": serviceType,
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "有限会社ハディズ・インターナショナル",
      "url": baseUrl
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${baseUrl}/satei`,
      "servicePhone": {
        "@type": "ContactPoint",
        "telephone": "+81-120-842-881",
        "contactType": "customer service",
        "availableLanguage": "Japanese"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
    />
  );
};

// Pre-configured for Factory Service page
export const FactoryServiceSchema = () => {
  return (
    <ServiceSchema
      name="工場整理・閉鎖支援サービス"
      description="工場の閉鎖・移転・廃業に伴う機械撤去から清掃まで、一括でお引き受けいたします。機械設備の適正な買取から最終清掃まで対応。"
      url={`${baseUrl}/factory-service`}
      image="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/facotry-services/Reasons/step1.jpg"
      serviceType="工場整理サービス"
    />
  );
};
