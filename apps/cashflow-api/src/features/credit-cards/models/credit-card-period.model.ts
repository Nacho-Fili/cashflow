import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CreditCard } from './credit-card.model';
import { Expense } from '../../expenses/models/expense.model';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';

@Entity('credit_card_periods')
export class CreditCardPeriod extends ModificationTrackedModel {

  @Column({ type: 'date' })
  closingDate: string; // ISO string

  @Column({ type: 'date' })
  dueDate: string; // ISO string

  @ManyToOne(() => CreditCard, (creditCard) => creditCard.periods)
  @JoinColumn({ name: 'credit_card_id', foreignKeyConstraintName: 'fk_period_credit_card' })
  creditCard: CreditCard;

  @OneToMany(() => Expense, (expense) => expense.creditCardPeriod)
  expenses: Expense[];
}
