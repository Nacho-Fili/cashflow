import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InvestmentsService } from '../services/investments.service';
import { CreateInvestmentAccountDto } from '../dtos/create-investment-account.dto';
import { UpdateInvestmentAccountDto } from '../dtos/update-investment-account.dto';
import { InvestmentAccountDto } from '../dtos/investment-account.dto';

@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Get()
  async findAll(): Promise<InvestmentAccountDto[]> {
    return this.investmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InvestmentAccountDto> {
    return this.investmentsService.findOne(id);
  }

  @Post()
  async create(
    @Body() createDto: CreateInvestmentAccountDto,
  ): Promise<InvestmentAccountDto> {
    return this.investmentsService.create(createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateInvestmentAccountDto,
  ): Promise<InvestmentAccountDto> {
    return this.investmentsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.investmentsService.remove(id);
  }
}
