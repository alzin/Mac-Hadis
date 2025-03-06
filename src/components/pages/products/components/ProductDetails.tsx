import { TProduct } from "@/types/product.type";
import Breadcrumb from "./Breadcrumb";
import Image from "next/image";
import SpecsTable from "./SpecsTable";
import ContentText from "./ContentText";

interface IProductDetailsProps {
  product: TProduct;
}

const ProductDetails = ({ product }: IProductDetailsProps) => {
  return (
    <section className="bg-[#f8f7f6] text-[#111111]">
      <div className="max-w-[928px] space-y-4 mx-auto pt-4 lg:pt-10 px-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumb title={product.title} category={product.category} />
        <div className="bg-white px-4 lg:px-24 py-[60px] space-y-9 lg:space-y-12">
          <h1 className="font-black text-xl lg:text-[32px] leading-[48px] text-[#333333]">
            {product.title}
          </h1>
          <div className=" relative w-[335px] h-[173px] lg:w-[544px] lg:h-[307px] mx-auto">
            <Image
              className="object-contains"
              src={product.image}
              alt={product.title}
              fill
            />
          </div>
          {/* Table  */}
          <SpecsTable />
          {/* Content */}
          <ContentText />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
