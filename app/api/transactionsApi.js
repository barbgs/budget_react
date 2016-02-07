'use strict';
import transactionData from './transactionData';

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
