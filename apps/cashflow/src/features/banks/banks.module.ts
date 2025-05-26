import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksController } from './controllers/banks.controller';
import { BanksService } from './services/banks.service';
import { Bank } from './models/bank.model';
import { Balance } from './models/balance.model';
import { BankMapper } from './mappers/bank.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bank, Balance]),
  ],
  controllers: [BanksController],
  providers: [BanksService, BankMapper],
  exports: [BanksService],
})
export class BanksModule {}
