import ProductHero from "../components/ProductHero";
import Breadcrumb from "../components/Breadcrumb";
import ImagesGallery from "../components/ImagesGallery";
import { TProduct } from "@/types/product.type";
import ProductDetails from "../components/ProductDetails";
import Cards from "../components/Cards";
import MajorList from "../components/MajorList";
import ContactBanner from "../../home/sections/ContactBanner";
import PurchaseProcess from "../../home/sections/PurchaseProcess";
import BusinessPolicy from "../../home/sections/BusinessPolicy";
import ContactFixedBanner from "@/components/common/sections/ContactFixedBanner";
import PurchaseService from "../components/PurchaseService";

interface IIndexProps {
  product: TProduct;
}

const index = ({ product }: IIndexProps) => {
  return (
    <>
      <ProductHero productTitle={product.title} />
      <Breadcrumb title={product.title} category={product.category} />
      <ProductDetails
        subTitle={product.subTitle}
        description={product.description}
      />
      <ImagesGallery images={product.webImagesGallery}  />
      <PurchaseService
        servicesTitle={product.servicesTitle}
        servicesDescription={product.servicesDescription}
        questions={product.questions}
      />
      <ImagesGallery images={product.cameraImagesGallery}  purchaseeProductTitle={product.purchaseeProductTitle} title={product.title} isCameraImages/>
      <Cards kinds={product.kinds} merit={product.merit} tips={product.tips} />
      <MajorList title={product.title} companies={product.makers} />
      <ContactBanner />
      <ContactFixedBanner />
      <PurchaseProcess />
      <BusinessPolicy />
    </>
  );
};

export default index;
