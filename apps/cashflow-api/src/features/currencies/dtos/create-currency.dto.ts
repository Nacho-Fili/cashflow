import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCurrencyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  @ApiProperty()
  code: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty()
  symbol: string;
}
