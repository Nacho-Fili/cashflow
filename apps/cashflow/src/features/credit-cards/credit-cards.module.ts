import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardsController } from './controllers/credit-cards.controller';
import { CreditCardsService } from './services/credit-cards.service';
import { CreditCard } from './models/credit-card.model';
import { CreditCardMapper } from './mappers/credit-card.mapper';
import { BanksModule } from '../banks/banks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditCard]),
    BanksModule,
  ],
  controllers: [CreditCardsController],
  providers: [CreditCardsService, CreditCardMapper],
  exports: [CreditCardsService],
})
export class CreditCardsModule {}
