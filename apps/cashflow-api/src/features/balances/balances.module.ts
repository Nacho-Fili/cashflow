import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Balance } from "./models/balance.model";
import { BalancesService } from "./services/balances.service";
import { BalanceActivitySubscriber } from './models/balance-activity.subscriber';
import { CurrenciesModule } from "../currencies/currencies.module";

@Module({
    imports: [TypeOrmModule.forFeature([Balance]), CurrenciesModule],
    providers: [BalancesService, BalanceActivitySubscriber],
    exports: [BalancesService],
})
export class BalancesModule {}