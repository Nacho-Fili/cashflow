
import React from 'react';
import type { IconProps } from '../icons';

interface SidebarNavButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  icon?: React.ReactElement<IconProps>;
}

export const SidebarNavButton: React.FC<SidebarNavButtonProps> = ({ onClick, isActive, children, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out group
                  ${isActive
                    ? 'bg-brandBlue-500 text-white shadow-md'
                    : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100'}`}
    >
      {icon && React.cloneElement(icon, { className: `w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}` })}
      {children}
    </button>
  );
};
