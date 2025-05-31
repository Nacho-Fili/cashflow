import { IBalanceDto } from './balance-dto.interface.js';

export interface IBankDto {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  balances?: IBalanceDto[];
}