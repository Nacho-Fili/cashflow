import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksController } from './controllers/stocks.controller';
import { StocksService } from './services/stocks.service';
import { Stock } from './models/stock.model';
import { StockMapper } from './mappers/stock.mapper';
import { InvestmentsModule } from '../investments/investments.module';
import { CurrenciesModule } from '../currencies/currencies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    InvestmentsModule,
    CurrenciesModule,
  ],
  controllers: [StocksController],
  providers: [StocksService, StockMapper],
  exports: [StocksService],
})
export class StocksModule {}
