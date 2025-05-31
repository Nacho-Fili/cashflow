import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCardPeriod } from '../models/credit-card-period.model';
import { CreateCreditCardPeriodDto } from '../dtos/create-credit-card-period.dto';
import { CreditCardPeriodMapper } from '../mappers/credit-card-period.mapper';

@Injectable()
export class CreditCardPeriodService {
  constructor(
    @InjectRepository(CreditCardPeriod)
    private periodRepository: Repository<CreditCardPeriod>,
    private periodMapper: CreditCardPeriodMapper,
  ) {}

  async create(dto: CreateCreditCardPeriodDto) {
    const entity = this.periodMapper.toEntity(dto);
    return this.periodRepository.save(entity);
  }

  async findAll() {
    return this.periodRepository.find({ relations: ['creditCard', 'expenses'] });
  }

  async findOne(id: string) {
    return this.periodRepository.findOne({ where: { id }, relations: ['creditCard', 'expenses'] });
  }
}
