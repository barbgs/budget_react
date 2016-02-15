'use strict';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';
import TransactionApi from '../api/transactionsApi';

class InitializeActions {
  initApp() {
    TransactionApi.getTransactions()
      .then((data) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: {
            transactions: data
          }
        });
      });
  }

  
}

export default new InitializeActions();
