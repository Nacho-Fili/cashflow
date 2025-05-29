import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Currency } from '../../currencies/models/currency.model';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { Bank } from '../../banks/models/bank.model';
import { Expense } from '../../expenses/models/expense.model';
import { Income } from '../../incomes/models/income.model';

@Entity('balances')
export class Balance extends ModificationTrackedModel {
  @JoinColumn({ name: 'bank_id', foreignKeyConstraintName: 'fk_balance_bank' })
  @ManyToOne(() => Bank, (bank) => bank.balances, { nullable: true })
  bank?: Bank;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  amount: number;

  @JoinColumn({
    name: 'currency_id',
    foreignKeyConstraintName: 'fk_balance_currency',
  })
  @ManyToOne(() => Currency)
  currency: Currency;

  @OneToMany(() => Expense, (expense) => expense.balance)
  expenses: Expense[];

  @OneToMany(() => Income, (income) => income.balance)
  incomes: Income[];

  constructor(partial: Partial<Balance> = {}) {
    super();
    Object.assign(this, partial);
  }
}
