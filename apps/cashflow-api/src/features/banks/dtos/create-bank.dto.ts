import { ICreateBankDto } from '@cashflow/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBankDto implements ICreateBankDto {
  @ApiProperty({
    description: 'Name of the bank',
    example: 'Bank of America',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Optional description of the bank',
    required: false,
    example: 'My primary banking institution',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
