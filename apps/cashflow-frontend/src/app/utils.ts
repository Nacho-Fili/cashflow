

import { Currency, CurrencyDetail } from './types';
import { AVAILABLE_CURRENCIES } from './constants';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
   // Adjust for timezone to ensure date is not shifted
  const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
  const correctedDate = new Date(dateObj.getTime() + userTimezoneOffset);
  return correctedDate.toLocaleDateString(undefined, options ?? { year: 'numeric', month: 'long', day: 'numeric' });
};

export const formatDateForInput = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Adjust for timezone offset to get correct YYYY-MM-DD for input[type=date]
  const userTimezoneOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - userTimezoneOffset).toISOString().split('T')[0];
};


export const getCurrencySymbol = (currencyCode: Currency): string => {
  const currencyDetail = AVAILABLE_CURRENCIES.find(c => c.code === currencyCode);
  return currencyDetail ? currencyDetail.symbol : currencyCode;
};

export const formatCurrency = (amount: number, currencyCode: Currency): string => {
  const symbol = getCurrencySymbol(currencyCode);
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode }).format(amount);
  } catch (e) {
    // Fallback for less common currencies or Intl issues
    return \`\${symbol}\${amount.toFixed(2)}\`;
  }
};

export const getNextMonthDateRange = (): { start: Date; end: Date; year: number; month: number } => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const yearForNextMonth = currentMonth === 11 ? currentYear + 1 : currentYear;
  
  const startOfNextMonth = new Date(yearForNextMonth, nextMonth, 1);
  const endOfNextMonth = new Date(yearForNextMonth, nextMonth + 1, 0); 

  return { start: startOfNextMonth, end: endOfNextMonth, year: yearForNextMonth, month: nextMonth };
};

// Helper to get the first and last day of a given month and year
export const getMonthDateRange = (year: number, month: number): { firstDay: Date, lastDay: Date } => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay };
};

export const calculateLoanMonthlyPayment = (principal: number, annualInterestRate: number, termMonths: number): number => {
  if (principal <= 0 || termMonths <= 0) return 0;
  if (annualInterestRate < 0) return principal / termMonths; // Or handle as an error

  const monthlyInterestRate = annualInterestRate / 100 / 12;

  if (monthlyInterestRate === 0) {
    return principal / termMonths;
  }

  const payment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths)) / (Math.pow(1 + monthlyInterestRate, termMonths) - 1);
  return parseFloat(payment.toFixed(2));
};

export const isDateInMonth = (dateToCheckStr: string, targetYear: number, targetMonth: number): boolean => {
  const dateToCheck = new Date(dateToCheckStr);
  // Adjust for timezone issues when comparing dates from strings
  const userTimezoneOffset = dateToCheck.getTimezoneOffset() * 60000;
  const correctedDate = new Date(dateToCheck.getTime() + userTimezoneOffset);
  
  return correctedDate.getFullYear() === targetYear && correctedDate.getMonth() === targetMonth;
};

// Checks if an expense period (startDate to endDate) overlaps with a given month
export const isExpenseActiveInMonth = (
    expenseStartDateStr: string, 
    expenseEndDateStr: string | undefined, 
    targetYear: number, 
    targetMonth: number
): boolean => {
    const { firstDay: firstDayOfMonth, lastDay: lastDayOfMonth } = getMonthDateRange(targetYear, targetMonth);
    
    const expenseStart = new Date(expenseStartDateStr);
    // Adjust for timezone: inputs are YYYY-MM-DD, assume they mean start of that day in local time.
    const expenseStartCorrected = new Date(expenseStart.getUTCFullYear(), expenseStart.getUTCMonth(), expenseStart.getUTCDate());


    if (expenseStartCorrected > lastDayOfMonth) {
        return false; // Expense starts after the target month ends
    }

    if (!expenseEndDateStr) { // For ongoing expenses (e.g. MONTHLY_RECURRING, or ONE_TIME that might be relevant if start is in month)
        // For recurring, we check if its start date is before or within the month.
        // For one-time, it's active if its startDate is within the month.
        // This function is more for fixed-term, but can be adapted.
        // For now, for MONTHLY_RECURRING, we assume it's active if its start date is before or equal to month end.
        return expenseStartCorrected <= lastDayOfMonth;
    }
    
    const expenseEnd = new Date(expenseEndDateStr);
    const expenseEndCorrected = new Date(expenseEnd.getUTCFullYear(), expenseEnd.getUTCMonth(), expenseEnd.getUTCDate());

    if (expenseEndCorrected < firstDayOfMonth) {
        return false; // Expense ends before the target month begins
    }

    return true; // There's an overlap
};