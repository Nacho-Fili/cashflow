import { Injectable } from '@nestjs/common';
import { InvestmentAccount } from '../models/investment-account.model';
import { InvestmentAccountDto } from '../dtos/investment-account.dto';
import { CreateInvestmentAccountDto } from '../dtos/create-investment-account.dto';
import { UpdateInvestmentAccountDto } from '../dtos/update-investment-account.dto';

@Injectable()
export class InvestmentAccountMapper {
  toEntity(
    createInvestmentAccountDto: CreateInvestmentAccountDto,
  ): InvestmentAccount {
    const account = new InvestmentAccount();
    account.name = createInvestmentAccountDto.name;
    account.description = createInvestmentAccountDto.description;
    account.broker = createInvestmentAccountDto.broker;
    return account;
  }

  toDto(account: InvestmentAccount): InvestmentAccountDto {
    const accountDto = new InvestmentAccountDto();
    accountDto.id = account.id;
    accountDto.name = account.name;
    accountDto.description = account.description;
    accountDto.broker = account.broker;
    accountDto.createdAt = account.createdAt;
    accountDto.updatedAt = account.updatedAt;
    return accountDto;
  }

  updateEntityFromDto(
    account: InvestmentAccount,
    updateDto: UpdateInvestmentAccountDto,
  ): InvestmentAccount {
    if (updateDto.name !== undefined) {
      account.name = updateDto.name;
    }
    if (updateDto.description !== undefined) {
      account.description = updateDto.description;
    }
    if (updateDto.broker !== undefined) {
      account.broker = updateDto.broker;
    }
    return account;
  }
}
