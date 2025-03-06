import NotFound from "@/app/not-found";
import data from "@/content/home/purchasedItems.json";
import ProductPage from "@/components/pages/products/product/index";
import { Metadata } from "next";

interface IPageProps {
  params: Promise<{ title: string; category: string }>;
}

export async function generateMetadata({ params }: IPageProps): Promise<Metadata> {
  const { title, category } = await params;

  return {
    title: `${decodeURIComponent(title)} - ${decodeURIComponent(category)} | hadis`,
    description: `私たちの${decodeURIComponent(category)}コレクションから、${decodeURIComponent(title)}を探索しましょう。`,
  };
}

const Page = async ({ params }: IPageProps) => {
  const { title, category } = await params;

  if (!title || !category) {
    return <NotFound />;
  }

  const titleDecoded = decodeURIComponent(title);
  const categoryDecoded = decodeURIComponent(category);

  const product = data.items.find(
    (item) => item.title === titleDecoded && item.category === categoryDecoded
  );

  if (!product) {
    return <NotFound />;
  }

  return <ProductPage product={product} />;
};

export default Page;
