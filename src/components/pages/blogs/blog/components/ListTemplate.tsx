import Link from "next/link";
import React from "react";

interface IListTemplate {
    content: ListContent
}
const ListTemplate: React.FC<IListTemplate> = ({ content }) => {
    return (
        <div className="border-t pt-5">
            <h2 className="font-black text-[18px] lg:text-[25px] leading-[48px]">
                {content.title}
            </h2>

            {content.topDescription && <p className="font-normal text-base leading-8  mb-5">
                {content.topDescription}
            </p>}
            {content.subTitle && <h3 className="font-black text-[18px]">{content.subTitle}</h3>}
            <ul className={`space-y-6 my-10 ml-10 ${content.listType === "number" ? "list-decimal" : content.listType === "dot" ? "list-disc" : "list-none"}`}>
                {content.items?.map((item, index) => (
                    <li key={index}>
                        {item.title && <h3 className="font-black text-[16px] inline">
                            {item.isLink ?
                                <Link className="text-blue-500 underline hover:no-underline" href={item.href!}>{item.title}</Link> :
                                item.title
                            }
                        </h3>}
                        {item.description && <p className="font-normal text-base mt-5 leading-8" dangerouslySetInnerHTML={{ __html: item.description }} />}
                    </li>
                ))}
            </ul>
            {content.bottomDescription && <p className="font-normal text-base mt-5 leading-8" dangerouslySetInnerHTML={{ __html: content.bottomDescription }} />}
        </div>
    )
};

export default ListTemplate;
