import { ExpenseType } from '../models/expense.model';

export class ExpenseDto {
  id: string;
  description: string;
  amount: number;
  type: ExpenseType;
  date: Date;
  creditCardId?: string;
  categoryId: string;
  totalInstallments?: number;
  currentInstallment?: number;
  startDate?: Date;
  endDate?: Date;
  isRecurring?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
