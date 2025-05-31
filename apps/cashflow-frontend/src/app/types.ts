

export type Currency = 'USD' | 'EUR' | 'ARS' | 'GBP' | 'JPY';

export interface Account {
  id: string;
  name: string;
  currency: Currency;
  balance: number;
}

export interface Bank {
  id: string;
  name: string;
  accounts: Account[];
}

export interface CreditCard {
  id: string;
  name: string;
  bankId: string;
  currency: Currency;
  limit: number;
  currentBalance: number; // Amount owed
  closingDate: number; // Day of month (1-31)
  paymentDueDate: number; // Day of month (1-31)
}

export enum ExpenseType {
  ONE_TIME = 'ONE_TIME',
  MONTHLY_FIXED_TERM = 'MONTHLY_FIXED_TERM',
  MONTHLY_RECURRING = 'MONTHLY_RECURRING',
}

export type PaymentMethod =
  | { type: 'bank_account'; bankId: string; accountId: string }
  | { type: 'credit_card'; cardId: string };

export interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: Currency;
  type: ExpenseType;
  startDate: string; // ISO Date string (YYYY-MM-DD)
  endDate?: string; // ISO Date string (YYYY-MM-DD) for MONTHLY_FIXED_TERM
  paymentMethod: PaymentMethod;
  categoryId?: string;
}

export interface Income {
  id: string;
  source: string;
  amount: number;
  currency: Currency;
  date: string; // ISO Date string (YYYY-MM-DD) for one-time or first occurrence
  isRecurring: boolean;
  recurrenceDay?: number; // Day of month (1-31) for recurring income
  accountId: string; // Account where income is deposited
}

export interface Loan {
  id: string;
  bankId: string;
  accountId: string; // Account where the loan amount is disbursed
  description: string;
  principalAmount: number;
  currency: Currency;
  interestRate: number; // Annual percentage, e.g., 5 for 5%
  termMonths: number;
  startDate: string; // ISO Date string (YYYY-MM-DD)
  remainingBalance: number; // Initially principalAmount
}

export interface DataStore {
  banks: Bank[];
  creditCards: CreditCard[];
  expenses: Expense[];
  incomes: Income[];
  loans: Loan[];
}

export type CurrencyDetail = {
  code: Currency;
  name: string;
  symbol: string;
};

export type NavView =
  | 'resumen'
  | 'bancos'
  | 'bankDetails'
  | 'inversiones'
  | 'tarjetas_de_credito'
  | 'prestamos'
  | 'analisis'
  | 'configuracion';

export type ActiveModal =
  | null
  | 'addBank'
  | 'addAccount'
  | 'addCreditCard'
  | 'addExpense'
  | 'addIncome'
  | 'addLoan';