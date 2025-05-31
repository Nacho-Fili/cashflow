import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import {
  ArrowTrendingUpIcon,
  CreditCardIcon,
  StatCardPiggyBankIcon,
  StatCardWalletIcon
} from '../../icons';
import { formatCurrency } from '../../utils';
import { PageTitle } from '../molecules/PageTitle';
import { StatCard } from '../molecules/StatCard';
import { UpcomingFinancialsBand } from '../organisms/UpcomingFinancialsBand';

// Mock data for stat cards (remains for original stat cards)
const DUMMY_STATS = {
  balanceTotal: { amount: 45230.50, change: "+12.5%", currency: 'USD' },
  inversiones: { amount: 28450.00, change: "+8.2%", currency: 'USD' },
  deudas: { amount: 5230.00, change: "-15.3%", currency: 'USD' },
  ahorros: { amount: 12550.75, change: "+5.7%", currency: 'USD' },
};

export const DashboardPage: React.FC = () => {
  const { displayCurrency } = useCurrency();

  return (
    <div className="p-2 md:p-0">
      <PageTitle title="Dashboard Financiero" subtitle="Resumen de tu situación financiera actual" />
      <UpcomingFinancialsBand />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<StatCardWalletIcon />}
          title="Balance Total"
          amount={formatCurrency(DUMMY_STATS.balanceTotal.amount, displayCurrency)}
          percentage={DUMMY_STATS.balanceTotal.change}
          iconBgClass="bg-info-accentBlueBg"
          iconTextClass="text-info-accentBlue"
          percentageClass="text-success-accent"
        />
        <StatCard
          icon={<ArrowTrendingUpIcon />}
          title="Inversiones"
          amount={formatCurrency(DUMMY_STATS.inversiones.amount, displayCurrency)}
          percentage={DUMMY_STATS.inversiones.change}
          iconBgClass="bg-success-accentBg"
          iconTextClass="text-success-accent"
          percentageClass="text-success-accent"
        />
        <StatCard
          icon={<CreditCardIcon />}
          title="Deudas (Ejemplo)"
          amount={formatCurrency(DUMMY_STATS.deudas.amount, displayCurrency)}
          percentage={DUMMY_STATS.deudas.change}
          iconBgClass="bg-danger-accentBg"
          iconTextClass="text-danger-accent"
          percentageClass="text-danger-accent"
        />
        <StatCard
          icon={<StatCardPiggyBankIcon />}
          title="Ahorros"
          amount={formatCurrency(DUMMY_STATS.ahorros.amount, displayCurrency)}
          percentage={DUMMY_STATS.ahorros.change}
          iconBgClass="bg-purpleAccent-bg"
          iconTextClass="text-purpleAccent-DEFAULT"
          percentageClass="text-success-accent"
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-neutral-100 mb-4">Evolución del Balance</h2>
        <div className="bg-neutral-700 p-6 rounded-xl shadow-lg h-80 flex items-center justify-center">
          <p className="text-neutral-400 text-center">
            El gráfico de evolución del balance se mostrará aquí.<br />
            (Implementación futura)
          </p>
        </div>
      </div>
    </div>
  );
};
