'use strict';
import transactionData from './transactionsData';
import _ from 'lodash'

class Transaction {
  constructor() {
    this.transactions = transactionData;
  }

  getTransactions() {
    return {
      'fixed_income': this.getFixedIncome(),
      'fixed_expenses': this.getFixedExpenses(),
      'variable_expenses': this.getVariableExpenses(),
      'spendable': this.getSpendable()
    };
  }

  filterFixed(type) {
    return _.filter(this.transactions, (t) => {
      if (t.frequency && t.frequency === 'recurring' && t.type === type){
        return t;
      }
    });
  }

  getFixedTotal(type) {
    let fixedTransaction = this.filterFixed(type);
    return _.reduce(fixedTransaction, (sum , n)=> {
      return sum + n.amount;
    }, 0).toFixed(2);
  }

  getFixedExpenses() {
    return {
      name: 'Fixed Expenses',
      type: 'expenses',
      amount: this.getFixedTotal('expense'),
      detail: this.filterFixed('expense')
    };
  }

  getTotalSpendable() {
    return this.getFixedTotal('income') - this.getFixedTotal('expense');
  }

  getSpendable() {
    return {
      name: 'You can Spend',
      type: 'spendable',
      amount: this.getTotalSpendable(),
      detail: []
    };
  }

  getVariableExpenses() {
    return {
      name: 'Variable Expenses',
      type: 'expenses',
      amount: 0,
      detail: []
    };
  }

  getFixedIncome() {
    return {
      name: 'Fixed Income',
      type: 'income',
      amount: this.getFixedTotal('income'),
      detail: this.filterFixed('income')
    };
  }

}

export default new Transaction();
