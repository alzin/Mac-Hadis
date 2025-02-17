import Image from "next/image";
import Link from "next/link";
import ContactBanner from "../../home/sections/ContactBanner";


interface IBlogPage {
    data: BlogPost
}


const Index: React.FC<IBlogPage> = ({ data }) => {
    return (
        <>
            <section className="bg-[#f8f7f6] text-[#111111]">
                <div className="max-w-[928px] space-y-4 mx-auto pt-4 lg:pt-10 px-4 pb-20">
                    <div className="text-[#999999] font-normal text-xs lg:text-sm">
                        <Link href={"/blogs"} className=" inline-block">
                            <span >ホーム</span>
                            <Image className="inline-block mx-2" src={"/images/icons/right-arrow.svg"} width={16} height={16} alt="right arrow icon" />
                        </Link>
                        <span>{data.title}</span>
                    </div>
                    <div className=" bg-white px-4 lg:px-24 py-[60px] space-y-9 lg:space-y-12">
                        <h1 className="font-black text-xl lg:text-[32px] leading-[48px]">{data.title}</h1>
                        <div className=" relative w-[335px] h-[173px] lg:w-[544px] lg:h-[307px] mx-auto" >
                            <Image className="object-cover" src={data.imageSrc} alt={data.title} fill />
                        </div>
                        {data.description.split("\n").map((item, index) =>
                            <p className="font-normal text-base leading-8" key={index}>{item}</p>
                        )}
                        {data.subContent.map(item => {
                            switch (item.type) {
                                case "simple":
                                    return (
                                        <div key={item.id} className="border-t pt-5">
                                            <h2 className="font-black text-[18px] lg:text-[25px] leading-[48px]">{item.title}</h2>
                                            {item.description?.split("\n").map((item, index) =>
                                                <p className="font-normal text-base leading-8 my-5" key={index}>{item}</p>
                                            )}
                                        </div>
                                    );
                                case "image":
                                    return (
                                        <div key={item.id} className="pt-5">
                                            <div className=" relative w-full h-[250px] lg:w-[544px] lg:h-[307px] mx-auto mb-4" >
                                                <Image className="object-contain" src={item.imageSrc} alt={item.title} fill />
                                            </div>
                                            {item.title.split("\n").map((paragraph, index) =>
                                                <p className="text-center" key={index}>{paragraph}</p>
                                            )}
                                        </div>
                                    );
                                case "numberedList":
                                    return (
                                        <div key={item.id} className="border-t pt-5">
                                            <h2 className="font-black text-[18px] lg:text-[25px] leading-[48px]">{item.title}</h2>
                                            {item.description && <p className="font-normal text-base leading-8 inline">{item?.description}</p>}
                                            {item.items?.map((item, index) =>
                                                <div className="ml-5" key={index}>
                                                    <h3 className="font-black text-base leading-[48px] inline">{item.title}:</h3>
                                                    <br />
                                                    <p className="font-normal text-base leading-8 inline" key={index}>{item.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                case "unNumberedList":
                                    return (
                                        <div key={item.id} className="border-t pt-5">
                                            <h2 className="font-black text-[18px] lg:text-[25px] leading-[48px]">{item.title}</h2>
                                            <p className="font-normal text-base leading-8  mb-5">{item.topDescription}</p>

                                            {item.items?.map((item, index) =>
                                                <div className="" key={index}>
                                                    <h3 className="font-black text-[16px] inline">{item}</h3>
                                                </div>
                                            )}
                                            <p className="font-normal text-base mt-5">{item.bottomDescription}</p>

                                        </div>
                                    );
                                case "faq":
                                    return (
                                        <div key={item.id} className="border-t pt-5">
                                            <h2 className="font-black text-[18px] lg:text-[25px] leading-[48px]">{item.title}</h2>
                                            {item.items?.map((item, index) =>
                                                <div className="ml-5 pb-3" key={index}>
                                                    <h3 className="font-black text-[16px] leading-[48px]"><span className="font-black">Q{item.id}:</span>{item.question}:</h3>
                                                    <p className="font-normal text-base leading-8" key={index}> <span className="font-black">A{item.id}:</span>{item.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                default:
                                    return null; // Handle unknown types safely
                            }
                        })}

                    </div>
                </div>
            </section>
            <ContactBanner />
        </>

    )
};

export default Index;
