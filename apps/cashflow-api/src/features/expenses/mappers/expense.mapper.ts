import { Injectable } from '@nestjs/common';
import { Expense, ExpenseType } from '../models/expense.model';
import { ExpenseDto } from '../dtos/expense.dto';
import { CreateExpenseDto } from '../dtos/create-expense.dto';
import { UpdateExpenseDto } from '../dtos/update-expense.dto';
import { CreditCard } from '../../credit-cards/models/credit-card.model';
import { Balance } from '../../balances/models/balance.model';

@Injectable()
export class ExpenseMapper {
  toEntity(createExpenseDto: CreateExpenseDto): Expense {
    const expense = new Expense();
    expense.description = createExpenseDto.description;
    expense.amount = createExpenseDto.amount;
    expense.type = createExpenseDto.type;
    expense.date = createExpenseDto.date;
    if (createExpenseDto.creditCardId) {
      expense.creditCard = new CreditCard({ id: createExpenseDto.creditCardId });
    }
    if (createExpenseDto.balanceId) {
      expense.balance = new Balance({ id: createExpenseDto.balanceId });
    }
    expense.categoryId = createExpenseDto.categoryId;

    // Set fields based on expense type
    if (expense.type === ExpenseType.INSTALLMENT) {
      if (createExpenseDto.totalInstallments) {
        expense.totalInstallments = createExpenseDto.totalInstallments;
      }
      expense.currentInstallment = createExpenseDto.currentInstallment || 1;
      expense.startDate = createExpenseDto.startDate || expense.date;
      if (createExpenseDto.endDate) {
        expense.endDate = createExpenseDto.endDate;
      }
    } else if (expense.type === ExpenseType.SUBSCRIPTION) {
      expense.isRecurring = true;
      expense.startDate = createExpenseDto.startDate || expense.date;
    } else {
      expense.isRecurring = false;
    }

    return expense;
  }

  toDto(expense: Expense): ExpenseDto {
    const expenseDto = new ExpenseDto();
    expenseDto.id = expense.id;
    expenseDto.description = expense.description;
    expenseDto.amount = expense.amount;
    expenseDto.type = expense.type;
    expenseDto.date = expense.date;
    expenseDto.creditCardId = expense.creditCard?.id;
    expenseDto.balanceId = expense.balance?.id;
    expenseDto.categoryId = expense.categoryId;
    expenseDto.totalInstallments = expense.totalInstallments;
    expenseDto.currentInstallment = expense.currentInstallment;
    expenseDto.startDate = expense.startDate;
    expenseDto.endDate = expense.endDate;
    expenseDto.isRecurring = expense.isRecurring;
    expenseDto.createdAt = expense.createdAt;
    expenseDto.updatedAt = expense.updatedAt;
    return expenseDto;
  }

  updateEntityFromDto(
    expense: Expense,
    updateExpenseDto: UpdateExpenseDto,
  ): Expense {
    if (updateExpenseDto.description !== undefined) {
      expense.description = updateExpenseDto.description;
    }
    if (updateExpenseDto.amount !== undefined) {
      expense.amount = updateExpenseDto.amount;
    }
    if (updateExpenseDto.date !== undefined) {
      expense.date = updateExpenseDto.date;
    }
    if (updateExpenseDto.creditCardId !== undefined) {
      expense.creditCard = new CreditCard({ id: updateExpenseDto.creditCardId });
    }
    if (updateExpenseDto.categoryId !== undefined) {
      expense.categoryId = updateExpenseDto.categoryId;
    }

    // Handle type-specific fields
    if (
      updateExpenseDto.type !== undefined &&
      updateExpenseDto.type !== expense.type
    ) {
      expense.type = updateExpenseDto.type;

      // Reset type-specific fields when changing type
      if (expense.type === ExpenseType.INSTALLMENT) {
        expense.isRecurring = false;
        if (updateExpenseDto.totalInstallments) {
          expense.totalInstallments = updateExpenseDto.totalInstallments
        };
        expense.currentInstallment = updateExpenseDto.currentInstallment ?? 1;
        expense.startDate = updateExpenseDto.startDate || expense.date;
        if (updateExpenseDto.endDate) {
          expense.endDate = updateExpenseDto.endDate;
        }
      } else if (expense.type === ExpenseType.SUBSCRIPTION) {
        expense.isRecurring = true;
        expense.totalInstallments = null;
        expense.currentInstallment = null;
        expense.startDate = updateExpenseDto.startDate || expense.date;
        expense.endDate = null;
      } else {
        expense.isRecurring = false;
        expense.totalInstallments = null;
        expense.currentInstallment = null;
        expense.startDate = null;
        expense.endDate = null;
      }
    } else {
      // Update type-specific fields without changing type
      if (expense.type === ExpenseType.INSTALLMENT) {
        if (updateExpenseDto.totalInstallments !== undefined) {
          expense.totalInstallments = updateExpenseDto.totalInstallments;
        }
        if (updateExpenseDto.currentInstallment !== undefined) {
          expense.currentInstallment = updateExpenseDto.currentInstallment;
        }
        if (updateExpenseDto.startDate !== undefined) {
          expense.startDate = updateExpenseDto.startDate;
        }
        if (updateExpenseDto.endDate !== undefined) {
          expense.endDate = updateExpenseDto.endDate;
        }
      } else if (expense.type === ExpenseType.SUBSCRIPTION) {
        if (updateExpenseDto.startDate !== undefined) {
          expense.startDate = updateExpenseDto.startDate;
        }
        if (updateExpenseDto.isRecurring !== undefined) {
          expense.isRecurring = updateExpenseDto.isRecurring;
        }
      }
    }

    return expense;
  }
}
