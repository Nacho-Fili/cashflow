
import React from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Checkbox } from '../atoms/Checkbox';

interface FormFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea';
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: { value: string | number; label: string }[];
  required?: boolean;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  checked?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  rows?: number;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  options,
  required,
  placeholder,
  min,
  max,
  step,
  checked,
  className = '',
  inputClassName = '',
  labelClassName = '',
  rows,
  disabled,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <Label htmlFor={id} className={labelClassName}>{label}{required && <span className="text-danger-DEFAULT ml-1">*</span>}</Label>
      {type === 'select' && options ? (
        <Select id={id} value={value} onChange={onChange} required={required} className={`mt-1 ${inputClassName}`} disabled={disabled}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </Select>
      ) : type === 'checkbox' ? (
         <Checkbox id={id} checked={checked} onChange={onChange} className={`mt-1 ${inputClassName}`} disabled={disabled} label=""/>
      ) : type === 'textarea' ? (
        <textarea 
            id={id} 
            value={value} 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore TODO: This onChange type might be too broad for textarea specifically
            onChange={onChange} 
            required={required} 
            placeholder={placeholder} 
            className={`mt-1 block w-full px-3 py-2 border border-neutral-500 bg-neutral-600 text-neutral-100 rounded-md shadow-sm focus:outline-none focus:ring-brandBlue-500 focus:border-brandBlue-500 sm:text-sm placeholder-neutral-400 ${inputClassName}`}
            rows={rows}
            disabled={disabled}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore TODO: This onChange type might be too broad for input specifically
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`mt-1 ${inputClassName}`}
          disabled={disabled}
        />
      )}
    </div>
  );
};
