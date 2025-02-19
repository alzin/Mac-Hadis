import { useState } from "react";
import data from "@/content/home/purchasedItems.json";
export const useFilterItems = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    data.filter[0].title || ""
  );

  const filteredItems = selectedCategory
    ? data.items.filter((item) => item.category === selectedCategory)
    : data.items;

  return { selectedCategory, setSelectedCategory, filteredItems };
};
