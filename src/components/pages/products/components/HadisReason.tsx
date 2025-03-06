const pointsData = [
  {
    id: 1,
    title: "専門知識と徹底した市場調査",
    description:
      "ハディズではスタッフが豊富な商品知識を持ち、徹底した市場調査を定期的に行うことで、適正価格で買取が可能です。",
  },
  {
    id: 2,
    title: "経験豊富なスタッフの技術",
    description:
      "大型重量物の買取実績も多数あります。他社が断ってしまうような難しい現場もハディズなら対応可能です。お気軽にご相談ください。",
  },
  {
    id: 3,
    title: "メンテナンス技術",
    description:
      "ハディズにはメンテナンス・補修技術を持つスタッフがいますので、お客様から買取した商品をより良い状態で販売することができます。そのため、他社よりも高い価格で買取することが可能です。",
  },
  {
    id: 4,
    title: "海外ルートでの売却",
    description:
      "日本国内の他に、海外での販売ルートも持っております。限られた市場ではなく、幅広い市場で販売を行うことができるため、他社よりも高く買取することが可能です。",
  },
  {
    id: 5,
    title: "低コストで還元",
    description:
      "賃料の安価な郊外に店舗・倉庫を構え、トラックや必要機材もすべて自社所有のため、コストを抑えることができています。その分をお客様に還元することで、買取価格を高く設定することが可能です。",
  },
];

const HadisReason = () => {
  return (
    <section className="px-5 py-[50px] bg-[url(/images/home-page/dot-bg-results.svg)] bg-auto">
      {/* Content */}
      <h2 className="bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent text-center text-[32px] leading-[36px] lg:text-[65px] lg:leading-[90px] font-black">
        ハディズがを高額で買える理由
      </h2>
      {/* Points */}
      <div className="w-full md:w-[90%] lg:w-[80%] md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[40px] md:gap-x-[32px] lg:gap-y-[60px] mt-[60px] lg:mt-[75px]">
        {pointsData.map((point) => (
          <div
            key={point.id}
            className="px-4 lg:px-[24px] py-[27px] lg:py-10 bg-[#FFF7F8] border-[2px] border-[#B81122] rounded relative"
          >
            {/* header point counter */}
            <div className="px-[18px] min-h-[38px] lg:min-h-[48px] text-[20px] lg:text-[24px] leading-[20px] lg:leading-[24px] left-[50%] -top-[10%] -translate-x-[50%] rounded text-white gradient-red absolute flex items-center">
              Point
              <span className="font-[700px] ml-1 text-[28px] lg:text-[32px] leading-[28px] lg:leading-[32px]">
                {point.id}
              </span>
            </div>
            {/* details */}
            <h3 className="text-[20px] lg:text-[24px] leading-[30px] lg:leading-[36px] text-center font-black text-[#B81122] mb-4 ">
              {point.title}
            </h3>
            <p className="text-[14px] lg:text-[16px] leading-[28px] lg:leading-[36px] text-[#111111]">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HadisReason;
