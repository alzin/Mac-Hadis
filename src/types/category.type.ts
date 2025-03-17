import { TProduct } from "./product.type";

export type TCategory = {
  id: number;
  title: string;
  items: TProduct[];
  makers: TMaker[];
  purchaseItems: TPurchaseItem[];
};

export type TMaker = {
  jp: string;
  en: string;
  link: string;
  imageSrc: string;
};

export type TPurchaseItem = {
  title: string;
  imageSrc: string;
};
