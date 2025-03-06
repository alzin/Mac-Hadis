import NotFound from "@/app/not-found";
import CategoryPage from "@/components/pages/products/category/index";
import data from "@/content/home/purchasedItems.json";

interface IPageProps {
  params: Promise<{
    category: string;
  }>;
}

const page = async ({ params }: IPageProps) => {
  const { category } = await params;

  if (!category) {
    return <NotFound />;
  }

  const categoryDecoded = decodeURIComponent(category);

  const products = data.items.filter(
    (product) => product.category === categoryDecoded
  );

  if (products.length === 0) {
    return <NotFound />;
  }

  return <CategoryPage category={categoryDecoded} products={products} />;
};

export default page;
