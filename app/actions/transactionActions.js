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

}

export default new TransactionActions();
