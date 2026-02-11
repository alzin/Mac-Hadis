// src/app/new-blogs/page.tsx
import { Metadata } from "next"
import BlogsListNew from "@/components/pages/blogs-new" // Import from the NEW folder
import { baseUrl } from '@/utils/baseUrl';

export const metadata: Metadata = {
  title: "PREVIEW - New Blog Design",
  robots: "noindex, nofollow", // Important: Prevent Google from indexing this test page
}

export default function NewBlogsPage() {
  return <BlogsListNew />
}