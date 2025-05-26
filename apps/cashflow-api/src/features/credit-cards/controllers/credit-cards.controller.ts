import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreditCardsService } from '../services/credit-cards.service';
import { CreateCreditCardDto } from '../dtos/create-credit-card.dto';
import { UpdateCreditCardDto } from '../dtos/update-credit-card.dto';
import { CreditCardDto } from '../dtos/credit-card.dto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Get()
  async findAll(@Query('bankId') bankId?: string): Promise<CreditCardDto[]> {
    if (bankId) {
      return this.creditCardsService.findByBank(bankId);
    }
    return this.creditCardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CreditCardDto> {
    return this.creditCardsService.findOne(id);
  }

  @Post()
  async create(
    @Body() createCreditCardDto: CreateCreditCardDto,
  ): Promise<CreditCardDto> {
    return this.creditCardsService.create(createCreditCardDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCreditCardDto: UpdateCreditCardDto,
  ): Promise<CreditCardDto> {
    return this.creditCardsService.update(id, updateCreditCardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.creditCardsService.remove(id);
  }
}
