import { useMemo, useState } from "react";
import { getAllCategories } from "@/services/category";

export const useFilterItems = () => {

  const categoriesData = getAllCategories()
  const [selectedCategory, setSelectedCategory] = useState<string>(categoriesData[0].id);

  const filteredItems = useMemo(() => {
    return categoriesData.find((item) => item.id === selectedCategory)!.items
  }, [selectedCategory, categoriesData]);

  return { selectedCategory, setSelectedCategory, filteredItems };
};
