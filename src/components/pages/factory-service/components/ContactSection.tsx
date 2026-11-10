import Image from "next/image";
import { Clock, MessageSquareQuote } from "lucide-react";

import { FACTORY_CTA_IDS, FACTORY_HERO_IMAGE, noBreak } from "../constants";
import { FactoryCtaButtons } from "./FactoryCtaButtons";

const WORRIES = [
  "工場を閉鎖することになったが、どうすればいいか分からない",
  "概算でいいので、費用を知りたい",
  "買取可能な設備があるか確認したい",
];

/** Closing contact section — bookends the hero (same photo, same buttons). */
export const ContactSection = () => {
  return (
    <section
      id="factory-contact"
      aria-labelledby="factory-contact-heading"
      className="relative isolate scroll-mt-16 overflow-hidden bg-[#0b2f3d] text-white lg:scroll-mt-20"
    >
      <Image
        src={FACTORY_HERO_IMAGE}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b2f3d]/95 via-factory-teal/90 to-[#0b2f3d]/95"
      />

      <div className="mx-auto max-w-5xl px-5 py-16 text-center lg:py-24">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-factory-yellow px-4 py-1.5 text-sm font-bold text-factory-teal md:text-base">
          <span className="h-2 w-2 rounded-full bg-factory-teal" aria-hidden />
          まずは無料相談から
        </p>

        <h2
          id="factory-contact-heading"
          className={`mb-5 text-3xl font-black leading-tight tracking-tight md:text-5xl ${noBreak}`}
        >
          お問い合わせ
        </h2>

        <p className={`mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg ${noBreak}`}>
          工場の整理・閉鎖は、多くの企業様にとって初めての経験です。
          <br className="hidden md:block" />
          ハディズは、お客様の立場に立って、最適な解決策をご提案いたします。
        </p>

        {/* Typical questions */}
        <ul className="mb-8 grid gap-3 text-left md:grid-cols-3 md:gap-4">
          {WORRIES.map((w) => (
            <li
              key={w}
              className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm md:p-5"
            >
              <MessageSquareQuote className="mt-0.5 h-6 w-6 shrink-0 text-factory-yellow" aria-hidden />
              {/* auto-phrase: break at Japanese phrase boundaries (Chrome/Edge; others fall back to normal) */}
              <p className="text-balance font-bold leading-relaxed [word-break:auto-phrase]">「{w}」</p>
            </li>
          ))}
        </ul>

        <p className={`mb-8 text-lg font-bold md:text-xl ${noBreak}`}>
          どんなご相談でも結構です。
          <br className="sm:hidden" />
          経験豊富なスタッフが丁寧にお答えいたします。
        </p>

        <FactoryCtaButtons
          id={FACTORY_CTA_IDS.contact}
          className="mx-auto max-w-md sm:max-w-none sm:justify-center"
        />

        <div className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-white/85 sm:flex-row sm:gap-6 md:text-base">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-factory-yellow" aria-hidden />
            営業時間：10:00〜18:00
          </span>
          <span className={noBreak}>弁護士様／事業主様／不動産会社様　お気軽にご相談ください</span>
        </div>
      </div>
    </section>
  );
};
