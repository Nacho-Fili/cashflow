import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardsController } from './controllers/credit-cards.controller';
import { CreditCardsService } from './services/credit-cards.service';
import { CreditCard } from './models/credit-card.model';
import { CreditCardMapper } from './mappers/credit-card.mapper';
import { BanksModule } from '../banks/banks.module';
import { CreditCardPeriod } from './models/credit-card-period.model';
import { CreditCardPeriodService } from './services/credit-card-period.service';
import { CreditCardPeriodMapper } from './mappers/credit-card-period.mapper';
import { CreditCardPeriodController } from './controllers/credit-card-period.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard, CreditCardPeriod]), BanksModule],
  controllers: [CreditCardsController, CreditCardPeriodController],
  providers: [CreditCardsService, CreditCardMapper, CreditCardPeriodService, CreditCardPeriodMapper],
  exports: [CreditCardsService, CreditCardMapper, CreditCardPeriodService, CreditCardPeriodMapper],
})
export class CreditCardsModule {}
