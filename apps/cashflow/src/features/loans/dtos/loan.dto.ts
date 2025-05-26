export class LoanDto {
  id: string;
  name: string;
  bankId: string;
  initialAmount?: number;
  interestRate?: number;
  termMonths: number;
  startDate: Date;
  endDate: Date;
  monthlyPayment: number;
  remainingAmount: number;
  currencyId?: string;
  createdAt: Date;
  updatedAt: Date;
}
