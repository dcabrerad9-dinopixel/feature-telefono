interface InputTextProps {
  placeholder: string;
  type: string;
  onChange: (value: string) => void;
}

const InputText = ({ placeholder, type, onChange }: InputTextProps) => {
  return (
    <div className="flex items-center border border-theme rounded-lg px-3 py-2 transition-all duration-200 focus-theme-ring">
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-none outline-none text-base text-theme-primary bg-transparent input-theme"
        style={{ 
          backgroundColor: 'transparent'
        }}
      />
    </div>
  );
};

export default InputText;
