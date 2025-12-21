interface InputTextProps {
  placeholder: string;
  type: string;
  onChange: (value: string) => void;
}

const InputText = ({ placeholder, type, onChange }: InputTextProps) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '1rem',
          color: '#000000',
          backgroundColor: '#ffffff',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxSizing: 'border-box'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#6b7280';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.1)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#d1d5db';
          e.currentTarget.style.boxShadow = 'none';
        }}
        onMouseEnter={(e) => {
          if (document.activeElement !== e.currentTarget) {
            e.currentTarget.style.borderColor = '#9ca3af';
          }
        }}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.currentTarget) {
            e.currentTarget.style.borderColor = '#d1d5db';
          }
        }}
      />
    </div>
  );
};

export default InputText;
