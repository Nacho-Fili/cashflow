export interface ICreateStockDto {
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: Date;
  accountId: string;
  currencyId: string;
}
