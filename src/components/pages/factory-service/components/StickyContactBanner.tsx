import { useEffect, useState } from "react";

import { FACTORY_CTA_IDS } from "../constants";
import { FactoryCtaButtons } from "./FactoryCtaButtons";

/**
 * Factory-service version of the fixed bottom contact bar, in the hero's style.
 * Hidden while the hero or contact-section buttons are on screen (no duplicate CTAs),
 * shown everywhere else on the page.
 */
export const StickyContactBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = Object.values(FACTORY_CTA_IDS)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) {
      setShow(true);
      return;
    }

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setShow(visible.size === 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="お問い合わせ"
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-gradient-to-r from-[#0b2f3d] via-factory-teal to-[#0b2f3d] px-3 py-2.5 shadow-[0_-6px_20px_rgba(11,47,61,0.35)] transition-all duration-300 sm:py-3 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-4">
        <p className="hidden shrink-0 text-sm font-bold leading-tight text-white lg:block">
          工場整理の
          <br />
          <span className="text-factory-yellow">無料相談・お見積り</span>
        </p>
        <FactoryCtaButtons size="sm" className="w-full lg:w-auto" />
      </div>
    </aside>
  );
};
