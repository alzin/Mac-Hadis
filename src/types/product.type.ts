import { TMaker } from "./maker.type";

export type TProduct = {
  id: number;
  title: string;
  category: string;
  subTitle: string;
  servicesTitle: string,
  servicesDescription: string;
  description: string;
  dismantling: TService
  transportation: TService
  whyChooseUs: TService
  kinds: string[];
  merit: string[];
  tips: string[];
  purchaseeProductTitle: string;
  cameraImagesGallery: TImage[]
  webImagesGallery: TImage[]
  makers: TMaker[]
}

export type TImage = {
  title: string,
  imageSrc: string
}

export type TService = {
  title: string;
  icon: string;
  content: string[];
}