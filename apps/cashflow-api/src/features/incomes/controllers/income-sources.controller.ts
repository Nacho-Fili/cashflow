import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IncomeSourcesService } from '../services/income-sources.service';
import { CreateIncomeSourceDto } from '../dtos/create-income-source.dto';
import { UpdateIncomeSourceDto } from '../dtos/update-income-source.dto';
import { IncomeSourceDto } from '../dtos/income-source.dto';

@Controller('income-sources')
export class IncomeSourcesController {
  constructor(private readonly incomeSourcesService: IncomeSourcesService) {}

  @Get()
  async findAll(): Promise<IncomeSourceDto[]> {
    return this.incomeSourcesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IncomeSourceDto> {
    return this.incomeSourcesService.findOne(id);
  }

  @Post()
  async create(
    @Body() createIncomeSourceDto: CreateIncomeSourceDto,
  ): Promise<IncomeSourceDto> {
    return this.incomeSourcesService.create(createIncomeSourceDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIncomeSourceDto: UpdateIncomeSourceDto,
  ): Promise<IncomeSourceDto> {
    return this.incomeSourcesService.update(id, updateIncomeSourceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.incomeSourcesService.remove(id);
  }
}
