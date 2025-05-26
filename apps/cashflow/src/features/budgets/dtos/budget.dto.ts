export class BudgetDto {
  id: string;
  name: string;
  amount: number;
  categoryId: string;
  month?: string;
  isRecurring: boolean;
  createdAt: Date;
  updatedAt: Date;
}
