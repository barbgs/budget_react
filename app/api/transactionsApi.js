'use strict';
import transactionData from './transactionsData';
import _ from 'lodash';
import Firebase from 'firebase';

class Transaction {
  constructor() {
    this.firebase = new Firebase('https://barbgs-budget.firebaseio.com');
    this.transactions = [];
  }

  getTransactions() {
    return new Promise((resolve, reject) => {
      this.firebase.child('fixed_transactions').once('value', (data) => {
          this.transactions = data.val();
          resolve(this.getTransactionsObject());
      });
    });
  }

  getTransactionById(id) {
    return new Promise((resolve, reject) => {
      this.firebase.child('fixed_transactions/id').equal.once('value', (data) => {
          resolve(data.val());
      });
    });
  }

  getTransactionsObject() {
    return {
      'fixed_income': this.getFixedIncome(),
      'fixed_expenses': this.getFixedExpenses(),
      'variable_expenses': this.getVariableExpenses(),
      'spendable': this.getSpendable()
    };
  }

  filterFixed(type, variable) {
    return _.filter(this.transactions, (t) => {
      if (t.type === type) {
        if (!variable) {
          if (t.frequency && t.frequency === 'recurring') {
            return t;
          }
        } else {
          if (!t.frequency) {
            return t;
          }
        }

      }
    });
  }

  getFixedTotal(type, variable) {
    let fixedTransaction = variable ? this.filterFixed(type, variable) : this.filterFixed(type);
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
    return (this.getFixedTotal('income') - this.getFixedTotal('expense') - this.getFixedTotal('expense', true)).toFixed(2);
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
      amount: this.getFixedTotal('expense', true),
      detail: this.filterFixed('expense', true)
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
