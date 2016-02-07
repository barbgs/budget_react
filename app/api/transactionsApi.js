'use strict';
import transactionData from './transactionsData';

class Transaction {
  constructor() {
    this.transactions = [];
  }

  static getTransactions() {
    this.transactions = transactionData;
    return this.transactions;
  }

}

export default Transaction;
