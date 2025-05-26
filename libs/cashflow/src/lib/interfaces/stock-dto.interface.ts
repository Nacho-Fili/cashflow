export interface IStockDto {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: Date;
  accountId: string;
  account?: {
    id: string;
    name: string;
  };
  currencyId: string;
  currency?: {
    id: string;
    symbol: string;
    name: string;
    code: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
