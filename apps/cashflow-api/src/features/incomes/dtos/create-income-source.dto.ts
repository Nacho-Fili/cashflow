import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateIncomeSourceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
