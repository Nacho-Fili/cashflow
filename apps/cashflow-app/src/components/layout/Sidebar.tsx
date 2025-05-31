import React from 'react';
import {
    Home,
    CreditCard,
    TrendingUp,
    Receipt,
    BarChart3,
    Settings,
    LogOut,
    Wallet,
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
    activeRoute?: string;
    onNavigate?: (route: string) => void;
}

const navigationItems = [
    { id: 'dashboard', label: 'Resumen', icon: Home, route: '/' },
    { id: 'accounts', label: 'Cuentas', icon: CreditCard, route: '/accounts' },
    { id: 'investments', label: 'Inversiones', icon: TrendingUp, route: '/investments' },
    { id: 'debts', label: 'Deudas', icon: Receipt, route: '/debts' },
    { id: 'analysis', label: 'Análisis', icon: BarChart3, route: '/analysis' },
];

const bottomItems = [
    { id: 'settings', label: 'Configuración', icon: Settings, route: '/settings' },
    { id: 'logout', label: 'Cerrar Sesión', icon: LogOut, route: '/logout' },
];

export function Sidebar({ activeRoute = '/', onNavigate }: SidebarProps) {
    const handleNavigation = (route: string) => {
        if (onNavigate) {
            onNavigate(route);
        }
    };

    const renderNavItem = (item: typeof navigationItems[0], isActive: boolean) => (
        <button
            key={item.id}
            onClick={() => handleNavigation(item.route)}
            className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium rounded-lg transition-all duration-200',
                isActive
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
            )}
        >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
        </button>
    );

    return (
        <div className="w-64 bg-slate-800 border-r border-slate-600 flex flex-col h-screen">
            {/* Header */}
            <div className="p-6 border-b border-dark-600">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg">FinanceApp</h1>
                        <p className="text-slate-400 text-sm">Tu dinero, tu control</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigationItems.map((item) => {
                    const isActive = activeRoute === item.route;
                    return renderNavItem(item, isActive);
                })}
            </nav>

            {/* Bottom items */}
            <div className="p-4 border-t border-dark-600 space-y-2">
                {bottomItems.map((item) => {
                    const isActive = activeRoute === item.route;
                    return renderNavItem(item, isActive);
                })}
            </div>
        </div>
    );
}
