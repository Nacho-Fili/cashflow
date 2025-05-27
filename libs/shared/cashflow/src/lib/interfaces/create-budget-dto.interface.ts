export interface ICreateBudgetDto {
  amount: number;
  month: string;
  isRecurring?: boolean;
  categoryId: string;
}
