import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { IncomeSource } from './income-source.model';
import { Currency } from '../../currencies/models/currency.model';
import { Balance } from '../../balances/models/balance.model';

@Entity('incomes')
export class Income extends ModificationTrackedModel {
  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @JoinColumn({ name: 'currency_id', foreignKeyConstraintName: 'fk_income_currency' })
  @ManyToOne(() => Currency)
  currency: Currency;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => IncomeSource, (source) => source.incomes)
  @JoinColumn({ name: 'source_id', foreignKeyConstraintName: 'fk_income_source' })
  source: IncomeSource;

  @Column()
  sourceId: string;

  @Column({ default: false })
  isRecurring: boolean;

  @ManyToOne(() => Balance, (balance) => balance.incomes, { nullable: true })
  @JoinColumn({ name: 'balance_id', foreignKeyConstraintName: 'fk_income_balance' })
  balance?: Balance;
}
