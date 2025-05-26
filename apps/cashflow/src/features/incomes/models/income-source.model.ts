import { Column, Entity, OneToMany } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { Income } from './income.model';

@Entity()
export class IncomeSource extends ModificationTrackedModel {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Income, income => income.source)
  incomes: Income[];
}
