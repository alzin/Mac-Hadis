import { productUrl } from "@/utils/seo";
import { baseUrl } from "@/utils/baseUrl";
/**
 * BreadcrumbList Schema - For breadcrumb navigation in search results
 * Use this in: Any page with breadcrumbs (Blog pages, Product pages, Category pages)
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
};

// Helper function to generate common breadcrumb paths
export const generateBreadcrumbs = {
  home: (): BreadcrumbItem[] => [
    { name: "ホーム", url: baseUrl }
  ],
  
  blog: (blogTitle: string): BreadcrumbItem[] => [
    { name: "ホーム", url: baseUrl },
    { name: "ブログ", url: `${baseUrl}/blogs` },
    { name: blogTitle, url: `${baseUrl}/blogs/${encodeURIComponent(blogTitle)}` }
  ],
  
  category: (categoryId: string, categoryTitle: string): BreadcrumbItem[] => [
    { name: "ホーム", url: baseUrl },
    { name: "買取品目", url: `${baseUrl}/#purchased-items` },
    { name: categoryTitle, url: `${baseUrl}/products/${categoryId}` }
  ],
  
  product: (categoryId: string, categoryTitle: string, productTitle: string): BreadcrumbItem[] => [
    { name: "ホーム", url: baseUrl },
    { name: categoryTitle, url: `${baseUrl}/products/${categoryId}` },
    { name: productTitle, url: productUrl(categoryId, productTitle) }
  ],

  satei: (): BreadcrumbItem[] => [
    { name: "ホーム", url: baseUrl },
    { name: "無料価格査定", url: `${baseUrl}/satei` }
  ],

  factoryService: (): BreadcrumbItem[] => [
    { name: "ホーム", url: baseUrl },
    { name: "工場整理・閉鎖支援サービス", url: `${baseUrl}/factory-service` }
  ]
};
