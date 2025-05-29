import { Injectable } from '@nestjs/common';
import { Income } from '../models/income.model';
import { IncomeDto } from '../dtos/income.dto';
import { CreateIncomeDto } from '../dtos/create-income.dto';
import { UpdateIncomeDto } from '../dtos/update-income.dto';
import { Balance } from '../../balances/models/balance.model';

@Injectable()
export class IncomeMapper {
  toEntity(createIncomeDto: CreateIncomeDto): Income {
    const income = new Income();
    income.description = createIncomeDto.description;
    income.amount = createIncomeDto.amount;
    income.date = createIncomeDto.date;
    income.sourceId = createIncomeDto.sourceId;
    income.isRecurring = createIncomeDto.isRecurring ?? false;
    if (createIncomeDto.currencyId) {
      // Asume que hay una relación ManyToOne con Currency
      income.currency = { id: createIncomeDto.currencyId } as any;
    }
    if (createIncomeDto.balanceId) {
      income.balance = new Balance({ id: createIncomeDto.balanceId });
    }
    return income;
  }

  toDto(income: Income): IncomeDto {
    const incomeDto = new IncomeDto();
    incomeDto.id = income.id;
    incomeDto.description = income.description;
    incomeDto.amount = income.amount;
    incomeDto.date = income.date;
    incomeDto.sourceId = income.sourceId;
    incomeDto.isRecurring = income.isRecurring;
    incomeDto.currencyId = income.currency?.id;
    incomeDto.balanceId = income.balance?.id;
    incomeDto.createdAt = income.createdAt;
    incomeDto.updatedAt = income.updatedAt;
    return incomeDto;
  }

  updateEntityFromDto(
    income: Income,
    updateIncomeDto: UpdateIncomeDto,
  ): Income {
    if (updateIncomeDto.description !== undefined) {
      income.description = updateIncomeDto.description;
    }
    if (updateIncomeDto.amount !== undefined) {
      income.amount = updateIncomeDto.amount;
    }
    if (updateIncomeDto.date !== undefined) {
      income.date = updateIncomeDto.date;
    }
    if (updateIncomeDto.sourceId !== undefined) {
      income.sourceId = updateIncomeDto.sourceId;
    }
    if (updateIncomeDto.isRecurring !== undefined) {
      income.isRecurring = updateIncomeDto.isRecurring;
    }
    if (updateIncomeDto.currencyId !== undefined) {
      income.currency = { id: updateIncomeDto.currencyId } as any;
    }
    if (updateIncomeDto.balanceId !== undefined) {
      income.balance = new Balance({ id: updateIncomeDto.balanceId });
    }
    return income;
  }
}
