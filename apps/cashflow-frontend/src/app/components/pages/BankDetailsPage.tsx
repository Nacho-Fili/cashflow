import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { ArrowUturnLeftIcon } from '../../icons';
import { convertCurrency } from '../../services/currencyService';
import { Bank, CreditCard, Currency, Loan } from '../../types';
import { formatCurrency, formatDate } from '../../utils';
import { Button } from '../atoms/Button';
import { PageTitle } from '../molecules/PageTitle';

interface BankDetailsPageProps {
  bankId: string;
  banks: Bank[];
  creditCards: CreditCard[];
  loans: Loan[];
  onBack: () => void;
}

export const BankDetailsPage: React.FC<BankDetailsPageProps> = ({ bankId, banks, creditCards, loans, onBack }) => {
  const { displayCurrency } = useCurrency();
  const bank = banks.find(b => b.id === bankId);

  if (!bank) {
    return (
        <div className="p-2 md:p-0 text-center">
            <PageTitle title="Error" subtitle="Banco no encontrado."/>
            <Button onClick={onBack} leftIcon={<ArrowUturnLeftIcon />} variant="secondary">
                Volver a Bancos
            </Button>
        </div>
    );
  }

  const bankCreditCards = creditCards.filter(cc => cc.bankId === bank.id);
  const bankLoans = loans.filter(l => l.bankId === bank.id);

  const balancesByCurrency: Record<Currency, number> = bank.accounts.reduce((acc, account) => {
    acc[account.currency] = (acc[account.currency] || 0) + account.balance;
    return acc;
  }, {} as Record<Currency, number>);

  let totalBalanceInDisplayCurrency = 0;
  Object.entries(balancesByCurrency).forEach(([currency, total]) => {
    totalBalanceInDisplayCurrency += convertCurrency(total, currency as Currency, displayCurrency);
  });
  const hasMultipleCurrencies = Object.keys(balancesByCurrency).length > 1;

  return (
    <div className="p-2 md:p-0">
      <Button onClick={onBack} leftIcon={<ArrowUturnLeftIcon />} variant="primary" size="md" className="mb-6">
        Volver a Bancos
      </Button>
      <PageTitle title={bank.name} subtitle="Detalles financieros del banco." />

      <div className="mb-8 p-6 bg-neutral-700 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-brandBlue-400 mb-3">Balance Total en {bank.name}</h2>
        {Object.keys(balancesByCurrency).length > 0 ? (
          <>
            <p className="text-2xl text-neutral-100 font-bold mb-2">
              {formatCurrency(totalBalanceInDisplayCurrency, displayCurrency)}
              {hasMultipleCurrencies && <span className="text-sm text-neutral-400 ml-2">(Total Consolidado)</span>}
            </p>
            {hasMultipleCurrencies && (
              <ul className="space-y-1 pl-4 border-l-2 border-neutral-600">
                {Object.entries(balancesByCurrency).map(([cur, total]) => (
                  <li key={cur} className="text-md text-neutral-300">
                    {formatCurrency(total, cur as Currency)}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-neutral-300">No hay balances para mostrar.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section aria-labelledby={`accounts-title-${bank.id}`}>
          <h2 id={`accounts-title-${bank.id}`} className="text-2xl font-semibold text-neutral-100 mb-4">Cuentas Bancarias</h2>
          {bank.accounts.length > 0 ? (
            <div className="space-y-4">
              {bank.accounts.map(account => (
                <div key={account.id} className="p-4 bg-neutral-700 rounded-lg shadow">
                  <p className="font-medium text-neutral-100">{account.name}</p>
                  <p className="text-lg text-success-textOnDarkBg font-semibold">{formatCurrency(account.balance, account.currency)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400 bg-neutral-700 p-4 rounded-lg">No hay cuentas en este banco.</p>
          )}
        </section>

        <section aria-labelledby={`cc-title-${bank.id}`}>
          <h2 id={`cc-title-${bank.id}`} className="text-2xl font-semibold text-neutral-100 mb-4">Tarjetas de Crédito</h2>
          {bankCreditCards.length > 0 ? (
            <div className="space-y-4">
              {bankCreditCards.map(card => (
                <div key={card.id} className="p-4 bg-neutral-700 rounded-lg shadow">
                  <p className="font-medium text-neutral-100">{card.name}</p>
                  <p className="text-sm text-neutral-300">Límite: {formatCurrency(card.limit, card.currency)}</p>
                  <p className="text-sm text-neutral-300">Deuda: <span className="text-danger-textOnDarkBg">{formatCurrency(card.currentBalance, card.currency)}</span></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400 bg-neutral-700 p-4 rounded-lg">No hay tarjetas de crédito asociadas a este banco.</p>
          )}
        </section>

        <section aria-labelledby={`loans-title-${bank.id}`}>
          <h2 id={`loans-title-${bank.id}`} className="text-2xl font-semibold text-neutral-100 mb-4">Préstamos</h2>
          {bankLoans.length > 0 ? (
            <div className="space-y-4">
              {bankLoans.map(loan => (
                <div key={loan.id} className="p-4 bg-neutral-700 rounded-lg shadow">
                  <p className="font-medium text-neutral-100">{loan.description}</p>
                  <p className="text-sm text-neutral-300">Monto Principal: {formatCurrency(loan.principalAmount, loan.currency)}</p>
                  <p className="text-sm text-neutral-300">Saldo Restante: <span className="text-info-textOnDarkBg">{formatCurrency(loan.remainingBalance, loan.currency)}</span></p>
                  <p className="text-xs text-neutral-400">Tasa: {loan.interestRate}% anual, Plazo: {loan.termMonths} meses</p>
                  <p className="text-xs text-neutral-400">Inicio: {formatDate(loan.startDate)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-400 bg-neutral-700 p-4 rounded-lg">No hay préstamos asociados a este banco.</p>
          )}
        </section>
      </div>
    </div>
  );
};
