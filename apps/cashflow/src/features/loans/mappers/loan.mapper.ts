import { Injectable } from '@nestjs/common';
import { Loan } from '../models/loan.model';
import { LoanDto } from '../dtos/loan.dto';
import { CreateLoanDto } from '../dtos/create-loan.dto';
import { UpdateLoanDto } from '../dtos/update-loan.dto';

@Injectable()
export class LoanMapper {
  toEntity(createLoanDto: CreateLoanDto): Loan {
    const loan = new Loan();
    loan.name = createLoanDto.name;
    loan.initialAmount = createLoanDto.initialAmount;
    loan.interestRate = createLoanDto.interestRate;
    loan.termMonths = createLoanDto.termMonths;
    loan.startDate = createLoanDto.startDate;
    loan.endDate = createLoanDto.endDate;
    loan.monthlyPayment = createLoanDto.monthlyPayment;
    loan.remainingAmount = createLoanDto.remainingAmount;
    return loan;
  }

  toDto(loan: Loan): LoanDto {
    const loanDto = new LoanDto();
    loanDto.id = loan.id;
    loanDto.name = loan.name;
    loanDto.bankId = loan.bank?.id;
    loanDto.initialAmount = loan.initialAmount;
    loanDto.interestRate = loan.interestRate;
    loanDto.termMonths = loan.termMonths;
    loanDto.startDate = loan.startDate;
    loanDto.endDate = loan.endDate;
    loanDto.monthlyPayment = loan.monthlyPayment;
    loanDto.remainingAmount = loan.remainingAmount;
    loanDto.currencyId = loan.currency?.id;
    loanDto.createdAt = loan.createdAt;
    loanDto.updatedAt = loan.updatedAt;
    return loanDto;
  }

  updateEntityFromDto(loan: Loan, updateLoanDto: UpdateLoanDto): Loan {
    if (updateLoanDto.name !== undefined) {
      loan.name = updateLoanDto.name;
    }
    if (updateLoanDto.initialAmount !== undefined) {
      loan.initialAmount = updateLoanDto.initialAmount;
    }
    if (updateLoanDto.interestRate !== undefined) {
      loan.interestRate = updateLoanDto.interestRate;
    }
    if (updateLoanDto.termMonths !== undefined) {
      loan.termMonths = updateLoanDto.termMonths;
    }
    if (updateLoanDto.startDate !== undefined) {
      loan.startDate = updateLoanDto.startDate;
    }
    if (updateLoanDto.endDate !== undefined) {
      loan.endDate = updateLoanDto.endDate;
    }
    if (updateLoanDto.monthlyPayment !== undefined) {
      loan.monthlyPayment = updateLoanDto.monthlyPayment;
    }
    if (updateLoanDto.remainingAmount !== undefined) {
      loan.remainingAmount = updateLoanDto.remainingAmount;
    }
    return loan;
  }
}
