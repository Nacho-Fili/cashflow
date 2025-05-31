import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    activeRoute?: string;
    onNavigate?: (route: string) => void;
}

export function Layout({ children, activeRoute, onNavigate }: LayoutProps) {
    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="flex h-screen">
                <Sidebar activeRoute={activeRoute} onNavigate={onNavigate} />
                <main className="flex-1 overflow-auto">
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
