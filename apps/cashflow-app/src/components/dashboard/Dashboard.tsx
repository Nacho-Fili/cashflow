import {
    Wallet,
    TrendingUp,
    CreditCard,
    PiggyBank,
    ArrowUpRight,
    ArrowDownRight,
    Loader2
} from 'lucide-react';
import { MetricCard, StatsCard } from '../ui/Card';
import { BalanceChart } from './BalanceChart';
import { useDashboardData } from '../../hooks/useApi';
import type { IIncomeDto, IExpenseDto } from '@cashflow/shared';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
};

// Mock percentage changes - in a real app, you'd calculate these from historical data
const getMockPercentageChange = (value: number) => {
    // Simple mock based on value range
    if (value > 40000) return 12.5;
    if (value > 25000) return 8.2;
    if (value > 10000) return 5.7;
    if (value > 5000) return -15.3;
    return 0;
};

export function Dashboard() {
    const {
        totalBalance,
        totalInvestments,
        totalDebts,
        totalSavings,
        isLoading,
        isError,
        incomes,
        expenses
    } = useDashboardData();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                <span className="ml-2 text-slate-400">Cargando datos financieros...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <h3 className="text-red-400 font-medium">Error al cargar datos</h3>
                <p className="text-slate-400 text-sm mt-1">
                    No se pudieron cargar los datos financieros. Verificando conexión con API...
                </p>
            </div>
        );
    }

    // Get recent transactions for display
    const recentIncomes = incomes?.slice(0, 2) || [];
    const recentExpenses = expenses?.slice(0, 2) || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Financiero</h1>
                <p className="text-slate-400">Resumen de tu situación financiera</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Balance Total"
                    value={formatCurrency(totalBalance)}
                    percentage={formatPercentage(getMockPercentageChange(totalBalance))}
                    isPositive={getMockPercentageChange(totalBalance) >= 0}
                    icon={Wallet}
                    iconColor="bg-primary-600"
                />

                <MetricCard
                    title="Inversiones"
                    value={formatCurrency(totalInvestments)}
                    percentage={formatPercentage(getMockPercentageChange(totalInvestments))}
                    isPositive={getMockPercentageChange(totalInvestments) >= 0}
                    icon={TrendingUp}
                    iconColor="bg-green-600"
                />

                <MetricCard
                    title="Deudas"
                    value={formatCurrency(totalDebts)}
                    percentage={formatPercentage(getMockPercentageChange(totalDebts))}
                    isPositive={getMockPercentageChange(totalDebts) >= 0}
                    icon={CreditCard}
                    iconColor="bg-red-600"
                />

                <MetricCard
                    title="Ahorros"
                    value={formatCurrency(totalSavings)}
                    percentage={formatPercentage(getMockPercentageChange(totalSavings))}
                    isPositive={getMockPercentageChange(totalSavings) >= 0}
                    icon={PiggyBank}
                    iconColor="bg-purple-600"
                />
            </div>

            {/* Balance Evolution Chart */}
            <StatsCard>
                <div className="mb-6">
                    <h3 className="text-white text-xl font-semibold mb-2">Evolución del Balance</h3>
                    <p className="text-slate-400 text-sm">Progreso financiero a lo largo del tiempo</p>
                </div>
                <BalanceChart />
            </StatsCard>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StatsCard>
                    <div className="mb-4">
                        <h3 className="text-white text-lg font-semibold mb-2">Ingresos Recientes</h3>
                        <p className="text-slate-400 text-sm">Últimos ingresos registrados</p>
                    </div>
                    <div className="space-y-3">
                        {recentIncomes.length > 0 ? (
                            recentIncomes.map((income: IIncomeDto) => (
                                <div key={income.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                            <ArrowUpRight className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{income.description || 'Ingreso'}</p>
                                            <p className="text-slate-400 text-xs">
                                                {new Date(income.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-green-400 font-medium">+{formatCurrency(income.amount)}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-slate-400 text-sm">No hay ingresos recientes</p>
                            </div>
                        )}
                    </div>
                </StatsCard>

                <StatsCard>
                    <div className="mb-4">
                        <h3 className="text-white text-lg font-semibold mb-2">Gastos Recientes</h3>
                        <p className="text-slate-400 text-sm">Últimos gastos registrados</p>
                    </div>
                    <div className="space-y-3">
                        {recentExpenses.length > 0 ? (
                            recentExpenses.map((expense: IExpenseDto) => (
                                <div key={expense.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                            <ArrowDownRight className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{expense.description || 'Gasto'}</p>
                                            <p className="text-slate-400 text-xs">
                                                {new Date(expense.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-red-400 font-medium">-{formatCurrency(expense.amount)}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-slate-400 text-sm">No hay gastos recientes</p>
                            </div>
                        )}
                    </div>
                </StatsCard>
            </div>
        </div>
    );
}
