

import { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { Bank, CreditCard, Expense, Income, DataStore, Loan } from '../types';

interface FinanceDataHookState extends DataStore {
  isLoading: boolean;
}

export const useFinanceData = () => {
  const [data, setData] = useState<FinanceDataHookState>({
    banks: [],
    creditCards: [],
    expenses: [],
    incomes: [],
    loans: [],
    isLoading: true,
  });

  useEffect(() => {
    const unsubscribe = dataService.subscribe((currentData: DataStore) => {
      setData({ 
        banks: currentData.banks,
        creditCards: currentData.creditCards,
        expenses: currentData.expenses,
        incomes: currentData.incomes,
        loans: currentData.loans,
        isLoading: false 
      });
    });
    
    return () => unsubscribe(); // Cleanup on unmount
  }, []); // Empty dependency array: subscribe once on mount

  return { ...data, dataService };
};
