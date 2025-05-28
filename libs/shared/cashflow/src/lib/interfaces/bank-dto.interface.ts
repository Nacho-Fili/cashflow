import { IBalanceDto } from './balance-dto.interface';

export interface IBankDto {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  balances?: IBalanceDto[];
}