import { Injectable } from "@nestjs/common";
import axios, { AxiosError } from "axios";
import { ICreateBankDto } from "../interfaces/create-bank-dto.interface";
import { IBankDto } from "../interfaces/bank-dto.interface";
import { IUpdateBankDto } from "../interfaces/update-bank-dto.interface";
import { IBalanceDto } from "../interfaces/balance-dto.interface";
import { ICreateBalanceDto } from "../interfaces/create-balance-dto.interface";
import { ILoanDto } from "../interfaces/loan-dto.interface";
import { ICreateLoanDto } from "../interfaces/create-loan-dto.interface";
import { IUpdateLoanDto } from "../interfaces/update-loan-dto.interface";
import { IInvestmentAccountDto } from "../interfaces/investment-account-dto.interface";
import { ICreateInvestmentAccountDto } from "../interfaces/create-investment-account-dto.interface";
import { IUpdateInvestmentAccountDto } from "../interfaces/update-investment-account-dto.interface";
import { IStockDto } from "../interfaces/stock-dto.interface";
import { ICreateStockDto } from "../interfaces/create-stock-dto.interface";
import { IUpdateStockDto } from "../interfaces/update-stock-dto.interface";
import { IIncomeDto } from "../interfaces/income-dto.interface";
import { ICreateIncomeDto } from "../interfaces/create-income-dto.interface";
import { IUpdateIncomeDto } from "../interfaces/update-income-dto.interface";
import { IIncomeSourceDto } from "../interfaces/income-source-dto.interface";
import { ICreateIncomeSourceDto } from "../interfaces/create-income-source-dto.interface";
import { IUpdateIncomeSourceDto } from "../interfaces/update-income-source-dto.interface";
import { IExpenseDto } from "../interfaces/expense-dto.interface";
import { ICreateExpenseDto } from "../interfaces/create-expense-dto.interface";
import { IUpdateExpenseDto } from "../interfaces/update-expense-dto.interface";
import { ICategoryDto } from "../interfaces/category-dto.interface";
import { ICreateCategoryDto } from "../interfaces/create-category-dto.interface";
import { IUpdateCategoryDto } from "../interfaces/update-category-dto.interface";
import { ICreditCardDto } from "../interfaces/credit-card-dto.interface";
import { ICreateCreditCardDto } from "../interfaces/create-credit-card-dto.interface";
import { IUpdateCreditCardDto } from "../interfaces/update-credit-card-dto.interface";
import { ICurrencyDto } from "../interfaces/currency-dto.interface";
import { ICreateCurrencyDto } from "../interfaces/create-currency-dto.interface";
import { IUpdateCurrencyDto } from "../interfaces/update-currency-dto.interface";
import { IBudgetDto } from "../interfaces/budget-dto.interface";
import { ICreateBudgetDto } from "../interfaces/create-budget-dto.interface";
import { IUpdateBudgetDto } from "../interfaces/update-budget-dto.interface";

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export enum ExpenseType {
  RECURRING = 'RECURRING',
  ONE_TIME = 'ONE_TIME',
}

@Injectable()
export class CashflowApiService {
    apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:3000/api";
    }

    // Error handling wrapper
    private async apiCall<T>(request: () => Promise<any>): Promise<T> {
        try {
            const response = await request();
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const apiError: ApiError = {
                    status: axiosError.response?.status || 500,
                    message: axiosError.message,
                    details: axiosError.response?.data
                };
                throw apiError;
            }
            throw error;
        }
    }

    // Banks endpoints
    async getBanks(): Promise<IBankDto[]> {
        return this.apiCall<IBankDto[]>(() => 
            axios.get(`${this.apiUrl}/banks`)
        );
    }

    async getBank(id: string): Promise<IBankDto> {
        return this.apiCall<IBankDto>(() => 
            axios.get(`${this.apiUrl}/banks/${id}`)
        );
    }

    async createBank(createBankDto: ICreateBankDto): Promise<IBankDto> {
        return this.apiCall<IBankDto>(() => 
            axios.post(`${this.apiUrl}/banks`, createBankDto)
        );
    }

    async updateBank(id: string, updateBankDto: IUpdateBankDto): Promise<IBankDto> {
        return this.apiCall<IBankDto>(() => 
            axios.patch(`${this.apiUrl}/banks/${id}`, updateBankDto)
        );
    }

    async deleteBank(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/banks/${id}`)
        );
    }

    async createBankBalance(bankId: string, createBalanceDto: ICreateBalanceDto): Promise<IBalanceDto> {
        return this.apiCall<IBalanceDto>(() => 
            axios.post(`${this.apiUrl}/banks/${bankId}/balances`, createBalanceDto)
        );
    }

    // Loans endpoints
    async getLoans(bankId?: string): Promise<ILoanDto[]> {
        const url = bankId ? `${this.apiUrl}/loans?bankId=${bankId}` : `${this.apiUrl}/loans`;
        return this.apiCall<ILoanDto[]>(() => axios.get(url));
    }

    async getLoan(id: string): Promise<ILoanDto> {
        return this.apiCall<ILoanDto>(() => 
            axios.get(`${this.apiUrl}/loans/${id}`)
        );
    }

    async createLoan(createLoanDto: ICreateLoanDto): Promise<ILoanDto> {
        return this.apiCall<ILoanDto>(() => 
            axios.post(`${this.apiUrl}/loans`, createLoanDto)
        );
    }

    async updateLoan(id: string, updateLoanDto: IUpdateLoanDto): Promise<ILoanDto> {
        return this.apiCall<ILoanDto>(() => 
            axios.patch(`${this.apiUrl}/loans/${id}`, updateLoanDto)
        );
    }

    async updateLoanRemainingAmount(id: string, remainingAmount: number): Promise<ILoanDto> {
        return this.apiCall<ILoanDto>(() => 
            axios.patch(`${this.apiUrl}/loans/${id}/remaining`, { remainingAmount })
        );
    }

    async deleteLoan(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/loans/${id}`)
        );
    }

    // Investments endpoints
    async getInvestmentAccounts(): Promise<IInvestmentAccountDto[]> {
        return this.apiCall<IInvestmentAccountDto[]>(() => 
            axios.get(`${this.apiUrl}/investments`)
        );
    }

    async getInvestmentAccount(id: string): Promise<IInvestmentAccountDto> {
        return this.apiCall<IInvestmentAccountDto>(() => 
            axios.get(`${this.apiUrl}/investments/${id}`)
        );
    }

    async createInvestmentAccount(createDto: ICreateInvestmentAccountDto): Promise<IInvestmentAccountDto> {
        return this.apiCall<IInvestmentAccountDto>(() => 
            axios.post(`${this.apiUrl}/investments`, createDto)
        );
    }

    async updateInvestmentAccount(id: string, updateDto: IUpdateInvestmentAccountDto): Promise<IInvestmentAccountDto> {
        return this.apiCall<IInvestmentAccountDto>(() => 
            axios.patch(`${this.apiUrl}/investments/${id}`, updateDto)
        );
    }

    async deleteInvestmentAccount(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/investments/${id}`)
        );
    }

    // Stocks endpoints
    async getStocks(accountId?: string): Promise<IStockDto[]> {
        const url = accountId ? `${this.apiUrl}/stocks?accountId=${accountId}` : `${this.apiUrl}/stocks`;
        return this.apiCall<IStockDto[]>(() => axios.get(url));
    }

    async getStock(id: string): Promise<IStockDto> {
        return this.apiCall<IStockDto>(() => 
            axios.get(`${this.apiUrl}/stocks/${id}`)
        );
    }

    async createStock(createStockDto: ICreateStockDto): Promise<IStockDto> {
        return this.apiCall<IStockDto>(() => 
            axios.post(`${this.apiUrl}/stocks`, createStockDto)
        );
    }

    async updateStock(id: string, updateStockDto: IUpdateStockDto): Promise<IStockDto> {
        return this.apiCall<IStockDto>(() => 
            axios.patch(`${this.apiUrl}/stocks/${id}`, updateStockDto)
        );
    }

    async updateStockPrice(id: string, currentPrice: number): Promise<IStockDto> {
        return this.apiCall<IStockDto>(() => 
            axios.patch(`${this.apiUrl}/stocks/${id}/price`, { currentPrice })
        );
    }

    async deleteStock(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/stocks/${id}`)
        );
    }

    // Incomes endpoints
    async getIncomes(options?: { 
        sourceId?: string; 
        recurring?: boolean; 
        startDate?: Date; 
        endDate?: Date;
    }): Promise<IIncomeDto[]> {
        let url = `${this.apiUrl}/incomes`;
        const params = new URLSearchParams();
        
        if (options) {
            if (options.sourceId) params.append('sourceId', options.sourceId);
            if (options.recurring !== undefined) params.append('recurring', options.recurring.toString());
            if (options.startDate) params.append('startDate', options.startDate.toISOString());
            if (options.endDate) params.append('endDate', options.endDate.toISOString());
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        
        return this.apiCall<IIncomeDto[]>(() => axios.get(url));
    }

    // Convenience method to get incomes by date range
    async getIncomesByDateRange(dateRange: DateRange): Promise<IIncomeDto[]> {
        return this.getIncomes({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
        });
    }

    // Convenience method to get recurring incomes
    async getRecurringIncomes(): Promise<IIncomeDto[]> {
        return this.getIncomes({ recurring: true });
    }

    // Convenience method to get incomes by source
    async getIncomesBySource(sourceId: string): Promise<IIncomeDto[]> {
        return this.getIncomes({ sourceId });
    }

    async getIncome(id: string): Promise<IIncomeDto> {
        return this.apiCall<IIncomeDto>(() => 
            axios.get(`${this.apiUrl}/incomes/${id}`)
        );
    }

    async createIncome(createIncomeDto: ICreateIncomeDto): Promise<IIncomeDto> {
        return this.apiCall<IIncomeDto>(() => 
            axios.post(`${this.apiUrl}/incomes`, createIncomeDto)
        );
    }

    async updateIncome(id: string, updateIncomeDto: IUpdateIncomeDto): Promise<IIncomeDto> {
        return this.apiCall<IIncomeDto>(() => 
            axios.patch(`${this.apiUrl}/incomes/${id}`, updateIncomeDto)
        );
    }

    async deleteIncome(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/incomes/${id}`)
        );
    }

    // Income Sources endpoints
    async getIncomeSources(): Promise<IIncomeSourceDto[]> {
        return this.apiCall<IIncomeSourceDto[]>(() => 
            axios.get(`${this.apiUrl}/income-sources`)
        );
    }

    async getIncomeSource(id: string): Promise<IIncomeSourceDto> {
        return this.apiCall<IIncomeSourceDto>(() => 
            axios.get(`${this.apiUrl}/income-sources/${id}`)
        );
    }

    async createIncomeSource(createSourceDto: ICreateIncomeSourceDto): Promise<IIncomeSourceDto> {
        return this.apiCall<IIncomeSourceDto>(() => 
            axios.post(`${this.apiUrl}/income-sources`, createSourceDto)
        );
    }

    async updateIncomeSource(id: string, updateSourceDto: IUpdateIncomeSourceDto): Promise<IIncomeSourceDto> {
        return this.apiCall<IIncomeSourceDto>(() => 
            axios.patch(`${this.apiUrl}/income-sources/${id}`, updateSourceDto)
        );
    }

    async deleteIncomeSource(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/income-sources/${id}`)
        );
    }

    // Expenses endpoints
    async getExpenses(options?: { 
        categoryId?: string; 
        creditCardId?: string; 
        type?: ExpenseType | string; 
        startDate?: Date; 
        endDate?: Date;
    }): Promise<IExpenseDto[]> {
        let url = `${this.apiUrl}/expenses`;
        const params = new URLSearchParams();
        
        if (options) {
            if (options.categoryId) params.append('categoryId', options.categoryId);
            if (options.creditCardId) params.append('creditCardId', options.creditCardId);
            if (options.type) params.append('type', options.type);
            if (options.startDate) params.append('startDate', options.startDate.toISOString());
            if (options.endDate) params.append('endDate', options.endDate.toISOString());
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        
        return this.apiCall<IExpenseDto[]>(() => axios.get(url));
    }

    // Convenience method to get expenses by date range
    async getExpensesByDateRange(dateRange: DateRange): Promise<IExpenseDto[]> {
        return this.getExpenses({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
        });
    }

    // Convenience method to get expenses by type
    async getExpensesByType(type: ExpenseType): Promise<IExpenseDto[]> {
        return this.getExpenses({ type });
    }

    // Convenience method to get expenses by category
    async getExpensesByCategory(categoryId: string): Promise<IExpenseDto[]> {
        return this.getExpenses({ categoryId });
    }

    // Convenience method to get expenses by credit card
    async getExpensesByCreditCard(creditCardId: string): Promise<IExpenseDto[]> {
        return this.getExpenses({ creditCardId });
    }

    async getExpense(id: string): Promise<IExpenseDto> {
        return this.apiCall<IExpenseDto>(() => 
            axios.get(`${this.apiUrl}/expenses/${id}`)
        );
    }

    async createExpense(createExpenseDto: ICreateExpenseDto): Promise<IExpenseDto> {
        return this.apiCall<IExpenseDto>(() => 
            axios.post(`${this.apiUrl}/expenses`, createExpenseDto)
        );
    }

    async updateExpense(id: string, updateExpenseDto: IUpdateExpenseDto): Promise<IExpenseDto> {
        return this.apiCall<IExpenseDto>(() => 
            axios.patch(`${this.apiUrl}/expenses/${id}`, updateExpenseDto)
        );
    }

    async deleteExpense(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/expenses/${id}`)
        );
    }

    // Categories endpoints
    async getCategories(): Promise<ICategoryDto[]> {
        return this.apiCall<ICategoryDto[]>(() => 
            axios.get(`${this.apiUrl}/categories`)
        );
    }

    async getCategory(id: string): Promise<ICategoryDto> {
        return this.apiCall<ICategoryDto>(() => 
            axios.get(`${this.apiUrl}/categories/${id}`)
        );
    }

    async createCategory(createCategoryDto: ICreateCategoryDto): Promise<ICategoryDto> {
        return this.apiCall<ICategoryDto>(() => 
            axios.post(`${this.apiUrl}/categories`, createCategoryDto)
        );
    }

    async updateCategory(id: string, updateCategoryDto: IUpdateCategoryDto): Promise<ICategoryDto> {
        return this.apiCall<ICategoryDto>(() => 
            axios.patch(`${this.apiUrl}/categories/${id}`, updateCategoryDto)
        );
    }

    async deleteCategory(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/categories/${id}`)
        );
    }

    // Credit Cards endpoints
    async getCreditCards(bankId?: string): Promise<ICreditCardDto[]> {
        const url = bankId ? `${this.apiUrl}/credit-cards?bankId=${bankId}` : `${this.apiUrl}/credit-cards`;
        return this.apiCall<ICreditCardDto[]>(() => axios.get(url));
    }

    async getCreditCardsByBank(bankId: string): Promise<ICreditCardDto[]> {
        return this.getCreditCards(bankId);
    }

    async getCreditCard(id: string): Promise<ICreditCardDto> {
        return this.apiCall<ICreditCardDto>(() => 
            axios.get(`${this.apiUrl}/credit-cards/${id}`)
        );
    }

    async createCreditCard(createCardDto: ICreateCreditCardDto): Promise<ICreditCardDto> {
        return this.apiCall<ICreditCardDto>(() => 
            axios.post(`${this.apiUrl}/credit-cards`, createCardDto)
        );
    }

    async updateCreditCard(id: string, updateCardDto: IUpdateCreditCardDto): Promise<ICreditCardDto> {
        return this.apiCall<ICreditCardDto>(() => 
            axios.patch(`${this.apiUrl}/credit-cards/${id}`, updateCardDto)
        );
    }

    async deleteCreditCard(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/credit-cards/${id}`)
        );
    }

    // Currencies endpoints
    async getCurrencies(): Promise<ICurrencyDto[]> {
        return this.apiCall<ICurrencyDto[]>(() => 
            axios.get(`${this.apiUrl}/currencies`)
        );
    }

    async getCurrencyByCode(code: string): Promise<ICurrencyDto> {
        return this.apiCall<ICurrencyDto>(() => 
            axios.get(`${this.apiUrl}/currencies/code/${code}`)
        );
    }

    async getCurrency(id: string): Promise<ICurrencyDto> {
        return this.apiCall<ICurrencyDto>(() => 
            axios.get(`${this.apiUrl}/currencies/${id}`)
        );
    }

    async createCurrency(createCurrencyDto: ICreateCurrencyDto): Promise<ICurrencyDto> {
        return this.apiCall<ICurrencyDto>(() => 
            axios.post(`${this.apiUrl}/currencies`, createCurrencyDto)
        );
    }

    async updateCurrency(id: string, updateCurrencyDto: IUpdateCurrencyDto): Promise<ICurrencyDto> {
        return this.apiCall<ICurrencyDto>(() => 
            axios.patch(`${this.apiUrl}/currencies/${id}`, updateCurrencyDto)
        );
    }

    async deleteCurrency(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/currencies/${id}`)
        );
    }

    // Budgets endpoints
    async getBudgets(options?: { categoryId?: string; month?: string }): Promise<IBudgetDto[]> {
        let url = `${this.apiUrl}/budgets`;
        const params = new URLSearchParams();
        
        if (options) {
            if (options.categoryId) params.append('categoryId', options.categoryId);
            if (options.month) params.append('month', options.month);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        
        return this.apiCall<IBudgetDto[]>(() => axios.get(url));
    }

    // Convenience method to get budgets by category
    async getBudgetsByCategory(categoryId: string): Promise<IBudgetDto[]> {
        return this.getBudgets({ categoryId });
    }

    // Convenience method to get budgets by month
    async getBudgetsByMonth(month: string): Promise<IBudgetDto[]> {
        return this.getBudgets({ month });
    }

    async getBudget(id: string): Promise<IBudgetDto> {
        return this.apiCall<IBudgetDto>(() => 
            axios.get(`${this.apiUrl}/budgets/${id}`)
        );
    }

    async createBudget(createBudgetDto: ICreateBudgetDto): Promise<IBudgetDto> {
        return this.apiCall<IBudgetDto>(() => 
            axios.post(`${this.apiUrl}/budgets`, createBudgetDto)
        );
    }

    async updateBudget(id: string, updateBudgetDto: IUpdateBudgetDto): Promise<IBudgetDto> {
        return this.apiCall<IBudgetDto>(() => 
            axios.patch(`${this.apiUrl}/budgets/${id}`, updateBudgetDto)
        );
    }

    async deleteBudget(id: string): Promise<void> {
        return this.apiCall<void>(() => 
            axios.delete(`${this.apiUrl}/budgets/${id}`)
        );
    }
}