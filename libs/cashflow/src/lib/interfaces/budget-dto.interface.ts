export interface IBudgetDto {
  id: string;
  amount: number;
  month: string;
  isRecurring: boolean;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
