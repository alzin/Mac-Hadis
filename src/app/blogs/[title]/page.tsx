import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

// page
import BlogDetails from "@/components/pages/blogs/blog";

// services
import { getBlogByOldTitle, getBlogByTitle } from "@/services/blogs";

// baseUrl
import { baseUrl } from "@/utils/baseUrl";

import { ArticleSchema, BreadcrumbSchema, generateBreadcrumbs } from '@/components/seo/schemas';


interface IBlogPage {
  params: Promise<{
    title: string;
  }>;
}

/**
 * The one canonical URL form for a blog post.
 *
 * Blog slugs are raw Japanese titles, so the same post can be requested in
 * several shapes — decoded CJK, percent-encoded, with tracking params, with a
 * trailing slash. Every blog surface must emit the *same* string or Google
 * treats them as separate URLs and splits the ranking between them.
 *
 * The chosen form is `https://mac-hadis.com/blogs/{encodeURIComponent(title)}`,
 * no trailing slash — matching sitemap.ts, the rename redirect below, and
 * `trailingSlash: false`. Interpolating the raw title also happens to render
 * encoded (Next runs it through `new URL()`), but the two disagree on ASCII
 * `& = + , ( ) ' ! ~ *`, so encode here rather than relying on the URL parser.
 */
const getBlogUrl = (title: string): string =>
  `${baseUrl}/blogs/${encodeURIComponent(title)}`;

// metadata
export async function generateMetadata({
  params,
}: IBlogPage): Promise<Metadata> {
  const { title } = await params;

  const data = await getBlogByTitle(title);

  if (!data) {
    // The root layout sets `alternates.canonical: "./"`, which every page
    // inherits as a self-referencing canonical. A slug that resolves to no post
    // must not claim to be canonical, so opt out explicitly.
    return {
      title: "Blog Not Found",
      alternates: { canonical: null },
    };
  } else {
    const metaTitle = data?.metaTitle ?? data?.title;
    const blogUrl = getBlogUrl(data.title);
    const imageUrl = `${blogUrl}/og`;

    return {
      title: metaTitle,
      description: data?.metaDescription,
      // keywords: "",

      openGraph: {
        type: "article",
        url: blogUrl,
        title: metaTitle,
        description: data?.metaDescription,
        siteName: "機械工具買取ハディズ",
        images: [
          { url: imageUrl, width: 1200, height: 630, alt: data?.title },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: data?.metaDescription,
        images: imageUrl,
      },

      alternates: {
        canonical: blogUrl,
      },
    };
  }
}

export default async function BlogDetailsPage({ params }: IBlogPage) {
  const { title } = await params;

  const data: BlogPost | undefined = await getBlogByTitle(title);

  if (!data) {
    // The URL may be a title this post used to have — send it (308) to the
    // current URL so indexed links and shared links keep working after a rename.
    const renamed = await getBlogByOldTitle(title);

    if (renamed) {
      // Relative on purpose: an absolute URL here would send staging/local
      // traffic to the production origin. Same path shape as getBlogUrl().
      permanentRedirect(`/blogs/${encodeURIComponent(renamed.title)}`);
    }

    notFound();
  }

  return (
    <>
      {/* ✅ 追加: Structured Data */}
      <ArticleSchema
        title={data.title}
        description={data.metaDescription}
        image={`${getBlogUrl(data.title)}/og`}
        datePublished={data.date}
        url={getBlogUrl(data.title)}
      />
      <BreadcrumbSchema items={generateBreadcrumbs.blog(data.title)} />

      <BlogDetails data={data} />
    </>
  );
}
