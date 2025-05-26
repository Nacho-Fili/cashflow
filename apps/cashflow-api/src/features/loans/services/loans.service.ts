import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from '../models/loan.model';
import { CreateLoanDto } from '../dtos/create-loan.dto';
import { UpdateLoanDto } from '../dtos/update-loan.dto';
import { LoanMapper } from '../mappers/loan.mapper';
import { LoanDto } from '../dtos/loan.dto';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    private loanMapper: LoanMapper,
  ) {}

  async findAll(): Promise<LoanDto[]> {
    const loans = await this.loanRepository.find({
      relations: ['bank', 'currency'],
    });
    return loans.map((loan) => this.loanMapper.toDto(loan));
  }

  async findOne(id: string): Promise<LoanDto> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: ['bank', 'currency'],
    });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    return this.loanMapper.toDto(loan);
  }

  async create(createLoanDto: CreateLoanDto): Promise<LoanDto> {
    const loan = this.loanMapper.toEntity(createLoanDto);

    // Set relationships
    loan.bank = { id: createLoanDto.bankId } as any;
    if (createLoanDto.currencyId) {
      loan.currency = { id: createLoanDto.currencyId } as any;
    }

    const savedLoan = await this.loanRepository.save(loan);
    return this.findOne(savedLoan.id); // Return full object with relations
  }

  async update(id: string, updateLoanDto: UpdateLoanDto): Promise<LoanDto> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: ['bank', 'currency'],
    });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    // Update entity fields
    const updatedLoan = this.loanMapper.updateEntityFromDto(
      loan,
      updateLoanDto,
    );

    // Update relationships if provided
    if (updateLoanDto.bankId) {
      updatedLoan.bank = { id: updateLoanDto.bankId } as any;
    }
    if (updateLoanDto.currencyId) {
      updatedLoan.currency = { id: updateLoanDto.currencyId } as any;
    }

    await this.loanRepository.save(updatedLoan);
    return this.findOne(id); // Return full updated object with relations
  }

  async remove(id: string): Promise<void> {
    const loan = await this.loanRepository.findOne({ where: { id } });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    await this.loanRepository.softDelete(id);
  }

  async findByBank(bankId: string): Promise<LoanDto[]> {
    const loans = await this.loanRepository.find({
      where: { bank: { id: bankId } },
      relations: ['bank', 'currency'],
    });
    return loans.map((loan) => this.loanMapper.toDto(loan));
  }

  async updateRemainingAmount(
    id: string,
    remainingAmount: number,
  ): Promise<LoanDto> {
    const loan = await this.loanRepository.findOne({ where: { id } });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    loan.remainingAmount = remainingAmount;
    const savedLoan = await this.loanRepository.save(loan);
    return this.findOne(savedLoan.id);
  }
}
