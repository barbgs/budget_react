'use strict';

import Dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Events from 'events';

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';

var transactions = [];
class TransactionStore extends EventEmitter {
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
    return transactions;
  }
};

Dispatcher.register((action) ->
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      transactions = action.transactions;
      break;
  };
);

export default TransactionStore;
