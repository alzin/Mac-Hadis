import Image from "next/image";
import "@/styles/hero.css";

const Hero: React.FC = () => {
  return (
    <>
      <section
        aria-label="Hero section with business highlights"
        className="relative px-4 w-full h-[410px] lg:h-[640px] 2xl:h-[calc(100vh-64px)] sm:bg-right-top overflow-hidden"
      >
        {/* Background wrapper */}
        <div className="absolute inset-0 -z-30">
          {/* OPTIMIZATION: Use <picture> to force single download based on viewport */}
          {/* Note: We use standard <img> inside picture for art direction to stop double-download. 
              Since your source is S3 and already WebP, this is efficient. */}
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background.webp"
            />
            <img
              src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background-mobile.webp"
              alt="Company's legacy image"
              className="object-cover object-center w-full h-full lg:object-right-top"
              fetchPriority="high" 
            />
          </picture>
        </div>

        <div className="flex lg:w-1/2 2xl:min-w-[1000px] items-start 2xl:items-center justify-center h-full 2xl:h-3/4 space-y-2 lg:space-y-7 flex-col pt-7 2xl:pt-20 sm:pl-12 pb-4">
          {/* image 1 - Removed loading='eager', allow default lazy or priority if critical */}
          <div className="text-hero relative xl:w-[810px] xl:h-[64px] w-[335px] h-[38px] sm:h-[50px] lg:h-[70px] z-10">
            <Image
              src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-1.webp"
              alt="Company's legacy image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
              fill
              // Removed quality={100} -> defaults to 75
              priority // This adds preload automatically
            />
          </div>
          {/* image 2 */}
          <div className="text-hero relative w-[340px] h-[88px] sm:h-[130px] lg:h-[300px] xl:w-[810px] xl:h-[350px] z-10">
            <Image
              src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-2.webp"
              alt="Hero promotional banner with details"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
              fill
              // quality={100}
              priority
            />
          </div>

          {/* details */}
          <div className="flex w-full items-start xl:items-center justify-center gap-2 flex-col lg:flex-row text-white flex-wrap">
            <h1 className="flex gap-1 items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black lg:text-[32px] text-xl">
              <span className="text-[18px] lg:text-[28px]">創業</span>
              <span className="text-[44px] lg:text-[100px]">25</span>
              <span className="mt-auto pb-2 text-[18px] lg:text-[28px]">
                年以上
              </span>
            </h1>
            <h2 className="flex gap-1 lg:gap-2 items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black lg:text-[32px] text-xl">
              <span className="flex items-center justify-center flex-col gap-1 lg:gap-2">
                <span>出張費</span>
                <span>査定費</span>
              </span>
              <span className="text-[46px] lg:text-[100px]">0</span>
              <span className="mt-auto pb-2">円</span>
            </h2>
            <h2 className="flex items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black text-3xl lg:text-[50px]">
              全国対応
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;