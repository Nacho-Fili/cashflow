
import React, { useState, useEffect, useMemo } from 'react';
import { Currency, Bank, Account } from '../../../types';
import { AVAILABLE_CURRENCIES, DEFAULT_CURRENCY } from '../../../constants';
import { formatDateForInput, formatCurrency } from '../../../utils';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { dataService } from '../../../services/dataService';

interface AddLoanFormProps {
  banks: Bank[];
  onClose: () => void;
}

export const AddLoanForm: React.FC<AddLoanFormProps> = ({ banks, onClose }) => {
  const [description, setDescription] = useState('');
  const [loanBankId, setLoanBankId] = useState<string>(banks.length > 0 ? banks[0].id : '');
  const [accountIdForDisbursement, setAccountIdForDisbursement] = useState<string>('');
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [currency, setLoanCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [interestRate, setInterestRate] = useState(0);
  const [termMonths, setTermMonths] = useState(12);
  const [startDate, setLoanStartDate] = useState(formatDateForInput(new Date()));

  const accountsForDisbursement = useMemo(() => {
    return loanBankId ? banks.find(b => b.id === loanBankId)?.accounts || [] : [];
  }, [loanBankId, banks]);

  useEffect(() => {
    if (banks.length > 0 && !loanBankId) {
      setLoanBankId(banks[0].id);
    }
  }, [banks, loanBankId]);

  useEffect(() => {
    if (loanBankId) {
        const selectedBankForLoan = banks.find(b => b.id === loanBankId);
        if (selectedBankForLoan && selectedBankForLoan.accounts.length > 0) {
            if (!accountIdForDisbursement || !selectedBankForLoan.accounts.find(acc => acc.id === accountIdForDisbursement)) {
                 setAccountIdForDisbursement(selectedBankForLoan.accounts[0].id);
            }
        } else {
            setAccountIdForDisbursement('');
        }
    } else {
        setAccountIdForDisbursement('');
    }
  }, [loanBankId, banks, accountIdForDisbursement]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && loanBankId && accountIdForDisbursement && principalAmount > 0 && interestRate >= 0 && termMonths > 0) {
      dataService.addLoan({
        description,
        bankId: loanBankId,
        accountId: accountIdForDisbursement,
        principalAmount,
        currency,
        interestRate,
        termMonths,
        startDate,
      });
      onClose();
    } else {
      alert("Por favor, complete todos los campos obligatorios para el préstamo.");
    }
  };
  
  const canSubmit = !!(loanBankId && accountIdForDisbursement && banks.length > 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Descripción del Préstamo" id="loanDescription" value={description} onChange={e=>setDescription(e.target.value)} required/>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Banco del Préstamo"
          id="loanBankId"
          type="select"
          value={loanBankId}
          onChange={e => { setLoanBankId(e.target.value); setAccountIdForDisbursement(''); }}
          options={banks.map(b => ({ value: b.id, label: b.name }))}
          placeholder="Seleccionar Banco"
          required
          disabled={banks.length === 0}
        />
        <FormField
          label="Cuenta para Desembolso"
          id="loanAccountIdForDisbursement"
          type="select"
          value={accountIdForDisbursement}
          onChange={e => setAccountIdForDisbursement(e.target.value)}
          options={accountsForDisbursement.map(accountInfo => ({ value: accountInfo.id, label: `${accountInfo.name} (\${formatCurrency(accountInfo.balance, accountInfo.currency)})` }))}
          placeholder={accountsForDisbursement.length === 0 && loanBankId ? 'Banco sin cuentas' : 'Seleccionar Cuenta'}
          required
          disabled={!loanBankId || accountsForDisbursement.length === 0}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Monto Principal" id="loanPrincipalAmount" type="number" value={principalAmount} onChange={e=>setPrincipalAmount(parseFloat(e.target.value))} min="0.01" step="0.01" required/>
        <FormField label="Moneda" id="loanCurrency" type="select" value={currency} onChange={e=>setLoanCurrency(e.target.value as Currency)} options={AVAILABLE_CURRENCIES.map(currencyInfo =>({value:currencyInfo.code, label: `${currencyInfo.name} (${currencyInfo.symbol})`}))}/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Tasa de Interés Anual (%)" id="loanInterestRate" type="number" value={interestRate} onChange={e=>setInterestRate(parseFloat(e.target.value))} min="0" step="0.01" required/>
        <FormField label="Plazo (Meses)" id="loanTermMonths" type="number" value={termMonths} onChange={e=>setTermMonths(parseInt(e.target.value))} min="1" required/>
      </div>
      <FormField label="Fecha de Inicio del Préstamo" id="loanStartDate" type="date" value={startDate} onChange={e=>setLoanStartDate(e.target.value)} required/>
      <Button type="submit" className="w-full" variant="primary" disabled={!canSubmit}>
        {canSubmit ? "Añadir Préstamo" : "Complete información bancaria"}
      </Button>
    </form>
  );
};
