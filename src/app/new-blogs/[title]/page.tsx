// src/app/new-blogs/[title]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Import from the NEW folder
import BlogDetailsNew from "@/components/pages/blogs/blog";

// services (Keep using existing services)
import { getBlogByTitle } from "@/services/blogs";
import { baseUrl } from "@/utils/baseUrl";

interface IBlogPage {
  params: Promise<{ title: string }>;
}

export default async function NewBlogDetailsPage({ params }: IBlogPage) {
  const { title } = await params;
  const data = await getBlogByTitle(title);

  if (!data) {
    notFound();
  }

  return <BlogDetailsNew data={data} />;
}
