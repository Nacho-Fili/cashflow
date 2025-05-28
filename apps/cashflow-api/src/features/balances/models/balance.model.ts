import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Currency } from '../../currencies/models/currency.model';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';

@Entity()
export class Balance extends ModificationTrackedModel {
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  amount: number;

  @JoinColumn({
    name: 'currency_id',
    foreignKeyConstraintName: 'fk_balance_currency',
  })
  @ManyToOne(() => Currency)
  currency: Currency;

  constructor(partial: Partial<Balance> = {}) {
    super();
    Object.assign(this, partial);
  }
}
