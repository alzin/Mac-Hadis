
// data
import whyChooseData from "@/content/home/whyChoose.json";

// components
import WhyChooseCard from "../components/WhyChooseCard";


const WhyChoose = () => {
  return (
    <section id="why-choose" className="px-5 py-20 md:py-[100px] md:px-[90px] lg:py-[120px] lg:px-[160px]">
      <h2 className="mb-10 lg:mb-[50px] bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent text-center text-[32px] md:text-5xl lg:text-[60px] font-noto font-black leading-[48px] lg:leading-[90px]">
        ハディズが選ばれる理由
      </h2>
      {/* all boxes */}
      <div className="space-y-8 lg:space-y-[40px] font-noto">
        {whyChooseData.map((item) => (
          <WhyChooseCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
