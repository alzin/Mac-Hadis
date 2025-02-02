"use client"

import { useState } from "react";

// data
import blogsData from "@/content/blogs/blogs.json";

// components
import PostCard from "../home/components/PostCard";
import Pagination from "./components/Pagination";
import ContactBanner from "../home/sections/ContactBanner";



const Index = () => {
    const itemsPerPage = 15; // Number of posts per page
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calculate the range of blogs to display
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBlogs = blogsData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <section className="bg-[#f8f7f6]" id="blogs">
                <div className="pt-14 lg:pt-36 pb-20 mx-auto space-y-10 lg:space-y-12 px-4 max-w-[1200px]">
                    <h1 className="font-black text-3xl lg:text-6xl text-[#D51A16] text-center">ハディズのブログ</h1>
                    <div className="w-full flex items-center justify-center gap-8 flex-wrap">
                        {currentBlogs.map((item) => (
                            <PostCard
                                className="max-w-[352px]"
                                key={item.id}
                                title={item.title}
                                imageSrc={item.imageSrc}
                                description={item.description}
                            />
                        ))}
                    </div>
                    <Pagination
                        totalItems={blogsData.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>
            <ContactBanner />
        </>


    );
};

export default Index;
