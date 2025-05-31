
import React from 'react';
import { useFinanceData } from '../../hooks/useFinanceData';
import { CreditCardIcon as PageIcon, PlusIcon } from '../../icons';
import { formatCurrency } from '../../utils';
import { Button } from '../atoms/Button';
import { PageTitle } from '../molecules/PageTitle';
import { StatCard } from '../molecules/StatCard';

interface TarjetasCreditoPageProps {
  onAddCreditCard: () => void;
}

export const TarjetasCreditoPage: React.FC<TarjetasCreditoPageProps> = ({ onAddCreditCard }) => {
  const { creditCards, banks, isLoading } = useFinanceData();

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center p-10 text-neutral-200 text-xl">Cargando tarjetas...</div>;
  }

  return (
    <div className="p-2 md:p-0">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Tarjetas de Crédito" subtitle="Administra tus tarjetas y sus balances" className="mb-0" />
        <Button onClick={onAddCreditCard} leftIcon={<PlusIcon className="w-5 h-5" />} variant="primary" size="md" disabled={banks.length === 0}>
          {banks.length > 0 ? "Añadir Tarjeta" : "Añada un banco primero"}
        </Button>
      </div>
      {banks.length === 0 && (
        <p className="text-danger-textOnDarkBg bg-danger-bgDark p-4 rounded-lg mb-4">
          Por favor, añade un banco antes de poder registrar tarjetas de crédito.
        </p>
      )}
      {creditCards.length === 0 && banks.length > 0 && (
        <div className="bg-neutral-700 p-6 rounded-xl shadow-lg text-center">
          <p className="text-neutral-300">No hay tarjetas de crédito añadidas.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditCards.map(cardItem => {
          const bankInfo = banks.find(b => b.id === cardItem.bankId);
          return (
            <StatCard
              key={cardItem.id}
              icon={<PageIcon className="w-7 h-7 text-brandBlue-400" />}
              iconBgClass="bg-brandBlue-500/20"
              iconTextClass="text-brandBlue-400"
              title={cardItem.name}
              amount={formatCurrency(cardItem.currentBalance, cardItem.currency)}
              subtext={`Límite: ${formatCurrency(cardItem.limit, cardItem.currency)} | Banco: ${bankInfo?.name || 'N/A'}`}
              percentageClass={cardItem.currentBalance > 0 ? "text-danger-accent" : "text-success-accent"}
              percentage={cardItem.currentBalance > 0 ? "Con Deuda" : "Al día"}
            />
          );
        })}
      </div>
    </div>
  );
};
