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

// metadata
export async function generateMetadata({
  params,
}: IBlogPage): Promise<Metadata> {
  const { title } = await params;

  const data = await getBlogByTitle(title);

  if (!data) {
    return {
      title: "Blog Not Found",
    };
  } else {
    const metaTitle = data?.metaTitle ?? data?.title;
    const imageUrl = `${baseUrl}/blogs/${data.title}/og`;

    return {
      title: metaTitle,
      description: data?.metaDescription,
      // keywords: "",

      openGraph: {
        type: "article",
        url: `${baseUrl}/blogs/${data?.title}`,
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
        canonical: `${baseUrl}/blogs/${data?.title}`,
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
        image={`${baseUrl}/blogs/${data.title}/og`}
        datePublished={data.date}
        url={`${baseUrl}/blogs/${data.title}`}
      />
      <BreadcrumbSchema items={generateBreadcrumbs.blog(data.title)} />

      <BlogDetails data={data} />
    </>
  );
}
