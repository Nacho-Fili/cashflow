import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BanksService } from '../services/banks.service';
import { CreateBankDto } from '../dtos/create-bank.dto';
import { UpdateBankDto } from '../dtos/update-bank.dto';
import { BankDto } from '../dtos/bank.dto';

@ApiTags('banks')
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all banks',
    description: 'Retrieves a list of all banks',
  })
  @ApiResponse({
    status: 200,
    description: 'List of banks successfully retrieved',
    type: [BankDto],
  })
  async findAll(): Promise<BankDto[]> {
    return this.banksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a bank by ID',
    description: 'Retrieves a bank by its unique identifier',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the bank' })
  @ApiResponse({
    status: 200,
    description: 'Bank successfully retrieved',
    type: BankDto,
  })
  @ApiResponse({ status: 404, description: 'Bank not found' })
  async findOne(@Param('id') id: string): Promise<BankDto> {
    return this.banksService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new bank',
    description: 'Creates a new bank record',
  })
  @ApiResponse({
    status: 201,
    description: 'Bank successfully created',
    type: BankDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() createBankDto: CreateBankDto): Promise<BankDto> {
    return this.banksService.create(createBankDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a bank',
    description: 'Updates an existing bank record',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the bank' })
  @ApiResponse({
    status: 200,
    description: 'Bank successfully updated',
    type: BankDto,
  })
  @ApiResponse({ status: 404, description: 'Bank not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
  ): Promise<BankDto> {
    return this.banksService.update(id, updateBankDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a bank',
    description: 'Soft deletes a bank record',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the bank' })
  @ApiResponse({ status: 200, description: 'Bank successfully deleted' })
  @ApiResponse({ status: 404, description: 'Bank not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.banksService.remove(id);
  }
}
