import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface ContactBtnProps {
  children?: ReactNode;
  className?: string;
  label: string;
  href: string;
  mobileLabel?: string;
  variant: "red" | "blue" | "green";
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const ContactBtn: React.FC<ContactBtnProps> = ({
  children,
  className = "",
  variant,
  label,
  href,
  onClick,
  mobileLabel,
}) => {
  // Determine the gradient background class based on the variant
  const gradientBg = {
    red: "gradient-red",
    blue: "gradient-blue",
    green: "gradient-green",
  }[variant];

  // Define icon paths for each variant
  const iconPaths = {
    red: "/images/icons/phone_in_talk.svg",
    blue: "/images/icons/computer.svg",
    green: "/images/icons/line-green.svg",
  };

  return (
    <Link
      href={href}
      target={variant === "blue" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      aria-label={`Contact us via ${
        variant === "red"
          ? "phone"
          : variant === "blue"
          ? "online support"
          : "Line app"
      }`}
      className={`${gradientBg}  relative font-black rounded h-14 text-white flex items-center justify-center sm:w-fit px-3 sm:px-14 py-3 gap-1 lg:gap-3 ${className}`}
      onClick={onClick}
    >
      {children}
      <Image
        src={iconPaths[variant]}
        alt={`${variant} contact icon`}
        width={32}
        height={32}
        loading="lazy"
      />
      <span className="text-nowrap overflow-hidden hidden lg:block">
        {label}
      </span>
      <span className="text-nowrap overflow-hidden lg:hidden">
        {mobileLabel}
      </span>
      <Image
        src={`/images/icons/arrow-right-${variant}.svg`}
        alt={`Arrow pointing right, styled in ${variant}`}
        width={32}
        height={32}
        loading="lazy"
      />
    </Link>
  );
};

export default ContactBtn;
