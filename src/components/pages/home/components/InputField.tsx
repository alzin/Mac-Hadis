interface IInputFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  id,
  name,
  label,
  placeholder,
  required,
  value,
  onChange,
}: IInputFieldProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-[14px] leading-[21px] font-medium block"
      >
        {label}
        {required && <span className="text-[#D91C0B] ml-2">必須</span>}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-[16px] py-[10px] w-full rounded-md border-[1px] border-[#D1D5DB]"
        required={required}
        aria-required={required}
      />
    </div>
  );
};

export default InputField;
