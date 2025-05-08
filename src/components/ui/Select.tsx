import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: Option[];
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  options,
  label,
  helperText,
  error,
  fullWidth = false,
  value,
  onChange,
  className = '',
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  
  const baseSelectStyles = 'px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600';
  const errorSelectStyles = 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-600 focus:border-red-500 dark:focus:border-red-600';
  const widthStyle = fullWidth ? 'w-full' : '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${widthStyle} ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`${baseSelectStyles} ${error ? errorSelectStyles : ''} ${widthStyle}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
        }
        value={value}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && (
        <p
          id={`${selectId}-helper`}
          className="mt-1 text-xs text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-1 text-xs text-red-500 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;