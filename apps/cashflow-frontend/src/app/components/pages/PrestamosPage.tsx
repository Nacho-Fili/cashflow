import React from 'react';
import { useFinanceData } from '../../hooks/useFinanceData';
import { CurrencyDollarIcon, PlusIcon } from '../../icons';
import { formatCurrency } from '../../utils';
import { Button } from '../atoms/Button';
import { PageTitle } from '../molecules/PageTitle';
import { StatCard } from '../molecules/StatCard';

interface PrestamosPageProps {
  onAddLoan: () => void;
}

export const PrestamosPage: React.FC<PrestamosPageProps> = ({ onAddLoan }) => {
  const { loans, banks, isLoading } = useFinanceData();

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center p-10 text-neutral-200 text-xl">Cargando préstamos...</div>;
  }

  return (
    <div className="p-2 md:p-0">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Préstamos" subtitle="Gestiona tus créditos y financiamientos" className="mb-0" />
        <Button onClick={onAddLoan} leftIcon={<PlusIcon className="w-5 h-5" />} variant="primary" size="md" disabled={banks.length === 0}>
          {banks.length > 0 ? "Añadir Préstamo" : "Añada un banco primero"}
        </Button>
      </div>
      {loans.length === 0 && (
        <div className="bg-neutral-700 p-6 rounded-xl shadow-lg text-center">
          <p className="text-neutral-300">No hay préstamos registrados.</p>
          {banks.length > 0 && <p className="text-neutral-400 text-sm mt-2">Haz clic en 'Añadir Préstamo' para empezar.</p>}
          {banks.length === 0 && <p className="text-danger-textOnDarkBg text-sm mt-2">Debes añadir un banco antes de poder registrar préstamos.</p>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map(loanItem => {
          const bankInfo = banks.find(b => b.id === loanItem.bankId);
          return (
            <StatCard
              key={loanItem.id}
              icon={<CurrencyDollarIcon className="w-7 h-7 text-info-accentBlue" />}
              iconBgClass="bg-info-accentBlueBg"
              iconTextClass="text-info-accentBlue"
              title={loanItem.description}
              amount={formatCurrency(loanItem.remainingBalance, loanItem.currency)}
              subtext={`Principal: ${formatCurrency(loanItem.principalAmount, loanItem.currency)} @ ${loanItem.interestRate}% | Banco: ${bankInfo?.name || 'N/A'}`}
              percentageClass="text-neutral-400"
              percentage={`Plazo: ${loanItem.termMonths}m`}
            />
          );
        })}
      </div>
    </div>
  );
};
