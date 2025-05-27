export interface ICreateExpenseDto {
  amount: number;
  description?: string;
  date: Date;
  type: string;
  categoryId: string;
  creditCardId?: string;
}
