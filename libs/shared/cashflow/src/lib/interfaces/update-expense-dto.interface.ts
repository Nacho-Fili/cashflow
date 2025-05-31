import { ICreateExpenseDto } from './create-expense-dto.interface.js';

export type IUpdateExpenseDto = Partial<ICreateExpenseDto>;
