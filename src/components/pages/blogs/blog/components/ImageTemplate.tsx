import Image from "next/image";
import React from "react";

interface IImageTemplate {
    content: ImageContent
    mainTitle: string
}
const ImageTemplate: React.FC<IImageTemplate> = ({ content, mainTitle }) => {
    return (
        <div className="pt-5">
            <div className=" relative w-full h-[250px] lg:w-[544px] lg:h-[307px] mx-auto mb-4">
                <Image
                    className="object-contain"
                    src={content.imageSrc}
                    alt={content.title || mainTitle}
                    fill
                    loading="lazy"
                />
            </div>
            {content.title.split("\n").map((paragraph, index) => (
                <p className="text-center" key={index}>
                    {paragraph}
                </p>
            ))}
        </div>
    )
};

export default ImageTemplate;
