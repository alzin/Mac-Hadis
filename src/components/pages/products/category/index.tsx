import { TProduct } from "@/types/product.type";
import CategoryHero from "../components/CategoryHero";
import CategoryProducts from "../components/CategoryProducts";
import Flow from "../../home/sections/Flow";
import WhyChoose from "../../home/sections/WhyChoose";
import ContactBanner from "../../home/sections/ContactBanner";
import CategoryPurchaseResults from "../components/CategoryPurchaseResults";
import PurchaseProcess from "../../home/sections/PurchaseProcess";
import Inquiry from "@/components/common/sections/Inquiry";
import MajorList from "../components/MajorList";
import HadisReason from "../components/HadisReason";

interface IIndexProps {
  products: TProduct[];
  category: string;
}

const index = ({ category, products }: IIndexProps) => {
  return (
    <>
      <CategoryHero categoryName={category} />
      <CategoryProducts categoryName={category} products={products} />
      <CategoryPurchaseResults categoryName={category} />
      <Flow />
      <WhyChoose />
      <ContactBanner />
      <HadisReason />
      <MajorList categoryName={category} />
      <ContactBanner />
      <PurchaseProcess />
      <Inquiry />
      <ContactBanner />
    </>
  );
};

export default index;
