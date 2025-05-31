
import React from 'react';

interface MainLayoutProps {
  sidebar: React.ReactNode; 
  header: React.ReactNode; 
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, header, children }) => {
  return (
    <div className="flex h-screen bg-neutral-800 text-neutral-200">
      {sidebar}
      <div className="flex-1 flex flex-col overflow-hidden">
        {header}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
