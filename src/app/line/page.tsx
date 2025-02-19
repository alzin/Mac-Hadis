"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/components/Loading";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("https://line.me/R/ti/p/@kikaikaitori");
  }, []);

  return <Loading />;
};

export default Page;
