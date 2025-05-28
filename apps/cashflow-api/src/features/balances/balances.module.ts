import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Balance } from "./models/balance.model";
import { BalancesService } from "./services/balances.service";

@Module({
    imports: [TypeOrmModule.forFeature([Balance])],
    providers: [BalancesService],
    exports: [BalancesService],
})
export class BalancesModule {}