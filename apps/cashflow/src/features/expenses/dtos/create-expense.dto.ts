import { IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber, IsEnum, IsDate, IsBoolean, Min, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ExpenseType } from '../models/expense.model';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  @IsEnum(ExpenseType)
  type: ExpenseType;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsOptional()
  @IsUUID()
  creditCardId?: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsNumber()
  @Min(2)
  totalInstallments?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  currentInstallment?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;
}
