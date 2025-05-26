import { Injectable } from '@nestjs/common';
import { Bank } from '../models/bank.model';
import { BankDto } from '../dtos/bank.dto';
import { CreateBankDto } from '../dtos/create-bank.dto';
import { UpdateBankDto } from '../dtos/update-bank.dto';
import { Balance } from '../models/balance.model';
import { CreateBalanceDto } from '../dtos/create-balance.dto';
import { Currency } from '../../currencies/models/currency.model';
import { BalanceDto } from '../dtos/balance.dto';

@Injectable()
export class BankMapper {
  toEntity(createBankDto: CreateBankDto): Bank {
    const bank = new Bank();
    bank.name = createBankDto.name;
    bank.description = createBankDto.description;
    return bank;
  }

  toDto(bank: Bank): BankDto {
    const bankDto = new BankDto();
    bankDto.id = bank.id;
    bankDto.name = bank.name;
    bankDto.description = bank.description;
    bankDto.createdAt = bank.createdAt;
    bankDto.updatedAt = bank.updatedAt;
    return bankDto;
  }

  updateEntityFromDto(bank: Bank, updateBankDto: UpdateBankDto): Bank {
    if (updateBankDto.name !== undefined) {
      bank.name = updateBankDto.name;
    }
    if (updateBankDto.description !== undefined) {
      bank.description = updateBankDto.description;
    }
    return bank;
  }

  toBalanceEntity(createBalanceDto: CreateBalanceDto): Balance {
    return new Balance({
      amount: createBalanceDto.amount || 0,
      currency: new Currency({ id: createBalanceDto.currencyId }),
    });
  }

  toBalanceDto(createBalanceModel: Balance): BalanceDto {
    return new BalanceDto({
      id: createBalanceModel.id,
      amount: createBalanceModel.amount,
      currency: {
        symbol: createBalanceModel.currency.symbol,
        name: createBalanceModel.currency.name,
        code: createBalanceModel.currency.code,
      },
      createdAt: createBalanceModel.createdAt,
      updatedAt: createBalanceModel.updatedAt,
    });
  }
}
