import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrenciesService } from '../services/currencies.service';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';
import { CurrencyDto } from '../dtos/currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  async findAll(): Promise<CurrencyDto[]> {
    return this.currenciesService.findAll();
  }

  @Get('code/:code')
  async findByCode(@Param('code') code: string): Promise<CurrencyDto> {
    return this.currenciesService.findByCode(code);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CurrencyDto> {
    return this.currenciesService.findOne(id);
  }

  @Post()
  async create(
    @Body() createCurrencyDto: CreateCurrencyDto,
  ): Promise<CurrencyDto> {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<CurrencyDto> {
    return this.currenciesService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.currenciesService.remove(id);
  }
}
