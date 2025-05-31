
import React, { useState, useEffect, useMemo } from 'react';
import { Currency, ExpenseType, PaymentMethod, Bank, CreditCard } from '../../../types';
import { AVAILABLE_CURRENCIES, DEFAULT_CURRENCY } from '../../../constants';
import { formatDateForInput, formatDate } from '../../../utils';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { PaymentMethodToggle } from '../../molecules/PaymentMethodToggle';
import { dataService } from '../../../services/dataService';

interface SimplifiedAddExpenseFormProps {
  banks: Bank[];
  creditCards: CreditCard[];
  onClose: () => void;
  onSwitchToAdvanced: () => void;
}

export const SimplifiedAddExpenseForm: React.FC<SimplifiedAddExpenseFormProps> = ({
  banks,
  creditCards,
  onClose,
  onSwitchToAdvanced
}) => {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [paymentType, setPaymentType] = useState<'bank_account' | 'credit_card'>('bank_account');
  const [paymentAccountId, setPaymentAccountId] = useState('');
  const [paymentCardId, setPaymentCardId] = useState('');

  const allBankAccounts = useMemo(() => banks.flatMap(b => b.accounts.map(a => ({ ...a, bankName: b.name }))), [banks]);

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

  const handlePaymentTypeChange = (newType: 'bank_account' | 'credit_card') => {
    setPaymentType(newType);
    if (newType === 'bank_account') {
        setPaymentCardId('');
        if (allBankAccounts.length > 0) {
            setPaymentAccountId(allBankAccounts[0].id);
        } else {
            setPaymentAccountId('');
        }
    } else { 
        setPaymentAccountId('');
        if (creditCards.length > 0) {
            setPaymentCardId(creditCards[0].id);
        } else {
            setPaymentCardId('');
        }
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(String(amount));
    if (!isNaN(numericAmount) && numericAmount > 0) {
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
        alert("Seleccione un método de pago válido.");
        return;
      }

      const today = new Date();
      const description = `Gasto Rápido - ${formatDate(today, {day:'2-digit', month:'2-digit', year:'numeric'})} ${today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

      dataService.addExpense({
        description,
        amount: numericAmount,
        currency,
        type: ExpenseType.ONE_TIME,
        startDate: formatDateForInput(today),
        paymentMethod,
      });
      onClose();
    } else {
        alert("Por favor, ingrese un monto válido.");
    }
  };

  const canSubmit = (allBankAccounts.length > 0 || creditCards.length > 0) && 
                    ((paymentType === 'bank_account' && !!paymentAccountId) || (paymentType === 'credit_card' && !!paymentCardId)) &&
                    parseFloat(String(amount)) > 0;

  const submitButtonText = () => {
    if (allBankAccounts.length === 0 && creditCards.length === 0) return "Añada un método de pago";
    if (!((paymentType === 'bank_account' && !!paymentAccountId) || (paymentType === 'credit_card' && !!paymentCardId))) return "Seleccione método de pago";
    return "Añadir Gasto";
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Monto"
          id="simplifiedExpenseAmount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)} 
          min="0.01"
          step="0.01"
          required
          inputClassName="text-lg py-2.5"
          placeholder="0.00"
        />
        <FormField
          label="Moneda"
          id="simplifiedExpenseCurrency"
          type="select"
          value={currency}
          onChange={e => setCurrency(e.target.value as Currency)}
          options={AVAILABLE_CURRENCIES.map(currencyInfo => ({ value: currencyInfo.code, label: `${currencyInfo.name} (${currencyInfo.symbol})` }))}
          inputClassName="text-lg py-2.5"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">Método de Pago</label>
        <PaymentMethodToggle currentType={paymentType} onTypeChange={handlePaymentTypeChange} />
      </div>

      {paymentType === 'bank_account' && (
        <FormField
          label="Cuenta de Origen"
          id="simplifiedExpensePaymentAccountId"
          type="select"
          value={paymentAccountId}
          onChange={e => setPaymentAccountId(e.target.value)}
          required={paymentType === 'bank_account'}
          options={allBankAccounts.map(accountInfo => ({ value: accountInfo.id, label: `${accountInfo.bankName} - ${accountInfo.name} (${accountInfo.currency})` }))}
          placeholder="Seleccionar cuenta"
          disabled={allBankAccounts.length === 0}
        />
      )}
      {paymentType === 'credit_card' && (
        <FormField
          label="Tarjeta Utilizada"
          id="simplifiedExpensePaymentCardId"
          type="select"
          value={paymentCardId}
          onChange={e => setPaymentCardId(e.target.value)}
          required={paymentType === 'credit_card'}
          options={creditCards.map(cardInfo => ({ value: cardInfo.id, label: `${cardInfo.name} (${cardInfo.currency})` }))}
          placeholder="Seleccionar tarjeta"
          disabled={creditCards.length === 0}
        />
      )}

      <div className="flex flex-col space-y-3 pt-2">
        <Button type="submit" className="w-full" variant="primary" size="lg" disabled={!canSubmit}>
          {submitButtonText()}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onSwitchToAdvanced}
          className="w-full"
        >
          Opciones Avanzadas...
        </Button>
      </div>
    </form>
  );
};
