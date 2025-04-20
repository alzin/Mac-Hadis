interface IProductDetailsProps {
  subTitle: string;
  description: string;
}

const ProductDetails = ({ subTitle, description }: IProductDetailsProps) => {
  return (
    <div className="mt-8 py-8 px-4">
      <div className="text-center space-y-4 max-w-[90%] mx-auto md:max-w-[80%] lg:max-w-[50%]">
        <h1 className="font-bold text-[28px] md:text-[32px] lg:text-[36px] text-[#303030]">
          {subTitle}
        </h1>
        <p className="text-[#303030] text-[16px] md:text-[18px] leading-7 md:leading-8 font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
