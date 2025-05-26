import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetsController } from './controllers/budgets.controller';
import { BudgetsService } from './services/budgets.service';
import { Budget } from './models/budget.model';
import { BudgetMapper } from './mappers/budget.mapper';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Budget]), CategoriesModule],
  controllers: [BudgetsController],
  providers: [BudgetsService, BudgetMapper],
  exports: [BudgetsService],
})
export class BudgetsModule {}
