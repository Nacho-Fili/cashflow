export class IncomeDto {
  id: string;
  description: string;
  amount: number;
  date: Date;
  sourceId: string;
  isRecurring: boolean;
  currencyId?: string;
  createdAt: Date;
  updatedAt: Date;
  balanceId?: string;
}
