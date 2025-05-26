export class StockDto {
  id: string;
  symbol: string;
  companyName: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: Date;
  currentPrice?: number;
  accountId: string;
  currencyId: string;
  createdAt: Date;
  updatedAt: Date;
}
