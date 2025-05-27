export interface IExpenseDto {
  id: string;
  amount: number;
  description?: string;
  date: Date;
  type: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  creditCardId?: string;
  creditCard?: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
