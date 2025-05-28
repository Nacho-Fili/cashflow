import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../models/bank.model';
import { CreateBankDto } from '../dtos/create-bank.dto';
import { UpdateBankDto } from '../dtos/update-bank.dto';
import { BankMapper } from '../mappers/bank.mapper';
import { BankDto } from '../dtos/bank.dto';
import { BalancesService } from '../../balances/services/balances.service';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
    private balancesService: BalancesService,
    private bankMapper: BankMapper,
  ) {}

  async findAll(): Promise<BankDto[]> {
    const banks = await this.bankRepository.find();
    return banks.map((bank) => this.bankMapper.toDto(bank));
  }

  async findOne(id: string): Promise<BankDto> {
    const bank = await this.bankRepository.findOne({ where: { id } });
    if (!bank) {
      throw new NotFoundException(`Bank with ID ${id} not found`);
    }
    return this.bankMapper.toDto(bank);
  }

  async create(createBankDto: CreateBankDto): Promise<BankDto> {
    const bank = this.bankMapper.toEntity(createBankDto);
    
    if (!bank.balances) {
      bank.balances = [];
    }
    
    bank.balances = await Promise.all(
      createBankDto.currencyCodes?.map(async (code) => this.balancesService.create(code)) || []
    );

    const savedBank = await this.bankRepository.save(bank);
    
    return this.bankMapper.toDto(savedBank);
  }

  async update(id: string, updateBankDto: UpdateBankDto): Promise<BankDto> {
    const bank = await this.bankRepository.findOne({ where: { id } });
    if (!bank) {
      throw new NotFoundException(`Bank with ID ${id} not found`);
    }

    const updatedBank = this.bankMapper.updateEntityFromDto(
      bank,
      updateBankDto,
    );
    const savedBank = await this.bankRepository.save(updatedBank);
    return this.bankMapper.toDto(savedBank);
  }

  async remove(id: string): Promise<void> {
    const bank = await this.bankRepository.findOne({ where: { id } });
    if (!bank) {
      throw new NotFoundException(`Bank with ID ${id} not found`);
    }
    await this.bankRepository.softDelete(id);
  }
}
