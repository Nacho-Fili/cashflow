import { Injectable } from '@nestjs/common';
import { CreditCardPeriod } from '../models/credit-card-period.model';
import { CreditCardPeriodDto } from '../dtos/credit-card-period.dto';
import { CreateCreditCardPeriodDto } from '../dtos/create-credit-card-period.dto';
import { CreditCard } from '../models/credit-card.model';

@Injectable()
export class CreditCardPeriodMapper {
  toEntity(dto: CreateCreditCardPeriodDto): CreditCardPeriod {
    const period = new CreditCardPeriod();
    period.closingDate = dto.closingDate;
    period.dueDate = dto.dueDate;
    period.creditCard = new CreditCard({ id: dto.creditCardId });
    return period;
  }

  toDto(entity: CreditCardPeriod): CreditCardPeriodDto {
    return {
      id: entity.id,
      closingDate: entity.closingDate,
      dueDate: entity.dueDate,
      creditCardId: entity.creditCard?.id,
      expenses: entity.expenses?.map((e) => ({
        id: e.id,
        description: e.description,
        amount: e.amount,
        type: e.type,
        date: e.date,
        categoryId: e.categoryId,
        totalInstallments: e.totalInstallments,
        currentInstallment: e.currentInstallment,
        startDate: e.startDate,
        endDate: e.endDate,
        isRecurring: e.isRecurring,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
        balanceId: e.balance?.id,
        creditCardPeriodId: e.creditCardPeriod?.id
      }))
    };
  }
}
