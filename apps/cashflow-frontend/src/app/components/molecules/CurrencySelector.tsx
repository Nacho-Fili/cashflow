
import React from 'react';
import { Currency } from '../../types';
import { AVAILABLE_CURRENCIES } from '../../constants';
import { Select } from '../atoms/Select';
import { Label } from '../atoms/Label';

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  label?: string;
  id?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ selectedCurrency, onCurrencyChange, label, id = "currency-select" }) => {
  return (
    <div>
      {label && <Label htmlFor={id} className="mb-1">{label}</Label>}
      <Select
        id={id}
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
      >
        {AVAILABLE_CURRENCIES.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.name} ({currency.symbol})
          </option>
        ))}
      </Select>
    </div>
  );
};
