import { ICreateExpenseDto } from './create-expense-dto.interface';

export type IUpdateExpenseDto = Partial<ICreateExpenseDto>;
