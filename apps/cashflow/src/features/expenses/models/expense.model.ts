import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { Category } from '../../categories/models/category.model';
import { CreditCard } from '../../credit-cards/models/credit-card.model';
import { Balance } from '../../banks/models/balance.model';
import { Currency } from '../../currencies/models/currency.model';

export enum ExpenseType {
  ONE_TIME = 'ONE_TIME',
  INSTALLMENT = 'INSTALLMENT',
  SUBSCRIPTION = 'SUBSCRIPTION'
}

@Entity()
export class Expense extends ModificationTrackedModel {
  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @JoinColumn({ name: 'currency_id' })
  @ManyToOne(() => Currency)
  currency: Currency;

  @Column({ type: 'enum', enum: ExpenseType })
  type: ExpenseType;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Balance, {  nullable: true })
  @JoinColumn({ name: 'balance_id', foreignKeyConstraintName: 'fk_expense_balance' })
  balance?: Balance;

  @ManyToOne(() => CreditCard, creditCard => creditCard.expenses,{ nullable: true})
  @JoinColumn({ name: 'credit_card_id', foreignKeyConstraintName: 'fk_expense_credit_card' })
  creditCard?: CreditCard;

  @ManyToOne(() => Category, category => category.expenses)
  @JoinColumn({ name: 'category_id', foreignKeyConstraintName: 'fk_expense_category' })
  category: Category;

  @Column()
  categoryId: string;

  // Fields for installment type expenses
  @Column({ nullable: true, type: 'int' })
  totalInstallments: number;

  @Column({ nullable: true, type: 'int' })
  currentInstallment: number;

  @Column({ nullable: true, type: 'date' })
  startDate: Date;

  @Column({ nullable: true, type: 'date' })
  endDate: Date;

  // Field for subscription type expenses
  @Column({ nullable: true, default: false })
  isRecurring: boolean;
}
