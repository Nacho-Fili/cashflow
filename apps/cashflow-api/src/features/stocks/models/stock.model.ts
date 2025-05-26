import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { InvestmentAccount } from '../../investments/models/investment-account.model';
import { Currency } from '../../currencies/models/currency.model';

@Entity()
export class Stock extends ModificationTrackedModel {
  @Column()
  symbol: string;

  @Column()
  companyName: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  purchasePrice: number;

  @Column({ type: 'date' })
  purchaseDate: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  currentPrice: number;

  @ManyToOne(() => InvestmentAccount, (account) => account.stocks)
  @JoinColumn({
    name: 'account_id',
    foreignKeyConstraintName: 'fk_stock_account',
  })
  account: InvestmentAccount;

  @JoinColumn({ name: 'currency_id' })
  @ManyToOne(() => Currency)
  currency: Currency;
}
