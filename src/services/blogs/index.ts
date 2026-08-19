// data
import blogs from "@/content/blogs/blogs"

// The JSON modules infer `subContent[].type` as a plain string, and `oldTitles`
// only exists on posts that have been renamed — widen once here instead of
// casting at every lookup.
const allBlogs = blogs as unknown as BlogPost[];

const toBlogPost = (data: BlogPost): BlogPost => ({
    ...data,
    subContent: data.subContent.map((sub) => ({
        ...sub,
        type: sub.type as SubContentType, // Explicitly cast type
    })),
} as BlogPost);

export const getBlogByTitle = async (title: string): Promise<BlogPost | undefined> => {

    const data = allBlogs.find((item) => item.title === decodeURI(title));

    if (!data) return undefined; // Ensure undefined is returned if not found

    return toBlogPost(data);
};

/**
 * Resolve a post from a title it no longer uses.
 *
 * Blog URLs are the raw Japanese title, so renaming a post changes its URL and
 * every already-indexed or already-shared link starts 404ing until Google
 * re-crawls. Renamed posts keep their previous titles in `oldTitles`, and the
 * route redirects those URLs (308) to the current one so ranking and traffic
 * carry over instead of being lost.
 *
 * Live titles are matched first by `getBlogByTitle`, so an `oldTitles` entry can
 * never shadow a current post.
 */
export const getBlogByOldTitle = async (title: string): Promise<BlogPost | undefined> => {

    const decoded = decodeURI(title);

    const data = allBlogs.find((item) => item.oldTitles?.includes(decoded));

    if (!data) return undefined;

    return toBlogPost(data);
};

export const getAllBlogs = () => {
    return blogs
}
