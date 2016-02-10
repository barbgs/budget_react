'use strict';

import Dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Events from 'events';

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';


class TransactionStore extends EventEmitter {
  constructor() {
    super();
    this.transactions = [];
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

  getFixedExpenses() {
    return this.fixedExpenses;
  }

  registerDispatcher() {
    Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.INITIALIZE:
          this.transactions = action.initialData.transactions
          break;
      };

    });
  }

};

export default new TransactionStore();
