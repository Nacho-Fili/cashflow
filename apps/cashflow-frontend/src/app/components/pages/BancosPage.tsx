import React from 'react';
import { useFinanceData } from '../../hooks/useFinanceData';
import { PlusIcon } from '../../icons';
import { Button } from '../atoms/Button';
import { BankStatCard } from '../molecules/BankStatCard';
import { PageTitle } from '../molecules/PageTitle';

interface BancosPageProps {
  onAddBank: () => void;
  onViewBankDetails: (bankId: string) => void;
}

export const BancosPage: React.FC<BancosPageProps> = ({ onAddBank, onViewBankDetails }) => {
  const { banks, creditCards, isLoading } = useFinanceData();

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center p-10 text-neutral-200 text-xl">Cargando bancos...</div>;
  }

  return (
    <div className="p-2 md:p-0">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Bancos" subtitle="Gestiona tus entidades bancarias" className="mb-0" />
        <Button onClick={onAddBank} leftIcon={<PlusIcon className="w-5 h-5" />} variant="primary" size="md">
          Añadir Banco
        </Button>
      </div>
      {banks.length === 0 && (
        <div className="bg-neutral-700 p-6 rounded-xl shadow-lg text-center">
          <p className="text-neutral-300">No hay bancos añadidos.</p>
          <p className="text-neutral-400 text-sm mt-2">Haz clic en 'Añadir Banco' para empezar.</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {banks.map(bank => {
          const bankCCs = creditCards.filter(cc => cc.bankId === bank.id).length;
          return (
            <BankStatCard
              key={bank.id}
              bank={bank}
              creditCardCount={bankCCs}
              onClick={() => onViewBankDetails(bank.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
