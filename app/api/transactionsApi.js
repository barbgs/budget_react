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
      'fixed_expenses': this.getFixedExpenses()
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
      amount: this.getFixedTotal('expense'),
      detail: this.filterFixed('expense')
    }
  }

  getFixedIncome() {
    return {
      name: 'Fixed Income',
      amount: this.getFixedTotal('income'),
      detail: this.filterFixed('income')
    };
  }

}

export default new Transaction();
