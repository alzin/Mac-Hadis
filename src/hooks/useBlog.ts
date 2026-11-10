import { useEffect, useState } from "react";

import { getAllBlogs } from "@/services/blogs";

export const useBlog = () => {
  const mobilePostsPerPage = 6;
  const desktopPostsPerPage = 9;
  const blogsData = getAllBlogs();

  const sortedBlogs = [...blogsData].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(desktopPostsPerPage);

  useEffect(() => {
    // Keep pagination size synced with viewport width.
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const updatePostsPerPage = () => {
      setPostsPerPage(
        mediaQuery.matches ? desktopPostsPerPage : mobilePostsPerPage,
      );
    };

    updatePostsPerPage();

    mediaQuery.addEventListener("change", updatePostsPerPage);

    return () => {
      mediaQuery.removeEventListener("change", updatePostsPerPage);
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(sortedBlogs.length / postsPerPage),
    );

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, postsPerPage, sortedBlogs.length]);

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentBlogs = sortedBlogs.slice(startIndex, startIndex + postsPerPage);
  const numberOfBlogs = sortedBlogs.length;

  return {
    currentBlogs,
    postsPerPage,
    currentPage,
    handlePageChange,
    numberOfBlogs,
  };
};
