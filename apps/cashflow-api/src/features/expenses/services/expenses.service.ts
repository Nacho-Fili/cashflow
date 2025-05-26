import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Expense, ExpenseType } from '../models/expense.model';
import { CreateExpenseDto } from '../dtos/create-expense.dto';
import { UpdateExpenseDto } from '../dtos/update-expense.dto';
import { ExpenseMapper } from '../mappers/expense.mapper';
import { ExpenseDto } from '../dtos/expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    private expenseMapper: ExpenseMapper,
  ) {}

  async findAll(): Promise<ExpenseDto[]> {
    const expenses = await this.expenseRepository.find({
      relations: ['category', 'creditCard'],
    });
    return expenses.map((expense) => this.expenseMapper.toDto(expense));
  }

  async findOne(id: string): Promise<ExpenseDto> {
    const expense = await this.expenseRepository.findOne({
      where: { id },
      relations: ['category', 'creditCard'],
    });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return this.expenseMapper.toDto(expense);
  }

  async create(createExpenseDto: CreateExpenseDto): Promise<ExpenseDto> {
    const expense = this.expenseMapper.toEntity(createExpenseDto);
    const savedExpense = await this.expenseRepository.save(expense);
    return this.expenseMapper.toDto(savedExpense);
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseDto> {
    const expense = await this.expenseRepository.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    const updatedExpense = this.expenseMapper.updateEntityFromDto(
      expense,
      updateExpenseDto,
    );
    const savedExpense = await this.expenseRepository.save(updatedExpense);
    return this.expenseMapper.toDto(savedExpense);
  }

  async remove(id: string): Promise<void> {
    const expense = await this.expenseRepository.findOne({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    await this.expenseRepository.softDelete(id);
  }

  async findByCategory(categoryId: string): Promise<ExpenseDto[]> {
    const expenses = await this.expenseRepository.find({
      where: { categoryId },
      relations: ['category', 'creditCard'],
    });
    return expenses.map((expense) => this.expenseMapper.toDto(expense));
  }

  async findByCreditCard(creditCardId: string): Promise<ExpenseDto[]> {
    const expenses = await this.expenseRepository.find({
      where: { creditCardId },
      relations: ['category', 'creditCard'],
    });
    return expenses.map((expense) => this.expenseMapper.toDto(expense));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<ExpenseDto[]> {
    const expenses = await this.expenseRepository.find({
      where: { date: Between(startDate, endDate) },
      relations: ['category', 'creditCard'],
    });
    return expenses.map((expense) => this.expenseMapper.toDto(expense));
  }

  async findByType(type: ExpenseType): Promise<ExpenseDto[]> {
    const expenses = await this.expenseRepository.find({
      where: { type },
      relations: ['category', 'creditCard'],
    });
    return expenses.map((expense) => this.expenseMapper.toDto(expense));
  }
}
