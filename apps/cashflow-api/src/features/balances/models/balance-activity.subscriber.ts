import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { Expense } from '../../expenses/models/expense.model';
import { Income } from '../../incomes/models/income.model';
import { Balance } from './balance.model';

@EventSubscriber()
export class BalanceActivitySubscriber implements EntitySubscriberInterface<any> {
  listenTo() {
    return Balance;
  }

  afterInsert(event: InsertEvent<any>) {
    if (event.entity instanceof Expense && event.entity.balance) {
      this.updateBalanceAmount(event.entity.balance, event.manager);
    }
    if (event.entity instanceof Income && event.entity.balance) {
      this.updateBalanceAmount(event.entity.balance, event.manager);
    }
  }

  afterUpdate(event: UpdateEvent<any>) {
    if (event.entity instanceof Expense && event.entity.balance) {
      this.updateBalanceAmount(event.entity.balance, event.manager);
    }
    if (event.entity instanceof Income && event.entity.balance) {
      this.updateBalanceAmount(event.entity.balance, event.manager);
    }
  }

  async afterRemove(event: RemoveEvent<any>) {
    if (event.entity instanceof Expense && event.entity.balance) {
      await this.updateBalanceAmount(event.entity.balance, event.manager);
    }
    if (event.entity instanceof Income && event.entity.balance) {
      await this.updateBalanceAmount(event.entity.balance, event.manager);
    }
  }

  private async updateBalanceAmount(balance: Balance, manager: any) {
    const [incomes, expenses] = await Promise.all([
      manager.find(Income, { where: { balance: { id: balance.id } } }),
      manager.find(Expense, { where: { balance: { id: balance.id } } }),
    ]);
    const totalIncome = incomes.reduce((sum: number, current: Income) => sum + Number(current.amount), 0);
    const totalExpense = expenses.reduce((sum: number, current: Expense) => sum + Number(current.amount), 0);
    balance.amount = totalIncome - totalExpense;
    await manager.save(Balance, balance);
  }
}
