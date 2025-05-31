
import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="text-4xl font-bold text-neutral-100 mb-2">{title}</h1>
      {subtitle && <p className="text-neutral-400 text-lg">{subtitle}</p>}
    </div>
  );
};
