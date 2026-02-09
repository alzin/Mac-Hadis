import React from "react";

interface ISimpleTemplate {
    content: SimpleContent
}

const SimpleTemplate: React.FC<ISimpleTemplate> = ({ content }) => {
    return (
        <section id={content.title} className="bg-white rounded-xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start mb-6 pb-6 border-b-2 border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
                    
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                    {content.title}
                </h2>
            </div>

            <div className="prose prose-lg max-w-none">
                {content.description?.split("\n").map((paragraph, index) => (
                    <p className="text-gray-700 leading-relaxed mb-6 text-base lg:text-lg"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
            </div>
        </section>
    );
};

export default SimpleTemplate;