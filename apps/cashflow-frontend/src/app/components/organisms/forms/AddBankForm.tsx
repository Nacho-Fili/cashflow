
import React, { useState } from 'react';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { dataService } from '../../../services/dataService';

interface AddBankFormProps {
  onClose: () => void;
}

export const AddBankForm: React.FC<AddBankFormProps> = ({ onClose }) => {
  const [bankName, setBankName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bankName.trim()) {
      dataService.addBank(bankName);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Nombre del Banco"
        id="bankName"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" variant="primary">Añadir Banco</Button>
    </form>
  );
};
