import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from '../models/currency.model';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';
import { CurrencyMapper } from '../mappers/currency.mapper';
import { CurrencyDto } from '../dtos/currency.dto';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    private currencyMapper: CurrencyMapper,
  ) {}

  async findAll(): Promise<CurrencyDto[]> {
    const currencies = await this.currencyRepository.find();
    return currencies.map((currency) => this.currencyMapper.toDto(currency));
  }

  async findOne(id: string): Promise<CurrencyDto> {
    const currency = await this.currencyRepository.findOne({ where: { id } });
    if (!currency) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }
    return this.currencyMapper.toDto(currency);
  }

  async findByCode(code: string): Promise<CurrencyDto> {
    const currency = await this.currencyRepository.findOne({ where: { code } });
    if (!currency) {
      throw new NotFoundException(`Currency with code ${code} not found`);
    }
    return this.currencyMapper.toDto(currency);
  }

  async create(createCurrencyDto: CreateCurrencyDto): Promise<CurrencyDto> {
    const currency = this.currencyMapper.toEntity(createCurrencyDto);
    const savedCurrency = await this.currencyRepository.save(currency);
    return this.currencyMapper.toDto(savedCurrency);
  }

  async update(
    id: string,
    updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<CurrencyDto> {
    const currency = await this.currencyRepository.findOne({ where: { id } });
    if (!currency) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }

    const updatedCurrency = this.currencyMapper.updateEntityFromDto(
      currency,
      updateCurrencyDto,
    );
    const savedCurrency = await this.currencyRepository.save(updatedCurrency);
    return this.currencyMapper.toDto(savedCurrency);
  }

  async remove(id: string): Promise<void> {
    const currency = await this.currencyRepository.findOne({ where: { id } });
    if (!currency) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }
    await this.currencyRepository.softDelete(id);
  }
}
