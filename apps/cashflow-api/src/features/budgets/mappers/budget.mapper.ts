import { Injectable } from '@nestjs/common';
import { Budget } from '../models/budget.model';
import { BudgetDto } from '../dtos/budget.dto';
import { CreateBudgetDto } from '../dtos/create-budget.dto';
import { UpdateBudgetDto } from '../dtos/update-budget.dto';
import { Category } from '../../categories/models/category.model';

@Injectable()
export class BudgetMapper {
  toEntity(createBudgetDto: CreateBudgetDto): Budget {
    const budget = new Budget();
    budget.name = createBudgetDto.name;
    budget.amount = createBudgetDto.amount;
    budget.category = new Category({ id: createBudgetDto.categoryId });
    budget.month = createBudgetDto.month;
    budget.isRecurring = createBudgetDto.isRecurring ?? false;
    return budget;
  }

  toDto(budget: Budget): BudgetDto {
    const budgetDto = new BudgetDto();
    budgetDto.id = budget.id;
    budgetDto.name = budget.name;
    budgetDto.amount = budget.amount;
    budgetDto.categoryId = budget.category?.id;
    budgetDto.month = budget.month;
    budgetDto.isRecurring = budget.isRecurring;
    budgetDto.createdAt = budget.createdAt;
    budgetDto.updatedAt = budget.updatedAt;
    return budgetDto;
  }

  updateEntityFromDto(
    budget: Budget,
    updateBudgetDto: UpdateBudgetDto,
  ): Budget {
    if (updateBudgetDto.name !== undefined) {
      budget.name = updateBudgetDto.name;
    }
    if (updateBudgetDto.amount !== undefined) {
      budget.amount = updateBudgetDto.amount;
    }
    if (updateBudgetDto.categoryId !== undefined) {
      budget.category = new Category({ id: updateBudgetDto.categoryId });
    }
    if (updateBudgetDto.month !== undefined) {
      budget.month = updateBudgetDto.month;
    }
    if (updateBudgetDto.isRecurring !== undefined) {
      budget.isRecurring = updateBudgetDto.isRecurring;
    }
    return budget;
  }
}
