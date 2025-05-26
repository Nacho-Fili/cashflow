import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { IncomeSource } from './income-source.model';
import { Currency } from '../../currencies/models/currency.model';

@Entity()
export class Income extends ModificationTrackedModel {
  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @JoinColumn({ name: 'currency_id' })
  @ManyToOne(() => Currency)
  currency: Currency;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => IncomeSource, (source) => source.incomes)
  @JoinColumn({ name: 'source_id' })
  source: IncomeSource;

  @Column()
  sourceId: string;

  @Column({ default: false })
  isRecurring: boolean;
}
