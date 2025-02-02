import { Metadata } from "next"

// page
import Blogs from "@/components/pages/blogs"

// baseUrl
import { baseUrl } from '@/utils/baseUrl';

// metadata
export const metadata: Metadata = {
  title: "私たちのブログ ",
  description: "ツールや機械に関する情報が必要な場合は、ここでヒントをいくつか紹介します。また、購入した製品の分解と更新のプロセスについても説明します。",
  keywords: "ブログ",
  alternates: {
    canonical: `${baseUrl}/blogs`
  },
}

export default function BlogsPage() {
  return <Blogs />
}
