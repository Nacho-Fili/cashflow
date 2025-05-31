import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const baseStyle = "block w-full rounded-md border-neutral-600 bg-neutral-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-white p-2";
  return <input className={`${baseStyle} ${className}`} {...props} />;
};
