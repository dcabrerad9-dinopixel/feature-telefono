interface InputTextProps {
  placeholder: string;
  type: string;
  onChange: (value: string) => void;
}

const InputText = ({ placeholder, type, onChange }: InputTextProps) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-0 transition-all duration-200">
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-none outline-none text-base text-gray-900 bg-transparent placeholder-gray-500"
      />
    </div>
  );
};

export default InputText;
