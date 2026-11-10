// AI-generated (ChatGPT) scene: crane loading an NC lathe out of a cleared factory.
// Action sits on the right so the left side stays calm for the copy.
export const FACTORY_HERO_IMAGE = "/images/factory-service/hero.webp";

/**
 * Elements that already show the phone / LINE / mail buttons.
 * The sticky bottom bar stays hidden while any of them is on screen.
 */
export const FACTORY_CTA_IDS = {
  hero: "factory-hero-cta",
  contact: "factory-contact-cta",
} as const;

/** Keep Japanese phrases together on wide screens, allow breaking on phones. */
export const noBreak =
  "break-keep [overflow-wrap:normal] [word-break:keep-all] max-[640px]:break-words max-[640px]:[overflow-wrap:anywhere]";
