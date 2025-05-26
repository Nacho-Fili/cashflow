import { Injectable } from '@nestjs/common';
import { Currency } from '../models/currency.model';
import { CurrencyDto } from '../dtos/currency.dto';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';

@Injectable()
export class CurrencyMapper {
  toEntity(createCurrencyDto: CreateCurrencyDto): Currency {
    const currency = new Currency();
    currency.code = createCurrencyDto.code;
    currency.name = createCurrencyDto.name;
    currency.symbol = createCurrencyDto.symbol;
    return currency;
  }

  toDto(currency: Currency): CurrencyDto {
    const currencyDto = new CurrencyDto();
    currencyDto.id = currency.id;
    currencyDto.code = currency.code;
    currencyDto.name = currency.name;
    currencyDto.symbol = currency.symbol;
    currencyDto.createdAt = currency.createdAt;
    currencyDto.updatedAt = currency.updatedAt;
    return currencyDto;
  }

  updateEntityFromDto(currency: Currency, updateCurrencyDto: UpdateCurrencyDto): Currency {
    if (updateCurrencyDto.code !== undefined) {
      currency.code = updateCurrencyDto.code;
    }
    if (updateCurrencyDto.name !== undefined) {
      currency.name = updateCurrencyDto.name;
    }
    if (updateCurrencyDto.symbol !== undefined) {
      currency.symbol = updateCurrencyDto.symbol;
    }
    return currency;
  }
}
