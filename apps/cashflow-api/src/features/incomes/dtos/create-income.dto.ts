import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsUUID,
  IsDate,
  IsOptional,
  Min,
  MaxLength,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIncomeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsUUID()
  sourceId: string;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean = false;

  @IsOptional()
  @IsUUID()
  currencyId?: string;
}
