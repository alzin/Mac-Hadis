import navbarLinksData from "@/content/home/navbarLinks.json";
import { isFactoryThemePath } from "@/utils/theme";

export interface INavItem {
  id: string;
  label: string;
  href: string;
}

// The factory-service page is its own landing page: its menu scrolls to its own
// sections instead of sending visitors to the home page's anchors.
const FACTORY_NAV_ITEMS: INavItem[] = [
  { id: "f1", label: "選ばれる理由", href: "#reasons" },
  { id: "f2", label: "サービス内容", href: "#services" },
  { id: "f3", label: "作業の流れ", href: "#process" },
  { id: "f4", label: "対応エリア", href: "#area" },
  { id: "f5", label: "よくあるご質問", href: "#faq" },
  { id: "f6", label: "機械・工具買取", href: "/" },
];

const FACTORY_NAV_BUTTONS: INavItem[] = [
  { id: "f1", label: "お問い合わせ", href: "#factory-contact" },
];

// On a blog page the company profile section is rendered inline, so its
// nav links should scroll to that section instead of navigating home.
export const resolveNavItems = (pathname: string): INavItem[] => {
  if (isFactoryThemePath(pathname)) return FACTORY_NAV_ITEMS;

  const isBlogPage = pathname.startsWith("/blogs/");
  return navbarLinksData.navbarItems.map((item) =>
    isBlogPage && item.href === "/#company-profile"
      ? { ...item, href: "#company-profile" }
      : item,
  );
};

/** Header / footer call-to-action buttons (お問い合わせ). */
export const resolveNavButtons = (pathname: string): INavItem[] =>
  isFactoryThemePath(pathname) ? FACTORY_NAV_BUTTONS : navbarLinksData.navbarBtns;
