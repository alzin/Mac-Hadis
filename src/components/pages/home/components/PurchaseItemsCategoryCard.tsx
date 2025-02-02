interface IPurchaseItemsCategoryCardProps {
  id: number;
  title: string;
  activeCategory: string;
  changeCategory: (title: string) => void;
}

const PurchaseItemsCategoryCard = ({
  id,
  title,
  activeCategory,
  changeCategory,
}: IPurchaseItemsCategoryCardProps) => {
  return (
    <button
      key={id}
      className={`
    px-[16px] py-[11px] lg:p-[15px] text-center border-[2px] relative w-fit md:max-w-[27%] 
    text-[14px] lg:text-[18px] leading-[18px] lg:leading-[24px] font-noto font-black min-w-[290px] lg:min-w-[360px]
    ${
      activeCategory === title
        ? "border-[#990E1C] text-white gradient-red text-shadow-red"
        : "text-[#111111] bg-white bg-[url(/images/home-page/doted-bg-btn.svg)] bg-cover border-[#111111]"
    }
  `}
      onClick={() => changeCategory(title)}
    >
      {title}
    </button>
  );
};

export default PurchaseItemsCategoryCard;
