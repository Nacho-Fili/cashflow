import { Injectable } from '@nestjs/common';
import { Balance } from '../../balances/balance.model';
import { Bank } from '../models/bank.model';
import { Currency } from '../../currencies/models/currency.model';

@Injectable()
export class BalanceMapper {
  toEntity(amount: number, currency: Currency, bank: Bank): Balance {
    const balance = new Balance();
    balance.amount = amount;
    balance.currency = currency;
    balance.bank = bank;
    return balance;
  }

  toDto(balance: Balance) {
    return {
      id: balance.id,
      amount: balance.amount,
      bankId: balance.bank?.id,
      currencyId: balance.currency?.id,
      currencyCode: balance.currency?.code,
      createdAt: balance.createdAt,
      updatedAt: balance.updatedAt,
    };
  }

  updateEntityFromDto(
    balance: Balance,
    amount: number,
    currency?: Currency,
  ): Balance {
    if (amount !== undefined) {
      balance.amount = amount;
    }
    if (currency) {
      balance.currency = currency;
    }
    return balance;
  }
}
