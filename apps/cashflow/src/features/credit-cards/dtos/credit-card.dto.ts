export class CreditCardDto {
  id: string;
  name: string;
  lastFourDigits?: string;
  bankId: string;
  creditLimit: number;
  cardType?: string;
  closingDay?: number;
  dueDay?: number;
  createdAt: Date;
  updatedAt: Date;
}
