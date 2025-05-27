import React from "react";

interface SidebarActionProps {
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
}

export function SidebarAction({ label, icon: Icon, onClick }: SidebarActionProps) {
  return (
    <button
      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
