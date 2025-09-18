/* 
  ! IMPORTANT NOTE: 
  ! A NewProductPage component is used to display the new product page when get a confirmation we well replace the old product page with this one
*/
import NewProductPage from "@/components/pages/products/new-product/index";
import ProductPage from "@/components/pages/products/product/index";
import { Metadata } from "next";
import { getCategoryById, getCategoryTitleById } from "@/services/category";
import { getProductByTitle } from "@/services/products";
import { notFound } from "next/navigation";
import { isNewProduct, isTProduct } from "@/utils/typeguards";

interface IProductPageProps {
  params: Promise<{ title: string; categoryId: string }>;
}

export async function generateMetadata({
  params,
}: IProductPageProps): Promise<Metadata> {
  const { title, categoryId } = await params;
  const decodedTitle = decodeURIComponent(title);
  const categoryData = await getCategoryById(categoryId);

  if (!categoryData) {
    return {
      title: `${decodedTitle} | Not Found - hadis`,
      description: "The requested category or product could not be found.",
    };
  }

  return {
    title: `${decodedTitle} - ${categoryData.title} | hadis`,
    description: `私たちの${categoryData.title}コレクションから、${decodedTitle}を探索しましょう。`,
  };
}

const Page = async ({ params }: IProductPageProps) => {
  const { title, categoryId } = await params;
  // const decodedTitle = decodeURIComponent(title);
  // const categoryData = await getCategoryById(categoryId);

  const categoryTitle = getCategoryTitleById(categoryId);
  console.log(title,categoryTitle);
  const productData = getProductByTitle(title, categoryTitle);
  console.log("product details", productData)
  if (!productData) {
    return notFound();
  }
  console.log(productData);

  // const productData = categoryData.items.find(
  //   (item) => item.title === decodedTitle
  // )!;
  if (isNewProduct(productData)) {
    // If true, TypeScript now knows productData is TNewProduct
    return <NewProductPage product={productData} />;
  } else if (isTProduct(productData)) {
    // If false, TypeScript knows productData must be TProduct
    return <ProductPage product={productData} />;
  }
};

export default Page;
