"use client";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import data from "@/content/home/PurchaseResults.json";
import Image from "next/image";
import ResultSlider from "../components/ResultSlider";

const PurchaseResults = () => {
  return (
    <section className="py-[50px] lg:py-[120px] bg-[url(https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/backgrounds/dot-bg-results.svg)] bg-auto font-noto relative">
      <h2 className="mb-[40px] lg:mb-[50px] text-[30px] lg:text-[60px] leading-[45px] lg:leading-[90px] text-[#D51A16] text-center font-black">
        買取実績
      </h2>
      {/* sliders buttons */}
      <div className="custom-prev absolute top-[65%] translate-y-[-65%] left-1 lg:left-[5%] z-10 w-[40px] lg:w-[52px] h-[40px] lg:h-[52px] gradient-navigation rounded-full border-0 text-white flex justify-center items-center cursor-pointer">
        <Image
          src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/icons/arrow-navigation.svg"
          alt="right-arrow"
          width={24}
          height={12}
          loading="eager"
          className="rotate-180 w-[24px] lg:w-[31px] h-[12px] lg:h-[15px]"
        />
      </div>
      <div className="custom-next absolute top-[65%] translate-y-[-65%] right-1 lg:right-[5%] z-10 w-[40px] lg:w-[52px] h-[40px] lg:h-[52px] gradient-navigation rounded-full border-0 text-white flex justify-center items-center cursor-pointer">
        <Image
          src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/icons/arrow-navigation.svg"
          alt="right-arrow"
          width={24}
          height={12}
          loading="eager"
          className="w-[24px] lg:w-[31px] h-[12px] lg:h-[15px]"
        />
      </div>
      {/* sliders */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={3.5}
        loop
        centeredSlides
        breakpoints={{
          320: { slidesPerView: 1.3, spaceBetween: 8 }, // Mobile: Small slides with partial view
          640: { slidesPerView: 2, spaceBetween: 16 }, // Tablet: 2 full slides
          768: { slidesPerView: 3.5, spaceBetween: 16 }, // Desktop: 3 centered slides
          1024: { slidesPerView: 3.5, spaceBetween: 32 }, // Larger screens
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
      >
        {data.map((slider) => (
          <SwiperSlide key={slider.id}>
            <ResultSlider
              image={slider.image}
              title1={slider.title1}
              title2={slider.title2}
              title3={slider.title3}
              model={slider.model}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PurchaseResults;
