"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, memo, useCallback } from "react";
import { CircleArrowRight, Menu, X } from "lucide-react";
import { resolveNavButtons, resolveNavItems, type INavItem } from "@/utils/navItems";
import { isFactoryThemePath } from "@/utils/theme";

import ContactDetails from "@/content/home/ContactDetails.json";

import ContactBtn from "@/components/pages/home/components/ContactBtn";

const DesktopNav = memo(function DesktopNav({
  navItems,
  navButtons,
  factoryTheme,
}: {
  navItems: INavItem[];
  navButtons: INavItem[];
  factoryTheme: boolean;
}) {
  return (
    <nav
      className="hidden lg:flex items-center justify-end h-full w-full gap-8"
      aria-label="Main navigation"
    >
      <ul
        className={`flex items-center justify-center gap-8 font-bold text-base ${
          factoryTheme ? "text-factory-teal" : "text-[#B81122]"
        }`}
      >
        {navItems?.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              title={`Maps to ${item.label}`}
              className={`whitespace-nowrap transition ${
                factoryTheme
                  ? "underline-offset-8 decoration-factory-yellow decoration-[3px] hover:underline"
                  : "hover:opacity-80"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-2">
        {navButtons.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            title={`Maps to ${item.label}`}
            className={`font-black text-white text-base flex items-center justify-center gap-2 py-3 px-8 rounded transition-colors ${
              factoryTheme
                ? "bg-factory-teal hover:bg-[#0b2f3d]"
                : "bg-[#B81122] hover:bg-[#a00f1e]"
            }`}
          >
            <span className="whitespace-nowrap">{item.label}</span>
            {factoryTheme ? (
              <CircleArrowRight size={20} className="text-factory-yellow" aria-hidden />
            ) : (
              <Image
                src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/icons/arrow-right-red.svg"
                alt="arrow right hadis"
                width={20}
                height={20}
                sizes="20px"
                loading="lazy"
              />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
});

const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const pathname = usePathname();
  const navItems = resolveNavItems(pathname);
  const navButtons = resolveNavButtons(pathname);
  const factoryTheme = isFactoryThemePath(pathname);

  const toggleMenu = useCallback(() => {
    setActiveMenu((prev) => !prev);
  }, []);

  return (
    <header
      className={`bg-white w-full h-16 lg:h-20 sticky top-0 z-50 ${
        factoryTheme ? "border-b-[3px] border-factory-teal" : ""
      }`}
      aria-label="Website Header"
    >
      <div className="px-4 lg:px-7 flex overflow-y-auto items-center justify-between lg:justify-start gap-8 h-full relative">
        {/* Logo - Critical for LCP, keep priority */}
        <Link
          href="/"
          className="w-[70px] h-[45px] lg:w-[101px] lg:h-[64px] relative block"
        >
          <Image
            src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/hadis-logo.png"
            alt="Hadis Company Logo"
            fill
            priority
            sizes="(max-width: 1024px) 70px, 101px"
            className="object-contain"
          />
        </Link>

        <DesktopNav navItems={navItems} navButtons={navButtons} factoryTheme={factoryTheme} />

        <button
          className={`burger lg:hidden cursor-pointer flex items-center justify-center p-2 ${
            factoryTheme ? "text-factory-teal" : "text-[#B81122]"
          }`}
          onClick={toggleMenu}
          aria-label={activeMenu ? "Close menu" : "Open menu"}
          aria-expanded={activeMenu}
          type="button"
        >
          {activeMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`bg-white w-full space-y-10 h-[100vh] fixed overflow-y-auto top-16 left-0 z-50 py-7 px-5 lg:hidden transition-transform duration-300 ${
            activeMenu ? "translate-x-0" : "translate-x-[-100%]"
          }`}
          aria-hidden={!activeMenu}
        >
          <ul className="flex items-start flex-col justify-center gap-10 font-bold text-sm text-[#111111]">
            {navItems?.map((item) => (
              <li key={item.id} onClick={toggleMenu}>
                <Link
                  href={item.href}
                  title={`Maps to ${item.label}`}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-start justify-center w-full gap-4">
            <ContactBtn
              mobileLabel={ContactDetails.phoneNumber.label}
              label={ContactDetails.phoneNumber.label}
              href={ContactDetails.phoneNumber.href}
              variant={factoryTheme ? "sky" : "red"}
              className="w-full sm:w-full text-3xl"
              onClick={toggleMenu}
            />
            <ContactBtn
              mobileLabel={ContactDetails.support.label}
              label={ContactDetails.support.label}
              href={ContactDetails.support.href}
              variant="blue"
              className="w-full sm:w-full text-xl"
              onClick={toggleMenu}
            />
            <ContactBtn
              mobileLabel={ContactDetails.line.label}
              label={ContactDetails.line.label}
              href={ContactDetails.line.href}
              variant="green"
              className="w-full sm:w-full text-xl"
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
