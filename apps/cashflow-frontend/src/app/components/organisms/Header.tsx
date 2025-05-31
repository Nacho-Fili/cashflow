
import React from 'react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { CurrencySelector } from '../molecules/CurrencySelector';

export const Header: React.FC = () => {
  const { displayCurrency, setDisplayCurrency } = useCurrency();

  return (
    <header className="flex justify-end items-center py-4 px-6 sm:px-10 bg-neutral-800">
      <div className="w-48">
        <CurrencySelector
          selectedCurrency={displayCurrency}
          onCurrencyChange={(newCurrency) => setDisplayCurrency(newCurrency)}
          id="global-currency-selector"
        />
      </div>
    </header>
  );
};
