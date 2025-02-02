import type { Metadata } from "next";

// page
import NotFoundPage from "@/components/pages/404"

// metadata
export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Sorry, the page you are looking for could not be found. Visit our homepage for more information."
};

export default function NotFound() {
  return <NotFoundPage />
}
