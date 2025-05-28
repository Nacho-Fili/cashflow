export class BalanceDto {
  id: string;
  amount: number;
  currency: {
    symbol: string;
    name: string;
    code: string;
  };
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<BalanceDto> = {}) {
    Object.assign(this, partial);
  }
}
