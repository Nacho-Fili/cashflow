export interface ICreateLoanDto {
  name: string;
  description?: string;
  initialAmount: number;
  remainingAmount: number;
  interestRate: number;
  startDate: Date;
  endDate?: Date;
  bankId: string;
  currencyId?: string;
}
