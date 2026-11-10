import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { FACTORY_CTA_IDS, FACTORY_HERO_IMAGE, noBreak } from "../constants";
import { FactoryCtaButtons } from "./FactoryCtaButtons";

export const HeroSection = () => {
  return (
    <section
      aria-label="工場整理・閉鎖支援サービス"
      className="relative isolate flex items-center overflow-hidden bg-factory-teal text-white lg:min-h-[calc(100vh-80px)]"
    >
      {/* Full-bleed background photo */}
      <Image
        src={FACTORY_HERO_IMAGE}
        alt="工場の機械設備を撤去・搬出するハディズの作業風景"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center] lg:object-center"
      />
      {/* Overlay: solid on mobile, dark-left → clear-right on desktop so the photo stays visible */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b2f3d]/90 via-factory-teal/75 to-[#0b2f3d]/95 lg:bg-gradient-to-r lg:from-[#0b2f3d]/95 lg:via-factory-teal/70 lg:to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-factory-yellow px-4 py-1.5 text-sm font-bold text-factory-teal md:text-base">
            <span className="h-2 w-2 rounded-full bg-factory-teal" aria-hidden />
            工場の閉鎖・移転・廃業をお考えの方へ
          </p>

          <h1
            className={`mb-5 text-[2.1rem] font-black leading-[1.2] tracking-tight drop-shadow-md sm:text-5xl lg:text-[3.6rem] xl:text-6xl ${noBreak}`}
          >
            工場整理・<wbr />
            閉鎖支援サービス
          </h1>

          <p
            className={`mb-6 text-xl font-bold leading-snug drop-shadow sm:text-2xl lg:text-[1.75rem] ${noBreak}`}
          >
            機械の<span className="text-factory-yellow">買取</span>から
            <span className="text-factory-yellow">撤去</span>・
            <span className="text-factory-yellow">清掃</span>まで、
            <br className="hidden sm:block" />
            まるごとワンストップでお任せ。
          </p>

          {/* Key differentiator */}
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-white/20 bg-[#0b2f3d]/50 p-4 backdrop-blur-sm md:p-5">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-factory-yellow" aria-hidden />
            <p className={`text-base leading-relaxed text-white/95 md:text-lg ${noBreak}`}>
              買取可能な設備は適正価格で買い取り、
              <strong className="font-bold text-factory-yellow">撤去・処分費用と相殺</strong>
              。お客様の負担を最小限に抑え、スムーズな工場整理を実現します。
            </p>
          </div>

          {/* CTAs — the sticky bottom bar is hidden while these are visible */}
          <FactoryCtaButtons id={FACTORY_CTA_IDS.hero} />

          <p className={`mt-5 text-sm text-white/90 drop-shadow md:text-base ${noBreak}`}>
            弁護士様／事業主様／不動産会社様　お気軽にご相談ください
          </p>
        </div>
      </div>
    </section>
  );
};
