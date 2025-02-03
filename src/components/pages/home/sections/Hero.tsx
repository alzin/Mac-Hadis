import Image from "next/image";

const Hero: React.FC = () => {
    return (
        <section aria-label="Hero section with business highlights" className="relative px-4 w-full h-[410px] lg:h-[640px] 2xl:h-[calc(100vh-64px)] bg-[url(/images/home-page/hero-background-mobile.png)] sm:bg-[url(/images/home-page/hero-background.png)] bg-cover bg-no-repeat bg-center sm:bg-right-top">

            <div className="flex lg:w-1/2 2xl:min-w-[1000px] items-start 2xl:items-center justify-center h-full 2xl:h-3/4 space-y-2 lg:space-y-7 flex-col pt-7 2xl:pt-20 sm:pl-12 pb-4">

                {/* image 1 */}
                <div className="relative xl:w-[810px] xl:h-[64px] w-[335px] h-[38px] sm:h-[50px]">
                    <Image src="/images/home-page/hero-1.png" sizes="355,38" alt="Company's legacy image" fill loading="lazy" />
                </div>

                {/* image 2 */}
                <div className="relative w-[340px] h-[88px] sm:h-[130px] xl:w-[1000px] xl:h-[250px]">
                    <Image src="/images/home-page/hero-2.png" alt="Hero promotional banner with details" fill priority />
                </div>

                {/* details */}
                <div className="flex w-full items-start xl:items-center justify-center gap-2 flex-col lg:flex-row text-white flex-wrap">
                    <h1 className="flex gap-1 items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black lg:text-[32px] text-xl">
                        <span className="text-[18px] lg:text-[28px]">創業</span>
                        <span className="text-[44px] lg:text-[100px]">25</span>
                        <span className="mt-auto pb-2 text-[18px] lg:text-[28px]">年以上</span>
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
    )
};

export default Hero;
