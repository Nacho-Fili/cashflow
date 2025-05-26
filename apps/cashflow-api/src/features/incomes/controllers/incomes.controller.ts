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
import { IncomesService } from '../services/incomes.service';
import { CreateIncomeDto } from '../dtos/create-income.dto';
import { UpdateIncomeDto } from '../dtos/update-income.dto';
import { IncomeDto } from '../dtos/income.dto';
import { Type } from 'class-transformer';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Get()
  async findAll(
    @Query('sourceId') sourceId?: string,
    @Query('recurring') recurring?: boolean,
    @Query('startDate') @Type(() => Date) startDate?: Date,
    @Query('endDate') @Type(() => Date) endDate?: Date,
  ): Promise<IncomeDto[]> {
    if (sourceId) {
      return this.incomesService.findBySource(sourceId);
    }
    if (recurring === true) {
      return this.incomesService.findRecurring();
    }
    if (startDate && endDate) {
      return this.incomesService.findByDateRange(startDate, endDate);
    }
    return this.incomesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IncomeDto> {
    return this.incomesService.findOne(id);
  }

  @Post()
  async create(@Body() createIncomeDto: CreateIncomeDto): Promise<IncomeDto> {
    return this.incomesService.create(createIncomeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ): Promise<IncomeDto> {
    return this.incomesService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.incomesService.remove(id);
  }
}
