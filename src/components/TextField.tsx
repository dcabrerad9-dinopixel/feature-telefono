import { useState, useRef, useEffect, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export interface TextFieldProps {
  // Props básicas
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  
  // Variantes y estilos
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  margin?: 'none' | 'dense' | 'normal';
  
  // Funcionalidad
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  type?: string;
  
  // Adornos
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  showPasswordToggle?: boolean; // Controla si se muestra el toggle para mostrar/ocultar password
  
  // Eventos
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  // Props nativas del input
  inputProps?: InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>;
  name?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

const TextField = ({
  id,
  label,
  placeholder,
  value,
  defaultValue,
  helperText,
  error = false,
  required = false,
  disabled = false,
  readOnly = false,
  fullWidth = false,
  variant = 'outlined',
  size = 'medium',
  margin = 'none',
  multiline = false,
  rows,
  minRows,
  maxRows,
  type = 'text',
  startAdornment,
  endAdornment,
  showPasswordToggle,
  onChange,
  onBlur,
  onFocus,
  inputProps,
  name,
  autoComplete,
  autoFocus,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const inputId = id || `textfield-${Math.random().toString(36).substr(2, 9)}`;
  const helperTextId = `${inputId}-helper-text`;
  const labelId = `${inputId}-label`;

  // Determinar si el label debe estar "shrink" (contraído)
  const shouldShrink = isFocused || isFilled || (value !== undefined && value !== '') || (defaultValue !== undefined && defaultValue !== '');

  // Determinar si se debe mostrar el toggle de password
  const shouldShowPasswordToggle = 
    type === 'password' && 
    (showPasswordToggle !== false) && // Por defecto true si es password
    !endAdornment; // No mostrar si hay un endAdornment personalizado

  // Tipo de input dinámico para password
  const inputType = type === 'password' && showPassword ? 'text' : type;

  useEffect(() => {
    if (inputRef.current) {
      setIsFilled(inputRef.current.value.length > 0);
    }
  }, [value, defaultValue]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (inputRef.current) {
      setIsFilled(inputRef.current.value.length > 0);
    }
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFilled(e.target.value.length > 0);
    onChange?.(e);
  };

  // Clases base para el contenedor
  const containerClasses = [
    'relative',
    fullWidth ? 'w-full' : 'w-auto',
    margin === 'dense' ? 'my-1' : margin === 'normal' ? 'my-2' : '',
    disabled ? 'opacity-60 cursor-not-allowed' : '',
  ].filter(Boolean).join(' ');

  // Clases para el input wrapper según la variante
  const getInputWrapperClasses = () => {
    const base = [
      'relative',
      'flex',
      'items-center',
      'transition-all',
      'duration-200',
      'bg-transparent',
    ];

    if (variant === 'outlined') {
      base.push(
        'border',
        error ? 'border-red-500' : 'border-theme',
        'rounded-lg',
        isFocused && !disabled ? 'border-theme-focus' : '',
        disabled ? 'border-theme' : '',
        size === 'small' ? 'px-3 py-1.5' : 'px-3 py-2.5',
        isFocused && !disabled ? 'focus-theme-ring' : ''
      );
    } else if (variant === 'filled') {
      base.push(
        'border-b-2',
        error ? 'border-red-500' : 'border-theme',
        'rounded-t-lg',
        'bg-theme-surface-secondary',
        size === 'small' ? 'px-3 pt-4 pb-1.5' : 'px-3 pt-5 pb-2',
        isFocused && !disabled ? 'border-theme-focus' : ''
      );
    } else if (variant === 'standard') {
      base.push(
        'border-b-2',
        error ? 'border-red-500' : 'border-theme',
        'pb-1',
        size === 'small' ? 'px-0 pt-3' : 'px-0 pt-4',
        isFocused && !disabled ? 'border-theme-focus' : ''
      );
    }

    return base.filter(Boolean).join(' ');
  };

  // Clases para el label
  const getLabelClasses = () => {
    const base = [
      'absolute',
      'left-0',
      'pointer-events-none',
      'transition-all',
      'duration-200',
      'text-theme-secondary',
      error ? 'text-red-500' : '',
      disabled ? 'opacity-60' : '',
    ];

    if (variant === 'outlined') {
      if (shouldShrink) {
        base.push('top-0', 'text-xs', 'transform', '-translate-y-1/2', 'px-1');
      } else {
        base.push(size === 'small' ? 'top-1.5' : 'top-2.5', 'text-base');
      }
      base.push('bg-theme-surface', 'ml-3');
    } else if (variant === 'filled') {
      if (shouldShrink) {
        base.push('top-1', 'text-xs', 'px-3');
      } else {
        base.push(size === 'small' ? 'top-4' : 'top-5', 'text-base', 'px-3');
      }
    } else if (variant === 'standard') {
      if (shouldShrink) {
        base.push('top-0', 'text-xs');
      } else {
        base.push(size === 'small' ? 'top-3' : 'top-4', 'text-base');
      }
    }

    return base.filter(Boolean).join(' ');
  };

  // Clases para el input
  const getInputClasses = () => {
    const base = [
      'w-full',
      'border-none',
      'outline-none',
      'bg-transparent',
      'text-theme-primary',
      'input-theme',
      'placeholder:text-transparent',
      disabled ? 'cursor-not-allowed' : '',
    ];

    if (variant === 'outlined') {
      base.push(size === 'small' ? 'text-sm' : 'text-base');
    } else if (variant === 'filled') {
      base.push(size === 'small' ? 'text-sm' : 'text-base');
    } else if (variant === 'standard') {
      base.push(size === 'small' ? 'text-sm' : 'text-base');
    }

    return base.filter(Boolean).join(' ');
  };

  return (
    <div className={containerClasses}>
      <div className={getInputWrapperClasses()}>
        {/* Start Adornment */}
        {startAdornment && (
          <div className="flex items-center mr-2 text-theme-secondary">
            {startAdornment}
          </div>
        )}

        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            id={labelId}
            className={getLabelClasses()}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input/Textarea */}
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            id={inputId}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={shouldShrink ? placeholder : ''}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            className={getInputClasses()}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-label={label}
            aria-describedby={helperText ? helperTextId : undefined}
            aria-invalid={error}
            aria-required={required}
            style={{
              minHeight: minRows ? `${minRows * 1.5}rem` : undefined,
              maxHeight: maxRows ? `${maxRows * 1.5}rem` : undefined,
              resize: 'vertical',
            }}
            {...(inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={inputId}
            name={name}
            type={inputType}
            value={value}
            defaultValue={defaultValue}
            placeholder={shouldShrink ? placeholder : ''}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            className={getInputClasses()}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-label={label}
            aria-describedby={helperText ? helperTextId : undefined}
            aria-invalid={error}
            aria-required={required}
            {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {/* Password Toggle o End Adornment */}
        {shouldShowPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className={`flex items-center ml-2 text-theme-secondary hover:text-theme-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus rounded p-1 ${
              disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
            }`}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            tabIndex={0}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        ) : (
          endAdornment && (
            <div className="flex items-center ml-2 text-theme-secondary">
              {endAdornment}
            </div>
          )
        )}
      </div>

      {/* Helper Text */}
      {helperText && (
        <p
          id={helperTextId}
          className={`mt-1 text-xs px-3 ${
            error ? 'text-red-500' : 'text-theme-muted'
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextField;
