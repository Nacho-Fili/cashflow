import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';
import { StockDto } from '../dtos/stock.dto';
import { CreateStockDto } from '../dtos/create-stock.dto';
import { UpdateStockDto } from '../dtos/update-stock.dto';

@Injectable()
export class StockMapper {
  toEntity(createStockDto: CreateStockDto): Stock {
    const stock = new Stock();
    stock.symbol = createStockDto.symbol;
    stock.companyName = createStockDto.companyName;
    stock.quantity = createStockDto.quantity;
    stock.purchasePrice = createStockDto.purchasePrice;
    stock.purchaseDate = createStockDto.purchaseDate;
    return stock;
  }

  toDto(stock: Stock): StockDto {
    const stockDto = new StockDto();
    stockDto.id = stock.id;
    stockDto.symbol = stock.symbol;
    stockDto.companyName = stock.companyName;
    stockDto.quantity = stock.quantity;
    stockDto.purchasePrice = stock.purchasePrice;
    stockDto.purchaseDate = stock.purchaseDate;
    stockDto.currentPrice = stock.currentPrice;
    stockDto.accountId = stock.account?.id;
    stockDto.currencyId = stock.currency?.id;
    stockDto.createdAt = stock.createdAt;
    stockDto.updatedAt = stock.updatedAt;
    return stockDto;
  }

  updateEntityFromDto(stock: Stock, updateStockDto: UpdateStockDto): Stock {
    if (updateStockDto.symbol !== undefined) {
      stock.symbol = updateStockDto.symbol;
    }
    if (updateStockDto.companyName !== undefined) {
      stock.companyName = updateStockDto.companyName;
    }
    if (updateStockDto.quantity !== undefined) {
      stock.quantity = updateStockDto.quantity;
    }
    if (updateStockDto.purchasePrice !== undefined) {
      stock.purchasePrice = updateStockDto.purchasePrice;
    }
    if (updateStockDto.purchaseDate !== undefined) {
      stock.purchaseDate = updateStockDto.purchaseDate;
    }
    if (updateStockDto.currentPrice !== undefined) {
      stock.currentPrice = updateStockDto.currentPrice;
    }
    return stock;
  }
}
