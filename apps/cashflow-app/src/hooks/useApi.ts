import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CashflowApiService } from "@cashflow/shared";

const apiService = new CashflowApiService();

// Query keys for cache management
export const queryKeys = {
    banks: ['banks'] as const,
    bank: (id: string) => ['banks', id] as const,
    investments: ['investments'] as const,
    loans: ['loans'] as const,
    incomes: ['incomes'] as const,
    expenses: ['expenses'] as const,
    budgets: ['budgets'] as const,
    currencies: ['currencies'] as const,
    dashboard: ['dashboard'] as const,
} as const;

// Banks hooks
export const useBanks = () => {
    return useQuery({
        queryKey: queryKeys.banks,
        queryFn: () => apiService.getBanks(),
    });
};

export const useBank = (id: string) => {
    return useQuery({
        queryKey: queryKeys.bank(id),
        queryFn: () => apiService.getBank(id),
        enabled: !!id,
    });
};

export const useCreateBank = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiService.createBank.bind(apiService),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.banks });
        },
    });
};

// Investments hooks
export const useInvestments = () => {
    return useQuery({
        queryKey: queryKeys.investments,
        queryFn: () => apiService.getInvestmentAccounts(),
    });
};

// Loans hooks
export const useLoans = () => {
    return useQuery({
        queryKey: queryKeys.loans,
        queryFn: () => apiService.getLoans(),
    });
};

// Incomes hooks
export const useIncomes = () => {
    return useQuery({
        queryKey: queryKeys.incomes,
        queryFn: () => apiService.getIncomes(),
    });
};

// Expenses hooks
export const useExpenses = () => {
    return useQuery({
        queryKey: queryKeys.expenses,
        queryFn: () => apiService.getExpenses(),
    });
};

// Budgets hooks
export const useBudgets = () => {
    return useQuery({
        queryKey: queryKeys.budgets,
        queryFn: () => apiService.getBudgets(),
    });
};

// Dashboard summary hook
export const useDashboardData = () => {
    const banksQuery = useBanks();
    const investmentsQuery = useInvestments();
    const loansQuery = useLoans();
    const incomesQuery = useIncomes();
    const expensesQuery = useExpenses();

    const isLoading =
        banksQuery.isLoading ||
        investmentsQuery.isLoading ||
        loansQuery.isLoading ||
        incomesQuery.isLoading ||
        expensesQuery.isLoading;

    const isError =
        banksQuery.isError ||
        investmentsQuery.isError ||
        loansQuery.isError ||
        incomesQuery.isError ||
        expensesQuery.isError;

    // Calculate totals from real data when available
    const calculateTotals = () => {
        if (isLoading || isError) {
            return {
                totalBalance: 0,
                totalInvestments: 0,
                totalDebts: 0,
                totalSavings: 0,
            };
        }

        const banks = banksQuery.data || [];
        const investments = investmentsQuery.data || [];
        const loans = loansQuery.data || [];

        const totalBalance = banks.reduce((sum, bank) => {
            const bankBalance = bank.balances?.reduce((bankSum: any, balance: { amount: any; }) => bankSum + balance.amount, 0) || 0;
            return sum + bankBalance;
        }, 0);

        const totalInvestments = investments.reduce((sum, investment) => {
            const investmentValue = investment.stocks?.reduce((stockSum: number, stock: { quantity: number; currentPrice: number; }) =>
                stockSum + (stock.quantity * stock.currentPrice), 0) || 0;
            return sum + investmentValue;
        }, 0);
        const totalDebts = loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
        const totalSavings = totalBalance - totalDebts;

        return {
            totalBalance,
            totalInvestments,
            totalDebts,
            totalSavings,
        };
    };

    return {
        ...calculateTotals(),
        isLoading,
        isError,
        banks: banksQuery.data,
        investments: investmentsQuery.data,
        loans: loansQuery.data,
        incomes: incomesQuery.data,
        expenses: expensesQuery.data,
    };
};
