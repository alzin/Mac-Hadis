"use client"

import React from "react";
import Image from "next/image";

interface IImageListTemplate {
    content: ImageListContent
}

const ImageListTemplate: React.FC<IImageListTemplate> = ({ content }) => {

    return (
        <section id={content.title} className="bg-white rounded-xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Add header if title exists */}
            {content.title && (
                <div className="flex items-start mb-6 pb-6 border-b-2 border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
                        🖼️
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                        {content.title}
                    </h2>
                </div>
            )}

            <div className="flex flex-wrap justify-between md:justify-center gap-4 lg:gap-6">
                {content.items?.map((item, index) => (
                    <div key={index} className="w-[100%] md:w-[47%]">
                        <div className="min-h-[240px] lg:min-h-[280px] bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#B81122] hover:shadow-lg transition-all duration-200">
                            <div className="w-full h-[200px] lg:h-[260px] flex justify-center items-center bg-gray-50 p-4">
                                <Image
                                    src={item.imageSrc}
                                    alt={item.alt}
                                    width={250}
                                    height={250}
                                    loading="eager"
                                    className="w-auto h-[200px] lg:w-auto lg:h-[250px] object-contain"
                                />
                            </div>
                            <div className="px-3 py-3 lg:px-4 lg:py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                                <p className="text-[#B81122] text-center font-semibold text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] line-clamp-2">
                                    {item.alt}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ImageListTemplate;