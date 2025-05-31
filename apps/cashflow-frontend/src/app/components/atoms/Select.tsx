import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string | number; label: string }[];
  placeholder?: string;
  containerClassName?: string;
}

export const Select: React.FC<SelectProps> = ({ className = '', options, placeholder, containerClassName = '', ...props }) => {
  const baseStyle = "block w-full rounded-md border-neutral-600 bg-neutral-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-white p-2 appearance-none";
  return (
    <div className={`relative ${containerClassName}`}>
      <select className={`${baseStyle} ${className}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};
