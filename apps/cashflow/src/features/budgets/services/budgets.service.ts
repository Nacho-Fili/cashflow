import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from '../models/budget.model';
import { CreateBudgetDto } from '../dtos/create-budget.dto';
import { UpdateBudgetDto } from '../dtos/update-budget.dto';
import { BudgetMapper } from '../mappers/budget.mapper';
import { BudgetDto } from '../dtos/budget.dto';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
    private budgetMapper: BudgetMapper,
  ) {}

  async findAll(): Promise<BudgetDto[]> {
    const budgets = await this.budgetRepository.find({
      relations: ['category'],
    });
    return budgets.map(budget => this.budgetMapper.toDto(budget));
  }

  async findOne(id: string): Promise<BudgetDto> {
    const budget = await this.budgetRepository.findOne({ 
      where: { id },
      relations: ['category'],
    });
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return this.budgetMapper.toDto(budget);
  }

  async create(createBudgetDto: CreateBudgetDto): Promise<BudgetDto> {
    const budget = this.budgetMapper.toEntity(createBudgetDto);
    const savedBudget = await this.budgetRepository.save(budget);
    return this.budgetMapper.toDto(savedBudget);
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<BudgetDto> {
    const budget = await this.budgetRepository.findOne({ where: { id } });
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    
    const updatedBudget = this.budgetMapper.updateEntityFromDto(budget, updateBudgetDto);
    const savedBudget = await this.budgetRepository.save(updatedBudget);
    return this.budgetMapper.toDto(savedBudget);
  }

  async remove(id: string): Promise<void> {
    const budget = await this.budgetRepository.findOne({ where: { id } });
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    await this.budgetRepository.softDelete(id);
  }

  async findByCategory(categoryId: string): Promise<BudgetDto[]> {
    const budgets = await this.budgetRepository.find({
      where: { categoryId },
      relations: ['category'],
    });
    return budgets.map(budget => this.budgetMapper.toDto(budget));
  }

  async findByMonth(month: string): Promise<BudgetDto[]> {
    const budgets = await this.budgetRepository.find({
      where: [
        { month },
        { isRecurring: true }
      ],
      relations: ['category'],
    });
    return budgets.map(budget => this.budgetMapper.toDto(budget));
  }
}
