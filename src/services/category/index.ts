// data
import categories from "@/content/categories/categories";

export const getCategoryByTitle = (title: string): CategoryType | undefined => {
    return categories.find((item) => item.title === decodeURI(title));
};

export const getCategoryById = (id: string): CategoryType | undefined => {
    return categories.find((item) => item.id === id);
};

export const getAllCategories = () => {
    return categories
}