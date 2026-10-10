interface IProductDetailsProps {
  subTitle?: string;
  description?: string;
  productTitle?: string;
}

const ProductDetails = ({ subTitle, description, productTitle }: IProductDetailsProps) => {
  const safeProductTitle = productTitle?.trim() || "機械";
  const fallbackHeading = `中古${safeProductTitle}の買取・査定`;
  const heading = subTitle?.trim() || fallbackHeading;
  const body = description?.trim() || `${safeProductTitle}の買取ならハディズ。メーカー・型式・状態を確認し、買取価格をご案内します。出張査定や搬出についてもご相談ください。`;

  return (
    <div className="mt-8 py-8 px-4">
      <div className="text-center space-y-4 max-w-[90%] mx-auto md:max-w-[80%] lg:max-w-[50%]">
        <h2 className="font-bold text-[28px] md:text-[32px] lg:text-[36px] text-[#303030]">
          {heading}
        </h2>
        <p className="text-[#303030] text-[16px] md:text-[18px] leading-7 md:leading-8 font-medium">
          {body}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
