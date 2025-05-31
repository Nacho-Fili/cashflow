import React, { useMemo } from 'react';
import { useFinanceData } from '../../hooks/useFinanceData';
import { ExpenseType } from '../../types';
import { useCurrency } from '../../contexts/CurrencyContext';
import { convertCurrency } from '../../services/currencyService';
import { formatCurrency, formatDate } from '../../utils';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '../../icons';

export const UpcomingFinancialsBand: React.FC = () => {
  const { incomes, expenses, creditCards, loans, isLoading } = useFinanceData();
  const { displayCurrency } = useCurrency();

  const { nextMonthIncome, nextMonthExpenses, netUpcoming } = useMemo(() => {
    if (isLoading) return { nextMonthIncome: 0, nextMonthExpenses: 0, netUpcoming: 0 };

    const { year: nextMonthYear, month: nextMonthJSMonth, start: nextMonthStart, end: nextMonthEnd } = getNextMonthDateRange();

    let totalIncome = 0;
    incomes.forEach(income => {
      if (income.isRecurring && income.recurrenceDay) {
        const incomeDateNextMonth = new Date(nextMonthYear, nextMonthJSMonth, income.recurrenceDay);
        if (incomeDateNextMonth.getFullYear() === nextMonthYear &&
            incomeDateNextMonth.getMonth() === nextMonthJSMonth &&
            incomeDateNextMonth >= nextMonthStart && incomeDateNextMonth <= nextMonthEnd) {
             totalIncome += convertCurrency(income.amount, income.currency, displayCurrency);
        }
      }
      // One-time income next month
      else if (!income.isRecurring) {
        const incomeDate = new Date(income.date);
        const incomeDateCorrected = new Date(incomeDate.getUTCFullYear(), incomeDate.getUTCMonth(), incomeDate.getUTCDate());
        if (incomeDateCorrected.getFullYear() === nextMonthYear && incomeDateCorrected.getMonth() === nextMonthJSMonth) {
            totalIncome += convertCurrency(income.amount, income.currency, displayCurrency);
        }
      }
    });

    let totalExpenses = 0;

    loans.forEach(loan => {
      const loanStartDate = new Date(loan.startDate);
      const loanEndDate = new Date(loanStartDate);
      loanEndDate.setMonth(loanStartDate.getMonth() + loan.termMonths);

      const firstDayOfNextMonth = new Date(nextMonthYear, nextMonthJSMonth, 1);
      if (loanEndDate >= firstDayOfNextMonth && loan.remainingBalance > 0) {
          const monthlyPayment = calculateLoanMonthlyPayment(loan.principalAmount, loan.interestRate, loan.termMonths);
          totalExpenses += convertCurrency(monthlyPayment, loan.currency, displayCurrency);
      }
    });

    expenses.forEach(expense => {
      if (expense.type === ExpenseType.MONTHLY_RECURRING) {
         const expenseStartDate = new Date(expense.startDate);
         const expenseStartCorrected = new Date(expenseStartDate.getUTCFullYear(), expenseStartDate.getUTCMonth(), expenseStartDate.getUTCDate());
        if (expenseStartCorrected <= nextMonthEnd) { 
            totalExpenses += convertCurrency(expense.amount, expense.currency, displayCurrency);
        }
      } else if (expense.type === ExpenseType.MONTHLY_FIXED_TERM && expense.endDate) {
        if (isExpenseActiveInMonth(expense.startDate, expense.endDate, nextMonthYear, nextMonthJSMonth)) {
          totalExpenses += convertCurrency(expense.amount, expense.currency, displayCurrency);
        }
      } else if (expense.type === ExpenseType.ONE_TIME) {
        const expenseDate = new Date(expense.startDate);
        const expenseDateCorrected = new Date(expenseDate.getUTCFullYear(), expenseDate.getUTCMonth(), expenseDate.getUTCDate());
        if (expenseDateCorrected.getFullYear() === nextMonthYear && expenseDateCorrected.getMonth() === nextMonthJSMonth) {
            totalExpenses += convertCurrency(expense.amount, expense.currency, displayCurrency);
        }
      }
    });

    const net = totalIncome - totalExpenses;
    return { nextMonthIncome: totalIncome, nextMonthExpenses: totalExpenses, netUpcoming: net };
  }, [incomes, expenses, creditCards, loans, isLoading, displayCurrency]);

  if (isLoading) {
    return (
      <div className="mb-8 p-4 bg-neutral-700 rounded-xl shadow-lg flex items-center justify-center min-h-[80px]">
        <p className="text-neutral-300">Calculando finanzas del próximo mes...</p>
      </div>
    );
  }

  const netColorClass = netUpcoming >= 0 ? 'text-success-textOnDarkBg' : 'text-danger-textOnDarkBg';
  const netIcon = netUpcoming >= 0
    ? <ArrowTrendingUpIcon className="w-7 h-7 text-success-accent" />
    : <ArrowTrendingDownIcon className="w-7 h-7 text-danger-accent" />;
  const netIconBgClass = netUpcoming >= 0 ? 'bg-success-accentBg' : 'bg-danger-accentBg';

  return (
    <div className="mb-8 p-6 bg-neutral-700 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-success-accentBg">
            <ArrowTrendingUpIcon className="w-7 h-7 text-success-accent" />
          </div>
          <div>
            <p className="text-neutral-300 text-sm">Ingresos Próximo Mes</p>
            <p className="text-success-textOnDarkBg text-2xl font-bold">
              {formatCurrency(nextMonthIncome, displayCurrency)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-danger-accentBg">
            <ArrowTrendingDownIcon className="w-7 h-7 text-danger-accent" />
          </div>
          <div>
            <p className="text-neutral-300 text-sm">Gastos Próximo Mes</p>
            <p className="text-danger-textOnDarkBg text-2xl font-bold">
              {formatCurrency(nextMonthExpenses, displayCurrency)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${netIconBgClass}`}>
            {netIcon}
          </div>
          <div>
            <p className="text-neutral-300 text-sm">Balance Próximo Mes</p>
            <p className={`text-2xl font-bold ${netColorClass}`}>
              {formatCurrency(netUpcoming, displayCurrency)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
function calculateLoanMonthlyPayment(principalAmount: number, interestRate: number, termMonths: number) {
  const t = 1000;
  if (t) throw new Error('Function not implemented.');
  return t;
}

function isExpenseActiveInMonth(startDate: string, endDate: string, nextMonthYear: any, nextMonthJSMonth: any) {
  const t = true;
  if (t) throw new Error('Function not implemented.');
  return t;
}

function getNextMonthDateRange(): { year: any; month: any; start: any; end: any; } {
  throw new Error('Function not implemented.');
}

