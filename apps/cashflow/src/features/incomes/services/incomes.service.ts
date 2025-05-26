import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Income } from '../models/income.model';
import { CreateIncomeDto } from '../dtos/create-income.dto';
import { UpdateIncomeDto } from '../dtos/update-income.dto';
import { IncomeMapper } from '../mappers/income.mapper';
import { IncomeDto } from '../dtos/income.dto';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
    private incomeMapper: IncomeMapper,
  ) {}

  async findAll(): Promise<IncomeDto[]> {
    const incomes = await this.incomeRepository.find({
      relations: ['source', 'currency'],
    });
    return incomes.map(income => this.incomeMapper.toDto(income));
  }

  async findOne(id: string): Promise<IncomeDto> {
    const income = await this.incomeRepository.findOne({ 
      where: { id },
      relations: ['source', 'currency'],
    });
    if (!income) {
      throw new NotFoundException(`Income with ID ${id} not found`);
    }
    return this.incomeMapper.toDto(income);
  }

  async create(createIncomeDto: CreateIncomeDto): Promise<IncomeDto> {
    const income = this.incomeMapper.toEntity(createIncomeDto);
    const savedIncome = await this.incomeRepository.save(income);
    return this.incomeMapper.toDto(savedIncome);
  }

  async update(id: string, updateIncomeDto: UpdateIncomeDto): Promise<IncomeDto> {
    const income = await this.incomeRepository.findOne({ where: { id } });
    if (!income) {
      throw new NotFoundException(`Income with ID ${id} not found`);
    }
    
    const updatedIncome = this.incomeMapper.updateEntityFromDto(income, updateIncomeDto);
    const savedIncome = await this.incomeRepository.save(updatedIncome);
    return this.incomeMapper.toDto(savedIncome);
  }

  async remove(id: string): Promise<void> {
    const income = await this.incomeRepository.findOne({ where: { id } });
    if (!income) {
      throw new NotFoundException(`Income with ID ${id} not found`);
    }
    await this.incomeRepository.softDelete(id);
  }

  async findBySource(sourceId: string): Promise<IncomeDto[]> {
    const incomes = await this.incomeRepository.find({
      where: { sourceId },
      relations: ['source', 'currency'],
    });
    return incomes.map(income => this.incomeMapper.toDto(income));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<IncomeDto[]> {
    const incomes = await this.incomeRepository.find({
      where: { date: Between(startDate, endDate) },
      relations: ['source', 'currency'],
    });
    return incomes.map(income => this.incomeMapper.toDto(income));
  }

  async findRecurring(): Promise<IncomeDto[]> {
    const incomes = await this.incomeRepository.find({
      where: { isRecurring: true },
      relations: ['source', 'currency'],
    });
    return incomes.map(income => this.incomeMapper.toDto(income));
  }
}
