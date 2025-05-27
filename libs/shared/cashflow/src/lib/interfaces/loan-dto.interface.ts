export interface ILoanDto {
  id: string;
  name: string;
  description?: string;
  initialAmount: number;
  remainingAmount: number;
  interestRate: number;
  startDate: Date;
  endDate?: Date;
  bankId: string;
  bank?: {
    id: string;
    name: string;
  };
  currencyId: string;
  currency?: {
    id: string;
    name: string;
    symbol: string;
    code: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
