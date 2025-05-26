import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestmentAccount } from '../models/investment-account.model';
import { CreateInvestmentAccountDto } from '../dtos/create-investment-account.dto';
import { UpdateInvestmentAccountDto } from '../dtos/update-investment-account.dto';
import { InvestmentAccountMapper } from '../mappers/investment-account.mapper';
import { InvestmentAccountDto } from '../dtos/investment-account.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(InvestmentAccount)
    private investmentRepository: Repository<InvestmentAccount>,
    private investmentMapper: InvestmentAccountMapper,
  ) {}

  async findAll(): Promise<InvestmentAccountDto[]> {
    const accounts = await this.investmentRepository.find({
      relations: ['stocks'],
    });
    return accounts.map((account) => this.investmentMapper.toDto(account));
  }

  async findOne(id: string): Promise<InvestmentAccountDto> {
    const account = await this.investmentRepository.findOne({
      where: { id },
      relations: ['stocks'],
    });
    if (!account) {
      throw new NotFoundException(`Investment Account with ID ${id} not found`);
    }
    return this.investmentMapper.toDto(account);
  }

  async create(
    createDto: CreateInvestmentAccountDto,
  ): Promise<InvestmentAccountDto> {
    const account = this.investmentMapper.toEntity(createDto);
    const savedAccount = await this.investmentRepository.save(account);
    return this.investmentMapper.toDto(savedAccount);
  }

  async update(
    id: string,
    updateDto: UpdateInvestmentAccountDto,
  ): Promise<InvestmentAccountDto> {
    const account = await this.investmentRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Investment Account with ID ${id} not found`);
    }

    const updatedAccount = this.investmentMapper.updateEntityFromDto(
      account,
      updateDto,
    );
    const savedAccount = await this.investmentRepository.save(updatedAccount);
    return this.investmentMapper.toDto(savedAccount);
  }

  async remove(id: string): Promise<void> {
    const account = await this.investmentRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Investment Account with ID ${id} not found`);
    }
    await this.investmentRepository.softDelete(id);
  }
}
