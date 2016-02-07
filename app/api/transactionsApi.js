'use strict';
import transactionData from './transactionData';

class Transaction {
  constructor() {
    this.transactions = transactionData;
  }

  static getTransactions() {
    return this.transactions;
  }

}

export default Transaction;
