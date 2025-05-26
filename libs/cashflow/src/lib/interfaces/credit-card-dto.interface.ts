export interface ICreditCardDto {
  id: string;
  name: string;
  description?: string;
  limit: number;
  currentBalance: number;
  bankId: string;
  bank?: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
