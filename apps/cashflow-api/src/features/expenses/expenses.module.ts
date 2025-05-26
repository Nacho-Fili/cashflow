import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesController } from './controllers/expenses.controller';
import { ExpensesService } from './services/expenses.service';
import { Expense } from './models/expense.model';
import { ExpenseMapper } from './mappers/expense.mapper';
import { CategoriesModule } from '../categories/categories.module';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    CategoriesModule,
    CreditCardsModule,
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService, ExpenseMapper],
  exports: [ExpensesService],
})
export class ExpensesModule {}
