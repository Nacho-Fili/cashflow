import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { Bank } from '../../banks/models/bank.model';
import { CreditCardPeriod } from './credit-card-period.model';

@Entity('credit_cards')
export class CreditCard extends ModificationTrackedModel {
  @Column()
  name: string;

  @Column({ nullable: true })
  lastFourDigits?: string;

  @ManyToOne(() => Bank, (bank) => bank.creditCards)
  @JoinColumn({
    name: 'bank_id',
    foreignKeyConstraintName: 'fk_credit_card_bank',
  })
  bank: Bank;

  @Column({ type: 'int', nullable: true })
  creditLimit: number;

  @OneToMany(() => CreditCardPeriod, (period) => period.creditCard)
  periods: CreditCardPeriod[];

  constructor(partial: Partial<CreditCard>) {
    super();
    Object.assign(this, partial);
  }
}
