import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExpensesService } from '../services/expenses.service';
import { CreateExpenseDto } from '../dtos/create-expense.dto';
import { UpdateExpenseDto } from '../dtos/update-expense.dto';
import { ExpenseDto } from '../dtos/expense.dto';
import { ExpenseType } from '../models/expense.model';
import { Type } from 'class-transformer';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('creditCardId') creditCardId?: string,
    @Query('type') type?: ExpenseType,
    @Query('startDate') @Type(() => Date) startDate?: Date,
    @Query('endDate') @Type(() => Date) endDate?: Date,
  ): Promise<ExpenseDto[]> {
    if (categoryId) {
      return this.expensesService.findByCategory(categoryId);
    }
    if (creditCardId) {
      return this.expensesService.findByCreditCard(creditCardId);
    }
    if (type) {
      return this.expensesService.findByType(type);
    }
    if (startDate && endDate) {
      return this.expensesService.findByDateRange(startDate, endDate);
    }
    return this.expensesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ExpenseDto> {
    return this.expensesService.findOne(id);
  }

  @Post()
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseDto> {
    return this.expensesService.create(createExpenseDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseDto> {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.expensesService.remove(id);
  }
}
