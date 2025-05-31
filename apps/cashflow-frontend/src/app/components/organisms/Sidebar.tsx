
import React from 'react';
import {
  HomeIcon, BankIcon, CreditCardIcon, CurrencyDollarIcon, ArrowTrendingUpIcon,
  ChartPieIcon, CogIcon, LogoutIcon, PlusIcon, FinanceAppLogoIcon, IconProps
} from '../../../../../../../personal-finance-manager/apps/frontend/src/app/icons';
import { SidebarNavButton } from '../molecules/SidebarNavButton';
import { Button } from '../atoms/Button';
import type { NavView, ActiveModal } from '../../../../../../../personal-finance-manager/apps/frontend/src/app/types';


interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenModal: (modalType: ActiveModal, bankId?: string) => void;
  isAddExpenseDisabled: boolean;
  isAddIncomeDisabled: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenModal,
  isAddExpenseDisabled,
  isAddIncomeDisabled,
}) => {

  const navItems: { view: NavView; label: string; icon: React.ReactElement<IconProps> }[] = [
    { view: 'resumen', label: 'Resumen', icon: <HomeIcon /> },
    { view: 'bancos', label: 'Bancos', icon: <BankIcon /> },
    { view: 'tarjetas_de_credito', label: 'Tarjetas de Crédito', icon: <CreditCardIcon /> },
    { view: 'prestamos', label: 'Préstamos', icon: <CurrencyDollarIcon /> },
    { view: 'inversiones', label: 'Inversiones', icon: <ArrowTrendingUpIcon /> },
    { view: 'analisis', label: 'Análisis', icon: <ChartPieIcon /> },
  ];

  return (
    <aside className="w-64 bg-neutral-900 p-5 flex flex-col space-y-2 shadow-2xl">
      <div className="flex items-center space-x-3 mb-8 px-1">
        <FinanceAppLogoIcon className="w-9 h-9 text-brandBlue-400" />
        <div>
          <h1 className="text-xl font-bold text-neutral-100">FinanceApp</h1>
          <p className="text-xs text-neutral-400">Tu dinero, tu control</p>
        </div>
      </div>

      <nav className="flex-grow space-y-1.5">
        {navItems.map(item => (
          <SidebarNavButton
            key={item.view}
            onClick={() => onNavigate(item.view)}
            isActive={currentView === item.view || (item.view === 'bancos' && currentView === 'bankDetails')}
            icon={item.icon}
          >
            {item.label}
          </SidebarNavButton>
        ))}
      </nav>

      <div className="space-y-2 pt-4 border-t border-neutral-700/50">
        <Button
            variant="secondary"
            className="w-full bg-primary-dark hover:bg-primary-darker text-white"
            onClick={() => onOpenModal('addExpense')}
            leftIcon={<PlusIcon className="w-4 h-4"/>}
            disabled={isAddExpenseDisabled}
            size="md"
        >
           Añadir Gasto
        </Button>
        <Button
            variant="secondary"
            className="w-full bg-success-dark hover:bg-success-bgDark text-white"
            onClick={() => onOpenModal('addIncome')}
            leftIcon={<PlusIcon className="w-4 h-4"/>}
            disabled={isAddIncomeDisabled}
            size="md"
        >
            Añadir Ingreso
        </Button>
        <SidebarNavButton onClick={() => onNavigate('configuracion')} isActive={currentView === 'configuracion'} icon={<CogIcon />}>
          Configuración
        </SidebarNavButton>
        <SidebarNavButton onClick={() => alert('Cerrar Sesión no implementado.')} isActive={false} icon={<LogoutIcon />}>
          Cerrar Sesión
        </SidebarNavButton>
      </div>
    </aside>
  );
};
