import NotFound from "@/app/not-found";
import CategoryPage from "@/components/pages/products/category/index";
import categories from "@/content/categories/categories";

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
  const categoryData = categories.find((c) => c.title.replace(/\n/g, '') === categoryDecoded);
  const products = categoryData?.items;

  if (!categoryData || !products || products?.length === 0) {
    return <NotFound />;
  }

  return <CategoryPage categoryData={categoryData} />;
};

export default page;
