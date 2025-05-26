import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BanksModule } from '../features/banks/banks.module';
import { BudgetsModule } from '../features/budgets/budgets.module';
import { CategoriesModule } from '../features/categories/categories.module';
import { CreditCardsModule } from '../features/credit-cards/credit-cards.module';
import { CurrenciesModule } from '../features/currencies/currencies.module';
import { ExpensesModule } from '../features/expenses/expenses.module';
import { IncomesModule } from '../features/incomes/incomes.module';
import { InvestmentsModule } from '../features/investments/investments.module';
import { LoansModule } from '../features/loans/loans.module';
import { StocksModule } from '../features/stocks/stocks.module';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../config/database.module';

const featureModules = [
  BanksModule,
  BudgetsModule,
  CategoriesModule,
  CreditCardsModule,
  CurrenciesModule,
  ExpensesModule,
  IncomesModule,
  InvestmentsModule,
  LoansModule,
  StocksModule,
];

@Module({
  imports: [ConfigModule, DatabaseModule, ...featureModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
