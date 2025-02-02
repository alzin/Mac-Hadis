interface IRadioGroupProps {
  name: string;
  question: string;
  required: boolean;
  inlineLabels: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: { value: string; label: string }[];
}

const RadioGroup = ({
  name,
  question,
  required,
  inlineLabels,
  value,
  onChange,
  options,
}: IRadioGroupProps) => {
  return (
    <div className="text-[14px] leading-[21px] text-[#111111]">
      {/* Question */}
      <div className="flex items-center space-x-2 mb-[8px]">
        <p>{question}</p>
        {required && (
          <span
            className="text-[12px] leading-[20px] font-normal text-[#D91C0B] text-nowrap"
            aria-required="true"
          >
            必須
          </span>
        )}
      </div>

      {/* Options */}
      <div className={inlineLabels ? "flex space-x-4" : "space-y-2"}>
        {options.map((option, index) => (
          <div className="flex items-center" key={index}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="mr-[8px] w-4 h-4"
              required={required}
            />
            <label htmlFor={`${name}-${option.value}`} className="mr-[24px]">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
