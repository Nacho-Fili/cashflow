import { ApiProperty } from '@nestjs/swagger';
import { ExpenseDto } from '../../expenses/dtos/expense.dto';

export class CreditCardPeriodDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  closingDate: string;

  @ApiProperty()
  dueDate: string;

  @ApiProperty({ required: false })
  creditCardId?: string;

  @ApiProperty({ type: () => [ExpenseDto], required: false })
  expenses?: ExpenseDto[];
}

export class CreditCardPeriodSummaryDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  closingDate: string;
  @ApiProperty()
  dueDate: string;
  @ApiProperty()
  amount: number;
}
