import { TProduct } from "@/types/product.type";
import ProductDetails from "../components/ProductDetails";
import ContactBanner from "../../home/sections/ContactBanner";
import PurchaseProcess from "../../home/sections/PurchaseProcess";
import BusinessPolicy from "../../home/sections/BusinessPolicy";
import CompanyProfile from "../../home/sections/CompanyProfile";

interface IIndexProps {
  product: TProduct;
}

const index = ({ product }: IIndexProps) => {
  return (
    <>
      <ProductDetails product={product} />
      <ContactBanner />
      <PurchaseProcess />
      <BusinessPolicy />
      <CompanyProfile />
    </>
  );
};

export default index;
