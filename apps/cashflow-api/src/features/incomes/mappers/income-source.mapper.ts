import { Injectable } from '@nestjs/common';
import { IncomeSource } from '../models/income-source.model';
import { IncomeSourceDto } from '../dtos/income-source.dto';
import { CreateIncomeSourceDto } from '../dtos/create-income-source.dto';
import { UpdateIncomeSourceDto } from '../dtos/update-income-source.dto';

@Injectable()
export class IncomeSourceMapper {
  toEntity(createIncomeSourceDto: CreateIncomeSourceDto): IncomeSource {
    const incomeSource = new IncomeSource();
    incomeSource.name = createIncomeSourceDto.name;
    incomeSource.description = createIncomeSourceDto.description;
    return incomeSource;
  }

  toDto(incomeSource: IncomeSource): IncomeSourceDto {
    const incomeSourceDto = new IncomeSourceDto();
    incomeSourceDto.id = incomeSource.id;
    incomeSourceDto.name = incomeSource.name;
    incomeSourceDto.description = incomeSource.description;
    incomeSourceDto.createdAt = incomeSource.createdAt;
    incomeSourceDto.updatedAt = incomeSource.updatedAt;
    return incomeSourceDto;
  }

  updateEntityFromDto(
    incomeSource: IncomeSource,
    updateIncomeSourceDto: UpdateIncomeSourceDto,
  ): IncomeSource {
    if (updateIncomeSourceDto.name !== undefined) {
      incomeSource.name = updateIncomeSourceDto.name;
    }
    if (updateIncomeSourceDto.description !== undefined) {
      incomeSource.description = updateIncomeSourceDto.description;
    }
    return incomeSource;
  }
}
