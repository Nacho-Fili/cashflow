export interface ICreateIncomeDto {
  amount: number;
  description?: string;
  date: Date;
  isRecurring?: boolean;
  recurrenceFrequency?: string;
  sourceId: string;
  currencyId?: string;
}
