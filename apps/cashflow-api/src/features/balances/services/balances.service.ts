import { Injectable } from "@nestjs/common";
import { CurrenciesService } from "../../currencies/services/currencies.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Balance } from "../models/balance.model";
import { Repository } from "typeorm";
import { Currency } from "../../currencies/models/currency.model";

@Injectable()
export class BalancesService {
    constructor(
        @InjectRepository(Balance)
        private readonly balanceRepository: Repository<Balance>,
        private readonly currenciesService: CurrenciesService
    ) {}

    async create(currencyCode: string) {
        const currency = await this.currenciesService.findByCode(currencyCode);
        if (!currency) {
            throw new Error(`Currency with code ${currencyCode} not found`);
        }
        
        return this.balanceRepository.save(new Balance({
            amount: 0,
            currency: new Currency({ id: currency.id }),
        }));
    }
}