import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { Category } from '../../categories/models/category.model';
import { Currency } from '../../currencies/models/currency.model';

@Entity()
export class Budget extends ModificationTrackedModel {
  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.budgets)
  @JoinColumn({
    name: 'category_id',
    foreignKeyConstraintName: 'fk_budget_category',
  })
  category: Category;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @JoinColumn({
    name: 'currency_id',
    foreignKeyConstraintName: 'fk_budget_currency',
  })
  @ManyToOne(() => Currency, { nullable: true })
  currency?: Currency;

  @Column({ type: 'varchar', nullable: true })
  month?: string; // Format: 'YYYY-MM'

  @Column({ default: false })
  isRecurring: boolean;
}
