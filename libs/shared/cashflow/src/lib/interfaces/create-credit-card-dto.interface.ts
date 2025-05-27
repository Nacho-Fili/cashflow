export interface ICreateCreditCardDto {
  name: string;
  description?: string;
  limit: number;
  currentBalance: number;
  bankId: string;
}
