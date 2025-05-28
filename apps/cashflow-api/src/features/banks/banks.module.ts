import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksController } from './controllers/banks.controller';
import { BanksService } from './services/banks.service';
import { Bank } from './models/bank.model';
import { Balance } from '../balances/models/balance.model';
import { BankMapper } from './mappers/bank.mapper';
import { CurrenciesModule } from '../currencies/currencies.module';
import { BalancesModule } from '../balances/balances.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bank, Balance]),
    CurrenciesModule,
    BalancesModule
  ],
  controllers: [BanksController],
  providers: [BanksService, BankMapper],
  exports: [BanksService],
})
export class BanksModule {}
