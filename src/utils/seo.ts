import { baseUrl } from "./baseUrl";

export const defaultSeoImage = "https://mac-hadis.s3.ap-northeast-1.amazonaws.com/main-ogp.jpg";

// Call with the title from the content record, never an encoded route parameter.
export const productUrl = (categoryId: string, title: string) =>
  `${baseUrl}/products/${categoryId}/${encodeURIComponent(title)}`;

export const normalizeCategoryName = (name: string) => name.replace(/\n/g, "").trim();

export const buybackTitle = (name: string) => {
  const cleanName = normalizeCategoryName(name) || "機械";
  if (cleanName === "その他の買取対応") return "その他の機械・工具の買取";
  return cleanName.includes("買取") ? cleanName : `${cleanName}の買取`;
};

const defaultAppraisalSubtitle = "中古機械・工具の査定はハディズへ";

// Some product records carry a stray space after "・" (e.g. "望遠鏡・顕微鏡・ 測定機器").
export const appraisalSubtitle = (category?: string) => {
  const cleanName = category?.replace(/\s+/g, "") ?? "";
  if (!cleanName || cleanName === "その他の買取対応") return defaultAppraisalSubtitle;
  return `${cleanName}の査定はハディズへ`;
};
