import Link from "next/link";
import React, { useState } from "react";

interface IListTemplate {
    content: ListContent
}

const ListTemplate: React.FC<IListTemplate> = ({ content }) => {
    const withPagination: boolean = !!content.withPagination

    const [show, setShow] = useState(!withPagination);

    const handleShowMore = () => {
        setShow(prev => !prev)
    }

    // Determine icon based on list type
    const getListIcon = (listType?: string) => {
        switch (listType) {
            case 'number': return '🔢';
            case 'dot': return '✅';
            default: return '📋';
        }
    };

    return (
        <section id={content.title} className="bg-white rounded-xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Section Header */}
            <div className="flex items-start mb-6 pb-6 border-b-2 border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
                    {getListIcon(content.listType)}
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 leading-tight">
                        {content.title}
                    </h2>
                    {content.subTitle && (
                        <h3 className="text-lg text-gray-600 font-semibold">{content.subTitle}</h3>
                    )}
                </div>
            </div>

            {/* Top Description */}
            {content.topDescription && (
                <div className="mb-8">
                    {content.topDescription.split("\n").map((paragraph, index) => (
                        <p className="text-gray-700 leading-relaxed mb-4 text-base lg:text-lg"
                            key={index}
                            dangerouslySetInnerHTML={{ __html: paragraph }} />
                    ))}
                </div>
            )}

            {/* List Items */}
            <div className="space-y-6 my-8">
                {content.items.slice(0, show ? content.items.length : 5)?.map((item, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-start">
                            {/* List Marker */}
                            {content.listType === "number" && (
                                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                                    {index + 1}
                                </div>
                            )}
                            {content.listType === "dot" && (
                                <span className="text-green-500 mr-3 text-2xl flex-shrink-0">✓</span>
                            )}

                            <div className="flex-1">
                                {item.title && (
                                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                                        {item.isLink ? (
                                            <Link className="text-blue-600 underline hover:no-underline hover:text-blue-700 transition-colors"
                                                href={item.href!}>
                                                {item.title}
                                            </Link>
                                        ) : (
                                            item.title
                                        )}
                                    </h3>
                                )}
                                {item.description && (
                                    <div className="text-gray-600 leading-relaxed text-base"
                                        dangerouslySetInnerHTML={{ __html: item.description }} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Description */}
            {content.bottomDescription && (
                <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                    <p className="text-gray-700 leading-relaxed text-base lg:text-lg"
                        dangerouslySetInnerHTML={{ __html: content.bottomDescription }} />
                </div>
            )}

            {/* Show More Button */}
            {content.withPagination && content.items.length > 5 && (
                <div className="mt-8 text-center">
                    <button
                        onClick={handleShowMore}
                        className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:translate-y-[-2px] transition-all duration-200"
                    >
                        {show ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}
        </section>
    );
};

export default ListTemplate;