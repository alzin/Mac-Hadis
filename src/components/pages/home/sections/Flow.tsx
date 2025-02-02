import Image from "next/image";
import FlowCard from "../components/FlowCard";


const Flow: React.FC = () => {
    return (
        <section className=" relative w-full py-[50px] lg:py-20 text-center px-4">
            <Image className=" absolute -z-10 top-0 left-0 object-cover" fill src={"/images/home-page/flow-bg.png"} alt="Background image for flow section" />

            <h3 className="font-black text-xl lg:text-2xl">お持ちの工具・機械で</h3>
            <h2 className=" mx-auto font-black text-[32px] lg:text-6xl text-[#D51A16] pt-8">
                <span className="relative">
                    こんなお悩み
                    <span className="w-full h-[18px] lg:h-[29px] bg-[#FF6877] absolute bottom-0 left-0 -z-10 opacity-40"></span>
                </span>
                <span className="block sm:inline">ありませんか？</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 mt-12">
                <FlowCard imageSrc="/images/home-page/mask1.png" title="しばらく使っていなくて動くかわからない" />
                <FlowCard imageSrc="/images/home-page/mask2.png" title="大型重量物で自分で動かすことができない" />
                <FlowCard imageSrc="/images/home-page/mask3.png" title="期日までに現金化したい" />
            </div>

            <div className="mt-10 flex items-center justify-center gap-4 flex-col">
                <span className="h-0 w-0 border-x-[13px] border-b-[20px] md:border-x-[20px] md:border-b-[30px] border-x-transparent  rotate-180 border-b-[#B81122]"></span>
                <div className="relative w-[335px] h-[41px] md:w-[670px] md:h-[76px]">
                    <Image src={"/images/home-page/flow-title.png"} alt="hadis image" sizes="670,76" fill loading="lazy" />
                </div>
            </div>

            <p className="max-w-[736px] text-base leading-8 md:text-xl font-normal mt-4 mx-auto md:leading-10"> ハディズでは、DIY用の工具・電動工具をはじめ、工場で使用する大型機械など、
                幅広く査定・買取を承っております。他店に負けない正当な価格での
                査定に自信があります。まずはお気軽に査定をご依頼ください。</p>
        </section>
    )
};

export default Flow;
