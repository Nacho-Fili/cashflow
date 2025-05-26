import { IsNotEmpty, IsString, IsNumber, IsDate, IsUUID, Min, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStockDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  symbol: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  companyName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  purchasePrice: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  purchaseDate: Date;

  @IsNotEmpty()
  @IsUUID()
  accountId: string;

  @IsNotEmpty()
  @IsUUID()
  currencyId: string;
}
