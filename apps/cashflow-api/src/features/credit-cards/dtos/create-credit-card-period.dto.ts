import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID } from 'class-validator';

export class CreateCreditCardPeriodDto {
  @ApiProperty()
  @IsDateString()
  closingDate: string;

  @ApiProperty()
  @IsDateString()
  dueDate: string;

  @ApiProperty()
  @IsUUID()
  creditCardId: string;
}
