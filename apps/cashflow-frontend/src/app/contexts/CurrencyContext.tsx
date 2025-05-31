
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { Currency } from '../types';
import { DEFAULT_CURRENCY } from '../constants';

interface CurrencyContextType {
  displayCurrency: Currency;
  setDisplayCurrency: Dispatch<SetStateAction<Currency>>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [displayCurrency, setDisplayCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  return (
    <CurrencyContext.Provider value={{ displayCurrency, setDisplayCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
