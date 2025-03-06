import React from "react";

interface ISimpleTemplate {
    content: SimpleContent
}
const SimpleTemplate: React.FC<ISimpleTemplate> = ({ content }) => {
    return (
        <div className="border-t pt-5">
            <h2 className="font-black text-[18px] lg:text-[25px] leading-[48px]">
                {content.title}
            </h2>
            {content.description?.split("\n").map((item, index) => (
                <p className="font-normal text-base leading-8 my-5" key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
        </div>
    )
};

export default SimpleTemplate;
