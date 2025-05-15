import { TQuestion } from "@/types/product.type";
import Image from "next/image";

interface IQuestionCardProps {
  question: TQuestion;
  index: number;
  openAccordion: number | null;
  toggleAccordion: (index: number) => void;
}

const QuestionCard = ({
  question,
  index,
  openAccordion,
  toggleAccordion,
}: IQuestionCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        className="w-full flex items-center justify-between p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none"
        onClick={() => toggleAccordion(index)}
        aria-expanded={openAccordion === index}
        aria-controls={`accordion-content-${index}`}
      >
        <div className="flex items-center gap-x-5">
          <Image
            src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/icons/question-icon.png"
            alt="question-icon"
            width={30}
            height={30}
          />
          <span className="text-lg sm:text-xl font-semibold text-gray-800">
            {question.question}
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
          <div className="flex items-center gap-x-5">
            <Image
              src="https://mac-hadis.s3.ap-northeast-1.amazonaws.com/icons/answer-icon.png"
              alt="answer-icon"
              width={30}
              height={30}
            />
            <p>{question.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
