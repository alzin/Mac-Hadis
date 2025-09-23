import { TPurchaseItem } from "@/types/purchase-item.types";
import { PurchaseRecordsCard } from "./PurchaseRecordsCard";

interface IPurchaseRecordsProps {
  label: string;
  isCategory?: boolean;
  purchaseItems?: TPurchaseItem[];
}

export const PurchaseRecords = ({
  label,
  isCategory,
  purchaseItems,
}: IPurchaseRecordsProps) => {
  return (
    <section className="relative py-[50px] md:py-[80px] lg:py-[120px] px-5 md:px-[50px] lg:px-[80px]">
      <h2 className="text-[30px] md:text-[50px] lg:text-[60px] leading-[45px] md:leading-[60px] lg:leading-[90px] font-black text-center font-noto bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent">
        {label}
      </h2>
      <p className="mt-2 lg:mt-4 text-[20px] lg:text-[40px] leading-[30px] lg:leading-[60px] font-black text-center bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent">
        {isCategory ? "の買取実績" : ""}
      </p>
      <div className="mt-[40px] md:mt-[45px] lg:mt-[50px] flex flex-wrap justify-between md:justify-center gap-[17px] lg:gap-8">
        {purchaseItems?.map((item, index) => (
          <PurchaseRecordsCard
            key={index}
            title={item.title}
            image={item.imageSrc}
          />
        ))}
      </div>
    </section>
  );
};
