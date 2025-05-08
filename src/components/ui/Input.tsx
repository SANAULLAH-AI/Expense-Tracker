import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  helperText,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  const baseInputStyles = 'px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600';
  const errorInputStyles = 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-600 focus:border-red-500 dark:focus:border-red-600';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthStyle} ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseInputStyles} ${error ? errorInputStyles : ''} ${widthStyle}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="mt-1 text-xs text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-xs text-red-500 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;