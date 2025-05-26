import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomesController } from './controllers/incomes.controller';
import { IncomeSourcesController } from './controllers/income-sources.controller';
import { IncomesService } from './services/incomes.service';
import { IncomeSourcesService } from './services/income-sources.service';
import { Income } from './models/income.model';
import { IncomeSource } from './models/income-source.model';
import { IncomeMapper } from './mappers/income.mapper';
import { IncomeSourceMapper } from './mappers/income-source.mapper';
import { CurrenciesModule } from '../currencies/currencies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Income, IncomeSource]), CurrenciesModule],
  controllers: [IncomesController, IncomeSourcesController],
  providers: [
    IncomesService,
    IncomeSourcesService,
    IncomeMapper,
    IncomeSourceMapper,
  ],
  exports: [IncomesService, IncomeSourcesService],
})
export class IncomesModule {}
