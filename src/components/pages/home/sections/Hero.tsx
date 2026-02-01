import Image, { getImageProps } from "next/image";

const Hero: React.FC = () => {
  const common = {
    alt: "Background",
    fill: true,
    sizes: "100vw",
    quality: 85,
  };

  // Generate the srcSet for the Mobile Image (up to 1023px)
  const {
    props: { srcSet: mobileSrcSet, ...mobileRest },
  } = getImageProps({
    ...common,
    src: "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background-mobile.webp",
  });

  // Generate the srcSet for the Desktop Image (from 1024px)
  const {
    props: { srcSet: desktopSrcSet, src: desktopSrc, ...desktopRest },
  } = getImageProps({
    ...common,
    src: "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background.webp",
  });

  return (
    <section
      aria-label="Hero section with business highlights"
      className="relative px-4 w-full h-[410px] lg:h-[640px] 2xl:h-[calc(100vh-64px)] sm:bg-right-top overflow-hidden"
    >
      {/* Background wrapper - LCP Optimized */}
      <div className="absolute inset-0 -z-30">
        <picture>
          <source 
            media="(max-width: 1023px)" 
            srcSet={mobileSrcSet}
            type="image/webp"
          />
          <source 
            media="(min-width: 1024px)" 
            srcSet={desktopSrcSet}
            type="image/webp"
          />
          <img
            src={desktopSrc}
            alt="中古機械・電動工具買取のハディズ - 全国対応"
            // ✅ CRITICAL: These attributes optimize LCP
            fetchPriority="high"
            loading="eager"
            decoding="async"
            // ✅ Explicit dimensions prevent layout shift (CLS)
            width={1920}
            height={1080}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              objectFit: "cover",
              objectPosition: "right top",
            }}
          />
        </picture>
      </div>

      <div className="flex lg:w-1/2 2xl:min-w-[1000px] items-start 2xl:items-center justify-center h-full 2xl:h-3/4 space-y-2 lg:space-y-7 flex-col pt-7 2xl:pt-20 sm:pl-12 pb-4">
        {/* image 1 - "Founded 25 years" text image */}
        <div className="relative xl:w-[810px] xl:h-[64px] w-[335px] h-[38px] sm:h-[50px] lg:h-[70px] z-10">
          <Image
            src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-1.webp"
            alt="創業25年以上の実績"
            sizes="(max-width: 1279px) 335px, 810px"
            fill
            priority
            quality={85}
          />
        </div>
        
        {/* image 2 - "Expensive purchase" text image */}
        <div className="relative w-[340px] h-[88px] sm:h-[130px] lg:h-[300px] xl:w-[810px] xl:h-[350px] z-10">
          <Image
            src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-2.webp"
            alt="高価買取のご案内"
            sizes="(max-width: 1279px) 340px, 810px"
            fill
            priority
            quality={85}
          />
        </div>

        {/* HTML text - Excellent! Text is faster than images */}
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
  );
};

export default Hero;