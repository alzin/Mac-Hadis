import Image from "next/image";

interface IResultSliderProps {
  image: string;
  title1: string;
  title2: string;
  title3?: string;
  model: string;
}

const ResultSlider = ({
  image,
  title1,
  title2,
  title3,
  model,
}: IResultSliderProps) => {
  return (
    <div className="p-4 lg:p-[20px] rounded border-2 bg-[#FFF7F8] border-[#B81122] flex space-x-2">
      <Image
        src={image}
        alt={title1}
        width={150}
        height={150}
        className="w-[100px] lg:w-[150px] h-[100px] lg:h-[150px]"
      />
      <div className="text-[12px] lg:text-[16px] leading-[18px] lg:leading-[24px] text-[#111111] font-bold">
        {/* //! hidden */}
        <span className="hidden py-[3px] lg:py-1 px-2 mb-1 lg:mb-2 text-[10px] leading-[15px] text-white block w-fit bg-[#B81122]">
          カテゴリー1
        </span>
        <p>{title1}</p>
        <p>{title2}</p>
        {title3 && <p>{title3}</p>}
        <p>{model}</p>
      </div>
    </div>
  );
};

export default ResultSlider;
