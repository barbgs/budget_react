'use strict';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';
import TransactionApi from '../api/transactionsApi';

class TransactionActions {
  loadTransaction(id) {
    TransactionApi.getTransactionById(id)
      .then((data) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.LOAD_TRANSACTION,
          transaction: data
        });
      });
  }
  saveTransaction(transaction) {
    TransactionApi.saveTransaction(transaction)
      .then((transactions) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.SAVED_TRANSACTION,
          transactions
        });
      });
  }
}

export default new TransactionActions();
