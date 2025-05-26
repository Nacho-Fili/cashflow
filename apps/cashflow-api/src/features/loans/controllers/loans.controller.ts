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
import { LoanDto } from '../dtos/loan.dto';
import { LoansService } from '../services/loans.service';
import { CreateLoanDto } from '../dtos/create-loan.dto';
import { UpdateLoanDto } from '../dtos/update-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  async findAll(@Query('bankId') bankId?: string): Promise<LoanDto[]> {
    if (bankId) {
      return this.loansService.findByBank(bankId);
    }
    return this.loansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LoanDto> {
    return this.loansService.findOne(id);
  }

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto): Promise<LoanDto> {
    return this.loansService.create(createLoanDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLoanDto: UpdateLoanDto,
  ): Promise<LoanDto> {
    return this.loansService.update(id, updateLoanDto);
  }

  @Patch(':id/remaining')
  async updateRemainingAmount(
    @Param('id') id: string,
    @Body('remainingAmount') remainingAmount: number,
  ): Promise<LoanDto> {
    return this.loansService.updateRemainingAmount(id, remainingAmount);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.loansService.remove(id);
  }
}
