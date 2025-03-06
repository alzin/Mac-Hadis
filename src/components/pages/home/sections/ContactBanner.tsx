import Image from "next/image";

// components
import ContactBtn from "../components/ContactBtn";

// data
import ContactDetails from "@/content/home/ContactDetails.json";

const ContactBanner = ({ showFormBtn = true }: { showFormBtn?: boolean }) => {
  return (
    <section className="font-noto object-cover relative flex flex-row-reverse">
      <Image
        className="-z-10 absolute top-0 left-0 opacity-25"
        src="/images/home-page/banner-full-bg.png"
        alt="banner-background-hadis"
        fill
        loading="lazy"
      />
      {/* Right image */}
      <div className="hidden md:block md:w-[48%] relative md:h-auto">
        <Image
          src="/images/home-page/right-bg-banner.jpeg"
          alt="banner-right-bg"
          fill
          loading="lazy"
          className="object-cover"
        />
      </div>

      {/* left section */}
      <div className="px-5 py-[50px] xl:p-[75px] md:w-[52%] xl:pl-[80px] space-y-4 lg:max-h-[415px]">
        {/* Show this only on screens smaller than 600px */}
        <h2 className="font-noto bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent text-center text-[32px] md:text-[36px] font-black leading-[48px] md:leading-[54px] block sm:hidden">
          ラクラク査定は
          <br />
          ハディズにお任せ♪
        </h2>

        {/* Show this only on screens 600px and above */}
        <h2 className="font-noto bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent text-center text-[32px] md:text-[36px] font-black leading-[48px] md:leading-[54px] hidden sm:block">
          ラクラク査定はハディズにお任せ♪
        </h2>
        {/* communication information */}
        <div className="flex justify-center flex-wrap space-y-4 lg:space-y-[24px]">
          {/* call button */}
          <div className="w-full">
            <ContactBtn
              mobileLabel={ContactDetails.phoneNumber.label}
              label={ContactDetails.phoneNumber.label}
              href={ContactDetails.phoneNumber.href}
              variant="red"
              className="text-[32px] lg:text-[40px] h-20 w-full  sm:w-full"
            />
            {showFormBtn && (
              <p className="text-[14px] leading-[21px] mt-1 font-normal w-fit">
                営業時間：10:00 〜 18:00
              </p>
            )}
          </div>
          {/* social media buttons */}
          <div className="space-y-2 md:space-y-0 md:space-x-2 flex-wrap md:flex-nowrap flex w-full">
            {showFormBtn && (
              <ContactBtn
                mobileLabel={ContactDetails.support.label}
                label={ContactDetails.support.label}
                href={ContactDetails.support.href}
                variant="blue"
                className="text-xl w-full sm:w-full lg:flex-1 sm:px-3"
              />
            )}
            <ContactBtn
              mobileLabel={ContactDetails.line.label}
              label={ContactDetails.line.label}
              href={ContactDetails.line.href}
              variant="green"
              className="text-xl w-full sm:w-full lg:flex-1 sm:px-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
