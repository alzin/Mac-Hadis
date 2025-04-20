import { TItem } from "./item.type";
import { TMaker } from "./maker.type";

export type TCategory = {
  id: string;
  title: string;
  items: TItem[];
  makers: TMaker[];
  purchaseItems: TPurchaseItem[];
};

export type TPurchaseItem = {
  title: string;
  imageSrc: string;
};
