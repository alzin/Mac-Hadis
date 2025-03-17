import { TMaker } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";

interface IMajorListProps {
  categoryName: string;
  companies: TMaker[];
}

const MajorList = ({ categoryName, companies }: IMajorListProps) => {
  return (
    <section className="px-5 py-[50px] relative">
      <Image
        className=" absolute -z-10 top-0 left-0 object-cover"
        fill
        src={"/images/home-page/flow-bg.png"}
        alt="hero-background-hadis"
        loading="lazy"
      />
      {/* Content */}
      <h2 className="bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent text-center text-[32px] leading-[36px] lg:text-[65px] lg:leading-[90px] font-black">
        {categoryName}
      </h2>
      <p className="bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent text-center text-[24px] leading-[36px] lg:text-[48px] lg:leading-[90px] font-bold">
        の主なメーカー一覧
      </p>
      {/* companies wrapper */}
      <div className="w-full md:w-[90%] lg:w-[80%] md:mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[7px] lg:gap-x-[32px] lg:gap-y-4 mt-10">
        {companies?.map((item, index) => (
          <Link
            key={index}
            target="_blank"
            href={item.link}
            className="px-4 py-3 bg-white border-[3px] border-[#B81122] flex justify-center items-center min-h-[100px] max-h-[100px] lg:min-h-[150px] lg:max-h-[150px] overflow-hidden"
          >
            <Image
              src={item.imageSrc}
              alt={item.en}
              width={250}
              height={250}
              unoptimized
              className="w-full h-full object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MajorList;
