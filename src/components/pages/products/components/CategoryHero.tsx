import { buybackTitle } from "@/utils/seo";
import Image from "next/image";

interface ICategoryHeroProps {
  categoryName: string;
}

const CategoryHero = ({ categoryName }: ICategoryHeroProps) => {
  const heroTitle = buybackTitle(categoryName);
  const heroSubtitle = "中古機械・工具の査定はハディズへ";

  return (
    <section className="relative px-4 py-8 w-full min-h-[510px] lg:min-h-[640px] 2xl:min-h-[calc(100vh-64px)] flex items-center sm:bg-right-top overflow-hidden">
      {/* Background wrapper */}
      <div className="absolute -z-10 inset-0">
        <Image
          src={
            "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/categories/category-background-her.jpeg"
          }
          alt="category hero"
          sizes="100vw"
          quality={100}
          fill          
          className="object-cover object-[75%] lg:object-center"
        />
      </div>
      {/* content wrapper */}
      <div className="w-[80%] lg:w-[65%] p-3 lg:p-10 lg:ml-[5%] space-y-2 lg:space-y-4 bg-[#ffffffbf] text-[#B81122]">
        <h1 className="text-[32px] leading-[36px] lg:text-[65px] lg:leading-[90px] font-bold text-left lg:text-center">
          {heroTitle.split("\n").map((item, index) => (
            <span className=" block" key={index}>
              {item}
            </span>
          ))}
        </h1>
        <p className="text-[24px] leading-[36px] lg:text-[48px] lg:leading-[1.5] font-semibold text-left lg:text-center">
          {heroSubtitle}
        </p>
        {/* details */}
        <div className="flex w-full items-start xl:items-center lg:justify-center gap-2 flex-col lg:flex-row text-white flex-wrap">
          <h2 className="flex gap-1 items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black lg:text-[32px] text-xl">
            <span className="text-[18px] lg:text-[28px]">創業</span>
            <span className="text-[44px] lg:text-[100px]">25</span>
            <span className="mt-auto pb-2 text-[18px] lg:text-[28px]">
              年以上
            </span>
          </h2>
          <h2 className="flex gap-1 lg:gap-2 items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black lg:text-[32px] text-xl">
            <span className="flex items-start lg:items-center flex-col gap-1 lg:gap-2">
              <span>出張費</span>
              <span>査定費</span>
            </span>
            <span className="text-[46px] lg:text-[100px]">0</span>
            <span className="mt-auto pb-2">円</span>
          </h2>
          <h2 className="flex items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black text-3xl lg:text-[50px]">
            全国対応
          </h2>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
