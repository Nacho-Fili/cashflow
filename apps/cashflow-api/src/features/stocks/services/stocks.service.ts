import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../models/stock.model';
import { CreateStockDto } from '../dtos/create-stock.dto';
import { UpdateStockDto } from '../dtos/update-stock.dto';
import { StockMapper } from '../mappers/stock.mapper';
import { StockDto } from '../dtos/stock.dto';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    private stockMapper: StockMapper,
  ) {}

  async findAll(): Promise<StockDto[]> {
    const stocks = await this.stockRepository.find({
      relations: ['account', 'currency'],
    });
    return stocks.map((stock) => this.stockMapper.toDto(stock));
  }

  async findOne(id: string): Promise<StockDto> {
    const stock = await this.stockRepository.findOne({
      where: { id },
      relations: ['account', 'currency'],
    });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return this.stockMapper.toDto(stock);
  }

  async create(createStockDto: CreateStockDto): Promise<StockDto> {
    const stock = this.stockMapper.toEntity(createStockDto);

    // Set relationships
    stock.account = { id: createStockDto.accountId } as any;
    stock.currency = { id: createStockDto.currencyId } as any;

    const savedStock = await this.stockRepository.save(stock);
    return this.findOne(savedStock.id); // Return full object with relations
  }

  async update(id: string, updateStockDto: UpdateStockDto): Promise<StockDto> {
    const stock = await this.stockRepository.findOne({
      where: { id },
      relations: ['account', 'currency'],
    });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }

    // Update entity fields
    const updatedStock = this.stockMapper.updateEntityFromDto(
      stock,
      updateStockDto,
    );

    // Update relationships if provided
    if (updateStockDto.accountId) {
      updatedStock.account = { id: updateStockDto.accountId } as any;
    }
    if (updateStockDto.currencyId) {
      updatedStock.currency = { id: updateStockDto.currencyId } as any;
    }

    await this.stockRepository.save(updatedStock);
    return this.findOne(id); // Return full updated object with relations
  }

  async remove(id: string): Promise<void> {
    const stock = await this.stockRepository.findOne({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    await this.stockRepository.softDelete(id);
  }

  async findByAccount(accountId: string): Promise<StockDto[]> {
    const stocks = await this.stockRepository.find({
      where: { account: { id: accountId } },
      relations: ['account', 'currency'],
    });
    return stocks.map((stock) => this.stockMapper.toDto(stock));
  }

  async updateCurrentPrice(
    id: string,
    currentPrice: number,
  ): Promise<StockDto> {
    const stock = await this.stockRepository.findOne({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }

    stock.currentPrice = currentPrice;
    const savedStock = await this.stockRepository.save(stock);
    return this.findOne(savedStock.id);
  }
}
