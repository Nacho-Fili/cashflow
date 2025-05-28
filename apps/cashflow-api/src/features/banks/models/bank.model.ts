import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { CreditCard } from '../../credit-cards/models/credit-card.model';
import { Loan } from '../../loans/models/loan.model';
import { Balance } from '../../balances/models/balance.model';

@Entity()
export class Bank extends ModificationTrackedModel {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => CreditCard, (creditCard) => creditCard.bank)
  creditCards: CreditCard[];

  @OneToMany(() => Loan, (loan) => loan.bank)
  loans: Loan[];

  @OneToOne(() => Balance)
  balances: Balance[];
}
