import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansController } from './controllers/loans.controller';
import { LoansService } from './services/loans.service';
import { Loan } from './models/loan.model';
import { LoanMapper } from './mappers/loan.mapper';
import { BanksModule } from '../banks/banks.module';
import { CurrenciesModule } from '../currencies/currencies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]),
    BanksModule,
    CurrenciesModule,
  ],
  controllers: [LoansController],
  providers: [LoansService, LoanMapper],
  exports: [LoansService],
})
export class LoansModule {}
