/* 
  ! IMPORTANT NOTE: 
  ! A NewProductPage component is used to display the new product page when get a confirmation we well replace the old product page with this one
*/
import NewProductPage from "@/components/pages/products/new-product/index";
import ProductPage from "@/components/pages/products/product/index";
import { Metadata } from "next";
import { getCategoryById } from "@/services/category";
import { getProductByTitle } from "@/services/products";
import { notFound } from "next/navigation";
import { isNewProduct, isTProduct } from "@/utils/typeguards";

import { ServiceSchema, BreadcrumbSchema, generateBreadcrumbs } from '@/components/seo/schemas';
import { buybackTitle, defaultSeoImage, normalizeCategoryName, productUrl } from "@/utils/seo";

interface IProductPageProps {
  params: Promise<{ title: string; categoryId: string }>;
}

function resolveProduct(categoryId: string, title: string) {
  const categoryData = getCategoryById(categoryId);
  if (!categoryData) notFound();
  const productData = getProductByTitle(title, normalizeCategoryName(categoryData.title));
  if (!productData || (!isNewProduct(productData) && !isTProduct(productData))) notFound();
  return { categoryData, productData };
}

export async function generateMetadata({
  params,
}: IProductPageProps): Promise<Metadata> {
  const { title, categoryId } = await params;
  const { categoryData, productData } = resolveProduct(categoryId, title);
  const categoryTitle = normalizeCategoryName(categoryData.title);
  const seoTitle = buybackTitle(productData.title);
  const seoDescription = `${productData.title}の買取ならハディズ。中古${categoryTitle}の出張査定・搬出をご相談いただけます。メーカー・型式・状態を確認し、買取価格をご案内します。`;
  const url = productUrl(categoryId, productData.title);
  const image = productData.webImagesGallery?.[0]?.imageSrc || categoryData.imageSrc || defaultSeoImage;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url: url,
      title: seoTitle,
      description: seoDescription,
      siteName: "機械工具買取ハディズ",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [image],
    },
  };
}

const Page = async ({ params }: IProductPageProps) => {
  const { title, categoryId } = await params;
  const { categoryData, productData } = resolveProduct(categoryId, title);
  const categoryTitle = normalizeCategoryName(categoryData.title);
  const url = productUrl(categoryId, productData.title);
  const productImage = productData.webImagesGallery?.[0]?.imageSrc || categoryData.imageSrc || defaultSeoImage;

  return (
    <>
      {/* ✅ 追加: Structured Data */}
      <ServiceSchema
        name={buybackTitle(productData.title)}
        description={productData.servicesDescription || productData.title}
        image={productImage}
        url={url}
      />
      <BreadcrumbSchema
        items={generateBreadcrumbs.product(categoryId, categoryTitle || '', productData.title)}
      />

      {isNewProduct(productData) ? (
        <NewProductPage product={productData} />
      ) : isTProduct(productData) ? (
        <ProductPage product={productData} />
      ) : (
        notFound()
      )}
    </>
  );
};

export default Page;
