import { ApiProperty } from '@nestjs/swagger';
import { IBankDto } from '@cashflow/shared';
import { BalanceDto } from '../../balances/dto/balance.dto';

export class BankDto implements IBankDto {
  @ApiProperty({ description: 'Unique identifier for the bank' })
  id: string;

  @ApiProperty({ description: 'Name of the bank' })
  name: string;

  @ApiProperty({
    description: 'Optional description of the bank',
    required: false,
  })
  description?: string;

  @ApiProperty({ description: 'Date when the bank record was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the bank record was last updated' })
  updatedAt: Date;
  
  @ApiProperty({ 
    description: 'Balances associated with this bank',
    type: () => [BalanceDto],
    required: false
  })
  balances?: BalanceDto[];
}
