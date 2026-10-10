import { buybackTitle, normalizeCategoryName } from "@/utils/seo";
import { Metadata } from "next";
import CategoryPage from "@/components/pages/products/category/index";

// services
import { getCategoryById } from "@/services/category";

// baseUrl
import { baseUrl } from "@/utils/baseUrl";
import { notFound } from "next/navigation";

import { ServiceSchema, BreadcrumbSchema, generateBreadcrumbs } from '@/components/seo/schemas';

interface IPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

// metadata
export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {

  const { categoryId } = await params;
  const data = getCategoryById(categoryId);

  if (!data) {
    return {
      title: "Category Not Found",
    };
  }

  const categoryName = normalizeCategoryName(data.title);
  const seoTitle = buybackTitle(categoryName);
  const seoDescription = `${seoTitle}ならハディズ。出張査定・搬出をご相談いただけます。製造年・型式・状態を確認し、買取価格をご案内します。`;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      type: "website",
      url: `${baseUrl}/products/${data.id}`,
      title: seoTitle,
      description: seoDescription,
      siteName: "機械工具買取ハディズ",
      images: [{ url: data.imageSrc }],
    },

    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: data.imageSrc,
    },

    alternates: {
      canonical: `${baseUrl}/products/${data.id}`,
    },
  };
}

const page = async ({ params }: IPageProps) => {

  const { categoryId } = await params;
  const categoryData = getCategoryById(categoryId);

  if (!categoryData) {
    return notFound()
  }
  const categoryTitle = normalizeCategoryName(categoryData.title);

  return (
    <>
      {/* ✅ 追加: Structured Data */}
      <ServiceSchema
        name={`${buybackTitle(categoryTitle)}サービス`}
        description={`${buybackTitle(categoryTitle)}ならハディズへ。全国対応、出張費・査定費無料。創業25年以上の実績。`}
        url={`${baseUrl}/products/${categoryId}`}
        image={categoryData.imageSrc}
      />
      <BreadcrumbSchema
        items={generateBreadcrumbs.category(categoryId, categoryTitle)}
      />

      <CategoryPage categoryData={categoryData} />
    </>
  );
};

export default page;
