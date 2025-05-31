
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ children, className = '', ...props }) => {
  const baseStyle = "block text-sm font-medium text-neutral-300";
  return (
    <label className={`${baseStyle} ${className}`} {...props}>
      {children}
    </label>
  );
};
