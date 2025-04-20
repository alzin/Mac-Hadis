interface IPurchaseProcessCategoryBtn {
  category: PurchaseProcessCategoryType;
  activeCategory: PurchaseProcessCategoryType;
  label: string;
  changeCategory(i: PurchaseProcessCategoryType): undefined;
}

const PurchaseProcessCategoryBtn: React.FC<IPurchaseProcessCategoryBtn> = ({
  category,
  label,
  activeCategory,
  changeCategory,
}) => {
  return (
    <button
      onClick={() => changeCategory(category)}
      className={`font-black text-xs lg:text-base w-[170px] p-4 ${
        category === activeCategory
          ? "text-white gradient-red"
          : "text-[#111111] border-2 border-[#111111] bg-[url(https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/backgrounds/doted-bg-btn.svg)] bg-cover"
      }`}
    >
      {label}
    </button>
  );
};

export default PurchaseProcessCategoryBtn;
