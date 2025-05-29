import { Column, Entity, OneToMany } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { Budget } from '../../budgets/models/budget.model';
import { Expense } from '../../expenses/models/expense.model';

@Entity('categories')
export class Category extends ModificationTrackedModel {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  icon: string;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];

  @OneToMany(() => Budget, (budget) => budget.category)
  budgets: Budget[];

  constructor(partial: Partial<Category> = {}) {
    super();
    Object.assign(this, partial);
  }
}
