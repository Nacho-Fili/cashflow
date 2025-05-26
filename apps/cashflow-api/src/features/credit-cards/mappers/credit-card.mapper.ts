import { Injectable } from '@nestjs/common';
import { CreditCard } from '../models/credit-card.model';
import { CreditCardDto } from '../dtos/credit-card.dto';
import { CreateCreditCardDto } from '../dtos/create-credit-card.dto';
import { UpdateCreditCardDto } from '../dtos/update-credit-card.dto';

@Injectable()
export class CreditCardMapper {
  toEntity(createCreditCardDto: CreateCreditCardDto): CreditCard {
    const creditCard = new CreditCard();
    creditCard.name = createCreditCardDto.name;
    creditCard.lastFourDigits = createCreditCardDto.lastFourDigits;
    creditCard.bankId = createCreditCardDto.bankId;
    creditCard.creditLimit = createCreditCardDto.creditLimit;
    creditCard.cardType = createCreditCardDto.cardType;
    creditCard.closingDay = createCreditCardDto.closingDay;
    creditCard.dueDay = createCreditCardDto.dueDay;
    return creditCard;
  }

  toDto(creditCard: CreditCard): CreditCardDto {
    const creditCardDto = new CreditCardDto();
    creditCardDto.id = creditCard.id;
    creditCardDto.name = creditCard.name;
    creditCardDto.lastFourDigits = creditCard.lastFourDigits;
    creditCardDto.bankId = creditCard.bankId;
    creditCardDto.creditLimit = creditCard.creditLimit;
    creditCardDto.cardType = creditCard.cardType;
    creditCardDto.closingDay = creditCard.closingDay;
    creditCardDto.dueDay = creditCard.dueDay;
    creditCardDto.createdAt = creditCard.createdAt;
    creditCardDto.updatedAt = creditCard.updatedAt;
    return creditCardDto;
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
