import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBudgetDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  month?: string;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean = false;
}
