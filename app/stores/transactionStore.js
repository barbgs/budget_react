'use strict';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Events from 'events';
import _ from 'lodash';

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';

class TransactionStore extends EventEmitter {
  constructor() {
    super();
    this.transactions = [];
    this.selectedTransaction = {};
    this.registerDispatcher();
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT ,callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getTransactions() {
    return this.transactions;
  }

  getTransactionById(id) {
    return this.selectedTransaction;
  }

  getFixedExpenses() {
    return this.fixedExpenses;
  }

  registerDispatcher() {
    Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.INITIALIZE:
          this.transactions = action.initialData.transactions
          this.emitChange();
          break;
        case ActionTypes.LOAD_TRANSACTION:
          this.selectedTransaction = action.transaction;
          this.emitChange();
          break;
      };

    });
  }

};

export default new TransactionStore();
