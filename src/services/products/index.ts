//data 
import products from '@/content/product_details/products';

export const getProductByTitle = (title: string, categoryTitle: string | undefined) => {
  return products.find(p => p.title === decodeURI(title) && categoryTitle && (p.category === decodeURI(categoryTitle)))
}

export const getProducts = () => {
  return products
}