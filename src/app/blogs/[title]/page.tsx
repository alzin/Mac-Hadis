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
    // Serve the social-share image through our own /og route. The raw S3
    // covers carry an embedded ICC color profile, which Facebook's scraper
    // rejects as "corrupt or invalid format". The /og route strips the ICC
    // profile and returns a clean, resized 1200x630 JPEG.
    const imageUrl = `${baseUrl}/blogs/${data.title}/og`;

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
