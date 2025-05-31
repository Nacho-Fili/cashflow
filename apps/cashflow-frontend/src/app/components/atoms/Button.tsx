
import React from 'react';
import type { IconProps } from '../icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral' | 'link';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactElement<IconProps>;
  rightIcon?: React.ReactElement<IconProps>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyle = "font-semibold rounded-lg flex items-center justify-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800";

  const variantStyles = {
    primary: 'bg-brandBlue-500 hover:bg-brandBlue-600 text-white focus:ring-brandBlue-400',
    secondary: 'bg-neutral-600 hover:bg-neutral-500 text-neutral-100 focus:ring-neutral-400 border border-neutral-500',
    danger: 'bg-danger-dark hover:bg-danger-DEFAULT text-white focus:ring-danger-DEFAULT',
    neutral: 'bg-neutral-700 hover:bg-neutral-600 text-neutral-200 focus:ring-neutral-500 border border-neutral-600',
    link: 'bg-transparent hover:bg-neutral-700 text-brandBlue-400 hover:text-brandBlue-300 focus:ring-brandBlue-400'
  };

  const sizeStyles = {
    sm: 'py-1.5 px-3 text-xs',
    md: 'py-2 px-4 text-sm',
    lg: 'py-2.5 px-5 text-base'
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {leftIcon && React.cloneElement(leftIcon, { className: `w-4 h-4 ${children ? 'mr-2' : ''}` })}
      {children}
      {rightIcon && React.cloneElement(rightIcon, { className: `w-4 h-4 ${children ? 'ml-2' : ''}` })}
    </button>
  );
};
