import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section
      aria-label="Hero section with business highlights"
      className="relative px-4 w-full h-[410px] lg:h-[640px] 2xl:h-[calc(100vh-64px)] overflow-hidden"
    >
      <div className="absolute inset-0 -z-30 lg:hidden">
        <Image
          src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background-mobile.webp"
          alt="中古機械・電動工具買取のハディズ - 全国対応"
          fill
          priority // This is the LCP element
          quality={85}
          sizes="100vw"
          fetchPriority="high"
          className="object-cover object-right-top"
        />
      </div>

      <div className="absolute inset-0 -z-30 hidden lg:block">
        <Image
          src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/home-page/hero-section/hero-background.webp"
          alt="中古機械・電動工具買取のハディズ - 全国対応"
          fill
          priority // This is the LCP element
          quality={85}
          sizes="100vw"
          fetchPriority="high"
          className="object-cover object-right-top"
        />
      </div>

      <div className="flex lg:w-1/2 2xl:min-w-[1000px] items-start 2xl:items-center justify-center h-full 2xl:h-3/4 space-y-2 lg:space-y-7 flex-col pt-7 2xl:pt-20 sm:pl-12 pb-4">
        {/* Headline - live SVG text recreating the former hero-1 / hero-2 images.
            The boxes keep the old image sizes and each SVG stretches to fill its
            box (preserveAspectRatio="none"), exactly as <Image fill> did, so the
            layout matches the old version at every breakpoint. Glyph positions,
            sizes, slants and colours were fitted against the original artwork.
            Outline layers are <use> clones, so the text exists once in the DOM. */}
        <h1 className="flex flex-col items-start 2xl:items-center min-h-0 space-y-2 lg:space-y-7">
          <span className="block relative xl:w-[810px] xl:h-[64px] w-[335px] h-[38px] sm:h-[50px] lg:h-[70px] z-10">
            <svg
              viewBox="0 0 810 64"
              role="img"
              aria-label="どんな特殊機械・道具・工具でも"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <use href="#hero-line-1" stroke="#fff" strokeWidth="7.375" strokeLinejoin="round" />
              <g id="hero-line-1" fill="#b61625">
                <text transform="matrix(1.009 0 -0.0898 0.944 0 0)" x="1.2" y="56.66" fontSize="60.2" fontWeight="811">ど</text>
                <text transform="matrix(1 0 0.0181 0.944 0 0)" x="48.6" y="55.91" fontSize="59.76" fontWeight="811">ん</text>
                <text transform="matrix(0.991 0 0.0364 0.944 0 0)" x="105.9" y="55.91" fontSize="61.59" fontWeight="811">な</text>
                <text transform="matrix(1 0 0.0015 0.95 0 0)" x="167.36" y="57.27" fontSize="58.47" fontWeight="798">特</text>
                <text transform="matrix(0.999 0 0.0121 0.95 0 0)" x="227.4" y="56.07" fontSize="60.12" fontWeight="798">殊</text>
                <text transform="matrix(1 0 0.0047 0.95 0 0)" x="287.6" y="56.07" fontSize="59.65" fontWeight="798">機</text>
                <text transform="matrix(1 0 -0.0015 0.95 0 0)" x="352.11" y="56.07" fontSize="59.78" fontWeight="798">械</text>
                <text transform="matrix(1 0 0 0.95 0 0)" x="394.9" y="57.27" fontSize="59.75" fontWeight="798">・</text>
                <text transform="matrix(1 0 -0.0152 0.95 0 0)" x="436.3" y="57.27" fontSize="59.95" fontWeight="798">道</text>
                <text transform="matrix(1 0 0.0029 0.95 0 0)" x="495.22" y="57.27" fontSize="59.37" fontWeight="798">具</text>
                <text transform="matrix(1 0 -0.0078 0.95 0 0)" x="538.8" y="57.27" fontSize="59.29" fontWeight="798">・</text>
                <text transform="matrix(1 0 -0.022 0.95 0 0)" x="580.54" y="57.27" fontSize="63.49" fontWeight="798">工</text>
                <text transform="matrix(1 0 0.0037 0.95 0 0)" x="641.17" y="57.27" fontSize="59.37" fontWeight="798">具</text>
                <text transform="matrix(1 0 -0.0957 0.944 0 0)" x="695.4" y="57.7" fontSize="62.38" fontWeight="811">で</text>
                <text transform="matrix(1 0 -0.0273 0.944 0 0)" x="752.92" y="56.66" fontSize="62.01" fontWeight="811">も</text>
              </g>
            </svg>
          </span>

          <span className="block relative w-[340px] h-[88px] sm:h-[130px] lg:h-[300px] xl:w-[810px] xl:h-[350px] z-10">
            <svg
              viewBox="0 0 905 254"
              role="img"
              aria-label="高額買取！"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                {/* Gold fill, defined in viewBox space; each glyph's gradientTransform undoes its own transform */}
                <linearGradient id="hero-gold" gradientUnits="userSpaceOnUse" x1="21.72" y1="71.04" x2="123.87" y2="405.16">
                  <stop offset="0" stopColor="#dfa554" />
                  <stop offset="0.19" stopColor="#e1a754" />
                  <stop offset="0.27" stopColor="#e3ae60" />
                  <stop offset="0.35" stopColor="#e9bc7f" />
                  <stop offset="0.44" stopColor="#eecda2" />
                  <stop offset="0.48" stopColor="#f2d7b8" />
                  <stop offset="0.52" stopColor="#fbf3ed" />
                  <stop offset="0.56" stopColor="#f6e8c9" />
                  <stop offset="0.6" stopColor="#eed79d" />
                  <stop offset="0.69" stopColor="#e7c667" />
                  <stop offset="0.73" stopColor="#e6c65a" />
                  <stop offset="0.81" stopColor="#eede75" />
                  <stop offset="0.85" stopColor="#f3e78a" />
                  <stop offset="1" stopColor="#ecca88" />
                </linearGradient>
                <linearGradient id="hero-gold-0" href="#hero-gold" gradientTransform="matrix(1.0471 0 0.2819 1.0834 0 0)" />
                <linearGradient id="hero-gold-1" href="#hero-gold" gradientTransform="matrix(1.0753 0 0.3005 1.0858 0 0)" />
                <linearGradient id="hero-gold-2" href="#hero-gold" gradientTransform="matrix(1.0661 0 0.2946 1.0858 0 0)" />
                <linearGradient id="hero-gold-3" href="#hero-gold" gradientTransform="matrix(1.0753 0 0.3054 1.0917 0 0)" />
                <linearGradient id="hero-gold-4" href="#hero-gold" gradientTransform="matrix(1.0526 0 0.529 1.0091 0 0)" />
              </defs>
              <use href="#hero-line-2" stroke="#fff" strokeWidth="45.87" strokeLinejoin="round" />
              <use href="#hero-line-2" stroke="#b4101e" strokeWidth="26.32" strokeLinejoin="round" />
              <g id="hero-line-2">
                <text transform="matrix(0.955 0 -0.2485 0.923 0 0)" x="84.95" y="203.73" fontSize="193.85" fontWeight="900" fill="url(#hero-gold-0)">高</text>
                <text transform="matrix(0.93 0 -0.2574 0.921 0 0)" x="281.46" y="207.31" fontSize="189.68" fontWeight="900" fill="url(#hero-gold-1)">額</text>
                <text transform="matrix(0.938 0 -0.2545 0.921 0 0)" x="461.16" y="204.66" fontSize="194.13" fontWeight="900" fill="url(#hero-gold-2)">買</text>
                <text transform="matrix(0.93 0 -0.2602 0.916 0 0)" x="651.17" y="205.72" fontSize="194.84" fontWeight="900" fill="url(#hero-gold-3)">取</text>
                <text transform="matrix(0.95 0 -0.498 0.991 0 0)" x="876.7" y="209.49" fontSize="205.11" fontWeight="900" fill="url(#hero-gold-4)">!</text>
              </g>
            </svg>
          </span>
        </h1>

        <ul className="flex w-full items-start xl:items-center justify-center gap-2 flex-col lg:flex-row text-white flex-wrap">
          <li className="flex gap-1 items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black lg:text-[32px] text-xl">
            <span className="text-[18px] lg:text-[28px]">創業</span>
            <span className="text-[44px] lg:text-[100px]">25</span>
            <span className="mt-auto pb-2 text-[18px] lg:text-[28px]">
              年以上
            </span>
          </li>
          <li className="flex gap-1 lg:gap-2 items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black lg:text-[32px] text-xl">
            <span className="flex items-center justify-center flex-col gap-1 lg:gap-2">
              <span>出張費</span>
              <span>査定費</span>
            </span>
            <span className="text-[46px] lg:text-[100px]">0</span>
            <span className="mt-auto pb-2">円</span>
          </li>
          <li className="flex items-center justify-center w-[165px] h-[66px] lg:w-[276px] lg:h-[102px] gradient-red rounded-lg font-black text-3xl lg:text-[50px]">
            全国対応
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
