//data 
import products from '@/content/product_details/products';

export const getProductByTitle = (title: string, categoryTitle: string | undefined) => {
  if (!categoryTitle) return undefined;
  // Raw content titles and URL-encoded route parameters are both supported.
  const exact = products.find(p => p.title === title && p.category === categoryTitle);
  if (exact) return exact;
  try {
    const decodedTitle = decodeURIComponent(title);
    return products.find(p => p.title === decodedTitle && p.category === categoryTitle);
  } catch {
    return undefined;
  }
}

export const getProducts = () => {
  return products
}