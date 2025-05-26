import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentsController } from './controllers/investments.controller';
import { InvestmentsService } from './services/investments.service';
import { InvestmentAccount } from './models/investment-account.model';
import { InvestmentAccountMapper } from './mappers/investment-account.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvestmentAccount]),
  ],
  controllers: [InvestmentsController],
  providers: [InvestmentsService, InvestmentAccountMapper],
  exports: [InvestmentsService],
})
export class InvestmentsModule {}
