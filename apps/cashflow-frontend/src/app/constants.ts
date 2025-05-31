

import { Currency, CurrencyDetail } from './types';

export const AVAILABLE_CURRENCIES: CurrencyDetail[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'ARS', name: 'Argentine Peso', symbol: 'ARS$' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
];

export const DEFAULT_CURRENCY: Currency = 'USD';