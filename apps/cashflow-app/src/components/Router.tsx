import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Dashboard } from '../components/dashboard/Dashboard';

// Simple router component
export function Router() {
    const [currentRoute, setCurrentRoute] = useState('/');

    const handleNavigation = (route: string) => {
        setCurrentRoute(route);
    };

    const renderContent = () => {
        switch (currentRoute) {
            case '/':
                return <Dashboard />;
            case '/accounts':
                return (
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-4">Cuentas</h1>
                        <p className="text-slate-400">Gestión de cuentas bancarias - En desarrollo</p>
                    </div>
                );
            case '/investments':
                return (
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-4">Inversiones</h1>
                        <p className="text-slate-400">Gestión de inversiones - En desarrollo</p>
                    </div>
                );
            case '/debts':
                return (
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-4">Deudas</h1>
                        <p className="text-slate-400">Gestión de deudas - En desarrollo</p>
                    </div>
                );
            case '/analysis':
                return (
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-4">Análisis</h1>
                        <p className="text-slate-400">Análisis financiero - En desarrollo</p>
                    </div>
                );
            case '/settings':
                return (
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-4">Configuración</h1>
                        <p className="text-slate-400">Configuración de la aplicación - En desarrollo</p>
                    </div>
                );
            default:
                return <Dashboard />;
        }
    };

    return (
        <Layout activeRoute={currentRoute} onNavigate={handleNavigation}>
            {renderContent()}
        </Layout>
    );
}
