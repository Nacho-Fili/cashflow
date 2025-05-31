
import React, { useState, useEffect } from 'react';
import { Currency, Bank } from '../../../types';
import { AVAILABLE_CURRENCIES, DEFAULT_CURRENCY } from '../../../constants';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { dataService } from '../../../services/dataService';

interface AddCreditCardFormProps {
  banks: Bank[];
  onClose: () => void;
}

export const AddCreditCardForm: React.FC<AddCreditCardFormProps> = ({ banks, onClose }) => {
  const [cardName, setCardName] = useState('');
  const [cardBankId, setCardBankId] = useState<string>(banks.length > 0 ? banks[0].id : '');
  const [cardCurrency, setCardCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [cardLimit, setCardLimit] = useState(0);
  const [cardClosingDate, setCardClosingDate] = useState(20);
  const [cardPaymentDueDate, setCardPaymentDueDate] = useState(15);

  useEffect(() => {
    if (banks.length > 0 && !cardBankId) {
      setCardBankId(banks[0].id);
    }
  }, [banks, cardBankId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardName.trim() && cardBankId && cardLimit > 0) {
      dataService.addCreditCard({
        name: cardName,
        bankId: cardBankId,
        currency: cardCurrency,
        limit: cardLimit,
        closingDate: cardClosingDate,
        paymentDueDate: cardPaymentDueDate,
      });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Nombre de Tarjeta (ej. Visa Oro, Amex Platino)"
        id="cardName"
        value={cardName}
        onChange={e => setCardName(e.target.value)}
        required
      />
      <FormField
        label="Banco"
        id="cardBankId"
        type="select"
        value={cardBankId}
        onChange={e => setCardBankId(e.target.value)}
        options={banks.map(b => ({ value: b.id, label: b.name }))}
        placeholder="Seleccionar Banco"
        required
        disabled={banks.length === 0}
      />
      <FormField
        label="Moneda"
        id="cardCurrency"
        type="select"
        value={cardCurrency}
        onChange={(e) => setCardCurrency(e.target.value as Currency)}
        options={AVAILABLE_CURRENCIES.map(currencyInfo => ({ value: currencyInfo.code, label: `${currencyInfo.name} (${currencyInfo.symbol})` }))}
      />
      <FormField
        label="Límite de Crédito"
        id="cardLimit"
        type="number"
        value={cardLimit}
        onChange={e => setCardLimit(parseFloat(e.target.value))}
        min="0"
        step="0.01"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Día de Cierre (Mes)"
          id="cardClosingDate"
          type="number"
          value={cardClosingDate}
          onChange={e => setCardClosingDate(parseInt(e.target.value))}
          min="1" max="31" required
        />
        <FormField
          label="Día de Vencimiento (Mes)"
          id="cardPaymentDueDate"
          type="number"
          value={cardPaymentDueDate}
          onChange={e => setCardPaymentDueDate(parseInt(e.target.value))}
          min="1" max="31" required
        />
      </div>
      <Button type="submit" className="w-full" variant="primary" disabled={banks.length === 0}>Añadir Tarjeta</Button>
    </form>
  );
};
