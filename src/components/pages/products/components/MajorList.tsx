import Image from "next/image";
import Link from "next/link";

interface IMajorListProps {
  categoryName: string;
}

const companies = [
  {
    jp: "スナップオン",
    en: "Snap-on",
    link: "https://www.snapon.co.jp/",
    imageSrc: "/images/category/companies/snapon-logo.gif",
  },
  {
    jp: "バンザイ",
    en: "BANZAI",
    link: "https://www.banzai.co.jp/",
    imageSrc: "/images/category/companies/banzai-logo.svg",
  },
  {
    jp: "エイワ",
    en: "EIWA",
    link: "https://circuit-eiwa.co.jp/",
    imageSrc: "/images/category/companies/eiwa-logo.jpg",
  },
  // {
  //   jp: "小野谷機工",
  //   en: "EXCEED",
  //   link: "https://linkout.aucfan.com/?to=https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=2015148&pid=884896608&vc_url=https%3A%2F%2Fpage.auctions.yahoo.co.jp%2Fjp%2Fauction%2Fs755148093",
  //   imageSrc: "/images/category/companies/onodani-logo.svg",
  // },
  {
    jp: "オノダニ",
    en: "ONODANI",
    link: "https://www.onodani.co.jp/",
    imageSrc: "/images/category/companies/onodani-logo.jpg",
  },
  {
    jp: "イヤサカ",
    en: "IYASAKA",
    link: "https://www.iyasaka.co.jp/",
    imageSrc: "/images/category/companies/iyasaka-logo.png",
  },
  {
    jp: "ビシャモン",
    en: "Bishamon",
    link: "http://www.bishamon.co.jp/",
    imageSrc: "/images/category/companies/bishamon-logo.jpg",
  },
  {
    jp: "スパネージ",
    en: "SPANESI",
    link: "https://www.maru-t.co.jp/products_lp/spanesi/",
    imageSrc: "/images/category/companies/spanesi-logo.png",
  },
  {
    jp: "セレット",
    en: "CELETTE",
    link: "https://www.ipec-j.co.jp/products/frame/",
    imageSrc: "/images/category/companies/celette-logo.png",
  },
  {
    jp: "カーベンチ",
    en: "CAR BENCH",
    link: "https://www.carbench.it/en",
    imageSrc: "/images/category/companies/carbench-logo.png",
  },
  {
    jp: "キュービック",
    en: "CUBIC SYSTEM ",
    link: "http://www.cubicsystem.co.jp/system1",
    imageSrc: "/images/category/companies/cubic-system-logo.png",
  },
  {
    jp: "ヤシマ",
    en: "Yashima",
    link: "https://www.yashima-corp.jp/yousetsuki/spot-welder/",
    imageSrc: "/images/category/companies/yashima-logo.jpg",
  },
  {
    jp: "栄和",
    en: "EIWA",
    link: " http://www.eiwanet.co.jp/publics/index/17/",
    imageSrc: "/images/category/companies/logo-trans.png",
  },
  // {
  //   jp: "堀場",
  //   en: "HORIBA",
  //   link: "https://www.horiba.com/jpn/",
  //   imageSrc: "/images/category/companies/yashima-logo.jpg",
  // },
];
const MajorList = ({ categoryName }: IMajorListProps) => {
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
        {companies.map((item, index) => (
          <Link
            key={index}
            target="_blank"
            href={item.link}
            className="px-4 py-3 bg-white border-[3px] border-[#B81122] flex justify-center items-center min-h-[100px] max-h-[100px] lg:min-h-[150px] lg:max-h-[150px] overflow-hidden"
          >
            <Image
              src={item.imageSrc}
              alt={item.en}
              width={200}
              height={200}
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MajorList;
