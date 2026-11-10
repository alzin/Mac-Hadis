"use client";
import Image from "next/image";
import ContactBanner from "../../home/sections/ContactBanner";
import SubContent from "./sections/SubContent";
import ContactFixedBanner from "@/components/common/sections/ContactFixedBanner";
import CompanyProfile from "../../home/sections/CompanyProfile";
import companyProfileData from "@/content/home/CompanyProfile.json";
import { useState } from "react";
import Link from "next/link";

interface IBlogPage {
  data: BlogPost;
}

const COMPANY_PROFILE_FIELDS = [
  "会社名",
  "代表取締役",
  "本社所在地",
  "電話番号1",
  "電話番号2",
  "FAX番号",
  "メール",
  "古物商登録",
];

const companyProfileItems = companyProfileData.filter((item) =>
  COMPANY_PROFILE_FIELDS.includes(item.title),
);

const Index: React.FC<IBlogPage> = ({ data }) => {
  const date = data.date.split("/").join("-");

  const [isOpen, setIsOpen] = useState(false);

  const items = data.subContent.filter(
    (item) => item.title && item.type !== "image" && item.type !== "video",
  );

  if (items.length === 0) return null;

  return (
    <>
      <section className="pt-6 md:pt-16 w-full block px-4 md:px-28 lg:px-32">
        <div className="container mx-auto md:px-[40px] lg:px-[80px]">
          <div className="w-full space-y-6 md:space-y-8 mb-8 md:mb-12">
            <h1 className="text-center font-bold text-[20px] md:text-[30px] lg:text-[40px] leading-[150%]">
              {data.title}
            </h1>
            <div className="bg-[#FFF5F6] border-[#B8112226] border-opacity-15 border-[1px] rounded-lg py-2 px-4 w-fit mx-auto flex justify-center items-center gap-x-3 shadow-custom-light">
              <Image
                src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/blogs/icons/CalendarDays.svg"
                alt="calender icon"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
                sizes="20px"
              />
              <div className="text-[#D30101] font-semibold text-[14px] md:text-[16px] font-noto">
                {date}
              </div>
            </div>
          </div>
          <div className="w-full relative rounded-3xl overflow-hidden shadow-sm aspect-[361/203] md:aspect-[1040/584] bg-gray-100">
            <Image
              src={data.imageSrc}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1040px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
      <span className="h-[1px] bg-[#F1F1F1] w-[90%] mx-auto my-8 lg:my-[80px] block"></span>
      <div className="w-full lg:max-w-[90%] lg:mx-auto lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="block lg:hidden sticky top-16 w-full z-40">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full  p-5 flex items-center justify-between ${isOpen ? "rounded-lg bg-[#B81122] text-white" : "rounded-none bg-[#FFF5F6] text-[#111111]"} transition-all duration-300`}
          >
            <div className="flex items-center font-bold">
              <span className="mr-2 text-xl">
                <Image
                  src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/blogs/icons/assignment.svg"
                  alt="assignment"
                  width={20}
                  height={20}
                  className={
                    isOpen
                      ? "filter brightness-0 invert transition-all duration-300"
                      : ""
                  }
                />
              </span>
              <span className="font-bold text-[16px]">目次</span>
            </div>
            <span
              className={`transform transition-transform duration-200 text-gray-400 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <Image
                src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/blogs/icons/ChevronDown.svg"
                alt="arrow down"
                width={20}
                height={20}
                className={
                  isOpen
                    ? "filter brightness-0 invert transition duration-300"
                    : ""
                }
              />
            </span>
          </button>

          {isOpen && (
            <nav className="absolute left-1/2 transform -translate-x-1/2 w-[90%] bg-white border border-[#EAEAEA] rounded-[16px] shadow-[0px_4px_8px_0px_#0000000D] max-h-[60vh] mx-auto overflow-y-auto pr-1 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#B81122_#F3F3F3] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#F3F3F3] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#B81122] [&::-webkit-scrollbar-thumb:hover]:bg-[#8E0D1D]">
              <ul className="divide-y divide-[#F2F2F2]">
                {items.map((item, index) => (
                  <li key={`${item.title}-${index}`} className="relative group">
                    <div className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-[#B81122] opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100"></div>
                    <Link
                      href={`#${item.title}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between gap-3 p-5 font-noto font-normal text-[16px] leading-[20px] text-gray-600 transition-all duration-200 hover:font-bold hover:text-[#B81122] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B81122]/60 focus-visible:ring-offset-2 rounded-md"
                    >
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
                <li className="relative group">
                  <div className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-[#B81122] opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100"></div>
                  <Link
                    href="#company-profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between gap-3 p-5 font-noto font-normal text-[16px] leading-[20px] text-gray-600 transition-all duration-200 hover:font-bold hover:text-[#B81122] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B81122]/60 focus-visible:ring-offset-2 rounded-md"
                  >
                    <span>会社概要</span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>

        <div className="hidden lg:block lg:col-span-3 pb-12">
          <div className="bg-white border border-[#EAEAEA] rounded-[16px] shadow-[0px_4px_8px_0px_#0000000D] overflow-hidden sticky top-20">
            <div className="bg-[#FFF5F6] p-5 flex items-center gap-2">
              <Image
                src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/blogs/icons/assignment.svg"
                alt="assignment"
                width={20}
                height={20}
              />
              <span className="font-bold text-[16px] text-[#111111]">目次</span>
            </div>
            <nav className="max-h-[66vh] overflow-y-auto pr-1 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#B81122_#F3F3F3] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#F3F3F3] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#B81122] [&::-webkit-scrollbar-thumb:hover]:bg-[#8E0D1D]">
              <ul className="divide-y divide-[#F2F2F2]">
                {items.map((item, index) => (
                  <li key={`${item.title}-${index}`} className="relative group">
                    <div className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-[#B81122] opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100"></div>
                    <Link
                      href={`#${item.title}`}
                      className="flex items-center justify-between gap-3 p-5 font-noto font-normal text-[16px] leading-[20px] text-gray-600 transition-all duration-200 hover:font-bold hover:text-[#B81122] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B81122]/60 focus-visible:ring-offset-2"
                    >
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
                <li className="relative group">
                  <div className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-[#B81122] opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100"></div>
                  <Link
                    href="#company-profile"
                    className="flex items-center justify-between gap-3 p-5 font-noto font-normal text-[16px] leading-[20px] text-gray-600 transition-all duration-200 hover:font-bold hover:text-[#B81122] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B81122]/60 focus-visible:ring-offset-2"
                  >
                    <span>会社概要</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <main className="w-full lg:col-span-9 px-4 lg:px-0 pb-8 lg:pb-12 ">
          {data.description && (
            <section className="bg-[#FDFDFD] border border-gray-200 rounded-2xl p-5 lg:py-4 lg:px-8 mt-10 mb-8 lg:mt-0 lg:mb-12 relative overflow-hidden shadow-[0px_4px_8px_0px_#0000000D]">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B81122]"></div>

              <div className="prose prose-lg max-w-none">
                {data.description.split("\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-noto font-medium text-[14px] lg:text-[16px] leading-[200%] tracking-normal align-middle text-[#323232]"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="space-y-12">
            {(() => {
              let sectionCounter = 0;
              return data.subContent.map((item, index) => {
                // Image sections render without a number, so don't consume one
                const number =
                  item.title && item.type !== "image"
                    ? ++sectionCounter
                    : undefined;
                return (
                  <SubContent
                    key={index}
                    content={item}
                    mainTitle={data.title}
                    sectionNumber={number}
                  />
                );
              });
            })()}
          </div>
        </main>
      </div>
      <CompanyProfile items={companyProfileItems} />
      <ContactBanner />
      <ContactFixedBanner />
    </>
  );
};

export default Index;
