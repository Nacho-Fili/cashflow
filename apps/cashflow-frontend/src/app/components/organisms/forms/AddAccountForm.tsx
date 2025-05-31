import React, { useState, useEffect } from 'react';
import { Currency } from '../../../types';
import { AVAILABLE_CURRENCIES, DEFAULT_CURRENCY } from '../../../constants';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { dataService } from '../../../services/dataService';

interface AddAccountFormProps {
  bankId: string;
  bankName?: string;
  onClose: () => void;
}

export const AddAccountForm: React.FC<AddAccountFormProps> = ({ bankId, bankName, onClose }) => {
  const [accountName, setAccountName] = useState('');
  const [accountCurrency, setAccountCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [accountBalance, setAccountBalance] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountName.trim() && accountBalance >= 0) {
      dataService.addAccountToBank(bankId, accountName, accountCurrency, accountBalance);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Nombre de Cuenta (ej. Corriente, Ahorros)"
        id="accountName"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        required
      />
      <FormField
        label="Moneda"
        id="accountCurrency"
        type="select"
        value={accountCurrency}
        onChange={(e) => setAccountCurrency(e.target.value as Currency)}
        options={AVAILABLE_CURRENCIES.map(currencyInfo => ({ value: currencyInfo.code, label: `${currencyInfo.name} (${currencyInfo.symbol})` }))}
        required
      />
      <FormField
        label="Balance Inicial"
        id="accountBalance"
        type="number"
        value={accountBalance}
        onChange={(e) => setAccountBalance(parseFloat(e.target.value))}
        min="0"
        step="0.01"
        required
      />
      <Button type="submit" className="w-full" variant="primary">Añadir Cuenta</Button>
    </form>
  );
};
