

import { Currency } from '../types';

// Mock conversion rates relative to USD
const MOCK_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.93, // 1 USD = 0.93 EUR
  ARS: 910,  // 1 USD = 910 ARS
  GBP: 0.79, // 1 USD = 0.79 GBP
  JPY: 157,  // 1 USD = 157 JPY
};

export const convertCurrency = (amount: number, fromCurrency: Currency, toCurrency: Currency): number => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const amountInUSD = amount / MOCK_RATES[fromCurrency];
  const convertedAmount = amountInUSD * MOCK_RATES[toCurrency];
  
  return parseFloat(convertedAmount.toFixed(2)); // Return with 2 decimal places
};