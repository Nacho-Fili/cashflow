import { Column, Entity, OneToMany } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { Stock } from '../../stocks/models/stock.model';

@Entity('investment_accounts')
export class InvestmentAccount extends ModificationTrackedModel {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  broker: string;

  @OneToMany(() => Stock, (stock) => stock.account)
  stocks: Stock[];
}
