import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreditCardPeriodService } from '../services/credit-card-period.service';
import { CreateCreditCardPeriodDto } from '../dtos/create-credit-card-period.dto';

@Controller('credit-card-periods')
export class CreditCardPeriodController {
  constructor(private readonly service: CreditCardPeriodService) {}

  @Post()
  async create(@Body() dto: CreateCreditCardPeriodDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
