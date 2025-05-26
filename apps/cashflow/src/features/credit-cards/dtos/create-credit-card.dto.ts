import { IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber, Min, Max, MaxLength } from 'class-validator';

export class CreateCreditCardDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(4)
  lastFourDigits?: string;

  @IsNotEmpty()
  @IsUUID()
  bankId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  creditLimit: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  cardType?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(31)
  closingDay?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(31)
  dueDay?: number;
}
