export interface ICreateBankDto {
  name: string;
  description?: string;
  currencyCodes?: string[];
}