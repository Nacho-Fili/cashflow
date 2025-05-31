import React, { useState, useEffect } from 'react';
import { Currency, Bank } from '../../../types';
import { AVAILABLE_CURRENCIES, DEFAULT_CURRENCY } from '../../../constants';
import { formatDateForInput } from '../../../utils';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { Checkbox } from '../../atoms/Checkbox';
import { dataService } from '../../../services/dataService';

interface AddIncomeFormProps {
  banks: Bank[];
  onClose: () => void;
}

export const AddIncomeForm: React.FC<AddIncomeFormProps> = ({ banks, onClose }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [date, setDate] = useState(formatDateForInput(new Date()));
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceDay, setRecurrenceDay] = useState(1);
  const [accountId, setAccountId] = useState('');

  const allBankAccounts = banks.flatMap(b => b.accounts.map(a => ({ ...a, bankName: b.name })));

  useEffect(() => {
    if (allBankAccounts.length > 0 && !accountId) {
      setAccountId(allBankAccounts[0].id);
    }
  }, [banks, accountId, allBankAccounts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (source.trim() && amount > 0 && accountId) {
      dataService.addIncome({
        source,
        amount,
        currency,
        date,
        isRecurring,
        recurrenceDay: isRecurring ? recurrenceDay : undefined,
        accountId,
      });
      onClose();
    }
  };

  const canSubmit = allBankAccounts.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Fuente" id="incomeSource" value={source} onChange={e=>setSource(e.target.value)} required/>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Monto" id="incomeAmount" type="number" value={amount} onChange={e=>setAmount(parseFloat(e.target.value))} min="0.01" step="0.01" required/>
        <FormField label="Moneda" id="incomeCurrency" type="select" value={currency} onChange={e=>setCurrency(e.target.value as Currency)} options={AVAILABLE_CURRENCIES.map(currencyInfo =>({value:currencyInfo.code, label: `${currencyInfo.name} (${currencyInfo.symbol})`}))}/>
      </div>
      <FormField label="Depositar en Cuenta" id="incomeAccountId" type="select" value={accountId} onChange={e=>setAccountId(e.target.value)} required
                 options={allBankAccounts.map(accountInfo =>({value: accountInfo.id, label: `${accountInfo.bankName} - ${accountInfo.name} (${accountInfo.currency})`}))}
                 placeholder="Seleccionar cuenta"
                 disabled={allBankAccounts.length === 0}
      />
      <FormField label="Fecha" id="incomeDate" type="date" value={date} onChange={e=>setDate(e.target.value)} required/>
      <Checkbox label="¿Es un ingreso recurrente?" id="incomeIsRecurring" checked={isRecurring} onChange={e=>setIsRecurring((e.target as HTMLInputElement).checked)}/>
      {isRecurring && <FormField label="Día de Recurrencia (Mes, 1-31)" id="incomeRecurrenceDay" type="number" value={recurrenceDay} onChange={e=>setRecurrenceDay(parseInt(e.target.value))} min="1" max="31" required={isRecurring}/>}
      <Button type="submit" className="w-full" variant="primary" disabled={!canSubmit}>
          {canSubmit ? "Añadir Ingreso" : "Añada una cuenta bancaria"}
      </Button>
    </form>
  );
};
