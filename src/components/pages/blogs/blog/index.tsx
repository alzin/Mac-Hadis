import Image from "next/image";
import Link from "next/link";
import ContactBanner from "../../home/sections/ContactBanner";
import SubContent from "./sections/SubContent";
import ContactFixedBanner from "@/components/common/sections/ContactFixedBanner";

interface IBlogPage {
  data: BlogPost;
}

const Index: React.FC<IBlogPage> = ({ data }) => {
  // Extract first sentence or first 200 characters for subtitle
  const getSubtitle = (description: string) => {
    const firstSentence = description.split("。")[0];
    return firstSentence.length > 200
      ? firstSentence.substring(0, 200) + "..."
      : firstSentence;
  };

  return (
    <>
      {/* Article Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 lg:py-16 text-center">
        <div className="container max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-4 leading-tight tracking-tight">
            {data.title}
          </h1>

          {/* Centered intro text for better readability */}
          <div className="max-w-3xl mx-auto">
            <p
              className="text-gray-600 text-base lg:text-lg font-normal mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: getSubtitle(data.description),
              }}
            />
          </div>

          <div className="inline-block bg-white text-gray-600 px-6 py-3 rounded-lg text-sm font-semibold shadow-md mb-8">
            📅 {data.date} 更新
          </div>

          {/* REVERTED: Back to original max-w-2xl and original heights */}
          <div className="relative w-full max-w-2xl h-64 md:h-80 lg:h-96 mx-auto rounded-xl overflow-hidden shadow-xl">
            <Image
              className="object-cover"
              src={data.imageSrc}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
        </div>
      </section>

      <ContactBanner />

      {/* Main Content Wrapper */}
      <div className="bg-white py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-4 lg:px-8">
          {/* UX IMPROVEMENT: Kept the Reading Column (max-w-4xl) for text legibility */}
          <div className="max-w-4xl mx-auto">
            {/* Table of Contents */}
            <div className="w-full mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  目次
                </h3>
                <nav>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                    {data.subContent
                      .filter(
                        (item) =>
                          item.title &&
                          item.type !== "image" &&
                          item.type !== "video",
                      )
                      .map((item, index) => (
                        <li key={index}>
                          <a
                            href={`#${item.title}`}
                            className="block text-sm text-gray-600 hover:text-red-600 py-2 pl-4 border-l-2 border-transparent hover:border-red-600 transition-all duration-200"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Quick Contact Card */}
            {/* <div className="w-full mb-12">
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl p-6 text-center">
                <h3 className="text-lg font-bold mb-4">
                  無料査定・相談受付中
                </h3>
                <p className="text-sm mb-6 opacity-90">
                  専門スタッフがお客様の状況に合わせて最適なソリューションをご提案
                </p>
                <Link href="/satei"
                  className="block sm:inline-block bg-white text-red-600 py-3 px-6 rounded-lg font-bold text-sm hover:shadow-lg transition-all duration-200">
                  今すぐ相談する
                </Link>
              </div>
            </div> */}

            {/* Main Content */}
            <main className="w-full">
              {/* Introduction Section */}
              {data.description && (
                <section className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 lg:p-12 mb-12 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 to-blue-500"></div>

                  <div className="prose prose-lg max-w-none">
                    {data.description.split("\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-700 leading-relaxed mb-6 text-base lg:text-lg"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Sub Content Sections */}
              <div className="space-y-12">
                {data.subContent.map((item, index) => (
                  <SubContent
                    key={index}
                    content={item}
                    mainTitle={data.title}
                  />
                ))}
              </div>
            </main>
          </div>
          {/* End of Reading Column */}

          {/* Call to Action Section - Kept slightly wider for visual break */}
          <div className="max-w-4xl mx-auto mt-16">
            <section className="bg-gradient-to-r from-red-600 to-red-700 text-white p-10 lg:p-16 rounded-2xl text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black opacity-10"></div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 flex items-center justify-center">
                  <span className="mr-3 text-3xl">🤝</span>
                  ハディズにお任せください
                </h3>

                <p className="text-base lg:text-lg leading-relaxed mb-8 opacity-95">
                  専門スタッフが丁寧に状況をお伺いし、無料査定・ご提案をさせていただきます。
                  不用な機械を「負債」ではなく「資産」に変えるお手伝いをいたします。
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/satei"
                    className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-base hover:translate-y-[-2px] hover:shadow-lg transition-all duration-200"
                  >
                    無料査定のご依頼
                  </Link>
                  <Link
                    href="/satei"
                    className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-base hover:bg-white hover:text-red-600 transition-all duration-200"
                  >
                    お問い合わせ
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-gray-500 text-sm">
            <Link href="/" className="hover:text-red-600 transition-colors">
              ホーム
            </Link>
            <span className="mx-2">›</span>
            <Link
              href="/blogs"
              className="hover:text-red-600 transition-colors"
            >
              ブログ
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">{data.title}</span>
          </div>
        </div>
      </div>

      <ContactBanner />
      <ContactFixedBanner />
    </>
  );
};

export default Index;
