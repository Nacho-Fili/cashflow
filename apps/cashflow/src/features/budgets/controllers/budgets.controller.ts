import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BudgetsService } from '../services/budgets.service';
import { CreateBudgetDto } from '../dtos/create-budget.dto';
import { UpdateBudgetDto } from '../dtos/update-budget.dto';
import { BudgetDto } from '../dtos/budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  async findAll(@Query('categoryId') categoryId?: string, @Query('month') month?: string): Promise<BudgetDto[]> {
    if (categoryId) {
      return this.budgetsService.findByCategory(categoryId);
    }
    if (month) {
      return this.budgetsService.findByMonth(month);
    }
    return this.budgetsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BudgetDto> {
    return this.budgetsService.findOne(id);
  }

  @Post()
  async create(@Body() createBudgetDto: CreateBudgetDto): Promise<BudgetDto> {
    return this.budgetsService.create(createBudgetDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<BudgetDto> {
    return this.budgetsService.update(id, updateBudgetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.budgetsService.remove(id);
  }
}
