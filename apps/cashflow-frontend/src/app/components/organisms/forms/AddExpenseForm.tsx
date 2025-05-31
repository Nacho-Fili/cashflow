
import React, { useState, useEffect } from 'react';
import { Currency, ExpenseType, PaymentMethod, Bank, CreditCard } from '../../../types';
import { AVAILABLE_CURRENCIES, DEFAULT_CURRENCY } from '../../../constants';
import { formatDateForInput } from '../../../utils';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { PaymentMethodToggle } from '../../molecules/PaymentMethodToggle';
import { dataService } from '../../../services/dataService';

interface AddExpenseFormProps {
  banks: Bank[];
  creditCards: CreditCard[];
  onClose: () => void;
  onSwitchToSimplified?: () => void;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ banks, creditCards, onClose, onSwitchToSimplified }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [type, setType] = useState<ExpenseType>(ExpenseType.ONE_TIME);
  const [startDate, setStartDate] = useState(formatDateForInput(new Date()));
  const [endDate, setEndDate] = useState('');
  const [paymentType, setPaymentType] = useState<'bank_account' | 'credit_card'>('bank_account');
  const [paymentAccountId, setPaymentAccountId] = useState('');
  const [paymentCardId, setPaymentCardId] = useState('');

  const allBankAccounts = banks.flatMap(b => b.accounts.map(a => ({ ...a, bankName: b.name })));

  useEffect(() => {
    if (!paymentAccountId && !paymentCardId) {
      if (allBankAccounts.length > 0 && creditCards.length === 0) {
        setPaymentType('bank_account');
        if (allBankAccounts[0]) setPaymentAccountId(allBankAccounts[0].id);
      } else if (creditCards.length > 0 && allBankAccounts.length === 0) {
        setPaymentType('credit_card');
        if (creditCards[0]) setPaymentCardId(creditCards[0].id);
      } else if (allBankAccounts.length > 0) {
        setPaymentType('bank_account');
        if (allBankAccounts[0]) setPaymentAccountId(allBankAccounts[0].id);
      } else if (creditCards.length > 0) {
        setPaymentType('credit_card');
        if (creditCards[0]) setPaymentCardId(creditCards[0].id);
      }
    }
  }, [banks, creditCards, allBankAccounts, paymentAccountId, paymentCardId]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(String(amount));
    if (description.trim() && !isNaN(numericAmount) && numericAmount > 0) {
      let paymentMethod: PaymentMethod | null = null;
      if (paymentType === 'bank_account' && paymentAccountId) {
        const accountInfo = dataService.findAccountGlobal(paymentAccountId);
        if (accountInfo) {
          paymentMethod = { type: 'bank_account', bankId: accountInfo.bank.id, accountId: paymentAccountId };
        }
      } else if (paymentType === 'credit_card' && paymentCardId) {
        paymentMethod = { type: 'credit_card', cardId: paymentCardId };
      }

      if (!paymentMethod) {
        alert("Please select a valid payment method.");
        return;
      }

      dataService.addExpense({
        description,
        amount: numericAmount,
        currency,
        type,
        startDate,
        endDate: type === ExpenseType.MONTHLY_FIXED_TERM ? endDate : undefined,
        paymentMethod,
      });
      onClose();
    } else {
        alert("Por favor, complete la descripción e ingrese un monto válido.");
    }
  };
  
  const handlePaymentTypeChange = (newType: 'bank_account' | 'credit_card') => {
    setPaymentType(newType);
    if (newType === 'bank_account') {
        setPaymentCardId('');
        if (allBankAccounts.length > 0 && !allBankAccounts.find(acc => acc.id === paymentAccountId)) {
            setPaymentAccountId(allBankAccounts[0].id);
        } else if (allBankAccounts.length === 0) {
            setPaymentAccountId('');
        }
    } else { 
        setPaymentAccountId('');
        if (creditCards.length > 0 && !creditCards.find(card => card.id === paymentCardId)) {
            setPaymentCardId(creditCards[0].id);
        } else if (creditCards.length === 0) {
            setPaymentCardId('');
        }
    }
  };

  const canSubmit = (allBankAccounts.length > 0 || creditCards.length > 0) &&
                    ((paymentType === 'bank_account' && !!paymentAccountId) || (paymentType === 'credit_card' && !!paymentCardId));
  
  const submitButtonText = () => {
    if (allBankAccounts.length === 0 && creditCards.length === 0) return "Añada un método de pago";
    if (!((paymentType === 'bank_account' && !!paymentAccountId) || (paymentType === 'credit_card' && !!paymentCardId))) return "Seleccione método de pago";
    return "Añadir Gasto";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {onSwitchToSimplified && (
        <div className="mb-2 text-right">
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={onSwitchToSimplified}
            className="text-brandBlue-400 hover:text-brandBlue-300 p-0"
          >
            &larr; Vista Simplificada
          </Button>
        </div>
      )}
      <FormField label="Descripción" id="expenseDescription" value={description} onChange={e=>setDescription(e.target.value)} required/>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Monto" id="expenseAmount" type="number" value={amount} onChange={e=>setAmount(e.target.value)} min="0.01" step="0.01" required/>
        <FormField label="Moneda" id="expenseCurrency" type="select" value={currency} onChange={e=>setCurrency(e.target.value as Currency)} options={AVAILABLE_CURRENCIES.map(currencyInfo =>({value:currencyInfo.code, label: `${currencyInfo.name} (${currencyInfo.symbol})`}))}/>
      </div>
      <FormField label="Tipo" id="expenseType" type="select" value={type} onChange={e=>setType(e.target.value as ExpenseType)} options={Object.values(ExpenseType).map(et=>({value: et, label: et.replace(/_/g,' ')}))}/>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Fecha de Inicio" id="expenseStartDate" type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} required/>
        {type === ExpenseType.MONTHLY_FIXED_TERM && <FormField label="Fecha de Fin" id="expenseEndDate" type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} required={type === ExpenseType.MONTHLY_FIXED_TERM} min={startDate}/>}
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">Método de Pago</label>
        <PaymentMethodToggle currentType={paymentType} onTypeChange={handlePaymentTypeChange} />
      </div>
      {paymentType === 'bank_account' && (
        <FormField label="Cuenta" id="expensePaymentAccountId" type="select" value={paymentAccountId} onChange={e=>setPaymentAccountId(e.target.value)} required={paymentType === 'bank_account'}
                   options={allBankAccounts.map(accountInfo =>({value: accountInfo.id, label: `${accountInfo.bankName} - ${accountInfo.name} (${accountInfo.currency})` }))}
                   placeholder="Seleccionar cuenta"
                   disabled={allBankAccounts.length === 0}
        />
      )}
      {paymentType === 'credit_card' && (
        <FormField label="Tarjeta" id="expensePaymentCardId" type="select" value={paymentCardId} onChange={e=>setPaymentCardId(e.target.value)} required={paymentType === 'credit_card'}
                   options={creditCards.map(cardInfo =>({value:cardInfo.id, label: `${cardInfo.name} (${cardInfo.currency})`}))}
                   placeholder="Seleccionar tarjeta"
                   disabled={creditCards.length === 0}
        />
      )}
      <Button type="submit" className="w-full !mt-6" variant="primary" size="lg" disabled={!canSubmit}>
        {submitButtonText()}
      </Button>
    </form>
  );
};
