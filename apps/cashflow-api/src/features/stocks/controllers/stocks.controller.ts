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
import { StocksService } from '../services/stocks.service';
import { CreateStockDto } from '../dtos/create-stock.dto';
import { UpdateStockDto } from '../dtos/update-stock.dto';
import { StockDto } from '../dtos/stock.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  async findAll(@Query('accountId') accountId?: string): Promise<StockDto[]> {
    if (accountId) {
      return this.stocksService.findByAccount(accountId);
    }
    return this.stocksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StockDto> {
    return this.stocksService.findOne(id);
  }

  @Post()
  async create(@Body() createStockDto: CreateStockDto): Promise<StockDto> {
    return this.stocksService.create(createStockDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ): Promise<StockDto> {
    return this.stocksService.update(id, updateStockDto);
  }

  @Patch(':id/price')
  async updatePrice(
    @Param('id') id: string,
    @Body('currentPrice') currentPrice: number,
  ): Promise<StockDto> {
    return this.stocksService.updateCurrentPrice(id, currentPrice);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.stocksService.remove(id);
  }
}
