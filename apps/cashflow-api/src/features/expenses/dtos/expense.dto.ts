import { ExpenseType } from '../models/expense.model';

export class ExpenseDto {
  id: string;
  description: string;
  amount: number;
  type: ExpenseType;
  date: Date;
  creditCardId?: string;
  categoryId: string;
  totalInstallments?: number | null;
  currentInstallment?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  isRecurring?: boolean;
  createdAt: Date;
  updatedAt: Date;
  balanceId?: string;
}
