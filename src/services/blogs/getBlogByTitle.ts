// data
import blogs from "@/content/blogs/blogs.json"

export const getBlogByTitle = async (title: string): Promise<BlogPost | undefined> => {
    const data = blogs.find((item) => item.title === decodeURI(title));

    if (!data) return undefined; // Ensure undefined is returned if not found

    return {
        ...data,
        subContent: data.subContent.map((sub) => ({
            ...sub,
            type: sub.type as SubContentType, // Explicitly cast type
        })),
    } as BlogPost;
};