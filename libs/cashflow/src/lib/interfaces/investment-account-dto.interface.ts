export interface IInvestmentAccountDto {
  id: string;
  name: string;
  description?: string;
  broker: string;
  stocks?: {
    id: string;
    symbol: string;
    name: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
