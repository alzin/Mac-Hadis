"use client";

import { TImage } from "@/types/product.type";
import Image from "next/image";
import NavigationButton from "./NavigationButton";
import { useImageGallery } from "@/hooks/useImagesGallery";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface IImagesGalleryProps {
  images: TImage[];
  purchaseeProductTitle?: string | null;
  title?: string | null;
}

const ImagesGallery = ({ images, purchaseeProductTitle, title }: IImagesGalleryProps) => {
  const imagesCount = images.length;
  const { selectedImageIndex, setSelectedImageIndex, handlePrev, handleNext } =
    useImageGallery(imagesCount);
  return (
    <section className="my-8">
      {/* Main Image with Navigation */}
      <div className="relative flex flex-col items-center mb-8 mx-auto w-full md:max-w-[80%] lg:max-w-[50%]">
        <NavigationButton
          direction="prev"
          onClick={handlePrev}
          disabled={selectedImageIndex === 0}
        />

        {purchaseeProductTitle && (
          <p className="mt-2 mb-5 lg:mt-4 text-[20px] lg:text-[40px] leading-[30px] lg:leading-[60px] font-black text-center bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent">
           {title}{purchaseeProductTitle}
          </p>
        )}

        <div className="w-[70%] lg:w-fit min-h-[420px] md:min-h-[600px] lg:min-h-[650px] border-[#B81122] border-2 rounded-lg overflow-hidden p-3 lg:p-8 bg-[#fff7f8] shadow-md flex flex-col items-center justify-center relative">
          <Image
            src={images[selectedImageIndex].imageSrc}
            width={350}
            height={350}
            loading="eager"
            alt={`${images[selectedImageIndex].title} image product`}
            className="max-w-full h-auto self-center"
          />
        </div>

        <NavigationButton
          direction="next"
          onClick={handleNext}
          disabled={selectedImageIndex === images.length - 1}
        />
      </div>

      {/* Thumbnails Carousel */}
      <div className="w-[80%] mx-auto">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={6}
          breakpoints={{
            320: { slidesPerView: 4, spaceBetween: 8 },
            640: { slidesPerView: 4, spaceBetween: 16 },
            768: { slidesPerView: 6, spaceBetween: 16 },
            1024: { slidesPerView: 6, spaceBetween: 32 },
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          className="swiper-container"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.title}>
              <div
                className={`flex justify-center items-center cursor-pointer group overflow-hidden transition duration-200 ease-in-out ${
                  selectedImageIndex === index
                    ? "border-[#B81122] border-2 rounded-md bg-[#fff7f8]"
                    : "border-2 border-gray-200 rounded-md"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image.imageSrc}
                  width={100}
                  height={100}
                  alt={`${image.title} thumbnail`}
                  className="w-[100px] h-[100px] object-contain group-hover:scale-110 transition duration-200 ease-in-out"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ImagesGallery;
