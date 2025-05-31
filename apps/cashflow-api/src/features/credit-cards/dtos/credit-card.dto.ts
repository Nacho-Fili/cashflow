import { ApiProperty } from '@nestjs/swagger';
import { CreditCardPeriodDto } from './credit-card-period.dto';

export class CreditCardDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  lastFourDigits?: string;

  @ApiProperty({ required: false })
  creditLimit?: number;

  @ApiProperty({ type: () => [CreditCardPeriodDto], required: false })
  periods?: any[]; // Puede ser resumen o completo según endpoint

  @ApiProperty({ required: false })
  bankId?: string;
}
