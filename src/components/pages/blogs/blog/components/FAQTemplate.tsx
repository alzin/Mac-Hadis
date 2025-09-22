import React from "react";

interface IFAQTemplate {
  content: FAQContent
}

const FAQTemplate: React.FC<IFAQTemplate> = ({ content }) => {
  return (
    <section id={content.title} className="bg-white rounded-xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Section Header */}
      <div className="flex items-start mb-6 pb-6 border-b-2 border-gray-100">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
          💡
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

      {/* Description */}
      {content.description && (
        <p className="text-gray-700 leading-relaxed mb-8 text-base lg:text-lg">
          {content.description}
        </p>
      )}

      {/* FAQ Items */}
      <div className="space-y-6">
        {content.items?.map((item, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
            {/* Question */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-white">
              <h3 className="flex items-start font-bold text-lg text-gray-800">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  Q{item.id}
                </span>
                <span className="pt-1">{item.question}</span>
              </h3>
            </div>

            {/* Answer */}
            <div className="p-6 bg-white">
              <div className="flex items-start">
                <span className="bg-gradient-to-br from-green-500 to-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  A{item.id}
                </span>
                <p className="text-gray-700 leading-relaxed text-base pt-1"
                  dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQTemplate;