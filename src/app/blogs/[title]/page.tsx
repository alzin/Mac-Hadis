import { Metadata } from "next";
import { notFound } from "next/navigation";

// page
import BlogDetails from "@/components/pages/blogs/blog";

// services
import { getBlogByTitle } from "@/services/blogs";

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
    // The raw S3 image URL has two problems for social crawlers:
    //  1. It may contain non-ASCII / fragile fullwidth characters in the key.
    //  2. The originals are large progressive JPEGs that Facebook's scraper
    //     intermittently rejects as "corrupt or invalid format".
    // Route it through Next.js' image optimizer: this serves a small, resized,
    // re-encoded image from a clean ASCII mac-hadis.com URL that crawlers like.
    const rawImageUrl = encodeURI(data.imageSrc);
    const imageUrl = `${baseUrl}/_next/image?url=${encodeURIComponent(
      rawImageUrl
    )}&w=1200&q=75`;

    return {
      title: data?.title,
      description: data?.metaDescription,
      // keywords: "",

      openGraph: {
        type: "article",
        url: `${baseUrl}/blogs/${data?.title}`,
        title: data?.title,
        description: data?.metaDescription,
        siteName: "機械工具買取ハディズ",
        images: [
          { url: imageUrl, width: 1200, height: 630, alt: data?.title },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: data?.title,
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
    notFound();
  }

  return (
    <>
      {/* ✅ 追加: Structured Data */}
      <ArticleSchema
        title={data.title}
        description={data.metaDescription}
        image={encodeURI(data.imageSrc)}
        datePublished={data.date}
        url={`${baseUrl}/blogs/${data.title}`}
      />
      <BreadcrumbSchema items={generateBreadcrumbs.blog(data.title)} />

      <BlogDetails data={data} />
    </>
  );
}
