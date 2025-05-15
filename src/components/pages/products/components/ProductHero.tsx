import Image from "next/image";

interface IProductHeroProps {
  productTitle: string;
}

const ProductHero = ({ productTitle }: IProductHeroProps) => {
  return (
    <section className="relative px-4 w-full h-[510px] lg:h-[640px] 2xl:h-[calc(100vh-64px)] sm:bg-right-top overflow-hidden">
      {/* Background wrapper */}
      <div className="absolute -z-10 inset-0">
        <Image
          src={"/hero2.png"}
          alt="category hero"
          sizes="100vw"
          quality={100}
          fill
          priority
          className="object-cover object-[75%] lg:object-center"
        />
      </div>
      {/* content wrapper */}
      <div className="w-[74%] lg:w-[65%] p-3 px-3 lg:p-10 space-y-2 lg:space-y-4 bg-[#ffffffbf] absolute left-[40%] lg:left-[5%] top-[50%] translate-x-[-50%] lg:translate-x-0 translate-y-[-50%] text-[#B81122]">
        <h2 className="text-[32px] leading-[36px] lg:text-[65px] lg:leading-[90px] font-bold text-left lg:text-center">
          {productTitle.split("\n").map((item, index) => (
            <span className=" block" key={index}>
              {item}
            </span>
          ))}
        </h2>
        <p className="text-[24px] leading-[36px] lg:text-[48px] lg:leading-[90px] font-semibold text-left lg:text-center">
          買取はハディズに お任せ！
        </p>
      </div>
    </section>
  );
};

export default ProductHero;
