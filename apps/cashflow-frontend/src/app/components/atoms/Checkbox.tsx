
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className={`h-4 w-4 text-brandBlue-500 border-neutral-400 rounded focus:ring-brandBlue-500 bg-neutral-600 ${className}`}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="ml-2 block text-sm text-neutral-200">
          {label}
        </label>
      )}
    </div>
  );
};
