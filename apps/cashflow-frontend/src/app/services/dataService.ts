

import { Bank, CreditCard, Expense, Income, Account, Currency, DataStore, ExpenseType, PaymentMethod, Loan } from '../types';
import { generateId, formatDateForInput } from '../utils';

// In-memory store with some initial example data
let banks: Bank[] = [
  { id: 'bank-init-1', name: 'Global Central Bank', accounts: [
    {id: 'acc-init-usd', name: 'Main Checking (USD)', currency: 'USD', balance: 7500},
    {id: 'acc-init-eur', name: 'Holiday Savings (EUR)', currency: 'EUR', balance: 3200}
  ]},
  { id: 'bank-init-2', name: 'Community Trust', accounts: [
    {id: 'acc-init-ars', name: 'Pesos Account (ARS)', currency: 'ARS', balance: 500000},
  ]}
];
let creditCards: CreditCard[] = [
  {id: 'cc-init-1', name: 'Platinum Rewards Card', bankId: 'bank-init-1', currency: 'USD', limit: 10000, currentBalance: 450.75, closingDate: 25, paymentDueDate: 15},
  {id: 'cc-init-2', name: 'Local Shopper Card', bankId: 'bank-init-2', currency: 'ARS', limit: 150000, currentBalance: 25000, closingDate: 10, paymentDueDate: 1}
];
let expenses: Expense[] = [
    { 
        id: 'exp-init-1', 
        description: 'Monthly Gym Subscription', 
        amount: 50, 
        currency: 'USD', 
        type: ExpenseType.MONTHLY_RECURRING, 
        startDate: '2023-01-15',
        paymentMethod: { type: 'credit_card', cardId: 'cc-init-1' }
    },
    { 
        id: 'exp-init-2', 
        description: 'Groceries', 
        amount: 85.50, 
        currency: 'USD', 
        type: ExpenseType.ONE_TIME, 
        startDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0], // 5 days ago
        paymentMethod: { type: 'bank_account', bankId: 'bank-init-1', accountId: 'acc-init-usd' }
    }
];
let incomes: Income[] = [
    {
        id: 'inc-init-1',
        source: 'Monthly Salary',
        amount: 4500,
        currency: 'USD',
        date: '2023-01-01', // Initial date for recurring logic
        isRecurring: true,
        recurrenceDay: 1, // 1st of the month
        accountId: 'acc-init-usd'
    }
];
let loans: Loan[] = [
    {
        id: 'loan-init-1',
        bankId: 'bank-init-1',
        accountId: 'acc-init-usd',
        description: 'Car Loan',
        principalAmount: 15000,
        currency: 'USD',
        interestRate: 3.5,
        termMonths: 60,
        startDate: formatDateForInput(new Date(2023, 0, 15)), // Example: Jan 15, 2023
        remainingBalance: 12500,
    }
];

type Listener = (data: DataStore) => void;
const listeners: Set<Listener> = new Set(); // Use Set for easier add/remove

const notifyListeners = () => {
  const currentData: DataStore = {
    banks: JSON.parse(JSON.stringify(banks)), // Deep copy
    creditCards: JSON.parse(JSON.stringify(creditCards)),
    expenses: JSON.parse(JSON.stringify(expenses)),
    incomes: JSON.parse(JSON.stringify(incomes)),
    loans: JSON.parse(JSON.stringify(loans)),
  };
  listeners.forEach(listener => listener(currentData));
};

export const dataService = {
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    // Notify with initial data (deep copy)
    listener(JSON.parse(JSON.stringify({ banks, creditCards, expenses, incomes, loans }))); 
    return () => { // Unsubscribe function
      listeners.delete(listener);
    };
  },

  // Banks
  getBanks: (): Bank[] => JSON.parse(JSON.stringify(banks)),
  addBank: (name: string): Bank => {
    const newBank: Bank = { id: generateId(), name, accounts: [] };
    banks.push(newBank);
    notifyListeners();
    return JSON.parse(JSON.stringify(newBank));
  },
  getBankById: (bankId: string): Bank | undefined => {
    const bank = banks.find(b => b.id === bankId);
    return bank ? JSON.parse(JSON.stringify(bank)) : undefined;
  },
  addAccountToBank: (bankId: string, accountName: string, currency: Currency, initialBalance: number): Account | null => {
    const bank = banks.find(b => b.id === bankId);
    if (bank) {
      const newAccount: Account = { id: generateId(), name: accountName, currency, balance: initialBalance };
      bank.accounts.push(newAccount);
      notifyListeners();
      return JSON.parse(JSON.stringify(newAccount));
    }
    return null;
  },
  getAccountById: (bankId: string, accountId: string): Account | undefined => {
    const bank = banks.find(b => b.id === bankId);
    const account = bank?.accounts.find(acc => acc.id === accountId);
    return account ? JSON.parse(JSON.stringify(account)) : undefined;
  },
  findAccountGlobal: (accountId: string): { bank: Bank; account: Account } | undefined => {
    for (const bank of banks) {
      const account = bank.accounts.find(acc => acc.id === accountId);
      if (account) return { bank: JSON.parse(JSON.stringify(bank)), account: JSON.parse(JSON.stringify(account)) };
    }
    return undefined;
  },
  updateAccountBalance: (accountId: string, amountChange: number): boolean => {
    for (const bank of banks) {
      const account = bank.accounts.find(acc => acc.id === accountId);
      if (account) {
        account.balance += amountChange;
        notifyListeners(); // Ensure this notification happens
        return true;
      }
    }
    console.warn(`Account with ID ${accountId} not found for balance update.`);
    return false;
  },

  // Credit Cards
  getCreditCards: (): CreditCard[] => JSON.parse(JSON.stringify(creditCards)),
  addCreditCard: (cardData: Omit<CreditCard, 'id' | 'currentBalance'>): CreditCard => {
    const newCard: CreditCard = { ...cardData, id: generateId(), currentBalance: 0 };
    creditCards.push(newCard);
    notifyListeners();
    return JSON.parse(JSON.stringify(newCard));
  },
  getCreditCardById: (cardId: string): CreditCard | undefined => {
    const card = creditCards.find(c => c.id === cardId);
    return card ? JSON.parse(JSON.stringify(card)) : undefined;
  },
  updateCreditCardBalance: (cardId: string, amountChange: number): boolean => {
    const card = creditCards.find(c => c.id === cardId);
    if (card) {
      card.currentBalance += amountChange; // Positive amountChange increases balance (debt)
      notifyListeners();
      return true;
    }
    return false;
  },
  getCreditCardsByBankId: (bankId: string): CreditCard[] => {
    return JSON.parse(JSON.stringify(creditCards.filter(card => card.bankId === bankId)));
  },

  // Expenses
  getExpenses: (): Expense[] => JSON.parse(JSON.stringify(expenses)),
  addExpense: (expenseData: Omit<Expense, 'id'>): Expense => {
    const newExpense: Expense = { ...expenseData, id: generateId() };
    expenses.push(newExpense);

    if (newExpense.paymentMethod.type === 'bank_account') {
      dataService.updateAccountBalance(newExpense.paymentMethod.accountId, -newExpense.amount);
    } else if (newExpense.paymentMethod.type === 'credit_card') {
      dataService.updateCreditCardBalance(newExpense.paymentMethod.cardId, newExpense.amount);
    }
    notifyListeners(); 
    return JSON.parse(JSON.stringify(newExpense));
  },

  // Incomes
  getIncomes: (): Income[] => JSON.parse(JSON.stringify(incomes)),
  addIncome: (incomeData: Omit<Income, 'id'>): Income => {
    const newIncome: Income = { ...incomeData, id: generateId() };
    incomes.push(newIncome);
    dataService.updateAccountBalance(newIncome.accountId, newIncome.amount);
    notifyListeners();
    return JSON.parse(JSON.stringify(newIncome));
  },

  // Loans
  getLoans: (): Loan[] => JSON.parse(JSON.stringify(loans)),
  addLoan: (loanData: Omit<Loan, 'id' | 'remainingBalance'>): Loan => {
    const newLoan: Loan = { 
      ...loanData, 
      id: generateId(), 
      remainingBalance: loanData.principalAmount 
    };
    loans.push(newLoan);
    dataService.updateAccountBalance(newLoan.accountId, newLoan.principalAmount);
    notifyListeners(); 
    return JSON.parse(JSON.stringify(newLoan));
  },
  getLoansByBankId: (bankId: string): Loan[] => {
    return JSON.parse(JSON.stringify(loans.filter(loan => loan.bankId === bankId)));
  },
};
