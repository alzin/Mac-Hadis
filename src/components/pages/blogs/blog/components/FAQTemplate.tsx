import React from "react";

interface IFAQTemplate {
  content: FAQContent
}

const FAQTemplate: React.FC<IFAQTemplate> = ({ content }) => {
  return (
    <div className="border-t pt-5">
      <h2 className="font-black text-[18px] lg:text-[25px] leading-[48px]">
        {content.title}
      </h2>
      {content.items?.map((item, index) => (
        <div className="ml-5 pb-3" key={index}>
          <h3 className="font-black text-[16px] leading-[48px]">
            <span className="font-black">Q{item.id}:</span>
            {item.question}
          </h3>
          <p className="font-normal text-base leading-8">
            <span className="font-black">A{item.id}:</span>
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  )
};

export default FAQTemplate;
