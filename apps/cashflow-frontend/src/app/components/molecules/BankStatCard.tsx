
import React from 'react';
import { Bank } from '../../types';
import { BankIcon } from '../icons';

interface BankStatCardProps {
  bank: Bank;
  creditCardCount: number;
  onClick: () => void;
}

export const BankStatCard: React.FC<BankStatCardProps> = ({ bank, creditCardCount, onClick }) => {
  const accountSummary = bank.accounts.length > 0
    ? `${bank.accounts.length} ${bank.accounts.length === 1 ? 'cuenta' : 'cuentas'}`
    : 'Sin cuentas';
  const ccSummary = creditCardCount > 0
    ? `${creditCardCount} ${creditCardCount === 1 ? 'tarjeta' : 'tarjetas'}`
    : 'Sin tarjetas';

  return (
    <button
      onClick={onClick}
      className="bg-neutral-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-left w-full focus:outline-none focus:ring-2 focus:ring-brandBlue-500"
      aria-label={`Ver detalles del banco ${bank.name}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-3 rounded-lg bg-brandBlue-500/20">
          <BankIcon className="w-7 h-7 text-brandBlue-400" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-brandBlue-300 mb-1">{bank.name}</h3>
        <p className="text-neutral-300 text-sm">{accountSummary}</p>
        <p className="text-neutral-300 text-sm">{ccSummary}</p>
      </div>
    </button>
  );
};
