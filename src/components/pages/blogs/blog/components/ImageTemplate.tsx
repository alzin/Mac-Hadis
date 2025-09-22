import Image from "next/image";
import React from "react";

interface IImageTemplate {
  content: ImageContent;
  mainTitle: string;
}

const ImageTemplate: React.FC<IImageTemplate> = ({ content, mainTitle }) => {
  return (
    <section id={content.title} className="bg-white rounded-xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden shadow-lg">
          <Image
            className="object-contain"
            src={content.imageSrc}
            alt={content.title || mainTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            loading="lazy"
          />
        </div>

        {content.title && (
          <div className="text-center space-y-2">
            {content.title.split("\n").map((paragraph, index) => (
              <p key={index} className="text-gray-600 text-sm lg:text-base italic">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageTemplate;