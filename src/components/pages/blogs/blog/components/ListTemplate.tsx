import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface IListTemplate {
  content: ListContent;
}

const ListTemplate: React.FC<IListTemplate> = ({ content }) => {
  const withPagination: boolean = !!content.withPagination;

  const [show, setShow] = useState(!withPagination);

  const handleShowMore = () => {
    setShow((prev) => !prev);
  };

  // Determine icon based on list type
  const getListIcon = (listType?: string) => {
    switch (listType) {
      case "number":
        return "🔢";
      case "dot":
        return "✅";
      default:
        return "📋";
    }
  };

  return (
    <section
      id={content.title}
      className="bg-white rounded-xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
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
            <h3 className="text-lg text-gray-600 font-semibold">
              {content.subTitle}
            </h3>
          )}
        </div>
      </div>

      {/* Top Description */}
      {content.topDescription && (
        <div className="mb-8">
          {content.topDescription.split("\n").map((paragraph, index) => (
            <p
              className="text-gray-700 leading-relaxed mb-4 text-base lg:text-lg"
              key={index}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      )}

      {/* List Items */}
      <div className="space-y-6 my-8">
        {content.items
          .slice(0, show ? content.items.length : 5)
          ?.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start">
                {/* List Marker */}
                {content.listType === "number" && (
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                )}
                {content.listType === "dot" && (
                  <span className="text-green-500 mr-3 text-2xl flex-shrink-0">
                    ✓
                  </span>
                )}

                <div className="flex-1">
                  {item.title && (
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {item.isLink ? (
                        <Link
                          className="text-blue-600 underline hover:no-underline hover:text-blue-700 transition-colors"
                          href={item.href!}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h3>
                  )}
                  {/* Optional Images - Multiple or Single (Item Specific) */}
                  {(item.imageSrc || item.images) && (
                    <div className="mb-8 w-full space-y-4">
                      {/* Handle imageSrc array or single string */}
                      {item.imageSrc && typeof item.imageSrc === "string" ? (
                        <div className="relative w-full">
                          <Image
                            src={item.imageSrc}
                            alt={item.title || "Section illustration"}
                            width={1200}
                            height={600}
                            className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-sm border border-gray-100"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                            loading="lazy"
                          />
                        </div>
                      ) : item.imageSrc && Array.isArray(item.imageSrc) ? (
                        item.imageSrc.map((src, imgIndex) => (
                          <div key={imgIndex} className="relative w-full">
                            <Image
                              src={src}
                              alt={`${
                                item.title || "Section illustration"
                              } - Image ${imgIndex + 1}`}
                              width={1200}
                              height={600}
                              className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-sm border border-gray-100"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                              loading="lazy"
                            />
                          </div>
                        ))
                      ) : null}
                      {/* Handle images array */}
                      {item.images &&
                        item.images.map((image, imgIndex) => (
                          <div key={imgIndex} className="relative w-full">
                            <Image
                              src={image.src}
                              alt={
                                image.alt ||
                                `${
                                  item.title || "Section illustration"
                                } - Image ${imgIndex + 1}`
                              }
                              width={1200}
                              height={600}
                              className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-sm border border-gray-100"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                              loading="lazy"
                            />
                          </div>
                        ))}
                    </div>
                  )}
                  {item.description && (
                    <div
                      className="text-gray-600 leading-relaxed text-base"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}

                  {item.subItems && item.subItems.length > 0 && (
                    <ul className="mt-4 space-y-3 ml-4 border-l-2 border-gray-100 pl-4">
                      {item.subItems.map((subItem) => (
                        <li
                          key={subItem.id}
                          className="flex items-start text-gray-700 text-sm lg:text-base"
                        >
                          <span className="text-red-500 mr-2 mt-1.5 flex-shrink-0 text-[10px]">
                            ●
                          </span>
                          <span
                            className={
                              subItem.isBold ? "font-bold text-gray-800" : ""
                            }
                            dangerouslySetInnerHTML={{ __html: subItem.text }}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* NEW: Section Gallery / Images (Below items, Above/Before Bottom Description) */}
      {content.sectionImages && content.sectionImages.length > 0 && (
        <div className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {content.sectionImages.map((img, idx) => {
              const src = typeof img === "string" ? img : img.src;
              const alt =
                typeof img === "string"
                  ? `${content.title} gallery image ${idx + 1}`
                  : img.alt || `${content.title} gallery image ${idx + 1}`;

              return (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full bg-gray-50">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {typeof img !== "string" && img.alt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm font-medium line-clamp-1">
                        {img.alt}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Description */}
      {content.bottomDescription && (
        <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <p
            className="text-gray-700 leading-relaxed text-base lg:text-lg"
            dangerouslySetInnerHTML={{ __html: content.bottomDescription }}
          />
        </div>
      )}

      {/* Show More Button */}
      {content.withPagination && content.items.length > 5 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleShowMore}
            className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg hover:translate-y-[-2px] transition-all duration-200"
          >
            {show ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ListTemplate;
