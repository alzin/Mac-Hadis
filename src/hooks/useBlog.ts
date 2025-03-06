import { useState } from "react";

// services
import { getAllBlogs } from "@/services/blogs";

export const useBlog = () => {
  const postsPerPage = 15;
  const blogsData = getAllBlogs()
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the range of blogs to display
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentBlogs = blogsData.slice(startIndex, startIndex + postsPerPage);
  const numberOfBlogs = blogsData.length

  return { currentBlogs, postsPerPage, currentPage, handlePageChange, numberOfBlogs };
};
