import { Mail, MessageCircle, Phone } from "lucide-react";

import ContactDetails from "@/content/home/ContactDetails.json";

// LINE / mail sizing. In the sticky bar on phones the label sits under the icon,
// leaving the row's width to the phone number.
const SIDE_LG = "gap-2 px-3 py-3.5 text-base sm:px-5 sm:text-lg";
const SIDE_SM =
  "flex-col gap-0.5 px-3 py-1.5 text-[11px] sm:flex-row sm:gap-2 sm:px-5 sm:py-2.5 sm:text-base";

/**
 * Phone / LINE / mail buttons in the factory-service style.
 * One source of truth for the hero, the final contact section and the sticky bar.
 *
 * - "lg": hero + contact section (phone gets its own row on mobile)
 * - "sm": sticky bottom bar (one compact row at every width)
 */
export const FactoryCtaButtons = ({
  size = "lg",
  id,
  className = "",
}: {
  size?: "lg" | "sm";
  id?: string;
  className?: string;
}) => {
  const lg = size === "lg";

  return (
    <div
      id={id}
      className={
        lg
          ? `grid grid-cols-2 gap-3 sm:flex sm:flex-wrap ${className}`
          : `grid grid-cols-[1fr_auto_auto] gap-2 sm:flex sm:justify-center sm:gap-3 ${className}`
      }
    >
      <a
        href={ContactDetails.phoneNumber.href}
        aria-label={`電話で相談する ${ContactDetails.phoneNumber.label}`}
        className={`inline-flex items-center justify-center rounded-xl bg-factory-yellow text-factory-teal shadow-lg transition hover:-translate-y-0.5 hover:brightness-105 ${
          lg ? "col-span-2 gap-3 px-6 py-3.5" : "gap-2 px-3 py-2.5 sm:px-6"
        }`}
      >
        <Phone className={lg ? "h-7 w-7 shrink-0" : "h-5 w-5 shrink-0 sm:h-6 sm:w-6"} aria-hidden />
        <span className="flex flex-col items-start leading-tight">
          <span className={lg ? "text-xs font-bold" : "hidden text-[11px] font-bold sm:block"}>
            通話無料・まずはご相談
          </span>
          <span
            className={`whitespace-nowrap font-black tracking-wide ${lg ? "text-2xl" : "text-lg sm:text-xl"}`}
          >
            {ContactDetails.phoneNumber.label}
          </span>
        </span>
      </a>

      <a
        href={ContactDetails.line.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[#06C755] font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-105 ${
          lg ? SIDE_LG : SIDE_SM
        }`}
      >
        <MessageCircle className={lg ? "h-6 w-6 shrink-0" : "h-5 w-5 shrink-0"} aria-hidden />
        {lg ? (
          "LINEで相談"
        ) : (
          <span>
            LINE<span className="hidden sm:inline">で相談</span>
          </span>
        )}
      </a>

      <a
        href={ContactDetails.support.href}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border-2 border-white bg-white/5 font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-factory-teal ${
          lg ? SIDE_LG : SIDE_SM
        }`}
      >
        <Mail className={lg ? "h-6 w-6 shrink-0" : "h-5 w-5 shrink-0"} aria-hidden />
        {lg ? (
          "メールで相談"
        ) : (
          <span>
            メール<span className="hidden sm:inline">で相談</span>
          </span>
        )}
      </a>
    </div>
  );
};
