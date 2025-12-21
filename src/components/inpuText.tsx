import "./inputTex.css";

interface inputTextProps {
    placeholder?: string;
    type: string;
    onChange:(value: string) => void;
}                       

const InputText =({ placeholder, type, onChange }: inputTextProps) => {
    return (
        <div className="input-container">
         <input 
            type={type} 
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)} 
         /> 
        </div>
    );
};

export default InputText;