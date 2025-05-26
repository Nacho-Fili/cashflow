import { IsNotEmpty, IsNumber, IsDate, IsUUID, IsString, Min, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsUUID()
  bankId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  initialAmount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  interestRate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  termMonths: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  monthlyPayment: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  remainingAmount: number;

  @IsUUID()
  currencyId?: string;
}
