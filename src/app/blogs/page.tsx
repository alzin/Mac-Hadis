import { Metadata } from "next"

import Blogs from "@/components/pages/blogs"

import { baseUrl } from '@/utils/baseUrl';

export const metadata: Metadata = {
  title: "私たちのブログ ",
  description: "ツールや機械に関する情報が必要な場合は、ここでヒントをいくつか紹介します。また、購入した製品の分解と更新のプロセスについても説明します。",
  alternates: {
    canonical: `${baseUrl}/blogs`
  },
}

export default function BlogsPage() {
  return <Blogs />
}
