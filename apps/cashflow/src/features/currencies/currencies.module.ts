import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesController } from './controllers/currencies.controller';
import { CurrenciesService } from './services/currencies.service';
import { Currency } from './models/currency.model';
import { CurrencyMapper } from './mappers/currency.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Currency]),
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, CurrencyMapper],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
