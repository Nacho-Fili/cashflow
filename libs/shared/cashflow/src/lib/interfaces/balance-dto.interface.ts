export interface IBalanceDto {
  id: string;
  amount: number;
  currency: {
    symbol: string;
    name: string;
    code: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
