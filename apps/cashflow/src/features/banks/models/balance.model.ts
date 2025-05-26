import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { Bank } from './bank.model';
import { Currency } from '../../currencies/models/currency.model';

@Entity()
export class Balance extends ModificationTrackedModel {
  @ManyToOne(() => Bank, bank => bank.balances)
  @JoinColumn({ name: 'bank_id', foreignKeyConstraintName: 'fk_balance_bank' })
  bank: Bank;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  amount: number;

  @JoinColumn({ name: 'currency_id', foreignKeyConstraintName: 'fk_balance_currency' })
  @ManyToOne(() => Currency)
  currency: Currency;

  constructor(partial: Partial<Balance> = {}) {
    super();
    Object.assign(this, partial);
  }
}
