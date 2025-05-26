import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';
import { Bank } from '../../banks/models/bank.model';
import { Currency } from '../../currencies/models/currency.model';

@Entity()
export class Loan extends ModificationTrackedModel {
  @Column()
  name: string;

  @ManyToOne(() => Bank, bank => bank.loans)
  @JoinColumn({ name: 'bank_id', foreignKeyConstraintName: 'fk_loan_bank' })
  bank: Bank;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  initialAmount?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  interestRate?: number;

  @Column({ type: 'int' })
  termMonths: number;
  
  @Column({ type: 'date' })
  startDate: Date;
  
  @Column({ type: 'date' })
  endDate: Date;
  
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monthlyPayment: number;
  
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  remainingAmount: number;

  @JoinColumn({ name: 'currency_id', foreignKeyConstraintName: 'fk_loan_currency' })
  @ManyToOne(() => Currency)
  currency: Currency;
}
