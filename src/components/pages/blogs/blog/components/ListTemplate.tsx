import ShowMoreBtn from "@/components/common/components/ShowMoreBtn";
import Link from "next/link";
import React, { useState } from "react";

interface IListTemplate {
    content: ListContent
}
const ListTemplate: React.FC<IListTemplate> = ({ content }) => {
    const [show, setShow] = useState(false);

    const handleShowMore = () => {
        setShow(prev => !prev)
    }

    return (
        <div className="border-t pt-5">
            <h2 className="font-black text-[18px] lg:text-[25px] leading-[48px]">
                {content.title}
            </h2>

            {content.topDescription && content.topDescription?.split("\n").map((item, index) => (
                <p className="font-normal text-base leading-8  mb-5" key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}

            {content.subTitle && <h3 className="font-black text-[16px]">{content.subTitle}</h3>}
            <ul className={`space-y-6 my-10 ml-10 ${content.listType === "number" ? "list-decimal" : content.listType === "dot" ? "list-disc" : "list-none"}`}>
                {content.items.slice(0, show ? content.items.length + 1 : 5)?.map((item, index) => (
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
            {content.withPagination && <ShowMoreBtn handleShowMore={handleShowMore} />}
        </div>
    )
};

export default ListTemplate;
