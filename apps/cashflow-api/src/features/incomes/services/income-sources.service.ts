import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeSource } from '../models/income-source.model';
import { CreateIncomeSourceDto } from '../dtos/create-income-source.dto';
import { UpdateIncomeSourceDto } from '../dtos/update-income-source.dto';
import { IncomeSourceMapper } from '../mappers/income-source.mapper';
import { IncomeSourceDto } from '../dtos/income-source.dto';

@Injectable()
export class IncomeSourcesService {
  constructor(
    @InjectRepository(IncomeSource)
    private incomeSourceRepository: Repository<IncomeSource>,
    private incomeSourceMapper: IncomeSourceMapper,
  ) {}

  async findAll(): Promise<IncomeSourceDto[]> {
    const incomeSources = await this.incomeSourceRepository.find();
    return incomeSources.map((source) => this.incomeSourceMapper.toDto(source));
  }

  async findOne(id: string): Promise<IncomeSourceDto> {
    const incomeSource = await this.incomeSourceRepository.findOne({
      where: { id },
    });
    if (!incomeSource) {
      throw new NotFoundException(`Income Source with ID ${id} not found`);
    }
    return this.incomeSourceMapper.toDto(incomeSource);
  }

  async create(
    createIncomeSourceDto: CreateIncomeSourceDto,
  ): Promise<IncomeSourceDto> {
    const incomeSource = this.incomeSourceMapper.toEntity(
      createIncomeSourceDto,
    );
    const savedIncomeSource =
      await this.incomeSourceRepository.save(incomeSource);
    return this.incomeSourceMapper.toDto(savedIncomeSource);
  }

  async update(
    id: string,
    updateIncomeSourceDto: UpdateIncomeSourceDto,
  ): Promise<IncomeSourceDto> {
    const incomeSource = await this.incomeSourceRepository.findOne({
      where: { id },
    });
    if (!incomeSource) {
      throw new NotFoundException(`Income Source with ID ${id} not found`);
    }

    const updatedIncomeSource = this.incomeSourceMapper.updateEntityFromDto(
      incomeSource,
      updateIncomeSourceDto,
    );
    const savedIncomeSource =
      await this.incomeSourceRepository.save(updatedIncomeSource);
    return this.incomeSourceMapper.toDto(savedIncomeSource);
  }

  async remove(id: string): Promise<void> {
    const incomeSource = await this.incomeSourceRepository.findOne({
      where: { id },
    });
    if (!incomeSource) {
      throw new NotFoundException(`Income Source with ID ${id} not found`);
    }
    await this.incomeSourceRepository.softDelete(id);
  }
}
