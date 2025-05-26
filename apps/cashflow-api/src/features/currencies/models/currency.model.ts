import { Column, Entity } from 'typeorm';
import { ModificationTrackedModel } from '../../../shared/entities/modification-tracked.model';

@Entity('currencies')
export class Currency extends ModificationTrackedModel {
  // The currency code, e.g., 'USD', 'EUR'
  @Column({ unique: true })
  code: string;

  // The name of the currency, e.g., 'United States Dollar', 'Euro'
  @Column({ unique: true })
  name: string;

  // The symbol of the currency, e.g., '$', '€'
  @Column({ unique: true })
  symbol: string;

  constructor(partial: Partial<Currency> = {}) {
    super();
    Object.assign(this, partial);
  }
}
