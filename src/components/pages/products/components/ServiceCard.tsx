import { TService } from "@/types/product.type";
import Image from "next/image";

interface IServiceCardProps {
  service: TService;
  index: number;
  openAccordion: number | null;
  toggleAccordion: (index: number) => void;
}

const ServiceCard = ({
  service,
  index,
  openAccordion,
  toggleAccordion,
}: IServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        className="w-full flex items-center justify-between p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none"
        onClick={() => toggleAccordion(index)}
        aria-expanded={openAccordion === index}
        aria-controls={`accordion-content-${index}`}
      >
        <div className="flex items-center">
          <span className="text-2xl mr-3">{service.icon}</span>
          <span className="text-lg sm:text-xl font-semibold text-gray-800">
            {service.title}
          </span>
        </div>
        <span className="text-[#B81122] text-xl">
          {openAccordion === index ? "−" : "+"}
        </span>
      </button>
      {openAccordion === index && (
        <div
          id={`accordion-content-${index}`}
          className="p-4 bg-white transition-all duration-300"
        >
          <ul className="space-y-3">
            {service.content.map((item, idx) => (
              <li key={idx} className="flex items-start gap-x-2">
                <Image
                  src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/icons/red-correct.svg"
                  width={20}
                  height={20}
                  loading="eager"
                  alt="red-correct"
                />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
