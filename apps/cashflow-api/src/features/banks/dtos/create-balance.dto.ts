import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBalanceDto {
  @IsOptional()
  @IsNumber()
  amount?: number;
  @IsString()
  currencyId: string;
  bankId?: string;
}
