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
import { TCategory } from "@/types/category.type";
import ContactFixedBanner from "@/components/common/sections/ContactFixedBanner";

interface IIndexProps {
  categoryData: TCategory;
}

const index = ({ categoryData }: IIndexProps) => {
  return (
    <>
      <CategoryHero categoryName={categoryData.title} />
      <CategoryProducts
        categoryName={categoryData.title.replace(/\n/g, "")}
        products={categoryData?.items}
      />
      <CategoryPurchaseResults
        categoryName={categoryData.title.replace(/\n/g, "")}
        purchaseItems={categoryData?.purchaseItems}
      />
      <MajorList
        categoryName={categoryData.title.replace(/\n/g, "")}
        companies={categoryData?.makers}
      />
      <Flow />
      <WhyChoose />
      <ContactBanner />
      <HadisReason />
      <ContactBanner />
      <PurchaseProcess />
      <Inquiry />
      <ContactBanner />
      <ContactFixedBanner />
    </>
  );
};

export default index;
