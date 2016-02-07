'use strict';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';
import TransactionApi from '../api/transactionsApi';

class InitializeActions {
  initApp() {
    let transactions = TransactionApi.getTransactions();

    Dispatcher.dispatch({
      actionType: ActionTypes.INITIALIZE,
      initialData: {
        transactions: transactions
      }
    });
  }
}

export default InitializeActions;
