import { getProducts } from "@/services/products";

export const useHaveDetails = (itemTitle: string) => {
  const productsData = getProducts();
  return productsData.some((product) => product.title === itemTitle);
};