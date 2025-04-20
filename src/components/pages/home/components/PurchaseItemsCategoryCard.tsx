import { useCallback } from "react";

interface IPurchaseItemsCategoryCardProps {
  id: string;
  title: string;
  activeCategory: string;
  changeCategory: (id: string) => void;
}

const PurchaseItemsCategoryCard = ({
  id,
  title,
  activeCategory,
  changeCategory,
}: IPurchaseItemsCategoryCardProps) => {
  const handleCategoryClick = useCallback(() => {
    changeCategory(id);

    // Avoid unnecessary DOM queries on every click
    const scrollTarget = document.getElementById("scroll-to-items");

    // Scroll only for small screens if element exists
    if (scrollTarget && window.innerWidth <= 600) {
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    }
  }, [id, changeCategory]);

  return (
    <button
      className={`
        relative w-fit md:max-w-[27%] min-w-[290px] lg:min-w-[360px]
        px-[16px] py-[11px] lg:p-[15px] text-center text-[14px] lg:text-[18px] 
        leading-[18px] lg:leading-[24px] font-noto font-semibold border-[2px]
        ${
          activeCategory === id
            ? "border-[#990E1C] text-white gradient-red text-shadow-red"
            : "text-[#111111] bg-white bg-[url(https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/backgrounds/doted-bg-btn.svg)] bg-cover border-[#111111]"
        }
      `}
      onClick={handleCategoryClick}
    >
      {title}
    </button>
  );
};

export default PurchaseItemsCategoryCard;
