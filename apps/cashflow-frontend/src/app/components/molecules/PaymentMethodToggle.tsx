
import React from 'react';
import { Button } from '../atoms/Button';

interface PaymentMethodToggleProps {
  currentType: 'bank_account' | 'credit_card';
  onTypeChange: (type: 'bank_account' | 'credit_card') => void;
}

export const PaymentMethodToggle: React.FC<PaymentMethodToggleProps> = ({ currentType, onTypeChange }) => {
  return (
    <div className="mt-1 flex rounded-md shadow-sm">
      <Button
        type="button"
        onClick={() => onTypeChange('bank_account')}
        variant={currentType === 'bank_account' ? 'primary' : 'neutral'}
        className={`rounded-r-none w-1/2 border-r-0 ${currentType === 'bank_account' ? '' : 'border-neutral-500'}`}
      >
        Cuenta Bancaria
      </Button>
      <Button
        type="button"
        onClick={() => onTypeChange('credit_card')}
        variant={currentType === 'credit_card' ? 'primary' : 'neutral'}
        className={`rounded-l-none w-1/2 ${currentType === 'credit_card' ? '' : 'border-neutral-500'}`}
      >
        Tarjeta de Crédito
      </Button>
    </div>
  );
};
