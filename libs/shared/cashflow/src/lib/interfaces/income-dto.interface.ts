export interface IIncomeDto {
  id: string;
  amount: number;
  description?: string;
  date: Date;
  isRecurring: boolean;
  recurrenceFrequency?: string;
  sourceId: string;
  source?: {
    id: string;
    name: string;
  };
  currencyId?: string;
  currency?: {
    id: string;
    symbol: string;
    code: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
