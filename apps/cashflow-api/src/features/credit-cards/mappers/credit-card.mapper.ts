import { Injectable } from '@nestjs/common';
import { CreditCard } from '../models/credit-card.model';
import { CreateCreditCardDto } from '../dtos/create-credit-card.dto';
import { UpdateCreditCardDto } from '../dtos/update-credit-card.dto';
import { CreditCardPeriodSummaryDto, CreditCardPeriodDto } from '../dtos/credit-card-period.dto';
import { Bank } from '../../banks/models/bank.model';
import { CreditCardDto } from '../dtos/credit-card.dto';

@Injectable()
export class CreditCardMapper {
  toEntity(createCreditCardDto: CreateCreditCardDto): CreditCard {
    const creditCard = new CreditCard({});
    creditCard.name = createCreditCardDto.name;
    creditCard.lastFourDigits = createCreditCardDto.lastFourDigits;
    creditCard.bank = new Bank({ id: createCreditCardDto.bankId });
    creditCard.creditLimit = createCreditCardDto.creditLimit;
    return creditCard;
  }

  toDto(card: CreditCard, summary: boolean = false): any {
    const dto: any = {
      id: card.id,
      name: card.name,
      lastFourDigits: card.lastFourDigits,
      creditLimit: card.creditLimit,
      bankId: card.bank?.id,
    };
    if (card.periods) {
      if (summary) {
        dto.periods = card.periods.map(period => ({
          id: period.id,
          closingDate: period.closingDate,
          dueDate: period.dueDate,
          amount: (period.expenses || []).reduce((sum, e) => sum + Number(e.amount), 0)
        }) as CreditCardPeriodSummaryDto);
      } else {
        dto.periods = card.periods.map(period => ({
          id: period.id,
          closingDate: period.closingDate,
          dueDate: period.dueDate,
          creditCardId: period.creditCard?.id,
          expenses: period.expenses || []
        }) as CreditCardPeriodDto);
      }
    }
    return dto as CreditCardDto;
  }

  updateEntityFromDto(
    creditCard: CreditCard,
    updateCreditCardDto: UpdateCreditCardDto,
  ): CreditCard {
    if (updateCreditCardDto.name !== undefined) {
      creditCard.name = updateCreditCardDto.name;
    }
    if (updateCreditCardDto.lastFourDigits !== undefined) {
      creditCard.lastFourDigits = updateCreditCardDto.lastFourDigits;
    }
    if (updateCreditCardDto.bankId !== undefined) {
      creditCard.bankId = updateCreditCardDto.bankId;
    }
    if (updateCreditCardDto.creditLimit !== undefined) {
      creditCard.creditLimit = updateCreditCardDto.creditLimit;
    }
    if (updateCreditCardDto.cardType !== undefined) {
      creditCard.cardType = updateCreditCardDto.cardType;
    }
    if (updateCreditCardDto.closingDay !== undefined) {
      creditCard.closingDay = updateCreditCardDto.closingDay;
    }
    if (updateCreditCardDto.dueDay !== undefined) {
      creditCard.dueDay = updateCreditCardDto.dueDay;
    }
    return creditCard;
  }
}
