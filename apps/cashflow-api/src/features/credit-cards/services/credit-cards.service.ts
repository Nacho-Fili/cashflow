import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCard } from '../models/credit-card.model';
import { CreateCreditCardDto } from '../dtos/create-credit-card.dto';
import { UpdateCreditCardDto } from '../dtos/update-credit-card.dto';
import { CreditCardMapper } from '../mappers/credit-card.mapper';
import { CreditCardDto } from '../dtos/credit-card.dto';

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
    private creditCardMapper: CreditCardMapper,
  ) {}

  async findAll(): Promise<CreditCardDto[]> {
    const creditCards = await this.creditCardRepository.find({
      relations: ['bank'],
    });
    return creditCards.map((card) => this.creditCardMapper.toDto(card));
  }

  async findOne(id: string): Promise<CreditCardDto> {
    const creditCard = await this.creditCardRepository.findOne({
      where: { id },
      relations: ['bank'],
    });
    if (!creditCard) {
      throw new NotFoundException(`Credit Card with ID ${id} not found`);
    }
    return this.creditCardMapper.toDto(creditCard);
  }

  async create(
    createCreditCardDto: CreateCreditCardDto,
  ): Promise<CreditCardDto> {
    const creditCard = this.creditCardMapper.toEntity(createCreditCardDto);
    const savedCreditCard = await this.creditCardRepository.save(creditCard);
    return this.creditCardMapper.toDto(savedCreditCard);
  }

  async update(
    id: string,
    updateCreditCardDto: UpdateCreditCardDto,
  ): Promise<CreditCardDto> {
    const creditCard = await this.creditCardRepository.findOne({
      where: { id },
    });
    if (!creditCard) {
      throw new NotFoundException(`Credit Card with ID ${id} not found`);
    }

    const updatedCreditCard = this.creditCardMapper.updateEntityFromDto(
      creditCard,
      updateCreditCardDto,
    );
    const savedCreditCard =
      await this.creditCardRepository.save(updatedCreditCard);
    return this.creditCardMapper.toDto(savedCreditCard);
  }

  async remove(id: string): Promise<void> {
    const creditCard = await this.creditCardRepository.findOne({
      where: { id },
    });
    if (!creditCard) {
      throw new NotFoundException(`Credit Card with ID ${id} not found`);
    }
    await this.creditCardRepository.softDelete(id);
  }

  async findByBank(bankId: string): Promise<CreditCardDto[]> {
    const creditCards = await this.creditCardRepository.find({
      where: { bankId },
      relations: ['bank'],
    });
    return creditCards.map((card) => this.creditCardMapper.toDto(card));
  }
}
